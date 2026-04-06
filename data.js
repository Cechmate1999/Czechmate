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
      { speaker: 'Číšník', role: 'ai', czech: 'Dobrý den! Co si dáte?', english: 'Hello! What will you have?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Jedno pivo, prosím.', english: 'Hello. One beer, please.', isKey: true, note: 'Use "jedno" — pivo is neuter gender. "Jeden pivo" is a classic expat mistake.' },
      { speaker: 'Číšník', role: 'ai', czech: 'Velké nebo malé?', english: 'Large or small?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Velké, prosím. A máte jídelní lístek?', english: 'Large, please. And do you have a menu?', isKey: true },
      { speaker: 'Číšník', role: 'ai', czech: 'Samozřejmě. Tady to máte.', english: 'Of course. Here you go.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dám si svíčkovou, prosím.', english: 'I\'ll have the svíčková, please.', isKey: true, note: '"Dám si" = I\'ll have. More natural than "Chci" (I want), which sounds blunt.' },
      { speaker: 'Číšník', role: 'ai', czech: 'Výborně. Ještě jedno pivo?', english: 'Excellent. Another beer?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ještě jedno, prosím. Děkuji.', english: 'Another one, please. Thank you.', isKey: true },
      { speaker: 'Číšník', role: 'ai', czech: 'Dobrou chuť!', english: 'Enjoy your meal!', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Zaplatím, prosím.', english: 'I\'d like to pay, please.', isKey: true, note: 'Don\'t wait for the bill — they won\'t bring it. You have to ask.' }
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
    icon: '👨‍👩‍👧',
    title: 'Meeting the Parents',
    subtitle: 'U rodičů',
    difficulty: 'intermediate',
    category: 'Social',
    shortDesc: 'Sunday lunch. Her parents. Silence. You. Your mission: survive with dignity and a second helping.',
    context: 'Sunday lunch at a Czech family home is a rite of passage. Her mother has been cooking since 8am — soup first, always. Her father will assess you quietly. Bring wine, take your shoes off, finish every bite, and compliment the food. Those are the rules.',
    dialogue: [
      { speaker: 'Matka', role: 'ai', czech: 'Vítejte! Vstupte, vstupte. Konečně vás vidím.', english: 'Welcome! Come in, come in. Finally I see you.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den, paní Nováková. Těší mě. Přinesl jsem víno.', english: 'Hello, Mrs. Nováková. Nice to meet you. I brought wine.', isKey: true, note: 'Use their surname until invited to use first names. Always.' },
      { speaker: 'Matka', role: 'ai', czech: 'Ach, to jste nemuseli! Moc hezké. Pojďte dál.', english: 'Oh, you didn\'t have to! Very nice. Come in.', isKey: false },
      { speaker: 'Otec', role: 'ai', czech: 'Dobrý den. Posaďte se. Odkud jste?', english: 'Hello. Have a seat. Where are you from?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jsem z Anglie, ale žiju v Praze už dva roky. Češtinu se stále učím.', english: 'I\'m from England, but I\'ve been living in Prague for two years. I\'m still learning Czech.', isKey: true },
      { speaker: 'Matka', role: 'ai', czech: 'Polévka je hotová! Přijďte ke stolu.', english: 'Soup is ready! Come to the table.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'To voní skvěle! Děkuji za pozvání.', english: 'This smells wonderful! Thank you for the invitation.', isKey: true, note: '"Voní" = smells nice. "Smrdí" = stinks. Do NOT mix these up. Ever.' },
      { speaker: 'Matka', role: 'ai', czech: 'Tak jezte, jezte! Nezlobte se, vezměte si víc.', english: 'Come on, eat, eat! Please, take more.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Je to výborné! Může dostat recept?', english: 'It\'s excellent! Can I get the recipe?', isKey: true, note: 'Asking for the recipe is the highest compliment you can give a Czech mother.' }
    ],
    keyPhrases: [
      { czech: 'Těší mě.', english: 'Nice to meet you.', phonetic: 'TYEH-shee myeh' },
      { czech: 'Je to výborné!', english: 'This is excellent/delicious!', phonetic: 'yeh to VEE-bor-neh' },
      { czech: 'Děkuji za pozvání.', english: 'Thank you for the invitation.', phonetic: 'DYEH-ku-yi za poz-VAH-nee' },
      { czech: 'Voní to báječně.', english: 'It smells wonderful.', phonetic: 'VOH-nee to BAH-yech-nyeh' },
      { czech: 'Smím si vzít víc?', english: 'May I take more?', phonetic: 'smeem si vzyeet veetz' },
      { czech: 'Byl to skvělý oběd.', english: 'That was a great lunch.', phonetic: 'bil to SKVYE-lee OH-byed' }
    ],
    culturalTips: [
      { title: 'Always bring something', body: 'Wine, flowers (odd number — not 13), or chocolates. Never arrive empty-handed. You\'ll be forgiven once. The second time, it becomes a personality trait.' },
      { title: 'Shoes come off at the door', body: 'Czech homes are shoe-free zones. Guest slippers will be provided. Pro tip: bring clean socks or your own slippers if you\'re fussy. This matters.' },
      { title: 'Finish your plate', body: 'Leaving food on your plate signals you didn\'t like it. That\'s a direct hit to the cook\'s pride. Pace yourself during soup so you can eat the full main course.' },
      { title: 'The father will warm up slowly', body: 'Czech men of that generation aren\'t rude — they\'re evaluating. Ask him about Czech football, history, or his profession. Hockey opinions are always welcome. Avoid politics.' },
      { title: 'Sunday lunch has a structure', body: 'Soup → Main course → Dessert. This is sacred. Don\'t ask about salad. Don\'t suggest skipping the soup. Just follow the flow.' }
    ],
    realVsTextbook: [
      { textbook: '"Toto jídlo je chutné." (This food is tasty.)', real: '"Je to výborné!" or "To je fantastické!" — "Chutné" is too weak. Load up on superlatives. This is the time.' },
      { textbook: '"Rád bych ještě trochu." (I would like a little more.)', real: '"Ještě trochu? Ano, prosím!" — Match her energy. She\'s offering enthusiastically; accept enthusiastically.' },
      { textbook: '"Jak se jmenujete?" (What is your name?) — too casual for elders', real: '"Promiňte, jak vás mám oslovovat?" (How should I address you?) — polite and respectful.' }
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
      { speaker: 'Úřednice', role: 'ai', czech: 'Další! Co potřebujete?', english: 'Next! What do you need?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Dobrý den. Přišel jsem požádat o prodloužení povolení k pobytu.', english: 'Hello. I came to apply for an extension of my residence permit.', isKey: true },
      { speaker: 'Úřednice', role: 'ai', czech: 'Máte pas, fotografii, formulář žádosti a potvrzení o ubytování?', english: 'Do you have passport, photo, application form and proof of accommodation?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ano, mám. Tady jsou všechny dokumenty.', english: 'Yes, I do. Here are all the documents.', isKey: true },
      { speaker: 'Úřednice', role: 'ai', czech: 'Hmm. Chybí vám potvrzení o příjmu a kopie pracovní smlouvy.', english: 'Hmm. You\'re missing income confirmation and a copy of your work contract.', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Moment, prosím. To mám od zaměstnavatele. Tady.', english: 'One moment, please. I have that from my employer. Here.', isKey: true, note: 'Always keep everything in a labeled folder. They will find something missing.' },
      { speaker: 'Vy', role: 'you', czech: 'Promiňte — nerozumím tomuto výrazu. Můžete vysvětlit, prosím?', english: 'Excuse me — I don\'t understand this term. Can you explain, please?', isKey: true },
      { speaker: 'Vy', role: 'you', czech: 'Aha, rozumím. Kdy přijde rozhodnutí?', english: 'Ah, I understand. When will the decision come?', isKey: true }
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
      { speaker: 'Kolega Pavel', role: 'ai', czech: 'Dobrý den. Vy jste ten nový, co?', english: 'Hello. You\'re the new one, right?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ano, jsem Tom. Nastoupil jsem minulý týden. Těší mě.', english: 'Yes, I\'m Tom. I started last week. Nice to meet you.', isKey: true },
      { speaker: 'Kolega Pavel', role: 'ai', czech: 'Já jsem Pavel. Jak se vám tu líbí?', english: 'I\'m Pavel. How do you like it here?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Zatím dobrý. Všichni jsou moc milí.', english: 'So far so good. Everyone is very kind.', isKey: true, note: '"Zatím dobrý" is casual and natural. Pure enthusiasm can seem fake to Czechs.' },
      { speaker: 'Kolega Pavel', role: 'ai', czech: 'Jdeme na oběd. Chcete jít s námi?', english: 'We\'re going for lunch. Do you want to come with us?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Jo, rád! Kde tu dobře vaří?', english: 'Yeah, I\'d love to! Where\'s good food around here?', isKey: true, note: 'ALWAYS accept the first lunch invitation. This is how Czech colleagues bond.' }
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
      { speaker: 'Rande', role: 'ai', czech: 'Čekal jsi dlouho?', english: 'Were you waiting long?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Ne, přišel jsem teď. Vypadáš skvěle.', english: 'No, I just got here. You look great.', isKey: true, note: 'Simple and genuine. Avoid over-complimenting in the first minute.' },
      { speaker: 'Rande', role: 'ai', czech: 'Díky! Ty taky. Kam jdeme?', english: 'Thanks! You too. Where are we going?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Zarezervoval jsem stůl v jedné restauraci na Vinohradech. Máš ráda italskou kuchyni?', english: 'I reserved a table at a restaurant in Vinohrady. Do you like Italian food?', isKey: true, note: 'Having a specific plan — not "wherever you want" — is genuinely attractive in Czech culture.' },
      { speaker: 'Rande', role: 'ai', czech: 'Ach, to je milé! Ano, mám. Mluvíš česky?', english: 'Oh, that\'s nice! Yes, I do. You speak Czech?', isKey: false },
      { speaker: 'Vy', role: 'you', czech: 'Snažím se. Ještě se učím, ale líbí se mi tady.', english: 'I try. I\'m still learning, but I like it here.', isKey: true, note: 'Self-deprecation about your Czech is charming. Czechs love the effort more than the result.' }
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
  }

];
