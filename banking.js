/* Core Banking Engine: Transactions, Leaderboard, Loans, Debts, Investments, and Bill Splits */

function isTrue(v) {
    return v === true || v === 'true' || v === 1 || v === '1';
}

function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function fmt(n) {
    return Number(n || 0).toLocaleString('es') + ' PPC';
}

function genAccountNumber(nick) {
    let h = 0;
    for (let i = 0; i < nick.length; i++) h = ((h << 5) - h) + nick.charCodeAt(i);
    const num = Math.abs(h >>> 0).toString().padStart(12, '0');
    return num.slice(0, 4) + ' ' + num.slice(4, 8) + ' ' + num.slice(8, 12);
}

function hashPass(p, salt) {
    const salted = (salt || '') + p + (salt || '').split('').reverse().join('');
    let h = 5381;
    for (let i = 0; i < salted.length; i++) h = ((h << 5) + h) ^ salted.charCodeAt(i);
    let h2 = 0x811c9dc5;
    for (let i = 0; i < salted.length; i++) h2 = Math.imul(h2 ^ salted.charCodeAt(i), 0x01000193);
    return 's2_' + (h >>> 0).toString(36) + (h2 >>> 0).toString(36) + salted.length.toString(36);
}

function getBankTier(balance) {
    const tiers = [
        { min: 50000, label: '🐐 Papu God', cls: 'tier-tag gold' },
        { min: 10000, label: 'Papu Millonario', cls: 'tier-tag gold' },
        { min: 5000,  label: 'Papu Rico', cls: 'tier-tag gold' },
        { min: 2000,  label: 'Papu Decente', cls: 'tier-tag blue' },
        { min: 500,   label: 'Papu Normal', cls: 'tier-tag blue' },
        { min: 0,     label: 'Papu Pobre', cls: 'tier-tag blue' }
    ];
    return tiers.find(t => balance >= t.min) || tiers[tiers.length - 1];
}

// Global Transaction logger
async function addTx(opts) {
    if (!window._db) return;
    try {
        const db = window._db;
        const txData = {
            type: opts.type || 'transfer',
            from: opts.from || 'Sistema',
            to: opts.to || 'Sistema',
            amount: opts.amount || 0,
            note: opts.note || '',
            timestamp: window._fbServerTimestamp()
        };
        await window._fbAddDoc(window._fbCollection(db, 'transactions'), txData);
    } catch(e) {
        console.error("Error adding transaction:", e);
    }
}

// ═══════════════════════════ TRANSFERS ═══════════════════════════

let selectedTransferRecipient = null;

async function loadTransferUsers() {
    if (!currentUser) return;
    const grid = document.getElementById('transfer-users-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando usuarios...</div>';
    
    try {
        const snap = await getCachedUsers();
        grid.innerHTML = '';
        
        snap.forEach(doc => {
            const user = doc.data();
            const nick = doc.id;
            
            if (nick === currentUser.nick) return; // Cannot transfer to yourself
            
            const card = document.createElement('div');
            card.className = `user-select-card ${selectedTransferRecipient === nick ? 'selected' : ''}`;
            card.onclick = () => selectTransferRecipient(nick, card);
            
            // Check avatar
            const avatarSrc = user.avatar ? user.avatar : 'avt_gojo.jpg';
            card.innerHTML = `
                <img class="user-select-avatar" src="${esc(avatarSrc)}" alt="${esc(nick)}">
                <div class="user-select-name">${esc(nick)}</div>
            `;
            grid.appendChild(card);
        });
        
        // Populate select list too
        const select = document.getElementById('transfer-to');
        if (select) {
            select.innerHTML = '<option value="">-- Elige destinatario --</option>';
            snap.forEach(doc => {
                const nick = doc.id;
                if (nick !== currentUser.nick) {
                    select.innerHTML += `<option value="${esc(nick)}" ${selectedTransferRecipient === nick ? 'selected' : ''}>${esc(nick)}</option>`;
                }
            });
        }
    } catch(e) {
        console.error(e);
        grid.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar usuarios</div>';
    }
}

function selectTransferRecipient(nick, element) {
    selectedTransferRecipient = nick;
    document.querySelectorAll('.user-select-card').forEach(c => c.classList.remove('selected'));
    if (element) element.classList.add('selected');
    
    const select = document.getElementById('transfer-to');
    if (select) select.value = nick;
    
    updateTransferPreview();
}

function updateTransferPreview() {
    const amtInput = document.getElementById('transfer-amount');
    if (!amtInput || !currentUser) return;

    const rankKey = getRankKey(currentUser);
    const noFeeEvent = (typeof hasActiveEvent === 'function' && hasActiveEvent('sin_comision'));
    const feeRate = (noFeeEvent || RANKS[rankKey].level >= 4) ? 0 : (bankConfig.fee / 100);

    const feePctLabel = document.getElementById('fee-pct-label');
    if (feePctLabel) {
        if (noFeeEvent) feePctLabel.textContent = '0 (evento activo)';
        else if (RANKS[rankKey].level >= 4) feePctLabel.textContent = '0 (rango alto)';
        else feePctLabel.textContent = String(bankConfig.fee || 2);
    }
}

async function doTransfer() {
    if (!bankAccount || !currentUser || !window._db) return;
    
    const toSelect = document.getElementById('transfer-to');
    const toNick = selectedTransferRecipient || (toSelect ? toSelect.value : '') || '';
    const amtInput = document.getElementById('transfer-amount');
    const amt = Math.floor(parseFloat(amtInput.value) || 0);
    const noteInput = document.getElementById('transfer-note');
    const note = (noteInput.value || '').trim();
    const btn = document.getElementById('transfer-btn');

    if (!toNick)  { showToast('Selecciona un destinatario', '#ff4466'); return; }
    if (amt < 1)  { showToast('Ingresa una cantidad válida', '#ff4466'); return; }
    if (toNick.toLowerCase() === currentUser.nick.toLowerCase()) { showToast('No puedes transferirte a ti mismo', '#ff4466'); return; }

    const rankKey = getRankKey(currentUser);
    const noFeeEvent = (typeof hasActiveEvent === 'function' && hasActiveEvent('sin_comision'));
    const feeRate = (noFeeEvent || RANKS[rankKey].level >= 4) ? 0 : (bankConfig.fee / 100);
    const fee = Math.floor(amt * feeRate);
    const total = amt + fee;

    if (isTrue(bankAccount.frozen)) { showToast('Tu cuenta está congelada 🔒', '#ff4466'); return; }
    if ((bankAccount.balance || 0) < total) { showToast('Saldo insuficiente 💀', '#ff4466'); return; }

    const ok = await showConfirm(
        '💸 Confirmar Transferencia',
        `Enviarás <strong style="color:var(--gold)">${amt.toLocaleString()} PPC</strong> a <strong style="color:var(--primary)">${toNick}</strong><br>
        ${fee > 0 ? `Comisión: <strong style="color:var(--danger)">${fee.toLocaleString()} PPC</strong>` : '<span style="color:var(--secondary)">Sin comisión (Rango alto)</span>'}<br>
        Total deducido: <strong>${total.toLocaleString()} PPC</strong>`,
        '✅ Confirmar'
    );
    if (!ok) return;

    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
        await apiFetch('POST', '/bank/transfer', { to: toNick, amount: amt, note: note || `Transferencia de ${currentUser.nick}` });

        if (amtInput) amtInput.value = '';
        if (noteInput) noteInput.value = '';
        const previewEl = document.getElementById('transfer-preview');
        if (previewEl) previewEl.style.display = 'none';
        selectedTransferRecipient = null;

        showToast(`¡${fmt(amt)} enviados a ${toNick}!`, '#00ff9d');
        try { await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { failedTransferStreak: 0 }); } catch(e) {}
        if (window.trackActivity) window.trackActivity('transfer', amt);
        if (typeof checkAchievements === 'function') checkAchievements();
        await refreshBankAccount();
        await loadTransferUsers();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) {
        try { await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), { failedTransferStreak: window._fbIncrement(1) }); } catch(e2) {}
        if (typeof checkSecretAchievements === 'function') checkSecretAchievements();
        showToast('Error: ' + e.message, '#ff4466');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Confirmar transferencia';
    }
}

// ═══════════════════════════ LEADERBOARD ═══════════════════════════

async function loadLeaderboard(filter) {
    if (!window._db) return;
    const container = document.getElementById('lb-list');
    if (!container) return;
    
    // Default to 'users' if no filter
    const mode = filter || 'users';
    
    // Update tab styles
    const tabUsers = document.getElementById('lb-tab-users');
    const tabAdmins = document.getElementById('lb-tab-admins');
    if (tabUsers) { tabUsers.className = mode === 'users' ? 'btn btn-primary' : 'btn btn-secondary'; }
    if (tabAdmins) { tabAdmins.className = mode === 'admins' ? 'btn btn-primary' : 'btn btn-secondary'; }
    
    container.innerHTML = '<tr><td colspan="5" class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando Ranking...</td></tr>';
    
    try {
        const data = await apiFetch('GET', '/leaderboard?limit=50');

        let entries = [];
        if (Array.isArray(data)) {
            entries = data;
        } else if (data.accounts || data.users) {
            const usersMap = data.users || {};
            const accounts = Array.isArray(data.accounts) ? data.accounts : [];
            entries = accounts.map(a => {
                const u = usersMap[a.id || a.nick] || {};
                return { ...u, ...a, nick: a.id || a.nick };
            });
        }

        const needEnrich = entries.filter(e => !e.nick_color && !e.nickColor);
        if (needEnrich.length > 0 && needEnrich.length <= 50) {
            try {
                const allUsers = await apiFetch('GET', '/users');
                let userMap = {};
                if (Array.isArray(allUsers)) {
                    allUsers.forEach(u => { userMap[u.nick] = u; });
                } else if (allUsers && typeof allUsers === 'object') {
                    userMap = allUsers;
                }
                entries.forEach(e => {
                    const u = userMap[e.nick];
                    if (u) {
                        if (!e.nick_color && !e.nickColor) e.nick_color = u.nick_color || u.nickColor || null;
                        if (!e.profileRing && !e.profile_ring) e.profileRing = u.profileRing || u.profile_ring || null;
                        if (!e.active_title && !e.activeTitle) e.active_title = u.active_title || u.activeTitle || null;
                        if (!e.avatar) e.avatar = u.avatar || null;
                    }
                });
            } catch(e) {}
        }

        entries.sort((a, b) => {
            const balA = parseFloat(a.balance) || 0;
            const balB = parseFloat(b.balance) || 0;
            return balB - balA;
        });

        const adminRoles = ['owner', 'admin', 'mod', 'helper'];
        const filtered = entries.filter(entry => {
            const rKey = getRankKey(entry);
            const isAdmin = adminRoles.includes(rKey);
            return mode === 'admins' ? isAdmin : !isAdmin;
        });

        let html = '';
        filtered.forEach((entry, idx) => {
            const nick    = entry.nick;
            const balance = parseFloat(entry.balance) || 0;
            const tier    = getBankTier(balance);
            const isMine  = nick === (currentUser ? currentUser.nick : '');

            const rKey        = getRankKey(entry);
            const rankInfo    = RANKS[rKey] || RANKS.user;

            const avatarSrc = entry.avatar || 'avt_gojo.jpg';
            const nickSafe = esc(nick);

            const nickColor = entry.nick_color || entry.nickColor || '';
            const nickColorClass = ['rainbow','fire','ice','neon','gold'].includes(nickColor) ? ' nick-' + nickColor : '';
            const nameColorStyle = (nick === 'emilio' || nick === 'insanlj5')
                ? 'color: var(--purple); font-weight: bold;'
                : (entry.jjkRank === 'gojo'
                    ? 'color: var(--primary); font-weight: bold; text-shadow:0 0 10px var(--primary-glow);'
                    : (entry.jjkRank === 'sukuna' ? 'color: var(--danger); font-weight: bold;' : ''));
            const ringKey = entry.profileRing || 'none';
            const ringData = getRingData ? getRingData(ringKey) : { key: 'none' };
            const ringBorder = ringData.key !== 'none' ? (ringData.color === 'rainbow' ? 'border:3px solid transparent;background:linear-gradient(var(--dark-bg),var(--dark-bg)) padding-box,linear-gradient(90deg,#ff0000,#ff8800,#ffff00,#00ff00,#0088ff,#8800ff) border-box;' : `border:3px solid ${ringData.color};box-shadow:0 0 6px ${ringData.color}60;`) : '';

            let positionLabel = `#${idx + 1}`;
            if (idx === 0) positionLabel = '<i class="fa-solid fa-trophy" style="color:var(--gold)"></i>';
            else if (idx === 1) positionLabel = '<i class="fa-solid fa-trophy" style="color:#c0c0c0"></i>';
            else if (idx === 2) positionLabel = '<i class="fa-solid fa-trophy" style="color:#cd7f32"></i>';

            html += `
                <tr style="${isMine ? 'background: rgba(0, 212, 255, 0.05); font-weight: bold;' : ''}">
                    <td>${positionLabel}</td>
                    <td>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <div style="position:relative; display:inline-block; width:32px; height:32px;">
                                <img src="${esc(avatarSrc)}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; ${ringBorder}">
                                ${entry.mcUsername ? `<img src="https://mc-heads.net/head/${esc(entry.mcUsername)}/18" style="position:absolute; right:-4px; bottom:-4px; width:18px; height:18px; filter:drop-shadow(0 0 4px var(--primary-glow)); z-index:2;" title="MC: ${esc(entry.mcUsername)}">` : ''}
                            </div>
                            <span class="${nickColorClass}" style="${nameColorStyle}">${nickSafe}</span>
                            ${entry.active_title ? `<span style="font-size:8px;color:var(--gold);font-style:italic;">「${esc(entry.active_title)}」</span>` : ''}
                            ${isMine ? '<span style="font-size:9px; background:var(--primary); color:#000; padding:1px 4px; border-radius:3px;">TÚ</span>' : ''}
                            <button class="btn-icon" style="font-size:11px; color:var(--primary);" onclick="viewUserProfile('${nick.replace(/'/g, "\\'")}')" title="Ver perfil y comentar"><i class="fa-solid fa-comment"></i></button>
                        </div>
                    </td>
                    <td>
                        <span class="badge-tag ${rankInfo.cls}" style="font-size:9px;">
                            <i class="${rankInfo.icon}"></i> ${rankInfo.label}
                        </span>
                    </td>
                    <td><span class="${tier.cls}">${tier.label}</span></td>
                    <td style="font-family:'Orbitron',sans-serif; color:var(--gold); text-align:right;">${balance.toLocaleString()} PPC</td>
                </tr>
            `;
        });

        container.innerHTML = html || '<tr><td colspan="5" class="text-center">No hay cuentas bancarias registradas</td></tr>';
    } catch(e) {
        console.error('Leaderboard error:', e);
        container.innerHTML = '<tr><td colspan="5" class="text-center" style="color:var(--danger)">Error al cargar ranking: ' + e.message + '</td></tr>';
    }
}

// ═══════════════════════════ HISTORIAL RECIENTE ═══════════════════════════


let _txPage = 0;
const _TX_PAGE_SIZE = 15;

async function loadRecentTx() {
    if (!currentUser) return;
    const container = document.getElementById('recent-tx-list');
    const historyContainer = document.getElementById('history-tx-list');
    if (!container && !historyContainer) return;

    const loading = '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando movimientos...</div>';
    if (container) container.innerHTML = loading;
    if (historyContainer) historyContainer.innerHTML = loading;

    try {
        const data = await apiFetch('GET', '/transactions?limit=' + _TX_PAGE_SIZE + '&offset=' + (_txPage * _TX_PAGE_SIZE));
        const txs = Array.isArray(data) ? data : (data.transactions || []);
        const nick = currentUser.nick;
        const mine = txs.filter(tx => {
            const from = tx.from_nick ?? tx.from;
            const to   = tx.to_nick ?? tx.to;
            return from === nick || to === nick;
        });

        const filterSel = document.getElementById('tx-filter-type');
        const filterType = filterSel ? filterSel.value : '';
        const filtered = filterType ? mine.filter(tx => (tx.type || '').toLowerCase() === filterType.toLowerCase()) : mine;

        if (container) renderRecentTx(container, filtered);
        if (historyContainer) {
            renderHistoryTx(historyContainer, filtered);
            const moreBtn = document.getElementById('load-more-tx-btn');
            if (moreBtn) moreBtn.style.display = (filtered.length >= _TX_PAGE_SIZE) ? 'block' : 'none';
        }
    } catch(e) {
        console.error(e);
        const errMsg = '<div class="empty-msg" style="color:var(--danger)">Error al cargar historial</div>';
        if (container) container.innerHTML = errMsg;
        if (historyContainer) historyContainer.innerHTML = errMsg;
    }
}

function renderRecentTx(container, txs) {
    container.innerHTML = '';
    if (!txs.length) {
        container.innerHTML = '<div class="empty-msg">No tienes transferencias registradas todavía</div>';
        return;
    }
    txs.forEach(tx => {
        const from = tx.from_nick ?? tx.from;
        const to   = tx.to_nick ?? tx.to;
        const isIncome = to === currentUser.nick && from !== currentUser.nick;
        const icon = isIncome ? 'fa-solid fa-arrow-down-long' : 'fa-solid fa-arrow-up-long';
        const iconColor = isIncome ? 'var(--secondary)' : 'var(--danger)';
        const prefix = isIncome ? '+' : '-';

        let dateStr = 'Reciente';
        const ts = tx.created_at ?? tx.timestamp;
        if (ts) {
            const date = new Date(ts);
            if (!isNaN(date)) dateStr = date.toLocaleDateString('es') + ' ' + date.toLocaleTimeString('es', {hour: '2-digit', minute:'2-digit'});
        }

        const item = document.createElement('div');
        item.className = 'glass-card';
        item.style.padding = '12px 18px';
        item.style.marginBottom = '10px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:30px; height:30px; border-radius:50%; background:rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; color:${iconColor};">
                    <i class="${icon}"></i>
                </div>
                <div>
                    <div style="font-size:12px; font-weight:600;">${isIncome ? 'Recibido de ' + esc(from) : 'Enviado a ' + esc(to)}</div>
                    <div style="font-size:10px; color:var(--text-muted);">${esc(tx.note) || 'Transferencia'} · ${esc(tx.type || 'Transferencia')}</div>
                </div>
            </div>
            <div class="text-right">
                <div style="font-family:'Orbitron',sans-serif; font-size:13px; font-weight:bold; color:${iconColor};">${prefix}${Number(tx.amount || 0).toLocaleString()} PPC</div>
                <div style="font-size:9px; color:var(--text-muted);">${dateStr}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderHistoryTx(container, txs) {
    container.innerHTML = '';
    if (!txs.length) {
        container.innerHTML = '<div class="empty-msg">No hay transacciones para este filtro</div>';
        return;
    }
    txs.forEach(tx => {
        const from = tx.from_nick ?? tx.from;
        const to   = tx.to_nick ?? tx.to;
        const isIncome = to === currentUser.nick && from !== currentUser.nick;

        let dateStr = 'Reciente';
        const ts = tx.created_at ?? tx.timestamp;
        if (ts) {
            const date = new Date(ts);
            if (!isNaN(date)) dateStr = date.toLocaleDateString('es') + ' ' + date.toLocaleTimeString('es', {hour: '2-digit', minute:'2-digit'});
        }

        const row = document.createElement('div');
        row.className = 'tx-row';
        row.innerHTML = `
            <div class="tx-icon" style="background:${isIncome ? 'rgba(0,255,170,0.1)' : 'rgba(255,68,102,0.1)'}; color:${isIncome ? 'var(--secondary)' : 'var(--danger)'};">
                <i class="${isIncome ? 'fa-solid fa-arrow-down-long' : 'fa-solid fa-arrow-up-long'}"></i>
            </div>
            <div class="tx-details">
                <div class="tx-type" data-csv="${esc(tx.type || 'Transferencia')}">${esc(tx.type || 'Transferencia')}</div>
                <div class="tx-meta">${isIncome ? 'De ' + esc(from) : 'Para ' + esc(to)}${tx.note ? ' · ' + esc(tx.note) : ''}</div>
                <span style="display:none" class="tx-de" data-csv="${esc(isIncome ? from : '')}"></span>
                <span style="display:none" class="tx-para" data-csv="${esc(isIncome ? '' : to)}"></span>
                <span style="display:none" class="tx-nota" data-csv="${esc(tx.note || '')}"></span>
            </div>
            <div class="tx-amount ${isIncome ? 'positive' : 'negative'}" data-csv="${Number(tx.amount || 0)}">
                ${isIncome ? '+' : '-'}${Number(tx.amount || 0).toLocaleString()} PPC
            </div>
        `;
        container.appendChild(row);
    });
}

function loadMoreTx() {
    _txPage++;
    loadRecentTx();
}

function resetTxPagination() {
    _txPage = 0;
}

// ═══════════════════════════ PRESTAMOS Y DEUDAS ═══════════════════════════

async function loadLoans() {
    if (!currentUser || !bankAccount) return;
    
    // Display maximum loan size
    const maxVal = getRankLoanMax(currentUser, bankConfig);
    const loanMaxDisplay = document.getElementById('loans-max-display');
    if (loanMaxDisplay) loanMaxDisplay.textContent = fmt(maxVal);
    
    const activeLoanDisplay = document.getElementById('active-loan-container');
    if (!activeLoanDisplay) return;
    
    if (isTrue(bankAccount.loan_active ?? bankAccount.loanActive)) {
        activeLoanDisplay.innerHTML = `
            <div class="glass-card" style="border-color:var(--danger);">
                <h3 style="color:var(--danger); font-family:'Orbitron',sans-serif; margin-bottom:12px;"><i class="fa-solid fa-circle-exclamation"></i> PRÉSTAMO ACTIVO DETECTADO</h3>
                <div style="font-size:13px; margin-bottom:15px;">
                    Tienes una deuda pendiente de <strong style="color:var(--gold); font-size:15px;">${Number(bankAccount.loan_amount ?? (bankAccount.loanAmount || 0)).toLocaleString()} PPC</strong>.<br>
                    Debes saldar tu deuda en la pestaña de <strong>Deudas</strong> para poder solicitar otro préstamo o realizar retiros especiales.
                </div>
                <button class="btn btn-danger" onclick="showPage('deudas')">Pagar Deuda de Préstamo</button>
            </div>
        `;
    } else {
        activeLoanDisplay.innerHTML = `
            <div class="glass-card">
                <h3 style="color:var(--primary); font-family:'Orbitron',sans-serif; margin-bottom:15px;"><i class="fa-solid fa-hand-holding-dollar"></i> SOLICITAR NUEVO PRÉSTAMO</h3>
                <div class="form-group">
                    <label class="form-label">Monto del Préstamo (PPC)</label>
                    <input class="form-control" type="number" id="loan-amount-input" min="1" max="${maxVal}" placeholder="ej: 1000">
                </div>
                <button class="btn btn-primary" onclick="requestLoan()">Enviar Solicitud de Préstamo</button>
            </div>
        `;
    }
}

async function requestLoan() {
    if (!currentUser || !bankAccount || !window._db) return;
    const amountInput = document.getElementById('loan-amount-input') || document.getElementById('loan-amount');
    const amt = Math.floor(parseFloat(amountInput ? amountInput.value : 0) || 0);
    
    if (amt <= 0) {
        showToast('Ingresa un monto válido', '#ff4466');
        return;
    }
    
    const maxVal = getRankLoanMax(currentUser, bankConfig);
    if (amt > maxVal) {
        showToast(`Tu rango solo permite préstamos de hasta ${maxVal.toLocaleString()} PPC`, '#ff4466');
        return;
    }
    
    const ok = await showConfirm(
        'Solicitar Préstamo', 
        `¿Deseas solicitar un préstamo de ${amt.toLocaleString()} PPC? Se aplicarán las reglas de devolución del banco del clan.`
    );
    if (!ok) return;
    
    try {
        const db = window._db;
        const myRef = window._fbDoc(db, 'bank_accounts', currentUser.nick);
        
        await window._fbUpdateDoc(myRef, {
            balance: window._fbIncrement(amt),
            loan_active: true,
            loan_amount: amt,
            loan_date: window._fbServerTimestamp()
        });

        await addTx({
            type: 'Préstamo',
            from: 'Banco',
            to: currentUser.nick,
            amount: amt,
            note: 'Préstamo solicitado y aprobado automáticamente'
        });
        
        showToast(`¡Préstamo de ${fmt(amt)} aprobado e ingresado a tu cuenta!`, '#00ffaa');
        if (amountInput) amountInput.value = '';
        
        if (typeof refreshBankAccount === 'function') await refreshBankAccount();
        if (window.loadDashboard) window.loadDashboard();
        loadLoans();
    } catch(e) {
        console.error(e);
        showToast('Error al solicitar préstamo: ' + e.message, '#ff4466');
    }
}

async function loadDebts() {
    if (!currentUser || !bankAccount) return;
    const debtContainer = document.getElementById('debts-container');
    if (!debtContainer) return;
    
    if (!isTrue(bankAccount.loan_active ?? bankAccount.loanActive)) {
        debtContainer.innerHTML = `
            <div class="glass-card text-center" style="padding:40px;">
                <div style="font-size:48px; color:var(--secondary); margin-bottom:15px;"><i class="fa-solid fa-circle-check"></i></div>
                <h3 style="font-family:'Orbitron',sans-serif; margin-bottom:8px;">SIN DEUDAS PENDIENTES</h3>
                <p style="font-size:12px; color:var(--text-muted);">Estás al día con el banco. ¡Buen trabajo, papu!</p>
            </div>
        `;
    } else {
        const debt = Number(bankAccount.loan_amount ?? (bankAccount.loanAmount || 0));
        debtContainer.innerHTML = `
            <div class="glass-card" style="border-color:var(--danger);">
                <h3 style="color:var(--danger); font-family:'Orbitron',sans-serif; margin-bottom:15px;"><i class="fa-solid fa-wallet"></i> DEUDA DE PRÉSTAMO ACTIVA</h3>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; background:rgba(0,0,0,0.2); padding:15px; border-radius:8px;">
                    <div>
                        <div style="font-size:11px; color:var(--text-muted);">Total a Pagar</div>
                        <div style="font-size:24px; font-weight:bold; color:var(--gold); font-family:'Orbitron',sans-serif;">${debt.toLocaleString()} PPC</div>
                    </div>
                    <div>
                        <div style="font-size:11px; color:var(--text-muted);">Tu Saldo Actual</div>
                        <div style="font-size:16px; font-weight:bold; color:var(--primary); font-family:'Orbitron',sans-serif;">${bankAccount.balance.toLocaleString()} PPC</div>
                    </div>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="btn btn-primary" style="flex:1;" onclick="payDebt('full')">Pagar Totalidad</button>
                    <button class="btn btn-secondary" style="flex:1;" onclick="payDebt('partial')">Abonar saldo</button>
                </div>
            </div>
        `;
    }
}

async function payDebt(type) {
    if (!currentUser || !bankAccount || !window._db) return;
    const debt = Number(bankAccount.loan_amount ?? (bankAccount.loanAmount || 0));
    
    if (bankAccount.balance <= 0) {
        showToast('No tienes saldo de PPC para abonar', '#ff4466');
        return;
    }
    
    let payAmt = debt;
    if (type === 'partial') {
        // Show input modal or input resolved value
        const valStr = await showInputModal('Abonar a Deuda', 'Ingresa cantidad de PPC a abonar:', 'number');
        if (!valStr) return;
        payAmt = Math.floor(parseFloat(valStr) || 0);
        if (payAmt <= 0) {
            showToast('Ingresa un monto válido', '#ff4466');
            return;
        }
    }
    
    payAmt = Math.min(payAmt, debt, bankAccount.balance);
    
    const approved = await showConfirm('Confirmar Pago', `¿Deseas pagar ${payAmt.toLocaleString()} PPC a tu deuda de préstamo?`);
    if (!approved) return;
    
    try {
        const db = window._db;
        const accRef = window._fbDoc(db, 'bank_accounts', currentUser.nick);
        
        const remaining = debt - payAmt;
        let updates = {
            balance: window._fbIncrement(-payAmt),
            loan_amount: remaining
        };
        
        if (remaining <= 0) {
            updates.loan_active = false;
            updates.loan_amount = 0;
        }
        
        await window._fbUpdateDoc(accRef, updates);
        if (remaining <= 0) {
            try {
                await window._fbUpdateDoc(window._fbDoc(db, 'users', currentUser.nick), { loansPaid: window._fbIncrement(1) });
            } catch(e) {}
        }
        
        await addTx({
            type: 'Pago Deuda',
            from: currentUser.nick,
            to: 'Banco',
            amount: payAmt,
            note: remaining <= 0 ? 'Liquidación completa de deuda de préstamo' : `Abono parcial a deuda de préstamo (Quedan: ${remaining} PPC)`
        });
        
        showToast(remaining <= 0 ? '¡Has liquidado tu deuda con éxito!' : `Abonaste ${fmt(payAmt)} a tu préstamo.`, '#00ffaa');
        
        if (typeof refreshBankAccount === 'function') await refreshBankAccount();
        if (window.loadDashboard) window.loadDashboard();
        loadDebts();
    } catch(e) {
        console.error(e);
        showToast('Error al pagar deuda: ' + e.message, '#ff4466');
    }
}

// ═══════════════════════════ INVESTMENTS ═══════════════════════════

const INV_PLANS = [
    { id: 'low_risk', name: 'Plan Conservador 🛡', term: 7, rate: 5, min: 200, desc: 'Rendimiento constante de 5% en 7 días.' },
    { id: 'medium_risk', name: 'Plan Crecimiento 📈', term: 14, rate: 15, min: 1000, desc: 'Rendimiento mejorado de 15% en 14 días.' },
    { id: 'high_risk', name: 'Plan Inversor God 🔥', term: 30, rate: 45, min: 5000, desc: 'Alto rendimiento de 45% en 30 días.' }
];

let selectedInvestPlan = null;

async function loadInvestments() {
    if (!currentUser || !bankAccount) return;
    
    // Render investment plans (selectable cards)
    const grid = document.getElementById('invest-plans-grid');
    if (grid) {
        grid.innerHTML = '';
        INV_PLANS.forEach(plan => {
            const card = document.createElement('div');
            card.className = 'user-select-card' + (selectedInvestPlan && selectedInvestPlan.id === plan.id ? ' selected' : '');
            card.dataset.planId = plan.id;
            card.innerHTML = `
                <div style="font-family:'Orbitron',sans-serif; color:var(--primary); font-size:13px; margin-bottom:6px;">${plan.name}</div>
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:10px; line-height:1.4;">${plan.desc}</div>
                <div style="font-size:11px; margin-bottom:4px;">Plazo: <strong>${plan.term} días</strong></div>
                <div style="font-size:11px; margin-bottom:4px;">Tasa: <strong style="color:var(--secondary);">+${plan.rate}%</strong></div>
                <div style="font-size:10px; color:var(--text-muted);">Mínimo: <strong>${plan.min.toLocaleString()} PPC</strong></div>
            `;
            card.onclick = () => {
                selectedInvestPlan = plan;
                grid.querySelectorAll('.user-select-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            };
            grid.appendChild(card);
        });
    }
    
    loadMyInvestments();
}

async function loadMyInvestments() {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('active-investments-list');
    if (!container) return;
    
    container.innerHTML = '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando tus inversiones...</div>';
    
    try {
        const db = window._db;
        const snap = await window._fbGetDocs(window._fbCollection(db, `bank_accounts/${currentUser.nick}/investments`));
        container.innerHTML = '';
        
        let count = 0;
        snap.forEach(doc => {
            const inv = doc.data();
            count++;
            
            let dateStr = 'N/A';
            let endStr = 'N/A';
            if (inv.startDate) {
                const sDate = inv.startDate.toDate ? inv.startDate.toDate() : new Date(inv.startDate);
                dateStr = sDate.toLocaleDateString('es');
                
                const eDate = new Date(sDate.getTime() + (inv.term * 24 * 60 * 60 * 1000));
                endStr = eDate.toLocaleDateString('es');
            }
            
            const elapsed = Date.now() - (inv.startDate ? (inv.startDate.toDate ? inv.startDate.toDate().getTime() : new Date(inv.startDate).getTime()) : Date.now());
            const totalDuration = inv.term * 24 * 60 * 60 * 1000;
            const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
            const isClaimable = progress >= 100;
            
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.style.marginBottom = '12px';
            
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <div>
                        <strong style="color:var(--gold); font-size:15px;">${inv.amount.toLocaleString()} PPC</strong>
                        <div style="font-size:10px; color:var(--text-muted);">Retorno estimado: ${inv.expectedReturn.toLocaleString()} PPC (+${inv.rate}%)</div>
                    </div>
                    <div class="text-right">
                        <span class="badge-tag" style="background:${isClaimable ? 'rgba(0, 255, 170, 0.15); color:var(--secondary);' : 'rgba(255, 215, 0, 0.15); color:var(--gold);'}">
                            ${isClaimable ? 'Reclamable' : 'Activo'}
                        </span>
                    </div>
                </div>
                <div style="font-size:10px; color:var(--text-muted); margin-bottom:10px; display:flex; justify-content:space-between;">
                    <span>Fecha inicio: ${dateStr}</span>
                    <span>Finalización: ${endStr}</span>
                </div>
                <div style="height:6px; background:rgba(255,255,255,0.1); border-radius:3px; margin-bottom:15px; position:relative; overflow:hidden;">
                    <div style="height:100%; background:${isClaimable ? 'var(--secondary)' : 'var(--primary)'}; width:${progress}%"></div>
                </div>
                ${isClaimable 
                    ? `<button class="btn btn-primary btn-full" onclick="claimInvestment('${doc.id}', ${inv.expectedReturn})">Cobrar Rendimientos</button>`
                    : `<button class="btn btn-secondary btn-full" disabled style="opacity:0.5;">Faltan ${Math.max(1, Math.ceil((totalDuration - elapsed) / (24 * 60 * 60 * 1000)))} días</button>`
                }
            `;
            container.appendChild(card);
        });
        
        if (count === 0) {
            container.innerHTML = '<div class="empty-msg">No tienes inversiones activas en este momento</div>';
        }
    } catch(e) {
        console.error(e);
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar inversiones</div>';
    }
}

async function createInvestment() {
    if (!currentUser || !bankAccount || !window._db) return;
    
    if (!selectedInvestPlan) {
        showToast('Selecciona un plan de inversión primero', '#ff4466');
        return;
    }
    const plan = selectedInvestPlan;
    
    const amtInput = document.getElementById('invest-amount');
    const amt = Math.floor(parseFloat(amtInput ? amtInput.value : 0) || 0);
    
    if (amt < plan.min) {
        showToast(`El monto mínimo para este plan es de ${plan.min.toLocaleString()} PPC`, '#ff4466');
        return;
    }
    
    if (bankAccount.balance < amt) {
        showToast('Saldo de PPC insuficiente para invertir', '#ff4466');
        return;
    }
    
    const expected = Math.round(amt * (1 + (plan.rate / 100)));
    
    const approved = await showConfirm('Confirmar Inversión', `¿Invertir ${amt.toLocaleString()} PPC en "${plan.name}"?<br>Retorno esperado: <strong>${expected.toLocaleString()} PPC</strong> en ${plan.term} días.`);
    if (!approved) return;
    
    try {
        const db = window._db;
        const accRef = window._fbDoc(db, 'bank_accounts', currentUser.nick);
        const myInvRef = window._fbCollection(db, `bank_accounts/${currentUser.nick}/investments`);
        
        // Add investment document
        await window._fbAddDoc(myInvRef, {
            planId: plan.id,
            amount: amt,
            rate: plan.rate,
            term: plan.term,
            expectedReturn: expected,
            startDate: window._fbServerTimestamp()
        });
        
        // Deduct balance
        await window._fbUpdateDoc(accRef, {
            balance: window._fbIncrement(-amt)
        });
        
        await addTx({
            type: 'Inversión',
            from: currentUser.nick,
            to: 'Inversiones',
            amount: amt,
            note: `Inversión en ${plan.name} por ${plan.term} días`
        });
        
        showToast(`¡Inversión realizada! Invertiste ${fmt(amt)}`, '#00ffaa');
        if (typeof checkAchievements === 'function') checkAchievements();
        
        if (window.loadDashboard) window.loadDashboard();
        loadInvestments();
    } catch(e) {
        console.error(e);
        showToast('Error al procesar inversión: ' + e.message, '#ff4466');
    }
}

async function claimInvestment(invDocId, expectedReturn) {
    if (!currentUser || !window._db) return;
    
    try {
        const invPath = `/bank_accounts/${currentUser.nick}/investments/${invDocId}`;
        
        const invSnap = await apiFetch('GET', invPath).catch(() => null);
        if (!invSnap) {
            showToast('Esta inversión ya fue cobrada o no existe', '#ff4466');
            loadInvestments();
            return;
        }
        
        const freshUser = await apiFetch('GET', '/users/' + currentUser.nick).catch(() => null);
        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(freshUser || currentUser) : 1;
        const finalReturn = Math.round(expectedReturn * mult);
        
        const accRef = window._fbDoc(window._db, 'bank_accounts', currentUser.nick);
        await window._fbUpdateDoc(accRef, {
            balance: window._fbIncrement(finalReturn)
        });
        
        await apiFetch('DELETE', invPath).catch(() => {
            console.warn('No se pudo borrar la inversión ' + invDocId + ' tras cobrarla');
        });
        
        await addTx({
            type: 'Cobro Inversión',
            from: 'Inversiones',
            to: currentUser.nick,
            amount: finalReturn,
            note: `Retorno de inversión cobrado (base: ${expectedReturn.toLocaleString()} ×${mult.toFixed(2)})`
        });
        
        showToast(`¡Cobraste ${fmt(finalReturn)} de tu inversión! (×${mult.toFixed(2)})`, '#00ffaa');
        
        if (window.loadDashboard) window.loadDashboard();
        loadInvestments();
    } catch(e) {
        console.error(e);
        showToast('Error al reclamar inversión', '#ff4466');
    }
}

// ═══════════════════════════ BILL SPLIT SYSTEM ═══════════════════════════

const splitParticipants = [];

async function loadSplitUsers() {
    if (!window._db || !currentUser) return;
    const grid = document.getElementById('split-users-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div>';
    
    try {
        const snap = await getCachedUsers();
        grid.innerHTML = '';
        
        snap.forEach(doc => {
            const nick = doc.id;
            if (nick === currentUser.nick) return; // Creator is in split by default
            
            const isAdded = splitParticipants.includes(nick);
            
            const card = document.createElement('div');
            card.className = `user-select-card ${isAdded ? 'selected' : ''}`;
            card.onclick = () => toggleSplitParticipant(nick, card);
            
            const avatarSrc = doc.data().avatar ? doc.data().avatar : 'avt_gojo.jpg';
            card.innerHTML = `
                <img class="user-select-avatar" src="${esc(avatarSrc)}" alt="${esc(nick)}">
                <div class="user-select-name">${esc(nick)}</div>
            `;
            grid.appendChild(card);
        });
        
        renderSplitParticipants();
    } catch(e) {
        console.error(e);
        grid.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar usuarios</div>';
    }
}

function toggleSplitParticipant(nick, element) {
    const idx = splitParticipants.indexOf(nick);
    if (idx === -1) {
        splitParticipants.push(nick);
        if (element) element.classList.add('selected');
    } else {
        splitParticipants.splice(idx, 1);
        if (element) element.classList.remove('selected');
    }
    
    renderSplitParticipants();
}

function renderSplitParticipants() {
    const container = document.getElementById('split-participants-summary');
    const splitBtn = document.getElementById('split-confirm-btn');
    if (!container || !currentUser) return;
    
    // Add creator to list for display count
    const totalCount = splitParticipants.length + 1;
    const amountVal = Math.floor(parseFloat(document.getElementById('split-amount')?.value) || 0);
    const splitPerPerson = amountVal > 0 ? Math.floor(amountVal / totalCount) : 0;
    
    container.innerHTML = `
        <div style="font-size:13px; margin-bottom:10px;">
            Participantes: <strong>${totalCount}</strong> (Tú + ${splitParticipants.length} papus)
        </div>
        <div style="font-size:12px; background:rgba(0,0,0,0.15); padding:10px; border-radius:6px;">
            <div>Cada persona pagará: <strong style="color:var(--gold);">${splitPerPerson.toLocaleString()} PPC</strong></div>
            <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">Participantes: Tú, ${splitParticipants.length > 0 ? splitParticipants.join(', ') : 'Ninguno seleccionado'}</div>
        </div>
    `;
    
    if (splitBtn) {
        splitBtn.disabled = (splitParticipants.length === 0 || amountVal <= 0);
    }
}

async function triggerSplit() {
    if (!currentUser || !window._db || splitParticipants.length === 0) return;
    const amtInput = document.getElementById('split-amount');
    const amt = Math.floor(parseFloat(amtInput ? amtInput.value : 0) || 0);
    const descInput = document.getElementById('split-desc');
    const desc = (descInput.value || '').trim() || 'Split de cuentas';
    
    if (amt <= 0) {
        showToast('Ingresa un monto válido para dividir', '#ff4466');
        return;
    }
    
    const totalCount = splitParticipants.length + 1;
    const splitPerPerson = Math.floor(amt / totalCount);
    
    const approved = await showConfirm('Confirmar División', `Dividirás ${amt.toLocaleString()} PPC entre ${totalCount} personas.<br>Cada uno te pagará: <strong>${splitPerPerson.toLocaleString()} PPC</strong>.`);
    if (!approved) return;
    
    try {
        const db = window._db;
        
        // Create debt records in target bank accounts
        // (or request transactions in firebase)
        // For now: register request/transactions that target users owe splitPerPerson to currentUser
        for (const nick of splitParticipants) {
            const userRef = window._fbDoc(db, 'bank_accounts', nick);
            const userSnap = await window._fbGetDoc(userRef);
            
            if (userSnap.exists()) {
                const userBal = parseFloat(userSnap.data()?.balance) || 0;
                if (userBal < splitPerPerson) {
                    showToast(`${nick} no tiene saldo suficiente para el split`, '#ff4466');
                    continue;
                }
                // Deduct balance from debtor and give to creator (simple instant split execution)
                await window._fbUpdateDoc(userRef, {
                    balance: window._fbIncrement(-splitPerPerson)
                });
                
                const creatorRef = window._fbDoc(db, 'bank_accounts', currentUser.nick);
                await window._fbUpdateDoc(creatorRef, {
                    balance: window._fbIncrement(splitPerPerson)
                });
                
                await addTx({
                    type: 'Split Cuenta',
                    from: nick,
                    to: currentUser.nick,
                    amount: splitPerPerson,
                    note: `${desc} (Dividido por ${currentUser.nick})`
                });
            }
        }
        
        showToast('¡División de cuenta realizada con éxito!', '#00ffaa');
        if (amtInput) amtInput.value = '';
        if (descInput) descInput.value = '';
        splitParticipants.length = 0; // Clear array
        
        loadSplitUsers();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) {
        console.error(e);
        showToast('Error al procesar división de cuenta: ' + e.message, '#ff4466');
    }
}
