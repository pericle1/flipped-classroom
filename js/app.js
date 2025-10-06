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
});
