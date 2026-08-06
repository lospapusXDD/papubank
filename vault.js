/* Vault System: Personal, Clan, and Shared vaults */

const VAULT_INTEREST_DEFAULT = 0.5;
let _currentVaultTab = 'personal';

function getVaultInterestRate(user) {
    const base = (bankConfig && bankConfig.vaultInterest) || VAULT_INTEREST_DEFAULT;
    if (!user) return base;
    const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(user) : 1;
    return base * mult;
}

async function logVaultOp(scope, vaultId, type, by, to, amount, note) {
    if (!window._db) return;
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'vault_ops'), {
            scope: scope,
            vaultId: vaultId,
            type: type,
            by: by || 'Sistema',
            to: to || by || 'Sistema',
            amount: amount || 0,
            note: note || '',
            timestamp: window._fbServerTimestamp()
        });
    } catch(e) { console.error('Vault op error:', e); }
}

async function fetchVaultOps(scope, vaultId, max) {
    if (!window._db) return [];
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'vault_ops'));
        const ops = [];
        snap.forEach(d => {
            const o = d.data();
            if (o.scope === scope && o.vaultId === vaultId) ops.push({ id: d.id, ...o });
        });
        ops.sort((a, b) => (b.timestamp ? (b.timestamp.toMillis ? b.timestamp.toMillis() : new Date(b.timestamp).getTime()) : 0)
                          - (a.timestamp ? (a.timestamp.toMillis ? a.timestamp.toMillis() : new Date(a.timestamp).getTime()) : 0));
        return ops.slice(0, max || 30);
    } catch(e) { console.error(e); return []; }
}

function renderOpsList(container, ops) {
    if (!container) return;
    if (!ops.length) { container.innerHTML = '<div class="empty-msg">Sin movimientos aún</div>'; return; }
    container.innerHTML = '';
    ops.forEach(op => {
        const isIn = (op.type === 'deposit' || op.type === 'interest' || op.type === 'admin_deposit' || op.type === 'create');
        const color = isIn ? 'var(--secondary)' : 'var(--danger)';
        const icon = isIn ? 'fa-solid fa-arrow-down-long' : 'fa-solid fa-arrow-up-long';
        let dateStr = '';
        if (op.timestamp) {
            const d = op.timestamp.toDate ? op.timestamp.toDate() : new Date(op.timestamp);
            dateStr = d.toLocaleDateString('es') + ' ' + d.toLocaleTimeString('es', {hour:'2-digit',minute:'2-digit'});
        }
        const el = document.createElement('div');
        el.className = 'glass-card';
        el.style.cssText = 'padding:10px 14px;margin-bottom:8px;display:flex;align-items:center;gap:10px;';
        el.innerHTML = `
            <div style="width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;color:${color};flex-shrink:0;"><i class="${icon}"></i></div>
            <div style="flex:1;min-width:0;">
                <div style="font-size:12px;font-weight:600;">${escHTML(op.note || op.type)}</div>
                <div style="font-size:10px;color:var(--text-muted);">${escHTML(op.by)} ${isIn ? '→' : '←'} ${escHTML(op.to)} • ${dateStr}</div>
            </div>
            <div style="font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;color:${color};white-space:nowrap;">${isIn ? '+' : '-'}${(op.amount||0).toLocaleString()} PPC</div>
        `;
        container.appendChild(el);
    });
}

// ═══════════════════════════ TABS ═══════════════════════════

function switchVaultTab(tab) {
    _currentVaultTab = tab;
    document.querySelectorAll('.vault-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.vault-tab-content').forEach(c => c.style.display = 'none');
    const btn = document.querySelector('.vault-tab[data-tab="' + tab + '"]');
    if (btn) btn.classList.add('active');
    const content = document.getElementById('vault-tab-' + tab);
    if (content) content.style.display = 'block';
    if (tab === 'personal') loadPersonalVault();
    if (tab === 'clan') loadClanVault();
    if (tab === 'shared') loadSharedVaults();
}

function loadVaultPage() {
    if (!currentUser || !window._db) return;
    switchVaultTab(_currentVaultTab || 'personal');
}

// ═══════════════════════════ PERSONAL VAULT ═══════════════════════════

function personalVaultBalance() {
    return (bankAccount && bankAccount.vaultBalance) || 0;
}

function personalVaultInterestAccrued(user, bal) {
    const balance = bal !== undefined ? bal : personalVaultBalance();
    if (balance <= 0) return 0;
    const last = bankAccount?.vaultLastClaim;
    const lastTs = last ? (last.toMillis ? last.toMillis() : new Date(last).getTime()) : Date.now();
    const days = Math.max(0, (Date.now() - lastTs) / 86400000);
    const rate = getVaultInterestRate(user);
    return Math.floor(balance * (rate / 100) * days);
}

function renderPersonalVault() {
    const balEl = document.getElementById('vault-personal-balance');
    if (balEl) balEl.textContent = personalVaultBalance().toLocaleString('es') + ' PPC';
    const rateEl = document.getElementById('vault-personal-rate');
    if (rateEl) rateEl.textContent = getVaultInterestRate(currentUser).toFixed(2) + '%';
    const accEl = document.getElementById('vault-personal-interest');
    if (accEl) accEl.textContent = personalVaultInterestAccrued(currentUser).toLocaleString('es') + ' PPC';
}

async function loadPersonalVault() {
    if (!currentUser || !bankAccount) return;
    renderPersonalVault();
    const ops = await fetchVaultOps('personal', currentUser.nick, 30);
    renderOpsList(document.getElementById('vault-personal-history'), ops);
}

async function personalVaultDeposit() {
    if (!currentUser || !bankAccount || !window._db) return;
    const input = document.getElementById('vault-personal-deposit');
    const amt = Math.floor(parseFloat(input.value) || 0);
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    if (bankAccount.balance < amt) { showToast('Saldo insuficiente', '#ff4466'); return; }
    const ok = await showConfirm('Depositar a Bóveda Personal', 'Guardarás <strong>' + amt.toLocaleString() + ' PPC</strong> en tu bóveda personal.');
    if (!ok) return;
    try {
        const db = window._db;
        const ref = window._fbDoc(db, 'bank_accounts', currentUser.nick);
        const updates = {
            balance: window._fbIncrement(-amt),
            vaultBalance: window._fbIncrement(amt)
        };
        if (!bankAccount.vaultLastClaim) updates.vaultLastClaim = window._fbServerTimestamp();
        await window._fbUpdateDoc(ref, updates);
        await logVaultOp('personal', currentUser.nick, 'deposit', currentUser.nick, currentUser.nick, amt, 'Depósito a bóveda personal');
        await addTx({ type: 'Bóveda Personal', from: currentUser.nick, to: 'Bóveda Personal', amount: amt, note: 'Depósito a bóveda personal' });
        input.value = '';
        showToast('Depósito a bóveda personal exitoso ✓', '#00ffaa');
        if (window.trackActivity) window.trackActivity('vault', amt);
        if (typeof checkAchievements === 'function') checkAchievements();
        loadPersonalVault();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function personalVaultWithdraw() {
    if (!currentUser || !bankAccount || !window._db) return;
    const input = document.getElementById('vault-personal-withdraw');
    const amt = Math.floor(parseFloat(input.value) || 0);
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    if (personalVaultBalance() < amt) { showToast('No tienes tanto en tu bóveda', '#ff4466'); return; }
    const ok = await showConfirm('Retirar de Bóveda Personal', 'Sacarás <strong>' + amt.toLocaleString() + ' PPC</strong> de tu bóveda personal a tu saldo.');
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(amt),
            vaultBalance: window._fbIncrement(-amt)
        });
        await logVaultOp('personal', currentUser.nick, 'withdraw', currentUser.nick, currentUser.nick, amt, 'Retiro de bóveda personal');
        await addTx({ type: 'Bóveda Personal', from: 'Bóveda Personal', to: currentUser.nick, amount: amt, note: 'Retiro de bóveda personal' });
        input.value = '';
        showToast('Retiro de bóveda personal exitoso ✓', '#00ffaa');
        loadPersonalVault();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function claimVaultInterest() {
    if (!currentUser || !bankAccount || !window._db) return;
    const accrued = personalVaultInterestAccrued(currentUser);
    if (accrued <= 0) { showToast('Aún no has acumulado intereses', '#ff4466'); return; }
    const ok = await showConfirm('Reclamar Intereses', 'Reclamarás <strong style="color:var(--secondary)">' + accrued.toLocaleString() + ' PPC</strong> de intereses de tu bóveda personal.');
    if (!ok) return;
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            vaultBalance: window._fbIncrement(accrued),
            vaultLastClaim: window._fbServerTimestamp()
        });
        await logVaultOp('personal', currentUser.nick, 'interest', 'Banco', currentUser.nick, accrued, 'Interés diario ' + getVaultInterestRate(currentUser).toFixed(2) + '% de la bóveda personal');
        showToast('¡Reclamaste ' + accrued.toLocaleString() + ' PPC de intereses!', '#00ffaa');
        loadPersonalVault();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

// ═══════════════════════════ CLAN VAULT ═══════════════════════════

async function loadClanVault() {
    if (!window._db) return;
    const container = document.getElementById('vault-clan-content');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando bóveda del clan...</div>';
    try {
        const snap = await window._fbGetDoc(window._fbDoc(window._db, 'vaults', 'clan'));
        const vault = snap.exists() ? snap.data() : { balance: 0, frozen: false };
        const isAdmin = checkAdminPermission();

        container.innerHTML = `
            <div class="glass-card" style="margin-bottom:20px;border-color:${vault.frozen ? 'var(--danger)' : 'var(--dark-border)'};">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
                    <div>
                        <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Saldo de la Bóveda del Clan</div>
                        <div style="font-family:'Orbitron',sans-serif;font-size:32px;font-weight:900;color:var(--gold);">${(vault.balance||0).toLocaleString()} PPC</div>
                    </div>
                    <span class="badge-tag" style="background:${vault.frozen ? 'rgba(255,68,102,0.15)' : 'rgba(0,255,170,0.15)'};color:${vault.frozen ? 'var(--danger)' : 'var(--secondary)'};">
                        ${vault.frozen ? 'Congelada' : 'Activa'}
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-label"><i class="fa-solid fa-coins"></i> Depositar a la Bóveda del Clan</label>
                    <input class="form-control" id="clan-vault-deposit" type="number" min="1" placeholder="Cantidad de PPC...">
                </div>
                <button class="btn btn-primary btn-full" onclick="clanVaultDeposit()"><i class="fa-solid fa-vault"></i> DEPOSITAR</button>
                ${isAdmin ? `
                    <div style="border-top:1px solid var(--dark-border);margin-top:20px;padding-top:20px;">
                        <h4 style="font-size:12px;color:var(--danger);margin-bottom:12px;font-family:'Orbitron',sans-serif;"><i class="fa-solid fa-shield-halved"></i> CONTROLES DE ADMINISTRADOR</h4>
                        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">
                            <div>
                                <label class="form-label">Retirar a usuario (nick)</label>
                                <input class="form-control" id="clan-vault-withdraw-to" type="text" placeholder="nick destino...">
                            </div>
                            <div>
                                <label class="form-label">Cantidad a retirar</label>
                                <input class="form-control" id="clan-vault-withdraw-amt" type="number" min="1" placeholder="0">
                            </div>
                        </div>
                        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
                            <button class="btn btn-danger" onclick="clanVaultAdminWithdraw()"><i class="fa-solid fa-money-bill-transfer"></i> RETIRAR</button>
                            <button class="btn ${vault.frozen ? 'btn-secondary' : 'btn-danger'}" onclick="clanVaultToggleFreeze()">
                                <i class="fa-solid fa-${vault.frozen ? 'unlock' : 'snowflake'}"></i> ${vault.frozen ? 'DESCONGELAR' : 'CONGELAR'}
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="glass-card">
                <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-clock-rotate-left" style="color:var(--primary);"></i> Historial de la Bóveda del Clan</h3>
                <div id="vault-clan-history"><div class="empty-msg">Cargando historial...</div></div>
            </div>
        `;
        const ops = await fetchVaultOps('clan', 'clan', 30);
        renderOpsList(document.getElementById('vault-clan-history'), ops);
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar la bóveda del clan</div>';
    }
}

async function clanVaultDeposit() {
    if (!currentUser || !bankAccount || !window._db) return;
    const input = document.getElementById('clan-vault-deposit');
    const amt = Math.floor(parseFloat(input.value) || 0);
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    if (bankAccount.balance < amt) { showToast('Saldo insuficiente', '#ff4466'); return; }
    const ok = await showConfirm('Depositar al Clan', 'Donarás <strong>' + amt.toLocaleString() + ' PPC</strong> a la bóveda del clan.');
    if (!ok) return;
    try {
        const db = window._db;
        const vaultRef = window._fbDoc(db, 'vaults', 'clan');
        const vSnap = await window._fbGetDoc(vaultRef);
        if (!vSnap.exists()) {
            await window._fbSetDoc(vaultRef, { balance: amt, frozen: false, createdAt: window._fbServerTimestamp() });
        } else {
            if (vSnap.data().frozen) { showToast('La bóveda del clan está congelada', '#ff4466'); return; }
            await window._fbUpdateDoc(vaultRef, { balance: window._fbIncrement(amt) });
        }
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-amt) });
        await logVaultOp('clan', 'clan', 'deposit', currentUser.nick, 'Clan', amt, 'Depósito a la bóveda del clan');
        await addTx({ type: 'Bóveda Clan', from: currentUser.nick, to: 'Bóveda del Clan', amount: amt, note: 'Depósito a la bóveda del clan' });
        input.value = '';
        showToast('¡Gracias por tu donación a la bóveda del clan!', '#00ffaa');
        loadClanVault();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function clanVaultAdminWithdraw() {
    if (!checkAdminPermission()) return;
    const toNick = (document.getElementById('clan-vault-withdraw-to').value || '').trim().toLowerCase();
    const amt = Math.floor(parseFloat(document.getElementById('clan-vault-withdraw-amt').value) || 0);
    if (!toNick || amt <= 0) { showToast('Indica nick destino y cantidad', '#ff4466'); return; }
    const ok = await showConfirm('Retiro de Bóveda del Clan', 'Retirarás <strong>' + amt.toLocaleString() + ' PPC</strong> de la bóveda del clan y los darás a <strong>' + escHTML(toNick) + '</strong>.');
    if (!ok) return;
    try {
        const db = window._db;
        const vaultRef = window._fbDoc(db, 'vaults', 'clan');
        const vSnap = await window._fbGetDoc(vaultRef);
        const vault = vSnap.exists() ? vSnap.data() : { balance: 0 };
        if ((vault.balance || 0) < amt) { showToast('La bóveda no tiene ese monto', '#ff4466'); return; }
        const targetSnap = await window._fbGetDoc(window._fbDoc(db, 'bank_accounts', toNick));
        if (!targetSnap.exists()) { showToast('El usuario no tiene cuenta bancaria', '#ff4466'); return; }
        await window._fbUpdateDoc(vaultRef, { balance: window._fbIncrement(-amt) });
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', toNick), { balance: window._fbIncrement(amt), totalIn: window._fbIncrement(amt) });
        await logVaultOp('clan', 'clan', 'admin_withdraw', currentUser.nick, toNick, amt, 'Retiro administrativo de la bóveda del clan hacia ' + toNick);
        await addTx({ type: 'Bóveda Clan', from: 'Bóveda del Clan', to: toNick, amount: amt, note: 'Retiro administrativo por ' + currentUser.nick });
        showToast('Entregaste ' + amt.toLocaleString() + ' PPC a ' + toNick + ' ✓', '#00ffaa');
        loadClanVault();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function clanVaultToggleFreeze() {
    if (!checkAdminPermission()) return;
    try {
        const db = window._db;
        const vaultRef = window._fbDoc(db, 'vaults', 'clan');
        const vSnap = await window._fbGetDoc(vaultRef);
        const vault = vSnap.exists() ? vSnap.data() : { frozen: false, balance: 0 };
        await window._fbSetDoc(vaultRef, Object.assign({}, vault, { frozen: !vault.frozen }), { merge: true });
        await logVaultOp('clan', 'clan', vault.frozen ? 'unfreeze' : 'freeze', currentUser.nick, 'Clan', 0, vault.frozen ? 'Bóveda del clan descongelada' : 'Bóveda del clan congelada');
        showToast(vault.frozen ? 'Bóveda del clan descongelada' : 'Bóveda del clan CONGELADA', vault.frozen ? '#00ffaa' : '#ff4466');
        loadClanVault();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

// ═══════════════════════════ SHARED VAULTS (friends / pareja) ═══════════════════════════

async function loadSharedVaults() {
    if (!currentUser || !window._db) return;
    const container = document.getElementById('vault-shared-content');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando bóvedas compartidas...</div>';

    try {
        const db = window._db;
        const q = window._fbQuery(window._fbCollection(db, 'vaults'), window._fbWhere('members', 'array-contains', currentUser.nick));
        const snap = await window._fbGetDocs(q);
        const vaults = [];
        snap.forEach(d => vaults.push({ id: d.id, ...d.data() }));

        let html = `
            <div class="glass-card" style="margin-bottom:20px;border-color:var(--primary);">
                <h3 class="section-title" style="font-size:14px;"><i class="fa-solid fa-users" style="color:var(--primary);"></i> Crear / Abrir Bóveda Compartida</h3>
                <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Elige un amigo para crear una bóveda conjunta. Ambos miembros pueden depositar y retirar.</p>
                <div class="form-group">
                    <label class="form-label">Usuario del clan</label>
                    <input class="form-control" id="shared-vault-friend" type="text" placeholder="nick del amigo...">
                </div>
                <button class="btn btn-primary" onclick="openSharedVault()"><i class="fa-solid fa-vault"></i> CREAR / ABRIR</button>
            </div>
        `;

        if (vaults.length === 0) {
            html += '<div class="glass-card"><div class="empty-msg">No tienes bóvedas compartidas todavía. Crea una con un amigo arriba.</div></div>';
        } else {
            for (const vault of vaults) {
                const other = (vault.members || []).find(m => m !== currentUser.nick) || '—';
                html += `
                    <div class="glass-card" style="margin-bottom:20px;border-color:rgba(255,105,180,0.25);">
                        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
                            <div>
                                <h3 style="font-family:'Orbitron',sans-serif;font-size:15px;color:var(--danger);margin-bottom:4px;"><i class="fa-solid fa-heart"></i> Bóveda con <span style="color:var(--gold);">${escHTML(other)}</span></h3>
                                <div style="font-size:11px;color:var(--text-muted);">Miembro: <strong>${escHTML(currentUser.nick)}</strong></div>
                            </div>
                            <div class="text-right">
                                <div style="font-size:10px;color:var(--text-muted);">Saldo Conjunto</div>
                                <div style="font-family:'Orbitron',sans-serif;font-size:22px;font-weight:900;color:var(--gold);">${(vault.balance||0).toLocaleString()} PPC</div>
                            </div>
                        </div>
                        <div class="grid-container" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-bottom:0;">
                            <div>
                                <input class="form-control" type="number" min="1" placeholder="Depositar PPC..." id="shared-dep-${vault.id}">
                                <button class="btn btn-primary btn-full" style="margin-top:8px;font-size:12px;" onclick="sharedVaultDeposit('${vault.id}')"><i class="fa-solid fa-arrow-down-long"></i> Depositar</button>
                            </div>
                            <div>
                                <input class="form-control" type="number" min="1" placeholder="Retirar PPC..." id="shared-wd-${vault.id}">
                                <button class="btn btn-secondary btn-full" style="margin-top:8px;font-size:12px;" onclick="sharedVaultWithdraw('${vault.id}')"><i class="fa-solid fa-arrow-up-long"></i> Retirar</button>
                            </div>
                        </div>
                        <div id="shared-ops-${vault.id}" style="margin-top:14px;"><div class="empty-msg">Cargando historial...</div></div>
                    </div>
                `;
            }
        }
        container.innerHTML = html;

        for (const vault of vaults) {
            const ops = await fetchVaultOps('shared', vault.id, 20);
            renderOpsList(document.getElementById('shared-ops-' + vault.id), ops);
        }
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error al cargar bóvedas compartidas</div>';
    }
}

async function openSharedVault() {
    if (!currentUser || !window._db) return;
    const input = document.getElementById('shared-vault-friend');
    const friend = (input.value || '').trim().toLowerCase();
    if (!friend || friend === currentUser.nick) { showToast('Elige un amigo válido', '#ff4466'); return; }
    try {
        const db = window._db;
        const uSnap = await window._fbGetDoc(window._fbDoc(db, 'users', friend));
        if (!uSnap.exists()) { showToast('Ese usuario no existe en el clan', '#ff4466'); return; }
        const vaultId = [currentUser.nick, friend].sort().join('_');
        const vRef = window._fbDoc(db, 'vaults', vaultId);
        const vSnap = await window._fbGetDoc(vRef);
        if (!vSnap.exists()) {
            await window._fbSetDoc(vRef, { members: [currentUser.nick, friend], balance: 0, createdAt: window._fbServerTimestamp() });
            await logVaultOp('shared', vaultId, 'create', currentUser.nick, friend, 0, 'Bóveda compartida creada');
            showToast('¡Bóveda compartida creada!', '#ff69b4');
        } else {
            showToast('Bóveda con ' + friend + ' abierta', 'var(--primary)');
        }
        loadSharedVaults();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function sharedVaultDeposit(vaultId) {
    if (!currentUser || !bankAccount || !window._db) return;
    const input = document.getElementById('shared-dep-' + vaultId);
    const amt = Math.floor(parseFloat(input.value) || 0);
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    if (bankAccount.balance < amt) { showToast('Saldo insuficiente', '#ff4466'); return; }
    const ok = await showConfirm('Depositar a Bóveda Compartida', 'Depositarás <strong>' + amt.toLocaleString() + ' PPC</strong> a la bóveda compartida.');
    if (!ok) return;
    try {
        const db = window._db;
        const vRef = window._fbDoc(db, 'vaults', vaultId);
        const vSnap = await window._fbGetDoc(vRef);
        const v = vSnap.exists() ? vSnap.data() : { members: [] };
        if (!(v.members || []).includes(currentUser.nick)) { showToast('No eres miembro de esta bóveda', '#ff4466'); return; }
        await window._fbUpdateDoc(vRef, { balance: window._fbIncrement(amt) });
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(-amt) });
        await logVaultOp('shared', vaultId, 'deposit', currentUser.nick, vaultId, amt, 'Depósito a bóveda compartida');
        await addTx({ type: 'Bóveda Compartida', from: currentUser.nick, to: 'Bóveda ' + vaultId, amount: amt, note: 'Depósito a bóveda compartida' });
        input.value = '';
        showToast('Depósito exitoso ✓', '#00ffaa');
        loadSharedVaults();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function sharedVaultWithdraw(vaultId) {
    if (!currentUser || !bankAccount || !window._db) return;
    const input = document.getElementById('shared-wd-' + vaultId);
    const amt = Math.floor(parseFloat(input.value) || 0);
    if (amt <= 0) { showToast('Ingresa un monto válido', '#ff4466'); return; }
    try {
        const db = window._db;
        const vRef = window._fbDoc(db, 'vaults', vaultId);
        const vSnap = await window._fbGetDoc(vRef);
        const v = vSnap.exists() ? vSnap.data() : { balance: 0 };
        if (!(v.members || []).includes(currentUser.nick)) { showToast('No eres miembro de esta bóveda', '#ff4466'); return; }
        if ((v.balance || 0) < amt) { showToast('La bóveda no tiene ese monto', '#ff4466'); return; }
        const ok = await showConfirm('Retirar de Bóveda Compartida', 'Retirarás <strong>' + amt.toLocaleString() + ' PPC</strong> de la bóveda compartida a tu saldo.');
        if (!ok) return;
        await window._fbUpdateDoc(vRef, { balance: window._fbIncrement(-amt) });
        await window._fbUpdateDoc(window._fbDoc(db, 'bank_accounts', currentUser.nick), { balance: window._fbIncrement(amt) });
        await logVaultOp('shared', vaultId, 'withdraw', currentUser.nick, vaultId, amt, 'Retiro de bóveda compartida');
        await addTx({ type: 'Bóveda Compartida', from: 'Bóveda ' + vaultId, to: currentUser.nick, amount: amt, note: 'Retiro de bóveda compartida' });
        input.value = '';
        showToast('Retiro exitoso ✓', '#00ffaa');
        loadSharedVaults();
        if (window.loadDashboard) window.loadDashboard();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}
