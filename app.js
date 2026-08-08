'use strict';

const SESSION_KEY = 'papusbank_session_v1';

let currentUser   = null;
window._cacheUsers = null; window._cacheUsersTs = 0;
window._cacheAccounts = null; window._cacheAccountsTs = 0;
async function getCachedUsers() { const now=Date.now(); if(window._cacheUsers && window._cacheUsersTs > now-60000) return window._cacheUsers; const s=await window._fbGetDocs(window._fbCollection(window._db,'users')); window._cacheUsers=s; window._cacheUsersTs=now; return s; }
async function getCachedAccounts() { const now=Date.now(); if(window._cacheAccounts && window._cacheAccountsTs > now-60000) return window._cacheAccounts; const s=await window._fbGetDocs(window._fbCollection(window._db,'bank_accounts')); window._cacheAccounts=s; window._cacheAccountsTs=now; return s; }
let bankAccount   = null;
let bankConfig    = { interest: 2, fee: 2, startingBalance: 100, loanMax: 10000, vaultInterest: 0.5 };
let allAccounts   = {};
let confirmResolve = null;
let inputResolve   = null;
let toastTimers   = [];
let _sbCollapsed  = false;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function formatCompact(num) {
    if (num === 0) return '0';
    if (num < 0) return '-' + formatCompact(-num);
    if (num < 1000) return num.toString();

    const suffixes = [
        { val: 1e3,  s: 'K' },
        { val: 1e6,  s: 'M' },
        { val: 1e9,  s: 'B' },
        { val: 1e12, s: 'T' },
        { val: 1e15, s: 'Cu' },
        { val: 1e18, s: 'Qn' },
        { val: 1e21, s: 'Sx' },
        { val: 1e24, s: 'Sp' },
        { val: 1e27, s: 'Oc' },
        { val: 1e30, s: 'No' },
        { val: 1e33, s: 'Dc' },
        { val: 1e36, s: 'Ud' },
        { val: 1e39, s: 'Dd' },
        { val: 1e42, s: 'Td' },
        { val: 1e45, s: 'Cud' },
        { val: 1e48, s: 'Qnd' },
        { val: 1e51, s: 'Sxd' },
        { val: 1e54, s: 'Spd' },
        { val: 1e57, s: 'Ocd' },
        { val: 1e60, s: 'Nod' },
        { val: 1e63, s: 'Vg' },
    ];

    for (let i = suffixes.length - 1; i >= 0; i--) {
        if (num >= suffixes[i].val) {
            const val = num / suffixes[i].val;
            return (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)) + suffixes[i].s;
        }
    }
    return num.toExponential(1);
}

function formatMoney(num) {
    return formatCompact(num) + ' PPC';
}

function formatMoneyPUSD(num) {
    return '$' + formatCompact(num);
}

function getCookie(name) {
    const match = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
    return match ? match.split('=')[1] : null;
}

function escHTML(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function waitForDB(cb, attempts) {
    attempts = attempts || 0;
    if (window._db) { cb(); return; }
    if (attempts > 40) { console.error('API Bridge not ready'); return; }
    setTimeout(() => waitForDB(cb, attempts + 1), 250);
}

// ═══════════════════════════ UI HELPERS ═══════════════════════════

function showToast(msg, color) {
    color = color || 'var(--primary)';
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeftColor = color;

    const icon = color.includes('ff44') || color.includes('danger') ? 'fa-circle-xmark' : 
                 color.includes('00ff') || color.includes('secondary') ? 'fa-circle-check' : 'fa-circle-info';
    
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color:${color}; font-size:16px;"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    const timer = setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s reverse ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
    toastTimers.push(timer);
}

function showConfirm(title, body, btnLabel) {
    btnLabel = btnLabel || 'Confirmar';
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-body').innerHTML = body;
    document.getElementById('confirm-ok-btn').textContent = btnLabel;
    document.getElementById('confirm-modal').classList.add('active');
    return new Promise(resolve => { confirmResolve = resolve; });
}

window.closeConfirm = function() {
    document.getElementById('confirm-modal').classList.remove('active');
    if (confirmResolve) { confirmResolve(false); confirmResolve = null; }
};
window.resolveConfirm = function(val) {
    document.getElementById('confirm-modal').classList.remove('active');
    if (confirmResolve) { confirmResolve(val); confirmResolve = null; }
};
window.showConfirmModal = showConfirm;

function showInputModal(title, placeholder, type) {
    type = type || 'text';
    document.getElementById('input-modal-title').textContent = title;
    const field = document.getElementById('input-modal-field');
    field.type = type;
    field.placeholder = placeholder || '';
    field.value = '';
    document.getElementById('input-modal').classList.add('active');
    field.focus();
    return new Promise(resolve => { inputResolve = resolve; });
}

window.closeInputModal = function(ok) {
    const val = document.getElementById('input-modal-field').value;
    document.getElementById('input-modal').classList.remove('active');
    if (inputResolve) { inputResolve(ok ? val : null); inputResolve = null; }
};

// ═══════════════════════════ PAGE ROUTING ═══════════════════════════

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

    const page = document.getElementById('page-' + pageId);
    if (page) page.classList.add('active');

    const navLink = document.getElementById('nav-' + pageId);
    if (navLink) navLink.classList.add('active');

    // Update header title
    const titleMap = {
        dashboard: '<i class="fa-solid fa-chart-pie"></i> Dashboard',
        transfer: '<i class="fa-solid fa-paper-plane"></i> Transferir',
        history: '<i class="fa-solid fa-clock-rotate-left"></i> Historial',
        market: '<i class="fa-solid fa-shop"></i> Tienda',
        leaderboard: '<i class="fa-solid fa-ranking-star"></i> Ranking',
        loans: '<i class="fa-solid fa-building-columns"></i> Préstamos',
        deudas: '<i class="fa-solid fa-wallet"></i> Mis Deudas',
        vault: '<i class="fa-solid fa-vault"></i> Bóvedas',
        verificacion: '<i class="fa-solid fa-shield-halved"></i> Verificación',
        board: '<i class="fa-solid fa-bullhorn"></i> Board',
        mensajes: '<i class="fa-solid fa-envelope"></i> Mensajes',
        encuestas: '<i class="fa-solid fa-poll"></i> Encuestas',
        papubot: '<i class="fa-solid fa-robot"></i> PapuBot',
        top: '<i class="fa-solid fa-crown"></i> Top Semanal',
        inversiones: '<i class="fa-solid fa-chart-line"></i> Inversiones',
        rewards: '<i class="fa-solid fa-gift"></i> Recompensas',
        solicitudes: '<i class="fa-solid fa-handshake"></i> Solicitudes',
        perfiles: '<i class="fa-solid fa-address-book"></i> Perfiles',
        perfil: '<i class="fa-solid fa-id-card"></i> Mi Perfil',
        rangos: '<i class="fa-solid fa-medal"></i> Rangos Olimpo',
        pareja: '<i class="fa-solid fa-heart"></i> Pareja',
        frieren: '<i class="fa-solid fa-hat-wizard"></i> Gremio Frieren',
        ben10: '<i class="fa-solid fa-stopwatch"></i> Ben 10',
        mha: '<i class="fa-solid fa-dove"></i> My Hero Academia',
        jjk: '<i class="fa-solid fa-fire"></i> Jujutsu Kaisen',
        nanatsu: '<i class="fa-solid fa-dragon"></i> 7 Pecados Capitales',
        media: '<i class="fa-solid fa-music"></i> Reproductor',
        admin: '<i class="fa-solid fa-sliders"></i> Panel Admin',
        godzilla: '<i class="fa-solid fa-dragon"></i> Godzilla',
        chainsaw: '<i class="fa-solid fa-saw"></i> Chainsaw Man',
        mushoku: '<i class="fa-solid fa-hat-wizard"></i> Mushoku Tensei',
        flores: '<i class="fa-solid fa-spa"></i> Nobleza de las Flores',
        premium: '<i class="fa-solid fa-crown"></i> Cuentas Premium',
        stocks: '<i class="fa-solid fa-chart-line"></i> Bolsa',
        gifts: '<i class="fa-solid fa-gift"></i> Regalos',
        exchange: '<i class="fa-solid fa-coins"></i> Exchange',
        premiumshop: '<i class="fa-solid fa-crown"></i> Tienda Premium',
        birthdays: '<i class="fa-solid fa-cake-candles"></i> Cumpleaños',
        deathnote: '<i class="fa-solid fa-book-skull"></i> Death Note',
        berserk: '<i class="fa-solid fa-claw"></i> Berserk',
        elfen: '<i class="fa-solid fa-hands"></i> Elfen Lied',
        rezero: '<i class="fa-solid fa-redo"></i> Re:Zero',
        rimuru: '<i class="fa-solid fa-droplet"></i> Rimuru Tempest',
        bocchi: '<i class="fa-solid fa-guitar"></i> Bocchi the Rock!',
        vocaloid: '<i class="fa-solid fa-headphones"></i> Vocaloids'
    };

    const pageTitle = document.getElementById('page-header-title');
    if (pageTitle && titleMap[pageId]) pageTitle.innerHTML = titleMap[pageId];

    // Lazy-load page data (refresh balance only when needed)
    switch (pageId) {
        case 'dashboard':   refreshBankAccount().then(loadDashboard);     break;
        case 'transfer':    refreshBankAccount().then(loadTransferUsers); break;
        case 'history':     refreshBankAccount().then(loadRecentTx);      break;
        case 'market':      refreshBankAccount().then(renderMarket);      break;
        case 'leaderboard': refreshBankAccount().then(() => loadLeaderboard('users'));   break;
        case 'loans':       refreshBankAccount().then(loadLoans);         break;
        case 'deudas':      refreshBankAccount().then(loadDebts);         break;
        case 'vault':       refreshBankAccount().then(loadVaultPage);     break;
        case 'verificacion': loadVerificacionPage(); break;
        case 'board':       loadBoard();         break;
        case 'mensajes':    loadInbox();         break;
        case 'encuestas':
            loadPolls();
            const pollForm = document.getElementById('poll-admin-form');
            if (pollForm) pollForm.style.display = checkAdminPermission() ? 'block' : 'none';
            break;
        case 'papubot':     loadPapuBot();       break;
        case 'top':         loadTopSemanal();    break;
        case 'inversiones': loadInvestments();   break;
        case 'rewards':     loadRewards();       break;
        case 'solicitudes': loadSolicitudes();   break;
        case 'perfiles':    loadPerfiles();      break;
        case 'perfil':      loadProfile();       break;
        case 'rangos':      loadRankShop();      break;
        case 'pareja':      loadParejaPage();    break;
        case 'flores':      loadFloresPage();    break;
        case 'premium':     loadPremiumPage();   break;
        case 'loans':       loadLoansPage();     break;
        case 'stocks':      loadStocksPage();    break;
        case 'gifts':       loadGiftsPage();     break;
        case 'themes':      loadThemesPage();    break;
        case 'rings':       loadRingsPage();     break;
        case 'secrets':     loadSecretsPage();   break;
        case 'exchange':    renderExchange(document.getElementById('exchange-container'));  break;
        case 'premiumshop': renderPremiumShop(document.getElementById('premium-shop-grid'));   break;
        case 'frieren':     loadFrierenPage();   break;
        case 'nanatsu':     loadNanatsuPage();   break;
        case 'media':       loadMediaPage();       break;
        case 'ben10':       loadBen10Page();     break;
        case 'mha':         loadMhaPage();       break;
        case 'godzilla':    loadGodzillaPage();  break;
        case 'chainsaw':    loadChainsawPage();  break;
        case 'mushoku':     loadMushokuPage();   break;
        case 'deathnote':   loadDeathnotePage(); break;
        case 'berserk':     loadBerserkPage();   break;
        case 'elfen':       loadElfenPage();     break;
        case 'rezero':      loadRezeroPage();    break;
        case 'rimuru':      loadRimuruPage();    break;
        case 'bocchi':      loadBocchiPage();    break;
        case 'vocaloid':    loadVocaloidPage();  break;
        case 'jjk':         loadJJKPage();       break;
        case 'admin':       if (checkAdminPermission()) loadAdmin(); break;
        case 'birthdays':   loadBirthdaysPage(); break;
    }

    // Auto-close mobile sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        document.getElementById('sidebar-overlay')?.remove();
    }
}

// ═══════════════════════════ SIDEBAR CONTROL ═══════════════════════════

function initSidebar() {
    _sbCollapsed = localStorage.getItem('papusbank_sb_collapsed') === '1';
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    if (!sidebar) return;

    if (_sbCollapsed) {
        sidebar.classList.add('collapsed');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    if (window.innerWidth <= 768) {
        // Mobile: use overlay
        if (sidebar.classList.contains('mobile-open')) {
            closeMobileSidebar();
        } else {
            openMobileSidebar();
        }
    } else {
        // Desktop: collapse/expand
        _sbCollapsed = !_sbCollapsed;
        sidebar.classList.toggle('collapsed', _sbCollapsed);
        localStorage.setItem('papusbank_sb_collapsed', _sbCollapsed ? '1' : '0');
    }
}

function openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.classList.add('mobile-open');

    const overlay = document.createElement('div');
    overlay.id = 'sidebar-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999;backdrop-filter:blur(2px);';
    overlay.onclick = closeMobileSidebar;
    document.body.appendChild(overlay);
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');
    document.getElementById('sidebar-overlay')?.remove();
}

// ═══════════════════════════ AUTH ═══════════════════════════

window.doLogin = async function() {
    const nick = (document.getElementById('login-nick').value || '').trim().toLowerCase();
    const pass = document.getElementById('login-pass').value || '';
    const btn  = document.getElementById('login-btn');
    const errEl = document.getElementById('login-error');

    if (!nick || !pass) { errEl.textContent = 'Ingresa tu nick y contraseña'; return; }

    btn.disabled = true;
    btn.textContent = 'Verificando...';
    errEl.textContent = '';

    try {
        const res = await apiFetch('POST', '/auth/login', { nick, password: pass });

        window._apiToken = res.accessToken;
        localStorage.setItem('papubank_jwt', res.accessToken);
        localStorage.setItem('papubank_refresh', res.refreshToken);

        currentUser = { nick, hash: res.hash };
        Object.assign(currentUser, res);
        currentUser.nick = nick;
        localStorage.setItem(SESSION_KEY, JSON.stringify({ nick, hash: res.hash }));
        localStorage.setItem('papus_session_v2', JSON.stringify({ nick, hash: res.hash }));

        document.getElementById('auth-overlay').style.display = 'none';

        await initBankAccount();
        updateNavUI();
        showPage('dashboard');

        if (typeof initMediaPlayer === 'function') initMediaPlayer();
        if (typeof initMatrix === 'function') initMatrix();
        if (typeof checkBirthdayBonus === 'function') checkBirthdayBonus();

    } catch(e) {
        console.error(e);
        errEl.textContent = e.message || 'Error de conexión';
        btn.disabled = false; btn.textContent = 'INGRESAR AL BANCO';
    }
};

window.doLogout = function() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('papus_session_v2');
    localStorage.removeItem('papubank_jwt');
    localStorage.removeItem('papubank_refresh');
    window._apiToken = null;
    currentUser = null;
    bankAccount = null;
    document.getElementById('auth-overlay').style.display = 'flex';
    document.getElementById('login-nick').value = '';
    document.getElementById('login-pass').value = '';
    document.getElementById('login-error').textContent = '';
    if (typeof stopMatrix === 'function') stopMatrix();
};

window.doRegister = async function() {
    const nick = (document.getElementById('register-nick').value || '').trim().toLowerCase();
    const pass = document.getElementById('register-pass').value || '';
    const confirmPass = document.getElementById('register-confirm-pass').value || '';
    const btn = document.getElementById('register-btn');
    const errEl = document.getElementById('register-error');

    if (!nick || !pass || !confirmPass) { errEl.textContent = 'Completa todos los campos'; return; }
    if (pass !== confirmPass) { errEl.textContent = 'Las contraseñas no coinciden'; return; }
    if (nick.length < 3) { errEl.textContent = 'El nick debe tener al menos 3 caracteres'; return; }
    if (pass.length < 4) { errEl.textContent = 'La contraseña debe tener al menos 4 caracteres'; return; }

    btn.disabled = true;
    btn.textContent = 'Registrando...';
    errEl.textContent = '';

    try {
        const hash = hashPass(pass, nick);
        const res = await apiFetch('POST', '/auth/register', { nick, hash });

        window._apiToken = res.accessToken || null;
        if (res.accessToken) localStorage.setItem('papubank_jwt', res.accessToken);
        if (res.refreshToken) localStorage.setItem('papubank_refresh', res.refreshToken);

        currentUser = { nick, hash, jjkRank: 'user', avatar: 'avt_gojo.jpg' };
        Object.assign(currentUser, res);
        localStorage.setItem(SESSION_KEY, JSON.stringify({ nick, hash }));
        localStorage.setItem('papus_session_v2', JSON.stringify({ nick, hash }));

        document.getElementById('auth-overlay').style.display = 'none';

        await initBankAccount();
        updateNavUI();
        showPage('dashboard');

        if (typeof initMediaPlayer === 'function') initMediaPlayer();
        if (typeof initMatrix === 'function') initMatrix();

        showToast('¡Cuenta del Clan creada con éxito! ✓', 'var(--secondary)');

    } catch(e) {
        errEl.textContent = 'Error: ' + e.message;
        btn.disabled = false; btn.textContent = 'CREAR CUENTA';
    }
};

window.initAuthOverlayEvents = function() {
    const authContainer = document.getElementById('authContainer');
    const toggleBtnRight = document.getElementById('toggleBtnRight');
    const toggleBtnLeft = document.getElementById('toggleBtnLeft');
    if (toggleBtnRight && toggleBtnLeft && authContainer) {
        toggleBtnRight.onclick = () => authContainer.classList.add('active');
        toggleBtnLeft.onclick = () => authContainer.classList.remove('active');
    }
};


async function tryAutoLogin() {
    try {
        const saved = localStorage.getItem(SESSION_KEY);
        if (!saved) return;
        const { nick, hash } = JSON.parse(saved);
        if (!nick || !hash) return;

        waitForDB(async function() {
            try {
                const res = await apiFetch('POST', '/auth/login', { nick, hash });
                window._apiToken = res.accessToken;
                localStorage.setItem('papubank_jwt', res.accessToken);
                if (res.refreshToken) localStorage.setItem('papubank_refresh', res.refreshToken);

                currentUser = { nick, hash };
                Object.assign(currentUser, res);
                currentUser.nick = nick;
        document.getElementById('auth-overlay').style.display = 'none';

        await initBankAccount();
        await loadRingsInventory();
        loadInventorySettings();
        updateNavUI();
        showPage('dashboard');
                if (typeof initMediaPlayer === 'function') initMediaPlayer();
                if (typeof initMatrix === 'function') initMatrix();
                if (typeof loadSavedTheme === 'function') loadSavedTheme();
                if (typeof checkBirthdayBonus === 'function') checkBirthdayBonus();
            } catch(e) {
                localStorage.removeItem(SESSION_KEY);
            }
        });
    } catch(e) {
        localStorage.removeItem(SESSION_KEY);
    }
}

// ═══════════════════════════ ACCOUNT INIT ═══════════════════════════

async function initBankAccount() {
    if (!currentUser || !window._db) return;
    try {
        const data = await apiFetch('GET', '/bank/' + currentUser.nick);
        bankAccount = data;
    } catch(e) {
        // Account might not exist yet, create it
        try {
            await apiFetch('POST', '/bank/' + currentUser.nick, { balance: 100, totalIn: 100, totalOut: 0, txCount: 1 });
            bankAccount = { balance: 100, totalIn: 100, totalOut: 0, txCount: 1, loanActive: false, loanAmount: 0 };
            showToast('¡Bienvenido al banco del clan! Cuenta creada con 100 PPC', '#00ffaa');
        } catch(e2) {
            bankAccount = { balance: 0, totalIn: 0, totalOut: 0, txCount: 0 };
        }
    }
    await loadConfig();
    updateBalanceDisplays();
}

async function refreshBankAccount() {
    if (!currentUser || !window._db) return;
    try {
        bankAccount = await apiFetch('GET', '/bank/' + currentUser.nick);
        updateBalanceDisplays();
    } catch(e) {}
    return bankAccount;
}

async function loadConfig() {
    if (!window._db) return;
    try {
        const data = await apiFetch('GET', '/config/bank');
        if (data) bankConfig = Object.assign(bankConfig, data);
    } catch(e) {}
}

function updateBalanceDisplays() {
    if (!bankAccount || !currentUser) return;
    const bal = bankAccount.balance || 0;
    const nick = currentUser.nick;
    const accNum = genAccountNumber(nick);

    const balEls = document.querySelectorAll('[data-balance]');
    balEls.forEach(el => { el.textContent = formatMoney(bal); });

    const nickEls = document.querySelectorAll('[data-nick]');
    nickEls.forEach(el => { el.textContent = nick; });

    const accEls = document.querySelectorAll('[data-account-number]');
    accEls.forEach(el => { el.textContent = accNum; });

    // Update user widget in header
    const userWidgetName = document.getElementById('header-user-nick');
    const userWidgetBal  = document.getElementById('header-user-balance');
    if (userWidgetName) userWidgetName.textContent = nick;
    if (userWidgetBal)  userWidgetBal.textContent   = formatMoney(bal);

    // Update bank card
    const cardBal = document.getElementById('bank-card-balance');
    const cardNum = document.getElementById('bank-card-number');
    const cardHolder = document.getElementById('bank-card-holder');
    if (cardBal) cardBal.textContent = formatCompact(bal);
    if (cardNum) cardNum.textContent = accNum;
    if (cardHolder) cardHolder.textContent = nick.toUpperCase();
}

// ═══════════════════════════ DASHBOARD ═══════════════════════════

async function loadDashboard() {
    if (!currentUser || !bankAccount) return;
    try { bankAccount = await apiFetch('GET', '/bank/' + currentUser.nick); } catch(e) {}
    const bal = bankAccount.balance || 0;
    const tier = getBankTier(bal);

    // Quick stats
    const totalInEl = document.getElementById('stat-total-in');
    const totalOutEl = document.getElementById('stat-total-out');
    const txCountEl = document.getElementById('stat-tx-count');
    const tierEl = document.getElementById('stat-tier');

    if (totalInEl) totalInEl.textContent = formatMoney(bankAccount.totalIn || 0);
    if (totalOutEl) totalOutEl.textContent = formatMoney(bankAccount.totalOut || 0);
    if (txCountEl)  txCountEl.textContent = bankAccount.txCount || 0;
    if (tierEl)     tierEl.textContent = tier.label;

    // Rank info
    const rankKey  = getRankKey(currentUser);
    const rankInfo = RANKS[rankKey];
    const dashRankEl = document.getElementById('dash-rank-label');
    if (dashRankEl && rankInfo) {
        dashRankEl.innerHTML = `<i class="${rankInfo.icon}" style="color:${rankInfo.color}"></i> ${rankInfo.label}`;
    }

    // Loan alert
    const loanAlertEl = document.getElementById('dash-loan-alert');
    if (loanAlertEl) {
        if (bankAccount.loanActive && bankAccount.loanAmount > 0) {
            loanAlertEl.style.display = 'block';
            loanAlertEl.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation" style="color:var(--danger)"></i>
                Tienes una deuda activa de <strong style="color:var(--gold)">${bankAccount.loanAmount.toLocaleString()} PPC</strong>.
                <a href="#" onclick="showPage('deudas')" style="color:var(--primary)">Pagar</a>
            `;
        } else {
            loanAlertEl.style.display = 'none';
        }
    }

    // Load recent transactions preview
    loadRecentTx();

    // Eventos activos
    if (typeof loadActiveEvents === 'function') loadActiveEvents();
}

// ═══════════════════════════ NAVIGATION UI ═══════════════════════════

function updateNavUI() {
    if (!currentUser) return;
    const isAdmin  = ['owner','admin'].includes(getRankKey(currentUser));
    const adminNav = document.getElementById('nav-admin-wrapper');
    if (adminNav) adminNav.style.display = isAdmin ? 'block' : 'none';

    // Update avatar in sidebar
    const avatarEl = document.getElementById('sidebar-user-avatar');
    if (avatarEl && currentUser.avatar) avatarEl.src = currentUser.avatar;
    const sidebarNickEl = document.getElementById('sidebar-user-nick');
    if (sidebarNickEl) sidebarNickEl.textContent = currentUser.nick;
}

// ═══════════════════════════ PROFILE ═══════════════════════════

async function loadProfile() {
    if (!currentUser || !bankAccount) return;

    const nickEl = document.getElementById('profile-nick');
    const balEl  = document.getElementById('profile-balance');
    const accEl  = document.getElementById('profile-account-num');
    const rankEl = document.getElementById('profile-rank');
    const tierEl = document.getElementById('profile-tier');
    const inEl   = document.getElementById('profile-total-in');
    const outEl  = document.getElementById('profile-total-out');
    const txEl   = document.getElementById('profile-tx-count');

    const bal = bankAccount.balance || 0;
    const rankKey = getRankKey(currentUser);
    const rankInfo = RANKS[rankKey];
    const tier = getBankTier(bal);

    if (nickEl) nickEl.textContent = currentUser.nick;
    if (balEl)  balEl.textContent = formatMoney(bal);
    if (accEl)  accEl.textContent = genAccountNumber(currentUser.nick);
    if (rankEl && rankInfo) rankEl.innerHTML = `<i class="${rankInfo.icon}" style="color:${rankInfo.color};"></i> ${rankInfo.label}`;
    if (tierEl) tierEl.className = tier.cls;
    if (tierEl) tierEl.textContent = tier.label;
    if (inEl)   inEl.textContent  = (bankAccount.totalIn  || 0).toLocaleString('es') + ' PPC';
    if (outEl)  outEl.textContent = (bankAccount.totalOut || 0).toLocaleString('es') + ' PPC';
    if (txEl)   txEl.textContent  = bankAccount.txCount || 0;

    // Avatar
    const avatarEl = document.getElementById('profile-avatar');
    if (avatarEl && currentUser.avatar) {
        if (currentUser.avatar.startsWith('data:video')) {
            const parent = avatarEl.parentElement;
            let vid = parent.querySelector('video');
            if (!vid) {
                vid = document.createElement('video');
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                vid.style.cssText = 'width:120px;height:120px;border-radius:50%;object-fit:cover;';
                parent.insertBefore(vid, avatarEl);
                avatarEl.style.display = 'none';
            }
            vid.src = currentUser.avatar;
        } else {
            avatarEl.src = currentUser.avatar;
        }
    }

    // Ring around avatar
    const ringWrap = document.querySelector('.profile-avatar-wrap');
    if (ringWrap) {
        const existingRing = ringWrap.querySelector('.profile-ring-overlay');
        if (existingRing) existingRing.remove();
        const ringKey = currentUser.profileRing || 'none';
        if (ringKey !== 'none') {
            const ringData = getRingData(ringKey);
            const ringDiv = document.createElement('div');
            ringDiv.className = 'profile-ring-overlay';
            if (ringData.color === 'rainbow') {
                ringDiv.style.cssText = 'position:absolute;inset:-4px;border-radius:50%;border:4px solid transparent;background:linear-gradient(90deg,red,orange,yellow,green,blue,violet) border-box;animation:ringRotate 3s linear infinite;pointer-events:none;z-index:1;';
            } else {
                ringDiv.style.cssText = 'position:absolute;inset:-4px;border-radius:50%;border:4px solid ' + ringData.color + ';pointer-events:none;z-index:1;box-shadow:0 0 10px ' + ringData.color + '60;';
            }
            ringWrap.style.position = 'relative';
            ringWrap.appendChild(ringDiv);
        }
    }

    // Nick color
    if (currentUser.nickColor) {
        const nickEl2 = document.getElementById('profile-nick');
        if (nickEl2) nickEl2.style.cssText += ';' + getNickColorStyle(currentUser.nickColor);
    }

    // Active title
    const titleEl = document.getElementById('profile-title-display');
    if (titleEl) {
        if (currentUser.active_title) {
            titleEl.textContent = currentUser.active_title;
            titleEl.style.display = 'block';
        } else {
            titleEl.style.display = 'none';
        }
    }

    // JJK Rank badge
    const jjkEl = document.getElementById('profile-jjk-rank');
    if (jjkEl) {
        if (currentUser.jjkRank) {
            const jr = _jjkRankRegistry[currentUser.jjkRank];
            jjkEl.style.display = 'inline-flex';
            jjkEl.innerHTML = `<i class="${jr.icon}" style="color:${jr.color}"></i> ${jr.label}`;
            jjkEl.style.color = jr.color;
        } else {
            jjkEl.style.display = 'none';
        }
    }

    // Rangos comprados (colección)
    const boughtEl = document.getElementById('profile-bought-ranks');
    if (boughtEl) {
        const bought = currentUser.boughtRanks || [];
        if (bought.length) {
            boughtEl.innerHTML = bought.map(key => {
                const info = getRankInfoByKey(key);
                const color = info && info.color ? info.color : 'var(--gold)';
                const icon = info && info.icon ? info.icon : 'fa-solid fa-medal';
                const label = info && info.label ? info.label : key;
                return `<span title="${escHTML(label)}" style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;border:1px solid ${color};background:${color}18;color:${color};font-size:10px;font-weight:600;"><i class="${icon}"></i> ${escHTML(label)}</span>`;
            }).join('');
        } else {
            boughtEl.innerHTML = '';
        }
    }

    // Highlight current avatar
    document.querySelectorAll('.avatar-option').forEach(img => {
        const src = img.getAttribute('src');
        if (currentUser.avatar === src) {
            img.style.borderColor = 'var(--primary)';
            img.style.boxShadow = '0 0 10px var(--primary-glow)';
        } else {
            img.style.borderColor = 'transparent';
            img.style.boxShadow = 'none';
        }
    });
    loadProfileComments(currentUser.nick);
    if (typeof renderAnimeAvatars === 'function') renderAnimeAvatars();
    if (typeof loadAchievements === 'function') loadAchievements();
    if (typeof checkAchievements === 'function') checkAchievements();
}

window.loadProfile();

window.saveAvatar = async function(filename) {
    if (!currentUser || !window._db) return;
    try {
        const db = window._db;
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { avatar: filename });
        currentUser.avatar = filename;
        
        // Update elements in UI directly
        const pAv = document.getElementById('profile-avatar');
        if (pAv) pAv.src = filename;
        const sAv = document.getElementById('sidebar-user-avatar');
        if (sAv) sAv.src = filename;
        
        // Refresh profile to update border highlights
        loadProfile();
        showToast('Avatar actualizado ✓', '#00ffaa');
    } catch(e) {
        showToast('Error al actualizar avatar: ' + e.message, '#ff4466');
    }
};

window.uploadCustomAvatar = function(event) {
    const file = event.target.files[0];
    if (!file || !currentUser) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    if (!isImage && !isVideo) {
        showToast('El archivo debe ser imagen o video', 'var(--danger)');
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        showToast('El archivo no puede pasar de 10MB', 'var(--danger)');
        return;
    }

    const btn = document.querySelector('[onclick*="uploadCustomAvatar"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Subiendo...'; }

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const dataUrl = e.target.result;

            if (isImage) {
                const img = new Image();
                img.onload = async function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxSize = 256;
                    let w = img.width, h = img.height;
                    if (w > h) { if (w > maxSize) { h = Math.round(h * maxSize / w); w = maxSize; } }
                    else { if (h > maxSize) { w = Math.round(w * maxSize / h); h = maxSize; } }
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);

                    const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
                    await apiFetch('PUT', '/users/' + currentUser.nick + '/avatar', { avatar: resizedDataUrl });
                    currentUser.avatar = resizedDataUrl;
                    updateAvatarUI(resizedDataUrl);
                    loadProfile();
                    showToast('Foto de perfil actualizada ✓', '#00ffaa');
                };
                img.src = dataUrl;
            } else {
                await apiFetch('PUT', '/users/' + currentUser.nick + '/avatar', { avatar: dataUrl });
                currentUser.avatar = dataUrl;
                updateAvatarUI(dataUrl);
                loadProfile();
                showToast('Video de perfil actualizado ✓', '#00ffaa');
            }
        } catch(err) {
            showToast('Error al subir: ' + err.message, '#ff4466');
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-camera"></i> Subir Foto/Video'; }
        }
    };
    reader.readAsDataURL(file);
};

function updateAvatarUI(src) {
    const pAv = document.getElementById('profile-avatar');
    if (pAv) {
        if (src && src.startsWith('data:video')) {
            const parent = pAv.parentElement;
            let vid = parent.querySelector('video');
            if (!vid) {
                vid = document.createElement('video');
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                vid.style.cssText = pAv.style.cssText;
                parent.insertBefore(vid, pAv);
                pAv.style.display = 'none';
            }
            vid.src = src;
        } else {
            pAv.src = src;
            pAv.style.display = '';
            const vid = pAv.parentElement.querySelector('video');
            if (vid) vid.remove();
        }
    }
    const sAv = document.getElementById('sidebar-user-avatar');
    if (sAv && !src?.startsWith('data:video')) sAv.src = src;
}

window.saveAvatarFromUrl = async function() {
    if (!currentUser) return;
    const input = document.getElementById('profile-avatar-url-input');
    const url = (input.value || '').trim();
    if (!url) { showToast('Pega un link de imagen primero', 'var(--danger)'); return; }

    const preview = document.getElementById('avatar-url-preview');
    const previewImg = document.getElementById('avatar-url-preview-img');
    previewImg.onerror = () => {
        preview.style.display = 'none';
        showToast('No se pudo cargar esa imagen, prueba otro link', 'var(--danger)');
    };
    previewImg.onload = async () => {
        preview.style.display = 'flex';
        try {
            await apiFetch('PUT', '/users/' + currentUser.nick + '/avatar', { avatar: url });
            currentUser.avatar = url;
            updateAvatarUI(url);
            loadProfile();
            showToast('Avatar actualizado con tu link ✓', '#00ffaa');
        } catch(err) { showToast('Error: ' + err.message, '#ff4466'); }
    };
    previewImg.src = url;
};

// ═══════════════════════════ ADMIN PERMISSION CHECK ═══════════════════════════

function checkAdminPermission() {
    if (!currentUser) return false;
    const rk = getRankKey(currentUser);
    return ['owner', 'admin'].includes(rk);
}

function isOwner() {
    return currentUser && getRankKey(currentUser) === 'owner';
}

// ═══════════════════════════ ADMIN (GOD MODE) ═══════════════════════════

const GOD_MODE_PASSWORD = "Linux es amor";
let isGodModeUnlocked = false;

async function loadAdmin() {
    if (!checkAdminPermission()) { showToast('Sin permiso. No eres Dev/Owner.', '#ff4466'); return; }
    
    const gateway = document.getElementById('god-mode-gateway');
    const dashboard = document.getElementById('god-mode-dashboard');
    
    if (isGodModeUnlocked) {
        gateway.style.display = 'none';
        dashboard.style.display = 'block';
        loadAdminStats();
        loadAdminAccounts(true);
    } else {
        gateway.style.display = 'block';
        dashboard.style.display = 'none';
    }
}

function unlockGodMode() {
    const input = document.getElementById('god-password-input').value;
    if (input === GOD_MODE_PASSWORD) {
        isGodModeUnlocked = true;
        document.getElementById('god-password-input').value = '';
        showToast('ACCESO DIVINO CONCEDIDO', 'var(--primary)');
        loadAdmin();
    } else {
        showToast('CLAVE MAESTRA INCORRECTA', 'var(--danger)');
    }
}

function lockGodMode() {
    isGodModeUnlocked = false;
    showToast('Sesión de Dios Bloqueada', 'var(--text-muted)');
    loadAdmin();
}

async function loadAdminStats() {
    try {
        const data = await apiFetch('GET', '/admin/stats');
        const totalAccounts = data.totalAccounts || 0;
        const totalUsers = data.totalUsers || 0;
        const totalBalance = data.totalBalance || 0;

        const adminStatsEl = document.getElementById('admin-stats-container');
        if (adminStatsEl) {
            adminStatsEl.innerHTML = `
                <div class="glass-card">
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Cuentas activas</div>
                    <div style="font-family:'Orbitron',sans-serif;font-size:28px;color:var(--primary);font-weight:900;">${totalAccounts}</div>
                </div>
                <div class="glass-card">
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Usuarios registrados</div>
                    <div style="font-family:'Orbitron',sans-serif;font-size:28px;color:var(--secondary);font-weight:900;">${totalUsers}</div>
                </div>
                <div class="glass-card">
                    <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">PPC circulando</div>
                    <div style="font-family:'Orbitron',sans-serif;font-size:28px;color:var(--gold);font-weight:900;">${totalBalance.toLocaleString()}</div>
                </div>
            `;
        }
    } catch(e) { console.error(e); }
}

window._invalidateCaches = function() { window._cacheAccounts = null; window._cacheUsers = null; window._adminCache = null; window._lbCache = null; };

async function loadAdminAccounts(forceRefresh) {
    if (!checkAdminPermission()) return;
    const container = document.getElementById('admin-accounts-list');
    if (!container) return;
    if (forceRefresh) window._invalidateCaches();

    const now = Date.now();
    if (window._adminCache && window._adminCache.ts > now - 30000 && forceRefresh !== true) {
        renderAdminAccounts(window._adminCache.accSnap, window._adminCache.usersMap);
        return;
    }

    container.innerHTML = '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando cuentas...</div>';

    try {
        const data = await apiFetch('GET', '/admin/accounts');
        let accSnap = [];
        let usersMap = {};
        if (Array.isArray(data)) {
            accSnap = data.map(d => ({ id: d.nick, ...d }));
            data.forEach(d => { usersMap[d.nick] = d; });
        } else {
            accSnap = data.accounts || [];
            usersMap = data.users || {};
        }
        window._adminCache = { accSnap, usersMap, ts: now };
        renderAdminAccounts(accSnap, usersMap);
    } catch(e) {
        container.innerHTML = '<tr><td colspan="5" style="color:var(--danger);text-align:center;">Error al cargar cuentas: ' + e.message + '</td></tr>';
    }
}

function renderAdminAccounts(accSnap, usersMap) {
    const container = document.getElementById('admin-accounts-list');
    if (!container) return;
    container.innerHTML = '';
    const items = Array.isArray(accSnap) ? accSnap : [];
    items.forEach(item => {
        const acc = item.data ? item.data() : item;
        const nick = item.id || item.nick;
        const user = usersMap[nick] || {};
        const rankKey = getRankKey(user);
        const rankInfo = RANKS[rankKey] || RANKS.mortal_m;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display:flex;align-items:center;gap:8px;">
                    <img src="${user.avatar || 'avt_gojo.jpg'}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">
                    <strong>${nick}</strong>
                </div>
            </td>
            <td style="font-family:'Orbitron',sans-serif;color:var(--gold);">${(acc.balance||0).toLocaleString()} PPC</td>
            <td><span class="badge-tag ${rankInfo.cls}" style="font-size:9px;"><i class="${rankInfo.icon}"></i> ${rankInfo.label}</span></td>
            <td>
                ${user.banned
                    ? '<span class="badge-tag" style="background:rgba(217,70,239,0.15);color:#d946ef;">Baneado</span>'
                    : `<span class="badge-tag" style="background:${acc.frozen ? 'rgba(255,68,102,0.15)' : 'rgba(0,255,170,0.15)'};color:${acc.frozen ? 'var(--danger)':'var(--secondary)'}">
                        ${acc.frozen ? 'Congelada' : 'Activa'}
                       </span>`
                }
            </td>
            <td style="display:flex;gap:6px;flex-wrap:wrap;">
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;" onclick="adminMint('${nick}')"><i class="fa-solid fa-plus"></i> Mint</button>
                <button class="btn btn-danger" style="font-size:9px;padding:4px 8px;" onclick="adminBurn('${nick}')"><i class="fa-solid fa-minus"></i> Burn</button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;" onclick="adminToggleFreeze('${nick}', ${acc.frozen ? 'false' : 'true'})">
                    <i class="fa-solid fa-${acc.frozen ? 'lock-open' : 'lock'}"></i> ${acc.frozen ? 'Descongelar' : 'Congelar'}
                </button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;border-color:#d946ef;color:#d946ef;" onclick="adminToggleBan('${nick}', ${user.banned ? 'false' : 'true'})">
                    <i class="fa-solid fa-${user.banned ? 'unlock' : 'ban'}"></i> ${user.banned ? 'Desbanear' : 'Banear'}
                </button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;border-color:var(--gold);color:var(--gold);" onclick="adminSetBalance('${nick}')"><i class="fa-solid fa-coins"></i> Editar Saldo</button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;border-color:var(--secondary);color:var(--secondary);" onclick="adminDailyReward('${nick}')"><i class="fa-solid fa-gift"></i> Recompensa</button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;border-color:var(--primary);color:var(--primary);" onclick="adminResetPassword('${nick}')"><i class="fa-solid fa-key"></i> Reset Pass</button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;" onclick="adminViewHistory('${nick}')"><i class="fa-solid fa-clock-rotate-left"></i> Historial</button>
                <button class="btn btn-danger" style="font-size:9px;padding:4px 8px;background:var(--danger);color:#000;" onclick="godBankrupt('${nick}')"><i class="fa-solid fa-skull"></i> Bancarrota</button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;border-color:var(--purple);color:var(--purple);" onclick="godChangeRank('${nick}')"><i class="fa-solid fa-chess-knight"></i> Forzar Rango</button>
                <button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;border-color:var(--secondary);color:var(--secondary);" onclick="godChangeAvatar('${nick}')"><i class="fa-solid fa-image"></i> Forzar Avatar</button>
            </td>
        `;
        container.appendChild(row);
    });
}

async function adminMint(nick) {
    if (!checkAdminPermission()) return;
    const amtStr = await showInputModal('Mint PPC a ' + nick, 'Cantidad de PPC a añadir', 'number');
    if (!amtStr) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt <= 0) return;

    const reason = await showInputModal('Motivo del Mint', 'Motivo (opcional)', 'text') || 'Mint sin motivo';

    const ok = await showConfirm('Confirmar Mint', `Añadirás <strong style="color:var(--secondary)">${amt.toLocaleString()} PPC</strong> a <strong>${nick}</strong><br>Motivo: ${escHTML(reason)}`, 'Mint');
    if (!ok) return;

    try {
        await apiFetch('POST', '/bank/mint', { nick, amount: amt, reason });
        showToast(`Mint de ${amt.toLocaleString()} PPC a ${nick} ✓`, '#00ffaa');
        loadAdminAccounts(true);
        if (nick === currentUser.nick) await refreshBankAccount();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminBurn(nick) {
    if (!checkAdminPermission()) return;
    const amtStr = await showInputModal('Burn PPC de ' + nick, 'Cantidad de PPC a quitar', 'number');
    if (!amtStr) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt <= 0) return;

    const reason = await showInputModal('Motivo del Burn', 'Motivo (obligatorio)', 'text') || 'Burn sin motivo';

    const ok = await showConfirm('Confirmar Burn', `Quitarás <strong style="color:var(--danger)">${amt.toLocaleString()} PPC</strong> a <strong>${nick}</strong><br>Motivo: ${escHTML(reason)}`, 'Burn');
    if (!ok) return;

    try {
        await apiFetch('POST', '/bank/burn', { nick, amount: amt, reason });
        showToast(`Burn de ${amt.toLocaleString()} PPC a ${nick} ✓`, '#ff4466');
        loadAdminAccounts(true);
        if (nick === currentUser.nick) await refreshBankAccount();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminToggleFreeze(nick, freeze) {
    const action = freeze ? 'congelar' : 'descongelar';
    const ok = await showConfirm('Confirmar acción', `Vas a ${action} la cuenta de <strong>${nick}</strong>.`);
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', nick), { frozen: freeze });
        showToast(`Cuenta de ${nick} ${freeze ? 'congelada' : 'descongelada'}`, '#00ffaa');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminToggleBan(nick, ban) {
    if (!checkAdminPermission()) return;
    if (nick === currentUser.nick) { showToast('No puedes banear tu propia cuenta', '#ff4466'); return; }
    const action = ban ? 'banear' : 'desbanear';
    const ok = await showConfirm('Confirmar acción', `Vas a ${action} a <strong>${nick}</strong>. ${ban ? 'No podrá iniciar sesión hasta que lo desbanees.' : ''}`);
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', nick), { banned: ban });
        showToast(`Usuario ${nick} ${ban ? 'baneado' : 'desbaneado'}`, ban ? '#ff4466' : '#00ffaa');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminSetBalance(nick) {
    if (!checkAdminPermission()) return;
    const amtStr = await showInputModal('Editar Saldo de ' + nick, 'Nuevo saldo exacto (PPC)', 'number');
    if (amtStr === null) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt < 0) { showToast('El saldo no puede ser negativo', '#ff4466'); return; }
    const ok = await showConfirm('Confirmar Saldo', `El saldo de <strong>${nick}</strong> será <strong style="color:var(--gold)">${amt.toLocaleString()} PPC</strong>.`);
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', nick), { balance: amt });
        await addTx({ type: 'Ajuste Admin', from: 'Admin', to: nick, amount: 0, note: 'Saldo fijado a ' + amt + ' PPC por ' + currentUser.nick });
        showToast(`Saldo de ${nick} ajustado a ${amt.toLocaleString()} PPC`, '#00ffaa');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminDailyReward(nick) {
    if (!checkAdminPermission()) return;
    
    // Fetch user to show multiplier suggestion
    let mult = 1;
    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', nick));
        if (userSnap.exists()) {
            mult = getRankMultiplier(userSnap.data()) || 1;
        }
    } catch {}
    
    const baseAmt = 10000; // cantidad base sugerida
    const suggested = Math.floor(baseAmt * mult);
    
    const amtStr = await showInputModal('Recompensa Diaria para ' + nick, `Cantidad base: ${baseAmt.toLocaleString()} PPC\nTu rango: ×${mult.toFixed(2)} = ${suggested.toLocaleString()} PPC\n\nEscribe cantidad final:`, 'number');
    if (!amtStr) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt <= 0) { showToast('Ingresa una cantidad válida', '#ff4466'); return; }
    const ok = await showConfirm('Pagar Recompensa', `Entregarás <strong style="color:var(--secondary)">${amt.toLocaleString()} PPC</strong> a <strong>${nick}</strong> como recompensa diaria.`);
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', nick), {
            balance: window._fbIncrement(amt),
            totalIn: window._fbIncrement(amt)
        });
        await addTx({ type: 'Recompensa', from: 'Banco', to: nick, amount: amt, note: `Recompensa diaria manual por ${currentUser.nick} (×${mult.toFixed(2)})` });
        showToast(`Recompensa de ${amt.toLocaleString()} PPC entregada a ${nick}`, '#00ffaa');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminResetPassword(nick) {
    if (!checkAdminPermission()) return;
    if (nick === currentUser.nick) { showToast('Cambia tu contraseña desde Mi Perfil', '#ff4466'); return; }
    const pass = await showInputModal('Resetear Contraseña de ' + nick, 'Nueva contraseña temporal', 'text');
    if (!pass || pass.trim().length < 4) { showToast('La contraseña debe tener al menos 4 caracteres', '#ff4466'); return; }
    const ok = await showConfirm('Confirmar Reset', `Se asignará una nueva contraseña a <strong>${nick}</strong>.`);
    if (!ok) return;
    try {
        const newHash = hashPass(pass.trim(), nick);
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', nick), { hash: newHash });
        showToast(`Contraseña de ${nick} actualizada ✓`, '#00ffaa');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function adminViewHistory(nick) {
    if (!checkAdminPermission()) return;
    const modal = document.getElementById('admin-history-modal');
    const body = document.getElementById('admin-history-body');
    if (!modal || !body) return;
    document.getElementById('admin-history-title').innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> Historial de <span style="color:var(--primary);">' + nick + '</span>';
    body.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando historial...</div>';
    modal.classList.add('active');
    try {
        const [loginSnap, snap] = await Promise.all([
            window._fbGetDocs(window._fbQuery(
                window._fbCollection(window._db, 'users', nick, 'logins'),
                window._fbOrderBy('timestamp', 'desc'),
                window._fbLimit(20)
            )),
            window._fbGetDocs(window._fbQuery(
                window._fbCollection(window._db, 'transactions'),
                window._fbOrderBy('timestamp', 'desc'),
                window._fbLimit(200)
            ))
        ]);
        body.innerHTML = '';

        // IP / login history section
        const loginHeader = document.createElement('div');
        loginHeader.className = 'section-title';
        loginHeader.style.cssText = 'font-size:13px;margin-bottom:10px;';
        loginHeader.innerHTML = '<i class="fa-solid fa-network-wired" style="color:var(--secondary);"></i> Historial de IP (inicios de sesión)';
        body.appendChild(loginHeader);

        let loginCount = 0;
        loginSnap.forEach(d => {
            loginCount++;
            const lg = d.data();
            let dateStr = '';
            if (lg.timestamp) {
                const dt = lg.timestamp.toDate ? lg.timestamp.toDate() : new Date(lg.timestamp);
                dateStr = dt.toLocaleDateString('es') + ' ' + dt.toLocaleTimeString('es', {hour:'2-digit',minute:'2-digit'});
            }
            const el = document.createElement('div');
            el.className = 'glass-card';
            el.style.cssText = 'padding:8px 12px;margin-bottom:6px;display:flex;align-items:center;gap:10px;';
            el.innerHTML = `
                <div style="width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;color:var(--secondary);flex-shrink:0;"><i class="fa-solid fa-globe"></i></div>
                <div style="flex:1;min-width:0;">
                    <div style="font-size:12px;font-weight:600;font-family:'Orbitron',sans-serif;">${escHTML(lg.ip || 'desconocida')}</div>
                    <div style="font-size:10px;color:var(--text-muted);">${dateStr}</div>
                </div>
            `;
            body.appendChild(el);
        });
        if (loginCount === 0) body.insertAdjacentHTML('beforeend', '<div class="empty-msg">Sin inicios de sesión registrados</div>');

        // Transactions section
        const txHeader = document.createElement('div');
        txHeader.className = 'section-title';
        txHeader.style.cssText = 'font-size:13px;margin:18px 0 10px;';
        txHeader.innerHTML = '<i class="fa-solid fa-clock-rotate-left" style="color:var(--gold);"></i> Movimientos';
        body.appendChild(txHeader);

        let count = 0;
        snap.forEach(d => {
            const tx = d.data();
            if (tx.from !== nick && tx.to !== nick) return;
            count++;
            const isIn = tx.to === nick;
            const color = isIn ? 'var(--secondary)' : 'var(--danger)';
            const icon = isIn ? 'fa-solid fa-arrow-down-long' : 'fa-solid fa-arrow-up-long';
            let dateStr = '';
            if (tx.timestamp) {
                const dt = tx.timestamp.toDate ? tx.timestamp.toDate() : new Date(tx.timestamp);
                dateStr = dt.toLocaleDateString('es') + ' ' + dt.toLocaleTimeString('es', {hour:'2-digit',minute:'2-digit'});
            }
            const el = document.createElement('div');
            el.className = 'glass-card';
            el.style.cssText = 'padding:10px 14px;margin-bottom:8px;display:flex;align-items:center;gap:10px;';
            el.innerHTML = `
                <div style="width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;color:${color};flex-shrink:0;"><i class="${icon}"></i></div>
                <div style="flex:1;min-width:0;">
                    <div style="font-size:12px;font-weight:600;">${escHTML(tx.type || 'Movimiento')}: ${escHTML(tx.from)} → ${escHTML(tx.to)}</div>
                    <div style="font-size:10px;color:var(--text-muted);">${escHTML(tx.note || '')} • ${dateStr}</div>
                </div>
                <div style="font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;color:${color};white-space:nowrap;">${isIn ? '+' : '-'}${formatCompact(tx.amount||0)} PPC</div>
            `;
            body.appendChild(el);
        });
        if (count === 0) body.insertAdjacentHTML('beforeend', '<div class="empty-msg">Sin transacciones para este usuario</div>');
    } catch(e) {
        body.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar historial: ' + escHTML(e.message) + '</div>';
    }
}

function closeAdminHistory() {
    document.getElementById('admin-history-modal')?.classList.remove('active');
}

async function adminPayInterest() {
    if (!isOwner()) { showToast('Solo el OWNER puede pagar intereses', '#ff4466'); return; }
    const ok = await showConfirm('Pagar intereses', `Se pagará <strong style="color:var(--secondary)">${bankConfig.interest}%</strong> de interés base a cada cuenta activa <strong>(× multiplicador de rango)</strong>.`);
    if (!ok) return;

    try {
        window._invalidateCaches();
        const accSnap = await window._fbGetDocs(window._fbCollection(window._db, 'bank_accounts'));
        let count = 0;
        const updates = [];

        for (const doc of accSnap.docs) {
            const data = doc.data();
            const bal = data.balance || 0;
            if (bal <= 0) continue;

            // Fetch user to get rank multiplier
            let mult = 1;
            try {
                const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', doc.id));
                if (userSnap.exists()) {
                    mult = getRankMultiplier(userSnap.data()) || 1;
                }
            } catch {}

            const interest = Math.floor(bal * (bankConfig.interest / 100) * mult);
            if (interest > 0) {
                updates.push({ ref: doc.ref, interest, nick: doc.id, mult });
                count++;
            }
        }

        for (const upd of updates) {
            await window._fbUpdateDoc(upd.ref, { balance: window._fbIncrement(upd.interest) });
            await addTx({ type: 'Interés Mensual', from: 'Banco', to: upd.nick, amount: upd.interest, note: `Interés mensual ${bankConfig.interest}% ×${upd.mult.toFixed(2)}` });
        }

        showToast(`Interés pagado a ${count} cuentas`, '#00ffaa');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

// ═══════════════════════════ RANK SHOP ═══════════════════════════

async function loadRankShop() {
    if (!currentUser || !bankAccount) return;
    const container = document.getElementById('rank-shop-grid');
    if (!container) return;

    const rankList = getMythRankList(currentUser);
    const currentRankKey = getRankKey(currentUser);
    const bal = bankAccount.balance || 0;

    container.innerHTML = '';
    rankList.forEach(rank => {
        const requireBoth = (rank.gradeTier || 0) >= 3;
        const pusd = currentUser.pusdBalance || 0;
        let canAfford;
        if (rank.price === 0) {
            canAfford = true;
        } else if (requireBoth) {
            canAfford = bal >= rank.price && pusd >= rank.price_usd;
        } else if (rank.price_usd > 0) {
            canAfford = bal >= rank.price || pusd >= rank.price_usd;
        } else {
            canAfford = bal >= rank.price;
        }
        const isOwned   = currentRankKey === rank.key;
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.style.borderColor = isOwned ? rank.color : 'var(--dark-border)';
        card.style.boxShadow = isOwned ? `0 0 15px ${rank.color}30` : 'none';

        const dualPrice = (rank.price_usd || 0) > 0;
        card.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <div style="width:40px;height:40px;border-radius:50%;background:${rank.color}20;border:2px solid ${rank.color};display:flex;align-items:center;justify-content:center;color:${rank.color};font-size:18px;">
                    <i class="${rank.icon}"></i>
                </div>
                <div>
                    <div style="font-weight:700;font-size:14px;color:${rank.color}">${rank.label}</div>
                    <div style="font-size:10px;color:var(--text-muted);">Multiplicador x${rank.mult}</div>
                </div>
                ${isOwned ? `<span class="badge-tag" style="margin-left:auto;background:${rank.color}20;color:${rank.color};border-color:${rank.color};">Actual</span>` : ''}
            </div>
            ${rank.price > 0 ? `
                ${dualPrice ? `
                <div style="display:flex;gap:6px;margin-bottom:10px;">
                    <span style="font-size:11px;color:var(--secondary);flex:1;text-align:center;padding:4px;background:rgba(0,255,170,0.1);border-radius:6px;font-family:'Orbitron',sans-serif;">${rank.price.toLocaleString()} PPC</span>
                    <span style="font-size:11px;color:var(--gold);flex:1;text-align:center;padding:4px;background:rgba(251,191,36,0.1);border-radius:6px;font-family:'Orbitron',sans-serif;">$${rank.price_usd.toLocaleString()} P-USD</span>
                </div>
                ${requireBoth ? '<div style="font-size:9px;color:#f472b6;text-align:center;margin-bottom:8px;"><i class="fa-solid fa-link"></i> Requiere ambos pagos</div>' : ''}
                ` : `
                <div style="font-family:'Orbitron',sans-serif;font-size:13px;color:var(--gold);margin-bottom:12px;font-weight:bold;">${rank.price.toLocaleString()} PPC</div>
                `}
                <button class="btn ${isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary'} btn-full"
                    style="${!isOwned && !canAfford ? 'opacity:0.5;cursor:not-allowed;' : ''}"
                    ${isOwned || !canAfford ? 'disabled' : `onclick="buyRank('${rank.key}')"`}>
                    ${isOwned ? 'Rango actual' : canAfford ? 'Comprar rango' : 'Saldo Insuficiente'}
                </button>
            ` : `<div style="font-size:11px;color:var(--text-muted);">Rango base — gratuito</div>`}
        `;
        container.appendChild(card);
    });
}

async function buyRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = ALL_MYTH_RANKS[rankKey];
    if (!rank) return;

    const requireBoth = (rank.gradeTier || 0) >= 3;
    const pusd = currentUser.pusdBalance || 0;
    let canAfford;
    if (rank.price === 0) {
        canAfford = true;
    } else if (requireBoth) {
        canAfford = bankAccount.balance >= rank.price && pusd >= rank.price_usd;
    } else if ((rank.price_usd || 0) > 0) {
        canAfford = bankAccount.balance >= rank.price || pusd >= rank.price_usd;
    } else {
        canAfford = bankAccount.balance >= rank.price;
    }
    if (!canAfford) { showToast('Saldo insuficiente', '#ff4466'); return; }

    let payLabel;
    if (requireBoth) {
        payLabel = `${rank.price.toLocaleString()} PPC + $${rank.price_usd.toLocaleString()} P-USD`;
    } else if ((rank.price_usd || 0) > 0) {
        const usePUSD = pusd >= rank.price_usd;
        payLabel = usePUSD ? `$${rank.price_usd.toLocaleString()} P-USD` : `${rank.price.toLocaleString()} PPC`;
    } else {
        payLabel = `${rank.price.toLocaleString()} PPC`;
    }

    const ok = await showConfirm('Comprar Rango', `¿Deseas comprar el rango <strong style="color:${rank.color}">${rank.label}</strong> por ${payLabel}?`);
    if (!ok) return;

    try {
        const db = window._db;
        if (rank.price > 0) {
            if (requireBoth) {
                await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
                await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
                currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            } else if ((rank.price_usd || 0) > 0) {
                const usePUSD = pusd >= rank.price_usd;
                if (usePUSD) {
                    await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
                    currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
                } else {
                    await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
                }
            } else {
                await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            }
        }
        const staffKeys = ['owner', 'admin', 'mod', 'helper'];
        const newRank = staffKeys.includes(getRankKey(currentUser)) ? getRankKey(currentUser) : rankKey;
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), {
            rank: newRank,
            boughtRanks: window._fbArrayUnion(rankKey)
        });
        currentUser.rank = newRank;

        await addTx({ type: 'Compra Rango', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Rango Olimpo comprado: ${rank.label}` });

        showToast(`¡Rango ${rank.label} obtenido!`, rank.color);
        updateNavUI();
        loadRankShop();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

// ═══════════════════════════ FRIEREN PAGE ═══════════════════════════

async function loadFrierenPage() {
    if (!currentUser || !bankAccount) return;

    const curRankEl = document.getElementById('frieren-current-rank');
    if (curRankEl) {
        if (currentUser.frierenRank) {
            const fr = FRIEREN_RANKS.find(x => x.key === currentUser.frierenRank);
            curRankEl.textContent = fr ? fr.label : 'Sin título';
        } else {
            curRankEl.textContent = 'Sin título';
        }
    }

    const ranksGrid = document.getElementById('frieren-ranks-grid');
    if (ranksGrid) {
        ranksGrid.innerHTML = '';
        const colors = {
            frieren_fern: '#d8b4e2',
            frieren_stark: '#ff5555',
            frieren_frieren: '#bce6ff',
            frieren_himmel: '#50c878'
        };
        FRIEREN_RANKS.forEach(rank => {
            const isOwned = currentUser.frierenRank === rank.key;
            const requireBoth = (rank.gradeTier || 0) >= 3;
            const pusd = currentUser.pusdBalance || 0;
            let canAfford;
            if (requireBoth) {
                canAfford = bankAccount.balance >= rank.price && pusd >= rank.price_usd;
            } else {
                canAfford = bankAccount.balance >= rank.price || pusd >= rank.price_usd;
            }
            const col = colors[rank.key] || '#bce6ff';
            ranksGrid.innerHTML += `
                <div class="glass-card" style="border-color:${isOwned ? col : 'var(--dark-border)'};">
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                        <img src="${rank.img}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;border:2px solid ${col};">
                        <div>
                            <div style="font-weight:700;color:${col};">${rank.label}</div>
                            <div style="font-size:10px;color:var(--text-muted);">Multiplicador x${rank.mult}</div>
                        </div>
                    </div>
                    <div style="display:flex;gap:6px;margin-bottom:10px;">
                        <span style="font-size:11px;color:var(--secondary);flex:1;text-align:center;padding:4px;background:rgba(0,255,170,0.1);border-radius:6px;font-family:'Orbitron',sans-serif;">${rank.price.toLocaleString()} PPC</span>
                        <span style="font-size:11px;color:var(--gold);flex:1;text-align:center;padding:4px;background:rgba(251,191,36,0.1);border-radius:6px;font-family:'Orbitron',sans-serif;">$${rank.price_usd.toLocaleString()} P-USD</span>
                    </div>
                    ${requireBoth ? '<div style="font-size:9px;color:#f472b6;text-align:center;margin-bottom:8px;"><i class="fa-solid fa-link"></i> Requiere ambos pagos</div>' : ''}
                    <button class="btn btn-full ${isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary'}"
                        ${isOwned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyFrierenRank('${rank.key}')"`}>
                        <i class="${rank.icon}"></i> ${isOwned ? 'Título Actual' : canAfford ? 'Obtener Título' : 'Saldo Insuficiente'}
                    </button>
                </div>
            `;
        });
    }

    // Frieren relics
    const relicsGrid = document.getElementById('frieren-items-grid');
    if (relicsGrid) {
        relicsGrid.innerHTML = '';
        FRIEREN_RELICS.forEach(relic => {
            const owned = (bankAccount.frierenItems || []).includes(relic.id);
            const canAfford = bankAccount.balance >= relic.price;
            relicsGrid.innerHTML += `
                <div class="glass-card text-center">
                    <div style="font-size:36px;color:var(--gold);margin-bottom:10px;"><i class="${relic.icon}"></i></div>
                    <div style="font-weight:700;color:var(--gold);margin-bottom:6px;">${relic.name}</div>
                    <div style="font-size:10px;color:var(--text-muted);margin-bottom:12px;">${relic.desc}</div>
                    <div style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:13px;font-weight:bold;margin-bottom:12px;">${relic.price.toLocaleString()} PPC</div>
                    <button class="btn btn-full ${owned ? 'btn-secondary' : 'btn-primary'}" ${owned || !canAfford ? 'disabled style="opacity:0.6"' : `onclick="buyFrierenRelic('${relic.id}','${relic.name}',${relic.price})"`}>
                        ${owned ? '✓ Obtenida' : 'Comprar'}
                    </button>
                </div>
            `;
        });
    }

    // Inventory
    const invEl = document.getElementById('frieren-inventory');
    if (invEl) {
        const items = bankAccount.frierenItems || [];
        if (items.length === 0) {
            invEl.innerHTML = '<div class="empty-msg" style="color:rgba(188,230,255,0.4)">Sin reliquias aún</div>';
        } else {
            invEl.innerHTML = items.map(id => {
                const relic = FRIEREN_RELICS.find(r => r.id === id);
                return relic ? `<div class="badge-tag" style="background:rgba(255,215,0,0.1);color:var(--gold);border-color:rgba(255,215,0,0.3);font-size:11px;padding:6px 12px;"><i class="${relic.icon}"></i> ${relic.name}</div>` : '';
            }).join('');
        }
    }
}

async function buyFrierenRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = FRIEREN_RANKS.find(r => r.key === rankKey);
    if (!rank) return;

    const requireBoth = (rank.gradeTier || 0) >= 3;
    const pusd = currentUser.pusdBalance || 0;
    let canAfford;
    if (requireBoth) {
        canAfford = bankAccount.balance >= rank.price && pusd >= rank.price_usd;
    } else {
        canAfford = bankAccount.balance >= rank.price || pusd >= rank.price_usd;
    }
    if (!canAfford) { showToast('Saldo insuficiente', '#ff4466'); return; }

    let payLabel;
    if (requireBoth) {
        payLabel = `${rank.price.toLocaleString()} PPC + $${rank.price_usd.toLocaleString()} P-USD`;
    } else {
        const usePUSD = pusd >= rank.price_usd;
        payLabel = usePUSD ? `$${rank.price_usd.toLocaleString()} P-USD` : `${rank.price.toLocaleString()} PPC`;
    }

    const ok = await showConfirm('Obtener Título', `¿Obtener el título <strong>${rank.label}</strong> por ${payLabel}?`);
    if (!ok) return;

    try {
        const db = window._db;
        if (requireBoth) {
            await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
        } else {
            const usePUSD = pusd >= rank.price_usd;
            if (usePUSD) {
                await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
                currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            } else {
                await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            }
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { frierenRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.frierenRank = rankKey;
        await addTx({ type: 'Rango Frieren', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Título Frieren: ${rank.label}` });
        showToast(`¡Título "${rank.label}" obtenido!`, '#bce6ff');
        loadFrierenPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function buyFrierenRelic(relicId, relicName, price) {
    if (!currentUser || !bankAccount || !window._db) return;
    if (bankAccount.balance < price) { showToast('PPC insuficiente', '#ff4466'); return; }

    const ok = await showConfirm('Comprar Reliquia', `¿Comprar "${relicName}" por ${price.toLocaleString()} PPC?`);
    if (!ok) return;

    try {
        const db = window._db;
        let items = bankAccount.frierenItems || [];
        if (!items.includes(relicId)) items.push(relicId);
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(-price),
            frierenItems: items
        });
        await addTx({ type: 'Reliquia Frieren', from: currentUser.nick, to: 'Banco', amount: price, note: `Reliquia: ${relicName}` });
        showToast(`¡Reliquia "${relicName}" obtenida!`, '#ffd700');
        loadFrierenPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

// ═══════════════════════════ JJK PAGE ═══════════════════════════

async function loadJJKPage() {
    if (!currentUser || !bankAccount) return;

    const curJJKEl = document.getElementById('jjk-current-rank');
    if (curJJKEl) {
        if (currentUser.jjkRank) {
            const jr = _jjkRankRegistry[currentUser.jjkRank];
            curJJKEl.innerHTML = jr ? `<i class="${jr.icon}" style="color:${jr.color}"></i> ${jr.label} (${jr.grade})` : 'Sin rango';
        } else {
            curJJKEl.textContent = 'Sin rango JJK';
        }
    }

    // Render JJK rank cards
    const ranksContainer = document.getElementById('jjk-ranks-grid');
    if (ranksContainer) {
        ranksContainer.innerHTML = '';
        JJK_RANKS.forEach(rank => {
            const isOwned = currentUser.jjkRank === rank.key;
            const requireBoth = rank.gradeTier >= 3;
            let canAfford;
            if (requireBoth) {
                canAfford = bankAccount.balance >= rank.price && (currentUser.pusdBalance || 0) >= rank.price_usd;
            } else {
                canAfford = bankAccount.balance >= rank.price || (currentUser.pusdBalance || 0) >= rank.price_usd;
            }
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.borderColor = isOwned ? rank.color : 'var(--dark-border)';
            card.style.boxShadow = isOwned ? `0 0 20px ${rank.color}40` : 'none';

            card.innerHTML = `
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                    <div style="width:44px;height:44px;border-radius:50%;background:${rank.color}20;border:2px solid ${rank.color};display:flex;align-items:center;justify-content:center;color:${rank.color};font-size:20px;">
                        <i class="${rank.icon}"></i>
                    </div>
                    <div>
                        <div style="font-weight:700;color:${rank.color};">${rank.label}</div>
                        <div style="font-size:10px;color:var(--text-muted);">${rank.grade} • +${Math.round(rank.mult * 100)}% Bonos</div>
                    </div>
                </div>
                <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;line-height:1.5;">${rank.desc}</p>
                <div style="display:flex;gap:6px;margin-bottom:12px;">
                    <span style="font-size:11px;color:var(--secondary);flex:1;text-align:center;padding:4px;background:rgba(0,255,170,0.1);border-radius:6px;font-family:'Orbitron',sans-serif;">${rank.price.toLocaleString()} PPC</span>
                    <span style="font-size:11px;color:var(--gold);flex:1;text-align:center;padding:4px;background:rgba(251,191,36,0.1);border-radius:6px;font-family:'Orbitron',sans-serif;">$${rank.price_usd.toLocaleString()} P-USD</span>
                </div>
                ${requireBoth ? '<div style="font-size:9px;color:#f472b6;text-align:center;margin-bottom:8px;"><i class="fa-solid fa-link"></i> Requiere ambos pagos</div>' : ''}
                <button class="btn btn-full ${isOwned ? 'btn-secondary' : canAfford ? 'btn-primary' : 'btn-secondary'}"
                    ${isOwned || !canAfford ? `disabled style="opacity:0.6"` : `onclick="buyJJKRank('${rank.key}')"`}>
                    <i class="${rank.icon}"></i> ${isOwned ? 'Rango Actual' : canAfford ? 'Hacerse Hechicero' : 'Saldo Insuficiente'}
                </button>
            `;
            ranksContainer.appendChild(card);
        });
    }

    // Show minigames section
    const gamesSection = document.getElementById('jjk-games-section');
    if (gamesSection) {
        gamesSection.style.display = currentUser.jjkRank ? 'block' : 'none';
    }
}

async function buyJJKRank(rankKey) {
    if (!currentUser || !bankAccount || !window._db) return;

    const rank = _jjkRankRegistry[rankKey];
    const requireBoth = rank.gradeTier >= 3;
    let canAfford;
    if (requireBoth) {
        canAfford = bankAccount.balance >= rank.price && (currentUser.pusdBalance || 0) >= rank.price_usd;
    } else {
        canAfford = bankAccount.balance >= rank.price || (currentUser.pusdBalance || 0) >= rank.price_usd;
    }
    if (!canAfford) { showToast('Saldo insuficiente', '#ff4466'); return; }

    let payLabel;
    if (requireBoth) {
        payLabel = `${rank.price.toLocaleString()} PPC + $${rank.price_usd.toLocaleString()} P-USD`;
    } else {
        const usePUSD = (currentUser.pusdBalance || 0) >= rank.price_usd;
        payLabel = usePUSD ? `$${rank.price_usd.toLocaleString()} P-USD` : `${rank.price.toLocaleString()} PPC`;
    }

    const ok = await showConfirm('Comprar Rango JJK', `¿Convertirte en <strong style="color:${rank.color}">${rank.label}</strong> por ${payLabel}?`);
    if (!ok) return;

    try {
        const db = window._db;
        if (requireBoth) {
            await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
            currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
        } else {
            const usePUSD = (currentUser.pusdBalance || 0) >= rank.price_usd;
            if (usePUSD) {
                await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { pusdBalance: window._fbIncrement(-rank.price_usd) });
                currentUser.pusdBalance = (currentUser.pusdBalance || 0) - rank.price_usd;
            } else {
                await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-rank.price) });
            }
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { jjkRank: rankKey, boughtRanks: window._fbArrayUnion(rankKey) });
        currentUser.jjkRank = rankKey;
        await addTx({ type: 'Rango JJK', from: currentUser.nick, to: 'Banco', amount: rank.price, note: `Hechicero JJK: ${rank.label}` });
        showToast(`¡Ahora eres ${rank.label}!`, rank.color);
        loadJJKPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

// JJK utility functions needed by minigames.js
function getJJKRankData() { return currentUser && currentUser.jjkRank ? _jjkRankRegistry[currentUser.jjkRank] || null : null; }

function getJJKMultiplier(base) {
    const jr = getJJKRankData();
    if (!jr) return base;
    if (_jjkBlackFlashActive) { _jjkBlackFlashActive = false; return Math.round(base * 1.8); }
    return Math.round(base * (1 + jr.mult));
}

async function jjkGameDebit(bet) {
    if (!currentUser || !window._db) return false;
    if ((bankAccount.balance || 0) < bet) { showToast('Saldo insuficiente para apostar', '#ff4466'); return false; }
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(-bet)
        });
        return true;
    } catch(e) {
        showToast('Error al procesar apuesta', '#ff4466');
        return false;
    }
}

async function jjkGameCredit(amount, note) {
    if (!currentUser || !window._db) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(amount),
            totalIn: window._fbIncrement(amount)
        });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { jjkWins: window._fbIncrement(1) });
        await addTx({ type: 'Ganancia JJK', from: 'Minijuego', to: currentUser.nick, amount, note });
    } catch(e) { console.error(e); }
}

async function updateJJKStats(updates) {
    if (!currentUser || !window._db) return;
    try {
        const merged = {};
        Object.entries(updates).forEach(([k, v]) => { merged[`jjkStats.${k}`] = v; });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), merged);
    } catch(e) { console.error(e); }
}

async function checkJJKAchievements() {
    if (!currentUser || !window._db) return;
    const earned = currentUser.jjkAchievements || [];
    for (const ach of JJK_ACHIEVEMENTS) {
        if (earned.includes(ach.id)) continue;
        // Re-fetch user to check check function if needed — simplified check
        if (ach.id === 'first_jjk' && currentUser.jjkRank) {
            earned.push(ach.id);
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { jjkAchievements: earned });
            
            // Aplicar multiplicador de rango a la recompensa
            const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
            const finalReward = Math.round(ach.reward * mult);
            
            await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
            showToast(`Logro JJK: "${ach.name}" +${finalReward.toLocaleString()} PPC (×${mult.toFixed(2)})!`, '#00d4ff');
        }
    }
    currentUser.jjkAchievements = earned;
}

// ═══════════════════════════ PAREJAS ═══════════════════════════

async function loadParejaPage() {
    if (!currentUser || !bankAccount) return;
    const container = document.getElementById('pareja-container');
    if (!container) return;

    const partner = currentUser.parejaWith;
    if (!partner) {
        container.innerHTML = `
            <div class="glass-card text-center" style="padding:50px 30px; max-width:500px; margin:0 auto;">
                <div style="font-size:60px;margin-bottom:20px;color:var(--danger);"><i class="fa-solid fa-heart-broken"></i></div>
                <h2 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:10px;">Sin Pareja Registrada</h2>
                <p style="font-size:13px;color:var(--text-muted);">Para acceder a la bóveda compartida y las cartas de amor, un admin debe asignar tu rango de pareja.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="glass-card" style="max-width:600px;margin:0 auto 20px auto;text-align:center;border-color:var(--danger);">
            <div style="font-size:48px;margin-bottom:12px;color:var(--danger);"><i class="fa-solid fa-heart"></i></div>
            <h2 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:5px;">Pareja con <span style="color:var(--gold);">${partner}</span></h2>
            <p style="font-size:12px;color:var(--text-muted);">Bóveda compartida y beneficios activos.</p>
        </div>
        <div class="grid-container">
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:15px;"><i class="fa-solid fa-envelope-heart"></i> Carta de Amor</h3>
                <div class="form-group">
                    <textarea class="form-control" id="love-letter-input" rows="4" placeholder="Escribe tu carta aquí..."></textarea>
                </div>
                <button class="btn btn-primary btn-full" onclick="sendLoveLetter('${partner}')">
                    <i class="fa-solid fa-paper-plane"></i> Enviar Carta
                </button>
            </div>
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:var(--gold);margin-bottom:15px;"><i class="fa-solid fa-vault"></i> Bóveda Compartida</h3>
                <div id="shared-vault-info">
                    <div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando bóveda...</div>
                </div>
            </div>
        </div>
        <div class="glass-card">
            <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:15px;"><i class="fa-solid fa-inbox"></i> Cartas Recibidas</h3>
            <div id="love-letters-received"></div>
        </div>
    `;

    loadSharedVault(partner);
    loadLoveLetters(partner);
}

async function sendLoveLetter(partner) {
    if (!currentUser || !window._db) return;
    const input = document.getElementById('love-letter-input');
    const msg = (input.value || '').trim();
    if (!msg) { showToast('Escribe algo antes de enviar', '#ff4466'); return; }

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        await window._fbAddDoc(window._fbCollection(window._db, `vaults/${vaultId}/letters`), {
            from: currentUser.nick,
            to: partner,
            msg,
            timestamp: window._fbServerTimestamp()
        });
        input.value = '';
        showToast('Carta de amor enviada con éxito 💌', '#ff69b4');
        loadLoveLetters(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function loadLoveLetters(partner) {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('love-letters-received');
    if (!container) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const snap = await window._fbGetDocs(window._fbCollection(window._db, `vaults/${vaultId}/letters`));

        if (snap.empty) {
            container.innerHTML = '<div class="empty-msg">No hay cartas aún... ¡Sé el primero en escribir!</div>';
            return;
        }

        const letters = [];
        snap.forEach(d => {
            const data = d.data();
            letters.push({
                ...data,
                date: data.timestamp ? data.timestamp.toDate() : new Date()
            });
        });

        // Sort by timestamp desc
        letters.sort((a, b) => b.date - a.date);

        container.innerHTML = '';
        letters.slice(0, 10).forEach(letter => {
            const isFromMe = letter.from === currentUser.nick;
            const d = document.createElement('div');
            d.className = 'glass-card';
            d.style.cssText = 'margin-bottom:12px;border-color:rgba(255,105,180,0.3);';
            d.innerHTML = `
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                    <strong style="color:${isFromMe ? 'var(--primary)' : 'var(--danger)'};">
                        <i class="fa-solid fa-${isFromMe ? 'paper-plane' : 'envelope-heart'}"></i> ${letter.from}
                    </strong>
                    <span style="font-size:10px;color:var(--text-muted);">${letter.date.toLocaleDateString()}</span>
                </div>
                <p style="font-size:13px;line-height:1.6;color:var(--text-main);">${escHTML(letter.msg)}</p>
            `;
            container.appendChild(d);
        });
    } catch(e) {
        console.error('Error loadLoveLetters:', e);
        container.innerHTML = '<div class="empty-msg">Error al cargar cartas</div>';
    }
}

async function loadSharedVault(partner) {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('shared-vault-info');
    if (!container) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const snap = await window._fbGetDoc(window._fbDoc(window._db, 'vaults', vaultId));
        const vault = snap.exists() ? snap.data() : { balance: 0 };

        container.innerHTML = `
            <div style="text-align:center;margin-bottom:15px;">
                <div style="font-size:11px;color:var(--text-muted);">Saldo Compartido</div>
                <div style="font-family:'Orbitron',sans-serif;font-size:28px;color:var(--gold);font-weight:900;">${formatCompact(vault.balance || 0)} PPC</div>
            </div>
            <div class="grid-container" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:15px;">
                <div>
                    <input class="form-control" id="vault-deposit-amount" type="number" min="1" placeholder="Depositar PPC...">
                    <button class="btn btn-primary btn-full" style="margin-top:8px;font-size:12px;" onclick="depositToVault('${partner}')"><i class="fa-solid fa-arrow-down-long"></i> Depositar</button>
                </div>
                <div>
                    <input class="form-control" id="vault-withdraw-amount" type="number" min="1" placeholder="Retirar PPC...">
                    <button class="btn btn-secondary btn-full" style="margin-top:8px;font-size:12px;" onclick="withdrawFromParejaVault('${partner}')"><i class="fa-solid fa-arrow-up-long"></i> Retirar</button>
                </div>
            </div>
            <div id="pareja-vault-history"><div class="empty-msg">Cargando historial...</div></div>
        `;
        const ops = await fetchVaultOps('shared', vaultId, 20);
        renderOpsList(document.getElementById('pareja-vault-history'), ops);
    } catch(e) {
        container.innerHTML = '<div class="empty-msg">Error al cargar bóveda</div>';
    }
}

async function withdrawFromParejaVault(partner) {
    if (!currentUser || !bankAccount || !window._db) return;
    const input = document.getElementById('vault-withdraw-amount');
    const amt = Math.floor(parseFloat(input?.value) || 0);
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    const vaultId = [currentUser.nick, partner].sort().join('_');
    try {
        const db = window._db;
        const vRef = window._fbDoc(db, 'vaults', vaultId);
        const vSnap = await window._fbGetDoc(vRef);
        const v = vSnap.exists() ? vSnap.data() : { balance: 0 };
        if ((v.balance || 0) < amt) { showToast('La bóveda no tiene ese monto', '#ff4466'); return; }
        const ok = await showConfirm('Retirar de Bóveda', `Retirarás <strong>${amt.toLocaleString()} PPC</strong> de la bóveda compartida a tu saldo.`);
        if (!ok) return;
        await window._fbUpdateDoc(vRef, { balance: window._fbIncrement(-amt) });
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(amt) });
        await logVaultOp('shared', vaultId, 'withdraw', currentUser.nick, vaultId, amt, 'Retiro de bóveda de pareja');
        await addTx({ type: 'Bóveda Pareja', from: 'Bóveda Compartida', to: currentUser.nick, amount: amt, note: 'Retiro de bóveda de pareja' });
        if (input) input.value = '';
        showToast('Retiro exitoso ✓', '#00ffaa');
        loadSharedVault(partner);
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function depositToVault(partner) {
    if (!currentUser || !bankAccount || !window._db) return;
    const amtInput = document.getElementById('vault-deposit-amount');
    const amt = Math.floor(parseFloat(amtInput?.value || 0));
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    if (bankAccount.balance < amt) { showToast('Saldo insuficiente', '#ff4466'); return; }

    const ok = await showConfirm('Depositar a Bóveda', `¿Depositar ${amt.toLocaleString()} PPC a la bóveda con ${partner}?`);
    if (!ok) return;

    try {
        const db = window._db;
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const vaultRef = window._fbDoc(db, 'vaults', vaultId);
        const snap = await window._fbGetDoc(vaultRef);

        if (!snap.exists()) {
            await window._fbSetDoc(vaultRef, { balance: amt, members: [currentUser.nick, partner], createdAt: window._fbServerTimestamp() });
        } else {
            await window._fbUpdateDoc(vaultRef, { balance: window._fbIncrement(amt) });
        }

        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-amt) });
        await addTx({ type: 'Bóveda', from: currentUser.nick, to: 'Bóveda Compartida', amount: amt, note: `Depósito a bóveda con ${partner}` });

        showToast(`¡Depositaste ${fmt(amt)} a la bóveda compartida!`, '#ff69b4');
        if (amtInput) amtInput.value = '';
        loadSharedVault(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

// ═══════════════════════════ SOLICITUDES & REWARDS (Stubs) ═══════════════════════════

async function loadSolicitudes() {
    const container = document.getElementById('solicitudes-list');
    if (!container || !currentUser || !window._db) return;
    container.innerHTML = '<div class="empty-msg">Sin solicitudes pendientes</div>';
}

async function loadRewards() {
    const container = document.getElementById('rewards-content');
    if (!container) return;
    container.innerHTML = `
        <div class="glass-card text-center" style="padding:30px;">
            <div style="font-size:48px;margin-bottom:15px;color:var(--gold);"><i class="fa-solid fa-gift"></i></div>
            <h3 style="font-family:'Orbitron',sans-serif;margin-bottom:10px;">Sistema de Recompensas</h3>
            <p style="color:var(--text-muted);font-size:13px;">Las recompensas diarias y rachas se gestionan desde el panel de administración del clan.</p>
        </div>
    `;
}

// ═══════════════════════════ INTRO & CLOCK ═══════════════════════════

function skipIntro() {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        setTimeout(() => overlay.remove(), 900);
    }
    tryAutoLogin();
}

function updatePapuClock() {
    const el = document.getElementById('papu-clock');
    if (!el) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.innerHTML = `${h}:${m}:${s} <span style="font-size:9px;">UTC-5</span>`;
}

setInterval(updatePapuClock, 1000);
updatePapuClock();

// ═══════════════════════════ GOD MODE FUNCTIONS ═══════════════════════════

async function godAirdropGlobal() {
    if (!checkAdminPermission()) return;
    const amtStr = await showInputModal('Airdrop Global', 'Cantidad de PPC para todos los usuarios', 'number');
    if (!amtStr) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt <= 0) return;
    
    const confirm = await showConfirmModal('Peligro Divino', `¿Estás seguro de inyectar ${amt} PPC a TODAS las cuentas registradas? Esto causará inflación.`);
    if (!confirm) return;

    try {
        window._invalidateCaches();
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'bank_accounts'));
        const batch = window._fbWriteBatch(window._db);
        snap.forEach(doc => {
            batch.update(doc.ref, { balance: window._fbIncrement(amt) });
        });
        await batch.commit();
        showToast('Airdrop Global completado con éxito.', 'var(--primary)');
        logAudit('SYSTEM', `Airdrop Global de ${amt} PPC a todos.`);
        loadAdminAccounts(true);
    } catch (e) {
        showToast('Error en Airdrop: ' + e.message, 'var(--danger)');
    }
}

async function godEconomicCrisis() {
    if (!checkAdminPermission()) return;
    const confirm = await showConfirmModal('CRISIS ECONÓMICA', '¿Aplicar una reducción del 10% a TODOS los saldos?');
    if (!confirm) return;

    try {
        window._invalidateCaches();
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'bank_accounts'));
        const batch = window._fbWriteBatch(window._db);
        snap.forEach(doc => {
            let b = doc.data().balance || 0;
            let newB = Math.floor(b * 0.90);
            batch.update(doc.ref, { balance: newB });
        });
        await batch.commit();
        showToast('La Crisis Económica ha golpeado.', 'var(--danger)');
        logAudit('SYSTEM', 'Se aplicó Crisis Económica (-10%).');
        loadAdminAccounts(true);
    } catch(e) { console.error(e); }
}

async function godEconomicBoom() {
    if (!checkAdminPermission()) return;
    const confirm = await showConfirmModal('BOOM ECONÓMICO', '¿Aumentar 10% a TODOS los saldos?');
    if (!confirm) return;

    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'bank_accounts'));
        const batch = window._fbWriteBatch(window._db);
        snap.forEach(doc => {
            let b = doc.data().balance || 0;
            let newB = Math.floor(b * 1.10);
            batch.update(doc.ref, { balance: newB });
        });
        await batch.commit();
        showToast('Boom Económico aplicado.', 'var(--primary)');
        logAudit('SYSTEM', 'Se aplicó Boom Económico (+10%).');
        loadAdminAccounts(true);
    } catch(e) { console.error(e); }
}

async function godFreezeAll() {
    if (!checkAdminPermission()) return;
    const confirm = await showConfirmModal('CONGELAR BANCO', '¿Congelar TODAS las cuentas? Nadie podrá hacer transferencias.');
    if (!confirm) return;

    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'bank_accounts'));
        const batch = window._fbWriteBatch(window._db);
        snap.forEach(doc => {
            batch.update(doc.ref, { frozen: true });
        });
        await batch.commit();
        showToast('PÁNICO GLOBAL: TODAS LAS CUENTAS ESTÁN CONGELADAS.', 'var(--danger)');
        loadAdminAccounts(true);
    } catch(e) { console.error(e); }
}

async function godBackupDatabase() {
    if (!checkAdminPermission()) return;
    const ok = await showConfirm('Backup Completo', 'Se exportará TODA la base de datos a un archivo JSON. Esto puede tardar unos segundos.');
    if (!ok) return;

    showToast('Generando backup...', '#ffd700');
    try {
        const [usersSnap, accSnap, txSnap, msgSnap, boardSnap, chatSnap, pollSnap, loanSnap, floresSnap, eventSnap, reportSnap] = await Promise.all([
            window._fbGetDocs(window._fbCollection(window._db, 'users')),
            window._fbGetDocs(window._fbCollection(window._db, 'bank_accounts')),
            window._fbGetDocs(window._fbCollection(window._db, 'transactions')),
            window._fbGetDocs(window._fbCollection(window._db, 'messages')),
            window._fbGetDocs(window._fbCollection(window._db, 'board')),
            window._fbGetDocs(window._fbCollection(window._db, 'chat')),
            window._fbGetDocs(window._fbCollection(window._db, 'polls')),
            window._fbGetDocs(window._fbCollection(window._db, 'loans')),
            window._fbGetDocs(window._fbCollection(window._db, 'flores_requests')),
            window._fbGetDocs(window._fbCollection(window._db, 'events')),
            window._fbGetDocs(window._fbCollection(window._db, 'reports'))
        ]);

        const collectionToObj = (snap) => { const o = {}; snap.forEach(d => { o[d.id] = d.data(); }); return o; };
        const collectionToArray = (snap) => { const a = []; snap.forEach(d => { a.push({ id: d.id, ...d.data() }); }); return a; };

        const backup = {
            _meta: { version: '1.0', timestamp: new Date().toISOString(), project: 'PapusBank', exportedBy: currentUser.nick },
            users: collectionToObj(usersSnap),
            bank_accounts: collectionToObj(accSnap),
            transactions: collectionToArray(txSnap),
            messages: collectionToArray(msgSnap),
            board: collectionToArray(boardSnap),
            chat: collectionToArray(chatSnap),
            polls: collectionToArray(pollSnap),
            loans: collectionToArray(loanSnap),
            flores_requests: collectionToArray(floresSnap),
            events: collectionToArray(eventSnap),
            reports: collectionToArray(reportSnap)
        };

        const json = JSON.stringify(backup, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `papubank_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        const totalDocs = usersSnap.size + accSnap.size + txSnap.size + msgSnap.size + boardSnap.size + chatSnap.size + pollSnap.size + loanSnap.size + floresSnap.size + eventSnap.size + reportSnap.size;
        showToast(`Backup completado: ${totalDocs} documentos exportados ✓`, '#00ffaa');
    } catch(e) {
        console.error(e);
        showToast('Error en backup: ' + e.message, '#ff4466');
    }
}

async function godFlashSale() {
    if (!checkAdminPermission()) return;
    const minStr = await showInputModal('Flash Sale 50% OFF', 'Duración en minutos (ej: 60 = 1 hora)', 'number');
    if (!minStr) return;
    const mins = Math.max(1, Math.min(1440, Math.floor(parseFloat(minStr) || 0)));
    flashSale.active = true;
    flashSale.endsAt = Date.now() + mins * 60000;
    showToast(`🔥 FLASH SALE 50% OFF ACTIVADO por ${mins} min`, '#ff4466');
    if (typeof renderMarket === 'function') renderMarket();
    if (typeof renderFlashSaleBanner === 'function') renderFlashSaleBanner();
    try {
        const banner = document.getElementById('dash-events-banner');
        if (banner) {
            banner.style.display = 'flex';
            banner.innerHTML = `<div style="flex:1;min-width:220px;padding:12px 16px;border-radius:14px;background:rgba(255,68,102,0.1);border:1px solid rgba(255,68,102,0.4);">
                <div style="display:flex;align-items:center;gap:8px;">
                    <i class="fa-solid fa-bolt" style="color:#ff4466;font-size:18px;"></i>
                    <div>
                        <div style="font-size:12px;font-weight:800;color:#ff4466;font-family:'Orbitron',sans-serif;">FLASH SALE 50% OFF</div>
                        <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">¡Toda la tienda a mitad de precio por ${mins} minutos!</div>
                    </div>
                </div>
            </div>`;
        }
    } catch(e) {}
}

async function godResetCooldowns() {
    if (!checkAdminPermission()) return;
    showToast('Cooldowns globales reseteados (Work In Progress)', 'var(--primary)');
}

async function godAddStoreItem() {
    if (!checkAdminPermission()) return;
    showToast('Próximamente: Editor visual de items', 'var(--text-muted)');
}

async function godBankrupt(nick) {
    if (!checkAdminPermission()) return;
    const confirm = await showConfirmModal('BANCARROTA', `¿Reducir el saldo de ${nick} a 0 PPC de forma permanente?`);
    if (!confirm) return;

    try {
        const docRef = window._fbDoc(window._db, 'bank_accounts', nick);
        await window._fbUpdateDoc(docRef, { balance: 0 });
        showToast(`${nick} está en bancarrota absoluta.`, 'var(--danger)');
        logAudit('SYSTEM', `Bancarrota aplicada a ${nick}.`);
        loadAdminAccounts(true);
    } catch(e) { showToast('Error: ' + e.message, 'var(--danger)'); }
}

function showPickerModal(title, items) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;';
        const box = document.createElement('div');
        box.style.cssText = 'background:var(--dark-card);border:1px solid var(--dark-border);border-radius:16px;padding:24px;max-width:420px;width:90%;';
        box.innerHTML = `<h3 style="font-family:'Orbitron',sans-serif;font-size:14px;margin-bottom:16px;">${title}</h3><div id="picker-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:10px;max-height:300px;overflow-y:auto;"></div><button id="picker-cancel" style="margin-top:14px;width:100%;padding:8px;background:transparent;border:1px solid var(--dark-border);border-radius:8px;color:var(--text-muted);cursor:pointer;">Cancelar</button>`;
        overlay.appendChild(box);
        document.body.appendChild(overlay);
        const grid = box.querySelector('#picker-grid');
        items.forEach(item => {
            const el = document.createElement('div');
            el.style.cssText = 'cursor:pointer;border:2px solid transparent;border-radius:10px;padding:6px;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all .2s;';
            el.innerHTML = item.img
                ? `<img src="${item.img}" style="width:52px;height:52px;border-radius:${item.round ? '50%' : '6px'};object-fit:cover;"><span style="font-size:9px;color:var(--text-muted);text-align:center;">${item.label}</span>`
                : `<span style="font-size:18px;">${item.icon || ''}</span><span style="font-size:10px;text-align:center;color:${item.color||'var(--text-primary)'}">${item.label}</span>`;
            el.onmouseenter = () => el.style.borderColor = 'var(--primary)';
            el.onmouseleave = () => el.style.borderColor = 'transparent';
            el.onclick = () => { document.body.removeChild(overlay); resolve(item.value); };
            grid.appendChild(el);
        });
        box.querySelector('#picker-cancel').onclick = () => { document.body.removeChild(overlay); resolve(null); };
    });
}

async function godChangeRank(nick) {
    if (!checkAdminPermission()) return;

    const rankOptions = [];

    // Staff ranks
    const staffRanks = [
        { key:'owner', label:'Owner', icon:'fa-crown', color:'#d946ef' },
        { key:'admin', label:'Admin', icon:'fa-trident', color:'#ffd700' },
        { key:'mod',   label:'Mod',   icon:'fa-shield', color:'#00dcff' },
        { key:'helper',label:'Helper',icon:'fa-wrench', color:'#00ff9d' },
    ];
    staffRanks.forEach(r => rankOptions.push({ value: r.key, label: r.label, icon: '<i class="fa-solid ' + r.icon + '"></i>', color: r.color }));

    // All ranks from RANKS registry (Olimpo, Frieren, Ben10, MHA, Godzilla, parejas)
    Object.keys(RANKS).forEach(key => {
        if (['owner','admin','mod','helper'].includes(key)) return;
        const r = RANKS[key];
        rankOptions.push({ value: key, label: r.label, icon: '<i class="fa-solid ' + r.icon + '"></i>', color: r.color });
    });

    // JJK ranks
    JJK_RANKS.forEach(r => {
        rankOptions.push({ value: r.key, label: r.label + ' (JJK)', icon: '<i class="fa-solid ' + r.icon + '"></i>', color: r.color });
    });

    const rank = await showPickerModal(`Elegir Rango para ${nick}`, rankOptions);
    if (!rank) return;

    try {
        const docRef = window._fbDoc(window._db, 'users', nick);
        const updates = {};
        const isJJK = JJK_RANKS.some(r => r.key === rank);
        if (isJJK) {
            updates.jjkRank = rank;
        } else {
            updates.rank = rank;
            const spec = {
                'ben10_': 'ben10Rank', 'mha_': 'mhaRank', 'godzilla_': 'godzillaRank',
                'frieren_': 'frierenRank'
            };
            const field = spec[rank.split('_')[0] + '_'];
            if (field) updates[field] = rank;
        }
        updates.boughtRanks = window._fbArrayUnion(rank);
        await window._fbUpdateDoc(docRef, updates);

        if (nick === currentUser.nick) {
            Object.assign(currentUser, updates);
            updateNavUI();
        }

        showToast(`El rango de ${nick} ahora es ${rank}.`, 'var(--primary)');
        loadAdminAccounts(true);
    } catch(e) { showToast('Error: ' + e.message, 'var(--danger)'); }
}

async function godResetAllBalances() {
    if (!checkAdminPermission()) return;
    const confirm = await showConfirm('RESET COMPLETO ⚠️', '¿Estás seguro de REINICIAR los saldos de todas las cuentas a 1000 PPC y limpiar estadísticas? Esto borrará el historial de transacciones también.', 'Sí, reiniciar todo');
    if (!confirm) return;

    try {
        const db = window._db;
        const snap = await window._fbGetDocs(window._fbCollection(db, 'bank_accounts'));
        const batch = window._fbWriteBatch(db);
        
        snap.forEach(doc => {
            batch.update(doc.ref, {
                balance: 1000,
                totalIn: 1000,
                totalOut: 0,
                txCount: 1,
                loanActive: false,
                loanAmount: 0
            });
        });
        
        const txSnap = await window._fbGetDocs(window._fbCollection(db, 'transactions'));
        txSnap.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        showToast('Base de datos reseteada a 1000 PPC.', 'var(--primary)');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error al resetear: ' + e.message, 'var(--danger)');
    }
}

async function godRepairDatabase() {
    if (!checkAdminPermission()) return;
    try {
        const db = window._db;
        const snap = await window._fbGetDocs(window._fbCollection(db, 'bank_accounts'));
        const batch = window._fbWriteBatch(db);
        
        let repaired = 0;
        snap.forEach(doc => {
            const data = doc.data();
            
            let bal = parseInt(data.balance);
            if (isNaN(bal) || bal > 99999999999999) bal = 1000;
            
            let tIn = parseInt(data.totalIn);
            if (isNaN(tIn) || tIn > 99999999999999) tIn = bal;
            
            let tOut = parseInt(data.totalOut);
            if (isNaN(tOut) || tOut > 99999999999999) tOut = 0;
            
            batch.update(doc.ref, {
                balance: bal,
                totalIn: tIn,
                totalOut: tOut
            });
            repaired++;
        });
        
        await batch.commit();
        showToast(`Se repararon ${repaired} cuentas.`, 'var(--primary)');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error al reparar: ' + e.message, 'var(--danger)');
    }
}

async function godChangeAvatar(nick) {
    if (!checkAdminPermission()) return;
    const avatarOptions = [
        { value: 'avt_gojo.jpg',   label: 'Gojo',   img: 'avt_gojo.jpg',   round: true },
        { value: 'avt_sukuna.jpg', label: 'Sukuna', img: 'avt_sukuna.jpg', round: true },
        { value: 'avt_guts.jpg',   label: 'Guts',   img: 'avt_guts.jpg',   round: true },
        { value: 'avt_rimuru.jpg', label: 'Rimuru', img: 'avt_rimuru.jpg', round: true },
        { value: 'avt_lucy.jpg',   label: 'Lucy',   img: 'avt_lucy.jpg',   round: true },
        { value: 'avt_tomoko.jpg', label: 'Tomoko', img: 'avt_tomoko.jpg', round: true },
        { value: 'avt_konata.jpg', label: 'Konata', img: 'avt_konata.jpg', round: true },
        { value: 'avt_roxy.jpg',   label: 'Roxy',   img: 'avt_roxy.jpg',   round: true },
        { value: 'avt_kuroki.jpg', label: 'Kuroki', img: 'avt_kuroki.jpg', round: true },
        { value: 'avt_l.jpg',      label: 'L',      img: 'avt_l.jpg',      round: true },
        { value: 'avt_kira.jpg',   label: 'Kira',   img: 'avt_kira.jpg',   round: true },
        { value: 'avt_chito.jpg',  label: 'Chito',  img: 'avt_chito.jpg',  round: true },
    ];
    const filename = await showPickerModal(`Elegir Avatar para ${nick}`, avatarOptions);
    if (!filename) return;
    try {
        const db = window._db;
        await window._fbUpdateDoc(window._fbDoc(db, 'users', nick), { avatar: filename });
        showToast(`Avatar de ${nick} actualizado.`, 'var(--primary)');
        loadAdminAccounts(true);
    } catch(e) {
        showToast('Error al forzar avatar: ' + e.message, 'var(--danger)');
    }
}

// ═══════════════════════════ MATRIX MODE TOGGLE ═══════════════════════════

function setMatrixMode(mode) {
    if (typeof startMatrix === 'function') startMatrix(mode);
    if (typeof stopMatrix === 'function' && mode === 'off') stopMatrix();
}

// ═══════════════════════════ BOOT ═══════════════════════════

(function init() {
    initSidebar();
    if (typeof initAuthOverlayEvents === 'function') initAuthOverlayEvents();
    tryAutoLogin();
})();
