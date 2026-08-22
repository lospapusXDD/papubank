/* ════════════════════════════════════════════════════════════
   MARVEL (MCU) — RANGOS DE VENGADORES
   ════════════════════════════════════════════════════════════ */

const MARVEL_RANKS = [
    { key:'marvel_hawkeye',   label:'Hawkeye',     icon:'fa-solid fa-bullseye',      color:'#a855f7', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'El arquero. Sin poderes, solo puntería perfecta. El más underrated.' },
    { key:'marvel_widow',     label:'Black Widow', icon:'fa-solid fa-spider',        color:'#ef4444', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'Natasha Romanoff. Espía letal. El Viudo Negro que nunca perdona.' },
    { key:'marvel_falcon',    label:'Falcon',      icon:'fa-solid fa-dove',          color:'#64748b', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'Sam Wilson con alas de vibranium. El Capitán América del futuro.' },
    { key:'marvel_spiderman', label:'Spider-Man',  icon:'fa-solid fa-spider',        color:'#ef4444', price:15000000,   price_usd:500,  gradeTier:2, mult:2.5,    desc:'Peter Parker. Sentido arácnido, copperarela. El amigable vecino.' },
    { key:'marvel_thor',      label:'Thor',        icon:'fa-solid fa-bolt',          color:'#3b82f6', price:25000000,   price_usd:850,  gradeTier:2, mult:3,      desc:'El Dios del Trueno. Mjolnir + Stormbreaker. El más poderoso de Asgard.' },
    { key:'marvel_ironman',   label:'Iron Man',    icon:'fa-solid fa-robot',         color:'#ef4444', price:35000000,   price_usd:1150, gradeTier:2, mult:3.5,    desc:'Tony Stark. Genio, multimillonario, playboy, filántropo. I am Iron Man.' },
    { key:'marvel_cap',       label:'Cap América', icon:'fa-solid fa-shield',        color:'#3b82f6', price:45000000,   price_usd:1500, gradeTier:2, mult:4,      desc:'Steve Rogers. El escudo de vibranium. Puedo hacer esto todo el día.' },
    { key:'marvel_strange',   label:'Dr. Strange', icon:'fa-solid fa-hat-wizard',    color:'#f97316', price:55000000,   price_usd:1800, gradeTier:2, mult:4.5,    desc:'El Hechicero Supremo. El tiempo es su arma. Multi-verso locura.' },
    { key:'marvel_hulk',      label:'Hulk',        icon:'fa-solid fa-hand-fist',     color:'#22c55e', price:65000000,   price_usd:2100, gradeTier:3, mult:5,      desc:'El gigante verde. Hulk SMASH. El más fuerte cuando se enoja.' },
    { key:'marvel_thanos',    label:'Thanos',      icon:'fa-solid fa-gem',           color:'#a855f7', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El Titano Loco. Guantelete del Infinito. balance era su destino.' },
];

async function loadMarvelPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('marvel-current-rank');
    if (curRankEl) {
        if (currentUser.marvelRank) {
            const r = MARVEL_RANKS.find(x => x.key === currentUser.marvelRank);
            curRankEl.textContent = r ? r.label : 'Sin poderes';
        } else {
            curRankEl.textContent = 'Sin poderes';
        }
    }

    const grid = document.getElementById('marvel-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        MARVEL_RANKS.forEach(rank => {
            const isOwned = currentUser.marvelRank === rank.key;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyMarvelRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Vengador Actual' : canAfford ? 'Unirme a los Vengadores' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyMarvelRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = MARVEL_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Unirse a los Vengadores', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡AVENGERS ASSEMBLE!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { marvelRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.marvelRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango Marvel', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Vengador: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡AVENGERS ASSEMBLE!`, rank.color);
        loadMarvelPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
