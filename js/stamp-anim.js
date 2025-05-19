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
                seal.classList.add('passport-section__seal--drop');
                animated = true;
            }
        });
    }

    // Use IntersectionObserver for viewport detection
    const observer = new window.IntersectionObserver(onEntry, {
        threshold: 0.4
    });
    observer.observe(section);
})();
