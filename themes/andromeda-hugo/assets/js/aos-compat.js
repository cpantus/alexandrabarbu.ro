/**
 * AOS Compatibility Shim
 * Maps data-aos attributes to the theme's scroll-trigger system
 * Lightweight alternative to loading full AOS library
 */

(function() {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return; // Skip animations for accessibility

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Find all elements with data-aos attribute
    const aosElements = document.querySelectorAll('[data-aos]');

    if (!aosElements.length || !('IntersectionObserver' in window)) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-aos-delay') || 0;

          setTimeout(function() {
            entry.target.classList.add('aos-animate');
          }, parseInt(delay));

          // Unobserve after animation triggers (aos default behavior)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all AOS elements
    aosElements.forEach(function(element) {
      // Add initial animation class based on data-aos value
      const animation = element.getAttribute('data-aos');
      element.classList.add('aos-init');
      element.setAttribute('data-aos-animation', animation);

      observer.observe(element);
    });
  }

})();
