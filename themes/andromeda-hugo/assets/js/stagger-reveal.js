/**
 * Stagger Reveal - Scroll-triggered card animations
 * Design Excellence 2.2: Cards animate when grid enters viewport
 *
 * Uses IntersectionObserver for performance (no scroll event spam)
 * Triggers once per grid, animations handled by CSS transition-delay
 */
(function() {
  'use strict';

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make all cards visible immediately
    document.querySelectorAll('.c-card-grid--stagger').forEach(function(grid) {
      grid.classList.add('is-visible');
    });
    return;
  }

  // IntersectionObserver config: trigger when 15% of grid is visible
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once triggered (animate only once)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all stagger grids
  function initStaggerReveal() {
    var grids = document.querySelectorAll('.c-card-grid--stagger');
    grids.forEach(function(grid) {
      observer.observe(grid);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStaggerReveal);
  } else {
    initStaggerReveal();
  }
})();
