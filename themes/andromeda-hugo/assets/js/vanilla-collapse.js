/**
 * Vanilla JavaScript Collapse Handler
 * Replaces Bootstrap collapse functionality for navigation, accordions, and FAQ
 * Supports: data-toggle="collapse", data-target, smooth animations, keyboard accessibility
 * @version 1.0.0
 */

(function() {
  'use strict';

  class Collapse {
    constructor(element) {
      this.trigger = element;
      this.target = this.getTarget();
      this.isExpanded = false;

      if (!this.target) {
        console.warn('Collapse target not found for', element);
        return;
      }

      this.init();
    }

    /**
     * Get the collapse target element from data-target or href
     */
    getTarget() {
      const targetSelector = this.trigger.getAttribute('data-target') ||
                            this.trigger.getAttribute('href');

      if (!targetSelector) return null;

      // Handle #id selectors
      if (targetSelector.startsWith('#')) {
        return document.querySelector(targetSelector);
      }

      // Handle class selectors
      return document.querySelector(targetSelector);
    }

    /**
     * Initialize collapse functionality
     */
    init() {
      // Set initial ARIA attributes
      this.updateAria();

      // Add initial collapsed class if not already expanded
      if (!this.target.classList.contains('show')) {
        this.target.classList.add('collapse');
        this.isExpanded = false;
      } else {
        this.isExpanded = true;
      }

      // Bind click event
      this.trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });

      // Bind keyboard events for accessibility
      this.trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    /**
     * Toggle collapse state
     */
    toggle() {
      if (this.isExpanded) {
        this.hide();
      } else {
        this.show();
      }
    }

    /**
     * Show (expand) the collapse target
     */
    show() {
      // Handle accordion behavior (close siblings)
      this.closeSiblings();

      // Start expanding
      this.target.classList.remove('collapse');
      this.target.classList.add('collapsing');

      // Get the scroll height for animation
      const height = this.target.scrollHeight;
      this.target.style.height = height + 'px';

      // After transition, set to show state
      setTimeout(() => {
        this.target.classList.remove('collapsing');
        this.target.classList.add('collapse', 'show');
        this.target.style.height = '';
        this.isExpanded = true;
        this.updateAria();
      }, 350); // Match CSS transition duration

      this.updateAria(true);
    }

    /**
     * Hide (collapse) the target
     */
    hide() {
      // Set explicit height before collapsing
      this.target.style.height = this.target.scrollHeight + 'px';

      // Force reflow
      this.target.offsetHeight;

      // Start collapsing
      this.target.classList.add('collapsing');
      this.target.classList.remove('collapse', 'show');
      this.target.style.height = '0';

      // After transition, set to collapsed state
      setTimeout(() => {
        this.target.classList.remove('collapsing');
        this.target.classList.add('collapse');
        this.target.style.height = '';
        this.isExpanded = false;
        this.updateAria();
      }, 350); // Match CSS transition duration

      this.updateAria(false);
    }

    /**
     * Close sibling accordions (for accordion groups)
     */
    closeSiblings() {
      const parent = this.trigger.getAttribute('data-parent');
      if (!parent) return;

      const parentElement = document.querySelector(parent);
      if (!parentElement) return;

      // Find all other collapse triggers in the same parent
      const siblings = parentElement.querySelectorAll('[data-toggle="collapse"]');
      siblings.forEach(sibling => {
        if (sibling !== this.trigger) {
          const siblingTarget = sibling.getAttribute('data-target') ||
                               sibling.getAttribute('href');
          const siblingElement = document.querySelector(siblingTarget);

          if (siblingElement && siblingElement.classList.contains('show')) {
            // Trigger collapse for sibling
            const siblingCollapse = new Collapse(sibling);
            siblingCollapse.hide();
          }
        }
      });
    }

    /**
     * Update ARIA attributes for accessibility
     */
    updateAria(expanding = null) {
      const isExpanded = expanding !== null ? expanding : this.isExpanded;
      this.trigger.setAttribute('aria-expanded', isExpanded);

      // Set ARIA label if not present
      if (!this.trigger.getAttribute('aria-label')) {
        const label = isExpanded ? 'Collapse' : 'Expand';
        this.trigger.setAttribute('aria-label', label);
      }
    }
  }

  /**
   * Initialize all collapse elements on page load
   */
  function initCollapses() {
    const collapseTriggers = document.querySelectorAll('[data-toggle="collapse"]');
    collapseTriggers.forEach(trigger => {
      new Collapse(trigger);
    });
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollapses);
  } else {
    initCollapses();
  }

  /**
   * Expose Collapse class for manual initialization
   */
  window.VanillaCollapse = Collapse;

})();
