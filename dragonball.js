/* ════════════════════════════════════════════════════════════
   DRAGON BALL Z — RANGOS GUERREROS
   ════════════════════════════════════════════════════════════ */

const DRAGONBALL_RANKS = [
    { key:'db_yamcha',     label:'Yamcha',      icon:'fa-solid fa-baseball',       color:'#f59e0b', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'El bandido del desierto. Ball: la definitiva (pero le gana un Saibaman).' },
    { key:'db_krillin',    label:'Krillin',     icon:'fa-solid fa-sun',            color:'#fbbf24', price:4000000,    price_usd:110,  gradeTier:1, mult:1.5,   desc:'El humano más fuerte. Destructo Disc. Siempre muere primero.' },
    { key:'db_piccolo',    label:'Piccolo',     icon:'fa-solid fa-hand',           color:'#22c55e', price:8000000,    price_usd:280,  gradeTier:1, mult:1.75,  desc:'El namekiano. Special Beam Cannon. El padre adoptivo de Gohan.' },
    { key:'db_vegeta',     label:'Vegeta',      icon:'fa-solid fa-crown',          color:'#3b82f6', price:20000000,   price_usd:650,  gradeTier:2, mult:2.5,    desc:'El Príncipe de los Saiyajin. Big Bang Attack. NUNCA se rinde.' },
    { key:'db_gohan',      label:'Gohan',       icon:'fa-solid fa-graduation-cap', color:'#a78bfa', price:35000000,   price_usd:1150, gradeTier:2, mult:3,      desc:'El potencial oculto. Masenko + Kamehameha. El más fuerte cuando se enoja.' },
    { key:'db_goku',       label:'Goku',        icon:'fa-solid fa-fire',           color:'#ef4444', price:50000000,   price_usd:1650, gradeTier:2, mult:4,      desc:'El Saiyajin defensor. Ultra Instinct. KAMEHAMEHAAAA!' },
    { key:'db_broly',      label:'Broly',       icon:'fa-solid fa-bolt',           color:'#22c55e', price:65000000,   price_usd:2100, gradeTier:3, mult:5,      desc:'El Saiyajin legendario. Poder puro. La furia hecha universo.' },
    { key:'db_beerus',     label:'Beerus',      icon:'fa-solid fa-ghost',          color:'#7c3aed', price:80000000,   price_usd:2600, gradeTier:3, mult:6,      desc:'El Dios de la Destrucción. Hakai. Dormilón profesional.' },
    { key:'db_frieza',     label:'Freezer',     icon:'fa-solid fa-skull',          color:'#a855f7', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El emperador del universo. Death Beam. El villano más icónico.' },
];

async function loadDragonballPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('dragonball-current-rank');
    if (curRankEl) {
        if (currentUser.dragonballRank) {
            const r = DRAGONBALL_RANKS.find(x => x.key === currentUser.dragonballRank);
            curRankEl.textContent = r ? r.label : 'Sin ki';
        } else {
            curRankEl.textContent = 'Sin poder';
        }
    }

    const grid = document.getElementById('dragonball-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        DRAGONBALL_RANKS.forEach(rank => {
            const isOwned = currentUser.dragonballRank === rank.key;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyDragonballRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Guerrero Actual' : canAfford ? 'Entrenar Ki' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyDragonballRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = DRAGONBALL_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Entrenar Ki', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡KAMEHAMEHA!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { dragonballRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.dragonballRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango Dragon Ball', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Guerrero: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡KAMEHAMEHA!`, rank.color);
        loadDragonballPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
