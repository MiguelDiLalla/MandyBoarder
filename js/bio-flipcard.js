// bio-flipcard.js — Flip logic for HeroBio section (Section 3)
// Modular, accessible, no globals
(function () {
    const section = document.querySelector('.herobio-section');
    if (!section) return;
    const flipcard = section.querySelector('.herobio-flipcard');
    let flipped = false;

    function toggleFlip() {
        flipped = !flipped;
        flipcard.classList.toggle('herobio-flipcard--flipped', flipped);
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

    // Auto-flip HeroBio flipcard after 15s, then flip back after 17s
    setTimeout(toggleFlip, 15000);
    setTimeout(toggleFlip, 17000);

})();
