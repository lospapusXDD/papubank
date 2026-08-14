/* Comentarios en perfiles (muro) */
async function loadProfileComments(targetNick) {
    if (!targetNick || !window._db) return;
    const isViewing = targetNick !== (currentUser ? currentUser.nick : null);
    const container = document.getElementById(isViewing ? 'profile-view-comments-list' : 'profile-comments-list');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando comentarios...</div>';
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'profiles', targetNick, 'comments'));
        const comments = [];
        snap.forEach(d => comments.push({ id: d.id, ...d.data() }));
        comments.sort((a,b) => (b.created ? (b.created.toMillis ? b.created.toMillis() : new Date(b.created).getTime()) : 0) - (a.created ? (a.created.toMillis ? a.created.toMillis() : new Date(a.created).getTime()) : 0));
        container.innerHTML = '';
        if (!comments.length) container.innerHTML = '<div class="empty-msg">Aún no hay comentarios. Sé el primero.</div>';
        comments.forEach(c => {
            const dateStr = c.created ? (c.created.toDate ? c.created.toDate().toLocaleString('es') : new Date(c.created).toLocaleString('es')) : '';
            const el = document.createElement('div');
            el.style.cssText = 'display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.04);';
            el.innerHTML = `
                <div style="flex:1;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                        <span style="font-size:11px;font-weight:700;color:var(--primary);">${escHTML(c.author || 'Anónimo')}</span>
                        <span style="font-size:9px;color:var(--text-muted);">${dateStr}</span>
                    </div>
                    <p style="font-size:12px;color:var(--text-main);line-height:1.5;margin:0;">${escHTML(c.text || '')}</p>
                </div>
            `;
            container.appendChild(el);
        });
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + (e.message || '') + '</div>'; }
}

async function postProfileComment(targetNick) {
    if (!currentUser || !window._db || !targetNick) return;
    const isViewing = targetNick !== currentUser.nick;
    const input = document.getElementById(isViewing ? 'profile-view-comment-input' : 'profile-comment-input');
    const text = (input ? input.value : '').trim();
    if (!text) { showToast ? showToast('Escribe un comentario', '#ff4466') : alert('Escribe un comentario'); return; }
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'profiles', targetNick, 'comments'), {
            author: currentUser.nick, text: text, created: window._fbServerTimestamp()
        });
        if (input) input.value = '';
        try {
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { commentsWritten: window._fbIncrement(1) });
        } catch(e) {}
        showToast ? showToast('Comentario publicado ✓', '#00ffaa') : alert('Publicado');
        loadProfileComments(targetNick);
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
}

window.viewUserProfile = async function(nick) {
    if (!nick || !window._db) return;
    window._viewProfileNick = nick;
    const modal = document.getElementById('profile-view-modal');
    if (modal) modal.classList.add('active');

    const nickEl = document.getElementById('profile-view-nick');
    const rankEl = document.getElementById('profile-view-rank');
    const balEl  = document.getElementById('profile-view-balance');
    const karmaEl = document.getElementById('profile-view-karma');
    const avEl   = document.getElementById('profile-view-avatar');
    if (nickEl) nickEl.textContent = nick;

    try {
        const [userSnap, accSnap] = await Promise.all([
            window._fbGetDoc(window._fbDoc(window._db, 'users', nick)),
            window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', nick))
        ]);
        const u = userSnap.exists() ? userSnap.data() : {};
        const a = accSnap.exists() ? accSnap.data() : {};

        if (avEl) avEl.src = u.avatar || 'avt_gojo.jpg';
        if (rankEl) {
            const rk = getRankKey(u);
            const ri = RANKS[rk] || RANKS.user;
            rankEl.innerHTML = `<i class="${ri.icon}" style="color:${ri.color};"></i> ${ri.label}`;
        }
        const coupleEl = document.getElementById('profile-view-couple');
        if (coupleEl) {
            coupleEl.innerHTML = u.parejaWith
                ? `<div style="font-size:11px;margin-top:2px;"><i class="fa-solid fa-heart" style="color:#ff69b4;"></i> <span style="color:#ff69b4;">Pareja de ${escHTML(u.parejaWith)}</span></div>`
                : '';
        }
        const coupleBtn = document.getElementById('profile-view-couple-btn');
        if (coupleBtn) {
            const canAsk = !u.parejaWith && nick !== currentUser.nick && !currentUser.parejaWith;
            coupleBtn.style.display = canAsk ? 'block' : 'none';
        }
        if (balEl) balEl.textContent = (a.balance || 0).toLocaleString('es') + ' PPC';
        if (karmaEl) {
            const karma = u.karma || 0;
            karmaEl.innerHTML = '<i class="fa-solid fa-heart" style="color:var(--secondary);"></i> Karma: <strong style="color:var(--secondary);">' + karma + '</strong>';
        }
        renderProfileViewAchievements(u.logros || []);
        renderProfileViewRanks(u.boughtRanks || []);
    } catch(e) {
        if (rankEl) rankEl.textContent = '';
        if (balEl) balEl.textContent = '';
    }
    loadProfileComments(nick);
};

function getRankInfoByKey(key) {
    if (!key) return null;
    if (typeof ALL_MYTH_RANKS !== 'undefined' && ALL_MYTH_RANKS[key]) return ALL_MYTH_RANKS[key];
    if (typeof RANKS !== 'undefined' && RANKS[key]) return RANKS[key];
    if (typeof FRIEREN_RANKS !== 'undefined') {
        const f = FRIEREN_RANKS.find(x => x.key === key);
        if (f) return f;
    }
    if (typeof JJK_RANKS !== 'undefined') {
        const j = JJK_RANKS.find(x => x.key === key);
        if (j) return j;
    }
    if (typeof BEN10_RANKS !== 'undefined') {
        const b = BEN10_RANKS.find(x => x.key === key);
        if (b) return b;
    }
    if (typeof MHA_RANKS !== 'undefined') {
        const m = MHA_RANKS.find(x => x.key === key);
        if (m) return m;
    }
    return null;
}

function renderProfileViewRanks(bought) {
    const container = document.getElementById('profile-view-ranks');
    if (!container) return;
    if (!bought || !bought.length) {
        container.innerHTML = '<div class="empty-msg" style="grid-column:1/-1;color:var(--text-muted);">Aún no ha comprado rangos</div>';
        return;
    }
    container.innerHTML = bought.map(key => {
        const info = getRankInfoByKey(key);
        const color = info && info.color ? info.color : 'var(--gold)';
        const icon = info && info.icon ? info.icon : 'fa-solid fa-medal';
        const label = info && info.label ? info.label : key;
        return `<span title="${escHTML(label)}" style="display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:20px;border:1px solid ${color};background:${color}18;color:${color};font-size:10px;font-weight:600;"><i class="${icon}"></i> ${escHTML(label)}</span>`;
    }).join('');
}

function renderProfileViewAchievements(unlocked) {
    const container = document.getElementById('profile-view-achievements');
    if (!container) return;
    if (typeof ACHIEVEMENTS === 'undefined') {
        container.innerHTML = '<div class="empty-msg" style="grid-column:1/-1;color:var(--text-muted);">Sin logros aún</div>';
        return;
    }
    if (!unlocked.length) {
        container.innerHTML = '<div class="empty-msg" style="grid-column:1/-1;color:var(--text-muted);">Este papu aún no tiene logros</div>';
        return;
    }
    const earned = ACHIEVEMENTS.filter(x => unlocked.includes(x.id));
    if (!earned.length) {
        container.innerHTML = '<div class="empty-msg" style="grid-column:1/-1;color:var(--text-muted);">Este papu aún no tiene logros</div>';
        return;
    }
    container.innerHTML = earned.map(x => `
        <div title="${escHTML(x.name)} — ${escHTML(x.desc)}" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border:1px solid rgba(255,215,0,0.35);border-radius:12px;background:rgba(255,215,0,0.07);">
            <i class="fa-solid ${x.icon}" style="color:var(--gold);font-size:16px;"></i>
            <span style="font-size:8px;color:var(--text-muted);text-align:center;line-height:1.2;">${escHTML(x.name)}</span>
        </div>`).join('');
}

window.closeUserProfile = function() {
    const modal = document.getElementById('profile-view-modal');
    if (modal) modal.classList.remove('active');
};

/* Página de perfiles del clan */
const ANIME_AVATAR_LIST = Array.from({ length: 100 }, (_, i) => 'avt_anime_' + String(i + 1).padStart(3, '0') + '.jpg');
const VOCALOID_AVATAR_LIST = Array.from({ length: 100 }, (_, i) => 'avt_vocaloid_' + String(i + 1).padStart(3, '0') + '.jpg');

function renderAnimeAvatars() {
    const grid = document.getElementById('avatar-anime-grid');
    if (!grid) return;
    grid.innerHTML = '';
    ANIME_AVATAR_LIST.forEach(name => {
        const img = document.createElement('img');
        img.src = name;
        img.className = 'avatar-option';
        img.onclick = () => saveAvatar(name);
        img.style.cssText = 'width:60px;height:60px;border-radius:50%;cursor:pointer;border:2px solid transparent;object-fit:cover;';
        grid.appendChild(img);
    });

    const vgrid = document.getElementById('avatar-vocaloid-grid');
    if (vgrid) {
        vgrid.innerHTML = '';
        VOCALOID_AVATAR_LIST.forEach(name => {
            const img = document.createElement('img');
            img.src = name;
            img.className = 'avatar-option';
            img.onclick = () => saveAvatar(name);
            img.style.cssText = 'width:60px;height:60px;border-radius:50%;cursor:pointer;border:2px solid transparent;object-fit:cover;';
            vgrid.appendChild(img);
        });
    }
}

async function loadPerfiles() {
    if (!window._db) return;
    const container = document.getElementById('perfiles-list');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando perfiles...</div>';
    try {
        const [userSnap, accSnap] = await Promise.all([
            getCachedUsers(),
            getCachedAccounts()
        ]);
        const usersMap = {};
        userSnap.forEach(d => usersMap[d.id] = d.data());
        const accsMap = {};
        accSnap.forEach(d => accsMap[d.id] = d.data());

        const nicks = new Set([...Object.keys(usersMap), ...Object.keys(accsMap)]);
        const list = [];
        nicks.forEach(nick => {
            if (nick === (currentUser ? currentUser.nick : null)) return;
            const u = usersMap[nick] || {};
            const a = accsMap[nick] || {};
            const rk = getRankKey(u);
            const ri = RANKS[rk] || RANKS.user;
            list.push({ nick, u, a, ri });
        });
        list.sort((x, y) => x.nick.localeCompare(y.nick));

        container.innerHTML = '';
        if (!list.length) container.innerHTML = '<div class="empty-msg">No hay otros perfiles registrados</div>';
        list.forEach(p => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.setAttribute('data-nick', p.nick);
            card.style.cssText = 'display:flex;align-items:center;gap:14px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:border-color .2s;';
            card.onclick = () => viewUserProfile(p.nick);
            card.innerHTML = `
                <img src="${escHTML(p.u.avatar || 'avt_gojo.jpg')}" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--dark-border);flex-shrink:0;">
                <div style="flex:1;min-width:0;">
                    <div style="font-family:'Orbitron',sans-serif;font-weight:700;color:var(--primary);font-size:14px;">${escHTML(p.nick)}</div>
                    <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">
                        <span class="badge-tag ${p.ri.cls}" style="font-size:9px;"><i class="${p.ri.icon}"></i> ${p.ri.label}</span>
                        <span style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:11px;margin-left:8px;">${(p.a.balance || 0).toLocaleString()} PPC</span>
                        <span style="color:var(--secondary);font-size:10px;margin-left:8px;"><i class="fa-solid fa-heart"></i> ${p.u.karma || 0}</span>
                    </div>
                </div>
                <span style="color:var(--primary);font-size:13px;"><i class="fa-solid fa-angle-right"></i></span>
            `;
            container.appendChild(card);
        });
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + escHTML(e.message) + '</div>'; }
}

window.filterPerfiles = function() {
    const input = document.getElementById('perfiles-search-input');
    const q = (input ? input.value : '').trim().toLowerCase();
    const container = document.getElementById('perfiles-list');
    if (!container) return;
    container.querySelectorAll('.glass-card').forEach(card => {
        const nick = (card.getAttribute('data-nick') || '');
        card.style.display = (!q || nick.includes(q)) ? 'flex' : 'none';
    });
};

/* Sistema de reports */
window.reportUser = async function(targetNick) {
    if (!currentUser || !window._db || !targetNick) return;
    if (targetNick === currentUser.nick) { showToast ? showToast('No puedes reportarte a ti mismo', '#ff4466') : alert('No puedes'); return; }
    const reason = prompt('¿Cuál es el motivo del reporte? (ej: estafa, amenaza, trampa)');
    if (!reason || !reason.trim()) return;
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'reports'), {
            target: targetNick,
            reporter: currentUser.nick,
            reason: reason.trim(),
            created: window._fbServerTimestamp(),
            resolved: false
        });
        showToast ? showToast('Reporte enviado. Los administradores lo revisarán ✓', '#ffd700') : alert('Reporte enviado');
        closeUserProfile();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
};

window.loadAdminReports = async function() {
    if (!window._db || !checkAdminPermission()) return;
    const modal = document.getElementById('reports-modal');
    const body = document.getElementById('reports-body');
    if (!modal || !body) return;
    modal.classList.add('active');
    body.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando reports...</div>';
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'reports'));
        body.innerHTML = '';
        let count = 0;
        const reportList = [];
        snap.forEach(d => { const r = d.data(); if (!r.resolved) reportList.push({ id: d.id, data: () => r }); });
        reportList.sort((a, b) => {
            const ta = a.data().created ? (a.data().created.toMillis ? a.data().created.toMillis() : new Date(a.data().created).getTime()) : 0;
            const tb = b.data().created ? (b.data().created.toMillis ? b.data().created.toMillis() : new Date(b.data().created).getTime()) : 0;
            return tb - ta;
        });
        reportList.slice(0, 100).forEach(d => {
            const r = d.data();
            count++;
            let dateStr = '';
            if (r.created) {
                const dt = r.created.toDate ? r.created.toDate() : new Date(r.created);
                dateStr = dt.toLocaleDateString('es') + ' ' + dt.toLocaleTimeString('es', {hour:'2-digit',minute:'2-digit'});
            }
            const el = document.createElement('div');
            el.className = 'glass-card';
            el.style.cssText = 'padding:12px 14px;margin-bottom:10px;border-color:rgba(255,68,102,0.35);';
            el.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px;">
                    <span style="font-size:12px;font-weight:700;color:var(--danger);"><i class="fa-solid fa-flag"></i> Reporte a ${escHTML(r.target || '?')}</span>
                    <span style="font-size:9px;color:var(--text-muted);">${dateStr}</span>
                </div>
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">Por <strong style="color:var(--primary);">${escHTML(r.reporter || '?')}</strong></div>
                <p style="font-size:12px;color:var(--text-main);line-height:1.5;margin:0 0 10px;">"${escHTML(r.reason || '')}"</p>
                <div style="display:flex;gap:8px;">
                    <button class="btn btn-secondary" style="font-size:10px;padding:4px 10px;" onclick="resolveReport('${d.id}')"><i class="fa-solid fa-check"></i> Resuelto</button>
                    <button class="btn btn-danger" style="font-size:10px;padding:4px 10px;" onclick="deleteReport('${d.id}')"><i class="fa-solid fa-trash"></i> Eliminar</button>
                </div>
            `;
            body.appendChild(el);
        });
        if (count === 0) body.innerHTML = '<div class="empty-msg">No hay reports pendientes 🎉</div>';
    } catch(e) {
        body.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + escHTML(e.message) + '</div>';
    }
};

window.resolveReport = async function(id) {
    if (!window._db) return;
    const ok = window.showConfirmModal ? await window.showConfirmModal('Resolver reporte', '¿Marcar este reporte como resuelto?') : confirm('¿Resolver?');
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'reports', id), { resolved: true });
        showToast ? showToast('Reporte resuelto ✓', '#00ffaa') : alert('OK');
        loadAdminReports();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
};

window.deleteReport = async function(id) {
    if (!window._db) return;
    const ok = window.showConfirmModal ? await window.showConfirmModal('Eliminar reporte', '¿Eliminar este reporte para siempre?') : confirm('¿Eliminar?');
    if (!ok) return;
    try {
        await window._fbDeleteDoc(window._fbDoc(window._db, 'reports', id));
        showToast ? showToast('Reporte eliminado', '#ffd700') : alert('OK');
        loadAdminReports();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
};

window.closeReports = function() {
    const modal = document.getElementById('reports-modal');
    if (modal) modal.classList.remove('active');
};
