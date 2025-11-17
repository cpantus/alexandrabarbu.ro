/**
 * Values Compass - Mobile Touch Interactions
 * Lightweight JavaScript for progressive disclosure on mobile devices
 * Preference: CSS-first approach, JS only for mobile tap behavior
 */

(function() {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Only run on touch-enabled devices
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) {
    return; // Exit early if not a touch device
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const valueCards = document.querySelectorAll('.value-card');

    if (!valueCards.length) return; // Exit if no cards found

    valueCards.forEach(function(card) {
      // Make cards tappable
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      // Toggle expansion on tap
      card.addEventListener('click', function(e) {
        // Don't interfere with links inside cards
        if (e.target.tagName === 'A') return;

        toggleCard(card);
      });

      // Keyboard accessibility
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });

      // Close expanded cards when tapping outside
      document.addEventListener('click', function(e) {
        if (!card.contains(e.target) && card.classList.contains('is-expanded')) {
          collapseCard(card);
        }
      });
    });
  }

  /**
   * Toggle card expansion state
   */
  function toggleCard(card) {
    if (card.classList.contains('is-expanded')) {
      collapseCard(card);
    } else {
      expandCard(card);
    }
  }

  /**
   * Expand card to show description
   */
  function expandCard(card) {
    // Collapse all other cards first (accordion behavior)
    const allCards = document.querySelectorAll('.value-card.is-expanded');
    allCards.forEach(function(otherCard) {
      if (otherCard !== card) {
        collapseCard(otherCard);
      }
    });

    card.classList.add('is-expanded');
    card.setAttribute('aria-expanded', 'true');

    // Scroll card into view if needed (smooth scroll)
    if (!prefersReducedMotion) {
      setTimeout(function() {
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 300);
    }

    // Announce expansion to screen readers
    announceToScreenReader(card.querySelector('.value-card-title').textContent + ' expanded');
  }

  /**
   * Collapse card to hide description
   */
  function collapseCard(card) {
    card.classList.remove('is-expanded');
    card.setAttribute('aria-expanded', 'false');
  }

  /**
   * Announce changes to screen readers
   */
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(function() {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Intersection Observer for entrance animations
   * Only if reduced motion is not preferred
   */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Pause animations until in viewport
    document.querySelectorAll('.value-card').forEach(function(card) {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  }

})();
