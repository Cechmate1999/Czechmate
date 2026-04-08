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
  // Note: "quiero" is NOT corrected — it's perfectly valid in Latin America
  // and across Spanish. Only universal grammar errors are flagged here.
  const ES_CORRECTIONS = [
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
    },

    police: {
      language: 'czech',
      persona: {
        name: 'Paní Horáková',
        role: 'Úřednice — Foreign Police Officer',
        avatar: '👮‍♀️',
        description: 'She has processed thousands of residence permit extensions. She is not unkind — she is thorough. Polite persistence and organized documents are the only currency that works here.'
      },
      vocabulary: [
        { cz: 'povolení k pobytu', en: 'residence permit' },
        { cz: 'chybí vám', en: 'you are missing' },
        { cz: 'doklady', en: 'documents' },
        { cz: 'formulář', en: 'form / application' },
        { cz: 'nerozumím', en: 'I don\'t understand' },
        { cz: 'můžete to napsat?', en: 'can you write that down?' },
        { cz: 'kdy přijde rozhodnutí?', en: 'when will the decision come?' },
        { cz: 'potvrzení o příjmu', en: 'proof of income' }
      ],
      context: 'You\'re at the Czech Foreign Police to renew your residence permit. Paní Horáková is your officer. Be polite, systematic, and don\'t panic when something is "missing." Accents optional!',
      tip: 'Start with "Dobry den" then state your purpose: "Prisel jsem kvuli prodlouzeni povoleni k pobytu."',
      opening: { text: 'Další! Co potřebujete? 📋', translation: 'Next! What do you need?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'dobry', 'hello', 'ahoj', 'good morning', 'good day', 'dobrý'], text: 'Dobrý den. Co potřebujete?', translation: 'Good day. What do you need?', next: 'purpose', positive: true }
          ],
          fallback: { text: 'Haló? Jsem zaneprázdněná. Pozdravte mě, prosím.', translation: 'Hello? I\'m busy. Please greet me first. (Try: "Dobry den")' }
        },
        purpose: {
          responses: [
            { triggers: ['prodlouzeni', 'extension', 'prolong', 'pobyt', 'permit', 'residence', 'povoleni', 'pobytove', 'viza', 'visa'], text: 'Prodloužení pobytu. Dobře. Máte pas, fotografii, formulář a potvrzení o ubytování?', translation: 'Residence extension. Fine. Do you have passport, photo, form and proof of accommodation?', next: 'documents', positive: true },
            { triggers: ['nevim', 'help', 'pomoc', 'co potrebuji', 'what', 'co', 'need', 'chci'], text: 'Co přesně? Prodloužení pobytu? Registrace? Řekněte mi.', translation: 'What exactly? Residence extension? Registration? Tell me. (Try: "prodlouzeni povoleni k pobytu")' }
          ],
          fallback: { text: 'Řekněte mi účel návštěvy. (Try: "Prisel jsem kvuli prodlouzeni povoleni k pobytu")', translation: 'Tell me the purpose of your visit. (Try stating you\'re here for a residence permit extension)' }
        },
        documents: {
          responses: [
            { triggers: ['ano', 'yes', 'mam', 'vsechno', 'all', 'here', 'tady', 'mám', 'dokumenty', 'prepared'], text: 'Hmm. Chybí vám potvrzení o příjmu. Máte výpis ze mzdy nebo pracovní smlouvu?', translation: 'Hmm. You\'re missing proof of income. Do you have a pay slip or work contract?', next: 'missing_doc', positive: true },
            { triggers: ['pas', 'passport', 'fotografie', 'photo', 'formular', 'form', 'ubytovani', 'accommodation'], text: 'Dobrý. A ještě formulář a potvrzení o ubytování — vše máte?', translation: 'Good. And the form and proof of accommodation — do you have those too?', next: 'documents', positive: true }
          ],
          fallback: { text: 'Ukažte mi doklady. Pas, fotku, formulář a ubytování?', translation: 'Show me your documents. Passport, photo, form and accommodation? (Say "ano, mam" to continue)' }
        },
        missing_doc: {
          responses: [
            { triggers: ['mam', 'yes', 'ano', 'tady', 'here', 'smlouva', 'contract', 'pracovni', 'work', 'zamestnavatel', 'employer', 'mzda', 'salary'], text: 'Dobře. Ukažte. Hmm... v pořádku. Ještě kopii smlouvy, prosím.', translation: 'Fine. Show me. Hmm... alright. One copy of the contract, please.', next: 'provide_doc', positive: true },
            { triggers: ['nerozumim', 'understand', 'co', 'what', 'jaky', 'which', 'explain', 'vysvetlit', 'napsat', 'write', 'pomaleji', 'slowly'], text: 'Potvrzení o příjmu — výpis ze mzdy nebo pracovní smlouva. Rozumíte?', translation: 'Proof of income — pay slip or work contract. Do you understand?', next: 'provide_doc', positive: true },
            { triggers: ['nemam', 'no', 'dont have', 'forgot', 'zapomenout', 'left', 'home', 'doma'], text: 'Bohužel bez toho nemohu pokračovat. Přijďte příště s dokladem o příjmu.', translation: 'Unfortunately without that I cannot continue. Come back next time with proof of income.', next: 'waiting' }
          ],
          fallback: { text: 'Potvrzení o příjmu je nutné. Máte pracovní smlouvu? (Say "mam smlouva" or "nerozumim")', translation: 'Proof of income is required. Do you have a work contract?' }
        },
        provide_doc: {
          responses: [
            { triggers: ['prosim', 'please', 'tady', 'here', 'take', 'predavam', 'dame', 'dej', 'giving', 'tady je'], text: 'Děkuji. Vše v pořádku. Rozhodnutí přijde poštou do 60 dní.', translation: 'Thank you. Everything in order. The decision will come by post within 60 days.', next: 'waiting', positive: true },
            { triggers: ['kdy', 'when', 'jak dlouho', 'how long', 'rozhodnuti', 'decision', 'vysledek', 'result'], text: 'Do 60 dní od podání žádosti. Dostanete dopis na adresu v dokladech.', translation: 'Within 60 days of the application. You\'ll receive a letter at the address in your documents.', next: 'waiting', positive: true }
          ],
          fallback: { text: 'Předejte mi doklady, prosím. (Say "tady prosim" to hand them over)', translation: 'Please hand me the documents.' }
        },
        waiting: {
          responses: [
            { triggers: ['dekuji', 'thank', 'diky', 'nashledanou', 'goodbye', 'bye', 'rozumel', 'understood', 'ok', 'dobře', 'clear', 'jasne'], text: 'Nashledanou. Sledujte poštu. Přijďte, až dostanete dopis. 📋', translation: 'Goodbye. Watch your post. Come back when you receive the letter. (Czech bureaucracy survived! 🎉)', next: 'done', positive: true },
            { triggers: ['kdy', 'when', 'problem', 'issue', 'chybi', 'missing', 'dalsi', 'next', 'dotaz', 'question'], text: 'Rozhodnutí do 60 dní. Máte ještě otázku?', translation: 'Decision within 60 days. Do you have another question?', next: 'waiting' }
          ],
          fallback: { text: 'Máte ještě dotaz? Nebo: "Dekuji, nashledanou."', translation: 'Any more questions? Or try: "Dekuji, nashledanou."' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Hodně štěstí. 📋', translation: 'Goodbye! Good luck. (Foreign police scenario complete! 🎉)' }
        }
      }
    },

    office: {
      language: 'czech',
      persona: {
        name: 'Pavel',
        role: 'Kolega — Czech Colleague',
        avatar: '👨‍💻',
        description: 'Pavel has worked here 6 years. He\'s not unfriendly — he\'s Czech. Dry humor, efficient, and the one who knows the best lunch spot. Get in with Pavel and you\'re in.'
      },
      vocabulary: [
        { cz: 'nastoupil jsem', en: 'I started (work)' },
        { cz: 'zatím dobrý', en: 'so far so good' },
        { cz: 'těší mě', en: 'nice to meet you' },
        { cz: 'kde tu dobře vaří?', en: 'where\'s good food around here?' },
        { cz: 'jdeme na oběd?', en: 'shall we go for lunch?' },
        { cz: 'učím se česky', en: 'I\'m learning Czech' }
      ],
      context: 'It\'s your first week at a Prague office. Pavel, a Czech colleague, approaches you. Keep it understated and genuine — "zatím dobrý" beats "I love it here!" every time.',
      tip: 'Start with "Dobry den" and introduce yourself calmly. Czechs respect honesty over enthusiasm.',
      opening: { text: 'Dobrý den. Vy jste ten nový, co? 👋', translation: 'Hello. You\'re the new one, right?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'ahoj', 'hello', 'hi', 'good', 'ano', 'yes', 'jsem', 'i am', 'novy', 'new'], text: 'Já jsem Pavel. Jak se jmenujete?', translation: 'I\'m Pavel. What\'s your name?', next: 'name', positive: true }
          ],
          fallback: { text: 'Haló? Pozdravte mě! (Try: "Dobry den, jsem [name]")', translation: 'Hello? Greet me first! (Try: "Dobry den, jsem [your name]")' }
        },
        name: {
          responses: [
            { triggers: ['jsem', 'i am', 'jmenuji', 'my name', 'jmeno', 'name', 'tesi me', 'nice to meet', 'pleased', 'hello', 'ahoj'], text: 'Těší mě. Jak se vám tu líbí? První týden, ne?', translation: 'Nice to meet you. How do you like it here? First week, right?', next: 'impression', positive: true }
          ],
          fallback: { text: 'Promiňte — jak se jmenujete? (Just say your name!)', translation: 'Sorry — what\'s your name? (Try: "Jsem Tom, tesi me.")' }
        },
        impression: {
          responses: [
            { triggers: ['zatim', 'so far', 'fajn', 'ok', 'dobry', 'good', 'dobre', 'ujde'], text: 'To je upřímné. Česky umíte trochu?', translation: 'That\'s honest. Do you speak a bit of Czech?', next: 'czech_attempt', positive: true },
            { triggers: ['skvele', 'amazing', 'great', 'uzasne', 'wonderful', 'love it', 'super'], text: 'Hmm. Tak uvidíme za měsíc. 😄 Česky umíte?', translation: 'Hmm. We\'ll see in a month. 😄 Do you speak Czech?', next: 'czech_attempt' },
            { triggers: ['tezke', 'hard', 'slozite', 'difficult', 'complicated', 'struggle', 'hodne prace'], text: 'Je to normální. Přijde to. Česky umíte trochu?', translation: 'That\'s normal. It comes with time. Do you speak a bit of Czech?', next: 'czech_attempt', positive: true }
          ],
          fallback: { text: 'Jak se vám tu líbí? (Try: "Zatim dobry" = so far so good)', translation: 'How do you like it here? (Try: "Zatim dobry")' }
        },
        czech_attempt: {
          responses: [
            { triggers: ['trochu', 'a little', 'malinko', 'ucim se', 'learning', 'zkusim', 'try', 'snazim', 'ano', 'yes', 'jeste se ucim'], text: 'Dobrý! Respekt. Jdeme na oběd ve dvanáct — chcete jít s námi?', translation: 'Good! Respect. We\'re going for lunch at twelve — do you want to come?', next: 'lunch', positive: true },
            { triggers: ['ne', 'no', 'nemluvim', 'neumim', 'dont speak', 'jen anglicky', 'only english'], text: 'Škoda. Začínáme na "pivo" — snadné. 😄 Jdeme na oběd — chcete jít?', translation: 'Shame. We start with "pivo" — easy. 😄 We\'re going for lunch — want to join?', next: 'lunch' }
          ],
          fallback: { text: 'Umíte česky? (Try: "Trochu" or "Ucim se" = I\'m learning)', translation: 'Do you know any Czech? (Try: "Trochu" or "Ucim se")' }
        },
        lunch: {
          responses: [
            { triggers: ['jo', 'ano', 'yes', 'rad', 'sure', 'dobry', 'dobre', 'rád', 'samozrejme', 'of course', 'pojdme', 'chci'], text: 'Super. Ve dvanáct u výtahu. Tady je dobrá hospůdka — svíčková za 149. 👍', translation: 'Great. At twelve by the lift. There\'s a good pub nearby — svíčková for 149. 👍', next: 'lunch_detail', positive: true },
            { triggers: ['ne', 'no', 'nemuzem', 'cant', 'busy', 'zaneprazdneny', 'prace', 'work', 'mam schuzku'], text: 'Dobře. Zítra snad. Kafe chcete aspoň?', translation: 'Alright. Maybe tomorrow. Want at least a coffee?', next: 'coffee' }
          ],
          fallback: { text: 'Jdeme na oběd? Ano nebo ne? 😄 (Try: "Jo, rad!" or "Ne, nemuzem")', translation: 'Coming for lunch? Yes or no? 😄' }
        },
        lunch_detail: {
          responses: [
            { triggers: ['skvele', 'great', 'dobre', 'good', 'vyborne', 'excellent', 'dekuji', 'thanks', 'diky', 'kde', 'where', 'svickova', 'fajn', 'super'], text: 'Výborně. A na víkend — jste v Praze? Jde se na fotbal, pokud chcete.', translation: 'Excellent. And on the weekend — are you in Prague? We\'re going to a match if you\'re interested.', next: 'done', positive: true }
          ],
          fallback: { text: 'Tak ve dvanáct u výtahu. Těšíte se? (Say "skvele" or "dobre")', translation: 'See you at twelve by the lift. Looking forward? (Say something positive!)' }
        },
        coffee: {
          responses: [
            { triggers: ['ano', 'yes', 'jo', 'sure', 'kafe', 'coffee', 'prosim', 'please', 'rad', 'dobre'], text: 'Dobrý. Já dám dvě. Tak vítejte v kolektivu. Těší mě.', translation: 'Good. I\'ll grab two. Welcome to the team. Nice to meet you.', next: 'done', positive: true },
            { triggers: ['ne', 'no', 'dekuji', 'thanks', 'diky', 'nechci', 'dont want'], text: 'Žádný problém. Tak zítra na oběd. Nashledanou!', translation: 'No problem. Tomorrow for lunch then. Goodbye!', next: 'done' }
          ],
          fallback: { text: 'Kafe? Ano nebo ne?', translation: 'Coffee? Yes or no?' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Vítejte v kolektivu. 😄', translation: 'Goodbye! Welcome to the team. (Office scenario complete! 🎉)' }
        }
      }
    },

    date: {
      language: 'czech',
      persona: {
        name: 'Anička',
        role: 'Vaše rande — Your Czech date',
        avatar: '❤️',
        description: 'Warm but not easily impressed. She values authenticity over performance. The fact that you\'re learning Czech already earns you points — don\'t blow it by being fake or planning-free.'
      },
      vocabulary: [
        { cz: 'vypadáš skvěle', en: 'you look great' },
        { cz: 'snažím se', en: 'I\'m trying' },
        { cz: 'líbí se mi tady', en: 'I like it here' },
        { cz: 'máš chuť na...?', en: 'are you in the mood for...?' },
        { cz: 'bylo to moc fajn', en: 'it was really nice' },
        { cz: 'uvidíme se znovu?', en: 'will we see each other again?' }
      ],
      context: 'First date with Anička. You\'re meeting at a bar in Vinohrady. Keep it genuine, have a plan, and try some Czech — she\'ll respect the effort far more than perfection.',
      tip: 'Start by greeting her. Then pay a compliment: "Vypadáš skvěle." No accents needed!',
      opening: { text: 'Čekal jsi dlouho? 😊', translation: 'Were you waiting long?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['ne', 'no', 'prave', 'just', 'ted', 'now', 'prave prichazel', 'arrived', 'chvili', 'kratce'], text: 'Fajn! Dobře vypadáš mimochodem. 😊', translation: 'Cool! You look good by the way. 😊', next: 'compliment', positive: true },
            { triggers: ['trochu', 'a little', 'par minut', 'few minutes', 'ano', 'yes', 'chvili', 'a while'], text: 'Promiň! Ale vypadáš skvěle — promíjíš mi?', translation: 'Sorry! But you look great — do you forgive me?', next: 'compliment', positive: true }
          ],
          fallback: { text: 'Čekal jsi dlouho? Odpověz! 😄 (Try: "Ne" or "Trochu")', translation: 'Were you waiting long? Say something! (Try: "Ne" = no, or "Trochu" = a little)' }
        },
        compliment: {
          responses: [
            { triggers: ['vypadaš', 'vypadas', 'skvele', 'great', 'krasna', 'beautiful', 'hezka', 'pretty', 'dobre', 'good', 'wow', 'super'], text: 'Díky! Ty taky. Kam jdeme — máš plán?', translation: 'Thanks! You too. Where are we going — do you have a plan?', next: 'plan', positive: true },
            { triggers: ['taky', 'ty taky', 'you too', 'diky', 'thanks', 'dekuji', 'thank you', 'fajn'], text: 'Haha. Tak kam jdeme? Máš rezervaci?', translation: 'Haha. So where are we going? Do you have a reservation?', next: 'plan', positive: true }
          ],
          fallback: { text: 'Řekni mi něco pěkného! (Try: "Vypadás skvele" = you look great)', translation: 'Say something nice! (Try: "Vypadás skvele")' }
        },
        plan: {
          responses: [
            { triggers: ['rezervace', 'reservation', 'rezervoval', 'booked', 'stul', 'table', 'restaurace', 'restaurant', 'bar', 'kavarna', 'cafe', 'mam misto', 'mam plan', 'zarezervoval'], text: 'Oooh, máš rezervaci! To se mi líbí. Kam přesně?', translation: 'Oooh, you have a reservation! I like that. Where exactly?', next: 'location', positive: true },
            { triggers: ['nevim', 'don\'t know', 'cokoli', 'whatever', 'kam chces', 'where you want', 'tobe', 'uvidime'], text: '"Nevím" není odpověď na první rande. 😅 Zkus navrhnout něco konkrétního!', translation: '"I don\'t know" is not an answer for a first date. 😅 Try suggesting something specific!', next: 'plan' }
          ],
          fallback: { text: 'Máš plán? (Try: "Zarezervoval jsem stul v restauraci" = I booked a table)', translation: 'Do you have a plan? (Try: "Zarezervoval jsem stul" = I booked a table)' }
        },
        location: {
          responses: [
            { triggers: ['vinohrady', 'zizkov', 'mala strana', 'stare mesto', 'dejvice', 'smichov', 'restaurace', 'italiana', 'italian', 'thai', 'french', 'ceska', 'czech', 'sushi', 'japonska', 'tapas', 'bar'], text: 'Dobrá volba! A česky — snažíš se trochu? 😊', translation: 'Good choice! And Czech — are you trying a little? 😊', next: 'czech_attempt', positive: true }
          ],
          fallback: { text: 'Kde máš tu rezervaci? (Say the area or cuisine — e.g. "restaurace v Vinohradech")', translation: 'Where is that reservation? (Say the neighborhood or type of food)' }
        },
        czech_attempt: {
          responses: [
            { triggers: ['snazim', 'try', 'ucim se', 'learning', 'trochu', 'a little', 'ano', 'yes', 'jeste se ucim', 'still learning', 'zkusim', 'snazim se'], text: 'To je tak roztomilé! Proč ses začal učit česky?', translation: 'That\'s so sweet! Why did you start learning Czech?', next: 'reason', positive: true },
            { triggers: ['ne', 'no', 'neumim', 'cant', 'nemluvim', 'dont speak', 'jen anglicky', 'only english'], text: 'Ale to "Vypadáš skvěle" bylo celkem dobré. 😄 Proč ses víc nenaučil?', translation: 'But that "Vypadáš skvěle" was pretty good. 😄 Why haven\'t you learned more?', next: 'reason' }
          ],
          fallback: { text: 'Snažíš se s češtinou? (Try: "Snazim se" or "Ucim se")', translation: 'Are you trying with Czech? (Try: "Snazim se" = I\'m trying)' }
        },
        reason: {
          responses: [
            { triggers: ['libi', 'like', 'mam rad', 'love', 'krasa', 'beautiful', 'zajimava', 'interesting', 'zustat', 'stay', 'zit', 'live', 'kvuli', 'for you', 'prace', 'work', 'firma', 'company'], text: 'Aww. Tak tě musím naučit správně. Opakuj: "Líbíš se mi." Jde to?', translation: 'Aww. Then I\'ll have to teach you properly. Repeat: "Líbíš se mi." Can you say it?', next: 'done', positive: true }
          ],
          fallback: { text: 'Proč ses začal učit česky? (Just say honestly — any reason works!)', translation: 'Why did you start learning Czech? (Just be honest!)' }
        },
        done: {
          responses: [],
          fallback: { text: 'Bylo to moc fajn. Uvidíme se znovu? ❤️', translation: 'It was really nice. Will we see each other again? (Czech date scenario complete! 🎉)' }
        }
      }
    },

    flat: {
      language: 'czech',
      persona: {
        name: 'Paní Horáčková',
        role: 'Majitelka bytu — Landlady',
        avatar: '🏠',
        description: 'She\'s rented to expats before — some were great, some weren\'t. She\'s polite but assessing you. Ask the right questions and she\'ll trust you. Don\'t ask and she\'ll assume you don\'t care.'
      },
      vocabulary: [
        { cz: 'nájem', en: 'rent' },
        { cz: 'kauce', en: 'deposit' },
        { cz: 'účty v ceně', en: 'bills included' },
        { cz: 'volný od...', en: 'available from...' },
        { cz: 'nájemní smlouva', en: 'rental contract' },
        { cz: 'domácí zvíře', en: 'pet' },
        { cz: 'internet', en: 'internet' },
        { cz: 'parkování', en: 'parking' }
      ],
      context: 'You\'re viewing a Prague apartment. Paní Horáčková is the landlady. Ask about rent, bills, deposit, and availability. Don\'t sign anything today.',
      tip: 'Start with "Dobry den" then ask: "Je byt jeste volny?" (Is the apartment still available?)',
      opening: { text: 'Dobrý den! Pojďte dál, ukáži vám byt. 🏠', translation: 'Hello! Come in, I\'ll show you the apartment.' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'ahoj', 'hello', 'hi', 'good'], text: 'Dobrý den! Vítejte. Byt je volný od prvního. Pojďte, ukáži vám.', translation: 'Hello! Welcome. The apartment is available from the first. Come, I\'ll show you.', next: 'overview', positive: true }
          ],
          fallback: { text: 'Haló? Pozdravte mě, prosím! (Try: "Dobry den")', translation: 'Hello? Please greet me! (Try: "Dobry den")' }
        },
        overview: {
          responses: [
            { triggers: ['najem', 'rent', 'kolik', 'how much', 'price', 'cena', 'mesicni', 'monthly'], text: 'Nájem je 18 000 korun měsíčně. Účty jsou zvlášť — asi 3 000.', translation: 'Rent is 18,000 crowns monthly. Bills are separate — about 3,000.', next: 'bills', positive: true },
            { triggers: ['pekny', 'nice', 'krasny', 'beautiful', 'dobry', 'good', 'velky', 'big', 'spacious'], text: 'Děkuji! 55 metrů, druhé patro. A kolik byste chtěl/a platit?', translation: 'Thank you! 55 square meters, second floor. And how much were you looking to pay?', next: 'bills' },
            { triggers: ['ucty', 'bills', 'utilities', 'v cene', 'included', 'plyn', 'gas', 'elektrina', 'electricity'], text: 'Účty jsou zvlášť. Plyn, elektřina, voda — asi 3 000 měsíčně. Je v ceně jen internet.', translation: 'Bills are separate. Gas, electricity, water — about 3,000 monthly. Only internet is included.', next: 'bills', positive: true }
          ],
          fallback: { text: 'Máte otázky? Zeptejte se! (Try: "Kolik je najem?" or "Jsou ucty v cene?")', translation: 'Any questions? Ask away! (Try: "Kolik je najem?" = how much is rent?)' }
        },
        bills: {
          responses: [
            { triggers: ['kauce', 'deposit', 'kauci', 'kolik kauce', 'how much deposit', 'zaruci', 'security'], text: 'Kauce jsou dva měsíční nájmy — 36 000 korun. Vrátím je po skončení nájmu v pořádku.', translation: 'Deposit is two months\' rent — 36,000 crowns. I return it at the end of the tenancy if everything is fine.', next: 'deposit', positive: true },
            { triggers: ['zvire', 'pet', 'pes', 'dog', 'kocka', 'cat', 'povoleno', 'allowed'], text: 'Malá zvířata jsou v pořádku. Pes do 15 kilo bez problému.', translation: 'Small animals are fine. A dog up to 15 kilos, no problem.', next: 'deposit', positive: true },
            { triggers: ['internet', 'wifi', 'rychlost', 'speed', 'optic', 'fiber'], text: 'Internet je zde, optika, 500 Mb. Platíte si sami poskytovatele — ale zapojení je hotové.', translation: 'Internet is here, fiber optic, 500 Mb. You pay the provider yourself — but the connection is ready.', next: 'deposit', positive: true },
            { triggers: ['parkovani', 'parking', 'auto', 'car', 'garaze', 'garage'], text: 'Parkování je na ulici — zdarma do 22:00. Garáž není k dispozici.', translation: 'Parking is on the street — free until 10pm. No garage available.', next: 'deposit', positive: true }
          ],
          fallback: { text: 'Ještě otázky? Kauce, zvířata, parkování, internet? 🏠', translation: 'More questions? Deposit, pets, parking, internet? (Ask anything!)' }
        },
        deposit: {
          responses: [
            { triggers: ['smlouva', 'contract', 'podepsat', 'sign', 'kdy', 'when', 'nastup', 'start', 'od kdy', 'from when'], text: 'Smlouvu bych chtěla podepsat do konce týdne. Nastoupení od prvního.', translation: 'I\'d like to sign the contract by end of the week. Moving in from the first.', next: 'decision', positive: true },
            { triggers: ['rozmyslet', 'think', 'cas', 'time', 'zitra', 'tomorrow', 'promyslet', 'consider', 'uvazovat'], text: 'Samozřejmě, rozmyslete si to. Mám zájem od dalšího zájemce ve čtvrtek.', translation: 'Of course, take time to think. I have another interested party on Thursday.', next: 'decision', positive: true },
            { triggers: ['ok', 'dobre', 'souhlasim', 'agree', 'ano', 'yes', 'mam zajem', 'interested', 'vezmu', 'i\'ll take'], text: 'Výborně! Připravím smlouvu. Potřebuji váš pas a potvrzení o příjmu.', translation: 'Excellent! I\'ll prepare the contract. I need your passport and proof of income.', next: 'done', positive: true }
          ],
          fallback: { text: 'Máte zájem? Nebo chcete čas na rozmyšlenou? (Try: "Mohu si vzit cas do zittra?")', translation: 'Are you interested? Or do you need time to think? (Try: "Mohu si vzit cas do zittra?" = Can I have until tomorrow?)' }
        },
        decision: {
          responses: [
            { triggers: ['dekuji', 'thank', 'diky', 'nashledanou', 'goodbye', 'bye', 'zavolam', 'call', 'ozvu', 'ozvu se', 'touch'], text: 'Nashledanou! Těším se na váš telefon. 🏠', translation: 'Goodbye! Looking forward to your call. (Flat viewing complete! 🎉)', next: 'done', positive: true },
            { triggers: ['vezmu', 'i\'ll take', 'mam zajem', 'interested', 'ano', 'yes', 'souhlasim', 'agree'], text: 'Skvělé! Zašlu vám smlouvu e-mailem dnes večer. Vítejte v bytě! 🏠', translation: 'Great! I\'ll send you the contract by email this evening. Welcome to the apartment! 🎉', next: 'done', positive: true }
          ],
          fallback: { text: 'Takže — zájem? Nebo zavolám zítra? (Say "dekuji, ozvu se" or "mam zajem")', translation: 'So — interested? Or I\'ll call tomorrow? (Try "dekuji" or "mam zajem")' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Těšíme se na vás. 🏠', translation: 'Goodbye! We look forward to having you. (Flat viewing scenario complete! 🎉)' }
        }
      }
    },

    interview: {
      language: 'czech',
      persona: {
        name: 'Pan Novák',
        role: 'Personalista — HR Manager',
        avatar: '💼',
        description: 'Polished, thorough, and not impressed by enthusiasm alone. He\'s seen 200 expat candidates. What gets his attention: concrete results, long-term plans, and the fact that you\'re learning Czech.'
      },
      vocabulary: [
        { cz: 'pracovní zkušenosti', en: 'work experience' },
        { cz: 'silné stránky', en: 'strengths' },
        { cz: 'dlouhodobě', en: 'long-term' },
        { cz: 'spolehlivý', en: 'reliable' },
        { cz: 'nástupní termín', en: 'start date' },
        { cz: 'platové očekávání', en: 'salary expectation' },
        { cz: 'tým', en: 'team' },
        { cz: 'jsem motivovaný', en: 'I\'m motivated' }
      ],
      context: 'You\'re in a job interview at a Prague company. Pan Novák is the HR manager. Be direct, concrete, and signal you\'re serious about staying in Czech Republic. Accents optional.',
      tip: 'Start with "Dobry den" and "Dekuji za pozvani." — it immediately makes a good impression.',
      opening: { text: 'Dobrý den. Jsem rád, že jste přišel. Sedněte si, prosím. 💼', translation: 'Hello. I\'m glad you came. Please have a seat.' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'hello', 'ahoj', 'good morning', 'good day', 'dekuji za pozvani', 'thank you for', 'tesi me'], text: 'Děkuji, že jste přišel. Řekněte mi — proč Česká republika?', translation: 'Thank you for coming. Tell me — why Czech Republic?', next: 'why_cz', positive: true }
          ],
          fallback: { text: 'Pozdravte mě! (Try: "Dobry den. Dekuji za pozvani. Tesi me.")', translation: 'Greet me! (Try: "Dobry den. Dekuji za pozvani." = Thank you for the invitation.)' }
        },
        why_cz: {
          responses: [
            { triggers: ['zustat', 'stay', 'dlouhodoby', 'long term', 'zivot', 'life', 'prilis', 'praze', 'prague', 'republika', 'republic', 'miluju', 'love', 'kariera', 'career'], text: 'Dobře. Dlouhodobé plány jsou důležité. Co je vaše odbornost?', translation: 'Good. Long-term plans are important. What is your area of expertise?', next: 'expertise', positive: true },
            { triggers: ['nevim', 'dont know', 'mozna', 'maybe', 'uvidime', 'we\'ll see', 'zkusit', 'try'], text: 'Hmm. Chceme lidi, kteří plánují zůstat. Zkuste to znovu — proč právě zde?', translation: 'Hmm. We want people planning to stay. Try again — why specifically here?', next: 'why_cz' }
          ],
          fallback: { text: 'Proč Česká republika? (Try: "Chci zustat dlouhodobye" = I want to stay long-term)', translation: 'Why Czech Republic? Tell me your honest reason.' }
        },
        expertise: {
          responses: [
            { triggers: ['it', 'tech', 'software', 'engineering', 'marketing', 'finance', 'management', 'design', 'sales', 'data', 'hr', 'operations', 'let', 'years', 'rok', 'zkusenosti', 'experience', 'pracuji', 'work in'], text: 'Zajímavé. A jaké jsou vaše silné stránky?', translation: 'Interesting. And what are your strengths?', next: 'strengths', positive: true }
          ],
          fallback: { text: 'V jakém oboru pracujete? Kolik let zkušeností máte? (Describe your field and years of experience)', translation: 'What field do you work in? How many years of experience do you have?' }
        },
        strengths: {
          responses: [
            { triggers: ['spolehlivy', 'reliable', 'systematicky', 'systematic', 'tym', 'team', 'komunikace', 'communication', 'analyticky', 'analytical', 'kreativni', 'creative', 'vysledky', 'results', 'organizovany', 'organized'], text: 'Dobré. Učíte se česky? Je to pro nás důležité.', translation: 'Good. Are you learning Czech? That\'s important to us.', next: 'czech_lang', positive: true },
            { triggers: ['workaholic', 'perfectionist', 'too much', 'prilis'], text: 'To je klišé. Řekněte mi skutečnou silnou stránku.', translation: 'That\'s a cliché. Tell me a genuine strength.', next: 'strengths' }
          ],
          fallback: { text: 'Jaké jsou vaše silné stránky? (Try: "Jsem spolehlivy a pracuji systematicky")', translation: 'What are your strengths? (Try: "Jsem spolehlivy" = I\'m reliable)' }
        },
        czech_lang: {
          responses: [
            { triggers: ['ucim se', 'learning', 'studuji', 'studying', 'ano', 'yes', 'trochu', 'a little', 'priorita', 'priority', 'chci mluvit', 'want to speak', 'kurz', 'course'], text: 'Výborně. To je pro nás velký plus. Jaké jsou vaše platové očekávání?', translation: 'Excellent. That\'s a big plus for us. What are your salary expectations?', next: 'salary', positive: true },
            { triggers: ['ne', 'no', 'nemam cas', 'no time', 'anglicky staci', 'english enough', 'later', 'pozdeji'], text: 'Rozumím — ale u nás je čeština důležitá. Bylo by to pro vás reálné?', translation: 'I understand — but Czech is important here. Would that be feasible for you?', next: 'czech_lang' }
          ],
          fallback: { text: 'Učíte se česky? (Try: "Ano, ucim se. Je to moje priorita.")', translation: 'Are you learning Czech? (Try: "Ano, ucim se" = Yes, I\'m learning)' }
        },
        salary: {
          responses: [
            { triggers: ['ocekavam', 'expect', 'korun', 'kc', 'tisic', 'thousand', 'mesicne', 'monthly', 'rocne', 'annual', 'brutto', 'gross', 'netto', 'net', 'number', 'cislo'], text: 'Rozumím. Jsme v rozsahu — to je dobré. Kdy byste mohl/a nastoupit?', translation: 'I understand. We\'re in range — that\'s good. When could you start?', next: 'start', positive: true },
            { triggers: ['flexibilni', 'flexible', 'otevren', 'open', 'dohodnem', 'negotiate', 'trh', 'market'], text: 'Flexibilita je fajn, ale řekněte mi vaši spodní hranici.', translation: 'Flexibility is fine, but tell me your lower limit.', next: 'salary' }
          ],
          fallback: { text: 'Jaká jsou vaše platová očekávání? Řekněte číslo. (Give a number — e.g. "Ocekavam 60 000 korun mesicne")', translation: 'What are your salary expectations? Give a number.' }
        },
        start: {
          responses: [
            { triggers: ['ihned', 'immediately', 'hned', 'now', 'mesic', 'month', 'dva mesice', 'two months', 'tri tydny', 'three weeks', 'pristi', 'next', 'dohodnem', 'negotiate', 'flexibilni', 'flexible'], text: 'Výborně. Budeme vás kontaktovat do konce týdne. Máte ještě otázky na nás?', translation: 'Excellent. We\'ll contact you by end of the week. Do you have any questions for us?', next: 'questions', positive: true }
          ],
          fallback: { text: 'Kdy byste mohl nastoupit? (Try: "Ihned" = immediately, "Za mesic" = in a month)', translation: 'When could you start? (Try: "Ihned" or "Za mesic")' }
        },
        questions: {
          responses: [
            { triggers: ['tym', 'team', 'kultura', 'culture', 'rust', 'growth', 'rozvoj', 'development', 'projekt', 'project', 'co delate', 'what do you do', 'proc', 'why'], text: 'Dobrá otázka. Těší mě zájem. Odpovím e-mailem spolu s výsledkem. Nashledanou!', translation: 'Good question. I\'m pleased you\'re interested. I\'ll answer by email with the result. Goodbye! (Interview complete! 🎉)', next: 'done', positive: true },
            { triggers: ['ne', 'no', 'nemam', 'no questions', 'vse jasne', 'all clear', 'dekuji', 'thank you', 'nashledanou', 'goodbye'], text: 'Dobře. Budeme vás kontaktovat. Nashledanou a přeji hezký den!', translation: 'Fine. We\'ll be in touch. Goodbye and have a nice day! (Interview complete! 🎉)', next: 'done', positive: true }
          ],
          fallback: { text: 'Máte otázky na nás? (Try: "Jak velky je tym?" or "Dekuji, nemam otazky.")', translation: 'Any questions for us? (Try: "Jak velky je tym?" = how big is the team?)' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Hodně štěstí. 💼', translation: 'Goodbye! Good luck. (Job interview scenario complete! 🎉)' }
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
    },

    es_nie: {
      language: 'spanish',
      persona: {
        name: 'Funcionaria López',
        role: 'Funcionaria — NIE Office Civil Servant',
        avatar: '👩‍💼',
        description: 'She has processed thousands of NIE applications. Nothing surprises her. Be polite, say "por favor" at every opportunity, and have your documents in order. It genuinely helps.'
      },
      vocabulary: [
        { cz: 'vengo a solicitar el NIE', en: 'I\'m here to apply for the NIE' },
        { cz: '¿qué documentos necesito?', en: 'what documents do I need?' },
        { cz: 'el empadronamiento', en: 'local address registration' },
        { cz: 'perdone, no entiendo', en: 'excuse me, I don\'t understand' },
        { cz: '¿puede repetirlo?', en: 'can you repeat that?' },
        { cz: 'falta...', en: 'is missing...' },
        { cz: '¿cuándo estará listo?', en: 'when will it be ready?' },
        { cz: 'el justificante', en: 'proof document / supporting evidence' }
      ],
      context: 'You\'re at the Spanish NIE office to get your foreigner ID number. Funcionaria López is at the window. Stay calm, be polite, and ask clearly when you don\'t understand.',
      tip: 'Start with "Buenos dias" then: "Vengo a solicitar el NIE, por favor." — the magic words.',
      opening: { text: '¡El siguiente! ¿Qué trámite viene a hacer? 📋', translation: 'Next! What procedure are you here for?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenos dias', 'buenas', 'hola', 'good morning', 'hello', 'buenas tardes'], text: 'Buenos días. ¿En qué le puedo ayudar?', translation: 'Good morning. How can I help you?', next: 'purpose', positive: true }
          ],
          fallback: { text: 'Por favor, salude primero. Estoy ocupada. (Try: "Buenos dias")', translation: 'Please greet me first. I\'m busy. (Try: "Buenos dias")' }
        },
        purpose: {
          responses: [
            { triggers: ['nie', 'numero identificacion', 'foreign id', 'solicitar', 'extranjero', 'identidad'], text: 'NIE. ¿Trae el formulario EX-15, dos fotos, el pasaporte y fotocopia?', translation: 'NIE. Do you have form EX-15, two photos, passport and photocopy?', next: 'documents', positive: true },
            { triggers: ['empadronamiento', 'padron', 'registration', 'registro', 'ayuntamiento'], text: 'El empadronamiento es en el Ayuntamiento, no aquí. Pero — ¿viene por el NIE también?', translation: 'Local registration is at the town hall, not here. But — are you also here for the NIE?', next: 'purpose' },
            { triggers: ['no se', 'dont know', 'help', 'ayuda', 'que necesito', 'what'], text: '¿Para qué necesita el NIE? ¿Trabajo, alquiler, banco? Dígame. (Try: "Vengo a solicitar el NIE")', translation: 'What do you need the NIE for? Work, rental, bank? Tell me.' }
          ],
          fallback: { text: 'Dígame el trámite que necesita. (Try: "Vengo a solicitar el NIE, por favor")', translation: 'Tell me what procedure you need.' }
        },
        documents: {
          responses: [
            { triggers: ['si', 'yes', 'tengo todo', 'aqui', 'here', 'todo', 'all', 'documentos', 'traigo', 'brought'], text: 'Veamos... EX-15 correcto. Fotos bien. Pasaporte... falta el justificante del motivo de solicitud.', translation: 'Let\'s see... EX-15 correct. Photos fine. Passport... missing the proof of reason for application.', next: 'missing_doc', positive: true },
            { triggers: ['formulario', 'form', 'fotos', 'photos', 'pasaporte', 'passport', 'fotocopia', 'copy', 'ex-15', 'ex15'], text: 'Bien. ¿Y el justificante del motivo de solicitud? ¿Contrato de trabajo, matrícula?', translation: 'Good. And the proof of reason for application? Work contract, university enrollment?', next: 'documents', positive: true }
          ],
          fallback: { text: 'Enséñeme los documentos. ¿Tiene el formulario EX-15 y el pasaporte?', translation: 'Show me your documents. Do you have form EX-15 and passport? (Say "si, tengo todo")' }
        },
        missing_doc: {
          responses: [
            { triggers: ['contrato', 'contract', 'trabajo', 'work', 'empleo', 'employment', 'tengo contrato', 'have contract', 'laboral'], text: 'Perfecto, el contrato de trabajo es válido. Déjemelo ver, por favor.', translation: 'Perfect, a work contract is valid. Let me see it, please.', next: 'provide_doc', positive: true },
            { triggers: ['universidad', 'university', 'matricula', 'enrollment', 'estudios', 'estudio', 'estudiar'], text: 'La matrícula universitaria también vale. ¿La tiene aquí?', translation: 'University enrollment also works. Do you have it here?', next: 'provide_doc', positive: true },
            { triggers: ['perdon', 'perdone', 'no entiendo', 'no comprendo', 'understand', 'explain', 'explicar', 'que es', 'what is', 'repita', 'repeat'], text: 'Es un documento que justifica por qué necesita el NIE: contrato de trabajo, matrícula o escritura de propiedad.', translation: 'It\'s a document justifying why you need the NIE: work contract, university enrollment, or property deed.', next: 'provide_doc', positive: true },
            { triggers: ['no tengo', 'dont have', 'lo olvide', 'forgot', 'left', 'en casa', 'at home', 'no lo tengo'], text: 'Sin ese documento no puedo continuar hoy. Vuelva con él. ¿Tiene nueva cita?', translation: 'Without that document I cannot continue today. Come back with it. Do you have a new appointment?', next: 'waiting' }
          ],
          fallback: { text: 'Falta el justificante. ¿Tiene contrato de trabajo? (Say "tengo contrato" or "no entiendo")', translation: 'Proof of reason is missing. Do you have a work contract?' }
        },
        provide_doc: {
          responses: [
            { triggers: ['aqui', 'here', 'tome', 'toma', 'le doy', 'giving', 'por favor', 'please', 'aqui tiene', 'here you go'], text: 'Perfecto. Todo en orden. La resolución llega por correo en unos 30 días. Guarde este resguardo.', translation: 'Perfect. Everything in order. The resolution arrives by post in about 30 days. Keep this receipt.', next: 'waiting', positive: true },
            { triggers: ['cuanto', 'how long', 'cuando', 'when', 'tardara', 'take', 'tiempo', 'dias', 'days'], text: 'Unos 30 días. Le llegará una carta a su domicilio. Guarde el resguardo.', translation: 'About 30 days. You\'ll receive a letter at your address. Keep the receipt.', next: 'waiting', positive: true }
          ],
          fallback: { text: 'Entrégueme el documento, por favor. (Say "aqui tiene" or "tome, por favor")', translation: 'Please hand me the document.' }
        },
        waiting: {
          responses: [
            { triggers: ['gracias', 'muchas gracias', 'thank you', 'thanks', 'entendido', 'understood', 'claro', 'perfecto', 'ok', 'bien', 'hasta luego', 'goodbye', 'adios'], text: 'De nada. ¡Buena suerte con todo! ¡El siguiente! 📋', translation: 'You\'re welcome. Good luck with everything! Next! (NIE office survived! 🎉)', next: 'done', positive: true },
            { triggers: ['cuando', 'when', 'cuanto', 'how long', 'problema', 'issue', 'pregunta', 'question', 'que pasa si'], text: 'Aproximadamente 30 días. Si no llega, puede consultar en la sede electrónica de extranjería.', translation: 'Approximately 30 days. If it doesn\'t arrive, you can check on the immigration electronic office.', next: 'waiting' }
          ],
          fallback: { text: '¿Alguna pregunta más? (Try: "Muchas gracias, hasta luego.")', translation: 'Any more questions? (Try: "Muchas gracias, hasta luego.")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Hasta luego! ¡Buena suerte! 📋', translation: 'Goodbye! Good luck! (NIE office complete! 🎉)' }
        }
      }
    },

    es_office: {
      language: 'spanish',
      persona: {
        name: 'Elena',
        role: 'Compañera de trabajo — Spanish Colleague',
        avatar: '☕',
        description: 'Elena from accounting. Chatty, warm, the social hub of the office. She knows everyone\'s coffee order and the real org chart. Get in with Elena and the rest follows naturally.'
      },
      vocabulary: [
        { cz: 'empecé ayer', en: 'I started yesterday' },
        { cz: '¡claro que sí!', en: 'of course! absolutely!' },
        { cz: 'muy bien hasta ahora', en: 'very good so far' },
        { cz: 'es muy majo/maja', en: 'he\'s/she\'s really nice (Spain Spanish)' },
        { cz: '¿vamos a por un café?', en: 'shall we go for a coffee?' },
        { cz: 'me alegra saberlo', en: 'glad to hear it' }
      ],
      context: 'Your first week at a Madrid office. Elena from accounting approaches you. The sacred 10am coffee ritual is about to begin. Say yes — it\'s not optional.',
      tip: 'Start with "Buenos dias" and introduce yourself. Use "Claro que si!" for the coffee invite — warmer than just "si".',
      opening: { text: '¡Buenos días! ¿Eres el nuevo de marketing? ☕', translation: 'Good morning! Are you the new one from marketing?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenos dias', 'buenas', 'hola', 'si', 'yes', 'soy', 'i am', 'nuevo', 'new', 'hello'], text: '¡Qué bien! Yo soy Elena, de contabilidad. ¿Cómo te llamas?', translation: 'How great! I\'m Elena, from accounting. What\'s your name?', next: 'name', positive: true }
          ],
          fallback: { text: '¡Ey! ¡Salúdame! 😄 (Try: "Buenos dias, soy [name]")', translation: 'Hey! Say hello! (Try: "Buenos dias, soy [your name]")' }
        },
        name: {
          responses: [
            { triggers: ['soy', 'i am', 'llamo', 'name is', 'encantado', 'encantada', 'mucho gusto', 'pleasure', 'james', 'tom', 'alex'], text: '¡Encantada! ¿Qué tal el primer día? ¿O llevas más tiempo ya?', translation: 'Pleased to meet you! How\'s the first day? Or have you been here a while?', next: 'impression', positive: true }
          ],
          fallback: { text: '¿Cómo te llamas? ¡Preséntate! (Say "Soy [name], encantado/a")', translation: 'What\'s your name? Introduce yourself!' }
        },
        impression: {
          responses: [
            { triggers: ['bien', 'good', 'muy bien', 'genial', 'great', 'hasta ahora', 'so far', 'majo', 'maja', 'majos', 'nice', 'todos', 'guay'], text: '¡Me alegra! Todos son muy majos aquí de verdad. ¿Vamos a por un café?', translation: 'Glad to hear it! Everyone is really nice here honestly. Shall we go for a coffee?', next: 'coffee', positive: true },
            { triggers: ['complicado', 'complicated', 'dificil', 'difficult', 'mucho', 'lot', 'abrumado', 'overwhelmed', 'confundido', 'confusing'], text: '¡Normal al principio! Ya verás. ¿Un café para sobrevivir?', translation: 'Normal at the start! You\'ll see. A coffee to survive?', next: 'coffee', positive: true }
          ],
          fallback: { text: '¿Qué tal te va? (Try: "Muy bien hasta ahora" or "Es todo muy majo")', translation: 'How\'s it going? (Try: "Muy bien hasta ahora" = very good so far)' }
        },
        coffee: {
          responses: [
            { triggers: ['claro', 'si', 'yes', 'venga', 'vamos', 'por supuesto', 'encantado', 'encantada', 'quiero', 'necesito', 'need', 'of course'], text: '¡Qué bien! El café de las diez es sagrado aquí. 😄 ¿Qué tomas — café con leche, cortado?', translation: 'How great! The 10am coffee is sacred here. 😄 What do you drink — café con leche, cortado?', next: 'coffee_order', positive: true },
            { triggers: ['no', 'no gracias', 'ahora no', 'not now', 'busy', 'ocupado', 'tengo que', 'trabajo'], text: '¡Uy! El café de las diez no se rechaza, ¿eh? 😅 ¿Seguro que no?', translation: 'Oh! The 10am coffee is not refused here, you know? 😅 Are you sure?', next: 'coffee' }
          ],
          fallback: { text: '¿Vamos a por un café? 😄 (Try: "Claro que si!" — much warmer than just "si")', translation: 'Shall we go for a coffee? (Try: "Claro que si!" or "Venga!")' }
        },
        coffee_order: {
          responses: [
            { triggers: ['cafe con leche', 'con leche', 'cortado', 'solo', 'americano', 'cappuccino', 'cafe', 'lo mismo', 'same', 'igual', 'cualquiera', 'anything'], text: '¡Perfecto! ¿Y qué te parece la empresa? ¿Del Madrid o del Barça? Hay que saber. 😄', translation: 'Perfect! And what do you think of the company? Real Madrid or Barça? We need to know. 😄', next: 'football', positive: true }
          ],
          fallback: { text: '¿Qué tomas? ¿Café con leche? ¿Cortado? (Just name your coffee!)', translation: 'What do you drink? Café con leche? Cortado? (Just say what you want!)' }
        },
        football: {
          responses: [
            { triggers: ['madrid', 'real madrid', 'hala madrid', 'blancos'], text: '¡Ay! Yo soy del Atleti. Pero bueno — bienvenido igualmente. 😄', translation: 'Oh! I\'m an Atlético fan. But hey — welcome anyway. 😄', next: 'done', positive: true },
            { triggers: ['barcelona', 'barça', 'barca', 'blaugrana', 'culé'], text: '¡En Madrid no digas eso muy alto! 😅 Bienvenido de todas formas.', translation: 'Don\'t say that too loud in Madrid! 😅 Welcome anyway.', next: 'done', positive: true },
            { triggers: ['atletico', 'atleti', 'colchonero'], text: '¡Eso es! ¡Una más de los nuestros! Bienvenido al equipo. 😄', translation: 'That\'s it! One more of us! Welcome to the team. 😄', next: 'done', positive: true },
            { triggers: ['local', 'equipo local', 'no se', 'dont know', 'ninguno', 'neither', 'no me gusta', 'futbol', 'football', 'no tengo'], text: '¡Respuesta diplomática! Perfecto para el trabajo. 😄 Te presento a todos con el café.', translation: 'Diplomatic answer! Perfect for work. 😄 I\'ll introduce you to everyone with the coffee.', next: 'done', positive: true }
          ],
          fallback: { text: '¿Del Madrid, del Barça, o del Atleti? ¡Hay que elegir! 😄 (Or: "No tengo equipo")', translation: 'Madrid, Barça, or Atlético? You have to choose! 😄' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Bienvenido al equipo! ☕', translation: 'Welcome to the team! ☕ (Spanish office scenario complete! 🎉)' }
        }
      }
    },

    es_date: {
      language: 'spanish',
      persona: {
        name: 'Carmen',
        role: 'Tu cita — Your Spanish date',
        avatar: '🌹',
        description: 'Warm, expressive, and she appreciates directness. She loves that you\'re learning Spanish. Have a plan, give compliments freely, and don\'t check your phone. Dinner starts at 9pm.'
      },
      vocabulary: [
        { cz: 'estás muy guapo/guapa', en: 'you look really handsome/beautiful' },
        { cz: 'me lo paso genial', en: 'I\'m having a great time' },
        { cz: 'me caes muy bien', en: 'I really like you (as a person)' },
        { cz: '¿quedamos otro día?', en: 'shall we meet again another day?' },
        { cz: 'lo intento', en: 'I try / I\'m trying' },
        { cz: '¿qué te apetece?', en: 'what do you feel like?' }
      ],
      context: 'First date with Carmen in Madrid. You\'re meeting outside a restaurant. Be direct, give compliments, have a reservation — and try some Spanish! The effort matters more than the accent.',
      tip: 'Start by greeting her and paying a compliment: "Hola! Estás muy guapa esta noche."',
      opening: { text: '¡Hola! ¿Llevas mucho esperando? 😊', translation: 'Hi! Have you been waiting long?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['no', 'acabo', 'just arrived', 'nada', 'poco', 'poquito', 'recien', 'ahora mismo'], text: '¡Qué bien! Oye, estás muy guapo/guapa esta noche. 😊', translation: 'How great! Hey, you look really handsome/beautiful tonight. 😊', next: 'compliment', positive: true },
            { triggers: ['si', 'yes', 'un poco', 'a little', 'rato', 'while', 'bastante', 'mucho', 'tiempo'], text: '¡Lo siento! Llegué lo antes que pude. ¿Me perdonas?', translation: 'I\'m sorry! I got here as fast as I could. Do you forgive me?', next: 'compliment', positive: true }
          ],
          fallback: { text: '¿Llevas mucho? ¡Di algo! 😄 (Try: "No, acabo de llegar" or "Un poco")', translation: 'Have you been waiting long? Say something! (Try: "No, acabo de llegar" = I just arrived)' }
        },
        compliment: {
          responses: [
            { triggers: ['guapa', 'beautiful', 'bonita', 'preciosa', 'guapo', 'handsome', 'estas muy', 'you look', 'increible', 'impresionante', 'estupenda', 'genial'], text: '¡Gracias! Tú también estás muy guapo/a. ¿Tienes reserva? Porque tengo mucha hambre. 😄', translation: 'Thank you! You look really great too. Do you have a reservation? Because I\'m very hungry. 😄', next: 'reservation', positive: true },
            { triggers: ['gracias', 'tu tambien', 'you too', 'igualmente', 'tú también'], text: 'Jaja. ¡Qué galante! ¿Y tenemos reserva o improvisamos? 😄', translation: 'Haha. How gallant! And do we have a reservation or are we improvising? 😄', next: 'reservation', positive: true }
          ],
          fallback: { text: '¡Di algo bonito! 😄 (Try: "Estás muy guapa esta noche" or "Gracias, tú también")', translation: 'Say something nice! (Try: "Estás muy guapa" = you look beautiful)' }
        },
        reservation: {
          responses: [
            { triggers: ['reserva', 'reservation', 'he reservado', 'mesa', 'table', 'restaurante', 'restaurant', 'sitio', 'lugar', 'place', 'tengo mesa'], text: '¡Me encanta un hombre/mujer con plan! ¿Dónde es?', translation: 'I love a person with a plan! Where is it?', next: 'location', positive: true },
            { triggers: ['no', 'no tengo', 'dont have', 'improvisamos', 'improvise', 'buscar', 'find', 'no reserve', 'sin reserva'], text: 'Hmm... sin reserva. Bueno, soy flexible. ¿Qué tipo de comida te apetece?', translation: 'Hmm... no reservation. Okay, I\'m flexible. What kind of food do you feel like?', next: 'location' }
          ],
          fallback: { text: '¿Tenemos reserva? (Try: "Si, he reservado una mesa" or "No, improvisamos")', translation: 'Do we have a reservation? (Try: "Si, he reservado una mesa en...")' }
        },
        location: {
          responses: [
            { triggers: ['malasana', 'chueca', 'lavapies', 'salamanca', 'retiro', 'sol', 'gran via', 'latina', 'italiana', 'italian', 'marisco', 'seafood', 'japones', 'japanese', 'thai', 'fusion', 'espanol', 'spanish', 'cocina', 'cuisine', 'marisqueria', 'asador'], text: '¡Buena zona! Oye, ¿hablas español o vamos a hacer mímica toda la noche? 😄', translation: 'Nice area! Hey, do you speak Spanish or are we doing mime all night? 😄', next: 'spanish_attempt', positive: true }
          ],
          fallback: { text: '¿Dónde vamos a cenar? (Say the area or type of food)', translation: 'Where are we having dinner? (Say the neighborhood or type of restaurant)' }
        },
        spanish_attempt: {
          responses: [
            { triggers: ['lo intento', 'intento', 'try', 'todavia aprendiendo', 'still learning', 'un poco', 'poquito', 'aprendo', 'learning', 'estudiando', 'me esfuerzo'], text: '¡Me encanta! Lo más bonito es el esfuerzo. Enséñame algo en tu idioma también. 😊', translation: 'I love it! The effort is the sweetest thing. Teach me something in your language too. 😊', next: 'done', positive: true },
            { triggers: ['no', 'no hablo', 'dont speak', 'solo ingles', 'only english', 'bad', 'malo', 'fatal', 'poco', 'poquito'], text: 'Pero si antes dijiste algo en español y sonó muy bien. ¡Sigue así! 😄', translation: 'But you just said something in Spanish and it sounded great. Keep going! 😄', next: 'done', positive: true }
          ],
          fallback: { text: '¿Hablas español? (Try: "Lo intento" = I try, or "Todavia aprendiendo" = still learning)', translation: 'Do you speak Spanish? (Try: "Lo intento" or "Todavia aprendiendo")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Me lo paso genial! ¿Quedamos otro día? 🌹', translation: 'I\'m having a great time! Shall we meet again? (Spanish date scenario complete! 🎉)' }
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

  // ── SAVE / RESTORE STATE ───────────────────────────────
  // Returns a snapshot of internal state for localStorage persistence.
  function getState() {
    return { state: currentState, messageCount, correctionsGiven };
  }

  // Restores engine to a previously saved snapshot (for conversation resume).
  function restoreState(snapshot) {
    if (!currentScenario || !snapshot) return;
    currentState      = snapshot.state      || 'start';
    messageCount      = snapshot.messageCount      || 0;
    correctionsGiven  = snapshot.correctionsGiven  || 0;
  }

  return { init, process, getAvailableScenarios, hasChatSupport, getState, restoreState };

})();
