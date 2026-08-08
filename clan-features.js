/* Clan Custom Features: Greek Olimpo Ranks, Frieren Senda, JJK Characters */

// ═══════════════════════════ RANGOS OLIMPO ═══════════════════════════
const MYTH_RANKS_M = [
    { key:'mortal_m',  label:'Mortal',    icon:'fa-solid fa-sword',  color:'#6688aa', price:0,           price_usd:0,    gradeTier:0, cls:'rank-mortal',   mult:1    },
    { key:'jason',     label:'Jasón',     icon:'fa-solid fa-anchor',   color:'#4da6ff', price:100000,       price_usd:0,    gradeTier:0, cls:'rank-jason',    mult:1    },
    { key:'heracles',  label:'Heracles',  icon:'fa-solid fa-paw',  color:'#ff8c00', price:200000,       price_usd:0,    gradeTier:0, cls:'rank-heracles', mult:1    },
    { key:'teseo',     label:'Teseo',     icon:'fa-solid fa-landmark',  color:'#a78bfa', price:350000,       price_usd:0,    gradeTier:0, cls:'rank-teseo',    mult:1    },
    { key:'semidios',  label:'Semidiós',  icon:'fa-solid fa-dumbbell',  color:'#00ff9d', price:500000,       price_usd:0,    gradeTier:0, cls:'rank-semidios', mult:1    },
    { key:'dionisio',  label:'Dionisio',  icon:'fa-solid fa-wine-glass',  color:'#d946ef', price:700000,       price_usd:0,    gradeTier:0, cls:'rank-dionisio', mult:1    },
    { key:'hefesto',   label:'Hefesto',   icon:'fa-solid fa-hammer',  color:'#f97316', price:900000,       price_usd:0,    gradeTier:0, cls:'rank-hefesto',  mult:1    },
    { key:'hermes_m',  label:'Hermes',    icon:'fa-solid fa-feather',  color:'#67e8f9', price:1200000,      price_usd:150,  gradeTier:1, cls:'rank-hermes',   mult:1    },
    { key:'ares',      label:'Ares',      icon:'fa-solid fa-shield-halved',  color:'#ff4466', price:1500000,      price_usd:250,  gradeTier:1, cls:'rank-ares',     mult:1    },
    { key:'apolo',     label:'Apolo',     icon:'fa-solid fa-sun',  color:'#ffaa00', price:2000000,      price_usd:100,  gradeTier:1, cls:'rank-apolo',    mult:1.2  },
    { key:'poseidon',  label:'Poseidón',  icon:'fa-solid fa-trident',  color:'#00d4ff', price:4000000,      price_usd:400,  gradeTier:2, cls:'rank-poseidon', mult:1.5  },
    { key:'hades',     label:'Hades',     icon:'fa-solid fa-skull',  color:'#9d4edd', price:7000000,      price_usd:600,  gradeTier:2, cls:'rank-hades',    mult:1.75 },
    { key:'zeus',      label:'Zeus',      icon:'fa-solid fa-bolt',  color:'#ffd700', price:10000000,     price_usd:1200, gradeTier:3, cls:'rank-zeus',     mult:2    },
    { key:'orfeo',     label:'Orfeo',     icon:'fa-solid fa-music',  color:'#c084fc', price:15000000,     price_usd:0,    gradeTier:0, cls:'rank-orfeo',    mult:2.5  },
    { key:'cronos',    label:'Cronos',    icon:'fa-solid fa-hourglass-half',  color:'#fb923c', price:25000000,     price_usd:0,    gradeTier:0, cls:'rank-cronos',   mult:2.75 },
    { key:'urano',     label:'Urano',     icon:'fa-solid fa-globe',  color:'#38bdf8', price:50000000,     price_usd:0,    gradeTier:0, cls:'rank-urano',    mult:3    },
];

const MYTH_RANKS_F = [
    { key:'mortal_f',  label:'Mortal',    icon:'fa-solid fa-seedling',  color:'#6688aa', price:0,            price_usd:0,    gradeTier:0, cls:'rank-mortal',   mult:1    },
    { key:'medusa',    label:'Medusa',    icon:'fa-solid fa-droplet',  color:'#6688aa', price:0,            price_usd:0,    gradeTier:0, cls:'rank-medusa',   mult:1    },
    { key:'ninfa',     icon:'fa-solid fa-water',  label:'Ninfa',      color:'#00ff9d', price:50000,         price_usd:0,    gradeTier:0, cls:'rank-ninfa',    mult:1    },
    { key:'calipso',   icon:'fa-solid fa-umbrella-beach',  label:'Calipso',   color:'#4ade80', price:100000,       price_usd:0,    gradeTier:0, cls:'rank-calipso',  mult:1    },
    { key:'circe',     icon:'fa-solid fa-wand-sparkles',  label:'Circe',     color:'#a78bfa', price:200000,       price_usd:0,    gradeTier:0, cls:'rank-circe',    mult:1    },
    { key:'andromeda', icon:'fa-solid fa-link',  label:'Andrómeda', color:'#93c5fd', price:350000,       price_usd:0,    gradeTier:0, cls:'rank-andromeda',mult:1    },
    { key:'euridice',  icon:'fa-solid fa-spa',  label:'Eurídice',  color:'#f9a8d4', price:500000,       price_usd:0,    gradeTier:0, cls:'rank-euridice', mult:1    },
    { key:'hera',      icon:'fa-solid fa-rainbow',  label:'Hera',      color:'#ff69b4', price:700000,       price_usd:0,    gradeTier:0, cls:'rank-hera',     mult:1    },
    { key:'demeter',   icon:'fa-solid fa-wheat-awn',  label:'Deméter',   color:'#86efac', price:1200000,      price_usd:0,    gradeTier:0, cls:'rank-demeter',  mult:1    },
    { key:'persefone', icon:'fa-solid fa-crown',  label:'Perséfone', color:'#c084fc', price:2000000,      price_usd:100,  gradeTier:1, cls:'rank-persefone',mult:1.2  },
    { key:'artemisa',  icon:'fa-solid fa-moon',  label:'Artemisa',  color:'#c0c0c0', price:4000000,      price_usd:150,  gradeTier:1, cls:'rank-artemisa', mult:1.5  },
    { key:'atenea',    icon:'fa-solid fa-scroll',  label:'Atenea',    color:'#00d4ff', price:7000000,      price_usd:250,  gradeTier:2, cls:'rank-atenea',   mult:1.75 },
    { key:'afrodita',  icon:'fa-solid fa-heart',  label:'Afrodita',  color:'#ff1493', price:10000000,     price_usd:400,  gradeTier:2, cls:'rank-afrodita', mult:2    },
    { key:'hecate',    icon:'fa-solid fa-cloud-moon',  label:'Hécate',    color:'#818cf8', price:15000000,     price_usd:600,  gradeTier:2, cls:'rank-hecate',   mult:2.5  },
    { key:'gea',       icon:'fa-solid fa-earth-americas',  label:'Gea',       color:'#4ade80', price:25000000,     price_usd:800,  gradeTier:3, cls:'rank-gea',      mult:2.75 },
    { key:'nix',       icon:'fa-solid fa-sparkles',  label:'Nix',       color:'#e879f9', price:50000000,     price_usd:1200, gradeTier:3, cls:'rank-nix',      mult:3    },
];

const ALL_MYTH_RANKS = {};
[...MYTH_RANKS_M, ...MYTH_RANKS_F].forEach(r => { ALL_MYTH_RANKS[r.key] = r; });

const RANKS = {
    owner:    { label:'OWNER DEV',  icon:'fa-solid fa-crown', color:'#d946ef', level:20, cls:'rank-owner'    },
    admin:    { label:'ADMIN',      icon:'fa-solid fa-trident', color:'#ffd700', level:19, cls:'rank-admin'    },
    mod:      { label:'MOD',        icon:'fa-solid fa-shield',  color:'#00dcff', level:18, cls:'rank-mod'      },
    helper:   { label:'HELPER',     icon:'fa-solid fa-wrench', color:'#00ff9d', level:17, cls:'rank-helper'   },
    pareja_emilio: { label:'Novia de Emilio', icon:'fa-solid fa-ring', color:'#ff1493', level:17, cls:'rank-afrodita'},
    pareja_oficial:{ label:'Pareja Oficial',  icon:'fa-solid fa-ring', color:'#ff69b4', level:16, cls:'rank-hera'    },
    frieren_fern:  { label:'Aprendiz de Magia', icon:'fa-solid fa-bug', color:'#d8b4e2', level:13, cls:'rank-orfeo' },
    frieren_stark: { label:'Guerrero Heroico',  icon:'fa-solid fa-axe', color:'#ff5555', level:14, cls:'rank-ares' },
    frieren_frieren:{label:'Maga de Primera Clase',icon:'fa-solid fa-hat-wizard',color:'#bce6ff',level:16,cls:'rank-atenea' },
    frieren_himmel:{ label:'Héroe de Leyenda',  icon:'fa-solid fa-sword', color:'#50c878', level:18, cls:'rank-titanes' },
    urano:    { label:'Urano',      icon:'fa-solid fa-globe', color:'#38bdf8', level:16, cls:'rank-urano'    },
    nix:      { label:'Nix',        icon:'fa-solid fa-sparkles', color:'#e879f9', level:16, cls:'rank-nix'      },
    cronos:   { label:'Cronos',     icon:'fa-solid fa-hourglass-half', color:'#fb923c', level:15, cls:'rank-cronos'   },
    gea:      { label:'Gea',        icon:'fa-solid fa-earth-americas', color:'#4ade80', level:15, cls:'rank-gea'      },
    orfeo:    { label:'Orfeo',      icon:'fa-solid fa-music', color:'#c084fc', level:14, cls:'rank-orfeo'    },
    hecate:   { label:'Hécate',     icon:'fa-solid fa-cloud-moon', color:'#818cf8', level:14, cls:'rank-hecate'   },
    zeus:     { label:'Zeus',       icon:'fa-solid fa-bolt', color:'#ffd700', level:13, cls:'rank-zeus'     },
    afrodita: { label:'Afrodita',   icon:'fa-solid fa-heart', color:'#ff1493', level:13, cls:'rank-afrodita' },
    hades:    { label:'Hades',      icon:'fa-solid fa-skull', color:'#9d4edd', level:12, cls:'rank-hades'    },
    atenea:   { label:'Atenea',     icon:'fa-solid fa-scroll', color:'#00d4ff', level:12, cls:'rank-atenea'   },
    poseidon: { label:'Poseidón',   icon:'fa-solid fa-trident', color:'#00d4ff', level:11, cls:'rank-poseidon' },
    artemisa: { label:'Artemisa',   icon:'fa-solid fa-moon', color:'#c0c0c0', level:11, cls:'rank-artemisa' },
    apolo:    { label:'Apolo',      icon:'fa-solid fa-sun', color:'#ffaa00', level:10, cls:'rank-apolo'    },
    persefone:{ label:'Perséfone',  icon:'fa-solid fa-crown', color:'#c084fc', level:10, cls:'rank-persefone'},
    ares:     { label:'Ares',       icon:'fa-solid fa-shield-halved', color:'#ff4466', level:9,  cls:'rank-ares'     },
    demeter:  { label:'Deméter',    icon:'fa-solid fa-wheat-awn', color:'#86efac', level:9,  cls:'rank-demeter'  },
    hermes_m: { label:'Hermes',     icon:'fa-solid fa-feather', color:'#67e8f9', level:8,  cls:'rank-hermes'   },
    hera:     { label:'Hera',       icon:'fa-solid fa-rainbow', color:'#ff69b4', level:8,  cls:'rank-hera'     },
    hefesto:  { label:'Hefesto',    icon:'fa-solid fa-hammer', color:'#f97316', level:7,  cls:'rank-hefesto'  },
    euridice: { label:'Eurídice',   icon:'fa-solid fa-spa', color:'#f9a8d4', level:7,  cls:'rank-euridice' },
    dionisio: { label:'Dionisio',   icon:'fa-solid fa-wine-glass', color:'#d946ef', level:6,  cls:'rank-dionisio' },
    andromeda:{ label:'Andrómeda',  icon:'fa-solid fa-link', color:'#93c5fd', level:6,  cls:'rank-andromeda'},
    semidios: { label:'Semidiós',   icon:'fa-solid fa-dumbbell', color:'#00ff9d', level:5,  cls:'rank-semidios' },
    circe:    { label:'Circe',      icon:'fa-solid fa-wand-sparkles', color:'#a78bfa', level:5,  cls:'rank-circe'    },
    teseo:    { label:'Teseo',      icon:'fa-solid fa-landmark', color:'#a78bfa', level:4,  cls:'rank-teseo'    },
    calipso:  { label:'Calipso',    icon:'fa-solid fa-umbrella-beach', color:'#4ade80', level:4,  cls:'rank-calipso'  },
    heracles: { label:'Heracles',   icon:'fa-solid fa-paw', color:'#ff8c00', level:3,  cls:'rank-heracles' },
    ninfa:    { label:'Ninfa',      icon:'fa-solid fa-water', color:'#00ff9d', level:3,  cls:'rank-ninfa'    },
    jason:    { label:'Jasón',      icon:'fa-solid fa-anchor', color:'#4da6ff', level:2,  cls:'rank-jason'    },
    medusa:   { label:'Medusa',     icon:'fa-solid fa-droplet', color:'#6b7280', level:1,  cls:'rank-medusa'   },
    mortal_m: { label:'Mortal',     icon:'fa-solid fa-sword', color:'#6688aa', level:1,  cls:'rank-mortal'   },
    mortal_f: { label:'Mortal',     icon:'fa-solid fa-seedling', color:'#6688aa', level:1,  cls:'rank-mortal'   },
    user:     { label:'Mortal',     icon:'fa-solid fa-sword', color:'#6688aa', level:1,  cls:'rank-mortal'   },
    mrbeast:  { label:'Mr Beast',   icon:'fa-solid fa-cat', color:'#00cfff', level:16, cls:'rank-mrbeast'  },
    ben10_heatblast:   { label:'Heatblast',     icon:'fa-solid fa-fire', color:'#ff7b3d', level:12, cls:'rank-ben10' },
    ben10_wildmutt:    { label:'Wildmutt',      icon:'fa-solid fa-paw', color:'#d4a017', level:12, cls:'rank-ben10' },
    ben10_greymatter:  { label:'Grey Matter',   icon:'fa-solid fa-brain', color:'#5eead4', level:12, cls:'rank-ben10' },
    ben10_diamondhead: { label:'Diamondhead',   icon:'fa-solid fa-gem', color:'#4dd6ff', level:13, cls:'rank-ben10' },
    ben10_rippjaws:    { label:'Ripjaws',       icon:'fa-solid fa-fish-fins', color:'#2dd4bf', level:13, cls:'rank-ben10' },
    ben10_xlr8:        { label:'XLR8',          icon:'fa-solid fa-bolt', color:'#7b68ee', level:13, cls:'rank-ben10' },
    ben10_stinkfly:    { label:'Stinkfly',      icon:'fa-solid fa-bug', color:'#4ade80', level:13, cls:'rank-ben10' },
    ben10_fourarms:    { label:'Four Arms',     icon:'fa-solid fa-dumbbell', color:'#ff4d4d', level:14, cls:'rank-ben10' },
    ben10_upgrade:     { label:'Upgrade',       icon:'fa-solid fa-robot', color:'#22c55e', level:14, cls:'rank-ben10' },
    ben10_ghostfreak:  { label:'Ghostfreak',    icon:'fa-solid fa-ghost', color:'#a56eff', level:14, cls:'rank-ben10' },
    ben10_cannonbolt:  { label:'Cannonbolt',    icon:'fa-solid fa-bowling-ball', color:'#fbbf24', level:15, cls:'rank-ben10' },
    ben10_waybig:      { label:'Way Big',       icon:'fa-solid fa-meteor', color:'#ff6b81', level:15, cls:'rank-ben10' },
    ben10_swampfire:   { label:'Swampfire',     icon:'fa-solid fa-seedling', color:'#86efac', level:15, cls:'rank-ben10' },
    ben10_humungousaur:{ label:'Humungousaur',  icon:'fa-solid fa-dragon', color:'#4ade80', level:16, cls:'rank-ben10' },
    ben10_alienx:      { label:'Alien X',       icon:'fa-solid fa-star', color:'#b0c4de', level:16, cls:'rank-ben10' },
    mha_uraraka:   { label:'Uraraka',       icon:'fa-solid fa-star', color:'#ff69b4', level:12, cls:'rank-mha' },
    mha_iida:      { label:'Iida',          icon:'fa-solid fa-gauge-high', color:'#4ade80', level:12, cls:'rank-mha' },
    mha_todoroki:  { label:'Todoroki',      icon:'fa-solid fa-snowflake', color:'#60a5fa', level:13, cls:'rank-mha' },
    mha_bakugo:    { label:'Bakugo',        icon:'fa-solid fa-fire', color:'#fb923c', level:13, cls:'rank-mha' },
    mha_deku:      { label:'Deku',          icon:'fa-solid fa-bolt', color:'#22c55e', level:14, cls:'rank-mha' },
    mha_aizawa:    { label:'Eraser Head',   icon:'fa-solid fa-eye', color:'#6b7280', level:14, cls:'rank-mha' },
    mha_endevor:   { label:'Endeavor',      icon:'fa-solid fa-flame', color:'#ff6b3d', level:15, cls:'rank-mha' },
    mha_allmight:  { label:'All Might',     icon:'fa-solid fa-dove', color:'#ffd700', level:15, cls:'rank-mha' },
    mha_shigaraki: { label:'Shigaraki',     icon:'fa-solid fa-hand', color:'#9d4edd', level:16, cls:'rank-mha' },
    mha_allforone: { label:'All For One',   icon:'fa-solid fa-skull', color:'#4a1d96', level:17, cls:'rank-mha' },
    godzilla_54:      { label:'Gojira 1954',      icon:'fa-solid fa-radiation', color:'#86efac', level:12, cls:'rank-godzilla' },
    godzilla_showa:   { label:'Godzilla Showa',   icon:'fa-solid fa-wave-square', color:'#4ade80', level:12, cls:'rank-godzilla' },
    godzilla_84:      { label:'Godzilla 1984',    icon:'fa-solid fa-volcano', color:'#60a5fa', level:13, cls:'rank-godzilla' },
    godzilla_burning: { label:'Burning Godzilla', icon:'fa-solid fa-fire-flame-curved', color:'#ffb347', level:13, cls:'rank-godzilla' },
    godzilla_2000:    { label:'Godzilla 2000',    icon:'fa-solid fa-arrow-trend-up', color:'#fbbf24', level:14, cls:'rank-godzilla' },
    godzilla_fw:      { label:'Final Wars',       icon:'fa-solid fa-crosshairs', color:'#fb923c', level:14, cls:'rank-godzilla' },
    godzilla_2014:    { label:'Godzilla Legendary', icon:'fa-solid fa-mountain', color:'#38bdf8', level:15, cls:'rank-godzilla' },
    godzilla_shin:    { label:'Shin Godzilla',    icon:'fa-solid fa-dna', color:'#e879f9', level:15, cls:'rank-godzilla' },
    godzilla_kotm:    { label:'King of Monsters', icon:'fa-solid fa-crown', color:'#ff4466', level:16, cls:'rank-godzilla' },
    godzilla_gvk:     { label:'Godzilla vs Kong', icon:'fa-solid fa-hand-fist', color:'#a78bfa', level:16, cls:'rank-godzilla' },
    godzilla_minus1:  { label:'Godzilla Minus One', icon:'fa-solid fa-skull', color:'#9d4edd', level:17, cls:'rank-godzilla' },
    godzilla_earth:   { label:'Godzilla Earth',   icon:'fa-solid fa-earth-americas', color:'#22c55e', level:17, cls:'rank-godzilla' },
};

const RANK_MULTIPLIERS = {
    mortal_m:1, jason:1, heracles:1, teseo:1, semidios:1, dionisio:1, hefesto:1, hermes_m:1, ares:1,
    apolo:1.2, poseidon:1.5, hades:1.75, zeus:2, orfeo:2.5, cronos:2.75, urano:3, mrbeast:10,
    mortal_f:1, medusa:1, ninfa:1, calipso:1, circe:1, andromeda:1, euridice:1, hera:1, demeter:1,
    persefone:1.2, artemisa:1.5, atenea:1.75, afrodita:2, hecate:2.5, gea:2.75, nix:3
};

const RANK_LOAN_MAX = {
    mortal_m:5000, jason:5000, heracles:7000, teseo:8000, semidios:10000, dionisio:12000, hefesto:14000, hermes_m:16000, ares:18000,
    apolo:25000, poseidon:40000, hades:60000, zeus:100000, orfeo:150000, cronos:250000, urano:500000,
    mortal_f:5000, medusa:5000, ninfa:5000, calipso:7000, circe:8000, andromeda:10000, euridice:12000, hera:14000, demeter:18000,
    persefone:25000, artemisa:40000, atenea:60000, afrodita:100000, hecate:150000, gea:250000, nix:500000,
    owner:999999, admin:500000, mod:50000, helper:20000, mrbeast:500000
};

// ═══════════════════════════ SENDA FRIEREN ═══════════════════════════
const FRIEREN_RANKS = [
    { key:'frieren_fern', label:'Aprendiz de Magia (Fern)', icon:'fa-solid fa-wand-magic', price:1000000, price_usd:50, gradeTier:1, mult:1.5, img:'frieren_fern_img.jpg' },
    { key:'frieren_stark', label:'Guerrero Heroico (Stark)', icon:'fa-solid fa-axe', price:3500000, price_usd:150, gradeTier:1, mult:2, img:'frieren_stark_img.jpg' },
    { key:'frieren_frieren', label:'Maga de Primera Clase (Frieren)', icon:'fa-solid fa-hat-wizard', price:15000000, price_usd:500, gradeTier:2, mult:3, img:'frieren_frieren_img.jpg' },
    { key:'frieren_himmel', label:'Héroe de Leyenda (Himmel)', icon:'fa-solid fa-sword', price:50000000, price_usd:1700, gradeTier:3, mult:5, img:'frieren_himmel_img.jpg' }
];

const FRIEREN_RELICS = [
    { id:'varita_frieren', name:'Varita de Frieren', icon:'fa-solid fa-wand-magic-sparkles', price:1000000, desc:'Reliquia coleccionable legendaria' },
    { id:'grimorio_flamme', name:'Grimorio de Flamme', icon:'fa-solid fa-book-bible', price:5000000, desc:'Poder arcano antiguo' },
    { id:'hacha_stark', name:'Hacha de Stark', icon:'fa-solid fa-axe-battle', price:3000000, desc:'Arma del guerrero cobarde-valiente' },
    { id:'anillo_loto', name:'Anillo de Loto Espejado', icon:'fa-solid fa-ring', price:10000000, desc:'El regalo de Himmel a Frieren' }
];

// ═══════════════════════════ JUJUTSU KAISEN ═══════════════════════════
const JJK_RANKS = [
    { key:'itadori', label:'Itadori Yuji', icon:'fa-solid fa-hand-fist', color:'#ff6b9d', cls:'rank-itadori', price:5000000, price_usd:200, grade:'Semi-Grade 1', gradeTier:1, mult:1.2, desc:'Portador de Ryomen Sukuna. Fuerza física sobrehumana y energía maldita explosiva.' },
    { key:'nobara', label:'Kugisaki Nobara', icon:'fa-solid fa-hammer', color:'#fb923c', cls:'rank-nobara', price:5000000, price_usd:200, grade:'Semi-Grade 1', gradeTier:1, mult:1.2, desc:'Indestructible y sin miedo. Martillo, clavos y paja maldita.' },
    { key:'megumi', label:'Fushiguro Megumi', icon:'fa-solid fa-paw', color:'#60a5fa', cls:'rank-megumi', price:10000000, price_usd:350, grade:'Grade 1', gradeTier:2, mult:1.5, desc:'Usuario de las Diez Sombras. Estratega frío del clan Zenin.' },
    { key:'maki', label:'Maki Zenin', icon:'fa-solid fa-shield-halved', color:'#4ade80', cls:'rank-maki', price:8000000, price_usd:300, grade:'Grade 1', gradeTier:2, mult:1.4, desc:'Sin energía maldita pero destreza física incomparable.' },
    { key:'todo', label:'Aoi Todo', icon:'fa-solid fa-child-combatant', color:'#fbbf24', cls:'rank-todo', price:12000000, price_usd:400, grade:'Grade 1', gradeTier:2, mult:1.6, desc:'¿Qué tipo de mujeres te gustan? Intercambia posiciones con un aplauso.' },
    { key:'nanami', label:'Kento Nanami', icon:'fa-solid fa-briefcase', color:'#fde68a', cls:'rank-nanami', price:15000000, price_usd:500, grade:'Grade 1', gradeTier:2, mult:1.7, desc:'Ratio 7:3. El más estable y profesional. Fuera del horario de oficina no trabaja.' },
    { key:'meimei', label:'Mei Mei', icon:'fa-solid fa-coins', color:'#e9c46a', cls:'rank-meimei', price:18000000, price_usd:600, grade:'Grade 1', gradeTier:2, mult:1.8, desc:'Solo trabaja por dinero. Hechicera premium del clan.' },
    { key:'shoko', label:'Shoko Ieiri', icon:'fa-solid fa-briefcase-medical', color:'#2dd4bf', cls:'rank-shoko', price:12000000, price_usd:400, grade:'Grade 1', gradeTier:2, mult:1.5, desc:'La única médica que domina la técnica maldita inversa de curación.' },
    { key:'yuki', label:'Yuki Tsukumo', icon:'fa-solid fa-star', color:'#a78bfa', cls:'rank-yuki', price:25000000, price_usd:850, grade:'Special Grade', gradeTier:3, mult:2.0, desc:'Star Rage desata masa estelar. Su poder supera cualquier maldición.' },
    { key:'yuta', label:'Yuta Okkotsu', icon:'fa-solid fa-ring', color:'#c084fc', cls:'rank-yuta', price:35000000, price_usd:1200, grade:'Special Grade', gradeTier:3, mult:2.5, desc:'Posee reservas ilimitadas de energía maldita y el espíritu de Rika.' },
    { key:'rika', label:'Rika Orimoto', icon:'fa-solid fa-ghost', color:'#f472b6', cls:'rank-rika', price:50000000, price_usd:1700, grade:'Special Grade', gradeTier:3, mult:3.0, desc:'La Reina de las Maldiciones. Su amor posesivo es destrucción pura.' },
    { key:'sukuna', label:'Ryomen Sukuna', icon:'fa-solid fa-fire', color:'#f87171', cls:'rank-sukuna', price:75000000, price_usd:2500, grade:'Special Grade Apex', gradeTier:4, mult:4.0, desc:'El Rey de las Maldiciones. Malevolent Shrine. El poder absoluto que domina la oscuridad.' },
    { key:'gojo', label:'Satoru Gojo', icon:'fa-solid fa-eye', color:'#00d4ff', cls:'rank-gojo', price:100000000, price_usd:3300, grade:'Special Grade Apex', gradeTier:4, mult:5.0, desc:'El hechicero más fuerte. Ojos de Seis Ojos e Infinito. Intocable y supremo.' }
];

const JJK_MARKET_ITEMS = [
    { id:'jjk_hechicero_badge', name:'Badge Hechicero JJK', icon:'fa-solid fa-bolt', price:2500, desc:'Badge exclusivo JJK que brilla con energía maldita.', requiresJJK:false },
    { id:'domain_shield', name:'Domain Expansion Shield', icon:'fa-solid fa-square', price:6000, desc:'Protege tu cuenta por 72 horas contra congelaciones.', requiresJJK:false },
    { id:'hollow_purple_boost', name:'Hollow Purple Boost', icon:'fa-solid fa-circle', price:3500, desc:'Tus próximas 5 transferencias son sin comisión.', requiresJJK:false },
    { id:'sukuna_finger_item', name:'Dedo de Sukuna', icon:'fa-solid fa-hand', price:15000, desc:'Entrega 8000 PPC al instante y otorga un badge maldito permanente.', requiresJJK:true, requiresGrade:1 },
    { id:'six_eyes_item', name:'Ojos de Seis Ojos', icon:'fa-solid fa-eye', price:9000, desc:'Revela las estadísticas completas de cualquier usuario por 24 horas.', requiresJJK:false },
    { id:'reverse_cursed_item', name:'Técnica Invertida', icon:'fa-solid fa-heart-pulse', price:4500, desc:'Recupera el 60% de tu última pérdida en minijuegos.', requiresJJK:true, requiresGrade:2 },
    { id:'black_flash', name:'Black Flash', icon:'fa-solid fa-wand-magic-sparkles', price:5000, desc:'Multiplica por 1.8x tu próxima ganancia en minijuegos. Un solo uso.', requiresJJK:false },
    { id:'curtain_item', name:'Cortina Maldita', icon:'fa-solid fa-mask', price:2000, desc:'Oculta tu saldo del leaderboard por 48 horas.', requiresJJK:false },
];

const JJK_PRIVILEGES = [
    { id:'daily_bonus', icon:'fa-solid fa-calendar-day', title:'BONO DIARIO JJK', desc:'Aumenta tus recompensas diarias según el grado de tu rango JJK.' },
    { id:'zero_fee', icon:'fa-solid fa-percent', title:'CERO COMISIÓN', desc:'Todas tus transferencias son sin comisión (Grade 1+).' },
    { id:'cursed_fund', icon:'fa-solid fa-droplet', title:'FONDO MALDICIÓN ETERNA', desc:'Acceso al fondo de inversión exclusivo JJK con +30% en 14 días.' },
    { id:'special_fund', icon:'fa-solid fa-infinity', title:'INFINITO DE GOJO', desc:'Acceso al fondo más poderoso del banco (+100% en 30 días - Solo Gojo).' },
    { id:'invest_bonus', icon:'fa-solid fa-chart-line', title:'RETORNO ADICIONAL', desc:'Multiplicador extra en inversiones JJK según tu grado.' },
    { id:'loan_bonus', icon:'fa-solid fa-building-columns', title:'LÍMITE PRÉSTAMO AMPLIADO', desc:'Tu límite máximo de préstamo se incrementa según tu grado JJK.' },
];

const JJK_ACHIEVEMENTS = [
    { id:'first_jjk', icon:'fa-solid fa-droplet', name:'Primera Maldición', desc:'Compra tu primer rango JJK.', reward:500 },
    { id:'grade1_jjk', icon:'fa-solid fa-shield-halved', name:'Hechicero Grade 1', desc:'Alcanza el grado Grade 1 en JJK.', reward:2000 },
    { id:'special_grade', icon:'fa-solid fa-crown', name:'Grado Especial', desc:'Alcanza Special Grade en JJK.', reward:10000 },
    { id:'apex_grade', icon:'fa-solid fa-fire', name:'Apex — Rey/Reina Maldita', desc:'Obtén Sukuna o Gojo.', reward:50000 },
    { id:'gojo_rank', icon:'fa-solid fa-circle', name:'El Más Fuerte', desc:'Obtén el rango Satoru Gojo.', reward:100000 },
];

// Registries
const _jjkRankRegistry = {};
JJK_RANKS.forEach(r => { _jjkRankRegistry[r.key] = r; });

const _jjkItemRegistry = {};
JJK_MARKET_ITEMS.forEach(i => { _jjkItemRegistry[i.id] = i; });

// ═══════════════════════════ LOGICA DE RANGOS Y MULTIPLICADORES ═══════════════════════════

function getRankKey(user) {
    if (!user) return 'user';
    if (user.nick === 'emilio' || user.nick === 'solariswat' || user.nick === 'insanlj5') return 'owner';
    if (user.rank && RANKS[user.rank]) return user.rank;
    if (user.admin) return 'admin';
    const best = ['ben10Rank', 'ben10rank', 'mhaRank', 'mharank', 'godzillaRank', 'godzillarank', 'frierenRank', 'frierenrank', 'nanatsuRank', 'nanatsurank', 'jjkRank', 'jjkrank']
        .map(f => user[f])
        .filter(k => k && RANKS[k])
        .sort((a, b) => RANKS[b].level - RANKS[a].level)[0];
    if (best) return best;
    return (user.gender === 'f') ? 'mortal_f' : 'mortal_m';
}

function getRankMultiplier(user) {
    const key = getRankKey(user);
    let mult = RANK_MULTIPLIERS[key] || 1;
    if (key.startsWith('pareja')) mult *= 4;

    // Add Frieren title multipliers (multiplicative)
    if (user && (user.frierenRank || user.frierenrank)) {
        const fRank = FRIEREN_RANKS.find(x => x.key === (user.frierenRank || user.frierenrank));
        if (fRank) mult *= fRank.mult;
    }

    const fandomMap = [
        { field: 'jjkRank',     low: 'jjkrank',      arr: JJK_RANKS, name: 'jjk', additive: true },
        { field: 'ben10Rank',   low: 'ben10rank',    arr: BEN10_RANKS, name: 'ben10' },
        { field: 'mhaRank',     low: 'mharank',      arr: MHA_RANKS, name: 'mha' },
        { field: 'godzillaRank',low: 'godzillarank', arr: GODZILLA_RANKS, name: 'godzilla' },
        { field: 'nanatsuRank', low: 'nanatsurank',  arr: typeof NANATSU_RANKS !== 'undefined' ? NANATSU_RANKS : [], name: 'nanatsu' },
        { field: 'berserkRank', low: 'berserkrank',  arr: typeof BERSERK_RANKS !== 'undefined' ? BERSERK_RANKS : [], name: 'berserk' },
        { field: 'chainsawRank',low: 'chainsawrank', arr: typeof CHAINSAW_RANKS !== 'undefined' ? CHAINSAW_RANKS : [], name: 'chainsaw' },
        { field: 'deathnoteRank', low: 'deathnoterank', arr: typeof DEATHNOTE_RANKS !== 'undefined' ? DEATHNOTE_RANKS : [], name: 'deathnote' },
        { field: 'elfenRank',   low: 'elfenrank',    arr: typeof ELFEN_RANKS !== 'undefined' ? ELFEN_RANKS : [], name: 'elfen' },
        { field: 'rezeroRank',  low: 'rerank',       arr: typeof REZERO_RANKS !== 'undefined' ? REZERO_RANKS : [], name: 'rezero' },
        { field: 'rimuruRank',  low: 'rimururank',   arr: typeof RIMURU_RANKS !== 'undefined' ? RIMURU_RANKS : [], name: 'rimuru' },
        { field: 'bocchiRank',  low: 'bocchirank',   arr: typeof BOCCHI_RANKS !== 'undefined' ? BOCCHI_RANKS : [], name: 'bocchi' },
        { field: 'vocaloidRank',low: 'vocaloidrank', arr: typeof VOCALOID_RANKS !== 'undefined' ? VOCALOID_RANKS : [], name: 'vocaloid' },
        { field: 'mushokuRank', low: 'mushokurank',  arr: typeof MUSHOKU_RANKS !== 'undefined' ? MUSHOKU_RANKS : [], name: 'mushoku' },
        { field: 'floresRank',  low: 'floresrank',   arr: typeof FLORES_RANKS !== 'undefined' ? FLORES_RANKS : [], name: 'flores' },
    ];

    const owned = new Set();
    for (const f of fandomMap) {
        const val = user && (user[f.field] || user[f.low]);
        if (val) {
            const found = f.arr.find(x => x.key === val);
            if (found) {
                owned.add(f.name + ':' + val);
                mult += f.additive ? found.mult : (found.mult - 1);
            }
        }
        if (user && user.boughtRanks && Array.isArray(user.boughtRanks) && f.arr.length) {
            for (const br of user.boughtRanks) {
                const found = f.arr.find(x => x.key === br);
                if (found && !owned.has(f.name + ':' + br)) {
                    owned.add(f.name + ':' + br);
                    mult += f.additive ? found.mult : (found.mult - 1);
                }
            }
        }
    }

    return mult;
}

function getRankLoanMax(user, bankConfig) {
    const key = getRankKey(user);
    let baseMax = RANK_LOAN_MAX[key] || (bankConfig ? bankConfig.loanMax : 10000);
    
    // JJK Loan Bonus
    if (user && (user.jjkRank || user.jjkrank)) {
        const jRank = JJK_RANKS.find(x => x.key === (user.jjkRank || user.jjkrank));
        if (jRank) {
            if (jRank.key === 'gojo' || jRank.key === 'sukuna') return 99999999;
            if (jRank.gradeTier === 1) baseMax *= 1.1;
            if (jRank.gradeTier === 2) baseMax *= 1.2;
            if (jRank.gradeTier === 3) baseMax *= 1.5;
        }
    }
    return Math.floor(baseMax);
}

function getMythRankList(user) {
    return (user && user.gender === 'f') ? MYTH_RANKS_F : MYTH_RANKS_M;
}

function getCurrentMythRank(user) {
    if (!user) return null;
    const key = user.rank;
    if (key && ALL_MYTH_RANKS[key]) return ALL_MYTH_RANKS[key];
    return null;
}
