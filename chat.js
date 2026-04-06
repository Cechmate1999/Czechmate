// ============================================
//   CZECHMATE — AI Chat Simulation Engine
//   Supports Czech + Spanish scenarios.
//   Keyboard-relaxed: accents/diacritics are
//   optional — matched via normalization.
// ============================================

const ChatEngine = (() => {

  // ── TEXT NORMALIZATION ──────────────────────────────
  // Strips diacritics so users without special keyboards
  // can still match patterns (e.g. "prosim" = "prosím").
  function norm(str) {
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')   // remove combining diacritics
      .replace(/[łđ]/g, 'l')            // edge cases
      .trim();
  }

  // Check if normalized input includes normalized trigger
  function matches(input, trigger) {
    return norm(input).includes(norm(trigger));
  }

  // ── CZECH GRAMMAR CORRECTIONS ──────────────────────
  // Only grammatical / word-choice errors — NOT diacritic
  // issues (those are fine to skip on non-Czech keyboards).
  const CZ_CORRECTIONS = [
    {
      test: i => /\bjeden\s+pivo\b/i.test(norm(i).replace(/[^\w\s]/g,'')),
      wrong: 'jeden pivo',
      right: 'jedno pivo',
      explain: '"Pivo" is neuter gender — needs "jedno," not "jeden." Compare: jeden muž (masc.) vs. jedno pivo (neuter).'
    },
    {
      test: i => /\bjedna\s+pivo\b/i.test(norm(i).replace(/[^\w\s]/g,'')),
      wrong: 'jedna pivo',
      right: 'jedno pivo',
      explain: '"Pivo" is neuter — "jedno." "Jedna" is feminine (jedna žena = one woman).'
    },
    {
      test: i => /\bsmrdi\b/.test(norm(i)),
      wrong: 'smrdí',
      right: 'voní',
      explain: '"Smrdí" = STINKS. You want "voní" = smells nice. These are opposite. Very important.'
    },
    {
      test: i => {
        const n = norm(i);
        return /\bchci\b/.test(n) && (n.includes('pivo') || n.includes('vino') || n.includes('jidlo') || n.includes('vodu'));
      },
      wrong: 'chci [item]',
      right: 'dám si [item]',
      explain: '"Chci" (I want) works but sounds blunt when ordering. "Dám si" (I\'ll have) is how Czech people naturally order food or drinks.'
    }
  ];

  // ── SPANISH GRAMMAR CORRECTIONS ────────────────────
  const ES_CORRECTIONS = [
    {
      test: i => /\bquiero\s+(una|un|cerveza|cafe|agua|vino|tapa)/i.test(i),
      wrong: 'quiero una/un...',
      right: 'ponme una/un... / dame...',
      explain: '"Quiero" (I want) is grammatically fine but sounds blunt at a bar. "Ponme" (pour/get me) or "Dame" (give me) sounds much more natural.'
    },
    {
      test: i => /\bcomo\s+se\s+llamas\b/i.test(norm(i)),
      wrong: 'como se llamas',
      right: '¿cómo te llamas?',
      explain: 'Mixing formal and informal: "¿Cómo te llamas?" (informal tú) or "¿Cómo se llama usted?" (formal). Don\'t mix the two!'
    },
    {
      test: i => /\bsoy\s+calor\b/i.test(norm(i)),
      wrong: 'soy calor / estoy calor',
      right: 'tengo calor',
      explain: 'Feeling hot? In Spanish it\'s "tengo calor" (I have heat), not "estoy/soy calor." Body sensations use "tener" (to have).'
    },
    {
      test: i => /\bestoy\s+cansado|estoy\s+aburrido|estoy\s+contento/i.test(i) === false &&
                 /\bsoy\s+(cansado|aburrido|feliz|triste)\b/i.test(i),
      wrong: 'soy [mood/state]',
      right: 'estoy [mood/state]',
      explain: 'Temporary states (tired, bored, happy right now) use "estar," not "ser." "Estoy cansado/a" = I\'m tired (right now). "Soy" is for permanent characteristics.'
    }
  ];

  // ── CZECH CHAT SCENARIOS ─────────────────────────────

  const CZECH_SCENARIOS = {
    pub: {
      language: 'czech',
      persona: {
        name: 'Milan',
        role: 'Hospodský — Pub Bartender',
        avatar: '🧔',
        description: 'Milan has run this pub for 15 years. He\'s seen every tourist attempt Czech. Not mean — just efficient. He\'ll respect you for trying.'
      },
      vocabulary: [
        { cz: 'pivo', en: 'beer' },
        { cz: 'prosím', en: 'please (also: here you are)' },
        { cz: 'dám si', en: 'I\'ll have' },
        { cz: 'zaplatím', en: 'I\'ll pay' },
        { cz: 'jídelní lístek', en: 'menu' },
        { cz: 'na zdraví', en: 'cheers' },
        { cz: 'ještě jedno', en: 'another one' },
        { cz: 'děkuji', en: 'thank you' }
      ],
      context: 'You\'re in a traditional Prague pub. Milan is your bartender. Try ordering a beer, some food, and paying the bill. Use Czech — accents optional!',
      tip: 'Start with "Dobry den" and try to order a beer. "Jedno pivo, prosim" works even without the accents.',
      opening: { text: 'Dobrý den! Co si dáte? 🍺', translation: 'Hello! What will you have?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'ahoj', 'hello', 'hi', 'cau', 'ciao'], text: 'Dobrý den! Co si dáte?', translation: 'Hello! What will you have?', next: 'greeting', positive: true }
          ],
          fallback: { text: 'Haló? Zkuste mě pozdravit česky! 😄', translation: 'Hello? Try greeting me in Czech! (e.g. "Dobry den")' }
        },
        greeting: {
          responses: [
            { triggers: ['pivo', 'beer', 'lager', 'kozel', 'pilsner', 'plzen', 'staropramen', 'bernard', 'radegast'], text: 'Jaké? Kozel, Pilsner Urquell, nebo Staropramen? A velké nebo malé?', translation: 'Which one? Kozel, Pilsner Urquell, or Staropramen? Large or small?', next: 'beer_size', positive: true },
            { triggers: ['voda', 'water', 'juice', 'dzus', 'kafe', 'coffee', 'caj', 'tea'], text: 'Samozřejmě. A ještě něco?', translation: 'Of course. And anything else?', next: 'food_offer', positive: true },
            { triggers: ['jidlo', 'food', 'menu', 'listek', 'jidelni', 'eat', 'jist'], text: 'Tady je jídelní lístek. Co si dáte k pití?', translation: 'Here\'s the menu. What will you have to drink?', next: 'greeting' }
          ],
          fallback: { text: 'Promiňte, nerozuměl jsem. Pivo? Jídlo? 🤔', translation: 'Sorry, I didn\'t understand. Beer? Food? (Try: "jedno pivo, prosim")' }
        },
        beer_size: {
          responses: [
            { triggers: ['velke', 'large', 'big', 'pullitr', 'pul', 'half', 'velky'], text: 'Velký Kozel — výborný výběr! Ještě něco? Dáte si jídlo?', translation: 'Big Kozel — excellent choice! Anything else? Will you have food?', next: 'food_offer', positive: true },
            { triggers: ['male', 'small', 'maly', 'tretinka', 'small'], text: 'Malý Kozel. Dobře. Ještě něco?', translation: 'Small Kozel. Alright. Anything else?', next: 'food_offer', positive: true },
            { triggers: ['kozel', 'pilsner', 'staropramen', 'bernard'], text: 'Dobrá volba. Velké nebo malé?', translation: 'Good choice. Large or small? ("velke" or "male")', next: 'beer_size' }
          ],
          fallback: { text: 'Velké nebo malé pivo?', translation: 'Large ("velke") or small ("male") beer?' }
        },
        food_offer: {
          responses: [
            { triggers: ['svickova', 'beef', 'sauce', 'krem'], text: 'Svíčková! Výborná volba — to je naše specialita!', translation: 'Svíčková! Excellent choice — that\'s our specialty!', next: 'eating', positive: true },
            { triggers: ['gulas', 'goulash', 'gulash', 'gulaz'], text: 'Hovězí guláš s knedlíky. Skvělá volba.', translation: 'Beef goulash with dumplings. Great choice.', next: 'eating', positive: true },
            { triggers: ['rizek', 'schnitzel', 'rizek', 'smaz'], text: 'Smažený řízek! Klasika. Hned to objednám.', translation: 'Fried schnitzel! A classic. Ordering it right away.', next: 'eating', positive: true },
            { triggers: ['ne', 'no', 'nothing', 'nic', 'jen', 'only', 'just'], text: 'Dobře. Tady je vaše pivo. Na zdraví! 🍺', translation: 'Alright. Here\'s your beer. Cheers!', next: 'eating', positive: true },
            { triggers: ['menu', 'listek', 'jidelni', 'what', 'co', 'mate'], text: 'Máme svíčkovou, guláš, nebo řízek. Co si dáte?', translation: 'We have svíčková, goulash, or schnitzel. What will you have?', next: 'food_offer' }
          ],
          fallback: { text: 'Dáte si jídlo? Svíčková, guláš, nebo řízek?', translation: 'Will you have food? Svíčková, goulash, or schnitzel?' }
        },
        eating: {
          responses: [
            { triggers: ['zaplatim', 'zaplatit', 'pay', 'platit', 'ucet', 'bill', 'check', 'zaplaceni'], text: 'Samozřejmě! Dohromady nebo zvlášť?', translation: 'Of course! Together or separate?', next: 'paying', positive: true },
            { triggers: ['jeste', 'another', 'jedno', 'pivo', 'beer', 'more', 'dalsi'], text: 'Ještě jedno — okamžitě! 🍺', translation: 'Another one — right away!', next: 'eating', positive: true },
            { triggers: ['dobre', 'vyborne', 'skvele', 'delicious', 'good', 'great', 'chutne', 'voni'], text: 'Těší mě! Naše kuchařka vaří nejlépe v Praze. 😄', translation: 'Glad to hear it! Our cook makes the best food in Prague.', next: 'eating', positive: true },
            { triggers: ['na zdravi', 'zdravi', 'cheers', 'toast', 'nazdravi'], text: 'Na zdraví! 🍺 Ať se vám tu líbí.', translation: 'Cheers! Hope you enjoy it here.', next: 'eating', positive: true }
          ],
          fallback: { text: 'Všechno v pořádku? Nebo "Zaplatim, prosim" pro účet?', translation: 'Everything alright? Or say "zaplatim, prosim" for the bill!' }
        },
        paying: {
          responses: [
            { triggers: ['dohromady', 'together', 'all', 'vse', 'celkem', 'vsechno'], text: 'Dohromady 285 korun. Kartou nebo hotově?', translation: 'Together 285 crowns. Card or cash?', next: 'done' },
            { triggers: ['zvlast', 'separate', 'separately', 'split'], text: 'Zvlášť — jídlo 120, piva 165. Celkem 285.', translation: 'Separate — food 120, beers 165. Total 285.', next: 'done' },
            { triggers: ['karta', 'card', 'credit', 'visa'], text: 'Platební terminál je tady. Díky za návštěvu! 🍺', translation: 'Payment terminal here. Thanks for visiting!', next: 'done', positive: true },
            { triggers: ['hotove', 'cash', 'korun', 'koruna'], text: '285 korun. Díky! Přijďte zase. Na zdraví! 🍺', translation: '285 crowns. Thanks! Come again. Cheers!', next: 'done', positive: true }
          ],
          fallback: { text: 'Kartou nebo hotově? (card = "kartou", cash = "hotove")', translation: 'Card ("kartou") or cash ("hotove")?' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Přijďte brzy znovu. 👋', translation: 'Goodbye! Come back soon. (Pub scenario complete! 🎉)' }
        }
      }
    },

    parents: {
      language: 'czech',
      persona: {
        name: 'Paní Nováková',
        role: 'Partnerova matka — Your partner\'s mother',
        avatar: '👩‍🍳',
        description: 'Warm, welcoming, and quietly evaluating everything. She spent the morning cooking. Compliment everything. Finish your plate. You\'ll be fine.'
      },
      vocabulary: [
        { cz: 'těší mě', en: 'nice to meet you' },
        { cz: 'výborné', en: 'excellent / delicious' },
        { cz: 'voní', en: 'smells nice' },
        { cz: 'děkuji za pozvání', en: 'thank you for the invitation' },
        { cz: 'smím si vzít víc?', en: 'may I take more?' },
        { cz: 'byl to skvělý oběd', en: 'that was a great lunch' }
      ],
      context: 'You\'re at your partner\'s parents\' home for Sunday lunch. Her mother (paní Nováková) opens the door. Make a good impression! Accents are optional.',
      tip: 'Start with: "Dobry den, pani Novakova. Tesi me." — no special keyboard needed!',
      opening: { text: 'Vítejte, vítejte! Konečně vás vidím. Pojďte dál! 😊', translation: 'Welcome, welcome! I finally get to meet you. Come in!' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'dobry', 'hello', 'ahoj', 'hi', 'good'], text: 'Dobrý den! Těší mě. Slyšela jsem o vás tolik! Jak se máte?', translation: 'Hello! Nice to meet you. I\'ve heard so much about you! How are you?', next: 'greeting', positive: true }
          ],
          fallback: { text: 'Prosím? Zkuste mě pozdravit! (Try: "Dobry den, pani Novakova")', translation: 'Pardon? Try greeting her! (No special characters needed)' }
        },
        greeting: {
          responses: [
            { triggers: ['tesi me', 'nice to meet', 'pleased', 'tesi'], text: 'I mě! Přinesl jste něco s sebou?', translation: 'Me too! Did you bring something?', next: 'gift', positive: true },
            { triggers: ['vino', 'wine', 'flowers', 'kytky', 'cokolada', 'chocolate', 'prinesl', 'brought', 'darky', 'gift'], text: 'Ach, to je milé! Pojďte dál, ukáži vám dům.', translation: 'Oh, how nice! Come in, I\'ll show you the house.', next: 'house', positive: true },
            { triggers: ['mam se', 'dobre', 'fine', 'good', 'dobry'], text: 'Ráda slyším! Přinesl jste nám něco? Haha — no, jsem jen zvědavá.', translation: 'Glad to hear it! Did you bring something? Haha — just curious.', next: 'gift' }
          ],
          fallback: { text: 'Jak se máte? A přinesl jste nám něco? 😊', translation: 'How are you? And did you bring anything? (Try: "tesi me" or mention you brought wine/flowers)' }
        },
        gift: {
          responses: [
            { triggers: ['vino', 'wine', 'prinesl', 'tady', 'here', 'pro vas', 'flowers', 'cokolada', 'gift', 'small'], text: 'Výborně! Manžel bude rád. Pojďte ke stolu — polévka je hotová!', translation: 'Excellent! My husband will be pleased. Come to the table — soup is ready!', next: 'soup', positive: true },
            { triggers: ['malickost', 'nothing much', 'malicko', 'small thing'], text: 'Neberte to tak! Jsme rádi, že jste přišel. Pojďte ke stolu.', translation: 'Don\'t say that! We\'re happy you came. Come to the table.', next: 'soup', positive: true }
          ],
          fallback: { text: 'Sedněte si. Dám vám polévku — máte hlad?', translation: 'Have a seat. I\'ll get you soup — are you hungry? (Mention you brought something, or just say "ano")' }
        },
        soup: {
          responses: [
            { triggers: ['vyborne', 'dobre', 'skvele', 'delicious', 'good', 'great', 'chutne', 'voni', 'vune', 'smells', 'bajechne'], text: 'Děkuji! Dělám ji vždy podle receptu od maminky. Vezmete si víc?', translation: 'Thank you! I always make it with my mother\'s recipe. Will you take more?', next: 'main', positive: true },
            { triggers: ['recept', 'recipe', 'jak', 'how', 'co je', 'what is', 'co to'], text: 'Hovězí vývar se zeleninou. Tajemství je dlouhé vaření. Recept vám pošlu! Teď hlavní chod.', translation: 'Beef broth with vegetables. The secret is long cooking. I\'ll send you the recipe! Now the main course.', next: 'main', positive: true }
          ],
          fallback: { text: 'Tak jak je ta polévka? Chutná vám? 🍲', translation: 'How is the soup? Do you like it? (Try: "Je to vyborne!")' }
        },
        main: {
          responses: [
            { triggers: ['vyborne', 'skvele', 'bajechne', 'fantastic', 'amazing', 'delicious', 'fantasticke', 'dobre', 'vytecne', 'nejlepsi'], text: 'To mě těší! Svíčková se dělá tři hodiny. Víc? Musíte sníst víc!', translation: 'That makes me happy! The svíčková takes three hours. More? You must eat more!', next: 'main', positive: true },
            { triggers: ['recept', 'recipe', 'naucit', 'learn', 'jak', 'how to'], text: 'Ha! První cizinec, co žádá o recept. Musíte přijít znovu a já vám ukážu!', translation: 'Ha! First foreigner to ask for the recipe. You must come again and I\'ll show you!', next: 'dessert', positive: true },
            { triggers: ['vic', 'more', 'jeste', 'another', 'druhy', 'second'], text: 'Samozřejmě! Tady — jezte, jezte! Jste příliš hubený!', translation: 'Of course! Here — eat, eat! You\'re too thin!', next: 'dessert', positive: true },
            { triggers: ['dost', 'enough', 'plny', 'full', 'syt'], text: 'Ale, ale! Ještě malý kousek? Mám koláč!', translation: 'Oh come on! Just a small piece more? I have cake!', next: 'dessert' }
          ],
          fallback: { text: 'Jak vám chutná svíčková? A vezmete si víc? 😊', translation: 'How do you like the svíčková? Take more? (Say "vyborne" to compliment it!)' }
        },
        dessert: {
          responses: [
            { triggers: ['dekuji', 'thank you', 'diky', 'skvele', 'vyborne', 'obed', 'lunch', 'pozvani', 'invitation', 'byl', 'bylo'], text: 'Rádi! Musíte přijít znovu — příště vepřo knedlo zelo. A přiveďte tu svoji slečnu! 😊', translation: 'Our pleasure! Come again — next time roast pork! And bring your lady! 😊 (You passed! 🎉)', next: 'done', positive: true },
            { triggers: ['kolac', 'cake', 'dessert', 'dezert', 'ano', 'yes'], text: 'Výborně! Tvarohový koláč. Sedněte si ještě chvíli.', translation: 'Excellent! Cheesecake. Sit a while longer.', next: 'dessert', positive: true }
          ],
          fallback: { text: 'Tak jak vám bylo? Přijdete znovu? 😊', translation: 'How was everything? Will you come again? (Try: "Dekuji za pozvani. Bylo to vyborne.")' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Přijďte brzy znovu! 👋', translation: 'Goodbye! Come back soon! (Excellent — you survived Sunday lunch! 🎉)' }
        }
      }
    }
  };

  // ── SPANISH CHAT SCENARIOS ────────────────────────────

  const SPANISH_SCENARIOS = {
    es_tapas: {
      language: 'spanish',
      persona: {
        name: 'Paco',
        role: 'Barman — Tapas Bar Madrid',
        avatar: '🧔‍♂️',
        description: 'Paco has been behind this bar for 20 years. Fast, efficient, a little gruff. He respects people who know what they want and order it properly.'
      },
      vocabulary: [
        { cz: 'ponme', en: 'get me / pour me' },
        { cz: 'una caña', en: 'a small draft beer' },
        { cz: '¿me cobras?', en: 'can I pay?' },
        { cz: 'venga', en: 'alright / come on then' },
        { cz: '¡salud!', en: 'cheers!' },
        { cz: 'marchando', en: 'coming right up!' }
      ],
      context: 'You\'re at a classic tapas bar in Madrid. Paco is the barman. Try ordering a drink, some tapas, and paying the bill. In Spanish!',
      tip: 'Start with "Buenas" (short for buenas tardes/días — always works). Then: "Ponme una caña, por favor."',
      opening: { text: '¿Qué te pongo? 🍺', translation: 'What can I get you?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenas', 'buenos dias', 'buenas tardes', 'hola', 'hello', 'hi', 'good'], text: '¡Buenas! ¿Qué te pongo?', translation: 'Hello! What can I get you?', next: 'order', positive: true }
          ],
          fallback: { text: '¡Ey! Salúdame primero, hombre. 😄', translation: 'Hey! Greet me first, man. (Try: "Buenas" or "Hola")' }
        },
        order: {
          responses: [
            { triggers: ['cana', 'caña', 'cerveza', 'beer', 'lager', 'birra', 'mahou', 'estrella', 'cruzcampo'], text: '¡Marchando una caña! ¿Y para picar algo?', translation: 'One beer coming up! And something to snack on?', next: 'tapas', positive: true },
            { triggers: ['vino', 'wine', 'tinto', 'blanco', 'rosado'], text: 'Vino tinto o blanco?', translation: 'Red or white wine?', next: 'tapas' },
            { triggers: ['agua', 'water', 'zumo', 'juice', 'cafe', 'coffee'], text: 'Claro. ¿Y algo para comer?', translation: 'Sure. And something to eat?', next: 'tapas', positive: true },
            { triggers: ['carta', 'menu', 'tapas', 'que teneis', 'que tienen', 'que hay'], text: 'Bravas, croquetas, calamares, jamón, tortilla... ¿Qué quieres?', translation: 'Bravas, croquettes, calamari, jamón, tortilla... What do you want?', next: 'tapas' }
          ],
          fallback: { text: '¿Qué te pongo? ¿Una caña? ¿Vino? 🤷', translation: 'What can I get you? A beer? Wine? (Try: "Ponme una cana, por favor")' }
        },
        tapas: {
          responses: [
            { triggers: ['bravas', 'patatas', 'potatoes'], text: '¡Marchando unas bravas! ¿Algo más?', translation: 'Patatas bravas coming up! Anything else?', next: 'eating', positive: true },
            { triggers: ['croquetas', 'croquettes', 'jamon', 'ham'], text: '¡Unas croquetas de jamón, marchando! Las mejores del barrio.', translation: 'Ham croquettes coming up! Best in the neighbourhood.', next: 'eating', positive: true },
            { triggers: ['calamares', 'calamari', 'squid', 'tortilla'], text: '¡Marchando! Fresquito, fresquito.', translation: 'Coming up! Fresh, fresh.', next: 'eating', positive: true },
            { triggers: ['no', 'nada', 'nothing', 'solo', 'only', 'just', 'sin comida'], text: 'Como quieras. Aquí tienes.', translation: 'As you wish. Here you go.', next: 'eating', positive: true }
          ],
          fallback: { text: '¿Qué tapas quieres? Bravas, croquetas, calamares...', translation: 'What tapas do you want? Bravas, croquettes, calamari...' }
        },
        eating: {
          responses: [
            { triggers: ['cobras', 'cuenta', 'pay', 'pagar', 'bill', 'check', 'cuanto es', 'cuanto'], text: 'Seis con cincuenta. ¿Pagas en efectivo o con tarjeta?', translation: 'Six fifty. Paying cash or card?', next: 'paying', positive: true },
            { triggers: ['otra', 'another', 'mas', 'more', 'cana', 'cerveza', 'beer'], text: '¡Marchando otra! 🍺 ¡Salud!', translation: 'Another one coming up! Cheers!', next: 'eating', positive: true },
            { triggers: ['salud', 'cheers', 'toast', 'brindo'], text: '¡Salud! 🍺 ¡Que aproveche!', translation: 'Cheers! Enjoy your food!', next: 'eating', positive: true },
            { triggers: ['bueno', 'rico', 'buenisimo', 'delicious', 'good', 'great', 'riquísimo'], text: '¡Me alegra! Las bravas las hago yo mismo. Secreto de la casa.', translation: 'Glad to hear it! I make the bravas myself. House secret.', next: 'eating', positive: true }
          ],
          fallback: { text: '¿Todo bien? ¿Quieres algo más? O: "me cobras" para la cuenta.', translation: 'All good? Want anything else? Or say "me cobras" for the bill.' }
        },
        paying: {
          responses: [
            { triggers: ['efectivo', 'cash', 'billetes', 'monedas', 'coins'], text: 'Seis con cincuenta. Gracias, hasta luego. 👋', translation: 'Six fifty. Thanks, see you! (Scenario complete! 🎉)', next: 'done', positive: true },
            { triggers: ['tarjeta', 'card', 'visa', 'mastercard', 'contactless', 'bizum'], text: '¡Claro! Pasa la tarjeta. Hasta luego, campeón. 😄', translation: 'Of course! Tap your card. See you, champ! (Scenario complete! 🎉)', next: 'done', positive: true },
            { triggers: ['quedate', 'cambio', 'keep', 'no hay'], text: '¡Muy bien! Gracias. Vuelve cuando quieras. 😊', translation: 'Very good! Thanks. Come back whenever. (Scenario complete! 🎉)', next: 'done', positive: true }
          ],
          fallback: { text: '¿Efectivo o tarjeta? (cash = "efectivo", card = "tarjeta")', translation: 'Cash or card?' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Hasta luego! Vuelve pronto. 👋', translation: 'See you! Come back soon. (Tapas bar scenario complete! 🎉)' }
        }
      }
    },

    es_family: {
      language: 'spanish',
      persona: {
        name: 'Señora García',
        role: 'La madre — Your partner\'s mother',
        avatar: '👩‍🍳',
        description: 'Warm, enthusiastic, and she\'s been cooking since 10am. Three generations at the table. She will feed you until you can\'t move, and consider it love.'
      },
      vocabulary: [
        { cz: 'encantado/a', en: 'pleased to meet you (m/f)' },
        { cz: '¡qué rico!', en: 'how delicious!' },
        { cz: 'buenísimo', en: 'absolutely delicious' },
        { cz: 'muchas gracias por invitarme', en: 'thank you so much for having me' },
        { cz: '¿me da la receta?', en: 'can I have the recipe?' },
        { cz: 'usted', en: 'formal "you" — use with elders' }
      ],
      context: 'You\'re at your partner\'s Spanish family home for Sunday lunch. The señora opens the door. The paella has been simmering since morning. Time to impress!',
      tip: 'Start with: "Buenas tardes, señora Garcia. Encantado/a." — and mention you brought something!',
      opening: { text: '¡Hola, hola! ¡Pasa, pasa, qué alegría! 😊', translation: 'Hello, hello! Come in, come in, how wonderful!' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenas', 'buenos dias', 'buenas tardes', 'hola', 'hello', 'good afternoon', 'good morning'], text: '¡Buenas tardes! ¡Qué gusto verte! ¿Eres el/la de quien tanto habla nuestra Lucía?', translation: 'Good afternoon! How lovely to see you! Are you the one our Lucía talks about so much?', next: 'greeting', positive: true }
          ],
          fallback: { text: '¿Sí? ¿Quién es? ¡Saluda, saluda! 😄', translation: 'Yes? Who is it? Say hello! 😄 (Try: "Buenas tardes, señora Garcia")' }
        },
        greeting: {
          responses: [
            { triggers: ['encantado', 'encantada', 'mucho gusto', 'placer', 'pleasure', 'nice to meet'], text: '¡Igualmente! Lucía nos ha hablado mucho de ti. ¿Traes algo?', translation: 'Likewise! Lucía has told us a lot about you. Did you bring something?', next: 'gift', positive: true },
            { triggers: ['vino', 'wine', 'flores', 'flowers', 'pastel', 'cake', 'chocolate', 'traje', 'brought', 'regalo', 'gift'], text: '¡Ay, qué detalle! No tenías que traer nada. ¡Pasa, pasa!', translation: 'Oh, how thoughtful! You didn\'t have to bring anything. Come in, come in!', next: 'setup', positive: true }
          ],
          fallback: { text: '¿Cómo te llamas? ¡Y qué guapo/guapa! 😊', translation: 'What\'s your name? And how handsome/beautiful! (Try: "Encantado/a, soy [name]")' }
        },
        gift: {
          responses: [
            { triggers: ['vino', 'wine', 'flores', 'flowers', 'algo', 'something', 'traje', 'brought', 'si', 'yes', 'aqui'], text: '¡Mira qué detalle! Pasa, que te presento al resto de la familia.', translation: 'What a lovely gesture! Come in, let me introduce you to the rest of the family.', next: 'setup', positive: true },
            { triggers: ['no', 'nothing', 'nada', 'olvide', 'forgot'], text: 'No importa, ¡lo importante es que estás aquí! Pasa, pasa.', translation: 'Doesn\'t matter, the important thing is you\'re here! Come in, come in.', next: 'setup' }
          ],
          fallback: { text: 'El señor García quiere conocerte. ¡Pasa al salón!', translation: 'Mr. García wants to meet you. Come into the living room!' }
        },
        setup: {
          responses: [
            { triggers: ['placer', 'pleasure', 'gusto', 'honor', 'encantado', 'hablo', 'talked', 'habla'], text: '¡Igualmente! Siéntate. La paella ya casi está. ¿Tienes hambre?', translation: 'Likewise! Sit down. The paella is almost ready. Are you hungry?', next: 'food', positive: true },
            { triggers: ['si', 'yes', 'hambre', 'hungry', 'mucho', 'claro', 'por supuesto'], text: '¡Perfecto! ¡A la mesa! La paella no espera.', translation: 'Perfect! To the table! The paella won\'t wait.', next: 'food', positive: true }
          ],
          fallback: { text: '¡A la mesa! La paella se está enfriando. 🥘', translation: 'To the table! The paella is getting cold. 🥘' }
        },
        food: {
          responses: [
            { triggers: ['rico', 'bueno', 'buenisimo', 'delicious', 'amazing', 'fantastico', 'que rico', 'riquísimo', 'excelente', 'increible'], text: '¡Me alegra mucho! La paella la hago igual que mi madre — con todo el amor. ¿Más?', translation: 'I\'m so glad! I make the paella just like my mother — with all the love. More?', next: 'food', positive: true },
            { triggers: ['receta', 'recipe', 'como', 'how', 'ensenme', 'teach', 'aprende'], text: '¡Eres el primero que me pide la receta! Tienes que volver y te enseño yo misma.', translation: 'You\'re the first one to ask for the recipe! You have to come back and I\'ll teach you myself.', next: 'dessert', positive: true },
            { triggers: ['mas', 'more', 'otro', 'another', 'segunda', 'second', 'si', 'yes'], text: '¡Claro que sí! Toma, toma — ¡come, come!', translation: 'Of course! Here, here — eat, eat!', next: 'dessert', positive: true },
            { triggers: ['lleno', 'full', 'no puedo', 'enough', 'demasiado', 'too much'], text: '¡Pero un poquito más! Tengo flan de postre...', translation: 'But just a little more! I have flan for dessert...', next: 'dessert' }
          ],
          fallback: { text: '¿Qué te parece la paella? ¿Está buena? 🥘', translation: 'What do you think of the paella? Is it good? (Try: "Esta buenisimo!")' }
        },
        dessert: {
          responses: [
            { triggers: ['gracias', 'muchas gracias', 'thank you', 'thanks', 'invitar', 'invitacion', 'comida', 'almuerzo', 'lunch', 'todo', 'sido'], text: '¡A nosotros! Tienes que volver el mes que viene — hago cocido. ¡Y trae a Lucía! 😊', translation: 'Our pleasure! You must come back next month — I\'ll make cocido. And bring Lucía! 😊 (You passed! 🎉)', next: 'done', positive: true },
            { triggers: ['flan', 'postre', 'dessert', 'si', 'yes', 'claro', 'por favor'], text: '¡Mira qué contenta me pones! Flan casero con caramelo. Siéntate un ratito más.', translation: 'Look how happy you make me! Homemade flan with caramel. Sit a little longer.', next: 'dessert', positive: true }
          ],
          fallback: { text: '¿Lo has pasado bien? ¿Vuelves pronto? 😊', translation: 'Did you have a good time? Will you come back soon? (Try: "Ha sido un placer, muchas gracias por invitarme.")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Hasta pronto! ¡Vuelve cuando quieras! 👋', translation: 'See you soon! Come back whenever! (Sunday lunch scenario complete! 🎉)' }
        }
      }
    }
  };

  // Merge all scenarios
  const ALL_CHAT_SCENARIOS = { ...CZECH_SCENARIOS, ...SPANISH_SCENARIOS };

  // ── STATE MANAGEMENT ──────────────────────────────────
  let currentState = 'start';
  let messageCount = 0;
  let correctionsGiven = 0;
  let currentScenario = null;
  let currentScenarioId = null;

  // ── PUBLIC API ─────────────────────────────────────────

  function init(scenarioId) {
    // Check if scenario has a chat, otherwise fall back to pub or es_tapas
    if (!ALL_CHAT_SCENARIOS[scenarioId]) {
      // Fallback: pick same language default
      const meta = (typeof SCENARIOS !== 'undefined')
        ? SCENARIOS.find(s => s.id === scenarioId)
        : null;
      const lang = meta ? meta.language : 'czech';
      scenarioId = lang === 'spanish' ? 'es_tapas' : 'pub';
    }

    currentScenarioId = scenarioId;
    currentScenario = ALL_CHAT_SCENARIOS[scenarioId];
    currentState = 'start';
    messageCount = 0;
    correctionsGiven = 0;

    return {
      persona: currentScenario.persona,
      vocabulary: currentScenario.vocabulary,
      context: currentScenario.context,
      tip: currentScenario.tip,
      opening: currentScenario.opening,
      language: currentScenario.language
    };
  }

  function checkCorrections(input) {
    if (!currentScenario || !currentScenario.corrections) return null;
    for (const c of currentScenario.corrections) {
      if (c.test(input)) {
        correctionsGiven++;
        return { wrong: c.wrong, right: c.right, explain: c.explain };
      }
    }
    return null;
  }

  function findResponse(input, stateKey) {
    const state = currentScenario.states[stateKey];
    if (!state) return null;
    for (const r of state.responses) {
      if (r.triggers.some(t => matches(input, t))) return r;
    }
    return null;
  }

  function process(userInput) {
    if (!currentScenario) return { response: { text: 'Error: no scenario loaded.', translation: '' }, correction: null };

    messageCount++;
    const correction = checkCorrections(userInput);
    const match = findResponse(userInput, currentState);

    let response;
    let nextState = currentState;

    if (match) {
      response = { text: match.text, translation: match.translation, positive: match.positive || false };
      nextState = match.next || currentState;
    } else {
      const fallback = currentScenario.states[currentState]?.fallback;
      response = fallback
        ? { text: fallback.text, translation: fallback.translation, positive: false }
        : { text: '...', translation: 'I didn\'t understand that. Try again!', positive: false };
    }

    currentState = nextState;

    let encouragement = null;
    if (messageCount === 3 && correctionsGiven === 0) {
      encouragement = 'Great start — your ' + (currentScenario.language === 'spanish' ? 'Spanish' : 'Czech') + ' is looking solid!';
    } else if (currentState === 'done') {
      encouragement = 'Scenario complete! You nailed it. 🎉';
    }

    return { response, correction, encouragement, state: currentState };
  }

  function getAvailableScenarios() {
    return ALL_CHAT_SCENARIOS;
  }

  function hasChatSupport(scenarioId) {
    return !!ALL_CHAT_SCENARIOS[scenarioId];
  }

  return { init, process, getAvailableScenarios, hasChatSupport };

})();
