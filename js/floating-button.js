/**
 * Floating Button Module
 * Handles the interactive floating action button for booking lessons
 * Features: Random overlay images, click-to-redirect, outside-click-to-close, and auto-expansion
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get both desktop and mobile floating buttons
    const desktopFloatingButton = document.querySelector('.floating-button--desktop');
    const mobileFloatingButton = document.querySelector('.mobile-nav-bar .floating-button');
    const bookingOverlay = document.getElementById('bookingOverlay');
    const bookingImage = document.getElementById('bookingImage');
    
    // Array of all floating buttons for easier management
    const allFloatingButtons = [desktopFloatingButton, mobileFloatingButton].filter(btn => btn !== null);
    
    // Configuration
    const bookingImages = [
        'WEB_ELEMENTS/FloatingMedia/BookNow.webp',
        'WEB_ELEMENTS/FloatingMedia/FirstFree.webp'
    ];
    
    // Booking URLs - replace with actual booking links
    const bookingUrls = {
        'BookNow.webp': 'https://calendly.com/your-booking-link', // Replace with actual URL
        'FirstFree.webp': 'https://calendly.com/your-free-lesson-link' // Replace with actual URL
    };
    
    // Auto-expansion configuration
    let autoExpansionCount = 0;
    let autoExpansionTimeouts = [];
    let isUserInteracting = false;    if (allFloatingButtons.length === 0 || !bookingOverlay || !bookingImage) {
        console.warn('Floating button elements not found');
        console.log('Desktop button:', desktopFloatingButton);
        console.log('Mobile button:', mobileFloatingButton);
        console.log('Booking overlay:', bookingOverlay);
        console.log('Booking image:', bookingImage);
        return;
    }
    
    console.log('Floating button initialized successfully');
    console.log('Found buttons:', allFloatingButtons.length);
      /**
     * Auto-expands the button for attention-grabbing effect
     * Only applies to desktop version
     */
    function autoExpandButton() {
        if (isUserInteracting || !desktopFloatingButton) return; // Don't auto-expand if user is interacting or no desktop button
        
        // Only auto-expand on desktop (when mobile nav bar is hidden)
        const mobileNavBar = document.querySelector('.mobile-nav-bar');
        if (mobileNavBar && window.getComputedStyle(mobileNavBar).display !== 'none') {
            return; // Don't auto-expand on mobile
        }
        
        desktopFloatingButton.classList.add('auto-expanded');
        
        // Contract after 1.5 seconds
        setTimeout(() => {
            if (!isUserInteracting && desktopFloatingButton) {
                desktopFloatingButton.classList.remove('auto-expanded');
            }
        }, 1500);
        
        console.log('Auto-expanded desktop button, count:', autoExpansionCount + 1);
    }
    
    /**
     * Sets up the auto-expansion schedule
     */
    function setupAutoExpansion() {
        // Clear any existing timeouts
        autoExpansionTimeouts.forEach(timeout => clearTimeout(timeout));
        autoExpansionTimeouts = [];
        
        // Schedule first 3 expansions every 3 seconds
        for (let i = 0; i < 3; i++) {
            const timeout = setTimeout(() => {
                autoExpandButton();
                autoExpansionCount++;
            }, (i + 1) * 3000); // 3s, 6s, 9s
            
            autoExpansionTimeouts.push(timeout);
        }
        
        // Schedule continuous expansions every 7 seconds after initial 3
        const continuousExpansion = () => {
            const timeout = setTimeout(() => {
                autoExpandButton();
                autoExpansionCount++;
                continuousExpansion(); // Schedule next one
            }, 7000);
            
            autoExpansionTimeouts.push(timeout);
        };
        // Start continuous expansions after 9 seconds (6s + 3s delay)
        setTimeout(continuousExpansion, 9000);
        
        console.log('Auto-expansion schedule set up');
    }
      /**
     * Pauses auto-expansion when user interacts
     */
    function pauseAutoExpansion() {
        isUserInteracting = true;
        if (desktopFloatingButton) {
            desktopFloatingButton.classList.remove('auto-expanded');
        }
        
        // Resume auto-expansion after 30 seconds of no interaction
        setTimeout(() => {
            isUserInteracting = false;
        }, 30000);
        
        console.log('Auto-expansion paused due to user interaction');
    }
    
    /**
     * Gets a random booking image path
     * @returns {string} Random image path
     */
    function getRandomBookingImage() {
        const randomIndex = Math.floor(Math.random() * bookingImages.length);
        return bookingImages[randomIndex];
    }
    
    /**
     * Gets the booking URL for a given image
     * @param {string} imagePath - The image path
     * @returns {string} The corresponding booking URL
     */
    function getBookingUrl(imagePath) {
        const imageName = imagePath.split('/').pop();
        return bookingUrls[imageName] || 'https://calendly.com/default-booking'; // Fallback URL
    }
    
    /**
     * Shows the booking overlay with a random image
     */
    function showBookingOverlay() {
        const selectedImage = getRandomBookingImage();
        
        // Set the image source
        bookingImage.src = selectedImage;
        bookingImage.alt = selectedImage.includes('BookNow') ? 
            'Book Now - Start your Spanish journey' : 
            'First Free Lesson - Try before you commit';
        
        // Store the selected image for later use
        bookingImage.dataset.imagePath = selectedImage;
        
        // Show overlay with animation
        bookingOverlay.classList.add('active');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        bookingOverlay.focus();
        
        console.log('Booking overlay shown with image:', selectedImage);
    }
      /**
     * Hides the booking overlay
     */
    function hideBookingOverlay() {
        bookingOverlay.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to the currently visible floating button
        const activeButton = window.innerWidth <= 768 ? mobileFloatingButton : desktopFloatingButton;
        if (activeButton) {
            activeButton.focus();
        }
        
        console.log('Booking overlay hidden');
    }
    
    /**
     * Handles booking redirect when image is clicked
     */
    function handleBookingRedirect() {
        const imagePath = bookingImage.dataset.imagePath;
        const bookingUrl = getBookingUrl(imagePath);
        
        console.log('Redirecting to booking:', bookingUrl);
        
        // Open booking URL in new tab
        window.open(bookingUrl, '_blank');
        
        // Optional: Hide overlay after redirect
        hideBookingOverlay();
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'event_category': 'booking',
                'event_label': imagePath.split('/').pop(),
                'value': 1
            });
        }
    }    /**
     * Handles clicking on the floating button
     */
    function handleFloatingButtonClick() {
        console.log('Floating button clicked!');
        pauseAutoExpansion(); // Stop auto-expansion when user clicks
        showBookingOverlay();
        
        // Analytics tracking for button click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'engagement',
                'event_label': 'floating_book_button',
                'value': 1
            });
        }
    }
      // Event Listeners
    
    // Add event listeners to all floating buttons
    allFloatingButtons.forEach(button => {
        if (!button) return;
        
        // Button click
        button.addEventListener('click', handleFloatingButtonClick);
        
        // Keyboard accessibility
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleFloatingButtonClick();
            }
        });
        
        // Pause auto-expansion on hover (desktop only)
        if (button === desktopFloatingButton) {
            button.addEventListener('mouseenter', function() {
                pauseAutoExpansion();
            });
            
            button.addEventListener('focus', function() {
                pauseAutoExpansion();
            });
        }
    });
    
    // Booking image click (redirect to booking)
    bookingImage.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent overlay close
        handleBookingRedirect();
    });
    
    // Overlay click (close if clicking outside the image)
    bookingOverlay.addEventListener('click', function(event) {
        if (event.target === bookingOverlay) {
            hideBookingOverlay();
        }
    });
    
    // Keyboard accessibility for overlay
    bookingOverlay.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideBookingOverlay();
        }
        // Tab trapping for accessibility
        if (event.key === 'Tab') {
            event.preventDefault();
            bookingImage.focus();
        }
    });
    
    // Image keyboard accessibility
    bookingImage.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleBookingRedirect();
        }
    });
      // Prevent image drag
    bookingImage.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
    
    // Initialize auto-expansion system
    setupAutoExpansion();
    
    // Optional: Auto-hide overlay after certain time (uncomment if desired)
    /*
    let overlayTimeout;
    function showBookingOverlay() {
        // ... existing code ...
        
        // Auto-hide after 30 seconds
        overlayTimeout = setTimeout(() => {
            hideBookingOverlay();
        }, 30000);
    }
    
    function hideBookingOverlay() {
        // ... existing code ...
        
        if (overlayTimeout) {
            clearTimeout(overlayTimeout);
        }
    }
    */
});
