/* ═══════════════════════════════════════════════
   EXTRAS — Logros Nuevos, Temas, Aros de Perfil
══════════════════════════════════════════════ */

/* ─────────── LOGROS SECRETOS ─────────── */

const SECRET_ACHIEVEMENTS = [
    { id: 'secret_whale',     icon: 'fa-solid fa-water',      name: 'Ballena',           desc: 'Acumula 1,000,000,000 PPC en total',           reward: 500000,  secret: true },
    { id: 'secret_noob',      icon: 'fa-solid fa-baby',       name: 'Noob Supremo',      desc: 'Falla 10 transferencias seguidas',             reward: 1000,    secret: true },
    { id: 'secret_night',     icon: 'fa-solid fa-moon',       name: 'Vampiro',           desc: 'Inicia sesión entre 2AM y 5AM',               reward: 5000,    secret: true },
    { id: 'secret_streak7',   icon: 'fa-solid fa-fire',       name: 'Racha de 7 Días',   desc: 'Inicia sesión 7 días seguidos',                reward: 10000,   secret: true },
    { id: 'secret_streak30',  icon: 'fa-solid fa-fire-flame-curved', name: 'Racha de 30 Días', desc: 'Inicia sesión 30 días seguidos',          reward: 50000,   secret: true },
    { id: 'secret_gambler',   icon: 'fa-solid fa-dice',       name: 'Gambler',           desc: 'Gana 50 minijuegos seguidos',                 reward: 25000,   secret: true },
    { id: 'secret_social',    icon: 'fa-solid fa-users',      name: 'Social Butterfly',  desc: 'Envía 100 mensajes privados',                 reward: 8000,    secret: true },
    { id: 'secret_investor',  icon: 'fa-solid fa-chart-pie',  name: 'Warren Buffett',     desc: 'Tiene 10 inversiones activas simultáneamente', reward: 30000,   secret: true }
];

/* ─────────── TEMAS PERSONALIZABLES ─────────── */

const THEMES = [
    { key: 'cyber',     label: 'Cyber default',  primary: '#00d4ff', secondary: '#00ffaa', bg: '#030914', wallpaper: 'Anime Wallpaper CyberDream.jpg' },
    { key: 'violet',    label: 'Violet Dream',   primary: '#d946ef', secondary: '#f472b6', bg: '#0f0520', wallpaper: 'anime wallpaper violetdream.jpg' },
    { key: 'fire',      label: 'Fire Red',        primary: '#ff4444', secondary: '#ff8800', bg: '#1a0505', wallpaper: 'anime wallpaper red fire.jpg' },
    { key: 'forest',    label: 'Forest Green',    primary: '#22c55e', secondary: '#4ade80', bg: '#051a0a', wallpaper: 'Anime wallpaper forest green.jpg' },
    { key: 'ocean',     label: 'Ocean Blue',      primary: '#3b82f6', secondary: '#60a5fa', bg: '#050f1a', wallpaper: 'Anime Wallpaper Ocean blue.jpg' },
    { key: 'gold',      label: 'Golden Luxury',   primary: '#fbbf24', secondary: '#f59e0b', bg: '#1a1505', wallpaper: 'Anime wallpape dorado.jpg' },
    { key: 'dark',      label: 'Pure Darkness',   primary: '#6b7280', secondary: '#9ca3af', bg: '#000000', wallpaper: 'Anime wallpaper Pure darkness.jpg' },
    { key: 'neon',      label: 'Neon Pink',       primary: '#ec4899', secondary: '#f472b6', bg: '#0a0510', wallpaper: 'Anime Wallpaper rosa.jpg' },
    { key: 'blood',     label: 'Blood Moon',      primary: '#dc143c', secondary: '#ff4444', bg: '#0a0005', wallpaper: 'Anime Wallpaper Blood.jpg' },
    { key: 'phantom',   label: 'Phantom',         primary: '#7b2ff7', secondary: '#c084fc', bg: '#0d0015', wallpaper: 'Anime Wallpaper Ghost.jpg' },
    { key: 'toxic',     label: 'Toxic',           primary: '#39ff14', secondary: '#b5ff2b', bg: '#000a00', wallpaper: 'Anime Wallpaper Toxic.jpg' },
    { key: 'sakura',    label: 'Sakura',          primary: '#ff69b4', secondary: '#ffb7d5', bg: '#0f000a', wallpaper: 'Anime Wallpaper Sakura.jpg' },
    { key: 'abyss',     label: 'Abyss',           primary: '#00d4ff', secondary: '#0ff',    bg: '#000510', wallpaper: 'Anime Wallpaper Abyss.jpg' },
    { key: 'ember',     label: 'Ember',           primary: '#ff6600', secondary: '#ffaa00', bg: '#0a0500', wallpaper: 'Anime Wallpaper Ember.jpg' },
    { key: 'royal',     label: 'Royal',           primary: '#ffd700', secondary: '#fff',    bg: '#0a0800', wallpaper: 'Anime Wallpaper Royal.jpg' },
    { key: 'ice',       label: 'Ice',             primary: '#b0e0e6', secondary: '#e0f7ff', bg: '#000a0f', wallpaper: 'Anime Wallpaper Ice.jpg' },
    { key: 'sunset',    label: 'Sunset',          primary: '#ff8c00', secondary: '#ff4500', bg: '#0f0500', wallpaper: 'Anime Naranja Wallpaper.jpg' },
    { key: 'miku',      label: 'Hatsune Miku',    primary: '#39C5BB', secondary: '#00e5cc', bg: '#000a08', wallpaper: 'Miku Verde.jpg' }
];

function applyTheme(themeKey) {
    const theme = THEMES.find(t => t.key === themeKey);
    if (!theme) return;
    
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--dark-bg', theme.bg);
    document.documentElement.style.setProperty('--primary-glow', theme.primary + '40');
    document.documentElement.style.setProperty('--secondary-glow', theme.secondary + '30');
    
    // Apply wallpaper
    const body = document.body;
    if (theme.wallpaper) {
        body.style.backgroundImage = `url('${theme.wallpaper}')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundRepeat = 'no-repeat';
    } else {
        body.style.backgroundImage = 'none';
    }
    
    localStorage.setItem('papubank_theme', themeKey);
}

function loadSavedTheme() {
    // Restore custom wallpaper first
    const customWp = localStorage.getItem('papubank_custom_wallpaper');
    if (customWp) {
        document.body.style.backgroundImage = `url('${customWp}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';
    }
    // Then apply theme colors
    const saved = localStorage.getItem('papubank_theme');
    if (saved) {
        const theme = THEMES.find(t => t.key === saved);
        if (theme) {
            document.documentElement.style.setProperty('--primary', theme.primary);
            document.documentElement.style.setProperty('--secondary', theme.secondary);
            document.documentElement.style.setProperty('--dark-bg', theme.bg);
            document.documentElement.style.setProperty('--primary-glow', theme.primary + '40');
            document.documentElement.style.setProperty('--secondary-glow', theme.secondary + '30');
            // Apply wallpaper only if no custom wallpaper
            if (!customWp && theme.wallpaper) {
                document.body.style.backgroundImage = `url('${theme.wallpaper}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundAttachment = 'fixed';
                document.body.style.backgroundRepeat = 'no-repeat';
            }
        }
    }
}

function renderThemes(container) {
    if (!container) return;
    
    let html = `
        <div class="glass-card" style="margin-bottom:20px;border-color:var(--primary);">
            <h3 style="font-family:'Orbitron',sans-serif;font-size:14px;color:var(--primary);margin-bottom:10px;">
                <i class="fa-solid fa-image"></i> Fondo Personalizado
            </h3>
            <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Sube tu propia imagen de fondo.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <input type="file" id="custom-wallpaper-input" accept="image/*" style="display:none;" onchange="uploadCustomWallpaper(this)">
                <button class="btn btn-primary" style="font-size:11px;" onclick="document.getElementById('custom-wallpaper-input').click()">
                    <i class="fa-solid fa-upload"></i> Subir Imagen
                </button>
                <button class="btn btn-secondary" style="font-size:11px;" onclick="clearCustomWallpaper()">
                    <i class="fa-solid fa-xmark"></i> Quitar Fondo
                </button>
            </div>
        </div>
        <div class="grid-container">
    `;
    THEMES.forEach(theme => {
        const isActive = localStorage.getItem('papubank_theme') === theme.key;
        html += `
            <div class="glass-card" style="cursor:pointer;border-color:${isActive ? theme.primary : 'var(--dark-border)'};${isActive ? 'box-shadow:0 0 15px ' + theme.primary + '40;' : ''}overflow:hidden;" onclick="applyTheme('${theme.key}');renderThemes(document.getElementById('themes-grid'));">
                ${theme.wallpaper ? `<div style="width:100%;height:80px;background:url('${theme.wallpaper}') center/cover;border-radius:8px 8px 0 0;margin:-16px -16px 10px -16px;"></div>` : ''}
                <div style="display:flex;gap:8px;margin-bottom:10px;">
                    <div style="width:24px;height:24px;border-radius:50%;background:${theme.primary};"></div>
                    <div style="width:24px;height:24px;border-radius:50%;background:${theme.secondary};"></div>
                    <div style="width:24px;height:24px;border-radius:50%;background:${theme.bg};border:1px solid var(--dark-border);"></div>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:11px;color:${theme.primary};">${theme.label}</h4>
                ${isActive ? '<div style="font-size:10px;color:' + theme.primary + ';margin-top:5px;">✓ ACTIVO</div>' : ''}
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

/* ─────────── CUSTOM WALLPAPER ─────────── */

function uploadCustomWallpaper(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        localStorage.setItem('papubank_custom_wallpaper', dataUrl);
        document.body.style.backgroundImage = `url('${dataUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';
        showToast('Fondo de pantalla actualizado 🖼️', 'var(--primary)');
    };
    reader.readAsDataURL(file);
}

function clearCustomWallpaper() {
    localStorage.removeItem('papubank_custom_wallpaper');
    document.body.style.backgroundImage = 'none';
    // Re-apply saved theme wallpaper
    const savedTheme = localStorage.getItem('papubank_theme');
    if (savedTheme) applyTheme(savedTheme);
    showToast('Fondo eliminado', 'var(--text-muted)');
}

/* ─────────── AROS DE PERFIL ─────────── */

const PROFILE_RINGS = [
    { key: 'none',       label: 'Sin aro',        icon: 'fa-solid fa-circle',      color: 'transparent', price: 0,       requirement: null },
    { key: 'bronze',     label: 'Aro Bronce',      icon: 'fa-solid fa-ring',        color: '#cd7f32',    price: 100000,  requirement: 'rank_5' },
    { key: 'silver',     label: 'Aro Plata',       icon: 'fa-solid fa-ring',        color: '#c0c0c0',    price: 500000,  requirement: 'rank_10' },
    { key: 'gold',       label: 'Aro Oro',         icon: 'fa-solid fa-ring',        color: '#ffd700',    price: 2000000, requirement: 'rank_13' },
    { key: 'diamond',    label: 'Aro Diamante',    icon: 'fa-solid fa-gem',         color: '#b9f2ff',    price: 10000000, requirement: 'rank_15' },
    { key: 'ruby',       label: 'Aro Rubi',        icon: 'fa-solid fa-heart',       color: '#ff4444',    price: 5000000, requirement: 'achievement_50' },
    { key: 'emerald',    label: 'Aro Esmeralda',   icon: 'fa-solid fa-diamond',     color: '#50c878',    price: 5000000, requirement: 'investment_10' },
    { key: 'sapphire',   label: 'Aro Zafiro',      icon: 'fa-solid fa-star',        color: '#0f52ba',    price: 5000000, requirement: 'streak_7' },
    { key: 'mythic',     label: 'Aro Mítico',      icon: 'fa-solid fa-crown',       color: '#ff6b6b',    price: 50000000, requirement: 'rank_17' },
    { key: 'animated',   label: 'Aro Animado',     icon: 'fa-solid fa-sparkles',    color: 'rainbow',    price: 100000000, requirement: 'all_rings' }
];

function getUserRing(user) {
    if (!user) return 'none';
    return user.profileRing || 'none';
}

function getRingData(key) {
    return PROFILE_RINGS.find(r => r.key === key) || PROFILE_RINGS[0];
}

function canEquipRing(user, ringKey) {
    const ring = getRingData(ringKey);
    if (!ring || ringKey === 'none') return true;
    
    const boughtRings = user.boughtRings || [];
    return boughtRings.includes(ringKey);
}

function renderProfileRings(container) {
    if (!container) return;
    
    const user = currentUser;
    const currentRing = getUserRing(user);
    const boughtRings = user?.boughtRings || [];
    
    let html = '<div class="grid-container">';
    PROFILE_RINGS.forEach(ring => {
        const isOwned = boughtRings.includes(ring.key) || ring.key === 'none';
        const isActive = currentRing === ring.key;
        const canBuy = !isOwned && (bankAccount?.balance || 0) >= ring.price;
        
        html += `
            <div class="glass-card" style="border-color:${isActive ? ring.color : 'var(--dark-border)'};${isActive ? 'box-shadow:0 0 15px ' + ring.color + '40;' : ''}">
                <div style="text-align:center;margin-bottom:10px;">
                    <div style="width:50px;height:50px;border-radius:50%;border:3px solid ${ring.color};display:inline-flex;align-items:center;justify-content:center;${ring.color === 'rainbow' ? 'background:linear-gradient(90deg,red,orange,yellow,green,blue,violet);' : ''}">
                        <i class="${ring.icon}" style="color:${ring.color === 'rainbow' ? '#fff' : ring.color};font-size:18px;"></i>
                    </div>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:11px;text-align:center;color:${ring.color === 'rainbow' ? 'var(--primary)' : ring.color};">${ring.label}</h4>
                ${ring.price > 0 ? `<p style="font-size:10px;color:var(--text-muted);text-align:center;">${ring.price.toLocaleString()} PPC</p>` : ''}
                <div style="text-align:center;margin-top:8px;">
                    ${isOwned 
                        ? (isActive 
                            ? '<span style="font-size:10px;color:' + ring.color + ';font-weight:bold;">✓ ACTIVO</span>'
                            : `<button class="btn btn-secondary" onclick="equipRing('${ring.key}')" style="font-size:10px;">Equipar</button>`)
                        : `<button class="btn btn-primary" onclick="buyRing('${ring.key}')" ${!canBuy ? 'disabled style="opacity:0.5;font-size:10px;"' : 'style="font-size:10px;"'}>Comprar</button>`
                    }
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

async function loadRingsInventory() {
    if (!currentUser) return;
    try {
        const inv = await apiFetch('GET', '/inventory/' + currentUser.nick);
        const rings = (inv || []).filter(i => i.item_id && i.item_id.startsWith('ring_')).map(i => i.item_id.replace('ring_', ''));
        currentUser.boughtRings = rings;
        const activeRing = (inv || []).find(i => i.item_type === 'ring' && i.active);
        if (activeRing) {
            currentUser.profileRing = activeRing.item_id.replace('ring_', '');
        }
    } catch(e) {}
}

async function buyRing(ringKey) {
    if (!currentUser) return;
    
    const ring = getRingData(ringKey);
    if (!ring) return;
    
    const ok = await showConfirm('Comprar Aro', `¿Comprar ${ring.label} por ${ring.price.toLocaleString()} PPC?`);
    if (!ok) return;

    try {
        await apiFetch('POST', '/inventory/buy', {
            nick: currentUser.nick,
            item_id: 'ring_' + ring.key,
            price: ring.price,
            currency: 'ppc'
        });

        const inv = await apiFetch('GET', '/inventory/' + currentUser.nick);
        currentUser.boughtRings = (inv || []).filter(i => i.item_id && i.item_id.startsWith('ring_')).map(i => i.item_id.replace('ring_', ''));
        currentUser.profileRing = ring.key;

        bankAccount = await apiFetch('GET', '/bank/' + currentUser.nick);

        showToast(`¡${ring.label} adquirido! 💫`, ring.color);
        renderProfileRings(document.getElementById('rings-grid'));
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function equipRing(ringKey) {
    if (!currentUser) return;
    
    try {
        await apiFetch('PUT', '/inventory/' + currentUser.nick + '/activate', {
            item_id: 'ring_' + ringKey
        });
        currentUser.profileRing = ringKey;
        
        const ring = getRingData(ringKey);
        showToast(`¡${ring.label} equipado! 💫`, ring.color);
        renderProfileRings(document.getElementById('rings-grid'));
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

function getRingHTML(user) {
    const ring = getRingData(getUserRing(user));
    if (ring.key === 'none') return '';
    if (ring.color === 'rainbow') {
        return `<div style="width:100%;height:100%;border-radius:50%;border:3px solid transparent;background:linear-gradient(90deg,red,orange,yellow,green,blue,violet) border-box;animation:ringRotate 3s linear infinite;"></div>`;
    }
    return `<div style="width:100%;height:100%;border-radius:50%;border:3px solid ${ring.color};"></div>`;
}

/* ─────────── CHECK SECRET ACHIEVEMENTS ─────────── */

async function checkSecretAchievements() {
    if (!currentUser) return;

    try {
        const userData = await apiFetch('GET', '/users/' + currentUser.nick);
        const accData = await apiFetch('GET', '/bank/' + currentUser.nick);
        const earned = userData.secretAchievements || [];
        
        const newly = [];
        
        for (const ach of SECRET_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            
            if (ach.id === 'secret_whale' && (accData.totalIn || 0) >= 1000000000) newly.push(ach);
            if (ach.id === 'secret_night') {
                const hour = new Date().getHours();
                if (hour >= 2 && hour < 5) newly.push(ach);
            }
            if (ach.id === 'secret_streak7' && (userData.loginStreak || 0) >= 7) newly.push(ach);
            if (ach.id === 'secret_streak30' && (userData.loginStreak || 0) >= 30) newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await apiFetch('POST', '/bank/mint', { nick: currentUser.nick, amount: finalReward, reason: 'Logro Secreto' });
        await apiFetch('PUT', '/users/' + currentUser.nick, {
            secretAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🔮 ¡Logro Secreto: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#9b59b6');
    } catch(e) {
        console.error('Error checking secret achievements:', e);
    }
}

/* ─────────── LOAD FUNCTIONS ─────────── */

function loadThemesPage() {
    const container = document.getElementById('themes-grid');
    if (container) renderThemes(container);
}

async function loadRingsPage() {
    await loadRingsInventory();
    const container = document.getElementById('rings-grid');
    if (container) renderProfileRings(container);
}

function loadSecretsPage() {
    const container = document.getElementById('secrets-grid');
    if (!container) return;
    
    let html = '<div class="grid-container">';
    SECRET_ACHIEVEMENTS.forEach(ach => {
        const isUnlocked = currentUser?.secretAchievements?.includes(ach.id);
        html += `
            <div class="glass-card" style="border-color:${isUnlocked ? 'var(--secondary)' : 'var(--dark-border)'};${isUnlocked ? 'box-shadow:0 0 10px rgba(0,255,170,0.2);' : ''}">
                <div style="text-align:center;margin-bottom:10px;">
                    <i class="${ach.icon}" style="font-size:24px;color:${isUnlocked ? 'var(--secondary)' : 'var(--text-muted)'};"></i>
                </div>
                <h4 style="font-family:'Orbitron',sans-serif;font-size:11px;text-align:center;color:${isUnlocked ? 'var(--secondary)' : 'var(--text-muted)'};">
                    ${isUnlocked ? ach.name : '???'}
                </h4>
                <p style="font-size:10px;color:var(--text-muted);text-align:center;">
                    ${isUnlocked ? ach.desc : 'Logro secreto'}
                </p>
                ${isUnlocked ? '<div style="text-align:center;font-size:10px;color:var(--secondary);margin-top:5px;">✓ DESBLOQUEADO</div>' : ''}
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}
