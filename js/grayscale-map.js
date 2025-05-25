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

    // Touch support: tap to apply grayscale for 1 second
    let touchTimeout;
    mapa.addEventListener('touchstart', (e) => {
        // Prevent default to avoid synthetic mouse events
        e.preventDefault();
        document.body.classList.add('grayscale-active');
        if (touchTimeout) clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
            document.body.classList.remove('grayscale-active');
        }, 1000);
    });
})();
