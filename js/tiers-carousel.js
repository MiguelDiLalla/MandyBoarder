// tiers-carousel.js — 3D carousel logic for Tiers section (Section 7)
// Modular, accessible, no globals
(function () {
    const section = document.querySelector('.tiers-section');
    if (!section) return;
    const items = Array.from(section.querySelectorAll('.tiers-carousel__item'));
    let active = 1; // Start with the middle item

    function updateCarousel() {
        items.forEach((item, idx) => {
            item.classList.remove('tiers-carousel__item--active', 'tiers-carousel__item--left', 'tiers-carousel__item--right');
            if (idx === active) {
                item.classList.add('tiers-carousel__item--active');
            } else if (idx === (active + 1) % 3) {
                item.classList.add('tiers-carousel__item--right');
            } else if (idx === (active + 2) % 3) {
                item.classList.add('tiers-carousel__item--left');
            }
        });
    }

    function goLeft() {
        active = (active + 2) % 3;
        updateCarousel();
    }
    function goRight() {
        active = (active + 1) % 3;
        updateCarousel();
    }

    // Click on left/right half of section
    section.addEventListener('click', function (e) {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) {
            goLeft();
        } else {
            goRight();
        }
    });
    // Keyboard navigation
    section.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') goLeft();
        if (e.key === 'ArrowRight') goRight();
    });
    section.setAttribute('tabindex', '0');

    // Touch swipe support for carousel (mobile)
    let touchStartX = 0;
    section.addEventListener('touchstart', e => {
        if (e.touches && e.touches.length > 0) {
            touchStartX = e.touches[0].clientX;
        }
    });
    section.addEventListener('touchend', e => {
        if (e.changedTouches && e.changedTouches.length > 0) {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (dx > 40) goLeft();
            if (dx < -40) goRight();
        }
    });

    updateCarousel();
})();
