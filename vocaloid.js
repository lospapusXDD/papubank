/* ═══════════════════════════════════════════════
   VOCALOID — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const VOCALOID_RANKS = [
    {
        key: 'luka',
        label: 'Megurine Luka',
        icon: 'fa-solid fa-music',
        weapon: 'Mic',
        weaponIcon: 'fa-solid fa-microphone',
        color: '#FFB7C5',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'La diva de la rosa. Voz etérea que conquista corazones con melodías suaves.',
        grade: 'E'
    },
    {
        key: 'kaito',
        label: 'KAITO',
        icon: 'fa-solid fa-microphone',
        weapon: 'Scarf',
        weaponIcon: 'fa-solid fa-muffin',
        color: '#4169E1',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'El ícono azul con su bufón icónico. Voz profunda que vibra en el alma.',
        grade: 'D'
    },
    {
        key: 'meiko',
        label: 'MEIKO',
        icon: 'fa-solid fa-martini-glass-citrus',
        weapon: 'Bottle',
        weaponIcon: 'fa-solid fa-wine-bottle',
        color: '#8B0000',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'La pionera de la Vocaloid japonesa. Poder y pasión en cada nota.',
        grade: 'B'
    },
    {
        key: 'rin',
        label: 'Kagamine Rin',
        icon: 'fa-solid fa-bow',
        weapon: 'Ribbon',
        weaponIcon: 'fa-solid fa-ribbon',
        color: '#FFD700',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'La gemela dorada. Energía infinita y voz cristalina que rompe límites.',
        grade: 'A'
    },
    {
        key: 'len',
        label: 'Kagamine Len',
        icon: 'fa-solid fa-bow',
        weapon: 'Ribbon',
        weaponIcon: 'fa-solid fa-ribbon',
        color: '#FFD700',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'El gemelo dorado. Melodías que desafían la gravedad y la razón.',
        grade: 'A'
    },
    {
        key: 'teto',
        label: 'Kasane Teto',
        icon: 'fa-solid fa-bolt',
        weapon: 'Twin Drills',
        weaponIcon: 'fa-solid fa-screwdriver-wrench',
        color: '#FF1493',
        price: 40000000,
        price_usd: 1300,
        gradeTier: 2,
        mult: 4,
        desc: 'La Reina de los UTAU. Cabello rosa con brocas, voz que hipnotiza y virus que conquista.',
        grade: 'A'
    },
    {
        key: 'miku',
        label: 'Hatsune Miku',
        icon: 'fa-solid fa-headphones',
        weapon: 'Leek',
        weaponIcon: 'fa-solid fa-carrot',
        color: '#39C5BB',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'La diva virtual suprema. La voz que unió al mundo entero bajo una misma melodía.',
        grade: 'S'
    },
    {
        key: 'virtual',
        label: 'Virtual Diva Suprema',
        icon: 'fa-solid fa-crown',
        weapon: 'Concert',
        weaponIcon: 'fa-solid fa-music',
        color: '#FF1493',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'La leyenda definitiva del vocaloid. Su concierto transcende la realidad misma.',
        grade: 'SSS'
    }
];

const VOCALOID_ITEMS = [
    { id: 'leek', name: 'Leek de Miku', icon: 'fa-solid fa-carrot', price: 500000, reward: 100000, desc: 'El icónico puerro de Miku. +20% PPC en vocaloid.' },
    { id: 'concert_ticket', name: 'Entrada Virtual', icon: 'fa-solid fa-ticket', price: 2000000, reward: 500000, desc: 'Ticket para el concierto virtual definitivo. +30% PPC.' },
    { id: 'vocaloid_studio', name: 'Estudio Virtual', icon: 'fa-solid fa-headphones', price: 10000000, reward: 2000000, desc: 'Tu propio estudio de producción vocaloid. +50% PPC.' }
];

const VOCALOID_ACHIEVEMENTS = [
    { id: 'first_vocaloid', icon: 'fa-solid fa-music', name: 'Primera Canción', desc: 'Compra tu primer rango de Vocaloid.', reward: 2000 },
    { id: 'collect_3_voc', icon: 'fa-solid fa-headphones', name: 'Trío Virtual', desc: 'Obtén 3 rangos de Vocaloid.', reward: 10000 },
    { id: 'collect_7_voc', icon: 'fa-solid fa-crown', name: 'Coleccionista Vocaloid', desc: 'Colecciona todos los 8 rangos.', reward: 100000 },
    { id: 'miku_rank', icon: 'fa-solid fa-star', name: 'Diva Virtual Suprema', desc: 'Alcanza el rango Hatsune Miku.', reward: 250000 }
];
// Achievement check is already built into checkVocaloidAchievements

/* ─────────── RENDER ─────────── */

function loadVocaloidPage() {
    const container = document.getElementById('vocaloid-container');
    if (!container) return;

    const userRank = currentUser?.vocaloidRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(57,197,187,0.08),rgba(0,0,0,0));border-color:rgba(57,197,187,0.3);">
            <div style="font-size:40px;color:#39C5BB;margin-bottom:10px;"><i class="fa-solid fa-headphones"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#39C5BB;">Vocaloids</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#39C5BB;">${userRank ? VOCALOID_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-music" style="color:#39C5BB;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    VOCALOID_RANKS.forEach(rank => {
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
                    : `<button class="btn btn-primary btn-full" onclick="buyVocaloidRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    VOCALOID_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyVocaloidItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyVocaloidRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = VOCALOID_RANKS.find(r => r.key === rankKey);
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
            vocaloidRank: rank.key,
            boughtRanks: window._fbArrayUnion(rank.key)
        });

        currentUser.vocaloidRank = rank.key;
        grantRankLocal(rank.key);

        await addTx({ type: 'Rango Vocaloid', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Vocaloid: ${rank.label}` });

        showToast(`¡Rango ${rank.label} adquirido! 🎵`, '#39C5BB');
        loadVocaloidPage();
        if (window.loadDashboard) window.loadDashboard();
        checkVocaloidAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyVocaloidItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = VOCALOID_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Vocaloid', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC 🎵`, '#39C5BB');
        loadVocaloidPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkVocaloidAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.vocaloidAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of VOCALOID_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_vocaloid' && userData.vocaloidRank) newly.push(ach);
            if (ach.id === 'collect_3_voc' && boughtRanks.filter(r => VOCALOID_RANKS.some(cr => cr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_7_voc' && boughtRanks.filter(r => VOCALOID_RANKS.some(cr => cr.key === r)).length >= 8) newly.push(ach);
            if (ach.id === 'miku_rank' && userData.vocaloidRank === 'miku') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            vocaloidAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🎵 ¡Logro Vocaloid: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#39C5BB');
    } catch(e) {
        console.error('Error checking vocaloid achievements:', e);
    }
}
