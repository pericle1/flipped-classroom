/* --- CONFIGURAZIONE PARTICLES.JS --- */
// Questo codice disegna il background animato
particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 2, random: true },
    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

/* --- LOGICA PER LE ANIMAZIONI ALLO SCORRIMENTO --- */
// Questa funzione rileva quando un elemento entra nello schermo
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Optional: rimuovi la classe se vuoi che l'animazione si ripeta ogni volta
            // entry.target.classList.remove('show');
        }
    });
});

// Dice all'observer quali elementi osservare (tutti quelli con la classe .hidden)
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));