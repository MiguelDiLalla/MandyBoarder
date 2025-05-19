// hero-fadein.js — Controls sequential fade-in for Hero section layers
// Modular, no global variables. Accessible-first.

(function () {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    const layers = hero.querySelectorAll('.hero-section__layer');
    let delay = 0;
    layers.forEach((layer, idx) => {
        setTimeout(() => {
            layer.classList.add('hero-section__layer--visible');
        }, delay);
        delay += 700;
    });
})();
