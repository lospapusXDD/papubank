/* ════════════════════════════════════════════════════════════
   LOGROS Y TROFEOS + EVENTOS DEL CLAN
   ════════════════════════════════════════════════════════════ */

/* ─────────────── LOGROS ─────────────── */

const ACHIEVEMENTS = [
    /* ── BÁSICOS ── */
    { id: 'bienvenido',        name: 'Bienvenido al Clan',      desc: 'Crea tu cuenta en el banco',                    icon: 'fa-hand-sparkles',          reward: 50,   cond: () => true },
    { id: 'primer_transfer',   name: 'Primera Transferencia',   desc: 'Recibe tu primer PPC',                          icon: 'fa-paper-plane',            reward: 100,  cond: (u, a) => (a.totalIn || 0) >= 1 },

    /* ── TRANSACCIONES ── */
    { id: 'traficante',        name: 'Traficante de PPC',       desc: 'Haz 25 transacciones',                          icon: 'fa-arrow-right-arrow-left', reward: 250,  cond: (u, a) => (a.txCount || 0) >= 25 },
    { id: 'maquinita',         name: 'Maquinita',               desc: 'Haz 250 transacciones',                         icon: 'fa-rotate',                 reward: 750,  cond: (u, a) => (a.txCount || 0) >= 250 },
    { id: 'pro_tx',            name: 'Profesional',             desc: 'Haz 1.000 transacciones',                       icon: 'fa-bolt',                   reward: 3000, cond: (u, a) => (a.txCount || 0) >= 1000 },
    { id: 'leyenda_tx',        name: 'Leyenda del Movimiento',  desc: 'Haz 5.000 transacciones',                       icon: 'fa-fire',                   reward: 12000, cond: (u, a) => (a.txCount || 0) >= 5000 },

    /* ── DINERO ── */
    { id: 'media_vuelta',      name: 'Media Vuelta',            desc: 'Alcanza 50.000 PPC en saldo',                   icon: 'fa-flag-checkered',         reward: 300,  cond: (u, a) => (a.balance || 0) >= 50000 },
    { id: 'millonario',        name: 'Millonario',              desc: 'Alcanza 1.000.000 PPC en saldo',                icon: 'fa-sack-dollar',            reward: 2000, cond: (u, a) => (a.balance || 0) >= 1000000 },
    { id: 'leyenda',           name: 'Leyenda del Clan',        desc: 'Alcanza 10.000.000 PPC en saldo',               icon: 'fa-crown',                  reward: 5000, cond: (u, a) => (a.balance || 0) >= 10000000 },
    { id: 'magnate',           name: 'Magnate',                 desc: 'Alcanza 50.000.000 PPC en saldo',               icon: 'fa-gem',                    reward: 15000, cond: (u, a) => (a.balance || 0) >= 50000000 },
    { id: 'coloso',            name: 'Coloso',                  desc: 'Alcanza 100.000.000 PPC en saldo',              icon: 'fa-mountain',               reward: 40000, cond: (u, a) => (a.balance || 0) >= 100000000 },
    { id: 'titan',             name: 'Titán',                   desc: 'Alcanza 500.000.000 PPC en saldo',              icon: 'fa-volcano',                reward: 100000, cond: (u, a) => (a.balance || 0) >= 500000000 },
    { id: 'dios_ppc',          name: 'Dios del PPC',            desc: 'Alcanza 1.000.000.000 PPC en saldo (1B)',       icon: 'fa-star',                   reward: 250000, cond: (u, a) => (a.balance || 0) >= 1000000000 },

    /* ── MOVIMIENTO DE DINERO ── */
    { id: 'recibido_1m',       name: 'Imán de PPC',             desc: 'Recibe 1.000.000 PPC en total',                 icon: 'fa-hand-holding-heart',     reward: 2000, cond: (u, a) => (a.totalIn || 0) >= 1000000 },
    { id: 'recibido_10m',      name: 'Aspiradora',              desc: 'Recibe 10.000.000 PPC en total',                icon: 'fa-droplet',                reward: 8000, cond: (u, a) => (a.totalIn || 0) >= 10000000 },
    { id: 'enviado_1m',        name: 'Generoso',                desc: 'Envía 1.000.000 PPC en total',                  icon: 'fa-hand-holding-dollar',    reward: 2000, cond: (u, a) => (a.totalOut || 0) >= 1000000 },

    /* ── BÓVEDA ── */
    { id: 'ahorrador',         name: 'Bóveda Segura',           desc: 'Guarda 10.000 PPC en tu bóveda personal',       icon: 'fa-vault',                  reward: 250,  cond: (u, a) => (a.vaultBalance || 0) >= 10000 },
    { id: 'vault_100k',        name: 'Castillo Blindado',       desc: 'Guarda 100.000 PPC en tu bóveda personal',      icon: 'fa-chess-rook',             reward: 1000, cond: (u, a) => (a.vaultBalance || 0) >= 100000 },
    { id: 'vault_1m',          name: 'Fortaleza',               desc: 'Guarda 1.000.000 PPC en tu bóveda personal',    icon: 'fa-chess-king',             reward: 5000, cond: (u, a) => (a.vaultBalance || 0) >= 1000000 },

    /* ── INVERSIONES ── */
    { id: 'inversor',          name: 'Inversor',                desc: 'Invierte en un plan',                           icon: 'fa-chart-line',             reward: 400,  cond: (u, a, ex) => (ex.investments || 0) >= 1 },
    { id: 'gran_inversor',     name: 'Gigante de Wall Street',  desc: 'Invierte 10 veces',                             icon: 'fa-building-columns',       reward: 2500, cond: (u, a, ex) => (ex.investments || 0) >= 10 },

    /* ── TIENDA ── */
    { id: 'comprador',         name: 'Comprador',               desc: 'Compra algo en la tienda',                      icon: 'fa-cart-shopping',          reward: 200,  cond: (u, a) => (a.inventory || []).length >= 1 },
    { id: 'comprador_vip',     name: 'Comprador VIP',           desc: 'Compra 25 items en la tienda',                  icon: 'fa-cart-plus',              reward: 1500, cond: (u, a) => (a.inventory || []).length >= 25 },

    /* ── SOCIAL ── */
    { id: 'famoso',            name: 'Famoso del Clan',         desc: 'Recibe 3 karmas de otros papus',                icon: 'fa-heart',                  reward: 300,  cond: (u) => (u.karma || 0) >= 3 },
    { id: 'querido',           name: 'Querido',                 desc: 'Recibe 10 karmas de otros papus',               icon: 'fa-heart-pulse',            reward: 1000, cond: (u) => (u.karma || 0) >= 10 },
    { id: 'idol',              name: 'Ídolo del Clan',          desc: 'Recibe 50 karmas de otros papus',               icon: 'fa-crow',                   reward: 5000, cond: (u) => (u.karma || 0) >= 50 },
    { id: 'democratico',       name: 'Democrático',             desc: 'Vota en 1 encuesta del clan',                   icon: 'fa-check-double',           reward: 150,  cond: (u) => (u.votedPolls || 0) >= 1 },
    { id: 'politico',          name: 'Político',                desc: 'Vota en 10 encuestas del clan',                 icon: 'fa-person-booth',           reward: 800,  cond: (u) => (u.votedPolls || 0) >= 10 },
    { id: 'chismoso',          name: 'Chismoso',                desc: 'Envía 20 mensajes privados',                    icon: 'fa-comment-dots',           reward: 500,  cond: (u) => (u.pmSent || 0) >= 20 },
    { id: 'comentarista',      name: 'Comentarista',            desc: 'Escribe 10 comentarios en perfiles',            icon: 'fa-keyboard',               reward: 400,  cond: (u) => (u.commentsWritten || 0) >= 10 },
    { id: 'publicador',        name: 'Publicador',              desc: 'Publica 5 posts en el Board',                   icon: 'fa-bullhorn',               reward: 400,  cond: (u) => (u.boardPosts || 0) >= 5 },

    /* ── RANGOS / ESPECIALES ── */
    { id: 'olimpo',            name: 'Dios Olimpo',             desc: 'Alcanza un rango Olimpo (Zeus o superior)',     icon: 'fa-cloud-bolt',             reward: 3000, cond: (u) => { const rk = getRankKey(u); return RANKS[rk] && RANKS[rk].level >= 13; } },
    { id: 'hechicero',         name: 'Hechicero',               desc: 'Conviértete en un rango JJK',                   icon: 'fa-wand-sparkles',          reward: 1000, cond: (u) => !!u.jjkRank },
    { id: 'maestro_jjk',       name: 'Maestro Hechicero',       desc: 'Gana 10 apuestas en los minijuegos JJK',        icon: 'fa-hand-fist',              reward: 2000, cond: (u) => (u.jjkWins || 0) >= 10 },
    { id: 'maldito',           name: 'Portador del Mal',        desc: 'Compra el Dedo de Sukuna',                      icon: 'fa-skull',                  reward: 3000, cond: (u, a) => (a.badges || []).includes('maldito') },
    { id: 'deuda_cero',        name: 'Libre de Deudas',         desc: 'Liquida un préstamo completo',                 icon: 'fa-file-circle-check',      reward: 500,  cond: (u) => (u.loansPaid || 0) >= 1 },
    { id: 'cumpleañero',       name: 'Cumpleañero',             desc: 'Recibe tu bono de cumpleaños',                  icon: 'fa-cake-candles',            reward: 200,  cond: (u) => !!u.lastBirthdayClaim },

    /* ── BEN 10 ── */
    { id: 'portador_omnitrix', name: 'Portador del Omnitrix',   desc: 'Equipa el Omnitrix en la tienda Ben 10',        icon: 'fa-stopwatch',              reward: 3000, cond: (u, a) => (a.badges || []).includes('omnitrix') },
    { id: 'primer_ben10',      name: "It's Hero Time",          desc: 'Obtén tu primera transformación Omnitrix',      icon: 'fa-clock',                  reward: 1500, cond: (u) => !!u.ben10Rank },
    { id: 'waybig_ben10',      name: 'Gigante Cósmico',         desc: 'Obtén la transformación Way Big',               icon: 'fa-meteor',                 reward: 30000, cond: (u) => u.ben10Rank === 'ben10_waybig' },
    { id: 'alienx_ben10',      name: 'Alien X',                 desc: 'Reescribe la realidad con Alien X',             icon: 'fa-star',                   reward: 100000, cond: (u) => u.ben10Rank === 'ben10_alienx' },

    /* ── MY HERO ACADEMIA ── */
    { id: 'primer_mha',        name: 'Plus Ultra!',             desc: 'Despierta tu primer quirk MHA',                 icon: 'fa-dove',                   reward: 1500, cond: (u) => !!u.mhaRank },
    { id: 'deku_mha',          name: 'Sucesor del Símbolo',     desc: 'Obtén el quirk de Deku (One For All)',          icon: 'fa-bolt',                   reward: 15000, cond: (u) => u.mhaRank === 'mha_deku' },
    { id: 'allmight_mha',      name: 'Símbolo de la Paz',       desc: 'Obtén el quirk de All Might',                   icon: 'fa-dove',                   reward: 40000, cond: (u) => u.mhaRank === 'mha_allmight' },
    { id: 'allforone_mha',     name: 'Rey de los Villanos',     desc: 'Obtén el quirk de All For One',                 icon: 'fa-skull',                  reward: 120000, cond: (u) => u.mhaRank === 'mha_allforone' },

    /* ── MHA: QUIRKS ESPECÍFICOS ── */
    { id: 'uraraka_mha',       name: 'Gravedad Cero',           desc: 'Despierta el quirk de Uraraka',                 icon: 'fa-star',                   reward: 3000, cond: (u) => u.mhaRank === 'mha_uraraka' },
    { id: 'iida_mha',          name: 'Rayo Motor',              desc: 'Despierta el quirk de Iida',                    icon: 'fa-gauge-high',             reward: 5000, cond: (u) => u.mhaRank === 'mha_iida' },
    { id: 'todoroki_mha',      name: 'Medio Fuego',             desc: 'Despierta el quirk de Todoroki',                icon: 'fa-snowflake',              reward: 8000, cond: (u) => u.mhaRank === 'mha_todoroki' },
    { id: 'bakugo_mha',        name: 'Orgullo Explosivo',       desc: 'Despierta el quirk de Bakugo',                  icon: 'fa-fire',                   reward: 12000, cond: (u) => u.mhaRank === 'mha_bakugo' },
    { id: 'aizawa_mha',        name: 'Ojos que Borran',         desc: 'Despierta el quirk de Eraser Head',             icon: 'fa-eye',                    reward: 20000, cond: (u) => u.mhaRank === 'mha_aizawa' },
    { id: 'endevor_mha',       name: 'Llama Eterna',            desc: 'Despierta el quirk de Endeavor',                icon: 'fa-flame',                  reward: 25000, cond: (u) => u.mhaRank === 'mha_endevor' },
    { id: 'shigaraki_mha',     name: 'Decaimiento',             desc: 'Despierta el quirk de Shigaraki',               icon: 'fa-hand',                   reward: 60000, cond: (u) => u.mhaRank === 'mha_shigaraki' },

    /* ── BEN 10: TRANSFORMACIONES ESPECÍFICAS ── */
    { id: 'wildmutt_ben10',    name: 'Instinto Salvaje',        desc: 'Obtén la transformación Wildmutt',              icon: 'fa-paw',                    reward: 2500, cond: (u) => u.ben10Rank === 'ben10_wildmutt' },
    { id: 'greymatter_ben10',  name: 'Cerebro Galáctico',       desc: 'Obtén la transformación Grey Matter',           icon: 'fa-brain',                  reward: 3000, cond: (u) => u.ben10Rank === 'ben10_greymatter' },
    { id: 'rippjaws_ben10',    name: 'Señor de los Mares',      desc: 'Obtén la transformación Ripjaws',               icon: 'fa-fish-fins',              reward: 6000, cond: (u) => u.ben10Rank === 'ben10_rippjaws' },
    { id: 'stinkfly_ben10',    name: 'Pestilencia Voladora',    desc: 'Obtén la transformación Stinkfly',              icon: 'fa-bug',                    reward: 9000, cond: (u) => u.ben10Rank === 'ben10_stinkfly' },
    { id: 'upgrade_ben10',     name: 'Fusión Tecnológica',      desc: 'Obtén la transformación Upgrade',               icon: 'fa-robot',                  reward: 15000, cond: (u) => u.ben10Rank === 'ben10_upgrade' },
    { id: 'cannonbolt_ben10',  name: 'Bola de Cañón',           desc: 'Obtén la transformación Cannonbolt',            icon: 'fa-bowling-ball',           reward: 20000, cond: (u) => u.ben10Rank === 'ben10_cannonbolt' },
    { id: 'swampfire_ben10',   name: 'Fuego Vital',             desc: 'Obtén la transformación Swampfire',             icon: 'fa-seedling',               reward: 35000, cond: (u) => u.ben10Rank === 'ben10_swampfire' },
    { id: 'humungousaur_ben10',name: 'Coloso de 60 Metros',     desc: 'Obtén la transformación Humungousaur',          icon: 'fa-dragon',                 reward: 50000, cond: (u) => u.ben10Rank === 'ben10_humungousaur' },
    { id: 'colector_ben10_3',  name: 'Coleccionista del Omnitrix', desc: 'Ten 3 transformaciones Ben 10',            icon: 'fa-stopwatch',              reward: 6000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('ben10_')).length >= 3 },
    { id: 'colector_ben10_5',  name: 'Maestro de Aliens',       desc: 'Ten 5 transformaciones Ben 10',                 icon: 'fa-wand-magic-sparkles',    reward: 12000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('ben10_')).length >= 5 },
    { id: 'colector_ben10_8',  name: 'Biblioteca Alienígena',   desc: 'Ten 8 transformaciones Ben 10',                 icon: 'fa-book',                   reward: 25000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('ben10_')).length >= 8 },
    { id: 'colector_ben10_12', name: 'Enciclopedia Galáctica',  desc: 'Ten 12 transformaciones Ben 10',                icon: 'fa-graduation-cap',         reward: 60000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('ben10_')).length >= 12 },

    /* ── MHA: COLECCIÓN ── */
    { id: 'colector_mha_3',    name: 'Aspirante a Héroe',       desc: 'Ten 3 quirks MHA',                              icon: 'fa-user-graduate',          reward: 5000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('mha_')).length >= 3 },
    { id: 'colector_mha_5',    name: 'Héroe Profesional',       desc: 'Ten 5 quirks MHA',                               icon: 'fa-ranking-star',           reward: 12000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('mha_')).length >= 5 },
    { id: 'colector_mha_8',    name: 'Símbolo de la Paz Total', desc: 'Ten 8 quirks MHA',                               icon: 'fa-crown',                  reward: 50000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('mha_')).length >= 8 },

    /* ── RANGOS COMPRADOS (COLECCIÓN) ── */
    { id: 'coleccion_3',       name: 'Cazador de Rangos',       desc: 'Compra 3 rangos en total',                      icon: 'fa-medal',                  reward: 1000, cond: (u) => (u.boughtRanks || []).length >= 3 },
    { id: 'coleccion_6',       name: 'Sargento de Rangos',      desc: 'Compra 6 rangos en total',                      icon: 'fa-award',                  reward: 3000, cond: (u) => (u.boughtRanks || []).length >= 6 },
    { id: 'coleccion_10',      name: 'General de Rangos',       desc: 'Compra 10 rangos en total',                     icon: 'fa-star',                   reward: 8000, cond: (u) => (u.boughtRanks || []).length >= 10 },
    { id: 'coleccion_15',      name: 'Emperador de Rangos',     desc: 'Compra 15 rangos en total',                     icon: 'fa-crown',                  reward: 20000, cond: (u) => (u.boughtRanks || []).length >= 15 },
    { id: 'coleccion_20',      name: 'Dios de la Colección',    desc: 'Compra 20 rangos en total',                     icon: 'fa-sun',                    reward: 50000, cond: (u) => (u.boughtRanks || []).length >= 20 },

    /* ── FRIEREN ── */
    { id: 'frieren_fern',      name: 'Aprendiz de Magia',       desc: 'Obtén el título Frieren de Fern',                icon: 'fa-wand-magic',             reward: 3000, cond: (u) => u.frierenRank === 'frieren_fern' || (u.boughtRanks || []).includes('frieren_fern') },
    { id: 'frieren_stark',     name: 'Guerrero Valiente',       desc: 'Obtén el título de Stark',                      icon: 'fa-axe',                    reward: 8000, cond: (u) => u.frierenRank === 'frieren_stark' },
    { id: 'frieren_frieren',   name: 'Elfa Milenaria',          desc: 'Obtén el título de Frieren',                    icon: 'fa-hat-wizard',             reward: 20000, cond: (u) => u.frierenRank === 'frieren_frieren' },
    { id: 'frieren_himmel',    name: 'Héroe de Leyenda',        desc: 'Obtén el título de Himmel',                     icon: 'fa-sword',                  reward: 60000, cond: (u) => u.frierenRank === 'frieren_himmel' },

    /* ── JJK ESPECIALES ── */
    { id: 'jjk_grade1',        name: 'Hechicero de Élite',      desc: 'Alcanza un rango Grade 1 en JJK',                icon: 'fa-shield-halved',          reward: 6000, cond: (u) => { const j = JJK_RANKS.find(x => x.key === u.jjkRank); return j && j.gradeTier >= 2; } },
    { id: 'jjk_special',       name: 'Grado Especial',          desc: 'Alcanza Special Grade en JJK',                   icon: 'fa-crown',                  reward: 25000, cond: (u) => { const j = JJK_RANKS.find(x => x.key === u.jjkRank); return j && j.gradeTier >= 3; } },
    { id: 'jjk_sukuna',        name: 'Rey de las Maldiciones',  desc: 'Obtén a Ryomen Sukuna',                         icon: 'fa-fire',                   reward: 80000, cond: (u) => u.jjkRank === 'sukuna' },
    { id: 'jjk_gojo',          name: 'El Más Fuerte',           desc: 'Obtén a Satoru Gojo',                           icon: 'fa-eye',                    reward: 200000, cond: (u) => u.jjkRank === 'gojo' },
    { id: 'jjk_wins_25',       name: 'Maldición en Racha',      desc: 'Gana 25 apuestas en minijuegos JJK',             icon: 'fa-dice',                   reward: 4000, cond: (u) => (u.jjkWins || 0) >= 25 },
    { id: 'jjk_wins_100',      name: 'Imparable',               desc: 'Gana 100 apuestas en minijuegos JJK',            icon: 'fa-gamepad',                reward: 15000, cond: (u) => (u.jjkWins || 0) >= 100 },
    { id: 'jjk_wins_500',      name: 'Hechicero Legendario',    desc: 'Gana 500 apuestas en minijuegos JJK',            icon: 'fa-trophy',                 reward: 60000, cond: (u) => (u.jjkWins || 0) >= 500 },

    /* ── TRANSACCIONES EXTRA ── */
    { id: 'tx_10',             name: 'Aprendiz',                desc: 'Haz 10 transacciones',                           icon: 'fa-money-bill-transfer',    reward: 80,   cond: (u, a) => (a.txCount || 0) >= 10 },
    { id: 'tx_50',             name: 'Banquero Junior',         desc: 'Haz 50 transacciones',                           icon: 'fa-money-bill-1',           reward: 300,  cond: (u, a) => (a.txCount || 0) >= 50 },
    { id: 'tx_100',            name: 'Experto',                 desc: 'Haz 100 transacciones',                          icon: 'fa-money-bill-trend-up',    reward: 800,  cond: (u, a) => (a.txCount || 0) >= 100 },
    { id: 'tx_500',            name: 'Veterano',                desc: 'Haz 500 transacciones',                          icon: 'fa-coins',                  reward: 3000, cond: (u, a) => (a.txCount || 0) >= 500 },
    { id: 'tx_2500',           name: 'Dios de los Ceros',       desc: 'Haz 2.500 transacciones',                        icon: 'fa-calculator',             reward: 9000, cond: (u, a) => (a.txCount || 0) >= 2500 },
    { id: 'tx_10000',          name: 'Terminal Humana',         desc: 'Haz 10.000 transacciones',                       icon: 'fa-robot',                  reward: 40000, cond: (u, a) => (a.txCount || 0) >= 10000 },

    /* ── DINERO EXTRA ── */
    { id: 'saldo_250k',        name: 'Rico',                    desc: 'Alcanza 250.000 PPC en saldo',                   icon: 'fa-wallet',                 reward: 600,  cond: (u, a) => (a.balance || 0) >= 250000 },
    { id: 'saldo_5m',          name: 'Multimillonario',         desc: 'Alcanza 5.000.000 PPC en saldo',                 icon: 'fa-sack-dollar',            reward: 5000, cond: (u, a) => (a.balance || 0) >= 5000000 },
    { id: 'saldo_25m',         name: 'Zar del PPC',             desc: 'Alcanza 25.000.000 PPC en saldo',                icon: 'fa-gem',                    reward: 15000, cond: (u, a) => (a.balance || 0) >= 25000000 },
    { id: 'saldo_250m',        name: 'Titán Supremo',           desc: 'Alcanza 250.000.000 PPC en saldo',               icon: 'fa-volcano',                reward: 80000, cond: (u, a) => (a.balance || 0) >= 250000000 },
    { id: 'saldo_750m',        name: 'Casi Inmortal',           desc: 'Alcanza 750.000.000 PPC en saldo',               icon: 'fa-meteor',                 reward: 180000, cond: (u, a) => (a.balance || 0) >= 750000000 },

    /* ── BÓVEDA EXTRA ── */
    { id: 'vault_50k',         name: 'Cofre Pequeño',           desc: 'Guarda 50.000 PPC en tu bóveda',                 icon: 'fa-lock',                   reward: 500,  cond: (u, a) => (a.vaultBalance || 0) >= 50000 },
    { id: 'vault_500k',        name: 'Banco Personal',          desc: 'Guarda 500.000 PPC en tu bóveda',                icon: 'fa-shield-halved',          reward: 2500, cond: (u, a) => (a.vaultBalance || 0) >= 500000 },
    { id: 'vault_5m',          name: 'Búnker',                  desc: 'Guarda 5.000.000 PPC en tu bóveda',              icon: 'fa-landmark-dome',          reward: 15000, cond: (u, a) => (a.vaultBalance || 0) >= 5000000 },
    { id: 'vault_10m',         name: 'Fortaleza Inexpugnable',  desc: 'Guarda 10.000.000 PPC en tu bóveda',             icon: 'fa-building-columns',       reward: 30000, cond: (u, a) => (a.vaultBalance || 0) >= 10000000 },

    /* ── INVERSIONES EXTRA ── */
    { id: 'inv_3',             name: 'Curioso',                 desc: 'Invierte 3 veces',                               icon: 'fa-chart-pie',              reward: 500,  cond: (u, a, ex) => (ex.investments || 0) >= 3 },
    { id: 'inv_25',            name: 'Lobo de Wall Street',     desc: 'Invierte 25 veces',                              icon: 'fa-chart-column',           reward: 6000, cond: (u, a, ex) => (ex.investments || 0) >= 25 },
    { id: 'inv_100',           name: 'Torre del Dinero',        desc: 'Invierte 100 veces',                             icon: 'fa-city',                   reward: 25000, cond: (u, a, ex) => (ex.investments || 0) >= 100 },
    { id: 'inv_500',           name: 'Corredor de Bolsa Élite', desc: 'Invierte 500 veces',                             icon: 'fa-chart-line',             reward: 80000, cond: (u, a, ex) => (ex.investments || 0) >= 500 },

    /* ── TIENDA EXTRA ── */
    { id: 'shop_5',            name: 'Comprador Regular',       desc: 'Compra 5 items en la tienda',                    icon: 'fa-basket-shopping',        reward: 400,  cond: (u, a) => (a.inventory || []).length >= 5 },
    { id: 'shop_10',           name: 'Cliente Fiel',            desc: 'Compra 10 items en la tienda',                   icon: 'fa-store',                  reward: 1200, cond: (u, a) => (a.inventory || []).length >= 10 },
    { id: 'shop_50',           name: 'Rey de las Compras',      desc: 'Compra 50 items en la tienda',                   icon: 'fa-cart-flatbed',           reward: 8000, cond: (u, a) => (a.inventory || []).length >= 50 },
    { id: 'shop_100',          name: 'Centro Comercial',        desc: 'Compra 100 items en la tienda',                  icon: 'fa-truck-fast',             reward: 25000, cond: (u, a) => (a.inventory || []).length >= 100 },

    /* ── SOCIAL EXTRA ── */
    { id: 'karma_25',          name: 'Famoso Legendario',       desc: 'Recibe 25 karmas',                               icon: 'fa-heart-crack',            reward: 3000, cond: (u) => (u.karma || 0) >= 25 },
    { id: 'karma_100',         name: 'Influencer',              desc: 'Recibe 100 karmas',                              icon: 'fa-camera-retro',           reward: 15000, cond: (u) => (u.karma || 0) >= 100 },
    { id: 'karma_200',         name: 'Celebridad del Clan',     desc: 'Recibe 200 karmas',                              icon: 'fa-certificate',            reward: 40000, cond: (u) => (u.karma || 0) >= 200 },
    { id: 'polls_3',           name: 'Votante Activo',          desc: 'Vota en 3 encuestas',                            icon: 'fa-square-poll-horizontal', reward: 300,  cond: (u) => (u.votedPolls || 0) >= 3 },
    { id: 'polls_25',          name: 'Elector',                 desc: 'Vota en 25 encuestas',                           icon: 'fa-square-poll-vertical',   reward: 3000, cond: (u) => (u.votedPolls || 0) >= 25 },
    { id: 'polls_50',          name: 'Senador del Clan',        desc: 'Vota en 50 encuestas',                           icon: 'fa-landmark',               reward: 10000, cond: (u) => (u.votedPolls || 0) >= 50 },
    { id: 'pm_100',            name: 'Chatelero',               desc: 'Envía 100 mensajes privados',                    icon: 'fa-envelope-open-text',     reward: 2500, cond: (u) => (u.pmSent || 0) >= 100 },
    { id: 'pm_500',            name: 'Peluquero de Chismes',    desc: 'Envía 500 mensajes privados',                    icon: 'fa-comments',               reward: 12000, cond: (u) => (u.pmSent || 0) >= 500 },
    { id: 'comments_50',       name: 'Crítico',                 desc: 'Escribe 50 comentarios',                         icon: 'fa-comment',                reward: 2500, cond: (u) => (u.commentsWritten || 0) >= 50 },
    { id: 'comments_200',      name: 'Reseñador Profesional',   desc: 'Escribe 200 comentarios',                        icon: 'fa-pen',                    reward: 12000, cond: (u) => (u.commentsWritten || 0) >= 200 },
    { id: 'board_25',          name: 'Reportero',               desc: 'Publica 25 posts en el Board',                   icon: 'fa-newspaper',              reward: 2500, cond: (u) => (u.boardPosts || 0) >= 25 },
    { id: 'board_100',         name: 'Periodista',              desc: 'Publica 100 posts en el Board',                  icon: 'fa-microphone',             reward: 10000, cond: (u) => (u.boardPosts || 0) >= 100 },

    /* ── PRÉSTAMOS ── */
    { id: 'loans_5',           name: 'Pagador Honesto',         desc: 'Liquida 5 préstamos',                            icon: 'fa-handshake',              reward: 2500, cond: (u) => (u.loansPaid || 0) >= 5 },
    { id: 'loans_25',          name: 'Fiador Legendario',       desc: 'Liquida 25 préstamos',                           icon: 'fa-file-signature',         reward: 12000, cond: (u) => (u.loansPaid || 0) >= 25 },
    { id: 'loans_100',         name: 'Dueño del Banco',         desc: 'Liquida 100 préstamos',                          icon: 'fa-vault',                  reward: 50000, cond: (u) => (u.loansPaid || 0) >= 100 },

    /* ── OLIMPO EXTRA ── */
    { id: 'olimpo_urano',      name: 'Cielo Estrellado',        desc: 'Alcanza el rango Urano',                         icon: 'fa-globe',                  reward: 40000, cond: (u) => { const rk = getRankKey(u); return rk === 'urano' || (u.boughtRanks || []).includes('urano'); } },
    { id: 'olimpo_cronos',     name: 'Señor del Tiempo',        desc: 'Alcanza el rango Cronos',                        icon: 'fa-hourglass-half',         reward: 20000, cond: (u) => { const rk = getRankKey(u); return rk === 'cronos' || (u.boughtRanks || []).includes('cronos'); } },
    { id: 'olimpo_orfeo',      name: 'Voz Encantadora',         desc: 'Alcanza el rango Orfeo',                         icon: 'fa-music',                  reward: 12000, cond: (u) => { const rk = getRankKey(u); return rk === 'orfeo' || (u.boughtRanks || []).includes('orfeo'); } },
    { id: 'olimpo_hades',      name: 'Señor del Inframundo',    desc: 'Alcanza el rango Hades',                         icon: 'fa-skull',                  reward: 7000, cond: (u) => { const rk = getRankKey(u); return rk === 'hades' || (u.boughtRanks || []).includes('hades'); } },
    { id: 'olimpo_poseidon',   name: 'Rey de los Mares',        desc: 'Alcanza el rango Poseidón',                      icon: 'fa-trident',                reward: 5000, cond: (u) => { const rk = getRankKey(u); return rk === 'poseidon' || (u.boughtRanks || []).includes('poseidon'); } },

    /* ── GODZILLA ── */
    { id: 'primer_godzilla',   name: 'El Rey Despierta',        desc: 'Obtén tu primera forma de Godzilla',              icon: 'fa-dragon',                 reward: 1500, cond: (u) => !!u.godzillaRank },
    { id: 'godzilla_54',       name: 'El Terror Original',      desc: 'Obtén Gojira 1954',                               icon: 'fa-radiation',              reward: 2500, cond: (u) => u.godzillaRank === 'godzilla_54' || (u.boughtRanks || []).includes('godzilla_54') },
    { id: 'godzilla_showa',    name: 'Defensor de la Tierra',   desc: 'Obtén Godzilla Showa',                            icon: 'fa-wave-square',            reward: 4000, cond: (u) => u.godzillaRank === 'godzilla_showa' || (u.boughtRanks || []).includes('godzilla_showa') },
    { id: 'godzilla_84',       name: 'Regreso Nuclear',         desc: 'Obtén Godzilla 1984',                             icon: 'fa-volcano',                reward: 6000, cond: (u) => u.godzillaRank === 'godzilla_84' || (u.boughtRanks || []).includes('godzilla_84') },
    { id: 'godzilla_burning',  name: 'Fusión Imminente',        desc: 'Obtén Burning Godzilla',                          icon: 'fa-fire-flame-curved',      reward: 12000, cond: (u) => u.godzillaRank === 'godzilla_burning' || (u.boughtRanks || []).includes('godzilla_burning') },
    { id: 'godzilla_2000',     name: 'Regeneración Total',      desc: 'Obtén Godzilla 2000',                             icon: 'fa-arrow-trend-up',         reward: 15000, cond: (u) => u.godzillaRank === 'godzilla_2000' || (u.boughtRanks || []).includes('godzilla_2000') },
    { id: 'godzilla_fw',       name: 'Luchador Final',          desc: 'Obtén Godzilla Final Wars',                       icon: 'fa-crosshairs',             reward: 20000, cond: (u) => u.godzillaRank === 'godzilla_fw' || (u.boughtRanks || []).includes('godzilla_fw') },
    { id: 'godzilla_2014',     name: 'Coloso Emergente',        desc: 'Obtén Godzilla Legendary',                        icon: 'fa-mountain',               reward: 25000, cond: (u) => u.godzillaRank === 'godzilla_2014' || (u.boughtRanks || []).includes('godzilla_2014') },
    { id: 'godzilla_shin',     name: 'Evolución Sin Fin',       desc: 'Obtén Shin Godzilla',                             icon: 'fa-dna',                    reward: 30000, cond: (u) => u.godzillaRank === 'godzilla_shin' || (u.boughtRanks || []).includes('godzilla_shin') },
    { id: 'godzilla_kotm',     name: 'Rey de los Monstruos',    desc: 'Obtén King of Monsters',                          icon: 'fa-crown',                  reward: 40000, cond: (u) => u.godzillaRank === 'godzilla_kotm' || (u.boughtRanks || []).includes('godzilla_kotm') },
    { id: 'godzilla_gvk',      name: 'Modo Termonuclear',       desc: 'Obtén Godzilla vs Kong',                          icon: 'fa-hand-fist',              reward: 50000, cond: (u) => u.godzillaRank === 'godzilla_gvk' || (u.boughtRanks || []).includes('godzilla_gvk') },
    { id: 'godzilla_minus1',   name: 'La Amenaza Letal',        desc: 'Obtén Godzilla Minus One',                        icon: 'fa-skull',                  reward: 70000, cond: (u) => u.godzillaRank === 'godzilla_minus1' || (u.boughtRanks || []).includes('godzilla_minus1') },
    { id: 'godzilla_earth',    name: 'Coloso de 300 Metros',    desc: 'Obtén Godzilla Earth (anime)',                    icon: 'fa-earth-americas',         reward: 120000, cond: (u) => u.godzillaRank === 'godzilla_earth' || (u.boughtRanks || []).includes('godzilla_earth') },
    { id: 'coleccion_godzilla_3', name: 'Aprendiz de Kaiju',    desc: 'Ten 3 formas de Godzilla',                        icon: 'fa-egg',                    reward: 6000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('godzilla_')).length >= 3 },
    { id: 'coleccion_godzilla_6', name: 'Cazador de Monstruos', desc: 'Ten 6 formas de Godzilla',                        icon: 'fa-paw',                    reward: 15000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('godzilla_')).length >= 6 },
    { id: 'coleccion_godzilla_10', name: 'Dios de los Kaijus',  desc: 'Ten 10 formas de Godzilla',                       icon: 'fa-dragon',                 reward: 60000, cond: (u) => (u.boughtRanks || []).filter(k => k.startsWith('godzilla_')).length >= 10 },
];

async function loadAchievements() {
    const container = document.getElementById('achievements-grid');
    if (!container || !window._db || !currentUser) return;
    container.innerHTML = '<div class="empty-msg" style="grid-column:1/-1;"><i class="fa-solid fa-spinner fa-spin"></i> Cargando logros...</div>';
    try {
        const userSnap = await window._fbGetDoc(window._fbDoc(window._db, 'users', currentUser.nick));
        const unlocked = (userSnap.exists() ? userSnap.data().logros : null) || [];
        let html = '';
        for (const ach of ACHIEVEMENTS) {
            const got = unlocked.includes(ach.id);
            html += `
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border:1px solid ${got ? 'rgba(255,215,0,0.45)' : 'rgba(255,255,255,0.07)'};border-radius:14px;background:${got ? 'rgba(255,215,0,0.07)' : 'rgba(255,255,255,0.02)'};${got ? '' : 'opacity:0.55;'}" title="${escHTML(ach.desc)}">
              <div style="width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;background:${got ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.06)'};color:${got ? 'var(--gold)' : 'var(--text-muted)'};flex-shrink:0;"><i class="fa-solid ${ach.icon}"></i></div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:12px;font-weight:700;color:${got ? 'var(--gold)' : 'var(--text-muted)'};">${escHTML(ach.name)} ${got ? '✓' : ''}</div>
                <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">${escHTML(ach.desc)}</div>
              </div>
              <div style="font-size:10px;font-family:'Orbitron',sans-serif;color:var(--secondary);white-space:nowrap;">+${ach.reward} PPC</div>
            </div>`;
        }
        const total = ACHIEVEMENTS.length;
        container.innerHTML = `
            <div style="grid-column:1/-1;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:14px;background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.25);">
                <i class="fa-solid fa-trophy" style="color:var(--gold);font-size:20px;"></i>
                <div style="font-size:13px;font-family:'Orbitron',sans-serif;font-weight:700;color:var(--gold);">${unlocked.length} / ${total} LOGROS</div>
                <div style="margin-left:auto;font-size:10px;color:var(--text-muted);">Gana PPC por cada logro ✓</div>
            </div>
            ${html}`;
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        container.style.gap = '10px';
    } catch(e) {
        container.innerHTML = '<div class="empty-msg" style="grid-column:1/-1;color:var(--danger);">Error al cargar logros</div>';
    }
}

async function checkAchievements() {
    if (!currentUser || !window._db) return;
    try {
        const db = window._db;
        const nick = currentUser.nick;
        const [userSnap, accSnap] = await Promise.all([
            window._fbGetDoc(window._fbDoc(db, 'users', nick)),
            window._fbGetDoc(window._fbDoc(db, 'bank_accounts', nick))
        ]);
        const u = userSnap.exists() ? userSnap.data() : {};
        const a = accSnap.exists() ? accSnap.data() : {};
        const unlocked = u.logros || [];

        if (typeof checkSecretAchievements === 'function') checkSecretAchievements();

        let investments = 0;
        try {
            const invSnap = await window._fbGetDocs(window._fbCollection(db, 'bank_accounts', nick, 'investments'));
            investments = invSnap.size;
        } catch(e) {}

        const newly = [];
        for (const ach of ACHIEVEMENTS) {
            if (unlocked.includes(ach.id)) continue;
            let ok = false;
            try { ok = ach.cond(u, a, { investments }); } catch(e) { ok = false; }
            if (ok) newly.push(ach);
        }
        if (!newly.length) return;

        const accRef = window._fbDoc(db, 'bank_accounts', nick);
        let totalReward = 0;
        for (const ach of newly) totalReward += ach.reward;
        
        // Aplicar multiplicador de rango al total de recompensas
        const mult = (typeof getRankMultiplier === 'function') ? getRankMultiplier(u) : 1;
        const finalReward = Math.round(totalReward * mult);
        
        await window._fbUpdateDoc(accRef, { balance: window._fbIncrement(finalReward) });
        await window._fbUpdateDoc(window._fbDoc(db, 'users', nick), {
            logros: window._fbArrayUnion(...newly.map(x => x.id))
        });
        try {
            await window._fbAddDoc(window._fbCollection(db, 'transactions'), {
                from: 'Sistema', to: nick, amount: finalReward,
                type: 'Logro', note: 'Logros: ' + newly.map(x => x.name).join(', ') + ` (×${mult.toFixed(2)})`,
                timestamp: window._fbServerTimestamp()
            });
        } catch(e) {}
        // onSnapshot ya actualiza bankAccount automáticamente

        const names = newly.map(x => `<b style="color:var(--gold)">${escHTML(x.name)}</b>`).join(', ');
        showToast('🏆 ¡Logro desbloqueado: ' + newly.map(x => x.name).join(', ') + '! +' + finalReward.toLocaleString() + ' PPC (×' + mult.toFixed(2) + ')', 'var(--gold)');
        loadAchievements();
    } catch(e) {}
}

/* ─────────────── EVENTOS DEL CLAN ─────────────── */

const EVENT_TYPES = {
    'sin_comision': { label: 'Sin comisión en transferencias', icon: 'fa-hand-holding-dollar', color: 'var(--secondary)' },
    'doble_karma':  { label: 'Karma x2',                       icon: 'fa-heart',                color: 'var(--gold)' }
};

let _activeEvents = [];

async function loadActiveEvents() {
    _activeEvents = [];
    if (!window._db) return;
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'events'));
        const now = Date.now();
        snap.forEach(d => {
            const e = d.data();
            const endsAt = typeof e.endsAt === 'number' ? e.endsAt : (e.endsAt && e.endsAt.toMillis ? e.endsAt.toMillis() : 0);
            if (endsAt > now) _activeEvents.push({ id: d.id, ...e, endsAt });
        });
        _activeEvents.sort((a, b) => a.endsAt - b.endsAt);

        const banner = document.getElementById('dash-events-banner');
        if (banner) {
            if (!_activeEvents.length) {
                banner.style.display = 'none';
            } else {
                banner.style.display = 'flex';
                banner.innerHTML = _activeEvents.map(e => {
                    const t = EVENT_TYPES[e.type] || { label: 'Evento especial', icon: 'fa-star', color: 'var(--gold)' };
                    const hoursLeft = Math.max(0, Math.ceil((e.endsAt - Date.now()) / 3600000));
                    return `
                    <div style="flex:1;min-width:220px;padding:12px 16px;border-radius:14px;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.35);">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <i class="fa-solid ${t.icon}" style="color:${t.color};font-size:18px;"></i>
                            <div>
                                <div style="font-size:12px;font-weight:800;color:var(--gold);font-family:'Orbitron',sans-serif;">${escHTML(e.title || t.label)}</div>
                                <div style="font-size:10px;color:var(--text-muted);margin-top:2px;">${escHTML(e.desc || '')}</div>
                            </div>
                        </div>
                        <div style="margin-top:8px;font-size:10px;color:var(--danger);font-family:'Orbitron',sans-serif;">⏳ ${hoursLeft} h restantes</div>
                    </div>`;
                }).join('');
            }
        }

        const adminList = document.getElementById('admin-events-list');
        if (adminList) renderAdminEvents();
    } catch(e) {}
}

function hasActiveEvent(type) {
    return _activeEvents.some(e => e.type === type);
}

async function createEvent() {
    if (!window._db || !checkAdminPermission()) { showToast('Solo admins pueden crear eventos', '#ff4466'); return; }
    const title = (document.getElementById('event-title-input')?.value || '').trim();
    const desc = (document.getElementById('event-desc-input')?.value || '').trim();
    const type = document.getElementById('event-type-select')?.value;
    const days = Math.max(1, Math.min(30, Math.floor(parseFloat(document.getElementById('event-days-input')?.value) || 3)));
    if (!title || !type) { showToast('Título y tipo son obligatorios', '#ff4466'); return; }
    const ok = await showConfirm('🔥 Crear Evento', '¿Activar <b style="color:var(--gold)">' + escHTML(title) + '</b> por ' + days + ' día(s)? Todos los papus lo verán en el dashboard.');
    if (!ok) return;
    try {
        await window._fbAddDoc(window._fbCollection(window._db, 'events'), {
            title: title,
            desc: desc,
            type: type,
            endsAt: Date.now() + days * 86400000,
            createdBy: currentUser.nick,
            created: window._fbServerTimestamp()
        });
        ['event-title-input','event-desc-input'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        showToast('Evento creado ✓', '#00ffaa');
        loadActiveEvents();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function deleteEvent(id) {
    if (!window._db || !checkAdminPermission()) return;
    const ok = await showConfirm('Eliminar Evento', '¿Terminar este evento ahora?');
    if (!ok) return;
    try {
        await window._fbDeleteDoc(window._fbDoc(window._db, 'events', id));
        showToast('Evento terminado ✓', '#00ffaa');
        loadActiveEvents();
    } catch(e) { showToast('Error: ' + e.message, '#ff4466'); }
}

async function renderAdminEvents() {
    const list = document.getElementById('admin-events-list');
    if (!list) return;
    if (!_activeEvents.length) {
        list.innerHTML = '<div class="empty-msg" style="color:var(--text-muted);">No hay eventos activos.</div>';
        return;
    }
    list.innerHTML = _activeEvents.map(e => {
        const t = EVENT_TYPES[e.type] || { label: 'Evento', icon: 'fa-star', color: 'var(--gold)' };
        const hoursLeft = Math.max(0, Math.ceil((e.endsAt - Date.now()) / 3600000));
        return `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid rgba(255,215,0,0.25);border-radius:12px;background:rgba(255,215,0,0.05);margin-bottom:8px;">
            <i class="fa-solid ${t.icon}" style="color:${t.color};font-size:16px;"></i>
            <div style="flex:1;">
                <div style="font-size:12px;font-weight:700;color:var(--gold);">${escHTML(e.title)}</div>
                <div style="font-size:10px;color:var(--text-muted);">${escHTML(t.label)} · ⏳ ${hoursLeft} h</div>
            </div>
            <button class="btn btn-danger" style="font-size:10px;padding:4px 10px;" onclick="deleteEvent('${e.id}')"><i class="fa-solid fa-ban"></i> Terminar</button>
        </div>`;
    }).join('');
}
