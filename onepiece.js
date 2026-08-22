/* ════════════════════════════════════════════════════════════
   ONE PIECE — RANGOS DE LA TRIPULACIÓN
   ════════════════════════════════════════════════════════════ */

const ONEPIECE_RANKS = [
    { key:'op_usopp',      label:'Usopp',       icon:'fa-solid fa-crosshairs',    color:'#f59e0b', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'El francotirador. Miente como un campeón pero siempre llega cuando importa.' },
    { key:'op_nami',       label:'Nami',        icon:'fa-solid fa-cloud-sun',     color:'#f97316', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'La navegante. Roba tu dinero y tu corazón. Clima-tact en mano.' },
    { key:'op_sanji',      label:'Sanji',       icon:'fa-solid fa-fire',          color:'#ef4444', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'El cocinero. Patadas de fuego y coleta dorada. Nunca pega a una mujer.' },
    { key:'op_zoro',       label:'Zoro',        icon:'fa-solid fa-khanda',        color:'#22c55e', price:15000000,   price_usd:500,  gradeTier:2, mult:2.5,    desc:'El espadachín. Tres espadas, cero sentido de orientación. futura leyenda.' },
    { key:'op_luffy',      label:'Luffy',       icon:'fa-solid fa-skull-crossbones', color:'#dc2626', price:25000000, price_usd:850,  gradeTier:2, mult:3,      desc:'Gomu Gomu no... ¡NIKA! El hombre de goma que será Rey de los Piratas.' },
    { key:'op_jinbe',      label:'Jinbe',       icon:'fa-solid fa-water',         color:'#0ea5e9', price:35000000,   price_usd:1150, gradeTier:2, mult:3.5,    desc:'El timón. Karate del mar. Leal al sombrero de paja desde Fish-Man.' },
    { key:'op_robin',      label:'Robin',       icon:'fa-solid fa-book-open',     color:'#8b5cf6', price:45000000,   price_usd:1500, gradeTier:2, mult:4,      desc:'La arqueóloga. Hana Hana no Mi. Quiere conocer la Void Century.' },
    { key:'op_franky',     label:'Franky',      icon:'fa-solid fa-robot',         color:'#3b82f6', price:55000000,   price_usd:1800, gradeTier:2, mult:4.5,    desc:'El shipwright. CyborgShip. ¡SUPERRRRR!' },
    { key:'op_brook',      label:'Brook',       icon:'fa-solid fa-music',         color:'#a855f7', price:65000000,   price_usd:2100, gradeTier:3, mult:5,      desc:'El músico. Revive con el Yomi Yomi no Mi. Pide ver panties, pero es puro corazón.' },
    { key:'op_chopper',    label:'Chopper',     icon:'fa-solid fa-paw',           color:'#ec4899', price:75000000,   price_usd:2500, gradeTier:3, mult:6,      desc:'El médico. Rumble Ball. El reno más cute del Grand Line.' },
];

async function loadOnepiecePage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('onepiece-current-rank');
    if (curRankEl) {
        if (currentUser.onepieceRank) {
            const r = ONEPIECE_RANKS.find(x => x.key === currentUser.onepieceRank);
            curRankEl.textContent = r ? `${r.label} — ${r.desc.split('.')[0]}` : 'Sin rango';
        } else {
            curRankEl.textContent = 'Sin tripulación';
        }
    }

    const grid = document.getElementById('onepiece-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        ONEPIECE_RANKS.forEach(rank => {
            const isOwned = currentUser.onepieceRank === rank.key;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyOnepieceRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Tripulación Actual' : canAfford ? 'Unirse a la Tripulación' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyOnepieceRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = ONEPIECE_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Unirse a la Tripulación', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}?`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { onepieceRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.onepieceRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango One Piece', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Tripulación: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡Vamos a ser el Rey de los Piratas!', rank.color);
        loadOnepiecePage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
