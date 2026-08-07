/* ═══════════════════════════════════════════════
   CHAINSAW MAN — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const CHAINSAW_RANKS = [
    {
        key: 'denji',
        label: 'Denji',
        icon: 'fa-solid fa-chainsaw',
        weapon: 'Chainsaw Man',
        weaponIcon: 'fa-solid fa-saw',
        color: '#ff4444',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'El Cazador de Demonios con el poder de Pochita. Sierras en manos, pecho y cabeza.',
        grade: 'E'
    },
    {
        key: 'power',
        label: 'Power',
        icon: 'fa-solid fa-skull',
        weapon: 'Blood Hammer',
        weaponIcon: 'fa-solid fa-hammer',
        color: '#ff6b6b',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'Demonio de la Sangre. Su martillo de sangre es devastador. Narcisista y poderosa.',
        grade: 'D'
    },
    {
        key: 'makima',
        label: 'Makima',
        icon: 'fa-solid fa-spider',
        weapon: 'Control Chains',
        weaponIcon: 'fa-solid fa-link',
        color: '#e74c3c',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'El Demonio de la Control. Cadenas que dominan cualquier mente. La jefa de la División 4.',
        grade: 'B'
    },
    {
        key: 'aki',
        label: 'Aki Hayakawa',
        icon: 'fa-solid fa-bolt',
        weapon: 'Future Devil Contract',
        weaponIcon: 'fa-solid fa-eye',
        color: '#3498db',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'Cazador de demonios con contrato del Demonio del Futuro. Katana y granadas.',
        grade: 'A'
    },
    {
        key: 'quanxi',
        label: 'Quanxi',
        icon: 'fa-solid fa-wind',
        weapon: 'Crossbows of Light',
        weaponIcon: 'fa-solid fa-crosshairs',
        color: '#9b59b6',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'La Primera Cazadora de Demonios de China. Velocidad sobrehumana y ballestas de luz.',
        grade: 'A'
    },
    {
        key: 'reze',
        label: 'Reze',
        icon: 'fa-solid fa-bomb',
        weapon: 'Bomb Hybrid',
        weaponIcon: 'fa-solid fa-explosion',
        color: '#f39c12',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'La Híbrida de la Bomba. Se convierte en arma de destrucción masiva.',
        grade: 'S'
    },
    {
        key: 'darkness',
        label: 'Darkness Devil',
        icon: 'fa-solid fa-moon',
        weapon: 'Darkness Blade',
        weaponIcon: 'fa-solid fa-scissors',
        color: '#1a1a2e',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'El Demonio de la Oscuridad. El más temido de todos. Su espada corta la realidad.',
        grade: 'SSS'
    }
];

const CHAINSAW_ITEMS = [
    { id: 'pochita_plush', name: 'Peluche de Pochita', icon: 'fa-solid fa-heart', price: 500000, reward: 100000, desc: 'Un peluche naranja que te da suerte.' },
    { id: 'chainsaw_arm', name: 'Brazo de Sierra', icon: 'fa-solid fa-hand-fist', price: 2000000, reward: 500000, desc: 'Un brazo que se convierte en sierra. +20% PPC.' },
    { id: 'devil_contract', name: 'Contrato Demoníaco', icon: 'fa-solid fa-file-signature', price: 10000000, reward: 2000000, desc: 'Firma un contrato con un demonio. +50% PPC.' }
];

const CHAINSAW_ACHIEVEMENTS = [
    { id: 'first_chainsaw', icon: 'fa-solid fa-saw', name: 'Primer Corte', desc: 'Compra tu primer rango de Chainsaw Man.', reward: 2000 },
    { id: 'collect_3_cs', icon: 'fa-solid fa-skull', name: 'Trío Demoníaco', desc: 'Obtén 3 rangos de Chainsaw Man.', reward: 10000 },
    { id: 'collect_7_cs', icon: 'fa-solid fa-crown', name: 'Cazador Legendario', desc: 'Colecciona todos los 7 rangos.', reward: 100000 },
    { id: 'darkness_rank', icon: 'fa-solid fa-moon', name: 'Señor de la Oscuridad', desc: 'Alcanza el rango Darkness Devil.', reward: 250000 }
];

/* ─────────── RENDER ─────────── */

function loadChainsawPage() {
    const container = document.getElementById('chainsaw-container');
    if (!container) return;

    const userRank = currentUser?.chainsawRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(255,68,68,0.08),rgba(0,0,0,0));border-color:rgba(255,68,68,0.3);">
            <div style="font-size:40px;color:#ff4444;margin-bottom:10px;"><i class="fa-solid fa-saw"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#ff4444;">Chainsaw Man</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#ff4444;">${userRank ? CHAINSAW_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-skull" style="color:#ff4444;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    CHAINSAW_RANKS.forEach(rank => {
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
                    : `<button class="btn btn-primary btn-full" onclick="buyChainsawRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    CHAINSAW_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyChainsawItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyChainsawRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = CHAINSAW_RANKS.find(r => r.key === rankKey);
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
            chainsawRank: rank.key,
            boughtRanks: window._fbArrayUnion(rank.key)
        });

        currentUser.chainsawRank = rank.key;

        await addTx({ type: 'Rango Chainsaw', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Chainsaw Man: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 🪚`, '#ff4444');
        loadChainsawPage();
        if (window.loadDashboard) window.loadDashboard();
        checkChainsawAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyChainsawItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = CHAINSAW_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Chainsaw', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 🪚`, '#ff4444');
        loadChainsawPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkChainsawAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.chainsawAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of CHAINSAW_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_chainsaw' && userData.chainsawRank) newly.push(ach);
            if (ach.id === 'collect_3_cs' && boughtRanks.filter(r => CHAINSAW_RANKS.some(cr => cr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_7_cs' && boughtRanks.filter(r => CHAINSAW_RANKS.some(cr => cr.key === r)).length >= 7) newly.push(ach);
            if (ach.id === 'darkness_rank' && userData.chainsawRank === 'darkness') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            chainsawAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🪚 ¡Logro Chainsaw: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#ff4444');
    } catch(e) {
        console.error('Error checking chainsaw achievements:', e);
    }
}
