// grayscale-map.js — Activates grayscale filter on page except map section on hover
// Modular, no globals
(function () {
    const mapa = document.querySelector('.mapa-section');
    if (!mapa) return;
    mapa.addEventListener('mouseenter', () => {
        document.body.classList.add('grayscale-active');
    });
    mapa.addEventListener('mouseleave', () => {
        document.body.classList.remove('grayscale-active');
    });
    // Touch support: tap to toggle
    let lastTouch = 0;
    mapa.addEventListener('touchstart', () => {
        const now = Date.now();
        if (now - lastTouch < 800) {
            document.body.classList.remove('grayscale-active');
        } else {
            document.body.classList.add('grayscale-active');
        }
        lastTouch = now;
    });
})();
