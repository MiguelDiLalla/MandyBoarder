// final-flipcard.js — 3-face flip logic for Final section (Section 8)
// Modular, accessible, no globals
(function () {
    const section = document.querySelector('.final-section');
    if (!section) return;
    const flipcard = section.querySelector('.final-flipcard');
    const faces = [
        flipcard.querySelector('.final-flipcard__face--front'),
        flipcard.querySelector('.final-flipcard__face--back'),
        flipcard.querySelector('.final-flipcard__face--third')
    ];
    let state = 0; // 0: front, 1: back, 2: third
    function updateFlip() {
        faces.forEach((face, idx) => {
            if (idx === state) {
                face.setAttribute('aria-current', 'true');
                face.setAttribute('aria-hidden', 'false');
            } else {
                face.setAttribute('aria-current', 'false');
                face.setAttribute('aria-hidden', 'true');
            }
        });
        flipcard.classList.remove('final-flipcard--face-0','final-flipcard--face-1','final-flipcard--face-2');
        flipcard.classList.add(`final-flipcard--face-${state}`);
    }
    function nextFlip() {
        state = (state + 1) % 3;
        updateFlip();
    }
    section.addEventListener('click', nextFlip);
    section.addEventListener('keypress', e => {
        if (e.key === ' ' || e.key === 'Enter') {
            nextFlip();
        }
    });
    section.setAttribute('role', 'button');
    section.setAttribute('tabindex', '0');
    updateFlip();
})();
