/* Shop and Marketplace module */

let flashSale = { active: false, endsAt: 0 };

function isFlashSaleActive() {
    if (!flashSale.active) return false;
    if (Date.now() > flashSale.endsAt) { flashSale.active = false; return false; }
    return true;
}

function getMarketPrice(item) {
    if (!isFlashSaleActive()) return item.price;
    return Math.floor(item.price / 2);
}

function renderFlashSaleBanner() {
    const banner = document.getElementById('flash-sale-banner');
    if (!banner) return;
    if (isFlashSaleActive()) {
        const mins = Math.max(0, Math.ceil((flashSale.endsAt - Date.now()) / 60000));
        banner.style.display = 'flex';
        banner.innerHTML = `<i class="fa-solid fa-bolt"></i> <strong>FLASH SALE 50% OFF</strong> — Todos los items de la tienda a mitad de precio. <span style="font-family:'Orbitron',sans-serif;color:var(--danger);">⏳ ${mins} min restantes</span>`;
    } else {
        banner.style.display = 'none';
    }
}

const MARKET_ITEMS = [
    { id:'role_color',  name:'Color de Nombre', icon:'fa-solid fa-palette', price:500,   desc:'Cambia el color de tu nick en el servidor.', type:'cosmetic' },
    { id:'vip_badge',   name:'Badge VIP',       icon:'fa-solid fa-gem', price:1000,  desc:'Badge exclusivo VIP en tu perfil del banco.',  type:'cosmetic' },
    { id:'bonus_100',   name:'Bonus 100 PPC',   icon:'fa-solid fa-coins', price:80,    desc:'Recibes 100 PPC extra al instante.',            type:'instant'  },
    { id:'bonus_500',   name:'Bonus 500 PPC',   icon:'fa-solid fa-money-bill-wave', price:350,   desc:'Recibes 500 PPC extra al instante.',            type:'instant'  },
    { id:'protection',  name:'Protección 24h',  icon:'fa-solid fa-shield-halved', price:200,   desc:'Protege tu cuenta de deudas o burns por 24 horas.', type:'protection' },
    { id:'interest_x2', name:'Interés x2',      icon:'fa-solid fa-chart-line', price:300,   desc:'Tu interés mensual se duplica por 7 días.',     type:'boost'    },
    { id:'lucky_box',   name:'Caja Misteriosa',  icon:'fa-solid fa-box-open', price:150,   desc:'Gana entre 10 y 2000 PPC al azar.',             type:'gamble'   },
    { id:'loan_ext',    name:'Extensión Préstamo',icon:'fa-solid fa-calendar-plus', price:100,  desc:'Extiende tu préstamo activo 7 días más.',       type:'utility'  },
    { id:'jjk_hechicero_badge', name:'Badge Hechicero JJK', icon:'fa-solid fa-bolt', price:2500, desc:'Badge de hechicero de Jujutsu en tu perfil del banco. Brilla con energía maldita.', type:'cosmetic' },
    { id:'domain_shield', name:'Domain Expansion Shield', icon:'fa-solid fa-square', price:6000, desc:'Protege tu cuenta por 72 horas contra congelaciones y penalizaciones.', type:'protection' },
    { id:'hollow_purple_boost', name:'Hollow Purple Boost', icon:'fa-solid fa-circle', price:3500, desc:'Tus próximas 5 transferencias son sin comisión. Técnica combinada suprema.', type:'boost' },
    { id:'sukuna_finger_item', name:'Dedo de Sukuna', icon:'fa-solid fa-hand', price:15000, desc:'Item ultra raro. Entrega 8000 PPC al instante y un badge maldito permanente.', type:'instant' },
    { id:'six_eyes_item', name:'Ojos de Seis Ojos', icon:'fa-solid fa-eye', price:9000, desc:'Revela las estadísticas completas de cualquier usuario por 24 horas.', type:'utility' },
    { id:'reverse_cursed_item', name:'Técnica Invertida', icon:'fa-solid fa-heart-pulse', price:4500, desc:'Recupera el 60% de tu última pérdida en minijuegos (máx 2000 PPC).', type:'utility' },
    { id:'black_flash', name:'Black Flash', icon:'fa-solid fa-bolt-lightning', price:5000, desc:'Multiplica por 1.8x tu próxima ganancia en cualquier minijuego. Un solo uso.', type:'boost' },
    { id:'curtain_item', name:'Cortina Maldita', icon:'fa-solid fa-mask', price:2000, desc:'Oculta tu saldo del leaderboard por 48 horas. Nadie sabrá cuánto tienes.', type:'utility' }
];

function renderMarket() {
    const marketGrid = document.getElementById('market-items-grid');
    if (!marketGrid) return;

    renderFlashSaleBanner();
    const sale = isFlashSaleActive();

    marketGrid.innerHTML = '';
    MARKET_ITEMS.forEach(item => {
        const price = getMarketPrice(item);
        const card = document.createElement('div');
        card.className = 'glass-card text-center';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justify = 'space-between';

        card.innerHTML = `
            <div style="font-size: 32px; color: var(--primary); margin-bottom: 12px;">
                <i class="${item.icon}"></i>
            </div>
            <h3 style="font-size: 15px; margin-bottom: 8px; font-family: 'Orbitron', sans-serif;">${item.name}</h3>
            <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 15px; flex-grow: 1;">${item.desc}</p>
            <div style="font-family: 'Orbitron', sans-serif; font-size: 14px; color: var(--gold); font-weight: bold; margin-bottom: 15px;">
                ${sale ? `<span style="text-decoration:line-through;color:var(--text-muted);font-size:11px;margin-right:8px;">${item.price.toLocaleString()}</span>` : ''}${price.toLocaleString()} PPC
                ${sale ? '<span class="badge-tag" style="background:rgba(255,68,102,0.2);color:#ff4466;border-color:#ff4466;margin-left:6px;font-size:9px;">-50%</span>' : ''}
            </div>
            <button class="btn btn-secondary btn-full" onclick="buyMarketItem('${item.id}', ${price})">Comprar</button>
        `;
        marketGrid.appendChild(card);
    });
}

async function buyMarketItem(itemId, price) {
    if (!currentUser || !bankAccount) {
        showToast('Debes iniciar sesión para comprar', '#ff4466');
        return;
    }

    const item = MARKET_ITEMS.find(x => x.id === itemId);
    if (!item) return;

    const finalPrice = getMarketPrice(item);
    if (price !== finalPrice) price = finalPrice;

    if (bankAccount.balance < price) {
        showToast('Saldo insuficiente de PPC', '#ff4466');
        return;
    }
    
    const approved = await showConfirm('Confirmar Compra', `¿Deseas comprar "${item.name}" por ${price.toLocaleString()} PPC?${isFlashSaleActive() ? '<br><b style="color:#ff4466">🔥 FLASH SALE 50% OFF activo!</b>' : ''}`);
    if (!approved) return;
    
    try {
        // Deduct money from balance and add item to inventory or execute instant action
        const db = window._db;
        const docRef = window._fbDoc(db, 'bank_accounts', currentUser.nick);
        
        let updates = {
            balance: window._fbIncrement(-price)
        };
        
        // Log transaction
        await addTx({
            type: 'Compra Tienda',
            from: currentUser.nick,
            to: 'Tienda',
            amount: price,
            note: `Compra de item: ${item.name}`
        });
        
        if (item.type === 'instant') {
            // Aplicar multiplicador de rango a recompensas de tienda
            const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
            
            if (itemId === 'bonus_100') {
                const reward = Math.round(100 * mult);
                updates.balance = window._fbIncrement(reward - price);
                await addTx({ type: 'Recompensa Tienda', from: 'Tienda', to: currentUser.nick, amount: reward, note: `Item instantáneo: ${item.name} (×${mult.toFixed(2)})` });
                showToast(`¡Bonus 100 PPC + multiplicador! Recibes ${reward.toLocaleString()} PPC (×${mult.toFixed(2)})`, '#00ffaa');
            } else if (itemId === 'bonus_500') {
                const reward = Math.round(500 * mult);
                updates.balance = window._fbIncrement(reward - price);
                await addTx({ type: 'Recompensa Tienda', from: 'Tienda', to: currentUser.nick, amount: reward, note: `Item instantáneo: ${item.name} (×${mult.toFixed(2)})` });
                showToast(`¡Bonus 500 PPC + multiplicador! Recibes ${reward.toLocaleString()} PPC (×${mult.toFixed(2)})`, '#00ffaa');
            } else if (itemId === 'sukuna_finger_item') {
                const reward = Math.round(8000 * mult);
                updates.balance = window._fbIncrement(reward - price);
                // Add permanent cursed badge
                let badges = bankAccount.badges || [];
                if (!badges.includes('maldito')) badges.push('maldito');
                updates.badges = badges;
                await addTx({ type: 'Recompensa Tienda', from: 'Tienda', to: currentUser.nick, amount: reward, note: `Item instantáneo: ${item.name} (×${mult.toFixed(2)})` });
                showToast(`¡Dedo de Sukuna + multiplicador! Recibes ${reward.toLocaleString()} PPC (×${mult.toFixed(2)})`, '#00ffaa');
            }
        } else {
            // Add item to inventory/properties
            let inventory = bankAccount.inventory || [];
            inventory.push(itemId);
            updates.inventory = inventory;
        }
        
        await window._fbUpdateDoc(docRef, updates);
        showToast(`¡Compraste ${item.name} con éxito!`, '#00ffaa');
        if (window.trackActivity) window.trackActivity('shop', price);
        if (typeof checkAchievements === 'function') checkAchievements();
        
        // Reload dashboard or market view
        if (window.loadDashboard) window.loadDashboard();
        renderMarket();
    } catch(e) {
        console.error(e);
        showToast('Error al procesar la compra', '#ff4466');
    }
}
