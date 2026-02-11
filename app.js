// Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('secondary_bg_color');

// Language
let currentLang = 'ru';

const translations = {
    ru: {
        appTitle: 'Гражданство Греции',
        timerLabel: 'Сегодня',
        timerGoal: 'Цель: 30 минут',
        timerDone: '✅ Цель выполнена!',
        studiedLabel: 'Изучено',
        accuracyLabel: 'Точность',
        difficultLabel: 'Сложные',
        flashcardsTitle: 'Флеш-карты',
        flashcardsSub: 'Изучение',
        quizTitle: 'Квиз',
        quizSub: 'Тестирование',
        difficultModeTitle: 'Сложные вопросы',
        difficultSub: 'Повторение',
        back: 'Назад',
        questionLabel: 'ВОПРОС',
        answerLabel: 'ОТВЕТ',
        prev: '← Назад',
        markBtn: '⭐ Сложно',
        next: 'Далее →',
        nextQuizText: 'Следующий →',
        quizComplete: 'Квиз завершен!',
        correctAnswers: 'Правильных ответов',
        noDifficult: 'У вас пока нет сложных вопросов',
        allDone: 'Все вопросы изучены! 🎉',
        addedToDifficult: 'Добавлено в сложные',
        removedFromDifficult: 'Убрано из сложных'
    },
    el: {
        appTitle: 'Υπηκοότητα Ελλάδας',
        timerLabel: 'Σήμερα',
        timerGoal: 'Στόχος: 30 λεπτά',
        timerDone: '✅ Επιτεύχθηκε!',
        studiedLabel: 'Μελετήθηκε',
        accuracyLabel: 'Ακρίβεια',
        difficultLabel: 'Δύσκολα',
        flashcardsTitle: 'Κάρτες',
        flashcardsSub: 'Μάθηση',
        quizTitle: 'Κουίζ',
        quizSub: 'Τεστ',
        difficultModeTitle: 'Δύσκολες ερωτήσεις',
        difficultSub: 'Επανάληψη',
        back: 'Πίσω',
        questionLabel: 'ΕΡΩΤΗΣΗ',
        answerLabel: 'ΑΠΑΝΤΗΣΗ',
        prev: '← Πίσω',
        markBtn: '⭐ Δύσκολο',
        next: 'Επόμενο →',
        nextQuizText: 'Επόμενο →',
        quizComplete: 'Τέλος κουίζ!',
        correctAnswers: 'Σωστές',
        noDifficult: 'Δεν έχετε δύσκολες ερωτήσεις',
        allDone: 'Τελείωσες! 🎉',
        addedToDifficult: 'Προστέθηκε',
        removedFromDifficult: 'Αφαιρέθηκε'
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
    document.getElementById('timer-label').textContent = t.timerLabel;
    document.getElementById('timer-goal').textContent = todaySeconds >= 1800 ? t.timerDone : t.timerGoal;
    document.getElementById('studied-label').textContent = t.studiedLabel;
    document.getElementById('accuracy-label').textContent = t.accuracyLabel;
    document.getElementById('difficult-label').textContent = t.difficultLabel;
    document.getElementById('flashcards-title').textContent = t.flashcardsTitle;
    document.getElementById('flashcards-sub').textContent = t.flashcardsSub;
    document.getElementById('quiz-title').textContent = t.quizTitle;
    document.getElementById('quiz-sub').textContent = t.quizSub;
    document.getElementById('difficult-mode-title').textContent = t.difficultModeTitle;
    document.getElementById('difficult-sub').textContent = t.difficultSub;
    
    if (!document.getElementById('flashcard-mode').classList.contains('hidden')) {
        document.getElementById('question-label').textContent = t.questionLabel;
        document.getElementById('answer-label').textContent = t.answerLabel;
        document.getElementById('prev').textContent = t.prev;
        document.getElementById('mark-btn').textContent = t.markBtn;
        document.getElementById('next').textContent = t.next;
    }
}

// ============================================
// ВОПРОСЫ - ЗАМЕНИТЕ НА СВОИ!
// ============================================

const questions = {
    история: [
        {
            question: 'Когда была провозглашена независимость Греции?',
            answer: '25 марта 1821 года началась Греческая война за независимость',
            questionEl: 'Πότε ανακηρύχθηκε η ανεξαρτησία της Ελλάδας;',
            answerEl: 'Στις 25 Μαρτίου 1821 ξεκίνησε ο Ελληνικός Απελευθερωτικός Αγώνας'
        },
        {
            question: 'Кто был первым президентом Греции?',
            answer: 'Иоаннис Каподистрия был первым главой греческого государства (1828-1831)',
            questionEl: 'Ποιος ήταν ο πρώτος πρόεδρος της Ελλάδας;',
            answerEl: 'Ο Ιωάννης Καποδίστριας ήταν ο πρώτος κυβερνήτης της Ελλάδας (1828-1831)'
        }
    ],
    география: [
        {
            question: 'Какая столица Греции?',
            answer: 'Афины (Αθήνα) - столица и крупнейший город Греции',
            questionEl: 'Ποια είναι η πρωτεύουσα της Ελλάδας;',
            answerEl: 'Η Αθήνα είναι η πρωτεύουσα της Ελλάδας'
        },
        {
            question: 'Сколько островов в Греции?',
            answer: 'В Греции около 6000 островов, из которых обитаемы примерно 227',
            questionEl: 'Πόσα νησιά έχει η Ελλάδα;',
            answerEl: 'Η Ελλάδα έχει περίπου 6000 νησιά'
        }
    ],
    культура: [
        {
            question: 'Какой национальный праздник Греции?',
            answer: '25 марта - День независимости Греции и Благовещение',
            questionEl: 'Ποια είναι η εθνική γιορτή της Ελλάδας;',
            answerEl: 'Η 25η Μαρτίου'
        }
    ],
    конституция: [
        {
            question: 'Когда была принята современная Конституция Греции?',
            answer: 'Действующая Конституция Греции была принята 11 июня 1975 года',
            questionEl: 'Πότε εγκρίθηκε το Σύνταγμα της Ελλάδας;',
            answerEl: 'Στις 11 Ιουνίου 1975'
        }
    ]
};

// State
let currentMode = null;
let currentCategory = null;
let currentIndex = 0;
let currentData = [];
let difficultSet = new Set();
let studiedSet = new Set();
let quizResults = [];

// Timer
let todaySeconds = 0;
let timerInterval = null;

// Total questions
function getTotalQuestions() {
    let total = 0;
    Object.values(questions).forEach(cat => total += cat.length);
    return total;
}

// Load progress
function loadProgress() {
    if (tg.CloudStorage) {
        tg.CloudStorage.getItems(['difficult', 'studied', 'quizResults', 'todaySeconds', 'lastDate'], (err, result) => {
            if (!err && result) {
                if (result.difficult) difficultSet = new Set(JSON.parse(result.difficult));
                if (result.studied) studiedSet = new Set(JSON.parse(result.studied));
                if (result.quizResults) quizResults = JSON.parse(result.quizResults);
                
                const today = new Date().toDateString();
                if (result.lastDate === today && result.todaySeconds) {
                    todaySeconds = parseInt(result.todaySeconds);
                } else {
                    todaySeconds = 0;
                }
                
                updateStats();
                updateTimer();
            }
        });
    }
}

// Save progress
function saveProgress() {
    if (tg.CloudStorage) {
        const today = new Date().toDateString();
        tg.CloudStorage.setItem('difficult', JSON.stringify([...difficultSet]));
        tg.CloudStorage.setItem('studied', JSON.stringify([...studiedSet]));
        tg.CloudStorage.setItem('quizResults', JSON.stringify(quizResults));
        tg.CloudStorage.setItem('todaySeconds', todaySeconds.toString());
        tg.CloudStorage.setItem('lastDate', today);
    }
}

// Update stats
function updateStats() {
    document.getElementById('studied').textContent = studiedSet.size;
    document.getElementById('difficult').textContent = difficultSet.size;
    
    if (quizResults.length > 0) {
        const correct = quizResults.filter(r => r).length;
        const accuracy = Math.round((correct / quizResults.length) * 100);
        document.getElementById('accuracy').textContent = accuracy + '%';
    }
}

// Timer
function startTimer() {
    if (timerInterval) return;
    
    timerInterval = setInterval(() => {
        todaySeconds++;
        updateTimer();
        
        if (todaySeconds % 30 === 0) {
            saveProgress();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        saveProgress();
    }
}

function updateTimer() {
    const mins = Math.floor(todaySeconds / 60);
    const secs = todaySeconds % 60;
    document.getElementById('timer-display').textContent = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const progress = Math.min((todaySeconds / 1800) * 100, 100);
    document.getElementById('timer-fill').style.width = progress + '%';
    
    const t = translations[currentLang];
    const display = document.getElementById('timer-display');
    const fill = document.getElementById('timer-fill');
    const goal = document.getElementById('timer-goal');
    
    if (todaySeconds >= 1800) {
        display.classList.add('completed');
        fill.classList.add('completed');
        goal.textContent = t.timerDone;
    } else {
        display.classList.remove('completed');
        fill.classList.remove('completed');
        goal.textContent = t.timerGoal;
    }
}

// Start mode
function startMode(mode) {
    currentMode = mode;
    document.getElementById('main-menu').classList.add('hidden');
    startTimer();

    if (mode === 'quiz') {
        startQuizMode();
    } else if (mode === 'difficult') {
        startDifficultMode();
    } else {
        startFlashcardMode();
    }
}

// Flashcard mode
function startFlashcardMode() {
    document.getElementById('flashcard-mode').classList.remove('hidden');
    
    const categories = Object.keys(questions);
    const catContainer = document.getElementById('categories');
    catContainer.innerHTML = '';
    
    categories.forEach((cat, i) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (i === 0 ? ' active' : '');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.onclick = () => selectCategory(cat);
        catContainer.appendChild(btn);
    });
    
    selectCategory(categories[0]);
}

function selectCategory(cat) {
    currentCategory = cat;
    currentIndex = 0;
    currentData = questions[cat] || [];
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === cat);
    });
    
    showCard();
}

function showCard() {
    if (currentData.length === 0) return;
    
    const card = currentData[currentIndex];
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    
    const q = currentLang === 'ru' ? card.question : card.questionEl;
    const a = currentLang === 'ru' ? card.answer : card.answerEl;
    
    document.getElementById('question').textContent = q;
    document.getElementById('answer').textContent = a;
    
    const cardId = `${currentCategory}-${currentIndex}`;
    studiedSet.add(cardId);
    
    const progress = ((currentIndex + 1) / currentData.length) * 100;
    document.getElementById('card-progress').style.width = progress + '%';
    
    saveProgress();
    updateStats();
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showCard();
    }
}

function nextCard() {
    if (currentIndex < currentData.length - 1) {
        currentIndex++;
        showCard();
    } else {
        const t = translations[currentLang];
        tg.showAlert(t.allDone);
    }
}

function markDifficult() {
    const cardId = `${currentCategory}-${currentIndex}`;
    const t = translations[currentLang];
    
    if (difficultSet.has(cardId)) {
        difficultSet.delete(cardId);
        tg.showAlert(t.removedFromDifficult);
    } else {
        difficultSet.add(cardId);
        tg.showAlert(t.addedToDifficult);
    }
    
    saveProgress();
    updateStats();
}

// Quiz mode
function startQuizMode() {
    document.getElementById('quiz-mode').classList.remove('hidden');
    
    const all = [];
    Object.keys(questions).forEach(cat => {
        questions[cat].forEach((q, idx) => {
            all.push({ ...q, category: cat, index: idx });
        });
    });
    
    currentData = all.sort(() => Math.random() - 0.5).slice(0, Math.min(10, all.length));
    currentIndex = 0;
    quizResults = [];
    
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentIndex >= currentData.length) {
        finishQuiz();
        return;
    }
    
    const q = currentData[currentIndex];
    const questionText = currentLang === 'ru' ? q.question : q.questionEl;
    const correctAnswer = currentLang === 'ru' ? q.answer : q.answerEl;
    
    document.getElementById('quiz-question').textContent = questionText;
    
    const wrongAnswers = currentData
        .filter((_, i) => i !== currentIndex)
        .map(q => currentLang === 'ru' ? q.answer : q.answerEl)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    const allAnswers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    
    const container = document.getElementById('quiz-options');
    container.innerHTML = '';
    
    allAnswers.forEach(answer => {
        const opt = document.createElement('div');
        opt.className = 'quiz-option';
        opt.textContent = answer;
        opt.onclick = () => selectAnswer(opt, answer === correctAnswer);
        container.appendChild(opt);
    });
    
    document.getElementById('next-quiz').classList.add('hidden');
    
    const progress = (currentIndex / currentData.length) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
}

function selectAnswer(element, isCorrect) {
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    element.classList.add(isCorrect ? 'correct' : 'incorrect');
    quizResults.push(isCorrect);
    
    if (isCorrect) {
        tg.HapticFeedback.notificationOccurred('success');
    } else {
        tg.HapticFeedback.notificationOccurred('error');
        document.querySelectorAll('.quiz-option').forEach(opt => {
            if (!opt.classList.contains('incorrect') && !opt.classList.contains('correct')) {
                opt.classList.add('correct');
            }
        });
    }
    
    document.getElementById('next-quiz').classList.remove('hidden');
    saveProgress();
    updateStats();
}

function nextQuiz() {
    currentIndex++;
    showQuizQuestion();
}

function finishQuiz() {
    const correct = quizResults.filter(r => r).length;
    const total = quizResults.length;
    const pct = Math.round((correct / total) * 100);
    const t = translations[currentLang];
    
    tg.showAlert(`${t.quizComplete}\n${t.correctAnswers}: ${correct}/${total} (${pct}%)`);
    backToMenu();
}

// Difficult mode
function startDifficultMode() {
    const t = translations[currentLang];
    
    if (difficultSet.size === 0) {
        tg.showAlert(t.noDifficult);
        backToMenu();
        return;
    }
    
    document.getElementById('flashcard-mode').classList.remove('hidden');
    document.getElementById('categories').innerHTML = '';
    
    currentData = [];
    difficultSet.forEach(cardId => {
        const [cat, idx] = cardId.split('-');
        if (questions[cat] && questions[cat][idx]) {
            currentData.push({
                ...questions[cat][idx],
                originalCat: cat
            });
        }
    });
    
    currentIndex = 0;
    showCard();
}

// Back to menu
function backToMenu() {
    document.getElementById('main-menu').classList.remove('hidden');
    document.getElementById('flashcard-mode').classList.add('hidden');
    document.getElementById('quiz-mode').classList.add('hidden');
    currentMode = null;
    currentData = [];
    stopTimer();
}

// Initialize
loadProgress();
updateStats();
updateTimer();

window.addEventListener('beforeunload', () => {
    stopTimer();
    saveProgress();
});
