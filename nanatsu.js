/* NANATSU NO TAIZAI — RANGOS DE LOS 7 PECADOS CAPITALES */

const NANATSU_RANKS = [
    {
        key: 'diane',
        label: 'Diane',
        sin: 'Envidia de la Serpiente',
        icon: 'fa-solid fa-person-hiking',
        weapon: 'Gideon',
        weaponIcon: 'fa-solid fa-hammer',
        color: '#8e44ad',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        img: 'nanatsu_diane.jpg',
        desc: 'Gigante del clan de los gigantes. Creation manipula la tierra. Gideon es un martillo de guerra de 2200 lbs.',
        grade: 'S'
    },
    {
        key: 'ban',
        label: 'Ban',
        sin: 'Codicia del Zorro',
        icon: 'fa-solid fa-hand-fist',
        weapon: 'Courechouse',
        weaponIcon: 'fa-solid fa-staff',
        color: '#f39c12',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        img: 'nanatsu_ban.jpg',
        desc: 'Inmortal por la Fuente de la Juventud. Snatch roba objetos y fuerza física. Courechouse es un bastón sagrado de 4 secciones.',
        grade: 'S'
    },
    {
        key: 'king',
        label: 'King',
        sin: 'Pereza del Oso Pardo',
        icon: 'fa-solid fa-feather',
        weapon: 'Chastiefol',
        weaponIcon: 'fa-solid fa-wand-magic-sparkles',
        color: '#3498db',
        price: 10000000,
        price_usd: 350,
        gradeTier: 1,
        mult: 2.5,
        img: 'nanatsu_king.jpg',
        desc: 'Rey de las Hadas. Disaster controla vida/muerte. Chastiefol es una lanza espiritual con 10 formas diferentes.',
        grade: 'S'
    },
    {
        key: 'gowther',
        label: 'Gowther',
        sin: 'Lujuria de la Cabra',
        icon: 'fa-solid fa-brain',
        weapon: 'Herritt',
        weaponIcon: 'fa-solid fa-bow-arrow',
        color: '#e74c3c',
        price: 20000000,
        price_usd: 650,
        gradeTier: 2,
        mult: 3,
        img: 'nanatsu_gowther.jpg',
        desc: 'Muñeco creado por un mago. Invasion manipula memorias y almas. Herritt son arcos gemelos de luz.',
        grade: 'S'
    },
    {
        key: 'meliodas',
        label: 'Meliodas',
        sin: 'Ira del Dragón',
        icon: 'fa-solid fa-dragon',
        weapon: 'Lostvayne',
        weaponIcon: 'fa-solid fa-sword',
        color: '#e84393',
        price: 35000000,
        price_usd: 1100,
        gradeTier: 2,
        mult: 4,
        img: 'nanatsu_meliodas.jpg',
        desc: 'Capitán de los 7 Pecados Capitales. Full Counter refleja cualquier ataque mágico. Lostvayne crea clones físicos.',
        grade: 'S'
    },
    {
        key: 'merlin',
        label: 'Merlin',
        sin: 'Gula del Jabalí',
        icon: 'fa-solid fa-hat-wizard',
        weapon: 'Morning Star Aldan',
        weaponIcon: 'fa-solid fa-crystal-ball',
        color: '#9b59b6',
        price: 55000000,
        price_usd: 1800,
        gradeTier: 3,
        mult: 5,
        img: 'nanatsu_merlin.jpg',
        desc: 'La mejor maga de Britania. Infinity mantiene hechizos eternamente. Aldan revela y controla todo.',
        grade: 'SS'
    },
    {
        key: 'escanor',
        label: 'Escanor',
        sin: 'Soberbia del León',
        icon: 'fa-solid fa-sun',
        weapon: 'Rhitta',
        weaponIcon: 'fa-solid fa-axe-battle',
        color: '#f1c40f',
        price: 80000000,
        price_usd: 2700,
        gradeTier: 3,
        mult: 7,
        img: 'nanatsu_escanor.jpg',
        desc: 'El más fuerte de día. Sunshine crece con el sol. Rhitta es un hacha divina que almacena calor solar.',
        grade: 'SSS'
    }
];

const NANATSU_SACRED_TREASURES = [
    { id: 'lostvayne', name: 'Lostvayne', owner: 'meliodas', icon: 'fa-solid fa-sword', img: 'treasure_lostvayne.jpg', price: 5000000, desc: 'Espada sagrada que crea clones físicos del portador.' },
    { id: 'gideon', name: 'Gideon', owner: 'diane', icon: 'fa-solid fa-hammer', img: 'treasure_gideon.jpg', price: 5000000, desc: 'Martillo de guerra de 2200 lbs. Amplifica el poder de Creation.' },
    { id: 'courechouse', name: 'Courechouse', owner: 'ban', icon: 'fa-solid fa-staff', img: 'treasure_courechouse.jpg', price: 5000000, desc: 'Bastón sagrado de 4 secciones. Extiende el alcance de Snatch.' },
    { id: 'chastiefol', name: 'Chastiefol', owner: 'king', icon: 'fa-solid fa-wand-magic-sparkles', img: 'treasure_chastiefol.jpg', price: 5000000, desc: 'Lanza espiritual del Rey de las Hadas. 10 formas: guardián, guardián increase, etc.' },
    { id: 'herritt', name: 'Herritt', owner: 'gowther', icon: 'fa-solid fa-bow-arrow', img: 'treasure_herritt.jpg', price: 5000000, desc: 'Arcos gemelos de luz. Dispara flechas de energía que invaden la mente.' },
    { id: 'aldan', name: 'Morning Star Aldan', owner: 'merlin', icon: 'fa-solid fa-crystal-ball', img: 'treasure_aldan.jpg', price: 5000000, desc: 'Orbe mágico que revela verdades y amplifica Infinity.' },
    { id: 'rhitta', name: 'Rhitta', owner: 'escanor', icon: 'fa-solid fa-axe-battle', img: 'treasure_rhitta.jpg', price: 5000000, desc: 'Hacha divina que absorbe y libera el calor del sol.' }
];

const NANATSU_ACHIEVEMENTS = [
    { id: 'first_nanatsu', icon: 'fa-solid fa-dragon', name: 'Primer Pecado', desc: 'Compra tu primer rango de los 7 Pecados.', reward: 1000 },
    { id: 'collect_3', icon: 'fa-solid fa-medal', name: 'Trio de Pecados', desc: 'Obtén 3 rangos de Nanatsu no Taizai.', reward: 5000 },
    { id: 'collect_7', icon: 'fa-solid fa-crown', name: 'Los 7 Pecados Capitales', desc: 'Colecciona todos los 7 rangos.', reward: 50000 },
    { id: 'escanor_rank', icon: 'fa-solid fa-sun', name: 'El Orgullo del León', desc: 'Alcanza el rango Escanor.', reward: 100000 }
];

const _nanatsuRankRegistry = {};
NANATSU_RANKS.forEach(r => { _nanatsuRankRegistry[r.key] = r; });

const _nanatsuTreasureRegistry = {};
NANATSU_SACRED_TREASURES.forEach(t => { _nanatsuTreasureRegistry[t.id] = t; });

// ═══════════════════════════ NANATSU PAGE ═══════════════════════════

async function loadNanatsuPage() {
    if (!currentUser || !bankAccount) return;

    const curEl = document.getElementById('nanatsu-current-rank');
    if (curEl) {
        if (currentUser.nanatsuRank) {
            const nr = _nanatsuRankRegistry[currentUser.nanatsuRank];
            curEl.innerHTML = nr ? `<i class="${nr.icon}" style="color:${nr.color}"></i> ${nr.label} — ${nr.sin} (${nr.grade})` : 'Sin rango';
        } else {
            curEl.textContent = 'Sin Pecado Capital';
        }
    }

    const ranksContainer = document.getElementById('nanatsu-ranks-grid');
    if (ranksContainer) {
        ranksContainer.innerHTML = '';
        NANATSU_RANKS.forEach(rank => {
            const isOwned = currentUser.nanatsuRank === rank.key;
            const canAfford = rank.gradeTier >= 3
                ? (bankAccount.balance >= rank.price && (currentUser.pusdBalance || 0) >= rank.price_usd)
                : (bankAccount.balance >= rank.price || (currentUser.pusdBalance || 0) >= rank.price_usd);
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.borderColor = isOwned ? rank.color : 'var(--dark-border)';
            card.style.boxShadow = isOwned ? `0 0 20px ${rank.color}40` : 'none';
            card.style.background = isOwned ? `linear-gradient(135deg, ${rank.color}10, transparent)` : '';

            const dualNote = rank.gradeTier >= 3 ? '<div style="font-size:9px;color:#ff8800;text-align:center;margin-bottom:8px;">⚠ Requiere ambos pagos</div>' : '';

            card.innerHTML = `
                <div style="text-align:center;margin-bottom:10px;">
                    <img src="${rank.img}" alt="${rank.label}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid ${rank.color};background:${rank.color}15;" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                    <div style="display:none;width:72px;height:72px;border-radius:50%;background:${rank.color}15;border:2px solid ${rank.color};align-items:center;justify-content:center;color:${rank.color};font-size:28px;margin:0 auto;"><i class="${rank.icon}"></i></div>
                </div>
                <div style="font-weight:700;color:${rank.color};font-size:14px;text-align:center;margin-bottom:4px;">${rank.label}</div>
                <div style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:8px;">${rank.sin} • ${rank.grade}</div>
                <div style="font-size:11px;color:var(--secondary);font-weight:bold;margin-bottom:8px;">+${Math.round((rank.mult - 1) * 100)}% ganancias</div>
                <div style="font-size:10px;color:${rank.color};margin-bottom:6px;"><i class="${rank.weaponIcon}"></i> Tesoro: <strong>${rank.weapon}</strong></div>
                <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.5;">${rank.desc}</p>
                <div style="display:flex;gap:8px;justify-content:center;margin-bottom:4px;">
                    <span style="font-family:'Orbitron',sans-serif;color:#00cc66;font-size:12px;font-weight:bold;">${rank.price.toLocaleString()} PPC</span>
                    <span style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:12px;font-weight:bold;">$${rank.price_usd} P-USD</span>
                </div>
                ${dualNote}
                <button class="btn btn-full ${isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary'}"
                    ${isOwned || !canAfford ? `disabled style="opacity:0.6"` : `onclick="buyNanatsuRank('${rank.key}')"`}>
                    <i class="${rank.icon}"></i> ${isOwned ? 'Pecado Actual' : canAfford ? 'Reclamar Pecado' : 'Saldo Insuficiente'}
                </button>
            `;
            ranksContainer.appendChild(card);
        });
    }

    const treasuresContainer = document.getElementById('nanatsu-treasures-grid');
    if (treasuresContainer) {
        treasuresContainer.innerHTML = '';
        NANATSU_SACRED_TREASURES.forEach(treasure => {
            const owned = currentUser.nanatsuTreasures?.includes(treasure.id) || false;
            const ownerRank = currentUser.nanatsuRank === treasure.owner;
            const canAfford = bankAccount.balance >= treasure.price && ownerRank;
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.opacity = canAfford || owned ? '1' : '0.5';

            card.innerHTML = `
                <div style="text-align:center;margin-bottom:10px;">
                    <img src="${treasure.img}" alt="${treasure.name}" style="width:64px;height:64px;border-radius:12px;object-fit:cover;border:2px solid ${owned ? 'var(--secondary)' : 'var(--dark-border)'};background:rgba(0,0,0,0.2);" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                    <div style="display:none;width:64px;height:64px;border-radius:12px;background:rgba(0,0,0,0.2);border:2px solid ${owned ? 'var(--secondary)' : 'var(--dark-border)'};align-items:center;justify-content:center;margin:0 auto 8px;color:${owned ? 'var(--secondary)' : 'var(--text-muted)'};font-size:24px;"><i class="${treasure.icon}"></i></div>
                    <div style="font-weight:700;font-size:13px;margin-top:8px;">${treasure.name}</div>
                    <div style="font-size:10px;color:var(--text-muted);">${treasure.owner ? `De ${_nanatsuRankRegistry[treasure.owner]?.label || treasure.owner}` : ''}</div>
                </div>
                <p style="font-size:10px;color:var(--text-muted);margin-bottom:10px;line-height:1.4;">${treasure.desc}</p>
                <div style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:12px;font-weight:bold;margin-bottom:8px;">${treasure.price.toLocaleString()} PPC</div>
                <button class="btn btn-full ${owned ? 'btn-secondary' : (canAfford ? 'btn-primary' : 'btn-secondary')}"
                    ${owned || !canAfford ? `disabled style="opacity:0.6"` : `onclick="buyNanatsuTreasure('${treasure.id}', ${treasure.price})"`}>
                    <i class="${treasure.icon}"></i> ${owned ? 'Obtenido' : (ownerRank ? (canAfford ? 'Adquirir Tesoro' : 'PPC Insuficiente') : 'Requiere rango del dueño')}
                </button>
            `;
            treasuresContainer.appendChild(card);
        });
    }

    const gamesSection = document.getElementById('nanatsu-games-section');
    if (gamesSection) {
        gamesSection.style.display = currentUser.nanatsuRank ? 'block' : 'none';
    }
}

async function buyNanatsuRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = _nanatsuRankRegistry[rankKey];
    const ppc = bankAccount.balance;
    const pUsd = currentUser.pusdBalance || 0;

    if (rank.gradeTier >= 3) {
        if (ppc < rank.price || pUsd < rank.price_usd) { showToast('Saldo insuficiente', '#ff4466'); return; }
    } else {
        if (ppc < rank.price && pUsd < rank.price_usd) { showToast('Saldo insuficiente', '#ff4466'); return; }
    }

    let paymentMethod;
    if (rank.gradeTier >= 3) {
        paymentMethod = 'both';
    } else {
        if (pUsd >= rank.price_usd) {
            paymentMethod = 'usd';
        } else {
            paymentMethod = 'ppc';
        }
    }

    const ok = await showConfirm('Reclamar Pecado Capital', `¿Convertirte en el <strong style="color:${rank.color}">${rank.sin}</strong> — <strong>${rank.label}</strong>?`);
    if (!ok) return;

    try {
        const db = window._db;
        if (paymentMethod === 'both') {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: (currentUser.pusdBalance || 0) - rank.price_usd });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            await addTx({ type: 'Rango Nanatsu', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Pecado Capital: ${rank.label} (${rank.sin}) — ${rank.price.toLocaleString()} PPC + $${rank.price_usd} P-USD` });
        } else if (paymentMethod === 'usd') {
            await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: (currentUser.pusdBalance || 0) - rank.price_usd });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            await addTx({ type: 'Rango Nanatsu', from: currentUser.nick, to: 'Banco', amount: rank.price_usd, note: `Pecado Capital: ${rank.label} (${rank.sin}) — $${rank.price_usd} P-USD` });
        } else {
            await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            await addTx({ type: 'Rango Nanatsu', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Pecado Capital: ${rank.label} (${rank.sin}) — ${rank.price.toLocaleString()} PPC` });
        }

        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { nanatsuRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.nanatsuRank = rankKey;
        grantRankLocal(rankKey);
        showToast(`¡Ahora eres ${rank.label} — ${rank.sin}!`, rank.color);
        loadNanatsuPage();
        checkNanatsuAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyNanatsuTreasure(treasureId, price) {
    if (!currentUser || !bankAccount || !window._db) return;
    if (bankAccount.balance < price) { showToast('PPC insuficiente', '#ff4466'); return; }

    const treasure = _nanatsuTreasureRegistry[treasureId];
    const ok = await showConfirm('Adquirir Tesoro Sagrado', `¿Obtener <strong>${treasure.name}</strong> (Tesoro de ${_nanatsuRankRegistry[treasure.owner]?.label}) por ${price.toLocaleString()} PPC?`);
    if (!ok) return;

    try {
        const db = window._db;
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-price) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { nanatsuTreasures: window._fbArrayUnion(treasureId) });
        if (!currentUser.nanatsuTreasures) currentUser.nanatsuTreasures = [];
        currentUser.nanatsuTreasures.push(treasureId);
        await addTx({ type: 'Tesoro Sagrado', from: currentUser.nick, to: 'Banco', amount: price, note: `Tesoro Sagrado: ${treasure.name}` });
        showToast(`¡Obtuviste ${treasure.name}!`, '#00ffaa');
        loadNanatsuPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

function getNanatsuRankData() { return currentUser && currentUser.nanatsuRank ? _nanatsuRankRegistry[currentUser.nanatsuRank] || null : null; }

function getNanatsuMultiplier(base) {
    const nr = getNanatsuRankData();
    if (!nr) return base;
    return Math.round(base * (1 + nr.mult));
}

async function checkNanatsuAchievements() {
    if (!currentUser || !window._db) return;
    const earned = currentUser.nanatsuAchievements || [];
    const nanatsuRankKeys = NANATSU_RANKS.map(r => r.key);
    for (const ach of NANATSU_ACHIEVEMENTS) {
        if (earned.includes(ach.id)) continue;
        let ok = false;
        if (ach.id === 'first_nanatsu' && currentUser.nanatsuRank) ok = true;
        if (ach.id === 'collect_3' && (currentUser.boughtRanks || []).filter(r => nanatsuRankKeys.includes(r)).length >= 3) ok = true;
        if (ach.id === 'collect_7' && (currentUser.boughtRanks || []).filter(r => nanatsuRankKeys.includes(r)).length >= 7) ok = true;
        if (ach.id === 'escanor_rank' && currentUser.nanatsuRank === 'escanor') ok = true;

        if (ok) {
            earned.push(ach.id);
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { nanatsuAchievements: earned });
            
            // Aplicar multiplicador de rango a la recompensa
            const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
            const finalReward = Math.round(ach.reward * mult);
            
            await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
            showToast(`Logro Nanatsu: "${ach.name}" +${finalReward.toLocaleString()} PPC (×${mult.toFixed(2)})!`, '#f1c40f');
        }
    }
    currentUser.nanatsuAchievements = earned;
}