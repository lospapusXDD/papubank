// ===== CATÁLOGO DINÁMICO: DISTROS LINUX + ANIME (generado por datos) =====

window.DISTROS = [
    // ── Familia Arch ──
    { n: 'Arch Linux', f: 'Arch', b: 'Independiente (propia)', i: 'fa-archlinux', c: '#1793d1', p: ['Siempre actualizado (rolling)', 'La mejor wiki del mundo (Arch Wiki)'], cj: ['Instalación manual', 'Se rompe fácil si no sabés qué hacés'], mn: '512MB RAM · 1 núcleo · 2GB disco', mr: '4GB RAM · 2 núcleos · 20GB disco', u: 'https://archlinux.org' },
    { n: 'Manjaro', f: 'Arch', b: 'Arch Linux', i: 'fa-archlinux', c: '#1793d1', p: ['Fácil de instalar y usar', 'Trae todo listo, drivers incluidos'], cj: ['Retrasa paquetes de Arch', 'Actualizaciones a veces rompen'], mn: '1GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://manjaro.org' },
    { n: 'EndeavourOS', f: 'Arch', b: 'Arch Linux', i: 'fa-rocket', c: '#7f5f1e', p: ['Arch sin el instalador doloroso', 'Comunidad muy amigable'], cj: ['Sigue siendo rolling (cuidado)', 'Menos asistencia que Manjaro'], mn: '1GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://endeavouros.com' },
    { n: 'Garuda Linux', f: 'Arch', b: 'Arch Linux', i: 'fa-dragon', c: '#5f9ea0', p: ['Lista para gaming, KDE precioso', 'Snapshots con Btrfs (anti-rompe)'], cj: ['Pesada (mucha carne instalada)', 'Consume mucha RAM'], mn: '4GB RAM · 2 núcleos · 30GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://garudalinux.org' },
    { n: 'ArcoLinux', f: 'Arch', b: 'Arch Linux', i: 'fa-archlinux', c: '#1793d1', p: ['Pensada para aprender Arch', 'Scripts para armar tu propio sistema'], cj: ['Comunidad pequeña', 'Poco soporte a largo plazo'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://arcolinux.com' },
    { n: 'Artix Linux', f: 'Arch', b: 'Arch Linux', i: 'fa-archlinux', c: '#8ab4f8', p: ['Arch sin systemd (init-por-que-no)', 'Ligera y veloz'], cj: ['Software más nicho', 'Tienes que saber lo que haces'], mn: '512MB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://artixlinux.org' },
    { n: 'CachyOS', f: 'Arch', b: 'Arch Linux', i: 'fa-gauge-high', c: '#4a6cf7', p: ['Arch optimizada (x86-64-v3)', 'De las más rápidas de hoy'], cj: ['Muy nueva (poco rodaje)', 'Requiere CPU moderna (x86-64-v3)'], mn: '4GB RAM · CPU con x86-64-v3 · 30GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://cachyos.org' },
    { n: 'RebornOS', f: 'Arch', b: 'Arch Linux', i: 'fa-phoenix-squadron', c: '#e76f51', p: ['Instalador gráfico sencillo', 'Ideal para gamers (drivers ya)'], cj: ['Base más chica que otras Arch', 'Pocos mirrors'], mn: '1GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 50GB disco', u: 'https://rebornos.org' },
    { n: 'ArchBang', f: 'Arch', b: 'Arch Linux', i: 'fa-archlinux', c: '#1793d1', p: ['Openbox superligero', 'Arranca al toque'], cj: ['Minimalismo extremo', 'Para avanzados'], mn: '256MB RAM · 1 núcleo · 8GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://archbang.org' },
    { n: 'BlackArch', f: 'Arch', b: 'Arch Linux', i: 'fa-user-secret', c: '#00e0e0', p: ['2600+ herramientas de hacking', 'Perfecta para pentesting'], cj: ['No para uso diario', 'Repo enorme, instalación lenta'], mn: '2GB RAM · 1 núcleo · 30GB disco', mr: '8GB RAM · 4 núcleos · 80GB disco', u: 'https://blackarch.org' },
    { n: 'Archcraft', f: 'Arch', b: 'Arch Linux', i: 'fa-paintbrush', c: '#e91e63', p: ['Minimalista y preciosa', 'Openbox/BSPWM listos'], cj: ['Para los que aman ricing', 'No trae tantas apps'], mn: '512MB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://archcraft.io' },

    // ── Familia Debian / Ubuntu ──
    { n: 'Debian', f: 'Debian', b: 'Independiente (propia)', i: 'fa-debian', c: '#a81d33', p: ['Ultra estable', 'Base de casi todo Linux'], cj: ['Paquetes viejos', 'Sin mucho soporte de fábrica'], mn: '512MB RAM · 1 núcleo · 5GB disco', mr: '2GB RAM · 2 núcleos · 20GB disco', u: 'https://debian.org' },
    { n: 'Ubuntu', f: 'Debian', b: 'Debian', i: 'fa-ubuntu', c: '#e95420', p: ['La más popular, mil tutoriales', 'Soporte largo (LTS)'], cj: ['Snap obligado', 'Más pesada que otras'], mn: '2GB RAM · 2 núcleos · 25GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://ubuntu.com' },
    { n: 'Linux Mint', f: 'Debian', b: 'Ubuntu', i: 'fa-leaf', c: '#67c23a', p: ['Perfecta para empezar', 'Interfaz tipo Windows, ligera'], cj: ['Menos personalizable', 'Basada en Ubuntu (dependencias)'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://linuxmint.com' },
    { n: 'Pop!_OS', f: 'Debian', b: 'Ubuntu', i: 'fa-rocket', c: '#48b9c7', p: ['Gaming lista (drivers NVIDIA)', 'Tiling automático piola'], cj: ['Tinker panel propio (cambio a COSMIC)', 'No tan estable como Mint'], mn: '4GB RAM · 2 núcleos · 25GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://pop.system76.com' },
    { n: 'Zorin OS', f: 'Debian', b: 'Ubuntu', i: 'fa-windows', c: '#0aa1dd', p: ['Parece Windows, transición fácil', 'Ligera para PCs viejos'], cj: ['Basada en Ubuntu (no rompe nada)', 'Menos control de paquetes'], mn: '2GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://zorin.com' },
    { n: 'elementary OS', f: 'Debian', b: 'Ubuntu', i: 'fa-apple', c: '#8ab4f8', p: ['Parece macOS, diseño impecable', 'Muy fácil de usar'], cj: ['Pocas opciones de configuración', 'App Center propio limitado'], mn: '2GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://elementary.io' },
    { n: 'MX Linux', f: 'Debian', b: 'Debian', i: 'fa-flag', c: '#00bfff', p: ['Ligera y rápida', 'Herramientas propias geniales'], cj: ['Base Debian estable (paquetes viejos)', 'Menos pulida visualmente'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://mxlinux.org' },
    { n: 'Deepin', f: 'Debian', b: 'Debian', i: 'fa-apple-whole', c: '#0c6d5e', p: ['DDE (Deepin Desktop) hermoso', 'Muy fluida y moderna'], cj: ['Origen dudoso (China) por privacidad', 'Actualizaciones a veces raras'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://www.deepin.org' },
    { n: 'KDE neon', f: 'Debian', b: 'Ubuntu', i: 'fa-k', c: '#1793d1', p: ['KDE Plasma siempre actualizado', 'Bonito y estable'], cj: ['Solo KDE (sin otra opción)', 'Base Ubuntu un poco vieja'], mn: '2GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://neon.kde.org' },
    { n: 'Kali Linux', f: 'Debian', b: 'Debian', i: 'fa-user-secret', c: '#557c94', p: ['La reina del pentesting', 'Mil herramientas preinstaladas'], cj: ['NO para uso diario', 'La rompes por aburrimiento'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://kali.org' },
    { n: 'Tails', f: 'Debian', b: 'Debian', i: 'fa-mask', c: '#563d7c', p: ['Anónima, sale por Tor', 'No deja rastro (amnesia total)'], cj: ['Lentísima', 'Sin persistencia por defecto'], mn: '2GB RAM · 1 núcleo · USB 8GB', mr: '4GB RAM · 2 núcleos · USB 16GB', u: 'https://tails.net' },
    { n: 'Raspberry Pi OS', f: 'Debian', b: 'Debian', i: 'fa-microchip', c: '#c51a4a', p: ['Perfecta para Raspberry Pi', 'Ligera y estable'], cj: ['Solo ARM', 'Limitada a hardware Pi'], mn: '1GB RAM (Pi 3+) · SD 8GB', mr: '4GB RAM (Pi 4/5) · SD 32GB', u: 'https://www.raspberrypi.com/software' },
    { n: 'PureOS', f: 'Debian', b: 'Debian', i: 'fa-hand-holding-heart', c: '#00838f', p: ['100% libre', 'Privacidad por defecto'], cj: ['Software comercial limitado', 'Nicho'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://pureos.net' },
    { n: 'SparkyLinux', f: 'Debian', b: 'Debian', i: 'fa-bolt', c: '#f9a825', p: ['Ligera, muchas variantes', 'Modo juego incluido'], cj: ['Comunidad pequeña', 'Menos pulida'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://sparkylinux.org' },
    { n: 'antiX', f: 'Debian', b: 'Debian', i: 'fa-skull', c: '#6d4c41', p: ['Corre hasta en una tostadora', 'Ultraligera'], cj: ['Sin systemd (para algunos es pro)', 'Interfaz vieja'], mn: '256MB RAM · 1 núcleo · 5GB disco', mr: '1GB RAM · 2 núcleos · 20GB disco', u: 'https://antixlinux.com' },
    { n: 'Q4OS', f: 'Debian', b: 'Debian', i: 'fa-gem', c: '#0288d1', p: ['Estable y ligera', 'Tema tipo Windows XP'], cj: ['Estética nostálgica', 'Nicho'], mn: '512MB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://q4os.org' },
    { n: 'Parrot OS', f: 'Debian', b: 'Debian', i: 'fa-feather', c: '#26c281', p: ['Pentesting + privacidad', 'Ligera comparada a Kali'], cj: ['También es nicho', 'No para uso diario'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://parrotsec.org' },
    { n: 'Devuan', f: 'Debian', b: 'Debian', i: 'fa-egg', c: '#1c1c1c', p: ['Debian sin systemd', 'Estable como piedra'], cj: ['Menos documentación', 'Comunidad pequeña'], mn: '512MB RAM · 1 núcleo · 5GB disco', mr: '2GB RAM · 2 núcleos · 20GB disco', u: 'https://devuan.org' },
    { n: 'Nitrux', f: 'Debian', b: 'Debian (inmutable)', i: 'fa-shield-halved', c: '#7c3aed', p: ['AppImage por defecto', 'NOMAD Desktop hermosa'], cj: ['Muy rompedora', 'No recomendada para novatos'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://nxos.org' },
    { n: 'Kubuntu', f: 'Debian', b: 'Ubuntu', i: 'fa-k', c: '#1793d1', p: ['Ubuntu + KDE Plasma', 'Bonita y completa'], cj: ['Pesada', 'Snap como Ubuntu'], mn: '2GB RAM · 2 núcleos · 25GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://kubuntu.org' },
    { n: 'Xubuntu', f: 'Debian', b: 'Ubuntu', i: 'fa-x', c: '#00a2e8', p: ['Xfce, ligera y rápida', 'Perfecta para PCs viejos'], cj: ['Menos llamativa', 'Xfce algo básico'], mn: '1GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://xubuntu.org' },
    { n: 'Lubuntu', f: 'Debian', b: 'Ubuntu', i: 'fa-flask', c: '#0068a8', p: ['LXQt, superligera', 'Ideal para hardware antiguo'], cj: ['Muy minimalista', 'Pocas apps por defecto'], mn: '512MB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://lubuntu.me' },
    { n: 'Ubuntu MATE', f: 'Debian', b: 'Ubuntu', i: 'fa-heart', c: '#2b6e3b', p: ['MATE: clásica y estable', 'Para máquinas medianas'], cj: ['Estética retro', 'Menos moderna'], mn: '1GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://ubuntu-mate.org' },
    { n: 'Bodhi Linux', f: 'Debian', b: 'Ubuntu', i: 'fa-buddhist', c: '#e4a11b', p: ['Moksha, minimalista', 'Consume muy poca RAM'], cj: ['Poco pulida', 'Nicho'], mn: '512MB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://www.bodhilinux.com' },
    { n: 'Linux Lite', f: 'Debian', b: 'Ubuntu', i: 'fa-feather', c: '#f77f00', p: ['Perfecta para migrar de Windows', 'Ligera'], cj: ['Xfce básico', 'Menos apps'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://www.linuxliteos.com' },
    { n: 'LMDE', f: 'Debian', b: 'Debian', i: 'fa-leaf', c: '#67c23a', p: ['Linux Mint sobre Debian puro', 'Sin dependencia de Ubuntu'], cj: ['Menos soporte que Mint normal', 'Repos un poco más viejos'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://blog.linuxmint.com/?p=1470' },
    { n: 'Ubuntu Budgie', f: 'Debian', b: 'Ubuntu', i: 'fa-sun', c: '#f17f42', p: ['Budgie, moderno y limpio', 'Ligera'], cj: ['Basada en Ubuntu (snap)', 'Comunidad menor'], mn: '1GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://ubuntubudgie.org' },

    // ── Familia Red Hat / Fedora ──
    { n: 'Fedora', f: 'Red Hat', b: 'Independiente (propia)', i: 'fa-fedora', c: '#51a2da', p: ['Tecnología siempre nueva', 'La usa Red Hat, muy estable'], cj: ['Ciclos cortos (6 meses)', 'Actualizaciones frecuentes'], mn: '2GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://getfedora.org' },
    { n: 'RHEL', f: 'Red Hat', b: 'Independiente (propia)', i: 'fa-building-shield', c: '#ee0000', p: ['Estándar empresarial', 'Soporte oficial 10 años'], cj: ['Pago (licencia)', 'Pensada para empresas'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://www.redhat.com' },
    { n: 'CentOS Stream', f: 'Red Hat', b: 'Fedora', i: 'fa-infinity', c: '#8a8a8a', p: ['Entre Fedora y RHEL', 'Gratis'], cj: ['Rolling intermedio', 'No tan estable como RHEL'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://www.centos.org' },
    { n: 'Rocky Linux', f: 'Red Hat', b: 'RHEL', i: 'fa-mountain', c: '#0f5e9c', p: ['RHEL gratis', 'Perfecta para servidores'], cj: ['Paquetes viejos', 'No ideal para desktop'], mn: '2GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 30GB disco', u: 'https://rockylinux.org' },
    { n: 'AlmaLinux', f: 'Red Hat', b: 'RHEL', i: 'fa-asterisk', c: '#233547', p: ['RHEL compatible 100%', 'Comunidad activa'], cj: ['Actualizaciones conservadoras', 'Desktop poco amigable'], mn: '2GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 30GB disco', u: 'https://almalinux.org' },
    { n: 'Nobara', f: 'Red Hat', b: 'Fedora', i: 'fa-gamepad', c: '#00d7ff', p: ['Fedora para gaming', 'Drivers y tweaks ya puestos'], cj: ['Creador solitario (GloriousEggroll)', 'Updates pueden romper'], mn: '4GB RAM · 2 núcleos · 30GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://nobaraproject.org' },
    { n: 'Oracle Linux', f: 'Red Hat', b: 'RHEL', i: 'fa-database', c: '#e53935', p: ['RHEL compatible, gratis', 'KSplice (parches en caliente)'], cj: ['Oracle (confianza?)', 'Nicho empresarial'], mn: '2GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 30GB disco', u: 'https://www.oracle.com/linux' },
    { n: 'ClearOS', f: 'Red Hat', b: 'CentOS', i: 'fa-network-wired', c: '#2c7a9e', p: ['Gateway/servidor hogareño', 'Panel web fácil'], cj: ['Nicho servidor', 'Basada en CentOS viejo'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://www.clearos.com' },
    { n: 'Ultramarine Linux', f: 'Red Hat', b: 'Fedora', i: 'fa-water', c: '#1e88e5', p: ['Fedora amigable', 'Con soporte de paquetes RPM'], cj: ['Proyecto joven', 'Comunidad chica'], mn: '2GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://ultramarine-linux.org' },
    { n: 'Asahi Linux', f: 'Red Hat', b: 'Fedora (ARM)', i: 'fa-apple', c: '#a5a5a5', p: ['Linux para Mac M1/M2', 'Muy activo'], cj: ['Solo Apple Silicon', 'Aún incompleto'], mn: 'Mac M1/M2 · 8GB RAM', mr: 'Mac M1/M2 Pro/Max · 16GB RAM', u: 'https://asahilinux.org' },

    // ── Independientes ──
    { n: 'openSUSE Leap', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-chameleon', c: '#73ba25', p: ['YaST: configuración brutal', 'Estable'], cj: ['Paquetes RPM (menos comunes)', 'Menos comunidad hispana'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://www.opensuse.org' },
    { n: 'openSUSE Tumbleweed', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-chameleon', c: '#73ba25', p: ['Rolling muy pulido', 'Testeos automáticos'], cj: ['Actualizaciones constantes', 'YaST a veces confunde'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://www.opensuse.org' },
    { n: 'NixOS', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-boxes-stacked', c: '#5277c3', p: ['Configuración declarativa', 'Imposible romperla'], cj: ['Curva de aprendizaje brutal', 'Todo distinto a lo normal'], mn: '2GB RAM · 1 núcleo · 10GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://nixos.org' },
    { n: 'Void Linux', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-bolt', c: '#8a2be2', p: ['Sin systemd, superrápida', 'xbps, gestor propio'], cj: ['Comunidad pequeña', 'Menos paquetes'], mn: '512MB RAM · 1 núcleo · 5GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://voidlinux.org' },
    { n: 'Alpine Linux', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-mountain-sun', c: '#0d597f', p: ['Ultraligera (musl/busybox)', 'Segura (reina de los contenedores)'], cj: ['Binarios dinámicos a veces chocan', 'No para apps con glibc'], mn: '128MB RAM · 1 núcleo · 1GB disco', mr: '1GB RAM · 1 núcleo · 5GB disco', u: 'https://alpinelinux.org' },
    { n: 'Slackware', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-puzzle-piece', c: '#2255aa', p: ['La más vieja y pura', 'Simple, sin magia'], cj: ['Manual total', 'Para expertos'], mn: '1GB RAM · 1 núcleo · 5GB disco', mr: '2GB RAM · 2 núcleos · 30GB disco', u: 'https://www.slackware.com' },
    { n: 'Gentoo', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-hammer', c: '#54487a', p: ['Compilás todo (Portage)', 'Optimizada a tu hardware'], cj: ['Compilas hasta el sueño', 'Instalación eterna'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://www.gentoo.org' },
    { n: 'Solus', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-fire-flame-curved', c: '#5294e2', p: ['Rolling estable y pulida', 'Budgie, rápido y moderno'], cj: ['Equipo pequeño', 'Reinventaron el repo varias veces'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://getsol.us' },
    { n: 'Puppy Linux', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-dog', c: '#f2a900', p: ['Corre desde la RAM', 'Funciona hasta en PCs de museo'], cj: ['Bastante rara', 'Flujo de trabajo distinto'], mn: '512MB RAM · 1 núcleo · 1GB disco', mr: '1GB RAM · 1 núcleo · 5GB disco', u: 'https://puppylinux-woof-ce.github.io' },
    { n: 'Tiny Core Linux', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-compress', c: '#444444', p: ['Sistema base de ~20MB', 'Locura minimalista'], cj: ['Sin apps preinstaladas', 'Para mostrar que podés'], mn: '128MB RAM · 1 núcleo · 128MB disco', mr: '1GB RAM · 1 núcleo · 2GB disco', u: 'http://tinycorelinux.net' },
    { n: 'Slax', f: 'Independiente', b: 'Debian', i: 'fa-car', c: '#2a2a2a', p: ['Portátil, corre desde USB', 'Ligera'], cj: ['Basada en Debian, pocos extras', 'Mantenimiento irregular'], mn: '512MB RAM · 1 núcleo · USB 4GB', mr: '2GB RAM · 2 núcleos · USB 16GB', u: 'https://www.slax.org' },
    { n: 'Porteus', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-envelope-open-text', c: '#2f4f4f', p: ['Portátil y modular', 'Arranca rápido'], cj: ['Comunidad pequeña', 'Menos documentación'], mn: '512MB RAM · 1 núcleo · USB 4GB', mr: '2GB RAM · 2 núcleos · USB 16GB', u: 'https://porteus.org' },
    { n: 'PCLinuxOS', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-circle-nodes', c: '#2e6dab', p: ['Rolling estable (uno de los más)', 'Fácil para novatos'], cj: ['Base Slackware híbrida', 'Menos paquetes'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://www.pclinuxos.com' },
    { n: 'Bedrock Linux', f: 'Independiente', b: 'Meta-distro (mezcla todas)', i: 'fa-layer-group', c: '#6a1b9a', p: ['Mezclás paquetes de TODAS las distros', 'El junte definitivo'], cj: ['Complejidad enorme', 'No para novatos'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://www.bedrocklinux.org' },
    { n: 'Guix System', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-recycle', c: '#7cb342', p: ['Declarativa como NixOS (libre)', 'Reproducible'], cj: ['100% libre (hardware puede fallar)', 'Curva empinada'], mn: '2GB RAM · 1 núcleo · 10GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://guix.gnu.org' },
    { n: 'Chimera Linux', f: 'Independiente', b: 'Independiente (propia)', i: 'fa-fire', c: '#ff5722', p: ['Fusiona lo mejor (FreeBSD+Linux)', 'Musl, rápido'], cj: ['Muy joven', 'Comunidad mínima'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://chimera-linux.org' },

    // ── Servidores / IoT ──
    { n: 'Proxmox VE', f: 'Servidor', b: 'Debian', i: 'fa-server', c: '#e57000', p: ['Virtualización + contenedores', 'Panel web de verdad'], cj: ['Requiere hardware decente', 'Configuración avanzada'], mn: '4GB RAM · 2 núcleos · 16GB disco', mr: '16GB RAM · 8 núcleos · SSD 120GB', u: 'https://www.proxmox.com' },
    { n: 'Armbian', f: 'Servidor', b: 'Debian/Ubuntu (ARM)', i: 'fa-microchip', c: '#15a0e2', p: ['SBC (Pi, Odroid, etc.) optimizada', 'Estable para servidores ARM'], cj: ['Solo ARM', 'Ciertas boards requieren pago'], mn: '1GB RAM (SBC) · microSD 8GB', mr: '4GB RAM (SBC) · SSD/32GB microSD', u: 'https://www.armbian.com' },
    { n: 'OpenWrt', f: 'Servidor', b: 'Independiente (propia)', i: 'fa-wifi', c: '#00bcd4', p: ['Router → Linux completo', 'Paquetes, firewall, QoS'], cj: ['Riesgo de "brickear" el router', 'Configuración técnica'], mn: '64MB RAM · 8MB flash (router)', mr: '256MB RAM · 32MB flash (router)', u: 'https://openwrt.org' },
    { n: 'DietPi', f: 'Servidor', b: 'Debian (ARM/x86)', i: 'fa-carrot', c: '#66bb6a', p: ['Optimizada, consume poquísimo', 'Instalador de apps 1-click'], cj: ['Basada en Debian (ARM/PC)', 'Menos software'], mn: '512MB RAM · microSD 4GB', mr: '2GB RAM · SD 32GB', u: 'https://dietpi.com' },
    { n: 'Ubuntu Server', f: 'Servidor', b: 'Ubuntu', i: 'fa-server', c: '#e95420', p: ['El estándar de los servidores', 'Soporte LTS 5-10 años'], cj: ['Sin interfaz (SSH)', 'Snap en el server a veces molesta'], mn: '1GB RAM · 1 núcleo · 5GB disco', mr: '8GB RAM · 4 núcleos · SSD 50GB', u: 'https://ubuntu.com/server' },
    { n: 'Flatcar', f: 'Servidor', b: 'Chromium OS', i: 'fa-car-battery', c: '#37474f', p: ['Immutable, para contenedores', 'Actualización atómica'], cj: ['Solo CLI', 'Requiere saber Kubernetes'], mn: '2GB RAM · 2 núcleos · 10GB disco', mr: '8GB RAM · 4 núcleos · SSD 40GB', u: 'https://www.flatcar.org' },
    { n: 'Talos Linux', f: 'Servidor', b: 'Independiente (propia)', i: 'fa-robot', c: '#26c6da', p: ['Kubernetes-first, mínimo', 'API sola, sin SSH'], cj: ['Solo para clusters', 'Curva alta'], mn: '2GB RAM · 2 núcleos · 10GB disco', mr: '8GB RAM · 4 núcleos · SSD 40GB', u: 'https://www.talos.dev' },
    { n: 'openSUSE MicroOS', f: 'Servidor', b: 'openSUSE', i: 'fa-microchip', c: '#73ba25', p: ['Transaccional (inmutable)', 'Ideal para contenedores'], cj: ['Solo servidor', 'Ajustes con rebase'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · SSD 50GB', u: 'https://microos.opensuse.org' },
    { n: 'BalenaOS', f: 'Servidor', b: 'Independiente (Yocto)', i: 'fa-box', c: '#2d6cdf', p: ['IoT por contenedores', 'Actualizaciones remotas'], cj: ['Comercial para dispositivos', 'Nicho IoT'], mn: '1GB RAM (SBC) · microSD 8GB', mr: '4GB RAM (SBC) · microSD 32GB', u: 'https://www.balena.io/os' },
    { n: 'IPFire', f: 'Servidor', b: 'Independiente (propia)', i: 'fa-fire-flame-simple', c: '#e5532d', p: ['Firewall/router dedicado', 'Panel web claro'], cj: ['Nicho seguridad', 'No es un desktop'], mn: '1GB RAM · 1 núcleo · 4GB disco', mr: '4GB RAM · 2 núcleos · SSD 20GB', u: 'https://www.ipfire.org' },

    // ── Seguridad / Privacidad ──
    { n: 'Qubes OS', f: 'Seguridad', b: 'Independiente (propia)', i: 'fa-cubes', c: '#3878d7', p: ['Aislamiento por compartimentos', 'Nivel militar'], cj: ['Pesada (múltiples VMs)', 'Requiere CPU con VT'], mn: '8GB RAM · 4 núcleos · 40GB disco (con VT-x/AMD-V)', mr: '16GB RAM · 8 núcleos · SSD 100GB', u: 'https://www.qubes-os.org' },
    { n: 'Whonix', f: 'Seguridad', b: 'Debian', i: 'fa-mask', c: '#4caf50', p: ['Todo pasa por Tor', 'Imposible rastrear (casi)'], cj: ['Lentísima', 'Conveniencia sacrificada'], mn: '2GB RAM · 2 núcleos · 20GB disco (VMs)', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://www.whonix.org' },
    { n: 'Knoppix', f: 'Seguridad', b: 'Debian', i: 'fa-compact-disc', c: '#5d4037', p: ['Live CD clásico', 'Rescate de sistemas'], cj: ['Vieja', 'Solo rescate'], mn: '1GB RAM · 1 núcleo · CD/USB 8GB', mr: '2GB RAM · 2 núcleos · USB 16GB', u: 'https://www.knopper.net/knoppix' },
    { n: 'CAINE', f: 'Seguridad', b: 'Ubuntu', i: 'fa-search', c: '#7b1fa2', p: ['Forense digital', 'Herramientas completas'], cj: ['Nicho forense', 'No uso diario'], mn: '4GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://www.caine-live.net' },
    { n: 'Security Onion', f: 'Seguridad', b: 'Ubuntu', i: 'fa-shield', c: '#263238', p: ['Monitoreo de red (NSM)', 'Pila completa'], cj: ['Pesada', 'Requiere mucho RAM/CPU'], mn: '16GB RAM · 8 núcleos · 200GB disco', mr: '32GB RAM · 16 núcleos · SSD 500GB', u: 'https://securityonionsolutions.com' },
    { n: 'Kodachi', f: 'Seguridad', b: 'Debian', i: 'fa-ghost', c: '#607d8b', p: ['Tails-like, anónima', 'VPN+Tor por defecto'], cj: ['Lenta', 'Nicho'], mn: '2GB RAM · 1 núcleo · USB 8GB', mr: '4GB RAM · 2 núcleos · USB 16GB', u: 'https://www.digi77.com/linux-kodachi' },
    { n: 'BackBox', f: 'Seguridad', b: 'Ubuntu', i: 'fa-box-open', c: '#f5a623', p: ['Pentesting Ubuntu-based', 'Ligera'], cj: ['Comunidad chica', 'Repo un poco viejo'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://www.backbox.org' },

    // ── Gaming ──
    { n: 'SteamOS', f: 'Gaming', b: 'Arch Linux', i: 'fa-steam', c: '#171a21', p: ['Modo consola (Steam Deck)', 'Proton de fábrica'], cj: ['Solo en Deck (mayormente)', 'Inmutable'], mn: 'Steam Deck (4GB RAM · APU)', mr: 'Steam Deck OLED (16GB RAM)', u: 'https://store.steampowered.com/steamdeck' },
    { n: 'Drauger OS', f: 'Gaming', b: 'Ubuntu', i: 'fa-crosshairs', c: '#455a64', p: ['Enfocada 100% en gaming', 'Latencia baja'], cj: ['Comunidad pequeña', 'Base Ubuntu (retrasada)'], mn: '4GB RAM · 2 núcleos · 30GB disco', mr: '16GB RAM · 4 núcleos · SSD 100GB', u: 'https://draugeros.org' },
    { n: 'Fedora Games', f: 'Gaming', b: 'Fedora', i: 'fa-gamepad', c: '#51a2da', p: ['Juegos FOSS preinstalados', 'Fedora estable'], cj: ['Juegos propietarios a mano', 'Menos tunning'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 60GB disco', u: 'https://labs.fedoraproject.org/en/games' },

    // ── Escritorio moderno / nichos ──
    { n: 'Vanilla OS', f: 'Escritorio', b: 'Ubuntu (inmutable)', i: 'fa-ice-cream', c: '#eaeaea', p: ['Immutable, para todos', 'OrbStack para contenedores'], cj: ['Joven', 'Pocas apps por defecto'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://vanillaos.org' },
    { n: 'Endless OS', f: 'Escritorio', b: 'Debian', i: 'fa-infinity', c: '#00a9e0', p: ['Funciona offline', 'Aplicaciones educativas'], cj: ['Modelo distinto', 'Actualizaciones por flujo'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 50GB disco', u: 'https://endlessos.org' },
    { n: 'GalliumOS', f: 'Escritorio', b: 'Xubuntu', i: 'fa-laptop', c: '#3949ab', p: ['Para Chromebooks', 'Ligera'], cj: ['Solo Chromebooks', 'Desarrollo lento'], mn: '2GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 30GB disco', u: 'https://galliumos.org' },
    { n: 'postmarketOS', f: 'Escritorio', b: 'Alpine Linux', i: 'fa-mobile-screen', c: '#2b6777', p: ['Linux en tu celular', '10 años de vida al hardware'], cj: ['Experimentación', 'Drivers limitados'], mn: 'Celular con 1GB RAM', mr: 'Celular con 4GB RAM', u: 'https://postmarketos.org' },
    { n: 'Ubuntu Touch', f: 'Escritorio', b: 'Ubuntu', i: 'fa-mobile', c: '#a23b72', p: ['Interfaz táctil', 'Convergencia'], cj: ['App store limitado', 'Pocos celulares soportados'], mn: 'Celular con 2GB RAM', mr: 'Celular con 4GB RAM', u: 'https://ubports.com' },
    { n: 'Rhino Linux', f: 'Escritorio', b: 'Ubuntu', i: 'fa-rhino', c: '#ff9f1c', p: ['Rolling sobre Ubuntu', 'Unicorn Desktop (XFCE)'], cj: ['Nueva', 'Comunidad chica'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://rhinolinux.org' },
    { n: 'Regolith Linux', f: 'Escritorio', b: 'Ubuntu', i: 'fa-tiling', c: '#f2a900', p: ['i3wm listo de fábrica', 'Productividad pura'], cj: ['Tiling no es para todos', 'Basada en Ubuntu'], mn: '1GB RAM · 1 núcleo · 10GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://regolith-linux.org' },
    { n: 'Ubuntu Unity', f: 'Escritorio', b: 'Ubuntu', i: 'fa-circle', c: '#8e44ad', p: ['Resucitan Unity', 'Nostalgia'], cj: ['Nostálgica', 'Poco cambio'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://ubuntuunity.org' },
    { n: 'Fedora Silverblue', f: 'Escritorio', b: 'Fedora (inmutable)', i: 'fa-cloud', c: '#51a2da', p: ['Immutable (ostree)', 'Contenedores como apps'], cj: ['Modelo nuevo', 'No todo funciona en contenedor'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://silverblue.fedoraproject.org' },
    { n: 'Chrome OS Flex', f: 'Escritorio', b: 'Chromium OS (kernel Linux)', i: 'fa-chrome', c: '#1a73e8', p: ['Google, corre en cualquier PC', 'Ligera'], cj: ['Nube obligatoria', 'Control de Google'], mn: '4GB RAM · 1 núcleo · 16GB disco', mr: '8GB RAM · 2 núcleos · 32GB disco', u: 'https://chromeos.google/products/chromeos-flex' },
    { n: 'AV Linux', f: 'Escritorio', b: 'MX Linux', i: 'fa-music', c: '#f57c00', p: ['Audio profesional', 'Reaper y todo listo'], cj: ['Nicho audio', 'Base MX/Debian'], mn: '4GB RAM · 2 núcleos · 30GB disco', mr: '16GB RAM · 4 núcleos · SSD 80GB', u: 'https://www.bandshed.net/avlinux' },
    { n: 'Ubuntu Studio', f: 'Escritorio', b: 'Ubuntu', i: 'fa-clapperboard', c: '#7c3aed', p: ['Audio/vídeo/gran foto', 'Kernel de baja latencia'], cj: ['Pesada', 'Herramientas nicho'], mn: '8GB RAM · 4 núcleos · 30GB disco', mr: '16GB RAM · 8 núcleos · SSD 100GB', u: 'https://ubuntustudio.org' },
    { n: 'siduction', f: 'Escritorio', b: 'Debian (unstable)', i: 'fa-dice-six', c: '#e53935', p: ['Debian unstable al día', 'Rolling seria'], cj: ['Puede romperse', 'No apta para novatos'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://siduction.org' },
    { n: 'Feren OS', f: 'Escritorio', b: 'Linux Mint/Ubuntu', i: 'fa-fan', c: '#00b8d4', p: ['Bonita, fácil', 'Diseñada para migrar'], cj: ['Comunidad pequeña', 'Basada en Mint/Ubuntu'], mn: '2GB RAM · 1 núcleo · 20GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://ferenos.weebly.com' },
    { n: 'Neptune OS', f: 'Escritorio', b: 'Debian', i: 'fa-water', c: '#00695c', p: ['Estable, basada en Debian', 'Ligera'], cj: ['Poco conocida', 'Menos soporte'], mn: '2GB RAM · 1 núcleo · 15GB disco', mr: '4GB RAM · 2 núcleos · 40GB disco', u: 'https://neptunex.eu' },
    { n: 'Maui Linux', f: 'Escritorio', b: 'Neon/Debian', i: 'fa-fish', c: '#0288d1', p: ['Desktop bonita (Netrunner)', 'Estable'], cj: ['Proyecto casi parado', 'Nicho'], mn: '2GB RAM · 2 núcleos · 20GB disco', mr: '8GB RAM · 4 núcleos · 50GB disco', u: 'https://mauilinux.org' },
];

window.ANIMES = [
    // Sci-fi / Thriller
    { n: 'Steins;Gate', g: 'Sci-Fi', t: 'OBRA MAESTRA', d: 'Un "científico loco" viaja en el tiempo con un microondas. Cables para llorar.' },
    { n: 'Code Geass', g: 'Mecha', t: 'ESTRATEGIA', d: 'Lelouch con poder de dar órdenes absolutas. Chess con mechas.' },
    { n: 'Fullmetal Alchemist: Brotherhood', g: 'Acción', t: 'OBRA MAESTRA', d: 'Dos hermanos pagaron el precio de la alquimia. Historia perfecta.' },
    { n: 'Monster', g: 'Thriller', t: 'SEINEN', d: 'Un cirujano elige salvar a un niño. Ese niño era un monstruo.' },
    { n: 'Death Parade', g: 'Thriller', t: 'DARK', d: 'Juegos mortales que deciden reencarnación o vacío. La historia del juez te rompe.' },
    { n: 'Psycho-Pass', g: 'Sci-Fi', t: 'DYSTOPIA', d: 'Una sociedad donde un sistema decide si sos criminal antes de que lo seas.' },
    { n: 'Erased', g: 'Mystery', t: 'TIME LOOP', d: 'Volvés en el tiempo a evitar un asesinato. El villano te va a enfriar la sangre.' },
    { n: 'Link Click', g: 'Mystery', t: 'TIME LOOP', d: 'Fotos que te dejan alterar el pasado 12 horas. Animación china que compite al tope.' },
    { n: 'Odd Taxi', g: 'Mystery', t: 'THRILLER', d: 'Un taxi con animales que hablan. Todos son humanos. No confíes en nadie.' },
    { n: '86 Eighty-Six', g: 'Mecha', t: 'BELICO', d: 'Soldados invisibles peleando contra drones. El mejor mecha moderno.' },
    { n: 'Vivy: Fluorite Eye', g: 'Sci-Fi', t: 'ACCION', d: 'Una IA cantante debe salvar a la humanidad en 100 años. Banda sonora 10/10.' },
    { n: 'Pluto', g: 'Sci-Fi', t: 'MYSTERY', d: 'Urasawa + Astro Boy = obra. Robots que lloran.' },
    { n: 'Ghost in the Shell', g: 'Sci-Fi', t: 'PELICULA', d: 'El anime que inspiró Matrix. Ciberpunk puro.' },
    { n: 'Akira', g: 'Sci-Fi', t: 'PELICULA', d: 'La película que puso a Japón en el mapa. Tetsuo... ' },
    { n: 'Cyberpunk: Edgerunners', g: 'Sci-Fi', t: 'TRAGEDIA', d: 'Night City te arruina pero al menos te deja una canción con la que llorar.' },
    { n: 'Serial Experiments Lain', g: 'Sci-Fi', t: 'PSICOLOGICO', d: 'La red, Dios y la identidad. Para ver dos veces.' },
    { n: 'Paranoia Agent', g: 'Thriller', t: 'PSICOLOGICO', d: 'Un niño con patines y bate golpea a la gente. El miedo colectivo.' },
    { n: 'Paprika', g: 'Sci-Fi', t: 'PELICULA', d: 'Terapia de sueños. Inception pero antes y mejor.' },
    { n: 'Perfect Blue', g: 'Thriller', t: 'PELICULA', d: 'Una idol perseguida por su doppelganger. Black Swan la copió.' },
    { n: 'The Promised Neverland', g: 'Thriller', t: 'TEMP1 SOLO', d: 'Un orfanato es un criadero. Mirá solo la temporada 1.' },
    { n: 'Summertime Rendering', g: 'Thriller', t: 'TIME LOOP', d: 'Isla, muertes, dobles, bucle temporal. Adictiva.' },
    { n: 'Classroom of the Elite', g: 'Psicológico', t: 'ESCUELA', d: 'El salón donde todos mienten. Kiyotaka es un monstruo en calma.' },
    { n: 'Kaiji', g: 'Psicológico', t: 'GAMBLING', d: 'Juegos de azar mortales con tensión que duele. El mejor "gambling" del anime.' },
    { n: 'Tomodachi Game', g: 'Psicológico', t: 'GAMBLING', d: 'Amistad puesta a prueba con deudas. Todos son peores de lo que pensás.' },

    // Acción / Seinen
    { n: 'Berserk (1997)', g: 'Dark', t: 'OBRA MAESTRA', d: 'Guts, Griffith y el Eclipse. Trauma garantizado.' },
    { n: 'Chainsaw Man', g: 'Acción', t: 'LOCO', d: 'Denji y su motosierra. Pochita es el mejor perro.' },
    { n: 'Vinland Saga', g: 'Historico', t: 'SEINEN', d: 'Vikingos, venganza y redención. Askeladd es de los mejores personajes.' },
    { n: 'Mob Psycho 100', g: 'Acción', t: 'COMEDIA', d: 'El psíquico más poderoso y su terapia. De la mano de ONE.' },
    { n: 'One Punch Man', g: 'Acción', t: 'PARODIA', d: 'Saitama se aburrió de ganar. Animación de la T1 espectacular.' },
    { n: 'Gurren Lagann', g: 'Mecha', t: 'EPICO', d: '¡ROMPE EL CIELO! Motivos para vivir, uno por cada capítulo.' },
    { n: 'Evangelion', g: 'Mecha', t: 'PSICOLOGICO', d: 'Shinji, crisis existencial y ángeles. El anime más analizado.' },
    { n: 'Made in Abyss', g: 'Dark', t: 'ADVENTURE', d: 'Un abismo precioso que destroza niños. NO ES PARA NENES.' },
    { n: 'Dorohedoro', g: 'Dark', t: 'LOCO', d: 'Hechiceros, lagartos y gángsters. Estética única.' },
    { n: 'Hell\u0027s Paradise', g: 'Dark', t: 'ACCION', d: 'Condenados a muerte buscan el elixir en una isla infernal.' },
    { n: 'Devilman Crybaby', g: 'Dark', t: 'TRAGEDIA', d: 'Violencia extrema y apocalipsis. Mirá y no digas que no avisamos.' },
    { n: 'Parasyte', g: 'Dark', t: 'SEINEN', d: 'Alienígenas que se comen humanos. La mano que habla es genial.' },
    { n: 'Tokyo Ghoul', g: 'Dark', t: 'TEMP1', d: 'Kaneki y los ghouls. La primera temporada es oro.' },
    { n: 'Goblin Slayer', g: 'Dark', t: 'FANTASY', d: 'Un cazador obsesionado con goblins. Grimdark puro.' },
    { n: 'Hellsing Ultimate', g: 'Dark', t: 'GORE', d: 'Alucard, el vampiro más roto. OVA de culto.' },
    { n: 'Castlevania', g: 'Dark', t: 'GORE', d: 'Netflix golazo. Dracula con justicia.' },
    { n: 'Blade of the Immortal', g: 'Historico', t: 'SAMURAI', d: 'Un inmortal que mata para redimirse. Violencia hermosa.' },
    { n: 'Dororo', g: 'Historico', t: 'SAMURAI', d: 'Hyakkimaru recupera su cuerpo matando demonios.' },
    { n: 'Golden Kamuy', g: 'Historico', t: 'COMEDIA', d: 'Oro, osos, cocina y veteranos de guerra. Extraña y genial.' },
    { n: '91 Days', g: 'Mafia', t: 'VENGANZA', d: 'Prohibición, mafia italiana y una venganza perfecta.' },
    { n: 'Banana Fish', g: 'Mafia', t: 'DRAMA', d: 'Ash y Eiji. La mafia de NY con un corazón partido.' },
    { n: 'Baccano!', g: 'Acción', t: 'CAOS', d: 'Líneas temporales mezcladas, inmortales y gángsters. Única.' },
    { n: 'Durarara!!', g: 'Urbano', t: 'FANTASIA', d: 'Tokio, un headless rider y secretos por todos lados.' },
    { n: 'Black Lagoon', g: 'Acción', t: 'NEON', d: 'Mercenarios en el mar. Revy no perdona.' },
    { n: 'Jormungand', g: 'Acción', t: 'BELICO', d: 'Traficantes de armas. Jonah y Koko, dupla genial.' },
    { n: 'Bungo Stray Dogs', g: 'Acción', t: 'SUPERNATURAL', d: 'Escritores famosos con poderes. Dazai es un caos.' },
    { n: 'Moriarty the Patriot', g: 'Crime', t: 'ESTRATEGIA', d: 'El gran villano de Sherlock con la razón de su lado.' },
    { n: 'Fate/Zero', g: 'Acción', t: 'FANTASY', d: 'Guerra del Santo Grial, parte oscura. Urobuchi en su mejor forma.' },
    { n: 'Madoka Magica', g: 'Dark', t: 'MAGICAL', d: 'Chicas mágicas... no es lo que parece. No spoilearse.' },

    // Isekai
    { n: 'Mushoku Tensei', g: 'Isekai', t: 'DAD', d: 'El padre del isekai moderno. Reencarnación con memorias. Calidad brutal.' },
    { n: 'Re:Zero', g: 'Isekai', t: 'SUFRIR', d: 'Subaru muere y vuelve. Y vuelve. Y vuelve. PTSD gratis.' },
    { n: 'Overlord', g: 'Isekai', t: 'VILLANO', d: 'Ainz Ooal Gown domina el mundo como esqueleto todopoderoso.' },
    { n: 'Frieren', g: 'Fantasía', t: 'OBRA MAESTRA', d: 'Una elfa maga tras la derrota del rey demonio. Sobre el tiempo y la amistad.' },
    { n: 'Solo Leveling', g: 'Isekai', t: 'POWER FANTASY', d: 'El cazador más débil sube de nivel como nadie. Cine total.' },
    { n: 'Ascendance of a Bookworm', g: 'Isekai', t: 'LIBROS', d: 'Una bibliófila reencarna pobre y quiere libros. Se arma un imperio.' },
    { n: 'The Eminence in Shadow', g: 'Isekai', t: 'COMEDIA', d: 'Un edgelord que se cree el villano secreto... y lo es.' },
    { n: 'Tanya the Evil', g: 'Isekai', t: 'BELICO', d: 'Una niña cruel peleando por el Kaiser. El diablo X contra el diablo chiquito.' },
    { n: 'Grimgar', g: 'Isekai', t: 'DARK', d: 'Isekai realista: los héroes son débiles y mueren feo.' },
    { n: 'Log Horizon', g: 'Isekai', t: 'ESTRATEGIA', d: 'Atrapados en un MMO. Shiroe elige ganar con el cerebro.' },
    { n: 'KonoSuba', g: 'Isekai', t: 'COMEDIA', d: 'Kazuma y su grupo de inútiles. La comedia definitiva.' },

    // Romance / Drama
    { n: 'Your Lie in April', g: 'Romance', t: 'MUSICA', d: 'Piano, violín y una mentira. Llorá en el último cap.' },
    { n: 'Anohana', g: 'Drama', t: 'SUPERNATURAL', d: 'El verano que nunca terminó. La flor de Menma.' },
    { n: 'Clannad: After Story', g: 'Romance', t: 'TRAGEDIA', d: 'La segunda parte te desarma. El romance más doloroso.' },
    { n: 'Toradora', g: 'Romance', t: 'COMEDIA', d: 'Taiga y Ryuuji, el clásico romcom bien hecho.' },
    { n: 'Kaguya-sama', g: 'Romance', t: 'COMEDIA', d: 'Dos genios que juegan ajedrez mental para no declararse. Épica.' },
    { n: 'Horimiya', g: 'Romance', t: 'SANO', d: 'La pareja más sana y real del anime. Sin vueltas.' },
    { n: 'Oregairu', g: 'Romance', t: 'DRAMA', d: 'Hachiman y sus frases de anti-sistema. Juventud falsa.' },
    { n: 'Your Name', g: 'Romance', t: 'PELICULA', d: 'Shinkai en su pico. Cuerpos cruzados y un cometa.' },
    { n: 'Weathering With You', g: 'Romance', t: 'PELICULA', d: 'Una chica que puede parar la lluvia. Tokio llora con vos.' },
    { n: 'A Silent Voice', g: 'Drama', t: 'PELICULA', d: 'Bullying, perdón y una chica sorda. La redención es hermosa.' },
    { n: 'Angel Beats!', g: 'Drama', t: 'AFTERLIFE', d: 'Un más allá con guerra entre vivos muertos. El final duele.' },
    { n: 'March Comes in Like a Lion', g: 'Drama', t: 'SHOGI', d: 'Un prodigio del shogi con depresión. Cálida y profunda.' },
    { n: 'Monogatari', g: 'Romance', t: 'RARO', d: 'Araragi y las anomalías. Diálogos mil, animación única.' },
    { n: 'Fruits Basket (2019)', g: 'Romance', t: 'DRAMA', d: 'El zodiaco chino maldito. Tooru arregla corazones.' },

    // Comedia / Slice of life
    { n: 'Grand Blue', g: 'Comedia', t: 'BUCEO', d: 'Universidad, buceo y alcohol. La comedia más violenta.' },
    { n: 'Hinamatsuri', g: 'Comedia', t: 'YAKUZA', d: 'Una psíquica que vive con un yakuza. Sana y graciosa.' },
    { n: 'Spy x Family', g: 'Comedia', t: 'FAMILIA', d: 'Espía + asesina + telepata = la mejor familia falsa.' },
    { n: 'The Way of the Househusband', g: 'Comedia', t: 'YAKUZA', d: 'El yakuza más temible ahora es amo de casa. God.' },
    { n: 'Bocchi the Rock', g: 'Comedia', t: 'MUSICA', d: 'Una hikikomori con guitarra. La ansiedad hecha anime.' },
    { n: 'K-On!', g: 'Slice', t: 'MUSICA', d: 'Una banda de chicas que toma té. Zen puro.' },
    { n: 'Yuru Camp', g: 'Slice', t: 'RELAX', d: 'Acampar con lindos paisajes. La serie anti-estrés.' },
    { n: 'Barakamon', g: 'Slice', t: 'CALIGRAFIA', d: 'Un calígrafo desterrado a una isla. La ternura en persona.' },
    { n: 'Silver Spoon', g: 'Slice', t: 'CAMPO', d: 'Una escuela agropecuaria. El otro lado de FMA (mismo autor).' },
    { n: 'Natsume Yūjin-Chō', g: 'Slice', t: 'SUPERNATURAL', d: 'Ver youkai y ayudarlos. Cálida, episódica, sanadora.' },
    { n: 'Shirobako', g: 'Slice', t: 'ANIME', d: 'Hacer anime, la serie. Para fans de la industria.' },
    { n: 'Kino\u0027s Journey', g: 'Slice', t: 'FILOSOFIA', d: 'Un viajero y una moto parlante por países raros.' },
    { n: 'Mushishi', g: 'Slice', t: 'FILOSOFIA', d: 'Espíritus primordiales. Quietud absoluta, belleza total.' },
    { n: 'Blue Period', g: 'Drama', t: 'ARTE', d: 'Un pibe descubre la pintura. Sobre crear y frustrarse.' },

    // Deportes
    { n: 'Haikyuu!!', g: 'Deporte', t: 'VOLEY', d: 'El deporte definitivo. Hinata salta alto, el equipo salta al corazón.' },
    { n: 'Slam Dunk', g: 'Deporte', t: 'BASQUET', d: 'El clásico que salvó el manga de deportes. Shohoku!.' },
    { n: 'Ashita no Joe', g: 'Deporte', t: 'BOXEO', d: 'El boxeador que inspiró a la generación. El final es leyenda.' },
    { n: 'Hajime no Ippo', g: 'Deporte', t: 'BOXEO', d: 'Ippo y su camino al título. Emocionante hasta el cansancio.' },
    { n: 'Ping Pong the Animation', g: 'Deporte', t: 'DRAMA', d: 'Ping pong con la animación más rara y brillante. Obra de Yuasa.' },
    { n: 'Run with the Wind', g: 'Deporte', t: 'TRAILER', d: 'Un equipo de cross-country que no sabe correr. Emoción pura.' },
    { n: 'Initial D', g: 'Deporte', t: 'DRIFT', d: 'Tofu, Takumi y el AE86. Eurobeat en las venas.' },
    { n: 'Chihayafuru', g: 'Deporte', t: 'KARUTA', d: 'Un deporte de cartas japonesas y te atrapa. No jodas.' },

    // ── Nuevos 2026 ──
    { n: 'One Piece', g: 'Shonen', t: 'EPOCA', d: 'Luffy y su tripulación buscan el One Piece. 1000+ caps de aventura pura.' },
    { n: 'Blue Lock', g: 'Deporte', t: 'FUTBOL', d: '300 delanteros encerrados para crear al egoísta definitivo. Frenesí puro.' },
    { n: 'Marvel (MCU)', g: 'Superhéroe', t: 'UNIVERSO', d: 'Iron Man a Endgame. La saga que cambió el cine. CivWar > todo.' },
    { n: 'Naruto Shippuden', g: 'Shonen', t: 'NINJA', d: 'Naruto vs Sasuke, la guerra ninja. El clásico que definió una generación.' },
    { n: 'Dragon Ball Z', g: 'Shonen', t: 'CLASICO', d: 'Freezer, Cell, Majin Buu. La obra que inventó el shonen moderno.' },
    { n: 'Attack on Titan', g: 'Dark', t: 'EPOCA', d: 'Titanes devorando humanos. El plot twist más brutal del anime.' },
    { n: 'Demon Slayer', g: 'Acción', t: 'TOHO', d: 'Tanjiro y Nezuko contra los demonios. Animación de Ufotable que te deja sin aliento.' },
    { n: 'Hunter x Hunter', g: 'Aventura', t: 'ESTRATEGIA', d: 'Gon, Killua, la Arena y la Raider de la Araña. Togashi en su pico.' },
    { n: 'Jujutsu Kaisen', g: 'Acción', t: 'DARK', d: 'Gojo es el más fuerte. Yuji y los maldiciones. MAPPA en estado puro.' },
    { n: 'My Hero Academia', g: 'Shonen', t: 'SUPERHEROES', d: 'Deku sin poder nace con uno. All Might, la mentoría definitiva.' },
];

// ===== RENDERIZADO =====
function renderDistros(filter) {
    const grid = document.getElementById('linux-grid');
    if (!grid) return;
    const q = (filter || '').toLowerCase();
    const list = window.DISTROS.filter(d => !q || d.n.toLowerCase().includes(q) || d.f.toLowerCase().includes(q) || (d.b || '').toLowerCase().includes(q));
    if (list.length === 0) {
        grid.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:30px;"><p style="font-size:13px; color:var(--text-muted);">Sin distros con ese filtro, crack.</p></div>';
        return;
    }
    grid.innerHTML = list.map(d => `
        <div class="card" style="text-align:left;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                <i class="fa-solid ${d.i}" style="color:${d.c}; font-size:20px;"></i>
                <div class="text" style="font-size:13px;">${esc(d.n)}</div>
            </div>
            <span style="background:rgba(0,212,255,0.1); color:var(--primary); font-size:9px; padding:2px 8px; border-radius:10px; margin-right:4px; display:inline-block;">${esc(d.f)}</span>
            <span style="background:rgba(0,255,170,0.1); color:var(--secondary); font-size:9px; padding:2px 8px; border-radius:10px; display:inline-block;">Base: ${esc(d.b)}</span>
            <p style="font-size:11px; margin:8px 0 4px; color:var(--secondary);"><b>Ventajas</b></p>
            ${d.p.map(p => `<p style="font-size:10px; color:#9fb4c7; margin:2px 0;">+ ${esc(p)}</p>`).join('')}
            <p style="font-size:11px; margin:6px 0 4px; color:var(--danger);"><b>Desventajas</b></p>
            ${d.cj.map(c => `<p style="font-size:10px; color:#9fb4c7; margin:2px 0;">− ${esc(c)}</p>`).join('')}
            <div style="margin-top:8px; padding:8px; background:rgba(3,9,20,0.6); border-radius:6px; font-size:10px;">
                <p style="color:var(--primary); margin:2px 0;">⚙ <b>Mínimos:</b> <span style="color:#9fb4c7;">${esc(d.mn)}</span></p>
                <p style="color:var(--secondary); margin:2px 0;">🚀 <b>Recomendados:</b> <span style="color:#9fb4c7;">${esc(d.mr)}</span></p>
            </div>
            ${d.u ? `<p style="margin-top:8px;"><a href="${esc(d.u)}" target="_blank" style="color:var(--primary); font-weight:700; font-size:11px;">${esc(d.u.replace(/^https?:\/\/(www\.)?/,''))}</a></p>` : ''}
        </div>`).join('');
    const total = document.getElementById('linux-count');
    if (total) total.innerText = list.length + ' / ' + window.DISTROS.length + ' distros';
}

function renderAnimes(filter) {
    const grid = document.getElementById('anime-grid');
    if (!grid) return;
    const q = (filter || '').toLowerCase();
    const list = window.ANIMES.filter(a => !q || a.n.toLowerCase().includes(q) || a.g.toLowerCase().includes(q) || a.t.toLowerCase().includes(q));
    if (list.length === 0) {
        grid.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:30px;"><p style="font-size:13px; color:var(--text-muted);">Nada con ese filtro. Buscá mejor.</p></div>';
        return;
    }
    grid.innerHTML = list.map(a => `
        <div class="card">
            <div class="text" style="font-size:13px;">${esc(a.n)}</div>
            <span style="background:rgba(0,212,255,0.1); color:var(--primary); font-size:9px; padding:2px 8px; border-radius:10px;">${esc(a.g)}</span>
            <span style="background:rgba(255,215,0,0.1); color:var(--gold); font-size:9px; padding:2px 8px; border-radius:10px; margin-left:4px;">${esc(a.t)}</span>
            <p style="font-size:11px; margin-top:8px;">${esc(a.d)}</p>
        </div>`).join('');
    const total = document.getElementById('anime-count');
    if (total) total.innerText = list.length + ' / ' + window.ANIMES.length + ' animes';
}
