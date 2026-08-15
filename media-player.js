/* ═══════════════════════════════════════════════
   MEDIA PLAYER — Pure HTML5, no AudioContext
   (AudioContext breaks on GitHub Pages / file://)
═══════════════════════════════════════════════ */

if (typeof escHTML === 'undefined') {
    window.escHTML = function(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
}

const papuPlaylist = [
    { file: 'i wanna be your boyfriend.mp3', title: 'I Wanna Be Your Boyfriend', artist: 'Hot Freaks',
      lyrics: `[00:00.18]I wanna be your boyfriend
[00:04.28]I wanna be your boyfriend
[00:08.16]I wanna be your boyfriend
[00:12.03]I wanna be your boyfriend
[00:15.53]Woo!
[00:31.74]Ooh, I'm in love
[00:33.27]It's a mystery
[00:35.25]When I see you out at night
[00:37.49]I start to get dizzy
[00:39.98]Before I see you I pick out some things to say
[00:43.43]Don't want to sound foolish and waste my chance away
[00:47.46]Oh, I'm not gonna make the same mistakes
[00:52.10]I'm not gonna run
[00:55.87]Just pick the boy you like
[00:59.88]I've got my home set
[01:03.11]I wanna be your boyfriend
[01:05.28]I wanna be your boyfriend
[01:07.00]I wanna go on walks with you
[01:09.05]I wanna have long talks with you
[01:11.24]You can be my girlfriend
[01:13.15]You can be my girlfriend
[01:15.07]I'd compliment you frequently
[01:17.07]I wanna treat you decently
[01:19.04]La la la
[01:27.17]Ooh, you're in demand
[01:28.47]It's impossible
[01:30.38]When I see you out at night
[01:32.63]All the guys are crowding around
[01:35.13]They're telling you the same things that I planned to say
[01:38.48]I thought I was unique
[01:40.46]Maybe I'm not that way
[01:56.32]I wanna be your boyfriend
[01:58.47]I wanna be your boyfriend
[02:00.32]I wanna be your boyfriend
[02:02.26]I wanna be your boyfriend
[02:04.10]I wanna go on walks with you
[02:06.17]I wanna have long talks with you
[02:08.23]You can be my girlfriend
[02:10.16]You can be my girlfriend
[02:11.97]I'd compliment you frequently
[02:13.92]I wanna treat you decently
[02:16.00]La la la la la la la la la la la la la` },

    { file: 'nuts.mp3', title: 'nuts', artist: 'Lil Peep ft. Rainy Bear',
      lyrics: `[00:00.00]nuts — Lil Peep ft. Rainy Bear
[00:03.00]I can see it in your eyes that you wanna get out
[00:05.50]I can see it in your eyes that you need it right now
[00:08.00]That you need it right now
[00:10.00]That you wanna get out
[00:12.00]That you need it right now
[00:14.00]That you wanna get out
[00:16.00]Yeah, I just wanna hear the sound
[00:18.50]Drive our Camaros out of town
[00:21.00]Baby, we could leave right now, woah
[00:23.50]Yeah, I just wanna feel alive
[00:26.00]Baby, take your time
[00:28.00]Smokin' on this loud, woah
[00:30.50]Girl u know u make my cold heart warm wit a touch
[00:33.00]One kiss then we fuckin I just can't get enough
[00:35.50]Put it on me that's the best part baby the trust
[00:38.00]Trust me I got nuthin for u other than love
[00:40.50]I remember eatin pussy on the back of the bus
[00:43.00]I remember gettin nookie till the sun came up
[00:45.50]All the places that u took me no one came wit us
[00:48.00]Same hoes overlook me now they on my nuts
[00:50.50]Yeah, I just wanna hear the sound
[00:53.00]Drive our Camaros out of town
[00:55.50]Baby, we could leave right now, woah
[00:58.00]Yeah, I just wanna feel alive
[01:00.50]Baby, take your time
[01:03.00]Smokin' on this loud, woah` },

    { file: 'kissme.mp3', title: 'i like the way you kiss me', artist: 'Artemas',
      lyrics: `[00:00.00]i like the way you kiss me — Artemas
[00:03.00]I like the way you kiss me
[00:05.50]I like the way you, uh
[00:08.00]I like the way you kiss me, I can tell you miss me
[00:10.50]I can tell it hits, hits, hits, hits
[00:13.00]Not tryna be romantic, I'll hit it from the back
[00:15.50]Just so you don't get attached
[00:18.00]I like the way you kiss me, I can tell you miss me
[00:20.50]I can tell it hits, hits, hits, hits
[00:23.00]Not tryna be romantic, I'll hit it from the back
[00:25.50]Just so you don't get attached
[00:28.00]You bite my lip just for the taste
[00:30.50]You're on your knees, I'm on the case
[00:33.00]You take the heat and with such grace
[00:35.50]You say we're done, but here you stay
[00:38.00]You said you're scared, I'll let you down
[00:40.50]Just stick around, and you'll find out
[00:43.00]But don't you wanna make me proud?
[00:45.50]Cause I'm so proud, baby, I'm so proud of you
[00:48.00]Do I stress you out? Can I help you out?
[00:50.50]Does it turn you on when I turn you around?
[00:53.00]Can we make a scene? Can you make it loud?
[00:55.50]Cause I'm so proud, baby, I'm so proud of you` },

    { file: 'harvey.mp3', title: 'Harvey', artist: "HER'S",
      lyrics: `[00:00.00]Harvey — HER'S
[00:10.00]Some people think I'm acting worse for wear
[00:14.00]Suffice to say this is a quaint affair
[00:18.00]But no one really knows me like Harvey
[00:22.00]And once you've met him I'm sure you'll agree
[00:26.00](Yeah I get it, you wanna know)
[00:30.00](Who he is, where we go)
[00:34.00](Yeah I get it, you wanna see)
[00:38.00](What it is, him and me)
[00:42.00]Nobody knows what I see
[00:46.00]Nobody knows I'm waiting
[00:49.00]Waiting for you to call
[00:52.00]Nobody knows what I see
[00:56.00]Everyone thinks I'm crazy
[00:59.00]Crazy for you, oh boy
[01:02.00]Nobody knows what I see
[01:06.00]Nobody knows I'm waiting
[01:09.00]Waiting for you to call
[01:12.00]Nobody knows what I see
[01:16.00]Everyone thinks I'm crazy
[01:19.00]Crazy for you, oh boy` },

    { file: 'olvidar.mp3', title: '¿Me Dejas Olvidar?', artist: 'Perfecto Miserable',
      lyrics: `[00:00.00]¿Me Dejas Olvidar? — Perfecto Miserable
[00:05.00]¿Dónde te has ido?
[00:07.50]Parece que no estás
[00:10.00]Dispara a matar
[00:12.50]No va a dolerme, no dolerá
[00:15.00]No va a dolerme, si duele ya
[00:17.50]Tus palabras sé que me matarán
[00:20.00]Yo me odio más
[00:22.50]Durmiendo solo en tu cama
[00:25.00]Tus golpes matan, sé que me dolerán
[00:27.50]Pero tus palabras duelen más
[00:30.00]Piénsalas, dame el golpe que me remplace
[00:32.50]Ya no sientes nada
[00:35.00]Y en este cuarto solo quede yo
[00:37.50]Si digo que no te quiero
[00:40.00]Te entierro en un cuerpo nuevo
[00:42.50]Si busco un cerebro nuevo
[00:45.00]¿Me dejas olvidar?
[00:47.50]Si digo que no te quiero
[00:50.00]Te entierro en un cuerpo nuevo
[00:52.50]Si busco un cerebro nuevo
[00:55.00]¿Me dejas olvidar?
[00:57.50]Más rápido, ¿Te puedo olvidar?
[01:00.00]Más rápido, ¿Me dejas olvidar?` },

    { file: 'Intruso.mp3', title: 'Intruso', artist: 'Enjambre',
      lyrics: `[00:00.00]Intruso — Enjambre
[00:06.00]Hay un intruso en mi cuarto
[00:09.50]Lo veo por la ventana
[00:13.00]Yo afuera y él adentro un santo
[00:16.50]Yo el de vida profana
[00:20.00]Ese intruso en mi cuarto
[00:23.50]Se viste con mi ropa
[00:27.00]Le grito, no me escucha
[00:30.50]Y cuanto más trato, más se apropia de mis cosas
[00:34.00]Es de anatomía idéntica a la mía
[00:37.50]Su rostro es de alegría, el mío de agonía
[00:41.00]Miseria, tesoro
[00:43.50]Él ríe, yo lloro
[00:46.00]Los míos lo adoptan, lo arropan
[00:48.50]De lo que despoje se apropia
[00:51.00]Felices, yo triste
[00:53.50]Intruso me desapareciste!` },

    { file: 'Lovers Rock.mp3', title: 'Lovers Rock', artist: 'TV Girl',
      lyrics: `[00:00.00]Lovers Rock — TV Girl
[00:06.00]Are you sick of me?
[00:08.50]Would you like to be?
[00:11.00]I'm tryin' to tell you somethin'
[00:13.50]Somethin' that I already said
[00:16.00]You like a pretty boy
[00:18.50]With a pretty voice
[00:21.00]Who is tryin' to sell you somethin'
[00:23.50]Somethin' that you already have
[00:26.00]But if you're too drunk to drive, and the music is right
[00:29.50]She might let you stay, but just for the night
[00:32.00]And if she grabs for your hand, and drags you along
[00:34.50]She might want a kiss before the end of this song
[00:37.00]Because love can burn like a cigarette
[00:39.50]And leave you alone with nothin'
[00:42.00]And leave you alone with nothin'
[00:44.50]While the others talked
[00:47.00]We were listenin' to Lover's Rock
[00:49.50]In her bedroom, in her bedroom
[00:52.00]And if you start to kiss
[00:54.50]And the record skips
[00:57.00]Flip it over and sit a little closer` },

    { file: 'MARETU_Unknown.mp3', title: 'マエガミスト', artist: 'MARETU',
      lyrics: `[00:00.00]マエガミスト — MARETU
[00:05.00]Do-do-do-do-do-do-do
[00:07.50]Do you like me?
[00:10.00]Tawdrily longing for the strength
[00:12.50]In that mysterious voice
[00:15.00]I awkwardly gulped down the words
[00:17.50]That moisten my dried-up heart
[00:20.00]Thereafter, the saccharine flavor
[00:22.50]Of the tears that girl sheds
[00:25.00]Claws at the sorest spot
[00:27.50]Of that extreme pain for her
[00:30.00]Rather than have such a cruel, cruel scene
[00:32.50]Be put on display right in front of me, I
[00:35.00]Would like to grow out my bangs and conceal my eyes
[00:37.50]Because then, even this day that I somewhat hate
[00:40.00]Will vanish off to somewhere far away, I say
[00:42.50]I'll grow out my bangs and conceal my eyes
[00:45.00]So that my face and my cold stare
[00:47.50]Aren't exposed to your gaze
[00:50.00]So that I won't see you
[00:52.50]Do-do-do-do-do-do-do
[00:55.00]Do you like me?` },

    { file: 'Meant To Be.mp3', title: 'Meant To Be', artist: 'Cuntsniffer',
      lyrics: `[00:00.00]Meant To Be — Cuntsniffer
[00:03.00]A-B-C's and one-two-threes
[00:05.50]You and me are meant to be
[00:08.00]Four, five, six, is this a trick?
[00:10.50]I'm not sure but I will stick with
[00:13.00]Light blue eyes didn't show surprise
[00:15.50]When I explained the fact that I'm satisfied
[00:18.00]The butterflies move in my tummy
[00:20.50]Float around and make me feel really funny
[00:23.00]You disagree with my self-esteem
[00:25.50]Did I mention you were in my dreams?
[00:28.00]We could walk on the ceiling
[00:30.50]And we thought that nothing would go wrong
[00:33.00]Would you be so kind as to play along?
[00:35.50]A-B-C's and one-two-threes
[00:38.00]You and me are meant to be
[00:40.50]Four, five, six, is this a trick?
[00:43.00]I'm not sure but I will stick with you
[00:45.50]I will stick with you
[00:48.00]I will stick with you
[00:50.50]Tofu Kiss, I'm shot and hit
[00:53.00]If the target is your lips
[00:55.50]When you go, I'll throw a fit
[00:58.00]But when I get home, I'll call you in a bit
[01:00.50]TGI Fridays on Thursday night
[01:03.00]We tried our hardest to be polite
[01:05.50]We got caught in between a matching disease
[01:08.00]And I have this thing for you
[01:10.50]I have this thing for you
[01:13.00]A-B-C's and one-two-threes
[01:15.50]You and me are meant to be
[01:18.00]Four, five, six, is this a trick?
[01:20.50]I'm not sure but I will stick with you
[01:23.00]I will stick with you
[01:25.50]I will stick with you` },

    { file: 'pupsies - misery. (Lyrics).mp3', title: 'misery.', artist: 'pupsies',
      lyrics: `[00:00.00]misery. — pupsies
[00:06.00]I miss that kind of misery
[00:09.00]The kind where you are nice to me
[00:12.00]But only in the evening
[00:14.50]So I ask, "Am I just dreaming?"
[00:17.00]I love you so much that it's dripping
[00:19.50]Dripping from my arms and such
[00:22.00]I'm sorry, I know I'm too much
[00:24.50]To love, to trust, I'm nothing, but
[00:27.00]I miss that kind of misery
[00:29.50]The kind where you are nice to me
[00:32.00]But only in the evening
[00:34.50]So I ask, "Am I just dreaming?"
[00:37.00]You are what I could believe in
[00:39.50]Since I have nobody else
[00:42.00]I keep screaming, I keep breathing
[00:44.50]It's the living I can't help
[00:47.00]It's the misery 'cause you can tell me
[00:49.50]How much that you care
[00:52.00]And I know it's true, but yet
[00:54.50]You need to get me out your hair
[00:57.00]Is what we have special? What's that mean?
[00:59.50]Why can't you choose me, is it greed?
[01:02.00]This isn't lust, no fairy dust, it's blunt
[01:04.50]It's what you see
[01:07.00]Misery in knowing I love you and had to leave
[01:09.50]The misery that I can't shake
[01:12.00]The misery I bleed` },

    { file: 'The Rare Occasions  Origami (Lyric Video).mp3', title: 'Origami', artist: 'The Rare Occasions',
      lyrics: `[00:00.00]Origami — The Rare Occasions
[00:06.00]Take a look at me
[00:09.00]Crumpled up on the floor feeling lonely
[00:12.00]Honestly something is wrong with me
[00:15.00]I've been freaking out
[00:18.00]Folding myself into origami
[00:21.00]Terrified of what they would think of me
[00:24.00]I'll face the night deep in starlight
[00:27.00]Shadows unwind deep in starlight
[00:30.00]There's another way
[00:33.00]Apart from this misery and it's got me
[00:36.00]Wondering exactly what I'm missing
[00:39.00]Take a look at me
[00:42.00]Crumpled up on the floor feeling lonely
[00:45.00]Honestly something is wrong with me
[00:48.00]I'll face the night deep in starlight
[00:51.00]Shadows unwind deep in starlight
[00:54.00]I'll face the night` }
];

let curPapuTrack  = 0;
let pAudio        = null;
let pIsPlaying    = false;
let pVisualizerAF = null;
let lyricsVisible = false;

function initMediaPlayer() {
    pAudio = document.getElementById('papu-bg-music');
    if (!pAudio) return;
    if (pAudio._papuInit) return;
    pAudio._papuInit = true;

    // Auto-advance to next track when current ends
    pAudio.addEventListener('ended', () => {
        curPapuTrack = (curPapuTrack + 1) % papuPlaylist.length;
        loadPapuTrack(curPapuTrack);
        // loadPapuTrack already calls play() if pIsPlaying; just sync UI
        if (pIsPlaying) {
            _syncPlayButton(true);
            _startFakeVisualizer();
        }
    });

    // Sync lyrics to playback position
    pAudio.addEventListener('timeupdate', () => {
        syncLyrics(pAudio.currentTime);
    });

    loadPapuTrack(curPapuTrack);
    renderPlaylist();
}

function loadPapuTrack(idx) {
    const track = papuPlaylist[idx];
    if (!pAudio) return;

    pAudio.src = track.file;
    pAudio.load();

    // Update mini-player title
    const titleEl = document.getElementById('player-track-title');
    if (titleEl) titleEl.textContent = track.title + ' — ' + track.artist;

    // Update full player title
    const fullTitleEl = document.getElementById('full-player-track-title');
    if (fullTitleEl) fullTitleEl.textContent = track.title;
    const fullArtistEl = document.getElementById('full-player-track-artist');
    if (fullArtistEl) fullArtistEl.textContent = track.artist;

    // Update lyrics
    const lyricsEl = document.getElementById('lyrics-panel');
    if (lyricsEl) lyricsEl.textContent = track.lyrics;

    // Rebuild floating lyrics panel
    _parsedLyricsCache = null;
    _currentLyricsIdx = -1;
    if (floatingLyricsVisible) buildFloatingLyrics();

    // Update playlist active state
    document.querySelectorAll('.playlist-item').forEach((el, i) => {
        el.classList.toggle('active', i === idx);
    });

    if (pIsPlaying) {
        pAudio.play().catch(() => {});
    }
}

function togglePapuMusic() {
    if (!pAudio) { pAudio = document.getElementById('papu-bg-music'); }
    if (!pAudio) return;

    if (pIsPlaying) {
        pAudio.pause();
        pIsPlaying = false;
        _syncPlayButton(false);
        _stopFakeVisualizer();
    } else {
        pAudio.play().then(() => {
            pIsPlaying = true;
            _syncPlayButton(true);
            _startFakeVisualizer();
        }).catch(e => {
            console.warn('Audio play blocked:', e.message);
            showToast('Activa el audio con el botón ▶', 'var(--primary)');
        });
    }
}

function nextPapuSong() {
    curPapuTrack = (curPapuTrack + 1) % papuPlaylist.length;
    loadPapuTrack(curPapuTrack);
    if (pIsPlaying) pAudio.play().catch(() => {});
}

function prevPapuSong() {
    curPapuTrack = (curPapuTrack - 1 + papuPlaylist.length) % papuPlaylist.length;
    loadPapuTrack(curPapuTrack);
    if (pIsPlaying) pAudio.play().catch(() => {});
}

function playPapuTrack(idx) {
    curPapuTrack = idx;
    loadPapuTrack(curPapuTrack);
    if (!pIsPlaying) togglePapuMusic();
}

/* ── Lyrics toggle (floating panel) ─────────────── */

let floatingLyricsVisible = false;

function toggleFloatingLyrics() {
    floatingLyricsVisible = !floatingLyricsVisible;
    const panel = document.getElementById('floating-lyrics');
    const miniBtn = document.getElementById('lyrics-toggle-mini');
    if (panel) panel.style.display = floatingLyricsVisible ? 'flex' : 'none';
    if (miniBtn) miniBtn.style.color = floatingLyricsVisible ? 'var(--primary)' : 'var(--text-muted)';
    if (floatingLyricsVisible) buildFloatingLyrics();
}

function parseLRC(lrcText, skipTitle) {
    const lines = lrcText.split('\n');
    const result = [];
    for (const line of lines) {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
        if (match) {
            const min = parseInt(match[1]);
            const sec = parseInt(match[2]);
            const ms  = parseInt(match[3].padEnd(3, '0'));
            const time = min * 60 + sec + ms / 1000;
            const text = match[4].trim();
            if (text) {
                if (skipTitle && time === 0 && /[—-]|_/.test(text) && result.length === 0) continue;
                result.push({ time, text });
            }
        }
    }
    result.sort((a, b) => a.time - b.time);
    return result;
}

let _parsedLyricsCache = null;
let _currentLyricsIdx  = -1;

const DEFAULT_LYRIC_OFFSETS = {
    'i wanna be your boyfriend.mp3': 0,
    'nuts.mp3': 4.8,
    'kissme.mp3': -2.5,
    'harvey.mp3': 21.8,
    'olvidar.mp3': 22,
    'Intruso.mp3': 19.4,
    'Lovers Rock.mp3': 4.4,
    'MARETU_Unknown.mp3': 4,
    'Meant To Be.mp3': -3,
    'pupsies - misery. (Lyrics).mp3': 2,
    'The Rare Occasions  Origami (Lyric Video).mp3': 5.8
};

function _lyricOffsetKey() {
    const track = papuPlaylist[curPapuTrack];
    return 'papu_lyric_offset_' + (track ? track.file : 'none');
}

function getLyricOffset() {
    const key = _lyricOffsetKey();
    const saved = localStorage.getItem(key);
    if (saved !== null && saved !== '') return parseFloat(saved) || 0;
    const track = papuPlaylist[curPapuTrack];
    if (track && DEFAULT_LYRIC_OFFSETS.hasOwnProperty(track.file)) return DEFAULT_LYRIC_OFFSETS[track.file];
    return 0;
}

function shiftLyrics(delta) {
    const track = papuPlaylist[curPapuTrack];
    if (!track || !track.lyrics) return;
    const offset = Math.round((getLyricOffset() + delta) * 10) / 10;
    localStorage.setItem(_lyricOffsetKey(), String(offset));
    _refreshLyricOffsetDisplay();
    _currentLyricsIdx = -1;
    if (pAudio) syncLyrics(pAudio.currentTime);
}

function resetLyricsOffset() {
    localStorage.removeItem(_lyricOffsetKey());
    _refreshLyricOffsetDisplay();
    _currentLyricsIdx = -1;
    if (pAudio) syncLyrics(pAudio.currentTime);
}

function _refreshLyricOffsetDisplay() {
    const el = document.getElementById('lyric-offset-display');
    if (!el) return;
    const off = getLyricOffset();
    el.textContent = (off ? (off > 0 ? '+' : '') + off.toFixed(1) : '0.0') + 's';
}

function buildFloatingLyrics() {
    const body = document.getElementById('floating-lyrics-body');
    if (!body) return;
    const track = papuPlaylist[curPapuTrack];
    if (!track || !track.lyrics) { body.textContent = 'Sin letra disponible.'; _parsedLyricsCache = null; return; }

    const parsed = parseLRC(track.lyrics, true);
    _parsedLyricsCache = parsed;
    _currentLyricsIdx = -1;
    _refreshLyricOffsetDisplay();

    body.innerHTML = parsed.map((line, i) =>
        `<div class="lyric-line" data-idx="${i}" style="padding:4px 0;transition:all 0.3s;color:var(--text-muted);font-size:13px;">${escHTML(line.text)}</div>`
    ).join('');
}

function syncLyrics(currentTime) {
    if (!floatingLyricsVisible || !_parsedLyricsCache || !_parsedLyricsCache.length) return;

    const offset = getLyricOffset();
    const t = currentTime - offset;

    let idx = -1;
    for (let i = _parsedLyricsCache.length - 1; i >= 0; i--) {
        if (t >= _parsedLyricsCache[i].time) { idx = i; break; }
    }
    if (idx === _currentLyricsIdx) return;
    _currentLyricsIdx = idx;

    const body = document.getElementById('floating-lyrics-body');
    if (!body) return;
    const lines = body.querySelectorAll('.lyric-line');
    lines.forEach((el, i) => {
        if (i === idx) {
            el.style.color = 'var(--primary)';
            el.style.fontWeight = '700';
            el.style.fontSize = '15px';
            el.style.textShadow = '0 0 12px rgba(0,212,255,0.4)';
        } else if (Math.abs(i - idx) <= 1) {
            el.style.color = 'var(--text-main)';
            el.style.fontWeight = '500';
            el.style.fontSize = '13px';
            el.style.textShadow = 'none';
        } else {
            el.style.color = 'var(--text-muted)';
            el.style.fontWeight = '400';
            el.style.fontSize = '13px';
            el.style.textShadow = 'none';
        }
    });

    // Auto-scroll to active line
    if (idx >= 0 && lines[idx]) {
        const container = body;
        const el = lines[idx];
        const offset = el.offsetTop - container.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;
        container.scrollTo({ top: offset, behavior: 'smooth' });
    }
}

/* ── Full page lyrics toggle (media page) ──────── */

function toggleLyrics() {
    lyricsVisible = !lyricsVisible;
    const lyricsPanel = document.getElementById('lyrics-panel');
    const toggleBtn = document.getElementById('lyrics-toggle-btn');
    if (lyricsPanel) lyricsPanel.style.display = lyricsVisible ? 'block' : 'none';
    if (toggleBtn) toggleBtn.innerHTML = lyricsVisible ? '<i class="fa-solid fa-eye-slash"></i> Ocultar letra' : '<i class="fa-solid fa-music"></i> Mostrar letra';
}

/* ── Playlist render ───────────────────────────── */

function renderPlaylist() {
    const container = document.getElementById('playlist-container');
    if (!container) return;
    container.innerHTML = '';
    papuPlaylist.forEach((track, idx) => {
        const item = document.createElement('div');
        item.className = 'playlist-item' + (idx === curPapuTrack ? ' active' : '');
        item.onclick = () => playPapuTrack(idx);
        item.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:8px;background:${idx === curPapuTrack ? 'rgba(0,212,255,0.1)' : 'transparent'};transition:all 0.2s;">
                <div style="width:40px;height:40px;border-radius:8px;background:${idx === curPapuTrack ? 'var(--primary)' : 'rgba(0,0,0,0.2)'};display:flex;align-items:center;justify-content:center;color:${idx === curPapuTrack ? '#000' : 'var(--text-muted)'};font-weight:700;font-size:14px;">${idx + 1}</div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${idx === curPapuTrack ? 'var(--primary)' : 'var(--text-main)'};">${track.title}</div>
                    <div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${track.artist}</div>
                </div>
                <i class="fa-solid fa-play" style="color:var(--text-muted);opacity:0;transition:opacity 0.2s;"></i>
            </div>
        `;
        item.onmouseenter = () => item.querySelector('i').style.opacity = '1';
        item.onmouseleave = () => item.querySelector('i').style.opacity = '0';
        container.appendChild(item);
    });
}

/* ── UI helpers ─────────────────────────────── */

function _syncPlayButton(playing) {
    const btn = document.querySelector('#play-btn i');
    if (btn) btn.className = playing ? 'fas fa-pause' : 'fas fa-play';
    const fullBtn = document.getElementById('full-play-btn');
    if (fullBtn) fullBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
}

/* Fake visualizer — canvas bars that dance even without AudioContext */
function _startFakeVisualizer() {
    // Mini player canvas
    const canvas = document.getElementById('wave-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width  = canvas.offsetWidth  || 80;
        canvas.height = canvas.offsetHeight || 30;
        if (!canvas._drawing) {
            canvas._drawing = true;
            function draw() {
                if (!canvas._drawing) return;
                pVisualizerAF = requestAnimationFrame(draw);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const bars = 12;
                const barW = (canvas.width / bars) * 0.6;
                const gap  = (canvas.width / bars) * 0.4;
                for (let i = 0; i < bars; i++) {
                    const h = Math.max(4, Math.abs(Math.sin(Date.now() / 200 + i * 0.7)) * canvas.height * 0.85);
                    const x = i * (barW + gap);
                    const y = (canvas.height - h) / 2;
                    ctx.fillStyle = `rgba(0,212,255,${0.4 + Math.abs(Math.sin(Date.now()/300+i)) * 0.5})`;
                    ctx.fillRect(x, y, barW, h);
                }
            }
            draw();
        }
    }
    // Full player canvas
    const fullCanvas = document.getElementById('full-wave-canvas');
    if (fullCanvas) {
        const ctx = fullCanvas.getContext('2d');
        fullCanvas.width  = fullCanvas.offsetWidth  || 400;
        fullCanvas.height = fullCanvas.offsetHeight || 60;
        if (!fullCanvas._drawing) {
            fullCanvas._drawing = true;
            function drawFull() {
                if (!fullCanvas._drawing) return;
                fullCanvas._raf = requestAnimationFrame(drawFull);
                ctx.clearRect(0, 0, fullCanvas.width, fullCanvas.height);
                const bars = 24;
                const barW = (fullCanvas.width / bars) * 0.6;
                const gap  = (fullCanvas.width / bars) * 0.4;
                for (let i = 0; i < bars; i++) {
                    const h = Math.max(4, Math.abs(Math.sin(Date.now() / 180 + i * 0.5)) * fullCanvas.height * 0.85);
                    const x = i * (barW + gap);
                    const y = (fullCanvas.height - h) / 2;
                    ctx.fillStyle = `rgba(0,212,255,${0.3 + Math.abs(Math.sin(Date.now()/250+i)) * 0.6})`;
                    ctx.fillRect(x, y, barW, h);
                }
            }
            drawFull();
        }
    }
}

function _stopFakeVisualizer() {
    if (pVisualizerAF) { cancelAnimationFrame(pVisualizerAF); pVisualizerAF = null; }
    const canvas = document.getElementById('wave-canvas');
    if (canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        canvas._drawing = false;
    }
    const fullCanvas = document.getElementById('full-wave-canvas');
    if (fullCanvas) {
        if (fullCanvas._raf) { cancelAnimationFrame(fullCanvas._raf); fullCanvas._raf = null; }
        fullCanvas.getContext('2d').clearRect(0, 0, fullCanvas.width, fullCanvas.height);
        fullCanvas._drawing = false;
    }
}

/* ── Full player page loader ───────────────────── */

async function loadMediaPage() {
    if (!currentUser) return;
    // Re-render playlist in case of dynamic changes
    renderPlaylist();
    // Ensure current track info is displayed
    loadPapuTrack(curPapuTrack);
    // Sync full player play button state
    const fullBtn = document.getElementById('full-play-btn');
    if (fullBtn) fullBtn.innerHTML = pIsPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    // Start full player visualizer if playing
    if (pIsPlaying) _startFakeVisualizer();
}