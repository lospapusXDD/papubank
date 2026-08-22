/* HUNTER X HUNTER - RANGOS DE CAZADORES */

const HXH_RANKS = [
    { key:'hxh_kurapika',  label:'Kurapika',    icon:'fa-solid fa-link',          color:'#ef4444', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'Los Kurta. Chain Jail. La venganza es su motor.' },
    { key:'hxh_leorio',    label:'Leorio',      icon:'fa-solid fa-stethoscope',    color:'#3b82f6', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'El doctor. Passion Punch. El corazon del grupo.' },
    { key:'hxh_killua',    label:'Killua',      icon:'fa-solid fa-bolt',           color:'#a78bfa', price:10000000,   price_usd:350,  gradeTier:1, mult:2,      desc:'El asesino. Godspeed. El Zoldyck mas rebelde.' },
    { key:'hxh_gon',       label:'Gon',         icon:'fa-solid fa-hand-fist',      color:'#22c55e', price:20000000,   price_usd:650,  gradeTier:2, mult:2.5,    desc:'Jajanken: Rock, Paper, Scissors. El cazador mas puro.' },
    { key:'hxh_alluka',    label:'Alluka',      icon:'fa-solid fa-gamepad',        color:'#ec4899', price:30000000,   price_usd:1000, gradeTier:2, mult:3,      desc:'El hada. Wish granting. El poder mas roto de HxH.' },
    { key:'hxh_meruem',    label:'Meruem',      icon:'fa-solid fa-chess-king',     color:'#f97316', price:50000000,   price_usd:1650, gradeTier:2, mult:4,      desc:'El Rey de las Hormigas. El ser mas perfecto. Nen puro.' },
    { key:'hxh_netero',    label:'Netero',      icon:'fa-solid fa-pray',           color:'#64748b', price:65000000,   price_usd:2100, gradeTier:3, mult:5,      desc:'El presidente. 100-Type Guanyin. La oracion mas rapida.' },
    { key:'hxh_chrollo',   label:'Chrollo',     icon:'fa-solid fa-book',           color:'#7c3aed', price:75000000,   price_usd:2500, gradeTier:3, mult:6,      desc:'El lider de la Trupe. Skill Hunter. El genio del robo.' },
    { key:'hxh_ging',      label:'Ging',        icon:'fa-solid fa-mountain',       color:'#f59e0b', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El padre de Gon. El mejor Nen user. No le importa nada.' }
];

async function loadHunterxhunterPage() {
    if (!currentUser || !bankAccount) return;
    const curRankEl = document.getElementById('hunterxhunter-current-rank');
    if (curRankEl) {
        if (currentUser.hunterxhunterRank) {
            const r = HXH_RANKS.find(x => x.key === currentUser.hunterxhunterRank);
            curRankEl.textContent = r ? r.label : 'Sin Nen';
        } else { curRankEl.textContent = 'Sin rango'; }
    }
    const grid = document.getElementById('hunterxhunter-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        HXH_RANKS.forEach(rank => {
            const isOwned = currentUser.hunterxhunterRank === rank.key;
            const canAffordPPC = bankAccount.balance >= rank.price;
            const needsBoth = rank.gradeTier >= 3;
            const canAffordUSD = (currentUser.pusdBalance || 0) >= rank.price_usd;
            const canAfford = needsBoth ? (canAffordPPC && canAffordUSD) : canAffordPPC;
            grid.innerHTML += '<div class="glass-card" style="border-color:' + (isOwned ? rank.color : 'var(--dark-border)') + ';"><div style="width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:' + rank.color + '22;border:2px solid ' + rank.color + ';margin-bottom:10px;"><i class="' + rank.icon + '" style="color:' + rank.color + ';font-size:20px;"></i></div><div style="font-weight:700;color:' + rank.color + ';">' + rank.label + '</div><div style="font-size:10px;color:var(--text-muted);margin:6px 0 10px;">' + rank.desc + '<br>Multiplicador +' + Math.round((rank.mult - 1) * 100) + '%</div><div style="display:flex;justify-content:center;gap:10px;font-family:Orbitron,sans-serif;font-size:12px;font-weight:bold;margin-bottom:6px;"><span style="color:#22c55e;">' + rank.price.toLocaleString() + ' PPC</span><span style="color:#ffd700;">$' + rank.price_usd + ' P-USD</span></div>' + (needsBoth ? '<div style="font-size:9px;color:var(--danger);text-align:center;margin-bottom:8px;"><i class="fa-solid fa-triangle-exclamation"></i> Requiere ambos pagos</div>' : '') + '<button class="btn btn-full ' + (isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary') + '" ' + (isOwned || !canAfford ? 'disabled style="opacity:0.6"' : 'onclick="buyHunterxhunterRank(\'' + rank.key + '\')"') + '><i class="' + rank.icon + '"></i> ' + (isOwned ? 'Cazador Actual' : canAfford ? 'Activar Nen' : 'Saldo Insuficiente') + '</button></div>';
        });
    }
}

async function buyHunterxhunterRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;
    const rank = HXH_RANKS.find(r => r.key === rankKey);
    if (!rank) return;
    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) { showToast('Saldo insuficiente', '#ff4466'); return; }
    const payNote = needsBoth ? rank.price.toLocaleString() + ' PPC + $' + rank.price_usd + ' P-USD' : rank.price.toLocaleString() + ' PPC';
    const ok = await showConfirm('Activar Nen', 'Convertirte en <strong style="color:' + rank.color + '">' + rank.label + '</strong> por ' + payNote + '?');
    if (!ok) return;
    try {
        const db = window._db;
        if (needsBoth) { await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd }); currentUser.pusdBalance = balanceUsd - rank.price_usd; }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { hunterxhunterRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.hunterxhunterRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango HxH', from: currentUser.nick, to: 'Banco', amount: rank.price, note: 'Cazador: ' + rank.label + (needsBoth ? ' (+' + rank.price_usd + ' P-USD)' : '') });
        showToast(rank.label.toUpperCase() + ' activado!', rank.color);
        loadHunterxhunterPage();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}
