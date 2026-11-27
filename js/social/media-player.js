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
[00:54.00]I'll face the night` },

    { file: 'A-Wall - Loverboy (Who Got You Smiling Like That) Official Music Video Prod. bleu jetta.mp3', title: 'Loverboy (Who Got You Smiling Like That)', artist: 'A-Wall',
      lyrics: `[00:00.00]ご視聴ありがとうございました
[00:30.00]Yeah you can call me lover boy
[00:32.42]They say I throw my heart around
[00:36.38]And you can be my lover girl
[00:40.46]I'll pick you up, drive you around
[00:44.30]I'll show you how to fall in love
[00:48.56]We'll be the talk of all the town
[00:52.30]Now everybody wants to be like us
[00:58.06]That getting jealous, feel it now
[01:00.06]Oh wow
[01:02.06]Kill the light, so baby close your eyes
[01:06.06]The way you're looking at me
[01:08.06]You got me mesmerized
[01:10.06]Something I can't escapeFeel like I'm lost in spaceYou got tht that good lovin' Girl if you leave me I might throw my heart away
[01:20.08]You know my heart can't take a break Nothing will ever be the same
[01:28.08]We'll meet again some other day Oh yeah
[01:34.08]Oh yeah, it's such a shame
[01:36.48]Somehow the love came to an end
[01:40.28]You started talking to a tool
[01:44.42]You're telling lies to all your friends
[01:48.44]But you know damn well it should be me
[01:52.52]But I'm moving on, doing my best
[01:56.40]Now everybody whispers things about us
[02:01.94]You're hearing voices in your head, can't forget
[02:06.24]Kill the light, so baby close your eyes
[02:11.12]The way you're looking at me, you got me mesmerized
[02:15.00]Something I can't escape, feel like I'm lost in space
[02:19.14]You got that good loving, girl if you leave me I might throw my heart away
[02:24.42]You know my heart can't take the break Nothing will ever be the same We'll meet again some other day
[02:37.15]Oh yeah, oh yeah
[02:55.15]Kill the light, so baby close your eyes The way you're looking at me, you got me mesmerized
[03:02.15]Something I can't escape, feel like I'm lost in space You got that good lovin', girl if you leave me I might throw my heart away
[03:12.15]You know my heart can't take a break Nothing will ever be the same
[03:21.15]We'll meet again some other day
[03:24.45]Oh yeah, oh yeah
[03:27.85]Kill the light, so baby close your eyes
[03:31.11]The way you're looking at me, you got me mesmerized
[03:35.01]Something I can't escape, feel like I'm lost in space
[03:39.13]You got that good loving, girl if you leave me on my throne I'll throw my heart away You know my heart can't take a break Nothing will ever be the same
[03:52.47]Won't meet again so much again
[04:10.23]Say what you need, if you want I can leave
[04:16.25]Makes no difference to me, I don't blame you
[04:19.61]Oh get the fuck out my face, I don't have much to say
[04:24.09]No you can't get away, I don't blame you
[04:27.49]When I'm stuck in my cell, I just talk to myself
[04:31.97]No I made my own hell, I don't blame you
[04:35.31]Go ahead and say what you need, if you want I can leave
[04:39.87]It makes no difference to me, I don't blame you
[04:43.27]I'm solo, yeah
[04:45.33]I'm solo, yeah
[04:47.47]I'm solo, yeah
[04:49.45]I'm solo
[04:50.39]All my life was solo, yeah
[04:53.25]I'm solo, yeah
[04:55.35]I'm solo, yeah
[04:57.17]I'm solo, yeah
[04:59.27]Yeah` },

    { file: 'Aun Estas En Mis Suenos.mp3', title: 'Aún Estás En Mis Sueños', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Hoy desperté con un montón de marcas en mi piel
[00:24.30]Alguien por la noche me las dejó
[00:29.00]Quiero saber si esta fue la magia de tus labios
[00:38.90]Hay perfume de mujer brotando aquí
[00:46.26]El conjuro de un cuento de amor ya me atrapó, lo puedo sentir
[00:54.20]Y por las noches puedo sentir su calor
[01:04.20]Su dulce magia me hace perder la raz Y de mis sue creo que un d escap Para esconderse dentro de mi coraz
[01:40.77]¿Cómo escapar? Nada real, no importa conocer
[01:51.19]Solo esperaré hasta dormir
[02:00.89]Estoy aquí frente al gran espejo para convencer
[02:07.21]A los duendes que dirán cómo llegar
[02:14.21]Aprenderé el hechizo ideal
[02:18.21]Que junte los sueños con la realidad
[02:25.21]Y por las noches puedo sentir su calor Su dulce magia me hace perder la raz
[02:41.53]Y de mis sueños creo que un día escapó
[02:48.53]Para esconderse dentro de mi corazón
[03:18.53]Por las noches puedo sentir su calor
[03:41.41]Su dulce magia me hace perder la raz Y de mis sue creo que un d escap
[03:58.30]Para esconderse dentro de mi corazón
[04:12.30]Tú listas en mis sueños
[04:19.30]¡Oh no!
[04:27.30]Dentro de mi corazón
[04:42.30]¡Gracias!` },

    { file: 'Bunbury - El Triste (Videoclip Oficial).mp3', title: 'El Triste', artist: 'Bunbury',
      lyrics: `[00:00.00]Катриня
[00:30.00]Субтитры сделал DimaTorzok
[01:00.00]se ti los colores de gris hoy todo es soledad
[01:20.08]No sé si vuelvo a verte después, no sé qué de mi vida será.
[01:32.08]sin el dulcero azul de tu ser que no me alumbraría.
[01:46.34]Hoy quiero saborear mi dolor, no pido compasión ni piedad.
[01:59.34]La historia de este amor se escribió para la eternidad
[02:11.70]Qu triste todos dicen que soy que siempre estoy hablando de ti no saben que pensando en tu amor en tu amor
[02:35.40]He podido ayudarme a vivir
[02:41.40]He podido ayudarme a vivir
[02:48.40]Oh, oh, oh, oh
[02:59.40]Hoy quiero saborear mi dolor
[03:17.20]No pido compasión ni piedad
[03:25.14]La historia de este amor se escribi para la eternidad Qu triste todos dicen que soy que siempre estoy hablando de ti
[03:50.60]No saben que pensando en tu amor, en tu amor
[03:59.92]He podido ayudarme a vivir
[04:04.78]He podido ayudarme a vivir
[04:11.44]He podido ayudarme a vivir
[04:20.60]¡Suscríbete al canal!
[04:50.60]Gracias.` },

    { file: 'CALL THE DOCTOR.mp3', title: 'CALL THE DOCTOR', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Doctor x2
[00:08.40]Come with me
[00:10.08]Doctor x2
[00:18.68]Come with me
[00:19.80]Call the doctor, Call the doctor
[00:22.18]Must be something
[00:23.20]Come with me
[00:24.44]He's a monster
[00:25.60]Why do I want ya
[00:27.10]Oh, please tell me
[00:28.46]So you tell me, he's a monster
[00:30.36]He's a monster
[00:32.68]He's a motherfucking monster
[00:34.68]But I love him, yeah I love him
[00:39.58]He's right on stars
[00:41.82]Tell you're his own form of art
[00:44.32]He's doing his part
[00:46.66]Cause he's winning my heart
[00:49.36]There were no sparks
[00:51.14]Just we get the light fire
[00:52.16]Bring me through the dark
[00:53.44]And oh he's doing his part
[00:56.60]Cause he's running my heart
[00:58.04]And the blood is a human
[00:59.32]Just a monster
[01:00.44]I know he's what I'm
[01:03.16]I'm a mystery of him
[01:04.32]From disaster
[01:05.24]I know, I know
[01:08.52]Call the doctor, call the doctor
[01:10.94]I'm a monster, I'm a monster
[01:13.32]I'm a monster, what do I want you?
[01:16.18]Please tell me, please tell me
[01:18.58]You a monster you a monster You a motherfucking monster You love him you love him You the one I love you I love you Doctor Doctor Doctor Doctor Doctor Doctor
[01:32.23]Call the Doctor, Doctor, Doctor, Doctor, Doctor, Doctor, Doctor, Doctor
[01:36.89]Run with me
[01:38.01]Doctor, Doctor, Doctor, Doctor
[01:40.63]Doesn't really know how to try
[01:42.11]Cause the doctor is a place, the doctor is worth
[01:44.83]Don't get it, you never lost, and run with me
[01:47.77]I look like it's covered, shut up while I tell you
[01:51.17]How much you can't get this side, get this place, get the way
[01:54.59]Get the way you want, you know, books and the world
[01:57.33]And I see you come and talk to you, come and talk to you
[02:00.29]When you come and love, love, love, love, love
[02:02.71]You're so much to what to hold you
[02:05.13]Hold me down, hold me, hold me down
[02:07.33]Maybe you're sending me, you know
[02:10.05]I'll find you, not the fucking, I'm the fucking, you know
[02:14.37]He's weak, he's fresh, he doesn't really know how to dress
[02:41.29]He's a beast, he's a weird
[02:43.69]He never looks in the mirror` },

    { file: 'Cicada.mp3', title: 'Cicada', artist: 'MiPlaylist',
      lyrics: `[00:00.00]You're everything I'm thinking of from time to time and dust to dust
[00:18.24]Whenever there's a lull between the void
[00:21.86]You feel the silence, languid on the couch
[00:25.62]Think I need to figure this one out
[00:28.56]I'm last beneath your cloud
[00:31.04]Can I keep my two feet on the ground?
[00:34.78]Wait me, I'll love you tomorrow
[00:37.22]You leave me breathless and hollow
[00:39.92]Lately, my tough fail to swallow
[00:42.60]But I'll try to compose
[00:44.58]I could be, I suppose, someone you should get to know
[00:48.32]I could be, I suppose, someone you should get to know
[00:58.56]I could get lost in pillow dreams
[01:09.56]Caught in a stitch of what could be
[01:12.20]Careful life time's not what it seems
[01:14.90]To shake this one off and dance with me
[01:17.62]We dancing through the house I think we need to figure this one out Shaking like I lose sleep from the spout I think we need to think on this one Wait leave I love you tomorrow
[01:31.14]You leave, leave breathless and hollow
[01:33.86]Lately, the tough fail to swallow
[01:36.54]But I'll try to compose
[01:38.54]I could be, I suppose, someone you should get to know
[01:44.38]I could be, I suppose, someone you should get to know
[01:48.10]Wake me, I love you tomorrow
[02:14.30]You leave me breathless now
[02:16.94]Lately, a tough pill to swallow
[02:19.72]But outside of the boys
[02:22.14]I could be, I suppose, someone you should get to know
[02:25.60]I could be, I suppose, someone you should get to know
[02:31.48]Someone you should get to know
[02:46.94]Thank you.` },

    { file: 'Everytime We Touch (Radio Edit).mp3', title: 'Everytime We Touch', artist: 'MiPlaylist',
      lyrics: `[00:00.00]I still hear your voice when you sleep next to me
[00:08.42]I still feel your touch in my dream
[00:15.00]Forgive me my weakness, but I don't know why
[00:22.16]Without you it's hard to survive
[00:27.00]Cause every time we touch, I get this feeling
[00:31.90]And every time we kiss, I swear I could fly
[00:35.32]Can't you feel my heartbeat fast?
[00:38.02]I want this to last, need you by my side
[00:42.08]Cause every time we touch, I feel the static
[00:45.36]And every time we kiss, I reach for the sky
[00:48.86]Can't you hear my heartbeat slow?
[00:51.30]I can't let you go, want you in my life
[00:55.68]I'm not a man
[01:25.68]Your arms are my castle your heart is my sky
[01:44.92]They wipe away tears that I cry
[01:50.72]The good and the bad times, we've been through them all
[01:58.52]You make me rise when I fall
[02:04.06]Cause every time we touch, I get this feeling
[02:08.24]And every time we kiss, I swear I could fly
[02:11.66]Can't you feel my heart beat fast?
[02:14.40]I want this to last, need you by my side
[02:18.40]Cause every time we touch, I feel the static
[02:21.70]And every time we kiss, I reach for the sky
[02:25.18]Can't you hear my heartbeat so I can't let you go
[02:29.34]Want you in my life
[02:55.18]Cause every time we touch, I get this feeling
[03:02.30]And every time we kiss, I swear I can fly
[03:05.74]Can't you feel my heart beat fast?
[03:08.48]I want this to last
[03:10.00]Need you by my side` },

    { file: 'Hello Juliet.mp3', title: 'Hello Juliet', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Hello, hello, Julia
[00:30.00]I know the things I should have said
[00:37.00]Hello, hello, Juliet
[00:44.00]I know, I know, I know
[00:51.00]You're to my surprise, you come to me
[00:57.00]Let me make it right, just wait for me
[01:04.30]We can start this crash and then proceed
[01:10.80]Till I lose it all, you slip from me
[01:18.46]Hello, hello, Julia
[01:22.16]I know the things that shut upside
[01:29.54]I know, I know it's you in the eye
[01:36.70]I know I know I know Let me in again I need your place
[01:52.84]Don't you make me back, I'm on my knees
[02:00.12]I love you, I love you
[02:30.12]Hello, hello, Julia
[03:00.12]I know the things that you're your side
[03:06.06]Hello, hello, Juliet
[03:12.32]I know, I know, I know` },

    { file: 'Join Me In Death.mp3', title: 'Join Me In Death', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Baby, join me in death
[00:30.00]We are so young, our lives have just begun
[00:37.00]But already we are considering escape from this world
[00:45.00]And we've waited for so long for this moment to come
[00:54.00]We're so anxious to be together
[00:58.00]Together in death
[01:04.00]Won't you die tonight for you?
[01:08.00]Baby, join me in air
[01:12.00]Won't you die?
[01:16.00]Baby, join me in air
[01:20.00]Won't you die tonight for me?
[01:25.78]Join me, yeah
[01:28.78]This world is a cruel place and way
[01:37.12]Only to lose
[01:40.16]So before life tears us apart Let death bless me with you Won you die tonight for me
[01:54.37]Baby, you're in me
[01:58.37]Four years old
[02:02.37]Baby, you're in me
[02:06.37]Won't you die tonight for me?
[02:11.37]Baby, join me in the air
[02:15.73]Join me in the air
[02:20.19]This life ain't worth living
[02:31.41]This life ain't worth living
[02:39.89]You're a man, you're a man
[02:44.69]This life ain't worth living
[02:57.63]Won't you die till I fall in love?
[03:02.97]You're a man, you're a man
[03:05.69]For you darling
[03:10.69]Baby, join me in there
[03:14.69]For you darling, it's love for love
[03:18.69]Baby, join me in there
[03:22.69]Baby, join me in there
[03:35.69]Thank you.` },

    { file: 'Los Malaventurados No Lloran.mp3', title: 'Los Malaventurados No Lloran', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Música
[00:01.00]Sé que está en algún lugar mejor
[00:15.18]Donde no hay abuso
[00:18.06]Fuera de este mundo
[00:20.76]Quiero encontrar el medio para yo
[00:25.86]Poder hablar con ella
[00:29.16]Poder decirle a ella que aquí todo está peor
[00:37.72]Que al igual que ella mi voluntad también murió
[00:43.22]Le quiero platicar que todo sale mal
[00:48.88]Que yo la alcanzaría teniendo la oportunidad
[00:59.16]Sé que ella se siente mejor
[01:10.98]Allá no hay suplicio
[01:13.90]Sería muy impulsivo
[01:16.68]El utilizar el medio y llegar
[01:21.54]A lo desconocido
[01:25.02]Sentirla al lado mío
[01:27.98]Y decir que todo est peor que al igual que ella mi esperanza se muri La quiero abrazar que todo sea igual mi vida ya es tan gris que el dolor jam se marchar
[01:50.71]Me debería de acordar, debo yo recordar
[01:55.07]Y sentirse mejor es mejor no creer en el amor
[01:59.69]Así como le hago yo
[02:02.41]La debería de odiar por dejarme aquí
[02:06.07]Pero ella no escogió, soy un simple amante loco
[02:09.89]Yo he aprendido mi lección
[02:36.07]Sé que está en algún lugar mejor, donde no hay abuso, fuera de este mundo
[02:45.89]Quiero encontrar el medio para yo poder hablar con ella, poder decirle a ella
[02:57.09]Que aquí todo está peor
[03:02.87]Que al igual que ella, mi voluntad también murió
[03:08.33]La quiero saludar, a su oído suspirar
[03:13.99]Que mientras yo la extraño, mi vida desvanece más
[03:27.09]Gracias.` },

    { file: 'Narcisista por Excelencia.mp3', title: 'Narcisista por Excelencia', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Sabes que es la inseguridad
[00:26.26]Sabes lo que es sentir la soledad
[00:29.74]Mi peor error fue haber aceptado mi fealdad
[00:34.38]Porque ahora ya no tengo donde esconder el miedo
[00:37.90]Y el miedo sigue vivo, se la vive aquí conmigo
[00:40.80]Yo me baso en la apariencia con placer y sin conciencia
[00:43.76]Esperando que algún día tu atención fijes en mí
[00:48.30]Es por eso que ahora he visto así
[00:53.68]Quiero ser elegante y estilero hasta el fin
[00:59.52]No podré proyectarlo, me lo tengo que creer
[01:06.20]Suponiendo que en la gente la belleza es natural
[01:13.52]Pues belleza es la palabra que aún no logro concretar
[01:19.82]Disfraz, disfraz, narcisista artificial
[01:25.02]Disfraz, disfraz
[01:29.52]Es mental
[01:42.64]Cómo me peinar esta noche
[01:45.52]Qué ropa me combinará mejor
[01:48.64]Tener tu inter Convertirlo en amor Quisiera poder saber qu piensas ver bien o acaso me dio mal
[02:00.63]Sé que es patético, pero en mí es normal
[02:05.35]Suponiendo que en la gente la belleza es natural
[02:11.95]Pues belleza es la palabra que aún no logro concretar
[02:17.67]Disfraz, disfraz, narcisista artificial
[02:23.59]Disfraz, disfraz, todo lo que pasa es mental
[02:47.67]¡Suscríbete al canal!
[03:17.67]Suponiendo que la gente la belleza es natural
[03:26.61]Pues belleza es la palabra que aún no logro concretar
[03:32.99]Disfraz, disfraz, narcisista artificial
[03:38.21]Disfraz, disfraz, disfraz, disfraz mental` },

    { file: 'Nightcore - How Do You Do.mp3', title: 'How Do You Do', artist: 'Nightcore',
      lyrics: `[00:00.00]How do you do? You like me and I like you
[00:02.76]Come and take me by the hand, cause I wanna be your friend
[00:05.54]How do you do? You like me and I like you
[00:08.30]Say how do you do you do? How do you do you do?
[00:12.34]When I'm going on a summer holiday
[00:14.68]And my plane leads to a place so far away
[00:17.92]I'm so happy cause it's time to celebrate
[00:20.62]Oh I feel like I could dance
[00:22.44]Whoa, different people all around the door
[00:25.50]What to say when there's a stranger I will show
[00:28.98]That there is a way you can communicate
[00:31.64]Everybody understands
[00:34.48]How do you do?
[00:36.08]You like me and I like you
[00:37.36]Come and take me by the hand
[00:38.80]Cause I wanna be your friend
[00:40.18]How do you do?
[00:41.64]You like me and I like you
[00:42.96]Say, how do you, do you, do?
[00:44.54]How do you, do you, do?
[00:45.78]How do you, do you, do?
[00:47.20]You like me and I like you
[00:48.46]Come and take me by the hand
[00:49.88]Cause I wanna be your friend
[00:51.28]How do you do?
[00:52.72]You like me and I like you
[00:53.96]Say, how do you, do you, do?
[00:55.62]How do you, do you, do?
[00:58.98]It so easy when you want to make a friend When the sun is shining in a distant land There a certain feeling that surrounds your mind And you feel like you could dance When you going to the south of Africa
[01:33.83]To America or to Australia
[01:36.59]You'll be people of our colors and all kinds
[01:39.63]Everybody understands
[01:41.39]How do you do it?
[01:43.99]You like me and I like you
[01:45.25]Come and take me by the hand
[01:46.71]Cause I wanna be your friend
[01:48.07]How do you do it?
[01:49.55]You like me and I like you
[01:50.85]Say how do you do you do?
[01:52.23]How do you do, you do, how do you do
[01:54.95]You like me and I like you
[01:56.37]Come and take me by the hand
[01:57.83]Cause I wanna be your friend
[01:59.17]How do you do, you like me and I like you
[02:01.91]Say how do you do, you do, you do
[02:03.33]How do you do, you do
[02:04.71]How do you do, you like me and I like you
[02:07.51]Come and take me by the hand
[02:08.89]Cause I wanna be your friend
[02:10.25]How do you do, you like me and I like you
[02:12.99]Say how do you, do you, do
[02:14.39]How do you, do you, do
[02:15.77]How do you, do, you like me and I like you
[02:18.55]Come and take me by the hand
[02:20.01]Cause I wanna be your friend
[02:21.35]How do you do? You like me and I like you
[02:24.05]Say how do you do you do? How do you do you do?
[02:26.89]Bye.` },

    { file: 'Notion.mp3', title: 'Notion', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Sure it's a common notion, perpetual emotion
[00:18.00]But I don't need the comfort of any lies
[00:24.00]I've seen the ending
[00:26.80]And there's no ascending prize
[00:35.68]Oh, back when I was younger
[00:38.80]Was pulled by other youngsters
[00:41.76]And my unwielded
[00:43.60]Was short and driven with the earth
[00:47.68]Cause I don't see what they see
[00:50.72]Where's that the stare at me?
[00:53.76]I see a window, a limit, a limit, not at all
[01:23.76]If you could borrow
[01:28.58]After
[01:29.28]To carry on
[01:31.40]To that day Until I believe In my days Anymore To it a common ocean A patch of water
[01:43.76]I was singing
[01:45.12]But it's not what you signed up for
[02:02.56]I'm sure there won't always be sunshine
[02:08.22]When there's this momentary game of light
[02:15.46]Don't have to wait for such decades
[02:18.42]And get through the gates of a flame of space
[02:21.44]I'm sure there won't always be sunshine
[02:26.54]I see the world always in sunshine
[02:32.54]For you, it's been smiling to repeat my mind
[02:38.54]I could could cry for the unseen
[02:41.54]Look at I've been missing
[02:44.54]Gotta shine in seconds
[02:47.54]Like five, breaking
[02:50.54]You think you're over, you're burning
[02:54.54]Is all the future great
[02:57.44]To die in the country's birthright` },

    { file: 'Paparazzi (Dubstep) (Sped Up - Nightcore).mp3', title: 'Paparazzi (Dubstep) (Sped Up / Nightcore)', artist: 'MiPlaylist',
      lyrics: `[00:00.00]We are the crowd
[00:07.66]We're coming out
[00:09.18]Got my flash on his true
[00:10.74]Need the picture of you
[00:12.38]It's so magical
[00:13.66]We'd be so fantastical
[00:17.10]Leather and jeans
[00:20.14]Garage love of us
[00:21.66]Not shining rings
[00:23.26]But this photo of us
[00:24.84]They don't have a price
[00:26.56]Ready for those flashing lights
[00:29.62]Cause you know what baby I am
[00:31.60]I'm your biggest fan, I'll follow you until you love me
[00:35.30]Paparazzi, baby there's no other super star
[00:40.02]You know that I'm free, paparazzi
[00:43.66]I'm gonna fall behind, but I won't stop until everybody's mine
[00:49.16]Baby, you'll be feeling the chase, you know until you love me
[00:54.02]Paparazzi, paparazzi
[00:59.62]I'll be your girl, backstage at your show
[01:05.26]Tell the rules and get us
[01:06.88]Yeah, cause you're my backstar in between the sets
[01:10.10]Eyeliner and cigarettes Shadow is burnt yellow dancing we turn My lashes are dry purple tears you sick all you don have a risk
[01:22.64]Loving you is a child we've been
[01:25.56]Cause you're all about the ice
[01:27.48]I'm your biggest boy, I follow you, I tell you know me
[01:31.38]Purple, purple, I see
[01:33.64]Baby, there's no other superstar you know that I'll be
[01:37.58]Purple, purple, I see
[01:39.90]Promise I'll be kind, but I'll stop until everybody's blind
[01:45.26]Baby, you'll be paying a chase, you don't until you love me
[01:50.12]Papa, Papa, let me see
[01:52.42]Be your girl, we dance in the studio
[01:55.44]Snap, snap, do that shit on the radio
[01:58.60]Don't stop, don't let you run
[02:01.50]We're a plastic bottle
[02:03.38]I'm your biggest boy, I'll follow you until you love me
[02:08.80]Papa, Papa Ritchie
[02:11.08]Baby, there's no other soup
[02:13.10]I start in all that I'll be
[02:14.98]Papa, Papa Ritchie
[02:17.34]Promise I'll be fine
[02:19.54]But I'll stop until I'm going to die
[02:22.64]Baby, you'll be famous
[02:25.24]If you don't tell you love me
[02:27.50]Papa, Papa Ritchie` },

    { file: 'Procedimientos para Llegar a un Comun Acuerdo.mp3', title: 'Procedimientos para Llegar a un Común Acuerdo', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Yo sé que soy poco superficial
[00:06.80]Y que me manejo en la promiscuidad
[00:12.80]Sé que quieres yo también
[00:15.16]Te pongo a saber cómo me fijas bien
[00:18.36]Sé que eres prudencia en el de la vida
[00:20.86]Y con elegancia ya te lo haré
[00:25.00]Sé que me quieres tener
[00:28.36]Y yo te prometo, promesa no hablarte de amor
[00:35.68]Me quiero esconder, tu cuerpo es como un mal sin instrumental
[00:43.00]Lo quiero con todo respeto a tu altar
[00:48.28]Ah, tú no me olvides, yo preguntar
[00:56.28]¿Dónde vives y cómo te gusta?
[01:00.58]Tengo que verte, te tienes que saber
[01:03.06]Que igual no estaré a la mesa
[01:06.02]Creo que solo te quiero para una vez
[01:09.38]Pero sabes que no es esta la madre
[01:13.10]Sé que me quieres tener
[01:16.62]Y yo te prometo, prometelo en el teléfono
[01:23.68]Me quieres tener, tu cuerpo es como una alcibe instrumentaria
[01:31.88]Lo quiero con todo respeto bajen Senza la opresi en ti
[01:53.82]Senza, no tengo nada así
[01:59.82]El incenso, la emoción del incenso
[02:06.82]El mundo del incenso
[02:12.82]Saberte y te tienes que saber
[02:14.82]Que igual no estaré al amanecer
[02:17.82]Crees que solo te quiero para una vez
[02:20.82]Pero sabes que dos estaría bien
[02:24.82]Sé que me quieres tener y yo te prometo, prometa no hablarte de amor
[02:35.70]Me quieres tener, tu cuerpo es como una de sin instrumentaria
[02:43.88]Lo quiero con todo respeto faltar
[02:54.82]¡Suscríbete al canal!` },

    { file: 'Psycho Dreams.mp3', title: 'Psycho Dreams', artist: 'MiPlaylist',
      lyrics: `[00:00.00]А-а-а!
[00:30.00]Дальше ты лезвь не дар, а я исчезну навсегда
[00:33.14]Никит, никит, никит, никит, никит
[00:35.00]Добридуманных людей
[00:36.50]Я хочу, хочу, не слышать
[00:38.36]Добридуманных людей
[01:00.00]DimaTorzok
[01:32.50]Я сражусь у моих сердца, Кровая моя звезда,
[01:36.74]Обещать в них стена, Я исчезну навсегда.
[01:40.08]Крики, крики, крики, крики, На виду малых людей.
[01:43.38]Я хочу, хочу не слышать, Но приду малых людей.
[02:02.50]Субтитры сделал DimaTorzok` },

    { file: 'Puppy Princess.mp3', title: 'Puppy Princess', artist: 'MiPlaylist',
      lyrics: `[00:00.00]You know me as your boyfriend's goofy friend
[00:23.84]I seem to have this effect on women
[00:27.50]And your friends aren't as goofy as I am
[00:31.60]I try my best to keep you entertained
[00:39.38]Always laughing at the jokes you are saying
[00:43.48]I nod my head when you make a point
[00:47.72]Oh-oh
[00:49.38]Kiss me, kiss me with your eyes closed
[00:56.80]Whisper that your heart shows All I want is you Yeah you Come on now hold me hold me
[01:08.93]I'm your bunny, tell me I'm not funny
[01:15.93]Tell me I'm legit
[01:20.93]Because I feel weak in your hands
[01:27.79]And your feet are precious
[01:30.15]And I'll never feel your touch
[01:36.19]You guys came to the restaurant where I clean
[01:42.51]I saw you in the window, I got flushed
[01:46.71]I rushed outside and cracked some jokes
[01:50.61]And in a while I came and got your plates
[01:58.41]And you guys worked on the rest of your date
[02:02.31]I scrubbed cheese and wished I was somebody else Kiss me kiss me with your eyes closed
[02:15.45]Whisper that your heart chose
[02:19.23]All I want is you, yeah you
[02:23.93]Come on now hold me, hold me I'm your bunny
[02:30.37]Tell me I'm not funny
[02:34.49]Tell me I'm legit
[02:37.79]Cause I feel weak
[02:43.67]And your hands and your feet are precious
[02:48.87]And I'll never feel your touch
[02:54.93]I'm a fool
[02:57.79]I'm a fool
[03:01.59]I'm a fool
[03:05.49]I fall for you
[03:27.80]Kiss me, kiss me with your eyes closed.
[03:33.80]Whisper that your heart chose
[03:37.90]All I want is you, yeah, you
[03:42.72]Come on now hold me, hold me
[03:47.12]I'm your bunny, tell me I'm not funny
[03:53.16]Tell me I'm in jail
[03:56.32]Kiss me, kiss me
[04:02.80]With your eyes closed
[04:05.50]Whisper that your heart chose
[04:09.36]All I want is you` },

    { file: 'Shakedown.mp3', title: 'Shakedown.', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Music
[00:30.00]Blacked out
[00:31.00]So this is not a shutdown
[00:33.00]We just got a color but I'm pushing that face down
[00:35.00]You're coming when it's right now
[00:38.00]We just got a color but I'm holding a sound blacked out
[00:40.00]You're doing alright, you're doing just fine
[00:43.00]That's what I tell myself until it makes me wanna die
[00:46.00]The anger that's inside could take another swab
[00:48.00]I try to meditate but it's the truth of mine
[00:50.00]I do not understand my brain
[00:52.00]Just because I hate it, I don't mean anything to say
[00:54.00]Or worse because you hate it, I'm not the man I could be
[00:57.00]Nah, I'm tweaking out, quit tweaking out!
[00:59.00]Quit drinking out, hey!
[01:01.00]Sir, this is not a shutdown
[01:03.00]We just got a color but I'm pursing like face down
[01:06.00]You coming when it right now We just got a color but I hold this out and break out Son it not a shutdown We just got to come up on a pussy like face down You coming when it right now
[01:18.46]We just got to come up on a horse and I'm blacked out
[01:20.98]I don't want these problems, but they're mine
[01:23.58]Feel like I'm two people at the same time
[01:26.28]Popping to get rid of all the eight
[01:28.28]And then they're popping up with the brakes
[01:30.74]When I don't understand my brain
[01:32.08]Just because I have it
[01:33.28]Don't mean anything to say
[01:34.56]that works because I'm not the man I could pay
[01:37.30]Nah, I'm tweaking out
[01:39.28]Quit tweaking out
[01:42.14]So this is not a shutdown
[01:43.80]We just got a cover but a purser late face down
[01:47.24]You're calming when it's right now
[01:48.90]We just got a cover but our whores out
[01:51.70]So this is not a shutdown
[01:53.44]We just got a cover but our purser late face down
[01:57.04]You're plumbing when it's right now
[01:58.38]We just got a cover but our whores out
[02:00.72]RANKED OUT
[02:04.56]I'm going to go.` },

    { file: 'Tu Con El.mp3', title: 'Tú Con Él', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Seguro mujer
[00:28.24]Que hoy eres feliz, que nada de ayer hoy te hace llorar
[00:35.20]Tú con él, el tiempo corre, yo te espero pero tú con él
[00:47.30]Ya no recuerdas mis locuras ni el amor aquel
[00:54.88]Estás tranquila, lo mereces, siempre fuiste bien
[01:02.72]Tú con él
[01:07.82]No me sorprende sospechaba terminar as Yo solamente fui la excusa para hacerle ver
[01:22.59]Que tú podrías si querías vivir sin tu amor
[01:30.79]Perdóname, no me di cuenta de ese juego
[01:39.99]y me enamoré
[01:42.77]Después fue tarde
[01:46.31]no podía ya volver atrás
[01:50.45]y te quería
[01:53.75]cada día más y más
[02:09.99]Seguro mujer que hoy eres feliz
[02:19.07]Que puedes hacer lo que quieras
[02:23.73]T con Ya me han contado que est linda mucho m que ayer
[02:36.17]Que no me odias y preguntas siempre algo de mí
[02:44.03]Al fin y al cabo un poquito yo me hice querer
[02:50.95]Disculpame
[02:56.17]Aquellos celos tan intensos que sentí por ti
[03:04.47]Estaba loco, casi loco por aquel amor
[03:12.59]Que al poco tiempo para siempre lo perdí
[03:18.39]Aún recuerdo el romance que viviste conmigo
[03:31.97]Yo sé que jugaste con mis sentimientos
[03:37.01]Todo fue un juego que tuviste conmigo Pero en ese juego yo me enamor Tu con Yo no me di cuenta escucha mujer
[03:51.90]Tu con él
[03:53.50]Pero te lo juro mamita desperté
[04:11.06]Música
[04:32.06]Tú, con él
[04:33.84]Ya no recuerdas mis locuras y el amor aquel
[04:37.28]Tú, con él
[04:38.76]Yo solamente fui la excusa para hacerle ver
[04:42.32]Don con él
[04:43.82]Que tú podías y tú querías vivir sin él
[04:47.50]Don con él
[04:48.86]En el juego del amor unos vienen y otros van` },

    { file: 'When The Devil Speaks.mp3', title: 'When The Devil Speaks…', artist: 'MiPlaylist',
      lyrics: `[00:00.00]I know we don't stop, till we stop
[00:30.00]I'm gonna be starting and I'll stop and live
[00:32.00]I'm gonna be on
[00:35.00]Have you ever felt like you're a dummy on the hook?
[00:38.00]Have you been addicted to the taste of your blood?
[00:41.00]Feel like my whole life I've just been trying to find a love
[00:43.00]I don't stand down the bell if you sell me I don't cut
[00:46.00]I don't wanna quit, I take some shit and make me feel
[00:49.00]Cause every day I wake up it's a sh-sh-sh-sh-poo
[00:52.00]I just hope my family doesn't see this thing go
[00:54.00]Go, uh
[00:57.00]Don't care, one T, it's C'est la vie
[01:02.00]Out here, trippin' off the shit that I don't know
[01:05.00]Cause I don't care, hitin' off the light
[01:07.00]If I ain't sleep, then I can hear
[01:09.00]Stay on me, or leave me be
[01:12.00]I don't care, cause no one hating me more than myself
[01:16.00]And I'm aware, I don't need no counsel, bitch, I need your fucking breath
[01:19.00]So if I can't, the devil speaks
[01:21.90]He says to me, oh man
[01:25.90]I feelin somethin wrong inside of your head I know we lay poor cause we not fuckin ain doing fair I know we lay poor cause we not fuckin ain doing fair I know we lay poor cause we not going wrong inside your head
[01:53.96]y'all,
[01:54.16]I'm chewing on the same old piece of gum
[01:56.16]I know you've been moving out your mind as to and from
[01:59.16]But when that deletes will change your colors, but
[02:01.16]And I was standing on the ledge and acting like a white tongue
[02:04.16]Till I shoot that shit and blow it up and make me ooh
[02:07.16]Tell my mama, tell me stop
[02:09.16]Now I'm cool, took that shit and now I need another to go
[02:15.16]Oh, then what he said
[02:17.16]So put a gun into my head
[02:20.16]Oh, yeah, and I will talk a shit I like
[02:22.16]I like this step, I need to tell
[02:24.16]I don't need no counselor, bitch, I need your fucking
[02:26.36]The devil speaks, he says to me
[02:31.56]Oh man, I feelin' something wrong inside of your head
[02:36.96]I know we let go, cause we not talkin' at you and fair
[02:39.86]I know we let go, cause we not blow each other
[02:42.46]I know we don't stand, cause we stop right at us, never let go
[02:45.66]We go, we go, we go, we go, we go, we go, we go
[02:48.16]I know we let go, cause we not talkin' at you and fair
[02:50.96]I know we ain't loved if we not know each other
[02:53.60]I know we don't stop till we start
[02:55.62]And I'll never let you go
[02:57.18]Yeah, we go on` },

    { file: 'let me go.mp3', title: 'let me go', artist: 'MiPlaylist',
      lyrics: `[00:00.00]Life!
[00:00.68]Go!
[00:11.20]It's been running through my head
[00:13.82]All the things I could've said
[00:16.38]If I did, you wouldn't listen
[00:18.86]So I'll say things till I'm dead
[00:21.66]Doesn't even matter anymore
[00:25.00]Stopping this feeling in my core
[00:27.70]Something that I never felt before
[00:29.98]I don't wanna let it go
[00:31.60]I don't wanna talk about it
[00:33.70]I feel it right when the stars are around
[00:36.50]Put a chance over my mind
[00:38.96]I'm feeling it, I scream and shout
[00:41.36]But when I'm trying, it won't come out
[00:44.64]Would anybody hear me?
[00:47.84]Would anybody hear me if I try?
[00:50.72]If I'm screaming for my life
[00:53.00]When I'm meeting for a sight
[00:55.50]Can you show me it's alright?
[00:59.98]I think I make it to the top It been running through my head All the things I could said
[01:26.75]If I did, you wouldn't listen So save me till I'm dead
[01:32.03]Doesn't matter anymore
[01:35.47]So I'm just feeling in my core
[01:38.07]Something that I've never done before
[01:40.53]Won't let me go
[01:41.81]But I'm not going to tell
[01:44.87]But I'm not going to wait for you
[01:46.81]Running through my head
[01:49.37]All the things I could have said
[01:51.77]If I did, you wouldn't listen
[01:54.31]So I'll say this is the day
[01:57.13]Doesn't even matter anymore
[02:00.49]I'm feeling my cold, feeling my love for the world` },

    { file: '- 9Lana cover.mp3', title: 'プロポーズ/ 9Lana cover', artist: 'MiPlaylist',
      lyrics: `[00:00.00]例えば君が明日死ぬなら
[00:05.84]僕は今から笑って飛び込めるだろう
[00:11.82]二人以外の時間を思うと
[00:17.48]どうしようもないほど胸が痛くなるよ
[00:23.30]ねえもそんなね強がるくせ
[00:25.96]抱き合う時は甘くなる
[00:28.64]恋も全部全部もう僕だけがいい
[00:31.58]苦しいよ
[00:34.70]お願い
[00:36.70]君はずるいずるいずるいずるいずるい
[00:41.30]人だわ
[00:42.94]わがままな君の中で
[00:46.68]綺麗に腐ったわ
[00:49.14]聞いて聞いて聞いて聞いて聞いて聞いてよ
[00:54.40]お願い優しく抱いて
[00:58.40]優しく抱いて
[01:01.20]優しく抱いて
[01:14.80]仕方がないと
[01:17.40]分かっているけど
[01:20.60]この愛しさを
[01:23.20]独り占めしたいよ
[01:26.20]他の誰かの頭の中に
[01:31.90]君がいるのなら笑顔で潰して回ろう
[01:37.52]好き嫌いもそう少し歩いても
[01:40.28]顔を汚すとちょっと怒るところも
[01:43.48]全部全部もう僕だけがいい苦しいよ
[01:48.36]お願い
[01:50.48]君はずるいずるいずるいずるいずるい人だもん大丈夫は君の中で醜く育ったんだ
[02:03.41]言ってきてきてきてきてきてよ
[02:08.59]お願い激しく泣いて
[02:12.59]激しく泣いて
[02:15.49]激しく泣いて
[02:18.33]歯止めのないもんぞ
[02:21.63]どうぞ言えないことも全部したいよ
[02:29.63]可愛いその表情で僕のことを殴って
[02:39.63]壊して
[02:46.63]君はずるいずるいずるいずるいずるい人だもん
[02:56.63]わがままな君の中で綺麗に腐った場所
[03:02.63]聞いて聞いて聞いて聞いて聞いて聞いてよ
[03:07.63]お願い優しく抱いて優しく抱いて
[03:14.63]優しく抱いて
[03:17.63]僕を壊して
[03:37.63]君が壊して
[03:44.63]ご視聴ありがとうございました` },

    { file: '505.mp3', title: '505', artist: 'Mix',
      lyrics: `[00:00.00]I'm going back to 5.05
[00:15.50]If it's a 7 hour flight or a 45 minute drive
[00:23.50]In my imagination you're waiting lying on your side
[00:30.06]With your hands between your thighs
[00:40.78]Stop and wait a sec
[00:43.58]When you look at me like that my darling
[00:47.66]What did you expect?
[00:50.46]I'd probably still adore you with your hands around my neck
[00:57.06]Or I did last time I checked Not shy of a spark
[01:10.98]The knife twists up the thought
[01:14.00]That I should fall short of the mark
[01:17.86]Frightened by the fight
[01:20.86]Though it's no harsher than the park
[01:24.62]The middle of adventure is such a perfect place to start
[01:31.70]I'm going back to 5.05
[01:37.70]If it's a seven hour flight or a 45 minute drive
[01:45.06]In my imagination you're waiting lying on your side
[01:52.02]With your arms between your sides
[02:01.79]guitar solo
[02:31.79]To cry
[02:32.95]It seems like once again
[02:35.97]You've had to
[02:37.15]Read me with goodbye
[02:39.55]I'm always just about to go
[02:43.65]Unspoiled surprise
[02:46.41]Take my hands off of your eyes
[02:49.99]Too soon
[02:51.17]I'm going back to 505
[03:00.41]If it a saddle I will fly toward a 45 drive In my imagination you waited Lying on your side With your arms
[03:15.59]Between your thighs
[03:17.43]And a smile
[03:35.19]Thank you.
[04:05.19]The End` },

    { file: 'An Italian Magician Be Like.mp3', title: 'An Italian Magician Be Like', artist: 'Mix',
      lyrics: `[00:00.00]I don't care for you anymore
[00:14.80]I don't beg like a dog on the floor
[00:30.00]I don't love you anymore
[00:57.22]I feel, see your face behind closed doors
[01:07.64]I hate your face
[01:27.22]Please let me sleep
[01:49.40]Cause I'm tired
[01:57.22]Thank you.` },

    { file: 'Ax and the Hatchetmen - Hotel Room (Tour Edit).mp3', title: 'Hotel Room (Tour Edit)', artist: 'Ax and the Hatchetmen',
      lyrics: `[00:00.24]So much to tell you, hold up in this hotel room
[00:06.02]Can't do the things I want to, I've been climbing the walls
[00:11.56]And I just can't get used to, not being right next to you
[00:17.64]Not wearing half your perfume, while I'm singing your song
[00:24.26]And I hate, that you're so far away
[00:28.76]And I just wanna find myself in the middle of you
[00:33.52]I'm all tied up in the middle of you
[00:36.44]I hate that you're so far away
[00:40.40]And I just wanna find myself in the middle of you
[00:45.18]I'm all tied up and there's so much to tell you
[00:49.88]Hold up in this hotel room
[00:52.82]Can't do the things I want to
[00:55.66]I've been climbing the walls
[00:58.40]And I just can't get used to
[01:01.58]Not being right next to you
[01:04.48]Not wearing half your perfume
[01:07.30]While I singing your song And I hate that you so far away And I just wanna find myself
[01:19.13]in the middle of you
[01:20.33]I'm all tied up in the middle of you
[01:23.23]I hate
[01:24.39]that you're so far away
[01:27.21]And I just
[01:28.83]wanna find myself
[01:30.75]in the middle of you
[01:31.93]I'm all tied up in this
[01:38.87]And I hate that you're so far away
[02:02.81]And I just wanna find myself in the middle of you
[02:07.29]I'm all tied up in the middle of you
[02:10.21]I hate that you're so far away
[02:14.19]And I just wanna find myself in the middle of you
[02:18.97]I'm all tied up in the middle of you` },

    { file: 'Boys Dont Cry.mp3', title: 'Boys Don\'t Cry', artist: 'Mix',
      lyrics: `[00:00.00]I would say I'm sorry
[00:30.00]I know that this summer has said too much been too unkind
[00:35.00]I try to laugh about it, cover it all up with lies
[00:40.34]I try to laugh about it, hiding my tears in my eyes
[00:45.84]Cause boys, don't cry
[00:49.82]Boys, don't cry
[00:56.28]I'll break down at your feet and beg forgiveness, plead with you
[01:03.58]But I know that it's too late and now there's nothing I can't do
[01:09.28]So I try to laugh about it, cover it all up with lies
[01:14.60]I try to laugh about it hide in the tears in my eyes Cause boys don cry Boys don cry
[01:30.56]I would tell you that I loved you if I thought that you would stay
[01:37.86]But I know that it's no use that you already gone away
[01:43.60]Missed out your limit, pushed you to fall
[01:48.60]To give it granted, thought that you'd ever be my mama
[01:54.60]Now I would do most anything to get you back by my side
[01:59.60]But I just keep on laughing, hiding my tears in my eyes
[02:05.60]Cause boys, don't cry
[02:10.60]Boys don't cry
[02:15.60]Boys don't cry
[02:40.60]Thank you.` },

    { file: 'CUCO - Lover Is a Day (Audio).mp3', title: 'Lover Is a Day', artist: 'CUCO',
      lyrics: `[00:00.00]The
[00:30.00]Time change, we're different
[00:45.50]But my mind still says redundant things
[00:49.28]Can I not think?
[00:51.86]Will you love this part of me?
[00:54.34]My lover is the day I can't forget
[00:58.98]Furthering my distance from you
[01:07.18]Realistically I can't leave now
[01:11.18]But I'm okay as long as you keep me from going crazy
[01:18.28]Keep me from going crazy
[01:23.56]Straight up ahead you'll find a sign that says you can't get by with a lie
[01:35.20]But if I stayed away by a thread from the glory path
[01:41.00]And made my life harder lying about the stupid shit I say
[01:46.30]Then you wouldn know a single thing about how I feel about you And those really dumb things people feel I take the puppy road it probably break my legs
[02:02.00]As long as I don't show you what's ruining my head
[02:07.00]Funny thing about you is you read me pretty well
[02:12.00]But you haven't found me yet at the bottom of the well
[02:18.00]Annoying you with smoke signals
[02:21.14]Asking you for help
[02:23.20]Cause your immediate presence lifts me straight away from hell
[02:28.44]Me and Mr. Hart
[02:31.22]We say the cutest things about you
[02:34.56]How you seem unreal
[02:36.40]We'd probably die so quick without you
[02:39.84]Suffocated from the radiated air around us
[02:44.62]Full of happiness
[02:46.06]We don't have brightness
[02:47.76]Gone so dark without you, girl
[02:50.38]Time change, we're different
[02:53.50]But my mind still says redundant things
[02:57.28]Can I not think?
[02:59.86]Will you love this part of me?
[03:03.00]My lover is
[03:04.74]The day I can't forget
[03:07.20]Furthering my distance from you
[03:15.16]Realistically I can't leave now
[03:19.16]But I'm okay as long as you keep me from going crazy
[03:26.28]Keep me from going crazy
[03:31.60]Family calls me crazy
[03:35.14]And my friends say I'm degenerate
[03:37.96]But you tell me I'm so generous
[03:40.62]And my self isn hideous This psychedelic campus of the person I becoming Went from horror movie on TV To happy ending princess me
[03:54.24]Processing the information
[03:57.00]Transferred from your mind to me
[03:59.62]At light speed like the fountain
[04:01.72]From the original Star Wars trilogy
[04:04.74]Feeling like a fail me
[04:07.52]When I was six and no worries
[04:10.26]To stop me from reaching the stars a million miles away from me
[04:15.60]Sick in the head for ya, and no cure has been discovered
[04:20.40]Like a plague hitting my body, except if I fall, I'm just falling for ya
[04:26.50]Conscious beyond knowledge, alterations are acknowledged
[04:31.10]And the beauty you inflicted is always in its action
[04:36.60]Lovely day to day, perfect time to open up to you
[04:42.24]But I know that you're having fun with one
[04:45.62]I messed this up for you, but I'm happy that you're happy
[04:50.42]At least I do that much for you, always glad you're with me
[04:55.26]This emotion will be gone before you
[04:58.48]Time change, we're different
[05:01.48]But my mind still says redundant things
[05:05.26]Can I not think
[05:07.34]Will you love this part of me
[05:10.40]My lover is
[05:12.74]The day I can't forget
[05:15.24]Furthering my distance from you
[05:23.28]Realistically I cannot leave now
[05:27.16]But I'm okay as long as you keep me
[05:31.96]From going crazy
[05:34.22]Kidney from going crazy Girl time change we different But my mind still says redundant things
[05:47.94]Can I not think
[05:50.00]Will you love this part of me?
[05:53.66]My lover is
[05:55.40]The day I can't forget
[05:57.84]Furthering my distance from you
[06:05.92]Realistically, I can't leave now
[06:09.84]But I'm okay as long as you keep me from going crazy
[06:16.96]Keep me from going crazy
[06:35.92]Thank you.
[07:05.92]Thank you.
[07:35.92]Thank you.` },

    { file: 'Christmas Kids.mp3', title: 'Christmas Kids', artist: 'Mix',
      lyrics: `[00:00.66]Run up my dear, don't ever disappear
[00:03.96]Do what you want, as long as you stay here
[00:07.06]I need you now, I love you so much more than you could know
[00:12.64]The Christmas gift, we're nothing but a gift
[00:16.62]And love is a town where all of us can live
[00:19.74]You'll change your name, you'll change your mind
[00:22.92]And leave this fucked up place behind
[00:25.86]But oh no, oh no, oh no, oh no, oh no, oh no, oh no, oh no, oh no, oh no, oh no
[00:39.24]Appearing unsightly, with devils inside me
[00:46.60]Don't try to leave me, I'll find you right
[00:52.54]If you have tried to believe that I want you running I leaving feel I leaving now
[01:18.25]I'm going to escape but you won't know how
[01:21.29]Or where to find me when I'm gone
[01:24.39]I'll drink myself to death inside
[01:28.05]This bruising sound
[01:32.01]This frees the sound
[01:36.01]Yeah, yeah, yeah
[01:40.01]Yeah, yeah, yeah
[01:44.01]Yeah, yeah, yeah
[01:48.01]You change your name, or change your mind
[01:52.01]And leave this far-and-touch place behind
[01:56.01]But I know, I know
[02:00.01]Oh, no.` },

    { file: 'Clarion - Hello Juliet (Official Music Video).mp3', title: '＂Hello Juliet＂', artist: 'Clarion',
      lyrics: `[00:00.00]Hello, hello, Julia
[00:11.02]Hello, hello, hello
[00:18.02]Hello, hello, Julia
[00:24.94]I know the things I should have said
[00:32.52]Hello, hello, Juliet
[00:38.82]I know, I know, I know
[00:46.70]You're to my surprise, you've come to me
[00:55.56]Let me make it right, just wait for me
[01:02.52]We can stop this breath and then proceed
[01:09.14]Till I lose it all, you've slipped from me
[01:16.56]Hello, hello, Julia
[01:20.46]I know the things that shut upside
[01:27.76]Hello, hello, Julia
[01:34.28]I know I know I know Let me in again I need you please
[01:51.63]Don't you make me beg
[01:54.63]I'm on my knees
[01:57.63]I'm not here to me
[02:08.63]I'm not here to me
[02:15.63]I'm not here to me
[02:22.63]I'm ready to leave you
[02:52.63]Hello, hello, Juliet
[02:56.83]I know the things that show your sight
[03:04.29]Hello, hello, Juliet
[03:10.63]I know, I know, I know
[03:22.63]you` },

    { file: 'Dominic Fike Babydoll (Official Audio).mp3', title: 'Dominic Fike ＂Babydoll＂', artist: 'Mix',
      lyrics: `[00:00.00]I can't move on, baby doll
[00:14.00]Waitin' on the call, slippin' through stations
[00:17.00]I'm out of class and it's outrageous
[00:19.72]I'll take it all, baby doll
[00:25.44]Whatever's been waitin' you down
[00:30.00]Find me on Miami Concrete
[00:37.48]Looking for somebody different cause my daddy was a pimp
[00:40.32]My mama had issues but I miss it anyway
[00:43.20]Oh baby, don't
[00:45.50]Please don't call me for the wrong reason
[00:49.18]We both know exactly what I'm thinking
[00:51.96]Weeks pass and I never grow tired
[00:54.64]Cause I never said never and I barely ever lie
[00:57.46]I'm on the road to an original place
[00:59.72]And out of space, I didn't make it up
[01:02.44]But you can't find it on a phone or a globe
[01:05.48]And I can take you with me if you really wanna go
[01:08.64]Baby doll, I can't move on
[01:13.90]I can't move on, baby doll
[01:16.90]Waitin' on the call, strippin' through stations
[01:19.88]I'm out of class, it's outrageous
[01:22.52]I'll take it all, baby doll
[01:28.30]Whatever's been waiting you down` },

    { file: 'Freaks.mp3', title: 'Freaks', artist: 'Mix',
      lyrics: `[00:00.00]Don't kill me
[00:25.00]Tell me run away
[00:27.80]For everyone
[00:30.00]I need a place to stay
[00:33.16]I can't cover up my face
[00:38.48]Don't cry
[00:41.12]I am just a pig
[00:43.56]I am just a pig
[00:48.88]I am just a pig
[00:55.00]I'm just a friend
[01:08.53]My head is filled with parasites
[01:26.57]Black holes covered up my eyes
[01:32.05]I drink with you almost every night
[01:37.33]Pull, pull, pull
[01:39.73]Don't wake up this time
[01:42.71]Don't wake up this time
[01:47.99]Don't wake up this time
[01:53.85]Don't wake up this time
[02:07.33]I'm out.` },

    { file: 'Hers - Harvey (Official Audio).mp3', title: 'Harvey', artist: 'Her\'s',
      lyrics: `[00:00.00]Девочка-пай
[00:30.00]Субтитры сделал DimaTorzok
[01:00.00]Субтитры сделал DimaTorzok
[01:30.00]DimaTorzok Do you wanna know who it is Or again here in the end Do you wanna see who it is
[01:50.58]You don't know me
[01:51.58]Nobody, nobody knows what I see
[01:56.58]Nobody knows I'm waiting
[01:59.58]Waiting for me to come
[02:04.58]Nobody, nobody knows what I see
[02:09.58]Everyone thinks I'm crazy, crazy, oh boy
[02:16.58]I think nobody knows what I see
[02:36.84]Everyone thinks I'm crazy, crazy to you, oh boy
[02:43.56]Honey, nobody knows what I see
[02:50.46]Nobody knows I'm waiting, waiting for you to come
[02:57.30]Honey, nobody knows what I see
[03:04.08]Everything's so crazy, crazy
[03:08.96]Oh oh` },

    { file: 'INOHA - Seventh Heaven (Official Tour Lyric Video).mp3', title: 'Seventh Heaven', artist: 'INOHA',
      lyrics: `[00:00.00]Oh won't you stay for the ride?
[00:03.10]Cause all the views will be nice
[00:05.40]Land the stories that we'll tell our friends
[00:08.66]We'll make him laugh until the party ends
[00:11.66]Oh won't you stay for the ride?
[00:15.10]It's two or two
[00:17.30]Let's turn his head into a living
[00:19.98]We'll make you drop the seventh heaven
[00:30.00]Shopping cards and chronic pain
[00:39.32]I'm not years old but drinking age
[00:42.28]Is this how mom said it would be?
[00:45.46]Cause if so, I've got sight to see
[00:48.14]Strawberry tears and impossible highs
[00:51.28]Looking for purpose and what I'll define
[00:54.12]Hope for the best, no, I'm wasting my time
[00:57.12]Can't let these chances get out of my life
[00:59.92]Once again I won't be sitting and be living in the inner streets
[01:03.14]Watching all these stories that it's in the bottom sticking in
[01:06.12]Waiting for some sin to happen
[01:09.54]Oh won't you stay for the ride?
[01:13.68]Cause all your views will be nice
[01:16.58]Then the stories I will tell our friends
[01:19.40]We'll make them laugh until the party ends
[01:22.24]Oh won't you stay for the ride?
[01:25.50]It's too hard to die
[01:28.04]Let's turn your sanity to a level
[01:30.26]And make a choice to serve it happy
[01:33.82]Minimum wage put minimal effort
[01:50.08]Could hold on for money and waste my potential Skin rotting further though I not a relic Relate with the elderly bones are upset And I try so hard and it just so much work
[02:01.53]Hell, I've slept in my car for days and weeks
[02:03.91]It hurts that I can do so much and never get that far
[02:07.51]Yet still I'm pushing for something
[02:09.17]I'm moving toward something
[02:10.81]Wait, I'm sick of waiting for y'all
[02:13.97]I'm done with wasting my time
[02:16.93]Don't got that much to live for
[02:19.79]Let's go for another ride
[02:22.81]I'm sick of waiting for y'all
[02:25.75]I'm done, we're wasting my time
[02:28.69]Don't got that much to live for
[02:31.73]Oh, won't you stay for the ride?
[02:36.23]Cause all the views will be nice
[02:38.97]And the stories that we'll tell our friends
[02:41.83]We'll make it happen till the party ends
[02:44.63]Oh, won't you stay for the ride?
[02:47.83]These two all times
[02:50.49]They start ascending to a living
[02:52.75]And making sure this death is heavy
[02:55.91]The rain
[03:15.91]The rain
[03:23.91]I'm just going to cry
[03:29.91]I'm just going to cry` },

    { file: 'Impostor Syndrome.mp3', title: 'Impostor Syndrome', artist: 'Mix',
      lyrics: `[00:00.00]Unfortunately I am
[00:07.00]My own dog, my own fur companion
[00:11.00]My own old lady on a forearm
[00:15.00]With types in glittery decor
[00:19.00]Unfortunately I take
[00:24.00]Myself out walking everyday
[00:27.00]day and I hand my legs to the feet and I give my head to the leash.
[00:37.20]Every other day I'm wondering, what's a human being gotta be like?
[00:45.86]What's a way to just be competent?
[00:50.22]These sweet instincts ruin my life.
[00:53.30]Every other day I'm wondering
[00:57.80]Was it a mistake to try and define
[01:02.30]What I'm certain's mad incompetence
[01:06.30]These sweet instincts ruin my life I can smell raw lips all the time Not K nor K For human grossly underqualified
[01:22.33]For K-9 grossly overqualified
[01:26.75]I don't blend in at PetSmart
[01:30.31]And that truth remains for the Walmart
[01:34.89]Cause in either case they say to me
[01:38.73]What the fuck is lost in aisle three?
[01:44.23]Every other day I'm wondering
[01:47.25]What's a human being gotta be like?
[01:52.23]What's a way to just be competent?
[01:57.01]These certain instincts ruin my life
[02:00.17]Every other day I'm wondering
[02:03.89]Was it a mistake to try and define
[02:08.03]What I'm certain's mad incompetence
[02:12.89]These sweet instincts were mine
[02:15.87]Ooh ooh ooh ooh ooh ooh Just watch me
[02:52.11]I'm not fine and nobody outs behavioral Frankenstein.
[03:07.29]Just look at Victor in LA and sit with the Y at U of A.
[03:14.99]And all the majors at the labels Reboot as soon as I am able
[03:23.99]Every other day I'm wondering What's a human being gotta be like?
[03:31.99]What a way to just be competent These sweet instincts blur my life Every other day I wondering Was it a mistake to try and define
[03:49.04]What uncertain's mad incompetence
[03:53.16]These sweet instincts burn my life
[04:05.70]These sweetest things ruin my life
[04:13.70]These sweetest things ruin my life
[04:35.70]Attention passengers, we've now reached our destination.
[04:41.58]We hope you enjoyed the flight and have a nice day.` },

    { file: 'Jane.mp3', title: 'Jane!', artist: 'Mix',
      lyrics: `[00:00.00]Won't the devil guide your hand for good luck
[00:05.08]To hold the honeysuckle rose as she lies down
[00:12.10]Reading the paper, reading the world right round
[00:16.38]And her eyes record the sweet surprise of those who died that day
[00:25.20]Leaving her breathless, leading her head to the grave
[00:29.70]And Jane, you're early
[00:44.32]Your life's work is dirtied by the fools who adore you
[00:51.18]Only to find, only to find you out
[00:55.88]They saw you dressing in the backroom
[01:00.82]Now they'll pay what they owe you
[01:04.42]It's only small chains red on the green, green grass
[01:09.16]Won the devil take you back for more
[01:17.46]To open closed doors and keep the good
[01:22.42]from the grade
[01:24.46]evil and equal
[01:26.24]seeking to kill and create how grand the milk and honey land is on her tongue again Taste of the violence trying to silence her head
[01:41.87]J, you're early
[01:56.67]Your life's work is dirtied by the fools who adore you
[02:03.63]Biding your time, biding your time to strike
[02:08.41]Surely the poison makes a portrait of your face
[02:14.83]In the mirror, smiling with fright
[02:19.11]Jay, you're early
[02:36.11]Your life's work is dirtied by the fools who adore you
[02:43.07]Only to find, only to find you out
[02:47.79]They saw you dressing in the back room
[02:52.69]Now they'll pay what they owe you
[02:56.25]It's only small chains right on the green, green grass
[03:06.11]Thank you.` },

    { file: 'Joy Again - Looking Out for You (Lyric Video).mp3', title: 'Looking Out for You', artist: 'Joy Again',
      lyrics: `[00:00.00]I guess I should stop
[00:24.24]Looking out for you
[00:27.40]Like I always do
[00:30.26]When will you
[00:32.94]Start looking out for me too
[00:36.44]Still leaving me
[00:38.00]Staring at my shoes
[00:40.58]It's just the way you're glancing at me
[00:44.90]Something about you
[00:47.26]Just makes me feel guilty for
[00:50.24]Liking you
[00:52.52]When you're with him
[00:55.54]When you're with him
[00:57.90]This is a love song for a girl
[01:02.38]And we'll never know what's about her
[01:04.82]I know it's pretty stupid
[01:06.00]But I'm much too shy to tell her
[01:08.58]She's screaming and I smile
[01:12.18]I'm all the wild
[01:13.86]I'm all trapped up on my own throat
[01:17.00]I guess there is no
[01:25.54]Thank you When we walking out in the snow
[01:40.69]I say I guess I should go
[01:45.29]And we're talking about someone else
[01:50.61]Well we should be talking about ourselves
[01:56.39]It's the same old situation
[01:58.39]You've always got me waiting
[02:01.19]Come on dear, I think time's a-wasting
[02:05.63]Before we have to go back inside
[02:10.29]And return to our normal lives
[02:15.73]This is a love song, I'll break our own
[02:18.87]I never know about her, I know it's pretty stupid
[02:22.29]But I'm much too shy to tell her
[02:24.89]She's beaming that smile all the while
[02:30.13]I'm all trapped up on my own throat
[02:33.25]I guess there is no hope
[02:48.87]Thank you.` },

    { file: 'Loose Cannon.mp3', title: 'Loose Cannon', artist: 'Mix',
      lyrics: `[00:00.00]Losing on my chest
[00:19.32]Another day passed again
[00:21.76]I waste my energy
[00:23.38]Looking for escape within
[00:26.08]I thought I'd better turn out the lights here
[00:28.38]But I still got things to do
[00:43.38]Everybody tells me nothing
[00:45.38]Cause I don't ask something much really of anybody
[00:47.38]Everybody tells me nothing
[00:49.38]Cause I don't ask something much really of anybody
[00:51.38]Yeah!
[00:54.38]Everybody tells me nothing
[00:58.38]Everybody tells me nothing
[01:02.66]Cause I don't ask this much for the young anybody
[01:05.08]Everybody tells me nothing
[01:07.00]Cause I don't ask this much for the young anybody
[01:09.48]Okay
[01:09.86]Look at Batman over there son He afraid of what he find Look into his eyes
[01:37.04]Can you read between the lines?
[01:53.50]Everybody tells me nothing, cause I don't have something much really of anybody
[02:10.94]Everybody tells me nothing, cause I don't have something much really of anybody
[02:19.26]Okay, boy, you're coming down to me, big and scary things
[02:21.56]I don't think I'm at a heart that you don't see me
[02:23.52]My fucking only M-I-D-I-N-I-N-I-C-A-C-O
[02:25.58]Think I had a loose cannon, that's the baddest you
[02:55.58]you` },

    { file: 'Marino - Im Sorry Mom.mp3', title: 'Im Sorry Mom', artist: 'Marino',
      lyrics: `[00:00.00]I have no motivation, I don't even wanna try
[00:08.00]What's after graduating, work hard, retire and die
[00:11.98]I don't wanna live that life, rather drop out than get by
[00:15.96]Working a mediocre average fucking 9 to 5
[00:20.02]And I know it's what my parents want from me but I don't
[00:24.06]So I won't go get that business degree, I'm sorry mom
[00:28.00]That I'm a deadbeat, the failure of the family
[00:31.58]But I didn't ask to be here, so just leave me alone
[00:36.00]I told you not to go out last night
[00:37.92]My apologies that I don't wanna be what you want me to be
[00:41.08]I'm sorry, I'm not a prodigy
[00:43.06]Really got good grades, no A's or B's
[00:45.12]Yeah, I'm hardly getting by on a daily basis
[00:47.72]But I got a dream, so I gotta chase it
[00:49.82]Never gonna be who they wanna see
[00:51.64]On my left, I know I'll be saying
[00:53.90]That I know exactly what my parents want
[00:57.18]But I don't, so I won't go get that business degree
[01:00.92]I'm sorry mom, that I'm a deadbeat
[01:03.68]The failure of the family, but I didn't ask to be here
[01:08.46]So just leave me alone
[01:10.04]Now get out of my sight
[01:11.52]I'm a delusional freak who's chasing made up dreams
[01:16.04]Most people give up at 12, but now I'm 23
[01:19.76]I'm from another planet, they'll never understand it
[01:24.02]Everyone's getting degrees while I still have nothing planned out
[01:28.08]And I know exactly what my parents want but I don't
[01:32.06]So I won't go get that business degree
[01:34.92]I'm sorry mom
[01:36.18]That I'ma dare defeat the failure of the family
[01:39.56]But I didn't ask to be here so just leave me alone` },

    { file: 'Miraidempa - Unslept.mp3', title: 'Unslept', artist: 'Miraidempa',
      lyrics: `[00:00.00]Music
[00:21.00]I'm going to go to the next video.
[00:51.00]I sorry I going to go to the next video
[01:30.22]I'm going to go to the next episode.
[02:00.22]you` },

    { file: 'Mystery Girl.mp3', title: 'Mystery Girl', artist: 'Mix',
      lyrics: `[00:00.00]It's so strange how much I love her But the way she is makes me wonder
[00:20.84]She's so weak but I dig it That really ugly smile makes me mad
[00:27.88]But you're so cold, you never listen Always ignoring me, leaving me gloom
[00:35.24]What can I do to get you to love me? Yes, I'm dead, I'm pregnant, I don't wanna lose
[00:42.12]You're my mystery girl
[00:43.72]You're my mystery girl
[00:47.56]You're my mystery girl
[00:51.02]You're my mystery girl
[00:54.68]And at times I feel like I know you
[01:02.38]When I'm close you move further away
[01:08.82]Give me your hands to make you happy
[01:16.52]I promise nothing can tear us apart
[01:23.20]Oh I know I not that special But I know I have you later on Don you worry about my mama She in lots of several she will love you
[01:39.23]But you're so cold, never listen Always ignore me, leave me blue
[01:46.15]What can I do to get you to love me? You're so damn perfect, I don't wanna lose
[01:53.23]Yeah my mystery girl
[02:23.23]guitar solo
[02:53.23].` },

    { file: 'Nafeesisboujee - Stephanie (Official Music Video).mp3', title: 'Stephanie', artist: 'Nafeesisboujee',
      lyrics: `[00:00.00]She keeps on texting me
[00:19.14]Do I like her? No, definitely
[00:20.94]I'm just like Stephanie
[00:23.04]Do I like her? Yes, specially
[00:25.14]She keeps on texting me
[00:27.54]Do I like her? No, definitely
[00:29.36]I'm just like Stephanie
[00:31.44]Do I like her? Yes, specially
[00:33.52]I keep on dubbing and dubbing and dubbing and dubbing and dubbing
[00:37.72]But I smell so good, dubbing and dubbing
[00:41.88]I'm just like Stephanie
[00:44.02]I kiss like Bethany
[00:46.26]I think we're meant to be
[00:48.60]But I fucked up definitely
[00:50.32]She keeps on texting me
[00:52.70]Do I like her? No, definitely
[00:54.50]I'm just like Stephanie
[00:56.58]Do I like her? Yes, specially
[00:58.70]She keeps on texting me
[01:01.08]Do I like her? No, definitely
[01:02.90]I'm just like Stephanie
[01:05.00]Do I like her Yes especially I dubbing and loving I don even have to stay I dubbing and loving I don need affiliates
[01:15.94]I miss you, Stephanie
[01:17.58]I kiss like Bethany and Devany
[01:20.92]Bro, how many did you kiss?
[01:22.54]Her name's not Stephanie
[01:23.88]She keeps on sexting me
[01:26.26]Do I like her? No, definitely
[01:28.06]I'm just like Stephanie
[01:30.16]Do I like her? Yes, specially
[01:32.28]She keeps on sexting me
[01:34.66]Do I like her? No, definitely
[01:36.66]I'm just like Stephanie
[01:38.66]Do I like her? Yes, specially
[01:40.66]I keep on dubbing
[01:42.66]and dubbing and dubbing
[01:44.66]other D's
[01:46.66]Don't know if I'll see you again
[01:48.66]I can't keep playing with Sam
[01:50.66]Don't know if I'll see you again
[01:52.66]Do I like her? Yes, specially
[01:54.66]Do I like her? Yes, specially
[01:56.66]We should all just
[01:58.66]Do you know what we need to show?
[02:00.66]Put away your problems
[02:02.66]Put away your problems.
[02:05.06]Or whatever it is.
[02:07.20]We just need to forget about everything.
[02:10.30]Just have a good time here tonight.
[02:12.70]It's really that simple.` },

    { file: 'Nope your too late i already died (Extended Version).mp3', title: 'Nope your too late i already died (Extended Version)', artist: 'Mix',
      lyrics: `[00:00.00]I'm not trying to ruin your fun You're just a little bit late, I guess you're already done
[00:22.28]It's this feeling I can't shake, it's up to you
[00:26.00]I'm never doing the right thing, so I'm so stuck
[00:30.10]If you see me in America, I might say hi
[00:34.30]If you meet me out in Europe, I'm talking in love
[00:38.08]Maybe we'll talk over scouts around much sometimes
[00:42.02]And I've never been a friend, so it might be nice
[00:46.16]But I can't take this pop through our sea trees
[00:50.26]It's like big hands are always out and always staring at me
[00:54.00]And if I say they're on a tape, I'd call my thoughts of it once
[00:58.12]Always whipping out the pitchforks when you try to speak
[01:02.02]This day I'm walking the road, kicking rocks, it's my fault
[01:08.10]My life's the way story talks, I'll be this way till I'm home
[01:12.08]I rip the page out the foot, I'm just on this understood
[01:16.04]I always thinkin' about her, know when my life felt good
[01:20.22]I smoke a cig on the porch
[01:22.06]It doesn't hurt me at all
[01:24.24]I wonder what's it on for
[01:26.04]Is this the filetor?
[01:28.28]And I know I can't afford
[01:30.00]Watching her walk out the door
[01:32.06]So I keep it to myself
[01:34.02]And keep my feet on the floor I not tryna ruin your fun You just a little bit late
[01:56.11]I guess you're already done It's this feeling I can't shake
[02:00.65]Cause I'm too dumb
[02:02.65]I'm never doing the right thing
[02:04.65]So I'm so stoked
[02:06.65]If you see me in America
[02:08.65]I might say hi
[02:10.65]If you meet me out in here
[02:12.65]I'm not talking in love
[02:14.65]Maybe we'll talk no discount
[02:16.65]Or I'm up sometimes
[02:18.65]And I've never been a friend
[02:20.65]So it might be nice
[02:22.65]But I can't take this pop for a CG
[02:26.65]Because there's always out
[02:28.65]And always staring at me
[02:30.65]If I say they're on the payback, I want lots of it
[02:33.81]Always looking at their pitchforks, if you try to speak
[02:38.05]This day I'm walking the road, shaking rocks, it's my fault
[02:44.11]I'll ask the way story talks, I'll be this way till I'm home
[02:48.07]I rip the page out the foot, I'm just on misunderstood
[02:51.67]I always think I've ever, know when my life felt good
[02:56.09]I smoke a cig on the porch, it doesn't hurt me at all
[03:00.25]I wonder what's it on board
[03:02.07]Is this the feel I adore
[03:04.01]And I know I can't afford
[03:05.99]Watching her walk out the door
[03:08.07]So I keep it to myself
[03:10.03]And keep my feet on the floor` },

    { file: 'Perfecto Miserable - Termonuclear.mp3', title: 'Termonuclear', artist: 'Perfecto Miserable',
      lyrics: `[00:00.00]MOTARÍA MIS AMIGOS
[00:30.00]Un ataque de monstrual, voy a estallar, voy a estallar, voy a estallar, voy a estallar
[00:39.06]Estaré triste y aburrido cuando tú ya te hayas ido
[00:44.80]No puedo ser feliz
[00:47.82]¿Qué harías por verme? ¿Qué harías por verme?
[00:53.62]¿Qué harías por verme a ser?
[00:56.40]Una catástrofe mundial
[01:01.04]Cada vez que intentamos hablar
[01:06.20]Un ataque eterno nuclear
[01:09.70]Voy a estallar, voy a estallar, voy a estallar, voy a estallar
[01:26.40]y toda la ropa que llevo
[01:40.40]y las pel que veo La m que escucho es dorada que te gusta a ti
[01:57.76]Y todos mis amigos dicen que me olvide de ti
[02:08.00]Mandaría a mis amigos por una tarde contigo
[02:14.06]Pero no se puede
[02:16.70]¿Qué harías por verme?
[02:20.76]¿Qué harías por verme?
[02:23.46]¿Qué harías por verme a ser?
[02:27.50]Un ataque de evolucionar
[02:30.16]Cada vez que intentamos hablar
[02:35.18]Un ataque en el mundo real, voy a estallar, voy a estallar, voy a estallar, voy a estallar
[02:44.10]Quédate aquí, yo quiero volver a casa
[02:50.68]Soy tan feliz, no quiero volver a casa
[02:59.44]Contigo aquí no quiero volver a casa
[03:08.66]No quiero volver a casa
[03:12.86]No quiero volver a casa
[03:17.36]No quiero volver a casa
[03:29.44]Gracias por ver el video.` },

    { file: 'Perfecto Miserable - Me dejas olvidar.mp3', title: '¿Me dejas olvidar？', artist: 'Perfecto Miserable',
      lyrics: `[00:00.00]Música
[00:24.00]Donde te has ido parece que no estás
[00:26.00]No tengas miedo es para matar
[00:28.00]No va a dolerme, no dolerá, no va a dolerme si dolerá
[00:33.24]Clávarás fuerte, cláverás ya, clávarás fuerte tus palabras
[00:37.86]Vas a decirme la verdad, clávarás fuerte mi espalda
[00:42.40]Mi rostro tan serio, parece un cementerio
[00:47.04]Tu cuerpo helado, quiero estar a tu lado
[00:51.50]Esperando a verte, esperar hasta la muerte
[00:56.04]Esperando a verte
[00:58.40]Y que me quieras y que me matarás
[01:22.20]Y que me odias y no digo más
[01:24.52]Si te muero en el aire es porque estás comiendo solo en tu cama
[01:28.92]Tus golpes matan, sé que me dolerán
[01:31.40]En tus palabras duele más
[01:33.72]Siéntate, piensarás
[01:36.04]Dame el golpe que me rematará
[01:38.32]Mi rostro tan serio parece un cementerio
[01:42.68]Mi cuerpo enjado quiero estar a tu lado Esperando a verte esperaba hasta la muerte esperando a verte
[02:13.90]Ocupar a las noticias cinco semanas o más
[02:19.36]El asesinato que cometerás
[02:23.82]Cuando llene tu llamada, una noche inesperada
[02:28.28]Y me rompa cada hueso porque ya no sientes nada
[02:32.96]Cuando vuelves el teléfono, se pierda el rastro de tu voz
[02:37.90]Cuando vuelves el teléfono, tienes tres cuartos sobre aquello
[02:42.32]Si digo que no te quiero, te quiero en un cuerpo nuevo, si buscas de nuevo, me dejas olvidar
[03:01.70]Más rápido, más rápido, más rápido, más rápido, más rápido, más rápido, más rápido, más rápido, te puedo olvidar
[03:12.32]Gracias por ver el video.` },

    { file: 'TU CARCEL - Enanitos Verdes.mp3', title: 'Enanitos Verdes', artist: 'TU CÁRCEL',
      lyrics: `[00:00.00]Девочка-пай
[00:30.00]И ты, любовь, если ты так хочешь, ты можешь сделать это?
[00:38.66]Ты банкрот не тебя вести понимать, что в пубрице ты знаешь, что ты хочешь.
[00:48.88]И мне не улыбается, и мне не улыбается, что ты думаешь так, и больше, что ты не будешь.
[00:58.04]Субтитры сделал DimaTorzok
[01:28.04]DimaTorzok Quiero llorar y me destroza que pienses as
[02:00.34]Y más que ahora me quedé sin ti
[02:04.56]Me duele lo que tú vas a sufrir
[02:10.08]Pero recuerda, nadie es perfecto y tú lográs
[02:16.70]Más de mil cosas mejores tendrás
[02:20.94]Pero cariño sincero jamás
[02:26.78]Vete olvidando de eso que hoy dejas y que cambiarás
[02:33.18]Por la aventura que tú sabrás
[02:37.20]Será tu cárcel y nunca saldrás
[02:43.16]Pero recuerda, nadie es perfecto y tú lo habrás
[02:49.44]Más de mil cosas mejores tendrás
[02:53.62]Pero cariño sincero jamás
[02:59.56]Vente olvidando de esto que hoy dejas y que cambiarás
[03:05.88]Por la aventura que tú ya verás, será tu cárcel y nunca saldrás.` },

    { file: 'The Love I Lost.mp3', title: 'The Love I Lost', artist: 'Mix',
      lyrics: `[00:00.00]I'm feeling detached, there's no coming back
[00:23.68]I wanted to say that I hate you
[00:27.82]The hate in my heart, it drives me so far
[00:32.28]Away from things I always knew
[00:36.58]I miss the world that I know I lost
[00:41.58]I miss the one that I love
[00:45.38]Drinking the road in the parking lot
[00:50.84]When is it gonna stop?
[00:55.44]You're all mannequins, you're all rolling pins
[01:00.02]That I would strike down if life was a game
[01:04.32]So thoughtless and cruel, you think you're so cruel
[01:08.84]I would think you'd do another day
[01:13.14]I miss the one that I know I lost
[01:18.16]I miss the one that I love
[01:21.98]Drinking alone in the parking lot
[01:27.42]When is it gonna stop?
[01:32.00]I miss the love that I know I lost
[01:36.32]I miss the one that I love
[01:40.12]Drinking again in the parking lot
[01:45.72]When is it gonna stop?
[01:51.98]Thank you.` },

    { file: 'The Rare Occasions Origami (Lyric Video).mp3', title: 'The Rare Occasions ｜ Origami', artist: 'Mix',
      lyrics: `[00:00.00]Take a look at me, crumpled up on the floor, feeling lonely
[00:19.72]Honestly, something is wrong with me
[00:25.22]I've been freaking out, folding myself in two
[00:32.20]Or coming, terrified of what they think of me
[00:39.92]I'll face the night deep in starlight
[00:50.56]Shadows unwind deep in starlight
[01:03.56]There's another way apart from this misery
[01:09.56]And it's got me wondering exactly what I'm missing
[01:16.56]Take a look at me crumpled up on the floor feeling lonely Honestly something is wrong with me
[01:35.19]I'll face the night deep in starlight.
[01:42.59]Shadows unwind deep in starlight.
[01:52.09]I'll face the night
[02:22.09]Thank you.
[02:52.09]Amen.` },

    { file: 'The Rare Occasions Notion Official Music Video.mp3', title: 'The Rare Occasions ｜ ＂Notion＂ Official Music Video', artist: 'Mix',
      lyrics: `[00:00.00]Sure it's a common ocean, perpetual emotion
[00:17.28]But I don't need the comfort of any lies
[00:23.72]I've seen the ending and there's no ascending rise
[00:35.72]Oh, like when I was younger, was filled by other youngsters
[00:41.72]And my unwielded son-in-trived beneath the earth
[00:47.72]Cause I don't see what they see
[00:50.72]Where they stare at me
[00:53.72]I see the window, the limit's a limit, but not at all
[01:17.72]If you could borrow a letter to carry on to that day Until I leave and I live anymore To its a common ocean A bad water ocean
[01:45.00]But it's not what you've signed up for
[02:02.56]I'm sure there won't always be sunshine
[02:08.22]When there's this momentary game of light
[02:15.42]Gonna have to wait for such decades
[02:18.38]And get through the pain of a flame face
[02:21.40]I'm sure there won't always be sunshine
[02:26.46]I'm sick of one hour to sunshine
[02:32.50]For you, there's no wind to repeat my mind
[02:39.30]I could go cry, so I'm sick
[02:42.30]But I'm sick of driving, shaking
[02:47.96]And driving, breaking
[02:50.90]You think you're over the road
[02:53.96]In the dark, it's a place
[02:57.48]To die, it comes to the place of life` },

    { file: 'Three Days Grace - Gone Forever (Sub Espanol - Lyrics).mp3', title: 'Gone Forever (Sub Español - Lyrics)', artist: 'Three Days Grace',
      lyrics: `[00:00.00]Don't know what's going on, don't know what went wrong
[00:12.42]Feels like a hundred years, I still can't believe you're gone
[00:18.56]So I'll stay up all night with these bloodshot eyes
[00:24.78]While these walls surround me with the story of our life
[00:31.96]I feel so much better now that you're gone forever
[00:42.94]I tell myself that I don't miss you at all
[00:49.02]I'm not denying, denying, that I feel so much better now
[00:57.44]That you're gone forever
[01:00.66]Now things are coming clear, and I don't need you here
[01:14.00]And in this world around me, I'm glad you disappeared
[01:19.52]So I'll stay out all night, get drunk and fucking fight
[01:26.26]Until the morning comes out, forget about our life
[01:33.56]I feel so much better
[01:41.58]Now that you're gone forever
[01:44.46]I tell myself that I don miss you at all I not denying denying That I feel so much better now
[01:57.86]That you're gone forever
[02:02.20]First time you screamed at me
[02:06.28]I should have made you leave
[02:09.40]I should have known it could be so much better
[02:15.60]I hope you're missing me
[02:18.64]I hope I've made you say
[02:21.68]That I'm gone forever
[02:26.82]And now it's coming clear
[02:30.70]That I don't need you here
[02:33.96]And in this world around me
[02:37.02]I'm glad you disappeared
[02:40.04]I feel so much better
[02:44.64]Now that you're gone forever
[02:47.54]I tell myself that I don't miss you at all
[02:53.64]I'm not lying, denying
[02:56.74]That I feel so much better now
[03:00.88]That you're gone forever
[03:05.68]And now you're gone forever
[03:11.44]And now you're gone forever` },

    { file: 'ThxSoMch - Bad Dream (Official Lyric Video).mp3', title: 'Bad Dream', artist: 'ThxSoMch',
      lyrics: `[00:00.00]Woo!
[00:30.00]running, oh just eyes
[00:36.98]I just want something
[00:40.12]nice
[00:44.74]my life without you is just a real bad change
[00:50.66]my life without you is just a real bad change
[00:58.34]Drinking me, so black and sweet
[01:00.64]Just go look at me, just go look at me
[01:03.46]I lost no sense of time Only yeah only I Feel me you sublime
[01:27.80]I just want your delight
[01:33.80]I'm drunk to give up, it's a ride, it's a ride
[01:36.80]My life without you's just a real bad dream
[01:39.80]I'm drunk to give up, it's a ride, it's a ride
[01:41.80]My life without you's just a real bad dream
[01:43.80]I'm a drug, drinking man, it's a rap, can sleep
[01:47.06]My life without you, just a real bad chain
[01:49.64]I'm a drug, drinking man, it's a rap, can sleep
[01:52.26]Just go back at me, just go get me
[01:54.92]These, the drug that I must taste
[01:58.10]The care to all my aches
[02:00.86]You know just what I need
[02:03.32]Girl, can't you help me, please
[02:05.94]Don't leave me in this state
[02:08.44]Your type was more than laced
[02:11.14]You know just what I need
[02:13.62]Don't be ashamed to me` },

    { file: 'ThxSoMch - Bestby (Official Music Video).mp3', title: 'Bestby', artist: 'ThxSoMch',
      lyrics: `[00:00.00]We need the best, but fuck it up
[00:05.98]Sucking on your lips in the backseat
[00:08.66]Came too soon, now you're in me
[00:11.36]Who knows what you'll be screwing, now your hands clean
[00:14.10]And if you ain't gone
[00:15.40]It's okay, girl, cause nothing's gonna be okay
[00:19.42]Now I can tell you something even more depressing
[00:23.38]I'm going to get tested
[00:25.50]You're so faithful, that everything will be okay
[00:29.98]Now let me tell you something even more exciting
[00:34.50]The doctor came here to swear
[00:36.64]He said this news is gonna blow
[00:38.30]I said I need another dose
[00:41.22]He assumed it was a joke
[00:43.90]And then he sent me out the door
[00:46.40]Creations just a white car
[00:48.80]Sucking on your lips in the backseat
[00:51.88]Can't do so, but you're at me
[00:54.60]Who knows who you're screwing by your hands clean
[00:57.32]And if you ain't, I know
[00:58.94]Don't talk a lot, you just opened up your mouth and I said,
[01:02.18]Bear in peace, if you can't do soon, now you're in me
[01:05.40]Now who knows who you'll be doing, now your hands clean
[01:08.10]And if they ain't clean, just do it, just do it to me, do it
[01:13.58]Don't act like you won't do it, just do it to me, do it
[01:18.98]Just do it, just do it, just do it to me, do it
[01:24.54]Don't act like you do it
[01:27.02]Just do it
[01:28.36]Just do it
[01:31.12]Just do it
[01:31.76]Just do it
[01:54.54]Thank you.` },

    { file: 'ThxSoMch - CAROLINE (Official Music Video).mp3', title: 'CAROLINE', artist: 'ThxSoMch',
      lyrics: `[00:00.00]Caroline, I'll take you to my cemetery
[00:15.74]I'll be fine, I'll work it, I'll work it
[00:20.78]I'll count your days, I'll wear myself my Mary Jane
[00:26.94]He and I, we'll work it, we'll work it out
[00:32.62]Listen up, I pray for every beating soul
[00:37.24]I'll waste until I become flesh and bone
[00:42.62]Hear me out, I'm one foot out the window pane
[00:47.94]I got a leader burning the court to ease the way
[00:53.20]Not falling into your grace
[00:55.38]I thought it all was good until I wrote my plans down
[00:58.86]Never thought I'd feel a heartbreak
[01:00.62]Until I looked at you and then I held my hand
[01:03.78]I was saying that I'm okay
[01:05.98]But if I'm okay, I'm the same
[01:08.46]Who would've thought that we'd be both fucking the same, bitch?
[01:15.44]Caroline, I'll take you to my cemetery
[01:19.82]And I'll be fine, I'll work it, I'll work it out
[01:25.80]Count your days, I'll burn myself my Mary Jane
[01:31.00]You and I we work it we work it out Wake up promise that when I gone I still connect the dots
[01:43.50]From hell I'll haunt you, God
[01:45.98]Damn, I'll take these words written in vain
[01:51.34]Cover them up in lace
[01:54.12]Diamonds and I'll engrave them
[01:57.46]Not falling into your grace
[01:59.46]I thought it all was good until I wrote my plans down
[02:02.98]Never thought I'd feel heartbreak
[02:04.74]Until I lived to you and then I held my head out
[02:08.36]And saying that I'm okay
[02:10.06]But if I'm okay, I'm mistaken
[02:12.78]Who would've thought that we'd be both fucking the same bitch?
[02:19.50]Caroline, I'll take you to my cemetery
[02:23.90]And I'll be fine, I'll work it, I'll work it
[02:28.92]I'll catch your days, I'll burn myself my merry chain
[02:35.06]You and I, we'll work it, we'll work it out
[02:40.82]We're working, we're working, we're working out
[02:50.88]You and I, we're working, we're working out
[03:10.82]you` },

    { file: 'ThxSoMch - Crumbled (Official Music Video).mp3', title: 'Crumbled', artist: 'ThxSoMch',
      lyrics: `[00:00.00]If I live
[00:29.00]And I'll be like, is that your way to talk me?
[00:35.42]If I do what I want, that's fine, just lay it on me
[00:40.06]Cut me out, cuss me out, bear me down
[00:48.58]Last night, you were so content, that's why
[00:56.00]Me
[00:58.48]I'm perfect again
[00:59.58]It's a
[01:00.72]It's a
[01:02.96]It's a
[01:03.96]It's a
[01:04.80]It's a
[01:05.86]It's a
[01:06.78]It's a
[01:07.72]What the fuck
[01:08.44]I'm crealled
[01:09.42]But again
[01:10.30]It's a
[01:11.32]It's a
[01:14.26]It's a
[01:14.58]It's a
[01:14.96]It's a
[01:16.40]It's a
[01:17.10]It's a
[01:18.12]It's a
[01:18.90]What the fuck
[01:19.44]I'm crealled
[01:20.30]But again
[01:21.62]I'd cry on the boat again
[01:27.62]I'd cry on the whole one
[01:32.06]Can we see the women a half million They cut me open well yeah baby I don care There blood on the cell oh well It wasn for anybody out there
[01:42.71]Your hand, my hand, my hand
[01:49.11]Oh well, oh well, oh well, oh well
[01:54.55]Yes, no, yes, no, yes, no, yes, no
[01:57.59]In the cycle
[01:59.59]Inside, inside, inside, inside
[02:02.59]Fuck my crap, but again
[02:05.59]In the cycle
[02:07.59]Inside, inside, inside, inside
[02:13.59]Fuck my crap, but again
[02:27.59]Last night, you looked so good to the twine
[02:36.59]One, two, three, four, five
[02:38.59]Last night, last night, last night, last night
[02:41.59]Even the sky of gold, blue
[02:44.59]Inside, inside, inside, inside, inside
[02:47.59]Fuck off, crap, but again
[02:49.59]Last night, last night, last night, last night
[02:52.59]Even the sky of gold, blue
[02:55.59]That's why, that's why, that's why
[02:58.31]What the fuck I care but again?` },

    { file: 'ThxSoMch - Cry All Month (Official Lyric Video).mp3', title: 'Cry All Month', artist: 'ThxSoMch',
      lyrics: `[00:00.00]I'll make you cry, cry, cry, cry all along
[00:11.28]Girl, I'm exactly what you did, you got the back you could feel, don't you fuck
[00:18.56]I'll make you cry, cry, cry, cry all along
[00:25.80]Find out exactly what you did
[00:30.42]You never thought you could feel no touch
[00:33.18]I'll make you cry, cry, cry, cry
[00:39.44]Oh, yeah, you can cry
[00:43.10]Tears will come falling from your eyelids
[00:47.00]Run down from your face to where you're smiless
[00:50.74]Smile fades away, too sick of the violence
[00:54.30]I'm in love with you, but love's not worth the size
[00:57.70]Tick, tick, tick, tell me what the time is
[01:01.74]Take the pain away, back in with your vices
[01:05.06]Take the pain away, whatever you're prescribing
[01:08.62]Gave you everything and now you're hardly trying
[01:12.28]Didn't think you would ever leave
[01:16.10]Now you're living a fallacy
[01:18.96]Never thought you'd get back with me
[01:23.20]So don't try and get back at me
[01:26.32]Girl, I'm exactly what you did
[01:28.62]And I the fact that you could feel no right I make you cry cry cry cry Turn out exactly what you need
[01:43.17]You never thought you could feel no touch
[01:45.87]I'll make you cry, cry, cry, cry
[01:52.19]Turn out love
[01:53.13]Yeah, you can cry, I won't
[01:59.53]Didn't think you would ever leave
[02:06.97]Now you're living a fallacy
[02:09.61]Never thought you'd get back with me
[02:14.03]So don't try and get back in the air
[02:17.29]The only time you want you there
[02:19.51]Ain't nothing that you could feel
[02:21.23]No one
[02:22.09]I'll make you cry
[02:26.71]Cry
[02:27.87]Cry
[02:28.53]Oh Lord
[02:31.53]Girl I'm exactly what you need
[02:33.53]You never thought you could feel no touch
[02:38.53]I'll make you cry, cry, cry, cry
[02:42.53]Oh Lord
[02:44.53]Yeah you can cry, oh Lord
[02:58.53]Thank you.` },

    { file: 'ThxSoMch - Everyone Dies In A Costume (Official Lyric Video).mp3', title: 'Everyone Dies In A Costume', artist: 'ThxSoMch',
      lyrics: `[00:00.00]Hey you, I almost thought I lost you I almost got excited
[00:09.54]I don't mean to be rude, I just can't hold my mood And it's because I hate you
[00:18.00]I almost thought I liked you But now I first decided
[00:25.96]And now I'm back with you
[00:29.90]And nothing but you's true
[00:32.02]Nothing but you
[00:33.66]I hate you
[00:36.26]Across you
[00:40.66]I hate you
[00:45.38]Now I'm dying across you
[00:55.96]Hey you, this season you have lost it
[01:05.04]I could try to save you, but that would be no use
[01:11.74]So go inside your knees, but nothing but it
[01:15.68]Save you a costume I hate you I hope you die in that costume
[01:31.01]I hate you, I hate you
[01:33.01]I, I, I hate you
[01:35.01]When you tried to be someone you'd hide
[01:39.01]I thank you, I thank you
[01:41.01]I, I, I'm thankful for the hope
[01:45.01]You've heard to shine
[01:51.01]I still remember who you were
[01:55.23]I guess that wasn't you
[01:59.51]We didn't need the real sex
[02:02.35]And so it ties in a costume
[02:21.01]The End
[02:51.01]Thank you.` },

    { file: 'ThxSoMch - Hate. (Official Music Video).mp3', title: 'Hate.', artist: 'ThxSoMch',
      lyrics: `[00:00.00]I always hate, hate, hate When you write it hard
[00:04.66]Not what I say, sha sha sha bitch I wanna re-shine
[00:07.10]I won't show you hate, hate Untill your butt in court
[00:09.86]I wouldn't hide, lie And tell your butt in the crowd
[00:12.46]I always hate, hate, hate When you write it hard
[00:14.86]Not what I say, sha sha bitch I wanna re-shine
[00:17.70]I won't you hate, hate, hate Until your butt in the crowd
[00:19.90]Not what you I hate, till your butt in the crowd
[00:22.22]I always hate, hate, hate When you write it hard
[00:24.74]Not what I say, sha sha bitch I wanna re-shine
[00:27.34]Don't want you hype, hate until you burn the clock
[00:29.78]Don't want you hype, gotta tell you burn the clock
[00:32.28]I always hate, hate, hate, when you runnin' around
[00:34.84]But when I shake, shake, shake, break someone up behind
[00:37.32]Don't want you hype, hate until you burn the clock
[00:39.86]Don't want you hype, gotta tell you burn the clock
[00:42.44]You're actin' like a psychopath in my spirit
[00:45.50]What's that you know's wrong when the next gets clear
[00:48.10]It's gettin' pretty hard to hear that bullshit
[00:50.84]Take a one, the money's all in my ear
[00:53.14]Just another wrong, the worthless hack
[00:55.68]Well, there ain't no wrong, the neck sits back
[00:58.22]If you wanna see a devil, come stab me
[01:00.84]You better pull the knife out of my back
[01:02.72]I always hate, hate, hate, when you runnin' to thrive
[01:05.18]I wanna shake shake shake shake shake Is that what I mean shine Don want you hate hate until you burn the club Don want you hype hate until you burn the club I always hate hate hate when you running o And act a shot Chris
[01:17.65]I want you right Until you burn on the clock
[01:20.41]Don't want you right Until you burn on the clock
[01:23.19]Be careful, Horn!
[01:26.15]Start turning me on So I can't move on
[01:31.19]I think I'd probably fly
[01:33.39]I'd kill myself a fall in the morning
[01:35.45]The pill's probably gone
[01:38.15]I hate myself, you made me want my soul
[01:41.23]Ain't no F.O.A.Ton, Ain't no F.O.A.Ton, Ain't no F,H!I.Ton, Ain't no F.O.A.Ton!
[01:43.37]You always hate! Height, height,
[01:44.75]What you wantin' a style of what?
[01:45.89]When I shake, shake, shake,
[01:47.01]Pens out what I've been trying
[01:47.97]Don't want you hate,
[01:48.99]Hate until you burn a dick
[01:50.23]Don't want you hype,
[01:51.55]Until you burn a dick
[01:53.17]I always hate, hey, hey,
[01:54.57]What you wantin a style of what?
[01:56.05]When I shake, shake, shake,
[01:57.05]Pens out what I've been trying
[01:58.21]Don't want you hype,
[01:59.29]Hate until you burn a dick
[02:00.65]I don't want you hype
[02:01.59]I don't tell you're blood on the track` },

    { file: 'ThxSoMch - Keep It To Yourself (Official Music Video).mp3', title: 'Keep It To Yourself', artist: 'ThxSoMch',
      lyrics: `[00:00.00]In an empty hole you fell
[00:03.60]Where every little feeling starts to swell
[00:08.80]Now you wanna run and know what's fair well
[00:14.20]You're angry on the inside, I can tell
[00:19.64]My life's a living hell
[00:24.76]And you're not feeling well
[00:27.28]Go cry and ask for help
[00:29.90]Oh, keep it to yourself
[00:32.30]When life goes as it should
[00:35.08]But you're not feeling good
[00:37.82]Just ain't your mental health
[00:40.42]Oh, keep it to yourself
[00:42.76]I don't care, I don't care, I don't care, I don't care
[00:45.40]Just keep it to yourself
[00:47.84]I don't care, I don't care, I don't care, I don't care
[00:50.84]I keep it to myself
[00:53.08]In an empty parking store
[00:55.80]I bet nobody knows how many pills you took
[01:01.80]Can you keep it locked down right now as you could?
[01:07.80]Cause you don't wanna come across misunderstood
[01:12.80]When life a living tale And you not feeling well Don cry and ask for help or keep it to yourself When life goes as it should but you not feeling good
[01:29.98]Just ain't your mental health, or keep it to yourself
[01:34.92]I don't care, I don't care, I don't care, I don't care
[01:37.54]Just keep it to yourself, I don't care, I don't care, I don't care
[01:42.08]I don't care, I keep it to myself
[01:45.34]Keep it to yourself
[01:55.82]Keep it to yourself
[02:06.58]I've been living for you, and you're not feeling well
[02:13.14]Don't cry and ask for a while, and you're meant to yourself
[02:19.48]Your life goes as it should, but you're not feeling well
[02:25.94]Just need your mind to come, and you're meant to yourself
[02:36.58]you` },

    { file: 'ThxSoMch - Keep It Tucked (Official Audio).mp3', title: 'Keep It Tucked', artist: 'ThxSoMch',
      lyrics: `[00:00.00]Music
[00:30.00]I'm a fucker
[00:32.00]You gave me checks, I gave you nine
[00:36.00]Tell me you're in it
[00:38.00]I'll fake this far just like you want it
[00:42.00]If I wasn't so I'd give a fuck about what I do
[00:46.00]And if you got popped out, I'd come and kill your dead
[00:50.00]Oh yeah
[00:52.00]Oh yeah
[00:54.00]Oh yeah
[00:56.00]Oh yeah
[00:58.00]One, two, three
[01:00.06]Hit a stroke, of people not trop' alone
[01:03.14]I had my baby veil, I would love you
[01:06.82]Every reason it's all done
[01:08.82]Never know where they're going
[01:10.60]Had a chicken just not
[01:11.40]Hit a stroke, of people not trop' alone
[01:14.54]I had my baby veil, I would love you
[01:17.28]Every reason it's all done
[01:19.26]Never know how long
[01:20.92]Had a chicken just not Wish ya good like my baby Could be your light do ya Up on the trip that just my my anxiety Whatever happens happens there no idea psychiatrist So if I owed you would I fuck you That was my son
[01:32.80]She called me Lovalea, I call her mama name
[01:35.50]I wanna scream and burn it up until I fucking play
[01:38.10]If I wasn't so, I'd give a fuck about what I do
[01:40.74]If she got popped out, I'd come and kill you, I'm dead
[01:43.96]Oh yeah
[01:46.58]Oh yeah
[01:49.36]Oh yeah
[01:51.36]One, two, three, three, four
[01:53.36]It's so cold, peeping up for long
[01:57.36]I held my breath in a thousand hours
[02:00.36]And a reason it's all done
[02:02.36]Never know where I'm going
[02:03.36]Get your heat and switch
[02:05.36]It's so cold, peeping up for long
[02:07.36]I held my breath in a thousand hours
[02:11.36]And a reason it's all done
[02:13.36]Never know where I'm going
[02:19.36]Let's go!
[02:49.36]you` },

    { file: 'ThxSoMch - Knocking At My Door (Official Music Video).mp3', title: 'Knocking At My Door', artist: 'ThxSoMch',
      lyrics: `[00:00.00]I'm a little bit older
[00:30.00]I'm gonna go get it out of here.
[00:37.00]Look at this. Look at this.
[00:40.00]You make it to Ohio, we're in the middle.
[01:00.00]Big noise
[01:01.00]Who said you can't get a nothing at all
[01:03.50]Who said you can't get a nothing at all
[01:06.00]I think the worst thing is what it's wrong
[01:08.50]What's your love on your birthday?
[01:10.50]Heaven knows the stuff that you cry for
[01:13.50]So when you're down, you reward
[01:16.50]So if you're moving all the time
[01:18.00]So depending on the time you take yourself
[01:20.00]All the cuts we want you, you're in your house
[01:22.50]You'll feel me right when you feel me right
[01:25.50]Break me, let me hear all hell out of night
[01:28.50]I'm wasted, I'll lower the gun to my throat
[01:30.50]Then I aim and I blow it
[01:32.50]It's just my heart, you throw it
[01:34.50]Step there, I call it, I'm putting it on the floor
[01:37.50]Who's that, you can't, now I'm knocking on the door
[01:43.50]Who's that, you can't, now I'm knocking on the door
[01:45.50]Who's that, I call it, say you don't love me no more
[01:48.50]We were sectioned now you won pick no Who that you can now I knocking on the door Who So who acting care now knocking on the door Who acting care now knocking on the door No I can know I gonna stay here
[02:00.10]And every word you say is secret law
[02:03.22]Riding into my corpse I like to care here
[02:05.72]So tell me what it was, feeling full
[02:09.06]Don't act like you're feeling full
[02:10.52]Am I burning a baby in me to leave a torch?
[02:13.44]Don't think you've thought I'd think it through
[02:15.20]Break me a little here, steal what that'll do
[02:18.60]Wasted or lower the gun to my throat and the amen let it out
[02:24.44]Take me out of the way, I'm putting it on the floor
[02:28.06]Who is it, you care about knocking on my door?
[02:35.66]Say you don't love me more, Give me a section, take now your opinion
[02:41.70]So who is it, you care about knocking on my door?
[02:48.60]I'm bleeding out of the sword
[03:18.60]Can't let my knock go` },

    { file: 'ThxSoMch - SPIT IN MY FACE (Official Music Video).mp3', title: 'SPIT IN MY FACE!', artist: 'ThxSoMch',
      lyrics: `[00:00.00]This is your fault
[00:28.02]I don't need you anyway
[00:30.58]Stumble at the bathroom
[00:33.06]Stumble at your own shit game
[00:35.64]Crank in the room with a noose and a bag
[00:37.86]Like a bitch who call me crazy
[00:39.14]Little hoe how does that work?
[00:40.82]Got some show but always smoke out the attic
[00:42.96]You're for it, I know we love to argue like you
[00:45.26]Taste it
[00:47.02]Sipping on that liquor you can
[00:48.42]Taste it
[00:49.64]God don't judge that drink I know you
[00:50.94]Taste it
[00:52.12]Don't know what to say except you
[00:53.56]Nah, nah, nah, nah, nah, nah
[00:55.82]You crush my heart and say it's nothing You broke me down, I kept all cutting
[01:00.92]I'd lay for you and now I'm gushing I'd lay for you but you'll never hear
[01:06.14]Spinning my face my love it won change Spinning my face my love it won change Spinning my face my love I your case Spinning my face my love I talking Spinning my face my love it won change because spitting my face my love it won change me But I been slacking my face my love it won fade me
[01:20.05]Spitting my face, my love, they won't change me
[01:24.31]Spitting my face, my love, it won't change me
[01:26.53]Spinning my face, my love, I feel mad
[01:31.09]For sure, Tommy gave it up, I'll leave everyone in a cold
[01:34.13]All I want to say, I'll do anything you condone
[01:35.31]Show me hell, where I'll shoot it, through my motherfuc***** bone
[01:37.39]She dead
[01:37.93]And the bitch so caught me crazy, little hoe had a sound
[01:41.49]She got to guess her job and I was so good at the attic
[01:44.27]You're worried, I know we learn to argue like you're that
[01:46.83]You crush my heart and say it's nothing
[01:49.37]You broke me down, I kept on cutting
[01:51.93]I'd lay for you and now I'm gushing
[01:54.49]I'd lay for you but you'll never
[01:56.89]You're strong
[01:57.79]Spinning my face, my love, it won't face me
[02:00.29]Spinning my face, my love, it won't change me
[02:02.87]Spinning my face, my love, I feel crazy
[02:05.37]Spinning my face, my love, I'm full straight
[02:07.87]Spinning my face, my love, it won't face me
[02:10.45]Spinning my face, my love, it won't change me
[02:13.05]Spinning my face, my love, I'm not crazy
[02:15.47]Spinning my face, my love, I'm not mad` },

    { file: 'ThxSoMch - Shakedown. (Official Music Video).mp3', title: 'Shakedown.', artist: 'ThxSoMch',
      lyrics: `[00:00.00]We'll be right back.
[00:30.00]I'm gonna hold this and I'm back down
[00:31.50]You're doing alright, you're doing just fine
[00:34.32]That's what I tell myself until it makes me wanna die
[00:36.84]The anger that's inside could take another slide
[00:39.34]I try to meditate but it's the truth that I do not understand my brain
[00:42.62]Just because I hate it, I don't mean anything to say
[00:45.08]Or worse because you hate it, I'm not the man I could be
[00:47.76]Nah, I'm tweaking out, quit tweaking out, hey
[00:51.30]So this is not a shutdown
[00:54.04]We just gotta call it but I'm pushing that flaked out
[00:56.74]You're coming when it's right now
[00:59.28]We just got a color but I hold this out and I'm blacked out
[01:01.80]So this is not a shutdown We just got a color but I pushing my face down You coming when it right now We just got a cover but I hold a cell and break down I once promised you could save mine
[01:14.52]Feel like I'm two people at the same time
[01:17.16]Popping to get rid of all the eight
[01:19.20]And then they're popping up with the brakes
[01:21.68]When I understand my brain
[01:23.08]Just because I hate
[01:24.04]I don't mean anything to say
[01:25.52]I'm worried, speak up too heavy
[01:26.56]I'm not the man I could pay
[01:28.14]Nah, I'm tweaking out
[01:29.86]Quit tweaking out, hey!
[01:32.18]This is Not a CheckDown
[01:41.18]This is Not a CheckDown
[02:01.68]you` },

    { file: 'ThxSoMch - Sound Of You Laughing (ft. Flawed Mangoes).mp3', title: 'Sound Of You Laughing (ft. Flawed Mangoes)', artist: 'ThxSoMch',
      lyrics: `[00:00.00]The sounds of a rap
[00:23.72]I think I heard it in this line, but I'm happy
[00:26.74]Can you consider me from this line, but I'm happy
[00:29.60]Looks like a million other people in the world
[00:32.50]I forgot, but you're the only girl
[00:34.58]I'm laughing, think I'm addicted to the sounds of the laughing
[00:38.40]I'm falling asleep before this nightmare
[00:40.54]I'm laughing, looks like a million other people in the world
[00:44.10]I forgot, but you're the only girl in this nightmare
[00:47.12]Let me die that you could sleep beside me
[00:50.36]Hear me now, this dream is you will never end
[00:53.24]Hear me now, this dream is you could never end
[00:56.18]Coming in again, this nightmare
[00:58.74]The only girl
[01:28.74]The sounds of the black the sounds of a dance baby The sounds of a dance baby The sounds of a rapping
[01:34.25]I think I heard it in this nightmare
[01:36.25]I'm happy
[01:37.25]Can you please send me from this nightmare?
[01:39.25]I'm having
[01:40.25]There's like a million other people in the world
[01:42.25]I forgot but you're the only girl
[01:44.25]I'm having
[01:45.25]Think I'm addicted to the sounds of a laughing
[01:48.25]I think you sent me from this nightmare
[01:50.25]I'm having
[01:51.25]There's like a million other people in the world
[01:53.25]I'm the one I forget man
[01:54.93]And you're only get this nightmare
[01:57.83]Let me die in a look or sleep inside me
[02:00.61]Come in how this dream is you gonna never end
[02:03.39]Give me how this dream is you gonna never end
[02:08.37]It's Nightman High, It's Nightman High
[02:11.73]I'm coming to you in a girl
[02:13.87]It's Nightman High When you're the one I remember
[02:19.91]It's Nightman High, It's Nightman High
[02:22.91]Nightman Heaven
[02:52.91]Thank you.` },

    { file: 'ThxSoMch - Swap Places (Official Music Video).mp3', title: 'Swap Places', artist: 'ThxSoMch',
      lyrics: `[00:00.00]I die, yeah, catch up, racist at the rip of God
[00:19.24]I swap places with you
[00:21.86]Cause heaven don't make four feel like you
[00:25.42]Cause heaven don't make medicine like you
[00:28.62]If I die, you get your grace, it's not that I move from
[00:33.54]Fuck your mates, do you?
[00:36.66]I don't have you what, everything I do
[00:39.78]Heaven never made anything like you
[00:42.90]If I die, you can bet me anyway
[00:47.90]No, I don't care
[00:51.08]As long as I'm with you
[00:54.22]Well, I'm sorry but
[00:57.14]I die, yeah
[00:58.64]Catch a racist, I can't rip off guns
[01:02.14]I swap places with you
[01:04.64]Cause heaven don't make Freud feel like you
[01:08.14]Cause heaven don't make medicine like you
[01:11.14]I had the time of my life Just thinking of you Sinking to my skin till this shit turned blue Heaven wasn made for my red dentists
[01:27.07]Please don't put it out of my knife
[01:30.07]I'm still dreaming of you
[01:33.07]Hope I don't awake cause this life's abuse
[01:37.07]If you lay me down, I'll stop me laying with you
[01:40.07]I can die of this old time with you
[01:44.07]Just come and die I'm gonna tell a story of two
[01:47.57]Before I die I'm coming over here
[01:51.07]Cause I can die I'm his love is heaven
[01:54.07]I die, yeah, catch up braces at the rib of God
[01:59.53]I swap places with you
[02:02.07]Cause heaven don't make forfeit like you
[02:05.71]Cause heaven don't make medicine like you
[02:08.87]I die, yeah, catch up braces at the rib of God
[02:13.87]I've got places with you
[02:16.49]Cause heaven don't make boy feel like you
[02:20.07]Cause heaven don't make better shit like you` },

    { file: 'ThxSoMch - Unhinged (ft. Jack Carden) (Official Music Video).mp3', title: 'Unhinged (ft. Jack Carden)', artist: 'ThxSoMch',
      lyrics: `[00:00.00]I liked you a little more when you were just a little unhinged
[00:06.16]When I took you out to dinner, you slapped the waiter
[00:10.56]Yeah, you were that bitch, but all them fancy bars
[00:14.62]I'm not dressing in cars, well do it make you think you're the shit?
[00:19.00]Well, if you plan to be a real woman that needs a real man
[00:23.54]Then maybe I'm him
[00:25.12]What would you do for a time?
[00:28.34]I want you to fall back
[00:31.42]I think that I'll explain
[00:34.70]I'm just looking at me
[00:37.96]You're a real tight fuck
[00:39.56]I liked you a little less
[00:42.64]When you would impress anybody but me
[00:45.94]When I took you out to dinner
[00:48.94]You tip the waiter with a pick of your bleep
[00:52.38]And so you trade my heart for another man's card
[00:56.20]I bet it makes you feel so rich Well if you plan to be a real woman that needs a real man Then maybe What would you do for a dollar What would you do for a buck
[01:09.46]I think that I like to pay
[01:12.96]I just said I'm gonna pay
[01:14.96]I just said I'm gonna pay
[01:15.96]If you're a real quick fuck
[01:17.96]What would you do for a dollar?
[01:19.96]What would you do for a buck?
[01:21.96]I think that I like to pay
[01:25.96]I hate you a little more than I can even afford
[01:35.36]You make me feel sick when I saw you out at dinner
[01:40.10]You're such a traitor, yeah, you're that prick
[01:43.44]And so you throw my soul into a six-foot hole
[01:47.36]I bet it makes you feel like a witch
[01:49.86]Well, if you plan to be a real woman that needs a real man
[01:54.72]Then maybe just quit` },

    { file: 'ThxSoMch - When The Devil Speaks.mp3', title: 'When The Devil Speaks...', artist: 'ThxSoMch',
      lyrics: `[00:00.00]I know we don't stop, cause we not fucking at you inside
[00:30.00]And then we start hiding ourselves and live
[00:31.80]Hey, hey, hey, hey, hey, hey, hey, hey, hey, hey, hey, hey
[00:34.48]Have you ever felt like you're a dummy on the hook?
[00:38.28]Have you been addicted to the taste of your blood?
[00:41.06]Feel like my whole life I've just been trying to find a look
[00:43.54]I don't stand down the barrel of a semi-alcon
[00:46.24]They don't wanna quit, I take some shit and let me feel
[00:48.76]Cause every day I wake up, it's just
[00:50.90]I just told my family doesn't see this thing go
[00:54.42]A guarantee, it's L.A.V. out here
[01:03.20]Tripping off a shit that I don't know cause I don't care
[01:05.98]Picking off the light, if I ain't sleeping I can
[01:08.32]Lay on me, or leave me be
[01:12.64]I don't care, cause no one hating me more than myself
[01:16.20]And I'm aware, I don't need no counsel, bitch
[01:18.70]I need your fucking breath
[01:19.80]He says to me
[01:23.80]Oh man I feel something wrong inside of your head I know we let go cause we not talking to you and say I know we let go we bring up glory I know you been chewing on the same old piece of gum
[01:56.71]You been moving out your mind is too slow
[01:58.71]But when that the leaves will change your color, but
[02:00.71]And I was standing on the ledge and acting like I wanna jump
[02:04.71]Till I shoot that shit and blow it up and make me
[02:06.71]Ooh, tell my mama, tell me stop
[02:08.71]Now I cool, took that shit and now I need another to go
[02:14.71]Oh, day one needs day
[02:16.71]So put a gun into my head
[02:20.71]And I will talk a shit I like, next step I need a chair
[02:23.71]I don't need no counselor bitch I need your fucking
[02:26.41]The devil speaks, he says to me
[02:31.51]Oh man, I feel there's something wrong inside of your head
[02:35.51]I know we lay poor cause we not talking until we say
[02:39.81]I know we lay poor cause we not talking until we say
[02:42.61]I know we don't stand until we stop right at our seven and eight
[02:45.61]I know we lay poor cause we not talking until we say
[02:51.01]I know we lay close if we not blow each other out
[02:53.87]I know we don't stop till we startin' ourselves in there
[02:56.69]And we go, hey, oh, hey, oh, hey, oh, hey, oh, hey, oh, hey, oh, hey` },

    { file: 'ThxSoMch - that btch dont even kno my name... (Official Lyric Video).mp3', title: 'that b＊tch don\'t even kno my name...', artist: 'ThxSoMch',
      lyrics: `[00:00.00]Music
[00:30.00]But I won't think of cravings I
[00:33.40]Unless there's people on my name
[00:36.94]Until it's up in flames, until I see my fate
[00:40.20]Until I leave my body, until I saw the case
[00:43.32]Through all the memories and the pain
[00:45.02]Through all the nights I had the rain
[00:46.62]Of all the things I could complain
[00:48.08]That bitch I'm leaving on my name
[00:50.12]That girl I'm leaving on my name
[00:56.52]Love is your evening, no matter
[01:02.06]That why I live in know my name It a girl in my machine I like you never seen it popping on your fucking shit
[01:16.54]She's telling me to jump, jump, jump into your fucking Lego
[01:19.68]But I don't fucking play ho, I'm not your fucking play-doh
[01:22.86]Don't know my news, bit in your face, I'll be the fucking player
[01:25.68]Reflection, my one's enemy infection that'll never leave
[01:28.76]Shot all of the medicine, I'll drive into my fingers, please
[01:31.74]And I'm afraid I don't see the light
[01:34.34]Or my body goes to the fire
[01:37.40]Until it's up in flames
[01:39.48]Until I see my fate
[01:40.96]Until I leave my body
[01:42.52]Until I saw the case
[01:44.08]Through all the memories and the pain
[01:45.78]Through all the nights I had the rain
[01:47.36]Of all the things I could complain
[01:48.84]That bitch I'm leaving on my nail
[01:50.82]That girl I'm leaving on my nail
[01:57.34]Love is your even no money
[02:02.46]That girl even no money
[02:08.80]It's a good one
[02:12.34]I'm not sure` },

    { file: 'Vacations - Telephones.mp3', title: 'Telephones', artist: 'Vacations',
      lyrics: `[00:00.00]Rise with the morning
[00:30.00]You called to me
[00:38.00]My thoughts are crawling
[00:43.60]You're sick
[00:49.00]I wish I could live without you
[00:57.00]But you're a part of me
[01:04.00]Wherever I go
[01:07.00]You'll always be next to me
[01:27.00]I not alone Fall into the night
[01:53.24]As I gaze into you
[02:00.40]Shine so bright
[02:05.96]It's all I do
[02:11.90]I wish I could live without you
[02:20.78]But you're a part of me
[02:24.96]Wherever I go
[02:30.00]You'll always be next to me
[02:35.20]You'll always be next to me
[02:46.56]You'll always be next to me
[02:52.72]You'll always be next to me
[02:59.18]You'll always be next to me
[03:29.18]Thank you.` },

    { file: 'Waiting.mp3', title: 'Waiting', artist: 'Mix',
      lyrics: `[00:00.00]I'm going to go.
[00:30.00]Thank you.
[01:00.00]you` },

    { file: 'WesGhost - DARK (Official Music Video).mp3', title: 'DARK', artist: 'WesGhost',
      lyrics: `[00:00.00]I'm a, I'm a motherfucking star
[00:02.16]I'm a motherfucking star
[00:08.28]I'm a motherfucking star
[00:30.00]What's good, you just my type I'm bad, that's what you like
[00:45.78]You crazy, you toxic But baby, so am I
[00:50.34]Tattoos all on your chest Those scars when you undress
[00:54.80]You like the pain, you like the way I kiss you on your neck
[00:59.24]You tell me I can't hurt you, your heart got nothing left
[01:03.78]But I see the way you look at me, pretend you need success
[01:08.02]You crazy, you toxic, but baby so am I?
[01:13.08]You crazy, you toxic, I'm a motherfucking star
[01:17.20]I'm missing me when it's done
[01:21.72]I'm a motherfucking star
[01:26.20]Black hole in my heart
[01:30.68]We can fake it for tonight We don have to think about it Keep it locked in my mind
[01:50.59]Put these feelings to the side
[01:53.33]Keep pretending you don't miss me
[01:57.75]Baby, that's just a lie
[01:59.75]You tell me I can't hurt you
[02:04.53]Your heart got nothing left
[02:06.57]But I see the way you look at me
[02:09.25]You send me what she says
[02:11.25]You crazy, you toxic
[02:13.25]But baby, show me more
[02:15.25]You crazy, you toxic
[02:17.25]I'm a motherfucking star
[02:21.25]Help me see me when it's done
[02:25.25]I'm a motherfucking star
[02:29.25]Black hole in my heart
[02:33.25]Don't fall in love
[03:03.25]I'm only happy when my eyes are closed` },

    { file: 'WesGhost - SPINE (Official Music Video).mp3', title: 'SPINE', artist: 'WesGhost',
      lyrics: `[00:00.00]Always in my mind, can't I see you tonight?
[00:15.72]I'll meet you anywhere you like, I'll be over at five
[00:18.82]If it's only for tonight, baby, is it alright?
[00:22.08]If I pretend it's your mind, such a pretty little lie
[00:25.40]Switch my spine till I'm paralyzed
[00:30.06]Hold me tight, can't you be home?
[00:36.46]I know this way you like, you know I hit it right
[00:42.96]And every time you send them shivers down your spine
[00:46.14]Attention all you like Adirond, no parachute so I had to fall
[00:49.62]You and me, we compatible, we tryna keep it real casual
[00:52.70]I don't know if you're the one All I know is how to ride
[00:58.92]I don't know if you're the one All I know is you're
[01:04.18]Always in my mind, can't see you tonight I'll meet you anywhere you like, I'll be over at five
[01:10.04]If it's only for tonight, baby, is it alright? If I present it, you're mine
[01:14.94]Such a pretty little lie, such a pretty little lie
[01:17.76]Twist my spine till I'm paralyzed
[01:21.36]Hold me tight, can't make it hard
[01:27.64]It's a freedom, life, freedom, life
[01:30.00]Now I can't focus on anything except for you
[01:32.48]Hands on your neck and it feel like a noose
[01:34.12]Better you over, I better the truth
[01:35.72]You know that I'm sober but I'm in the mood
[01:37.36]Talk to you like everyday, but you ain't mine, that's okay
[01:40.76]You look good, now I'm on the way
[01:42.34]Can't wait to make them life shape
[01:44.04]I don't know if you're the one
[01:46.90]All I know is how to run
[01:50.10]I don't know if you're the one
[01:53.26]All I know is you're the one
[01:55.40]Always in my mind, kiss` },

    { file: 'Why.mp3', title: 'Why', artist: 'Mix',
      lyrics: `[00:00.00]Thank you.
[00:30.00]Thank you.
[01:00.00]Thank you.` },

    { file: 'always by myself.mp3', title: 'always by myself', artist: 'Mix',
      lyrics: `[00:00.10]I am a loser and I'm always by myself I lost all the things that I can't live without
[00:07.12]She's here, says heart, then she leaves, says goodbye It's the same every time that she finds someone else
[00:14.14]You don't know how much I hate it She's torturing me and my own complications
[00:20.40]I see couples around me and I wonder to myself Why my life can't just be like this
[00:27.40]I am a loser and I'm always by myself
[00:31.68]I lost all the things that I can't live without
[00:34.94]She's here, says all right, then she leaves, says goodbye
[00:38.40]It's the same every time that she finds someone else
[00:41.96]You don't know how much I hate it
[00:44.92]She's torturing me and my own complications
[00:48.22]I see couples around me and I want her to mess up
[00:52.62]Why my life can't just be like hers
[00:55.28]I am a loser and I'm always by myself I lost all the things that I can't live without
[01:04.56]She's here, says hard, then she leaves, says goodbye It's the same every time that she finds someone else
[01:13.40]You don't know how much I hate it She's torturing me and my own complications
[01:21.24]I see couples around me and I wonder to myself
[01:26.66]Why my life can't just be like birds` },

    { file: 'be ur man.mp3', title: 'be ur man', artist: 'Mix',
      lyrics: `[00:00.00]Very sorrow days.
[00:07.64]I fall in love too easy.
[00:10.66]You don't understand.
[00:12.94]And if you would deceive me,
[00:15.32]I still would be a man.
[00:17.70]And I know you are talking
[00:19.86]to 50 other guys.
[00:22.54]Most of them are better.
[00:24.78]I'm not prioritized.
[00:26.80]I don't care if you're late.
[00:29.00]I want you to be next to me, even if you're fake
[00:33.64]Even though there's other guys that want to make your day
[00:38.52]I'll hold you super close, but you'll still run away
[00:43.24]It's funny how you don't admit that, you don't hesitate
[00:47.70]Falling love too easy
[00:58.14]You don't understand
[01:00.20]And if you would deceive me
[01:02.92]I still would be a man
[01:05.00]And I know you are talking
[01:07.62]To 50 other guys
[01:09.88]Most of them are better
[01:12.28]I'm not prioritized
[01:14.56]I don't care if you're late
[01:16.78]I want you to be next to me
[01:19.60]Even if you're fake
[01:21.40]Even though there's other guys
[01:24.46]That want to make your day
[01:28.14]Bye.` },

    { file: 'bedrott (slowed).mp3', title: 'bedrott (slowed)', artist: 'Mix',
      lyrics: `[00:00.00]DOS KEEP
[00:00.66]I've been here for days
[00:24.72]They tell me I'm a bad ride
[00:26.26]My mind's out of place
[00:27.58]Been thinking about what I'm not
[00:29.10]But is there a safe event?
[00:30.86]Like I can't talk
[00:31.86]I'm going to stay with a song
[00:34.34]I don't care about the fun
[00:35.86]I just really wanna run
[00:37.26]Somewhere I would never feel like
[00:38.94]I'm looking at a gun
[00:40.06]See my friends all having fun
[00:41.46]I'm so tired of feeling numb
[00:42.94]I don't think they fucking know me
[00:44.54]I'm here by the drums
[00:45.82]Can someone tell me
[00:49.66]When will it all pass?
[00:51.50]Cause I ain't been happy
[00:55.10]I'm so stuck on your face
[00:59.10]Outro Music I lost my chance a while ago
[01:11.68]Let my thoughts all overflow
[01:14.00]I let my hands freeze in the snow
[01:17.44]Holding on to come
[01:20.64]Holding on to come
[01:26.00]And you're dying to see me
[01:29.32]Can someone tell me
[01:34.78]When will it all pass?
[01:37.38]Cause I've been having me
[01:40.62]I'm so stuck in the past
[01:44.38]And I just can't get it back
[01:45.94]I'm time to relax
[01:47.12]I'm more on the desk
[01:48.64]And you know what I like
[01:49.98]Cause I lose my track
[01:51.76]All I do is run
[01:53.80]I'm done` },

    { file: 'cannot get over you.mp3', title: 'cannot get over you', artist: 'Mix',
      lyrics: `[00:00.00]I'm a big fan of the show.
[00:30.00]It's the pattern, it's the wise we need to go
[00:35.00]Cause we're just around there
[00:38.00]Nobody can get out there
[00:41.00]I know it happened, I won't remember that
[00:45.00]I know, that I'm not even more at all
[00:50.00]That's just my answer
[00:53.00]I know, that I'm not even more at all
[00:57.00]I've never been gone
[00:59.84]You know or else, right?
[01:01.84]Always in my sense
[01:04.16]You know how I'm feeling
[01:09.52]I went to your house, my sleep
[01:12.00]Doing the desk, my house
[01:14.30]I was waiting for you
[01:16.88]So I did it was such a wild And I don know I just was so grounded Don bring me out there I gonna have your heart
[01:27.95]Whatever that's me
[01:30.95]I know that I know that
[01:34.95]That's mine to have
[01:37.95]I know that I know that
[01:45.95]I'm a fan of the world.
[02:15.95]Outro Music` },

    { file: 'close my eyes.mp3', title: 'close my eyes', artist: 'Mix',
      lyrics: `[00:00.00]Always running through my head If I saw you in person, my face would get red
[00:22.04]Maybe in the future we can hang out all alone
[00:26.12]Though for right now I'm already dead
[00:30.20]I close my eyes and I'm holding your hand
[00:33.84]And I'll open my eyes and I'm alone in bed
[00:38.12]And I can't get out this cycle
[00:40.96]I'm losing my mind, oh
[00:42.92]I'm losing my mind, my mind, my mind
[00:46.12]Even if you gave me a chance
[00:49.36]We'll probably stop talking after a couple of weeks
[00:52.86]We'll move on, go find a new guy
[00:56.36]And then you will date him And then I wonder why that wasn me And then I go insane Question what I did wrong Question all my mistakes
[01:07.13]I made none
[01:08.73]And then I'll realize that
[01:10.89]She doesn't want me back
[01:12.85]It's probably cause I'm just a loser
[01:15.85]Close my eyes and I'm holding your hand
[01:19.89]And I'll open my eyes and I'm alone in bed
[01:23.69]And I can't get out this cycle, I'm losing my mind, oh
[01:28.73]I'm losing my mind, my mind, my mind
[01:32.15]Close my eyes and I'm holding your hand
[01:35.27]And now I'm holding my eyes and I'm alone in bed
[01:39.05]And I can't get out this cycle, I'm losing my mind, oh
[01:44.09]I'm losing my mind, my mind, my mind
[01:53.69]Thank you.` },

    { file: 'dopamina.mp3', title: 'dopamina', artist: 'Mix',
      lyrics: `[00:00.00]Quero logo chegar na escola pra poder te ver
[00:17.06]Você teu sina bate forte quando eu vejo você
[00:19.72]Escrevi no meu caderno mil motivos pra te ver
[00:22.76]Isso parece tão bobo, talvez eu seja clichê
[00:25.54]A bichinência bate forte quando tô longe de tu
[00:28.40]Você tá tipo em SPI, eu tô tipo no piru Mas não esqueça, baby girl, eu gosto muito de tu
[00:34.04]Você tá tipo videogame, eu sempre volto pra mim
[00:36.66]Ficar sabendo que eu quero você Acho que não dá mais pra esconder
[00:42.12]E toda noite eu quero te ver Mas por favor, não pergunte o porquê
[00:48.00]Eu falo girl, e cê fala o quê? E mesmo quieta cê me faz tremer
[00:53.48]E com você esqueci o ABC
[00:56.18]Fica sabendo que eu quero você
[00:59.22]Quero logo chegar da escola pra poder te ver
[01:02.24]Chego e jogo minha mochila, até deixo de comer
[01:05.06]Foi daí que escrevi os meus motivos pra te ver
[01:07.92]Minha mochila é importante, o que importa é você
[01:10.70]Seu cabelo me alacina, sua boca me domina
[01:13.60]E o seu beijo me alucina, se me injeta dopamina
[01:16.40]Dopamina me deixa forte, é como fazer esporte
[01:19.30]Tô lutando contra a sorte, mas eu já venci a morte
[01:22.16]Ficar sabendo que eu quero você
[01:24.72]Acho que não dá mais pra me esconder
[01:27.30]Toda noite eu quero te ver
[01:30.24]Mas por favor, não pergunte o porquê
[01:33.44]Eu falo girl, e se eu falo o quê?
[01:36.80]E mesmo quieto você me faz tremer
[01:38.66]E com você, se isso ABC
[01:41.36]Ficar sabendo que eu quero você` },

    { file: 'east coast.mp3', title: 'east coast', artist: 'Mix',
      lyrics: `[00:00.00]I
[00:30.00]Let's dispel it out, baby
[00:32.16]I want you to hurt my brain, baby
[00:35.82]When you go, where you go
[00:43.96]I don't wanna know
[00:46.38]When you go, where you go
[00:58.48]Don't tell me so
[01:00.96]And I lost hope on the East Coast And I lost hope on the East Coast And I lost hope on the East Coast And I lost hope on the East Coast
[01:22.10]I'm a big fan
[01:38.50]Of a rock band
[01:41.98]You'll never understand
[01:44.58]I got big plans
[01:53.46]For a small man
[01:56.66]You'll never understand
[02:08.50]Thank you.` },

    { file: 'fake ur face.mp3', title: 'fake ur face', artist: 'Mix',
      lyrics: `[00:00.00]I can't be waiting for you girl, I can't be waiting for you
[00:20.32]You always leave me undelivered and you don't have a clue
[00:24.44]I always think about you girl, but you don't think about me
[00:28.46]I wanna hide my face so you would actually think I'm pretty
[00:32.42]You wear your makeup to feel like there's no mistakes
[00:36.46]You wanna be very perfect, fake your face
[00:40.58]Why don't you work on your inside, it falls away
[00:44.52]You wanna be very perfect, fake your face
[00:48.72]Care too much of what other people think
[00:52.34]But you don't care of what I see
[00:55.96]La la la, why can't you just be yourself and not fake?
[01:01.52]You're always driving me really insane
[01:05.18]You move on way too fast, oh girl you move on way too fast
[01:08.96]You've had 50 exes, well I can't even get one to last
[01:13.02]Tell me that you love me but I know you don't want me back
[01:17.02]You've said it to a million other boys so we get attached
[01:21.16]You wear your makeup to feel like there's no mistakes
[01:25.26]You wanna be very perfect, fake your face
[01:29.38]Why don't you work on your inside, it falls away
[01:33.34]You wanna be very perfect, fake your face
[01:37.52]Care too much of what other people think
[01:41.16]But you don't care of what I see
[01:44.76]La la la, why can't you just be yourself and not fake?
[01:50.34]You're always driving me really insane` },

    { file: 'give me a chance.mp3', title: 'give me a chance', artist: 'Mix',
      lyrics: `[00:00.00]Pass her in the hall, but she won't ever glance
[00:03.56]Pass her to the ball, but she won't even dance
[00:06.80]I try to call, but she won't give me a chance
[00:10.02]I sit in silence, cause I know that I'll get fed
[00:12.88]I just wanna talk to you, I thought you were my friend
[00:15.98]You can't even look at me, it's like we play pretend
[00:19.10]If you keep on acting strange, you won't see me again
[00:24.24]I'm always stuck being friends
[00:25.94]You know what you do
[00:29.40]I'll just break in two
[00:32.58]I'll break inside of your room
[00:35.80]I'll break inside of your room
[00:39.02]Pass her in the hall, but she won't ever glance
[00:42.30]Pass her to the ball, but she won't even dance
[00:45.48]I try to call, but she won't give me a chance
[00:48.72]I sit in silence, cause I know that I'll get fans
[00:51.94]I think about you all the time
[00:54.14]I think it's kinda weird how you'll never be mine
[00:57.42]Everybody's looking at me and they think I'm sad
[01:00.62]No need to play pretend, it's just one big fad
[01:03.92]She left me on scene, I think it's crazy
[01:07.46]Why are you so mean? I know I'm lazy
[01:10.62]I don't wanna just play pretend
[01:12.50]I don't wanna just play pretend
[01:15.76]I don't wanna just play pretend
[01:19.02]You know I hate all your friends
[01:20.70]Girl, why you acting different?
[01:22.20]I guess it's where it all ends
[01:23.80]I don't wanna have to pretend
[01:25.44]Pass her in the hall, but she won't ever glance
[01:33.90]Pass her to the ball, but she won't even dance
[01:37.14]I try to call, but she won't give me a chance
[01:40.36]I sit in silence, cause I know that I'll get fanned` },

    { file: 'give me hints.mp3', title: 'give me hints', artist: 'Mix',
      lyrics: `[00:00.00]Can you give me hits or I will lose my mind?
[00:05.14]Do you really even like me or is it another guy?
[00:09.18]Then I'll see you walking with him, why the hell you walking with him?
[00:12.80]You don't even realize that you made me cry
[00:16.18]I can't afford the things I adore, I want her to love me
[00:23.56]I sat in class with her, but all she did was ignore me
[00:29.92]I-I-I'm always ignored, I-I'm always ignored
[00:34.18]No, I'm always ignored, I'm always ignored
[00:37.58]She will never like me, she will never like me
[00:41.54]Always with a new guy because she is a
[00:44.58]Can you give me hints or I will lose my mind?
[00:48.80]Do you really even like me or is it another guy?
[00:52.60]Can you give me hints or I will lose my mind?
[00:55.96]Do you really even like me or is it another guy?
[00:59.92]Can you give me hints or I will lose my mind?
[01:03.52]Felt like we were flirting, but you do it to every guy
[01:07.00]Then I'll see you walking with him, why the hell you walking with him?
[01:10.98]You don't even realize that you made me cry
[01:14.20]Can you give me hints or I will lose my mind?
[01:18.82]Do you really even like me or is it another guy?
[01:24.08]Then I'll see you walking with him, why the hell you walking with him?
[01:28.74]You don't even realize that you made me cry` },

    { file: 'glaive - the prom (official lyric video).mp3', title: 'the prom', artist: 'glaive',
      lyrics: `[00:00.00]I skipped my high school prom
[00:02.48]Now that part of me is gone
[00:05.18]So I don't pick up my clothes
[00:08.02]At all, at all
[00:10.12]And maybe just maybe I'm wrong
[00:13.08]Or maybe I'm right
[00:14.72]And I won't see them for the rest of my life
[00:17.32]Remember that night when things were alright
[00:19.84]And I wasn't there and y'all didn't care
[00:22.60]To text or call or anything in this
[00:25.48]Slide it
[00:26.56]I told you that I don't mind it
[00:29.30]The look of her face said I'm lying, I'm lying like
[00:33.44]Oh, oh, why do I do that?
[00:36.10]Oh, oh, why do I do that?
[00:38.82]Oh, oh, why do I do that?
[00:41.46]To myself, to everyone else
[00:43.88]To my friends, to everyone in between
[00:46.58]Oh, oh, why do I do that?
[00:49.30]Oh, oh, why do I do that?
[00:52.12]It's complicated, yeah, I know
[00:54.66]It's complicated, yeah, I know
[00:57.32]One day I be the king of something One day I be the queen of something Right now I just the king of nothing Right now I just the queen of nothing Hurt my face get me seen in public
[01:11.29]Hurt my face cause I know I'm blushin'
[01:13.73]I'm embarrassed, so I just stay in my parents' house
[01:18.63]I'm terrified in my hometown
[01:21.53]I'm petrified, I let them down
[01:24.23]I didn't want to go, I just feel
[01:27.09]Slided
[01:28.09]I told you that I don't mind it
[01:31.09]But look on my face and I'm lying, I'm lying like
[01:35.23]Oh, oh, why do I do that?
[01:37.87]Oh, oh, why do I do that?
[01:40.53]Oh, oh, why do I do that?
[01:43.23]To myself, to everyone else
[01:45.65]To my friends, to everyone in between
[01:48.35]Oh, oh, why do I do that?
[01:50.99]Oh, oh, why do I do that?
[01:53.67]It's complicated, yeah, I know
[01:56.41]It's complicated, yeah I know` },

    { file: 'i have no friends.mp3', title: 'i have no friends', artist: 'Mix',
      lyrics: `[00:00.00]Today I realize that I have no friends and I'm so alone
[00:04.22]I feel so isolated, no one's ever texted my phone
[00:08.40]Everyone is so fake, I wanna hide away
[00:12.42]Cause no one cares about me, all they do is laugh in my face
[00:16.90]Today I realize that I have no friends and I'm so alone
[00:20.92]I feel so isolated, no one's ever texted my phone
[00:25.08]Everyone is so fake, I wanna hide away
[00:29.12]Cause no one cares about me, all they do is laugh in my face
[00:33.34]Seeing couples walk right past me, holding hands so very tightly
[00:41.00]Something about it makes me hate them, makes me jealous
[00:47.34]Why can't it be me?
[00:50.32]Today I realize that I have no friends and I'm so alone
[00:54.30]I feel so isolated, no one's ever texted my phone
[00:58.48]Everyone is so fake, I wanna hide away
[01:02.52]Cause no one cares about me, all they do is laugh in my face
[01:06.98]Today I realize that I have no friends and I'm so alone
[01:11.04]I feel so isolated, no one's ever texting my phone
[01:15.18]Everyone is so fake, I wanna hide away
[01:19.22]Cause no one cares about me, all they do is laugh in my face
[01:28.48]Thank you.` },

    { file: 'i love u so much.mp3', title: 'i love u so much', artist: 'Mix',
      lyrics: `[00:00.00]I love you so much it makes me wanna commit suicide
[00:23.96]Think about you constantly, I think I'm gonna lose my mind
[00:28.58]I just wanna feel like I got somebody that's on my side
[00:33.04]I just wanna feel, I just wanna feel
[00:37.16]I'm so tired all the time, I don't know if it's you or me
[00:41.86]I've been struggling to trust anybody, anything
[00:46.14]I'm so sorry for this song and all my negativity
[00:50.32]When I leave this earth, I just hope that you will remember me
[00:58.58]When I leave this earth I just hope that you will remember me
[01:17.38]When I leave this earth I just hope that you will remember me
[01:28.58]Thank you.` },

    { file: 'im not alright.mp3', title: 'im not alright', artist: 'Mix',
      lyrics: `[00:00.00]I'm happy in the morning, but I'm really sad at night
[00:20.72]You wouldn't even notice me, maybe I'm an ugly guy
[00:27.94]No one's ever texting me, my phone is really dry
[00:35.38]I think about you way too much, but you'll never be mine
[00:57.94]No one understands my life No one knows what's in my mind
[01:05.82]I keep telling her that I'm okay But I'm not alright
[01:12.18]I'm happy in the morning But I'm really sad at night
[01:19.78]You wouldn't even notice me Maybe I'm an ugly guy
[01:27.00]No one's ever texting me, my phone is really dry
[01:34.42]I think about you way too much, when you kiss him I cry
[01:57.00]you` },

    { file: 'im so blue for you (remix).mp3', title: 'im so blue for you (remix)', artist: 'Mix',
      lyrics: `[00:00.00]I want you inside my room, but I'm just too scared to make a move
[00:04.82]I feel so depressed sometimes, cause I can't ever seem to get to you
[00:10.26]Missing you such a damn long time, your love always got me feeling blue
[00:15.26]Hey mister, where'd you get those drugs? Smoking seems like a lot of fun
[00:20.46]In my youth it was all the love, nowadays I'm smoking tons
[00:25.62]Hell, your hair can't get enough, I'm doing stuff you can't dream of
[00:30.94]Mischief always on the run, spend your days hoping in the sun
[00:36.02]I feel so depressed sometimes, cause I can't ever seem to get to you
[00:41.30]Missing you such a damn long time, your love always got me feeling blue
[00:46.34]Wait away while in my prime, avoid me like you always do
[00:51.52]In my room making all these rhymes I only wrote these songs for you
[00:56.76]I just wanna see you tonight Wanna be with you all the time
[01:02.06]Don't ask me, I'm not really fine Mental health, I'm going to die
[01:07.30]Tengo frío y te quiero acá Sin ti no puedo descansar
[01:12.62]Ya no me sirve ni llorar Porque se es que no me va mal
[01:17.70]This drug me is bad the cigar me will kill I tired of thinking about it I don believe you Sometimes I feel very bad because I don know where you are Estoy cansado de sobrepensar Ya no creo en tus mentiras A veces me siento muy mal Porque yo ya no s d est t
[01:32.93]Yo solo te quiero abrazar
[01:35.37]Pero es que con tu amor me siento zoom
[01:38.13]Yo no sé qué me va a pasar
[01:40.61]Tú con tu amor me vas a matar
[01:43.09]Yo no sé qué me va a pasar
[01:45.81]Tú con tu amor me vas a matar
[01:48.35]I don't know, it's just a plan
[01:50.95]It feels like I don't get no rest
[01:53.55]I'm thinking you were always the best
[01:56.15]Wish I could go back into my nest
[01:58.89]Why can't I be as good as the other guys?
[02:01.73]Why do you gotta tell me all your stupid lies?
[02:04.35]Why do you gotta make up these rumors?
[02:06.87]Because soon I might come in suicide
[02:09.27]I feel so depressed sometimes
[02:11.61]Cause I can't ever seem to get to you
[02:14.35]Missing you such a damn long time
[02:16.83]Your love always got me feeling blue
[02:18.95]¡Suscríbete al canal!
[02:48.95]Es lo bien en la tarde` },

    { file: 'it be okay.mp3', title: 'it be okay', artist: 'Mix',
      lyrics: `[00:00.00]Sarni, you're a bitch!
[00:08.82]Sarni!
[00:30.00]Push you away, cause I like it when I'm all alone
[00:37.34]Let me decay, cause nobody ever on my phone
[00:41.58]Living this way, lost count of the days
[00:45.26]But I will always stay, don't want it any other way
[00:49.76]Every week's the same, Friday to Sunday
[00:54.08]I keep on telling myself that it'll be okay
[00:58.54]Will I ever fall in love? Probably someday
[01:02.44]I don't wanna be in love, does it feel okay?
[01:08.84]It doesn't feel okay
[01:12.04]Apologize when I fall
[01:25.76]I get flushed too easy, doesn't help at all
[01:30.10]I guess it's fake
[01:32.26]I'm destined to be this way
[01:35.00]I know it's fake
[01:36.26]Cope with the game that I'll play now
[01:40.26]Every week's the same
[01:42.46]Friday to Sunday I keep on telling myself that it be okay Will I ever fall in love probably someday I don wanna be in love doesn feel okay
[01:57.01]Every week's the same, Friday to Sunday
[02:00.83]I keep on telling myself that it'll be okay
[02:05.33]Will I ever fall in love, probably someday
[02:09.21]I don't wanna be in love, doesn't feel okay
[02:13.55]I'm going to go to the next one.
[02:43.55]It doesn't feel enough to be alone
[02:50.49]I know it's soft with this and trust
[02:54.69]Wanna spill but you never call my phone
[02:58.91]Cause I'm fighting all alone
[03:01.91]Oh-oh-oh
[03:03.59]Zarny, you're a bitch!
[03:13.55]We'll see you next time.` },

    { file: 'late night drive home - Stress Relief (Official Video).mp3', title: '＂Stress Relief＂', artist: 'late night drive home',
      lyrics: `[00:00.00]I never thought you were
[00:29.98]You'd end up with me for long, baby
[00:34.24]Running in quicksand to keep you here with me
[00:40.38]I had you in my head, baby, every day
[00:44.72]Towards the end I just couldn't hear your name
[00:48.20]It's just relief from everything
[00:59.98]It's just your way from everything
[01:05.86]Tell me, tell me you love me
[01:11.90]Come back, come back to haunt me
[01:15.24]Oh, won't you let me be myself?
[01:21.88]I was holding on, but you didn't see my shots, baby
[01:28.84]All the times that I couldn't speak
[01:33.20]My thoughts were made me
[01:36.14]Well this is what I wanted please don feel so bad In love with the ghost please don you come back Well this is what I wanted please don feel so bad In love with the ghost please don come back If this is what I wanted please don feel so right In love with the ghost please don come back
[01:56.42]It's best you're letting from everything
[02:02.42]Tell me, tell me you love me
[02:06.42]Come back, come back to only will you, only let me be myself
[02:16.42]That's difficult, I never done a lot of this, it got easier to turn, but
[02:23.52]If you can come with me, love
[02:27.56]I teach you everything that I have
[02:31.20]Why do you treat me like this?
[02:34.66]How do you do it?
[02:36.80]Tell me you love me
[02:54.84]Come back to harm me
[02:58.30]Won't you just let me be myself
[03:06.80]Tell me Tell me Tell me
[03:10.18]Come back to me
[03:13.58]I won't want you
[03:15.76]Can we let me
[03:16.84]Me
[03:17.80]Myself` },

    { file: 'late nights in june.mp3', title: 'late nights in june', artist: 'Mix',
      lyrics: `[00:00.00]Heartbreak, I've always had it the most
[00:02.70]Always in my room singing for the dope
[00:05.74]About a girl I've ridden all these woes
[00:08.84]Depressed and I don't wanna screw your flow
[00:11.76]Thought I was just all invincible
[00:14.68]But everyone's treated me like a funny joke
[00:18.20]I'm so tired of being so ignored
[00:21.20]One day you'll find me on the bathroom floor
[00:24.34]In the future, will I still be loved?
[00:27.04]Seems like now I don't know who anymore
[00:30.38]When I feel your touch, can't get enough
[00:32.86]We still got all our stories to explore
[00:36.48]Rove around, feelin' always lost
[00:39.32]And I remember the brown eyes I saw
[00:42.26]Every night I bash my head in a wall
[00:45.18]Cause I know for sure I really dropped the ball
[00:48.28]I don't care, I want you tonight
[00:51.38]Your purple hair is all I need
[00:54.46]Running from you my entire life
[00:57.48]I feel like I ran out of time
[01:00.46]In every single life you promised you would always be there
[01:06.48]And every single time it seems like you would fail to care
[01:12.94]That one night in June it felt like such a scary nightmare
[01:17.96]Now I'm worried you'll just leave me up in here
[01:24.34]Thought I was just all invincible
[01:27.34]But everyone's treated me like a funny joke
[01:30.34]I'm so tired of the intro
[01:33.34]Ignored one day you'll find me on the bathroom floor
[01:36.34]In the future will I still be loved?
[01:39.34]Seems like now I don't know anymore
[01:42.34]When I feel your touch can't get enough
[01:45.34]We still got all our stories to explore
[01:51.34]Zombie webs` },

    { file: 'loser club.mp3', title: 'loser club', artist: 'Mix',
      lyrics: `[00:00.00]Totally better than fucking nobody
[00:02.96]You are so goddamn pathetic
[00:13.50]I just can't forget that your friends think I'm a loser and shit, I hate it
[00:20.90]Don't talk the thing away, don't talk, don't talk the thing away
[00:25.08]Loser
[00:25.84]Don't know what to say, you'll probably leave my head astray
[00:29.62]Don't talk or think away, don't talk, don't talk or think away
[00:34.22]I don't know what to say, you'll probably leave my head up straight
[00:39.16]I just can't forget that your friends think I'm a loser and shit are here
[00:49.54]I'm scared for you
[00:55.12]That your friends think I'm a loser
[00:58.10]And shit, I hear you
[01:00.40]Don't talk, don't talk, don't talk, don't think away
[01:05.16]Lose that
[01:06.06]I don't know what to say
[01:07.82]You'll probably leave my head a straight
[01:10.42]Don't talk, don't think away
[01:13.04]Don't talk, don't talk, don't think away
[01:15.72]I don't know what to say
[01:18.38]You'll probably leave my dad a-` },

    { file: 'lucy.mp3', title: 'lucy~', artist: 'Mix',
      lyrics: `[00:00.00]We are now at the University of Minnesota
[00:30.00]Spine off the track Laying still on the grass
[00:37.00]When did things move so damn fast?
[00:41.00]We are now at the University of Minnesota
[01:11.00]Is there a difference?
[01:14.84]But do we know about your little bit of real?
[01:20.08]Let's go!
[01:25.28]I need some grace to fit from you
[01:34.96]Yeah.
[01:57.48]Yeah.` },

    { file: 'mthu - its like im not even here.mp3', title: 'it\'s like i\'m not even here', artist: 'mthu',
      lyrics: `[00:00.00]I had it under control
[00:18.40]Everything I loved, everything that I own
[00:22.68]And every time I think about it, I miss my home
[00:26.76]And every day I'm waiting for you to hit my phone
[00:30.78]And I wish you would not
[00:32.56]I'm so in love with you
[00:34.36]You're so in love with him
[00:36.40]I don't know what to do
[00:38.46]Girl, I'm a fool now
[00:40.50]It's getting hard to breathe
[00:42.54]Drugs all in my body
[00:44.44]I can't do nothing right
[00:46.60]Girl, I'm a loser
[00:48.38]And you knew I was here
[00:51.60]Making all these songs that somebody will hear
[00:55.16]Cause I'm not good at anything, I always fall short
[00:59.30]Always bullshit, always gifted in some way or some sort
[01:03.30]I'm so fucking depressed, I feel like I'm a waste
[01:07.48]And my mental fucked up, all I really wanted was space
[01:11.56]And don't talk to me cause I don't ever know what to say
[01:15.60]A cigarette for me, a lighter for my mistakes
[01:25.16]so` },

    { file: 'not anywhere.mp3', title: 'not anywhere', artist: 'Mix',
      lyrics: `[00:00.00]I wanna meet him, can't wait to see him
[00:24.00]He looks like something that I'd see in a museum
[00:27.22]His thoughts are empty
[00:29.16]He's looking dirty
[00:31.02]And I could hurt him
[00:32.82]Cause I know he wouldn't stop me
[00:34.80]But you don't need to feel so upset
[00:41.12]Don't talk to me and pretend you care
[00:46.48]He's not here, he's not there
[00:48.30]He's not anywhere
[00:57.22]I going to go to the next one I got a notion
[01:09.91]There's no emotion
[01:11.63]He's just an auto-response
[01:14.15]To the commotion
[01:15.43]He's got no future
[01:17.35]He's just a loser
[01:19.07]There are no meds
[01:20.71]So pull his head out of his stupor
[01:23.07]You got his number
[01:24.65]He's like a sunburn
[01:26.65]He'll always hit you till you scratch, you never lurker
[01:30.19]Don't forget that it's all in your head
[01:37.49]Don't look at me and pretend you care
[01:41.85]I'm not here, I'm not there, I'm not anywhere
[01:56.65]Thank you.` },

    { file: 'overtonight - comfort song 4 u (official visualizer).mp3', title: 'comfort song 4 u', artist: 'overtonight',
      lyrics: `[00:00.00]Nothing but a heartbreak, causes some real change
[00:04.40]When you feel down, you'll be stuck in the dark days
[00:06.94]But it'll turn around
[00:07.96]I remember all my worst days and birthdays
[00:10.06]Sitting inside of my room
[00:11.90]Suddenly a limousine crashes fucking into me
[00:15.48]I can't feel less dead than I do
[00:18.00]I can't fall in love with you, no
[00:20.00]I don't know what you will do
[00:22.14]Tell me, I'ma hang from a motherfucking tree
[00:25.50]I'ma hang from a motherfucking tree
[00:28.12]But a heartbreak causes some real change
[00:30.22]When you feel down, you'll be stuck in them dark days
[00:32.74]But it'll turn around
[00:33.78]I remember all my worst days, birthdays
[00:35.86]Sitting inside of my room
[00:37.66]Suddenly a limousine crashes fucking into me
[00:41.24]I can't feel less dead than I do
[00:43.82]Woke up this morning too, it's like some awful one
[00:46.08]And they say that she hates me and I'm all on my own
[00:48.56]I guess I'm lonely, I'm not scared
[00:50.50]Spent my whole life on me lonely, so I don't care
[00:53.14]Nothing but a heartbreak causes some real change
[00:56.02]You'll feel down, you'll be stuck in the dark days
[00:58.56]But it turn around I remember all my worst days birthdays Sitting inside inside of my room I won shake the evil thoughts Cause the evil thoughts That we always away
[01:09.79]I'm tired of evil
[01:11.47]Trying to save me change
[01:13.25]When I was this way
[01:15.11]This way
[01:15.73]Just running away
[01:17.05]In my bed I'll stay
[01:18.85]For the rest of my day
[01:20.05]Oh, I got the house on my chest
[01:21.59]Please, since today
[01:22.79]I got played
[01:23.49]I would never be the same
[01:24.79]It's a shame
[01:25.45]I'm sad about a bitch like that
[01:27.39]Gotta feel low just to bounce right back
[01:29.97]I know fears fall under paper
[01:31.97]Writing comfort songs for you
[01:34.81]I hope that you feel the worst
[01:37.73]I'll see when I write a few
[01:39.69]Nothing but a heartbreak causes some real change
[01:47.55]When you feel down you'll be stuck in those dark days
[01:50.09]But it'll turn around
[01:51.13]I remember all my worst days and birthdays
[01:53.21]Sitting inside of my room
[01:55.05]Suddenly a limousine crashes fucking into me
[01:58.63]I can't feel as dead than I do
[02:01.13]I can't fall in love with you, no
[02:03.13]I don't know what you want to do
[02:05.69]Me` },

    { file: 'overtonight - elephant cage (official video).mp3', title: 'elephant cage', artist: 'overtonight',
      lyrics: `[00:00.00]Oh, you can't run but you can't hide, you know you can't get away
[00:07.94]I'll just be lurking out your building every goddamn day
[00:12.00]If I could tell you what my purpose is, I'd probably say
[00:16.08]I'm meant to be inside a circus in the elephant cage
[00:20.34]I lost my job cause I would never do shit at all
[00:24.46]I'm not that handsome, but they think I am cause I'm tall
[00:28.40]I need her number, I think that we will get along
[00:32.48]And it's December, consider this your new Christmas
[00:36.40]Oh, you can't run but you can't hide, you know you can't get away
[00:40.64]I'll just be lurking out your building every goddamn day
[00:44.80]If I could tell you what my purpose is, I'd probably say
[00:48.92]I'm meant to be inside a circus in the elephant cage
[00:53.10]I'd spend my whole life fucking worried, but I am okay
[00:56.40]Okay, it's not a worry but at least I am not in a grave
[01:01.34]If I could get a gun I'd use it in a bag
[01:04.48]It's my aim I would go point that shit in my head and I'd blow my brain
[01:09.34]I don wanna ruin her night but I might go Inside the party with a knife like a psycho I know it gets hard to sleep inside the stronghold You saving the battles from that rose
[01:25.51]I gave you, I cannot escape you
[01:28.51]I found some different holes but not a different place
[01:32.51]It's you
[01:33.51]Oh, you can run but you can't hide, you know you can't get away
[01:52.87]I'll just be lurking out your building every goddamn day
[01:56.15]If I could tell you what my purpose is, I'd probably say
[01:59.47]I'm meant to be inside a circus in the hell of a cage
[02:02.73]I lost my job cause I would never do shit at all
[02:06.03]I'm not that handsome, but they think I am cause I'm tall
[02:09.25]I need her number, I think that we will get along
[02:12.53]And it's December, consider this your new Christmas
[02:15.53]Oh, you can run but you can't hide, you know you can't get away
[02:18.91]I'll just be lurking out your building every goddamn day
[02:22.27]If I can tell you what my purpose is, I'd probably say
[02:25.51]I'm meant to be inside a circus in the hell of a cage
[02:29.47]Thank you.` },

    { file: 'overtonight - mirrors demo (official video).mp3', title: 'mirrors demo', artist: 'overtonight',
      lyrics: `[00:00.00]Take down all the mirrors in my house
[00:02.26]I hate my nose, eyes at my mouth
[00:04.18]I hate the jokes I laugh about
[00:06.14]I hate the hoes I'm sad about
[00:08.08]She calls up my phone
[00:09.94]Ringin', ringin', ringin', ringin', baby, just leave me alone
[00:12.12]She saw all my flaws, baby
[00:14.38]Won't you tell me what the fuck I'm doing in the room?
[00:16.58]I hate the feeling I'm hiding out
[00:18.48]So I wanna die on top of my couch
[00:20.70]Oh, well, oh, oh, oh, oh, oh
[00:24.42]What do you want from me?
[00:26.18]I'm never, ever good for anything
[00:28.42]Why do you talk to me? I'm never, never by your earring
[00:32.78]Do I have a question? I'm like, oh I have a question
[00:36.08]Do I have a question? I'm like, oh I have a question for you baby
[00:40.96]How do I really even matter to you? When you was outside laughing with another dude
[00:44.86]You make me hate my face so much, oh
[00:50.08]When will I ever feel that take down all the mirrors in my house?
[00:55.12]I hate my nose, eyes at my mouth
[00:57.02]I hate the jokes I laugh about
[00:58.98]I hate the hoes I'm sad about
[01:00.92]She calls up my phone
[01:02.78]Ringin', ringin', ringin', ringin', baby, just leave me alone
[01:04.96]She saw all my flaws, baby, won't you tell me what the fuck I'm doing
[01:08.78]And I'll rule, I hate the feeling I'm eyeing out
[01:11.30]So I wanna die on top of my couch
[01:13.56]Oh, oh, oh, oh, oh, oh
[01:17.30]What do you want from me?
[01:19.04]I'm never, ever good for anything
[01:21.28]Why do you talk to me?
[01:23.06]Under every everybody
[01:24.68]You're on all the mirrors in my house
[01:27.76]I hate my nose, eyes in my mouth
[01:30.16]I hate the jokes I laugh about
[01:32.54]I hate the hoes I'm sad about
[01:34.96]She calls up my phone
[01:37.22]Ringin', ringin', ringin', ringin'
[01:38.74]Baby, just leave me alone
[01:39.98]She saw all my flaws
[01:42.46]Baby, won't you tell me what the fuck I'm doing?` },

    { file: 'overtonight - one big prison (official audio).mp3', title: 'one big prison', artist: 'overtonight',
      lyrics: `[00:00.00]Who would you want me instead?
[00:01.68]If maybe I look different, I'll slip and fall on my head
[00:04.48]To start my reminiscence
[00:05.72]All I have is regret, I'll never fucking win it
[00:08.64]I'm so glued to my bed, and I have all the vision
[00:11.48]All my life is pretend, it's like there's something missing
[00:14.30]She just wants to be friends, it's such a bad decision
[00:17.16]When does it all ever end?
[00:18.96]I'm on an endless mission, I hate everything
[00:21.68]It's like there's one big prison
[00:22.96]My eyes out of my skull, gonna beat myself up all night long
[00:28.04]I will be unhealthy until I know
[00:30.80]I like to think of people who will never return to my life
[00:33.96]Face around my room and tell myself I'll be alright
[00:36.86]I will not kill myself unless I have a real bad night
[00:39.68]Goddamn, recently I'm having some bad nights
[00:42.82]Who would you want me instead?
[00:47.28]If maybe I look different, I'll slip and fall on my head
[00:50.06]To start my reminiscing, all I have is regret
[00:52.76]I'm never fucking winning, I'm so glued to my bed
[00:55.82]Then I have hollow vision, all my life is pretend
[00:58.70]It's like there's something missing, she just wants to be friends
[01:01.58]It's such a bad decision, when does it all ever end?
[01:04.54]I'm on endless mission, I hate everything
[01:07.18]This life is one big business One big business Who would you want me instead
[01:35.89]If maybe I look different, I'll slip and fall on my head
[01:39.07]To start my reminiscing, all I have is regret
[01:42.05]I'm never fucking winning, I'm so glued to my bed
[01:45.47]And I have all the vision, all my life is pretend
[01:48.53]It's like there's something missing, she just wants to be friends
[01:51.85]It's such a bad decision, when does it all ever end?
[01:55.15]I'm on an endless mission, I hate everything
[01:58.17]It's like there's one big prison, my eyes out of my skull
[02:01.99]Gonna beat myself all night long
[02:05.17]I will be unhealthy until I'm gone
[02:08.31]I like to think of people who will never return to my life
[02:11.79]Face around my room and tell myself I'll be alright
[02:14.99]I will not kill myself unless I have a real bad night
[02:18.15]God damn, recently I'm having some bad nights` },

    { file: 'overtonight - trick or treat (official video).mp3', title: 'trick or treat', artist: 'overtonight',
      lyrics: `[00:00.00]I really wanna beat someone, put the gun to his mouth, make sure he never speak again
[00:04.40]I'm walking down the street on Halloween
[00:07.90]I see some ghosts and they're looking at me
[00:12.56]One of them rode on the side of a tree
[00:16.92]Over tonight, you're so fucking ugly
[00:21.02]I wanna rip off all the skin that's on your face, girl
[00:26.00]I wanna kill you so that I can't be replaced, girl
[00:30.52]Your ex is gone, I had to cut his head off
[00:35.38]You don't belong with anybody but me
[00:39.62]Oh God, you're so damn pretty
[00:43.54]I get so fucked in my head whenever you're not with me
[00:47.96]I smell your scent in my bed from the last time you kissed me
[00:52.34]She smokes some cigarettes, it helps her not miss
[00:56.64]I'm walking down the street on Halloween
[01:00.26]I see some ghosts and they're looking at me
[01:04.90]One of them rode on the side of a tree
[01:09.22]Over tonight, you're so fucking ugly
[01:13.34]I wanna rip off all the skin that's on your face, girl
[01:18.36]I wanna kill you so that I can be replaced Your ex is gone I had to cut his head off You don belong With anybody but
[01:31.42]Rain is pouring, I fucking throw it off
[01:33.70]Smoked a packet, I fucked up my lungs
[01:35.94]Thought I'll fucking eat
[01:38.10]Some fucking sleep
[01:39.84]Dirty dishes and dirty room
[01:42.20]Mix the up with thoughts
[01:43.94]So you all fuck up everything I do
[01:46.70]Makes me gain an attitude
[01:51.24]Oh, I'll be blind to me, you'll betray me
[02:06.50]Trick or treat, I will walk up to your door and you will confront me
[02:12.28]Or I'll break you through the window and you'll run from me
[02:16.62]I'm gonna make you bow with me
[02:19.60]Trick or treat, it's the last thing that you'll hear
[02:23.34]Before I am in your home and I'm sawing off your ears
[02:49.60]you so that i can't be replaced` },

    { file: 'pupsies- misery. (Official Visualizer).mp3', title: 'pupsies- misery.', artist: 'Mix',
      lyrics: `[00:00.00]I miss the kind of misery, the kind where you were nice to me, but only in the evening, so I ask am I just dreaming?
[00:15.92]I love you so much, that is dripping, dripping from my heart and such, I'm sorry, I know I'm too much, I love to trust, I'm nothing, but I miss the kind of misery, the kind where you were nice to me, but only in the evening, so I'm sorry.
[00:30.00]I ask am I just dreaming?
[00:32.00]I want to believe in since I have nobody else
[00:36.00]I keep screaming, I keep breathing
[00:38.00]It's a living I can't help
[00:40.00]It's a misery cause you can't tell me how is that you care
[00:44.00]And I know it's true but yes you need to get me out your hair
[00:48.00]Is the way a spatula, is that me? Why can't you choose me?
[00:52.00]In a degree this isn't lust, no fairy
[00:54.00]Cause it's blood, it's what you see
[00:56.00]I see misery and knowing I love you and had to leave
[01:00.00]The misery that I can't shake, the misery I plead
[01:04.00]It's the kind of misery, the kind where you were nice to me
[01:08.00]But only in the evening, so I ask if I'm just dreaming
[01:12.00]But it's real, the kind of misery
[01:14.00]The kind where you were nice to me, but only in the evening
[01:18.00]So I ask if I just dreaming It still the kind of misery I feel like hungry or icy But only in my feelings And I ask if I just dreaming But you must feel the kind of misery The kind where you were nice to me But only in my fim So I ask if I just dreaming
[01:28.25]But you must feel the kind of misery
[01:30.59]The kind where you were nice to me
[01:32.63]But only in the evening
[01:34.37]So I ask if I'm just dreaming
[01:36.57]I must have done a misery
[01:38.65]The kind where you were nice to me
[01:40.79]But only in my fim
[01:42.45]So I ask if I'm just dreaming
[01:44.51]But I feel the kind of misery
[01:46.71]The kind where you are nice to me
[01:48.93]But only in my evening
[01:50.55]Why only in my evening
[01:52.61]Cause I know that you care
[01:55.05]I know that you care
[01:56.79]Cause I swear it's pretty fair
[01:58.85]All the things I show you I'll dare
[02:03.39]To do anything
[02:05.07]I love you, I love you with everything
[02:08.99]I feel that kind of misery
[02:10.97]The kind where you are nice to me
[02:13.15]A woman in the image
[02:14.97]No, I ask you I just thought I'd feel the kind of misery
[02:19.33]The kind where you were nice to me
[02:21.33]The kind where you were nice to me
[02:24.47]So I feel the kind of misery
[02:27.51]The kind where you were nice to me
[02:29.65]But only in the evening
[02:31.25]So I wish that I was dreaming
[02:33.33]But only in the evening
[02:36.21]In the evening
[02:37.29]God, I wish that I was dreaming
[02:39.51]I miss that kind of misery
[02:44.97]Thank you.` },

    { file: 'reject.mp3', title: 'reject', artist: 'Mix',
      lyrics: `[00:00.00]I know I'll never be what you want
[00:17.42]The redies are on the walls
[00:19.20]That I will never be perfect like him
[00:22.06]I hate the way you point out my files
[00:24.62]If I can hide my face
[00:26.40]Then maybe I would be lost
[00:28.28]I'm so sick
[00:29.30]I feel like a curse but you never care
[00:32.98]Just want to be somebody I swear
[00:36.64]How can I face all this pain?
[00:39.20]I can't bear you all I've got to
[00:41.46]You know what I'm in
[00:43.50]I know I can't keep on chasing you
[00:47.28]I'm going nowhere, stuck up, I know I'm screwed
[00:50.92]I feel ashamed every time I look at your face
[00:54.44]Cause I know that I'm worth it but it makes my heart bleed
[00:58.24]You just like I trapped in this Look at you can be anything To the world where everybody just so fake Everything that I do is you the fucking mistake
[01:12.91]I'm still in my first place
[01:28.95]But you never care
[01:30.95]Just wanna be somebody I swear
[01:34.57]How can I face all this pain?
[01:37.17]I can't bear you walk out you
[01:39.39]But you know it's not me
[01:41.45]I feel my thirst but you never care
[01:45.41]Just wanna be somebody I swear
[01:49.07]How can I face all this pain?
[01:51.63]I can't bear you walk out you
[01:53.87]But you know it's not me
[02:00.95]Thank you.` },

    { file: 'rhetorical.mp3', title: 'rhetorical', artist: 'Mix',
      lyrics: `[00:00.00]Afterdome
[00:00.84]Angel
[00:05.62]Why are they wasting time?
[00:30.62]Trying to make you mine
[00:33.34]But there's nothing I can do, I can't get over you
[00:38.28]I see it all pass by, and I question myself why
[00:43.84]Why can't I just get through, my heart's not spinning too
[00:49.06]Cause I'm still searching for myself, I wanna run away from everybody else
[00:59.72]Because in a loop, I'm so damn long
[01:02.30]I wish that I could move on
[01:04.64]I don wanna ask for help I wanna go somewhere that they could never die Singing the same that stupid song can fix it all I so done
[01:15.36]I can't make a move, I got something to prove, but I don't know what to do
[01:19.82]Every time you talk, I just start to lose my code, but I know that I can have you, but it means that you're fine
[01:25.98]Got nothing to say, I just want a way that I can do it all I can
[01:31.50]I heard it never end, every day's getting worse
[01:34.36]I think I'm just playing pretend
[01:36.06]I'm still searching for myself
[01:38.98]I wanna run away from everybody else
[01:42.54]Been trapped in a loop for so damn long
[01:45.12]I wish that I could move on
[01:47.48]I don't wanna ask for help
[01:49.72]I wanna go somewhere that they could never tell
[01:53.24]Singing the same damn stupid songs
[01:55.88]Can't fix it all, I'm so done
[01:58.20]I was keeping up` },

    { file: 'shotgun.mp3', title: 'shotgun.', artist: 'Mix',
      lyrics: `[00:00.00]I'm gonna blow my brain with a shotgun
[00:02.10]It's been six months since the last time we talked
[00:04.64]And I'ma fall off stage when I preform in Boston
[00:07.30]Cause I'm so outraged by the way that I lost her
[00:10.02]Woke up this morning to my girl, gone
[00:12.40]I'm trying to figure out what I did so wrong
[00:15.02]Was it something I said or maybe something I did
[00:17.62]And I just wanna be dead whenever I'm in my crib
[00:20.18]I'm gonna blow off my head and look in front of my own death
[00:22.76]But will she still find my lips on the ground and try to kiss them?
[00:25.68]I want it to be something I'm not and yeah you know
[00:31.00]Ooh, why are you so rude?
[00:38.92]Why are you, why are you so rude?
[00:41.64]You're violent, violent attitudes
[00:43.90]Ooh, what you tryna do, what you tryna take from me?
[00:49.24]I had a feeling that you're kinda snaking me
[00:51.68]But I gratefully, cause I don't want you to leave
[00:54.36]It's kinda problematic when I'm chasing peace
[00:57.04]I'm gonna blow my brain with a shotgun
[01:10.70]It's been six months since the last time we talked
[01:13.24]And I'ma fall off stage when I play for him in Boston
[01:15.88]Cause I'm so outraged by the way that I lost her
[01:18.60]Woke up this morning till my girl gone
[01:21.02]I'm trying to figure out what I did so wrong
[01:23.66]Was it something I said or maybe something I did
[01:26.20]And I just wanna be dead whenever I'm in my crib
[01:28.76]I got my headphones on, bumping over to night songs
[01:31.52]I've been so sober that I can't keep composure
[01:34.06]When my bitch start acting stupid and claiming that I owe her
[01:36.70]And blaming me for hours, telling me that we are over again
[01:39.64]Ooh, why are you so rude?
[01:45.70]Why are you, why are you so rude?
[01:47.80]You're violent, violent, violent
[01:49.46]Ooh, why are you so rude?` },

    { file: 'stalk ur socials.mp3', title: 'stalk ur socials', artist: 'Mix',
      lyrics: `[00:00.00]I'll stalk your socials till my eyes are numb
[00:03.30]You don't even know how much I need your heart
[00:07.20]I'll see all your reposts and what's on your mind
[00:10.80]Because I cannot date you, you want another guy
[00:15.40]I'll stalk your socials till my eyes are numb
[00:18.70]You don't even know how much I need your heart
[00:22.60]I'll see all your reposts and what's on your mind
[00:26.20]Because I cannot date you, you want another guy
[00:30.12]Seeing you so happy, kissing someone else, it makes me so lonely
[00:36.52]Why is it so hard to look into the mirror?
[00:41.38]All you're looking at is a reflective picture
[00:44.24]I'll stock your socials till my eyes are numb
[00:49.50]You don't even know how much I need your heart
[00:53.38]I'll see all your reposts and what's on your mind
[00:56.98]Because I cannot date you, you want another guy
[01:00.92]I'll stalk your socials till my eyes are numb
[01:04.92]You don't even know how much I need your heart
[01:08.80]I'll see all your reposts and what's on your mind
[01:12.38]Because I cannot date you, you want another guy` },

    { file: 'theyll post it online.mp3', title: 'they\'ll post it online', artist: 'Mix',
      lyrics: `[00:00.00]The day I kill myself, I'll stream myself and they'll post it online
[00:04.92]Most days I feel like shit, I feel like this and I get out my mind
[00:09.36]I'm feeling awful when I'm talking to you, I always waste her time
[00:13.76]I hate the internet, an awful place to do some digital crime
[00:18.26]I hate the devil on my shoulder, who'd be telling me how to live?
[00:22.46]I'll get her love back somehow, somehow, I need it now
[00:28.60]Need it more than ever cause I'm getting older
[00:31.26]And the sun goes by I barely know her
[00:33.52]And I'm really starting to mind that I barely know her
[00:36.00]The day I kill myself I'll stream myself and they'll post it online
[00:40.26]Most days I feel like shit I feel like this and I get out my mind
[00:44.88]I'm feeling awful when I'm talking do I always waste her time?
[00:49.38]I hate the internet and awful places do some digital crimes
[00:53.76]I hate the devil on my shoulder who be telling me how to live life
[00:58.20]Too many people don't deserve to God
[01:00.44]R&D juice and red Wi-Fi
[01:02.68]Struck by death but still inspire
[01:04.84]All the people sick and tired
[01:07.08]Today I kill myself, I'll scream myself
[01:09.82]And they'll post it online
[01:11.52]Most days I feel like shit, I've been like this
[01:14.34]Can I get out my mind?
[01:16.06]I'm feeling awful when I'm talking
[01:18.32]Do I always waste her time?
[01:20.48]I hate the internet, an awful place
[01:23.22]I do some digital crime
[01:24.86]I hate the devil on my shoulder
[01:27.22]Who'd be telling me how to live life` },

    { file: 'unhappy (remix).mp3', title: 'unhappy (remix)', artist: 'Mix',
      lyrics: `[00:00.00]Every day we talk a little less
[00:19.88]It looks like you are losing interest
[00:24.00]These feelings I have for you
[00:26.86]But you don't feel the same
[00:28.90]So I'll pack all my things and go run far away
[00:32.86]You are, you are very pretty
[00:35.56]I'm so very ugly
[00:37.62]Will you even love me?
[00:40.06]Love me more
[00:41.06]You can, you can't live without me
[00:43.98]That makes me unhappy
[00:45.68]I should get a piercing through my heart
[00:49.28]What do you even want me to be?
[00:52.50]You never ever pay attention to me
[00:56.64]So I'll close my blinds in misery
[01:00.64]And I wait for you for a couple of weeks Ya no tengo la se tu mensaje no me llega Siento que estoy perdiendo la cabeza Lo pienso me pesa estoy encerrado en mi pieza
[01:14.11]Mi calor, tus ojos y tus labios de cereza
[01:18.13]Me convierten en un loco que ya no tiene certeza
[01:22.09]El tiempo me deja botado, con el corazón olvidado
[01:26.25]Siempre mira y va a ir a un lado
[01:28.25]Me siento loca, habré cruzado
[01:30.33]Arrancándome de ti, si me equivaste la mirada
[01:34.49]Tu perfume tengo aquí, pegado a la camiseta
[01:38.31]You are, you are very pretty, I'm so very ugly
[01:43.05]Will you even love me anymore?
[01:46.33]You can, you can live without me, that makes me unhappy
[01:51.11]I should get a piercing through my heart
[01:54.69]What do you even want me to be?
[01:57.97]You never ever pay attention to me
[02:02.05]So I'll close my blinds in misery
[02:05.69]And I'll wait for you for a couple of weeks` },

    { file: 'unhappy.mp3', title: 'unhappy', artist: 'Mix',
      lyrics: `[00:00.00]Every day we talk a little less
[00:19.76]It looks like you are losing interest
[00:23.88]These feelings I have for you
[00:26.74]But you don't feel the same
[00:28.78]So I'll pack all my things and go run far away
[00:32.76]You are, you are very pretty
[00:35.42]I'm so very ugly
[00:37.52]Will you even love me anymore?
[00:41.00]You can, you can't live without me
[00:43.88]That makes me unhappy
[00:45.58]I should get a piercing through my heart
[00:49.14]What do you even want me to be?
[00:52.42]You never ever pay attention to me
[00:56.52]So I'll close my blinds in misery
[01:00.16]And I'll wait for you for a couple of weeks
[01:04.96]You are, you are very pretty
[01:08.14]I'm so very ugly
[01:10.22]Will you even love me?
[01:12.66]Let me hold you
[01:14.04]You can, you can live without me
[01:16.58]That makes me unhappy
[01:18.30]I should get a piercing through my heart
[01:26.52]Bye.` },

    { file: 'untitled - Restless (Official Music Video).mp3', title: 'Restless', artist: 'untitled',
      lyrics: `[00:00.00]I'm trying to sleep
[00:28.00]It must be my dream
[00:33.00]The thought of you
[00:39.00]Keeps me away
[00:44.00]I wish you were
[00:51.00]That I must have
[00:56.00]Don't get in so bad
[01:02.00]When I have a dream
[01:06.00]I know you're gone
[01:22.00]But I still lost I don know where
[01:33.83]I'll go today
[01:39.41]I wish you were
[01:47.15]Without my side
[01:52.81]Don't be so mad
[01:57.81]When I'm back here
[02:01.81]I wish I could
[02:07.65]Go back in time
[02:14.81]Through this number still
[02:18.81]In my head
[02:20.81]I'm out of time
[02:50.81]you` },

    { file: 'vodka kisses.mp3', title: 'vodka kisses', artist: 'Mix',
      lyrics: `[00:00.00]Every day I feel so wrong
[00:02.78]Point out all my nasty flaws
[00:05.24]Scratching till my skin is raw
[00:07.64]Knowing that I'm never strong
[00:10.18]Wake up in the morning so wasted
[00:12.56]Drinking booze I feel so amazing
[00:14.98]Every day I'm feeling so made
[00:17.40]Bungie's that's a pantry I rate it
[00:20.06]Feeling like you cast a spell
[00:22.38]Loving you no one can tell
[00:24.80]Mixing all my drinks with the vodka
[00:27.28]I'm still stuck living in this hell
[00:29.64]Every day feels like a day, life is a big dumb stupid game
[00:34.70]Getting drunk soon as I wait, buzz bar too, that's how I play
[00:39.50]Can't talk to her, that's what she wishes, I know I never should've slipped
[00:44.22]And I'm so alone, cause no one listens, missing her, I'm with vodka kisses
[00:49.26]I know I never wanna be sober, smoke a drink, my life is over
[00:54.16]Sixteen and drunk, such a stupid bummer, can't ever stop having love for her
[00:59.00]I can't handle all of this scrutiny, no one ever said the epitome,
[01:04.34]Tionus don't have any energy, drink alcohol, that's how I'm pleased.
[01:09.20]Wake up in the morning, so wasted, drinking booze, I feel so amazing.
[01:14.16]Every day I'm feeling so baited, bunnies, that's a pantry I rated.
[01:19.04]Feeling like you cast a smell, loving you, no one can tell.
[01:23.94]Mixing all my drinks with the vodka, I'm still stuck living in this hell.
[01:29.00]zombie webs.` },

    { file: 'zombiwebz - im so blue for you.mp3', title: 'im so blue for you', artist: 'zombiwebz',
      lyrics: `[00:00.00]I want you inside my room, but I'm just too scared to make a move
[00:05.00]I feel so depressed sometimes, cause I can't ever seem to get to you
[00:10.42]Missing you such a damn long time, your love always got me feeling blue
[00:15.50]Hey mister, where'd you get those drugs? Smoking seems like a lot of fun
[00:20.70]In my youth it was all the love, nowadays I'm smoking tons
[00:25.88]Smell your hair, can't get enough, I'm doing stuff you can't dream of
[00:31.22]Mischief always on the run, spend your days hoping in the sun
[00:36.34]I feel so depressed sometimes, cause I can't ever seem to get to you
[00:41.64]Missing you such a damn long time, your love always got me feeling blue
[00:46.72]Waste away while in my prime, avoid being like you always do
[00:52.04]In my room making all these rhymes
[00:54.46]I only wrote these songs for you
[00:57.10]I just wanna see you tonight
[00:59.84]Wanna be with you all the time Don ask me I not really fine Mental health I going to die I don know it just depends It feels like I don get no rest
[01:12.64]I'm thinking you were always the best
[01:15.26]Wish I could go back into my nest
[01:18.02]Why can't I be as good as the other guys?
[01:20.88]Why do you gotta tell me all your stupid lies?
[01:23.50]Why do you gotta make up these rumors?
[01:26.04]Because soon I might commit suicide
[01:28.56]I feel so depressed sometimes
[01:30.76]Cause I can't ever seem to get to you
[01:33.52]Missing you such a damn long time
[01:36.04]Your love always got me feeling blue
[01:38.74]Waste away while in my grime
[01:41.32]Avoid me like you always do
[01:43.94]In my room making all these rhymes
[01:46.48]I only wrote these songs for you
[01:49.32]Hey mister, where'd you get those drugs?
[01:52.00]Smoking seems like a lot of fun
[01:54.40]In my youth it was all the love
[01:57.00]Nowadays I'm smoking toast
[01:59.54]Hell, your hair can't get enough, I'm doing stuff you can't dream up
[02:04.86]Mischief always on the run, spend your days so good in the sun` }
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
    pAudio.addEventListener('seeked', () => {
        _currentLyricsIdx = -1;
        syncLyrics(pAudio.currentTime);
    });
    loadSavedPlayerSkin();

    loadPapuTrack(curPapuTrack);
    renderPlaylist();
}

function loadPapuTrack(idx) {
    const track = papuPlaylist[idx];
    if (!pAudio) return;

    pAudio.src = 'assets/audio/' + track.file;
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
    if (lyricsEl) lyricsEl.textContent = (track.lyrics || 'Sin letra disponible.').replace(/\[\d{1,2}:\d{2}(?:\.\d{1,3})?\]/g, '').trim();

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
    if (!lrcText) return [];
    const lines = lrcText.split(/\r?\n/);
    const result = [];
    const plain = [];
    const tsRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
    for (const line of lines) {
        const matches = [...line.matchAll(tsRegex)];
        if (matches.length) {
            const text = line.replace(tsRegex, '').trim();
            if (!text) continue;
            for (const m of matches) {
                const min = parseInt(m[1], 10);
                const sec = parseInt(m[2], 10);
                const ms  = m[3] ? parseInt(m[3].padEnd(3, '0'), 10) : 0;
                const time = min * 60 + sec + ms / 1000;
                if (skipTitle && time === 0 && /[—-]|_/.test(text) && result.length === 0) continue;
                result.push({ time, text });
            }
        } else if (line.trim()) {
            plain.push({ time: null, text: line.trim() });
        }
    }
    if (!result.length && plain.length) return plain;
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

    if (!parsed.length) { body.textContent = 'Sin letra disponible.'; return; }
    body.innerHTML = parsed.map((line, i) =>
        `<div class="lyric-line" data-idx="${i}" ${line.time !== null ? `onclick="seekToLyric(${line.time})"` : ''} style="padding:4px 6px;border-radius:6px;cursor:${line.time !== null ? 'pointer' : 'default'};transition:all 0.25s;color:var(--text-muted);font-size:13px;">${escHTML(line.text)}</div>`
    ).join('');
}

function syncLyrics(currentTime) {
    if (!floatingLyricsVisible || !_parsedLyricsCache || !_parsedLyricsCache.length) return;

    const offset = getLyricOffset();
    const t = currentTime - offset;

    let idx = -1;
    for (let i = _parsedLyricsCache.length - 1; i >= 0; i--) {
        if (_parsedLyricsCache[i].time !== null && t >= _parsedLyricsCache[i].time) { idx = i; break; }
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
            <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;background:${idx === curPapuTrack ? 'rgba(0,212,255,0.1)' : 'transparent'};transition:all 0.2s;">
                <div style="width:36px;height:36px;border-radius:8px;background:${idx === curPapuTrack ? 'var(--primary)' : 'rgba(0,0,0,0.2)'};display:flex;align-items:center;justify-content:center;color:${idx === curPapuTrack ? '#000' : 'var(--text-muted)'};font-weight:700;font-size:13px;flex-shrink:0;">${idx + 1}</div>
                <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${idx === curPapuTrack ? 'var(--primary)' : 'var(--text-main)'};">${escHTML(track.title)}</div>
                    <div style="font-size:11px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(track.artist)}</div>
                </div>
                <button class="btn-icon" title="Poner como Canción de Perfil" onclick="event.stopPropagation(); setProfileAnthem('${track.file.replace(/'/g, "\\'")}')" style="font-size:12px;color:${currentUser && currentUser.profileAnthem === track.file ? 'var(--secondary)' : 'var(--text-muted)'};"><i class="fa-solid fa-user-music"></i><i class="fa-solid fa-compact-disc"></i></button>
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
    renderPlayerSkinBar();
    loadSavedPlayerSkin();
    populateFeaturedSongSelect();
    loadFeaturedCommunitySong();
}

function seekToLyric(timeSec) {
    if (!pAudio || timeSec === null || timeSec === undefined) return;
    pAudio.currentTime = Math.max(0, timeSec + getLyricOffset());
    _currentLyricsIdx = -1;
    syncLyrics(pAudio.currentTime);
    if (!pIsPlaying) togglePapuMusic();
}

function playTrackByFile(file) {
    const idx = papuPlaylist.findIndex(t => t.file === file);
    if (idx === -1) {
        if (typeof showToast === 'function') showToast('Canción no encontrada en la playlist', '#ff4466');
        return;
    }
    playPapuTrack(idx);
}

/* ── Feature 1: Canción de Perfil ──────────────── */
async function setProfileAnthem(file) {
    if (!currentUser || !window._db) return;
    const track = papuPlaylist.find(t => t.file === file);
    if (!track) return;
    try {
        await apiFetch('PUT', '/users/' + currentUser.nick, { profileAnthem: file });
        currentUser.profileAnthem = file;
        renderPlaylist();
        if (typeof showToast === 'function') showToast('🎵 Canción de perfil: ' + track.title, '#00ffaa');
    } catch (e) {
        if (typeof showToast === 'function') showToast('Error: ' + e.message, '#ff4466');
    }
}

/* ── Feature 6: Skins del Reproductor ──────────── */
const PLAYER_SKINS = [
    { key: 'default',  label: 'Clásico',         cls: '' },
    { key: 'vinyl',    label: 'Vinilo Giratorio', cls: 'player-skin-vinyl' },
    { key: 'cassette', label: 'Cassette Retro',  cls: 'player-skin-cassette' },
    { key: 'miku',     label: 'Miku Cyber',      cls: 'player-skin-miku' },
    { key: 'party',    label: 'Modo Fiesta RGB', cls: 'player-skin-party' }
];

function getUnlockedPlayerSkins() {
    try {
        const arr = JSON.parse(localStorage.getItem('papubank_player_skins') || '["default"]');
        return Array.isArray(arr) ? arr : ['default'];
    } catch (e) { return ['default']; }
}

function unlockPlayerSkin(skinKey) {
    const unlocked = getUnlockedPlayerSkins();
    if (!unlocked.includes(skinKey)) {
        unlocked.push(skinKey);
        localStorage.setItem('papubank_player_skins', JSON.stringify(unlocked));
    }
    applyPlayerSkin(skinKey);
}

function applyPlayerSkin(skinKey) {
    const skin = PLAYER_SKINS.find(s => s.key === skinKey) || PLAYER_SKINS[0];
    const allCls = PLAYER_SKINS.map(s => s.cls).filter(Boolean);
    ['full-player-card', 'mini-player'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        allCls.forEach(c => el.classList.remove(c));
        if (skin.cls) el.classList.add(skin.cls);
    });
    localStorage.setItem('papubank_active_player_skin', skin.key);
    renderPlayerSkinBar();
}

function loadSavedPlayerSkin() {
    const saved = localStorage.getItem('papubank_active_player_skin') || 'default';
    applyPlayerSkin(saved);
}

function renderPlayerSkinBar() {
    const bar = document.getElementById('player-skin-bar');
    if (!bar) return;
    const unlocked = getUnlockedPlayerSkins();
    const active = localStorage.getItem('papubank_active_player_skin') || 'default';
    bar.innerHTML = PLAYER_SKINS.map(s => {
        const isOwned = unlocked.includes(s.key);
        const isActive = active === s.key;
        if (!isOwned) {
            return `<button class="btn btn-secondary" onclick="showPage('market')" style="font-size:10px;padding:4px 8px;opacity:0.6;" title="Compra esta skin en la Tienda">🔒 ${s.label}</button>`;
        }
        return `<button class="btn ${isActive ? 'btn-primary' : 'btn-secondary'}" onclick="applyPlayerSkin('${s.key}')" style="font-size:10px;padding:4px 8px;">${isActive ? '✓ ' : ''}${s.label}</button>`;
    }).join('');
}

/* ── Feature 7: Canción Destacada de la Comunidad ─ */
const FEATURED_SONG_COST = 5000;

async function loadFeaturedCommunitySong() {
    const box = document.getElementById('featured-song-box');
    if (!box || !window._db) return;
    try {
        const snap = await window._fbGetDocs(window._fbCollection(window._db, 'board'));
        const reqs = [];
        snap.forEach(d => {
            const data = d.data() || {};
            if (typeof data.title === 'string' && data.title.startsWith('[DESTACADA]|')) {
                reqs.push({ id: d.id, ...data });
            }
        });
        reqs.sort((a, b) => new Date(b.created || b.created_at || 0) - new Date(a.created || a.created_at || 0));
        if (!reqs.length) {
            box.innerHTML = '<span style="color:var(--text-muted);font-size:12px;">Nadie ha destacado una canción todavía. ¡Sé el primero por 5,000 PPC!</span>';
            return;
        }
        const latest = reqs[0];
        const file = latest.title.split('|')[1] || '';
        const track = papuPlaylist.find(t => t.file === file);
        const label = track ? `${track.title} — ${track.artist}` : file;
        box.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                <div>
                    <div style="font-size:13px;font-weight:700;color:var(--gold);">🌟 ${escHTML(label)}</div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Pedida por <strong>${escHTML(latest.author || 'Anónimo')}</strong>: "${escHTML(latest.body || '')}"</div>
                </div>
                ${track ? `<button class="btn btn-primary" onclick="playTrackByFile('${track.file.replace(/'/g, "\\'")}')" style="font-size:11px;"><i class="fa-solid fa-play"></i> Escuchar</button>` : ''}
            </div>
        `;
    } catch (e) {
        box.innerHTML = '<span style="color:var(--text-muted);font-size:11px;">No se pudo cargar la canción destacada.</span>';
    }
}

async function requestFeaturedSong() {
    if (!currentUser || !bankAccount || !window._db) return;
    if ((bankAccount.balance || 0) < FEATURED_SONG_COST) {
        showToast('Necesitas ' + FEATURED_SONG_COST.toLocaleString() + ' PPC para destacar una canción', '#ff4466');
        return;
    }
    const sel = document.getElementById('featured-song-select');
    const msgEl = document.getElementById('featured-song-msg');
    const file = sel ? sel.value : '';
    const msg = (msgEl ? msgEl.value : '').trim() || '¡Temazo recomendado para el clan!';
    if (!file) return;

    const ok = await showConfirm('🌟 Destacar Canción', `¿Gastar <strong>${FEATURED_SONG_COST.toLocaleString()} PPC</strong> para destacar esta canción para todo el clan?`);
    if (!ok) return;

    try {
        await window._fbUpdateDoc(window._fbDoc(window._db, 'bank_accounts', currentUser.nick), {
            balance: window._fbIncrement(-FEATURED_SONG_COST)
        });
        await window._fbAddDoc(window._fbCollection(window._db, 'board'), {
            title: '[DESTACADA]|' + file,
            body: msg,
            author: currentUser.nick,
            created: window._fbServerTimestamp()
        });
        if (typeof addTx === 'function') {
            await addTx({ type: 'Música Clan', from: currentUser.nick, to: 'Comunidad', amount: FEATURED_SONG_COST, note: 'Canción destacada: ' + file });
        }
        if (msgEl) msgEl.value = '';
        showToast('🌟 ¡Canción destacada para todo el clan!', '#00ffaa');
        loadFeaturedCommunitySong();
    } catch (e) {
        showToast('Error: ' + e.message, '#ff4466');
    }
}

function populateFeaturedSongSelect() {
    const sel = document.getElementById('featured-song-select');
    if (!sel) return;
    sel.innerHTML = papuPlaylist.map(t => `<option value="${escHTML(t.file)}">${escHTML(t.title)} — ${escHTML(t.artist)}</option>`).join('');
}
