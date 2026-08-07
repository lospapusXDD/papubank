/* ═══════════════════════════════════════════════
   CUMPLEAÑOS — Sistema de cumpleaños del clan
   Admin asigna, usuarios reciben bono
═══════════════════════════════════════════════ */

const BIRTHDAY_BONUS = 50000; // PPC bonus en tu cumple

/* ─────────── LOAD PAGE ─────────── */

async function loadBirthdaysPage() {
    const container = document.getElementById('birthdays-container');
    if (!container) return;

    try {
        const usersSnap = await getCachedUsers();
        const today = new Date();
        const todayStr = `${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
        const birthdays = [];

        usersSnap.forEach(doc => {
            const u = doc.data();
            if (u.birthday) {
                birthdays.push({
                    nick: u.nick || doc.id,
                    birthday: u.birthday,
                    rank: getRankKey(u),
                    isAdmin: ['owner','admin'].includes(getRankKey(u))
                });
            }
        });

        // Sort by upcoming date
        birthdays.sort((a, b) => {
            const da = new Date(a.birthday);
            const db = new Date(b.birthday);
            const aMod = `${String(da.getMonth()+1).padStart(2,'0')}-${String(da.getDate()).padStart(2,'0')}`;
            const bMod = `${String(db.getMonth()+1).padStart(2,'0')}-${String(db.getDate()).padStart(2,'0')}`;
            const aIsToday = aMod === todayStr;
            const bIsToday = bMod === todayStr;
            if (aIsToday && !bIsToday) return -1;
            if (!aIsToday && bIsToday) return 1;
            const aDate = new Date(today.getFullYear(), da.getMonth(), da.getDate());
            const bDate = new Date(today.getFullYear(), db.getMonth(), db.getDate());
            if (aDate < today) aDate.setFullYear(aDate.getFullYear() + 1);
            if (bDate < today) bDate.setFullYear(bDate.getFullYear() + 1);
            return aDate - bDate;
        });

        const isAdmin = checkAdminPermission();

        let html = `
            <div class="glass-card text-center" style="margin-bottom:20px;background:linear-gradient(135deg,rgba(236,72,153,0.08),rgba(0,0,0,0));border-color:rgba(236,72,153,0.3);">
                <div style="font-size:40px;color:#ec4899;margin-bottom:10px;"><i class="fa-solid fa-cake-candles"></i></div>
                <h2 style="font-family:'Orbitron',sans-serif;color:#ec4899;">Cumpleaños del Clan</h2>
                <p style="font-size:12px;color:var(--text-muted);">Bono de <strong style="color:var(--secondary);">${formatCompact(BIRTHDAY_BONUS)} PPC</strong> en tu día</p>
            </div>
        `;

        // Today's birthdays
        const todayBirthdays = birthdays.filter(b => {
            const d = new Date(b.birthday);
            return `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` === todayStr;
        });

        if (todayBirthdays.length > 0) {
            html += `
                <div class="glass-card" style="border-color:#ec4899;margin-bottom:20px;">
                    <h3 style="font-family:'Orbitron',sans-serif;color:#ec4899;margin-bottom:15px;text-align:center;">
                        🎂 ¡HOY ES EL CUMPLE DE!
                    </h3>
                    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">
                        ${todayBirthdays.map(b => `
                            <div style="background:rgba(236,72,153,0.1);border:1px solid rgba(236,72,153,0.3);border-radius:12px;padding:12px 16px;text-align:center;">
                                <div style="font-size:24px;margin-bottom:6px;">🎉</div>
                                <div style="font-weight:700;color:var(--primary);font-size:14px;">${b.nick}</div>
                                <div style="font-size:10px;color:var(--secondary);margin-top:4px;">+${formatCompact(BIRTHDAY_BONUS)} PPC</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Upcoming birthdays
        html += `
            <div class="glass-card">
                <h3 style="font-family:'Orbitron',sans-serif;color:#ec4899;margin-bottom:15px;">
                    <i class="fa-solid fa-calendar-days"></i> Próximos Cumpleaños
                </h3>
        `;

        if (birthdays.length === 0) {
            html += '<div class="empty-msg">No hay cumpleaños registrados 🎂</div>';
        } else {
            html += '<div style="display:flex;flex-direction:column;gap:8px;">';
            const displayed = new Set();
            birthdays.forEach(b => {
                if (displayed.has(b.nick)) return;
                displayed.add(b.nick);
                const d = new Date(b.birthday);
                const day = d.getDate();
                const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                const month = months[d.getMonth()];
                const isToday = `${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` === todayStr;

                html += `
                    <div style="display:flex;align-items:center;gap:12px;padding:10px;background:${isToday ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.03)'};border-radius:10px;border:1px solid ${isToday ? 'rgba(236,72,153,0.4)' : 'var(--dark-border)'};">
                        <div style="width:40px;height:40px;border-radius:50%;background:${isToday ? '#ec4899' : 'rgba(236,72,153,0.15)'};display:flex;align-items:center;justify-content:center;color:${isToday ? '#fff' : '#ec4899'};font-size:14px;font-weight:700;flex-shrink:0;">
                            ${day}
                        </div>
                        <div style="flex:1;">
                            <div style="font-weight:700;color:var(--primary);font-size:13px;">${b.nick} ${isToday ? '🎉' : ''}</div>
                            <div style="font-size:10px;color:var(--text-muted);">${month} ${day} ${isToday ? '— ¡HOY!' : ''}</div>
                        </div>
                        ${isAdmin ? `<button class="btn btn-secondary" style="font-size:9px;padding:4px 8px;" onclick="removeBirthday('${b.nick}')"><i class="fa-solid fa-trash"></i></button>` : ''}
                    </div>
                `;
            });
            html += '</div>';
        }
        html += '</div>';

        // Admin: Assign birthday
        if (isAdmin) {
            html += `
                <div class="glass-card" style="margin-top:20px;border-color:var(--gold);">
                    <h3 style="font-family:'Orbitron',sans-serif;color:var(--gold);margin-bottom:15px;">
                        <i class="fa-solid fa-user-shield"></i> Panel Admin
                    </h3>
                    <p style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Asigna cumpleaños a los usuarios del clan.</p>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;">
                        <input class="form-control" id="bd-admin-nick" type="text" placeholder="Nick del usuario" style="flex:1;min-width:120px;">
                        <input class="form-control" id="bd-admin-date" type="date" style="flex:1;min-width:140px;">
                        <button class="btn btn-primary" onclick="adminSetBirthday()">
                            <i class="fa-solid fa-check"></i> Asignar
                        </button>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="color:var(--danger);">Error al cargar cumpleaños</div>';
    }
}

/* ─────────── ADMIN: SET BIRTHDAY ─────────── */

async function adminSetBirthday() {
    const nickInput = document.getElementById('bd-admin-nick');
    const dateInput = document.getElementById('bd-admin-date');
    const nick = (nickInput?.value || '').trim();
    const dateVal = dateInput?.value;

    if (!nick) { showToast('Ingresa el nick', '#ff4466'); return; }
    if (!dateVal) { showToast('Selecciona una fecha', '#ff4466'); return; }

    try {
        // Check user exists
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', nick));
        if (!userSnap.exists()) { showToast('Usuario no encontrado', '#ff4466'); return; }

        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', nick), { birthday: dateVal });
        showToast(`Cumpleaño de ${nick} asignado 🎂`, '#ec4899');
        nickInput.value = '';
        dateInput.value = '';
        loadBirthdaysPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── ADMIN: REMOVE BIRTHDAY ─────────── */

async function removeBirthday(nick) {
    const ok = await showConfirm('Eliminar cumpleaño', `¿Eliminar el cumpleaño de ${nick}?`);
    if (!ok) return;

    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', nick), { birthday: null });
        showToast(`Cumpleaño de ${nick} eliminado`, '#ff69b4');
        loadBirthdaysPage();
    } catch(e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ─────────── BIRTHDAY BONUS CHECK ─────────── */

async function checkBirthdayBonus() {
    if (!currentUser || !window._db) return;
    const bd = currentUser.birthday;
    if (!bd) return;

    const today = new Date();
    const d = new Date(bd);
    const isToday = today.getMonth() === d.getMonth() && today.getDate() === d.getDate();

    if (!isToday) return;

    // Check if already claimed today
    const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    if (currentUser.lastBirthdayClaim === todayKey) return;

    // Grant bonus
    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(BIRTHDAY_BONUS)
        });
        await window._fbUpdateDoc(window._fbDoc(window._db, 'users', currentUser.nick), {
            lastBirthdayClaim: todayKey
        });
        showToast(`🎉 ¡Feliz Cumpleaños! +${formatCompact(BIRTHDAY_BONUS)} PPC`, '#ec4899');
    } catch(e) {
        console.error('Birthday bonus error:', e);
    }
}
