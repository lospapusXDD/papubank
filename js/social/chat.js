/* Chat integrado — panel pequeño */
let _chatOpen = false;
let _chatTimer = null;
let _chatSending = false;

function toggleChatPanel() {
    const panel = document.getElementById('chat-panel');
    if (!panel) return;
    _chatOpen = !_chatOpen;
    panel.style.display = _chatOpen ? 'flex' : 'none';
    if (_chatTimer) { clearInterval(_chatTimer); _chatTimer = null; }
    if (_chatOpen) {
        loadChat();
        _chatTimer = setInterval(() => {
            if (_chatOpen) loadChat(true);
        }, 5000);
    }
}

function _parseChatTime(m) {
    const raw = m.timestamp || m.created_at || m.createdAt;
    if (!raw) return 0;
    if (typeof raw.toMillis === 'function') return raw.toMillis();
    const t = new Date(raw).getTime();
    return Number.isFinite(t) ? t : 0;
}

function _formatChatTime(m) {
    const raw = m.timestamp || m.created_at || m.createdAt;
    if (!raw) return '';
    const d = typeof raw.toDate === 'function' ? raw.toDate() : new Date(raw);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
}

async function loadChat(silent = false) {
    const container = document.getElementById('chat-messages');
    if (!container || !window._db) return;
    if (!silent && !container.children.length) {
        container.innerHTML = '<div class="empty-msg" style="font-size:11px;padding:8px;">Cargando...</div>';
    }
    try {
        if (window._apiCache) delete window._apiCache['GET:/chat'];
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'chat'));
        const seen = new Set();
        const msgs = [];
        snap.forEach(d => {
            const data = d.data() || {};
            const text = data.msg || data.message || data.text || '';
            const ts = _parseChatTime(data);
            const dedupeKey = data.id ? String(data.id) : `${data.nick || ''}|${ts}|${text}`;
            if (seen.has(dedupeKey)) return;
            seen.add(dedupeKey);
            msgs.push({ id: d.id, ...data, _text: text, _ts: ts });
        });
        msgs.sort((a, b) => a._ts - b._ts);

        const partnerMap = {};
        try {
            const uSnap = await getCachedUsers();
            uSnap.forEach(d => { const u = d.data(); if (u && u.parejaWith) partnerMap[d.id] = u.parejaWith; });
        } catch(e) {}

        const wasNearBottom = (container.scrollHeight - container.scrollTop - container.clientHeight) < 60;
        container.innerHTML = '';
        if (!msgs.length) {
            container.innerHTML = '<div class="empty-msg" style="font-size:11px;padding:8px;">Sin mensajes</div>';
            return;
        }
        const myNick = currentUser ? currentUser.nick : '';
        msgs.slice(-80).forEach(m => {
            const isMe = m.nick === myNick;
            const dateStr = _formatChatTime(m);
            const partnerOf = partnerMap[m.nick] || null;
            const el = document.createElement('div');
            el.style.cssText = 'padding:8px 10px;margin-bottom:6px;background:' + (isMe ? 'rgba(0,255,170,0.08)' : 'rgba(255,255,255,0.03)') + ';border-radius:8px;border-left:3px solid ' + (isMe ? 'var(--secondary)' : 'var(--primary)') + ';';
            el.innerHTML = '<div style="font-size:10px;font-weight:700;color:var(--primary);">' + (isMe ? 'Tú' : escHTML(m.nick || 'Sistema')) + ' ' + (partnerOf ? '<span title="Pareja de ' + escHTML(partnerOf) + '" style="color:#ff69b4;font-size:9px;cursor:help;">💕</span>' : '') + ' <span style="font-weight:400;color:var(--text-muted);font-size:9px;">' + escHTML(dateStr) + '</span></div><div style="font-size:12px;color:var(--text-main);margin-top:4px;word-break:break-word;">' + escHTML(m._text) + '</div>';
            container.appendChild(el);
        });
        if (!silent || wasNearBottom) container.scrollTop = container.scrollHeight;
    } catch(e) {
        if (!silent) container.innerHTML = '<div class="empty-msg" style="font-size:11px;padding:8px;color:var(--danger);">Error al cargar chat</div>';
    }
}

async function sendChatMessage() {
    if (!currentUser || !window._db || _chatSending) return;
    const input = document.getElementById('chat-msg-input');
    const msg = (input ? input.value : '').trim();
    if (!msg) return;
    _chatSending = true;
    if (input) input.disabled = true;
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'chat'), {
            nick: currentUser.nick,
            msg: msg,
            timestamp: window._fbServerTimestamp()
        });
        if (input) input.value = '';
        await loadChat();
    } catch(e) {
        if (typeof showToast === 'function') showToast('Error al enviar: ' + e.message, '#ff4466');
        else alert('Error al enviar: ' + e.message);
    } finally {
        _chatSending = false;
        if (input) { input.disabled = false; input.focus(); }
    }
}
