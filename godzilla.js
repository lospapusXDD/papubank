/* ════════════════════════════════════════════════════════════
   GODZILLA — VERSIONES CANÓNICAS DE PELÍCULA (REY DE LOS MONSTRUOS)
   ════════════════════════════════════════════════════════════ */

const GODZILLA_RANKS = [
    { key:'godzilla_54',      label:'Gojira 1954',      icon:'fa-solid fa-radiation',    color:'#86efac', cls:'rank-godzilla', price:2000000,    price_usd:100,   gradeTier:1, mult:1.5, desc:'El original. Nacido de la bomba. El terror que despertó al mundo.' },
    { key:'godzilla_showa',   label:'Godzilla Showa',   icon:'fa-solid fa-wave-square',  color:'#4ade80', cls:'rank-godzilla', price:4000000,    price_usd:150,   gradeTier:1, mult:1.8, desc:'Era Showa. De villano a defensor de la Tierra. El más clásico.' },
    { key:'godzilla_84',      label:'Godzilla 1984',    icon:'fa-solid fa-volcano',      color:'#60a5fa', cls:'rank-godzilla', price:8000000,    price_usd:280,   gradeTier:1, mult:2,   desc:'Heisei. Regresó más fuerte que nunca, con aliento nuclear azul.' },
    { key:'godzilla_baby',    label:'Godzilla Baby',    icon:'fa-solid fa-baby',         color:'#fca5a5', cls:'rank-godzilla', price:3000000,    price_usd:120,   gradeTier:1, mult:1.6, desc:'El más cute y amado. Pequeño pero con un corazón de kaiju.' },
    { key:'godzilla_burning', label:'Burning Godzilla', icon:'fa-solid fa-fire-flame-curved', color:'#ffb347', cls:'rank-godzilla', price:15000000, price_usd:500,   gradeTier:2, mult:2.5, desc:'1995. Al borde de la fusión nuclear. El más peligroso de Heisei.' },
    { key:'godzilla_2000',    label:'Godzilla 2000',    icon:'fa-solid fa-arrow-trend-up', color:'#fbbf24', cls:'rank-godzilla', price:25000000, price_usd:850,   gradeTier:2, mult:3,   desc:'Millennium. Regeneración total y aliento naranja devastador.' },
    { key:'godzilla_fw',      label:'Godzilla Final Wars', icon:'fa-solid fa-crosshairs', color:'#fb923c', cls:'rank-godzilla', price:35000000, price_usd:1150,  gradeTier:2, mult:3.5, desc:'2004. El luchador definitivo. Destruyó a todos los kaijus.' },
    { key:'godzilla_2014',    label:'Godzilla Legendary', icon:'fa-solid fa-mountain',   color:'#38bdf8', cls:'rank-godzilla', price:45000000, price_usd:1500,  gradeTier:2, mult:4,   desc:'MonsterVerse. Coloso de 108 metros que emerge del mar.' },
    { key:'godzilla_evo',     label:'Godzilla 2024 Evolution', icon:'fa-solid fa-dna',  color:'#4ade80', cls:'rank-godzilla', price:50000000, price_usd:1650,  gradeTier:2, mult:4.2, desc:'Godzilla Evolved. Forma evolucionada con espinas rosadas y poder aumentado.' },
    { key:'super_godzilla',   label:'Super Godzilla',   icon:'fa-solid fa-bolt',         color:'#facc15', cls:'rank-godzilla', price:52000000, price_usd:1700,  gradeTier:2, mult:4.3, desc:'La forma suprema de Heisei. Poder combinado con el Energy Booster.' },
    { key:'space_godzilla',   label:'SpaceGodzilla',    icon:'fa-solid fa-star',         color:'#c084fc', cls:'rank-godzilla', price:58000000, price_usd:1900,  gradeTier:3, mult:4.8, desc:'Nacido de las células de Godzilla en el espacio. Cristales de destrucción.' },
    { key:'godzilla_shin',    label:'Shin Godzilla',    icon:'fa-solid fa-dna',          color:'#e879f9', cls:'rank-godzilla', price:55000000, price_usd:1800,  gradeTier:3, mult:4.5, desc:'2016. Evolución infinita. Ojos muertos y rayos de plasma violeta.' },
    { key:'godzilla_hell',    label:'Godzilla in the Hell', icon:'fa-solid fa-fire',      color:'#dc2626', cls:'rank-godzilla', price:70000000, price_usd:2300,  gradeTier:3, mult:5.2, desc:'Non-canon. Godzilla descendió al infierno y peleó contra demonios. Poder absurdo.' },
    { key:'godzilla_blood',   label:'Godzilla Bloodbath', icon:'fa-solid fa-droplet',    color:'#991b1b', cls:'rank-godzilla', price:72000000, price_usd:2350,  gradeTier:3, mult:5.3, desc:'Non-canon. Baño de sangre kaiju. La versión más violenta y salvaje.' },
    { key:'godzilla_suit',    label:'Godzilla in the Suit', icon:'fa-solid fa-user-ninja', color:'#78716c', cls:'rank-godzilla', price:48000000, price_usd:1600,  gradeTier:2, mult:4.1, desc:'Non-canon. El clásico suitmation. Godzilla real con traje de actor.' },
    { key:'godzilla_hakaishin', label:'Godzilla Hakaishin', icon:'fa-solid fa-skull-crossbones', color:'#fef08a', cls:'rank-godzilla', price:95000000, price_usd:3100, gradeTier:3, mult:7, desc:'Non-canon. El más roto. Dios de la destrucción. Nivel imparable.' },
    { key:'godzilla_kotm',    label:'King of Monsters', icon:'fa-solid fa-crown',        color:'#ff4466', cls:'rank-godzilla', price:65000000, price_usd:2200,  gradeTier:3, mult:5,   desc:'2019. Aliento atómico rojo. Derrotó a Ghidorah en Boston.' },
    { key:'godzilla_gvk',     label:'Godzilla vs Kong', icon:'fa-solid fa-hand-fist',    color:'#a78bfa', cls:'rank-godzilla', price:75000000, price_usd:2500,  gradeTier:3, mult:5.5, desc:'2021. Modo termonuclear. El rey que no cae ante nadie.' },
    { key:'godzilla_minus1',  label:'Godzilla Minus One', icon:'fa-solid fa-skull',      color:'#9d4edd', cls:'rank-godzilla', price:85000000, price_usd:2800,  gradeTier:3, mult:6,   desc:'2023. El más letal del cine. La amenaza del Japón de posguerra.' },
    { key:'godzilla_earth',   label:'Godzilla Earth',   icon:'fa-solid fa-earth-americas', color:'#22c55e', cls:'rank-godzilla', price:90000000, price_usd:3000,  gradeTier:3, mult:7,   desc:'Anime. 300 metros de vegetación y furia. El Godzilla más grande de todos.' },
    { key:'kong',             label:'Kong',             icon:'fa-solid fa-hand-fist',    color:'#a16207', cls:'rank-kaiju', price:30000000,  price_usd:1000,  gradeTier:2, mult:3,   desc:'El Rey de la Isla Calavera. Titan primedio que protege a los suyos.' },
    { key:'king_ghidorah',    label:'King Ghidorah',    icon:'fa-solid fa-dragon',       color:'#facc15', cls:'rank-kaiju', price:80000000,  price_usd:2600,  gradeTier:3, mult:6,   desc:'El Dragón de Tres Cabezas. El némesis definitivo de Godzilla.' },
    { key:'muto_hembra',      label:'MUTO Hembra',      icon:'fa-solid fa-spider',       color:'#57534e', cls:'rank-kaiju', price:20000000,  price_usd:700,   gradeTier:2, mult:2.5, desc:'MUTO femenina. Parasito radiactivo que caza kaijus.' },
    { key:'muto_macho',       label:'MUTO Macho',       icon:'fa-solid fa-bug',          color:'#44403c', cls:'rank-kaiju', price:18000000,  price_usd:600,   gradeTier:1, mult:2.3, desc:'MUTO masculino. Alas de estaca y brazos de arrastre.' },
    { key:'muto_prime',       label:'MUTO Prime',       icon:'fa-solid fa-burst',        color:'#292524', cls:'rank-kaiju', price:55000000,  price_usd:1800,  gradeTier:3, mult:4.5, desc:'La progenitora de los MUTO. Fuente de toda la raza parasitaria.' },
    { key:'cyla',             label:'Cylla',            icon:'fa-solid fa-worm',         color:'#0d9488', cls:'rank-kaiju', price:25000000,  price_usd:850,   gradeTier:2, mult:3,   desc:'Kaiju acuático. Depredador del océano profundo.' },
    { key:'skar_king',        label:'Skar King',        icon:'fa-solid fa-skull',        color:'#b91c1c', cls:'rank-kaiju', price:60000000,  price_usd:2000,  gradeTier:3, mult:5,   desc:'El Tirano Simio. Esclavizó titans con su látigo de hueso.' },
    { key:'shimo',            label:'Shimo',            icon:'fa-solid fa-snowflake',    color:'#bae6fd', cls:'rank-kaiju', price:62000000,  price_usd:2050,  gradeTier:3, mult:5.1, desc:'La Titan Primordial del Hielo. Poder de congelación absoluto.' },
    { key:'mecha_godzilla',   label:'Mecha Godzilla',   icon:'fa-solid fa-robot',        color:'#94a3b8', cls:'rank-kaiju', price:70000000,  price_usd:2300,  gradeTier:3, mult:5.2, desc:'Mecagodzilla. Arma definitiva del Monarch construida para destruir titans.' },
    { key:'destroyah',        label:'Destoroyah',       icon:'fa-solid fa-hat-wizard',   color:'#7f1d1d', cls:'rank-kaiju', price:95000000,  price_usd:3100,  gradeTier:3, mult:7,   desc:'El más cheto. Nacido de la Oxygen Destroyer. Micro-organismos destructivos.' }
];

const GODZILLA_ACHIEVEMENTS = [
    { id: 'first_godzilla', icon: 'fa-solid fa-radiation', name: 'Primer Rugido', desc: 'Compra tu primer rango de Godzilla.', reward: 2000 },
    { id: 'collect_5_gz', icon: 'fa-solid fa-dragon', name: 'Cinco Formas', desc: 'Obtén 5 rangos de Godzilla.', reward: 15000 },
    { id: 'collect_15_gz', icon: 'fa-solid fa-crown', name: 'Rey de los Monstruos', desc: 'Obtén 15 rangos de Godzilla.', reward: 50000 },
    { id: 'collect_all_gz', icon: 'fa-solid fa-skull-crossbones', name: 'Dios del Caos', desc: 'Colecciona los 31 rangos.', reward: 250000 },
    { id: 'hakaishin_rank', icon: 'fa-solid fa-skull-crossbones', name: 'Hakaishin Supremo', desc: 'Alcanza el rango Godzilla Hakaishin.', reward: 300000 },
    { id: 'destroyah_rank', icon: 'fa-solid fa-hat-wizard', name: 'El Más Cheto', desc: 'Alcanza el rango Destoroyah.', reward: 300000 },
    { id: 'king_kaiju', icon: 'fa-solid fa-hand-fist', name: 'Rey de los Kaijus', desc: 'Obtén 5 rangos de la categoría Kaijus.', reward: 100000 }
];

async function loadGodzillaPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('godzilla-current-rank');
    if (curRankEl) {
        if (currentUser.godzillaRank) {
            const gr = GODZILLA_RANKS.find(x => x.key === currentUser.godzillaRank);
            curRankEl.textContent = gr ? gr.label : 'Sin forma';
        } else {
            curRankEl.textContent = 'Sin forma';
        }
    }

    const ranksGrid = document.getElementById('godzilla-ranks-grid');
    if (ranksGrid) {
        ranksGrid.innerHTML = '';
        GODZILLA_RANKS.forEach(rank => {
            const isOwned = currentUser.godzillaRank === rank.key;
            const canAffordPPC = bankAccount.balance >= rank.price;
            const balanceUsd = bankAccount.balance_usd || 0;
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
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyGodzillaRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Forma Actual' : canAfford ? 'Despertar al Rey' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }
}

async function buyGodzillaRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = GODZILLA_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const balanceUsd = bankAccount.balance_usd || 0;
    const needsBoth = rank.gradeTier >= 3;
    if (bankAccount.balance < rank.price || (needsBoth && balanceUsd < rank.price_usd)) {
        showToast('Saldo insuficiente', '#ff4466');
        return;
    }

    const payNote = needsBoth
        ? `${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD`
        : `${rank.price.toLocaleString()} PPC`;
    const ok = await showConfirm('Despertar a Godzilla', `¿Despertar la forma <strong style="color:${rank.color}">${rank.label}</strong> por ${payNote}? ¡GOJIRA DESPIERTA!`);
    if (!ok) return;

    try {
        const db = window._db;
        const updates = { balance: window._fbIncrement(-rank.price) };
        if (needsBoth) updates.balance_usd = window._fbIncrement(-rank.price_usd);
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), updates);
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { godzillaRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.godzillaRank = rankKey;
        if (needsBoth) {
            bankAccount.balance_usd = (bankAccount.balance_usd || 0) - rank.price_usd;
        }
        await addTx({ type: 'Rango Godzilla', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Forma Godzilla: ${rank.label}${needsBoth ? ` (+${rank.price_usd} P-USD)` : ''}` });
        showToast(`¡${rank.label.toUpperCase()} DESPIERTA!`, rank.color);
        loadGodzillaPage();
        if (typeof checkAchievements === 'function') checkAchievements();
        checkGodzillaAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkGodzillaAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.godzillaAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of GODZILLA_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            const gzRanks = boughtRanks.filter(r => GODZILLA_RANKS.some(gr => gr.key === r));
            const kaijuRanks = boughtRanks.filter(r => GODZILLA_RANKS.some(gr => gr.key === r && gr.cls === 'rank-kaiju'));

            if (ach.id === 'first_godzilla' && userData.godzillaRank) newly.push(ach);
            if (ach.id === 'collect_5_gz' && gzRanks.length >= 5) newly.push(ach);
            if (ach.id === 'collect_15_gz' && gzRanks.length >= 15) newly.push(ach);
            if (ach.id === 'collect_all_gz' && gzRanks.length >= 31) newly.push(ach);
            if (ach.id === 'hakaishin_rank' && userData.godzillaRank === 'godzilla_hakaishin') newly.push(ach);
            if (ach.id === 'destroyah_rank' && userData.godzillaRank === 'destroyah') newly.push(ach);
            if (ach.id === 'king_kaiju' && kaijuRanks.length >= 5) newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            godzillaAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🦖 ¡Logro Godzilla: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#22c55e');
    } catch(e) {
        console.error('Error checking godzilla achievements:', e);
    }
}
