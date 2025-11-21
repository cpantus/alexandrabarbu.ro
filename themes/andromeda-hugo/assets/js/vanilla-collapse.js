/**
 * Vanilla JavaScript Collapse Handler
 * Replaces Bootstrap collapse functionality for navigation, accordions, and FAQ
 * Supports: data-toggle="collapse", data-target, smooth animations, keyboard accessibility
 * @version 2.0.0 - Simplified approach
 */

(function() {
  'use strict';

  // Initialize all collapse elements on page load
  function initCollapses() {
    const triggers = document.querySelectorAll('[data-toggle="collapse"]');

    triggers.forEach(trigger => {
      const targetSelector = trigger.getAttribute('data-target') || trigger.getAttribute('href');
      if (!targetSelector) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      // Click handler
      trigger.addEventListener('click', function(e) {
        e.preventDefault();

        const isExpanded = target.classList.contains('show');
        const parent = trigger.getAttribute('data-parent');

        // Close siblings if in accordion
        if (parent && !isExpanded) {
          const parentEl = document.querySelector(parent);
          if (parentEl) {
            const siblings = parentEl.querySelectorAll('.collapse.show');
            siblings.forEach(sibling => {
              if (sibling !== target) {
                sibling.classList.remove('show');
                const siblingTrigger = parentEl.querySelector(`[data-target="#${sibling.id}"]`);
                if (siblingTrigger) {
                  siblingTrigger.setAttribute('aria-expanded', 'false');
                  siblingTrigger.classList.add('collapsed');
                }
              }
            });
          }
        }

        // Toggle current
        if (isExpanded) {
          target.classList.remove('show');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.classList.add('collapsed');
        } else {
          target.classList.add('show');
          trigger.setAttribute('aria-expanded', 'true');
          trigger.classList.remove('collapsed');
        }
      });

      // Keyboard handler
      trigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollapses);
  } else {
    initCollapses();
  }

  // Expose for manual re-initialization if needed
  window.initCollapses = initCollapses;

})();
