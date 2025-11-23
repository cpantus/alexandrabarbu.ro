// ==================================
// NAVIGATION SCROLL STATE - Redesign 2025
// ==================================
//
// Purpose: Add glassmorphism effect to navigation when scrolling
// Features: Transparent → glassmorphism transition, performance optimized
//
// Created: 2025-11-23 (Theme Redesign 2025 - Phase 2)
// Version: 1.0.0
//
// Usage:
//   Automatically detects scroll and adds .c-navbar--scrolled class
//   Requires parent element with class .c-navbar
//

(function() {
  'use strict';

  // Configuration
  const SCROLL_THRESHOLD = 100; // Pixels scrolled before adding class
  const NAVBAR_CLASS = 'c-navbar';
  const SCROLLED_CLASS = 'c-navbar--scrolled';

  // Get navbar element
  const navbar = document.querySelector(`.${NAVBAR_CLASS}`);

  // Exit if navbar not found
  if (!navbar) {
    return;
  }

  // Throttle function for performance
  function throttle(func, wait) {
    let timeout = null;
    let previous = 0;

    return function() {
      const now = Date.now();
      const remaining = wait - (now - previous);

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(this, arguments);
      } else if (!timeout) {
        timeout = setTimeout(function() {
          previous = Date.now();
          timeout = null;
          func.apply(this, arguments);
        }, remaining);
      }
    };
  }

  // Check scroll position and toggle class
  function handleScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > SCROLL_THRESHOLD) {
      navbar.classList.add(SCROLLED_CLASS);
    } else {
      navbar.classList.remove(SCROLLED_CLASS);
    }
  }

  // Throttled scroll handler (runs max once every 100ms)
  const throttledHandleScroll = throttle(handleScroll, 100);

  // Add scroll event listener
  window.addEventListener('scroll', throttledHandleScroll, { passive: true });

  // Check initial scroll position (in case page loads scrolled)
  handleScroll();

  // Reduced motion support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // User prefers reduced motion, but we still add the class
    // CSS will handle disabling transitions
    console.log('Navigation scroll: Reduced motion detected, transitions disabled via CSS');
  }

})();
