# AGENTS.md — PapusBank-V2

Este archivo es EXCLUSIVO para el agente (opencode). Documenta el contexto completo del proyecto y el flujo de trabajo para no perder información entre sesiones.

---

## Flujo de trabajo

1. **El agente modifica archivos** en la raíz del proyecto (`C:\Users\saidm\Desktop\PapusBank-V2\`).
2. **Se hace commit y push directo a GitHub** (`git add . && git commit && git push`). GitHub Pages se actualiza solo.
3. **Se actualiza este archivo** con el registro de lo que se hizo.

**REGLAS:**
- Publicar directamente a GitHub. No es necesario copiar archivos a `Actualizacion/` para revisión.
- `Actualizacion/` se mantiene por si acaso, pero ya no se usa en el flujo normal.
- Este archivo (`AGENTS.md`) vive en la raíz del proyecto, NUNCA en `Actualizacion/`.
- Documentar TODO lo importante aquí para que la siguiente sesión tenga contexto.
- **Antes de cada push**, enviar al usuario un **mensaje para WhatsApp comunidad** estilo llamativo con emojis, resumiendo los cambios para que lo mande al grupo.

**FORMATO DEL MENSAJE (IMPORTANTE):**
- Cada cosa en su propia línea, separada, NO juntas
- Ejemplo de cómo el usuario quiere el formato:

```
💀⚡️ ¡ACTUALIZACIÓN PAPUSBANK! ⚡️💀

🎵 **NUEVAS CANCIONES:**

🔥 **Intruso**
Enjambre

🎤 **Meant To Be**
Cuntsniffer

🐉 **NUEVA SECCIÓN: 7 PECADOS CAPITALES**

⚔️ **Diane**
2,000,000 PPC — x1.5

🦊 **Ban**
5,000,000 PPC — x2

🏆 **FEATURES TOTALES:** XX+ features 🏆
```

**REGLAS DEL FORMATO:**
- Cada item en su propia línea (nombre, luego precio/detalles abajo)
- NO usar listas con guiones (-) ni comas para separar
- Emojis en cada rangos/personajes
- Secciones separadas por categorías
- Título llamativo con emojis al inicio

---

## Estructura del proyecto

- `index.html` — HTML principal (auth, dashboard, todas las páginas)
- `style.css` — Estilos globales
- `app.js` — Lógica principal (auth, routing, admin, dashboard)
- `banking.js` — Lógica bancaria (transacciones, préstamos, hashing)
- `market.js` — Tienda del clan
- `vault.js` — Bóvedas de ahorro
- `media-player.js` — Reproductor de música (playlist, mini-player, full player, visualizador)
- `chat.js` — Chat en vivo
- `board.js` — Tablón de anuncios
- `comments.js` — Comentarios de perfil
- `social.js` — Sistema social
- `logros.js` — Logros y trofeos
- `clan-features.js` — Rangos, sistema de ranks, funciones del clan
- `ben10.js`, `mha.js`, `godzilla.js`, `nanatsu.js` — Módulos de anime/theming
- `minigames.js` — Minijuegos (slots, finger hunt, etc.)
- `verificacion.js` — Verificación de 2 pasos
- `server_papubank.ps1` — Server localhost:8080 (PowerShell)
- `server_papubank_ps1_8081.ps1` — Server localhost:8081 (verificación)
- `Actualizacion/` — Carpeta temporal para mostrar cambios al usuario
- `AGENTS.md` — Este archivo (contexto del agente)

---

## Stack técnico

- Frontend: HTML + CSS + Vanilla JS (sin frameworks)
- Backend: Firebase (Firestore) vía CDN modular
- Server: PowerShell HttpListener en puerto 8080
- Auth: Contraseña hasheada con `hashPass()` en banking.js
- Audio: HTML5 `<audio>` puro (sin AudioContext por compatibilidad con file://)

---

## Historial de cambios

### Sesión 1 (previa a AGENTS.md)
- **media-player.js**: MARETU renombrado a MARETU_Unknown.mp3, fix lyrics panel ID, sync play button mini+full, visualizador en ambos canvas
- **index.html**: HTML del media player con mini-player y full player
- **app.js**: initMediaPlayer() y initMatrix() al login, routing loadMediaPage()

### Sesión 2
- Server localhost verificado (reinicio de procesos colgados en puerto 8080)
- 10 archivos MP3 subidos a GitHub desde `Actualizacion/`
- `Actualizacion/` limpiada completamente
- `AGENTS.md` creado y documentado

### Sesión 3 — Floating Lyrics Panel + Letras Sincronizadas
- **index.html**: Nuevo `<div id="floating-lyrics">` con header y body, botón toggle en mini-player (`#lyrics-toggle-mini`)
- **style.css**: Estilos para `#floating-lyrics` (position fixed, bottom:70px, z-index:2001, animación slideUp, scrollbar custom, responsive mobile)
- **media-player.js**: 
  - `toggleFloatingLyrics()` — muestra/oculta el panel flotante
  - `buildFloatingLyrics()` — renderiza las líneas de la letra en el panel
  - `parseLRC()` — parsea formato LRC `[mm:ss.xx]texto` a array `{time, text}`
  - `syncLyrics(currentTime)` — resalta línea activa, auto-scroll suave
  - Listener `timeupdate` en `<audio>` para llamar `syncLyrics()` cada frame
  - `loadPapuTrack()` reconstruye el panel al cambiar canción
  - Letras de las 10 canciones en formato LRC con timestamps
  - Fallback `escHTML()` si `app.js` aún no cargó

### Sesión 4 — Corrección de artistas y letras + Multiplicador en logros y tienda
- **media-player.js**: Corregidos artistas y letras reales de Genius/Spotify/lyrics sites:
  - NUTS: `6IX9INE ft. Lil Uzi Vert` → `Lil Peep ft. Rainy Bear` (letra real)
  - Meant To Be: `Bebe Rexha ft. Florida Georgia Line` → `Cuntsniffer` (letra real)
- **logros.js**: Recompensas de logros ahora usan `getRankMultiplier()` para multiplicar el PPC según el rango del usuario
- **nanatsu.js**: Logros de 7 Pecados Capitales ahora aplican multiplicador de rango
- **app.js**: Logros JJK ahora aplican multiplicador de rango
- **market.js**: Items de tienda instantáneos (bonus_100, bonus_500, sukuna_finger) ahora aplican multiplicador de rango
- **AGENTS.md**: Agregada regla de enviar "release notes" al usuario antes de limpiar `Actualizacion/`
- `Actualizacion/` actualizado con cambios

### Sesión 5
- `Actualizacion/` limpiada completamente (0 archivos)
- Usuario confirmó subida a GitHub

### Sesión 6 — Nobleza de las Flores + Economía Plus + Nuevos Fandoms + Extras
- **flores.js**: Nuevo archivo con sistema completo de parejas
  - 5 rangos de relación: Enamorados → Comprometidos → Almas Gemelas → Matrimonio → Eternos
  - Sistema de solicitudes (usuario envía → otro acepta)
  - Asignación admin con fecha personalizada
  - Bóveda compartida con depósitos/retiros
  - Cartas de amor
  - 8 logros exclusivos
  - Bonus diario según rango de relación
- **economy.js**: Nuevo archivo con funciones económicas
  - Cuentas de Ahorro Premium (6 tiers: Bronce → Mítico)
  - Préstamos entre usuarios (4 tiers con intereses)
  - Dividendos pasivos según rango
  - Bolsa de Valores (5 acciones con precios variables)
  - Regalos y Donaciones con mensaje
- **chainsaw.js**: Nuevo fandom Chainsaw Man
  - 7 rangos: Denji → Darkness Devil
  - 3 items especiales
  - 4 logros exclusivos
- **mushoku.js**: Nuevo fandom Mushoku Tensei
  - 6 rangos: Rudeus → Laplace Demon
  - 3 items especiales
  - 4 logros exclusivos
- **extras.js**: Nuevo archivo con extras
  - 8 logros secretos ocultos
  - 8 temas personalizables (Cyber, Violet, Fire, Forest, Ocean, Gold, Dark, Neon)
  - 10 aros de perfil (Bronce → Animado con arcoíris)
- **index.html**: 
  - Sidebar: Nobleza de las Flores + 4 secciones económicas + 2 nuevos fandoms + 3 extras
  - Pages: flores, premium, loans, stocks, gifts, chainsaw, mushoku, themes, rings, secrets
  - Scripts: flores.js, economy.js, chainsaw.js, mushoku.js, extras.js
- **style.css**: Estilos para Nobleza de las Flores + animación de aro
- **app.js**: Routing para todas las nuevas páginas + loadSavedTheme()
- `Actualizacion/` actualizado con todos los cambios

### Sesión 7
- `Actualizacion/` limpiada completamente (0 archivos)
- Usuario confirmó subida a GitHub

### Sesión 8 — Exchange PPC↔P-USD + Tienda Premium + Balance JJK
- **exchange.js**: Nuevo archivo con sistema de intercambio
  - Conversión PPC ↔ P-USD (tasa fija: 1 P-USD = 30,000 PPC)
  - Tienda Premium con items exclusivos (cosméticos, pets, boosters, títulos, funcionales)
  - NO duplica rangos de cada fandom
- **clan-features.js**: JJK rangos rebalanceados + price_usd
  - Precios reducidos de 75M-2B a 5M-100M PPC
  - Multiplicadores aumentados de 0.08-0.60 a 1.2-5.0
  - Agregado `price_usd` y `gradeTier` a todos los rangos
- **index.html**:
  - Sidebar: Exchange + Tienda Premium
  - Pages: page-exchange + page-premiumshop
  - Script: exchange.js
- **app.js**: Routing para exchange y premiumshop

### Sesión 9 — Dual Currency en TODOS los Fandoms
- **Todos los fandoms** ahora muestran precio en PPC + P-USD:
  - chainsaw.js: 7 rangos (Reze y Darkness Devil requieren ambos pagos)
  - mushoku.js: 6 rangos (Orsted y Laplace requieren ambos pagos)
  - nanatsu.js: 7 rangos (Merlin y Escanor requieren ambos pagos)
  - mha.js: 10 rangos (All Might, Shigaraki, All For One requieren ambos pagos)
  - godzilla.js: 12 rangos (Shin, KotM, GvK, Minus One, Earth requieren ambos pagos)
  - ben10.js: 15 rangos (Way Big, Swampfire, Humungousaur, Alien X requieren ambos pagos)
  - clan-features.js: Frieren (Himmel) + Rangos Olimpo (Zeus, Gea, Nix requieren ambos pagos)
- **Lógica de compra**:
  - gradeTier >= 3: Requiere AMBOS pagos (PPC + P-USD juntos)
  - gradeTier < 3: Acepta cualquiera de los dos
- **Render**: Muestra dos precios lado a lado (verde PPC, dorado P-USD) + nota "Requiere ambos pagos"
- `Actualizacion/` actualizado con 10 archivos

### Sesión 10 — Sistema de Cumpleaños + Fix Syntax Error
- **birthdays.js**: Nuevo archivo con sistema de cumpleaños
  - Admin asigna cumpleaños a usuarios (nick + fecha)
  - Bono automático de 50,000 PPC al login en el día del cumple
  - Página de cumpleaños próximos ordenados por fecha
  - Destaca si hoy es el cumple de alguien
  - Admin puede eliminar cumpleaños
- **logros.js**: Nuevo logro "Cumpleañero" (reward: 200 PPC)
- **index.html**:
  - Sidebar: Enlace a Cumpleaños
  - Page: page-birthdays
  - Script: birthdays.js
- **app.js**:
  - Routing: `case 'birthdays': loadBirthdaysPage()`
  - `checkBirthdayBonus()` se ejecuta al login (3 puntos: login manual, registro, auto-login)
  - **FIX**: Eliminado `}` extra en línea 748 que rompía todo el JS (SyntaxError)
- `Actualizacion/` limpiada
- Usuario confirmó subida a GitHub

### Sesión 11 — 7 Nuevos Fandoms
- **deathnote.js**: Death Note — 7 rangos (Light → Shinigami King), items, logros, dual currency
- **berserk.js**: Berserk — 7 rangos (Guts → God Hand), items, logros, dual currency
- **elfen.js**: Elfen Lied — 6 rangos (Lucy → Reina Diclonius), items, logros, dual currency
- **rezero.js**: Re:Zero — 7 rangos (Subaru → Brucha del Odio), items, logros, dual currency
- **rimuru.js**: Rimuru Tempest — 7 rangos (Slime → Awakened), items, logros, dual currency
- **bocchi.js**: Bocchi the Rock! — 6 rangos (Hitori → Guitar Hero Legend), items, logros, dual currency
- **vocaloid.js**: Vocaloids — 7 rangos (Luka → Virtual Diva Suprema), items, logros, dual currency
- **index.html**: Sidebar + 7 pages + 7 script tags
- **app.js**: Routing + titleMap para las 7 páginas
- Todos con: gradeTier, dual currency (PPC + P-USD), getRankMultiplier, addTx
- `Actualizacion/` actualizado con 9 archivos
- Usuario confirmó subida a GitHub

### Sesión 11b — Fix Teto + Titles
- **vocaloid.js**: Agregado Kasane Teto como rango (40M PPC, $1,300 P-USD, x4, grade A)
- Achievement coleccionista actualizado a 8 rangos
- **app.js**: Agregados títulos faltantes al titleMap (godzilla, chainsaw, mushoku, flores, premium, stocks, gifts, exchange, premiumshop)
- `Actualizacion/` limpiada
- Usuario confirmó subida a GitHub

### Sesión 12 — 10 Temas Nuevos con Wallpapers
- **extras.js**: 18 temas totales (8 originales + 10 nuevos)
  - Todos con wallpaper de fondo (imágenes en `/wallpapers/`)
  - Cyber, Violet, Fire, Forest, Ocean, Gold, Dark, Neon + Blood, Phantom, Toxic, Sakura, Abyss, Ember, Royal, Ice, Sunset, Miku
- **wallpapers/**: 18 imágenes de fondo para cada tema
- **applyTheme()**: Ahora aplica wallpaper de fondo (cover, center, fixed)
- **renderThemes()**: Preview del wallpaper en cada card de tema
- **Subir fondo personalizado**: Botón para upload de imagen custom (guarda en localStorage)
- **loadSavedTheme()**: Restaura wallpaper custom o del tema guardado
- `Actualizacion/` limpiada
- Usuario confirmó subida a GitHub

### Sesión 13 — Godzilla Expandido (31 Rangos)
- **godzilla.js**: Expandido de 12 a 31 rangos
  - Canon (12): Gojira 1954, Showa, 1984, Baby, Burning, 2000, Final Wars, Legendary, 2024 Evolution, Super Godzilla, SpaceGodzilla, Shin, KotM, GvK, Minus One, Earth
  - Non-Canon (4): Godzilla in the Hell, Bloodbath, in the Suit, Hakaishin (el más roto)
  - Kaijus (10): Kong, King Ghidorah, MUTO Hembra, MUTO Macho, MUTO Prime, Cylla, Skar King, Shimo, Mecha Godzilla, Destoroyah (el más cheto)
  - Todos con dual currency (PPC + P-USD), gradeTier, mult
- `Actualizacion/` limpiada
- Usuario confirmó subida a GitHub

### Sesión 15 — Fix login after rename + hashSalt system
- **app.js**: `doLogin()` ahora usa `data.hashSalt || nick` como salt del hash, permitiendo login después de renombrar
- **index.html**: `adminRenameUser()` ahora guarda `hashSalt: oldNick` al mover el doc de usuario
- **fix_hash.html**: Herramienta temporal (ya eliminada) para arreglar usuarios renombrados sin hashSalt
- **Usuario renombrado**: emilio → solariswat — hashSalt修复成功, login funciona de nuevo
- fix_hash.html eliminada del repo después de uso (seguridad)

### Sesión 16 — Bug fixes + Firebase Storage avatars
- **minigames.js**: Agregadas funciones `initSlots`, `initFingerHunt`, `initCursedEnergy`, `initBatalla` que renderizan el HTML de cada minijuego (antes solo existían las funciones play, faltaban las init)
- **index.html**: openMinigame ahora incluye nanatsu_dragon/sun/spear/infinity con placeholder "Próximamente..."
- **banking.js**: Transferencia ahora auto-crea bank_account si el destinatario no tiene una (antes fallaba con "no tiene cuenta bancaria")
- **index.html**: Firebase Storage SDK agregado (getStorage, ref, uploadBytes, getDownloadURL) — expuesto como `_fbStorage`, `_fbStorageRef`, `_fbUploadBytes`, `_fbGetDownloadURL`
- **app.js**: `uploadCustomAvatar()` ahora sube a Firebase Storage (`avatars/{nick}.jpg`) en vez de base64 en Firestore. Resize a 256x256, JPEG 0.85 quality, max 5MB
- **index.html**: Botón "Subir Foto desde tu Dispositivo" agregado en sección de avatares del perfil
- **Encuestas**: Funcionan correctamente (la colección polls estaba vacía, no es bug de código)

### Sesión 14 — Exchange + Admin Rename + Ranking Admin + Logros
- **exchange.js**: Tasa P-USD bajada de 30,000 a **10,000 PPC** por 1 P-USD
- **index.html**: Nuevo módulo Admin "Cambiar Nick de Usuario" (Module 2.5) con inputs old/new y botón `adminRenameUser()`
- **banking.js**: `loadLeaderboard()` ahora acepta filtro `'users'`/`'admins'` — tabs separados en leaderboard
- **index.html**: Tabs "Usuarios" y "Admins" en leaderboard
- **godzilla.js**: 7 logros nuevos — Primer Rugido, Cinco Formas, Rey de los Monstruos, Dios del Caos, Hakaishin Supremo, El Más Cheto, Rey de los Kaijus. Función `checkGodzillaAchievements()`
- **deathnote.js, berserk.js, elfen.js, rezero.js, rimuru.js, bocchi.js, vocaloid.js**: Verificados logros (4 achievements cada uno, funciones de check)
- **Wallpapers movidos a raíz** del proyecto (sin subcarpeta)
- **extras.js**: 18 temas con wallpapers — todos con imagen en raíz
- `Actualizacion/` limpiada
- Usuario confirmó subida a GitHub

### Sesión 17b — Fix boughtRanks se sobreescribía al comprar rangos
- **Causa raíz**: 10 fandoms (chainsaw, berserk, deathnote, elfen, rezero, rimuru, bocchi, vocaloid, mushoku, exchange) escribían `boughtRanks` como array manual completo, sobreescribiendo los rangos de OTROS fandoms. Al refrescar, solo quedaba el último rango comprado.
- **Fix**: Todos ahora usan `window._fbArrayUnion(rank.key)` — operación atómica de Firestore que agrega sin sobreescribir. Los que ya lo hacían bien: godzilla, ben10, mha, nanatsu, frieren, jjk, olimpo.
- **Archivos modificados**: chainsaw.js, berserk.js, deathnote.js, elfen.js, rezero.js, rimuru.js, bocchi.js, vocaloid.js, mushoku.js, exchange.js

### Sesión 17 — Fix balance no persistía + Doble conteo + Nick hardcodeado
- **logros.js:286**: Eliminada mutación manual de `bankAccount.balance` — el `onSnapshot` ya actualiza automáticamente. Causaba doble conteo (se sumaba 2x) y al refrescar volvía al valor real.
- **social.js:270**: Misma corrección — eliminada mutación manual de `bankAccount.balance` en recompensas de encuestas.
- **clan-features.js:215**: Agregado `'solariswat'` a la lista de nicks owner hardcodeados (antes solo tenía `'emilio'` que ya no existía tras el rename).
- **workflow**: Flujo de trabajo cambiado — ahora se publica directo a GitHub sin usar `Actualizacion/` para revisión. La carpeta se mantiene por si acaso.

### Sesión 17c — Cache bust forzado en TODOS los scripts
- **Causa raíz REAL**: 19 de 31 archivos JS no tenían `?v=` cache buster. El navegador servía código viejo con el bug de `boughtRanks` a pesar de que el fix ya estaba en GitHub.
- **Fix**: Todos los 31 `<script>` tags ahora tienen `?v=16`. El servidor PowerShell no envía `Cache-Control`, así que el navegador cachea agresivamente.
- **Lección**: Siempre poner `?v=` en TODOS los script tags, no solo los modificados.

### Sesión 18 — Migración a Backend PostgreSQL + Cloudflare Tunnel

**Problema original**: Firestore free plan agotado (quota exceeded). Se migró todo a PostgreSQL + Node.js/Express en la PC Linux del usuario (CachyOS), expuesto vía Cloudflare Tunnel.

**Cómo funciona el backend (IMPORTANTE — leer esto primero)**:

El backend NO está en este repo. Está en la PC Linux del usuario, manejado por Antigravity (el otro AI).

- **Stack**: Node.js + Express + PostgreSQL (CachyOS)
- **Exposición**: Cloudflare Tunnel → genera una URL tipo `https://modified-factory-adapter-myth.trycloudflare.com/api` que CAMBIA cada vez que se reinicia el servicio
- **Frontend**: GitHub Pages (HTML/CSS/JS vanilla, sin frameworks)
- **Comunicación**: Frontend hace `fetch()` a la URL del tunnel → Express → PostgreSQL

**Tablas de PostgreSQL**:
- `users` — nick, hash, hashSalt, avatar, rank, level, xp, boughtRanks[], todos los *Rank (jjkRank, godzillaRank, etc.), nick_color, profileRing, active_title, karma, parejaWith, customWallpaper, boughtRings[], pusdBalance, etc.
- `bank_accounts` — nick (FK a users), balance, balance_usd, loans[], badges[]
- `transactions` — from, to, amount, note, type, timestamp
- `user_inventory` — nick, item_id, item_type (ring/cosmetic/title), purchased_at, expires_at, active
- `board` — posts del tablón
- `chat` — mensajes del chat en vivo
- `polls` — encuestas
- `messages` — mensajes privados
- `vaults` — bóvedas compartidas
- `flores_requests` — solicitudes de pareja
- `events` — eventos
- `reports` — reportes
- `loans` — préstamos

**Reglas importantes del backend**:
- `PUT /api/users/:nick` acepta AMBOS formats: camelCase (`nickColor`) y snake_case (`nick_color`). Siempre devuelve ambos en la respuesta.
- `POST /api/inventory/buy` solo crea el registro en `user_inventory`, NO modifica `users.nick_color` ni `users.profileRing`
- `PUT /api/inventory/:nick/activate` marca un item como `active=true`
- `GET /api/leaderboard` NO incluye `nick_color`, `profileRing`, `active_title` — el frontend debe hacer fetch adicional a `GET /api/users` para enriquecer
- `GET /api/inventory/:nick` devuelve array de items: `[{id, nick, item_id, item_type, purchased_at, expires_at, active}]`
- `POST /api/bank/burn` — quema PPC (resta del balance)
- `POST /api/bank/mint` — acuña PPC (suma al balance)
- `POST /api/bank/transfer` — requiere que el destinatario EXISTA en la tabla users
- **NO crear usuarios ficticios** como 'exchange' para transferencias — usar burn/mint directamente
- `pusdBalance` viene como STRING de PostgreSQL (ej: `"9964580.00"`), siempre usar `parseFloat()` antes de operar
- Auth: `POST /api/auth/login` con `{ nick, password }` → backend hashea con hashSalt de DB → devuelve JWT + hash

**Cambios principales**:
- **index.html**: Firebase SDK eliminado. Reemplazado con API Bridge que traduce llamadas `_fb*` (Firestore) a REST API (`apiFetch`). Cloudflare Tunnel URL configurable.
- **app.js**: `doLogin`, `doRegister`, `initBankAccount`, `loadDashboard`, `adminMint`, `adminBurn` migrados a `apiFetch` (REST). JWT auth con localStorage. Sistema de cache global (60s TTL) para reducir llamadas.
- **banking.js**: `loadLeaderboard` migrado a REST (formato flat array del backend). `loadTransferUsers` y `loadRecentTx` liberados de guard `window._db`.
- **API Bridge** (index.html): `_fbGetDocs`, `_fbGetDoc`, `_fbSetDoc`, `_fbUpdateDoc`, `_fbAddDoc`, `_fbDeleteDoc`, `_fbWriteBatch` — todos traducen a REST genérico.

**Backend endpoints implementados por Antigravity**:
- Auth: `POST /api/auth/login` (devuelve hash), `POST /api/auth/register`
- Bank: `GET /api/bank/:nick`, `POST /api/bank/mint|burn|transfer`, `GET /api/bank_accounts`, `GET /api/bank_accounts/:nick`, `PUT /api/bank_accounts/:nick`
- Users: `GET /api/users`, `GET /api/users/:nick`, `PUT /api/users/:nick`
- Admin: `GET /api/admin/accounts`, `GET /api/admin/stats`
- Social: `GET /api/transactions`, `POST /api/transactions`, `GET /api/board`, `POST /api/board`, `GET /api/chat`, `POST /api/chat`, `GET /api/polls`, `POST /api/polls`, `GET /api/messages`, `POST /api/messages`
- Vaults: `GET /api/vaults`, `GET /api/vaults/:id`, `PUT /api/vaults/:id`, `POST /api/vaults/:id/letters`, `GET /api/vaults/:id/letters`
- Otros: `GET /api/leaderboard`, `GET /api/loans`, `POST /api/loans`, `GET /api/flores_requests`, `GET /api/events`, `GET /api/reports`, `GET /config/bank`

**Fixes**:
- Login: frontend envía `{ nick, password }` en vez de `{ nick, hash }` para que el backend use el hashSalt correcto
- `tryAutoLogin`: usa hash del login response (backend ahora devuelve campo `hash`)
- `loadLeaderboard`: adaptado a formato flat array `[{nick, balance, rank, ...}]`
- `_fbGetDocs`: ID detection mejorado (busca `nick` como ID si no hay campo `id`)
- `_fbUpdateDoc`: preserva operaciones `_op: increment`, `arrayUnion`, `arrayRemove`

**Estado actual**:
- ✅ Login + auto-login funciona
- ✅ Dashboard (balance propio)
- ✅ Ranking/Leaderboard
- ✅ Admin panel (stats + cuentas)
- ⚠️ Compra de rangos — pendiente verificar si backend soporta `_op: increment`
- ⚠️ Vault, board, chat, mensajes — pendiente verificar
- ⚠️ Todas las páginas de fandoms — pendiente verificar
- ⚠️ Auto-login puede fallar si el JWT expira y el hash guardado es viejo

**Cloudflare Tunnel**: `https://modified-factory-adapter-myth.trycloudflare.com/api` (cambia en cada reinicio del servicio)

### Sesión 19 — Fixes de Tienda Premium, Exchange, Multiplicadores y Login

**hash function (IMPORTANTE)**:
- NO es SHA-256. Es custom DJB2+FNV-1a con prefijo `s2_`
- `hashPass(p, salt)`: salt + p + salt reversed → DJB2 (h) + FNV-1a (h2) → base36
- Ejemplo: solariswat tiene `hashSalt: "emilio"` en la DB
- Login flow: frontend envía `{ nick, password }` → backend hashea con hashSalt de DB → compara. Devuelve JWT + `hash` para auto-login
- `hashPass` está en `banking.js`, no es una función nativa

**API Bridge** (index.html):
- `_fbGetDocs` detecta `nick` como ID field
- `_fbUpdateDoc` resuelve `_op: increment/arrayUnion/arrayRemove` client-side antes de enviar
- Cache: 60s TTL para GET, 10s timeout, cache invalidation en POST/PUT/DELETE
- Exchange rate: 1 P-USD = 10,000 PPC

**Backend** (hosted on user's Linux PC CachyOS, 24/7):
- El otro AI (Antigravity) maneja el backend Node.js/Express/PostgreSQL
- `PUT /api/users/:nick` acepta ambos formats: camelCase y lowercase (nick_color, profileRing, active_title, etc.)
- `PUT /api/users/:nick/avatar` — soporta imágenes (resize 256x256 base64) y videos
- `GET /api/inventory/:nick` — items del inventario del usuario
- `POST /api/inventory/buy` — comprar item premium
- `PUT /api/inventory/:nick/activate` — activar item del inventario
- `POST /api/bank/burn` — quemar PPC (para exchange PPC→P-USD)
- `POST /api/bank/mint` — acuñar PPC (para exchange P-USD→PPC)

**Fixes sesión 19**:

1. **Nick Arcoíris animado** (`extras.js`, `style.css`):
   - `@keyframes nickRainbow` con `background-size: 200%` y `animation: linear infinite`
   - Clases CSS: `.nick-rainbow`, `.nick-fire`, `.nick-ice`, `.nick-neon`, `.nick-gold`
   - `applyNickColor()` y `getNickColorStyle()` ahora usan CSS classes en vez de inline styles
   - `loadInventorySettings()` aplica clases a `header-user-nick`, `sidebar-user-nick`, `profile-nick`

2. **Detección de propiedad en Tienda Premium** (`exchange.js`):
   - `renderPremiumShop()` checkea `currentUser._inventory` por `item_id`
   - Si ya lo tiene → "✓ Ya lo tienes" (verde, disabled)
   - Si no alcanza → "🔒 No alcanza" (rojo, disabled)
   - Si puede comprar → "Comprar" (normal)
   - `buyPremiumItem()` tiene double-check al inicio

3. **Auto-activate al comprar premium** (`exchange.js`):
   - Después de `POST /inventory/buy`, llama `PUT /inventory/:nick/activate`
   - Luego `loadRingsInventory()` + `loadInventorySettings()` para refrescar estado

4. **Sync de nick_color/profileRing a users table** (`extras.js`):
   - `loadInventorySettings()` escribe `nick_color`, `profileRing`, `active_title` a `PUT /users/:nick`
   - Esto es necesario porque el leaderboard NO incluye datos de `user_inventory`

5. **Leaderboard enriquecido** (`banking.js`):
   - Después de `GET /leaderboard`, fetch adicional a `GET /users` para llenar `nick_color`, `profileRing`, `active_title`
   - Nick usa CSS class (`nick-rainbow`) en vez de inline style
   - Ring rainbow usa gradiente CSS en vez de transparent

6. **Aro rainbow en PROFILE_RINGS** (`extras.js`):
   - Agregado `{ key: 'rainbow', label: 'Aro Arcoíris', color: 'rainbow', price: 100000000 }`
   - Antes `getRingData('rainbow')` fallaba porque no existía

7. **Exchange P-USD fix** (`exchange.js`):
   - Antes intentaba `POST /bank/transfer` a usuario ficticio `'exchange'` → error "Usuario destino no encontrado"
   - Ahora usa `POST /bank/burn` (PPC→P-USD) y `POST /bank/mint` (P-USD→PPC)

8. **parseFloat pusdBalance** (`app.js`, `exchange.js`):
   - PostgreSQL devuelve `pusdBalance` como STRING `"9964580.00"`
   - Sin parseFloat: `"9964580.00" + 0.3242 = "9964580.000.3242"` → error numeric
   - Ahora usa `parseFloat()` en los 3 puntos de carga y en exchange

9. **Login carga TODOS los fandom ranks** (`app.js`):
   - Antes solo cargaba: pusdBalance, avatar, nickColor, active_title
   - Ahora carga: boughtRanks, jjkRank, frierenRank, godzillaRank, mhaRank, ben10Rank, nanatsuRank, berserkRank, chainsawRank, deathnoteRank, elfenRank, rezeroRank, rimuruRank, bocchiRank, vocaloidRank, mushokuRank, floresRank, karma
   - Sin esto, todas las tiendas de fandom no detectaban `isOwned`

10. **`loadRingsInventory()` await fix** (`app.js`):
    - Era fire-and-forget (sin await), entonces `loadInventorySettings()` corría antes de tener `_inventory`
    - Ahora es `await loadRingsInventory()` → `loadInventorySettings()`

11. **Multiplicadores de fandom en `getRankMultiplier`** (`clan-features.js`):
    - Faltaban 10 fandoms: Berserk, Chainsaw, Death Note, Elfen, Re:Zero, Rimuru, Bocchi, Vocaloid, Mushoku, Flores
    - Ahora todos suman `(rank.mult - 1)` al multiplicador base

**Credenciales de usuario**:
- Login: `solariswat` / `nosexd103`

**Archivos modificados sesión 19**:
- `app.js` — parseFloat pusdBalance, await loadRingsInventory, cargar todos los fandom ranks
- `banking.js` — leaderboard enrich con /users, ring rainbow border, nick CSS class
- `clan-features.js` — 10 fandom multipliers faltantes
- `exchange.js` — fix exchange P-USD (burn/mint), auto-activate, detect owned items
- `extras.js` — nick animado CSS, loadInventorySettings sync, rainbow ring en PROFILE_RINGS
- `style.css` — @keyframes nickRainbow + nickFire + nickNeon, .nick-rainbow/fire/ice/neon/gold

---

*Actualizar este archivo con cada cambio significativo.*
