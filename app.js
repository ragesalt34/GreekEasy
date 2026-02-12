// Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('secondary_bg_color');

// ============================================
// SRS КОНСТАНТЫ И КОНФИГУРАЦИЯ
// ============================================

const SRS_CONFIG = {
    LEARNED_MIN_INTERVAL_DAYS: 21,
    LEARNED_MIN_REPETITIONS: 3,
    INITIAL_EASE: 2.5,
    INITIAL_INTERVAL: 1,
    MIN_EASE: 1.3,
    MAX_EASE: 3.0,
    MIN_INTERVAL: 1,
    DEFAULT_SESSION_SIZE: 20,
    DEFAULT_NEW_LIMIT: 5
};

const STATUS = {
    TO_LEARN: 'Изучить',
    PRACTICED: 'Практиковал',
    LEARNED: 'Выучено'
};

// ============================================
// ПЕРЕВОДЫ
// ============================================

let currentLang = 'ru';

const translations = {
    ru: {
        appTitle: 'Гражданство Греции',
        todayLabel: 'Сегодня',
        toLearnLabel: 'Изучить',
        practicedLabel: 'Практиковал',
        learnedLabel: 'Выучено',
        back: 'Назад',
        progressLabel: 'Прогресс',
        timeLabel: 'Время',
        nopeText: 'Не знаю',
        likeText: 'Знаю',
        completionTitle: 'Отличная работа!',
        studiedText: 'Изучено:',
        timeText: 'Время:',
        nopeCountText: 'Не знаю:',
        likeCountText: 'Знаю:',
        questionLabel: 'ВОПРОС',
        answerLabel: 'ОТВЕТ',
        tapHint: '👆 Нажмите чтобы увидеть ответ',
        startBtn: 'Начать обучение'
    },
    el: {
        appTitle: 'Υπηκοότητα Ελλάδας',
        todayLabel: 'Σήμερα',
        toLearnLabel: 'Μάθηση',
        practicedLabel: 'Εξασκήθηκε',
        learnedLabel: 'Μαθημένα',
        back: 'Πίσω',
        progressLabel: 'Πρόοδος',
        timeLabel: 'Χρόνος',
        nopeText: 'Δεν ξέρω',
        likeText: 'Ξέρω',
        completionTitle: 'Εξαιρετική δουλειά!',
        studiedText: 'Μελετήθηκε:',
        timeText: 'Χρόνος:',
        nopeCountText: 'Δεν ξέρω:',
        likeCountText: 'Ξέρω:',
        questionLabel: 'ΕΡΩΤΗΣΗ',
        answerLabel: 'ΑΠΑΝΤΗΣΗ',
        tapHint: '👆 Πατήστε για απάντηση',
        startBtn: 'Ξεκινήστε'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'el' : 'ru';
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLang];
    document.getElementById('app-title').textContent = t.appTitle;
    document.getElementById('lang-btn').textContent = currentLang.toUpperCase();
    
    const els = {
        'today-label': 'todayLabel',
        'new-label': 'toLearnLabel',
        'learning-label': 'practicedLabel',
        'review-label': 'learnedLabel',
        'start-btn': 'startBtn',
        'nope-text': 'nopeText',
        'like-text': 'likeText'
    };
    
    Object.keys(els).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[els[id]];
    });
}

// ============================================
// ВОПРОСЫ
// ============================================

const questionsData = {
    история: [
        {
            question: 'Какие великие цивилизации Древней Греции вы знаете? И в каких областях Греции они развивались?',
            answer: 'Минойская цивилизация (Крит), Микенская цивилизация (Пелопоннес), Классическая Греция (Афины, Спарта, Коринф, Фивы)',
            questionEl: 'Ποιους μεγάλους πολιτισμούς της Αρχαίας Ελλάδας γνωρίζετε;',
            answerEl: 'Μινωικός πολιτισμός (Κρήτη), Μυκηναϊκός πολιτισμός (Πελοπόννησος), Κλασική Ελλάδα'
        },
        {
            question: 'В древние времена Греция была единым государством, как сегодня?',
            answer: 'Нет, в древности Греция состояла из независимых городов-государств (полисов), таких как Афины, Спарта, Коринф',
            questionEl: 'Στην αρχαιότητα η Ελλάδα ήταν ενιαίο κράτος;',
            answerEl: 'Όχι, αποτελείτο από ανεξάρτητες πόλεις-κράτη'
        },
        {
            question: 'Кто объединил всех древних греков?',
            answer: 'Александр Македонский (Μέγας Αλέξανδρος) объединил греческие города-государства',
            questionEl: 'Ποιος ένωσε τους αρχαίους Έλληνες;',
            answerEl: 'Ο Μέγας Αλέξανδρος'
        },
        {
            question: 'После Александра Македонского и эллинистической эпохи что происходит дальше?',
            answer: 'После эллинистической эпохи Греция попала под власть Римской империи (146 г. до н.э.)',
            questionEl: 'Μετά τον Μέγα Αλέξανδρο τι συμβαίνει;',
            answerEl: 'Η Ελλάδα υπό τη Ρωμαϊκή Αυτοκρατορία (146 π.Χ.)'
        },
        {
            question: 'После 400 лет под властью турок, когда произошла Греческая революция?',
            answer: '25 марта 1821 года началась Греческая война за независимость',
            questionEl: 'Πότε έγινε η Ελληνική Επανάσταση;',
            answerEl: 'Στις 25 Μαρτίου 1821'
        },
        {
            question: 'Назовите героев Греческой революции 1821 года',
            answer: 'Θεόδωρος Κολοκοτρώνης, Λασκαρίνα Μπουμπουλίνα, Ρήγας Φεραίος, Παπαφλέσσας',
            questionEl: 'Αναφέρετε ήρωες της Επανάστασης του 1821',
            answerEl: 'Κολοκοτρώνης, Μπουμπουλίνα, Φεραίος, Παπαφλέσσας'
        },
        {
            question: 'Когда Греция была признана иностранными державами как свободное государство?',
            answer: 'В 1830 году по Лондонскому протоколу Греция была признана независимым государством',
            questionEl: 'Πότε αναγνωρίστηκε η Ελλάδα ως ελεύθερο κράτος;',
            answerEl: 'Το 1830 με το Πρωτόκολλο του Λονδίνου'
        },
        {
            question: 'Какой город был первой столицей и кто был первым правителем?',
            answer: 'Нафплион (Ναύπλιο) - первая столица. Иоаннис Каподистрия (1828-1831) - первый правитель',
            questionEl: 'Ποια ήταν η πρώτη πρωτεύουσα και ποιος ο πρώτος κυβερνήτης;',
            answerEl: 'Ναύπλιο - πρώτη πρωτεύουσα. Καποδίστριας (1828-1831)'
        },
        {
            question: 'Кто правил затем (после первого правителя)?',
            answer: 'После Каподистрии правил король Оттон (Όθωνας) 1832-1862',
            questionEl: 'Ποιος κυβέρνησε μετά;',
            answerEl: 'Βασιλιάς Όθωνας 1832-1862'
        },
        {
            question: 'После Отто какие великие премьер-министры были?',
            answer: 'Элефтериос Венизелос (Ελευθέριος Βενιζέλος) - самый известный премьер-министр',
            questionEl: 'Μετά τον Όθωνα ποιοι μεγάλοι πρωθυπουργοί ήταν;',
            answerEl: 'Ελευθέριος Βενιζέλος'
        },
        {
            question: 'Когда второй большой национальный праздник?',
            answer: '28 октября - День "Охи" (Επέτειος του Όχι), когда Греция отказалась капитулировать перед Италией в 1940',
            questionEl: 'Πότε η δεύτερη μεγάλη εθνική γιορτή;',
            answerEl: '28 Οκτωβρίου - Επέτειος του Όχι (1940)'
        },
        {
            question: 'Что за трудный период был в 1967–1974 годах?',
            answer: 'Военная хунта (диктатура черных полковников) правила Грецией с 1967 по 1974',
            questionEl: 'Τι δύσκολη περίοδος ήταν το 1967-1974;',
            answerEl: 'Στρατιωτική χούντα (δικτατορία) 1967-1974'
        },
        {
            question: 'Кто написал национальный гимн?',
            answer: 'Дионисиос Соломос написал стихи "Гимн свободе", музыку написал Николаос Мандзарос',
            questionEl: 'Ποιος έγραψε τον εθνικό ύμνο;',
            answerEl: 'Διονύσιος Σολωμός (στίχοι), Νικόλαος Μάντζαρος (μουσική)'
        }
    ],
    география: [
        {
            question: 'Где находится Греция? Каковы её границы?',
            answer: 'Греция на юго-востоке Европы. Граничит с Албанией, Северной Македонией, Болгарией и Турцией',
            questionEl: 'Πού βρίσκεται η Ελλάδα; Ποια τα σύνορά της;',
            answerEl: 'Νοτιοανατολική Ευρώπη. Σύνορα: Αλβανία, Β. Μακεδονία, Βουλγαρία, Τουρκία'
        },
        {
            question: 'Какими морями омывается Греция и какие группы островов?',
            answer: 'Эгейское, Ионическое, Средиземное море. Острова: Киклады, Додеканес, Ионические, Спорады',
            questionEl: 'Από ποιες θάλασσες πλένεται η Ελλάδα;',
            answerEl: 'Αιγαίο, Ιόνιο, Μεσόγειος. Νησιά: Κυκλάδες, Δωδεκάνησα, Ιόνια, Σποράδες'
        },
        {
            question: 'Каковы географические регионы Греции? Сколько их?',
            answer: '13 регионов: Аттика, Центральная Греция, Центральная Македония, Крит, Восточная Македония и Фракия, Эпир, Ионические острова, Северные Эгейские острова, Пелопоннес, Южные Эгейские острова, Фессалия, Западная Греция, Западная Македония',
            questionEl: 'Ποιες οι γεωγραφικές περιοχές; Πόσες;',
            answerEl: '13 περιφέρειες'
        },
        {
            question: 'Какие реки и озёра Греции вы знаете?',
            answer: 'Реки: Алиакмон, Ахелоос, Пиниос. Озёра: Преспа, Трихонида, Волви',
            questionEl: 'Ποια ποτάμια και λίμνες γνωρίζετε;',
            answerEl: 'Ποτάμια: Αλιάκμονας, Αχελώος, Πηνειός. Λίμνες: Πρέσπα, Τριχωνίδα, Βόλβη'
        },
        {
            question: 'Какие самые большие города в Греции?',
            answer: 'Афины (Αθήνα) - столица, Салоники (Θεσσαλονίκη), Патры (Πάτρα), Ираклион (Ηράκλειο), Лариса (Λάρισα)',
            questionEl: 'Ποιες οι μεγαλύτερες πόλεις;',
            answerEl: 'Αθήνα, Θεσσαλονίκη, Πάτρα, Ηράκλειο, Λάρισα'
        },
        {
            question: 'Какой пункт самый северный, а какой самый южный?',
            answer: 'Север: деревня Орестиада (Фракия). Юг: остров Гавдос (к югу от Крита)',
            questionEl: 'Ποιο το πιο βόρειο και νότιο σημείο;',
            answerEl: 'Βόρειο: Ορεστιάδα (Θράκη). Νότιο: Γαύδος (νότια Κρήτης)'
        },
        {
            question: 'Как выглядит греческий флаг?',
            answer: '9 горизонтальных полос (синие и белые), синий крест вверху слева. Синий - море и небо, белый - чистота борьбы',
            questionEl: 'Πώς είναι η ελληνική σημαία;',
            answerEl: '9 λωρίδες (μπλε-άσπρες), σταυρός επάνω αριστερά'
        },
        {
            question: 'Какие объекты ЮНЕСКО в Греции вы знаете?',
            answer: 'Акрополь Афин, Дельфы, Эпидавр, Олимпия, Метеоры, Средневековый город Родос, Мистрас',
            questionEl: 'Ποια μνημεία UNESCO γνωρίζετε;',
            answerEl: 'Ακρόπολη, Δελφοί, Επίδαυρος, Ολυμπία, Μετέωρα, Ρόδος, Μυστράς'
        }
    ],
    политика: [
        {
            question: 'Что такое Конституция?',
            answer: 'Конституция - основной закон государства, определяет структуру власти и права граждан. Принята 11 июня 1975',
            questionEl: 'Τι είναι το Σύνταγμα;',
            answerEl: 'Θεμελιώδης νόμος του κράτους. Εγκρίθηκε 11 Ιουνίου 1975'
        },
        {
            question: 'Какой политический строй Греции?',
            answer: 'Парламентская республика. Есть Парламент (Βουλή), Президент (церемониальная роль), Премьер-министр (глава правительства)',
            questionEl: 'Ποιο το πολιτικό σύστημα;',
            answerEl: 'Κοινοβουλευτική Δημοκρατία'
        },
        {
            question: 'Сколько видов выборов бывает в Греции?',
            answer: 'Три вида: парламентские, европейские (Европарламент), местные (муниципальные и региональные)',
            questionEl: 'Πόσα είδη εκλογών υπάρχουν;',
            answerEl: 'Τρία: βουλευτικές, ευρωπαϊκές, τοπικές'
        },
        {
            question: 'Какие высшие суды государства вы знаете?',
            answer: 'Ареопаг (Άρειος Πάγος) - высший гражданский и уголовный суд. Государственный совет (Συμβούλιο Επικρατείας) - высший административный',
            questionEl: 'Ποια ανώτατα δικαστήρια γνωρίζετε;',
            answerEl: 'Άρειος Πάγος, Συμβούλιο της Επικρατείας'
        },
        {
            question: 'За кого голосуют граждане и как выбирается премьер-министр?',
            answer: 'Граждане голосуют за партии. Лидер партии с большинством мест в парламенте становится премьер-министром',
            questionEl: 'Για ποιον ψηφίζουν και πώς επιλέγεται ο πρωθυπουργός;',
            answerEl: 'Ψηφίζουν κόμματα. Αρχηγός κόμματος με πλειοψηφία γίνεται πρωθυπουργός'
        },
        {
            question: 'Кто является премьер-министром и президентом?',
            answer: 'Премьер-министр: Κυριάκος Μητσοτάκης. Президент: Κατερίνα Σακελλαροπούλου (первая женщина-президент)',
            questionEl: 'Ποιος ο πρωθυπουργός και ο Πρόεδρος;',
            answerEl: 'Πρωθυπουργός: Μητσοτάκης. Πρόεδρος: Σακελλαροπούλου'
        }
    ]
};

// SRS ФУНКЦИИ
function getCardStatus(card) {
    if (card.repetitions === 0) return STATUS.TO_LEARN;
    if (card.intervalDays >= SRS_CONFIG.LEARNED_MIN_INTERVAL_DAYS && 
        card.repetitions >= SRS_CONFIG.LEARNED_MIN_REPETITIONS) return STATUS.LEARNED;
    return STATUS.PRACTICED;
}

function isDueForReview(card, now) {
    if (!card.dueAt) return false;
    return card.dueAt <= now;
}

function calculateStats(cards) {
    let toLearn = 0, practiced = 0, learned = 0;
    cards.forEach(card => {
        const status = getCardStatus(card);
        if (status === STATUS.TO_LEARN) toLearn++;
        else if (status === STATUS.PRACTICED) practiced++;
        else if (status === STATUS.LEARNED) learned++;
    });
    return { toLearn, practiced, learned };
}

function buildSessionQueue(cards, options = {}) {
    const now = options.now || Date.now();
    const sessionSize = options.sessionSize || SRS_CONFIG.DEFAULT_SESSION_SIZE;
    const newLimit = options.newLimit || SRS_CONFIG.DEFAULT_NEW_LIMIT;
    
    const dueCards = cards.filter(card => {
        const status = getCardStatus(card);
        return (status === STATUS.PRACTICED || status === STATUS.LEARNED) && isDueForReview(card, now);
    }).sort((a, b) => (a.dueAt || 0) - (b.dueAt || 0));
    
    const newCards = cards.filter(card => getCardStatus(card) === STATUS.TO_LEARN);
    shuffleArray(newCards);
    
    const queue = [];
    queue.push(...dueCards.slice(0, sessionSize));
    const remainingSlots = sessionSize - queue.length;
    const newToAdd = Math.min(remainingSlots, newLimit, newCards.length);
    queue.push(...newCards.slice(0, newToAdd));
    
    return queue;
}

function processCardReview(card, grade, now = Date.now()) {
    const updated = { ...card };
    updated.lastReviewedAt = now;
    
    if (grade === 'again') {
        updated.repetitions = 0;
        updated.lapses = (card.lapses || 0) + 1;
        updated.intervalDays = SRS_CONFIG.MIN_INTERVAL;
        updated.ease = Math.max(SRS_CONFIG.MIN_EASE, (card.ease || SRS_CONFIG.INITIAL_EASE) - 0.2);
    } else {
        updated.repetitions = (card.repetitions || 0) + 1;
        if (card.repetitions === 0) updated.intervalDays = 1;
        else if (card.repetitions === 1) updated.intervalDays = 6;
        else updated.intervalDays = Math.round(card.intervalDays * (card.ease || SRS_CONFIG.INITIAL_EASE));
    }
    
    updated.dueAt = now + (updated.intervalDays * 24 * 60 * 60 * 1000);
    return updated;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(id, question, answer, questionEl, answerEl, category) {
    return {
        id, question, answer, questionEl, answerEl, category,
        createdAt: Date.now(),
        lastReviewedAt: null,
        dueAt: null,
        intervalDays: SRS_CONFIG.INITIAL_INTERVAL,
        ease: SRS_CONFIG.INITIAL_EASE,
        repetitions: 0,
        lapses: 0
    };
}

// STATE
let allCards = [];
let selectedCategory = null;
let currentQueue = [];
let currentCardIndex = 0;
let cardFlipped = false;
let sessionStats = { studied: 0, nope: 0, like: 0 };
let todaySeconds = 0;
let timerInterval = null;
let sessionTimer = null;
let sessionSeconds = 0;
let touchStartX = 0, touchStartY = 0, currentCard = null;

// STORAGE
function saveCards() {
    if (tg.CloudStorage) tg.CloudStorage.setItem('cards', JSON.stringify(allCards));
}

function loadCards() {
    return new Promise((resolve) => {
        if (tg.CloudStorage) {
            tg.CloudStorage.getItem('cards', (err, data) => {
                resolve(!err && data ? JSON.parse(data) : null);
            });
        } else resolve(null);
    });
}

async function initializeCards() {
    const saved = await loadCards();
    
    if (saved && saved.length > 0) {
        allCards = saved;
    } else {
        allCards = [];
        Object.keys(questionsData).forEach(cat => {
            questionsData[cat].forEach((q, idx) => {
                allCards.push(createCard(`${cat}-${idx}`, q.question, q.answer, q.questionEl, q.answerEl, cat));
            });
        });
        saveCards();
    }
    
    updateStats();
}

function loadProgress() {
    if (tg.CloudStorage) {
        tg.CloudStorage.getItems(['todaySeconds', 'lastDate'], (err, result) => {
            if (!err && result) {
                const today = new Date().toDateString();
                todaySeconds = (result.lastDate === today && result.todaySeconds) ? parseInt(result.todaySeconds) : 0;
                updateTimer();
            }
        });
    }
}

function saveProgress() {
    if (tg.CloudStorage) {
        tg.CloudStorage.setItem('todaySeconds', todaySeconds.toString());
        tg.CloudStorage.setItem('lastDate', new Date().toDateString());
    }
}

// UI
function updateStats() {
    const stats = calculateStats(allCards);
    document.getElementById('new-cards').textContent = stats.toLearn;
    document.getElementById('learning-cards').textContent = stats.practiced;
    document.getElementById('review-cards').textContent = stats.learned;
}

function updateTimer() {
    const mins = Math.floor(todaySeconds / 60);
    const secs = todaySeconds % 60;
    document.getElementById('timer-display').textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    // Update progress bar on main screen
    const progress = Math.min((todaySeconds / 1800) * 100, 100);
    const fill = document.getElementById('timer-fill-main');
    if (fill) fill.style.width = progress + '%';
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        todaySeconds++;
        updateTimer();
        if (todaySeconds % 30 === 0) saveProgress();
    }, 1000);
    
    sessionTimer = setInterval(() => {
        sessionSeconds++;
        const mins = Math.floor(sessionSeconds / 60);
        const secs = sessionSeconds % 60;
        const el = document.getElementById('session-timer');
        if (el) el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval), timerInterval = null;
    if (sessionTimer) clearInterval(sessionTimer), sessionTimer = null;
    saveProgress();
}

function initCategories() {
    const container = document.getElementById('category-start');
    const cats = Object.keys(questionsData);
    cats.forEach((cat, i) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (i === 0 ? ' active' : '');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.onclick = () => selectCategory(cat, btn);
        container.appendChild(btn);
    });
    selectedCategory = cats[0];
}

function selectCategory(cat, btn) {
    selectedCategory = cat;
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function startLearning() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('learning-screen').classList.remove('hidden');
    
    const categoryCards = allCards.filter(c => c.category === selectedCategory);
    currentQueue = buildSessionQueue(categoryCards, { now: Date.now(), sessionSize: 20, newLimit: 5 });
    
    if (currentQueue.length === 0) {
        tg.showAlert('Нет карточек для изучения!');
        backToStart();
        return;
    }
    
    currentCardIndex = 0;
    cardFlipped = false;
    sessionStats = { studied: 0, nope: 0, like: 0 };
    sessionSeconds = 0;
    document.getElementById('total-cards').textContent = currentQueue.length;
    startTimer();
    renderCards();
}

function renderCards() {
    const stack = document.getElementById('card-stack');
    stack.innerHTML = '';
    
    if (currentCardIndex >= currentQueue.length) {
        showCompletion();
        return;
    }
    
    for (let i = 0; i < 2 && (currentCardIndex + i) < currentQueue.length; i++) {
        stack.appendChild(createCardElement(currentQueue[currentCardIndex + i], i === 0));
    }
    
    document.getElementById('current-card').textContent = currentCardIndex + 1;
    setupSwipeHandlers();
}

function createCardElement(cardData, isTop) {
    const card = document.createElement('div');
    card.className = 'swipe-card' + (isTop ? ' card-top' : ' card-behind');
    card.dataset.cardId = cardData.id;
    
    const q = currentLang === 'ru' ? cardData.question : cardData.questionEl;
    const a = currentLang === 'ru' ? cardData.answer : cardData.answerEl;
    const t = translations[currentLang];
    
    card.innerHTML = `
        <div class="card-label">${t.questionLabel}</div>
        <div class="card-content">${q}</div>
        <div class="tap-hint">${t.tapHint}</div>
        <div class="swipe-indicator indicator-left">✕</div>
        <div class="swipe-indicator indicator-right">✓</div>
    `;
    card.dataset.answer = a;
    card.dataset.question = q;
    return card;
}

function setupSwipeHandlers() {
    const card = document.querySelector('.card-top');
    if (!card) return;
    currentCard = card;
    card.addEventListener('click', handleCardClick);
    card.addEventListener('touchstart', handleTouchStart, { passive: false });
    card.addEventListener('touchmove', handleTouchMove, { passive: false });
    card.addEventListener('touchend', handleTouchEnd);
}

function handleCardClick(e) {
    if (cardFlipped) return;
    const card = e.currentTarget;
    const t = translations[currentLang];
    cardFlipped = true;
    card.querySelector('.card-label').textContent = t.answerLabel;
    card.querySelector('.card-content').textContent = card.dataset.answer;
    card.querySelector('.tap-hint').style.display = 'none';
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function handleTouchStart(e) {
    if (!cardFlipped) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    currentCard.classList.add('swiping');
}

function handleTouchMove(e) {
    if (!cardFlipped) return;
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;
    const rotation = deltaX / 20;
    currentCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
    
    if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
            currentCard.classList.add('showing-left');
            currentCard.classList.remove('showing-right');
        } else {
            currentCard.classList.add('showing-right');
            currentCard.classList.remove('showing-left');
        }
    } else {
        currentCard.classList.remove('showing-left', 'showing-right');
    }
}

function handleTouchEnd(e) {
    if (!cardFlipped) return;
    const touchX = e.changedTouches[0].clientX;
    const deltaX = touchX - touchStartX;
    currentCard.classList.remove('swiping', 'showing-left', 'showing-right');
    
    if (Math.abs(deltaX) > 100) {
        animateSwipe(deltaX < 0 ? 'left' : 'right');
    } else {
        currentCard.style.transform = '';
    }
}

function animateSwipe(direction) {
    currentCard.classList.add(`swiped-${direction}`);
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred(direction === 'right' ? 'success' : 'error');
    setTimeout(() => processCard(direction === 'right'), 400);
}

function processCard(known) {
    const cardData = currentQueue[currentCardIndex];
    const grade = known ? 'good' : 'again';
    const updatedCard = processCardReview(cardData, grade, Date.now());
    const idx = allCards.findIndex(c => c.id === updatedCard.id);
    if (idx !== -1) allCards[idx] = updatedCard;
    saveCards();
    
    sessionStats.studied++;
    if (known) sessionStats.like++; else sessionStats.nope++;
    
    currentCardIndex++;
    cardFlipped = false;
    renderCards();
}

function swipeLeft() {
    if (!cardFlipped) return;
    animateSwipe('left');
}

function swipeRight() {
    if (!cardFlipped) return;
    animateSwipe('right');
}

function showCompletion() {
    stopTimer();
    document.getElementById('learning-screen').classList.add('hidden');
    document.getElementById('completion-screen').classList.remove('hidden');
    
    const timeSpent = Math.floor(sessionSeconds / 60);
    const timeSecs = sessionSeconds % 60;
    document.getElementById('studied-count').textContent = sessionStats.studied;
    document.getElementById('time-spent').textContent = `${timeSpent.toString().padStart(2, '0')}:${timeSecs.toString().padStart(2, '0')}`;
    document.getElementById('nope-count').textContent = sessionStats.nope;
    document.getElementById('like-count').textContent = sessionStats.like;
    updateStats();
}

function backToStart() {
    stopTimer();
    document.getElementById('learning-screen').classList.add('hidden');
    document.getElementById('completion-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    updateStats();
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
    initializeCards();
    initCategories();
    loadProgress();
    updateTimer();
    updateLanguage();
});

window.addEventListener('beforeunload', () => {
    stopTimer();
    saveProgress();
    saveCards();
});
