// stamp-anim.js — Triggers stamp drop animation when Passport section enters viewport
// Modular, no globals
(function () {
    const section = document.querySelector('.passport-section');
    if (!section) return;
    const seal = section.querySelector('.passport-section__seal');
    let animated = false;

    function onEntry(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                playDrop();
                animated = true;
            }
        });
    }

    // Helper to replay the drop animation
    function playDrop() {
        seal.classList.remove('passport-section__seal--drop');
        // force reflow to restart animation
        void seal.offsetWidth;
        seal.classList.add('passport-section__seal--drop');
    }

    // Use IntersectionObserver for viewport detection
    const observer = new window.IntersectionObserver(onEntry, {
        threshold: 0.4
    });
    observer.observe(section);

    // Replay animation on click/tap
    section.addEventListener('click', () => {
        playDrop();
    });
})();
