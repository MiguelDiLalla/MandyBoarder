// slider-mask.js — Image comparison slider for HeroPic section
// Now: invisible handle, mask follows cursor hover (no click/drag)

(function () {
    const section = document.querySelector('.heropic-section');
    if (!section) return;
    const topImg = section.querySelector('.heropic-section__img--top');

    function setSlider(x) {
        const rect = section.getBoundingClientRect();
        let relX = Math.max(0, Math.min(x - rect.left, rect.width));
        let percent = (relX / rect.width) * 100;
        topImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }

    // Mouse move: update mask on hover (no delay, no transition)
    section.addEventListener('mousemove', e => {
        setSlider(e.clientX);
    });
    // Touch move: update mask on touch
    section.addEventListener('touchmove', e => {
        if (e.touches && e.touches.length > 0) {
            setSlider(e.touches[0].clientX);
        }
    });
    // On load: start at 50%
    window.addEventListener('DOMContentLoaded', () => {
        const rect = section.getBoundingClientRect();
        setSlider(rect.left + rect.width / 2);
    });
    // No mouseleave reset — mask stays where left
})();
