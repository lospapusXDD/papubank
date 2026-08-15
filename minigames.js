/* JJK Minigames: Slots, Finger Hunt, Cursed Energy, Jujutsu Battle, and cosmetics list */

/* ═══════ INIT FUNCTIONS (called by openMinigame) ═══════ */

function initSlots(container) {
    container.innerHTML = `
        <div style="text-align:center;margin-bottom:16px;">
            <div style="display:flex;justify-content:center;gap:12px;margin-bottom:20px;">
                <div class="slot-reel" style="width:64px;height:38px;overflow:hidden;border-radius:8px;border:2px solid var(--gold);background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:28px;">
                    <div id="reel-inner-0" class="slot-reel-inner">👊</div>
                </div>
                <div class="slot-reel" style="width:64px;height:38px;overflow:hidden;border-radius:8px;border:2px solid var(--gold);background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:28px;">
                    <div id="reel-inner-1" class="slot-reel-inner">🐾</div>
                </div>
                <div class="slot-reel" style="width:64px;height:38px;overflow:hidden;border-radius:8px;border:2px solid var(--gold);background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:28px;">
                    <div id="reel-inner-2" class="slot-reel-inner">🔵</div>
                </div>
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">🔵🩸 juntos = JACKPOT x12 | Triple = x8 | Par = x2</div>
            <input id="slot-bet" type="number" class="form-control" placeholder="Apuesta (mín 10 PPC)" min="10" style="text-align:center;margin-bottom:12px;">
            <button id="slot-btn" class="btn btn-primary btn-full" onclick="playSlots()"><i class="fa-solid fa-play"></i> GIRAR</button>
            <div id="slot-result" class="jjk-result-box" style="margin-top:12px;"></div>
        </div>`;
}

function initFingerHunt(container) {
    container.innerHTML = `
        <div style="text-align:center;">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Encuentra el dedo de Sukuna entre las cajas — x4 si aciertas</div>
            <div style="display:flex;justify-content:center;gap:10px;margin-bottom:16px;">
                <button id="fb-0" class="finger-box" onclick="pickFinger(0)" style="font-size:28px;width:52px;height:52px;border-radius:10px;border:2px solid var(--dark-border);background:rgba(0,0,0,0.3);cursor:pointer;">📦</button>
                <button id="fb-1" class="finger-box" onclick="pickFinger(1)" style="font-size:28px;width:52px;height:52px;border-radius:10px;border:2px solid var(--dark-border);background:rgba(0,0,0,0.3);cursor:pointer;">📦</button>
                <button id="fb-2" class="finger-box" onclick="pickFinger(2)" style="font-size:28px;width:52px;height:52px;border-radius:10px;border:2px solid var(--dark-border);background:rgba(0,0,0,0.3);cursor:pointer;">📦</button>
                <button id="fb-3" class="finger-box" onclick="pickFinger(3)" style="font-size:28px;width:52px;height:52px;border-radius:10px;border:2px solid var(--dark-border);background:rgba(0,0,0,0.3);cursor:pointer;">📦</button>
                <button id="fb-4" class="finger-box" onclick="pickFinger(4)" style="font-size:28px;width:52px;height:52px;border-radius:10px;border:2px solid var(--dark-border);background:rgba(0,0,0,0.3);cursor:pointer;">📦</button>
            </div>
            <input id="finger-bet" type="number" class="form-control" placeholder="Apuesta (mín 10 PPC)" min="10" style="text-align:center;margin-bottom:12px;">
            <button id="finger-btn" class="btn btn-primary btn-full" onclick="startFingerHunt()"><i class="fa-solid fa-play"></i> INICIAR</button>
            <div id="finger-result" class="jjk-result-box" style="margin-top:12px;"></div>
        </div>`;
}

function initCursedEnergy(container) {
    container.innerHTML = `
        <div style="text-align:center;">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">Adivina el nivel de energía maldita (1-5) — Exacto x5, Cerca x1.8</div>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px;">
                <button class="curse-lvl-btn btn btn-secondary" onclick="selectCurse(this,1)" style="font-size:18px;width:48px;">1</button>
                <button class="curse-lvl-btn btn btn-secondary" onclick="selectCurse(this,2)" style="font-size:18px;width:48px;">2</button>
                <button class="curse-lvl-btn btn btn-secondary" onclick="selectCurse(this,3)" style="font-size:18px;width:48px;">3</button>
                <button class="curse-lvl-btn btn btn-secondary" onclick="selectCurse(this,4)" style="font-size:18px;width:48px;">4</button>
                <button class="curse-lvl-btn btn btn-secondary" onclick="selectCurse(this,5)" style="font-size:18px;width:48px;">5</button>
            </div>
            <input id="curse-bet" type="number" class="form-control" placeholder="Apuesta (mín 10 PPC)" min="10" style="text-align:center;margin-bottom:12px;">
            <button id="curse-btn" class="btn btn-primary btn-full" onclick="playCurse()"><i class="fa-solid fa-play"></i> LIBERAR ENERGÍA</button>
            <div id="curse-result" class="jjk-result-box" style="margin-top:12px;"></div>
        </div>`;
}

function initBatalla(container) {
    container.innerHTML = `
        <div style="text-align:center;">
            <div style="display:flex;justify-content:center;gap:30px;margin-bottom:16px;">
                <div style="text-align:center;">
                    <div id="bp-emoji" style="font-size:32px;margin-bottom:4px;"><i class="fa-solid fa-user-ninja"></i></div>
                    <div id="bp-name" style="font-size:10px;font-weight:700;color:var(--primary);">TU</div>
                    <div style="width:80px;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;margin-top:4px;"><div id="bp-hp" style="width:100%;height:100%;background:var(--secondary);border-radius:3px;transition:width 0.4s;"></div></div>
                </div>
                <div style="font-size:20px;color:var(--danger);align-self:center;font-weight:900;">VS</div>
                <div style="text-align:center;">
                    <div id="be-emoji" style="font-size:32px;margin-bottom:4px;"><i class="fa-solid fa-skull-crossbones"></i></div>
                    <div id="be-name" style="font-size:10px;font-weight:700;color:var(--danger);">???</div>
                    <div style="width:80px;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;margin-top:4px;"><div id="be-hp" style="width:100%;height:100%;background:var(--danger);border-radius:3px;transition:width 0.4s;"></div></div>
                </div>
            </div>
            <input id="battle-bet" type="number" class="form-control" placeholder="Apuesta (mín 10 PPC)" min="10" style="text-align:center;margin-bottom:12px;">
            <button id="battle-btn" class="btn btn-primary btn-full" onclick="playBattle()"><i class="fa-solid fa-play"></i> Luchar</button>
            <div id="battle-result" class="jjk-result-box" style="margin-top:12px;"></div>
            <div id="battle-log" style="font-size:10px;color:var(--text-muted);margin-top:8px;min-height:20px;"></div>
        </div>`;
}

const BATTLE_ENEMIES = [
    { name: 'Transe Especial', emoji: 'fa-solid fa-ghost', power: 15 },
    { name: 'Maldición Grado 2', emoji: 'fa-solid fa-face-angry', power: 25 },
    { name: 'Maldición Grado 1', emoji: 'fa-solid fa-burst', power: 38 },
    { name: 'Maldición Especial', emoji: 'fa-solid fa-skull-crossbones', power: 55 },
    { name: 'Pseudo-Geto', emoji: 'fa-solid fa-hurricane', power: 70 },
    { name: 'Hanami', emoji: 'fa-solid fa-seedling', power: 65 },
    { name: 'Jogo', emoji: 'fa-solid fa-volcano', power: 72 },
    { name: 'Mahito', emoji: 'fa-solid fa-mask', power: 68 },
    { name: 'Kenjaku', emoji: 'fa-solid fa-brain', power: 85 }
];

const BANNERS = [
    { id: 'shiroko', label: 'Shiroko', file: '2026-04-09_08-35-30.png' },
    { id: 'disarm', label: 'Disarm', file: '2026-04-09_08-37-01.png' },
    { id: 'neon', label: 'Neon City', file: '2026-04-09_08-37-06.webp' },
    { id: 'zodiac', label: 'Zodiac', file: '2026-04-09_08-37-25.webp' },
    { id: 'eyes', label: 'Blue Eyes', file: 'b1db1d27-7ecd-4ed0-ba02-106fb1c7dea9.jpeg' },
    { id: 'clouds', label: 'Pixel Sky', file: 'b3102e96-5369-4d2f-b3bf-a64d4f48e897.jpeg' },
    { id: 'kny', label: 'Demon Slayer', file: 'ban_kny.jpg' },
    { id: 'deku', label: 'Deku Smash', file: 'ban_deku.jpg' },
    { id: 'redeyes', label: 'Red Eyes', file: 'ban_redeyes.jpg' },
    { id: 'bluegirl', label: 'Blue Girl', file: 'ban_bluegirl.jpg' },
    { id: 'mushoku', label: 'Isekai Party', file: 'ban_mushoku.jpg' },
    { id: 'deathnote', label: 'Death Note', file: 'ban_deathnote.jpg' },
    { id: 'tanya', label: 'Tanya The Evil', file: 'ban_tanya.jpg' },
    { id: 'konata_b', label: 'Konata Star', file: 'ban_konata.jpg' },
    { id: 'tomoko_b', label: 'Tomoko Vibe', file: 'ban_tomoko.webp' }
];

const AVATARS = [
    { id: 'gojo', file: 'avt_gojo.jpg' },
    { id: 'lucy', file: 'avt_lucy.jpg' },
    { id: 'rimuru', file: 'avt_rimuru.jpg' },
    { id: 'llawliet', file: 'avt_l.jpg' },
    { id: 'guts', file: 'avt_guts.jpg' },
    { id: 'sukuna', file: 'avt_sukuna.jpg' },
    { id: 'roxy', file: 'avt_roxy.jpg' },
    { id: 'tomoko', file: 'avt_tomoko.jpg' },
    { id: 'konata', file: 'avt_konata.jpg' },
    { id: 'kira', file: 'avt_kira.jpg' },
    { id: 'kuroki', file: 'avt_kuroki.jpg' },
    { id: 'chito', file: 'avt_chito.jpg' }
];

window.BANNERS = BANNERS;
window.AVATARS = AVATARS;

const _slotSymbols = ['👊', '🐾', '🔵', '🩸', '💼', '💍', '👻', '🔨', '⭐', '⚔️'];
let _jjkDomainSelected = null;
let _jjkCurseSelected = null;
let _jjkFingerActive = false;
let _jjkFingerPos = -1;
let _jjkFingerBet = 0;
let _jjkBlackFlashActive = false;

// Reel spinning logic
function spinReel(id, em, delay) {
    const inn = document.getElementById('reel-inner-' + id);
    if (!inn) return;
    inn.style.transition = 'none';
    
    let it = '';
    for (let i = 0; i < 12; i++) {
        it += `<div class="slot-reel-item">${_slotSymbols[Math.floor(Math.random() * _slotSymbols.length)]}</div>`;
    }
    it += `<div class="slot-reel-item">${em}</div>`;
    inn.innerHTML = it;
    inn.style.transform = 'translateY(0)';
    
    setTimeout(function() {
        inn.style.transition = 'transform ' + (0.5 + delay * 0.15) + 's cubic-bezier(.4,0,.2,1)';
        inn.style.transform = 'translateY(-' + (12 * 90) + 'px)';
    }, 50 + delay * 80);
}

// SLOTS minigame
async function playSlots() {
    if (!currentUser || !window._db) return;
    const bi = document.getElementById('slot-bet');
    const bet = parseInt(bi ? bi.value : 0);
    
    if (!bet || bet < 10) {
        showToast('Apuesta mínima 10 PPC', '#ffa500');
        return;
    }
    
    const btn = document.getElementById('slot-btn');
    const res = document.getElementById('slot-result');
    btn.disabled = true;
    
    const ok = await jjkGameDebit(bet);
    if (!ok) {
        btn.disabled = false;
        return;
    }
    
    const pick = () => _slotSymbols[Math.floor(Math.random() * _slotSymbols.length)];
    const r0 = pick();
    const r1 = pick();
    const r2 = pick();
    
    const jackpot = (r0 === '🔵' && r1 === '🩸') || (r0 === '🩸' && r1 === '🔵') || (r1 === '🔵' && r2 === '🩸') || (r1 === '🩸' && r2 === '🔵');
    const triple = (r0 === r1 && r1 === r2);
    const pair = (r0 === r1 || r1 === r2 || r0 === r2);
    
    spinReel(0, r0, 0);
    spinReel(1, r1, 1);
    spinReel(2, r2, 2);
    
    await new Promise(r => setTimeout(r, 1100));
    
    const st = currentUser.jjkStats || {};
    const gp = st.gamesPlayed || [];
    if (!gp.includes('slots')) gp.push('slots');
    
    await updateJJKStats({
        slotJackpot: (st.slotJackpot || 0) + (jackpot ? 1 : 0),
        gamesPlayed: gp
    });
    
    if (jackpot) {
        const pr = getJJKMultiplier(bet * 12);
        await jjkGameCredit(pr, 'Slot Jackpot Gojo+Sukuna');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `JACKPOT! Gojo & Sukuna — +${pr.toLocaleString('es')} PPC (x12)!`;
    } else if (triple) {
        const pr2 = getJJKMultiplier(bet * 8);
        await jjkGameCredit(pr2, 'Slot Triple x8');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `TRIPLE ${r0}! +${pr2.toLocaleString('es')} PPC (x8)!`;
    } else if (pair) {
        const pr3 = getJJKMultiplier(Math.round(bet * 2));
        await jjkGameCredit(pr3, 'Slot Par x2');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `Par! +${pr3.toLocaleString('es')} PPC (x2).`;
    } else {
        res.className = 'jjk-result-box jjk-result-lose';
        res.textContent = `Sin combinación — perdiste ${bet.toLocaleString('es')} PPC.`;
    }
    
    if (typeof trackMinigameResult === 'function') trackMinigameResult(jackpot || triple || pair);
    
    btn.disabled = false;
    if (bi) bi.value = '';
    await checkJJKAchievements();
    if (window.loadDashboard) window.loadDashboard();
}

// Finger Hunt
async function startFingerHunt() {
    if (!currentUser || !window._db) return;
    const bi = document.getElementById('finger-bet');
    const bet = parseInt(bi ? bi.value : 0);
    
    if (!bet || bet < 10) {
        showToast('Apuesta mínima 10 PPC', '#ffa500');
        return;
    }
    
    if (_jjkFingerActive) {
        showToast('Elige una caja primero', '#ffa500');
        return;
    }
    
    const ok = await jjkGameDebit(bet);
    if (!ok) return;
    
    _jjkFingerActive = true;
    _jjkFingerPos = Math.floor(Math.random() * 5);
    _jjkFingerBet = bet;
    
    const res = document.getElementById('finger-result');
    res.className = 'jjk-result-box jjk-result-neutral';
    res.textContent = 'El dedo está oculto! Elige una caja...';
    
    document.getElementById('finger-btn').disabled = true;
    for (let i = 0; i < 5; i++) {
        const b = document.getElementById('fb-' + i);
        if (b) {
            b.textContent = '📦';
            b.className = 'finger-box';
            b.style.pointerEvents = '';
        }
    }
}

async function pickFinger(idx) {
    if (!_jjkFingerActive) return;
    _jjkFingerActive = false;
    
    for (let i = 0; i < 5; i++) {
        const b = document.getElementById('fb-' + i);
        if (b) b.style.pointerEvents = 'none';
    }
    
    const correct = document.getElementById('fb-' + _jjkFingerPos);
    const res = document.getElementById('finger-result');
    
    if (correct) {
        correct.textContent = '🖐️';
        correct.classList.add('revealed', 'correct');
    }
    
    const st = currentUser.jjkStats || {};
    const gp = st.gamesPlayed || [];
    let wins = st.fingerWins || 0;
    if (!gp.includes('finger')) gp.push('finger');
    
    if (idx === _jjkFingerPos) {
        wins++;
        const pr = getJJKMultiplier(_jjkFingerBet * 4);
        await jjkGameCredit(pr, 'Finger Hunt — encontró el dedo');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `ENCONTRASTE EL DEDO DE SUKUNA! +${pr.toLocaleString('es')} PPC (x4)!`;
    } else {
        const wr = document.getElementById('fb-' + idx);
        if (wr) {
            wr.textContent = '❌';
            wr.classList.add('revealed', 'wrong');
        }
        res.className = 'jjk-result-box jjk-result-lose';
        res.textContent = `Caja equivocada. El dedo estaba en la caja ${_jjkFingerPos + 1}. Perdiste ${_jjkFingerBet.toLocaleString('es')} PPC.`;
    }
    
    if (typeof trackMinigameResult === 'function') trackMinigameResult(idx === _jjkFingerPos);
    
    await updateJJKStats({
        fingerWins: wins,
        gamesPlayed: gp,
        maxBet: Math.max(st.maxBet || 0, _jjkFingerBet)
    });
    
    document.getElementById('finger-btn').disabled = false;
    await checkJJKAchievements();
    if (window.loadDashboard) window.loadDashboard();
}

// Cursed Energy Gamble
function selectCurse(btn, lvl) {
    document.querySelectorAll('.curse-lvl-btn').forEach(b => {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
    _jjkCurseSelected = lvl;
}

async function playCurse() {
    if (!currentUser || !window._db) return;
    if (!_jjkCurseSelected) {
        showToast('Selecciona un nivel de energía', '#ffa500');
        return;
    }
    
    const bi = document.getElementById('curse-bet');
    const bet = parseInt(bi ? bi.value : 0);
    
    if (!bet || bet < 10) {
        showToast('Apuesta mínima 10 PPC', '#ffa500');
        return;
    }
    
    const btn = document.getElementById('curse-btn');
    const res = document.getElementById('curse-result');
    btn.disabled = true;
    
    const ok = await jjkGameDebit(bet);
    if (!ok) {
        btn.disabled = false;
        return;
    }
    
    await new Promise(r => setTimeout(r, 700));
    
    const actual = Math.floor(Math.random() * 5) + 1;
    const diff = Math.abs(actual - _jjkCurseSelected);
    
    const st = currentUser.jjkStats || {};
    const gp = st.gamesPlayed || [];
    if (!gp.includes('curse')) gp.push('curse');
    
    await updateJJKStats({
        gamesPlayed: gp,
        maxBet: Math.max(st.maxBet || 0, bet)
    });
    
    if (diff === 0) {
        const pr = getJJKMultiplier(bet * 5);
        await jjkGameCredit(pr, 'Cursed Energy exacto x5');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `EXACTO! Nivel de energía maldita ${actual} — Ganaste ${pr.toLocaleString('es')} PPC (x5)!`;
    } else if (diff === 1) {
        const pr2 = getJJKMultiplier(Math.round(bet * 1.8));
        await jjkGameCredit(pr2, 'Cursed Energy cercano x1.8');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `Casi! Nivel era ${actual} — Ganaste ${pr2.toLocaleString('es')} PPC (x1.8).`;
    } else {
        res.className = 'jjk-result-box jjk-result-lose';
        res.textContent = `Fallaste. Nivel de energía maldita era ${actual}. Tu elección: ${_jjkCurseSelected}. Perdiste ${bet.toLocaleString('es')} PPC.`;
    }
    
    if (typeof trackMinigameResult === 'function') trackMinigameResult(diff === 0 || diff === 1);
    
    btn.disabled = false;
    if (bi) bi.value = '';
    document.querySelectorAll('.curse-lvl-btn').forEach(b => b.classList.remove('selected'));
    _jjkCurseSelected = null;
    await checkJJKAchievements();
    if (window.loadDashboard) window.loadDashboard();
}

// Jujutsu Battle minigame
async function playBattle() {
    if (!currentUser || !window._db) return;
    const bi = document.getElementById('battle-bet');
    const bet = parseInt(bi ? bi.value : 0);
    
    if (!bet || bet < 10) {
        showToast('Apuesta mínima 10 PPC', '#ffa500');
        return;
    }
    
    const btn = document.getElementById('battle-btn');
    const res = document.getElementById('battle-result');
    const log = document.getElementById('battle-log');
    btn.disabled = true;
    
    const ok = await jjkGameDebit(bet);
    if (!ok) {
        btn.disabled = false;
        return;
    }
    
    const jr = getJJKRankData();
    const gt = (jr && typeof jr.gradeTier === 'number') ? jr.gradeTier : 0;
    const pp = 20 + gt * 20;
    
    const enemy = BATTLE_ENEMIES[Math.floor(Math.random() * BATTLE_ENEMIES.length)];
    
    const bpe = document.getElementById('bp-emoji');
    const bee = document.getElementById('be-emoji');
    const bpn = document.getElementById('bp-name');
    const ben = document.getElementById('be-name');
    
    if (bpe) bpe.innerHTML = `<i class="${(jr && jr.icon) ? jr.icon : 'fa-solid fa-user-ninja'}"></i>`;
    if (bee) bee.innerHTML = `<i class="${enemy.emoji}"></i>`;
    if (bpn) bpn.textContent = (jr && jr.label) ? jr.label.toUpperCase() : 'TU';
    if (ben) ben.textContent = enemy.name.toUpperCase();
    
    const bpHp = document.getElementById('bp-hp');
    const beH = document.getElementById('be-hp');
    if (bpHp) bpHp.style.width = '100%';
    if (beH) beH.style.width = '100%';
    
    log.textContent = 'Iniciando combate maldito...';
    await new Promise(r => setTimeout(r, 400));
    
    let ph = 100, eh = 100, rounds = 0;
    let logs = [];
    
    while (ph > 0 && eh > 0 && rounds < 10) {
        rounds++;
        const pa = Math.round((Math.random() * 0.6 + 0.7) * pp);
        const ea = Math.round((Math.random() * 0.6 + 0.7) * enemy.power);
        
        eh = Math.max(0, eh - pa);
        ph = Math.max(0, ph - ea);
        
        if (bpHp) bpHp.style.width = ph + '%';
        if (beH) beH.style.width = eh + '%';
        
        logs.push(`Rnd ${rounds}: Daño infligido(${pa}) | Daño recibido(${ea})`);
        if (logs.length > 2) logs.shift();
        log.innerHTML = logs.join('<br>');
        
        await new Promise(r => setTimeout(r, 400));
    }
    
    const st = currentUser.jjkStats || {};
    const gp = st.gamesPlayed || [];
    let bw = st.battleWins || 0;
    if (!gp.includes('battle')) gp.push('battle');
    
    if (ph > eh || eh <= 0) {
        bw++;
        const mult = eh <= 0 ? 2.5 : 1.5;
        const pr = getJJKMultiplier(Math.round(bet * mult));
        await jjkGameCredit(pr, 'JJK Battle victoria');
        res.className = 'jjk-result-box jjk-result-win';
        res.textContent = `VICTORIA! Derrotaste a ${enemy.name} — +${pr.toLocaleString('es')} PPC (x${mult})!`;
    } else {
        res.className = 'jjk-result-box jjk-result-lose';
        res.textContent = `DERROTA. ${enemy.name} superó tu fuerza. Mejora tu grado de Hechicero JJK.`;
    }
    
    if (typeof trackMinigameResult === 'function') trackMinigameResult(ph > eh || eh <= 0);
    
    await updateJJKStats({
        battleWins: bw,
        gamesPlayed: gp,
        maxBet: Math.max(st.maxBet || 0, bet)
    });
    
    btn.disabled = false;
    if (bi) bi.value = '';
    await checkJJKAchievements();
    if (window.loadDashboard) window.loadDashboard();
}
