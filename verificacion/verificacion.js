/* Verificación por código numérico — Web aparte */

const VERIF_CODE_LENGTH = 6;
const VERIF_EXPIRY_SECONDS = 60;
const COOKIE_KEY = 'papubank_verif';

function getCookie(name) {
    const match = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(name + '='));
    return match ? match.split('=')[1] : null;
}

function setCookie(name, value, days = 1/24) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = name + '=' + value + ';path=/;domain=localhost;expires=' + expires;
}

function generateNumericCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function getVerifSession() {
    const cookieVal = getCookie(COOKIE_KEY);
    if (cookieVal) {
        try { return JSON.parse(decodeURIComponent(cookieVal)); } catch(e) {}
    }
    const ls = localStorage.getItem(COOKIE_KEY);
    if (ls) {
        try { return JSON.parse(ls); } catch(e) {}
    }
    return null;
}

function setVerifSession(data) {
    const str = JSON.stringify(data);
    setCookie(COOKIE_KEY, encodeURIComponent(str), 1);
    localStorage.setItem(COOKIE_KEY, str);
}

function clearVerifSession() {
    document.cookie = COOKIE_KEY + '=;path=/;domain=localhost;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem(COOKIE_KEY);
}

async function loadVerificacion() {
    const session = getVerifSession();
    const sessionDiv = document.getElementById('verif-session');
    const sessionUser = document.getElementById('verif-session-user');

    if (session && session.nick) {
        sessionDiv.style.display = 'block';
        if (sessionUser) sessionUser.textContent = session.nick;
    } else {
        sessionDiv.style.display = 'none';
    }

    const codeEl = document.getElementById('verif-code');
    const timerEl = document.getElementById('verif-timer');
    const boxEl = document.getElementById('verif-code-box');
    const emptyEl = document.getElementById('verif-empty');
    const formEl = document.getElementById('verif-form');

    try {
        const db = window._db;
        // Filter by current session user if available
        let snap;
        if (session && session.nick) {
            snap = await window._fbGetDocs(window._fbCollection(db, 'verification_codes'));
        } else {
            snap = await window._fbGetDocs(window._fbCollection(db, 'verification_codes'));
        }
        const codes = [];
        snap.forEach(d => codes.push({ id: d.id, ...d.data() }));
        if (session && session.nick) {
            const lastForUser = codes.filter(c => c.user === session.nick).sort((a,b) => (b.created ? (b.created.toMillis ? b.created.toMillis() : new Date(b.created).getTime()) : 0) - (a.created ? (a.created.toMillis ? a.created.toMillis() : new Date(a.created).getTime()) : 0))[0];
            if (lastForUser) codes.unshift(lastForUser); // priority
        }
        const latest = codes[0];

        if (!latest) {
            boxEl.style.display = 'none';
            formEl.style.display = 'none';
            emptyEl.style.display = 'block';
            if (codeEl) codeEl.textContent = '—';
            return;
        }

        const createdTs = latest.created ? (latest.created.toMillis ? latest.created.toMillis() : new Date(latest.created).getTime()) : Date.now();
        const elapsed = (Date.now() - createdTs) / 1000;

        if (elapsed > VERIF_EXPIRY_SECONDS) {
            await window._fbDeleteDoc(window._fbDoc(db, 'verification_codes', latest.id));
            boxEl.style.display = 'none';
            formEl.style.display = 'none';
            emptyEl.style.display = 'block';
            return;
        }

        const remaining = Math.ceil(VERIF_EXPIRY_SECONDS - elapsed);
        boxEl.style.display = 'block';
        formEl.style.display = 'block';
        emptyEl.style.display = 'none';
        if (codeEl) codeEl.textContent = latest.code || '—';
        if (timerEl) timerEl.textContent = remaining;

        setTimeout(loadVerificacion, 5000);
    } catch(e) {
        boxEl.style.display = 'none';
        formEl.style.display = 'none';
        emptyEl.style.display = 'block';
        emptyEl.innerHTML = '<p style="font-size:13px;color:var(--danger);text-align:center;">Error al cargar código: ' + (e.message || '') + '</p>';
    }
}

async function verifyCode() {
    const session = getVerifSession();
    const input = document.getElementById('verif-input');
    const val = (input ? input.value : '').trim();
    if (!val) { showToast ? showToast('Ingresa el código numérico', '#ff4466') : alert('Ingresa el código'); return; }
    if (!/^\d{6}$/.test(val)) { showToast ? showToast('El código debe ser de 6 dígitos numéricos', '#ff4466') : alert('El código debe ser de 6 dígitos numéricos'); return; }
    try {
        const db = window._db;
        const snap = await window._fbGetDocs(window._fbCollection(db, 'verification_codes'));
        let found = false;
        for (const doc of snap.docs) {
            const data = doc.data();
            if (data.code === val) {
                const createdTs = data.created ? (data.created.toMillis ? data.created.toMillis() : new Date(data.created).getTime()) : Date.now();
                const elapsed = (Date.now() - createdTs) / 1000;
                if (elapsed <= VERIF_EXPIRY_SECONDS) {
                    found = true;
                    // Store verified session
                    const newSession = session ? Object.assign({}, session, { verified: true, verifiedAt: Date.now(), verifiedCode: val }) : { nick: data.user || 'desconocido', verified: true, verifiedAt: Date.now(), verifiedCode: val };
                    setVerifSession(newSession);
                    // Delete the used code
                    await window._fbDeleteDoc(window._fbDoc(db, 'verification_codes', doc.id));
                    if (showToast) showToast('Verificación exitosa ✓', '#00ffaa');
                    input.value = '';
                    setTimeout(() => { window.location.href = 'http://localhost:8080/'; }, 1500);
                    break;
                }
            }
        }
        if (!found) {
            if (showToast) showToast('Código incorrecto o expirado', '#ff4466');
        }
    } catch(e) {
        if (showToast) showToast('Error al verificar: ' + (e.message || ''), '#ff4466');
    }
}

window.addEventListener('DOMContentLoaded', loadVerificacion);
