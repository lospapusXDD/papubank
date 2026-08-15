/* ════════════════════════════════════════════════════════════
   BEN 10 — RANGOS OMNITRIX (para el papu del Omnitrix)
   ════════════════════════════════════════════════════════════ */

const BEN10_RANKS = [
    { key:'ben10_heatblast',   label:'Heatblast',     icon:'fa-solid fa-fire',        color:'#ff7b3d', cls:'rank-ben10', price:2000000,    price_usd:100,   gradeTier:1, mult:1.5, desc:'El alien de fuego original. Calor extremo de estrella.' },
    { key:'ben10_wildmutt',    label:'Wildmutt',      icon:'fa-solid fa-paw',         color:'#d4a017', cls:'rank-ben10', price:3000000,    price_usd:120,   gradeTier:1, mult:1.6, desc:'Bestia sin ojos, olfato letal. El cazador del Omnitrix.' },
    { key:'ben10_greymatter',  label:'Grey Matter',   icon:'fa-solid fa-brain',       color:'#5eead4', cls:'rank-ben10', price:4000000,    price_usd:150,   gradeTier:1, mult:1.8, desc:'Un cerebro de 1 petabyte en un cuerpo diminuto.' },
    { key:'ben10_diamondhead', label:'Diamondhead',   icon:'fa-solid fa-gem',         color:'#4dd6ff', cls:'rank-ben10', price:5000000,    price_usd:200,   gradeTier:1, mult:2,   desc:'Cristal indestructible capaz de lanzar dagas de diamante.' },
    { key:'ben10_rippjaws',    label:'Ripjaws',       icon:'fa-solid fa-fish-fins',   color:'#2dd4bf', cls:'rank-ben10', price:7000000,    price_usd:250,   gradeTier:1, mult:2.2, desc:'Mandíbulas de tiburón. Aterrador dentro y fuera del agua.' },
    { key:'ben10_xlr8',        label:'XLR8',          icon:'fa-solid fa-bolt',        color:'#7b68ee', cls:'rank-ben10', price:10000000,   price_usd:350,   gradeTier:2, mult:2.5, desc:'El alien más veloz del universo. Imposible de alcanzar.' },
    { key:'ben10_stinkfly',    label:'Stinkfly',      icon:'fa-solid fa-bug',         color:'#4ade80', cls:'rank-ben10', price:12000000,   price_usd:420,   gradeTier:2, mult:2.7, desc:'Vuela y dispara asfalto pestilente. Tu peor pesadilla aérea.' },
    { key:'ben10_fourarms',    label:'Four Arms',     icon:'fa-solid fa-dumbbell',    color:'#ff4d4d', cls:'rank-ben10', price:18000000,   price_usd:600,   gradeTier:2, mult:3,   desc:'Cuatro brazos, fuerza teton. El brutal del equipo.' },
    { key:'ben10_upgrade',     label:'Upgrade',       icon:'fa-solid fa-robot',       color:'#22c55e', cls:'rank-ben10', price:24000000,   price_usd:800,   gradeTier:2, mult:3.5, desc:'Tecnología líquida. Se fusiona con cualquier máquina.' },
    { key:'ben10_ghostfreak',  label:'Ghostfreak',    icon:'fa-solid fa-ghost',       color:'#a56eff', cls:'rank-ben10', price:30000000,   price_usd:1000,  gradeTier:2, mult:4,   desc:'Fantasma interdimensional. Se esconde en tu sombra.' },
    { key:'ben10_cannonbolt',  label:'Cannonbolt',    icon:'fa-solid fa-bowling-ball',color:'#fbbf24', cls:'rank-ben10', price:40000000,   price_usd:1300,  gradeTier:2, mult:4.5, desc:'Se enrolla y arrasa todo a su paso. Bola de destrucción.' },
    { key:'ben10_waybig',      label:'Way Big',       icon:'fa-solid fa-meteor',      color:'#ff6b81', cls:'rank-ben10', price:50000000,   price_usd:1650,  gradeTier:3, mult:5,   desc:'Gigante cósmico de 200 metros. Destruye ciudades.' },
    { key:'ben10_swampfire',   label:'Swampfire',     icon:'fa-solid fa-seedling',    color:'#86efac', cls:'rank-ben10', price:65000000,   price_usd:2150,  gradeTier:3, mult:5.5, desc:'Fuego y plantas en un solo alien. Regeneración infinita.' },
    { key:'ben10_humungousaur',label:'Humungousaur',  icon:'fa-solid fa-dragon',     color:'#4ade80', cls:'rank-ben10', price:80000000,   price_usd:2650,  gradeTier:3, mult:6.5, desc:'Crece hasta 60 metros. Fuerza bruta nivel apocalipsis.' },
    { key:'ben10_alienx',      label:'Alien X',       icon:'fa-solid fa-star',        color:'#b0c4de', cls:'rank-ben10', price:90000000,   price_usd:3000,  gradeTier:3, mult:7,   desc:'Poder de reescribir la realidad. El más fuerte del Omnitrix.' },
];

const BEN10_ITEMS = [
    { id:'omnitrix_original', name:'Omnitrix Original', icon:'fa-solid fa-stopwatch', color:'#4ade80', price:20000, badge:'omnitrix', reward:10000,
      desc:'El reloj clásico. Te otorga el badge del Omnitrix y 10.000 PPC al instante.',
      pro:'El reloj original de Azmuth: confiable, simple y con los aliens de toda la vida.',
      con:'Sin evoluciones ni funciones avanzadas. La batería se agota fácil.' },
    { id:'omnitrix_recalibrado', name:'Omnitrix Recalibrado', icon:'fa-solid fa-stopwatch', color:'#60a5fa', price:100000, badge:'omnitrix_recal', reward:50000,
      desc:'Diseño Alien Force. Badge exclusivo + 50.000 PPC al instante.',
      pro:'Recalibrado por Azmuth: más aliens, mejor escaneo de ADN e interfaz nueva.',
      con:'Todavía sin formas Ultimate. Requiere tener el Original para usarlo bien.' },
    { id:'ultimatrix', name:'Ultimatrix', icon:'fa-solid fa-stopwatch', color:'#fbbf24', price:300000, badge:'ultimatrix', reward:150000,
      desc:'Versión Ultimate Alien. Badge + 150.000 PPC al instante.',
      pro:'¡Te da los SUPREMOS! Evoluciones simuladas de 1 millón de años de guerra. Poder bestial.',
      con:'Tiene un millón de fallos y es muy hackeable. Puede fallarte en la peor pelea.' },
    { id:'omnitrix_omniverse', name:'Omnitrix Omniverse', icon:'fa-solid fa-stopwatch', color:'#a78bfa', price:700000, badge:'omnitrix_omni', reward:300000,
      desc:'Interfaz Omniverse. Badge + 300.000 PPC al instante.',
      pro:'El Omnitrix definitivo de Azmuth: interfaz HD, aliens nuevos y máxima estabilidad.',
      con:'No tiene formas Ultimate ni fusiones. Más lujo que funcionalidad.' },
    { id:'biomnitrix', name:'Biomnitrix', icon:'fa-solid fa-stopwatch', color:'#ff6b6b', price:2000000, badge:'biomnitrix', reward:1000000,
      desc:'¡DOS relojes! Fusiones alienígenas. Doble badge + 1.000.000 PPC.',
      pro:'¡Fusiona aliens! Ej: Heatblast + Diamondhead = Diamante en llamas. Poder combinado.',
      con:'Solo 2 aliens a la vez y muy complejo de controlar. Si falla... falla doble.' },
];

async function loadBen10Page() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('ben10-current-rank');
    if (curRankEl) {
        if (currentUser.ben10Rank) {
            const br = BEN10_RANKS.find(x => x.key === currentUser.ben10Rank);
            curRankEl.textContent = br ? br.label : 'Sin transformación';
        } else {
            curRankEl.textContent = 'Sin transformación';
        }
    }

    const ranksGrid = document.getElementById('ben10-ranks-grid');
    if (ranksGrid) {
        ranksGrid.innerHTML = '';
        BEN10_RANKS.forEach(rank => {
            const isOwned = currentUser.ben10Rank === rank.key;
            const canAffordPPC = bankAccount.balance >= rank.price;
            const balanceUsd = currentUser.pusdBalance || 0;
            const canAffordUSD = balanceUsd >= rank.price_usd;
            const needsBoth = rank.gradeTier >= 3;
            const canAfford = needsBoth ? (canAffordPPC && canAffordUSD) : canAffordPPC;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyBen10Rank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Transformación Actual' : canAfford ? 'Transformarse' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }

    const itemEl = document.getElementById('ben10-item-card');
    if (itemEl) {
        const badges = bankAccount.badges || [];
        itemEl.style.display = 'flex';
        itemEl.style.flexWrap = 'wrap';
        itemEl.style.gap = '16px';
        itemEl.style.maxWidth = 'none';
        itemEl.innerHTML = BEN10_ITEMS.map(item => {
            const hasBadge = badges.includes(item.badge);
            const canAfford = bankAccount.balance >= item.price;
            return `
            <div class="glass-card text-center" style="flex:1;min-width:240px;max-width:300px;">
                <div style="font-size:36px;color:${item.color};margin-bottom:10px;"><i class="${item.icon}"></i></div>
                <div style="font-weight:700;color:${item.color};margin-bottom:4px;">${item.name}</div>
                <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px;">${item.desc}</div>
                <div style="text-align:left;font-size:10px;margin-bottom:8px;">
                    <div style="color:var(--secondary);margin-bottom:4px;"><i class="fa-solid fa-circle-check"></i> <strong>Beneficio:</strong> ${item.pro}</div>
                    <div style="color:var(--danger);"><i class="fa-solid fa-circle-xmark"></i> <strong>Contra:</strong> ${item.con}</div>
                </div>
                <div style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:13px;font-weight:bold;margin-bottom:10px;">${item.price.toLocaleString()} PPC</div>
                <button class="btn btn-full ${hasBadge ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary'}"
                    ${hasBadge || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyOmnitrixItem('${item.id}')"`}>
                    ${hasBadge ? '✓ ' + item.name + ' Equipado' : 'Equipar ' + item.name}
                </button>
                ${hasBadge ? `<div class="badge-tag" style="margin-top:8px;background:${item.color}22;color:${item.color};border-color:${item.color}55;font-size:10px;"><i class="${item.icon}"></i> Badge ${item.name} activo</div>` : ''}
            </div>`;
        }).join('');
    }
}

async function buyBen10Rank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = BEN10_RANKS.find(r => r.key === rankKey);
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
    const ok = await showConfirm('Transformación Omnitrix', `¿Transformarte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡Maldición, pensé que era una transformación... correcto!`);
    if (!ok) return;

    try {
        const db = window._db;
        if (needsBoth) {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: (currentUser.pusdBalance || 0) - rank.price_usd });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { ben10Rank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.ben10Rank = rankKey;
        grantRankLocal(rankKey);
        await addTx({ type: 'Rango Ben 10', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Transformación Omnitrix: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡AHORA ERES ${rank.label.toUpperCase()}!`, rank.color);
        loadBen10Page();
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyOmnitrixItem(itemId) {
    if (!currentUser || !bankAccount || !window._db) return;
    const item = BEN10_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    if (bankAccount.balance < item.price) { showToast('PPC insuficiente', '#ff4466'); return; }

    const ok = await showConfirm('Equipar ' + item.name, `¿Equipar el <strong style="color:${item.color}">${item.name}</strong> por ${item.price.toLocaleString()} PPC? Recibes ${item.reward.toLocaleString()} PPC al instante y el badge ${item.name} permanente.`);
    if (!ok) return;

    try {
        const db = window._db;
        const badge = item.badge;
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(item.reward - item.price),
            badges: window._fbArrayUnion(badge)
        });
        if (!bankAccount.badges) bankAccount.badges = [];
        if (!bankAccount.badges.includes(badge)) bankAccount.badges.push(badge);
        // Multiplier bonuses for higher tiers
        if (item.id === 'ultimatrix') {
            // Could add a multiplier field to bankAccount, but keeping simple
        }
        await addTx({ type: 'Item Ben 10', from: currentUser.nick, to: 'Banco', amount: item.price, note: `${item.name} equipado (badge + ${item.reward.toLocaleString()} PPC)` });
        showToast(`¡${item.name.toUpperCase()} EQUIPADO! ${item.reward.toLocaleString()} PPC + badge 💚`, item.color);
        loadBen10Page();
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}
