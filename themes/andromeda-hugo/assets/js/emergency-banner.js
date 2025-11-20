/**
 * Emergency Banner - Crisis Resources Banner
 * Version: 2.0.0 (BEM Refactored 2025-11-20)
 *
 * Features:
 * - Psychology practice crisis hotline display (Telefonul Sufletului)
 * - Dismissible with sessionStorage (persists for session only)
 * - Slide-up animation on dismiss
 * - Respects prefers-reduced-motion
 * - Shows again in new browser session (sessionStorage clears)
 *
 * Supports both legacy (.emergency-banner) and BEM (.c-emergency-banner) classes
 */

(function() {
  'use strict';

  // Get elements
  const banner = document.getElementById('emergency-banner');
  const closeBtn = document.getElementById('emergency-close');

  if (!banner || !closeBtn) return;

  // Configuration
  const STORAGE_KEY = 'emergency-banner-dismissed';
  const ANIMATION_DURATION = 300; // Match SCSS transition duration
  const HIDING_CLASS = 'hiding';
  const BEM_HIDING_CLASS = 'c-emergency-banner--hiding';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Check if banner was dismissed in current session
   * @returns {boolean}
   */
  function isDismissed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      console.error('Emergency banner: sessionStorage not available', e);
      return false;
    }
  }

  /**
   * Mark banner as dismissed in current session
   */
  function markDismissed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {
      console.error('Emergency banner: Failed to save dismissal state', e);
    }
  }

  /**
   * Hide banner with animation
   */
  function hideBanner() {
    // Add hiding class to trigger slide-up animation
    banner.classList.add(HIDING_CLASS);
    banner.classList.add(BEM_HIDING_CLASS);

    // Mark as dismissed
    markDismissed();

    // Remove from DOM after animation completes
    setTimeout(() => {
      banner.style.display = 'none';
    }, prefersReducedMotion ? 0 : ANIMATION_DURATION);
  }

  /**
   * Initialize banner
   */
  function init() {
    // Check if already dismissed in this session
    if (isDismissed()) {
      banner.style.display = 'none';
      return;
    }

    // Banner is visible - set up close functionality
    closeBtn.addEventListener('click', hideBanner);

    // Also close on Escape key (accessibility)
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && banner.style.display !== 'none') {
        hideBanner();
      }
    });
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
