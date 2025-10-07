document.addEventListener('DOMContentLoaded', function() {
    // Elementi DOM
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('.main-nav .glass-btn');
    const backButtons = document.querySelectorAll('.back-btn');
    const slides = document.querySelectorAll('.slide');
    
    console.log('Elementi trovati:', {
        sections: sections.length,
        navButtons: navButtons.length,
        backButtons: backButtons.length,
        slides: slides.length
    });

    // Background Slider per Hero
    let currentSlide = 0;
    
    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }
    
    // Cambia slide ogni 5 secondi (solo nella home)
    setInterval(() => {
        if (document.getElementById('home').classList.contains('active')) {
            nextSlide();
        }
    }, 5000);
    
    // Navigazione tra sezioni
    function showSection(sectionId) {
        console.log('Mostrando sezione:', sectionId);
        
        // Nascondi tutte le sezioni
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostra la sezione richiesta
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error('Sezione non trovata:', sectionId);
        }
    }
    
    // Event listeners per i pulsanti di navigazione
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            console.log('Cliccato bottone nav:', target);
            showSection(target);
        });
    });
    
    // Event listeners per i pulsanti "Torna alla Home"
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Cliccato back button');
            showSection('home');
        });
    });
    
    // Inizializzazione
    console.log('Sito Zenone - Caricamento completato');
    
    // Gestione tasto ESC per tornare alla home
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            showSection('home');
        }
    });

    // AGGIUNTA: Logica del quiz
    const quizQuestions = [
        {
            question: "Qual era lo scopo principale dei paradossi di Zenone?",
            options: [
                "Dimostrare la validità della tesi di Parmenide",
                "Confutare la tesi di Parmenide",
                "Dimostrare l'esistenza del movimento",
                "Confutare l'esistenza di Dio"
            ],
            correct: 0
        },
        {
            question: "Quale dei seguenti paradossi NON è di Zenone?",
            options: [
                "La Dicotomia",
                "Achille e la tartaruga",
                "Il paradosso del mentitore",
                "La freccia immobile"
            ],
            correct: 2
        },
        {
            question: "Zenone è considerato l'inventore di quale metodo?",
            options: [
                "Dialettica",
                "Metodo scientifico",
                "Maieutica",
                "Scetticismo"
            ],
            correct: 0
        },
        {
            question: "In quale città è nato Zenone?",
            options: [
                "Atene",
                "Elea",
                "Mileto",
                "Siracusa"
            ],
            correct: 1
        },
        {
            question: "Quale filosofo ha fornito una soluzione ai paradossi di Zenone basata sul concetto di serie convergenti?",
            options: [
                "Aristotele",
                "Kant",
                "Bergson",
                "La matematica moderna"
            ],
            correct: 3
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];

    const quizStart = document.getElementById('quiz-start');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const startQuizButton = document.getElementById('start-quiz');
    const nextQuestionButton = document.getElementById('next-question');
    const restartQuizButton = document.getElementById('restart-quiz');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    const scorePercentage = document.getElementById('score-percentage');
    const correctAnswersElement = document.getElementById('correct-answers');
    const scoreText = document.getElementById('score-text');

    function initQuiz() {
        totalQuestionsElement.textContent = quizQuestions.length;
        
        startQuizButton.addEventListener('click', startQuiz);
        nextQuestionButton.addEventListener('click', nextQuestion);
        restartQuizButton.addEventListener('click', restartQuiz);
    }

    function startQuiz() {
        quizStart.style.display = 'none';
        quizQuestionsContainer.style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        showQuestion();
    }

    function showQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        questionText.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        nextQuestionButton.style.display = 'none';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
    }

    function selectOption(selectedIndex) {
        const options = document.querySelectorAll('.quiz-option');
        const question = quizQuestions[currentQuestionIndex];
        
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        options[selectedIndex].classList.add('selected');
        
        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            score++;
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }
        
        userAnswers.push({
            question: question.question,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: selectedIndex === question.correct
        });
        
        nextQuestionButton.style.display = 'block';
    }

    function nextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizQuestionsContainer.style.display = 'none';
        quizResults.style.display = 'block';
        
        const percentage = Math.round((score / quizQuestions.length) * 100);
        scorePercentage.textContent = `${percentage}%`;
        correctAnswersElement.textContent = score;
        
        let message = '';
        if (percentage >= 80) {
            message = 'Eccellente! Sei un vero esperto di Zenone!';
        } else if (percentage >= 60) {
            message = 'Buon lavoro! Conosci bene i paradossi di Zenone.';
        } else if (percentage >= 40) {
            message = 'Non male! Con un po\' di studio potresti diventare un esperto.';
        } else {
            message = 'C\'è ancora molto da imparare sui paradossi di Zenone.';
        }
        
        scoreText.innerHTML = `Hai totalizzato <strong>${score}</strong> su <strong>${quizQuestions.length}</strong> punti<br><br>${message}`;
    }

    function restartQuiz() {
        quizResults.style.display = 'none';
        quizStart.style.display = 'block';
    }

    // Inizializza il quiz
    initQuiz();
});