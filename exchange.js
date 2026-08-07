/* ═══════════════════════════════════════════════
   EXCHANGE — PPC ↔ P-USD + Tienda Premium
   Tasa fija: 1 P-USD = 10,000 PPC
══════════════════════════════════════════════ */

const EXCHANGE_RATE = 10000; // 1 P-USD = 10,000 PPC

/* ─────────── TIENDA PREMIUM (P-USD) ─────────── */

const PREMIUM_SHOP = [
    // ══════ COSMÉTICOS EXCLUSIVOS ══════
    { id: 'premium_avatar_animated',  fandom: 'Cosmético',  name: 'Avatar Animado',          price_ppc: 2000000,  price_usd: 80,   type: 'cosmetic', cosmeticKey: 'anim_avatar',  icon: 'fa-solid fa-user-astronaut', color: '#00d4ff', desc: 'Tu avatar se anima con efectos de partículas.' },
    { id: 'premium_border_fire',     fandom: 'Cosmético',  name: 'Borde Llamas',            price_ppc: 1500000,  price_usd: 60,   type: 'cosmetic', cosmeticKey: 'border_fire', icon: 'fa-solid fa-fire',           color: '#f87171', desc: 'Marco de perfil con llamas ardientes.' },
    { id: 'premium_border_galaxy',   fandom: 'Cosmético',  name: 'Borde Galaxia',           price_ppc: 1500000,  price_usd: 60,   type: 'cosmetic', cosmeticKey: 'border_galaxy', icon: 'fa-solid fa-wand-sparkles', color: '#a78bfa', desc: 'Marco con estrellas y nebulosas.' },
    { id: 'premium_nick彩虹',        fandom: 'Cosmético',  name: 'Nick Arcoíris',            price_ppc: 1000000,  price_usd: 40,   type: 'cosmetic', cosmeticKey: 'nick_rainbow', icon: 'fa-solid fa-rainbow',       color: '#f472b6', desc: 'Tu nombre cambia de color gradualmente.' },
    { id: 'premium_effect_teleport', fandom: 'Cosmético',  name: 'Efecto Teletransporte',   price_ppc: 2500000,  price_usd: 100,  type: 'cosmetic', cosmeticKey: 'fx_teleport', icon: 'fa-solid fa-bolt',           color: '#fbbf24', desc: 'Al entrar al chat apareces con efecto especial.' },

    // ══════ PETS PREMIUM ══════
    { id: 'premium_pet_phoenix',     fandom: 'Pet',        name: 'Fénix Luminosa',          price_ppc: 3000000,  price_usd: 120,  type: 'pet', petKey: 'phoenix',   icon: 'fa-solid fa-dove',           color: '#f39c12', desc: 'Renace de tus cenizas. Genera 8,000 PPC/día.' },
    { id: 'premium_pet_shadow',      fandom: 'Pet',        name: 'Sombra Veloz',            price_ppc: 2500000,  price_usd: 100,  type: 'pet', petKey: 'shadow',    icon: 'fa-solid fa-cat',            color: '#6366f1', desc: 'Acechador nocturno. +15% bonus en transferencias.' },
    { id: 'premium_pet_crystal',     fandom: 'Pet',        name: 'Dragón de Cristal',       price_ppc: 4000000,  price_usd: 160,  type: 'pet', petKey: 'crystal',   icon: 'fa-solid fa-gem',            color: '#22d3ee', desc: 'Guardián de gemas. +20% en lotería.' },

    // ══════ BOOSTERS EXCLUSIVOS ══════
    { id: 'premium_boost_daily',     fandom: 'Booster',    name: 'Bonus Diario x3',         price_ppc: 1000000,  price_usd: 40,   type: 'booster', boosterKey: 'daily3x',  icon: 'fa-solid fa-calendar-star',  color: '#22c55e', desc: 'Triplica tu bonus diario por 30 días.' },
    { id: 'premium_boost_vault',     fandom: 'Booster',    name: 'Bóveda Dorada',           price_ppc: 2000000,  price_usd: 80,   type: 'booster', boosterKey: 'vault_gold', icon: 'fa-solid fa-vault',         color: '#ffd700', desc: '+25% interés en tu bóveda por 30 días.' },
    { id: 'premium_boost_zero_fee',  fandom: 'Booster',    name: 'Transferencias Gratis',   price_ppc: 1500000,  price_usd: 60,   type: 'booster', boosterKey: 'zero_fee', icon: 'fa-solid fa-money-bill-wave', color: '#4ade80', desc: 'Sin comisiones en transferencias por 14 días.' },

    // ══════ TÍTULOS EXCLUSIVOS ══════
    { id: 'premium_title_legend',    fandom: 'Título',      name: 'Título: Leyenda',         price_ppc: 5000000,  price_usd: 200,  type: 'title', titleKey: 'legend',   icon: 'fa-solid fa-trophy',         color: '#ffd700', desc: 'Título dorado animado: 「LEYENDA」' },
    { id: 'premium_title_demon',     fandom: 'Título',      name: 'Título: Demonio',         price_ppc: 3000000,  price_usd: 120,  type: 'title', titleKey: 'demon',    icon: 'fa-solid fa-skull',           color: '#ef4444', desc: 'Título rojo sangre: 「DEMONIO」' },
    { id: 'premium_title_angel',     fandom: 'Título',      name: 'Título: Ángel',           price_ppc: 3000000,  price_usd: 120,  type: 'title', titleKey: 'angel',    icon: 'fa-solid fa-heart',           color: '#f472b6', desc: 'Título celestial brillante: 「ÁNGEL」' },

    // ══════ ITEMS FUNCIONALES ══════
    { id: 'premium_vault_expansion', fandom: 'Funcional',  name: 'Expansión de Bóveda',     price_ppc: 1500000,  price_usd: 60,   type: 'functional', funcKey: 'vault_expand', icon: 'fa-solid fa-box-open',      color: '#8b5cf6', desc: '+5 slots extra en tu bóveda personal.' },
    { id: 'premium_auto_collect',    fandom: 'Funcional',  name: 'Recolector Automático',   price_ppc: 2000000,  price_usd: 80,   type: 'functional', funcKey: 'auto_collect', icon: 'fa-solid fa-robot',          color: '#06b6d4', desc: 'Recolecta bonus diarios automáticamente.' },
    { id: 'premium_name_color',      fandom: 'Funcional',  name: 'Color de Nombre Custom',  price_ppc: 800000,   price_usd: 30,   type: 'functional', funcKey: 'name_color', icon: 'fa-solid fa-palette',         color: '#ec4899', desc: 'Elige el color exacto de tu nombre.' }
];

/* ─────────── STATE ─────────── */

let _exchangeHistory = [EXCHANGE_RATE]; // Historical rates for chart

/* ─────────── FUNCTIONS ─────────── */

function getPUSDBalance(user) {
    if (!user) return 0;
    return user.pusdBalance || 0;
}

function formatPPC(amount) {
    return amount.toLocaleString() + ' PPC';
}

function formatPUSD(amount) {
    return '$' + amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

function convertPPCtoPUSD(ppcAmount) {
    return ppcAmount / EXCHANGE_RATE;
}

function convertPUSDtoPPC(pusdAmount) {
    return pusdAmount * EXCHANGE_RATE;
}

/* ─────────── EXCHANGE OPERATIONS ─────────── */

async function exchangePPCtoPUSD(ppcAmount) {
    if (!currentUser) return false;
    if (ppcAmount <= 0) return false;
    
    const pusdAmount = convertPPCtoPUSD(ppcAmount);
    
    try {
        await apiFetch('POST', '/bank/transfer', {
            from: currentUser.nick,
            to: 'exchange',
            amount: ppcAmount,
            note: `Convertido ${formatPPC(ppcAmount)} → ${formatPUSD(pusdAmount)}`
        });
        
        await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: (currentUser.pusdBalance || 0) + pusdAmount });
        
        currentUser.pusdBalance = (currentUser.pusdBalance || 0) + pusdAmount;
        bankAccount = await apiFetch('GET', '/bank/' + currentUser.nick);
        
        showToast(`¡Convertido! ${formatPPC(ppcAmount)} → ${formatPUSD(pusdAmount)}`, '#00ffaa');
        return true;
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
        return false;
    }
}

async function exchangePUSDtoPPC(pusdAmount) {
    if (!currentUser) return false;
    if (pusdAmount <= 0) return false;
    
    const ppcAmount = convertPUSDtoPPC(pusdAmount);
    
    try {
        await apiFetch('POST', '/bank/transfer', {
            from: 'exchange',
            to: currentUser.nick,
            amount: ppcAmount,
            note: `Convertido ${formatPUSD(pusdAmount)} → ${formatPPC(ppcAmount)}`
        });
        
        await apiFetch('PUT', '/users/' + currentUser.nick, { pusdBalance: (currentUser.pusdBalance || 0) - pusdAmount });
        
        currentUser.pusdBalance = (currentUser.pusdBalance || 0) - pusdAmount;
        bankAccount = await apiFetch('GET', '/bank/' + currentUser.nick);
        
        showToast(`¡Convertido! ${formatPUSD(pusdAmount)} → ${formatPPC(ppcAmount)}`, '#00ffaa');
        return true;
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
        return false;
    }
}

/* ─────────── PREMIUM SHOP ─────────── */

async function buyPremiumItem(itemId) {
    if (!currentUser) return;
    
    const item = PREMIUM_SHOP.find(i => i.id === itemId);
    if (!item) return;
    
    const pusdBalance = currentUser.pusdBalance || 0;
    const ppcBalance = bankAccount?.balance || 0;
    
    const canPayPUSD = pusdBalance >= item.price_usd;
    const canPayPPC = ppcBalance >= item.price_ppc;
    
    if (!canPayPPC && !canPayPUSD) {
        showToast('No tienes suficiente saldo (PPC o P-USD)', '#ff4466');
        return;
    }
    
    const payMethod = canPayPUSD ? 'pustd' : 'ppc';
    const payAmount = canPayPUSD ? item.price_usd : item.price_ppc;
    
    const ok = await showConfirm('Comprar Premium', `¿Comprar ${item.name} por ${canPayPUSD ? formatPUSD(item.price_usd) : formatPPC(item.price_ppc)}?`);
    if (!ok) return;
    
    try {
        const itemKey = item.itemKey || item.cosmeticKey || item.petKey || item.boosterKey || item.titleKey || item.funcKey;
        
        await apiFetch('POST', '/inventory/buy', {
            nick: currentUser.nick,
            item_id: itemKey,
            price: payAmount,
            currency: payMethod
        });
        
        if (payMethod === 'pustd') {
            currentUser.pusdBalance -= item.price_usd;
        }
        bankAccount = await apiFetch('GET', '/bank/' + currentUser.nick);
        
        showToast(`¡${item.name} adquirido! 🌟`, item.color);
        renderPremiumShop(document.getElementById('premium-shop-grid'));
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── RENDER FUNCTIONS ─────────── */

function renderExchange(container) {
    if (!container) return;
    
    const pusdBalance = getPUSDBalance(currentUser);
    const ppcEquiv = convertPUSDtoPPC(pusdBalance);
    
    container.innerHTML = `
        <div class="glass-card" style="margin-bottom:20px;text-align:center;background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(0,0,0,0));border-color:rgba(251,191,36,0.3);">
            <div style="font-size:40px;color:var(--gold);margin-bottom:10px;"><i class="fa-solid fa-coins"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:var(--gold);">Exchange</h2>
            <p style="font-size:14px;color:var(--secondary);margin-top:8px;">Tasa: <strong>1 P-USD = ${EXCHANGE_RATE.toLocaleString()} PPC</strong></p>
        </div>
        
        <div class="grid-container" style="max-width:600px;margin:0 auto;">
            <div class="glass-card">
                <h4 style="font-family:'Orbitron',sans-serif;color:var(--gold);text-align:center;margin-bottom:15px;">
                    <i class="fa-solid fa-wallet"></i> Tu Balance
                </h4>
                <div style="text-align:center;">
                    <div style="font-size:24px;font-family:'Orbitron',sans-serif;color:var(--secondary);">${formatPPC(bankAccount?.balance || 0)}</div>
                    <div style="font-size:20px;font-family:'Orbitron',sans-serif;color:var(--gold);margin-top:8px;">${formatPUSD(pusdBalance)}</div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:5px;">≈ ${formatPPC(ppcEquiv)}</div>
                </div>
            </div>
        </div>
        
        <div class="grid-container" style="max-width:600px;margin:20px auto 0 auto;">
            <div class="glass-card">
                <h4 style="font-family:'Orbitron',sans-serif;color:var(--secondary);text-align:center;margin-bottom:15px;">
                    <i class="fa-solid fa-arrow-right"></i> Comprar P-USD
                </h4>
                <div class="form-group">
                    <label style="font-size:11px;color:var(--text-muted);">Cantidad PPC:</label>
                    <input type="number" class="form-control" id="exchange-ppc-input" placeholder="Ej: 30000" style="text-align:center;">
                </div>
                <div style="text-align:center;font-size:12px;color:var(--gold);margin-bottom:15px;">
                    Recibirás: <strong id="exchange-ppc-result">0 P-USD</strong>
                </div>
                <button class="btn btn-primary btn-full" onclick="doExchangePPCtoPUSD()">
                    <i class="fa-solid fa-arrow-right"></i> Convertir a P-USD
                </button>
            </div>
            
            <div class="glass-card">
                <h4 style="font-family:'Orbitron',sans-serif;color:var(--primary);text-align:center;margin-bottom:15px;">
                    <i class="fa-solid fa-arrow-left"></i> Comprar PPC
                </h4>
                <div class="form-group">
                    <label style="font-size:11px;color:var(--text-muted);">Cantidad P-USD:</label>
                    <input type="number" class="form-control" id="exchange-usd-input" placeholder="Ej: 1" style="text-align:center;">
                </div>
                <div style="text-align:center;font-size:12px;color:var(--secondary);margin-bottom:15px;">
                    Recibirás: <strong id="exchange-usd-result">0 PPC</strong>
                </div>
                <button class="btn btn-secondary btn-full" onclick="doExchangePUSDtoPPC()">
                    <i class="fa-solid fa-arrow-left"></i> Convertir a PPC
                </button>
            </div>
        </div>
    `;
    
    // Add live conversion listeners
    const ppcInput = document.getElementById('exchange-ppc-input');
    const usdInput = document.getElementById('exchange-usd-input');
    
    if (ppcInput) {
        ppcInput.addEventListener('input', () => {
            const val = parseFloat(ppcInput.value) || 0;
            document.getElementById('exchange-ppc-result').textContent = formatPUSD(convertPPCtoPUSD(val));
        });
    }
    
    if (usdInput) {
        usdInput.addEventListener('input', () => {
            const val = parseFloat(usdInput.value) || 0;
            document.getElementById('exchange-usd-result').textContent = formatPPC(convertPUSDtoPPC(val));
        });
    }
}

function renderPremiumShop(container) {
    if (!container) return;
    
    const pusdBalance = getPUSDBalance(currentUser);
    const ppcBalance = bankAccount?.balance || 0;
    
    let html = `
        <div class="glass-card" style="margin-bottom:20px;text-align:center;background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(0,0,0,0));border-color:rgba(251,191,36,0.3);">
            <div style="font-size:40px;color:var(--gold);margin-bottom:10px;"><i class="fa-solid fa-crown"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:var(--gold);">Tienda Premium</h2>
            <p style="font-size:12px;color:var(--text-muted);">Items exclusivos: cosméticos, pets, boosters, títulos y más.</p>
        </div>
        
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px;">
            <div class="glass-card" style="flex:1;min-width:150px;text-align:center;padding:15px;">
                <div style="font-size:11px;color:var(--text-muted);">Tu Balance</div>
                <div style="font-size:18px;font-family:'Orbitron',sans-serif;color:var(--secondary);">${formatPPC(ppcBalance)}</div>
                <div style="font-size:16px;font-family:'Orbitron',sans-serif;color:var(--gold);">${formatPUSD(pusdBalance)}</div>
            </div>
        </div>
        
        <div class="grid-container">
    `;
    
    PREMIUM_SHOP.forEach(item => {
        html += `
            <div class="glass-card" style="border-color:${item.color}30;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                    <div style="width:40px;height:40px;border-radius:50%;background:${item.color}20;display:flex;align-items:center;justify-content:center;">
                        <i class="${item.icon}" style="color:${item.color};font-size:18px;"></i>
                    </div>
                    <div>
                        <h4 style="font-family:'Orbitron',sans-serif;font-size:11px;color:${item.color};">${item.name}</h4>
                        <span style="font-size:9px;color:var(--text-muted);">${item.fandom}</span>
                    </div>
                </div>
                <p style="font-size:10px;color:var(--text-muted);margin-bottom:10px;">${item.desc}</p>
                <div style="display:flex;gap:6px;margin-bottom:10px;">
                    <span style="font-size:10px;color:var(--secondary);flex:1;text-align:center;padding:4px;background:rgba(0,255,170,0.1);border-radius:6px;">${formatPPC(item.price_ppc)}</span>
                    <span style="font-size:10px;color:var(--gold);flex:1;text-align:center;padding:4px;background:rgba(251,191,36,0.1);border-radius:6px;">${formatPUSD(item.price_usd)}</span>
                </div>
                <button class="btn btn-primary btn-full" onclick="buyPremiumItem('${item.id}')" style="font-size:10px;">
                    <i class="fa-solid fa-cart-shopping"></i> Comprar
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

/* ─────────── LOAD FUNCTIONS ─────────── */

function loadExchangePage() {
    const container = document.getElementById('exchange-container');
    if (container) renderExchange(container);
}

function loadPremiumShopPage() {
    const container = document.getElementById('premium-shop-grid');
    if (container) renderPremiumShop(container);
}

function doExchangePPCtoPUSD() {
    const input = document.getElementById('exchange-ppc-input');
    const amount = Math.floor(parseFloat(input?.value) || 0);
    if (amount <= 0) { showToast('Ingresa una cantidad válida', '#ff4466'); return; }
    exchangePPCtoPUSD(amount).then(ok => {
        if (ok) {
            input.value = '';
            document.getElementById('exchange-ppc-result').textContent = '0 P-USD';
            renderExchange(document.getElementById('exchange-container'));
        }
    });
}

function doExchangePUSDtoPPC() {
    const input = document.getElementById('exchange-usd-input');
    const amount = parseFloat(input?.value) || 0;
    if (amount <= 0) { showToast('Ingresa una cantidad válida', '#ff4466'); return; }
    exchangePUSDtoPPC(amount).then(ok => {
        if (ok) {
            input.value = '';
            document.getElementById('exchange-usd-result').textContent = '0 PPC';
            renderExchange(document.getElementById('exchange-container'));
        }
    });
}
