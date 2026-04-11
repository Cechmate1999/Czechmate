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
        name: 'Rodina Nováků',
        role: 'Celá rodina — The whole family',
        avatar: '👨‍👩‍👧‍👦',
        description: 'You know this family now. Maminka still checks if you\'ve eaten. Babička talks at you in rapid Czech regardless. Tatínek pours wine without asking. Sestra watches and judges. You\'re ready for this.'
      },
      vocabulary: [
        { cz: 'maminko', en: 'Mum (vocative — how you address her directly)' },
        { cz: 'babičko', en: 'Grandma (vocative)' },
        { cz: 'tatínku', en: 'Dad (vocative)' },
        { cz: 'nerozumím dobře', en: 'I don\'t understand well' },
        { cz: 'mluvte pomaleji', en: 'please speak more slowly (formal)' },
        { cz: 'snažím se sám', en: 'I\'m trying on my own' },
        { cz: 'ta vůně je úžasná', en: 'that smell is amazing' },
        { cz: 'já stavím první rundu', en: 'I\'ll get the first round' }
      ],
      context: 'You\'re back at the family home — not as a guest meeting them for the first time, but as someone they know. Navigate all four: warm Maminka, rapid-fire Babička, wine-pouring Tatínek, and watchful Sestra.',
      tip: 'Use vocatives — "Maminko," "Babičko," "Tatínku" instead of their full names. It shows you\'ve integrated.',
      opening: { text: 'Ty jseš tady! Pojď dál, pojď dál. Jedl jsi dnes? 😊', translation: 'You\'re here! Come in, come in. Have you eaten today?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'maminko', 'ahoj', 'hello', 'hi', 'prinesl', 'vino', 'wine', 'cervene', 'red'], text: 'Skvělé! Tatínek je v obýváku. A Babička přišla taky — připrav se, mluví hodně. 😄', translation: 'Great! Dad is in the living room. Grandma came too — prepare yourself, she talks a lot. 😄', next: 'family_arrival', positive: true }
          ],
          fallback: { text: 'Pozdrav mě! "Dobry den, Maminko" nebo "Ahoj, prinesl jsem vino." 😊', translation: 'Greet me! Try: "Dobry den, Maminko" or mention you brought wine.' }
        },
        family_arrival: {
          responses: [
            { triggers: ['babicko', 'babicka', 'nerozumim', 'pomaleji', 'slowly', 'muzete', 'repeat', 'prosim', 'please'], text: 'Babička: "Pomaleji? Ale já mluvím pomalu!" 😄 Tatínek nalévá víno. Dáš si sklenku?', translation: 'Grandma: "Slower? But I speak slowly!" 😄 Dad is pouring wine. Will you have a glass?', next: 'tatinek_wine', positive: true },
            { triggers: ['tatinku', 'tatinek', 'dad', 'vino', 'wine', 'zdravi', 'cheers', 'nazdravi', 'sklenku', 'glass'], text: 'Tatínek: "Na zdraví!" Víno z Moravy. Babička vám teď něco říká — rozumíte?', translation: 'Dad: "Cheers!" Moravian wine. Grandma is now saying something to you — do you understand?', next: 'babicka_chat', positive: true },
            { triggers: ['sestra', 'sister', 'hezky', 'dobry', 'nice', 'fine', 'super', 'ok'], text: 'Sestra právě přišla. Dívá se na vás. Co jí řeknete?', translation: 'Sister just arrived. She\'s looking at you. What do you say to her?', next: 'sestra_arrives', positive: true }
          ],
          fallback: { text: 'Babička vás pozdravuje! Zkuste: "Dobry den, Babicko. Nerozumim dobre. Muzete mluvit pomaleji?"', translation: 'Grandma is greeting you! Try: "Dobry den, Babicko. Nerozumim dobre." (I don\'t understand well)' }
        },
        tatinek_wine: {
          responses: [
            { triggers: ['rad', 'ano', 'yes', 'prosim', 'please', 'sklenku', 'glass', 'vino', 'wine', 'samozrejme', 'dekuji', 'zdravi', 'nazdravi', 'urcite'], text: 'Tatínek: "Dobře!" (nalévá velkou sklenku). Sestra přichází. Kouká na vás.', translation: 'Dad: "Good!" (pours a generous glass). Sister arrives. She\'s looking at you.', next: 'sestra_arrives', positive: true },
            { triggers: ['ne', 'no', 'diky', 'nepiju', 'nepiji', 'dont drink', 'ridim', 'driving', 'voda', 'water'], text: 'Tatínek: "Voda? Džus? Nemáme džus." 😄 Sestra přišla. Kouká na vás.', translation: 'Dad: "Water? Juice? We don\'t have juice." 😄 Sister arrived. She\'s looking at you.', next: 'sestra_arrives', positive: true }
          ],
          fallback: { text: 'Tatínek nabízí víno. Přijmete? (Try: "Rad, dekuji, Tatinku!" or "Ne, dekuji")', translation: 'Dad is offering wine. Accept? (Try: "Rad, dekuji, Tatinku!" or "Ne, dekuji")' }
        },
        babicka_chat: {
          responses: [
            { triggers: ['nerozumim', 'dont understand', 'pomaleji', 'slower', 'prosim', 'please', 'zopakovat', 'repeat', 'napsat', 'write', 'babicko'], text: 'Babička: "Pomaleji! Pom-a-le-ji!" 😄 Tatínek: "Nech ho být, maminko." Sestra přichází.', translation: 'Grandma: "Slower! Slo-wer!" 😄 Dad: "Leave him alone, mum." Sister arrives.', next: 'sestra_arrives', positive: true },
            { triggers: ['rozumim', 'understand', 'dobre', 'good', 'trochu', 'a little', 'ano', 'yes', 'snazim', 'trying', 'ucim'], text: 'Babička je nadšená! "Vidíš? Rozumí!" Tatínek se usmívá. Sestra přichází.', translation: 'Grandma is delighted! "See? He understands!" Dad smiles. Sister arrives.', next: 'sestra_arrives', positive: true }
          ],
          fallback: { text: 'Babička vám řekla něco. Co odpovíte? (Try: "Nerozumim dobre. Muzete mluvit pomaleji?")', translation: 'Grandma said something. What do you reply? (Try: "Nerozumim dobre. Pomaleji, prosim.")' }
        },
        sestra_arrives: {
          responses: [
            { triggers: ['snazim', 'snazím se', 'trying', 'ucim se', 'learning', 'kurz', 'course', 'sam', 'alone', 'myself', 'skola', 'class', 'sam se ucim'], text: 'Sestra: "Hm. Tak vida." (přijímá odpověď). Maminka volá: "Ke stolu! Polévka je hotová!"', translation: 'Sister: "Hm. I see." (accepts this). Maminka calls: "To the table! Soup is ready!"', next: 'soup', positive: true },
            { triggers: ['ona', 'she', 'partner', 'taught', 'naucila', 'pomaha', 'helps', 'together', 'partnerkа'], text: 'Sestra: "Romantické. Ale česky se mluví tady." 😄 Maminka: "Ke stolu! Polévka!"', translation: 'Sister: "Romantic. But Czech is spoken here." 😄 Maminka: "To the table! Soup!"', next: 'soup', positive: true }
          ],
          fallback: { text: 'Sestra se ptá, jak se učíte česky. (Try: "Snazim se sam. Chodim na kurz.")', translation: 'Sister asks how you\'re learning Czech. (Try: "Snazim se sam. Chodim na kurz." = I try myself. I go to a class.)' }
        },
        soup: {
          responses: [
            { triggers: ['vyborne', 'vyborna', 'delicious', 'skvele', 'dobre', 'good', 'uzasna', 'amazing', 'vune', 'smells', 'voni', 'co je', 'what is', 'recept', 'recipe', 'varite'], text: 'Maminka září! "Hovězí vývar. Vařím ji tři hodiny." Babička přikyvuje. "Jezte, jezte!"', translation: 'Maminka beams! "Beef broth. I cook it for three hours." Grandma nods. "Eat, eat!"', next: 'main', positive: true }
          ],
          fallback: { text: 'Pochvalte polévku! (Try: "Maminko, ta vune je uzasna! Co varite?")', translation: 'Compliment the soup! (Try: "Maminko, ta vune je uzasna!" = Maminka, that smell is amazing!)' }
        },
        main: {
          responses: [
            { triggers: ['vyborne', 'skvele', 'delicious', 'bajechne', 'fantastic', 'amazing', 'nejlepsi', 'best', 'fantasticke', 'dobre', 'vytecne'], text: 'Maminka: "Jezte, jezte! Ještě trochu?" Tatínek dolévá víno. Sestra: "Vidíš? Umí se chovat."', translation: 'Maminka: "Eat, eat! A little more?" Dad tops up the wine. Sister: "See? He knows how to behave."', next: 'main', positive: true },
            { triggers: ['recept', 'recipe', 'jak', 'how', 'naucit', 'learn', 'ukazat', 'show', 'co', 'what'], text: 'Maminka hned vstává: "Ukážu vám! Ale musíte přijít ve čtvrtek — to vařím svíčkovou."', translation: 'Maminka jumps up: "I\'ll show you! But you must come Thursday — I\'m making svíčková."', next: 'dessert', positive: true },
            { triggers: ['vic', 'more', 'ano', 'yes', 'jeste', 'another', 'rad', 'gladly', 'samozrejme'], text: 'Tatínek: "To rád vidím." Maminka nakládá. "Jíst víc musíte!"', translation: 'Dad: "Good to see." Maminka serves more. "You must eat more!"', next: 'dessert', positive: true }
          ],
          fallback: { text: 'Jak chutná hlavní chod? (Try: "Je to vyborne, Maminko!" or ask for the recipe)', translation: 'How is the main course? (Say: "Je to vyborne!" = It\'s excellent!)' }
        },
        dessert: {
          responses: [
            { triggers: ['dekuji', 'thank', 'diky', 'za pozvani', 'invitation', 'bylo', 'was', 'skvely', 'excellent', 'obed', 'lunch', 'vsechno', 'everything', 'bylo to'], text: 'Maminka: "Rádi!" Babička: "Přijď zase." Tatínek: "Na zdraví." Sestra: "...možná příště." (Rodina vás přijala! 🎉)', translation: 'Maminka: "Our pleasure!" Grandma: "Come again." Dad: "Cheers." Sister: "...maybe next time." (Family accepted you! 🎉)', next: 'done', positive: true },
            { triggers: ['kolac', 'cake', 'dezert', 'dessert', 'ano', 'yes', 'prosim', 'please', 'rad', 'tvaroh'], text: 'Maminka: "Tvarohový koláč! Seďte." Celá rodina se usadí. Jste přijat/a.', translation: 'Maminka: "Cheesecake! Stay seated." The whole family settles in. You\'re accepted.', next: 'dessert', positive: true }
          ],
          fallback: { text: 'Poděkujte za oběd! (Try: "Dekuji za pozvani. Bylo to vyborne.")', translation: 'Thank them for lunch! (Try: "Dekuji za pozvani. Bylo to vyborne.")' }
        },
        done: {
          responses: [],
          fallback: { text: 'Nashledanou! Tatínek vám balí víno na cestu. Celá rodina vás miluje. 🎉', translation: 'Goodbye! Dad is packing wine for your journey. The whole family loves you. (Scenario complete! 🎉)' }
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

    padel: {
      language: 'czech',
      persona: {
        name: 'Tomáš',
        role: 'Padelový parťák — Padel Partner',
        avatar: '🎾',
        description: 'Tomáš plays padel every week. He\'s energetic, competitive, and genuinely happy you joined. Short punchy responses — just like real sports communication. No frills, just play.'
      },
      vocabulary: [
        { cz: 'nováček', en: 'newbie / newcomer' },
        { cz: 'špatná rána', en: 'bad shot' },
        { cz: 'skóre', en: 'score' },
        { cz: 'promiň', en: 'sorry (informal)' },
        { cz: 'eso!', en: 'great shot! / that\'s it!' },
        { cz: 'první runda', en: 'first round (of drinks)' },
        { cz: 'příště líp', en: 'better next time' },
        { cz: 'dobrý zápas', en: 'good match' }
      ],
      context: 'You\'ve just arrived at the padel court. Tomáš and two other Czech friends are waiting. Navigate the warmup, the game, and the mandatory post-match beer. Short, fast, sporty Czech.',
      tip: 'Start by greeting Tomáš. Admit you\'re a nováček upfront — "Jsem novacek, ale zkusim to!" — it\'s the right opening move.',
      opening: { text: 'Nazdar! Přišels! Máš raketu nebo půjčíš? 🎾', translation: 'Hey! You made it! Got a racket or borrowing one?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['ahoj', 'nazdar', 'cau', 'hello', 'hi', 'tu jsem', 'jsem tady', 'prisel', 'here i am'], text: 'Nazdar! Půjčíme ti raketu. Hrajeme čtyři — ty a já vs. Honza a Petr. Jasný?', translation: 'Hey! We\'ll lend you a racket. Four of us — you and me vs. Honza and Petr. Clear?', next: 'teams', positive: true }
          ],
          fallback: { text: 'Haló? Pozdrav mě! Kurty nečekají. 😄 (Try: "Ahoj Tomas!")', translation: 'Hey? Greet me! The courts won\'t wait. 😄 (Try: "Ahoj!")' }
        },
        teams: {
          responses: [
            { triggers: ['ok', 'jasny', 'super', 'dobre', 'yes', 'ano', 'pohoda', 'cool', 'fajn', 'ready', 'pripraven', 'v poradku', 'alright'], text: 'Dobře. Rozcvičíme se pět minut. Hráls padel dřív?', translation: 'Good. Five minute warmup. Have you played padel before?', next: 'warmup', positive: true },
            { triggers: ['skore', 'score', 'jak se hraje', 'rules', 'pravidla', 'tenis', 'tennis', 'system', 'bodovani', 'jak to funguje'], text: 'Jako tenis — 15, 30, 40, hra. Stěny se počítají. Rychle to pochopíš. Jdeme!', translation: 'Like tennis — 15, 30, 40, game. Walls count. You\'ll get it fast. Let\'s go!', next: 'warmup', positive: true }
          ],
          fallback: { text: 'Jasný? Jdeme na kurty! (Say "ok" or ask "jak se hraje?" = how do you play?)', translation: 'Ready? Let\'s hit the courts!' }
        },
        warmup: {
          responses: [
            { triggers: ['novacek', 'newbie', 'new', 'prvni krat', 'first time', 'zacinatec', 'beginner', 'poprve', 'jsem novacek', 'nikdy', 'never'], text: 'Nováček! Výborně že jsi přišel. Padel se chytí rychle — je intuitivní. Připraven?', translation: 'Newbie! Great you came. Padel clicks fast — it\'s intuitive. Ready?', next: 'game', positive: true },
            { triggers: ['trochu', 'a little', 'hral jsem', 'played before', 'ano', 'yes', 'umim', 'zkusenost', 'experience', 'nekdy', 'sometimes'], text: 'Dobrý! Pak rovnou. Servuju já. Tak!', translation: 'Great! Straight in then. I\'ll serve. Let\'s go!', next: 'game', positive: true }
          ],
          fallback: { text: 'Hráls padel dřív? (Try: "Jsem novacek" or "Trochu hraju")', translation: 'Have you played padel before? (Try: "Jsem novacek" or "Trochu hraju")' }
        },
        game: {
          responses: [
            { triggers: ['prominy', 'promiň', 'sorry', 'spatna rana', 'bad shot', 'chyba', 'mistake', 'priste lip', 'better next', 'jejda', 'sakra'], text: 'Nevadí! Příště líp. Eso přijde. 🎾', translation: 'No worries! Better next time. A winner is coming. 🎾', next: 'game', positive: true },
            { triggers: ['eso', 'vyborna', 'great shot', 'super', 'wow', 'tak', 'jde to', 'works', 'dobra rana', 'good shot'], text: 'Jde to! Padel je lehký — skóre je dvě jedna pro nás!', translation: 'Getting it! Padel is easy — score is two-one to us!', next: 'game', positive: true },
            { triggers: ['kolik', 'skore', 'score', 'stav', 'koliki', 'how much', 'jak jsme na tom'], text: 'Tři dva pro nás. Ještě jeden gem a vyhrajeme set!', translation: 'Three-two to us. One more game and we win the set!', next: 'game', positive: true },
            { triggers: ['pivo', 'beer', 'hotovo', 'done', 'finish', 'konec', 'po zapase', 'after'], text: 'Po zápase! Teď se soustřeď! 😄', translation: 'After the match! Focus now! 😄', next: 'after' }
          ],
          fallback: { text: 'Hrajeme! Řekni: "promiň, špatná rána" nebo "eso!" 🎾', translation: 'We\'re playing! Say: "prominy, spatna rana" (bad shot) or "eso!" (great shot)' }
        },
        after: {
          responses: [
            { triggers: ['pivo', 'beer', 'jdeme', 'let\'s go', 'ano', 'yes', 'urcite', 'definitely', 'stavim', 'i\'ll buy', 'prvni rundu', 'round', 'samozrejme', 'of course'], text: 'Jdem! Dobrý zápas — rychle se učíš! 🎾🍺', translation: 'Let\'s go! Good match — you learn fast! (Padel scenario complete! 🎉)', next: 'done', positive: true },
            { triggers: ['dekuji', 'thanks', 'diky', 'bylo to skvele', 'great', 'fajn', 'enjoyed', 'skvely zapas'], text: 'Příště hraješ lépe. Jdeme na pivo — zasloužili jsme to!', translation: 'Next time you\'ll play even better. Let\'s get a beer — we deserve it!', next: 'done', positive: true }
          ],
          fallback: { text: 'Dobrý zápas! Jdeme na pivo? 🍺 (Say "ano, urcite" or "ja stavim prvni rundu" = I\'ll get the first round)', translation: 'Good match! Going for a beer? 🍺' }
        },
        done: {
          responses: [],
          fallback: { text: 'Na zdraví! Příště hraješ ještě lépe. 🎾🍺', translation: 'Cheers! Next time you\'ll play even better. (Padel scenario complete! 🎉)' }
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
    },

    doctor: {
      language: 'czech',
      persona: {
        name: 'Dr. Procházka',
        role: 'Praktický lékař — GP',
        avatar: '🩺',
        description: 'Efficient, thorough, and surprisingly patient with non-Czech speakers. Describe your symptoms clearly and he\'ll get you sorted fast.'
      },
      vocabulary: [
        { cz: 'bolí mě', en: 'it hurts / I have pain in' },
        { cz: 'od kdy', en: 'since when / how long' },
        { cz: 'teplota', en: 'temperature / fever' },
        { cz: 'předpis', en: 'prescription' },
        { cz: 'pojišťovna', en: 'health insurance' },
        { cz: 'léky', en: 'medication' },
        { cz: 'alergie', en: 'allergies' },
        { cz: 'odpočívat', en: 'to rest' }
      ],
      context: 'You\'re at a Czech GP practice. Dr. Procházka will ask about your symptoms, examine you, and write a prescription. Accents optional.',
      tip: 'Start with "Dobry den, doktore" then describe what hurts: "Boli me hlava" = I have a headache.',
      opening: { text: 'Dobrý den. Co vás trápí? 🩺', translation: 'Hello. What\'s troubling you?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['dobry den', 'doktore', 'hello', 'ahoj', 'zdravim', 'good morning', 'good day'], text: 'Dobrý den. Posaďte se, prosím. Co vás přivedlo?', translation: 'Hello. Please sit down. What brings you in today?', next: 'symptoms', positive: true }
          ],
          fallback: { text: 'Pozdravte mě, prosím. (Try: "Dobry den, doktore")', translation: 'Please greet me. (Try: "Dobry den, doktore")' }
        },
        symptoms: {
          responses: [
            { triggers: ['hlava', 'head', 'bolest hlavy', 'headache', 'migrena', 'migraine'], text: 'Bolest hlavy. Jak dlouho? A máte teplotu?', translation: 'Headache. How long? And do you have a fever?', next: 'duration', positive: true },
            { triggers: ['krk', 'throat', 'bolest v krku', 'sore throat', 'polykat', 'swallow', 'kaslet', 'cough', 'kaslem'], text: 'Krk. Ukažte mi. Jak dlouho to trvá?', translation: 'Throat. Show me. How long has this been going on?', next: 'duration', positive: true },
            { triggers: ['zaludek', 'stomach', 'bricho', 'belly', 'nevolnost', 'nausea', 'zvraceni', 'vomit', 'prujmy', 'diarrhea', 'zanety'], text: 'Zažívací problémy. Jedl/a jste něco neobvyklého?', translation: 'Digestive issues. Did you eat anything unusual?', next: 'duration', positive: true },
            { triggers: ['zada', 'back', 'bedra', 'lower back', 'bolest zad', 'back pain'], text: 'Záda. Sedavé zaměstnání?', translation: 'Back. Sedentary work?', next: 'duration', positive: true },
            { triggers: ['unava', 'tired', 'unaveny', 'exhausted', 'slaby', 'weak', 'bez energie', 'no energy', 'horeckuji', 'fever'], text: 'Únava. Jak spíte? Jak dlouho se tak cítíte?', translation: 'Fatigue. How are you sleeping? How long have you felt this way?', next: 'duration', positive: true }
          ],
          fallback: { text: 'Kde vás to bolí? (Try: "Boli me hlava" = I have a headache, "Boli me krk" = sore throat)', translation: 'Where does it hurt? (Try: "Boli me hlava")' }
        },
        duration: {
          responses: [
            { triggers: ['den', 'day', 'dnes', 'today', 'rano', 'morning', 'zacala', 'started', 'zacal'], text: 'Jeden den. A máte teplotu? Alergie na léky?', translation: 'One day. Do you have a temperature? Any medication allergies?', next: 'examination', positive: true },
            { triggers: ['tydny', 'weeks', 'tyden', 'week', 'mesic', 'month', 'dlouho', 'long', 'davno', 'ages', 'cas', 'while'], text: 'Delší dobu. Budu vás vyšetřit. Máte alergii na léky?', translation: 'A while. I\'ll examine you. Any medication allergies?', next: 'examination', positive: true },
            { triggers: ['dva', 'two', 'tri', 'three', 'ctyri', 'four', 'pul', 'half', 'pár', 'par', 'few'], text: 'Rozumím. Vyšetřím vás. Berete v současnosti léky?', translation: 'I see. I\'ll examine you. Are you currently taking any medications?', next: 'examination', positive: true }
          ],
          fallback: { text: 'Jak dlouho vás to trápí? (Try: "Tydny" = weeks, "Jeden den" = one day)', translation: 'How long has this been going on?' }
        },
        examination: {
          responses: [
            { triggers: ['ne', 'no', 'zadna', 'none', 'nic', 'nothing', 'zdravy', 'healthy', 'bez alergii', 'no allergies'], text: 'Dobře. Vypadá to jako virová infekce. Předepíšu vám léky.', translation: 'Good. Looks like a viral infection. I\'ll prescribe medication.', next: 'prescription', positive: true },
            { triggers: ['ano', 'yes', 'mam alergii', 'allergic', 'penicilin', 'penicillin', 'ibuprofen', 'aspirin', 'alergie'], text: 'Zaznamenám to. Předepíšu náhradu bez alergenů.', translation: 'I\'ll note that. I\'ll prescribe an allergen-free alternative.', next: 'prescription', positive: true }
          ],
          fallback: { text: 'Máte alergie na léky? (Try: "Ne, zadne alergie" or "Ano, mam alergii na...")', translation: 'Do you have medication allergies? (Try: "Ne, zadne alergie")' }
        },
        prescription: {
          responses: [
            { triggers: ['dekuji', 'thank', 'diky', 'rozumim', 'understood', 'ok', 'dobre', 'nashledanou', 'goodbye', 'bye', 'predpis', 'prescription', 'lekarna', 'pharmacy'], text: 'Předpis je vypsán. Lékárna je hned vedle. Klidový režim tři dny. Nashledanou! 🩺', translation: 'Prescription ready. Pharmacy is right next door. Rest for three days. Goodbye! (Doctor visit complete! 🎉)', next: 'done', positive: true },
            { triggers: ['kdy', 'when', 'jak dlouho', 'how long', 'uzdravim', 'recover', 'zlepsi', 'improve', 'navrat', 'jak brzy'], text: 'Za tři až pět dní byste měl/a být lepší. Pokud ne, přijďte znovu.', translation: 'In three to five days you should be better. If not, come again.', next: 'done', positive: true }
          ],
          fallback: { text: 'Máte otázky k předpisu? (Try: "Dekuji, doktore. Nashledanou.")', translation: 'Any questions about the prescription? (Try: "Dekuji, nashledanou")' }
        },
        done: {
          responses: [],
          fallback: { text: 'Brzy se uzdravte! 🩺', translation: 'Get well soon! (Doctor visit scenario complete! 🎉)' }
        }
      }
    },

    grocery: {
      language: 'czech',
      persona: {
        name: 'Paní Malinová',
        role: 'Pokladní — Supermarket Cashier',
        avatar: '🛒',
        description: 'She\'s been at this checkout for 11 years. Efficient, a little weary, but not unkind. She respects the effort of trying Czech. Mostly.'
      },
      vocabulary: [
        { cz: 'taška', en: 'bag' },
        { cz: 'kolik to stojí?', en: 'how much is it?' },
        { cz: 'platit kartou', en: 'pay by card' },
        { cz: 'zákaznická karta', en: 'loyalty card' },
        { cz: 'stvrzenka', en: 'receipt' },
        { cz: 'hotově', en: 'cash' },
        { cz: 'vrácení', en: 'change / return' },
        { cz: 'prosím', en: 'please / here you go' }
      ],
      context: 'You\'re at the checkout in a Prague supermarket (Albert/Billa/Kaufland). She\'ll ask about a loyalty card, a bag, and payment. Keep it quick — there\'s a queue.',
      tip: 'Say "Mam tasku" (I have a bag) right away to save time. Then "kartou" for card payment.',
      opening: { text: 'Dobrý den. Máte zákaznickou kartu? 🛒', translation: 'Hello. Do you have a loyalty card?' },
      corrections: CZ_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['ne', 'no', 'nemam', 'don\'t have', 'bez karty', 'no card', 'zapomnel', 'forgot', 'nemam kartu'], text: 'Dobře. Taška?', translation: 'Fine. Bag?', next: 'bag', positive: true },
            { triggers: ['ano', 'yes', 'mam', 'have', 'zde', 'here', 'tady', 'karta', 'prikladam'], text: 'Naskenujte, prosím. Taška?', translation: 'Please scan it. Bag?', next: 'bag', positive: true },
            { triggers: ['dobry den', 'hello', 'ahoj', 'hi', 'zdravim'], text: 'Dobrý den. Zákaznická karta?', translation: 'Hello. Loyalty card?', next: 'start', positive: true }
          ],
          fallback: { text: 'Zákaznická karta? (Try: "Ne, nemam" or "Ano, mam")', translation: 'Loyalty card? (Try: "Ne, nemam" = No, I don\'t)' }
        },
        bag: {
          responses: [
            { triggers: ['mam tasku', 'have bag', 'tasku', 'bag', 'mam', 'yes', 'ano', 'vlastni', 'own', 'uz mam', 'jo'], text: 'Dobře. Celkem 384 korun.', translation: 'Good. Total is 384 crowns.', next: 'payment', positive: true },
            { triggers: ['ne', 'no', 'nemam', 'don\'t have', 'chci tasku', 'want bag', 'jednu', 'one', 'prosim'], text: 'Taška je 5 korun. Celkem 389 korun.', translation: 'Bag is 5 crowns. Total is 389 crowns.', next: 'payment', positive: true }
          ],
          fallback: { text: 'Taška? (Try: "Mam tasku" = I have a bag, or "Ne" = no)', translation: 'Bag? (Say "Mam tasku" if you have one)' }
        },
        payment: {
          responses: [
            { triggers: ['kartou', 'card', 'kreditni', 'debitni', 'visa', 'mastercard', 'platebni', 'bezdotykove', 'contactless'], text: 'Přiložte kartu, prosím. Hezký den! 🛒', translation: 'Tap your card, please. Have a nice day! (Supermarket complete! 🎉)', next: 'done', positive: true },
            { triggers: ['hotove', 'cash', 'koruny', 'koruna', 'penize', 'money', 'platim hotove'], text: 'Děkuji. Nazpátek 16 korun. Hezký den! 🛒', translation: 'Thank you. 16 crowns change. Have a nice day! (Supermarket complete! 🎉)', next: 'done', positive: true }
          ],
          fallback: { text: 'Kartou nebo hotově? (Try: "Kartou" = card, "Hotove" = cash)', translation: 'Card or cash? (Say "Kartou" for card)' }
        },
        done: {
          responses: [],
          fallback: { text: 'Hezký den! 🛒', translation: 'Have a nice day! (Supermarket scenario complete! 🎉)' }
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
    },

    es_padel: {
      language: 'spanish',
      persona: {
        name: 'Rodrigo',
        role: 'Compañero de pádel — Padel Partner',
        avatar: '🎾',
        description: 'Rodrigo plays pádel three times a week. Competitive but welcoming. He will celebrate with cañas after. "Venga" is his favourite word.'
      },
      vocabulary: [
        { cz: 'principiante', en: 'beginner' },
        { cz: 'el tiro', en: 'the shot / hit' },
        { cz: 'lo siento', en: 'I\'m sorry' },
        { cz: '¡qué puntazo!', en: 'what a great shot!' },
        { cz: '¡venga!', en: 'let\'s go! / come on!' },
        { cz: 'la pareja', en: 'partner / pair' },
        { cz: 'a por ellos', en: 'let\'s go get them' },
        { cz: 'el marcador', en: 'the scoreboard / score' }
      ],
      context: 'You\'re at a padel club in Madrid. Rodrigo is your partner. Navigate the warmup, the game, and the essential post-match cañas. Keep replies short and fast — match the energy.',
      tip: 'Start with "¡Hola!" and admit you\'re a principiante: "Soy principiante, pero lo intento." — it\'s the right opening.',
      opening: { text: '¡Hola! ¡Ya estás aquí! ¿Tienes raqueta o pedimos prestada? 🎾', translation: 'Hey! You\'re here! Got a racket or do we borrow one?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['hola', 'buenas', 'hello', 'aqui estoy', 'here i am', 'ya estoy', 'si', 'yes', 'que tal'], text: '¡Qué bien! Somos cuatro — tú y yo contra Javi y Marcos. ¿De acuerdo?', translation: 'Great! Four of us — you and me against Javi and Marcos. Sound good?', next: 'teams', positive: true }
          ],
          fallback: { text: '¡Ey! ¡Saluda! Las pistas no esperan. 😄 (Try: "Hola Rodrigo!")', translation: 'Hey! Say hello! The courts won\'t wait. (Try: "Hola!")' }
        },
        teams: {
          responses: [
            { triggers: ['ok', 'bien', 'venga', 'perfecto', 'claro', 'si', 'yes', 'guay', 'genial', 'de acuerdo', 'vamos'], text: '¡Venga! Cinco minutos de calentamiento. ¿Has jugado antes?', translation: 'Let\'s go! Five minutes warming up. Have you played before?', next: 'warmup', positive: true },
            { triggers: ['como se juega', 'rules', 'reglas', 'tenis', 'tennis', 'puntos', 'points', 'como funciona', 'explicame'], text: 'Como el tenis — 15, 30, 40, juego. Las paredes cuentan. Lo pillas en seguida. ¡Venga!', translation: 'Like tennis — 15, 30, 40, game. Walls count. You\'ll get it fast. Let\'s go!', next: 'warmup', positive: true }
          ],
          fallback: { text: '¿De acuerdo? ¡A las pistas! (Say "venga" or ask "como se juega?" = how do you play?)', translation: 'Ready? To the courts! (Say "venga" or ask about the rules)' }
        },
        warmup: {
          responses: [
            { triggers: ['principiante', 'beginner', 'primera vez', 'first time', 'no he jugado', 'never played', 'novato', 'nuevo', 'poco', 'barely'], text: '¡Principiante! ¡Bienvenido al vicio! 😄 El pádel engancha. ¿Listo?', translation: 'Beginner! Welcome to the addiction! 😄 Padel hooks you. Ready?', next: 'game', positive: true },
            { triggers: ['si', 'yes', 'algo', 'a bit', 'un poco', 'a little', 'he jugado', 'played before', 'alguna vez', 'sometimes', 'veces'], text: '¡Perfecto! Entonces vamos directos. Yo saco. ¡A por ellos!', translation: 'Perfect! Straight in then. I\'ll serve. Let\'s get them!', next: 'game', positive: true }
          ],
          fallback: { text: '¿Has jugado antes? (Try: "Soy principiante" or "Un poco")', translation: 'Have you played before? (Try: "Soy principiante" = I\'m a beginner)' }
        },
        game: {
          responses: [
            { triggers: ['lo siento', 'sorry', 'perdona', 'mal tiro', 'bad shot', 'fallo', 'missed', 'error', 'uy', 'ay', 'oops', 'vaya'], text: '¡No pasa nada! La próxima entra. ¡Venga! 🎾', translation: 'No worries! Next one goes in. Come on! 🎾', next: 'game', positive: true },
            { triggers: ['que puntazo', 'great shot', 'bien', 'bueno', 'vaya', 'wow', 'impresionante', 'bonito tiro', 'brutal', 'genial'], text: '¡Eso es! ¡El pádel es lo tuyo! Vamos 2-1 a favor. 💪', translation: 'That\'s it! Padel suits you! We\'re 2-1 up. 💪', next: 'game', positive: true },
            { triggers: ['cuanto van', 'score', 'marcador', 'puntos', 'how much', 'cuanto', 'van ganando', 'resultado'], text: '¡Vamos 3-2! Un juego más y ganamos el set. ¡A muerte!', translation: 'We\'re 3-2! One more game and we win the set. Fight!', next: 'game', positive: true },
            { triggers: ['canas', 'caña', 'cerveza', 'beer', 'despues', 'after', 'bebidas', 'drinks', 'luego'], text: '¡Después del partido! Ahora, ¡concentración! 😄', translation: 'After the match! Focus now! 😄', next: 'after' }
          ],
          fallback: { text: '¡Jugamos! Di: "lo siento, mal tiro" o "¡qué puntazo!" 🎾', translation: 'We\'re playing! Say: "lo siento, mal tiro" (sorry, bad shot) or "¡qué puntazo!" (great shot)' }
        },
        after: {
          responses: [
            { triggers: ['venga', 'vamos', 'si', 'yes', 'claro', 'por supuesto', 'invito yo', 'i\'ll buy', 'yo pago', 'primera ronda', 'round', 'unas canas'], text: '¡Vamos! ¡Buen partido! Aprendes rápido. 🎾🍺', translation: 'Let\'s go! Good match! You learn fast. (Padel scenario complete! 🎉)', next: 'done', positive: true },
            { triggers: ['gracias', 'ha sido', 'genial', 'great', 'divertido', 'fun', 'guay', 'estupendo', 'fenomenal'], text: '¡La próxima vez juegas mejor! A por las cañas — ¡te las mereces! 🍺', translation: 'Next time you\'ll play even better! Off for cañas — you deserve them!', next: 'done', positive: true }
          ],
          fallback: { text: '¡Buen partido! ¿Unas cañas? 🍺 (Say "venga" or "invito yo" = I\'ll buy)', translation: 'Good match! A couple of beers? (Say "venga" or "invito yo")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Salud! ¡La próxima semana más! 🎾🍺', translation: 'Cheers! More next week! (Padel scenario complete! 🎉)' }
        }
      }
    },

    es_flat: {
      language: 'spanish',
      persona: {
        name: 'Sra. Montoya',
        role: 'Propietaria — Landlady',
        avatar: '🏠',
        description: 'She\'s rented to internationals before. Warm but thorough. Ask about the deposit, bills, and contract — it shows you\'re serious. Don\'t just say "muy bonito" and leave.'
      },
      vocabulary: [
        { cz: 'el alquiler', en: 'rent' },
        { cz: 'la fianza', en: 'deposit' },
        { cz: 'los gastos incluidos', en: 'bills included' },
        { cz: 'el contrato', en: 'contract / lease' },
        { cz: 'disponible desde', en: 'available from' },
        { cz: '¿se admiten mascotas?', en: 'are pets allowed?' },
        { cz: 'el empadronamiento', en: 'local registration' },
        { cz: '¿cuándo puedo entrar?', en: 'when can I move in?' }
      ],
      context: 'You\'re viewing a flat in Madrid. Sra. Montoya is the landlady. Ask about rent, bills, deposit, and availability. Be polite, ask the right questions.',
      tip: 'Start: "Buenas tardes, vengo a ver el piso." Then ask: "¿Cuánto es el alquiler?"',
      opening: { text: '¡Buenas! Pase, le enseño el piso. 🏠', translation: 'Hello! Come in, I\'ll show you the flat.' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenas', 'buenos dias', 'buenas tardes', 'hola', 'hello', 'good', 'vengo a ver', 'ver el piso', 'disponible', 'viewing'], text: '¡Bienvenido/a! El piso está disponible desde el primero. Pase, pase.', translation: 'Welcome! The flat is available from the first. Come in, come in.', next: 'overview', positive: true }
          ],
          fallback: { text: '¡Hola! Salúdeme, por favor. (Try: "Buenas tardes, vengo a ver el piso")', translation: 'Hello! Please greet me. (Try: "Buenas tardes, vengo a ver el piso")' }
        },
        overview: {
          responses: [
            { triggers: ['alquiler', 'rent', 'cuanto', 'how much', 'precio', 'price', 'mensual', 'monthly', 'cuanto cuesta', 'coste'], text: 'El alquiler son 950 euros al mes. Los gastos aparte — luz y agua, unos 80 euros.', translation: 'Rent is €950 per month. Bills separate — electricity and water, about €80.', next: 'bills', positive: true },
            { triggers: ['bonito', 'nice', 'precioso', 'beautiful', 'grande', 'big', 'luminoso', 'bright', 'espacioso', 'spacious', 'me gusta'], text: '¡Gracias! Son 60 metros, segunda planta con ascensor. ¿Alguna pregunta sobre el piso?', translation: 'Thank you! 60 square metres, second floor with lift. Any questions?', next: 'bills' },
            { triggers: ['gastos', 'bills', 'suministros', 'supplies', 'incluidos', 'included', 'luz', 'electricity', 'agua', 'water', 'wifi', 'internet'], text: 'Los gastos no están incluidos — luz, agua, comunidad. Solo el internet ya está incluido.', translation: 'Bills not included — electricity, water, community fees. Only internet is already included.', next: 'bills', positive: true }
          ],
          fallback: { text: '¿Tiene preguntas? (Try: "¿Cuánto es el alquiler?" or "¿Los gastos están incluidos?")', translation: 'Any questions? (Try: "Cuanto es el alquiler?" = how much is the rent?)' }
        },
        bills: {
          responses: [
            { triggers: ['fianza', 'deposit', 'cuanta fianza', 'how much deposit', 'garantia', 'security', 'cuanto hay que pagar'], text: 'La fianza son dos meses — 1.900 euros. Se devuelve al final si todo está bien.', translation: 'Deposit is two months — €1,900. Returned at the end if everything is in order.', next: 'deposit', positive: true },
            { triggers: ['mascotas', 'pets', 'perro', 'dog', 'gato', 'cat', 'animales', 'animals', 'admiten', 'se permite'], text: 'Mascotas pequeñas sí. Un perro hasta 10 kilos, sin problema.', translation: 'Small pets yes. A dog up to 10 kilos, no problem.', next: 'deposit', positive: true },
            { triggers: ['internet', 'wifi', 'fibra', 'fiber', 'velocidad', 'speed', 'megas', 'megabit'], text: 'Hay fibra — 600 megas incluida en el alquiler. El router ya está instalado.', translation: 'Fibre internet — 600 megabits included in the rent. Router already installed.', next: 'deposit', positive: true },
            { triggers: ['parking', 'garaje', 'garage', 'coche', 'car', 'moto', 'aparcamiento', 'aparcar'], text: 'Aparcamiento en la calle — zona azul. Garaje hay que alquilarlo aparte si se necesita.', translation: 'Street parking — blue zone. Garage must be rented separately if needed.', next: 'deposit', positive: true }
          ],
          fallback: { text: '¿Más preguntas? Fianza, mascotas, parking, internet... 🏠', translation: 'More questions? Deposit, pets, parking, internet... (Ask anything!)' }
        },
        deposit: {
          responses: [
            { triggers: ['contrato', 'contract', 'firmar', 'sign', 'cuando', 'when', 'entrar', 'move in', 'desde cuando', 'disponible'], text: 'El contrato lo firmamos esta semana. Entrada el día primero. ¿Le interesa?', translation: 'We sign the contract this week. Move in on the first. Are you interested?', next: 'decision', positive: true },
            { triggers: ['pensar', 'think', 'tiempo', 'time', 'manana', 'tomorrow', 'consultar', 'check', 'hablar', 'talk', 'pensarlo'], text: 'Claro, tómese su tiempo. Tengo otra visita el jueves.', translation: 'Of course, take your time. I have another viewing on Thursday.', next: 'decision', positive: true },
            { triggers: ['si', 'yes', 'me interesa', 'interested', 'lo quiero', 'i want it', 'perfecto', 'trato hecho', 'lo tomo'], text: '¡Estupendo! Preparo el contrato. Necesito su DNI o pasaporte y justificante de ingresos.', translation: 'Wonderful! I\'ll prepare the contract. I need your ID/passport and proof of income.', next: 'done', positive: true }
          ],
          fallback: { text: '¿Le interesa el piso? (Try: "Me interesa" or "Necesito tiempo para pensarlo")', translation: 'Are you interested? (Try: "Me interesa" or "Necesito pensarlo")' }
        },
        decision: {
          responses: [
            { triggers: ['gracias', 'muchas gracias', 'adios', 'hasta luego', 'bye', 'goodbye', 'llamo', 'call', 'me pongo', 'en contacto', 'contacto'], text: '¡Hasta luego! Estoy aquí cuando quiera. 🏠', translation: 'Goodbye! I\'m here whenever you need. (Flat viewing complete! 🎉)', next: 'done', positive: true },
            { triggers: ['lo tomo', 'i\'ll take it', 'me interesa', 'si', 'yes', 'acepto', 'de acuerdo', 'perfecto'], text: '¡Perfecto! Le mando el contrato por correo esta tarde. ¡Bienvenido/a al barrio! 🏠', translation: 'Perfect! I\'ll send the contract by email this afternoon. Welcome to the neighbourhood! 🎉', next: 'done', positive: true }
          ],
          fallback: { text: '¿Entonces? (Say "gracias, me pongo en contacto" or "lo tomo" = I\'ll take it)', translation: 'So? Shall I call you tomorrow? (Try "gracias" or "lo tomo")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Hasta pronto! 🏠', translation: 'See you soon! (Flat viewing scenario complete! 🎉)' }
        }
      }
    },

    es_interview: {
      language: 'spanish',
      persona: {
        name: 'Ricardo',
        role: 'Responsable de RRHH — HR Manager',
        avatar: '💼',
        description: 'Ricardo has interviewed hundreds of candidates. He values concrete answers over enthusiasm. You\'re learning Spanish — that\'s already a plus. Be direct, give numbers, ask a good question at the end.'
      },
      vocabulary: [
        { cz: 'experiencia laboral', en: 'work experience' },
        { cz: 'puntos fuertes', en: 'strengths' },
        { cz: 'a largo plazo', en: 'long-term' },
        { cz: 'trabajo en equipo', en: 'teamwork' },
        { cz: 'fecha de incorporación', en: 'start date' },
        { cz: 'pretensiones salariales', en: 'salary expectations' },
        { cz: 'motivación', en: 'motivation' },
        { cz: 'encantado de conocerle', en: 'pleased to meet you (formal)' }
      ],
      context: 'Job interview at a Madrid company. Ricardo is the HR manager. Be direct, give concrete answers, show you\'re serious about Spain long-term. Speaking Spanish — even imperfect — is already impressive.',
      tip: 'Start: "Buenos días, encantado/a de conocerle. Muchas gracias por recibirme." — gold standard opener.',
      opening: { text: 'Buenos días. Siéntese, por favor. 💼', translation: 'Good morning. Please sit down.' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenos dias', 'buenas', 'hola', 'encantado', 'encantada', 'gracias por', 'thank you for', 'mucho gusto', 'pleased to meet', 'recibirme', 'invitarme'], text: 'Gracias por venir. Cuénteme — ¿por qué España?', translation: 'Thank you for coming. Tell me — why Spain?', next: 'why_es', positive: true }
          ],
          fallback: { text: '¡Buenos días! Salúdeme. (Try: "Buenos dias, encantado de conocerle. Muchas gracias por recibirme.")', translation: 'Good morning! Please greet me properly. (Try: "Buenos dias, encantado de conocerle")' }
        },
        why_es: {
          responses: [
            { triggers: ['quedarme', 'stay', 'largo plazo', 'long term', 'futuro', 'future', 'españa', 'spain', 'madrid', 'carrera', 'career', 'vida', 'life', 'me encanta', 'love it', 'oportunidad', 'opportunity'], text: 'Bien. Los planes a largo plazo son importantes aquí. ¿Cuál es su experiencia?', translation: 'Good. Long-term plans matter here. What is your experience?', next: 'expertise', positive: true },
            { triggers: ['no se', 'don\'t know', 'quiza', 'maybe', 'veremos', 'we\'ll see', 'probar', 'try out'], text: 'Hmm. Buscamos personas que quieran quedarse. Inténtelo de nuevo — ¿por qué España?', translation: 'Hmm. We look for people who want to stay. Try again — why Spain?', next: 'why_es' }
          ],
          fallback: { text: '¿Por qué España? (Try: "Quiero quedarme a largo plazo" = I want to stay long-term)', translation: 'Why Spain? (Try: "Quiero quedarme a largo plazo")' }
        },
        expertise: {
          responses: [
            { triggers: ['it', 'tech', 'software', 'marketing', 'finanzas', 'finance', 'ventas', 'sales', 'gestion', 'management', 'diseno', 'design', 'anos', 'years', 'años', 'experiencia', 'experience', 'trabajo en', 'work in', 'sector', 'campo'], text: 'Interesante. ¿Cuáles son sus puntos fuertes?', translation: 'Interesting. What are your strengths?', next: 'strengths', positive: true }
          ],
          fallback: { text: '¿En qué sector trabaja? ¿Cuántos años de experiencia? (Describe your field and years)', translation: 'What sector do you work in? How many years of experience?' }
        },
        strengths: {
          responses: [
            { triggers: ['trabajo en equipo', 'teamwork', 'organizado', 'organized', 'comunicacion', 'communication', 'analitico', 'analytical', 'resultados', 'results', 'liderazgo', 'leadership', 'adaptable', 'flexible', 'proactivo', 'fiable', 'reliable'], text: 'Bien. ¿Está aprendiendo español?', translation: 'Good. Are you learning Spanish?', next: 'spanish_lang', positive: true },
            { triggers: ['perfeccionista', 'perfectionist', 'workaholic', 'demasiado', 'too much'], text: 'Eso es un cliché. Dígame un punto fuerte genuino.', translation: 'That\'s a cliché. Tell me a genuine strength.', next: 'strengths' }
          ],
          fallback: { text: '¿Cuáles son sus puntos fuertes? (Try: "Soy organizado/a y trabajo bien en equipo")', translation: 'What are your strengths? (Try: "Soy organizado/a y trabajo bien en equipo")' }
        },
        spanish_lang: {
          responses: [
            { triggers: ['si', 'yes', 'lo estoy', 'learning', 'aprendo', 'estudiando', 'curso', 'course', 'prioridad', 'priority', 'un poco', 'poquito', 'nivel', 'level', 'mejorar', 'improve', 'clases'], text: 'Perfecto, es un plus importante. ¿Cuáles son sus pretensiones salariales?', translation: 'Perfect, that\'s an important plus. What are your salary expectations?', next: 'salary', positive: true },
            { triggers: ['no', 'todavia no', 'not yet', 'pronto', 'soon', 'despues', 'later', 'ingles', 'english only'], text: 'Entendido. En esta empresa el español es clave. ¿Sería posible para usted aprender?', translation: 'Understood. Spanish is key at this company. Would learning it be possible for you?', next: 'spanish_lang' }
          ],
          fallback: { text: '¿Está aprendiendo español? (Try: "Sí, lo estoy aprendiendo. Es mi prioridad.")', translation: 'Are you learning Spanish? (Try: "Si, lo estoy aprendiendo")' }
        },
        salary: {
          responses: [
            { triggers: ['euros', 'bruto', 'neto', 'gross', 'net', 'mil', 'thousand', 'mensual', 'monthly', 'anual', 'annual', 'espero', 'expect', 'numero', 'number', 'cifra', 'rango', 'range'], text: 'Entendido. Estamos dentro del rango. ¿Cuándo podría incorporarse?', translation: 'Understood. We\'re within the range. When could you start?', next: 'start_date', positive: true },
            { triggers: ['flexible', 'negociable', 'abierto', 'open', 'mercado', 'market', 'discutir', 'discuss', 'depende'], text: 'La flexibilidad está bien, pero dígame su límite mínimo.', translation: 'Flexibility is fine, but tell me your minimum.', next: 'salary' }
          ],
          fallback: { text: '¿Cuáles son sus pretensiones salariales? Dígame una cifra. (e.g. "Espero 35.000 euros brutos")', translation: 'What are your salary expectations? Give a number.' }
        },
        start_date: {
          responses: [
            { triggers: ['inmediatamente', 'immediately', 'ahora', 'now', 'mes', 'month', 'dos semanas', 'two weeks', 'proximo', 'next', 'negociable', 'negotiate', 'flexible', 'pronto', 'soon'], text: 'Perfecto. Le contactamos antes del viernes. ¿Tiene alguna pregunta para nosotros?', translation: 'Perfect. We\'ll contact you before Friday. Do you have any questions for us?', next: 'questions', positive: true }
          ],
          fallback: { text: '¿Cuándo podría incorporarse? (Try: "Inmediatamente" or "En un mes")', translation: 'When could you start? (Try: "Inmediatamente" or "En un mes")' }
        },
        questions: {
          responses: [
            { triggers: ['equipo', 'team', 'cultura', 'culture', 'proyectos', 'projects', 'crecimiento', 'growth', 'desarrollo', 'development', 'por que', 'why', 'que hacen', 'what do you do', 'ambiente'], text: 'Buena pregunta. Me alegra el interés. Le respondo con los resultados por correo. ¡Hasta pronto! 💼', translation: 'Good question. Glad you\'re interested. I\'ll answer with the results by email. See you soon! (Interview complete! 🎉)', next: 'done', positive: true },
            { triggers: ['no', 'ninguna', 'no questions', 'todo claro', 'all clear', 'gracias', 'thank you', 'hasta luego', 'goodbye', 'adios', 'perfecto'], text: 'Perfecto. Le contactamos esta semana. ¡Mucha suerte! 💼', translation: 'Perfect. We\'ll be in touch this week. Good luck! (Interview complete! 🎉)', next: 'done', positive: true }
          ],
          fallback: { text: '¿Alguna pregunta para nosotros? (Try: "¿Cómo es el equipo?" or "Muchas gracias, ninguna más.")', translation: 'Any questions for us? (Try: "Como es el equipo?" or "Muchas gracias, ninguna mas.")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Hasta pronto! ¡Mucha suerte! 💼', translation: 'See you soon! Good luck! (Job interview scenario complete! 🎉)' }
        }
      }
    },

    es_doctor: {
      language: 'spanish',
      persona: {
        name: 'Dra. Vega',
        role: 'Médica de cabecera — GP',
        avatar: '🩺',
        description: 'Warm and thorough. Used to international patients — just describe your symptoms clearly and she\'ll handle the rest. Bring your tarjeta sanitaria (health card).'
      },
      vocabulary: [
        { cz: 'me duele', en: 'it hurts / I have pain in' },
        { cz: 'desde cuándo', en: 'since when / how long' },
        { cz: 'la fiebre', en: 'fever' },
        { cz: 'la receta', en: 'prescription' },
        { cz: 'la tarjeta sanitaria', en: 'health card' },
        { cz: 'los medicamentos', en: 'medication' },
        { cz: 'la alergia', en: 'allergy' },
        { cz: 'el descanso', en: 'rest' }
      ],
      context: 'You\'re at a Spanish GP (médico de cabecera). Dra. Vega will ask about your symptoms, examine you, and write a prescription if needed. Bring your tarjeta sanitaria.',
      tip: 'Start: "Buenos días, doctora." Then describe what\'s wrong: "Me duele la cabeza" = I have a headache.',
      opening: { text: 'Buenos días. ¿Qué le trae hoy? 🩺', translation: 'Good morning. What brings you in today?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['buenos dias', 'buenas', 'hola', 'doctora', 'doctor', 'hello', 'good morning', 'buenas tardes'], text: 'Buenos días. Siéntese, por favor. ¿Qué le ocurre?', translation: 'Good morning. Please sit down. What\'s the matter?', next: 'symptoms', positive: true }
          ],
          fallback: { text: 'Salúdeme, por favor. (Try: "Buenos dias, doctora")', translation: 'Please greet me. (Try: "Buenos dias, doctora")' }
        },
        symptoms: {
          responses: [
            { triggers: ['cabeza', 'head', 'dolor de cabeza', 'headache', 'migrana', 'migraine', 'jaqueca', 'me duele la cabeza'], text: 'Dolor de cabeza. ¿Desde cuándo? ¿Tiene fiebre?', translation: 'Headache. Since when? Do you have a fever?', next: 'duration', positive: true },
            { triggers: ['garganta', 'throat', 'dolor de garganta', 'sore throat', 'tragar', 'swallow', 'tos', 'cough', 'me duele al tragar'], text: 'La garganta. Déjeme mirar. ¿Desde hace cuánto tiempo?', translation: 'Your throat. Let me look. Since when?', next: 'duration', positive: true },
            { triggers: ['estomago', 'stomach', 'barriga', 'belly', 'nauseas', 'nausea', 'vomito', 'vomit', 'diarrea', 'diarrhea', 'me duele el estomago'], text: 'Molestias digestivas. ¿Ha comido algo diferente?', translation: 'Digestive issues. Did you eat anything unusual?', next: 'duration', positive: true },
            { triggers: ['espalda', 'back', 'lumbar', 'lower back', 'dolor de espalda', 'back pain', 'me duele la espalda', 'rinones', 'kidneys'], text: 'Espalda. ¿Trabaja sentado/a?', translation: 'Back. Sedentary work?', next: 'duration', positive: true },
            { triggers: ['cansancio', 'tired', 'fatiga', 'fatigue', 'agotado', 'exhausted', 'sin energia', 'no energy', 'debil', 'weak', 'me siento mal'], text: 'Cansancio. ¿Cómo está durmiendo? ¿Desde cuándo?', translation: 'Tiredness. How are you sleeping? Since when?', next: 'duration', positive: true }
          ],
          fallback: { text: '¿Dónde le duele? (Try: "Me duele la cabeza" or "Me duele la garganta")', translation: 'Where does it hurt? (Try: "Me duele la cabeza" = I have a headache)' }
        },
        duration: {
          responses: [
            { triggers: ['hoy', 'today', 'esta manana', 'morning', 'un dia', 'one day', 'ayer', 'yesterday', 'poco', 'just started', 'hace poco'], text: 'Reciente. ¿Tiene fiebre? ¿Alguna alergia a medicamentos?', translation: 'Recent. Do you have a fever? Any medication allergies?', next: 'examination', positive: true },
            { triggers: ['semanas', 'weeks', 'semana', 'week', 'mes', 'month', 'tiempo', 'while', 'hace', 'ago', 'dias', 'days', 'varios'], text: 'Lleva tiempo. La exploro. ¿Toma algún medicamento actualmente?', translation: 'It\'s been a while. I\'ll examine you. Are you currently taking any medication?', next: 'examination', positive: true },
            { triggers: ['dos', 'two', 'tres', 'three', 'cuatro', 'four', 'cinco', 'five', 'par', 'couple'], text: 'Entendido. La voy a explorar. ¿Alguna alergia conocida?', translation: 'Understood. I\'ll examine you. Any known allergies?', next: 'examination', positive: true }
          ],
          fallback: { text: '¿Desde cuándo tiene estos síntomas? (Try: "Desde ayer" = since yesterday, "Hace una semana" = for a week)', translation: 'Since when have you had these symptoms?' }
        },
        examination: {
          responses: [
            { triggers: ['no', 'ninguna', 'none', 'sin alergias', 'no allergies', 'sano', 'healthy', 'nada', 'nothing', 'ninguna alergia'], text: 'Bien. Parece una infección viral. Le receto algo.', translation: 'Good. Looks like a viral infection. I\'ll prescribe something.', next: 'prescription', positive: true },
            { triggers: ['si', 'yes', 'tengo alergia', 'allergic', 'soy alergico', 'penicilina', 'penicillin', 'ibuprofeno', 'ibuprofen', 'aspirina', 'aspirin'], text: 'Lo anoto. Le receto una alternativa sin ese componente.', translation: 'I\'ll note that. I\'ll prescribe an alternative without that component.', next: 'prescription', positive: true }
          ],
          fallback: { text: '¿Tiene alergia a algún medicamento? (Try: "No, ninguna" or "Sí, soy alérgico/a a...")', translation: 'Are you allergic to any medication? (Try: "No, ninguna" = none)' }
        },
        prescription: {
          responses: [
            { triggers: ['gracias', 'muchas gracias', 'thank', 'entendido', 'understood', 'ok', 'bien', 'adios', 'hasta luego', 'receta', 'farmacia', 'pharmacy', 'perfecto'], text: 'La receta está lista. La farmacia está al lado. Reposo tres días. ¡Que se mejore! 🩺', translation: 'Prescription ready. Pharmacy is right next door. Rest for three days. Get well soon! (Doctor visit complete! 🎉)', next: 'done', positive: true },
            { triggers: ['cuanto', 'how long', 'cuando', 'when', 'mejorar', 'better', 'recuperar', 'recover', 'tiempo', 'cuanto tarda'], text: 'En tres o cuatro días debería notar mejoría. Si no, vuelva a verme.', translation: 'In three or four days you should feel better. If not, come back.', next: 'done', positive: true }
          ],
          fallback: { text: '¿Alguna pregunta sobre la receta? (Try: "Muchas gracias, doctora. Hasta luego.")', translation: 'Any questions about the prescription? (Try: "Muchas gracias, doctora. Hasta luego.")' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Que se mejore pronto! 🩺', translation: 'Get well soon! (Doctor visit scenario complete! 🎉)' }
        }
      }
    },

    es_grocery: {
      language: 'spanish',
      persona: {
        name: 'Pepe',
        role: 'Cajero — Supermarket Cashier',
        avatar: '🛒',
        description: 'Pepe works the checkout at the local Mercadona. Efficient, quick, slightly bored — but he warms up if you try Spanish. He will ask about your tarjeta de fidelización before anything else.'
      },
      vocabulary: [
        { cz: 'la bolsa', en: 'bag' },
        { cz: '¿cuánto es?', en: 'how much is it?' },
        { cz: 'pagar con tarjeta', en: 'pay by card' },
        { cz: 'la tarjeta de fidelización', en: 'loyalty card' },
        { cz: 'el ticket', en: 'receipt' },
        { cz: 'en efectivo', en: 'cash' },
        { cz: 'el cambio', en: 'change' },
        { cz: 'sin bolsa', en: 'no bag needed' }
      ],
      context: 'You\'re at the checkout in a Spanish supermarket (Mercadona/Lidl/Carrefour). Pepe will scan your items, ask about your loyalty card and bag, then take payment. Quick — there\'s a queue!',
      tip: 'Say "Tengo bolsa" (I have a bag) right away. Then "con tarjeta" for card. That\'s 90% of the interaction.',
      opening: { text: 'Buenas. ¿Tienes tarjeta de fidelización? 🛒', translation: 'Hi. Do you have a loyalty card?' },
      corrections: ES_CORRECTIONS,
      states: {
        start: {
          responses: [
            { triggers: ['no', 'no tengo', 'don\'t have', 'sin tarjeta', 'no card', 'olvide', 'forgot', 'nope'], text: 'Vale. ¿Bolsa?', translation: 'OK. Bag?', next: 'bag', positive: true },
            { triggers: ['si', 'yes', 'tengo', 'aqui', 'here', 'la tarjeta', 'card', 'la tengo', 'toma'], text: 'Pásala. ¿Bolsa?', translation: 'Pass it. Bag?', next: 'bag', positive: true },
            { triggers: ['buenas', 'hola', 'buenos dias', 'hello', 'hi', 'que tal'], text: 'Buenas. ¿Tarjeta de fidelización?', translation: 'Hi. Loyalty card?', next: 'start', positive: true }
          ],
          fallback: { text: '¿Tienes tarjeta de fidelización? (Try: "No, no tengo" or "Sí, aquí")', translation: 'Loyalty card? (Try: "No, no tengo" or "Si, aqui")' }
        },
        bag: {
          responses: [
            { triggers: ['tengo bolsa', 'have bag', 'bolsa', 'bag', 'si tengo', 'mi bolsa', 'ya tengo', 'traigo', 'brought', 'propia', 'own', 'si', 'yes'], text: 'Perfecto. Son 27,50 euros.', translation: 'Perfect. That\'s €27.50.', next: 'payment', positive: true },
            { triggers: ['no', 'sin bolsa', 'no bag', 'una bolsa', 'one bag', 'necesito', 'need', 'dame una'], text: 'La bolsa son 10 céntimos. Total: 27,60 euros.', translation: 'Bag is 10 cents. Total: €27.60.', next: 'payment', positive: true }
          ],
          fallback: { text: '¿Bolsa? (Try: "Tengo bolsa" = I have a bag, or "No, sin bolsa" = no bag)', translation: 'Bag? (Say "Tengo bolsa" if you have one)' }
        },
        payment: {
          responses: [
            { triggers: ['tarjeta', 'card', 'con tarjeta', 'visa', 'mastercard', 'contactless', 'bizum', 'pago con tarjeta'], text: 'Acerca la tarjeta. ¡Listo! ¡Hasta luego! 🛒', translation: 'Tap your card. Done! Goodbye! (Supermarket complete! 🎉)', next: 'done', positive: true },
            { triggers: ['efectivo', 'cash', 'billetes', 'euros', 'dinero', 'money', 'en efectivo', 'pago en efectivo'], text: 'Gracias. Su cambio, 2,50 euros. ¡Hasta luego! 🛒', translation: 'Thanks. Your change, €2.50. Goodbye! (Supermarket complete! 🎉)', next: 'done', positive: true }
          ],
          fallback: { text: '¿Con tarjeta o en efectivo? (Try: "Con tarjeta" = card, "En efectivo" = cash)', translation: 'Card or cash? (Say "Con tarjeta" for card)' }
        },
        done: {
          responses: [],
          fallback: { text: '¡Hasta luego! 🛒', translation: 'Goodbye! (Supermarket scenario complete! 🎉)' }
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

  // ── PERSONALITY FLAVOR ─────────────────────────────────
  // Each persona has a style that wraps responses with flair
  const PERSONALITY = {
    pub:        { style: 'casual',  prefixes: ['', '', 'Hmm. '],   suffixes: [' 🍺', '', ''] },
    parents:    { style: 'warm',    prefixes: ['', 'Hele, ', ''],   suffixes: [' 😊', '', ' ❤️'] },
    police:     { style: 'formal',  prefixes: ['', 'Dobrá. ', ''], suffixes: ['', ' 📋', ''] },
    office:     { style: 'dry',     prefixes: ['', 'Tak. ', ''],   suffixes: [' 😄', '', ''] },
    date:       { style: 'flirty',  prefixes: ['', 'Haha. ', ''],  suffixes: [' 😊', ' ❤️', ''] },
    flat:       { style: 'formal',  prefixes: ['', '', 'Dobrá. '], suffixes: ['', ' 🏠', ''] },
    padel:      { style: 'sporty',  prefixes: ['', 'Tak! ', ''],   suffixes: [' 🎾', '', ' 💪'] },
    interview:  { style: 'formal',  prefixes: ['', '', 'Hmm. '],   suffixes: ['', ' 💼', ''] },
    es_tapas:     { style: 'casual',  prefixes: ['', '¡Venga! ', ''],  suffixes: [' 🍺', '', ''] },
    es_family:    { style: 'warm',    prefixes: ['', '¡Ay! ', ''],     suffixes: [' 😊', '', ' ❤️'] },
    es_nie:       { style: 'formal',  prefixes: ['', 'Bien. ', ''],    suffixes: ['', ' 📋', ''] },
    es_office:    { style: 'chatty',  prefixes: ['', '¡Oye! ', ''],   suffixes: [' 😄', ' ☕', ''] },
    es_date:      { style: 'flirty',  prefixes: ['', 'Jaja. ', ''],    suffixes: [' 😊', ' 🌹', ''] },
    es_padel:     { style: 'sporty',  prefixes: ['', '¡Venga! ', ''],  suffixes: [' 🎾', '', ' 💪'] },
    es_flat:      { style: 'formal',  prefixes: ['', 'Bien. ', ''],    suffixes: ['', ' 🏠', ''] },
    es_interview: { style: 'formal',  prefixes: ['', '', 'Hmm. '],     suffixes: ['', ' 💼', ''] },
    es_doctor:    { style: 'calm',    prefixes: ['', '', 'Bien. '],    suffixes: ['', ' 🩺', ''] },
    es_grocery:   { style: 'bored',   prefixes: ['', '', 'Vale. '],    suffixes: ['', ' 🛒', ''] },
    doctor:       { style: 'calm',    prefixes: ['', '', 'Dobře. '],   suffixes: ['', ' 🩺', ''] },
    grocery:      { style: 'tired',   prefixes: ['', '', 'Dobře. '],   suffixes: ['', ' 🛒', ''] }
  };

  function addFlavor(text, scenarioId) {
    const p = PERSONALITY[scenarioId];
    if (!p) return text;
    const prefix = p.prefixes[Math.floor(Math.random() * p.prefixes.length)];
    const suffix = p.suffixes[Math.floor(Math.random() * p.suffixes.length)];
    // Don't double-add emoji if text already ends with one
    if (text.match(/[\u{1F300}-\u{1FAFF}]\s*$/u)) return prefix + text;
    return prefix + text + suffix;
  }

  // ── QUICK BUTTON HINTS ─────────────────────────────────
  // Returns contextual help without advancing state or resetting
  const QUICK_HINTS = {
    czech: {
      'dont_understand': [
        { text: 'Nerozumím. Můžete to zopakovat?', translation: 'I don\'t understand. Can you repeat that?' },
        { text: 'Promiňte, nerozuměl/a jsem.', translation: 'Sorry, I didn\'t understand.' },
        { text: 'Pomaleji, prosím.', translation: 'Slower, please.' }
      ],
      'repeat': [
        { text: 'Můžete to zopakovat?', translation: 'Can you repeat that?' },
        { text: 'Ještě jednou, prosím.', translation: 'One more time, please.' }
      ],
      'slower': [
        { text: 'Mluvte pomaleji, prosím.', translation: 'Speak more slowly, please.' },
        { text: 'Pomalu, prosím. Učím se česky.', translation: 'Slow down, please. I\'m learning Czech.' }
      ]
    },
    spanish: {
      'dont_understand': [
        { text: 'Perdone, no entiendo.', translation: 'Sorry, I don\'t understand.' },
        { text: 'No he entendido. ¿Puede repetir?', translation: 'I didn\'t get that. Can you repeat?' },
        { text: 'Más despacio, por favor.', translation: 'Slower, please.' }
      ],
      'repeat': [
        { text: '¿Puede repetirlo, por favor?', translation: 'Can you repeat that, please?' },
        { text: 'Otra vez, por favor.', translation: 'Again, please.' }
      ],
      'slower': [
        { text: 'Más despacio, por favor.', translation: 'Slower, please.' },
        { text: 'Hable más lento, por favor. Estoy aprendiendo.', translation: 'Speak slower, please. I\'m learning.' }
      ]
    }
  };

  let lastHintType = null;

  function processQuickButton(type) {
    if (!currentScenario) return null;
    const lang = currentScenario.language || 'czech';
    const hints = QUICK_HINTS[lang]?.[type];
    if (!hints || !hints.length) return null;
    // Pick a random hint, avoid same one twice
    let hint = hints[Math.floor(Math.random() * hints.length)];
    if (hints.length > 1 && type === lastHintType) {
      hint = hints.find(h => h.text !== hint.text) || hint;
    }
    lastHintType = type;

    // Bot responds with encouragement + the current state fallback hint
    const state = currentScenario.states[currentState];
    const fallback = state?.fallback;
    const encourageTexts = lang === 'spanish'
      ? ['¡No te preocupes! ', 'Tranquilo/a. ', '¡Sin problema! ']
      : ['Žádný problém! ', 'V klidu. ', 'Nevadí! '];
    const encourage = encourageTexts[Math.floor(Math.random() * encourageTexts.length)];

    return {
      userHint: hint,
      botResponse: {
        text: encourage + (fallback ? fallback.text : ''),
        translation: (fallback ? fallback.translation : 'Try again!')
      }
    };
  }

  // ── SWEAR WORD DETECTION ──────────────────────────────
  const SWEAR_WORDS = {
    czech:   ['kurva', 'prdele', 'hovno', 'picka', 'jebat', 'zkurveny'],
    spanish: ['coño', 'joder', 'puta', 'mierda', 'hostia', 'follar', 'cojones']
  };

  function checkSwear(input, lang) {
    const words = SWEAR_WORDS[lang] || [];
    const n = norm(input);
    return words.some(w => n.includes(norm(w)));
  }

  // ── IMPRESS MODE ─────────────────────────────────────
  const IMPRESS_TRIGGERS = ['impress', 'help me impress', 'impress mode', 'sound good', 'sound native',
                            'impresionar', 'quedar bien', 'ayudame', 'como digo', 'que digo'];

  function checkImpress(input) {
    return IMPRESS_TRIGGERS.some(t => norm(input).includes(norm(t)));
  }

  function getImpressResponse(lang, stateKey) {
    const stateData = currentScenario ? currentScenario.states[stateKey] : null;
    const hint = stateData?.fallback;
    // Strip the (Try: ...) helper portion, leaving the actual phrase suggestion
    const phrase = hint ? hint.text.replace(/\(Try:.*\)/, '').replace(/\(Say.*\)/, '').trim() : '';
    if (lang === 'spanish') {
      const intros = ['¡Claro! Di esto: ', '¡Fácil! Prueba así: ', '¡Venga! Di: '];
      const intro = intros[Math.floor(Math.random() * intros.length)];
      return {
        text: intro + (phrase ? `"${phrase}"` : '¡Tú puedes! 😄'),
        translation: hint ? hint.translation : 'You can do it!'
      };
    } else {
      const intros = ['Jasně! Zkus: ', 'Jednoduché — řekni: ', 'Takhle: '];
      const intro = intros[Math.floor(Math.random() * intros.length)];
      return {
        text: intro + (phrase ? `"${phrase}"` : 'Zvládneš to! 😄'),
        translation: hint ? hint.translation : 'You can do it!'
      };
    }
  }

  // Track last fallback to add variety on repeat
  let lastFallbackState = null;
  let fallbackRepeatCount = 0;

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

    const lang = currentScenario.language || 'czech';
    messageCount++;

    // ── Swear word check ──────────────────────────────
    if (checkSwear(userInput, lang)) {
      const resp = lang === 'spanish'
        ? { text: '¡Ey! 😄 Habla bien o te respondo igual. ¡Inténtalo de nuevo!', translation: 'Hey! Speak nicely or I\'ll do the same. Try again!' }
        : { text: 'Hele! 😄 Mluv slušně, nebo budu taky hrubý. Zkus to znovu!', translation: 'Hey! Speak nicely or I\'ll be rude too. Try again!' };
      return { response: resp, correction: null, encouragement: null, state: currentState };
    }

    // ── Impress mode ──────────────────────────────────
    if (checkImpress(userInput)) {
      const resp = getImpressResponse(lang, currentState);
      return { response: resp, correction: null, encouragement: null, state: currentState };
    }

    const correction = checkCorrections(userInput);
    const match = findResponse(userInput, currentState);

    let response;
    let nextState = currentState;

    if (match) {
      // Reset repeat counter on successful match
      fallbackRepeatCount = 0;
      lastFallbackState = null;
      response = { text: addFlavor(match.text, currentScenarioId), translation: match.translation, positive: match.positive || false };
      nextState = match.next || currentState;
    } else {
      // Track repeats to add variety when user is stuck
      if (lastFallbackState === currentState) {
        fallbackRepeatCount++;
      } else {
        fallbackRepeatCount = 0;
        lastFallbackState = currentState;
      }

      const fallback = currentScenario.states[currentState]?.fallback;

      // Add a friendly nudge prefix on second+ repeat to avoid robotic loops
      let prefix = '';
      if (fallbackRepeatCount >= 2) {
        const nudges = lang === 'spanish'
          ? ['¡Casi! ', '¡No te rindas! ', '¡Prueba de nuevo! ']
          : ['Skoro! ', 'Zkus to jinak. ', 'Žádný strach — '];
        prefix = nudges[Math.floor(Math.random() * nudges.length)];
      } else if (fallbackRepeatCount === 1) {
        prefix = lang === 'spanish' ? '¿Seguro? ' : 'Hmm? ';
      }

      response = fallback
        ? { text: prefix + fallback.text, translation: fallback.translation, positive: false }
        : {
            text: lang === 'spanish'
              ? '¿Puedes repetirlo de otra forma? 😄'
              : 'Nerozuměl jsem — zkus to trochu jinak. 😄',
            translation: 'Could you put that a different way?',
            positive: false
          };
    }

    currentState = nextState;

    let encouragement = null;
    if (messageCount === 3 && correctionsGiven === 0) {
      encouragement = 'Great start — your ' + (lang === 'spanish' ? 'Spanish' : 'Czech') + ' is looking solid!';
    } else if (currentState === 'done') {
      encouragement = 'Scenario complete! You nailed it. 🎉';
    }

    return { response, correction, encouragement, state: currentState };
  }

  // ── SPEECH SYNTHESIS ─────────────────────────────────────
  function speak(text, lang) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'spanish' ? 'es-ES' : 'cs-CZ';
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  }

  function getLanguage() {
    return currentScenario ? currentScenario.language : 'czech';
  }

  function getAvailableScenarios() {
    return ALL_CHAT_SCENARIOS;
  }

  function hasChatSupport(scenarioId) {
    return !!ALL_CHAT_SCENARIOS[scenarioId];
  }

  // ── SAVE / RESTORE STATE ───────────────────────────────
  function getState() {
    return { state: currentState, messageCount, correctionsGiven };
  }

  function restoreState(snapshot) {
    if (!currentScenario || !snapshot) return;
    currentState      = snapshot.state      || 'start';
    messageCount      = snapshot.messageCount      || 0;
    correctionsGiven  = snapshot.correctionsGiven  || 0;
  }

  return { init, process, processQuickButton, speak, getLanguage, getAvailableScenarios, hasChatSupport, getState, restoreState };

})();
