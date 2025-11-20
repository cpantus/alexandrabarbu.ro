/**
 * Back to Top Button - Scroll to top functionality
 * Version: 2.0.0 (BEM Refactored 2025-11-20)
 *
 * Features:
 * - Shows button when scrolled 300px down
 * - Smooth scroll to top on click
 * - Respects prefers-reduced-motion
 * - Keyboard accessible
 * - Uses modern vanilla JavaScript
 * - No jQuery dependency
 *
 * Supports both legacy (.back-to-top) and BEM (.c-back-to-top) classes
 */

(function() {
  'use strict';

  // Get back to top button (try BEM class first, fallback to legacy)
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  // Configuration
  const SHOW_THRESHOLD = 300;  // Show button after scrolling 300px
  const VISIBLE_CLASS = 'visible';  // Class to add when button should be visible
  const BEM_VISIBLE_CLASS = 'c-back-to-top--visible';  // BEM modifier class

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Show or hide button based on scroll position
   */
  function handleScroll() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (scrolled > SHOW_THRESHOLD) {
      // Show button
      backToTop.classList.add(VISIBLE_CLASS);
      backToTop.classList.add(BEM_VISIBLE_CLASS);
    } else {
      // Hide button
      backToTop.classList.remove(VISIBLE_CLASS);
      backToTop.classList.remove(BEM_VISIBLE_CLASS);
    }
  }

  /**
   * Scroll to top of page
   */
  function scrollToTop() {
    if (prefersReducedMotion) {
      // Instant scroll for users who prefer reduced motion
      window.scrollTo(0, 0);
    } else {
      // Smooth scroll for everyone else
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // Initialize: Check scroll position on load
  handleScroll();

  // Listen for scroll events (throttled for performance)
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    // Throttle scroll events to max 60fps
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        handleScroll();
        scrollTimeout = null;
      }, 16);  // ~60fps
    }
  }, { passive: true });

  // Listen for click events
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
  });

  // Listen for keyboard events (Enter or Space)
  backToTop.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  // Listen for reduced motion preference changes (dynamic)
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', function() {
    // Update prefersReducedMotion on change
    prefersReducedMotion = motionQuery.matches;
  });

})();
