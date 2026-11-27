/* Board de mensajes público del clan */
async function loadBoardPage() {
    const container = document.getElementById('board-list');
    if (!container || !window._db) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando board...</div>';
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'board'));
        const posts = [];
        snap.forEach(d => posts.push({ id: d.id, ...d.data() }));
        posts.sort((a,b) => (b.created ? (b.created.toMillis ? b.created.toMillis() : new Date(b.created).getTime()) : 0) - (a.created ? (a.created.toMillis ? a.created.toMillis() : new Date(a.created).getTime()) : 0));
        container.innerHTML = '';
        if (!posts.length) container.innerHTML = '<div class="empty-msg">Aún no hay anuncios. Sé el primero.</div>';
        posts.forEach(p => {
            const dateStr = p.created ? (p.created.toDate ? p.created.toDate().toLocaleString('es') : new Date(p.created).toLocaleString('es')) : '';
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.cssText = 'margin-bottom:16px;';
            card.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span style="font-family:'Orbitron',sans-serif;font-weight:700;font-size:13px;color:var(--primary);"><i class="fa-solid fa-bullhorn"></i> ${escHTML(p.title || 'Anuncio')}</span>
                    <span style="font-size:10px;color:var(--text-muted);">${dateStr}</span>
                </div>
                <p style="font-size:13px;color:var(--text-main);line-height:1.6;margin-bottom:6px;">${escHTML(p.body || '')}</p>
                <span style="font-size:10px;color:var(--text-muted);">Por <strong style="color:var(--gold);">${escHTML(p.author || 'Admin')}</strong></span>
            `;
            container.appendChild(card);
        });
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + (e.message || '') + '</div>'; }
}

async function loadPosts() {
    return loadBoardPage();
}

async function createPost() {
    if (!currentUser || !window._db) return;
    const titleInput = document.getElementById('board-input');
    const bodyInput = document.getElementById('board-body');
    const title = (titleInput ? titleInput.value : '').trim();
    const body = (bodyInput ? bodyInput.value : '').trim();
    if (!title || !body) { showToast ? showToast('Completa título y mensaje', '#ff4466') : alert('Completa'); return; }
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'board'), {
            title: title, body: body, author: currentUser.nick, created: window._fbServerTimestamp()
        });
        if (titleInput) titleInput.value = '';
        if (bodyInput) bodyInput.value = '';
        try {
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { boardPosts: window._fbIncrement(1) });
        } catch(e) {}
        showToast ? showToast('Anuncio publicado ✓', '#00ffaa') : alert('Publicado');
        loadBoardPage();
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
}

async function deletePost(postId) {
    if (!checkAdminPermission()) { showToast ? showToast('Solo admins', '#ff4466') : alert('Solo admins'); return; }
    try {
        await window._fbDeleteDoc(window._fbDoc(window._db, 'board', postId));
        showToast ? showToast('Anuncio eliminado', '#00ffaa') : alert('Eliminado');
        loadBoardPage();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
}
