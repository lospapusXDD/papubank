/* ════════════════════════════════════════════════════════════
   MY HERO ACADEMIA — RANGOS DE HÉROES (PLUS ULTRA!)
   ════════════════════════════════════════════════════════════ */

const MHA_RANKS = [
    { key:'mha_uraraka',   label:'Uraraka',       icon:'fa-solid fa-star',        color:'#ff69b4', cls:'rank-mha', price:2000000,    price_usd:100,   gradeTier:1, mult:1.5, desc:'Gravedad Cero. Flota, papu, flota. La heroína del espacio.' },
    { key:'mha_iida',      label:'Iida',          icon:'fa-solid fa-gauge-high',  color:'#4ade80', cls:'rank-mha', price:4000000,    price_usd:150,   gradeTier:1, mult:1.75, desc:'Motor en las piernas. Corre como rayo, llega siempre a tiempo.' },
    { key:'mha_todoroki',  label:'Todoroki',      icon:'fa-solid fa-snowflake',   color:'#60a5fa', cls:'rank-mha', price:8000000,    price_usd:280,   gradeTier:1, mult:2,   desc:'Hielo y fuego. La mitad de su corazón es puro calor.' },
    { key:'mha_bakugo',    label:'Bakugo',        icon:'fa-solid fa-fire',        color:'#fb923c', cls:'rank-mha', price:15000000,   price_usd:500,   gradeTier:2, mult:2.5, desc:'Explosión. Orgulloso, agresivo y el rey de las detonaciones.' },
    { key:'mha_deku',      label:'Deku',          icon:'fa-solid fa-bolt',        color:'#22c55e', cls:'rank-mha', price:25000000,   price_usd:850,   gradeTier:2, mult:3,   desc:'One For All. El sucesor del símbolo de la paz.' },
    { key:'mha_aizawa',    label:'Eraser Head',   icon:'fa-solid fa-eye',         color:'#6b7280', cls:'rank-mha', price:35000000,   price_usd:1150,  gradeTier:2, mult:3.5, desc:'Borrado de quirks. El héroe pro que nunca duerme.' },
    { key:'mha_endevor',   label:'Endeavor',      icon:'fa-solid fa-flame',       color:'#ff6b3d', cls:'rank-mha', price:45000000,   price_usd:1500,  gradeTier:2, mult:4,   desc:'Hellflame. El héroe número 1 del presente.' },
    { key:'mha_allmight',  label:'All Might',     icon:'fa-solid fa-dove',        color:'#ffd700', cls:'rank-mha', price:60000000,   price_usd:2000,  gradeTier:3, mult:5,   desc:'Símbolo de la Paz. ¡AQUÍ ESTOY! PLUS ULTRA!' },
    { key:'mha_shigaraki', label:'Shigaraki',     icon:'fa-solid fa-hand',        color:'#9d4edd', cls:'rank-mha', price:75000000,   price_usd:2500,  gradeTier:3, mult:6,   desc:'Decay. El líder de la Liga de Villanos.' },
    { key:'mha_allforone', label:'All For One',   icon:'fa-solid fa-skull',       color:'#4a1d96', cls:'rank-mha', price:90000000,   price_usd:3000,  gradeTier:3, mult:7,   desc:'El rey de los quirks robados. La sombra detrás de todo.' },
];

async function loadMhaPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('mha-current-rank');
    if (curRankEl) {
        if (currentUser.mhaRank) {
            const mr = MHA_RANKS.find(x => x.key === currentUser.mhaRank);
            curRankEl.textContent = mr ? mr.label : 'Sin quirk';
        } else {
            curRankEl.textContent = 'Sin quirk';
        }
    }

    const ranksGrid = document.getElementById('mha-ranks-grid');
    if (ranksGrid) {
        ranksGrid.innerHTML = '';
        MHA_RANKS.forEach(rank => {
            const isOwned = currentUser.mhaRank === rank.key;
            const canAffordPPC = bankAccount.balance >= rank.price;
            const balanceUsd = currentUser.pusdBalance || 0;
            const canAffordUSD = balanceUsd >= rank.price_usd;
            const needsBoth = rank.gradeTier >= 3;
            const canAfford = needsBoth ? (canAffordPPC && canAffordUSD) : canAffordPPC;
            const tierLabel = needsBoth ? 'Requiere ambos pagos' : rank.gradeTier === 2 ? 'Solo PPC' : 'Solo PPC';
            ranksGrid.innerHTML += `
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyMhaRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Héroe Actual' : canAfford ? 'Obtener Quirk' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyMhaRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = MHA_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const balanceUsd = currentUser.pusdBalance || 0;
    const needsBoth = rank.gradeTier >= 3;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth
        ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD`
        : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Obtener Quirk', `¿Despertar el quirk <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡PLUS ULTRA!`);
    if (!ok) return;

    try {
        const db = window._db;
        const updates = { balance: window._fbIncrement(-rank.price) };
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), updates);
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: (currentUser.pusdBalance || 0) - rank.price_usd });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { mhaRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.mhaRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango MHA', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Quirk MHA: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡PLUS ULTRA!`, rank.color);
        loadMhaPage();
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
