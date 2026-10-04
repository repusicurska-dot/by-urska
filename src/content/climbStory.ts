import type { Locale } from "@/i18n/locales";

/**
 * Urška's own climbing story for the Climb page (Urška, 2026-10-03), chapter by chapter.
 * A chapter may close with one of her lines as a quote.
 */

export interface ClimbChapter {
  title: string;
  paragraphs: string[];
  quote?: string;
}

export interface ClimbStory {
  chapters: ClimbChapter[];
  closing: string;
}

export const CLIMB_STORY: Record<Locale, ClimbStory> = {
  en: {
    chapters: [
      {
        title: "It started at seven",
        paragraphs: [
          "I was seven years old when I first discovered climbing.",
          "I didn't know it then, but that first touch of the wall would become the beginning of a journey that would shape my life.",
        ],
        quote: "Sometimes, the smallest first step leads somewhere you never expected.",
      },
      {
        title: "A natural feeling",
        paragraphs: [
          "From the very beginning, climbing felt natural.",
          "I quickly found my way on the wall, and my progress soon led me into a competition group.",
        ],
      },
      {
        title: "The first competitions",
        paragraphs: [
          "My first competitions opened a completely new world.",
          "I fell in love with the focus, the challenge, and the feeling of giving everything I had.",
          "I wanted to see how far I could go.",
        ],
        quote: "The wall was never just something to climb. It was something to discover.",
      },
      {
        title: "All in",
        paragraphs: [
          "What started as something I simply loved slowly became my life.",
          "Training became more serious. The competitions became bigger. And climbing became a full-time commitment.",
        ],
      },
      {
        title: "The national team",
        paragraphs: [
          "Being part of the national team was never my original plan.",
          "But sometimes a path unfolds before you know where it is leading.",
          "My results opened the door to the national team, and I began representing my country on the international stage.",
        ],
      },
      {
        title: "The world stage",
        paragraphs: [
          "The walls became bigger.",
          "The competition became stronger.",
          "And the goals became higher.",
          "I began competing internationally and reaching the highest podiums.",
        ],
        quote: "I never climbed because I knew where it would take me. I climbed because I wanted to see where it could take me.",
      },
      {
        title: "More than competition",
        paragraphs: [
          "Somewhere along the way, I realised that climbing had become much more than competition.",
          "It became a part of who I am.",
        ],
      },
      {
        title: "My inner world",
        paragraphs: [
          "Climbing is where I find myself.",
          "Where the noise fades, the mind becomes quiet, and everything becomes simple.",
          "On the wall, there is no yesterday and no tomorrow.",
          "Only my breath, my body, the movement — and the next hold.",
        ],
      },
      {
        title: "With nature",
        paragraphs: [
          "Climbing connects me with nature and with something deeper within myself.",
          "There is something beautiful about feeling the rock beneath my hands and moving with it, rather than against it.",
        ],
      },
      {
        title: "The people",
        paragraphs: [
          "And then there are the people who make the journey even more meaningful.",
          "The laughter, the shared adventures, the friendships, and all the moments between the climbs.",
        ],
      },
      {
        title: "Why I climb",
        paragraphs: [
          "I climb for the feeling of freedom.",
          "For the silence in my mind.",
          "For the love of movement.",
          "For the challenge.",
          "For the moments when everything else fades away.",
          "And simply because, somewhere on the wall, I feel completely at home.",
        ],
        quote: "Climbing is not only about reaching the top. It is about being fully present for every move along the way.",
      },
      {
        title: "Still climbing",
        paragraphs: [
          "From a seven-year-old discovering the wall to standing on international podiums.",
          "So much has changed.",
          "But the feeling has remained the same.",
          "The wall is still where I find movement, freedom, focus — and a little more of myself.",
        ],
      },
    ],
    closing: "I simply love to climb.",
  },
  sl: {
    chapters: [
      {
        title: "Začelo se je pri sedmih",
        paragraphs: [
          "Stara sem bila sedem let, ko sem prvič odkrila plezanje.",
          "Takrat še nisem vedela, da bo tisti prvi dotik stene začetek poti, ki bo oblikovala moje življenje.",
        ],
        quote: "Včasih te najmanjši prvi korak pripelje tja, kamor nisi nikoli pričakoval.",
      },
      {
        title: "Naraven občutek",
        paragraphs: [
          "Plezanje se mi je že od samega začetka zdelo naravno.",
          "Na steni sem se hitro znašla in napredek me je kmalu pripeljal v tekmovalno skupino.",
        ],
      },
      {
        title: "Prve tekme",
        paragraphs: [
          "Prve tekme so mi odprle čisto nov svet.",
          "Zaljubila sem se v osredotočenost, izziv in občutek, da dam vse od sebe.",
          "Želela sem videti, kako daleč lahko pridem.",
        ],
        quote: "Stena ni bila nikoli le nekaj za plezanje. Bila je nekaj za odkrivanje.",
      },
      {
        title: "Vse ali nič",
        paragraphs: [
          "Kar se je začelo kot nekaj, kar sem preprosto imela rada, je počasi postalo moje življenje.",
          "Treningi so postali resnejši. Tekme večje. In plezanje je postalo predanost s polnim delovnim časom.",
        ],
      },
      {
        title: "Državna reprezentanca",
        paragraphs: [
          "Biti del državne reprezentance ni bil nikoli moj prvotni načrt.",
          "A včasih se pot odpre, še preden veš, kam te vodi.",
          "Rezultati so mi odprli vrata v reprezentanco in začela sem zastopati svojo državo na mednarodnem odru.",
        ],
      },
      {
        title: "Svetovni oder",
        paragraphs: [
          "Stene so postale večje.",
          "Konkurenca močnejša.",
          "In cilji višji.",
          "Začela sem tekmovati mednarodno in segati na najvišje stopničke.",
        ],
        quote: "Nikoli nisem plezala, ker bi vedela, kam me bo pripeljalo. Plezala sem, ker sem želela videti, kam me lahko pripelje.",
      },
      {
        title: "Več kot tekmovanje",
        paragraphs: [
          "Nekje na tej poti sem spoznala, da je plezanje postalo veliko več kot tekmovanje.",
          "Postalo je del tega, kar sem.",
        ],
      },
      {
        title: "Moj notranji svet",
        paragraphs: [
          "V plezanju najdem sebe.",
          "Tam, kjer hrup utihne, um se umiri in vse postane preprosto.",
          "Na steni ni včeraj in ni jutri.",
          "Samo moj dih, moje telo, gib — in naslednji oprimek.",
        ],
      },
      {
        title: "Z naravo",
        paragraphs: [
          "Plezanje me povezuje z naravo in z nečim globljim v meni.",
          "Nekaj lepega je v tem, ko pod rokami čutim skalo in se gibljem z njo, ne proti njej.",
        ],
      },
      {
        title: "Ljudje",
        paragraphs: [
          "In potem so tu ljudje, ki dajo poti še več pomena.",
          "Smeh, skupne dogodivščine, prijateljstva in vsi trenutki med plezanji.",
        ],
      },
      {
        title: "Zakaj plezam",
        paragraphs: [
          "Plezam zaradi občutka svobode.",
          "Zaradi tišine v glavi.",
          "Zaradi ljubezni do giba.",
          "Zaradi izziva.",
          "Zaradi trenutkov, ko vse drugo izgine.",
          "In preprosto zato, ker se nekje na steni počutim popolnoma doma.",
        ],
        quote: "Plezanje ni le priti na vrh. Je biti popolnoma prisoten pri vsakem gibu na poti.",
      },
      {
        title: "Še vedno plezam",
        paragraphs: [
          "Od sedemletnice, ki odkriva steno, do mednarodnih stopničk.",
          "Toliko se je spremenilo.",
          "A občutek je ostal enak.",
          "Na steni še vedno najdem gib, svobodo, osredotočenost — in še malo več sebe.",
        ],
      },
    ],
    closing: "Preprosto rada plezam.",
  },
  hr: {
    chapters: [
      {
        title: "Počelo je sa sedam",
        paragraphs: [
          "Imala sam sedam godina kad sam prvi put otkrila penjanje.",
          "Tada to nisam znala, ali taj prvi dodir stijene postao je početak puta koji će oblikovati moj život.",
        ],
        quote: "Ponekad te najmanji prvi korak odvede ondje gdje nikad nisi očekivao.",
      },
      {
        title: "Prirodan osjećaj",
        paragraphs: [
          "Od samog početka penjanje mi se činilo prirodnim.",
          "Brzo sam se snašla na stijeni, a napredak me ubrzo doveo u natjecateljsku skupinu.",
        ],
      },
      {
        title: "Prva natjecanja",
        paragraphs: [
          "Prva natjecanja otvorila su mi potpuno novi svijet.",
          "Zaljubila sam se u fokus, izazov i osjećaj da dajem sve od sebe.",
          "Htjela sam vidjeti koliko daleko mogu stići.",
        ],
        quote: "Stijena nikad nije bila samo nešto za penjanje. Bila je nešto za otkrivanje.",
      },
      {
        title: "Sve ili ništa",
        paragraphs: [
          "Ono što je počelo kao nešto što sam jednostavno voljela polako je postalo moj život.",
          "Treninzi su postali ozbiljniji. Natjecanja veća. A penjanje predanost s punim radnim vremenom.",
        ],
      },
      {
        title: "Državna reprezentacija",
        paragraphs: [
          "Biti dio državne reprezentacije nikad nije bio moj prvotni plan.",
          "Ali ponekad se put otvori prije nego što znaš kamo vodi.",
          "Rezultati su mi otvorili vrata reprezentacije i počela sam predstavljati svoju zemlju na međunarodnoj pozornici.",
        ],
      },
      {
        title: "Svjetska pozornica",
        paragraphs: [
          "Stijene su postale veće.",
          "Konkurencija jača.",
          "A ciljevi viši.",
          "Počela sam se natjecati međunarodno i stizati na najviša postolja.",
        ],
        quote: "Nikad nisam penjala jer sam znala kamo će me odvesti. Penjala sam jer sam htjela vidjeti kamo me može odvesti.",
      },
      {
        title: "Više od natjecanja",
        paragraphs: [
          "Negdje usput shvatila sam da je penjanje postalo mnogo više od natjecanja.",
          "Postalo je dio onoga što jesam.",
        ],
      },
      {
        title: "Moj unutarnji svijet",
        paragraphs: [
          "U penjanju pronalazim sebe.",
          "Ondje gdje buka utihne, um se smiri i sve postane jednostavno.",
          "Na stijeni nema jučer ni sutra.",
          "Samo moj dah, moje tijelo, pokret — i sljedeći hvat.",
        ],
      },
      {
        title: "S prirodom",
        paragraphs: [
          "Penjanje me povezuje s prirodom i s nečim dubljim u meni.",
          "Ima nečeg lijepog u tome da pod rukama osjećam stijenu i krećem se s njom, a ne protiv nje.",
        ],
      },
      {
        title: "Ljudi",
        paragraphs: [
          "A tu su i ljudi koji putu daju još više smisla.",
          "Smijeh, zajedničke avanture, prijateljstva i svi trenuci između penjanja.",
        ],
      },
      {
        title: "Zašto penjem",
        paragraphs: [
          "Penjem zbog osjećaja slobode.",
          "Zbog tišine u glavi.",
          "Zbog ljubavi prema pokretu.",
          "Zbog izazova.",
          "Zbog trenutaka kad sve ostalo nestane.",
          "I jednostavno zato što se negdje na stijeni osjećam potpuno kod kuće.",
        ],
        quote: "Penjanje nije samo stići na vrh. To je biti potpuno prisutan u svakom pokretu na putu.",
      },
      {
        title: "I dalje penjem",
        paragraphs: [
          "Od sedmogodišnjakinje koja otkriva stijenu do međunarodnih postolja.",
          "Toliko se promijenilo.",
          "Ali osjećaj je ostao isti.",
          "Na stijeni i dalje pronalazim pokret, slobodu, fokus — i još malo više sebe.",
        ],
      },
    ],
    closing: "Jednostavno volim penjati.",
  },
  de: {
    chapters: [
      {
        title: "Es begann mit sieben",
        paragraphs: [
          "Ich war sieben Jahre alt, als ich das Klettern zum ersten Mal entdeckte.",
          "Damals wusste ich es noch nicht, aber diese erste Berührung der Wand wurde zum Anfang eines Weges, der mein Leben prägen sollte.",
        ],
        quote: "Manchmal führt der kleinste erste Schritt an einen Ort, den man nie erwartet hätte.",
      },
      {
        title: "Ein natürliches Gefühl",
        paragraphs: [
          "Von Anfang an fühlte sich Klettern natürlich an.",
          "Ich fand schnell meinen Weg an der Wand, und meine Fortschritte führten mich bald in eine Wettkampfgruppe.",
        ],
      },
      {
        title: "Die ersten Wettkämpfe",
        paragraphs: [
          "Meine ersten Wettkämpfe öffneten mir eine völlig neue Welt.",
          "Ich verliebte mich in den Fokus, die Herausforderung und das Gefühl, alles zu geben.",
          "Ich wollte sehen, wie weit ich kommen kann.",
        ],
        quote: "Die Wand war nie nur etwas zum Klettern. Sie war etwas zum Entdecken.",
      },
      {
        title: "Alles geben",
        paragraphs: [
          "Was als etwas begann, das ich einfach liebte, wurde langsam zu meinem Leben.",
          "Das Training wurde ernster. Die Wettkämpfe größer. Und Klettern wurde zu einer Vollzeitaufgabe.",
        ],
      },
      {
        title: "Die Nationalmannschaft",
        paragraphs: [
          "Teil der Nationalmannschaft zu sein, war nie mein ursprünglicher Plan.",
          "Aber manchmal öffnet sich ein Weg, bevor man weiß, wohin er führt.",
          "Meine Ergebnisse öffneten mir die Tür zur Nationalmannschaft, und ich begann, mein Land auf der internationalen Bühne zu vertreten.",
        ],
      },
      {
        title: "Die Weltbühne",
        paragraphs: [
          "Die Wände wurden größer.",
          "Die Konkurrenz stärker.",
          "Und die Ziele höher.",
          "Ich begann, international anzutreten und die höchsten Podien zu erreichen.",
        ],
        quote: "Ich bin nie geklettert, weil ich wusste, wohin es mich führt. Ich bin geklettert, weil ich sehen wollte, wohin es mich führen kann.",
      },
      {
        title: "Mehr als Wettkampf",
        paragraphs: [
          "Irgendwann auf diesem Weg wurde mir klar, dass Klettern viel mehr als Wettkampf geworden war.",
          "Es wurde ein Teil von mir.",
        ],
      },
      {
        title: "Meine innere Welt",
        paragraphs: [
          "Beim Klettern finde ich mich selbst.",
          "Dort, wo der Lärm verblasst, der Kopf still wird und alles einfach wird.",
          "An der Wand gibt es kein Gestern und kein Morgen.",
          "Nur meinen Atem, meinen Körper, die Bewegung — und den nächsten Griff.",
        ],
      },
      {
        title: "Mit der Natur",
        paragraphs: [
          "Klettern verbindet mich mit der Natur und mit etwas Tieferem in mir.",
          "Es hat etwas Schönes, den Fels unter den Händen zu spüren und sich mit ihm zu bewegen statt gegen ihn.",
        ],
      },
      {
        title: "Die Menschen",
        paragraphs: [
          "Und dann sind da die Menschen, die den Weg noch bedeutungsvoller machen.",
          "Das Lachen, die gemeinsamen Abenteuer, die Freundschaften und all die Momente zwischen den Routen.",
        ],
      },
      {
        title: "Warum ich klettere",
        paragraphs: [
          "Ich klettere für das Gefühl der Freiheit.",
          "Für die Stille im Kopf.",
          "Aus Liebe zur Bewegung.",
          "Für die Herausforderung.",
          "Für die Momente, in denen alles andere verschwindet.",
          "Und einfach, weil ich mich irgendwo an der Wand vollkommen zu Hause fühle.",
        ],
        quote: "Beim Klettern geht es nicht nur darum, oben anzukommen. Es geht darum, bei jedem Zug auf dem Weg ganz da zu sein.",
      },
      {
        title: "Ich klettere noch immer",
        paragraphs: [
          "Von einer Siebenjährigen, die die Wand entdeckt, bis auf internationale Podien.",
          "So vieles hat sich verändert.",
          "Aber das Gefühl ist dasselbe geblieben.",
          "An der Wand finde ich noch immer Bewegung, Freiheit, Fokus — und ein bisschen mehr von mir selbst.",
        ],
      },
    ],
    closing: "Ich klettere einfach gern.",
  },
  it: {
    chapters: [
      {
        title: "Tutto è iniziato a sette anni",
        paragraphs: [
          "Avevo sette anni quando ho scoperto l'arrampicata per la prima volta.",
          "Allora non lo sapevo, ma quel primo contatto con la parete sarebbe diventato l'inizio di un percorso che avrebbe dato forma alla mia vita.",
        ],
        quote: "A volte il più piccolo primo passo porta dove non ti saresti mai aspettato.",
      },
      {
        title: "Una sensazione naturale",
        paragraphs: [
          "Fin dall'inizio, arrampicare mi è sembrato naturale.",
          "Ho trovato presto la mia strada sulla parete, e i miei progressi mi hanno portata in un gruppo agonistico.",
        ],
      },
      {
        title: "Le prime gare",
        paragraphs: [
          "Le mie prime gare mi hanno aperto un mondo completamente nuovo.",
          "Mi sono innamorata della concentrazione, della sfida e della sensazione di dare tutto.",
          "Volevo vedere fin dove potevo arrivare.",
        ],
        quote: "La parete non è mai stata solo qualcosa da scalare. Era qualcosa da scoprire.",
      },
      {
        title: "Tutto per l'arrampicata",
        paragraphs: [
          "Ciò che era iniziato come qualcosa che semplicemente amavo è diventato, piano piano, la mia vita.",
          "Gli allenamenti si sono fatti più seri. Le gare più grandi. E l'arrampicata è diventata un impegno a tempo pieno.",
        ],
      },
      {
        title: "La nazionale",
        paragraphs: [
          "Far parte della nazionale non è mai stato il mio piano iniziale.",
          "Ma a volte un sentiero si apre prima che tu sappia dove porta.",
          "I miei risultati mi hanno aperto le porte della nazionale, e ho iniziato a rappresentare il mio paese sulla scena internazionale.",
        ],
      },
      {
        title: "La scena mondiale",
        paragraphs: [
          "Le pareti sono diventate più grandi.",
          "La concorrenza più forte.",
          "E gli obiettivi più alti.",
          "Ho iniziato a gareggiare a livello internazionale e a salire sui podi più alti.",
        ],
        quote: "Non ho mai arrampicato perché sapevo dove mi avrebbe portata. Ho arrampicato perché volevo vedere dove poteva portarmi.",
      },
      {
        title: "Più di una gara",
        paragraphs: [
          "A un certo punto del cammino ho capito che l'arrampicata era diventata molto più di una competizione.",
          "Era diventata parte di ciò che sono.",
        ],
      },
      {
        title: "Il mio mondo interiore",
        paragraphs: [
          "Arrampicando ritrovo me stessa.",
          "Lì dove il rumore svanisce, la mente si quieta e tutto diventa semplice.",
          "Sulla parete non c'è ieri né domani.",
          "Solo il mio respiro, il mio corpo, il movimento — e la presa successiva.",
        ],
      },
      {
        title: "Con la natura",
        paragraphs: [
          "L'arrampicata mi connette con la natura e con qualcosa di più profondo dentro di me.",
          "C'è qualcosa di bello nel sentire la roccia sotto le mani e muoversi con lei, non contro di lei.",
        ],
      },
      {
        title: "Le persone",
        paragraphs: [
          "E poi ci sono le persone che rendono il viaggio ancora più significativo.",
          "Le risate, le avventure condivise, le amicizie e tutti i momenti tra una salita e l'altra.",
        ],
      },
      {
        title: "Perché arrampico",
        paragraphs: [
          "Arrampico per la sensazione di libertà.",
          "Per il silenzio nella mente.",
          "Per l'amore del movimento.",
          "Per la sfida.",
          "Per i momenti in cui tutto il resto svanisce.",
          "E semplicemente perché, da qualche parte sulla parete, mi sento completamente a casa.",
        ],
        quote: "Arrampicare non significa solo arrivare in cima. Significa essere pienamente presenti in ogni movimento lungo il percorso.",
      },
      {
        title: "Arrampico ancora",
        paragraphs: [
          "Da una bambina di sette anni che scopre la parete ai podi internazionali.",
          "Tante cose sono cambiate.",
          "Ma la sensazione è rimasta la stessa.",
          "Sulla parete trovo ancora movimento, libertà, concentrazione — e un po' più di me stessa.",
        ],
      },
    ],
    closing: "Semplicemente, amo arrampicare.",
  },
};
