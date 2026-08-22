/* ════════════════════════════════════════════════════════════
   DEMON SLAYER — RANGOS DE CAZADORES DE DEMONIOS
   ════════════════════════════════════════════════════════════ */

const DEMONSLAYER_RANKS = [
    { key:'ds_mitsuri',   label:'Mitsuri',     icon:'fa-solid fa-heart',         color:'#f472b6', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'La Pilar del Amor. Su espada se curva como su corazón.' },
    { key:'ds_muirai',    label:'Muichiro',    icon:'fa-solid fa-cloud',          color:'#94a3b8', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'La Niebla. Olvidó todo pero recordó ser el más fuerte.' },
    { key:'ds_zenitsu',   label:'Zenitsu',     icon:'fa-solid fa-bolt',          color:'#fbbf24', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'El cobarde que duerme y vence. Thunderclap and Flash.' },
    { key:'ds_inosuke',   label:'Inosuke',     icon:'fa-solid fa-paw',           color:'#60a5fa', price:15000000,   price_usd:500,  gradeTier:2, mult:2.5,    desc:'La cabeza de jabalí. Beast Breathing. Incivilizado pero genial.' },
    { key:'ds_tanjiro',   label:'Tanjiro',     icon:'fa-solid fa-fire',          color:'#ef4444', price:25000000,   price_usd:850,  gradeTier:2, mult:3,      desc:'El agua y el sol. Hinokami Kagura. El corazón más puro del anime.' },
    { key:'ds_rengoku',   label:'Rengoku',     icon:'fa-solid fa-flame',         color:'#f97316', price:35000000,   price_usd:1150, gradeTier:2, mult:3.5,    desc:'El Pilar de la Llama. Flame Breathing. "¡SET YOUR HEART ABLAZE!"' },
    { key:'ds_giyu',      label:'Giyu',        icon:'fa-solid fa-water',         color:'#3b82f6', price:45000000,   price_usd:1500, gradeTier:2, mult:4,      desc:'El Pilar del Agua. Water Breathing. El primero en creer en Tanjiro.' },
    { key:'ds_urokodaki', label:'Urokodaki',   icon:'fa-solid fa-mask',          color:'#6b7280', price:55000000,   price_usd:1800, gradeTier:2, mult:4.5,    desc:'El maestro enmascarado. Water Breathing. Entrenó a todos.' },
    { key:'ds_kokushibo', label:'Kokushibo',   icon:'fa-solid fa-eye',           color:'#7c3aed', price:70000000,   price_usd:2300, gradeTier:3, mult:6,      desc:'El Upper Moon One. Seis ojos. La espada más letal de los demonios.' },
    { key:'ds_muzan',     label:'Muzan',       icon:'fa-solid fa-skull',         color:'#a855f7', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El progenitor. El demonio original. Absolutamente invencible.' },
];

async function loadDemonslayerPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('demonslayer-current-rank');
    if (curRankEl) {
        if (currentUser.demonslayerRank) {
            const r = DEMONSLAYER_RANKS.find(x => x.key === currentUser.demonslayerRank);
            curRankEl.textContent = r ? r.label : 'Sin respiración';
        } else {
            curRankEl.textContent = 'Sin rango';
        }
    }

    const grid = document.getElementById('demonslayer-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        DEMONSLAYER_RANKS.forEach(rank => {
            const isOwned = currentUser.demonslayerRank === rank.key;
            const canAffordPPC = bankAccount.balance >= rank.price;
            const needsBoth = rank.gradeTier >= 3;
            const canAffordUSD = (currentUser.pusdBalance || 0) >= rank.price_usd;
            const canAfford = needsBoth ? (canAffordPPC && canAffordUSD) : canAffordPPC;

            grid.innerHTML += `
                <div class="glass-card" style="border-color:${isOwned ? rank.color : 'var(--dark-border)'};">
                    <div style="width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${rank.color}22;border:2px solid ${rank.color};margin-bottom:10px;">
                        <i class="${rank.icon}" style="color:${rank.color};font-size:20px;"></i>
                    </div>
                    <div style="font-weight:700;color:${rank.color};">${rank.label}</div>
                    <div style="font-size:10px;color:var(--text-muted);margin:6px 0 10px;">${rank.desc}<br>Multiplicador +${Math.round((rank.mult - 1) * 100)}%</div>
                    <div style="display:flex;justify-content:center;gap:10px;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:bold;margin-bottom:6px;">
                        <span style="color:#22c55e;">${rank.price.toLocaleString()} PPC</span>
                        <span style="color:#ffd700;">$${rank.price_usd} P-USD</span>
                    </div>
                    ${needsBoth ? '<div style="font-size:9px;color:var(--danger);text-align:center;margin-bottom:8px;"><i class="fa-solid fa-triangle-exclamation"></i> Requiere ambos pagos</div>' : ''}
                    <button class="btn btn-full ${isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary'}"
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyDemonslayerRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Cazador Actual' : canAfford ? 'Cazar Demonios' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyDemonslayerRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = DEMONSLAYER_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Cazar Demonios', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡Respiración!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { demonslayerRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.demonslayerRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango Demon Slayer', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Cazador: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡呼吸!`, rank.color);
        loadDemonslayerPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
