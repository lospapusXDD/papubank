/* ═══════════════════════════════════════════════
   DEATH NOTE — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const DEATHNOTE_RANKS = [
    {
        key: 'light',
        label: 'Light Yagami',
        icon: 'fa-solid fa-book',
        weapon: 'Death Note',
        weaponIcon: 'fa-solid fa-pen',
        color: '#1a1a2e',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'El estudiante perfecto que descubre el poder de la muerte. El nuevo Dios del mundo.',
        grade: 'E'
    },
    {
        key: 'misa',
        label: 'Misa Amane',
        icon: 'fa-solid fa-heart',
        weapon: 'Rem\'s Wings',
        weaponIcon: 'fa-solid fa-wings',
        color: '#ff69b4',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La Idol del Muerto. Devota de Kira, posee los ojos de Shinigami.',
        grade: 'D'
    },
    {
        key: 'L',
        label: 'L Lawliet',
        icon: 'fa-solid fa-chess-knight',
        weapon: 'Magnifier',
        weaponIcon: 'fa-solid fa-magnifying-glass',
        color: '#ffffff',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'El detective más brillante del mundo. Su mente es su arma más poderosa.',
        grade: 'B'
    },
    {
        key: 'ryuk',
        label: 'Ryuk',
        icon: 'fa-solid fa-skull',
        weapon: 'Golden Apple',
        weaponIcon: 'fa-solid fa-apple-whole',
        color: '#8b00ff',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'El Shinigami que dejó caer el cuaderno por aburrimiento. Le encantan las manzanas.',
        grade: 'A'
    },
    {
        key: 'near',
        label: 'Near',
        icon: 'fa-solid fa-puzzle-piece',
        weapon: 'Puzzle',
        weaponIcon: 'fa-solid fa-puzzle-piece',
        color: '#c0c0c0',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'El sucesor de L. Su intelecto rivaliza con el de su predecesor.',
        grade: 'A'
    },
    {
        key: 'kira',
        label: 'Kira',
        icon: 'fa-solid fa-crown',
        weapon: 'Death Note',
        weaponIcon: 'fa-solid fa-skull-crossbones',
        color: '#ff0000',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'El Dios del Nuevo Mundo. Su voluntad absoluta se escribe en el cuaderno.',
        grade: 'S'
    },
    {
        key: 'shinigami',
        label: 'Shinigami King',
        icon: 'fa-solid fa-bone',
        weapon: 'Throne',
        weaponIcon: 'fa-solid fa-chess-king',
        color: '#2d0a31',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'El Rey de los Shinigami. Controla todas las muertes del mundo.',
        grade: 'SSS'
    }
];

const DEATHNOTE_ITEMS = [
    { id: 'death_note', name: 'Cuaderno de la Muerte', icon: 'fa-solid fa-book-skull', price: 500000, reward: 100000, desc: 'Un cuaderno que mata a quien escriba su nombre. +10% PPC.' },
    { id: 'apple_of_god', name: 'Manzana del Shinigami', icon: 'fa-solid fa-apple-whole', price: 2000000, reward: 500000, desc: 'La fruta favorita de los Shinigami. +25% PPC.' },
    { id: 'eye_deal', name: 'Ojos del Shinigami', icon: 'fa-solid fa-eye', price: 10000000, reward: 2000000, desc: 'El poder de ver los nombres y edades. +50% PPC.' }
];

const DEATHNOTE_ACHIEVEMENTS = [
    { id: 'first_deathnote', icon: 'fa-solid fa-pen-nib', name: 'Primer Escritor', desc: 'Compra tu primer rango de Death Note.', reward: 2000 },
    { id: 'collect_3_dn', icon: 'fa-solid fa-scale-balanced', name: 'Trío de Justicia', desc: 'Obtén 3 rangos de Death Note.', reward: 10000 },
    { id: 'collect_7_dn', icon: 'fa-solid fa-book', name: 'Coleccionista del Cuaderno', desc: 'Colecciona todos los 7 rangos.', reward: 100000 },
    { id: 'kira_rank', icon: 'fa-solid fa-crown', name: 'El Verdadero Kira', desc: 'Alcanza el rango Kira.', reward: 250000 }
];
// Achievement check is already built into checkDeathnoteAchievements

/* ─────────── RENDER ─────────── */

function loadDeathnotePage() {
    const container = document.getElementById('deathnote-container');
    if (!container) return;

    const userRank = currentUser?.deathnoteRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(255,0,0,0.08),rgba(0,0,0,0));border-color:rgba(255,0,0,0.3);">
            <div style="font-size:40px;color:#ff0000;margin-bottom:10px;"><i class="fa-solid fa-book-skull"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#ff0000;">Death Note</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#ff0000;">${userRank ? DEATHNOTE_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-skull-crossbones" style="color:#ff0000;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    DEATHNOTE_RANKS.forEach(rank => {
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
                    : `<button class="btn btn-primary btn-full" onclick="buyDeathnoteRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    DEATHNOTE_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:#ff0000;"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyDeathnoteItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyDeathnoteRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = DEATHNOTE_RANKS.find(r => r.key === rankKey);
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
        
        const boughtRanks = currentUser.boughtRanks || [];
        if (!boughtRanks.includes(rank.key)) boughtRanks.push(rank.key);
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            deathnoteRank: rank.key,
            boughtRanks: boughtRanks
        });

        currentUser.deathnoteRank = rank.key;
        currentUser.boughtRanks = boughtRanks;

        await addTx({ type: 'Rango Death Note', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Death Note: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 💀`, '#ff0000');
        loadDeathnotePage();
        if (window.loadDashboard) window.loadDashboard();
        checkDeathnoteAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyDeathnoteItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = DEATHNOTE_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Death Note', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 💀`, '#ff0000');
        loadDeathnotePage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkDeathnoteAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.deathnoteAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of DEATHNOTE_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_deathnote' && userData.deathnoteRank) newly.push(ach);
            if (ach.id === 'collect_3_dn' && boughtRanks.filter(r => DEATHNOTE_RANKS.some(dr => dr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_7_dn' && boughtRanks.filter(r => DEATHNOTE_RANKS.some(dr => dr.key === r)).length >= 7) newly.push(ach);
            if (ach.id === 'kira_rank' && userData.deathnoteRank === 'kira') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            deathnoteAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('💀 ¡Logro Death Note: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#ff0000');
    } catch(e) {
        console.error('Error checking death note achievements:', e);
    }
}
