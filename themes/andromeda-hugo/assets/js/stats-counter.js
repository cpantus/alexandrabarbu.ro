/**
 * Stats Counter - Animated number counting with SVG progress rings
 * Lightweight intersection observer implementation
 */

(function() {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const statItems = document.querySelectorAll('.stat-item');

    if (!statItems.length) return;

    // Use Intersection Observer for performance
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
        rootMargin: '0px'
      });

      statItems.forEach(function(item) {
        observer.observe(item);
      });
    } else {
      // Fallback: animate immediately if no IntersectionObserver or reduced motion
      statItems.forEach(function(item) {
        if (prefersReducedMotion) {
          // Show final values immediately
          showFinalValues(item);
        } else {
          animateStat(item);
        }
      });
    }
  }

  /**
   * Handle intersection observer callback
   */
  function handleIntersection(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !entry.target.classList.contains('stat-animated')) {
        entry.target.classList.add('stat-animated');
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }

  /**
   * Animate single stat item
   */
  function animateStat(item) {
    const countElement = item.querySelector('[data-count]');
    const ring = item.querySelector('.ring-progress');

    if (countElement) {
      animateCounter(countElement);
    }

    if (ring) {
      animateProgressRing(ring, item);
    }
  }

  /**
   * Animate number counter
   */
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    // Add counting class for pulse effect
    const numberContainer = element.closest('.stat-number');
    if (numberContainer) {
      numberContainer.classList.add('counting');
    }

    function updateCount() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * eased);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target.toLocaleString();
        if (numberContainer) {
          numberContainer.classList.remove('counting');
        }
      }
    }

    requestAnimationFrame(updateCount);
  }

  /**
   * Animate SVG progress ring
   */
  function animateProgressRing(ring, item) {
    const countElement = item.querySelector('[data-count]');
    if (!countElement) return;

    const value = parseInt(countElement.getAttribute('data-count'), 10);
    const maxValue = parseInt(item.getAttribute('data-max-value') || '100', 10);
    const percentage = Math.min((value / maxValue) * 100, 100);

    // Calculate circle properties
    const radius = 45; // SVG circle radius
    const circumference = 2 * Math.PI * radius;

    // Set initial state
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    // Animate to final state
    setTimeout(function() {
      const offset = circumference - (percentage / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    }, 100);
  }

  /**
   * Show final values immediately (for reduced motion)
   */
  function showFinalValues(item) {
    const countElement = item.querySelector('[data-count]');
    const ring = item.querySelector('.ring-progress');

    if (countElement) {
      const target = parseInt(countElement.getAttribute('data-count'), 10);
      countElement.textContent = target.toLocaleString();
    }

    if (ring) {
      const value = parseInt(countElement.getAttribute('data-count'), 10);
      const maxValue = parseInt(item.getAttribute('data-max-value') || '100', 10);
      const percentage = Math.min((value / maxValue) * 100, 100);
      const radius = 45;
      const circumference = 2 * Math.PI * radius;

      ring.style.strokeDasharray = circumference;
      const offset = circumference - (percentage / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    }
  }

})();
