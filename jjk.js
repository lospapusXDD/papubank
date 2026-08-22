/* JUJUTSU KAISEN - RANGOS DE HECHICEROS */

const JJK_RANKS = [
    { key:'jjk_toge',      label:'Toge Inumaki', icon:'fa-solid fa-comment',      color:'#a78bfa', price:2000000,    price_usd:80,   gradeTier:1, mult:1.5,   desc:'Cursed Speech. Solo dice ingredientes de arroz. Hermano de la serpiente.' },
    { key:'jjk_momo',      label:'Momo Nishimiya', icon:'fa-solid fa-wind',        color:'#60a5fa', price:4000000,    price_usd:150,  gradeTier:1, mult:1.75,  desc:'Wind and Butterflies. Vuela y espia. La bruja del viento.' },
    { key:'jjk_panda',     label:'Panda',         icon:'fa-solid fa-paw',          color:'#6b7280', price:8000000,    price_usd:280,  gradeTier:1, mult:2,      desc:'El panda con mazo. Trinee. No es un panda normal, es un hermano.' },
    { key:'jjk_mechamaru', label:'Mechamaru',     icon:'fa-solid fa-robot',        color:'#f97316', price:15000000,   price_usd:500,  gradeTier:2, mult:2.5,    desc:'El craneo perfecto. Puppet_master que controla todo desde lejos.' },
    { key:'jjk_nobara',    label:'Nobara',        icon:'fa-solid fa-hammer',       color:'#ef4444', price:20000000,   price_usd:650,  gradeTier:2, mult:3,      desc:'Resonance. Martillo, clavo y espejo. La hechicera mas swag.' },
    { key:'jjk_yuji',      label:'Yuji Itadori',  icon:'fa-solid fa-fist-raised',  color:'#f472b6', price:30000000,   price_usd:1000, gradeTier:2, mult:3.5,    desc:'El Vessel de Sukuna. Divergent Fist + Black Flash. El mas puro.' },
    { key:'jjk_todo',      label:'Aoi Todo',      icon:'fa-solid fa-brain',        color:'#fbbf24', price:40000000,   price_usd:1300, gradeTier:2, mult:4,      desc:'Boogie Woogie. El genio de 530,000,000 IQ. Tu tipo ideal es...' },
    { key:'jjk_megumi',    label:'Megumi Fushiguro', icon:'fa-solid fa-ghost',     color:'#3b82f6', price:50000000,   price_usd:1650, gradeTier:2, mult:4.5,    desc:'Ten Shadows. Mahoraga. El newUser con el potencial mas alto.' },
    { key:'jjk_gojo',      label:'Gojo Satoru',   icon:'fa-solid fa-eye',          color:'#22d3ee', price:70000000,   price_usd:2300, gradeTier:3, mult:6,      desc:'Infinity + Hollow Purple. El hechicero mas fuerte en 400 anos.' },
    { key:'jjk_sukuna',    label:'Sukuna',        icon:'fa-solid fa-skull',        color:'#dc2626', price:90000000,   price_usd:3000, gradeTier:3, mult:7,      desc:'El Rey de las Maldiciones. Cutting. Dismantle. La maldicion suprema.' }
];

async function loadJjkPage() {
    if (!currentUser || !bankAccount) return;
    const curRankEl = document.getElementById('jjk-current-rank');
    if (curRankEl) {
        if (currentUser.jjkRank) {
            const r = JJK_RANKS.find(x => x.key === currentUser.jjkRank);
            curRankEl.textContent = r ? r.label : 'Sin Cursed Energy';
        } else { curRankEl.textContent = 'Sin rango'; }
    }
    const grid = document.getElementById('jjk-ranks-grid');
    if (grid) {
        grid.innerHTML = '';
        JJK_RANKS.forEach(rank => {
            const isOwned = currentUser.jjkRank === rank.key;
            const canAffordPPC = bankAccount.balance >= rank.price;
            const needsBoth = rank.gradeTier >= 3;
            const canAffordUSD = (currentUser.pusdBalance || 0) >= rank.price_usd;
            const canAfford = needsBoth ? (canAffordPPC && canAffordUSD) : canAffordPPC;
            grid.innerHTML += '<div class="glass-card" style="border-color:' + (isOwned ? rank.color : 'var(--dark-border)') + ';"><div style="width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:' + rank.color + '22;border:2px solid ' + rank.color + ';margin-bottom:10px;"><i class="' + rank.icon + '" style="color:' + rank.color + ';font-size:20px;"></i></div><div style="font-weight:700;color:' + rank.color + ';">' + rank.label + '</div><div style="font-size:10px;color:var(--text-muted);margin:6px 0 10px;">' + rank.desc + '<br>Multiplicador +' + Math.round((rank.mult - 1) * 100) + '%</div><div style="display:flex;justify-content:center;gap:10px;font-family:Orbitron,sans-serif;font-size:12px;font-weight:bold;margin-bottom:6px;"><span style="color:#22c55e;">' + rank.price.toLocaleString() + ' PPC</span><span style="color:#ffd700;">$' + rank.price_usd + ' P-USD</span></div>' + (needsBoth ? '<div style="font-size:9px;color:var(--danger);text-align:center;margin-bottom:8px;"><i class="fa-solid fa-triangle-exclamation"></i> Requiere ambos pagos</div>' : '') + '<button class="btn btn-full ' + (isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary') + '" ' + (isOwned || !canAfford ? 'disabled style="opacity:0.6"' : 'onclick="buyJjkRank(\'' + rank.key + '\')"') + '><i class="' + rank.icon + '"></i> ' + (isOwned ? 'Hechicero Actual' : canAfford ? 'Despertar Cursed Energy' : 'Saldo Insuficiente') + '</button></div>';
        });
    }
}

async function buyJjkRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;
    const rank = JJK_RANKS.find(r => r.key === rankKey);
    if (!rank) return;
    const needsBoth = rank.gradeTier >= 3;
    const balanceUsd = currentUser.pusdBalance || 0;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) { showToast('Saldo insuficiente', '#ff4466'); return; }
    const payNote = needsBoth ? rank.price.toLocaleString() + ' PPC + $' + rank.price_usd + ' P-USD' : rank.price.toLocaleString() + ' PPC';
    const ok = await showConfirm('Despertar Cursed Energy', 'Convertirte en <strong style="color:' + rank.color + '">' + rank.label + '</strong> por ' + payNote + '?');
    if (!ok) return;
    try {
        const db = window._db;
        if (needsBoth) { await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: balanceUsd - rank.price_usd }); currentUser.pusdBalance = balanceUsd - rank.price_usd; }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { jjkRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.jjkRank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango JJK', from: currentUser.nick, to: 'Banco', amount: rank.price, note: 'Hechicero: ' + rank.label + (needsBoth ? ' (+' + rank.price_usd + ' P-USD)' : '') });
        showToast(rank.label.toUpperCase() + ' activado!', rank.color);
        loadJjkPage();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}
