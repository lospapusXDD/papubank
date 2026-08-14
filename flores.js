/* ═══════════════════════════════════════════════
   NOBLEZA DE LAS FLORES — Sistema de Parejas
   Asignación admin + solicitudes de usuario
══════════════════════════════════════════════ */

const FLORES_RANKS = [
    { key: 'enamorados',  label: 'Enamorados',   icon: 'fa-solid fa-heart',          color: '#4ade80', days: 0,    bonus: 100   },
    { key: 'comprometidos', label: 'Comprometidos', icon: 'fa-solid fa-ring',         color: '#60a5fa', days: 30,   bonus: 250   },
    { key: 'almas_gemelas', label: 'Almas Gemelas', icon: 'fa-solid fa-heart-pulse',  color: '#a78bfa', days: 90,   bonus: 500   },
    { key: 'matrimonio',   label: 'Matrimonio',    icon: 'fa-solid fa-certificate',   color: '#f472b6', days: 180,  bonus: 1000  },
    { key: 'eternos',      label: 'Eternos',       icon: 'fa-solid fa-gem',           color: '#fbbf24', days: 365,  bonus: 2500  }
];

const FLORES_ACHIEVEMENTS = [
    { id: 'flores_first',      icon: 'fa-solid fa-seedling',  name: 'Primera Flor',       desc: 'Envía tu primera carta de amor',        reward: 100   },
    { id: 'flores_30d',        icon: 'fa-solid fa-calendar',  name: '1 Mes Juntos',       desc: 'Lleva 30 días en pareja',               reward: 500   },
    { id: 'flores_90d',        icon: 'fa-solid fa-heart',     name: '3 Meses Juntos',     desc: 'Lleva 90 días en pareja',               reward: 1500  },
    { id: 'flores_180d',       icon: 'fa-solid fa-ring',      name: '6 Meses Juntos',     desc: 'Lleva 180 días en pareja',              reward: 5000  },
    { id: 'flores_365d',       icon: 'fa-solid fa-crown',     name: '1 Año Juntos',       desc: 'Lleva 365 días en pareja',              reward: 15000 },
    { id: 'flores_letters_10', icon: 'fa-solid fa-envelope',   name: 'Cartas de Amor',     desc: 'Envía 10 cartas de amor',               reward: 300   },
    { id: 'flores_vault_1m',   icon: 'fa-solid fa-vault',     name: 'Bóveda Millonaria',  desc: 'Acumula 1,000,000 PPC en bóveda compartida', reward: 5000 },
    { id: 'flores_donor',      icon: 'fa-solid fa-hand-holding-heart', name: 'Generoso', desc: 'Deposita 100,000 PPC en bóveda compartida', reward: 1000 }
];

const FLORES_GIFTS = [
    { id:'flores_flowers', name:'Ramo de Flores', icon:'fa-solid fa-fan', color:'#ff69b4', price:500, desc:'Un ramo colorido para alegrar el día.' },
    { id:'flores_chocolates', name:'Caja de Chocolates', icon:'fa-solid fa-candy-cane', color:'#fbbf24', price:1500, desc:'Dulce tentación para tu media naranja.' },
    { id:'flores_peluche', name:'Peluche Kawaii', icon:'fa-solid fa-paw', color:'#a78bfa', price:3000, desc:'Un abrazo esponjoso de peluche.' },
    { id:'flores_ring', name:'Anillo de Promesa', icon:'fa-solid fa-ring', color:'#60a5fa', price:10000, desc:'Un anillo de compromiso virtual.' },
    { id:'flores_rosa', name:'Rosa Eterna', icon:'fa-solid fa-rose', color:'#f472b6', price:25000, desc:'Una rosa que nunca se marchita.' }
];

const FLORES_VAULT_SAFE_LIMIT = 100000;

const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

/* ─────────── STATE ─────────── */
let _floresRequestTarget = null;
let _floresChatTimer = null;

/* ─────────── UTILITIES ─────────── */

function getFloresDays(startDate) {
    if (!startDate) return 0;
    const start = startDate.toDate ? startDate.toDate() : new Date(startDate);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

function getFloresRank(days) {
    let best = FLORES_RANKS[0];
    for (const r of FLORES_RANKS) {
        if (days >= r.days) best = r;
    }
    return best;
}

function getFloresRankByKey(key) {
    return FLORES_RANKS.find(r => r.key === key) || FLORES_RANKS[0];
}

function formatFloresDate(startDate) {
    if (!startDate) return 'Hoy';
    const d = startDate.toDate ? startDate.toDate() : new Date(startDate);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─────────── RENDER MAIN PAGE ─────────── */

async function loadFloresPage() {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('flores-container');
    if (!container) return;

    stopFloresChatPolling();

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const partner = userData.parejaWith;
        const startDate = userData.parejaStartDate;

        currentUser.parejaWith = partner || null;
        currentUser.parejaStartDate = startDate || null;

        if (!partner) {
            renderFloresEmpty(container);
            return;
        }

        const days = getFloresDays(startDate);
        const rank = getFloresRank(days);
        const nextRank = FLORES_RANKS.find(r => r.days > days);

        renderFloresPartner(container, partner, days, rank, nextRank, startDate);
        startFloresChatPolling(partner);
        checkFloresAnniversaryBonus();
    } catch(e) {
        console.error('Error loading flores:', e);
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar Nobleza de las Flores</div>';
    }
}

function renderFloresEmpty(container) {
    container.innerHTML = `
        <div class="glass-card text-center" style="padding:50px 30px;max-width:500px;margin:0 auto;">
            <div style="font-size:60px;margin-bottom:20px;">🌸</div>
            <h2 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:10px;">Sin Pareja</h2>
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">Envía una solicitud o espera que un admin te asigne pareja.</p>
            <button class="btn btn-primary" onclick="showFloresRequestModal()">
                <i class="fa-solid fa-paper-plane"></i> Enviar Solicitud
            </button>
        </div>
        <div id="flores-incoming-requests" style="max-width:500px;margin:20px auto 0;"></div>
    `;
    loadAndRenderIncomingRequests();
}

async function loadAndRenderIncomingRequests() {
    const el = document.getElementById('flores-incoming-requests');
    if (!el) return;
    const requests = await loadPendingFloresRequests();
    if (!requests.length) {
        el.innerHTML = '';
        return;
    }
    el.innerHTML = `
        <div class="glass-card" style="border-color:#ff69b4;">
            <h3 style="font-family:'Orbitron',sans-serif;color:#ff69b4;margin-bottom:15px;">
                <i class="fa-solid fa-heart-circle-check"></i> Solicitudes Recibidas (${requests.length})
            </h3>
            <div style="display:flex;flex-direction:column;gap:10px;">
                ${requests.map(r => `
                    <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,105,180,0.08);border-radius:10px;padding:12px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <i class="fa-solid fa-heart" style="color:#ff69b4;font-size:18px;"></i>
                            <div>
                                <div style="font-weight:700;color:var(--primary);">${r.from}</div>
                                <div style="font-size:10px;color:var(--text-muted);">Quiere ser tu pareja</div>
                            </div>
                        </div>
                        <div style="display:flex;gap:6px;">
                            <button class="btn btn-primary" style="font-size:10px;padding:6px 12px;" onclick="acceptFloresRequest('${r.id}'); loadAndRenderIncomingRequests();">
                                <i class="fa-solid fa-check"></i> Aceptar
                            </button>
                            <button class="btn btn-secondary" style="font-size:10px;padding:6px 12px;" onclick="rejectFloresRequest('${r.id}'); loadAndRenderIncomingRequests();">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderFloresPartner(container, partner, days, rank, nextRank, startDate) {
    const progress = nextRank ? ((days - rank.days) / (nextRank.days - rank.days)) * 100 : 100;
    const isAdmin = ['owner','admin'].includes(getRankKey(currentUser));

    container.innerHTML = `
        <div class="glass-card text-center" style="max-width:600px;margin:0 auto 20px auto;border-color:${rank.color};">
            <div style="font-size:48px;margin-bottom:12px;">${rank.icon.includes('heart') ? '❤️' : rank.icon.includes('ring') ? '💍' : rank.icon.includes('gem') ? '💎' : '🌸'}</div>
            <h2 style="font-family:'Orbitron',sans-serif;color:${rank.color};margin-bottom:5px;">${rank.label}</h2>
            <p style="font-size:14px;color:var(--gold);font-weight:bold;">${partner}</p>
            <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">
                <i class="fa-solid fa-calendar"></i> Desde ${formatFloresDate(startDate)} • <strong>${days} días</strong>
            </p>
            ${isAdmin ? `<button class="btn btn-secondary" style="font-size:9px;padding:4px 10px;margin-top:8px;" onclick="showEditFloresDateModal('${partner}')"><i class="fa-solid fa-pen"></i> Editar Fecha</button>` : ''}
            ${nextRank ? `
                <div style="margin-top:15px;">
                    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:5px;">
                        <span>${rank.label}</span>
                        <span>${nextRank.label} (${nextRank.days - days} días restantes)</span>
                    </div>
                    <div style="background:rgba(255,255,255,0.1);border-radius:10px;height:8px;overflow:hidden;">
                        <div style="background:${rank.color};height:100%;width:${Math.min(progress, 100)}%;border-radius:10px;transition:width 0.5s;"></div>
                    </div>
                </div>
            ` : '<p style="margin-top:10px;color:var(--gold);font-size:12px;">✨ ¡Nivel Máximo Alcanzado! ✨</p>'}
            <p style="margin-top:12px;font-size:11px;color:var(--secondary);">+${rank.bonus} PPC diarios de bonus</p>
        </div>

        <div id="flores-birthday-info" style="max-width:800px;margin:0 auto 15px auto;"></div>
        <div id="flores-pending-withdrawals" style="max-width:800px;margin:0 auto;"></div>

        <div class="grid-container" style="max-width:800px;margin:0 auto;">
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:15px;">
                    <i class="fa-solid fa-envelope-heart"></i> Carta de Amor
                </h3>
                <div class="form-group">
                    <textarea class="form-control" id="flores-letter-input" rows="3" placeholder="Escribe algo bonito..."></textarea>
                </div>
                <button class="btn btn-primary btn-full" onclick="sendFloresLetter('${partner}')">
                    <i class="fa-solid fa-paper-plane"></i> Enviar
                </button>
            </div>
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:var(--gold);margin-bottom:15px;">
                    <i class="fa-solid fa-vault"></i> Bóveda Compartida
                </h3>
                <div id="flores-vault-info">
                    <div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div>
                </div>
            </div>
        </div>

        <div class="grid-container" style="max-width:800px;margin:20px auto 0 auto;">
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:#ff69b4;margin-bottom:15px;">
                    <i class="fa-solid fa-gift"></i> Regalos
                </h3>
                <div id="flores-gifts-list" style="margin-bottom:12px;">
                    <div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div>
                </div>
                <button class="btn btn-primary btn-full" onclick="showFloresGiftsModal('${partner}')">
                    <i class="fa-solid fa-gift"></i> Enviar Regalo
                </button>
            </div>
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:var(--primary);margin-bottom:15px;">
                    <i class="fa-solid fa-heart-circle-bolt"></i> Chat de Pareja
                </h3>
                <div id="flores-chat-messages" style="height:190px;overflow-y:auto;background:rgba(0,0,0,0.25);border-radius:8px;padding:8px;margin-bottom:8px;">
                    <div class="empty-msg" style="font-size:10px;">Cargando...</div>
                </div>
                <div style="display:flex;gap:6px;">
                    <input class="form-control" id="flores-chat-input" type="text" placeholder="Mensaje privado..." onkeydown="if(event.key==='Enter') floresSendChat('${partner}')" style="flex:1;font-size:12px;">
                    <button class="btn btn-primary" onclick="floresSendChat('${partner}')" title="Enviar"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

        <div class="glass-card" style="max-width:800px;margin:20px auto 0 auto;">
            <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:15px;">
                <i class="fa-solid fa-inbox"></i> Cartas Recibidas
            </h3>
            <div id="flores-letters-list"></div>
        </div>

        <div style="max-width:800px;margin:20px auto 0 auto;text-align:center;">
            <button class="btn btn-danger" onclick="floresDivorce()">
                <i class="fa-solid fa-heart-broken"></i> Divorcio
            </button>
            <p style="font-size:9px;color:var(--text-muted);margin-top:6px;">La bóveda compartida se reparte 50/50 entre ambos.</p>
        </div>
    `;

    loadFloresVault(partner);
    loadFloresLetters(partner);
    loadFloresGifts(partner);
    loadFloresPartnerBirthday(partner);
    loadFloresPendingWithdrawals(partner);
    loadFloresChat(partner);
}

/* ─────────── REQUEST SYSTEM ─────────── */

function showFloresRequestModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'flores-request-modal';
    modal.innerHTML = `
        <div class="modal glass-card" style="max-width:400px;">
            <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:20px;">
                <i class="fa-solid fa-heart"></i> Enviar Solicitud
            </h3>
            <div class="form-group">
                <label style="font-size:12px;color:var(--text-muted);">Selecciona tu crush:</label>
                <select class="form-control" id="flores-crush-select">
                    <option value="">Selecciona un usuario...</option>
                </select>
            </div>
            <div style="display:flex;gap:10px;margin-top:20px;">
                <button class="btn btn-secondary" onclick="closeFloresModal()" style="flex:1;">Cancelar</button>
                <button class="btn btn-primary" onclick="sendFloresRequest()" style="flex:1;">
                    <i class="fa-solid fa-paper-plane"></i> Enviar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    loadFloresUserList().then(() => {
        const sel = document.getElementById('flores-crush-select');
        if (sel && _floresRequestTarget) {
            sel.value = _floresRequestTarget;
            _floresRequestTarget = null;
        }
    });
}

window.floresRequestFromProfile = function(nick) {
    _floresRequestTarget = nick;
    showFloresRequestModal();
};

async function loadFloresUserList() {
    const select = document.getElementById('flores-crush-select');
    if (!select || !window._db) return;

    try {
        const snap = await getCachedUsers();
        const options = ['<option value="">Selecciona un usuario...</option>'];
        snap.forEach(doc => {
            const u = doc.data();
            if (u.nick !== currentUser.nick && !u.parejaWith) {
                options.push(`<option value="${u.nick}">${u.nick}</option>`);
            }
        });
        select.innerHTML = options.join('');
    } catch(e) {
        console.error('Error loading users:', e);
    }
}

async function sendFloresRequest() {
    const select = document.getElementById('flores-crush-select');
    const target = select ? select.value : null;
    if (!target) { showToast('Selecciona un usuario', '#ff4466'); return; }

    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'flores_requests'), {
            from: currentUser.nick,
            to: target,
            status: 'pending',
            timestamp: window._fbServerTimestamp()
        });
        closeFloresModal();
        floresNotify(target, 'Solicitud de pareja 💌', `${currentUser.nick} quiere ser tu pareja. Acéptala en Nobleza de las Flores.`);
        showToast(`Solicitud enviada a ${target} 💌`, '#ff69b4');
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

function closeFloresModal() {
    const modal = document.getElementById('flores-request-modal');
    if (modal) modal.remove();
}

/* ─────────── ADMIN ASSIGN ─────────── */

async function adminAssignCouple(user1, user2, startDate) {
    if (!window._db) return;

    try {
        const batch = window._fbWriteBatch(window._db);
        const user1Ref = window._fbDoc(window._db, 'users', user1);
        const user2Ref = window._fbDoc(window._db, 'users', user2);

        batch.update(user1Ref, {
            parejaWith: user2,
            parejaStartDate: startDate || new Date().toISOString()
        });
        batch.update(user2Ref, {
            parejaWith: user1,
            parejaStartDate: startDate || new Date().toISOString()
        });

        await batch.commit();
        if (typeof logAudit === 'function') logAudit(currentUser.nick, `Pareja asignada: ${user1} + ${user2}`);
        return true;
    } catch(e) {
        console.error('Error assigning couple:', e);
        return false;
    }
}

function showEditFloresDateModal(partner) {
    const existing = document.getElementById('flores-editdate-modal');
    if (existing) existing.remove();

    const current = currentUser.parejaStartDate;
    const currentDate = current ? (current.toDate ? current.toDate() : new Date(current)) : new Date();
    const dateStr = currentDate.toISOString().split('T')[0];

    const modal = document.createElement('div');
    modal.id = 'flores-editdate-modal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:3000;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
        <div class="glass-card" style="width:350px;max-width:90vw;">
            <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:15px;text-align:center;">
                <i class="fa-solid fa-calendar-pen"></i> Editar Fecha de Inicio
            </h3>
            <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-bottom:15px;">Pareja con <strong style="color:var(--primary);">${partner}</strong></p>
            <div class="form-group">
                <label style="font-size:11px;color:var(--text-muted);">Fecha de inicio</label>
                <input type="date" class="form-control" id="flores-editdate-input" value="${dateStr}" style="width:100%;">
            </div>
            <div style="display:flex;gap:8px;margin-top:15px;">
                <button class="btn btn-primary" style="flex:1;" onclick="saveFloresDate('${partner}')">
                    <i class="fa-solid fa-check"></i> Guardar
                </button>
                <button class="btn btn-secondary" style="flex:1;" onclick="document.getElementById('flores-editdate-modal').remove()">
                    <i class="fa-solid fa-xmark"></i> Cancelar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function saveFloresDate(partner) {
    const input = document.getElementById('flores-editdate-input');
    if (!input || !input.value) return;
    const newDate = new Date(input.value + 'T12:00:00').toISOString();
    try {
        const batch = window._fbWriteBatch(window._db);
        batch.update(window._fbDoc(window._db, 'users', currentUser.nick), { parejaStartDate: newDate });
        batch.update(window._fbDoc(window._db, 'users', partner), { parejaStartDate: newDate });
        await batch.commit();
        currentUser.parejaStartDate = newDate;
        document.getElementById('flores-editdate-modal')?.remove();
        showToast('Fecha actualizada', '#22c55e');
        loadFloresPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── ACCEPT REQUEST ─────────── */

async function acceptFloresRequest(requestId) {
    if (!window._db || !currentUser) return;

    try {
        const reqSnap = await window._fbGetDoc(window._fbDoc(window._db, 'flores_requests', requestId));
        if (!reqSnap.exists()) { showToast('Solicitud no encontrada', '#ff4466'); return; }

        const req = reqSnap.data();
        if (req.to !== currentUser.nick) { showToast('No autorizado', '#ff4466'); return; }

        const batch = window._fbWriteBatch(window._db);
        const user1Ref = window._fbDoc(window._db, 'users', req.from);
        const user2Ref = window._fbDoc(window._db, 'users', req.to);
        const reqRef = window._fbDoc(window._db, 'flores_requests', requestId);

        batch.update(user1Ref, {
            parejaWith: req.to,
            parejaStartDate: new Date().toISOString()
        });
        batch.update(user2Ref, {
            parejaWith: req.from,
            parejaStartDate: new Date().toISOString()
        });
        batch.update(reqRef, { status: 'accepted' });

        await batch.commit();
        currentUser.parejaWith = req.from;
        currentUser.parejaStartDate = new Date().toISOString();
        showToast(`¡Ahora eres pareja de ${req.from}! 💕`, '#ff69b4');
        floresNotify(req.from, '¡Solicitud aceptada! 💕', `${req.to} aceptó ser tu pareja. ¡Felicidades!`);
        loadFloresPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function rejectFloresRequest(requestId) {
    if (!window._db) return;

    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'flores_requests', requestId), { status: 'rejected' });
        showToast('Solicitud rechazada', '#ff69b4');
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function loadPendingFloresRequests() {
    if (!window._db || !currentUser) return [];
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'flores_requests'));
        const requests = [];
        snap.forEach(doc => {
            const r = doc.data();
            if (r.to === currentUser.nick && r.status === 'pending') {
                requests.push({ id: doc.id, ...r });
            }
        });
        return requests;
    } catch(e) {
        return [];
    }
}

/* ─────────── LETTERS ─────────── */

async function sendFloresLetter(partner) {
    if (!currentUser || !window._db) return;
    const input = document.getElementById('flores-letter-input');
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
        showToast('Carta enviada 💌', '#ff69b4');
        floresNotify(partner, 'Carta de amor 💌', `${currentUser.nick} te envió una carta. Léela en Nobleza de las Flores.`);
        updateFloresLetterStreak(vaultId);
        checkFloresAchievements();
        loadFloresLetters(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function loadFloresLetters(partner) {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('flores-letters-list');
    if (!container) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const snap = await window._fbGetDocs(window._fbCollection(window._db, `vaults/${vaultId}/letters`));

        if (snap.empty) {
            container.innerHTML = '<div class="empty-msg">No hay cartas aún 💌</div>';
            return;
        }

        const letters = [];
        snap.forEach(d => {
            const data = d.data();
            letters.push({ ...data, date: data.timestamp ? (data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp)) : new Date() });
        });
        letters.sort((a, b) => b.date - a.date);

        container.innerHTML = '';
        letters.slice(0, 10).forEach(letter => {
            const isFromMe = letter.from === currentUser.nick;
            const d = document.createElement('div');
            d.style.cssText = 'margin-bottom:12px;padding:12px;border-radius:12px;background:rgba(255,255,255,0.05);border-left:3px solid ' + (isFromMe ? 'var(--primary)' : 'var(--danger)') + ';';
            d.innerHTML = `
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                    <strong style="color:${isFromMe ? 'var(--primary)' : 'var(--danger)'}; font-size:12px;">
                        <i class="fa-solid fa-${isFromMe ? 'paper-plane' : 'envelope-heart'}"></i> ${letter.from}
                    </strong>
                    <span style="font-size:10px;color:var(--text-muted);">${letter.date.toLocaleDateString()}</span>
                </div>
                <p style="font-size:13px;color:var(--text);margin:0;white-space:pre-wrap;">${escHTML(letter.msg)}</p>
            `;
            container.appendChild(d);
        });
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar cartas</div>';
    }
}

/* ─────────── VAULT ─────────── */

async function loadFloresVault(partner) {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('flores-vault-info');
    if (!container) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const vaultSnap = await window._fbGetDoc(window._fbDoc(window._db, 'vaults', vaultId));

        let balance = 0;
        let streak = 0;
        if (vaultSnap.exists()) {
            const v = vaultSnap.data();
            balance = v.balance || 0;
            streak = v.streak || 0;
        }

        container.innerHTML = `
            <div style="text-align:center;margin-bottom:15px;">
                <div style="font-size:28px;font-family:'Orbitron',sans-serif;color:var(--gold);">${balance.toLocaleString()} PPC</div>
                ${streak > 0 ? `<div style="font-size:11px;color:#ff69b4;margin-top:4px;"><i class="fa-solid fa-fire"></i> Racha de cartas: <strong>${streak} días</strong></div>` : ''}
            </div>
            <div style="display:flex;gap:8px;">
                <button class="btn btn-primary" onclick="floresDeposit('${partner}')" style="flex:1;font-size:11px;">
                    <i class="fa-solid fa-arrow-down"></i> Depositar
                </button>
                <button class="btn btn-secondary" onclick="floresWithdraw('${partner}')" style="flex:1;font-size:11px;">
                    <i class="fa-solid fa-arrow-up"></i> Retirar
                </button>
            </div>
        `;
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar bóveda</div>';
    }
}

async function floresDeposit(partner) {
    const amtStr = await showInputModal('Depositar a Bóveda Compartida', 'Cantidad de PPC', 'number');
    if (!amtStr) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt <= 0) return;

    const ok = await showConfirm('Depositar', `¿Depositar ${amt.toLocaleString()} PPC a la bóveda con ${partner}?`);
    if (!ok) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const vaultRef = window._fbDoc(window._db, 'vaults', vaultId);
        const vaultSnap = await window._fbGetDoc(vaultRef);

        if (!vaultSnap.exists()) {
            await window._fbSetDoc(vaultRef, { balance: amt, members: [currentUser.nick, partner], createdAt: window._fbServerTimestamp() });
        } else {
            await window._fbUpdateDoc(vaultRef, { balance: window._fbIncrement(amt) });
        }

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-amt) });
        await addTx({ type: 'Bóveda Pareja', from: currentUser.nick, to: 'Bóveda Compartida', amount: amt, note: `Depósito a bóveda con ${partner}` });

        showToast(`Depositaste ${amt.toLocaleString()} PPC 💕`, '#ff69b4');
        checkFloresAchievements();
        loadFloresVault(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function floresWithdraw(partner) {
    const amtStr = await showInputModal('Retirar de Bóveda', 'Cantidad de PPC', 'number');
    if (!amtStr) return;
    const amt = Math.floor(parseFloat(amtStr) || 0);
    if (amt <= 0) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const vaultRef = window._fbDoc(window._db, 'vaults', vaultId);
        const vaultSnap = await window._fbGetDoc(vaultRef);

        if (!vaultSnap.exists() || (vaultSnap.data().balance || 0) < amt) {
            showToast('Saldo insuficiente en bóveda', '#ff4466');
            return;
        }

        // Retiro seguro: montos grandes requieren aprobación de la pareja
        if (amt > FLORES_VAULT_SAFE_LIMIT) {
            const ok = await showConfirm('Retiro Seguro 🔐', `Retirar <strong>${amt.toLocaleString()} PPC</strong> supera el límite seguro de <strong>${FLORES_VAULT_SAFE_LIMIT.toLocaleString()} PPC</strong>.<br><br><strong>${partner}</strong> deberá aprobar la solicitud antes de que se efectúe.`, 'Solicitar');
            if (!ok) return;
            await window._fbAddDoc(window._fbCollection(window._db, 'flores_withdrawals'), {
                from: currentUser.nick,
                to: partner,
                amount: amt,
                vaultId,
                status: 'pending',
                timestamp: window._fbServerTimestamp()
            });
            showToast('Solicitud enviada — esperando aprobación 🔐', '#ff69b4');
            floresNotify(partner, '🔐 Retiro pendiente de aprobación', `${currentUser.nick} quiere retirar ${amt.toLocaleString()} PPC de la bóveda compartida. Aprueba o rechaza en Nobleza de las Flores.`);
            loadFloresPendingWithdrawals(partner);
            return;
        }

        await window._fbUpdateDoc(vaultRef, { balance: window._fbIncrement(-amt) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(amt) });
        await addTx({ type: 'Bóveda Pareja', from: 'Bóveda Compartida', to: currentUser.nick, amount: amt, note: `Retiro de bóveda con ${partner}` });

        showToast(`Retiraste ${amt.toLocaleString()} PPC 💕`, '#ff69b4');
        loadFloresVault(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── ACHIEVEMENTS ─────────── */

async function checkFloresAchievements() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const partner = userData.parejaWith;
        const startDate = userData.parejaStartDate;
        const earned = userData.floresAchievements || [];

        if (!partner) return;

        const days = getFloresDays(startDate);
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const vaultSnap = await window._fbGetDoc(window._fbDoc(window._db, 'vaults', vaultId));
        const vaultBalance = vaultSnap.exists() ? (vaultSnap.data().balance || 0) : 0;

        const letterSnap = await window._fbGetDocs(window._fbCollection(window._db, `vaults/${vaultId}/letters`));
        const letterCount = letterSnap.size;

        const newly = [];
        for (const ach of FLORES_ACHIEVEMENTS) {
            if (earned.includes(ach.id)) continue;
            if (ach.id === 'flores_first' && letterCount >= 1) newly.push(ach);
            if (ach.id === 'flores_30d' && days >= 30) newly.push(ach);
            if (ach.id === 'flores_90d' && days >= 90) newly.push(ach);
            if (ach.id === 'flores_180d' && days >= 180) newly.push(ach);
            if (ach.id === 'flores_365d' && days >= 365) newly.push(ach);
            if (ach.id === 'flores_letters_10' && letterCount >= 10) newly.push(ach);
            if (ach.id === 'flores_vault_1m' && vaultBalance >= 1000000) newly.push(ach);
            if (ach.id === 'flores_donor' && vaultBalance >= 100000) newly.push(ach);
        }

        if (!newly.length) return;

        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;

        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const finalReward = Math.round(totalReward * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            floresAchievements: [...earned, ...newly.map(x => x.id)]
        });

        showToast('🌸 ¡Logro Nobleza: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC', '#ff69b4');
    } catch(e) {
        console.error('Error checking flores achievements:', e);
    }
}

/* ─────────── DAILY BONUS ─────────── */

async function claimFloresDailyBonus() {
    if (!currentUser || !window._db) return;

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const partner = userData.parejaWith;
        const startDate = userData.parejaStartDate;
        const lastClaim = userData.floresLastBonus;

        if (!partner) { showToast('No tienes pareja para reclamar bonus', '#ff4466'); return; }

        // Check if already claimed today
        if (lastClaim) {
            const lastDate = lastClaim.toDate ? lastClaim.toDate() : new Date(lastClaim);
            const today = new Date();
            if (lastDate.toDateString() === today.toDateString()) {
                showToast('Ya reclamaste tu bonus de hoy 💕', '#ff69b4');
                return;
            }
        }

        const days = getFloresDays(startDate);
        const rank = getFloresRank(days);
        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
        const bonus = Math.round(rank.bonus * mult);

        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(bonus)
        });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            floresLastBonus: new Date().toISOString()
        });

        await addTx({ type: 'Bonus Pareja', from: 'Nobleza de las Flores', to: currentUser.nick, amount: bonus, note: `Bonus diario ${rank.label} (×${mult.toFixed(2)})` });

        showToast(`Bonus de ${rank.label}: +${bonus.toLocaleString()} PPC 💕`, '#ff69b4');
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── NOTIFICATIONS ─────────── */

async function floresNotify(to, title, body) {
    if (!window._db || !to) return;
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'notifications'), {
            to, title, body, read: false, timestamp: window._fbServerTimestamp()
        });
    } catch(e) {}
}

/* ─────────── DIVORCIO ─────────── */

async function floresDivorce() {
    if (!currentUser || !window._db) return;
    const partner = currentUser.parejaWith;
    if (!partner) return;

    const vaultId = [currentUser.nick, partner].sort().join('_');
    let vaultBalance = 0;
    try {
        const vSnap = await window._fbGetDoc(window._fbDoc(window._db, 'vaults', vaultId));
        if (vSnap.exists()) vaultBalance = vSnap.data().balance || 0;
    } catch(e) {}

    const half = Math.floor(vaultBalance / 2);
    const ok = await showConfirm('💔 Divorcio', `¿Seguro que quieres terminar la relación con <strong>${partner}</strong>?<br><br>La bóveda compartida (<strong>${vaultBalance.toLocaleString()} PPC</strong>) se repartirá 50/50: cada uno recibirá <strong>${half.toLocaleString()} PPC</strong>.`, 'Divorciarme');
    if (!ok) return;

    try {
        const [acc1Snap, acc2Snap] = await Promise.all([
            window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick)),
            window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', partner))
        ]);
        const bal1 = acc1Snap.exists() ? (acc1Snap.data().balance || 0) : 0;
        const bal2 = acc2Snap.exists() ? (acc2Snap.data().balance || 0) : 0;
        const remainder = vaultBalance - half * 2;

        const batch = window._fbWriteBatch(window._db);
        batch.update(window._fbDoc(window._db, 'users', currentUser.nick), { parejaWith: null, parejaStartDate: null });
        batch.update(window._fbDoc(window._db, 'users', partner), { parejaWith: null, parejaStartDate: null });
        batch.update(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: bal1 + half + remainder });
        batch.update(window._fbDoc(window._db, 'bank_accounts', partner), { balance: bal2 + half });
        if (vaultBalance > 0) batch.update(window._fbDoc(window._db, 'vaults', vaultId), { balance: 0, members: [] });
        await batch.commit();

        if (vaultBalance > 0) {
            await addTx({ type: 'Divorcio', from: 'Bóveda Compartida', to: currentUser.nick, amount: half + remainder, note: `Reparto 50/50 tras divorcio con ${partner}` });
            await addTx({ type: 'Divorcio', from: 'Bóveda Compartida', to: partner, amount: half, note: `Reparto 50/50 tras divorcio con ${currentUser.nick}` });
        }

        currentUser.parejaWith = null;
        currentUser.parejaStartDate = null;
        stopFloresChatPolling();
        showToast('Relación terminada 💔', '#ff4466');
        floresNotify(partner, '💔 Divorcio', `${currentUser.nick} terminó la relación. La bóveda se repartió 50/50.`);
        loadFloresPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── REGALOS ─────────── */

function showFloresGiftsModal(partner) {
    const existing = document.getElementById('flores-gifts-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'flores-gifts-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal glass-card" style="max-width:560px;">
            <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:5px;text-align:center;">
                <i class="fa-solid fa-gift"></i> Regalos para ${escHTML(partner)}
            </h3>
            <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-bottom:15px;">Elige un regalo, se envía al instante y se registra en el historial.</p>
            <div style="display:flex;flex-direction:column;gap:8px;max-height:55vh;overflow-y:auto;padding-right:4px;">
                ${FLORES_GIFTS.map(g => `
                    <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.04);border:1px solid ${g.color}33;border-radius:10px;padding:10px 12px;">
                        <div style="width:38px;height:38px;border-radius:50%;background:${g.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="${g.icon}" style="color:${g.color};font-size:16px;"></i>
                        </div>
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:700;color:var(--text-main);font-size:13px;">${g.name}</div>
                            <div style="font-size:10px;color:var(--text-muted);">${g.desc}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:12px;">${g.price.toLocaleString()} PPC</div>
                            <button class="btn btn-primary" style="font-size:10px;padding:5px 12px;margin-top:4px;" onclick="floresSendGift('${partner}','${g.id}')">Enviar</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:15px;">
                <button class="btn btn-secondary" onclick="closeFloresGiftsModal()">Cerrar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeFloresGiftsModal() {
    const m = document.getElementById('flores-gifts-modal');
    if (m) m.remove();
}

async function floresSendGift(partner, giftId) {
    const gift = FLORES_GIFTS.find(g => g.id === giftId);
    if (!gift) return;

    const accSnap = await window._fbGetDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick));
    const balance = accSnap.exists() ? (accSnap.data().balance || 0) : 0;
    if (balance < gift.price) { showToast('No tienes suficientes PPC', '#ff4466'); return; }

    const ok = await showConfirm('Enviar Regalo', `¿Enviar <strong>${gift.name}</strong> a <strong>${escHTML(partner)}</strong> por <strong>${gift.price.toLocaleString()} PPC</strong>?`, 'Enviar');
    if (!ok) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-gift.price) });
        await window._fbAddDoc(window._fbCollection(window._db, `vaults/${vaultId}/gifts`), {
            from: currentUser.nick,
            to: partner,
            giftId: gift.id,
            giftName: gift.name,
            giftIcon: gift.icon,
            giftColor: gift.color,
            price: gift.price,
            timestamp: window._fbServerTimestamp()
        });
        await addTx({ type: 'Regalo Pareja', from: currentUser.nick, to: partner, amount: gift.price, note: `Regalo: ${gift.name}` });
        closeFloresGiftsModal();
        showToast(`Enviaste ${gift.name} a ${partner} 🎁`, '#ff69b4');
        floresNotify(partner, '¡Recibiste un regalo! 🎁', `${currentUser.nick} te envió: ${gift.name}.`);
        loadFloresGifts(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function loadFloresGifts(partner) {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('flores-gifts-list');
    if (!container) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const snap = await window._fbGetDocs(window._fbCollection(window._db, `vaults/${vaultId}/gifts`));
        const gifts = [];
        snap.forEach(d => {
            const x = d.data();
            gifts.push({ ...x, date: x.timestamp ? new Date(x.timestamp) : new Date() });
        });
        gifts.sort((a, b) => b.date - a.date);

        if (!gifts.length) {
            container.innerHTML = '<div class="empty-msg">Aún no hay regalos 🎁</div>';
            return;
        }

        container.innerHTML = gifts.slice(0, 5).map(g => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;background:rgba(255,255,255,0.04);margin-bottom:6px;">
                <i class="${g.giftIcon}" style="color:${g.giftColor};font-size:14px;flex-shrink:0;"></i>
                <div style="flex:1;font-size:11px;color:var(--text-main);min-width:0;">
                    <span><strong style="color:${g.from === currentUser.nick ? 'var(--primary)' : 'var(--danger)'};">${escHTML(g.from)}</strong> → ${escHTML(g.to)}</span>
                    <span style="display:block;font-size:9px;color:var(--text-muted);">${escHTML(g.giftName)} • ${g.date.toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error cargando regalos</div>';
    }
}

/* ─────────── RETIRO SEGURO (aprobación) ─────────── */

async function loadFloresPendingWithdrawals(partner) {
    if (!currentUser || !window._db) return;
    const el = document.getElementById('flores-pending-withdrawals');
    if (!el) return;

    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'flores_withdrawals'));
        const all = [];
        snap.forEach(d => { const x = d.data(); all.push({ id: d.id, ...x }); });

        const toApprove = all.filter(w => w.status === 'pending' && w.to === currentUser.nick && w.from === partner);
        const mine = all.filter(w => w.status === 'pending' && w.from === currentUser.nick);

        let html = '';
        if (toApprove.length) {
            html += `
                <div class="glass-card" style="border-color:var(--gold);margin-bottom:15px;">
                    <h3 style="font-family:'Orbitron',sans-serif;color:var(--gold);font-size:13px;margin-bottom:12px;">
                        <i class="fa-solid fa-shield-halved"></i> Retiros por aprobar
                    </h3>
                    ${toApprove.map(w => `
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:rgba(255,215,0,0.06);border-radius:8px;padding:10px 12px;margin-bottom:8px;flex-wrap:wrap;">
                            <div style="font-size:12px;color:var(--text-main);">
                                <strong style="color:var(--gold);">${escHTML(w.from)}</strong> quiere retirar
                                <strong style="color:var(--gold);">${(w.amount||0).toLocaleString()} PPC</strong>
                            </div>
                            <div style="display:flex;gap:6px;">
                                <button class="btn btn-primary" style="font-size:10px;padding:5px 10px;" onclick="floresApproveWithdrawal('${w.id}','${partner}')"><i class="fa-solid fa-check"></i> Aprobar</button>
                                <button class="btn btn-secondary" style="font-size:10px;padding:5px 10px;" onclick="floresRejectWithdrawal('${w.id}','${partner}')"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>`;
        }
        if (mine.length) {
            html += `
                <div class="glass-card" style="border-color:#60a5fa;margin-bottom:15px;">
                    <h3 style="font-family:'Orbitron',sans-serif;color:#60a5fa;font-size:13px;margin-bottom:12px;">
                        <i class="fa-solid fa-hourglass-half"></i> Tus retiros en espera
                    </h3>
                    ${mine.map(w => `
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:rgba(96,165,250,0.06);border-radius:8px;padding:10px 12px;margin-bottom:8px;flex-wrap:wrap;">
                            <div style="font-size:12px;color:var(--text-main);">
                                Retiro de <strong style="color:#60a5fa;">${(w.amount||0).toLocaleString()} PPC</strong> esperando a <strong>${escHTML(w.to)}</strong>
                            </div>
                            <button class="btn btn-secondary" style="font-size:10px;padding:5px 10px;" onclick="floresCancelWithdrawal('${w.id}','${partner}')">Cancelar</button>
                        </div>
                    `).join('')}
                </div>`;
        }
        el.innerHTML = html;
    } catch(e) {
        el.innerHTML = '';
    }
}

async function floresApproveWithdrawal(id, partner) {
    const wSnap = await window._fbGetDoc(window._fbDoc(window._db, 'flores_withdrawals', id));
    if (!wSnap.exists()) { showToast('Solicitud no encontrada', '#ff4466'); return; }
    const w = wSnap.data();

    const ok = await showConfirm('Aprobar Retiro', `¿Aprobar el retiro de <strong>${(w.amount||0).toLocaleString()} PPC</strong> solicitado por <strong>${escHTML(w.from)}</strong>?`, 'Aprobar');
    if (!ok) return;

    try {
        const vaultRef = window._fbDoc(window._db, 'vaults', w.vaultId);
        const vaultSnap = await window._fbGetDoc(vaultRef);
        const vaultBalance = vaultSnap.exists() ? (vaultSnap.data().balance || 0) : 0;
        if (vaultBalance < w.amount) { showToast('Bóveda insuficiente', '#ff4466'); return; }

        await window._fbUpdateDoc(vaultRef, { balance: window._fbIncrement(-w.amount) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', w.from), { balance: window._fbIncrement(w.amount) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'flores_withdrawals', id), { status: 'approved' });
        await addTx({ type: 'Bóveda Pareja', from: 'Bóveda Compartida', to: w.from, amount: w.amount, note: `Retiro aprobado por ${currentUser.nick}` });

        showToast('Retiro aprobado ✓', '#22c55e');
        floresNotify(w.from, '✅ Retiro aprobado', `${currentUser.nick} aprobó tu retiro de ${(w.amount||0).toLocaleString()} PPC.`);
        loadFloresPendingWithdrawals(partner);
        loadFloresVault(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function floresRejectWithdrawal(id, partner) {
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'flores_withdrawals', id), { status: 'rejected' });
        showToast('Retiro rechazado', '#ff4466');
        loadFloresPendingWithdrawals(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function floresCancelWithdrawal(id, partner) {
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'flores_withdrawals', id), { status: 'cancelled' });
        showToast('Solicitud cancelada', '#ff69b4');
        loadFloresPendingWithdrawals(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── RACHA DE CARTAS ─────────── */

const FLORES_STREAK_REWARDS = [
    { streak: 3,   reward: 150   },
    { streak: 7,   reward: 500   },
    { streak: 14,  reward: 1200  },
    { streak: 30,  reward: 3000  },
    { streak: 60,  reward: 6000  },
    { streak: 90,  reward: 10000 },
    { streak: 180, reward: 25000 },
    { streak: 365, reward: 60000 }
];

async function updateFloresLetterStreak(vaultId) {
    if (!window._db) return;
    try {
        const vaultRef = window._fbDoc(window._db, 'vaults', vaultId);
        const vSnap = await window._fbGetDoc(vaultRef);
        if (!vSnap.exists()) {
            await window._fbSetDoc(vaultRef, { balance: 0, members: null, streak: 1, streakLast: new Date().toISOString().split('T')[0], streakBest: 1, streakRewards: [] });
            return;
        }

        const v = vSnap.data();
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
        const lastKey = v.streakLast || '';
        if (lastKey === todayKey) return;

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;
        const streak = lastKey === yesKey ? (v.streak || 0) + 1 : 1;
        const best = Math.max(v.streakBest || 0, streak);
        const rewards = v.streakRewards || [];

        await window._fbUpdateDoc(vaultRef, { streak, streakLast: todayKey, streakBest: best });

        const milestone = FLORES_STREAK_REWARDS.find(r => r.streak === streak);
        if (milestone && !rewards.includes(milestone.streak)) {
            const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
            const reward = Math.round(milestone.reward * mult);
            await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(reward) });
            await window._fbUpdateDoc(vaultRef, { streakRewards: [...rewards, milestone.streak] });
            await addTx({ type: 'Racha Pareja', from: 'Nobleza de las Flores', to: currentUser.nick, amount: reward, note: `Racha de ${streak} días de cartas` });
            showToast(`🔥 ¡Racha de ${streak} días! +${reward.toLocaleString()} PPC`, '#ff69b4');
            floresNotify(currentUser.parejaWith || '', '🔥 Racha de cartas', `${currentUser.nick} alcanzó ${streak} días de racha enviando cartas.`);
        }
    } catch(e) {
        console.error('Streak error:', e);
    }
}

/* ─────────── ANIVERSARIOS ─────────── */

async function checkFloresAnniversaryBonus() {
    if (!currentUser || !window._db) return;
    const partner = currentUser.parejaWith;
    const startDate = currentUser.parejaStartDate;
    if (!partner || !startDate) return;

    const days = getFloresDays(startDate);
    const months = Math.floor(days / 30);
    if (months < 1) return;

    let claimed = currentUser.floresAnniversaryClaimed || [];
    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        if (userSnap.exists()) claimed = userSnap.data().floresAnniversaryClaimed || [];
    } catch(e) {}
    const newly = [];
    for (let m = 1; m <= months; m++) {
        const key = 'm' + m;
        if (claimed.includes(key)) continue;
        newly.push({ key, reward: (m % 12 === 0) ? 10000 * (m / 12) : 250 + (m - 1) * 50 });
    }
    if (!newly.length) return;

    const total = newly.reduce((s, n) => s + n.reward, 0);
    const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(currentUser) : 1;
    const finalReward = Math.round(total * mult);

    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { floresAnniversaryClaimed: [...claimed, ...newly.map(n => n.key)] });
        currentUser.floresAnniversaryClaimed = [...claimed, ...newly.map(n => n.key)];
        await addTx({ type: 'Aniversario Pareja', from: 'Nobleza de las Flores', to: currentUser.nick, amount: finalReward, note: `Aniversarios: ${newly.length} mes(es) de relación con ${partner}` });
        showToast(`💐 ¡Aniversario! +${finalReward.toLocaleString()} PPC`, '#ff69b4');
    } catch(e) {
        console.error('Anniversary error:', e);
    }
}

/* ─────────── CUMPLEAÑOS DE LA PAREJA ─────────── */

const FLORES_PARTNER_BIRTHDAY_BONUS = 15000;

async function loadFloresPartnerBirthday(partner) {
    const el = document.getElementById('flores-birthday-info');
    if (!el || !window._db) return;
    try {
        const snap = await window._fbGetDoc(window._fbDoc(window._db, 'users', partner));
        const bd = snap.exists() ? (snap.data().birthday || null) : null;
        if (!bd) { el.innerHTML = ''; return; }

        const d = new Date(bd);
        const today = new Date();
        const isToday = today.getMonth() === d.getMonth() && today.getDate() === d.getDate();
        const meSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const claimed = meSnap.exists() ? (meSnap.data().floresPartnerBirthdayClaimed === String(today.getFullYear())) : false;

        el.innerHTML = isToday
            ? `<div style="background:linear-gradient(135deg,rgba(236,72,153,0.2),rgba(0,0,0,0));border:1px solid rgba(236,72,153,0.4);border-radius:12px;padding:14px;text-align:center;margin-bottom:15px;">
                 <div style="font-size:26px;">🎂🎉</div>
                 <div style="font-size:13px;color:var(--text-main);margin-top:6px;">¡HOY es el cumpleaños de <strong style="color:#ec4899;">${escHTML(partner)}</strong>!</div>
                 ${claimed
                    ? `<div style="font-size:11px;color:var(--text-muted);margin-top:8px;">Ya reclamaste el bono de este año 💕</div>`
                    : `<button class="btn btn-primary" style="margin-top:10px;font-size:11px;" onclick="claimFloresPartnerBirthday('${partner}')"><i class="fa-solid fa-cake-candles"></i> Reclamar bono +${FLORES_PARTNER_BIRTHDAY_BONUS.toLocaleString()} PPC</button>`}
               </div>`
            : `<div style="background:rgba(255,255,255,0.03);border:1px solid var(--dark-border);border-radius:12px;padding:10px 14px;text-align:center;margin-bottom:15px;">
                 <div style="font-size:11px;color:var(--text-muted);">🎂 Cumpleaños de <strong style="color:var(--primary);">${escHTML(partner)}</strong>: <strong style="color:#ec4899;">${d.getDate()} de ${MONTHS_ES[d.getMonth()]}</strong></div>
               </div>`;
    } catch(e) {
        el.innerHTML = '';
    }
}

async function claimFloresPartnerBirthday(partner) {
    const year = String(new Date().getFullYear());
    if (currentUser.floresPartnerBirthdayClaimed === year) { showToast('Ya reclamaste el bono de este año', '#ff69b4'); return; }
    try {
        const meSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        if (meSnap.exists() && meSnap.data().floresPartnerBirthdayClaimed === year) { showToast('Ya reclamaste el bono de este año', '#ff69b4'); return; }
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(FLORES_PARTNER_BIRTHDAY_BONUS) });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { floresPartnerBirthdayClaimed: year });
        currentUser.floresPartnerBirthdayClaimed = year;
        await addTx({ type: 'Cumpleaños Pareja', from: 'Nobleza de las Flores', to: currentUser.nick, amount: FLORES_PARTNER_BIRTHDAY_BONUS, note: `Cumpleaños de ${partner}` });
        showToast(`🎉 Cumple de ${partner}: +${FLORES_PARTNER_BIRTHDAY_BONUS.toLocaleString()} PPC`, '#ec4899');
        floresNotify(partner, '🎂 ¡Feliz Cumpleaños!', `${currentUser.nick} celebró tu cumpleaños y ganó ${FLORES_PARTNER_BIRTHDAY_BONUS.toLocaleString()} PPC.`);
        loadFloresPartnerBirthday(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── CHAT DE PAREJA ─────────── */

async function floresSendChat(partner) {
    if (!currentUser || !window._db) return;
    const input = document.getElementById('flores-chat-input');
    const msg = (input ? input.value : '').trim();
    if (!msg) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        await window._fbAddDoc(window._fbCollection(window._db, `vaults/${vaultId}/chat`), {
            from: currentUser.nick,
            msg,
            timestamp: window._fbServerTimestamp()
        });
        if (input) input.value = '';
        loadFloresChat(partner);
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

async function loadFloresChat(partner) {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('flores-chat-messages');
    if (!container) return;

    try {
        const vaultId = [currentUser.nick, partner].sort().join('_');
        const snap = await window._fbGetDocs(window._fbCollection(window._db, `vaults/${vaultId}/chat`));
        const msgs = [];
        snap.forEach(d => {
            const x = d.data();
            msgs.push({ ...x, date: x.timestamp ? new Date(x.timestamp) : new Date() });
        });
        msgs.sort((a, b) => a.date - b.date);

        container.innerHTML = msgs.length ? msgs.map(m => {
            const mine = m.from === currentUser.nick;
            const time = m.date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
            return `
                <div style="display:flex;justify-content:${mine ? 'flex-end' : 'flex-start'};margin-bottom:6px;">
                    <div style="max-width:82%;background:${mine ? 'rgba(0,255,170,0.12)' : 'rgba(255,255,255,0.06)'};border-radius:10px;padding:6px 10px;border-top-${mine ? 'right' : 'left'}-radius:2px;">
                        <div style="font-size:9px;font-weight:700;color:${mine ? 'var(--secondary)' : 'var(--danger)'};">${mine ? 'Tú' : escHTML(m.from)} <span style="font-weight:400;color:var(--text-muted);">${time}</span></div>
                        <div style="font-size:12px;color:var(--text-main);margin-top:2px;word-break:break-word;">${escHTML(m.msg)}</div>
                    </div>
                </div>`;
        }).join('') : '<div class="empty-msg" style="font-size:10px;">Empieza la conversación 💕</div>';
        container.scrollTop = container.scrollHeight;
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger);font-size:10px;">Error cargando chat</div>';
    }
}

function startFloresChatPolling(partner) {
    stopFloresChatPolling();
    _floresChatTimer = setInterval(() => {
        const page = document.getElementById('page-flores');
        if (page && page.classList.contains('active') && document.getElementById('flores-chat-messages')) {
            loadFloresChat(partner);
        }
    }, 5000);
}

function stopFloresChatPolling() {
    if (_floresChatTimer) {
        clearInterval(_floresChatTimer);
        _floresChatTimer = null;
    }
}
