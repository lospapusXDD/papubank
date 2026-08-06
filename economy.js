/* ═══════════════════════════════════════════════
   ECONOMY PLUS — Nuevas funciones económicas
   Cuentas Premium, Préstamos, Dividendos, etc.
══════════════════════════════════════════════ */

/* ─────────── CUENTAS DE AHORRO PREMIUM ─────────── */

const PREMIUM_ACCOUNTS = [
    { key: 'bronze',   label: 'Bronce',    icon: 'fa-solid fa-coins',        color: '#cd7f32', minBalance: 100000,    interestRate: 1.5, dailyBonus: 50    },
    { key: 'silver',   label: 'Plata',     icon: 'fa-solid fa-ring',         color: '#c0c0c0', minBalance: 500000,    interestRate: 2.0, dailyBonus: 200   },
    { key: 'gold',     label: 'Oro',       icon: 'fa-solid fa-crown',        color: '#ffd700', minBalance: 2000000,   interestRate: 3.0, dailyBonus: 500   },
    { key: 'diamond',  label: 'Diamante',  icon: 'fa-solid fa-gem',          color: '#b9f2ff', minBalance: 10000000,  interestRate: 5.0, dailyBonus: 2000  },
    { key: 'obsidian', label: 'Obsidiana', icon: 'fa-solid fa-mountain',     color: '#3d3d3d', minBalance: 50000000,  interestRate: 8.0, dailyBonus: 10000 },
    { key: 'mythic',   label: 'Mítico',    icon: 'fa-solid fa-star',         color: '#ff6b6b', minBalance: 250000000, interestRate: 12.0, dailyBonus: 50000 }
];

function getUserPremiumAccount(user) {
    if (!user) return null;
    const balance = user.balance || 0;
    let best = null;
    for (const acc of PREMIUM_ACCOUNTS) {
        if (balance >= acc.minBalance) best = acc;
    }
    return best;
}

function getPremiumInterestRate(user) {
    const acc = getUserPremiumAccount(user);
    if (!acc) return 0;
    return acc.interestRate;
}

function getPremiumDailyBonus(user) {
    const acc = getUserPremiumAccount(user);
    if (!acc) return 0;
    return acc.dailyBonus;
}

/* ─────────── PRÉSTAMOS ENTRE USUARIOS ─────────── */

const LOAN_TIERS = [
    { key: 'basic',    label: 'Básico',    minAmount: 1000,    maxAmount: 50000,    interestRate: 5,  maxDays: 7    },
    { key: 'standard', label: 'Estándar',  minAmount: 50000,   maxAmount: 500000,   interestRate: 8,  maxDays: 14   },
    { key: 'premium',  label: 'Premium',   minAmount: 500000,  maxAmount: 5000000,  interestRate: 10, maxDays: 30   },
    { key: 'vip',      label: 'VIP',       minAmount: 5000000, maxAmount: 50000000, interestRate: 12, maxDays: 60   }
];

async function createLoanRequest(lender, borrower, amount, tierKey) {
    if (!window._db) return false;
    
    const tier = LOAN_TIERS.find(t => t.key === tierKey);
    if (!tier) return false;
    if (amount < tier.minAmount || amount > tier.maxAmount) return false;
    
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'loans'), {
            lender: lender,
            borrower: borrower,
            amount: amount,
            tier: tierKey,
            interestRate: tier.interestRate,
            maxDays: tier.maxDays,
            status: 'pending',
            createdAt: window._fbServerTimestamp(),
            dueDate: null
        });
        return true;
    } catch(e) {
        console.error('Error creating loan:', e);
        return false;
    }
}

async function acceptLoan(loanId) {
    if (!window._db || !currentUser) return false;
    
    try {
        const loanSnap = await window._fbGetDoc(window._fbDoc(window._db, 'loans', loanId));
        if (!loanSnap.exists()) return false;
        
        const loan = loanSnap.data();
        if (loan.borrower !== currentUser.nick) return false;
        
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + loan.maxDays);
        
        // Transfer money from lender to borrower
        const lenderAccRef = window._fbDoc(window._db, 'bank_accounts', loan.lender);
        const borrowerAccRef = window._fbDoc(window._db, 'bank_accounts', loan.borrower);
        
        await window._fbUpdateDoc(lenderAccRef, { balance: window._fbIncrement(-loan.amount) });
        await window._fbUpdateDoc(borrowerAccRef, { balance: window._fbIncrement(loan.amount) });
        
        // Update loan status
        await window._fbUpdateDoc(window._fbDoc(window._db, 'loans', loanId), {
            status: 'active',
            dueDate: dueDate.toISOString(),
            acceptedAt: window._fbServerTimestamp()
        });
        
        // Log transactions
        await addTx({ type: 'Préstamo', from: loan.lender, to: loan.borrower, amount: loan.amount, note: `Préstamo ${loan.tier} aceptado` });
        
        return true;
    } catch(e) {
        console.error('Error accepting loan:', e);
        return false;
    }
}

async function repayLoan(loanId) {
    if (!window._db || !currentUser) return false;
    
    try {
        const loanSnap = await window._fbGetDoc(window._fbDoc(window._db, 'loans', loanId));
        if (!loanSnap.exists()) return false;
        
        const loan = loanSnap.data();
        if (loan.borrower !== currentUser.nick || loan.status !== 'active') return false;
        
        const totalOwed = Math.round(loan.amount * (1 + loan.interestRate / 100));
        
        const borrowerAccRef = window._fbDoc(window._db, 'bank_accounts', loan.borrower);
        const lenderAccRef = window._fbDoc(window._db, 'bank_accounts', loan.lender);
        
        await window._fbUpdateDoc(borrowerAccRef, { balance: window._fbIncrement(-totalOwed) });
        await window._fbUpdateDoc(lenderAccRef, { balance: window._fbIncrement(totalOwed) });
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'loans', loanId), {
            status: 'paid',
            paidAt: window._fbServerTimestamp()
        });
        
        await addTx({ type: 'Pago Préstamo', from: loan.borrower, to: loan.lender, amount: totalOwed, note: `Préstamo ${loan.tier} pagado con interés` });
        
        return true;
    } catch(e) {
        console.error('Error repaying loan:', e);
        return false;
    }
}

/* ─────────── DIVIDENDOS PASIVOS ─────────── */

const DIVIDEND_RANKS = [
    { key: 'bronze_div',   label: 'Inversor Bronce',   minRank: 10,  dividendPercent: 0.1 },
    { key: 'silver_div',   label: 'Inversor Plata',    minRank: 13,  dividendPercent: 0.2 },
    { key: 'gold_div',     label: 'Inversor Oro',      minRank: 15,  dividendPercent: 0.5 },
    { key: 'diamond_div',  label: 'Inversor Diamante', minRank: 16,  dividendPercent: 1.0 },
    { key: 'mythic_div',   label: 'Inversor Mítico',   minRank: 17,  dividendPercent: 2.0 }
];

function getUserDividendRate(user) {
    if (!user) return 0;
    const rankLevel = user.rankLevel || 0;
    let rate = 0;
    for (const div of DIVIDEND_RANKS) {
        if (rankLevel >= div.minRank) rate = div.dividendPercent;
    }
    return rate;
}

async function claimDividends() {
    if (!window._db || !currentUser) return 0;
    
    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        
        const lastClaim = userData.lastDividendClaim;
        if (lastClaim) {
            const lastDate = lastClaim.toDate ? lastClaim.toDate() : new Date(lastClaim);
            const today = new Date();
            if (lastDate.toDateString() === today.toDateString()) {
                return 0; // Already claimed today
            }
        }
        
        const accSnap = await window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick));
        const balance = accSnap.exists() ? (accSnap.data().balance || 0) : 0;
        
        const dividendRate = getUserDividendRate(userData);
        if (dividendRate <= 0) return 0;
        
        const dividendAmount = Math.floor(balance * (dividendRate / 100));
        if (dividendAmount <= 0) return 0;
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(dividendAmount)
        });
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            lastDividendClaim: new Date().toISOString()
        });
        
        await addTx({ type: 'Dividendo', from: 'Sistema', to: currentUser.nick, amount: dividendAmount, note: `Dividendo pasivo ${dividendRate}%` });
        
        return dividendAmount;
    } catch(e) {
        console.error('Error claiming dividends:', e);
        return 0;
    }
}

/* ─────────── BOLSA DE VALORES ─────────── */

const STOCKS = [
    { key: 'papu_coin',   label: 'PapuCoin',      icon: 'fa-solid fa-coins',      basePrice: 1000,  volatility: 0.15 },
    { key: 'meme_token',  label: 'MemeToken',      icon: 'fa-solid fa-face-laugh', basePrice: 500,   volatility: 0.25 },
    { key: 'clan_fund',   label: 'Clan Fund',      icon: 'fa-solid fa-building',   basePrice: 5000,  volatility: 0.10 },
    { key: 'rare_gem',    label: 'Rare Gem',       icon: 'fa-solid fa-gem',        basePrice: 10000, volatility: 0.20 },
    { key: 'nft_art',     label: 'NFT Art',        icon: 'fa-solid fa-palette',    basePrice: 2000,  volatility: 0.30 }
];

let _stockPrices = {};

function initStockPrices() {
    STOCKS.forEach(stock => {
        _stockPrices[stock.key] = stock.basePrice;
    });
}

function updateStockPrices() {
    STOCKS.forEach(stock => {
        const change = (Math.random() - 0.5) * 2 * stock.volatility * _stockPrices[stock.key];
        _stockPrices[stock.key] = Math.max(100, Math.round(_stockPrices[stock.key] + change));
    });
}

// Update prices every 5 minutes
setInterval(updateStockPrices, 5 * 60 * 1000);
initStockPrices();

function getStockPrice(key) {
    return _stockPrices[key] || 0;
}

function getStockChange(key) {
    const stock = STOCKS.find(s => s.key === key);
    if (!stock) return 0;
    const current = _stockPrices[key] || stock.basePrice;
    return ((current - stock.basePrice) / stock.basePrice * 100).toFixed(2);
}

async function buyStock(stockKey, shares) {
    if (!window._db || !currentUser) return false;
    
    const stock = STOCKS.find(s => s.key === stockKey);
    if (!stock) return false;
    
    const price = getStockPrice(stockKey);
    const totalCost = price * shares;
    
    try {
        const accSnap = await window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick));
        const balance = accSnap.exists() ? (accSnap.data().balance || 0) : 0;
        
        if (balance < totalCost) return false;
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(-totalCost)
        });
        
        // Update user stocks
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const stocks = userData.stocks || {};
        stocks[stockKey] = (stocks[stockKey] || 0) + shares;
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            stocks: stocks
        });
        
        await addTx({ type: 'Bolsa', from: currentUser.nick, to: 'Bolsa', amount: totalCost, note: `Compra ${shares} acciones de ${stock.label}` });
        
        return true;
    } catch(e) {
        console.error('Error buying stock:', e);
        return false;
    }
}

async function sellStock(stockKey, shares) {
    if (!window._db || !currentUser) return false;
    
    const stock = STOCKS.find(s => s.key === stockKey);
    if (!stock) return false;
    
    const price = getStockPrice(stockKey);
    const totalValue = price * shares;
    
    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const stocks = userData.stocks || {};
        
        if ((stocks[stockKey] || 0) < shares) return false;
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(totalValue)
        });
        
        stocks[stockKey] -= shares;
        if (stocks[stockKey] <= 0) delete stocks[stockKey];
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            stocks: stocks
        });
        
        await addTx({ type: 'Bolsa', from: 'Bolsa', to: currentUser.nick, amount: totalValue, note: `Venta ${shares} acciones de ${stock.label}` });
        
        return true;
    } catch(e) {
        console.error('Error selling stock:', e);
        return false;
    }
}

/* ─────────── REGALOS Y DONACIONES ─────────── */

async function sendGift(toUser, amount, message) {
    if (!window._db || !currentUser) return false;
    
    try {
        const accSnap = await window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick));
        const balance = accSnap.exists() ? (accSnap.data().balance || 0) : 0;
        
        if (balance < amount) return false;
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(-amount)
        });
        
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', toUser), {
            balance: window._fbIncrement(amount)
        });
        
        await addTx({ type: 'Regalo', from: currentUser.nick, to: toUser, amount: amount, note: message || 'Regalo especial 🎁' });
        
        return true;
    } catch(e) {
        console.error('Error sending gift:', e);
        return false;
    }
}

/* ─────────── RENDER FUNCTIONS ─────────── */

function renderPremiumAccounts(container) {
    if (!container) return;
    
    const user = currentUser;
    const currentAcc = getUserPremiumAccount(user);
    
    let html = '<div class="grid-container">';
    PREMIUM_ACCOUNTS.forEach(acc => {
        const isActive = currentAcc && currentAcc.key === acc.key;
        html += `
            <div class="glass-card" style="border-color:${isActive ? acc.color : 'var(--dark-border)'};${isActive ? 'box-shadow:0 0 15px ' + acc.color + '40;' : ''}">
                <div style="text-align:center;margin-bottom:12px;">
                    <i class="${acc.icon}" style="font-size:28px;color:${acc.color};"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;color:${acc.color};text-align:center;margin-bottom:10px;">${acc.label}</h4>
                <div style="font-size:11px;color:var(--text-muted);text-align:center;">
                    <p>Mínimo: ${acc.minBalance.toLocaleString()} PPC</p>
                    <p>Interés: ${acc.interestRate}% diario</p>
                    <p>Bonus: +${acc.dailyBonus.toLocaleString()} PPC/día</p>
                </div>
                ${isActive ? '<div style="text-align:center;margin-top:10px;color:' + acc.color + ';font-size:11px;font-weight:bold;">✓ ACTIVA</div>' : ''}
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderStockMarket(container) {
    if (!container) return;
    
    let html = '<div class="grid-container">';
    STOCKS.forEach(stock => {
        const price = getStockPrice(stock.key);
        const change = getStockChange(stock.key);
        const isUp = parseFloat(change) >= 0;
        
        html += `
            <div class="glass-card">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                    <i class="${stock.icon}" style="font-size:20px;color:var(--primary);"></i>
                    <div>
                        <h4 style="font-family:'Orbitron',sans-serif;font-size:12px;color:var(--text-main);">${stock.label}</h4>
                        <span style="font-size:10px;color:${isUp ? 'var(--secondary)' : 'var(--danger)'};">${isUp ? '↑' : '↓'} ${change}%</span>
                    </div>
                </div>
                <div style="font-size:18px;font-family:'Orbitron',sans-serif;color:var(--gold);text-align:center;margin-bottom:10px;">
                    ${price.toLocaleString()} PPC
                </div>
                <div style="display:flex;gap:6px;">
                    <button class="btn btn-primary" onclick="buyStock('${stock.key}', 1)" style="flex:1;font-size:10px;">Comprar</button>
                    <button class="btn btn-secondary" onclick="sellStock('${stock.key}', 1)" style="flex:1;font-size:10px;">Vender</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderLoanTiers(container) {
    if (!container) return;
    
    let html = '<div class="grid-container">';
    LOAN_TIERS.forEach(tier => {
        html += `
            <div class="glass-card">
                <h4 style="font-family:'Orbitron',sans-serif;color:var(--primary);margin-bottom:10px;">${tier.label}</h4>
                <div style="font-size:11px;color:var(--text-muted);">
                    <p>Monto: ${tier.minAmount.toLocaleString()} - ${tier.maxAmount.toLocaleString()} PPC</p>
                    <p>Interés: ${tier.interestRate}%</p>
                    <p>Plazo máximo: ${tier.maxDays} días</p>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

/* ─────────── LOAD FUNCTIONS ─────────── */

function loadPremiumPage() {
    const container = document.getElementById('premium-accounts-grid');
    if (container) renderPremiumAccounts(container);
}

function loadLoansPage() {
    const container = document.getElementById('loan-tiers-grid');
    if (container) renderLoanTiers(container);
}

function loadStocksPage() {
    const container = document.getElementById('stock-market-grid');
    if (container) renderStockMarket(container);
}

function loadGiftsPage() {
    loadGiftRecipients();
}

async function loadGiftRecipients() {
    const select = document.getElementById('gift-recipient');
    if (!select || !window._db) return;
    
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'users'));
        const options = ['<option value="">Selecciona un usuario...</option>'];
        snap.forEach(doc => {
            const u = doc.data();
            if (u.nick !== currentUser.nick) {
                options.push(`<option value="${u.nick}">${u.nick}</option>`);
            }
        });
        select.innerHTML = options.join('');
    } catch(e) {
        console.error('Error loading users:', e);
    }
}

async function sendGiftFromUI() {
    const recipient = document.getElementById('gift-recipient')?.value;
    const amountStr = document.getElementById('gift-amount')?.value;
    const message = document.getElementById('gift-message')?.value;
    
    if (!recipient) { showToast('Selecciona un usuario', '#ff4466'); return; }
    const amount = Math.floor(parseInt(amountStr) || 0);
    if (amount <= 0) { showToast('Ingresa una cantidad válida', '#ff4466'); return; }
    
    const ok = await showConfirm('Enviar Regalo', `¿Enviar ${amount.toLocaleString()} PPC a ${recipient}?`);
    if (!ok) return;
    
    const success = await sendGift(recipient, amount, message);
    if (success) {
        showToast(`Regalo enviado a ${recipient} 🎁`, '#ff69b4');
        document.getElementById('gift-amount').value = '';
        document.getElementById('gift-message').value = '';
        if (window.loadDashboard) window.loadDashboard();
    } else {
        showToast('Error al enviar regalo', '#ff4466');
    }
}
