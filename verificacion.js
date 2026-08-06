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
        // Config section placeholder
        html += `
            <div class="glass-card" style="border-color:rgba(255,68,102,0.2);">
                <h3 class="section-title" style="font-size:14px;color:var(--danger);margin-bottom:16px;"><i class="fa-solid fa-shield-halved"></i> Verificación de 2 Pasos</h3>
                <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">Activa la verificación para proteger tu cuenta con códigos por correo o mensaje.</p>
                <button class="btn btn-secondary btn-full" onclick="showToast('Configuración de 2 pasos — pendiente de implementar', 'var(--text-muted)')"><i class="fa-solid fa-lock"></i> Configurar 2FA</button>
            </div>
        `;
        html += '</div>';
        container.innerHTML = html;
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger)">Error: ' + escHTML(e.message) + '</div>';
    }
}
