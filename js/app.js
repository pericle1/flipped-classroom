document.addEventListener('DOMContentLoaded', () => {
    // 1. ANIMAZIONE FLUIDA SU SCROLL (Intersection Observer)
    
    // Seleziona tutti gli elementi con la classe per l'animazione
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .animate-fade-in');

    // Opzioni per l'osservatore: l'elemento deve essere visibile per almeno il 10%
    const observerOptions = {
        root: null, // viewport come radice
        rootMargin: '0px',
        threshold: 0.1 // 10% dell'elemento deve essere visibile
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se l'elemento è visibile, aggiunge la classe per animarlo
                entry.target.classList.add('is-visible');
                // Smette di osservare l'elemento dopo la prima animazione
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Inizializza l'osservatore su tutti gli elementi
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });


    // 2. SCORRIMENTO FLUIDO TRA LE SEZIONI (Garantito)

    const navLinks = document.querySelectorAll('#main-nav a, .cta-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Evita il comportamento di salto immediato predefinito
            e.preventDefault(); 
            
            // Ottiene l'ID della sezione di destinazione (e.g., #vita)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scorrimento fluido alla sezione
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
