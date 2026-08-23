/* ════════════════════════════════════════════════════════════
   BLUE LOCK — RANGOS DE EGOCENTRISMO
   ════════════════════════════════════════════════════════════ */

const BLUELOCK_RANKS = [
    { key:'bl_kunigami',   label:'Kunigami',    icon:'fa-solid fa-bolt',          color:'#ef4444', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'El héroe. Hero Rule: never give up. Un tiro de fuego que no se apaga.' },
    { key:'bl_chigiri',    label:'Chigiri',     icon:'fa-solid fa-person-running', color:'#f472b6', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'La velocidad pura. Hyoma Chigiri corre más rápido que la pelota.' },
    { key:'bl_bachira',    label:'Bachira',     icon:'fa-solid fa-dragon',        color:'#facc15', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'El monstruo interior. Dribling impredecible. Su genio es caótico.' },
    { key:'bl_rin',        label:'Rin Itoshi',  icon:'fa-solid fa-skull',         color:'#6366f1', price:15000000,   price_usd:500,  gradeTier:2, mult:2.5,    desc:'El genio prodigio. Shooting God. El rival número 1 de todo Blue Lock.' },
    { key:'bl_shidou',     label:'Shidou',      icon:'fa-solid fa-fire-flame-curved', color:'#ef4444', price:20000000, price_usd:650,  gradeTier:2, mult:3,      desc:'El demonio. Instinto puro. Dispara desde cualquier ángulo.' },
    { key:'bl_isagi',      label:'Isagi',       icon:'fa-solid fa-eye',           color:'#22d3ee', price:30000000,   price_usd:1000, gradeTier:2, mult:3.5,    desc:'El protagonista. Meta Vision + Direct Shot. Evoluciona cada partido.' },
    { key:'bl_kaiser',     label:'Kaiser',      icon:'fa-solid fa-crown',         color:'#818cf8', price:45000000,   price_usd:1500, gradeTier:2, mult:4,      desc:'El emperador. Kaiser Impact: el tiro más rápido del mundo.' },
    { key:'bl_noel',       label:'Noel Noa',    icon:'fa-solid fa-trophy',        color:'#fbbf24', price:60000000,   price_usd:2000, gradeTier:3, mult:5,      desc:'El número 1 mundial. La leyenda viva del fútbol egoísta.' },
    { key:'bl_lavinho',    label:'Lavinho',     icon:'fa-solid fa-music',         color:'#a78bfa', price:75000000,   price_usd:2500, gradeTier:3, mult:6,      desc:'El maestro del dribling. Samba football. La elegancia hecha gol.' },
    { key:'bl_gagamaru',   label:'Gagamaru',    icon:'fa-solid fa-shield',        color:'#6ee7b7', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El portero salvaje. Reflejos de gato. Nadie le mete gol fácil.' },
];

async function loadBluelockPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('bluelock-current-rank');
    if (curRankEl) {
        if (currentUser.bluelockRank) {
            const r = BLUELOCK_RANKS.find(x => x.key === currentUser.bluelockRank);
            curRankEl.textContent = r ? r.label : 'Sin egoísmo';
        } else {
            curRankEl.textContent = 'Sin striker';
        }
    }

    const grid = document.getElementById('bluelock-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        BLUELOCK_RANKS.forEach(rank => {
            const isOwned = currentUser.bluelockRank === rank.key;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyBluelockRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Striker Actual' : canAfford ? 'Activar Ego' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyBluelockRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = BLUELOCK_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Activar Ego', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡EGO IS THE WAY!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd });
            currentUser.pusdBalance = balanceUsd - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { bluelockRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.bluelockRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango Blue Lock', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Striker: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()}! ¡EGO ACTIVADO!`, rank.color);
        loadBluelockPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
