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

---

*Actualizar este archivo con cada cambio significativo.*
