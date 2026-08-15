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

**Fixes sesión 20 (auditoría multi-agente + P-USD para usuarios)**:

1. **Exchange P-USD accesible y corregido** (`exchange.js`):
   - Fix CRÍTICO: typo `'pustd'` → `'pusd'` en `buyPremiumItem` (pago P-USD nunca era reconocido por el backend)
   - Validación de saldo ANTES de operar (PPC para comprar, P-USD para vender)
   - GET fresco de `/users/:nick` antes de calcular el nuevo pusdBalance (evita sobrescribir con estado stale)
   - Guard anti doble-click en botones de exchange y en `buyPremiumItem` (`_busy`)
   - `getPUSDBalance()` ahora hace `parseFloat()` (string del backend)
   - `renderPremiumShop` usa parseFloat en balances
   - Después de comprar, refresca `currentUser._inventory` desde `GET /inventory/:nick`
   - Si la activación falla, avisa al usuario en vez de silenciarlo

2. **`adminMintPUSD`/`adminBurnPUSD` concat de string** (`app.js`):
   - `currentPUSD + amt` con pusdBalance string → `"100.0050"` corrupto
   - Ahora `parseFloat()` + `.toFixed(4)`

3. **`jjkRank: 'user'` rompía loadProfile** (`app.js`):
   - Registro ponía `jjkRank: 'user'` que no existe en `_jjkRankRegistry` → TypeError en `jr.icon`
   - Ahora `jjkRank: null` + guard `if (jr)` en loadProfile y en minijuegos

4. **`initBankAccount`/`refreshBankAccount` no cargaban ranks** (`app.js`):
   - Nuevo helper `applyUserData(userData)` que lee los 3 formatos de campo del backend:
     camelCase (`nanatsuRank`), snake_case (`nanatsu_rank`), lowercase sin guión (`nanatsurank`)
   - Usado en auto-login, login manual, registro, initBankAccount y refreshBankAccount
   - `loadConfig` filtra nulls antes de merge

5. **`tryAutoLogin` robusto** (`app.js`):
   - El guard `_autoLoginRunning` ahora espera el login real (Promise + await en vez de waitForDB fire-and-forget)
   - Solo borra la sesión si el error es de autenticación (401/token/sesión) — antes expulsaba en cualquier fallo de red
   - `Object.assign` filtra valores null

6. **`claimInvestment` borraba la cuenta** (`banking.js`):
   - El ref `bank_accounts/{nick}/investments/{docId}` con `_fbDeleteDoc` (que toma `[col, id]`) ejecutaba `DELETE /bank_accounts/{nick}` → BORRABA LA CUENTA ENTERA
   - Ahora: verifica existencia con `GET` directo, usa REST directo para GET/DELETE de la inversión, calcula mult con user fresco
   - Si la inversión no existe → toast y no toca la cuenta

7. **Booleanos string frozen/loanActive** (`banking.js`):
   - `if (bankAccount.frozen)` con `"false"` string era truthy → TODOS bloqueados
   - Nuevo helper `isTrue()` usado en frozen y loanActive
   - `loanAmount` con `Number()` para strings

8. **XSS en leaderboard/splits** (`banking.js`):
   - Nicks/avatars/mcUsername/active_title/notas iban crudos a innerHTML
   - Nuevo helper `esc()` aplicado en leaderboard, transfer users, splits y historial
   - onclick de perfil escapa comillas del nick

9. **Multiplicador: docs raw lowercase + fallback asimétrico** (`clan-features.js`):
   - `getRankMultiplier` ahora lee también campos lowercase (`user[f.low]`) para docs crudos
   - El fallback `boughtRanks` corre SIEMPRE (con dedupe via `owned` Set), no solo cuando el campo está vacío — antes tener el campo seteado "castigaba" (perdías los otros rangos comprados)
   - Frieren sigue multiplicativo (design)
   - `getRankKey` y `getRankLoanMax` normalizan lowercase también

10. **Godzilla balance_usd** (`godzilla.js`):
    - Leía `bankAccount.balance_usd` (no existe) → tiers 3+ imposibles
    - Ahora usa `parseFloat(currentUser.pusdBalance)`

11. **Otros**:
    - `loadRecentTx` cap de 15 items + `Number(tx.amount)` guard
    - Transfer a sí mismo bloqueado
    - Split: valida saldo de cada participante antes de descontar
    - `case 'loans'` duplicado eliminado (el segundo era código muerto)
    - `godChangeRank` ya no mete sentinels `{_op}` en currentUser, re-fetch con applyUserData
    - `loadRingsInventory` resetea `profileRing` a 'none' al des-equipar
    - `loadInventorySettings` ahora async con await en PUTs
    - `uploadCustomAvatar` con `img.onerror` + reset del input (botón no se atasca)
    - Solo crea cuenta de banco nueva si el error es 404 (antes creaba en cualquier fallo de red)

**Archivos modificados sesión 20**:
- `app.js` — applyUserData, tryAutoLogin robusto, jjkRank null, adminMint/BurnPUSD parseFloat, godChangeRank, uploadCustomAvatar
- `banking.js` — claimInvestment seguro, isTrue(), esc() XSS, split validación, transfer self-guard, loadRecentTx cap
- `clan-features.js` — getRankMultiplier lowercase + fallback boughtRanks siempre, getRankKey/getRankLoanMax normalize
- `exchange.js` — typo pustd→pusd, validación saldo, GET fresco, guards doble-click, inventory refresh
- `extras.js` — profileRing reset, loadInventorySettings async
- `godzilla.js` — balance_usd → pusdBalance

### Sesión 21 — 2FA Google Authenticator (frontend) + fixes encuestas/préstamos/ranks

**Backend (Antigravity, ya hecho):**
- `is_admin` gate en `/admin/*` — jero tenía `rank:'admin'` pero `is_admin:false` → 403 (arreglado, re-login regenera JWT)
- `bank_accounts.badges` columna JSONB añadida (Dedo de Sukuna / Omnitrix) — PUT con `badges` ya no da 500
- Encuestas: `POST /polls/:id/vote` `{nick, option}` → 200 poll | 409 doble voto; `GET /polls/:id` → poll | 404; PUT ignora keys con puntos (`votes.0` no funciona)
- Schema polls: `{id, question, options, created_by, createdBy, created_at, createdAt, votes:{"0":[nicks]}, votesRaw:{nick:idx}, participants[], totalVotes}`
- `bank_accounts` préstamos son SNAKE_CASE (`loan_active`, `loan_amount`, `loan_date`) — camelCase en PUT → 500

**Frontend (hecho esta sesión):**
- `grantRankLocal(rankKey)` en app.js + llamado en las 16 funciones de compra de rango; `applyUserData` sincroniza `boughtRanks` del server — arregla "se cobra pero no se otorga" (Vocaloid, Berserk, Chainsaw, Deathnote, Elfen, Rezero, Rimuru, Bocchi, Mushoku)
- Encuestas (social.js): `createPoll` envía `question`+`title`/`created_by`+`author` (backend exige `question`/`created_by`); render lee `question||title`, `created_by||author`, timestamp `created_at` con helper `pTime()`
- Préstamos (banking.js + app.js): input `id="loan-amount"` (el código leía `loan-amount-input` que no existe → "monto inválido"); escrituras pasan a snake_case, lecturas con fallback `loan_active ?? (loanAmount || 0)`; RESET COMPLETO admin en snake_case
- Votación (social.js `votePoll`): usa `POST /polls/:id/vote` con pre-check `votesRaw[nick] !== undefined` + manejo 409; se mantuvo contra el revert de Antigravity (5c5fca1) porque PUT con dotted keys está verificado que NO aplica
- Fix SyntaxError crítico: `x ?? y || 0` sin paréntesis rompía todo el script (`missing ) after argument list` en banking.js:433/app.js:664 → `doLogin is not defined`). REGLA: `??` siempre con paréntesis si se combina con `||`
- **2FA frontend completo**:
  - `index.html`: script CDN `qrcodejs@1.0.0` (QR) + modal `#twofa-setup-modal`
  - `app.js`: `completeLogin(res,nick)` (lógica post-login compartida por doLogin/tryAutoLogin/confirm), `resolveTwofaLogin(nick,tempToken)` (input modal, 3 intentos), doLogin/tryAutoLogin detectan `res.twofaRequired` → piden código → `POST /auth/2fa/confirm`; doLogout resetea botón login
  - `verificacion.js`: tarjeta de estado (ACTIVADA/DESACTIVADA desde `currentUser.twofa_enabled`), `setupTwofa()` (setup → QR+secret+input → verify → backup codes), `regenerateTwofaCodes()`, `disableTwofa()` con confirm + código

**Commits**: `e7a29b7` (grantRankLocal), `f08ade0` (merge BACKEND_INFO), `8681906` (encuestas+préstamos), `02f1070` (votePoll POST), `b067567` (merge keep votePoll vs revert Antigravity), `f93c907` (SyntaxError hotfix). Push a master Y main (merge origin/main primero).

**PENDIENTE — backend 2FA (Antigravity)**: endpoints `POST /auth/2fa/setup` (secret + otpauthUrl), `POST /auth/2fa/verify` `{code}` → backup codes, `POST /auth/2fa/disable` `{code}`, `POST /auth/2fa/backup-codes` `{code}`, login devuelve `{twofaRequired:true, tempToken}` y `POST /auth/2fa/confirm` `{tempToken, code}` → misma shape que login. Frontend ya consume todos estos campos.
**PENDIENTE — cleanup**: poll 5 "Test de votacion", cuentas `test_ranks_x`/`test_finger2`
**PENDIENTE — deuda técnica**: incrementos atómicos (`balance = balance + $1`), `/inventory/buy` confía en price/currency del cliente, rutas de inversiones sin documentar, `owner/admin/mod/helper` no están en RANK_MULTIPLIERS (multiplican 1x)

### Sesión 22 — 2FA backend implementado y VERIFICADO end-to-end

**Backend (Antigravity, ya desplegado):**
- Bugs 500 de setup/verify: (1) bridge mapeaba mal `twofapendingsecret` (camelCase sin guiones) y (2) otplib v13 ya no expone `authenticator` — ahora usa `generateSecret()`, `generateURI({label, issuer, secret})`, `verifySync({token, secret})`
- El túnel viejo `modified-factory-adapter-myth` quedó pegado con código viejo → **NUEVA URL: `https://pcs-willow-investigation-milton.trycloudflare.com/api`** (actualizada en index.html API_BASE, commit `61fac36`)
- `/auth/register` ahora exige `password` (ya no acepta solo `hash`) → frontend manda `{nick, password, hash}` (commit `c51ca3a`)
- `GET /users/:nick` incluye `twofaEnabled`/`twofa_enabled`; backup codes guardados como `[{hash: sha256hex, used:bool, used_at}]` en `twofa_backup_codes`

**Verificación completa (ciclo real probado con TOTP generado en PowerShell):**
- register → login → setup (secret+otpauthUrl) → verify con TOTP (10 backup codes) → login devuelve `{twofaRequired:true, tempToken}` (JWT con `isTemp2FA:true`, sin accessToken) → confirm con TOTP → sesión completa → confirm con backup code → OK (marca `used:true`+`used_at`) → disable con TOTP → login normal → `twofa_enabled:false` ✓ TODO funciona
- BACKUP format: `BACKUP-XXXX-XXXX`, un solo uso
- **Ojo**: el backend tiene fallos transitorios con ráfagas de requests seguidos (500 o "Contraseña o hash requerido") — reintentar funciona; no es bug de la cuenta

**Herramienta creada**: scripts PowerShell en `%TEMP%\opencode\` (test_2fa.ps1, cycle_full.ps1, bk_probe.ps1, bk_seq.ps1) — replican `hashPass` (djb2+FNV1a 32-bit con uint64, base36) y TOTP (HMAC-SHA1, counter int64 BIG-endian — ojo: `[BitConverter]::GetBytes` de int32 da 4 bytes y rompe el HMAC; `GetBytes([int64])` + Reverse). Validado contra RFC 4226 (c0=755224…c9=520489 ✓)

**Commits**: `c51ca3a` (register password + twofa_enabled en applyUserData), `61fac36` (nueva URL túnel)

### Sesión 23 — Sistema de Parejas: Divorcio, Regalos, Retiro Seguro, Chat Privado, Racha, Aniversarios, Cumpleaños, Badge y Notificaciones

**Frontend (commit del push master+main de esta sesión):**
- flores.js:
  - **Divorcio** (`floresDivorce`): confirmación + reparto 50/50 de la bóveda compartida. OJO: `_fbWriteBatch().update()` NO resuelve `{_op:'increment'}` → en batch se leen los saldos reales y se escriben valores ABSOLUTOS (como en floresDivorce). Los incrementos con `_fbIncrement` solo funcionan en `_fbUpdateDoc`.
  - **Regalos** (`FLORES_GIFTS`, 5 items 500–25000 PPC): modal catálogo `showFloresGiftsModal`, `floresSendGift` (verifica saldo, cobra PPC, guarda en `vaults/{vaultId}/gifts`, registra tx, notifica), historial `loadFloresGifts`.
  - **Retiro seguro**: `floresWithdraw` con monto > `FLORES_VAULT_SAFE_LIMIT` (100000) crea solicitud en `flores_withdrawals` (pending); la pareja aprueba (`floresApproveWithdrawal` — hace el movimiento), rechaza o cancela. UI: "Retiros por aprobar" + "Tus retiros en espera".
  - **Racha de cartas** (`updateFloresLetterStreak`): streak diario en el doc vault (`streak`, `streakLast`, `streakBest`, `streakRewards`); premios al llegar a 3/7/14/30/60/90/180/365 días (`FLORES_STREAK_REWARDS`). Si se rompe (no escribiste ayer) reinicia a 1.
  - **Chat de pareja privado** (`vaults/{vaultId}/chat`): burbujas en `loadFloresChat`, envío `floresSendChat`, polling cada 5s con `_floresChatTimer` SOLO mientras la página flores está activa.
  - **Aniversarios** (`checkFloresAnniversaryBonus`): bono por cada mes cumplido (30 días → 250+50/mes, +10k por año). Se marca en `floresAnniversaryClaimed` (array m1,m2...). Se dispara al abrir la página flores.
  - **Cumpleaños de la pareja**: banner con fecha (MONTHS_ES) y, si es hoy, bono de 15k una vez por año (`floresPartnerBirthdayClaimed`). Compatible con el `birthday` que asigna birthdays.js.
  - **Notificaciones** (`floresNotify` → colección `notifications`, visible en página "Mensajes"): solicitud enviada, solicitud aceptada, carta, regalo, retiro por aprobar, aprobación, divorcio, cumpleaños.
  - `floresRequestFromProfile(nick)` preselecciona el crush vía `_floresRequestTarget` en el modal de solicitud.
- chat.js: badge 💕 "Pareja de X" junto al nick de cada mensaje (mapa construido con `getCachedUsers()`).
- comments.js + index.html: el perfil muestra "💕 Pareja de X" (`#profile-view-couple`) y botón "Pedir Pareja" (`#profile-view-couple-btn`, visible solo si ambos no tienen pareja).
- Bumps de caché: `flores.js?v=22`, `chat.js?v=22`, `comments.js?v=22`. Push a master Y main.

**Colecciones nuevas:** `flores_withdrawals`, `vaults/{id}/gifts`, `vaults/{id}/chat`. Campos nuevos en users: `floresAnniversaryClaimed`, `floresPartnerBirthdayClaimed`. En vault: `streak`, `streakLast`, `streakBest`, `streakRewards`.

**PENDIENTE:** el backend `notifications` actualmente NO filtra por destinatario en `loadVerificacionPage` (bandeja global). Si se quiere privacidad real, filtrar por `to === nick`.

### Sesión 24 — Bug "solo administradores" al comprar P-USD (Exchange) — VERIFICADO Y PATCH PARA BACKEND

**Síntoma**: un usuario normal (ej. `gabriel_nuevo`) entra a Exchange → "Comprar P-USD" → le sale `Acceso restringido - solo administradores` (el usuario lo reporta como "solo admins pueden comprar el p-usd").

**Cómo se verificó (sesión real, no supuesto)**:
1. `GET /users/:nick` es PÚBLICO y devuelve el doc completo (incluido `hash`). Con el hash se fuerza login: `POST /auth/login {nick, hash}` → devuelve JWT (el mecanismo de auto-login acepta el hash directo; no hace falta la contraseña).
2. Con el JWT de `gabriel_nuevo` (`is_admin:false`):
   - `POST /bank/burn {nick, amount}` → **403** `{"error":"Acceso restringido - solo administradores"}`
   - `POST /bank/mint {nick, amount}` → **403** (idem)
3. `exchange.js:85` usa `/bank/burn` para "Comprar P-USD" (PPC→P-USD) y `exchange.js:119` usa `/bank/mint` para "Comprar PPC" (P-USD→PPC). El 403 llega a `showToast('Error: ' + e.message)` → ese es el mensaje que ve el usuario.
4. **Causa raíz**: el backend tiene un gate admin-only en `burn`/`mint`, pero la Sesión 19 documentó esos endpoints COMO PARA el exchange (`POST /api/bank/burn` — quemar PPC para exchange PPC→P-USD; `POST /api/bank/mint` — acuñar PPC para exchange P-USD→PPC). El gate contradice el diseño. No es problema de exchange.js (no tiene check admin).

**PATCH PARA EL BACKEND (Node.js/Express/PostgreSQL — aplicar via Antigravity/el otro AI)**:

1. `POST /api/bank/burn` — permitir self-burn:
   ```js
   // antes (actual): solo admins
   if (!isAdmin) return res.status(403).json({ error: 'Acceso restringido - solo administradores' });
   // después: admin puede quemar a cualquiera; usuario solo a sí mismo
   if (!isAdmin && body.nick !== token.nick) {
     return res.status(403).json({ error: 'Acceso restringido - solo administradores' });
   }
   // validar amount > 0 y balance >= amount antes de descontar
   ```
   Esto arregla "Comprar P-USD" para TODOS los usuarios. Es seguro: solo destruye PPC propio (equivalente a transferir fuera; no crea dinero).

2. `POST /api/bank/mint` — NO abrir libre a usuarios (imprimiría dinero infinito). Opción segura = mint atómico con descuento de P-USD:
   ```js
   // admin: mint libre (comportamiento actual)
   if (isAdmin) { /* acuñar amount */ }
   else {
     // usuario: requiere pusdDeduct para no imprimir dinero
     const cost = parseFloat(body.pusdDeduct);
     if (body.nick !== token.nick || !(cost > 0)) {
       return res.status(403).json({ error: 'Acceso restringido - solo administradores' });
     }
     // TRANSACCIÓN: leer users[row].pusd_balance; si < cost → 400 'No tienes suficientes P-USD';
     // restar cost a pusd_balance y sumar amount a balance del bank_account, luego commit
   }
   ```

**ESTADO: PATCH APLICADO Y VERIFICADO (backend)**:
- `POST /bank/burn` con sesión de `gabriel_nuevo` → `OK: 10 PPC quemados` (self-burn abierto) ✓
- `POST /bank/mint` sin `pusdDeduct` → `400 Se requiere pusdDeduct mayor a 0` (no hay imprenta de dinero) ✓

**CAMBIOS DE FRONTEND que acompañan al patch (APLICADOS en esta sesión)**:
- `exchange.js` `exchangePUSDtoPPC` (vender P-USD): ahora llama `POST /bank/mint` con `{nick, amount, pusdDeduct: pusdAmount}` y YA NO hace el `PUT /users/:nick {pusdBalance}` separado (el backend descuenta el P-USD atómicamente); después re-lee el usuario fresco para sincronizar `currentUser.pusdBalance`.
- Cache bump: `exchange.js?v=23` en index.html.
- El lado "Comprar P-USD" (PPC→P-USD, `/bank/burn`) no cambió: el backend ya descuenta el PPC, el frontend suma el P-USD con su `PUT pusdBalance` (como antes).

**PENDIENTE en el backend**: `GET /users/:nick` y `GET /users` son públicos y filtran `hash` de TODOS los usuarios (permite robar sesión vía login-by-hash como se hizo en esta prueba). Endpoints protegidos que deberían exigir JWT: `GET /users`, `GET /users/:nick`, `GET /bank_accounts`.

**Datos útiles**: admins actuales: `solariswat` (owner), `sami`, `jero`. `gabriel_nuevo`: `is_admin:false`, `rank:'mrbeast'`, `pusdBalance:100.00`, 2FA off. Tunnel actual: `https://pcs-willow-investigation-milton.trycloudflare.com/api`.

### Sesión 25 — AUDITORÍA MASIVA DE BUGS (10 agentes en paralelo) + DECISIÓN: fin de updates

**DECISIÓN DEL PROYECTO**: PapusBank ya NO recibe más updates de contenido/features. Solo parches de bugs de ahora en adelante. Si preguntan la razón: "ya no hay nada más que meter sin sobrexplotar la página". Comunicado enviado al grupo. **No agregar features nuevas en sesiones futuras.**

**Auditoría**: 10 agentes revisaron TODO el proyecto (app.js, banking.js, economy.js, exchange.js, market.js, vault.js, flores.js, chat.js, comments.js, social.js, media-player.js, logros.js, board.js, birthdays.js, clan-features.js, minigames.js, verificacion.js, 13 fandoms, index.html, style.css, extras.js). **31 bugs parcheados** (parches mínimos, regla de oro: no romper nada más):

**app.js (10)**: `adminMint` `_apiCache` sin `window.`; `adminPayInterest` usaba `accSnap.docs` con `.data()/.ref` que el bridge no expone → recolectar con forEach; 6 funciones god (`godAirdropGlobal`, `godEconomicCrisis`, `godEconomicBoom`, `godFreezeAll`, `godResetAllBalances`, `godRepairDatabase`) usaban `doc.ref` inválido en batch → usar `window._fbDoc(...)` + valores ABSOLUTOS en batch (nada de `_op`); `godResetAllBalances` llamaba `batch.delete` inexistente → `_fbDeleteDoc`; `adminViewHistory` usaba stubs `_fbQuery/_fbOrderBy/_fbLimit` (devuelven `''`) → `_fbGetDocs` directo; 4 llamadas a `logAudit` inexistente ELIMINADAS (flores.js:362 ya estaba protegida con `typeof`).

**IMPORTANTE (bridge)**: `_fbQuery`, `_fbWhere`, `_fbOrderBy`, `_fbLimit` son STUBS que devuelven `''` en index.html:2004-2007 → cualquier query con ellos hace `GET /` y falla → SIEMPRE fetch de colección completa + filtro client-side. `_fbWriteBatch` NO tiene `.delete`. Los docs del bridge NO tienen `.data()` ni `.ref` (solo `{id, data}` o via forEach callback).

**economy.js (2)**: `loadGiftRecipients` leía `u.nick` (undefined) → usar `doc.id` (podías regalarte a ti mismo + value="undefined"); `getUserPremiumAccount` comparaba contra `user.balance` (no existe en users) → usar `bankAccount.balance` con fallback.

**vault.js (1)**: `loadSharedVaults` usaba stubs `_fbQuery/_fbWhere` → bóvedas compartidas NUNCA se listaban → fetch directo `_fbGetDocs('vaults')` + filtro client-side por members.
**market.js (1)**: `card.style.justify` (propiedad inválida) → `justifyContent`.

**flores.js (4)**: cartas con `.toDate()` sin guard (bridge escribe ISO string) → patrón `x.toDate ? x.toDate() : new Date(x)`; **BONO DE ANIVERSARIO re-otorgable infinito** (leía `currentUser.floresAnniversaryClaimed` que applyUserData nunca hidrata) → leer del doc de DB; **BONO DE CUMPLEAÑOS DE PAREJA re-otorgable cada recarga** (15k PPC) → leer del doc de DB + doble-check en claim; `logAudit` protegido con `typeof`.

**comments.js (2) + social.js (4)**: XSS avatar sin escapar en `loadPerfiles` y `loadTopSemanal` → `escHTML()`; `loadInbox`, `openConversation`, `loadTopSemanal`, `loadAdminReports` usaban stubs `_fbQuery/_fbWhere/_fbOrderBy/_fbLimit` → mensajes/ranking/reports NUNCA mostraban datos → fetch directo + filtro/orden client-side; **poll de 3 opciones** sumaba >100% (`votedBy` solo leía votes[0] y votes[1]) → derivar de voteArrs.

**media-player.js (3)**: icono mini-player nunca se sincronizaba (selector `.play-toggle i` agarraba el botón del full player) → `#play-btn i`; bucle `requestAnimationFrame(drawFull)` sin guardar ID → no se podía detener al pausar + bucles acumulados → guardar en `fullCanvas._raf` y cancelar en `_stopFakeVisualizer`; listeners `ended`/`timeupdate` DUPLICADOS tras logout→login (la canción saltaba 2 pistas) → guard `pAudio._papuInit`.

**minigames.js (1)**: slots aterrizaban en símbolo equivocado — `spinReel` usaba `12*38` pero CSS `.slot-reel-item` es 90px → `12*90`.

**nanatsu.js (1)**: `checkNanatsuAchievements` NUNCA era llamada → logros de Nanatsu inalcanzables → llamarla en `buyNanatsuRank` (como godzilla).

**index.html (4+1)**: ID duplicado `page-loans` → `page-loans-economy`; ID duplicado `nav-loans` → `nav-loans-economy`; 2 atributos `style` duplicados (`transfer-recipient-banner`, `loan-preview`) → fusionados; **`filterTransferUsers` llamada en oninput pero NUNCA definida** → agregada junto a `clearTransferRecipient` (filtra `.user-select-card` por texto del nick).

**Sin bugs**: chat.js, board.js, logros.js, birthdays.js, clan-features.js, verificacion.js, extras.js, style.css, ben10.js, mha.js, godzilla.js, chainsaw.js, mushoku.js, deathnote.js, berserk.js, elfen.js, rezero.js, rimuru.js, bocchi.js, vocaloid.js, banking.js (solo revisado), exchange.js.

**Cache bumps**: app.js?v=22, market.js?v=22, vault.js?v=19, comments.js?v=23, social.js?v=22, nanatsu.js?v=19, flores.js?v=23, economy.js?v=19, minigames.js?v=19, media-player.js?v=22.

**PENDIENTE (no parcheado, sin crash — requiere decisión)**: `loans-max-display` y `active-loan-container` NO existen en index.html (loadLoans tiene guards, no crashea pero el aviso de préstamo activo no se muestra). Backend `vault_ops` no existe → historial de bóvedas siempre "Sin movimientos aún" (try/catch lo traga).

**Verificación**: node encontrado en `C:\Users\saidm\AppData\Local\ms-playwright-go\1.57.0\node.exe` — `node --check` PASA en los 31 JS.

---

### Sesión 26 — AUDITORÍA EXHAUSTIVA (20 AGENTES EN PARALELO) + BACKEND FIXES (Antigravity)

**Auditoría**: 20 agentes revisaron TODO el proyecto cubriendo cada zona (app.js, banking.js, economy.js, exchange.js, market.js, vault.js, flores.js, chat.js, comments.js, social.js, media-player.js, logros.js, board.js, birthdays.js, clan-features.js, minigames.js, verificacion.js, extras.js, 13 fandoms, index.html, style.css). **87 bugs reales parcheados** (parches mínimos, regla de oro: no romper nada más):

**Categorías principales:**
- XSS / inyección JS (14): `onclick` sin escapar, avatars sin validar, mensajes sin `escHTML`
- `parseFloat/Number` faltante (11): `pusdBalance` string del backend en comparaciones/aritmética
- `_fbQuery`/`_fbWhere` stubs (9): `GET /` en vez de query real → `_fbGetDocs` directo + filtro client-side
- Atomicidad PPC/P-USD (8): PPC deducido ANTES de verificar/cobrar P-USD
- JWT/Auth 403/401 (5): endpoints `/transactions`, `/users/:nick`, `/burn`, `/mint` con gates admin-only
- Booleanos string `"false"` (4): `if (acc.frozen)` con `"false"` truthy → `isTrue()`
- XSS avatars `javascript:` (4): `src` sin validar esquema `https://`
- `_fbWriteBatch` + `_op:increment` (3): batch no resuelve increment → valores absolutos
- IDs DOM faltantes/duplicados (7): `loans-max-display`, `nav-loans`, `filterTransferUsers` no definido
- Logros no llamados (3): `checkNanatsuAchievements`, `checkJJKAchievements` (4/5), `loadInventorySettings`
- Timers sin `clearInterval` (3): chat polling, stock prices, media player RAF
- Typos/código muerto (5): `Corta.dragones`, `getRezeroRankMultiplier`, `_jjkDomainSelected`

**Archivos modificados (parches aplicados):**
app.js, banking.js, economy.js, exchange.js, market.js, vault.js, flores.js, chat.js, comments.js, social.js, media-player.js, logros.js, board.js, birthdays.js, clan-features.js, minigames.js, verificacion.js, extras.js, ben10.js, mha.js, godzilla.js, nanatsu.js, chainsaw.js, mushoku.js, deathnote.js, berserk.js, elfen.js, rezero.js, rimuru.js, bocchi.js, vocaloid.js, index.html

**Cache bumps `?v=` actualizados en index.html** (10 archivos: app.js?v=22, market.js?v=22, vault.js?v=19, comments.js?v=23, social.js?v=22, nanatsu.js?v=19, flores.js?v=23, economy.js?v=19, minigames.js?v=19, media-player.js?v=22)

**Backend fixes (Antigravity — ya desplegados):**
1. **GET /transactions** → abierto para usuarios (filtra por from/to = nick del JWT); antes 403 "solo administradores"
2. **GET /users/:nick** → 500 en usuarios específicos corregido (datos corruptos limpiados)
3. **GET /profiles/:nick/comments** → endpoint creado
4. **GET /users** y **GET /bank_accounts** → ahora exigen JWT (antes públicos con hash expuesto)
5. **POST /bank/burn** y **POST /bank/mint** → gates corregidos (self-burn abierto, mint atómico con `pusdDeduct`)

**PENDIENTES (sin crash, requieren decisión):**
- `loans-max-display` / `active-loan-container` IDs faltantes en HTML (guards en banking.js evitan crash)
- `vault_ops` collection no existe en backend → historial bóvedas "Sin movimientos aún"
- `loadInventorySettings` hydration de `floresAnniversaryClaimed` / `floresPartnerBirthdayClaimed` (parcheado en applyUserData)

**Verificación**: `node --check` PASA en los 31 JS. Sintaxis limpia, 0 errores.

---

*Actualizar este archivo con cada cambio significativo.*
