/* Verificación / Mensajes — Web aparte para 2FA y bandeja */

async function loadVerificacionPage() {
    const container = document.getElementById('verificacion-content');
    if (!container) return;
    container.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Cargando mensajes...</div>';
    try {
        const db = window._db;
        const snap = await window._fbGetDocs(window._fbCollection(db, 'notifications'));
        const msgs = [];
        snap.forEach(d => msgs.push({ id: d.id, ...d.data() }));
        msgs.sort((a,b) => (b.timestamp ? (b.timestamp.toMillis ? b.timestamp.toMillis() : new Date(b.timestamp).getTime()) : 0)
                            - (a.timestamp ? (a.timestamp.toMillis ? a.timestamp.toMillis() : new Date(a.timestamp).getTime()) : 0));
        let html = '<div class="grid-container" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;">';
        if (msgs.length === 0) {
            html += '<div class="glass-card text-center"><i class="fa-solid fa-envelope" style="font-size:36px;color:var(--text-muted);margin-bottom:12px;"></i><h3 style="font-family:\'Orbitron\',sans-serif;">Bandeja vacía</h3><p style="font-size:12px;color:var(--text-muted);">No tienes mensajes ni códigos de verificación.</p></div>';
        } else {
            msgs.forEach(m => {
                const dateStr = m.timestamp ? (m.timestamp.toDate ? m.timestamp.toDate().toLocaleString('es') : new Date(m.timestamp).toLocaleString('es')) : '';
                html += `
                    <div class="glass-card" style="border-left:4px solid ${m.read ? 'var(--dark-border)' : 'var(--primary)'};">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                            <span style="font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--primary);"><i class="fa-solid fa-envelope"></i> ${escHTML(m.title || 'Mensaje')}</span>
                            <span style="font-size:10px;color:var(--text-muted);">${dateStr}</span>
                        </div>
                        <p style="font-size:13px;color:var(--text-main);line-height:1.6;margin-bottom:12px;">${escHTML(m.body || '')}</p>
                        ${m.code ? `<div style="font-family:'Orbitron',sans-serif;font-size:18px;color:var(--gold);background:rgba(255,215,0,0.08);border:1px dashed rgba(255,215,0,0.3);border-radius:8px;padding:12px;text-align:center;letter-spacing:3px;">${escHTML(m.code)}</div>` : ''}
                    </div>
                `;
            });
        }
        // Config section 2FA
        const twofaOn = currentUser && (currentUser.twofa_enabled || currentUser.twofaEnabled || currentUser.twofa === true);
        html += `
            <div class="glass-card" style="border-color:rgba(255,68,102,0.2);">
                <h3 class="section-title" style="font-size:14px;color:var(--danger);margin-bottom:16px;"><i class="fa-solid fa-shield-halved"></i> Verificación de 2 Pasos</h3>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                    <span style="width:10px;height:10px;border-radius:50%;background:${twofaOn ? 'var(--secondary)' : '#ff4466'};box-shadow:0 0 8px ${twofaOn ? 'var(--secondary)' : '#ff4466'};"></span>
                    <span style="font-size:13px;font-weight:700;font-family:'Orbitron',sans-serif;color:${twofaOn ? 'var(--secondary)' : 'var(--danger)'};">${twofaOn ? 'ACTIVADA' : 'DESACTIVADA'}</span>
                </div>
                <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">${twofaOn ? 'Tu cuenta está protegida con códigos temporales de Google Authenticator.' : 'Protege tu cuenta con códigos temporales de Google Authenticator. Necesitarás tu teléfono para ingresar.'}</p>
                ${twofaOn
                    ? `<button class="btn btn-secondary btn-full" style="margin-bottom:8px;" onclick="regenerateTwofaCodes()"><i class="fa-solid fa-rotate"></i> Regenerar códigos de respaldo</button>
                       <button class="btn btn-secondary btn-full" style="border-color:rgba(255,68,102,0.4);color:var(--danger);" onclick="disableTwofa()"><i class="fa-solid fa-unlock"></i> Desactivar 2FA</button>`
                    : `<button class="btn btn-primary btn-full" onclick="setupTwofa()"><i class="fa-solid fa-qrcode"></i> Activar con Google Authenticator</button>`}
            </div>
        `;
        html += '</div>';
        container.innerHTML = html;
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error: ' + escHTML(e.message) + '</div>';
    }
}

// ═══════════════════════════ 2FA SETUP ═══════════════════════════

window.setupTwofa = async function() {
    const modal = document.getElementById('twofa-setup-modal');
    const body = document.getElementById('twofa-setup-body');
    const footer = document.getElementById('twofa-setup-footer');
    body.innerHTML = '<div class="empty-msg"><i class="fa-solid fa-spinner fa-spin"></i> Generando clave secreta...</div>';
    footer.innerHTML = '';
    modal.classList.add('active');
    try {
        const res = await apiFetch('POST', '/auth/2fa/setup', {});
        window._pendingTwofa = res;
        const otpauth = res.otpauthUrl || res.otpauth || res.qrData || '';
        body.innerHTML = `
            <p style="font-size:12px;color:var(--text-muted);line-height:1.7;margin-bottom:14px;">
                <b style="color:var(--text-main);">1.</b> Abre <b>Google Authenticator</b> y escanea este código QR.<br>
                <b style="color:var(--text-main);">2.</b> Ingresa el código de 6 dígitos que aparece en tu app.
            </p>
            <div id="twofa-qr" style="display:flex;justify-content:center;margin-bottom:14px;"></div>
            <div style="font-size:11px;color:var(--text-muted);text-align:center;margin-bottom:14px;">
                ¿No puedes escanear? Ingresa esta clave manualmente:<br>
                <span style="font-family:'Orbitron',sans-serif;letter-spacing:2px;color:var(--gold);font-size:13px;">${escHTML(res.secret || '')}</span>
            </div>
            <div class="input-field" style="margin-bottom:4px;">
                <label><i class="fa-solid fa-key"></i> Código de 6 dígitos</label>
                <input id="twofa-setup-code" type="text" maxlength="6" inputmode="numeric" placeholder="••••••" style="letter-spacing:4px;text-align:center;"
                    onkeydown="if(event.key==='Enter') confirmTwofaSetup();">
            </div>
            <div id="twofa-setup-error" style="color:var(--danger);font-size:11px;min-height:16px;text-align:center;"></div>
        `;
        footer.innerHTML = `
            <button class="btn btn-secondary" onclick="closeTwofaSetup()"><i class="fa-solid fa-xmark"></i> Cancelar</button>
            <button class="btn btn-primary" id="twofa-setup-ok" onclick="confirmTwofaSetup()"><i class="fa-solid fa-shield-halved"></i> Activar</button>
        `;
        if (typeof QRCode === 'function' && otpauth) {
            new QRCode(document.getElementById('twofa-qr'), { text: otpauth, width: 180, height: 180 });
        } else if (otpauth) {
            document.getElementById('twofa-qr').innerHTML = '<a href="' + escHTML(otpauth) + '" target="_blank" style="font-size:11px;color:var(--primary);">Abrir enlace OTP</a>';
        }
        document.getElementById('twofa-setup-code').focus();
    } catch(e) {
        body.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error: ' + escHTML(e.message) + '</div>';
        footer.innerHTML = '<button class="btn btn-secondary" onclick="closeTwofaSetup()">Cerrar</button>';
    }
};

window.confirmTwofaSetup = async function() {
    const code = document.getElementById('twofa-setup-code').value.trim();
    const errEl = document.getElementById('twofa-setup-error');
    if (!/^\d{6}$/.test(code)) { errEl.textContent = 'Ingresa los 6 dígitos'; return; }
    const btn = document.getElementById('twofa-setup-ok');
    if (btn) { btn.disabled = true; btn.textContent = 'Verificando...'; }
    try {
        const res = await apiFetch('POST', '/auth/2fa/verify', { code });
        closeTwofaSetup();
        const codes = res.backupCodes || res.backup_codes || res.codes || [];
        if (codes.length) showBackupCodes(codes);
        showToast('2FA activada correctamente', 'var(--secondary)');
        loadVerificacionPage();
    } catch(e) {
        errEl.textContent = e.message || 'Código inválido';
        if (btn) { btn.disabled = false; btn.textContent = 'Activar'; }
    }
};

window.closeTwofaSetup = function() {
    document.getElementById('twofa-setup-modal').classList.remove('active');
};

function showBackupCodes(codes) {
    const list = codes.map(c => '<div style="font-family:\'Orbitron\',sans-serif;letter-spacing:2px;color:var(--gold);font-size:15px;padding:6px 0;">' + escHTML(c) + '</div>').join('');
    showConfirm(
        'Códigos de Respaldo',
        '<p style="font-size:12px;margin-bottom:10px;color:var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Guarda estos códigos en un lugar seguro. Cada uno solo sirve una vez. Si pierdes la app y estos códigos, perderás el acceso a tu cuenta.</p>' +
        '<div style="border:1px dashed var(--dark-border);border-radius:8px;padding:12px 16px;text-align:center;background:rgba(0,0,0,0.2);">' + list + '</div>',
        'YA LOS GUARDÉ'
    );
}

window.regenerateTwofaCodes = async function() {
    const code = await showInputModal('Regenerar códigos de respaldo', 'Ingresa tu código actual de 6 dígitos', 'text');
    if (!code) return;
    try {
        const res = await apiFetch('POST', '/auth/2fa/backup-codes', { code: String(code).trim() });
        const codes = res.backupCodes || res.backup_codes || res.codes || [];
        if (codes.length) showBackupCodes(codes);
        showToast('Códigos regenerados', 'var(--secondary)');
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
};

window.disableTwofa = async function() {
    const ok = await showConfirm('Desactivar 2FA', 'Al desactivar la verificación, tu cuenta solo estará protegida con contraseña. ¿Continuar?', 'Desactivar');
    if (!ok) return;
    const code = await showInputModal('Desactivar 2FA', 'Ingresa tu código actual de 6 dígitos', 'text');
    if (!code) return;
    try {
        await apiFetch('POST', '/auth/2fa/disable', { code: String(code).trim() });
        showToast('2FA desactivada', '#ff4466');
        loadVerificacionPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
};
