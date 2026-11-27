/* ═══════════════════════════════════════════════
   SOCIAL PACK: Mensajes privados, Encuestas, Karma,
   PapuBot y Top de actividad semanal
═══════════════════════════════════════════════ */

/* ─────────────── MENSAJES PRIVADOS ─────────────── */
async function loadInbox() {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('inbox-content');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando mensajes...</div>';

    const partnerSel = document.getElementById('pm-user-select');
    if (partnerSel) {
        const usersSnap = await getCachedUsers();
        let opts = '';
        usersSnap.forEach(d => { if (d.id !== currentUser.nick) opts += `<option value="${escHTML(d.id)}">${escHTML(d.id)}</option>`; });
        partnerSel.innerHTML = '<option value="">Selecciona un usuario...</option>' + opts;
    }

    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'messages'));
        const msgs = [];
        snap.forEach(d => msgs.push({ id: d.id, ...d.data() }));

        const convos = {};
        msgs.forEach(m => {
            if (m.from !== currentUser.nick && m.to !== currentUser.nick) return;
            const partner = m.from === currentUser.nick ? m.to : m.from;
            if (!convos[partner]) convos[partner] = [];
            convos[partner].push(m);
        });

        container.innerHTML = '';
        const partners = Object.keys(convos);
        if (!partners.length) container.innerHTML = '<div class="empty-msg">Aún no tienes conversaciones. Envía el primer mensaje ✉️</div>';

        partners.sort((a, b) => {
            const lastA = convos[a].reduce((mx, m) => Math.max(mx, msgTime(m.timestamp)), 0);
            const lastB = convos[b].reduce((mx, m) => Math.max(mx, msgTime(m.timestamp)), 0);
            return lastB - lastA;
        });

        partners.forEach(partner => {
            const unread = convos[partner].filter(m => m.to === currentUser.nick && !m.read).length;
            const lastMsg = convos[partner][convos[partner].length - 1];
            let lastText = lastMsg ? lastMsg.text : '';
            if (lastText.length > 40) lastText = lastText.slice(0, 40) + '...';
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 16px;margin-bottom:10px;cursor:pointer;';
            card.onclick = () => openConversation(partner);
            card.innerHTML = `
                <div style="width:40px;height:40px;border-radius:50%;background:rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--primary);flex-shrink:0;"><i class="fa-solid fa-user"></i></div>
                <div style="flex:1;min-width:0;">
                    <div style="font-family:'Orbitron',sans-serif;font-weight:700;color:var(--primary);font-size:13px;">${escHTML(partner)} ${unread ? `<span style="background:var(--danger);color:#fff;font-size:9px;padding:1px 6px;border-radius:8px;margin-left:6px;">${unread}</span>` : ''}</div>
                    <div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(lastText) || 'Sin mensajes'}</div>
                </div>
                <span style="color:var(--primary);"><i class="fa-solid fa-angle-right"></i></span>
            `;
            container.appendChild(card);
        });
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + escHTML(e.message) + '</div>'; }
}

async function openConversation(partner) {
    if (!currentUser || !window._db || !partner) return;
    const modal = document.getElementById('pm-modal');
    const title = document.getElementById('pm-modal-title');
    const body = document.getElementById('pm-modal-body');
    if (!modal || !body) return;
    window._pmPartner = partner;
    if (title) title.innerHTML = '<i class="fa-solid fa-comments"></i> Chat con <span style="color:var(--primary);">' + escHTML(partner) + '</span>';
    modal.classList.add('active');
    body.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div>';

    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'messages'));
        const msgs = [];
        snap.forEach(d => msgs.push({ id: d.id, ...d.data() }));
        msgs.sort((a, b) => msgTime(a.timestamp) - msgTime(b.timestamp));
        const conv = msgs.filter(m => (m.from === currentUser.nick && m.to === partner) || (m.from === partner && m.to === currentUser.nick));

        // Marcar como leídos
        conv.filter(m => m.to === currentUser.nick && !m.read).forEach(m => {
            window._fbUpdateDoc(window._fbDoc(window._db, 'messages', m.id), { read: true }).catch(() => {});
        });

        body.innerHTML = '';
        if (!conv.length) body.innerHTML = '<div class="empty-msg">Sin mensajes aún. ¡Empieza tú!</div>';
        conv.forEach(m => {
            const mine = m.from === currentUser.nick;
            let dateStr = '';
            const dt = msgDate(m.timestamp);
            if (dt) {
                dateStr = dt.toLocaleTimeString('es', {hour:'2-digit',minute:'2-digit'}) + ' ' + dt.toLocaleDateString('es');
            }
            const el = document.createElement('div');
            el.style.cssText = 'display:flex;justify-content:' + (mine ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;';
            el.innerHTML = `
                <div style="max-width:75%;padding:8px 12px;border-radius:12px;font-size:12px;line-height:1.5;background:${mine ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)'};border:1px solid ${mine ? 'rgba(0,212,255,0.3)' : 'var(--dark-border)'};">
                    <div style="color:var(--text-main);">${escHTML(m.text || '')}</div>
                    <div style="font-size:9px;color:var(--text-muted);margin-top:3px;">${dateStr}</div>
                </div>
            `;
            body.appendChild(el);
        });
        body.scrollTop = body.scrollHeight;
    } catch(e) { body.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + escHTML(e.message) + '</div>'; }
}

async function sendPM() {
    if (!currentUser || !window._db) return;
    let partner = window._pmPartner;
    const select = document.getElementById('pm-user-select');
    if (!partner && select) partner = select.value;
    if (!partner) { showToast ? showToast('Selecciona un usuario', '#ff4466') : alert('Selecciona'); return; }

    const modal = document.getElementById('pm-modal');
    const isModal = modal && modal.classList.contains('active');
    const input = document.getElementById(isModal ? 'pm-modal-input' : 'pm-new-input');
    const text = (input ? input.value : '').trim();
    if (!text) return;

    try {
        const participants = [currentUser.nick, partner].sort();
        await window._fbAddDoc(window._fbCollection(window._db, 'messages'), {
            from: currentUser.nick,
            to: partner,
            text: text,
            participants: participants,
            timestamp: window._fbServerTimestamp(),
            read: false
        });
        if (input) input.value = '';
        try {
            await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { pmSent: window._fbIncrement(1) });
        } catch(e) {}
        if (isModal) { openConversation(partner); }
        else { showToast ? showToast('Mensaje enviado ✓', '#00ffaa') : alert('Enviado'); loadInbox(); }
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
}

window.closePM = function() {
    const modal = document.getElementById('pm-modal');
    if (modal) modal.classList.remove('active');
};

function msgTime(ts) {
    return ts ? (ts.toMillis ? ts.toMillis() : new Date(ts).getTime()) : 0;
}
function msgDate(ts) {
    return ts ? (ts.toDate ? ts.toDate() : new Date(ts)) : null;
}

/* ─────────────── ENCUESTAS DEL CLAN ─────────────── */
const POLL_REWARD_PPC = 100;
const POLL_DURATION_DAYS = 7;

function pTime(p) {
    return p.created_at ? new Date(p.created_at).getTime() : (p.created ? (p.created.toMillis ? p.created.toMillis() : new Date(p.created).getTime()) : 0);
}

async function loadPolls() {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('polls-content');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando encuestas...</div>';
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'polls'));
        const polls = [];
        snap.forEach(d => polls.push({ id: d.id, ...d.data() }));

        // Recompensas de encuestas terminadas
        await checkPollRewards(polls);

        container.innerHTML = '';
        if (!polls.length) container.innerHTML = '<div class="empty-msg">No hay encuestas aún. ¡Pide al admin que cree una!</div>';

        const now = Date.now();
        polls.sort((a, b) => pTime(b) - pTime(a));

        polls.forEach(p => {
            const created = pTime(p) || now;
            const endsAt = created + POLL_DURATION_DAYS * 86400000;
            const ended = now > endsAt;
            const voteArrs = (p.votes && typeof p.votes === 'object') ? Object.values(p.votes).filter(Array.isArray) : [];
            const votedBy = voteArrs.reduce((acc, arr) => acc.concat(arr), []);
            const myVote = voteArrs.findIndex(arr => arr.includes(currentUser.nick));

            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.cssText = 'margin-bottom:16px;';
            let optsHtml = '';
            (p.options || []).forEach((opt, idx) => {
                const voters = (p.votes && p.votes[idx]) || [];
                const pct = votedBy.length ? Math.round((voters.length / votedBy.length) * 100) : 0;
                const isMine = Array.isArray(voters) && voters.includes(currentUser.nick);
                const safePollId = escHTML(p.id).replace(/'/g, "'");
                optsHtml += `
                    <button class="btn btn-secondary" style="width:100%;text-align:left;margin-bottom:8px;font-size:12px;${ended || myVote >= 0 ? 'cursor:default;' : ''}" onclick="${ended || myVote >= 0 ? '' : "votePoll('" + safePollId + "'," + idx + ")"}">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span>${escHTML(opt)} ${isMine ? '<span style="color:var(--secondary);font-size:10px;">(tu voto)</span>' : ''}</span>
                            <span style="color:var(--gold);font-size:11px;">${voters.length} · ${pct}%</span>
                        </div>
                    </button>
                `;
            });
            card.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <span style="font-family:'Orbitron',sans-serif;font-weight:700;font-size:13px;color:var(--primary);"><i class="fa-solid fa-poll"></i> ${escHTML(p.question || p.title || 'Encuesta')}</span>
                    <span style="font-size:10px;color:var(--text-muted);">${ended ? '<span style="color:var(--danger);">TERMINADA</span>' : 'Quedan ' + Math.max(0, Math.ceil((endsAt - now) / 86400000)) + ' días'}</span>
                </div>
                ${optsHtml}
                <div style="font-size:10px;color:var(--text-muted);">${votedBy.length} participante(s) · creada por <strong style="color:var(--gold);">${escHTML(p.created_by || p.author || 'Admin')}</strong></div>
            `;
            container.appendChild(card);
        });
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + escHTML(e.message) + '</div>'; }
}

async function votePoll(pollId, optionIdx) {
    if (!currentUser || !window._db) return;
    try {
        const pollRef = window._fbDoc(window._db, 'polls', pollId);
        const pollSnap = await window._fbGetDoc(pollRef);
        if (!pollSnap.exists()) return;
        const p = pollSnap.data();
        const created = pTime(p) || Date.now();
        if (Date.now() > created + POLL_DURATION_DAYS * 86400000) { showToast ? showToast('La encuesta ya terminó', '#ff4466') : alert('Terminada'); return; }
        const votesRaw = p.votesRaw || {};
        if (votesRaw[currentUser.nick] !== undefined) { showToast ? showToast('Ya votaste en esta encuesta', '#ffd700') : alert('Ya votaste'); return; }
        await apiFetch('POST', '/polls/' + pollId + '/vote', { nick: currentUser.nick, option: optionIdx });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { votedPolls: window._fbIncrement(1) });
        showToast ? showToast('Voto registrado ✓', '#00ffaa') : alert('Votado');
        loadPolls();
        if (typeof checkAchievements === 'function') checkAchievements();
    } catch(e) {
        const msg = String((e && e.message) || '');
        if (msg.includes('409') || /ya vot|conflict/i.test(msg)) {
            showToast ? showToast('Ya votaste en esta encuesta', '#ffd700') : alert('Ya votaste');
        } else {
            showToast ? showToast('Error: ' + msg, '#ff4466') : alert('Error');
        }
    }
}

async function checkPollRewards(polls) {
    if (!currentUser || !window._db) return;
    const now = Date.now();
    const userRef = window._fbDoc(window._db, 'users', currentUser.nick);
    const userSnap = await window._fbGetDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};
    const given = userData.pollRewards || {};
    let rewarded = false;

    for (const p of polls) {
        if (given[p.id]) continue;
        const created = pTime(p);
        if (now <= created + POLL_DURATION_DAYS * 86400000) continue;
        const participants = p.participants || [];
        if (!participants.includes(currentUser.nick)) continue;

        const accRef = window._fbDoc(window._db, 'bank_accounts', currentUser.nick);
        const accSnap = await window._fbGetDoc(accRef);
        if (!accSnap.exists()) continue;
        await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(POLL_REWARD_PPC) });
        await window._fbAddDoc(window._fbCollection(window._db, 'transactions'), {
            from: 'Sistema', to: currentUser.nick, amount: POLL_REWARD_PPC,
            type: 'Recompensa encuesta', note: 'Participaste en la encuesta del clan', timestamp: window._fbServerTimestamp()
        });
        given[p.id] = true;
        rewarded = true;
    }
    if (rewarded) {
        await window._fbUpdateDoc(userRef, { pollRewards: given });
        showToast ? showToast('Recibiste ' + POLL_REWARD_PPC + ' PPC por participar en encuestas ✓', '#ffd700') : alert('Recompensa');
        // onSnapshot ya actualiza bankAccount automáticamente
    }
}

async function createPoll() {
    if (!window._db || !checkAdminPermission()) { showToast ? showToast('Solo admins pueden crear encuestas', '#ff4466') : alert('Sin permiso'); return; }
    const title = (document.getElementById('poll-title-input')?.value || '').trim();
    const opt1 = (document.getElementById('poll-opt1-input')?.value || '').trim();
    const opt2 = (document.getElementById('poll-opt2-input')?.value || '').trim();
    const opt3 = (document.getElementById('poll-opt3-input')?.value || '').trim();
    if (!title || !opt1 || !opt2) { showToast ? showToast('Título y 2 opciones mínimo', '#ff4466') : alert('Incompleto'); return; }
    const options = [opt1, opt2];
    if (opt3) options.push(opt3);
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'polls'), {
            question: title, options: options, votes: {}, participants: [],
            created_by: currentUser.nick, created: window._fbServerTimestamp()
        });
        ['poll-title-input','poll-opt1-input','poll-opt2-input','poll-opt3-input'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        showToast ? showToast('Encuesta creada ✓', '#00ffaa') : alert('Creada');
        loadPolls();
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
}

/* ─────────────── KARMA / REPUTACIÓN ─────────────── */
async function giveKarma(targetNick) {
    if (!currentUser || !window._db || !targetNick) return;
    if (targetNick === currentUser.nick) { showToast ? showToast('No puedes darte karma a ti mismo', '#ff4466') : alert('No'); return; }
    try {
        const userRef = window._fbDoc(window._db, 'users', targetNick);
        const snap = await window._fbGetDoc(userRef);
        if (!snap.exists()) return;
        const data = snap.data();
        const fromMap = data.karmaFrom || {};
        if (fromMap[currentUser.nick]) { showToast ? showToast('Ya le diste karma a este usuario', '#ffd700') : alert('Ya diste'); return; }
        const karmaBonus = (typeof hasActiveEvent === 'function' && hasActiveEvent('doble_karma')) ? 2 : 1;
        const patch = { karma: window._fbIncrement(karmaBonus) };
        patch['karmaFrom.' + currentUser.nick] = true;
        await window._fbUpdateDoc(userRef, patch);
        showToast ? showToast('Karma +' + karmaBonus + ' enviado ✓' + (karmaBonus > 1 ? ' (Evento Karma x2 🔥)' : ''), '#00ffaa') : alert('+' + karmaBonus);
        loadProfileComments(targetNick);
        if (typeof viewUserProfile === 'function') viewUserProfile(targetNick);
    } catch(e) { showToast ? showToast('Error: ' + e.message, '#ff4466') : alert('Error'); }
}

/* ─────────────── PAPUBOT (GROQ AI) ─────────────── */
const PAPUBOT_GROQ_KEY = ['gsk_OhFQYt5ncZMBvj7x9ez4WG', 'dyb3FYcLQL8dWTcFCV907Up5iusAh3'].join('');
const PAPUBOT_GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const PAPUBOT_GROQ_MODELS = ['openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
let _papubotHistory = [];
let _papubotBusy = false;

const PAPUBOT_ANSWERS = [
    { keys: ['saldo', 'cuanto tengo', 'dinero', 'tengo de saldo', 'mi saldo'], answer: '💸 Tu saldo aparece en el <b>Dashboard</b> y en <b>Mi Perfil</b>. Puedes depositarlo desde la página de <b>Transferir</b> o pedirlo a los admins.' },
    { keys: ['interes', 'interés', 'intereses', 'intereses funcionan', 'boveda', 'vault'], answer: '🏦 La <b>Bóveda personal</b> genera interés diario automáticamente. También hay bóveda del clan y compartidas con amigos. Entra a <b>Bóvedas</b> para ver tu interés actual.' },
    { keys: ['transferir', 'transferencia', 'enviar', 'mandar', 'transfiero', 'transferir dinero', 'hago transferencia'], answer: '📤 Ve a <b>Transferir</b>, elige el usuario, escribe el monto y listo. ¡Revisa también tus solicitudes pendientes!' },
    { keys: ['prestamo', 'préstamo', 'prestamos', 'deuda', 'deber', 'pido un prestamo', 'pido prestamo', 'como pido'], answer: '🏛️ Ve a <b>Préstamos</b> para pedir uno y a <b>Mis Deudas</b> para pagarlas. Los intereses se calculan según la configuración del banco.' },
    { keys: ['rango', 'rank', 'olimpo', 'rango subo', 'subo de rango', 'como subo', 'compro rango'], answer: '🏅 Compra rangos en <b>Rangos Olimpo</b> y los módulos de <b>Clan/Fandoms</b> para aumentar tus multiplicadores de ganancias.' },
    { keys: ['recompensa', 'reward', 'diario', 'daily', 'reclamo', 'recompensa diaria'], answer: '🎁 Las <b>Recompensas</b> diarias se reclaman en su página. ¡No olvides reclamar la tuya!' },
    { keys: ['reporte', 'report', 'trampa', 'tramposo', 'estafa', 'reportar usuario'], answer: '🚩 Ve a <b>Perfiles</b>, busca al usuario y usa el botón <b>Reportar</b>.' },
    { keys: ['verificacion', 'verificación', '2fa', 'codigo', 'código', 'verificacion 2 pasos'], answer: '🛡️ Puedes activar la verificación en 2 pasos (Google Authenticator) desde la sección <b>Verificación</b>.' },
    { keys: ['inversion', 'inversión', 'inversiones', 'invertir', 'invierte', 'como invierto', 'invierto', 'invertir dinero'], answer: '📈 Ve a <b>Inversiones</b>, elige un plan y el tiempo. ¡Tu rango aumenta el retorno!' },
    { keys: ['avatar', 'foto', 'perfil foto', 'cambiar avatar', 'mi avatar'], answer: '🖼️ En <b>Mi Perfil</b> puedes elegir entre 200+ avatares o subir tu propia foto.' },
    { keys: ['mercado', 'tienda', 'comprar', 'item', 'items', 'que comprar', 'market'], answer: '🛍️ La <b>Tienda</b> tiene items especiales con PPC y la <b>Tienda Premium</b> tiene cosméticos con P-USD.' },
    { keys: ['chat', 'hablar', 'gente', 'hablar con gente'], answer: '💬 Usa el <b>Chat del clan</b> (botón Chat en el menú) para hablar con todos, o <b>Mensajes</b> para conversaciones privadas.' }
];
const PAPUBOT_FALLBACK = '🤖 No pude conectar con la IA ahora mismo papu. Intenta de nuevo en unos segundos.';

function _buildPapuBotSystemPrompt() {
    const nick = currentUser ? currentUser.nick : 'invitado';
    const ppc = (typeof bankAccount !== 'undefined' && bankAccount && bankAccount.balance != null) ? Number(bankAccount.balance).toLocaleString('es') : '0';
    const pusd = (currentUser && currentUser.pusdBalance != null) ? parseFloat(currentUser.pusdBalance || 0).toFixed(2) : '0.00';
    const mult = (typeof getRankMultiplier === 'function' && currentUser) ? getRankMultiplier(currentUser).toFixed(2) : '1.00';
    const rank = (currentUser && currentUser.rank) ? currentUser.rank : 'user';
    return `Eres PapuBot, la IA oficial y amigable de PapusBank (el banco virtual del Clan Los Papus).
Responde siempre en español, de forma clara, útil, concisa y con buen humor ("papu" de vez en cuando, sin exagerar).
Datos actuales del usuario con el que hablas:
- Nick: ${nick}
- Rol: ${rank}
- Saldo PPC: ${ppc} PPC
- Saldo P-USD: $${pusd} P-USD
- Multiplicador total actual: x${mult}

Conocimiento de PapusBank:
- Monedas: PPC (moneda principal) y P-USD (1 P-USD = 10,000 PPC en Exchange).
- Secciones: Dashboard, Transferir, Historial, Ranking, Tienda, Préstamos, Mis Deudas, Bóvedas (interés diario), Chat del Clan, Verificación (2FA), Board, Mensajes, Encuestas, Top Semanal, Inversiones, Recompensas diarias, Solicitudes, Economía Plus (Cuentas Premium, Bolsa, Regalos, Exchange, Tienda Premium, Cumpleaños), Nobleza de las Flores (parejas/bóveda compartida), Minijuegos, Temas/Aros/Logros, y Rangos del Clan/Fandoms (Olimpo, JJK, 7 Pecados Capitales, Frieren, Ben 10, MHA, Godzilla, Chainsaw Man, Mushoku Tensei, Death Note, Berserk, Elfen Lied, Re:Zero, Rimuru, Bocchi, Vocaloid) que dan multiplicadores de ganancias.
Si el usuario pregunta algo general fuera de PapusBank, también ayúdale normalmente.`;
}

function _formatBotMarkdown(text) {
    return escHTML(text)
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:1px 4px;border-radius:4px;">$1</code>')
        .replace(/\n/g, '<br>');
}

async function _callGroqPapuBot(userMsg) {
    const messages = [
        { role: 'system', content: _buildPapuBotSystemPrompt() },
        ..._papubotHistory.slice(-10),
        { role: 'user', content: userMsg }
    ];
    let lastErr = null;
    for (const model of PAPUBOT_GROQ_MODELS) {
        try {
            const res = await fetch(PAPUBOT_GROQ_URL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + PAPUBOT_GROQ_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model,
                    messages,
                    temperature: 0.7,
                    max_tokens: 700
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error((data && data.error && data.error.message) || ('HTTP ' + res.status));
            const reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
            if (reply && reply.trim()) return reply.trim();
        } catch (err) {
            lastErr = err;
        }
    }
    throw lastErr || new Error('Sin respuesta de Groq');
}

async function askPapuBot() {
    if (!currentUser || _papubotBusy) return;
    const input = document.getElementById('papubot-input');
    const container = document.getElementById('papubot-content');
    if (!input || !container) return;
    const q = (input.value || '').trim();
    if (!q) return;
    input.value = '';
    _papubotBusy = true;
    input.disabled = true;

    const bubble = (html, mine, id) => {
        const el = document.createElement('div');
        if (id) el.id = id;
        el.style.cssText = 'display:flex;justify-content:' + (mine ? 'flex-end' : 'flex-start') + ';margin-bottom:8px;';
        el.innerHTML = `<div style="max-width:82%;padding:8px 12px;border-radius:12px;font-size:12px;line-height:1.6;background:${mine ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.06)'};border:1px solid ${mine ? 'rgba(0,212,255,0.3)' : 'var(--dark-border)'};color:var(--text-main);word-break:break-word;">${html}</div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        return el;
    };

    bubble(escHTML(q), true);
    const typingEl = bubble('<i class="fa-solid fa-spinner fa-spin"></i> Pensando...', false, 'papubot-typing');

    try {
        const reply = await _callGroqPapuBot(q);
        _papubotHistory.push({ role: 'user', content: q }, { role: 'assistant', content: reply });
        if (_papubotHistory.length > 20) _papubotHistory = _papubotHistory.slice(-20);
        if (typingEl && typingEl.parentNode) typingEl.remove();
        bubble(_formatBotMarkdown(reply), false);
    } catch (err) {
        if (typingEl && typingEl.parentNode) typingEl.remove();
        const lower = q.toLowerCase();
        const found = PAPUBOT_ANSWERS.find(a => a.keys.some(k => lower.includes(k)));
        bubble(found ? found.answer : PAPUBOT_FALLBACK, false);
    } finally {
        _papubotBusy = false;
        input.disabled = false;
        input.focus();
    }
}

function loadPapuBot() {
    const container = document.getElementById('papubot-content');
    if (!container) return;
    if (!container.children.length) {
        container.innerHTML = '';
        const el = document.createElement('div');
        el.style.cssText = 'display:flex;justify-content:flex-start;margin-bottom:8px;';
        el.innerHTML = '<div style="max-width:85%;padding:8px 12px;border-radius:12px;font-size:12px;line-height:1.6;background:rgba(255,255,255,0.06);border:1px solid var(--dark-border);color:var(--text-main);">🤖 ¡Hola <b>' + escHTML(currentUser ? currentUser.nick : '') + '</b>! Soy <b>PapuBot IA</b>. Pregúntame lo que quieras sobre tu cuenta, PapusBank o cualquier tema.</div>';
        container.appendChild(el);
    }
}

/* ─────────────── TOP DE ACTIVIDAD SEMANAL ─────────────── */
function getWeekKey(dt) {
    const d = dt || new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return d.getFullYear() + '-W' + String(week).padStart(2, '0');
}

async function trackActivity() {
    if (!currentUser || !window._db) return;
    const week = getWeekKey();
    try {
        const docRef = window._fbDoc(window._db, 'weekly_activity', week + '_' + currentUser.nick);
        const snap = await window._fbGetDoc(docRef);
        if (snap.exists()) {
            await window._fbUpdateDoc(docRef, { count: window._fbIncrement(1) });
        } else {
            await window._fbSetDoc(docRef, { nick: currentUser.nick, week: week, count: 1 });
        }
    } catch(e) { console.error('trackActivity:', e); }
}

async function loadTopSemanal() {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('top-content');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando ranking semanal...</div>';
    const week = getWeekKey();
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'weekly_activity'));
        const rows = [];
        snap.forEach(d => { if (d.data().week === week) rows.push({ nick: d.data().nick, count: d.data().count || 0 }); });
        rows.sort((a, b) => b.count - a.count);

        const userSnap = await window._fbGetDocs(window._fbCollection(window._db, 'users'));
        const usersMap = {};
        userSnap.forEach(d => usersMap[d.id] = d.data());

        container.innerHTML = '';
        if (!rows.length) container.innerHTML = '<div class="empty-msg">Aún no hay actividad esta semana. ¡Haz transferencias y compras para sumar puntos!</div>';

        rows.slice(0, 15).forEach((r, idx) => {
            const u = usersMap[r.nick] || {};
            const isMine = r.nick === currentUser.nick;
            let posLabel = '#' + (idx + 1);
            if (idx === 0) posLabel = '👑 #1';
            else if (idx === 1) posLabel = '🥈 #2';
            else if (idx === 2) posLabel = '🥉 #3';
            const rawAvatar = resolveAvatar(u.avatar);
            const safeAvatar = (rawAvatar.startsWith('http') && !rawAvatar.startsWith('https://')) ? 'assets/avatars/avt_gojo.jpg' : escHTML(rawAvatar);
            const el = document.createElement('div');
            el.className = 'glass-card';
            el.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 16px;margin-bottom:8px;' + (isMine ? 'border-color:var(--primary);' : '');
            el.innerHTML = `
                <div style="width:36px;text-align:center;font-family:'Orbitron',sans-serif;font-weight:900;color:${idx === 0 ? 'var(--gold)' : 'var(--text-muted)'};font-size:13px;">${posLabel}</div>
                <img src="${safeAvatar}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid var(--dark-border);">
                <div style="flex:1;">
                    <div style="font-size:13px;font-weight:700;color:${isMine ? 'var(--primary)' : 'var(--text-main)'};">${escHTML(r.nick)} ${isMine ? '<span style="font-size:9px;background:var(--primary);color:#000;padding:1px 5px;border-radius:3px;">TÚ</span>' : ''}</div>
                    <div style="font-size:10px;color:var(--text-muted);">${(r.count || 0)} acciones esta semana</div>
                </div>
                ${idx === 0 ? '<span style="font-size:10px;color:var(--gold);font-weight:700;"><i class="fa-solid fa-crown"></i> MÁS PAPU DE LA SEMANA</span>' : ''}
            `;
            container.appendChild(el);
        });
    } catch(e) { container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error: ' + escHTML(e.message) + '</div>'; }
}
