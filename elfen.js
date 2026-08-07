/* ═══════════════════════════════════════════════
   ELFEN LIED — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const ELFEN_RANKS = [
    {
        key: 'lucy',
        label: 'Lucy / Nyu',
        icon: 'fa-solid fa-hands',
        weapon: 'Vectors',
        weaponIcon: 'fa-solid fa-hand-scissors',
        color: '#FF69B4',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'La Diclonius original. Vectors que cortan todo a su paso. Dualidad entre Nyu y Lucy.',
        grade: 'E'
    },
    {
        key: 'nana',
        label: 'Nana',
        icon: 'fa-solid fa-paw',
        weapon: 'Vectors',
        weaponIcon: 'fa-solid fa-hand-scissors',
        color: '#DA70D6',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La chica-Diclonius nº7. Vectors de corto alcance pero gran precisión.',
        grade: 'D'
    },
    {
        key: 'mariko',
        label: 'Mariko',
        icon: 'fa-solid fa-child-reaching',
        weapon: 'Explosion',
        weaponIcon: 'fa-solid fa-explosion',
        color: '#FF1493',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'La Diclonius más peligrosa. Explosiones de vectors de alcance devastador.',
        grade: 'B'
    },
    {
        key: 'kurama',
        label: 'Kurama',
        icon: 'fa-solid fa-rose',
        weapon: 'Rose',
        weaponIcon: 'fa-solid fa-seedling',
        color: '#DC143C',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'El padre de Mariko. Amor y sacrificio en cada batalla. Determinación inquebrantable.',
        grade: 'A'
    },
    {
        key: 'bando',
        label: 'Bando',
        icon: 'fa-solid fa-gun',
        weapon: 'Gun',
        weaponIcon: 'fa-solid fa-crosshairs',
        color: '#2F4F4F',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'El agente más brutal. Balas y violencia contra todo lo que se cruza.',
        grade: 'A'
    },
    {
        key: 'diclonius',
        label: 'Reina Diclonius',
        icon: 'fa-solid fa-crown',
        weapon: 'Vectors Supreme',
        weaponIcon: 'fa-solid fa-hands',
        color: '#8B0000',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'La Reina Diclonius. Vectors supremos que destruyen todo. El poder absoluto.',
        grade: 'SSS'
    }
];

const ELFEN_ITEMS = [
    { id: 'vector_gloves', name: 'Guantes de Vectores', icon: 'fa-solid fa-mitten', price: 500000, reward: 100000, desc: 'Guantes que canalizan los vectors. +20% PPC.' },
    { id: 'pink_hair', name: 'Peluca Rosa de Nyu', icon: 'fa-solid fa-wand-magic-sparkles', price: 2000000, reward: 500000, desc: 'El cabello icónico de Nyu. +30% PPC.' },
    { id: 'diclonius_horns', name: 'Cuernos de Diclonius', icon: 'fa-solid fa-horn', price: 10000000, reward: 2000000, desc: 'Los cuernos del poder Diclonius. +50% PPC.' }
];

const ELFEN_ACHIEVEMENTS = [
    { id: 'first_elfen', icon: 'fa-solid fa-hands', name: 'Primer Vector', desc: 'Compra tu primer rango de Elfen Lied.', reward: 2000 },
    { id: 'collect_3_elf', icon: 'fa-solid fa-child-reaching', name: 'Trío Diclonius', desc: 'Obtén 3 rangos de Elfen Lied.', reward: 10000 },
    { id: 'collect_6_elf', icon: 'fa-solid fa-crown', name: 'Coleccionista Elfen', desc: 'Colecciona todos los 6 rangos.', reward: 100000 },
    { id: 'queen_rank', icon: 'fa-solid fa-hand-sparkles', name: 'Reina Suprema', desc: 'Alcanza el rango Reina Diclonius.', reward: 250000 }
];
// Achievement check is already built into checkElfenAchievements

/* ─────────── RENDER ─────────── */

function loadElfenPage() {
    const container = document.getElementById('elfen-container');
    if (!container) return;

    const userRank = currentUser?.elfenRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(255,105,180,0.08),rgba(0,0,0,0));border-color:rgba(255,105,180,0.3);">
            <div style="font-size:40px;color:#FF69B4;margin-bottom:10px;"><i class="fa-solid fa-hands"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#FF69B4;">Elfen Lied</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#FF69B4;">${userRank ? ELFEN_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-hands" style="color:#FF69B4;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    ELFEN_RANKS.forEach(rank => {
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
                    : `<button class="btn btn-primary btn-full" onclick="buyElfenRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    ELFEN_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyElfenItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyElfenRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = ELFEN_RANKS.find(r => r.key === rankKey);
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
            elfenRank: rank.key,
            boughtRanks: window._fbArrayUnion(rank.key)
        });

        currentUser.elfenRank = rank.key;

        await addTx({ type: 'Rango Elfen', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Elfen Lied: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 🩷`, '#FF69B4');
        loadElfenPage();
        if (window.loadDashboard) window.loadDashboard();
        checkElfenAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyElfenItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = ELFEN_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Elfen', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 🩷`, '#FF69B4');
        loadElfenPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkElfenAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.elfenAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of ELFEN_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_elfen' && userData.elfenRank) newly.push(ach);
            if (ach.id === 'collect_3_elf' && boughtRanks.filter(r => ELFEN_RANKS.some(er => er.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_6_elf' && boughtRanks.filter(r => ELFEN_RANKS.some(er => er.key === r)).length >= 6) newly.push(ach);
            if (ach.id === 'queen_rank' && userData.elfenRank === 'diclonius') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            elfenAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🩷 ¡Logro Elfen: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#FF69B4');
    } catch(e) {
        console.error('Error checking elfen achievements:', e);
    }
}