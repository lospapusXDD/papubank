/* ═══════════════════════════════════════════════
   MUSHOKU TENSEI — RANGOS Y SISTEMA
══════════════════════════════════════════════ */

const MUSHOKU_RANKS = [
    {
        key: 'rudeus',
        label: 'Rudeus Greyrat',
        icon: 'fa-solid fa-hat-wizard',
        weapon: 'La Magia Más Fuerte',
        weaponIcon: 'fa-solid fa-wand-magic-sparkles',
        color: '#3498db',
        price: 2000000,
        price_usd: 100,
        gradeTier: 1,
        mult: 1.5,
        desc: 'El mago prodigio reencarnado. Domina todas las escuelas de magia. Amable pero poderoso.',
        grade: 'E'
    },
    {
        key: 'eris',
        label: 'Eris Boreas Greyrat',
        icon: 'fa-solid fa-shield-halved',
        weapon: 'Espada Roja',
        weaponIcon: 'fa-solid fa-sword',
        color: '#e74c3c',
        price: 5000000,
        price_usd: 200,
        gradeTier: 1,
        mult: 2,
        desc: 'La espada roja más feroz del continente. Pasión y fuerza bruta en un solo golpe.',
        grade: 'D'
    },
    {
        key: 'sylphie',
        label: 'Sylphiette',
        icon: 'fa-solid fa-feather',
        weapon: 'Magia del Viento',
        weaponIcon: 'fa-solid fa-wind',
        color: '#2ecc71',
        price: 15000000,
        price_usd: 500,
        gradeTier: 2,
        mult: 3,
        desc: 'La elfa verde que dominó la magia de curación y se convirtió en la más fuerte.',
        grade: 'B'
    },
    {
        key: 'roxanne',
        label: 'Roxy Migurdia',
        icon: 'fa-solid fa-magic',
        weapon: 'Magia del Demonio',
        weaponIcon: 'fa-solid fa-hat-wizard',
        color: '#9b59b6',
        price: 25000000,
        price_usd: 800,
        gradeTier: 2,
        mult: 3.5,
        desc: 'La maga demonio que enseñó magia a Rudeus. Su poder es legendario.',
        grade: 'A'
    },
    {
        key: 'orsted',
        label: 'Orsted',
        icon: 'fa-solid fa-dragon',
        weapon: 'Dragon God Aura',
        weaponIcon: 'fa-solid fa-fire',
        color: '#f39c12',
        price: 60000000,
        price_usd: 2000,
        gradeTier: 3,
        mult: 5,
        desc: 'El Dios Dragón que repite el tiempo. Su poder es incomparable. El verdadero rey.',
        grade: 'SS'
    },
    {
        key: 'laplace',
        label: 'Laplace Demon',
        icon: 'fa-solid fa-skull-crossbones',
        weapon: 'Magia Demoníaca',
        weaponIcon: 'fa-solid fa-bolt',
        color: '#8e44ad',
        price: 100000000,
        price_usd: 3300,
        gradeTier: 3,
        mult: 7,
        desc: 'El demonio que dividió el mundo. Su poder destruyó civilizaciones enteras.',
        grade: 'SSS'
    }
];

const MUSHOKU_ITEMS = [
    { id: 'manatite_crystal', name: 'Cristal de Manatite', icon: 'fa-solid fa-gem', price: 500000, reward: 100000, desc: 'Cristal que amplifica la magia. +15% PPC.' },
    { id: 'magic_ore', name: 'Mineral Mágico', icon: 'fa-solid fa-diamond', price: 2000000, reward: 500000, desc: 'Mineral raro que fortalece el cuerpo. +30% PPC.' },
    { id: 'godstone', name: 'Piedra Divina', icon: 'fa-solid fa-star', price: 10000000, reward: 2000000, desc: 'La piedra más poderosa del mundo. +60% PPC.' }
];

const MUSHOKU_ACHIEVEMENTS = [
    { id: 'first_mushoku', icon: 'fa-solid fa-hat-wizard', name: 'Primer Hechizo', desc: 'Compra tu primer rango de Mushoku Tensei.', reward: 2000 },
    { id: 'collect_3_mu', icon: 'fa-solid fa-book', name: 'Maestro del Grimorio', desc: 'Obtén 3 rangos de Mushoku Tensei.', reward: 10000 },
    { id: 'collect_6_mu', icon: 'fa-solid fa-crown', name: 'Leyenda del Mundo', desc: 'Colecciona todos los 6 rangos.', reward: 100000 },
    { id: 'orsted_rank', icon: 'fa-solid fa-dragon', name: 'Dios Dragón', desc: 'Alcanza el rango Orsted.', reward: 250000 }
];

/* ─────────── RENDER ─────────── */

function loadMushokuPage() {
    const container = document.getElementById('mushoku-container');
    if (!container) return;

    const userRank = currentUser?.mushokuRank;

    let html = `
        <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(52,152,219,0.08),rgba(0,0,0,0));border-color:rgba(52,152,219,0.3);">
            <div style="font-size:40px;color:#3498db;margin-bottom:10px;"><i class="fa-solid fa-hat-wizard"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:#3498db;">Mushoku Tensei</h2>
            <p style="font-size:12px;color:var(--text-muted);">Rango actual: <strong style="color:#3498db;">${userRank ? MUSHOKU_RANKS.find(r => r.key === userRank)?.label || 'Ninguno' : 'Ninguno'}</strong></p>
        </div>
        
        <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-hat-wizard" style="color:#3498db;"></i> Rangos Disponibles</h3>
        <div class="grid-container">
    `;

    MUSHOKU_RANKS.forEach(rank => {
        const isOwned = currentUser?.boughtRanks?.includes(rank.key);
        const ppcBalance = bankAccount?.balance || 0;
        const pusdBalance = currentUser?.pusdBalance || 0;
        let canBuy = false;
        if (!isOwned) {
            if (rank.gradeTier >= 3) {
                canBuy = ppcBalance >= rank.price && pusdBalance >= rank.price_usd;
            } else {
                canBuy = ppcBalance >= rank.price || pusdBalance >= rank.price_usd;
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
                ${isOwned
                    ? '<div style="text-align:center;color:' + rank.color + ';font-size:11px;font-weight:bold;">✓ ADQUIRIDO</div>'
                    : `<div style="display:flex;gap:8px;justify-content:center;margin-bottom:${rank.gradeTier >= 3 ? '4px' : '10px'};">
                        <span style="font-size:11px;color:#2ecc71;font-weight:bold;">${rank.price.toLocaleString()} PPC</span>
                        <span style="font-size:11px;color:var(--gold);font-weight:bold;">$${rank.price_usd.toLocaleString()} P-USD</span>
                    </div>
                    ${rank.gradeTier >= 3 ? '<div style="text-align:center;font-size:9px;color:var(--text-muted);margin-bottom:6px;font-style:italic;">Requiere ambos pagos</div>' : ''}
                    <button class="btn btn-primary btn-full" onclick="buyMushokuRank('${rank.key}')" ${!canBuy ? 'disabled style="opacity:0.5;"' : ''}>${canBuy ? 'Comprar' : 'Saldo Insuficiente'}</button>`
                }
            </div>
        `;
    });

    html += `</div>
        <h3 class="section-title" style="font-size:14px;margin-top:24px;"><i class="fa-solid fa-gem" style="color:var(--gold);"></i> Items Especiales</h3>
        <div class="grid-container">
    `;

    MUSHOKU_ITEMS.forEach(item => {
        html += `
            <div class="glass-card">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${item.icon}" style="font-size:24px;color:var(--primary);"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;text-align:center;margin-bottom:8px;">${item.name}</h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;margin-bottom:10px;">${item.desc}</p>
                <button class="btn btn-primary btn-full" onclick="buyMushokuItem('${item.id}')" style="font-size:11px;">
                    ${item.price.toLocaleString()} PPC
                </button>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

async function buyMushokuRank(rankKey) {
    if (!currentUser || !window._db) return;
    
    const rank = MUSHOKU_RANKS.find(r => r.key === rankKey);
    if (!rank) return;
    
    const needsBoth = rank.gradeTier >= 3;
    const confirmMsg = needsBoth
        ? `¿Comprar ${rank.label} por ${rank.price.toLocaleString()} PPC + $${rank.price_usd.toLocaleString()} P-USD?`
        : `¿Comprar ${rank.label}? (${rank.price.toLocaleString()} PPC o $${rank.price_usd.toLocaleString()} P-USD)`;
    const ok = await showConfirm('Comprar Rango', confirmMsg);
    if (!ok) return;

    try {
        const accRef = window._fbDoc(window._db, 'bank_accounts', currentUser.nick);
        const accSnap = await window._fbGetDoc(accRef);
        const ppcBalance = accSnap.exists() ? (accSnap.data().balance || 0) : 0;
        const pusdBalance = currentUser?.pusdBalance || 0;

        if (needsBoth) {
            if (ppcBalance < rank.price || pusdBalance < rank.price_usd) {
                showToast('Saldo insuficiente', '#ff4466');
                return;
            }
            await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(-rank.price) });
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
                pusdBalance: window._fbIncrement(-rank.price_usd)
            });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            await addTx({ type: 'Rango Mushoku', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Mushoku: ${rank.label} (PPC + P-USD)` });
        } else {
            if (pusdBalance >= rank.price_usd) {
                await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
                    pusdBalance: window._fbIncrement(-rank.price_usd)
                });
                currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
                await addTx({ type: 'Rango Mushoku', from: currentUser.nick, to: 'Banco', amount: rank.price_usd, note: `Rango Mushoku: ${rank.label} (P-USD)` });
            } else if (ppcBalance >= rank.price) {
                await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(-rank.price) });
                await addTx({ type: 'Rango Mushoku', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Mushoku: ${rank.label} (PPC)` });
            } else {
                showToast('Saldo insuficiente', '#ff4466');
                return;
            }
        }

        const boughtRanks = currentUser.boughtRanks || [];
        if (!boughtRanks.includes(rank.key)) boughtRanks.push(rank.key);
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            mushokuRank: rank.key,
            boughtRanks: boughtRanks
        });

        currentUser.mushokuRank = rank.key;
        currentUser.boughtRanks = boughtRanks;

        showToast(`¡Rango ${rank.label} adquirido! ✨`, '#3498db');
        loadMushokuPage();
        if (window.loadDashboard) window.loadDashboard();
        checkMushokuAchievements();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyMushokuItem(itemId) {
    if (!currentUser || !window._db) return;
    
    const item = MUSHOKU_ITEMS.find(i => i.id === itemId);
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

        await addTx({ type: 'Item Mushoku', from: currentUser.nick, to: 'Banco', amount: item.price, note: `Item: ${item.name}` });

        showToast(`¡${item.name} adquirido! +${item.reward.toLocaleString()} PPC ✨`, '#3498db');
        loadMushokuPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function checkMushokuAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const earned = userData.mushokuAchievements || [];
        const boughtRanks = userData.boughtRanks || [];

        const newly = [];
        for (const ach of MUSHOKU_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'first_mushoku' && userData.mushokuRank) newly.push(ach);
            if (ach.id === 'collect_3_mu' && boughtRanks.filter(r => MUSHOKU_RANKS.some(mr => mr.key === r)).length >= 3) newly.push(ach);
            if (ach.id === 'collect_6_mu' && boughtRanks.filter(r => MUSHOKU_RANKS.some(mr => mr.key === r)).length >= 6) newly.push(ach);
            if (ach.id === 'orsted_rank' && userData.mushokuRank === 'orsted') newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            mushokuAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('✨ ¡Logro Mushoku: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#3498db');
    } catch(e) {
        console.error('Error checking mushoku achievements:', e);
    }
}
