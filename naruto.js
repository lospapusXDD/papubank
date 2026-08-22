/* ════════════════════════════════════════════════════════════
   NARUTO SHIPPUDEN — RANGOS NINJA
   ════════════════════════════════════════════════════════════ */

const NARUTO_RANKS = [
    { key:'naruto_hinata',  label:'Hinata',      icon:'fa-solid fa-heart',         color:'#a78bfa', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'Byakugan. La ninja más valiente que nunca se rinde. Gentle Fist.' },
    { key:'naruto_shikamaru', label:'Shikamaru', icon:'fa-solid fa-chess',         color:'#60a5fa', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'Sombras. El estratega más brillante. Troublesome, pero genial.' },
    { key:'naruto_kakashi', label:'Kakashi',     icon:'fa-solid fa-eye',           color:'#94a3b8', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'El ninja copia. Sharingan + Chidori. El mejor sensei.' },
    { key:'naruto_gaara',   label:'Gaara',       icon:'fa-solid fa-mountain',      color:'#f97316', price:15000000,   price_usd:500,  gradeTier:2, mult:2.5,    desc:'El kazekage de arena. Shukaku. De villano a héroe.' },
    { key:'naruto_sasuke',  label:'Sasuke',      icon:'fa-solid fa-bolt',          color:'#6366f1', price:25000000,   price_usd:850,  gradeTier:2, mult:3,      desc:'El último Uchiha. Rinnegan + Eternal Mangekyo. El rival eterno.' },
    { key:'naruto_jiraiya', label:'Jiraiya',     icon:'fa-solid fa-hat-wizard',    color:'#ef4444', price:35000000,   price_usd:1150, gradeTier:2, mult:3.5,    desc:'El sabio ermitaño. Rasengan. El padrino de Naruto.' },
    { key:'naruto_madara',  label:'Madara',      icon:'fa-solid fa-skull',         color:'#dc2626', price:50000000,   price_usd:1650, gradeTier:2, mult:4,      desc:'El legendario Uchiha. Susanoo. El hombre que desafió a todos.' },
    { key:'naruto_hashirama', label:'Hashirama', icon:'fa-solid fa-tree',          color:'#22c55e', price:65000000,   price_usd:2100, gradeTier:3, mult:5,      desc:'El Dios Shinobi. Wood Release. Fundó Konoha.' },
    { key:'naruto_naruto',  label:'Naruto',      icon:'fa-solid fa-flame',         color:'#f97316', price:80000000,   price_usd:2600, gradeTier:3, mult:6,      desc:'Hokage. Kurama + Six Paths. ¡NARUTOOO!' },
    { key:'naruto_itzachi', label:'Itachi',      icon:'fa-solid fa-crow',          color:'#7c3aed', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El genio Uchiha. Tsukuyomi. Sacrificó todo por su hermano.' },
];

async function loadNarutoPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('naruto-current-rank');
    if (curRankEl) {
        if (currentUser.narutoRank) {
            const r = NARUTO_RANKS.find(x => x.key === currentUser.narutoRank);
            curRankEl.textContent = r ? r.label : 'Sin chakra';
        } else {
            curRankEl.textContent = 'Sin ninjutsu';
        }
    }

    const grid = document.getElementById('naruto-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        NARUTO_RANKS.forEach(rank => {
            const isOwned = currentUser.narutoRank === rank.key;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyNarutoRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Ninja Actual' : canAfford ? 'Activar Chakra' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyNarutoRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = NARUTO_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Activar Chakra', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡Believe it!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { narutoRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.narutoRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango Naruto', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Ninja: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡BELIEVE IT!`, rank.color);
        loadNarutoPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
