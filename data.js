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

  ,{
    id: 'padel',
    language: 'czech',
    icon: '🎾',
    title: 'Padel Game',
    subtitle: 'Padelový zápas',
    difficulty: 'beginner',
    category: 'Sport',
    shortDesc: 'Short, energetic phrases for before, during and after a padel game.',
    context: 'Padel is exploding in Czech Republic. Courts are everywhere. You\'ll need to coordinate partners, call score, and celebrate wins — all in quick, energetic bursts. No time for full sentences. Short and sharp is the style.',
    dialogue: [
      { speaker: 'Partner', role: 'ai', czech: 'Připravený? Začínáme!', english: 'Ready? Let\'s start!', spanish: '¿Listo? ¡Empezamos!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jdeme na to!', english: 'Let\'s go!', spanish: '¡Vamos!', isKey: true, note: 'Classic energetic opener — works in Czech and Spanish.' },
      { speaker: 'Partner', role: 'ai', czech: 'Tvůj servis.', english: 'Your serve.', spanish: 'Tu saque.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Připravený!', english: 'Ready!', spanish: '¡Listo!', isKey: true },
      { speaker: 'Partner', role: 'ai', czech: 'Dobrý míč!', english: 'Good shot!', spanish: '¡Buena bola!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Díky! Ještě jednou.', english: 'Thanks! One more time.', spanish: '¡Gracias! Otra vez.', isKey: true },
      { speaker: 'Partner', role: 'ai', czech: 'Výborně! Skóre je 30-15.', english: 'Excellent! Score is 30-15.', spanish: '¡Excelente! El marcador es 30-15.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Super! Pojďme dál.', english: 'Great! Let\'s keep going.', spanish: '¡Genial! Sigamos.', isKey: true },
      { speaker: 'Partner', role: 'ai', czech: 'Konec setu. Dáme si pauzu?', english: 'End of set. Shall we take a break?', spanish: 'Fin del set. ¿Hacemos una pausa?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jo, trochu vody. Šlo ti to skvěle!', english: 'Yes, some water. You played great!', spanish: 'Sí, un poco de agua. ¡Jugaste genial!', isKey: true, note: 'Always compliment your partner — it\'s good sportsmanship in any language.' }
    ],
    keyPhrases: [
      { czech: 'Jdeme na to!', english: 'Let\'s go!', phonetic: 'YDEH-meh na to' },
      { czech: 'Dobrý míč!', english: 'Good shot!', phonetic: 'DOH-bree meech' },
      { czech: 'Tvůj servis.', english: 'Your serve.', phonetic: 'tvooy SER-vis' },
      { czech: 'Výborně!', english: 'Excellent!', phonetic: 'VEE-bor-nyeh' },
      { czech: 'Pojďme dál.', english: "Let's keep going.", phonetic: 'POY-dyeh-meh dahl' },
      { czech: 'Šlo ti to skvěle!', english: 'You played great!', phonetic: 'shlo ti to SKVYE-leh' }
    ],
    culturalTips: [
      { title: 'Czech players are quiet but intense', body: 'Czech padel culture is focused. Short exclamations are fine ("Výborně!", "Dobrý míč!") but long mid-game chats are unusual. Save the talking for breaks.' },
      { title: 'Score calling is simple', body: 'Use numbers: "30-15", "Deuce" (Shoda), "Advantage" (Výhoda). Everyone knows the international padel scoring system.' },
      { title: 'Compliment the game after, not during', body: '"Šlo ti to skvěle!" (You played great!) after the match is always appreciated. Czech players are modest — they\'ll deflect it, but they\'ll remember you said it.' }
    ],
    realVsTextbook: [
      { textbook: '"Zahrál jsi velmi dobře." (You played very well.) — full sentence', real: '"Šlo ti to skvěle!" — punchy, warm, sounds natural in a sports context.' },
      { textbook: '"Jsem připraven k servírování." (I am ready to serve.)', real: '"Připravený!" — one word, no one says the full sentence on a padel court.' }
    ]
  }

];


// ══════════════════════════════════════
//  📚  SURVIVAL PHRASES — Unified multilingual data
//  Used by survival.html and panic.html
// ══════════════════════════════════════

const PHRASES = {
  directions: {
    icon: '🗺️',
    title: 'Directions',
    phrases: [
      { id: 'dir_1', czech: 'Kde je...?', english: 'Where is...?', spanish: '¿Dónde está...?', pronunciation: 'gdeh yeh', note: 'Fill in: metro, záchod, nemocnice...' },
      { id: 'dir_2', czech: 'Jak se dostanu na...?', english: 'How do I get to...?', spanish: '¿Cómo llego a...?', pronunciation: 'yak seh DOS-ta-nu na' },
      { id: 'dir_3', czech: 'Je to daleko?', english: 'Is it far?', spanish: '¿Está lejos?', pronunciation: 'yeh to DA-leh-ko' },
      { id: 'dir_4', czech: 'Doleva / Doprava / Rovně', english: 'Left / Right / Straight ahead', spanish: 'Izquierda / Derecha / Todo recto', pronunciation: 'DO-leh-va / DO-pra-va / ROV-nyeh' },
      { id: 'dir_5', czech: 'Promiňte, jsem ztracený/á.', english: "Excuse me, I'm lost.", spanish: 'Perdone, estoy perdido/a.', pronunciation: 'PRO-min-tyeh, ysem STRA-tse-nee' },
      { id: 'dir_6', czech: 'Můžete mi ukázat na mapě?', english: 'Can you show me on the map?', spanish: '¿Puede mostrarme en el mapa?', pronunciation: 'MOO-zheh-teh mi OO-kah-zat na MA-pyeh' },
      { id: 'dir_7', czech: 'Jdu správně?', english: 'Am I going the right way?', spanish: '¿Voy bien?', pronunciation: 'ydoo SPRAV-nyeh' },
      { id: 'dir_8', czech: 'Na druhé straně ulice.', english: 'On the other side of the street.', spanish: 'Al otro lado de la calle.', pronunciation: 'na DROO-heh STRA-nyeh OO-li-tse' }
    ]
  },
  restaurant: {
    icon: '🍽️',
    title: 'Ordering Food',
    phrases: [
      { id: 'rest_1', czech: 'Dám si...', english: "I'll have...", spanish: 'Ponme... / Quiero...', pronunciation: 'dahm si', note: "More natural than 'chci' (I want)" },
      { id: 'rest_2', czech: 'Jídelní lístek, prosím.', english: 'Menu, please.', spanish: 'La carta, por favor.', pronunciation: 'YEE-del-nee LEES-tek, PRO-seem' },
      { id: 'rest_3', czech: 'Zaplatím, prosím.', english: "I'd like to pay.", spanish: 'Me cobra, por favor.', pronunciation: 'ZA-pla-teem, PRO-seem', note: "Don't wait — they won't bring it uninvited." },
      { id: 'rest_4', czech: 'Bez masa, prosím.', english: 'Without meat, please.', spanish: 'Sin carne, por favor.', pronunciation: 'bez MA-sa, PRO-seem' },
      { id: 'rest_5', czech: 'Je to výborné!', english: 'This is excellent!', spanish: '¡Está riquísimo!', pronunciation: 'yeh to VEE-bor-neh', note: 'Best compliment you can give.' },
      { id: 'rest_6', czech: 'Jedno pivo, prosím.', english: 'One beer, please.', spanish: 'Una cerveza, por favor.', pronunciation: 'YED-no PI-vo, PRO-seem', note: '"Jedno" not "jeden" — pivo is neuter.' },
      { id: 'rest_7', czech: 'Máte bezlepkové jídlo?', english: 'Do you have gluten-free food?', spanish: '¿Tienen comida sin gluten?', pronunciation: 'MAH-teh bez-lep-KOH-veh YEE-dlo' },
      { id: 'rest_8', czech: 'Na zdraví!', english: 'Cheers!', spanish: '¡Salud!', pronunciation: 'na ZDRA-vee' }
    ]
  },
  bathroom: {
    icon: '🚻',
    title: 'Finding a Bathroom',
    phrases: [
      { id: 'bath_1', czech: 'Kde jsou toalety?', english: 'Where are the toilets?', spanish: '¿Dónde están los baños?', pronunciation: 'gdeh ysou TO-a-leh-ty' },
      { id: 'bath_2', czech: 'Je záchod zdarma?', english: 'Is the toilet free?', spanish: '¿El baño es gratis?', pronunciation: 'yeh ZAH-khod ZDA-rma' },
      { id: 'bath_3', czech: 'Promiňte, potřebuji na záchod.', english: 'Excuse me, I need to use the bathroom.', spanish: 'Perdone, necesito ir al baño.', pronunciation: 'PRO-min-tyeh, po-TZHEH-bu-yi na ZAH-khod' },
      { id: 'bath_4', czech: 'Záchod je obsazený.', english: 'The bathroom is occupied.', spanish: 'El baño está ocupado.', pronunciation: 'ZAH-khod yeh ob-SA-tse-nee' },
      { id: 'bath_5', czech: 'Kde si mohu umýt ruce?', english: 'Where can I wash my hands?', spanish: '¿Dónde me puedo lavar las manos?', pronunciation: 'gdeh si MO-hoo OO-meet ROO-tseh' }
    ]
  },
  transport: {
    icon: '🚌',
    title: 'Public Transport',
    phrases: [
      { id: 'trans_1', czech: 'Jede tento autobus na...?', english: 'Does this bus go to...?', spanish: '¿Este autobús va a...?', pronunciation: 'YEH-deh TEN-to OW-to-bus na' },
      { id: 'trans_2', czech: 'Kde si mohu koupit lístek?', english: 'Where can I buy a ticket?', spanish: '¿Dónde puedo comprar el billete?', pronunciation: 'gdeh si MO-hoo KOW-pit LEES-tek' },
      { id: 'trans_3', czech: 'Jaká je příští zastávka?', english: "What's the next stop?", spanish: '¿Cuál es la próxima parada?', pronunciation: 'YA-kah yeh PZHEESH-tee ZA-stahv-ka' },
      { id: 'trans_4', czech: 'Vystupuji tady.', english: "I'm getting off here.", spanish: 'Me bajo aquí.', pronunciation: 'VIS-tu-pu-yi TA-dy' },
      { id: 'trans_5', czech: 'Je to přímý spoj?', english: 'Is it a direct connection?', spanish: '¿Es directo?', pronunciation: 'yeh to PZHEE-mee spoy' },
      { id: 'trans_6', czech: 'V kolik hodin odjíždí vlak?', english: 'What time does the train leave?', spanish: '¿A qué hora sale el tren?', pronunciation: 'vko-lik HO-din od-YEEZH-dyee vlak' },
      { id: 'trans_7', czech: 'Zmeškal/a jsem spoj.', english: "I've missed my connection.", spanish: 'He perdido el enlace.', pronunciation: 'ZMESH-kal/a ysem spoy' }
    ]
  },
  emergency: {
    icon: '🚨',
    title: 'Emergency Basics',
    phrases: [
      { id: 'emerg_1', czech: 'Pomoc!', english: 'Help!', spanish: '¡Socorro!', pronunciation: 'PO-mots', note: 'Shout this loudly.' },
      { id: 'emerg_2', czech: 'Zavolejte záchranku!', english: 'Call an ambulance!', spanish: '¡Llamen una ambulancia!', pronunciation: 'ZA-vo-ley-teh ZAH-kran-ku' },
      { id: 'emerg_3', czech: 'Byl/a jsem přepaden/a.', english: "I've been robbed.", spanish: 'Me han robado.', pronunciation: 'bil/a ysem PZHEH-pa-den/a' },
      { id: 'emerg_4', czech: 'Potřebuji lékaře.', english: 'I need a doctor.', spanish: 'Necesito un médico.', pronunciation: 'po-TZHEH-bu-yi LEH-kah-zheh' },
      { id: 'emerg_5', czech: 'Zavolejte policii!', english: 'Call the police!', spanish: '¡Llamen a la policía!', pronunciation: 'ZA-vo-ley-teh po-LI-tsii' },
      { id: 'emerg_6', czech: 'Potřebuji pomoc.', english: 'I need help.', spanish: 'Necesito ayuda.', pronunciation: 'po-TZHEH-bu-yi PO-mots' },
      { id: 'emerg_7', czech: 'Je mi špatně.', english: "I don't feel well.", spanish: 'Me siento mal.', pronunciation: 'yeh mi SHPAT-nyeh' }
    ]
  },
  apartment: {
    icon: '🏠',
    title: 'Apartment Hunting',
    phrases: [
      { id: 'apt_1', czech: 'Kolik stojí nájem?', english: 'How much is the rent?', spanish: '¿Cuánto es el alquiler?', pronunciation: 'KO-lik STOY-ee NAH-yem' },
      { id: 'apt_2', czech: 'Je kauce zahrnuta?', english: 'Is a deposit included?', spanish: '¿Hay fianza?', pronunciation: 'yeh KOW-tse ZA-hrnu-ta' },
      { id: 'apt_3', czech: 'Jsou energie zahrnuty?', english: 'Are utilities included?', spanish: '¿Están incluidos los suministros?', pronunciation: 'ysou e-NER-gi-ye ZA-hrnu-ty' },
      { id: 'apt_4', czech: 'Kdy je byt volný?', english: 'When is the flat available?', spanish: '¿Cuándo está disponible el piso?', pronunciation: 'GDY yeh bit VOL-nee' },
      { id: 'apt_5', czech: 'Mohu se podívat?', english: 'Can I take a look?', spanish: '¿Puedo verlo?', pronunciation: 'MO-hoo seh po-DEE-vat' },
      { id: 'apt_6', czech: 'Na jak dlouho je smlouva?', english: 'How long is the contract?', spanish: '¿Por cuánto tiempo es el contrato?', pronunciation: 'na yak DLOH-ho yeh SMLOW-va' },
      { id: 'apt_7', czech: 'Je dovoleno mít domácí zvíře?', english: 'Are pets allowed?', spanish: '¿Se permiten mascotas?', pronunciation: 'yeh do-VO-le-no meet do-MAH-tsee ZVEE-zheh' },
      { id: 'apt_8', czech: 'Kde je nejbližší zastávka MHD?', english: "Where's the nearest public transport stop?", spanish: '¿Dónde está la parada de transporte más cercana?', pronunciation: 'gdeh yeh ney-BLEEZH-shee ZA-stahv-ka' }
    ]
  }
};

// Language utils — used across pages
const LangUtils = {
  get() { return localStorage.getItem('czechmate_lang') || null; },
  set(lang) { localStorage.setItem('czechmate_lang', lang); },
  clear() { localStorage.removeItem('czechmate_lang'); },
  isSet() { return !!localStorage.getItem('czechmate_lang'); }
};

// ══════════════════════════════════════════════════════════════════
//  🌍  SCENARIOS_V2 — Unified multilingual scenario data
//  Every scenario has Czech + English + Spanish. No exceptions.
//  Language toggle changes DISPLAY only, not available scenarios.
// ══════════════════════════════════════════════════════════════════

const SCENARIOS_V2 = [

  // ── 1. AT THE PUB / BAR ──────────────────────────────────────────
  {
    id: 'pub',
    icon: '🍺',
    difficulty: 'beginner',
    category: 'Social',
    title: { czech: 'V hospodě', english: 'At the Pub / Bar', spanish: 'En el Bar de Tapas' },
    subtitle: { czech: 'Objednejte si jako místní', english: 'Order like a local', spanish: 'Pide como un local' },
    shortDesc: { czech: 'Pivo, ticho, úcta. Dva slova a číšník vás bude respektovat.', english: 'Order like a local. Survive the silent waiter stare.', spanish: 'Aprende a decir "ponme" antes que nada. El resto ya viene solo.' },
    context: {
      czech: 'Česká hospoda je obývací pokoj české společnosti. Číšník přijde, až bude chtít. Nemávejte, nevolte. Jeden zvednutý prst stačí. Bill nepřinesou — musíte si říct.',
      english: 'Czech pubs are living rooms of Czech society. The waiter comes when ready — one raised finger is enough. Bills don\'t arrive on their own. For Spanish bars: stand at the bar, say "ponme" not "quiero," and "venga" means everything from "sure" to "let\'s go."',
      spanish: 'El bar español es el corazón de la vida social. Te quedas en la barra, pides con "ponme" no con "quiero", y "venga" lo significa todo. Las tapas son gratis en Granada; en Madrid, las pagas.'
    },
    dialogue: [
      { speaker: { czech: 'Číšník', spanish: 'Paco (Barman)' }, role: 'ai', czech: 'Dobrý den! Co si dáte?', english: 'Hello! What will you have?', spanish: '¿Qué te pongo?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den. Jedno pivo, prosím.', english: 'Hello. One beer, please.', spanish: 'Ponme una caña, por favor.', note: { czech: 'Použijte „jedno" — pivo je středního rodu. „Jeden pivo" je klasická chyba cizince.', english: 'Use "jedno" — pivo is neuter gender. "Ponme" sounds far more natural than "Quiero" at a Spanish bar.', spanish: '"Ponme" suena mucho más natural que "Quiero" en un bar español.' } },
      { speaker: { czech: 'Číšník', spanish: 'Paco' }, role: 'ai', czech: 'Velké nebo malé?', english: 'Large or small?', spanish: '¿Y para picar algo?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Velké, prosím. A máte jídelní lístek?', english: 'Large, please. And do you have a menu?', spanish: '¿Qué tapas tenéis?', note: { czech: null, english: '"Tenéis" is Spain Spanish. In Latin America: "¿Qué tapas tienen?"', spanish: '"Tenéis" es español de España. En Latinoamérica: "¿Qué tapas tienen?"' } },
      { speaker: { czech: 'Číšník', spanish: 'Paco' }, role: 'ai', czech: 'Tady to máte. Dáte si jídlo?', english: 'Here you go. Will you have food?', spanish: 'Patatas bravas, croquetas de jamón, calamares...' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dám si svíčkovou, prosím.', english: 'I\'ll have the svíčková, please.', spanish: 'Unas patatas bravas y unas croquetas, venga.', note: { czech: '„Dám si" = dám si. Přirozenější než „chci" (I want), které zní tupě.', english: '"Dám si" is how real people order. "Venga" at the end of a Spanish order sounds immediately local.', spanish: '"Venga" al final de tu pedido suena increíblemente local.' } },
      { speaker: { czech: 'Číšník', spanish: 'Paco' }, role: 'ai', czech: 'Výborně! Ještě jedno pivo?', english: 'Excellent! Another beer?', spanish: '¡Marchando! ¿Otra caña?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Ještě jedno, prosím. Děkuji.', english: 'Another one, please. Thank you.', spanish: 'Sí, ponme otra. ¡Salud!' },
      { speaker: { czech: 'Číšník', spanish: 'Paco' }, role: 'ai', czech: 'Dobrou chuť!', english: 'Enjoy your meal!', spanish: '¡Salud! Aquí tienes.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Zaplatím, prosím.', english: 'I\'d like to pay, please.', spanish: '¿Me cobras? La cuenta, por favor.', note: { czech: 'Nečekejte — nepřinesou to. Musíte si říct „zaplatím".', english: 'Czech: don\'t wait — they won\'t bring it. Spanish: "¿Me cobras?" is far more natural than "la cuenta."', spanish: '"¿Me cobras?" es lo que dice todo el mundo. Mucho más natural que "la cuenta, por favor."' } }
    ],
    keyPhrases: [
      { czech: 'Jedno pivo, prosím.', english: 'One beer, please.', spanish: 'Ponme una caña, por favor.', pronunciation: { czech: 'YED-no PI-vo, PRO-seem', spanish: 'PON-meh OO-na KAH-nyah, por fa-VOR' } },
      { czech: 'Na zdraví!', english: 'Cheers!', spanish: '¡Salud!', pronunciation: { czech: 'NA ZDRA-vee', spanish: 'sa-LOOD' } },
      { czech: 'Dám si...', english: 'I\'ll have...', spanish: 'Ponme...', pronunciation: { czech: 'dahm si', spanish: 'PON-meh' } },
      { czech: 'Zaplatím, prosím.', english: 'I\'d like to pay.', spanish: '¿Me cobras?', pronunciation: { czech: 'ZAH-pla-teem, PRO-seem', spanish: 'meh KOH-bras' } },
      { czech: 'Ještě jedno.', english: 'Another one.', spanish: 'Ponme otra.', pronunciation: { czech: 'YESH-tyeh YED-no', spanish: 'PON-meh O-tra' } },
      { czech: 'Máte jídelní lístek?', english: 'Do you have a menu?', spanish: '¿Qué tapas tenéis?', pronunciation: { czech: 'MAH-teh YEE-del-nee LEES-tek', spanish: 'keh TA-pas teh-NEH-ees' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Nikdy na číšníka nemávejte', body: 'Zvedněte jeden prst — to stačí. Mávání nebo luskání prsty je hrubost a dostanete tu nejpomalejší obsluhu.' },
        { title: 'Systém účtu', body: 'Číšník dá na stůl papírový lístek a ke každé rundě přidá čárku. Nechte ho na viditelném místě.' },
        { title: 'Účet nepřijde sám', body: 'Číšník respektuje váš čas. Až budete hotovi, chyťte pohled a řekněte „Zaplatím, prosím." To je signál.' }
      ],
      spanish: [
        { title: '"Ponme" poráží "Quiero" vždy', body: 'Učebnice vás učí říkat "Quiero una cerveza". V španělském baru říkejte "Ponme una caña". Zní to místně okamžitě.' },
        { title: 'Tapas zdarma — vězte kde', body: 'V Granadě a Almería dostanete tapu zdarma k nápoji. V Madridu a Barceloně si je platíte. Neptat se — sledujte ostatní.' },
        { title: 'Stůjte u baru', body: 'V přeplněných španělských barech stání u baru = rychlejší obsluha a přirozenější konverzace s barmanem.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Rád bych si objednal jedno pivo, prosím." (10 slov, správně, zní jako robot.)', real: '"Jedno pivo." — Dvě slova. Co Češi říkají. Číšník vás bude respektovat.' },
        { textbook: '"Bylo by možné získat účet?" (Bylo by možné?)', real: '"Zaplatím." — Čistě. Přímo. Česky.' }
      ],
      spanish: [
        { textbook: '"Quisiera pedir una cerveza, por favor." (Chtěl bych si objednat pivo.)', real: '"Ponme una caña." — Pět slabik. Hotovo. Barman už sahá po kohoutku.' },
        { textbook: '"¿Me podría traer la cuenta, por favor?" (Mohl byste mi přinést účet?)', real: '"¿Me cobras?" — Dvě slova. Co všichni říkají. Vždy.' }
      ]
    }
  },

  // ── 2. MEETING THE IN-LAWS ───────────────────────────────────────
  {
    id: 'inlaws',
    icon: '👨‍👩‍👧',
    difficulty: 'intermediate',
    category: 'Social',
    title: { czech: 'U příbuzných', english: 'Meeting the In-Laws', spanish: 'Conociendo a la Familia' },
    subtitle: { czech: 'Nedělní oběd. Babička. Tatínek lije víno.', english: 'Sunday lunch. Grandma talks. Father pours wine.', spanish: 'Paella dominical. Abuela silenciosa. Señora García te sirve más.' },
    shortDesc: { czech: 'Maminka. Babička. Tatínek. Sestra má názory. Hodně štěstí.', english: 'Sunday lunch. Three courses. Her father watching you eat.', spanish: 'Paella dominical. Tres generaciones. Todo el mundo habla a la vez. Te la suda.' },
    context: {
      czech: 'Jste s partnerem/partnerkou dost dlouho, že rodina vás zná. Maminka kontroluje, jestli jste jedl/a. Babička na vás mluví bez ohledu na jazykovou bariéru — jen se usmívejte a požádejte ji, ať mluví pomaleji. Tatínek lije víno bez ptaní. Sestra sleduje a hodnotí (ale taje). Toto je nedělní oběd na těžké úrovni.',
      english: 'Czech: Maminka, Babička, Tatínek, Sestra — each with their own dynamic. Use vocative forms (Maminko, Babičko, Tatínku) to signal integration. Spanish: Sunday lunch at 2pm. Everyone talks over each other. Use "usted" with elders until invited to say "tú." Compliment the paella specifically.',
      spanish: 'La comida dominical española es un deporte de contacto. La familia habla encima, las abuelas te evalúan en silencio, y la paella lleva cocinándose desde las 10. Usa "usted" con los mayores. Alaba la paella. Come todo lo que te pongan.'
    },
    dialogue: [
      { speaker: { czech: 'Maminka', spanish: 'Señora García' }, role: 'ai', czech: 'Ty jseš tady! Pojď dál, pojď dál. Jedl jsi dnes?', english: 'You\'re here! Come in, come in. Have you eaten today?', spanish: '¡Hola, hola! ¡Pasa, pasa, qué alegría!' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den, Maminko. Jedl jsem, děkuji. Přinesl jsem červené víno.', english: 'Hello, Maminka. I\'ve eaten, thank you. I brought some red wine.', spanish: 'Buenas tardes, señora García. Encantado/a. Le traigo esto.', note: { czech: 'Použití „Maminko" (vokativ) místo „paní Nováková" signalizuje, že jste přijat do rodiny. Subtilní, ale velmi přeceňované.', english: 'Czech: using the vocative form "Maminko" signals family acceptance. Spanish: use "usted" with parents/elders until they invite you to "tú."', spanish: 'Usa "usted" con los padres hasta que te digan "tutéame". Cuesta nada y da muy buena impresión.' } },
      { speaker: { czech: 'Babička', spanish: 'Señora García' }, role: 'ai', czech: 'Ježišmarjá! Jak jsi vyrost! Sedni si, sedni si!', english: 'Oh my goodness! How you\'ve grown! Sit down, sit down!', spanish: '¡Ay, qué detalle! No tenías que traer nada. Pasa, pasa.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Promiňte, Babičko — nerozumím dobře. Můžete mluvit pomaleji?', english: 'Sorry, Grandma — I don\'t understand well. Can you speak more slowly?', spanish: 'Sí, señora. Es un placer conocerla. Me ha hablado mucho de usted.', note: { czech: '„Babičko" je vokativ od „Babička". Správné použití získává tiché uznání celé místnosti.', english: 'Czech: "Babičko" is the vocative of "Babička" — using it correctly earns quiet approval. Spanish: "Me ha hablado mucho de usted" — the mother will soften immediately.', spanish: '"Me ha hablado mucho de usted" — la madre se derrite al instante.' } },
      { speaker: { czech: 'Tatínek', spanish: 'Señor García' }, role: 'ai', czech: 'Dáš si sklenku? Máme burgundy z Moravy.', english: 'Will you have a glass? We have burgundy from Moravia.', spanish: '¡A la mesa, que se enfría la paella!' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Rád. Na zdraví, Tatínku!', english: 'Gladly. Cheers, Dad!', spanish: '¡Qué rico huele todo! Muchas gracias por invitarme.', note: { czech: 'Použití „Tatínku" (vokativ) místo jeho křestního jména signalizuje skutečnou rodinnou integraci. Nalijí vám větší sklenku.', english: 'Czech: "Tatínku" (vocative) signals real family integration. Spanish: complimenting the smell of the food earns you 15 minutes of her explaining the recipe.', spanish: 'Alaba el olor de la comida. La señora te explicará la receta entera. Tiempo de escucha garantizado.' } },
      { speaker: { czech: 'Sestra', spanish: 'Señora García' }, role: 'ai', czech: 'Takže — česky tě naučila, nebo se učíš sám?', english: 'So — did she teach you Czech, or are you learning yourself?', spanish: '¡Venga, come, come! ¿Te sirvo más?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Snažím se sám. Chodím na kurz, ale moc toho ještě neumím.', english: 'I\'m trying on my own. I go to a class, but I still don\'t know much.', spanish: '¡Está buenísimo! ¿Me podría dar la receta?', note: { czech: 'Upřímnost o vaší úrovni funguje lépe než přehnaná sebedůvěra. Sestra vás testuje. Skromnost projde.', english: 'Czech: honesty about your level lands better than overconfidence. Spanish: "Buenísimo" (absolutely delicious) — the superlative. Use it. The señora will beam.', spanish: '"Buenísimo" — el superlativo. Úsalo. La señora resplandecerá.' } },
      { speaker: { czech: 'Maminka', spanish: 'Señora García' }, role: 'ai', czech: 'Polévka je hotová! Všichni ke stolu. Hned!', english: 'Soup is ready! Everyone to the table. Now!', spanish: '¿Te sirvo más paella? Hay para todos.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Maminko, ta vůně je úžasná. Co vaříte?', english: 'Maminka, that smell is amazing. What are you cooking?', spanish: 'Estoy lleno/a, de verdad, está riquísimo. Gracias por todo.', note: { czech: 'Ptát se co vaří je zlatý klíč. Vysvětlí každou ingredienci. Koupíte si 15 minut vynikající poslechové praxe.', english: 'Czech: asking "Co vaříte?" gives Maminka 15 minutes of talking time. Spanish: always praise before refusing more food — "Estoy lleno/a, de verdad, está riquísimo."', spanish: 'Siempre alaba antes de rechazar más comida. "De verdad, está riquísimo" suaviza cualquier negativa.' } }
    ],
    keyPhrases: [
      { czech: 'Nerozumím dobře. Pomaleji, prosím.', english: 'I don\'t understand well. Slower, please.', spanish: 'No entiendo bien. Más despacio, por favor.', pronunciation: { czech: 'neh-ROH-zu-meem DOH-bzheh. po-ma-LEY-ee PRO-seem', spanish: 'no en-TYEN-do BYEN. mas des-PA-syo, por fa-VOR' } },
      { czech: 'Je to výborné!', english: 'This is excellent/delicious!', spanish: '¡Está buenísimo!', pronunciation: { czech: 'yeh to VEE-bor-neh', spanish: 'es-TA bweh-NEE-si-mo' } },
      { czech: 'Ta vůně je úžasná.', english: 'That smell is amazing.', spanish: '¡Qué rico huele todo!', pronunciation: { czech: 'ta VOO-nyeh yeh OO-zhas-nah', spanish: 'keh REE-ko WEH-leh TO-do' } },
      { czech: 'Na zdraví!', english: 'Cheers!', spanish: '¡Salud!', pronunciation: { czech: 'NA ZDRA-vee', spanish: 'sa-LOOD' } },
      { czech: 'Snažím se sám.', english: 'I\'m trying on my own.', spanish: 'Lo intento solo/a.', pronunciation: { czech: 'SNA-zheem seh sahm', spanish: 'lo in-TEN-to SO-lo' } },
      { czech: 'Maminko / Babičko / Tatínku', english: 'Maminka / Grandma / Dad (vocative — how you address them directly)', spanish: 'Señora / Abuela / Señor (+ usted until invited to tú)', pronunciation: { czech: 'MA-min-ko / BA-bich-ko / ta-TEEN-ku', spanish: 'seh-NYO-ra / a-BWEH-la / seh-NYOR' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Vokativy jsou tajné heslo', body: '„Babičko," „Maminko," „Tatínku" — tyto vokativní tvary signalizují, že jste se integrovali nad turistickou úroveň češtiny. Každý člen rodiny si toho všimne.' },
        { title: 'Babička bude mluvit naplno, navždy', body: '„Promiňte, nerozumím. Pomaleji, prosím?" je váš štít. Zpomalí přesně na jednu větu, pak se vrátí na plnou rychlost. Usmívejte se. Stejně vás miluje.' },
        { title: 'Tatínek lije, vy přijímáte', body: 'Odmítnutí prvního vína od Tatínka je drobné sociální zakopnutí — pokud nemáte skutečný důvod. Přijměte, řekněte „Na zdraví" a zajistíte si místo.' }
      ],
      spanish: [
        { title: 'Používejte „usted" dokud neřeknou jinak', body: 'S rodiči a prarodiči formální „usted" + sloveso ve třetí osobě, dokud neřeknou „tutéame". Nestojí to nic a dělá výborný dojem.' },
        { title: 'Španělský oběd začíná ve 14:00, ne ve 12:00', body: 'Pokud řeknou „přijďte na oběd", myslí 14:00. Příchod v poledne by všechny opravdu zmátl.' },
        { title: 'Pohvalte paellu konkrétně', body: 'Ptejte se na paellu. Na to, jak ji dělá. Jaký druh rýže. Señora má názory, metodu a pravděpodobně tajnou ingredienci. Řekne vám vše.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Paní Nováková, vaše jídlo je velmi chutné." (Mrs. Nováková, your food is very tasty.)', real: '"Maminko, ta vůně je úžasná!" — Vokativ + emocionální reakce. Takto mluví přijatí členové rodiny.' },
        { textbook: '"Nerozumím vám, mluvíte příliš rychle." (I don\'t understand you, you speak too fast.)', real: '"Promiňte, Babičko — pomaleji?" — Kratší, teplejší, s vokativem. Bude vás za to milovat.' }
      ],
      spanish: [
        { textbook: '"La comida está muy sabrosa." (Jídlo je velmi chutné.) — správně, ale ploché', real: '"¡Está buenísimo!" nebo "¡Qué rico está!" — emocionální, nadšené. Odpovídejte energii rodiny.' },
        { textbook: '"Estoy lleno." (Jsem sytý.) — gramaticky správně', real: '"Estoy lleno/a, de verdad, está riquísimo." — Nejdřív pochvalte, pak odmítněte. Vždy.' }
      ]
    }
  },

  // ── 3. PADEL GAME ────────────────────────────────────────────────
  {
    id: 'padel',
    icon: '🎾',
    difficulty: 'beginner',
    category: 'Sport',
    title: { czech: 'Padelový zápas', english: 'Padel Game', spanish: 'Partido de Pádel' },
    subtitle: { czech: 'Před hrou, během hry, po hře', english: 'Before, during, and after the game', spanish: 'Antes, durante y después del partido' },
    shortDesc: { czech: 'Krátké, energické fráze pro kurty v ČR i Španělsku.', english: 'Short, energetic phrases for padel courts anywhere.', spanish: 'Frases cortas y enérgicas para pistas de pádel en cualquier lugar.' },
    context: {
      czech: 'Padel v České republice exploduje. Kurty jsou všude. Budete potřebovat koordinovat partnery, volat skóre a slavit výhry — to vše v rychlých, energetických záblescích. Žádný čas na plné věty. Krátce a ostře.',
      english: 'Padel is exploding worldwide. Courts everywhere — Prague, Madrid, Barcelona. The language of padel is short, punchy, energetic. You\'re celebrating, calling score, encouraging your partner. Full sentences are for post-game drinks.',
      spanish: 'El pádel es el deporte de moda en España. Pistas en todas partes. El lenguaje es corto, enérgico y emocional. Se celebra, se anima al compañero, se llama el marcador. Las frases largas son para las cañas de después.'
    },
    dialogue: [
      { speaker: { czech: 'Partner', spanish: 'Compañero/a' }, role: 'ai', czech: 'Připravený? Začínáme!', english: 'Ready? Let\'s start!', spanish: '¿Listo/a? ¡Empezamos!' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Jdeme na to!', english: 'Let\'s go!', spanish: '¡Vamos!', note: { czech: 'Klasické energetické zahájení — funguje v češtině i španělštině.', english: 'Works in both Czech and Spanish — the universal "let\'s go" of padel.', spanish: 'El grito de guerra universal del pádel.' } },
      { speaker: { czech: 'Partner', spanish: 'Compañero/a' }, role: 'ai', czech: 'Tvůj servis.', english: 'Your serve.', spanish: 'Tu saque.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Připravený!', english: 'Ready!', spanish: '¡Listo!' },
      { speaker: { czech: 'Partner', spanish: 'Compañero/a' }, role: 'ai', czech: 'Dobrý míč!', english: 'Good shot!', spanish: '¡Buena bola!' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Díky! Ještě jednou.', english: 'Thanks! One more time.', spanish: '¡Gracias! Otra vez.' },
      { speaker: { czech: 'Partner', spanish: 'Compañero/a' }, role: 'ai', czech: 'Výborně! Skóre je 30-15.', english: 'Excellent! Score is 30-15.', spanish: '¡Excelente! El marcador es 30-15.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Super! Pojďme dál.', english: 'Great! Let\'s keep going.', spanish: '¡Genial! Sigamos.' },
      { speaker: { czech: 'Partner', spanish: 'Compañero/a' }, role: 'ai', czech: 'Konec setu. Dáme si pauzu?', english: 'End of set. Shall we take a break?', spanish: 'Fin del set. ¿Hacemos una pausa?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Jo, trochu vody. Šlo ti to skvěle!', english: 'Yes, some water. You played great!', spanish: 'Sí, un poco de agua. ¡Jugaste genial!', note: { czech: 'Vždy pochvalte svého partnera — je to dobrá sportovní kultura v jakémkoli jazyce.', english: 'Always compliment your partner — it\'s good sportsmanship in any language.', spanish: 'Anima siempre a tu compañero/a — es buena deportividad en cualquier idioma.' } }
    ],
    keyPhrases: [
      { czech: 'Jdeme na to!', english: 'Let\'s go!', spanish: '¡Vamos!', pronunciation: { czech: 'YDEH-meh na to', spanish: 'BA-mos' } },
      { czech: 'Dobrý míč!', english: 'Good shot!', spanish: '¡Buena bola!', pronunciation: { czech: 'DOH-bree meech', spanish: 'BWEH-na BO-la' } },
      { czech: 'Tvůj servis.', english: 'Your serve.', spanish: 'Tu saque.', pronunciation: { czech: 'tvooy SER-vis', spanish: 'too SA-keh' } },
      { czech: 'Výborně!', english: 'Excellent!', spanish: '¡Excelente!', pronunciation: { czech: 'VEE-bor-nyeh', spanish: 'ex-seh-LEN-teh' } },
      { czech: 'Pojďme dál.', english: 'Let\'s keep going.', spanish: 'Sigamos.', pronunciation: { czech: 'POY-dyeh-meh dahl', spanish: 'si-GA-mos' } },
      { czech: 'Šlo ti to skvěle!', english: 'You played great!', spanish: '¡Jugaste genial!', pronunciation: { czech: 'shlo ti to SKVYE-leh', spanish: 'khoo-GAS-teh kheh-NYAL' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Čeští hráči jsou tiší ale intenzivní', body: 'Česká padelová kultura je soustředěná. Krátká zvolání jsou v pořádku — dlouhé konverzace uprostřed hry jsou neobvyklé. Ušetřete si řeč na přestávky.' },
        { title: 'Skóre je jednoduché', body: 'Používejte čísla: „30-15", „Shoda" (Deuce), „Výhoda". Každý zná mezinárodní systém skórování.' },
        { title: 'Pochvalte hru po skončení, ne během', body: '„Šlo ti to skvěle!" po zápase je vždy oceněno. Čeští hráči jsou skromní — odrazí to, ale zapamatují si, že jste to řekli.' }
      ],
      spanish: [
        { title: 'El pádel es el deporte social de España', body: 'En España el pádel es más que deporte — es excusa social. La caña después del partido es obligatoria. Aprende a proponer: "¿Unas cañas después?"' },
        { title: 'Animar es clave', body: '"¡Venga!", "¡Vamos!", "¡Buena!" — el lenguaje del pádel español es vocal y entusiasta. No te quedes callado/a.' },
        { title: 'El marcador se llama en español', body: '"Quince-treinta", "Cuarenta-quince", "Deuce" (también se usa en inglés), "Ventaja". No hay que traducirlo — es universal.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Zahrál jsi velmi dobře." (Zahráls velmi dobře.) — plná věta', real: '"Šlo ti to skvěle!" — energické, teplé, přirozené ve sportovním kontextu.' },
        { textbook: '"Jsem připraven k servírování." (Jsem připraven podávat.)', real: '"Připravený!" — jedno slovo, nikdo na padlovém kurtu neříká plnou větu.' }
      ],
      spanish: [
        { textbook: '"Has jugado muy bien." (Hráls velmi dobře.)', real: '"¡Jugaste genial!" — más dinámico, más natural en el contexto del deporte.' },
        { textbook: '"Estoy preparado para sacar." (Jsem připraven podávat.)', real: '"¡Listo!" — una palabra. En el pádel no hay tiempo para más.' }
      ]
    }
  },

  // ── 4. FLAT HUNTING ──────────────────────────────────────────────
  {
    id: 'flat',
    icon: '🏠',
    difficulty: 'intermediate',
    category: 'Practical',
    title: { czech: 'Prohlídka bytu', english: 'Flat Hunting', spanish: 'Buscando Piso' },
    subtitle: { czech: '"Útulný" znamená 28m². Ptejte se správně.', english: '"Cosy" means 28m². Ask the right questions.', spanish: '"Acogedor" significa 28m². Pregunta antes de firmar.' },
    shortDesc: { czech: 'Nájem, kauce, účty, zvířata. Nikdy nepodepisujte bez pochopení.', english: 'Rent, deposit, bills, pets. Never sign without understanding everything.', spanish: 'Alquiler, fianza, suministros, mascotas. Nunca firmes sin entenderlo todo.' },
    context: {
      czech: 'Pražský trh s nájmy se hýbe rychle. Pronajímatelé vědí, že cizinci obvykle neprosazují své zájmy. Znalost otázek o nájmu, kauci, účtech a dostupnosti v češtině vám okamžitě získá respekt — a může ušetřit tisíce korun.',
      english: 'Prague market moves fast — landlords know expats don\'t push back. Speaking Czech signals you\'re serious. Spain: apartments are called "pisos," rent is "alquiler," deposit is "fianza." Both markets: never sign on the spot, always ask for 24 hours.',
      spanish: 'El mercado del alquiler en España es competitivo. Los pisos buenos se van en horas. Los términos clave: alquiler, fianza (generalmente 1-2 meses), suministros incluidos o no. Nunca firmes en el acto — pide 24 horas para pensarlo.'
    },
    dialogue: [
      { speaker: { czech: 'Majitelka', spanish: 'Propietaria' }, role: 'ai', czech: 'Dobrý den! Pojďte dál, ukáži vám byt.', english: 'Hello! Come in, I\'ll show you the apartment.', spanish: '¡Hola! Pase, le enseño el piso.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den. Děkuji. Je byt ještě volný?', english: 'Hello. Thank you. Is the apartment still available?', spanish: 'Hola. Gracias. ¿Sigue libre el piso?' },
      { speaker: { czech: 'Majitelka', spanish: 'Propietaria' }, role: 'ai', czech: 'Ano, volný od prvního příštího měsíce.', english: 'Yes, available from the first of next month.', spanish: 'Sí, libre desde el primero del mes que viene.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Kolik je měsíční nájem? A jsou účty v ceně?', english: 'How much is the monthly rent? And are bills included?', spanish: '¿Cuánto es el alquiler mensual? ¿Están incluidos los suministros?', note: { czech: 'Vždy se ptejte „jsou účty v ceně?" Účty jsou obvykle zvlášť — mohou přidat 3 000–5 000 Kč/měsíc.', english: 'Always ask about bills — they\'re rarely included. Czech: "jsou účty v ceně?", Spanish: "¿están incluidos los suministros?"', spanish: 'Los suministros raramente están incluidos. Pregunta siempre. Pueden añadir 100-200€/mes.' } },
      { speaker: { czech: 'Majitelka', spanish: 'Propietaria' }, role: 'ai', czech: 'Nájem je 18 000 korun. Účty jsou zvlášť — asi 3 000 měsíčně.', english: 'Rent is 18,000 crowns. Bills are separate — about 3,000 monthly.', spanish: 'El alquiler son 900 euros. Los suministros van aparte — unos 100 al mes.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Jaká je kauce? A je povoleno mít domácí zvíře?', english: 'How much is the deposit? And are pets allowed?', spanish: '¿Cuánto es la fianza? ¿Se permiten mascotas?' },
      { speaker: { czech: 'Majitelka', spanish: 'Propietaria' }, role: 'ai', czech: 'Kauce jsou dva měsíční nájmy. Zvířata jsou v pořádku, jen menší.', english: 'Deposit is two months\' rent. Pets are fine, just smaller ones.', spanish: 'La fianza es de dos meses. Las mascotas están bien, solo pequeñas.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Je v bytě internet? A jak je to s parkováním?', english: 'Is there internet in the apartment? And what about parking?', spanish: '¿Hay internet en el piso? ¿Y qué hay con el aparcamiento?' },
      { speaker: { czech: 'Majitelka', spanish: 'Propietaria' }, role: 'ai', czech: 'Internet je připravený. Parkování je na ulici, zdarma.', english: 'Internet is ready. Parking is on the street, free.', spanish: 'El internet está listo. Aparcamiento en la calle, gratis.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Mohu si vzít čas na rozmyšlenou do zítřka?', english: 'Can I have until tomorrow to think about it?', spanish: '¿Puedo pensármelo hasta mañana?', note: { czech: 'Nikdy nepodepisujte na místě. Seriózní pronajímatel vám dá 24 hodin. Pokud ne, je to varovný signál.', english: 'Never sign on the spot. Czech or Spanish — a reputable landlord always gives 24 hours. If they won\'t, walk away.', spanish: 'Nunca firmes en el acto. Un propietario serio siempre da 24 horas. Si no, es señal de alarma.' } }
    ],
    keyPhrases: [
      { czech: 'Kolik je měsíční nájem?', english: 'How much is the monthly rent?', spanish: '¿Cuánto es el alquiler mensual?', pronunciation: { czech: 'KO-lik yeh myeh-SEECH-nee NAH-yem', spanish: 'KWAN-to es el al-KI-ler men-SWAL' } },
      { czech: 'Jsou účty v ceně?', english: 'Are bills included?', spanish: '¿Están incluidos los suministros?', pronunciation: { czech: 'ysow OOTCH-ty fts-EH-nyeh', spanish: 'es-TAN in-klwee-DOS los soo-mi-NIS-tros' } },
      { czech: 'Jaká je kauce?', english: 'How much is the deposit?', spanish: '¿Cuánto es la fianza?', pronunciation: { czech: 'YA-kah yeh KAW-tse', spanish: 'KWAN-to es la FYAN-sa' } },
      { czech: 'Je povoleno mít domácí zvíře?', english: 'Are pets allowed?', spanish: '¿Se permiten mascotas?', pronunciation: { czech: 'yeh po-VO-leh-no meet DO-mah-tsee ZVEE-zheh', spanish: 'seh per-MI-ten mas-KO-tas' } },
      { czech: 'Kdy je byt volný?', english: 'When is the apartment available?', spanish: '¿Cuándo está disponible el piso?', pronunciation: { czech: 'gdy yeh bit VOL-nee', spanish: 'KWAN-do es-TA dis-po-NI-bleh el PI-so' } },
      { czech: 'Mohu si vzít čas na rozmyšlenou?', english: 'Can I have time to think about it?', spanish: '¿Puedo pensármelo?', pronunciation: { czech: 'MO-hoo si vzyeet chas na roz-MISH-leh-now', spanish: 'PWEH-do pen-SAR-meh-lo' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Účty téměř nikdy nejsou zahrnuty', body: '„Účty v ceně" je vzácné. Vždy se ptejte explicitně. Plyn, elektřina, voda a poplatky za správu budovy se sčítají. Získejte odhad písemně.' },
        { title: 'Kauce je obvykle 2–3 měsíce', body: 'Standardní česká praxe je kauce 1–3 měsíce nájmu. Cokoli nad 3 měsíce je neobvyklé — odmítněte nebo odejděte.' },
        { title: 'Vše písemně', body: 'Nájemní smlouva by měla specifikovat: výši nájmu, kauci, výpovědní lhůtu, co se děje s účty a politiku zvířat. Nikdy se nespoléhejte na ústní dohody.' }
      ],
      spanish: [
        { title: 'Fianza: obvykle 1–2 měsíce', body: 'Španělský zákon limituje fianza na 1 měsíc pro nájmy bytu. V praxi majitelé žádají 1–2 měsíce. Více je podezřelé.' },
        { title: 'Empadronamiento — registrace adresy', body: 'Po nastěhování se zaregistrujte na místní Ayuntamiento (radnici). Padrón (registrace v místě bydliště) je klíčový pro přístup k mnoha službám.' },
        { title: 'Trh se hýbe rychle', body: 'Dobré pisos v Barceloně nebo Madridu zmizí za hodiny. Přijďte připravení: potvrzení o příjmu, číslo NIE a doklady totožnosti.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Chtěl bych si pronajmout tento byt." (Chtěl bych si pronajmout tento byt.) — formální, strnulé', real: '"Mám zájem o byt." — Mám zájem o byt. Přirozené, přímé, jde rovnou k věci.' },
        { textbook: '"Je možné dostat nějaký čas na přemýšlení?"', real: '"Mohu si vzít čas do zítřka?" — Přímo a zdvořile.' }
      ],
      spanish: [
        { textbook: '"Me gustaría alquilar este piso." (Chtěl bych si pronajmout tento byt.) — příliš formální', real: '"Me interesa el piso." — Zajímám se o byt. Přirozené a přímé.' },
        { textbook: '"¿Sería posible tener tiempo para pensarlo?" (Bylo by možné mít čas na rozmyšlenou?)', real: '"¿Puedo pensármelo hasta mañana?" — Přímé a zdvořilé.' }
      ]
    }
  },

  // ── 5. DOCTOR VISIT ──────────────────────────────────────────────
  {
    id: 'doctor',
    icon: '🏥',
    difficulty: 'intermediate',
    category: 'Practical',
    title: { czech: 'U lékaře', english: 'Doctor Visit', spanish: 'En el Médico' },
    subtitle: { czech: 'Řekněte co vás bolí. Pochopte recept. Nepanikařte.', english: 'Say what hurts. Understand the prescription. Don\'t panic.', spanish: 'Di qué te duele. Entiende la receta. No te agobies.' },
    shortDesc: { czech: 'Doktor vás uvidí. Máte přesně 10 minut.', english: 'The doctor will see you now. You have exactly 10 minutes.', spanish: 'El médico le atiende ahora. Tiene exactamente 10 minutos.' },
    context: {
      czech: 'České zdravotnictví je solidní a dostupné s EU kartou nebo českou pojišťovnou. Nalezení anglicky mluvícího doktora je možné v Praze, jinde obtížnější. Praktický lékař vyžaduje registraci — nemůžete jen přijít. Pro naléhavé případy: nemocnice nebo pohotovost.',
      english: 'Czech system: register with a GP (praktický lékař) before you get sick — you can\'t just walk in. Emergency: pohotovost or 155. Spanish system: with tarjeta sanitaria you can see a médico de cabecera. For emergencies: urgencias or 112.',
      spanish: 'Con la tarjeta sanitaria europea o española puedes ver al médico de cabecera (médico de familia). Para urgencias no graves: centro de salud o urgencias. Para emergencias: 112. Los médicos tienen agenda — llega puntual.'
    },
    dialogue: [
      { speaker: { czech: 'Doktor', spanish: 'Médico/a' }, role: 'ai', czech: 'Dobrý den. Co vás trápí?', english: 'Hello. What\'s bothering you?', spanish: 'Buenos días. ¿Qué le ocurre?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den. Bolí mě hlava a mám horečku.', english: 'Hello. I have a headache and a fever.', spanish: 'Buenos días. Me duele la cabeza y tengo fiebre.' },
      { speaker: { czech: 'Doktor', spanish: 'Médico/a' }, role: 'ai', czech: 'Jak dlouho to máte? Jak silná je bolest?', english: 'How long have you had this? How strong is the pain?', spanish: '¿Desde cuándo le pasa? ¿Cómo de fuerte es el dolor?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Od včera. Bolest je silná — asi sedm z deseti.', english: 'Since yesterday. The pain is strong — about seven out of ten.', spanish: 'Desde ayer. El dolor es fuerte — como un siete sobre diez.', note: { czech: 'Stupnice 1–10 je univerzální. Použijte ji — je rychlejší a jasnější než popis slovy.', english: 'The 1–10 pain scale is universal. Use it in any language — faster and clearer than descriptions.', spanish: 'La escala del 1 al 10 es universal. Úsala — es más rápida y clara que describir con palabras.' } },
      { speaker: { czech: 'Doktor', spanish: 'Médico/a' }, role: 'ai', czech: 'Máte alergii na nějaké léky?', english: 'Are you allergic to any medications?', spanish: '¿Es alérgico/a a algún medicamento?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Ano, jsem alergický/á na penicilin.', english: 'Yes, I\'m allergic to penicillin.', spanish: 'Sí, soy alérgico/a a la penicilina.', note: { czech: 'To je kritické. Napište si to česky a noste u sebe, pokud máte jakoukoli alergii.', english: 'Critical information. Write it in the local language and carry it with you always.', spanish: 'Información crítica. Escríbela en español y llévala siempre encima.' } },
      { speaker: { czech: 'Doktor', spanish: 'Médico/a' }, role: 'ai', czech: 'Předepíšu vám antibiotika. Berte třikrát denně po jídle.', english: 'I\'ll prescribe antibiotics. Take them three times a day after meals.', spanish: 'Le recetaré antibióticos. Tómelos tres veces al día después de comer.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Promiňte — mohl/a byste to prosím napsat? Nechci špatně pochopit dávkování.', english: 'Excuse me — could you please write that down? I don\'t want to misunderstand the dosage.', spanish: 'Perdone — ¿podría anotarlo, por favor? No quiero malentender la dosis.', note: { czech: '„Můžete to napsat?" je vaše nejmocnější fráze v jakémkoli českém oficiálním kontextu.', english: '"Can you write that down?" is your most powerful phrase in any official context — Czech or Spanish.', spanish: '"¿Podría anotarlo?" es tu frase más poderosa en cualquier contexto oficial.' } }
    ],
    keyPhrases: [
      { czech: 'Bolí mě...', english: 'My ... hurts / I have pain in...', spanish: 'Me duele...', pronunciation: { czech: 'BO-lee myeh', spanish: 'meh DWEH-leh' } },
      { czech: 'Mám horečku.', english: 'I have a fever.', spanish: 'Tengo fiebre.', pronunciation: { czech: 'mahm HO-rech-ku', spanish: 'TEN-go FYEH-breh' } },
      { czech: 'Jsem alergický/á na...', english: 'I\'m allergic to...', spanish: 'Soy alérgico/a a...', pronunciation: { czech: 'ysem a-LER-gits-kee na', spanish: 'soy a-LER-khi-ko a' } },
      { czech: 'Jak mám brát léky?', english: 'How should I take the medicine?', spanish: '¿Cómo debo tomar la medicación?', pronunciation: { czech: 'yak mahm braht LEH-kee', spanish: 'KO-mo DEH-bo to-MAR la meh-di-ka-SYON' } },
      { czech: 'Můžete to napsat?', english: 'Can you write that down?', spanish: '¿Puede anotarlo?', pronunciation: { czech: 'MOO-zheh-teh to NAP-sat', spanish: 'PWEH-deh a-no-TAR-lo' } },
      { czech: 'Potřebuji recept.', english: 'I need a prescription.', spanish: 'Necesito una receta.', pronunciation: { czech: 'po-TZHEH-bu-yi RE-tsept', spanish: 'neh-seh-SI-to OO-na reh-SEH-ta' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Zaregistrujte se u praktického lékaře, než onemocníte', body: 'Český systém vyžaduje registraci u praktického lékaře, než onemocníte. Nemůžete jen přijít, když ho potřebujete. Najděte si ho ve svém obvodu, zaregistrujte se zdraví.' },
        { title: 'Zdravotní pojištění je povinné', body: 'Všichni čeští rezidenti musí mít zdravotní pojištění — buď EU kartičku (krátké pobyty), české veřejné pojištění (VZP atd.) nebo soukromé.' },
        { title: 'Lékárna (lékárna) je vaším prvním přítelem', body: 'Čeští lékárníci jsou vysoce vyškolení a jsou často první linií pomoci při drobných zdravotních problémech. Popište příznaky a doporučí volně prodejné možnosti.' }
      ],
      spanish: [
        { title: 'Tarjeta sanitaria — váš klíč ke španělskému zdravotnictví', body: 'S tarjeta sanitaria (zdravotní kartičkou) máte přístup k bezplatnému veřejnému zdravotnictví. Získejte ji v centru de salud co nejdříve po příjezdu.' },
        { title: 'Urgencias vs. Emergencias', body: 'Pro naléhavé, ale neživotohrožující problémy: urgencias v centru de salud nebo nemocnici. Pro život ohrožující: 112. Nechodte na emergencias pro maličkosti — čeká vás dlouhá čekací doba.' },
        { title: 'Lékaři mají pevný rozvrh', body: 'Španělský systém funguje přes cita previa (objednaný termín). Přijďte včas. Pozdní příchod může znamenat ztrátu termínu.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Mám bolesti v oblasti hlavy." (Mám bolesti v oblasti hlavy.) — formální, nemocniční jazyk', real: '"Bolí mě hlava." — Prostě, přímo, přesně to, co čeká doktor.' },
        { textbook: '"Mohl byste mi vysvětlit vedlejší účinky léku?" (Příliš formální)', real: '"Co mohou být vedlejší účinky?" nebo jednoduše „Má to nějaké vedlejší účinky?" — přirozenější.' }
      ],
      spanish: [
        { textbook: '"Me encuentro indispuesto." (Cítím se nezdravý.) — příliš formální, archaické', real: '"Me encuentro mal" nebo "no me encuentro bien." — přirozené a přímé.' },
        { textbook: '"¿Podría repetir las instrucciones de la medicación?" (Příliš dlouhé)', real: '"¿Me lo anota?" — Může mi to napsat? Jednoduché a efektivní.' }
      ]
    }
  },

  // ── 6. JOB INTERVIEW ─────────────────────────────────────────────
  {
    id: 'interview',
    icon: '💼',
    difficulty: 'advanced',
    category: 'Work',
    title: { czech: 'Pracovní pohovor', english: 'Job Interview', spanish: 'Entrevista de Trabajo' },
    subtitle: { czech: 'Nepřeprodávejte se. Ukažte, že tu chcete zůstat.', english: 'Don\'t oversell. Show you\'re serious about staying.', spanish: 'No te vendas demasiado. Demuestra que quieres quedarte.' },
    shortDesc: { czech: 'Čeští zaměstnavatelé ocení stabilitu a obsah nad prezentaci.', english: 'Czech companies value stability and substance over presentation.', spanish: 'Las empresas españolas valoran el trabajo en equipo y la actitud positiva.' },
    context: {
      czech: 'Česká HR kultura je rezervovaná a přímá. Nehledají americký styl nadšení — hodnotí, jestli jste spolehliví, kompetentní a skutečně plánujete zůstat. Mluvit i základní češtinou signalizuje seriózní závazek.',
      english: 'Czech interviews: reserved, direct, substance over enthusiasm. Saying you\'re learning Czech is almost always the right answer. Spanish interviews: warm, relational, team-fit matters. Start with "encantado/a" and show genuine interest in the company culture.',
      spanish: 'Las entrevistas españolas son más relacionales que las centroeuropeas. Importa el fit cultural y el trabajo en equipo. Se valora el entusiasmo auténtico (no americano). Llega puntual, viste formalmente y menciona que te gusta el ambiente de la empresa.'
    },
    dialogue: [
      { speaker: { czech: 'Personalista', spanish: 'Responsable de RRHH' }, role: 'ai', czech: 'Dobrý den. Jsem rád/a, že jste přišel/la. Sedněte si, prosím.', english: 'Hello. I\'m glad you came. Please have a seat.', spanish: 'Buenos días. Me alegra que haya venido. Siéntese, por favor.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den. Děkuji za pozvání. Těší mě.', english: 'Hello. Thank you for the invitation. Pleased to meet you.', spanish: 'Buenos días. Muchas gracias por la invitación. Encantado/a.' },
      { speaker: { czech: 'Personalista', spanish: 'Responsable de RRHH' }, role: 'ai', czech: 'Řekněte mi o sobě. Co vás přivedlo sem?', english: 'Tell me about yourself. What brought you here?', spanish: 'Cuénteme sobre usted. ¿Qué le trajo aquí?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Pracuji v oboru IT pět let. Přišel jsem sem pro příležitosti a chci zůstat dlouhodobě.', english: 'I\'ve worked in IT for five years. I came here for the opportunities and plan to stay long-term.', spanish: 'Llevo cinco años en el sector IT. Vine aquí por las oportunidades y quiero quedarme a largo plazo.', note: { czech: 'Čeští zaměstnavatelé jsou opatrní ohledně cizinců, kteří odejdou po 6 měsících. Jasně zdůrazněte záměr zůstat.', english: 'Both Czech and Spanish employers want to know you\'re staying. Say it clearly and specifically.', spanish: 'Los empleadores españoles también quieren saber que te quedas. Dilo claramente y con convicción.' } },
      { speaker: { czech: 'Personalista', spanish: 'Responsable de RRHH' }, role: 'ai', czech: 'Mluvíte místním jazykem? Je to pro vás priorita?', english: 'Do you speak the local language? Is that a priority for you?', spanish: '¿Habla español? ¿Es importante para usted?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Ještě se učím, ale je to pro mě priorita. Chci pracovat v českém prostředí.', english: 'I\'m still learning, but it\'s a priority for me. I want to work in the local environment.', spanish: 'Todavía aprendo, pero es una prioridad. Quiero integrarme en el entorno local.', note: { czech: 'Tato odpověď je téměř vždy ta správná. Respektují záměr ještě více než aktuální úroveň.', english: 'This is almost always the right answer. The intention matters more than the current level.', spanish: 'Esta respuesta casi siempre es la correcta. La intención vale más que el nivel actual.' } },
      { speaker: { czech: 'Personalista', spanish: 'Responsable de RRHH' }, role: 'ai', czech: 'Jaké jsou vaše silné stránky?', english: 'What are your strengths?', spanish: '¿Cuáles son sus puntos fuertes?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Jsem spolehlivý, pracuji systematicky a umím pracovat v týmu. Konkrétní výsledky mohu doložit.', english: 'I\'m reliable, I work systematically, and I work well in a team. I can demonstrate specific results.', spanish: 'Soy fiable, trabajo de forma sistemática y me adapto bien al trabajo en equipo. Tengo resultados concretos que puedo demostrar.', note: { czech: 'Česká kultura oceňuje skromnost. Přeháněné sebepropagování zvedá obočí. Říkejte co jste udělali konkrétně.', english: 'Czech: understate, then deliver. Spanish: show enthusiasm for team fit — it matters here.', spanish: 'En España el trabajo en equipo y el buen ambiente importan mucho. Menciona tu capacidad de adaptación.' } }
    ],
    keyPhrases: [
      { czech: 'Děkuji za pozvání.', english: 'Thank you for the invitation.', spanish: 'Gracias por la invitación.', pronunciation: { czech: 'DYEH-ku-yi za poz-VAH-nee', spanish: 'GRA-syas por la in-vi-ta-SYON' } },
      { czech: 'Pracuji v oboru... X let.', english: 'I\'ve worked in the field of... for X years.', spanish: 'Llevo X años en el sector de...', pronunciation: { czech: 'PRA-tsu-yi vob-ORU... X let', spanish: 'YEH-vo X a-NYOS en el sek-TOR deh' } },
      { czech: 'Chci zůstat dlouhodobě.', english: 'I plan to stay long-term.', spanish: 'Quiero quedarme a largo plazo.', pronunciation: { czech: 'khtsee ZOO-stat DLOW-ho-doh-byeh', spanish: 'KYEH-ro keh-DAR-meh a LAR-go PLA-so' } },
      { czech: 'Ještě se učím místní jazyk.', english: 'I\'m still learning the local language.', spanish: 'Todavía estoy aprendiendo el idioma local.', pronunciation: { czech: 'YESH-tyeh seh OO-cheem MEES-tnee YA-zik', spanish: 'to-da-VEE-a es-TOY a-pren-DYEN-do el i-DYOH-ma lo-KAL' } },
      { czech: 'Jsem spolehlivý/á.', english: 'I\'m reliable.', spanish: 'Soy una persona fiable.', pronunciation: { czech: 'ysem SPA-leh-li-vee', spanish: 'soy OO-na per-SO-na FYAH-bleh' } },
      { czech: 'Jaký je nástupní termín?', english: 'What is the start date?', spanish: '¿Cuál sería la fecha de incorporación?', pronunciation: { czech: 'YA-kee yeh NAHS-tup-nee TER-meen', spanish: 'kwal seh-REE-a la FEH-cha deh in-kor-po-ra-SYON' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Nedoprodávejte — pak dodejte', body: 'Česká kultura oceňuje skromnost. Přeháněné nebo nadměrné sebepropagování zvedá obočí. Řekněte co jste udělali konkrétně. Nechte výsledky mluvit za sebe.' },
        { title: 'Mluvit jakoukoliv češtinou je mocný tah', body: 'I jen několik vět v češtině zcela mění dynamiku. Signalizuje to, že jenom neprojíždíte. Čeští HR manažeři to konzistentně zmiňují.' },
        { title: 'Vyjednávání o platu: buďte přímí', body: 'Češi respektují přímočarost ohledně platu. Pokud se ptají na vaše očekávání, dejte číslo. „Jsem flexibilní" není vnímáno jako skromné — je to nepřipravené.' }
      ],
      spanish: [
        { title: 'Vztahy a týmový fit jsou klíčové', body: 'Španělské firmy se hodně starají o to, jestli dobře zapadnete do týmu. Ukažte zájem o kulturu společnosti, ne jen o popis práce.' },
        { title: 'Příjďte včas — ale ne moc brzy', body: '5–10 minut před termínem je ideální. Přílišná přesnost (30 minut dopředu) může působit divně. Pozdní příchod je velmi negativní signál.' },
        { title: 'Nadšení je vítáno — ale autentické', body: 'Na rozdíl od severní Evropy je španělský pracovní pohovor teplejší a vztahový. Autentické nadšení (ne přehnané americké) je kladně vnímáno.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Jsem velmi motivovaný pracovat pro vaši společnost." — generické', real: '"Líbí se mi, jak vaše firma přistupuje k [konkrétní věc]." — Ukažte, že jste si udělali domácí úkoly.' },
        { textbook: '"Moje slabá stránka je, že jsem workaholic." — klišé', real: 'Jmenujte skutečnou, drobnou slabinu a jak na ní pracujete. Čeští personalisté ocení okamžitě upřímnost.' }
      ],
      spanish: [
        { textbook: '"Soy muy trabajador y perfeccionista." (Jsem velmi pracovitý a perfekcionista.) — klišé', real: '"En mi anterior empresa conseguí [konkrétní výsledek]. Eso refleja mi forma de trabajar." — Konkrétní výsledky vždy vítězí.' },
        { textbook: '"¿Cuánto es el salario?" (Kolik je plat?) — příliš brzy a přímo', real: 'Počkejte, až oni zmíní plat, nebo to položte jemně na konci: "¿Podría comentarme el rango salarial?" — Mohl byste mi říct platové rozmezí?' }
      ]
    }
  },

  // ── 7. OFFICE SMALL TALK ─────────────────────────────────────────
  {
    id: 'office',
    icon: '☕',
    difficulty: 'beginner',
    category: 'Work',
    title: { czech: 'Kancelářský small talk', english: 'Office Small Talk', spanish: 'El Café de las Diez' },
    subtitle: { czech: 'Vaši čeští kolegové nejsou nepřátelští. Načítají.', english: 'Your colleagues aren\'t unfriendly. They\'re just loading.', spanish: 'El café de las 10 no es opcional. Muéstrate.' },
    shortDesc: { czech: 'Dejte jim 6 měsíců. Ledový lom se dělá u oběda a kávy, ne u stolu.', english: 'Give it 6 months. Ice breaks over lunch and coffee, not at your desk.', spanish: 'El café de las 10 y la comida de las 14h son rituales sagrados. Faltar es perder.' },
    context: {
      czech: 'Česká pracovní kultura je profesionální a rezervovaná. V první den nečekejte otázky. Čeští kolegové nedělají falešnou srdečnost — ale jakmile jste uvnitř, jste opravdu uvnitř. Led se láme u oběda a kávy, ne u stolu.',
      english: 'Czech offices: professional and reserved by default. Give it time. Accept every lunch invitation. Spanish offices: the 10am coffee (café de las diez) is sacred. Missing it signals you\'re not a team player. Lunch is at 2pm — not noon.',
      spanish: 'Las oficinas españolas tienen dos rituales sagrados: el café de las 10 y la comida de las 14h. Son rituales sociales, no solo pausas. Faltar repetidamente es señal de que no eres un jugador de equipo.'
    },
    dialogue: [
      { speaker: { czech: 'Kolega Pavel', spanish: 'Compañera Elena' }, role: 'ai', czech: 'Dobrý den. Vy jste ten nový, co?', english: 'Hello. You\'re the new one, right?', spanish: '¡Buenos días! ¿Eres el nuevo de marketing?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Ano, jsem Tom. Nastoupil jsem minulý týden. Těší mě.', english: 'Yes, I\'m Tom. I started last week. Nice to meet you.', spanish: '¡Sí! Soy Tom, empecé ayer. Encantado.', note: { czech: 'Představte se a nechte je, ať se přirozeně oplatí. Žádné otázky hned první den.', english: 'Introduce yourself and let them reciprocate. Don\'t fire questions on day one.', spanish: 'Preséntate y deja que ellos te cuenten. "Encantado/a" es siempre el mejor inicio.' } },
      { speaker: { czech: 'Kolega Pavel', spanish: 'Compañera Elena' }, role: 'ai', czech: 'Já jsem Pavel. Jak se vám tu líbí?', english: 'I\'m Pavel. How do you like it here?', spanish: 'Yo soy Elena, de contabilidad. ¿Vamos a por un café?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Zatím dobrý. Všichni jsou moc milí.', english: 'So far so good. Everyone is very kind.', spanish: '¡Claro que sí! Justo lo que necesitaba.', note: { czech: '„Zatím dobrý" je neformální a přirozené. Přílišné nadšení může vyznít falešně pro Čechy.', english: 'Czech: understate — "Zatím dobrý" (so far so good) beats excessive positivity. Spanish: "Claro que sí!" is warmer than just "sí."', spanish: '"Claro que sí" es mucho más cálido que un simple "sí". Muestra entusiasmo genuino.' } },
      { speaker: { czech: 'Kolega Pavel', spanish: 'Compañera Elena' }, role: 'ai', czech: 'Jdeme na oběd. Chcete jít s námi?', english: 'We\'re going for lunch. Do you want to come with us?', spanish: '¿Qué te parece la empresa hasta ahora?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Jo, rád! Kde tu dobře vaří?', english: 'Yeah, I\'d love to! Where\'s good food around here?', spanish: 'Muy bien hasta ahora. Todos son muy majos.', note: { czech: 'VŽDY přijměte první pozvání na oběd. Takto se čeští kolegové sbližují.', english: 'Czech: ALWAYS accept the first lunch invitation. Spanish: "Majo/maja" (nice/cool person) is one of the most useful Spanish words for office life.', spanish: '"Majo/maja" (simpático/a) es una de las palabras más útiles en una oficina española. "Es muy majo" sobre un colega = calidez instantánea.' } }
    ],
    keyPhrases: [
      { czech: 'Nastoupil jsem minulý týden.', english: 'I started last week.', spanish: 'Empecé la semana pasada.', pronunciation: { czech: 'nas-TOO-pil ysem MI-noo-lee TEE-den', spanish: 'em-peh-SEH la SEH-ma-na pa-SA-da' } },
      { czech: 'Zatím dobrý.', english: 'So far so good.', spanish: 'Muy bien hasta ahora.', pronunciation: { czech: 'ZAH-teem DOH-bree', spanish: 'mooy BYEN as-ta ah-O-ra' } },
      { czech: 'Kde tu dobře vaří?', english: 'Where\'s good food around here?', spanish: '¿Dónde se come bien por aquí?', pronunciation: { czech: 'gdeh too DOH-bzheh VAH-zhee', spanish: 'DON-deh seh KO-meh BYEN por a-KEE' } },
      { czech: 'Jdeme na kafe?', english: 'Shall we go for coffee?', spanish: '¿Vamos a por un café?', pronunciation: { czech: 'YDEH-meh na KAH-feh', spanish: 'BA-mos a por un ka-FEH' } },
      { czech: 'Těší mě.', english: 'Pleased to meet you.', spanish: 'Encantado/a.', pronunciation: { czech: 'TYEH-shee myeh', spanish: 'en-kan-TA-do / en-kan-TA-da' } },
      { czech: 'Musím to zkusit.', english: 'I have to try that.', spanish: 'Tengo que probarlo.', pronunciation: { czech: 'MOO-seem to SKOO-sit', spanish: 'TEN-go keh pro-BAR-lo' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Český small talk zůstává malý — zpočátku', body: 'Počasí, káva, „jak byl víkend." Netlačte na osobní témata první den. Konverzace se otevírá postupně. Toto není chlad; je to respekt k soukromí.' },
        { title: 'Oběd je místo, kde se buduje důvěra', body: 'Čeští kolegové se sbližují u oběda mnohem více než v kanceláři. Vždy řekněte ano k prvnímu pozvání. Signalizuje to, že nejste nad socializací.' },
        { title: 'Káva je vztahový rituál', body: 'Nabídka udělat kávu pro tým nebo přinést něco domácího urychlí vaši sociální integraci. Češi respektují úsilí nad výkonem.' }
      ],
      spanish: [
        { title: 'Café de las diez — povinný', body: 'Café de las diez je posvátný španělský kancelářský rituál. Opakované chybění signalizuje, že nejste týmový hráč. Přijďte, i když nepijete kávu.' },
        { title: 'Oběd je ve 14:00, ne v poledne', body: 'Pokud vás kolega pozve „na oběd", myslí 14–15 hodinu. Říct, že jste jedli ve 12, sklidí zmatené pohledy.' },
        { title: '„Majo/maja" — používejte to', body: '„Majo/maja" (sympatický/á člověk) je jedno z nejužitečnějších španělských slov. „Es muy majo" o kolegovi = okamžitá vřelost.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Jsem nadšený, že tu pracuji." (Jsem nadšený, že tu pracuji.) — příliš silné', real: '"Zatím dobrý." (Zatím dobrý.) — Podceňujte to. Budou respektovat upřímnost.' },
        { textbook: '"Jak se jmenuješ?" (Jak se jmenuješ?) — příliš přímé, příliš rychlé', real: '"Já jsem Tom." — Představte se a nechte je přirozeně opětovat.' }
      ],
      spanish: [
        { textbook: '"Sí, me gusta trabajar aquí." (Ano, líbí se mi tu pracovat.)', real: '"Muy bien hasta ahora. Todos son muy majos." — Konkrétnější, neformálnější, věrohodnější.' },
        { textbook: '"¿Le gustaría tomar un café?" (Chtěl byste si dát kávu?) — příliš formální', real: '"¿Vamos a por un café?" — neformální, vřelé, přesně jak to v kanceláři zní.' }
      ]
    }
  }

  ,

  // ── POLICE / NIE — Bureaucracy ─────────────────────────
  {
    id: 'police',
    icon: '🏛️',
    difficulty: 'intermediate',
    category: 'Practical',
    title: { czech: 'Na cizinecké policii', english: 'At the Foreign Police / NIE Office', spanish: 'En la Oficina de Extranjería' },
    subtitle: { czech: 'Prodloužení pobytu, papíry, trpělivost.', english: 'Residence permit, documents, patience.', spanish: 'NIE, documentos, paciencia.' },
    shortDesc: { czech: 'Prodlužte si povolení k pobytu. Zůstaňte klidní.', english: 'Renew your residence permit. Stay calm. Survive bureaucracy.', spanish: 'Solicita tu NIE. Mantén la calma. Sobrevive la burocracia.' },
    context: { czech: 'Jste na cizinecké policii, abyste si prodloužili povolení k pobytu. Buďte zdvořilí a mějte doklady v pořádku.', english: 'You\'re at the foreign police / NIE office to handle your residence paperwork. Stay polite, stay organized.', spanish: 'Estás en la oficina de extranjería para solicitar el NIE. Sé educado/a y ten los documentos listos.' },
    dialogue: [
      { speaker: { czech: 'Úřednice', spanish: 'Funcionaria' }, role: 'ai', czech: 'Další! Co potřebujete?', english: 'Next! What do you need?', spanish: '¡El siguiente! ¿Qué trámite viene a hacer?', note: { czech: 'Pozdravte a řekněte, proč jste přišli.', english: 'Greet and state your purpose.', spanish: 'Saluda y di para qué vienes.' } },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den. Přišel jsem kvůli prodloužení povolení k pobytu.', english: 'Hello. I\'m here to extend my residence permit.', spanish: 'Buenos días. Vengo a solicitar el NIE, por favor.', note: { czech: 'Vždy začněte pozdravem!', english: 'Always start with a greeting!', spanish: '¡Siempre empieza con un saludo!' } },
      { speaker: { czech: 'Úřednice', spanish: 'Funcionaria' }, role: 'ai', czech: 'Máte pas, fotografii, formulář a potvrzení o ubytování?', english: 'Do you have your passport, photo, form, and proof of accommodation?', spanish: '¿Trae el formulario EX-15, dos fotos, el pasaporte y fotocopia?', note: { czech: 'Mějte vše připravené předem.', english: 'Have everything ready beforehand.', spanish: 'Ten todo preparado de antemano.' } },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Ano, mám všechno tady.', english: 'Yes, I have everything here.', spanish: 'Sí, tengo todo aquí.', note: { czech: '', english: '', spanish: '' } },
      { speaker: { czech: 'Úřednice', spanish: 'Funcionaria' }, role: 'ai', czech: 'Hmm. Chybí vám potvrzení o příjmu.', english: 'Hmm. You\'re missing proof of income.', spanish: 'Veamos... falta el justificante del motivo de solicitud.', note: { czech: 'Vždy něco chybí. Nezdržujte se tím.', english: 'Something is always missing. Don\'t panic.', spanish: 'Siempre falta algo. No te agobies.' } },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Mám pracovní smlouvu. Tady, prosím.', english: 'I have a work contract. Here, please.', spanish: 'Tengo contrato de trabajo. Aquí tiene.', note: { czech: '', english: '', spanish: '' } },
      { speaker: { czech: 'Úřednice', spanish: 'Funcionaria' }, role: 'ai', czech: 'Děkuji. Vše v pořádku. Rozhodnutí přijde poštou do 60 dní.', english: 'Thank you. Everything in order. Decision by post within 60 days.', spanish: 'Perfecto. Todo en orden. La resolución llega por correo en unos 30 días.', note: { czech: 'Hotovo! Teď jen čekat.', english: 'Done! Now just wait.', spanish: '¡Hecho! Ahora solo esperar.' } }
    ],
    keyPhrases: [
      { czech: 'Přišel jsem kvůli prodloužení pobytu.', english: 'I\'m here for a residence extension.', spanish: 'Vengo a solicitar el NIE, por favor.', pronunciation: { czech: 'PRZHEE-shel ysem KVOO-lee prod-LOO-zheh-nee', spanish: 'BEN-go a so-lee-see-TAR el nee-eh' } },
      { czech: 'Nerozumím. Můžete to napsat?', english: 'I don\'t understand. Can you write it down?', spanish: 'Perdone, no entiendo. ¿Puede escribirlo?', pronunciation: { czech: 'NEH-roz-oo-meem. MOO-zheh-teh to NAP-sat', spanish: 'per-DOH-neh, no en-TYEN-do' } },
      { czech: 'Mám pracovní smlouvu.', english: 'I have a work contract.', spanish: 'Tengo contrato de trabajo.', pronunciation: { czech: 'maam PRA-tsov-nyee SMLOO-voo', spanish: 'TEN-go kon-TRA-to deh tra-BA-ho' } },
      { czech: 'Kdy přijde rozhodnutí?', english: 'When will the decision come?', spanish: '¿Cuándo estará listo?', pronunciation: { czech: 'gdih PRZHEE-deh roz-HOD-noo-tyee', spanish: 'KWAN-do es-ta-RA LEES-to' } },
      { czech: 'Chybí mi něco?', english: 'Am I missing something?', spanish: '¿Me falta algo?', pronunciation: { czech: 'KHIH-bee mi NYEH-tso', spanish: 'meh FAL-ta AL-go' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Buďte zdvořilí, ale vytrvalí', body: 'Na cizinecké policii vždy pozdravte "Dobrý den" a buďte trpěliví. Úředníci nemají rádi, když je tlačíte — ale oceňují, když máte doklady v pořádku.' },
        { title: 'Vždy něco chybí', body: 'Nenechte se rozhodit, když řeknou že chybí doklad. Je to normální. Zeptejte se přesně, co potřebujete, a přijďte příště.' }
      ],
      spanish: [
        { title: 'Sé educado/a y persistente', body: 'En la oficina de extranjería, saluda siempre con "Buenos días" y sé paciente. Los funcionarios no responden bien a la presión — pero valoran que tengas todo organizado.' },
        { title: 'Siempre falta algo', body: 'No te agobies si dicen que falta un documento. Es normal. Pregunta exactamente qué necesitas y vuelve preparado/a.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Přišel bych rád požádat o prodloužení..." — příliš formální', real: '"Dobrý den, potřebuji prodloužit pobyt." — jednoduché, jasné, efektivní.' },
        { textbook: '"Omlouvám se, nerozuměl jsem vaší odpovědi."', real: '"Promiňte, nerozumím. Můžete to zopakovat?" — upřímné, funguje.' }
      ],
      spanish: [
        { textbook: '"Desearía solicitar el Número de Identidad de Extranjero..." — nadie habla así', real: '"Buenos días, vengo a por el NIE." — directo, educado, funciona.' },
        { textbook: '"Disculpe, no he comprendido su indicación."', real: '"Perdone, no entiendo. ¿Puede repetir?" — honesto, simple, efectivo.' }
      ]
    }
  },

  // ── 10. GROCERY / SUPERMARKET ─────────────────────────────────────
  {
    id: 'grocery',
    icon: '🛒',
    difficulty: 'beginner',
    category: 'Everyday',
    title: { czech: 'V supermarketu', english: 'At the Supermarket', spanish: 'En el Supermercado' },
    subtitle: { czech: 'Pokladna, taška, kartou nebo hotově.', english: 'Checkout, bag, card or cash.', spanish: 'Caja, bolsa, tarjeta o efectivo.' },
    shortDesc: { czech: 'Zákaznická karta. Taška. Kartou. Tři věci. Zvládnete to.', english: 'Loyalty card. Bag. Card or cash. Three things. You\'ve got this.', spanish: 'Tarjeta de fidelización. Bolsa. Tarjeta o efectivo. Tres cosas. Lo tienes.' },
    context: {
      czech: 'Supermarkety v Čechách fungují jednoduše: zákaznická karta, taška, platba. Albert, Billa, Kaufland — všude stejné. Pár slov a zvládnete to jako místní.',
      english: 'Czech: loyalty card, bag, payment — in that order. Spanish: same at Mercadona, Lidl, Carrefour. "Tengo bolsa" saves everyone time. Say it before they ask.',
      spanish: 'El supermercado español es rutina pura: tarjeta de fidelización, bolsa, pago. En Mercadona, Lidl o Carrefour es igual. "Tengo bolsa" es la frase más útil del día.'
    },
    dialogue: [
      { speaker: { czech: 'Pokladní', spanish: 'Cajero' }, role: 'ai', czech: 'Dobrý den. Máte zákaznickou kartu?', english: 'Hello. Do you have a loyalty card?', spanish: 'Buenas. ¿Tienes tarjeta de fidelización?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Dobrý den. Ne, nemám.', english: 'Hello. No, I don\'t.', spanish: 'Buenas. No, no tengo.', note: { czech: null, english: 'Short is fine — cashiers appreciate it.', spanish: 'Corto y directo — el cajero lo agradece.' } },
      { speaker: { czech: 'Pokladní', spanish: 'Cajero' }, role: 'ai', czech: 'Taška?', english: 'Bag?', spanish: '¿Bolsa?' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Mám tašku, děkuji.', english: 'I have a bag, thank you.', spanish: 'Tengo bolsa, gracias.', note: { czech: '"Mám tašku" — tři slova, která ušetří čas všem.', english: '"Mám tašku" (CZ) / "Tengo bolsa" (ES) — say it right away, saves the question.', spanish: '"Tengo bolsa" — dilo antes de que pregunte. Tres palabras.' } },
      { speaker: { czech: 'Pokladní', spanish: 'Cajero' }, role: 'ai', czech: 'Celkem 384 korun.', english: 'Total: 384 crowns.', spanish: 'Son 27,50 euros.' },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Kartou, prosím.', english: 'Card, please.', spanish: 'Con tarjeta, por favor.', note: { czech: '"Kartou" = card. "Hotově" = cash. Tak jednoduché.', english: '"Kartou" (CZ) = card. "Hotově" = cash. "Con tarjeta" (ES) = card. "En efectivo" = cash.', spanish: '"Con tarjeta" = tarjeta. "En efectivo" = efectivo.' } },
      { speaker: { czech: 'Pokladní', spanish: 'Cajero' }, role: 'ai', czech: 'Hezký den!', english: 'Have a nice day!', spanish: '¡Hasta luego!' }
    ],
    keyPhrases: [
      { czech: 'Mám tašku.', english: 'I have a bag.', spanish: 'Tengo bolsa.', pronunciation: { czech: 'mahm TASH-ku', spanish: 'TEN-go BOL-sa' } },
      { czech: 'Kartou, prosím.', english: 'Card, please.', spanish: 'Con tarjeta, por favor.', pronunciation: { czech: 'KAR-tou, PRO-seem', spanish: 'kon tar-HEH-ta, por fa-VOR' } },
      { czech: 'Hotově.', english: 'Cash.', spanish: 'En efectivo.', pronunciation: { czech: 'HO-to-vyeh', spanish: 'en eh-FEK-tee-vo' } },
      { czech: 'Kolik to stojí?', english: 'How much is it?', spanish: '¿Cuánto es?', pronunciation: { czech: 'KO-lik to STOY-ee', spanish: 'KWAN-to es' } },
      { czech: 'Ne, nemám zákaznickou kartu.', english: 'No, I don\'t have a loyalty card.', spanish: 'No, no tengo tarjeta.', pronunciation: { czech: 'neh, NEH-mahm ZAH-kaz-ni-tskow KAR-tu', spanish: 'no, no TEN-go tar-HEH-ta' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Zákaznická karta — vždy první otázka', body: 'V každém českém supermarketu je první otázka zákaznická karta. Albert, Billa, Kaufland — všude stejné. Připravte odpověď předem.' },
        { title: 'Tašky nejsou zdarma', body: 'Plastové tašky se platí (3–10 korun). Přineste vlastní a hlaste hned: "Mám tašku." Pokladní to ocení.' },
        { title: 'Kartou vs. hotově', body: 'Bezhotovostní platba je standard. "Kartou" je jedno slovo — přiložte kartu a máte hotovo.' }
      ],
      spanish: [
        { title: 'Tarjeta de fidelización — siempre lo primero', body: 'En Mercadona, Lidl, Carrefour — lo primero es la tarjeta. Tenla lista o di "No, no tengo" rápido.' },
        { title: 'Las bolsas cuestan dinero', body: 'Las bolsas de plástico cuestan unos 10 céntimos. Lleva la tuya y di "Tengo bolsa" antes de que pregunte.' },
        { title: 'Bizum — el pago español', body: 'Bizum es transferencia instantánea entre móviles, casi universal en España. Si lo ofrecen como opción, es perfectamente normal.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Rád bych zaplatil kartou, prosím." — správně, ale nikdo tak nemluví', real: '"Kartou." — Jedno slovo. Přiložte kartu. Hotovo.' },
        { textbook: '"Ne, děkuji, nemám zákaznickou kartu."', real: '"Ne, nemám." — Nebo jen "ne." Pokladní pochopí.' }
      ],
      spanish: [
        { textbook: '"Me gustaría pagar con tarjeta de crédito, por favor." — correcto pero muy largo', real: '"Con tarjeta." — Dos palabras. Acerca el móvil o la tarjeta. Listo.' },
        { textbook: '"No, no dispongo de tarjeta de fidelización."', real: '"No, no tengo." — O simplemente "no." El cajero ya entiende.' }
      ]
    }
  },

  // ── DATE — Romance ──────────────────────────────────────
  {
    id: 'date',
    icon: '❤️',
    difficulty: 'intermediate',
    category: 'Social',
    title: { czech: 'První rande', english: 'First Date', spanish: 'Primera Cita' },
    subtitle: { czech: 'Komplimenty, plány, a trocha odvahy.', english: 'Compliments, plans, and a little courage.', spanish: 'Cumplidos, planes y un poco de valor.' },
    shortDesc: { czech: 'První rande s Češkou/Čechem. Buďte upřímní, mějte plán.', english: 'First date with a local. Be genuine, have a plan, try the language.', spanish: 'Primera cita con un/a español/a. Sé auténtico/a, ten un plan.' },
    context: { czech: 'Potkáváte se na první rande v baru ve Vinohradech. Buďte upřímní a zkuste trochu česky.', english: 'You\'re meeting for a first date at a bar. Be genuine, have a plan, and try speaking some of the local language.', spanish: 'Quedas para una primera cita en un restaurante de Madrid. Sé directo/a y prueba un poco de español.' },
    dialogue: [
      { speaker: { czech: 'Anička', spanish: 'Carmen' }, role: 'ai', czech: 'Čekal jsi dlouho?', english: 'Have you been waiting long?', spanish: '¡Hola! ¿Llevas mucho esperando?', note: { czech: 'Odpovězte a pochvalte ji.', english: 'Respond and give a compliment.', spanish: 'Responde y hazle un cumplido.' } },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Ne, právě jsem přišel. Vypadáš skvěle!', english: 'No, I just arrived. You look great!', spanish: 'No, acabo de llegar. ¡Estás muy guapa esta noche!', note: { czech: 'Kompliment je klíčový!', english: 'The compliment matters!', spanish: '¡El cumplido importa!' } },
      { speaker: { czech: 'Anička', spanish: 'Carmen' }, role: 'ai', czech: 'Díky! Ty taky. Kam jdeme — máš plán?', english: 'Thanks! You too. Where are we going — do you have a plan?', spanish: '¡Gracias! Tú también. ¿Tienes reserva?', note: { czech: 'Mít plán = body navíc.', english: 'Having a plan = bonus points.', spanish: 'Tener plan = puntos extra.' } },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Zarezervoval jsem stůl v restauraci v Vinohradech.', english: 'I booked a table at a restaurant in Vinohrady.', spanish: 'Sí, he reservado una mesa en Malasaña.', note: { czech: '', english: '', spanish: '' } },
      { speaker: { czech: 'Anička', spanish: 'Carmen' }, role: 'ai', czech: 'Oooh, máš rezervaci! To se mi líbí. Snažíš se s češtinou?', english: 'Oooh, you have a reservation! I like that. Are you trying Czech?', spanish: '¡Me encanta un hombre/mujer con plan! ¿Hablas español?', note: { czech: 'Řekněte že se učíte!', english: 'Tell them you\'re learning!', spanish: '¡Dile que estás aprendiendo!' } },
      { speaker: { czech: 'Vy', spanish: 'Tú' }, role: 'you', czech: 'Snažím se. Ještě se učím, ale zkouším to.', english: 'I\'m trying. Still learning, but giving it a go.', spanish: 'Lo intento. Todavía estoy aprendiendo, pero me esfuerzo.', note: { czech: 'Upřímnost vítězí.', english: 'Honesty wins.', spanish: 'La honestidad gana.' } }
    ],
    keyPhrases: [
      { czech: 'Vypadáš skvěle!', english: 'You look great!', spanish: 'Estás muy guapo/guapa esta noche.', pronunciation: { czech: 'VIH-pa-dash SKVYEH-leh', spanish: 'es-TAS mwee GWA-po/GWA-pa' } },
      { czech: 'Zarezervoval jsem stůl.', english: 'I booked a table.', spanish: 'He reservado una mesa.', pronunciation: { czech: 'ZA-reh-zer-vo-val ysem stool', spanish: 'eh reh-ser-VA-do OO-na MEH-sa' } },
      { czech: 'Snažím se.', english: 'I\'m trying.', spanish: 'Lo intento.', pronunciation: { czech: 'SNA-zheem seh', spanish: 'lo in-TEN-to' } },
      { czech: 'Líbí se mi tady.', english: 'I like it here.', spanish: 'Me gusta mucho este sitio.', pronunciation: { czech: 'LEE-bee seh mi TA-dih', spanish: 'meh GOOS-ta MOO-cho ES-teh SEE-tyo' } },
      { czech: 'Bylo to moc fajn.', english: 'It was really nice.', spanish: 'Me lo paso genial contigo.', pronunciation: { czech: 'BIH-lo to mots fain', spanish: 'meh lo PA-so heh-NYAL kon-TEE-go' } },
      { czech: 'Uvidíme se znovu?', english: 'Will we see each other again?', spanish: '¿Quedamos otro día?', pronunciation: { czech: 'OO-vi-dee-meh seh ZNO-voo', spanish: 'keh-DA-mos OH-tro DEE-a' } }
    ],
    culturalTips: {
      czech: [
        { title: 'Mějte plán', body: 'České ženy oceňují, když muž ví kam jde. "Nevím" není odpověď na první rande. Zarezervujte stůl, navrhněte místo.' },
        { title: 'Upřímnost nad dojmem', body: 'Čeští lidé oceňují autenticitu. Radši řekněte "Snažím se, ale je to těžké" než předstírejte.' }
      ],
      spanish: [
        { title: 'Ten un plan', body: 'En España, tener reserva o un plan concreto muestra iniciativa. "No sé" no es buena respuesta en la primera cita.' },
        { title: 'Sé directo/a y expresivo/a', body: 'Los españoles valoran la expresividad. No seas tímido/a con los cumplidos — "Estás muy guapa" se espera y se agradece.' }
      ]
    },
    realVsTextbook: {
      czech: [
        { textbook: '"Rád bych si objednal stůl pro dva." — správně ale roboticky', real: '"Zarezervoval jsem stůl." — krátké, sebevědomé, přirozené.' },
        { textbook: '"Vy jste velmi krásná dáma."', real: '"Vypadáš skvěle!" — tak to Čech řekne doopravdy.' }
      ],
      spanish: [
        { textbook: '"Me gustaría hacer una reserva para dos personas." — correcto pero robótico', real: '"He reservado mesa." — corto, seguro, natural.' },
        { textbook: '"Usted es una dama muy hermosa."', real: '"¡Estás muy guapa esta noche!" — así habla un español de verdad.' }
      ]
    }
  }

];

// Helper: get a V2 scenario by id
function getScenarioV2(id) {
  return SCENARIOS_V2.find(s => s.id === id) || null;
}
