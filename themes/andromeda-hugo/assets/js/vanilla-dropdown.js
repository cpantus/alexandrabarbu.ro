/**
 * Vanilla JavaScript Dropdown Handler
 * Replaces Bootstrap dropdown functionality for navigation
 * Supports: data-dropdown-toggle, outside click, keyboard navigation, mobile touch
 * Supports both Bootstrap classes (legacy) and BEM classes (new)
 * @version 2.2.0
 *
 * v2.2.0 - Simplified hover behavior: dropdown stays open while mouse is over
 *          parent item OR dropdown menu. Uses CSS :hover as primary mechanism.
 */

(function() {
  'use strict';

  // Track all active dropdowns
  const activeDropdowns = new Set();

  // Desktop breakpoint
  const DESKTOP_BREAKPOINT = 992;

  class Dropdown {
    constructor(element) {
      this.trigger = element;
      this.menu = this.getMenu();
      this.isOpen = false;
      this.parent = this.trigger.closest('.c-navigation__item') ||
                    this.trigger.closest('.c-nav-item') ||
                    this.trigger.closest('.nav-item') ||
                    this.trigger.parentElement;

      if (!this.menu) {
        console.warn('Dropdown menu not found for', element);
        return;
      }

      this.init();
    }

    /**
     * Get the dropdown menu element
     */
    getMenu() {
      // Try sibling first (most common pattern)
      let menu = this.trigger.nextElementSibling;

      // BEM classes (new - navigation molecule)
      if (menu && menu.classList.contains('c-navigation__dropdown')) {
        return menu;
      }

      // BEM classes (new - nav-item molecule)
      if (menu && menu.classList.contains('c-nav-item__dropdown')) {
        return menu;
      }

      // Bootstrap classes (legacy)
      if (menu && menu.classList.contains('dropdown-menu')) {
        return menu;
      }

      // Try parent's child
      const parent = this.trigger.parentElement;
      menu = parent.querySelector('.c-navigation__dropdown') ||
             parent.querySelector('.c-nav-item__dropdown') ||
             parent.querySelector('.dropdown-menu');
      return menu;
    }

    /**
     * Initialize dropdown functionality
     */
    init() {
      // Set initial ARIA attributes
      this.updateAria();

      // Bind click event (for mobile and as fallback)
      this.trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });

      // Bind hover events for desktop
      this.initHoverBehavior();

      // Bind keyboard events for accessibility
      this.trigger.addEventListener('keydown', (e) => {
        this.handleKeyboard(e);
      });

      // Handle menu item clicks - close dropdown after selection
      const menuItems = this.menu.querySelectorAll('.c-navigation__dropdown-link, .c-nav-item__dropdown-link, .dropdown-item');
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          this.close();
        });
      });
    }

    /**
     * Initialize hover behavior for desktop
     * Simple approach: open on mouseenter parent, close on mouseleave parent
     * Since dropdown is INSIDE parent, hovering dropdown keeps parent hovered
     */
    initHoverBehavior() {
      this.parent.addEventListener('mouseenter', () => {
        if (window.innerWidth >= DESKTOP_BREAKPOINT) {
          this.open();
        }
      });

      this.parent.addEventListener('mouseleave', () => {
        if (window.innerWidth >= DESKTOP_BREAKPOINT) {
          this.close();
        }
      });
    }

    /**
     * Toggle dropdown state
     */
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Open the dropdown
     */
    open() {
      // Close all other dropdowns first
      this.closeOthers();

      // Add open/show classes (BEM + Bootstrap)
      this.menu.classList.add('c-navigation__dropdown--open', 'c-nav-item__dropdown--open', 'show');
      this.parent.classList.add('c-navigation__item--open', 'c-nav-item--open', 'show');
      this.isOpen = true;
      this.updateAria();

      // Track this dropdown as active
      activeDropdowns.add(this);

      // Position dropdown (handle right-aligned)
      this.positionMenu();

      // Add click outside listener (for mobile/click mode)
      this.boundOutsideClick = this.handleOutsideClick.bind(this);
      setTimeout(() => {
        document.addEventListener('click', this.boundOutsideClick);
      }, 0);
    }

    /**
     * Close the dropdown
     */
    close() {
      this.menu.classList.remove('c-navigation__dropdown--open', 'c-nav-item__dropdown--open', 'show');
      this.parent.classList.remove('c-navigation__item--open', 'c-nav-item--open', 'show');
      this.isOpen = false;
      this.updateAria();

      // Remove from active dropdowns
      activeDropdowns.delete(this);

      // Remove click outside listener
      if (this.boundOutsideClick) {
        document.removeEventListener('click', this.boundOutsideClick);
      }
    }

    /**
     * Close all other dropdowns
     */
    closeOthers() {
      activeDropdowns.forEach(dropdown => {
        if (dropdown !== this) {
          dropdown.close();
        }
      });
    }

    /**
     * Handle clicks outside the dropdown
     */
    handleOutsideClick(e) {
      if (!this.parent.contains(e.target)) {
        this.close();
      }
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboard(e) {
      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.toggle();
          break;

        case 'Escape':
          if (this.isOpen) {
            e.preventDefault();
            this.close();
            this.trigger.focus();
          }
          break;

        case 'ArrowDown':
          if (!this.isOpen) {
            e.preventDefault();
            this.open();
          } else {
            e.preventDefault();
            this.focusNextItem();
          }
          break;

        case 'ArrowUp':
          if (this.isOpen) {
            e.preventDefault();
            this.focusPreviousItem();
          }
          break;
      }
    }

    /**
     * Focus the next menu item
     */
    focusNextItem() {
      const items = Array.from(this.menu.querySelectorAll('.c-navigation__dropdown-link, .c-nav-item__dropdown-link, .dropdown-item'));
      const currentIndex = items.indexOf(document.activeElement);

      if (currentIndex < items.length - 1) {
        items[currentIndex + 1].focus();
      } else {
        items[0].focus(); // Loop to first
      }
    }

    /**
     * Focus the previous menu item
     */
    focusPreviousItem() {
      const items = Array.from(this.menu.querySelectorAll('.c-navigation__dropdown-link, .c-nav-item__dropdown-link, .dropdown-item'));
      const currentIndex = items.indexOf(document.activeElement);

      if (currentIndex > 0) {
        items[currentIndex - 1].focus();
      } else {
        items[items.length - 1].focus(); // Loop to last
      }
    }

    /**
     * Position the dropdown menu (handle viewport edges)
     */
    positionMenu() {
      const rect = this.menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Check if dropdown overflows viewport on the right
      if (rect.right > viewportWidth) {
        this.menu.classList.add('c-navigation__dropdown--end', 'c-nav-item__dropdown--end', 'dropdown-menu-end');
      }
    }

    /**
     * Update ARIA attributes for accessibility
     */
    updateAria() {
      this.trigger.setAttribute('aria-expanded', this.isOpen);

      if (!this.trigger.getAttribute('aria-haspopup')) {
        this.trigger.setAttribute('aria-haspopup', 'true');
      }
    }
  }

  /**
   * Initialize all dropdown elements on page load
   */
  function initDropdowns() {
    // Support both BEM pattern (data-dropdown-toggle) and Bootstrap pattern (data-toggle="dropdown")
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-toggle], [data-toggle="dropdown"]');
    dropdownTriggers.forEach(trigger => {
      new Dropdown(trigger);
    });
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }

  /**
   * Expose Dropdown class for manual initialization
   */
  window.VanillaDropdown = Dropdown;

})();
