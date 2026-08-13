/* Chat integrado — panel pequeño */
let _chatOpen = false;

function toggleChatPanel() {
    const panel = document.getElementById('chat-panel');
    if (!panel) return;
    _chatOpen = !_chatOpen;
    panel.style.display = _chatOpen ? 'flex' : 'none';
    if (_chatOpen) loadChat();
}

async function loadChat() {
    const container = document.getElementById('chat-messages');
    if (!container || !window._db) return;
    container.innerHTML = '<div class="empty-msg" style="font-size:11px;padding:8px;">Cargando...</div>';
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'chat'));
        const msgs = [];
        snap.forEach(d => msgs.push({ id: d.id, ...d.data() }));
        msgs.sort((a,b) => (a.timestamp ? (a.timestamp.toMillis ? a.timestamp.toMillis() : new Date(a.timestamp).getTime()) : 0) - (b.timestamp ? (b.timestamp.toMillis ? b.timestamp.toMillis() : new Date(b.timestamp).getTime()) : 0));
        const partnerMap = {};
        try {
            const uSnap = await getCachedUsers();
            uSnap.forEach(d => { const u = d.data(); if (u.parejaWith) partnerMap[d.id] = u.parejaWith; });
        } catch(e) {}
        container.innerHTML = '';
        if (!msgs.length) container.innerHTML = '<div class="empty-msg" style="font-size:11px;padding:8px;">Sin mensajes</div>';
        msgs.forEach(m => {
            const isMe = m.nick === (currentUser ? currentUser.nick : '');
            const dateStr = m.timestamp ? (m.timestamp.toDate ? m.timestamp.toDate().toLocaleString('es', {hour:'2-digit', minute:'2-digit'}) : new Date(m.timestamp).toLocaleString('es')) : '';
            const partnerOf = partnerMap[m.nick] || null;
            const el = document.createElement('div');
            el.style.cssText = 'padding:8px 10px;margin-bottom:6px;background:' + (isMe ? 'rgba(0,255,170,0.08)' : 'rgba(255,255,255,0.03)') + ';border-radius:8px;border-left:3px solid ' + (isMe ? 'var(--secondary)' : 'var(--primary)') + ';';
            el.innerHTML = '<div style="font-size:10px;font-weight:700;color:var(--primary);">' + (isMe ? 'Tú' : escHTML(m.nick || 'Sistema')) + ' ' + (partnerOf ? '<span title="Pareja de ' + escHTML(partnerOf) + '" style="color:#ff69b4;font-size:9px;cursor:help;">💕</span>' : '') + ' <span style="font-weight:400;color:var(--text-muted);font-size:9px;">' + dateStr + '</span></div><div style="font-size:12px;color:var(--text-main);margin-top:4px;">' + String(m.msg || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</div>';
            container.appendChild(el);
        });
        container.scrollTop = container.scrollHeight;
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="font-size:11px;padding:8px;color:var(--danger);">Error</div>'; }
}

async function sendChatMessage() {
    if (!currentUser || !window._db) return;
    const input = document.getElementById('chat-msg-input');
    const msg = (input ? input.value : '').trim();
    if (!msg) return;
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'chat'), { nick: currentUser.nick, msg: msg, timestamp: window._fbServerTimestamp() });
        if (input) input.value = '';
        loadChat();
    } catch(e) { showToast ? showToast('Error al enviar: ' + e.message, '#ff4466') : alert('Error'); }
}
