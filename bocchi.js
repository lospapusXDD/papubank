/* ═══════════════════════════════════════════════
   BOCCHI THE ROCK! — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const BOCCHI_RANKS = [
    {
        key: 'bocchi',
        label: 'Hitori Gotoh',
        icon: 'fa-solid fa-guitar',
        weapon: 'Guitar',
        weaponIcon: 'fa-solid fa-guitar',
        color: '#FF69B4',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'La guitarrista solitaria de Kessoku Band. Toca en su cuarto y se pone nerviosa con la gente.',
        grade: 'E'
    },
    {
        key: 'kita',
        label: 'Kita Ikuyo',
        icon: 'fa-solid fa-microphone',
        weapon: 'Mic',
        weaponIcon: 'fa-solid fa-microphone',
        color: '#FF4500',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La vocalista y guitarrista rítmica. Social, energética y fan de las idols.',
        grade: 'D'
    },
    {
        key: 'ryo',
        label: 'Yamada Ryo',
        icon: 'fa-solid fa-drum',
        weapon: 'Bass',
        weaponIcon: 'fa-solid fa-drum',
        color: '#4169E1',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'La bajista. Fría, misteriosa y con gustos musicales poco convencionales.',
        grade: 'B'
    },
    {
        key: 'nijika',
        label: 'Ijichi Nijika',
        icon: 'fa-solid fa-drum',
        weapon: 'Drums',
        weaponIcon: 'fa-solid fa-drum',
        color: '#FFD700',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'La baterista y leader de Kessoku Band. La columna vertebral del grupo.',
        grade: 'A'
    },
    {
        key: 'kessoku',
        label: 'Kessoku Band (full)',
        icon: 'fa-solid fa-music',
        weapon: 'Band',
        weaponIcon: 'fa-solid fa-music',
        color: '#FF1493',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'La banda completa unida. El poder del rock los conecta a todos.',
        grade: 'S'
    },
    {
        key: 'legend',
        label: 'Leyenda del Guitar Hero',
        icon: 'fa-solid fa-trophy',
        weapon: 'Star',
        weaponIcon: 'fa-solid fa-star',
        color: '#FFD700',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'La leyenda suprema del guitar hero. Gotoh trasciende su miedo y brilla como una estrella.',
        grade: 'SSS'
    }
];

const BOCCHI_ITEMS = [
    { id: 'guitar_pick', name: 'Pua Dorada', icon: 'fa-solid fa-pickaxe', price: 500000, reward: 100000, desc: 'Una pua dorada que brilla con la luz del escenario. +20% PPC.' },
    { id: 'amp', name: 'Amplificador Total', icon: 'fa-solid fa-volume-high', price: 2000000, reward: 500000, desc: 'Un amplificador que hace retumbar todo el estacionamiento. +40% PPC.' },
    { id: 'stage', name: 'Escenario Completo', icon: 'fa-solid fa-ticket', price: 10000000, reward: 2000000, desc: 'Un escenario completo con luces, sonido y todo. +80% PPC.' }
];

const BOCCHI_ACHIEVEMENTS = [
    { id: 'first_bocchi', icon: 'fa-solid fa-guitar', name: 'Primera Nota', desc: 'Compra tu primer rango de Bocchi the Rock!', reward: 2000 },
    { id: 'collect_3_bc', icon: 'fa-solid fa-music', name: 'Trío Kessoku', desc: 'Obtén 3 rangos de Bocchi the Rock!', reward: 10000 },
    { id: 'collect_6_bc', icon: 'fa-solid fa-trophy', name: 'Banda Completa', desc: 'Colecciona todos los 6 rangos.', reward: 100000 },
    { id: 'legend_rank', icon: 'fa-solid fa-star', name: 'Guitar Hero Legendario', desc: 'Alcanza el rango Leyenda del Guitar Hero.', reward: 250000 }
];
// Achievement check is already built into checkBocchiAchievements

/* ─────────── RENDER ─────────── */

function loadBocchiPage() {
    const container = document.getElementById('bocchi-container');
    if (!container) return;

    const userRank = currentUser?.bocchiRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(255,105,180,0.08),rgba(0,0,0,0));border-color:rgba(255,105,180,0.3);">
            <div style="font-size:40px;color:#FF69B4;margin-bottom:10px;"><i class="fa-solid fa-guitar"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#FF69B4;">Bocchi the Rock!</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#FF69B4;">${userRank ? BOCCHI_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-guitar" style="color:#FF69B4;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    BOCCHI_RANKS.forEach(rank => {
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
                <div style="text-align:center;font-size:9px;color:#aaa;margin-bottom:8px;">Tier ${rank.gradeTier} · Grade ${rank.grade}</div>
                ${rank.gradeTier >= 3 ? '<div style="text-align:center;font-size:9px;color:#ff9800;margin-bottom:8px;"><i class="fa-solid fa-triangle-exclamation"></i> Requiere ambos pagos</div>' : ''}
                ${isOwned 
                    ? '<div style="text-align:center;color:' + rank.color + ';font-size:11px;font-weight:bold;">✓ ADQUIRIDO</div>'
                    : `<button class="btn btn-primary btn-full" onclick="buyBocchiRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    BOCCHI_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyBocchiItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyBocchiRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = BOCCHI_RANKS.find(r => r.key === rankKey);
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
            bocchiRank: rank.key,
            boughtRanks: boughtRanks
        });

        currentUser.bocchiRank = rank.key;
        currentUser.boughtRanks = boughtRanks;

        await addTx({ type: 'Rango Bocchi', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Bocchi the Rock!: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 🎸`, '#FF69B4');
        loadBocchiPage();
        if (window.loadDashboard) window.loadDashboard();
        checkBocchiAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyBocchiItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = BOCCHI_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Bocchi', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 🎸`, '#FF69B4');
        loadBocchiPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkBocchiAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.bocchiAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of BOCCHI_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_bocchi' && userData.bocchiRank) newly.push(ach);
            if (ach.id === 'collect_3_bc' && boughtRanks.filter(r => BOCCHI_RANKS.some(cr => cr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_6_bc' && boughtRanks.filter(r => BOCCHI_RANKS.some(cr => cr.key === r)).length >= 6) newly.push(ach);
            if (ach.id === 'legend_rank' && userData.bocchiRank === 'legend') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            bocchiAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🎸 ¡Logro Bocchi: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#FF69B4');
    } catch(e) {
        console.error('Error checking bocchi achievements:', e);
    }
}
