/* ═══════════════════════════════════════════════
   BERSERK — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const BERSERK_RANKS = [
    {
        key: 'guts',
        label: 'Guts',
        icon: 'fa-solid fa-hand-fist',
        weapon: 'Dragonslayer',
        weaponIcon: 'fa-solid fa-claw',
        color: '#8B0000',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'El Guerrero que desafía al destino. La Dragonslayer corta todo a su paso.',
        grade: 'E'
    },
    {
        key: 'casca',
        label: 'Casca',
        icon: 'fa-solid fa-shield-halved',
        weapon: 'Sword',
        weaponIcon: 'fa-solid fa-shield-halved',
        color: '#C4A35A',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La guerrera de la Banda del Halcón. Espadachina letal y líder nata.',
        grade: 'D'
    },
    {
        key: 'griffith',
        label: 'Griffith',
        icon: 'fa-solid fa-feather-pointed',
        weapon: 'Hawk',
        weaponIcon: 'fa-solid fa-feather-pointed',
        color: '#FFFFFF',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'El Halcón de la Luz. Su ambición no tiene límites. Fundador de la Banda del Halcón.',
        grade: 'B'
    },
    {
        key: 'skull_knight',
        label: 'Skull Knight',
        icon: 'fa-solid fa-skull-crossbones',
        weapon: 'Sword of Actuation',
        weaponIcon: 'fa-solid fa-skull-crossbones',
        color: '#C0C0C0',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'El Caballero Calavera. La Espada de Actuación abre portales a través del tiempo.',
        grade: 'A'
    },
    {
        key: 'ganishka',
        label: 'Ganishka',
        icon: 'fa-solid fa-cloud-bolt',
        weapon: 'Fog',
        weaponIcon: 'fa-solid fa-cloud-bolt',
        color: '#4B0082',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'El Rey Demonio de la Niebla. Su forma de tempestad destruye ciudades enteras.',
        grade: 'A'
    },
    {
        key: 'femto',
        label: 'Femto',
        icon: 'fa-solid fa-dove',
        weapon: 'Behelit',
        weaponIcon: 'fa-solid fa-dove',
        color: '#1a1a1a',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'La Encarnación del Deseo. Manipula la gravedad y la causalidad a su antojo.',
        grade: 'S'
    },
    {
        key: 'god_hand',
        label: 'God Hand',
        icon: 'fa-solid fa-hand-sparkles',
        weapon: 'Divine',
        weaponIcon: 'fa-solid fa-hand-sparkles',
        color: '#FFD700',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'La Mano de Dios. Los cinco seres más poderosos del universo Berserk.',
        grade: 'SSS'
    }
];

const BERSERK_ITEMS = [
    { id: 'behelit', name: 'Behelit de Hierro', icon: 'fa-solid fa-face-grin-tears', price: 500000, reward: 100000, desc: 'Un behelit que guarda un destino terrible. +20% PPC.' },
    { id: 'dragonslayer', name: 'Dragonslayer', icon: 'fa-solid fa-claw', price: 2000000, reward: 500000, desc: 'La espada de Guts. Corta.dragones y demonios por igual. +50% PPC.' },
    { id: 'brand', name: 'Marca del Sacrificio', icon: 'fa-solid fa-fire', price: 10000000, reward: 2000000, desc: 'La marca que atrae demonios. Poder oscuro a un costo terrible.' }
];

const BERSERK_ACHIEVEMENTS = [
    { id: 'first_berserk', icon: 'fa-solid fa-hand-fist', name: 'Primer Guerrero', desc: 'Compra tu primer rango de Berserk.', reward: 2000 },
    { id: 'collect_3_bk', icon: 'fa-solid fa-feather-pointed', name: 'Trío del Halcón', desc: 'Obtén 3 rangos de Berserk.', reward: 10000 },
    { id: 'collect_7_bk', icon: 'fa-solid fa-skull-crossbones', name: 'Coleccionista Berserk', desc: 'Colecciona todos los 7 rangos.', reward: 100000 },
    { id: 'god_hand_rank', icon: 'fa-solid fa-hand-sparkles', name: 'Mano de Dios', desc: 'Alcanza el rango God Hand.', reward: 250000 }
];
// Achievement check is already built into checkBerserkAchievements

/* ─────────── RENDER ─────────── */

function loadBerserkPage() {
    const container = document.getElementById('berserk-container');
    if (!container) return;

    const userRank = currentUser?.berserkRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(139,0,0,0.08),rgba(0,0,0,0));border-color:rgba(139,0,0,0.3);">
            <div style="font-size:40px;color:#8B0000;margin-bottom:10px;"><i class="fa-solid fa-claw"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#8B0000;">Berserk</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#8B0000;">${userRank ? BERSERK_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-claw" style="color:#8B0000;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    BERSERK_RANKS.forEach(rank => {
        const isOwned = currentUser?.boughtRanks?.includes(rank.key);
        const ppcBalance = bankAccount?.balance || 0;
        const usdBalance = currentUser?.pusdBalance || 0;
        let canBuy = false;
        if (!isOwned) {
            if (rank.gradeTier >= 3) {
                canBuy = ppcBalance >= rank.price && usdBalance >= rank.price_usd;
            } else {
                canBuy = ppcBalance >= rank.price || usdBalance >= rank.price_usd;
            }
        }

        html += `
            <div class="glass-card" style="border-color:${isOwned ? rank.color : 'var(--dark-border)'};${isOwned ? 'box-shadow:0 0 15px ' + rank.color + '40;' : ''}">
                <div style="text-align:center;margin-bottom:12px;">
                    <i class="${rank.icon}" style="font-size:28px;color:${rank.color};"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;color:${rank.color};text-align:center;margin-bottom:8px;">${rank.label}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${rank.desc}</p>
                <div style="text-align:center;font-size:11px;color:var(--secondary);margin-bottom:10px;">x${rank.mult} multiplicador</div>
                <div style="display:flex;justify-content:center;gap:10px;font-size:11px;margin-bottom:10px;">
                    <span style="color:#4caf50;font-weight:bold;">${rank.price.toLocaleString()} PPC</span>
                    <span style="color:var(--gold);font-weight:bold;">$${rank.price_usd.toLocaleString()} P-USD</span>
                </div>
                ${rank.gradeTier >= 3 ? '<div style="text-align:center;font-size:9px;color:#ff9800;margin-bottom:8px;"><i class="fa-solid fa-triangle-exclamation"></i> Requiere ambos pagos</div>' : ''}
                ${isOwned 
                    ? '<div style="text-align:center;color:' + rank.color + ';font-size:11px;font-weight:bold;">✓ ADQUIRIDO</div>'
                    : `<button class="btn btn-primary btn-full" onclick="buyBerserkRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    BERSERK_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyBerserkItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyBerserkRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = BERSERK_RANKS.find(r => r.key === rankKey);
    if (!rank) return;
    
    const ok = await showConfirm('Comprar Rango', `¿Comprar ${rank.label} por ${rank.price.toLocaleString()} PPC y $${rank.price_usd.toLocaleString()} P-USD?`);
    if (!ok) return;

    try {
        const accRef = window._fbDoc(window._db, 'bank_accounts', currentUser.nick);
        const accSnap = await window._fbGetDoc(accRef);
        const accData = accSnap.exists() ? accSnap.data() : {};
        const ppcBalance = accData.balance || 0;
        const usdBalance = currentUser?.pusdBalance || 0;

        if (rank.gradeTier >= 3) {
            if (ppcBalance < rank.price || usdBalance < rank.price_usd) {
                showToast('Saldo insuficiente', '#ff4466');
                return;
            }
            await window._fbUpdateDoc(accRef, {
                balance: window._fbIncrement(-rank.price)
            });
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
        } else {
            if (ppcBalance >= rank.price && usdBalance >= rank.price_usd) {
                const useUsd = await showConfirm('Método de Pago', `¿Pagar con P-USD ($${rank.price_usd.toLocaleString()})?\nResponda No para pagar con PPC (${rank.price.toLocaleString()} PPC)`);
                if (useUsd) {
                    await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
                    currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
                } else {
                    await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(-rank.price) });
                }
            } else if (ppcBalance >= rank.price) {
                await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(-rank.price) });
            } else if (usdBalance >= rank.price_usd) {
                await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
                currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            } else {
                showToast('Saldo insuficiente', '#ff4466');
                return;
            }
        }
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            berserkRank: rank.key,
            boughtRanks: window._fbArrayUnion(rank.key)
        });

        currentUser.berserkRank = rank.key;
        grantRankLocal(rank.key);

        await addTx({ type: 'Rango Berserk', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Berserk: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! ⚔`, '#8B0000');
        loadBerserkPage();
        if (window.loadDashboard) window.loadDashboard();
        checkBerserkAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyBerserkItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = BERSERK_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const ok = await showConfirm('Comprar Item', `¿Comprar ${item.name} por ${item.price.toLocaleString()} PPC?`);
    if (!ok) return;

    try {
        const accRef = window._fbDoc(window._db, 'bank_accounts', currentUser.nick);
        const accSnap = await window._fbGetDoc(accRef);
        const balance = accSnap.exists() ? (accSnap.data().balance || 0) : 0;

        if (balance < item.price) {
            showToast('Saldo insuficiente', '#ff4466');
            return;
        }

        await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(-item.price + item.reward) });
        
        let inventory = bankAccount.inventory || [];
        inventory.push(itemId);
        await window._fbUpdateDoc(accRef, { inventory: inventory });

        await addTx({ type: 'Item Berserk', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC ⚔`, '#8B0000');
        loadBerserkPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkBerserkAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.berserkAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of BERSERK_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_berserk' && userData.berserkRank) newly.push(ach);
            if (ach.id === 'collect_3_bk' && boughtRanks.filter(r => BERSERK_RANKS.some(bk => bk.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_7_bk' && boughtRanks.filter(r => BERSERK_RANKS.some(bk => bk.key === r)).length >= 7) newly.push(ach);
            if (ach.id === 'god_hand_rank' && userData.berserkRank === 'god_hand') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            berserkAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('⚔ ¡Logro Berserk: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#8B0000');
    } catch(e) {
        console.error('Error checking berserk achievements:', e);
    }
}