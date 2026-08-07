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

/* ─────────── STATE ─────────── */
let _floresRequestTarget = null;

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

    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const userData = userSnap.exists() ? userSnap.data() : {};
        const partner = userData.parejaWith;
        const startDate = userData.parejaStartDate;

        if (!partner) {
            renderFloresEmpty(container);
            return;
        }

        const days = getFloresDays(startDate);
        const rank = getFloresRank(days);
        const nextRank = FLORES_RANKS.find(r => r.days > days);

        renderFloresPartner(container, partner, days, rank, nextRank, startDate);
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

        <div class="glass-card" style="max-width:800px;margin:20px auto 0 auto;">
            <h3 style="font-family:'Orbitron',sans-serif;color:var(--danger);margin-bottom:15px;">
                <i class="fa-solid fa-inbox"></i> Cartas Recibidas
            </h3>
            <div id="flores-letters-list"></div>
        </div>
    `;

    loadFloresVault(partner);
    loadFloresLetters(partner);
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
    loadFloresUserList();
}

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
        logAudit(currentUser.nick, `Pareja asignada: ${user1} + ${user2}`);
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
        showToast(`¡Ahora eres pareja de ${req.from}! 💕`, '#ff69b4');
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
            letters.push({ ...data, date: data.timestamp ? data.timestamp.toDate() : new Date() });
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
        if (vaultSnap.exists()) {
            balance = vaultSnap.data().balance || 0;
        }

        container.innerHTML = `
            <div style="text-align:center;margin-bottom:15px;">
                <div style="font-size:28px;font-family:'Orbitron',sans-serif;color:var(--gold);">${balance.toLocaleString()} PPC</div>
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
