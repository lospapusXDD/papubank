/* ═══════════════════════════════════════════════
   RE:ZERO — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const REZERO_RANKS = [
    {
        key: 'subaru',
        label: 'Subaru Natsuki',
        icon: 'fa-solid fa-redo',
        weapon: 'Reset',
        weaponIcon: 'fa-solid fa-redo',
        color: '#FF4500',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'El héroe que regresa de la muerte. Return by Death es su poder y su maldición.',
        grade: 'E'
    },
    {
        key: 'emilia',
        label: 'Emilia',
        icon: 'fa-solid fa-snowflake',
        weapon: 'Ice',
        weaponIcon: 'fa-solid fa-snowflake',
        color: '#E0E0FF',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La candidata a ser reina con poderes de hielo. Mitad elfa, todo corazón.',
        grade: 'D'
    },
    {
        key: 'rem',
        label: 'Rem',
        icon: 'fa-solid fa-broom',
        weapon: 'Morning Star',
        weaponIcon: 'fa-solid fa-star',
        color: '#4169E1',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'La demonio azul. Su estrella matutina es devastadora. Leal hasta la muerte.',
        grade: 'B'
    },
    {
        key: 'ram',
        label: 'Ram',
        icon: 'fa-solid fa-wand-sparkles',
        weapon: 'Wind',
        weaponIcon: 'fa-solid fa-wind',
        color: '#FF69B4',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'La demonio rosa. Poderosa con el viento. Orgullosa y letal.',
        grade: 'A'
    },
    {
        key: 'roswaal',
        label: 'Roswaal',
        icon: 'fa-solid fa-theater-masks',
        weapon: 'Jester',
        weaponIcon: 'fa-solid fa-masks-theater',
        color: '#9370DB',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'El margrave excéntrico. Maestro del teatro y la magia arcaica.',
        grade: 'A'
    },
    {
        key: 'satella',
        label: 'Satella',
        icon: 'fa-solid fa-moon',
        weapon: 'Shadow',
        weaponIcon: 'fa-solid fa-ghost',
        color: '#191970',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'La Dama de la Sombra. Devoradora de mundos. Temida por todos.',
        grade: 'S'
    },
    {
        key: 'witch',
        label: 'Brucha del Odio',
        icon: 'fa-solid fa-hat-wizard',
        weapon: 'Witch',
        weaponIcon: 'fa-solid fa-hat-wizard',
        color: '#4B0082',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'La Brucha del Odio. El poder más antiguo y devastador del mundo.',
        grade: 'SSS'
    }
];

const REZERO_ITEMS = [
    { id: 'gospel', name: 'Evangelio', icon: 'fa-solid fa-book', price: 500000, reward: 100000, desc: 'Un libro que contiene el futuro. +10% PPC.' },
    { id: 'mabeast', name: 'Espíritu de Beatrice', icon: 'fa-solid fa-dragon', price: 2000000, reward: 500000, desc: 'El espíritu guardián de la biblioteca. +25% PPC.' },
    { id: 'return', name: 'Correa de la Muerte', icon: 'fa-solid fa-skull', price: 10000000, reward: 2000000, desc: 'El poder de Return by Death. +50% PPC.' }
];

const REZERO_ACHIEVEMENTS = [
    { id: 'first_rezero', icon: 'fa-solid fa-redo', name: 'Primer Return', desc: 'Compra tu primer rango de Re:Zero.', reward: 2000 },
    { id: 'collect_3_rz', icon: 'fa-solid fa-house', name: 'Trío de la Mansión', desc: 'Obtén 3 rangos de Re:Zero.', reward: 10000 },
    { id: 'collect_7_rz', icon: 'fa-solid fa-moon', name: 'Coleccionista Re:Zero', desc: 'Colecciona todos los 7 rangos.', reward: 100000 },
    { id: 'witch_rank', icon: 'fa-solid fa-hat-wizard', name: 'La Brucha', desc: 'Alcanza el rango Brucha del Odio.', reward: 250000 }
];
// Achievement check is already built into checkRezeroAchievements

/* ─────────── RENDER ─────────── */

function loadRezeroPage() {
    const container = document.getElementById('rezero-container');
    if (!container) return;

    const userRank = currentUser?.rezeroRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(255,69,0,0.08),rgba(0,0,0,0));border-color:rgba(255,69,0,0.3);">
            <div style="font-size:40px;color:#FF4500;margin-bottom:10px;"><i class="fa-solid fa-redo"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#FF4500;">Re:Zero</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#FF4500;">${userRank ? REZERO_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-redo" style="color:#FF4500;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    REZERO_RANKS.forEach(rank => {
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
                    : `<button class="btn btn-primary btn-full" onclick="buyRezeroRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    REZERO_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyRezeroItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function getRezeroRankMultiplier(rankKey) {
    const rank = REZERO_RANKS.find(r => r.key === rankKey);
    return rank ? rank.mult : 1;
}

async function buyRezeroRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = REZERO_RANKS.find(r => r.key === rankKey);
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
            rezeroRank: rank.key,
            boughtRanks: window._fbArrayUnion(rank.key)
        });

        currentUser.rezeroRank = rank.key;

        await addTx({ type: 'Rango Re:Zero', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Re:Zero: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 🔴`, '#FF4500');
        loadRezeroPage();
        if (window.loadDashboard) window.loadDashboard();
        checkRezeroAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyRezeroItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = REZERO_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Re:Zero', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 🔴`, '#FF4500');
        loadRezeroPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkRezeroAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.rezeroAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of REZERO_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_rezero' && userData.rezeroRank) newly.push(ach);
            if (ach.id === 'collect_3_rz' && boughtRanks.filter(r => REZERO_RANKS.some(cr => cr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_7_rz' && boughtRanks.filter(r => REZERO_RANKS.some(cr => cr.key === r)).length >= 7) newly.push(ach);
            if (ach.id === 'witch_rank' && userData.rezeroRank === 'witch') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            rezeroAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🔴 ¡Logro Re:Zero: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#FF4500');
    } catch(e) {
        console.error('Error checking rezero achievements:', e);
    }
}
