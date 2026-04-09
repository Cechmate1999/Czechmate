// ============================================
//   CZECHMATE — Scenario Data (Czech + Spanish)
// ============================================

const SCENARIOS = [

  // ══════════════════════════════════════
  //  🇨🇿  CZECH SCENARIOS
  // ══════════════════════════════════════

  {
    id: 'pub',
    language: 'czech',
    icon: '🍺',
    title: 'At the Pub',
    subtitle: 'V hospodě',
    difficulty: 'beginner',
    category: 'Social',
    shortDesc: 'Order beer without looking like a tourist. Survive the silent stare of a Czech waiter.',
    context: 'Czech pubs (hospody) are not just drinking establishments — they\'re the living room of Czech society. Debates about football, politics, and the existential question of Pilsner vs. Kozel happen here daily. The waiter will come when they\'re ready. Waving is an offense.',
    dialogue: [
      { speaker: 'Číšník', role: 'ai', czech: 'Dobrý den! Co si dáte?', english: 'Hello! What will you have?', spanish: '¡Hola! ¿Qué va a tomar?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Jedno pivo, prosím.', english: 'Hello. One beer, please.', spanish: 'Hola. Una cerveza, por favor.', isKey: true, note: 'Use "jedno" — pivo is neuter gender. "Jeden pivo" is a classic expat mistake.' },
      { speaker: 'Číšník', role: 'ai', czech: 'Velké nebo malé?', english: 'Large or small?', spanish: '¿Grande o pequeña?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Velké, prosím. A máte jídelní lístek?', english: 'Large, please. And do you have a menu?', spanish: 'Grande, por favor. ¿Y tienen carta?', isKey: true },
      { speaker: 'Číšník', role: 'ai', czech: 'Samozřejmě. Tady to máte.', english: 'Of course. Here you go.', spanish: 'Por supuesto. Aquí tiene.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dám si svíčkovou, prosím.', english: 'I\'ll have the svíčková, please.', spanish: 'Tomaré la svíčková, por favor.', isKey: true, note: '"Dám si" = I\'ll have. More natural than "Chci" (I want), which sounds blunt.' },
      { speaker: 'Číšník', role: 'ai', czech: 'Výborně. Ještě jedno pivo?', english: 'Excellent. Another beer?', spanish: 'Excelente. ¿Otra cerveza?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ještě jedno, prosím. Děkuji.', english: 'Another one, please. Thank you.', spanish: 'Otra más, por favor. Gracias.', isKey: true },
      { speaker: 'Číšník', role: 'ai', czech: 'Dobrou chuť!', english: 'Enjoy your meal!', spanish: '¡Buen provecho!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Zaplatím, prosím.', english: 'I\'d like to pay, please.', spanish: 'La cuenta, por favor.', isKey: true, note: 'Don\'t wait for the bill — they won\'t bring it. You have to ask.' }
    ],
    keyPhrases: [
      { czech: 'Jedno pivo, prosím.', english: 'One beer, please.', phonetic: 'YED-no PI-vo, PRO-seem' },
      { czech: 'Na zdraví!', english: 'Cheers!', phonetic: 'NA ZDRA-vee' },
      { czech: 'Dám si...', english: 'I\'ll have...', phonetic: 'dahm si' },
      { czech: 'Zaplatím, prosím.', english: 'I\'d like to pay.', phonetic: 'ZAH-pla-teem, PRO-seem' },
      { czech: 'Ještě jedno.', english: 'Another one.', phonetic: 'YESH-tyeh YED-no' },
      { czech: 'Máte jídelní lístek?', english: 'Do you have a menu?', phonetic: 'MAH-teh YEE-del-nee LEES-tek' }
    ],
    culturalTips: [
      { title: 'Never wave at the waiter', body: 'Raise one finger to get attention — that\'s enough. Waving or snapping fingers is considered rude and will earn you the slowest possible service.' },
      { title: 'The tab system', body: 'The waiter puts a paper slip on your table and marks each round with a line. Keep it visible. You\'ll hand it over when paying.' },
      { title: 'Beer sizes are in deciliters', body: '"Malé" (small) = 3dl (300ml). "Velké" (large) = 5dl (500ml = half-liter). Nobody orders by "pint." Don\'t ask for a pint.' },
      { title: 'The bill won\'t come on its own', body: 'Czech waiters respect your time. They won\'t hover or drop the bill uninvited. When you\'re done, catch their eye and say "Zaplatím, prosím." That\'s the signal.' },
      { title: 'Tipping: keep the change gracefully', body: 'Hand over the money and say "nechte to" (keep it) or specify the amount back. Tipping on card is not common. 10% is generous, rounding up is normal.' }
    ],
    realVsTextbook: [
      { textbook: '"Rád bych si objednal pivo." (I would like to order a beer.)', real: '"Jedno pivo." — That\'s it. Two words. Nobody says the textbook version in real life.' },
      { textbook: '"Bylo by možné získat účet?" (Would it be possible to get the bill?)', real: '"Zaplatím." — Clean. Direct. Czech.' },
      { textbook: '"Chci vodu, prosím." (I want water, please.)', real: '"Dám si vodu." — "Dám si" is how real people order. "Chci" can sound like a toddler demanding things.' }
    ]
  },

  {
    id: 'parents',
    language: 'czech',
    icon: '👨‍👩‍👧‍👦',
    title: 'Back at the In-Laws',
    subtitle: 'Zase u příbuzných',
    difficulty: 'intermediate',
    category: 'Social',
    shortDesc: 'You know the family now. Babička still doesn\'t speak English. Tatínek has wine. Sestra has opinions. Good luck.',
    context: 'You\'ve been with your Czech partner long enough that the family knows you. Maminka still checks if you\'ve eaten. Babička talks at you regardless of the language barrier — just smile and ask her to slow down. Tatínek pours wine without asking. Sestra watches and judges (but she\'s warming up). This is Sunday lunch on hard mode.',
    dialogue: [
      { speaker: 'Maminka', role: 'ai', czech: 'Ty jseš tady! Pojď dál, pojď dál. Jedl jsi dnes?', english: 'You\'re here! Come in, come in. Have you eaten today?', spanish: '¡Estás aquí! Pasa, pasa. ¿Has comido hoy?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den, Maminko. Jedl jsem, děkuji. Přinesl jsem červené víno.', english: 'Hello, Maminka. I\'ve eaten, thank you. I brought some red wine.', spanish: 'Hola, Maminka. Sí he comido, gracias. He traído vino tinto.', isKey: true, note: 'Using "Maminko" (vocative form of Maminka) instead of "paní Nováková" shows you\'ve been accepted into the family. Subtle but very noticed.' },
      { speaker: 'Babička', role: 'ai', czech: 'Ježišmarjá! Jak jsi vyrost! Sedni si, sedni si!', english: 'Oh my goodness! How you\'ve grown! Sit down, sit down!', spanish: '¡Madre mía! ¡Cómo has crecido! ¡Siéntate, siéntate!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Promiňte, Babičko — nerozumím dobře. Můžete mluvit pomaleji?', english: 'Sorry, Grandma — I don\'t understand well. Can you speak more slowly?', spanish: 'Perdone, Babička — no entiendo bien. ¿Puede hablar más despacio?', isKey: true, note: '"Babičko" is the vocative of "Babička" — addressing her directly. Using it correctly earns quiet approval from the whole room.' },
      { speaker: 'Babička', role: 'ai', czech: 'Pomaleji! Pom-a-le-ji! Tak! Rozumíš?', english: 'More slowly! Slo-wer! Like that! Do you understand?', spanish: '¡Más despacio! ¡Des-pa-cio! ¡Así! ¿Entiendes?', isKey: false },
      { speaker: 'Tatínek', role: 'ai', czech: 'Dáš si sklenku? Máme burgundy z Moravy.', english: 'Will you have a glass? We have burgundy from Moravia.', spanish: '¿Te apetece una copa? Tenemos un tinto de Moravia.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Rád. Na zdraví, Tatínku!', english: 'Gladly. Cheers, Dad!', spanish: 'Con mucho gusto. ¡Salud, Tatínek!', isKey: true, note: 'Using "Tatínku" (vocative) instead of his first name signals real family integration. He will pour you a bigger glass.' },
      { speaker: 'Sestra', role: 'ai', czech: 'Takže — česky tě naučila, nebo se učíš sám?', english: 'So — did she teach you Czech, or are you learning yourself?', spanish: '¿Y bien — te enseñó ella el checo, o lo estudias tú solo?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Snažím se sám. Chodím na kurz, ale moc toho ještě neumím.', english: 'I\'m trying on my own. I go to a class, but I still don\'t know much.', spanish: 'Lo intento solo. Voy a clases, pero todavía no sé mucho.', isKey: true, note: 'Honesty about your level lands better than overconfidence. Sestra is testing you. Modesty passes.' },
      { speaker: 'Maminka', role: 'ai', czech: 'Polévka je hotová! Všichni ke stolu. Hned!', english: 'Soup is ready! Everyone to the table. Now!', spanish: '¡La sopa está lista! Todo el mundo a la mesa. ¡Ahora!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Maminko, ta vůně je úžasná. Co vaříte?', english: 'Maminka, that smell is amazing. What are you cooking?', spanish: 'Maminka, ese olor es increíble. ¿Qué estás cocinando?', isKey: true, note: 'Asking what she\'s cooking is the golden key. She will explain every ingredient. This buys you fifteen minutes of excellent listening practice.' }
    ],
    keyPhrases: [
      { czech: 'Maminko / Babičko / Tatínku', english: 'Maminka / Grandma / Dad (vocative forms — how you address them directly)', phonetic: 'MA-min-ko / BA-bich-ko / ta-TEEN-ku' },
      { czech: 'Nerozumím dobře. Pomaleji, prosím.', english: 'I don\'t understand well. Slower, please.', phonetic: 'neh-ROH-zu-meem DOH-bzheh. po-ma-LEY-ee PRO-seem' },
      { czech: 'Je to výborné!', english: 'This is excellent/delicious!', phonetic: 'yeh to VEE-bor-neh' },
      { czech: 'Ta vůně je úžasná.', english: 'That smell is amazing.', phonetic: 'ta VOO-nyeh yeh OO-zhas-nah' },
      { czech: 'Rád. Na zdraví!', english: 'Gladly. Cheers!', phonetic: 'rahd. NA ZDRA-vee' },
      { czech: 'Snažím se sám.', english: 'I\'m trying on my own.', phonetic: 'SNA-zheem seh sahm' }
    ],
    culturalTips: [
      { title: 'Vocatives are the secret handshake', body: '"Babičko," "Maminko," "Tatínku" — these are the vocative forms used when directly addressing family. Using them correctly signals you\'ve integrated beyond tourist-level Czech. Every family member notices.' },
      { title: 'Babička will speak at full speed, forever', body: 'Don\'t panic. "Promiňte, nerozumím. Pomaleji, prosím?" is your shield. She will slow down for exactly one sentence, then resume full speed. Smile and nod. She loves you anyway.' },
      { title: 'Tatínek pours, you accept', body: 'Refusing Tatínek\'s wine offer on the first round is a minor social stumble unless you have a real reason. Accept, say "Na zdraví," and you\'ve secured your position.' },
      { title: 'Sestra is the toughest judge — and the most honest ally', body: 'Sister has seen everyone who\'s come through. She\'s testing your authenticity, not your Czech level. Admit what you don\'t know. Avoid pretending. She respects realness.' },
      { title: 'The smell question is relationship gold', body: 'Asking "Co vaříte?" (What are you cooking?) the moment you smell the food gives Maminka 15 minutes of talking time and makes her feel seen. It\'s the highest-ROI question in Czech family diplomacy.' }
    ],
    realVsTextbook: [
      { textbook: '"Paní Nováková, vaše jídlo je velmi chutné." (Mrs. Nováková, your food is very tasty.)', real: '"Maminko, ta vůně je úžasná!" — First-name vocative + emotional reaction. This is what accepted family members say.' },
      { textbook: '"Nerozumím vám, mluvíte příliš rychle." (I don\'t understand you, you speak too fast.)', real: '"Promiňte, Babičko — pomaleji?" — Shorter, warmer, uses the vocative. She\'ll love you for it.' },
      { textbook: '"Rád bych se naučil více česky." (I would like to learn more Czech.)', real: '"Snažím se sám. Chodím na kurz." — Concrete action beats polite aspiration every time. Sestra approves.' }
    ]
  },

  {
    id: 'police',
    language: 'czech',
    icon: '🏛️',
    title: 'Foreign Police Office',
    subtitle: 'Cizinecká policie',
    difficulty: 'advanced',
    category: 'Bureaucracy',
    shortDesc: 'Welcome to Czech bureaucracy. Bring your documents. All of them. Then come back on Tuesday.',
    context: 'The Czech Foreign Police (Cizinecká policie) is where expat dreams get lovingly tested. The office opens at 8am. The queue started at 5:30am. Your documents are almost certainly incomplete. This is a rite of passage. You\'ll survive. Probably.',
    dialogue: [
      { speaker: 'Úřednice', role: 'ai', czech: 'Další! Co potřebujete?', english: 'Next! What do you need?', spanish: '¡El siguiente! ¿Qué necesita?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Přišel jsem požádat o prodloužení povolení k pobytu.', english: 'Hello. I came to apply for an extension of my residence permit.', spanish: 'Buenos días. Vengo a solicitar la prórroga del permiso de residencia.', isKey: true },
      { speaker: 'Úřednice', role: 'ai', czech: 'Máte pas, fotografii, formulář žádosti a potvrzení o ubytování?', english: 'Do you have passport, photo, application form and proof of accommodation?', spanish: '¿Tiene pasaporte, foto, formulario de solicitud y justificante de alojamiento?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ano, mám. Tady jsou všechny dokumenty.', english: 'Yes, I do. Here are all the documents.', spanish: 'Sí, los tengo. Aquí están todos los documentos.', isKey: true },
      { speaker: 'Úřednice', role: 'ai', czech: 'Hmm. Chybí vám potvrzení o příjmu a kopie pracovní smlouvy.', english: 'Hmm. You\'re missing income confirmation and a copy of your work contract.', spanish: 'Hmm. Le falta el justificante de ingresos y la copia del contrato de trabajo.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Moment, prosím. To mám od zaměstnavatele. Tady.', english: 'One moment, please. I have that from my employer. Here.', spanish: 'Un momento, por favor. Lo tengo del empleador. Aquí.', isKey: true, note: 'Always keep everything in a labeled folder. They will find something missing.' },
      { speaker: 'Vy', role: 'you', czech: 'Promiňte — nerozumím tomuto výrazu. Můžete vysvětlit, prosím?', english: 'Excuse me — I don\'t understand this term. Can you explain, please?', spanish: 'Perdone — no entiendo este término. ¿Puede explicarlo, por favor?', isKey: true },
      { speaker: 'Vy', role: 'you', czech: 'Aha, rozumím. Kdy přijde rozhodnutí?', english: 'Ah, I understand. When will the decision come?', spanish: 'Ah, entiendo. ¿Cuándo llegará la resolución?', isKey: true }
    ],
    keyPhrases: [
      { czech: 'Přišel jsem kvůli...', english: 'I came because of... / I\'m here for...', phonetic: 'PZHEE-shel ysem KVOO-lee' },
      { czech: 'Jaké doklady potřebuji?', english: 'What documents do I need?', phonetic: 'YAH-keh DOK-la-dy poh-TZHEH-bu-yi' },
      { czech: 'Nerozumím. Mluvte pomaleji, prosím.', english: 'I don\'t understand. Speak slower, please.', phonetic: 'neh-ROH-zu-meem. MLOOV-teh po-ma-LEY-ee' },
      { czech: 'Kde si mám vzít číslo?', english: 'Where do I get a queue number?', phonetic: 'gdeh si mahm vzyeet CHEES-lo' },
      { czech: 'Kdy přijde rozhodnutí?', english: 'When will the decision come?', phonetic: 'GDY PZHEE-ydeh roz-HOD-noo-tee' },
      { czech: 'Můžete to napsat?', english: 'Can you write that down?', phonetic: 'MOO-zheh-teh to NAP-sat' }
    ],
    culturalTips: [
      { title: 'Bring photocopies of EVERYTHING', body: 'Czech bureaucracy runs on paper. Bring originals and 2 photocopies of every document. There is usually no photocopier accessible in the building itself.' },
      { title: 'Come before 6am if walk-in', body: 'Online appointments are booked months in advance. Walk-ins mean arriving before 6am. The queue forms in the dark. Yes, really. Bring coffee.' },
      { title: 'Use writing to bridge language gaps', body: '"Můžete to napsat?" (Can you write it?) often solves the language barrier faster than asking them to repeat. Show them your phone translation app if needed.' },
      { title: 'Forms change — verify first', body: 'Check the official government website (mvcr.cz) before going to confirm you have the current version of any form.' },
      { title: 'Patience is your most important document', body: 'Frustration will not speed up the process. A polite, calm demeanor will. The officer has seen 40 people today and it\'s only 10am.' }
    ],
    realVsTextbook: [
      { textbook: '"Nerozumím vám." (I don\'t understand you.)', real: '"Promiňte, nerozumím. Můžete to napsat?" — asking to write it bypasses the language barrier entirely.' },
      { textbook: '"Kdy bude moje žádost zpracována?" (When will my application be processed?)', real: '"Víte, jak dlouho to asi bude trvat?" (Do you have any idea how long it might take?) — softer phrasing, better results.' }
    ]
  },

  {
    id: 'office',
    language: 'czech',
    icon: '💼',
    title: 'Office Small Talk',
    subtitle: 'Kancelářský small talk',
    difficulty: 'intermediate',
    category: 'Work',
    shortDesc: 'Your Czech colleagues aren\'t unfriendly. They\'re just loading. Give it 6 months.',
    context: 'Czech work culture is professional and reserved by default. Don\'t expect questions on day one. Czech colleagues don\'t do fake warmth — but once you\'re in, you\'re genuinely in. The ice breaks over lunch and coffee, not at your desk.',
    dialogue: [
      { speaker: 'Kolega Pavel', role: 'ai', czech: 'Dobrý den. Vy jste ten nový, co?', english: 'Hello. You\'re the new one, right?', spanish: 'Hola. Tú eres el nuevo, ¿verdad?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ano, jsem Tom. Nastoupil jsem minulý týden. Těší mě.', english: 'Yes, I\'m Tom. I started last week. Nice to meet you.', spanish: 'Sí, soy Tom. Empecé la semana pasada. Encantado.', isKey: true },
      { speaker: 'Kolega Pavel', role: 'ai', czech: 'Já jsem Pavel. Jak se vám tu líbí?', english: 'I\'m Pavel. How do you like it here?', spanish: 'Soy Pavel. ¿Qué tal te parece aquí?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Zatím dobrý. Všichni jsou moc milí.', english: 'So far so good. Everyone is very kind.', spanish: 'Bien hasta ahora. Todos son muy amables.', isKey: true, note: '"Zatím dobrý" is casual and natural. Pure enthusiasm can seem fake to Czechs.' },
      { speaker: 'Kolega Pavel', role: 'ai', czech: 'Jdeme na oběd. Chcete jít s námi?', english: 'We\'re going for lunch. Do you want to come with us?', spanish: 'Vamos a comer. ¿Quieres venir con nosotros?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jo, rád! Kde tu dobře vaří?', english: 'Yeah, I\'d love to! Where\'s good food around here?', spanish: '¡Sí, con gusto! ¿Dónde se come bien por aquí?', isKey: true, note: 'ALWAYS accept the first lunch invitation. This is how Czech colleagues bond.' }
    ],
    keyPhrases: [
      { czech: 'Nastoupil jsem minulý týden.', english: 'I started last week.', phonetic: 'nas-TOO-pil ysem MI-noo-lee TEE-den' },
      { czech: 'Zatím dobrý.', english: 'So far so good.', phonetic: 'ZAH-teem DOH-bree' },
      { czech: 'Kde tu dobře vaří?', english: 'Where is there good food around here?', phonetic: 'gdeh too DOH-bzheh VAH-zhee' },
      { czech: 'Musím to zkusit.', english: 'I have to try that.', phonetic: 'MOO-seem to SKOO-sit' },
      { czech: 'Jdeme na kafe?', english: 'Shall we go for coffee?', phonetic: 'YDEH-meh na KAH-feh' }
    ],
    culturalTips: [
      { title: 'Czech small talk stays small — at first', body: 'Weather, coffee, "how was the weekend." Don\'t push for personal topics on day one. The conversation opens gradually. This is not coldness; it\'s respect for privacy.' },
      { title: 'Lunch is where trust gets built', body: 'Czech colleagues bond over lunch far more than in the office. Always say yes to the first invitation. It signals you\'re not above socializing.' },
      { title: 'Don\'t perform enthusiasm', body: 'Excessive positivity can come across as insincere. A dry, honest comment lands better than forced cheerfulness. "Zatím dobrý" beats "I absolutely love it here!" every time.' },
      { title: 'Coffee is a relationship ritual', body: 'Offering to make coffee for the team, or bringing something homemade, fast-tracks your social integration. Czechs respect effort over performance.' }
    ],
    realVsTextbook: [
      { textbook: '"Jsem nadšený, že tu pracuji." (I\'m thrilled to be working here.)', real: '"Zatím dobrý." (So far so good.) — Understate it. They\'ll respect the honesty.' },
      { textbook: '"Jak se jmenuješ?" (What\'s your name?) — too direct, too fast', real: '"Já jsem Tom." — Introduce yourself and let them reciprocate naturally.' }
    ]
  },

  {
    id: 'date',
    language: 'czech',
    icon: '❤️',
    title: 'First Date',
    subtitle: 'První rande',
    difficulty: 'intermediate',
    category: 'Romantic',
    shortDesc: 'She\'ll test if you have a plan. He\'ll pretend to be calm. Both of you are absolutely not calm.',
    context: 'Czech dating culture moves at its own pace — authenticity over performance. "Whatever you want" is the wrong answer. Have a plan. Show up on time. Say what you mean. Using Czech phrases, even imperfectly, is surprisingly charming.',
    dialogue: [
      { speaker: 'Rande', role: 'ai', czech: 'Čekal jsi dlouho?', english: 'Were you waiting long?', spanish: '¿Llevabas mucho esperando?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ne, přišel jsem teď. Vypadáš skvěle.', english: 'No, I just got here. You look great.', spanish: 'No, acabo de llegar. Estás preciosa.', isKey: true, note: 'Simple and genuine. Avoid over-complimenting in the first minute.' },
      { speaker: 'Rande', role: 'ai', czech: 'Díky! Ty taky. Kam jdeme?', english: 'Thanks! You too. Where are we going?', spanish: '¡Gracias! Tú también. ¿Adónde vamos?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Zarezervoval jsem stůl v jedné restauraci na Vinohradech. Máš ráda italskou kuchyni?', english: 'I reserved a table at a restaurant in Vinohrady. Do you like Italian food?', spanish: 'He reservado mesa en un restaurante en Vinohrady. ¿Te gusta la cocina italiana?', isKey: true, note: 'Having a specific plan — not "wherever you want" — is genuinely attractive in Czech culture.' },
      { speaker: 'Rande', role: 'ai', czech: 'Ach, to je milé! Ano, mám. Mluvíš česky?', english: 'Oh, that\'s nice! Yes, I do. You speak Czech?', spanish: '¡Oh, qué detalle! Sí, me encanta. ¿Hablas checo?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Snažím se. Ještě se učím, ale líbí se mi tady.', english: 'I try. I\'m still learning, but I like it here.', spanish: 'Lo intento. Todavía aprendo, pero me gusta estar aquí.', isKey: true, note: 'Self-deprecation about your Czech is charming. Czechs love the effort more than the result.' }
    ],
    keyPhrases: [
      { czech: 'Vypadáš skvěle.', english: 'You look great.', phonetic: 'VI-pa-dahsh SKVYE-leh' },
      { czech: 'Snažím se.', english: 'I\'m trying / I try.', phonetic: 'SNA-zheem seh' },
      { czech: 'Máš chuť na...?', english: 'Are you in the mood for...?', phonetic: 'mahsh HOOT na' },
      { czech: 'Bylo to moc fajn.', english: 'It was really nice.', phonetic: 'BI-lo to mots fyne' },
      { czech: 'Uvidíme se znovu?', english: 'Will we see each other again?', phonetic: 'OO-vi-dee-meh seh ZNO-voo' },
      { czech: 'Líbí se mi tady.', english: 'I like it here.', phonetic: 'LEE-bee seh mi TA-dy' }
    ],
    culturalTips: [
      { title: 'Have a plan — a real one', body: '"I don\'t mind, whatever you want" is the Czech first-date killer. Even a suggestion ("I was thinking we could try X — do you like that?") shows you made an effort.' },
      { title: 'Don\'t rush emotional disclosure', body: 'Deep feelings on a first date can seem performative. Czech dating values authenticity. Say what you mean, but let things develop naturally.' },
      { title: '"Fajn" is your best friend', body: '"Fajn" (pronounced like fine) means cool/nice. It\'s casual, warm, and very Czech. Using it correctly signals you\'re integrated, not just visiting.' },
      { title: 'On paying', body: 'Traditionally men offer to pay on a first date. Women may insist on splitting. The offer is what matters. Make it, don\'t force it, follow their lead.' }
    ],
    realVsTextbook: [
      { textbook: '"Jsi velmi krásná." (You are very beautiful.) — can feel intense too fast', real: '"Vypadáš skvěle." (You look great.) — compliments the moment, not just their existence.' },
      { textbook: '"Chci tě znovu vidět." (I want to see you again.) — "Chci" sounds demanding', real: '"Uvidíme se znovu?" (Will we see each other again?) — a question, not a demand. Charming.' }
    ]
  },


  // ══════════════════════════════════════
  //  🇪🇸  SPANISH SCENARIOS
  // ══════════════════════════════════════

  {
    id: 'es_tapas',
    language: 'spanish',
    icon: '🥘',
    title: 'At the Tapas Bar',
    subtitle: 'En el Bar de Tapas',
    difficulty: 'beginner',
    category: 'Social',
    shortDesc: 'Order like a madrileño. Learn to say "ponme" before you say anything else.',
    context: 'Spanish bars are the beating heart of social life — you stand at the bar, shout over noise, and eat standing up. "Una caña" is a small draft beer (~200ml). Tapas are free in some cities (Granada, Almería), paid in others (Madrid, Barcelona). Guess which one surprises tourists most.',
    dialogue: [
      { speaker: 'Paco (Barman)', role: 'ai', czech: '¿Qué te pongo?', english: 'What can I get you?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Ponme una caña, por favor.', english: 'Get me a small beer, please.', isKey: true, note: '"Ponme" (put me / get me) sounds much more natural than "Quiero" (I want) at a Spanish bar.' },
      { speaker: 'Paco (Barman)', role: 'ai', czech: '¿Y para picar algo?', english: 'And something to snack on?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: '¿Qué tapas tenéis?', english: 'What tapas do you have?', isKey: true, note: '"Tenéis" is Spain Spanish (plural you). In Latin America: "¿Qué tapas tienen?"' },
      { speaker: 'Paco (Barman)', role: 'ai', czech: 'Patatas bravas, croquetas de jamón, calamares...', english: 'Patatas bravas, ham croquettes, calamari...', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Unas patatas bravas y unas croquetas, venga.', english: 'Some patatas bravas and some croquettes, come on then.', isKey: true, note: '"Venga" at the end is a Spanish filler — it means something like "alright then" or "go ahead." Sounds incredibly local.' },
      { speaker: 'Paco (Barman)', role: 'ai', czech: '¡Marchando! ¿Otra caña?', english: '(Order going up!) Another beer?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Sí, ponme otra. ¡Salud!', english: 'Yes, get me another. Cheers!', isKey: true },
      { speaker: 'Paco (Barman)', role: 'ai', czech: '¡Salud! Aquí tienes.', english: 'Cheers! Here you go.', isKey: false },
      { speaker: 'Tú', role: 'you', czech: '¿Me cobras? La cuenta, por favor.', english: 'Can you charge me? The bill, please.', isKey: true, note: '"¿Me cobras?" is the most natural way to ask for the bill in Spain. Much more common than "la cuenta."' }
    ],
    keyPhrases: [
      { czech: 'Ponme una caña.', english: 'Get me a small beer.', phonetic: 'PON-meh OO-na KAH-nyah' },
      { czech: '¿Qué tapas tenéis?', english: 'What tapas do you have?', phonetic: 'keh TA-pas teh-NEH-ees' },
      { czech: '¡Salud!', english: 'Cheers!', phonetic: 'sa-LOOD' },
      { czech: '¿Me cobras?', english: 'Can I pay? / Can you charge me?', phonetic: 'meh KOH-bras' },
      { czech: 'Quédate con el cambio.', english: 'Keep the change.', phonetic: 'KEH-da-teh kon el KAM-byo' },
      { czech: 'Venga.', english: 'Alright / Come on then / Sure.', phonetic: 'BEN-ga' }
    ],
    culturalTips: [
      { title: '"Ponme" beats "Quiero" every time', body: 'Textbooks teach you to say "Quiero una cerveza" (I want a beer). At a Spanish bar, say "Ponme una caña" (get/pour me a beer). It sounds local immediately.' },
      { title: 'Free tapas — know where to expect them', body: 'In Granada, Almería, and parts of Andalusia, a tapa comes free with your drink. In Madrid and Barcelona, tapas are paid. Don\'t ask "is it free?" — watch what others do.' },
      { title: '"¡Marchando!" — the magic word', body: 'When a Spanish barman says "¡Marchando!" it means your order is on its way. It\'s culinary battle cry. You\'ll hear it constantly. It never gets old.' },
      { title: 'You can — and should — stand', body: 'At busy Spanish bars, standing at the bar is the norm. You\'re often closer to the barman, get served faster, and can order easily. Sitting at a table means slower service.' },
      { title: 'Tipping in Spain', body: 'Spain has no strong tipping culture. Rounding up or leaving a few coins (20–50 cents) is fine. 10% is considered generous. Nobody will chase you if you leave nothing.' }
    ],
    realVsTextbook: [
      { textbook: '"Quisiera pedir una cerveza, por favor." (I would like to order a beer.)', real: '"Ponme una caña." — Five syllables. Done. The bartender is already reaching for the tap.' },
      { textbook: '"¿Me podría traer la cuenta, por favor?" (Could you bring me the bill?)', real: '"¿Me cobras?" — Two words. This is what everyone says. Every time.' },
      { textbook: '"De acuerdo." (Alright. / I agree.) — formal, textbook', real: '"Venga." — covers everything from "sure" to "let\'s go" to "fine." The most useful word in Spain.' }
    ]
  },

  {
    id: 'es_family',
    language: 'spanish',
    icon: '👵',
    title: 'Meeting the Family',
    subtitle: 'Conociendo a la Familia',
    difficulty: 'intermediate',
    category: 'Social',
    shortDesc: 'Sunday paella. Three generations. Everyone talks at the same time. You\'ll be fine.',
    context: 'Spanish Sunday lunch is a full-contact sport. The family talks over each other, the abuelas assess you silently, and the paella has been cooking since 10am. The lunch starts at 2pm and ends when it ends — which may be evening. Compliment everything. Eat everything.',
    dialogue: [
      { speaker: 'Señora García', role: 'ai', czech: '¡Hola, hola! ¡Pasa, pasa, qué alegría!', english: 'Hello, hello! Come in, come in, how wonderful!', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Buenas tardes, señora García. Encantado/a. Le traigo esto.', english: 'Good afternoon, Mrs. García. Pleased to meet you. I brought you this.', isKey: true, note: 'Use "usted" (formal you) with parents/elders until they invite you to use "tú." It\'s old-fashioned but very respectful.' },
      { speaker: 'Señora García', role: 'ai', czech: '¡Ay, qué detalle! No tenías que traer nada. Pasa, pasa.', english: 'Oh, how thoughtful! You didn\'t have to bring anything. Come in, come in.', isKey: false },
      { speaker: 'Señor García', role: 'ai', czech: '¿Así que tú eres el que sale con nuestra hija?', english: 'So you\'re the one dating our daughter?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Sí, señor. Es un placer conocerle. Lucía me ha hablado mucho de usted.', english: 'Yes, sir. It\'s a pleasure to meet you. Lucía has told me a lot about you.', isKey: true, note: 'The "Lucía me ha hablado mucho de usted" line is gold. The father will soften immediately.' },
      { speaker: 'Señora García', role: 'ai', czech: '¡A la mesa, que se enfría la paella!', english: 'To the table, the paella is getting cold!', isKey: false },
      { speaker: 'Tú', role: 'you', czech: '¡Qué rico huele todo! Muchas gracias por invitarme.', english: 'Everything smells so good! Thank you so much for having me.', isKey: true },
      { speaker: 'Señora García', role: 'ai', czech: '¡Venga, come, come! ¿Te sirvo más?', english: 'Come on, eat, eat! Shall I serve you more?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: '¡Está buenísimo! ¿Me podría dar la receta?', english: 'It\'s absolutely delicious! Could you give me the recipe?', isKey: true, note: '"Buenísimo" (absolutely delicious) — the superlative. Use it. The señora will beam.' }
    ],
    keyPhrases: [
      { czech: 'Encantado/a.', english: 'Pleased to meet you. (m/f)', phonetic: 'en-kan-TA-do / en-kan-TA-da' },
      { czech: '¡Qué rico!', english: 'How delicious! / This is so good!', phonetic: 'keh REE-ko' },
      { czech: 'Muchas gracias por invitarme.', english: 'Thank you so much for having me.', phonetic: 'MOO-chas GRA-syas por in-vi-TAR-meh' },
      { czech: '¡Está buenísimo!', english: 'It\'s absolutely delicious!', phonetic: 'es-TA bweh-NEE-si-mo' },
      { czech: '¿Me podría dar la receta?', english: 'Could you give me the recipe?', phonetic: 'meh po-DREE-a dar la reh-SEH-ta' },
      { czech: 'Ha sido un placer.', english: 'It\'s been a pleasure.', phonetic: 'a si-DO un pla-SAIR' }
    ],
    culturalTips: [
      { title: 'Bring wine or a dessert', body: 'A bottle of decent wine or a box of pastries (pasteles) is the standard move. Arrive with something; Spanish families will say you didn\'t need to and then immediately open it.' },
      { title: 'The lunch starts at 2pm. Not 12. Not 1.', body: 'Spanish Sunday lunch is at 2pm. If they say "come for lunch," they mean 2pm. Arriving at noon would genuinely confuse everyone.' },
      { title: 'Everyone talks at the same time — join in', body: 'Interrupting in a Spanish family meal is not rude — it means you\'re engaged. Waiting for silence before speaking means you may never speak. Jump in.' },
      { title: 'Use "usted" until told otherwise', body: 'With parents and grandparents, use formal "usted" + third-person verb until they say "tutéame" (use tú with me). It costs nothing and makes an excellent impression.' },
      { title: 'Compliment the paella specifically', body: 'Ask about the paella. Ask how she makes it. Ask what type of rice. The señora has opinions, a method, and probably a secret ingredient. She will tell you all of it.' }
    ],
    realVsTextbook: [
      { textbook: '"La comida está muy sabrosa." (The food is very tasty.) — fine, but flat', real: '"¡Está buenísimo!" or "¡Qué rico está!" — emotional, enthusiastic. Match the family\'s energy.' },
      { textbook: '"¿Cómo se llama usted?" (What is your name?) — very stiff', real: '"Encantado/a, soy [name]." — Introduce yourself warmly and let them tell you their name.' },
      { textbook: '"Estoy lleno." (I\'m full.) — grammatically fine', real: '"Estoy lleno/a, de verdad, está riquísimo." (I\'m full, honestly, it\'s incredibly good.) — Even when refusing, praise first.' }
    ]
  },

  {
    id: 'es_nie',
    language: 'spanish',
    icon: '🏛️',
    title: 'Getting Your NIE',
    subtitle: 'Trámites Burocráticos',
    difficulty: 'advanced',
    category: 'Bureaucracy',
    shortDesc: 'The NIE office. Bring everything. Your appointment was 6 months ago. They\'ll ask for a form you\'ve never heard of.',
    context: 'The NIE (Número de Identidad de Extranjero) is your foreign ID number in Spain — you need it for everything: bank accounts, phone contracts, renting apartments, buying a car. Getting it involves queuing, paperwork, and the philosophical acceptance of Spanish administrative time.',
    dialogue: [
      { speaker: 'Funcionaria', role: 'ai', czech: '¡El siguiente! ¿Qué trámite viene a hacer?', english: 'Next! What procedure are you here for?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Buenos días. Vengo a solicitar el NIE, por favor.', english: 'Good morning. I\'m here to apply for the NIE, please.', isKey: true },
      { speaker: 'Funcionaria', role: 'ai', czech: '¿Trae el formulario EX-15, dos fotos, el pasaporte y la copia?', english: 'Do you have form EX-15, two photos, passport and a copy?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Sí, aquí está todo. Tengo también el empadronamiento.', english: 'Yes, here is everything. I also have the empadronamiento (local registration).', isKey: true, note: '"Empadronamiento" = proof of local address registration. Having it when not asked is impressive.' },
      { speaker: 'Funcionaria', role: 'ai', czech: 'Hmm, falta el justificante del motivo de la solicitud.', english: 'Hmm, you\'re missing the proof of reason for the application.', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Perdone, ¿me podría explicar qué documento necesito exactamente?', english: 'Excuse me, could you explain exactly which document I need?', isKey: true },
      { speaker: 'Funcionaria', role: 'ai', czech: 'Un contrato de trabajo, matrícula universitaria, o título de propiedad.', english: 'A work contract, university enrollment, or property title.', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Tengo un contrato de trabajo. Tomo nota del resto. ¿Cuánto tarda la resolución?', english: 'I have a work contract. I\'ll note the rest. How long does the resolution take?', isKey: true }
    ],
    keyPhrases: [
      { czech: 'Vengo a solicitar el NIE.', english: 'I\'m here to apply for the NIE.', phonetic: 'BEN-go a so-li-si-TAR el en-ee-eh' },
      { czech: '¿Qué documentos necesito?', english: 'What documents do I need?', phonetic: 'keh do-ku-MEN-tos neh-seh-SI-to' },
      { czech: 'No entiendo. ¿Puede repetirlo más despacio?', english: 'I don\'t understand. Can you repeat it more slowly?', phonetic: 'no en-TYEN-do. PWEH-deh reh-pe-TEER-lo mas des-PA-syo' },
      { czech: '¿Dónde cojo el número?', english: 'Where do I get a queue number?', phonetic: 'DON-deh KO-kho el NOO-meh-ro' },
      { czech: '¿Cuándo estará listo?', english: 'When will it be ready?', phonetic: 'KWAN-do es-ta-RA LIS-to' }
    ],
    culturalTips: [
      { title: 'Book your appointment 2–3 months ahead', body: 'NIE appointments at the Extranjería (foreigners\' office) are booked through the Cita Previa (prior appointment) system. Slots go fast. Book early, book the cancellation slot checker.' },
      { title: 'Always bring more copies than you need', body: 'Bring 2 copies of everything: passport, form, photos, any supporting documents. You\'ll probably only need one of each, but you will regret it the one time you don\'t.' },
      { title: '"Empadronamiento" — register locally first', body: 'Your local address registration (padrón) is key. Go to the Ayuntamiento (town hall) with your lease. It\'s a quick form but unlocks many other procedures.' },
      { title: 'The funcionaria (civil servant) has the power', body: 'Be unfailingly polite. "Por favor" and "gracias" at every step. A pleasant attitude can get you a "come back with X and I\'ll push it through" instead of a flat no.' }
    ],
    realVsTextbook: [
      { textbook: '"No comprendo." (I don\'t understand.) — fine but flat', real: '"Perdone, ¿me lo podría explicar? No he entendido bien." (Sorry, could you explain it to me? I didn\'t quite understand.) — more polite, less helpless-sounding.' },
      { textbook: '"¿Cuándo terminará el proceso?" (When will the process finish?)', real: '"¿Cuándo me lo podrán dar?" (When will they be able to give it to me?) — practical, direct, less robotic.' }
    ]
  },

  {
    id: 'es_office',
    language: 'spanish',
    icon: '☕',
    title: 'Office Small Talk',
    subtitle: 'El Café de las Diez',
    difficulty: 'beginner',
    category: 'Work',
    shortDesc: 'The 10am coffee break is sacred. Miss it and you miss everything. Show up and talk about football.',
    context: 'Spanish office culture runs on two rituals: café con leche at 10am and lunch at 2-3pm (not noon). Your colleagues are warm but may take a few weeks to open up fully. The coffee break is where alliances are formed, gossip flows, and you\'ll hear what\'s really going on.',
    dialogue: [
      { speaker: 'Compañera Elena', role: 'ai', czech: '¡Buenos días! ¿Eres el nuevo de marketing?', english: 'Good morning! Are you the new one from marketing?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: '¡Sí! Soy James, empecé ayer. Encantado.', english: 'Yes! I\'m James, I started yesterday. Pleased to meet you.', isKey: true },
      { speaker: 'Compañera Elena', role: 'ai', czech: 'Yo soy Elena, de contabilidad. ¿Vamos a por un café?', english: 'I\'m Elena, from accounting. Shall we go for a coffee?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Claro que sí. Justo lo que necesitaba.', english: 'Of course. Exactly what I needed.', isKey: true, note: '"Claro que sí" is much warmer than just "sí." It means "of course!" with enthusiasm.' },
      { speaker: 'Compañera Elena', role: 'ai', czech: '¿Qué te parece la empresa hasta ahora?', english: 'What do you think of the company so far?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Muy bien hasta ahora. Todos son muy majos.', english: 'Really good so far. Everyone is really nice.', isKey: true, note: '"Majo/maja" = nice, cool, decent person. Very Spanish, very natural. Use it.' },
      { speaker: 'Compañera Elena', role: 'ai', czech: '¿Eres del Madrid o del Barça?', english: 'Are you for Real Madrid or Barça?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Soy del equipo que gana. Aunque en serio, ¿hay un equipo local?', english: 'I support whoever\'s winning. But seriously, is there a local team?', isKey: true, note: 'Saying you support a local team earns major points. Choosing between Madrid and Barça is choosing a side in a civil war.' }
    ],
    keyPhrases: [
      { czech: 'Empecé ayer / la semana pasada.', english: 'I started yesterday / last week.', phonetic: 'em-peh-SEH ah-YAIR / la SEH-mah-na pa-SA-da' },
      { czech: 'Muy bien hasta ahora.', english: 'Really good so far.', phonetic: 'mooy BYEN as-ta ah-O-ra' },
      { czech: '¡Claro que sí!', english: 'Of course! Absolutely!', phonetic: 'KLA-ro keh see' },
      { czech: 'Es muy majo/maja.', english: 'He\'s/She\'s really nice.', phonetic: 'es mooy MA-kho / MA-kha' },
      { czech: '¿Vamos a por un café?', english: 'Shall we go for a coffee?', phonetic: 'BA-mos a por un ka-FEH' }
    ],
    culturalTips: [
      { title: 'The 10am coffee is NOT optional', body: 'The "café de las diez" (10am coffee) is a sacred Spanish office ritual. Missing it repeatedly signals you\'re not a team player. Show up, even if you don\'t drink coffee.' },
      { title: 'Lunch is at 2pm, not noon', body: 'If a Spanish colleague asks if you want to "go for lunch," they mean 2–3pm. Saying you ate at 12 will earn confused looks. Adapt your schedule or eat twice.' },
      { title: '"Majo/maja" — use it', body: '"Majo/maja" (nice/cool person) is one of Spain\'s most useful words. "Es muy majo" about a colleague = instant warmth. It doesn\'t translate perfectly but feels right.' },
      { title: 'Football allegiance is serious business', body: 'When asked about Real Madrid vs. Barça, you can safely deflect with a local team or a joke. Picking a side is picking a tribe. Know what you\'re getting into.' }
    ],
    realVsTextbook: [
      { textbook: '"Sí, me gusta trabajar aquí." (Yes, I like working here.)', real: '"Muy bien hasta ahora. Todos son muy majos." — More specific, more casual, more believable.' },
      { textbook: '"¿Le gustaría tomar un café?" (Would you like to have a coffee?) — overly formal', real: '"¿Vamos a por un café?" — casual, warm, how it actually sounds in an office.' }
    ]
  },

  {
    id: 'es_date',
    language: 'spanish',
    icon: '🌹',
    title: 'First Date',
    subtitle: 'La Primera Cita',
    difficulty: 'intermediate',
    category: 'Romantic',
    shortDesc: 'Dinner starts at 9pm. Conversation runs until midnight. The night is just beginning.',
    context: 'Spanish dates are late, long, and expressive. Dinner at 9pm is early. Midnight is when things get interesting. Spaniards are direct about attraction but indirect about commitment. Use humor. Show genuine interest. Don\'t check your phone.',
    dialogue: [
      { speaker: 'Cita', role: 'ai', czech: '¡Hola! ¿Llevas mucho esperando?', english: 'Hi! Have you been waiting long?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Acabo de llegar. Estás muy guapa esta noche.', english: 'I just got here. You look really beautiful tonight.', isKey: true, note: 'Compliments are welcome and expected in Spanish dating culture. Don\'t hold back.' },
      { speaker: 'Cita', role: 'ai', czech: '¡Gracias! Tú también estás muy guapo. ¿Adónde vamos?', english: 'Thank you! You look great too. Where are we going?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'He reservado una mesa en un restaurante que me han recomendado. ¿Te gustan los mariscos?', english: 'I\'ve booked a table at a restaurant someone recommended to me. Do you like seafood?', isKey: true, note: 'Having a reservation shows effort. It\'s attractive. "Me han recomendado" = someone recommended it to me — shows you researched.' },
      { speaker: 'Cita', role: 'ai', czech: '¡Me encantan! ¿Hablas bien español?', english: 'I love them! Do you speak Spanish well?', isKey: false },
      { speaker: 'Tú', role: 'you', czech: 'Lo intento. Todavía estoy aprendiendo, pero me lo paso genial intentándolo.', english: 'I try. I\'m still learning, but I have a great time trying.', isKey: true, note: '"Me lo paso genial" = I have a great time. Very colloquial, very natural, very Spanish.' }
    ],
    keyPhrases: [
      { czech: 'Estás muy guapo/guapa.', english: 'You look really handsome/beautiful.', phonetic: 'es-TAS mooy GWA-po / GWA-pa' },
      { czech: 'Me lo paso genial.', english: 'I have a great time.', phonetic: 'meh lo PA-so heh-NYAL' },
      { czech: '¿Qué te apetece hacer?', english: 'What do you feel like doing?', phonetic: 'keh teh a-peh-TEH-seh a-SAIR' },
      { czech: 'Me caes muy bien.', english: 'I really like you. (as a person)', phonetic: 'meh KA-es mooy BYEN' },
      { czech: '¿Quedamos otro día?', english: 'Shall we meet again another day?', phonetic: 'keh-DA-mos O-tro DEE-a' }
    ],
    culturalTips: [
      { title: 'Dinner at 9pm is early by Spanish standards', body: '"Dinner" in Spain starts at 9–10pm. A 7pm reservation screams tourist. Embrace the late schedule — the pre-dinner drink (vermut) buys you time.' },
      { title: 'Compliments are expected and welcome', body: 'Unlike some Northern European cultures, complimenting appearance is normal and appreciated in Spain. Don\'t overthink it. If they look great, say so.' },
      { title: '"Me caes muy bien" vs "me gustas"', body: '"Me caes bien" = I like you as a person (character). "Me gustas" = I\'m attracted to you. Both are used, but "me gustas" is more direct about attraction. Context is everything.' },
      { title: 'Physical contact is normal', body: 'Two kisses on the cheek (two besos) are the standard Spanish greeting, even on a first date. Don\'t pull back — it\'s warmth, not flirtation. Save your awkwardness for something else.' }
    ],
    realVsTextbook: [
      { textbook: '"Me gustas mucho." (I like you a lot.) — works but can feel heavy on a first date', real: '"Me caes genial." (I think you\'re great.) — lighter, funnier, more natural for early dates.' },
      { textbook: '"¿Podríamos quedar otra vez?" (Could we meet again?)', real: '"¿Quedamos otro día?" — direct, casual, confident. Exactly right.' }
    ]
  },

  // ══════════════════════════════════════
  //  🇨🇿  NEW CZECH SCENARIOS
  // ══════════════════════════════════════

  {
    id: 'flat',
    language: 'czech',
    icon: '🏠',
    title: 'Flat Viewing',
    subtitle: 'Prohlídka bytu',
    difficulty: 'intermediate',
    category: 'Practical',
    shortDesc: 'The landlord says it\'s "cozy." You need to know if that means 28m². Ask the right questions before you sign anything.',
    context: 'Prague rental market moves fast. Landlords know expats often don\'t push back. Knowing how to ask about rent, deposit, bills, and availability in Czech immediately earns you respect — and might save you thousands. Never sign without understanding what\'s included.',
    dialogue: [
      { speaker: 'Majitelka', role: 'ai', czech: 'Dobrý den! Pojďte dál, ukáži vám byt.', english: 'Hello! Come in, I\'ll show you the apartment.', spanish: '¡Hola! Pase, le enseño el piso.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Děkuji. Je byt ještě volný?', english: 'Hello. Thank you. Is the apartment still available?', spanish: 'Hola. Gracias. ¿Sigue libre el piso?', isKey: true },
      { speaker: 'Majitelka', role: 'ai', czech: 'Ano, volný od prvního příštího měsíce.', english: 'Yes, available from the first of next month.', spanish: 'Sí, libre desde el primero del mes que viene.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Kolik je měsíční nájem? A jsou účty v ceně?', english: 'How much is the monthly rent? And are bills included?', spanish: '¿Cuánto es el alquiler mensual? ¿Están incluidos los suministros?', isKey: true, note: 'Always ask "jsou účty v ceně?" Bills often aren\'t included. It can add 3,000–5,000 Kč/month.' },
      { speaker: 'Majitelka', role: 'ai', czech: 'Nájem je 18 000 korun. Účty jsou zvlášť — asi 3 000 měsíčně.', english: 'Rent is 18,000 crowns. Bills are separate — about 3,000 monthly.', spanish: 'El alquiler son 18.000 coronas. Los suministros son aparte — unos 3.000 al mes.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jaká je kauce? A je povoleno mít domácí zvíře?', english: 'How much is the deposit? And are pets allowed?', spanish: '¿Cuánto es la fianza? ¿Se permiten mascotas?', isKey: true },
      { speaker: 'Majitelka', role: 'ai', czech: 'Kauce jsou dva měsíční nájmy. Zvířata jsou v pořádku, jen menší.', english: 'Deposit is two months\' rent. Pets are fine, just smaller ones.', spanish: 'La fianza son dos meses de alquiler. Las mascotas están bien, solo pequeñas.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Je v bytě internet? A jak je to s parkováním?', english: 'Is there internet in the apartment? And what about parking?', spanish: '¿Hay internet en el piso? ¿Y qué hay con el aparcamiento?', isKey: true },
      { speaker: 'Majitelka', role: 'ai', czech: 'Internet je připravený, stačí si vybrat poskytovatele. Parkování je na ulici, zdarma.', english: 'Internet is ready, you just choose a provider. Parking is on the street, free.', spanish: 'El internet está listo, solo elige proveedor. Aparcamiento en la calle, gratis.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Mohu si vzít čas na rozmyšlenou do zítřka?', english: 'Can I have until tomorrow to think about it?', spanish: '¿Puedo pensármelo hasta mañana?', isKey: true, note: 'Never sign on the spot. A reputable landlord will give you 24 hours. If they won\'t, that\'s a red flag.' }
    ],
    keyPhrases: [
      { czech: 'Kolik je měsíční nájem?', english: 'How much is the monthly rent?', phonetic: 'KO-lik yeh myeh-SEECH-nee NAH-yem' },
      { czech: 'Jsou účty v ceně?', english: 'Are bills included?', phonetic: 'ysow OOTCH-ty fts-EH-nyeh' },
      { czech: 'Jaká je kauce?', english: 'How much is the deposit?', phonetic: 'YA-kah yeh KAW-tse' },
      { czech: 'Je povoleno mít domácí zvíře?', english: 'Are pets allowed?', phonetic: 'yeh po-VO-leh-no meet DO-mah-tsee ZVEE-zheh' },
      { czech: 'Kdy je byt volný?', english: 'When is the apartment available?', phonetic: 'gdy yeh bit VOL-nee' },
      { czech: 'Mohu si vzít čas na rozmyšlenou?', english: 'Can I have time to think about it?', phonetic: 'MO-hoo si vzyeet chas na roz-MISH-leh-now' }
    ],
    culturalTips: [
      { title: 'Bills almost never included', body: '"Účty v ceně" (bills included) is rare. Always ask explicitly. Gas, electricity, water, and building maintenance fees add up. Get the estimate in writing.' },
      { title: 'Deposit is usually 2–3 months', body: 'Standard Czech practice is a deposit (kauce) of 1–3 months\' rent. Anything above 3 months is unusual — push back or walk away.' },
      { title: 'Get everything in writing', body: 'A nájemní smlouva (rental contract) should specify: rent amount, deposit, notice period, what happens to bills, and pet policy. Never rely on verbal agreements.' },
      { title: 'The market moves fast', body: 'Good Prague flats go within hours. Come prepared: have your proof of income, Czech bank account details, and ID ready. Landlords favor expats with stable jobs.' },
      { title: 'Inspect carefully before signing', body: 'Do a walk-through and photograph everything — scratches, stains, broken fixtures. Czech landlords can deduct from your deposit for pre-existing damage if you didn\'t document it.' }
    ],
    realVsTextbook: [
      { textbook: '"Chtěl bych si pronajmout tento byt." (I would like to rent this apartment.) — formal, stiff', real: '"Mám zájem o byt." — "I\'m interested in the apartment." Natural, direct, gets straight to it.' },
      { textbook: '"Je možné dostat nějaký čas na přemýšlení?" (Is it possible to have some time to think?)', real: '"Mohu si vzít čas do zítřka?" — Can I have until tomorrow? Direct and perfectly polite.' }
    ]
  },

  {
    id: 'interview',
    language: 'czech',
    icon: '💼',
    title: 'Job Interview',
    subtitle: 'Pracovní pohovor',
    difficulty: 'advanced',
    category: 'Work',
    shortDesc: 'Czech companies value stability and substance over presentation. Don\'t oversell. Show you\'re serious about staying.',
    context: 'Czech HR culture is reserved and direct. They\'re not looking for American-style enthusiasm — they\'re assessing whether you\'re reliable, competent, and actually planning to stay in the country. Speaking even basic Czech signals serious commitment. It\'s noticed immediately.',
    dialogue: [
      { speaker: 'Personalista', role: 'ai', czech: 'Dobrý den. Jsem rád/a, že jste přišel/la. Sedněte si, prosím.', english: 'Hello. I\'m glad you came. Please have a seat.', spanish: 'Buenos días. Me alegra que haya venido. Siéntese, por favor.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Děkuji za pozvání. Těší mě.', english: 'Hello. Thank you for the invitation. Pleased to meet you.', spanish: 'Buenos días. Gracias por la invitación. Es un placer.', isKey: true },
      { speaker: 'Personalista', role: 'ai', czech: 'Řekněte mi o sobě. Co vás přivedlo do České republiky?', english: 'Tell me about yourself. What brought you to the Czech Republic?', spanish: 'Hábleme de usted. ¿Qué le trajo a la República Checa?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Pracuji v oboru IT pět let. Do Prahy jsem přišel pro příležitosti a zůstat chci dlouhodobě.', english: 'I\'ve worked in IT for five years. I came to Prague for the opportunities and plan to stay long-term.', spanish: 'Llevo cinco años en el sector IT. Vine a Praga por las oportunidades y quiero quedarme a largo plazo.', isKey: true, note: 'Czech employers are cautious about expats leaving after 6 months. Emphasize long-term intention clearly.' },
      { speaker: 'Personalista', role: 'ai', czech: 'Mluvíte česky? Jak důležité to pro vás je?', english: 'Do you speak Czech? How important is that to you?', spanish: '¿Habla checo? ¿Qué importancia tiene para usted?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ještě se učím, ale je to pro mě priorita. Chci pracovat v česky mluvícím prostředí.', english: 'I\'m still learning, but it\'s a priority for me. I want to work in a Czech-speaking environment.', spanish: 'Todavía aprendo, pero es una prioridad. Quiero trabajar en un entorno de habla checa.', isKey: true, note: 'This answer is almost always the right one. They respect the intention even more than the current level.' },
      { speaker: 'Personalista', role: 'ai', czech: 'Jaké jsou vaše silné stránky?', english: 'What are your strengths?', spanish: '¿Cuáles son sus puntos fuertes?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jsem spolehlivý, pracuji systematicky a umím pracovat v týmu. Konkrétní výsledky mohu doložit.', english: 'I\'m reliable, I work systematically, and I work well in a team. I can demonstrate specific results.', spanish: 'Soy fiable, trabajo de forma sistemática y sé trabajar en equipo. Puedo demostrar resultados concretos.', isKey: true }
    ],
    keyPhrases: [
      { czech: 'Děkuji za pozvání.', english: 'Thank you for the invitation.', phonetic: 'DYEH-ku-yi za poz-VAH-nee' },
      { czech: 'Pracuji v oboru... X let.', english: 'I\'ve worked in the field of... for X years.', phonetic: 'PRA-tsu-yi vob-ORU... X let' },
      { czech: 'Chci zůstat dlouhodobě.', english: 'I plan to stay long-term.', phonetic: 'khtsee ZOO-stat DLOW-ho-doh-byeh' },
      { czech: 'Ještě se učím česky.', english: 'I\'m still learning Czech.', phonetic: 'YESH-tyeh seh OO-cheem CHES-key' },
      { czech: 'Jsem spolehlivý/á.', english: 'I\'m reliable.', phonetic: 'ysem SPA-leh-li-vee' },
      { czech: 'Jaký je nástupní termín?', english: 'What is the start date?', phonetic: 'YA-kee yeh NAHS-tup-nee TER-meen' }
    ],
    culturalTips: [
      { title: 'Undersell — then deliver', body: 'Czech culture values modesty. Overclaiming or excessive self-promotion raises eyebrows. Say what you\'ve done concretely. Let your results do the talking.' },
      { title: 'Speaking any Czech is a power move', body: 'Even a few sentences in Czech changes the dynamic completely. It signals you\'re not just passing through. Czech HR managers mention this consistently.' },
      { title: 'Dress smartly, but not flashily', body: 'Business casual is the Czech standard. A well-ironed shirt goes a long way. Expensive or flashy clothes can read as arrogance rather than professionalism.' },
      { title: 'Salary negotiation: be direct', body: 'Czechs respect directness about salary. If they ask your expectation, give a number. "I\'m flexible" is not considered humble — it\'s seen as unprepared.' },
      { title: 'Long-term signals matter more than enthusiasm', body: '"I\'m so excited!" means little to Czech HR. Concrete plans, a stable CV, and evidence you\'re integrating (language, apartment, etc.) matter far more.' }
    ],
    realVsTextbook: [
      { textbook: '"Jsem velmi motivovaný pracovat pro vaši společnost." (I\'m very motivated to work for your company.) — generic', real: '"Líbí se mi, jak vaše firma přistupuje k [specific thing]." — Show you did your homework. Generic enthusiasm = red flag.' },
      { textbook: '"Moje slabá stránka je, že jsem workaholic." (My weakness is that I\'m a workaholic.) — cliché', real: 'Name an actual, minor weakness and how you\'re working on it. Czech interviewers will respect the honesty immediately.' }
    ]
  },

  {
    id: 'doctor',
    language: 'czech',
    icon: '🏥',
    title: 'Doctor Visit',
    subtitle: 'U lékaře',
    difficulty: 'intermediate',
    category: 'Practical',
    shortDesc: 'The doctor will see you now. You have exactly 10 minutes. Say what hurts, understand the prescription, and don\'t panic.',
    context: 'Czech healthcare is solid and affordable with EU health insurance or Czech pojišťovna (health insurance). Finding an English-speaking doctor is possible in Prague, harder elsewhere. GPs (praktický lékař) require registration — you can\'t just walk in. For emergencies: nemocnice or pohotovost (emergency clinic).',
    dialogue: [
      { speaker: 'Doktor', role: 'ai', czech: 'Dobrý den. Co vás trápí?', english: 'Hello. What\'s bothering you?', spanish: 'Buenos días. ¿Qué le ocurre?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Bolí mě hlava a mám horečku.', english: 'Hello. I have a headache and a fever.', spanish: 'Buenos días. Me duele la cabeza y tengo fiebre.', isKey: true },
      { speaker: 'Doktor', role: 'ai', czech: 'Jak dlouho to máte? A jak silná je ta bolest?', english: 'How long have you had this? And how strong is the pain?', spanish: '¿Desde cuándo le pasa? ¿Y cómo de fuerte es el dolor?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Od včera. Bolest je silná — asi sedm z deseti.', english: 'Since yesterday. The pain is strong — about seven out of ten.', spanish: 'Desde ayer. El dolor es fuerte — como un siete sobre diez.', isKey: true, note: 'The 1–10 pain scale is universal. Use it — it\'s faster and clearer than describing it in words.' },
      { speaker: 'Doktor', role: 'ai', czech: 'Máte alergii na nějaké léky?', english: 'Are you allergic to any medications?', spanish: '¿Es alérgico/a a algún medicamento?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ano, jsem alergický/á na penicilin.', english: 'Yes, I\'m allergic to penicillin.', spanish: 'Sí, soy alérgico/a a la penicilina.', isKey: true, note: 'This is critical. Write it down in Czech and carry it with you if you have any allergies.' },
      { speaker: 'Doktor', role: 'ai', czech: 'Dobře. Předepíšu vám antibiotika. Berte třikrát denně po jídle.', english: 'Fine. I\'ll prescribe antibiotics. Take them three times a day after meals.', spanish: 'Bien. Le recetaré antibióticos. Tómelos tres veces al día después de comer.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Promiňte — mohl/a byste to prosím napsat? Nechci špatně pochopit dávkování.', english: 'Excuse me — could you please write that down? I don\'t want to misunderstand the dosage.', spanish: 'Perdone — ¿podría anotarlo, por favor? No quiero malentender la dosis.', isKey: true, note: '"Můžete to napsat?" is your most powerful phrase in any Czech official context.' }
    ],
    keyPhrases: [
      { czech: 'Bolí mě...', english: 'My ... hurts / I have pain in...', phonetic: 'BO-lee myeh' },
      { czech: 'Mám horečku.', english: 'I have a fever.', phonetic: 'mahm HO-rech-ku' },
      { czech: 'Jsem alergický/á na...', english: 'I\'m allergic to...', phonetic: 'ysem a-LER-gits-kee na' },
      { czech: 'Jak mám brát léky?', english: 'How should I take the medicine?', phonetic: 'yak mahm braht LEH-kee' },
      { czech: 'Můžete to napsat?', english: 'Can you write that down?', phonetic: 'MOO-zheh-teh to NAP-sat' },
      { czech: 'Potřebuji recept.', english: 'I need a prescription.', phonetic: 'po-TZHEH-bu-yi RE-tsept' }
    ],
    culturalTips: [
      { title: 'Register with a GP before you\'re sick', body: 'Czech system requires registering with a praktický lékař (GP) before you get ill. You can\'t just walk in when you need them. Find one in your district, register when you\'re healthy.' },
      { title: 'Health insurance is mandatory', body: 'All Czech residents must have health insurance — either EU card (short stays), Czech public insurance (VZP etc.) for long-term, or private. Without it, you pay full price.' },
      { title: 'The 10-minute appointment is real', body: 'Czech GPs are efficient and appointments are short. Come with your symptoms listed clearly. Don\'t wait to be asked — lead with the most important thing.' },
      { title: 'Pharmacies (lékárna) are widely trusted', body: 'Czech pharmacists are highly trained and often the first line of advice for minor ailments. Describe your symptoms and they will recommend over-the-counter options.' },
      { title: 'Emergency: pohotovost or 155', body: 'For urgent but non-life-threatening issues: pohotovost (walk-in emergency clinic). For life-threatening: 155 (ambulance) or 112 (European emergency number).' }
    ],
    realVsTextbook: [
      { textbook: '"Trpím silnými bolestmi hlavy." (I suffer from severe headaches.) — overly formal', real: '"Bolí mě hlava, dost silně." — Much more natural. Czech doctors appreciate directness.' },
      { textbook: '"Mohl byste mi předepsat nějaké léky?" (Could you prescribe some medication?)', real: '"Co mi doporučujete?" — "What do you recommend?" — Lets the doctor lead while showing you trust their expertise.' }
    ]
  },

  {
    id: 'grocery',
    language: 'czech',
    icon: '🛒',
    title: 'Grocery Store',
    subtitle: 'V obchodě',
    difficulty: 'beginner',
    category: 'Daily Life',
    shortDesc: 'Finding things, asking prices, paying. The daily run that reveals how much Czech you actually know.',
    context: 'Czech supermarkets (Albert, Billa, Lidl, Kaufland, Tesco) all work the same way. The tricky moments: when the cashier asks if you have a loyalty card, asks you to enter your PIN, or when something doesn\'t scan. These three situations trip up expats daily.',
    dialogue: [
      { speaker: 'Prodavačka', role: 'ai', czech: 'Dobrý den! Potřebujete pomoct?', english: 'Hello! Do you need help?', spanish: '¡Hola! ¿Necesita ayuda?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Kde najdu chléb?', english: 'Hello. Where can I find bread?', spanish: 'Hola. ¿Dónde encuentro el pan?', isKey: true },
      { speaker: 'Prodavačka', role: 'ai', czech: 'Chléb je v pravém rohu, vedle pekařských výrobků.', english: 'Bread is in the right corner, next to the bakery section.', spanish: 'El pan está en el rincón de la derecha, junto a la panadería.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Děkuji. A kde jsou mléčné výrobky?', english: 'Thank you. And where are the dairy products?', spanish: 'Gracias. ¿Y dónde están los lácteos?', isKey: true },
      { speaker: 'Pokladní', role: 'ai', czech: 'Máte věrnostní kartu?', english: 'Do you have a loyalty card?', spanish: '¿Tiene tarjeta de fidelidad?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Nemám, bohužel.', english: 'I don\'t, unfortunately.', spanish: 'No tengo, por desgracia.', isKey: true, note: '"Nemám, bohužel" is the perfect polite answer to anything you don\'t have. Short, correct, no stress.' },
      { speaker: 'Pokladní', role: 'ai', czech: 'Dobře. Celkem 347 korun. Platíte kartou nebo hotově?', english: 'Fine. Total is 347 crowns. Card or cash?', spanish: 'Bien. En total 347 coronas. ¿Paga con tarjeta o en efectivo?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Kartou, prosím.', english: 'By card, please.', spanish: 'Con tarjeta, por favor.', isKey: true },
      { speaker: 'Pokladní', role: 'ai', czech: 'Zadejte PIN, prosím.', english: 'Please enter your PIN.', spanish: 'Introduzca el PIN, por favor.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Potřebuji tašku, prosím.', english: 'I need a bag, please.', spanish: 'Necesito una bolsa, por favor.', isKey: true, note: 'Bags aren\'t free and aren\'t offered automatically in Czech shops. You have to ask.' }
    ],
    keyPhrases: [
      { czech: 'Kde najdu...?', english: 'Where can I find...?', phonetic: 'gdeh NAY-du' },
      { czech: 'Kolik to stojí?', english: 'How much does this cost?', phonetic: 'KO-lik to STO-yee' },
      { czech: 'Kartou, prosím.', english: 'By card, please.', phonetic: 'KAR-tow, PRO-seem' },
      { czech: 'Nemám věrnostní kartu.', english: 'I don\'t have a loyalty card.', phonetic: 'NEH-mahm VYER-nost-nee KAR-tu' },
      { czech: 'Potřebuji tašku.', english: 'I need a bag.', phonetic: 'po-TZHEH-bu-yi TASH-ku' },
      { czech: 'Je to správně?', english: 'Is that correct?', phonetic: 'yeh to SPRAV-nyeh' }
    ],
    culturalTips: [
      { title: 'Bags cost money and aren\'t offered', body: 'Czech supermarkets charge for bags and cashiers don\'t ask. If you want one, say "Potřebuji tašku" before they start scanning. After, it\'s awkward.' },
      { title: 'The loyalty card question', body: 'Every chain has one — Albert, Billa, Tesco, etc. The question "Máte věrnostní kartu?" will come at every checkout. "Nemám, bohužel" handles it perfectly.' },
      { title: 'Self-checkout in Czech', body: 'Czech self-checkouts speak Czech. Learn "potvrdit" (confirm), "zaplatit" (pay), and "zrušit" (cancel). The machine will ask about your loyalty card too.' },
      { title: 'Markets (tržiště) for fresh produce', body: 'Prague has excellent outdoor markets (Jiřák, Náplavka) for fresh fruit, vegetables and cheese. Vendors often have a little English. Prices are displayed in Kč per kilo.' }
    ],
    realVsTextbook: [
      { textbook: '"Promiňte, mohli byste mi říct, kde se nachází chléb?" (Excuse me, could you tell me where the bread is located?)', real: '"Kde je chléb?" — Two words. Points at what you want. Works perfectly.' },
      { textbook: '"Rád bych zaplatil kartou." (I would like to pay by card.)', real: '"Kartou." — One word. Hold up your card. Done.' }
    ]
  },

  {
    id: 'padel',
    language: 'czech',
    icon: '🎾',
    title: 'Playing Padel',
    subtitle: 'Hrajeme padel',
    difficulty: 'intermediate',
    category: 'Social',
    shortDesc: 'Your Czech friends invited you to padel. Survive the warmup, the game, and the mandatory post-match beer.',
    context: 'Padel is exploding in the Czech Republic. Your Czech friends play every week and finally invited you. Court talk is fast, energetic, and full of slang. Three phases: before the game (arrivals, teams, warmup), during (calling the score, cheering, owning your mistakes), and after (the beer debrief is not optional).',
    dialogue: [
      { speaker: 'Tomáš', role: 'ai', czech: 'Nazdar! Přišels! Máš raketu, nebo půjčíš?', english: 'Hey! You made it! Do you have a racket, or are you borrowing one?', spanish: '¡Hola! ¡Has venido! ¿Tienes raqueta o vas a alquilar una?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ahoj! Raději půjčím, ještě jsem padelový nováček.', english: 'Hi! I\'ll borrow one, I\'m still a padel newbie.', spanish: '¡Hola! Mejor alquilo, todavía soy un novato en pádel.', isKey: true, note: '"Nováček" = newbie. Admitting you\'re new sets realistic expectations and earns goodwill from the whole group.' },
      { speaker: 'Tomáš', role: 'ai', czech: 'Nevadí. Hrajeme čtyři — ty a já proti Honzovi a Petrovi. Jasný?', english: 'No problem. Four of us — you and me against Honza and Petr. Clear?', spanish: 'No pasa nada. Cuatro jugadores — tú y yo contra Honza y Petr. ¿De acuerdo?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Super! Jaký je bodovací systém? Jako tenis?', english: 'Great! What\'s the scoring system? Like tennis?', spanish: '¡Genial! ¿Cuál es el sistema de puntuación? ¿Como el tenis?', isKey: true, note: 'Asking upfront saves confusion mid-game. Czech players respect preparation over bravado.' },
      { speaker: 'Tomáš', role: 'ai', czech: 'Výborně! Eso! Tak takhle to chci vidět!', english: 'Excellent! That\'s it! That\'s what I want to see!', spanish: '¡Excelente! ¡Eso! ¡Así quiero verlo!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Promiň, špatná rána. Příště líp.', english: 'Sorry, bad shot. Better next time.', spanish: 'Perdona, mal golpe. La próxima mejor.', isKey: true, note: '"Příště líp" = better next time. Short, self-aware. Czech sports culture values owning mistakes without drama.' },
      { speaker: 'Honza', role: 'ai', czech: 'Kolik je skóre? Jsme tři dvě, ne?', english: 'What\'s the score? We\'re three-two, right?', spanish: '¿Cómo vamos? Tres-dos nosotros, ¿no?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Myslím, že tři tři. Ale nejsem si jist.', english: 'I think three-three. But I\'m not sure.', spanish: 'Creo que tres iguales. Pero no estoy seguro.', isKey: true },
      { speaker: 'Tomáš', role: 'ai', czech: 'Dobrý zápas! Jdeme na pivo? Zasloužili jsme to.', english: 'Good match! Going for a beer? We deserve it.', spanish: '¡Buen partido! ¿Nos vamos a tomar una cerveza? Nos lo merecemos.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Určitě! Já stavím první rundu.', english: 'Definitely! I\'ll get the first round.', spanish: '¡Desde luego! Yo pago la primera ronda.', isKey: true, note: 'Offering the first round after sports is a strong move in Czech culture. It will be remembered next week.' }
    ],
    keyPhrases: [
      { czech: 'Jsem padelový nováček.', english: 'I\'m a padel newbie.', phonetic: 'ysem PA-deh-lo-vee NO-vah-chek' },
      { czech: 'Promiň, špatná rána.', english: 'Sorry, bad shot.', phonetic: 'PRO-min, SHPAT-nah RAH-nah' },
      { czech: 'Kolik je skóre?', english: 'What\'s the score?', phonetic: 'KO-lik yeh SKOH-reh' },
      { czech: 'Výborně! Eso!', english: 'Excellent! That\'s it!', phonetic: 'VEE-bor-nyeh! EH-so!' },
      { czech: 'Já stavím první rundu.', english: 'I\'ll get the first round.', phonetic: 'yah STA-veem PRVH-nee ROON-du' },
      { czech: 'Příště líp.', english: 'Better next time.', phonetic: 'PZHEE-shtye leep' }
    ],
    culturalTips: [
      { title: 'Padel is booming in Czech Republic', body: 'Padel courts have opened all over Prague and major cities. It\'s become the sport of choice for 30-something professionals. Getting invited is a genuine social signal that you\'re in.' },
      { title: 'Admit you\'re a nováček', body: '"Jsem padelový nováček" (I\'m a padel newbie) is the correct opening move. Czech sports culture respects honesty. Overconfidence when you\'re clearly learning looks worse than admitting you\'re new.' },
      { title: 'Own your mistakes quickly and move on', body: '"Promiň, špatná rána" said quickly and without drama is perfectly Czech. Don\'t over-apologize. Don\'t rage. Acknowledge and play on.' },
      { title: 'Post-game beer is not optional', body: 'After any Czech sports session, beer follows. "Jdeme na pivo?" is rhetorical. The answer is yes. Not going requires a very good reason — and an explanation.' },
      { title: 'Offering the first round earns lasting goodwill', body: '"Já stavím první rundu" (I\'ll get the first round) after sports is a strong move. They\'ll remember it. Rounds rotate naturally after that — no one keeps exact count.' }
    ],
    realVsTextbook: [
      { textbook: '"Omlouvám se za špatný úder." (I apologize for the poor stroke.)', real: '"Promiň, špatná rána." — Half the words. Same meaning. This is how Czech players talk on court.' },
      { textbook: '"Bylo to velmi příjemné sportovní utkání." (That was a very pleasant sporting match.)', real: '"Dobrý zápas!" — Two words. Enthusiastic nod. The beer says the rest.' }
    ]
  }

];
