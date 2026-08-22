/* ════════════════════════════════════════════════════════════
   ATTACK ON TITAN — RANGOS DE LA LEGIÓN DE EXPLORACIÓN
   ════════════════════════════════════════════════════════════ */

const AOT_RANKS = [
    { key:'aot_sasha',     label:'Sasha',       icon:'fa-solid fa-drumstick-bite', color:'#f59e0b', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'La de la papa. Arquera letal. Su hambre es insaciable.' },
    { key:'aot_conny',     label:'Conny',       icon:'fa-solid fa-person-running', color:'#60a5fa', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'El campesino. Espadachín veloz. Su familia es todo.' },
    { key:'aot_jean',      label:'Jean',        icon:'fa-solid fa-horse',          color:'#94a3b8', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'El egoísta que se convirtió en héroe. Sable y adamantita.' },
    { key:'aot_levi',      label:'Levi',        icon:'fa-solid fa-skull',          color:'#64748b', price:20000000,   price_usd:650,  gradeTier:2, mult:2.5,    desc:'El soldado más fuerte. ODM Gear supremo. Té y limpieza.' },
    { key:'aot_hange',     label:'Hange',       icon:'fa-solid fa-flask',          color:'#f97316', price:30000000,   price_usd:1000, gradeTier:2, mult:3,      desc:'La comandante científica. Titanes y curiosidad sin límites.' },
    { key:'aot_erwin',     label:'Erwin',       icon:'fa-solid fa-flag',           color:'#ef4444', price:45000000,   price_usd:1500, gradeTier:2, mult:4,      desc:'El comandante. Su discurso te pone la piel de gallina. El hombre más valiente.' },
    { key:'aot_mikasa',    label:'Mikasa',      icon:'fa-solid fa-shield',         color:'#dc2626', price:55000000,   price_usd:1800, gradeTier:2, mult:4.5,    desc:'La Ackerman. La guerrera más letal. Protege a Eren con todo.' },
    { key:'aot_reiner',    label:'Reiner',      icon:'fa-solid fa-shield-halved',  color:'#78350f', price:65000000,   price_usd:2100, gradeTier:3, mult:5,      desc:'El Armored Titan. El traidor que quiso ser héroe.' },
    { key:'aot_eren',      label:'Eren',        icon:'fa-solid fa-bolt',           color:'#22c55e', price:80000000,   price_usd:2600, gradeTier:3, mult:6,      desc:'El Prometeus. Founding Titan + Attack Titan. Freedom.' },
    { key:'aot_ymir',      label:'Ymir Fritz',  icon:'fa-solid fa-crown',          color:'#a855f7', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'La primera titán. El poder de los dioses. La fundadora de todo.' },
];

async function loadAotPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('aot-current-rank');
    if (curRankEl) {
        if (currentUser.aotRank) {
            const r = AOT_RANKS.find(x => x.key === currentUser.aotRank);
            curRankEl.textContent = r ? r.label : 'Sin ODM';
        } else {
            curRankEl.textContent = 'Sin rango';
        }
    }

    const grid = document.getElementById('aot-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        AOT_RANKS.forEach(rank => {
            const isOwned = currentUser.aotRank === rank.key;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyAotRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Soldado Actual' : canAfford ? 'Unirme a la Legión' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyAotRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = AOT_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Unirme a la Legión', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡Sasageyo!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { aotRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.aotRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango AoT', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Legión: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡SASAGEYO!`, rank.color);
        loadAotPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
