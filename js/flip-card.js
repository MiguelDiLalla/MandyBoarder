// flip-card.js — Flip logic for Why Spanish? section (Section 5)
// Modular, accessible, no globals
(function () {
    const section = document.querySelector('.whyspanish-section');
    if (!section) return;
    const flipcard = section.querySelector('.whyspanish-flipcard');
    let flipped = false;

    function toggleFlip() {
        flipped = !flipped;
        flipcard.classList.toggle('whyspanish-flipcard--flipped', flipped);
        // ARIA state
        section.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    }

    section.addEventListener('click', toggleFlip);
    section.addEventListener('keypress', e => {
        if (e.key === ' ' || e.key === 'Enter') {
            toggleFlip();
        }
    });
    // Accessibility: set role and tabindex
    section.setAttribute('role', 'button');
    section.setAttribute('tabindex', '0');
    section.setAttribute('aria-pressed', 'false');

    // Auto-flip WhySpanish flipcard after 25s, then flip back after 27s
    setTimeout(toggleFlip, 25000);
    setTimeout(toggleFlip, 27000);

})();
