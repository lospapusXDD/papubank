/* ═══════════════════════════════════════════════
   RIMURU TEMPEST — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const RIMURU_RANKS = [
    {
        key: 'rimuru_slime',
        label: 'Rimuru (Slime)',
        icon: 'fa-solid fa-droplet',
        weapon: 'Slime',
        weaponIcon: 'fa-solid fa-droplet',
        color: '#4FC3F7',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'El Slime más poderoso de Tempest. Absorción y regeneración.',
        grade: 'E'
    },
    {
        key: 'shion',
        label: 'Shion',
        icon: 'fa-solid fa-khanda',
        weapon: 'Knife',
        weaponIcon: 'fa-solid fa-khanda',
        color: '#9C27B0',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La guardia de Rimuru. Espada de obsidiana y lealtad inquebrantable.',
        grade: 'D'
    },
    {
        key: 'benimaru',
        label: 'Benimaru',
        icon: 'fa-solid fa-fire',
        weapon: 'Flame',
        weaponIcon: 'fa-solid fa-fire',
        color: '#FF5722',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'General de Tempest. Llamas demoníacas que queman todo.',
        grade: 'B'
    },
    {
        key: 'milim',
        label: 'Milim Nava',
        icon: 'fa-solid fa-burst',
        weapon: 'Destruction',
        weaponIcon: 'fa-solid fa-burst',
        color: '#E91E63',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'La Dragonslayer. Poder destructivo sin igual.',
        grade: 'A'
    },
    {
        key: 'guy',
        label: 'Guy Crimson',
        icon: 'fa-solid fa-gem',
        weapon: 'Ruby',
        weaponIcon: 'fa-solid fa-gem',
        color: '#B71C1C',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'El Primer Señor Demonio. Ruby de la destrucción absoluta.',
        grade: 'A'
    },
    {
        key: 'rimuru_true',
        label: 'Rimuru (True Demon Lord)',
        icon: 'fa-solid fa-crown',
        weapon: 'Demon Lord',
        weaponIcon: 'fa-solid fa-crown',
        color: '#1a237e',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'El Señor Demonio verdadero. Señor de la Muerte y la Reencarnación.',
        grade: 'S'
    },
    {
        key: 'rimuru_awakened',
        label: 'Rimuru (Awakened)',
        icon: 'fa-solid fa-star',
        weapon: 'Ultimate',
        weaponIcon: 'fa-solid fa-star',
        color: '#FFD700',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'El Rimuru despertado. Poder absoluto que trasciende todo límite.',
        grade: 'SSS'
    }
];

const RIMURU_ITEMS = [
    { id: 'gluttony', name: 'Hambre', icon: 'fa-solid fa-utensils', price: 500000, reward: 100000, desc: 'El hambre infinita. Absorbe todo lo que tocas.' },
    { id: 'great_sage', name: 'Gran Sabio', icon: 'fa-solid fa-brain', price: 2000000, reward: 500000, desc: 'La inteligencia suprema. +20% PPC.' },
    { id: 'beelzebub', name: 'Beelzebub (US)', icon: 'fa-solid fa-skull-crossbones', price: 10000000, reward: 2000000, desc: 'El Señor de las Moscas. +50% PPC.' }
];

const RIMURU_ACHIEVEMENTS = [
    { id: 'first_rimuru', icon: 'fa-solid fa-droplet', name: 'Primer Slime', desc: 'Compra tu primer rango de Rimuru.', reward: 2000 },
    { id: 'collect_3_rm', icon: 'fa-solid fa-mountain-city', name: 'Trío de Tempest', desc: 'Obtén 3 rangos de Rimuru.', reward: 10000 },
    { id: 'collect_7_rm', icon: 'fa-solid fa-crown', name: 'Coleccionista Rimuru', desc: 'Colecciona todos los 7 rangos.', reward: 100000 },
    { id: 'awakened_rank', icon: 'fa-solid fa-star', name: 'Señor Demonio Despierto', desc: 'Alcanza el rango Awakened.', reward: 250000 }
];
// Achievement check is already built into checkRimuruAchievements

/* ─────────── RENDER ─────────── */

function loadRimuruPage() {
    const container = document.getElementById('rimuru-container');
    if (!container) return;

    const userRank = currentUser?.rimuruRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(79,195,247,0.08),rgba(0,0,0,0));border-color:rgba(79,195,247,0.3);">
            <div style="font-size:40px;color:#4FC3F7;margin-bottom:10px;"><i class="fa-solid fa-droplet"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#4FC3F7;">Rimuru Tempest</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#4FC3F7;">${userRank ? RIMURU_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-droplet" style="color:#4FC3F7;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    RIMURU_RANKS.forEach(rank => {
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
                    : `<button class="btn btn-primary btn-full" onclick="buyRimuruRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    RIMURU_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyRimuruItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyRimuruRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = RIMURU_RANKS.find(r => r.key === rankKey);
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
            rimuruRank: rank.key,
            boughtRanks: window._fbArrayUnion(rank.key)
        });

        currentUser.rimuruRank = rank.key;

        await addTx({ type: 'Rango Rimuru', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Rimuru Tempest: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 💧`, '#4FC3F7');
        loadRimuruPage();
        if (window.loadDashboard) window.loadDashboard();
        checkRimuruAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyRimuruItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = RIMURU_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Rimuru', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 💧`, '#4FC3F7');
        loadRimuruPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkRimuruAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.rimuruAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of RIMURU_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_rimuru' && userData.rimuruRank) newly.push(ach);
            if (ach.id === 'collect_3_rm' && boughtRanks.filter(r => RIMURU_RANKS.some(cr => cr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_7_rm' && boughtRanks.filter(r => RIMURU_RANKS.some(cr => cr.key === r)).length >= 7) newly.push(ach);
            if (ach.id === 'awakened_rank' && userData.rimuruRank === 'rimuru_awakened') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            rimuruAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('💧 ¡Logro Rimuru: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#4FC3F7');
    } catch(e) {
        console.error('Error checking rimuru achievements:', e);
    }
}
