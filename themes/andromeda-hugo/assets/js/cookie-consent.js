/**
 * Cookie Consent Banner - GDPR Compliance
 * Version: 2.0.0 (BEM Refactored 2025-11-20)
 *
 * Features:
 * - GDPR compliant (explicit consent required)
 * - localStorage preference storage
 * - Two consent levels: Accept all vs Essential only
 * - Auto-show after 1s delay (if no preference exists)
 * - Fade + slide-up animation
 * - Respects prefers-reduced-motion
 * - Psychology practice-specific messaging
 * - Analytics opt-in support
 *
 * Supports both legacy (.cookie-consent) and BEM (.c-cookie-consent) classes
 */

(function() {
  'use strict';

  // Get elements
  const banner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (!banner || !acceptBtn || !declineBtn) return;

  // Configuration
  const STORAGE_KEY = 'cookie-consent';
  const SHOW_DELAY = 1000;       // Show banner after 1s
  const ANIMATION_DURATION = 300; // Match SCSS transition duration
  const VISIBLE_CLASS = 'visible';
  const BEM_VISIBLE_CLASS = 'c-cookie-consent--visible';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Check for existing consent preference
   * @returns {string|null} - 'accepted', 'essential-only', or null
   */
  function getConsentPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.error('Cookie consent: localStorage not available', e);
      return null;
    }
  }

  /**
   * Save consent preference
   * @param {string} preference - 'accepted' or 'essential-only'
   */
  function saveConsentPreference(preference) {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch (e) {
      console.error('Cookie consent: Failed to save preference', e);
    }
  }

  /**
   * Show banner with animation
   */
  function showBanner() {
    // Make banner visible (but transparent)
    banner.style.display = 'block';

    // Trigger reflow to ensure display:block applies before animation
    void banner.offsetHeight;

    // Add visible class to trigger fade-in animation
    banner.classList.add(VISIBLE_CLASS);
    banner.classList.add(BEM_VISIBLE_CLASS);
  }

  /**
   * Hide banner with animation
   */
  function hideBanner() {
    // Remove visible class to trigger fade-out animation
    banner.classList.remove(VISIBLE_CLASS);
    banner.classList.remove(BEM_VISIBLE_CLASS);

    // Hide banner after animation completes
    setTimeout(() => {
      banner.style.display = 'none';
    }, prefersReducedMotion ? 0 : ANIMATION_DURATION);
  }

  /**
   * Handle Accept All Cookies
   */
  function handleAccept() {
    // Save preference
    saveConsentPreference('accepted');

    // Hide banner
    hideBanner();

    // Enable analytics (if gtag is available)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }

    // Trigger custom event for analytics initialization
    window.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
  }

  /**
   * Handle Essential Only
   */
  function handleDecline() {
    // Save preference
    saveConsentPreference('essential-only');

    // Hide banner
    hideBanner();

    // Deny analytics (if gtag is available)
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }

    // Trigger custom event
    window.dispatchEvent(new CustomEvent('cookieConsentEssentialOnly'));
  }

  /**
   * Initialize banner
   */
  function init() {
    // Check for existing preference
    const consent = getConsentPreference();

    if (!consent) {
      // No preference exists - show banner after delay
      setTimeout(() => {
        showBanner();
      }, prefersReducedMotion ? 0 : SHOW_DELAY);
    } else {
      // Preference exists - apply it
      if (consent === 'accepted' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    }
  }

  // Event listeners
  acceptBtn.addEventListener('click', handleAccept);
  declineBtn.addEventListener('click', handleDecline);

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
