/**
 * Cookie Consent Banner — GDPR Compliance
 * Version: 3.0.0 (Granular consent with cookie-modal integration)
 *
 * Features:
 * - GDPR compliant (explicit consent required)
 * - Granular per-category consent stored as JSON in localStorage
 * - Three consent options: Accept All / Customize / Essential Only
 * - Backward-compatible migration from old string format
 * - Public API: window.CookieConsent.getConsent(categoryId)
 * - Dispatches per-category events for script loading
 * - Auto-show after 1s delay (if no preference exists)
 * - Fade + slide-up animation
 * - Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Elements
  var banner = document.getElementById('cookie-consent');
  var acceptBtn = document.getElementById('cookie-accept');
  var customizeBtn = document.getElementById('cookie-customize');
  var declineBtn = document.getElementById('cookie-decline');

  if (!banner || !acceptBtn || !declineBtn) return;

  // Configuration
  var STORAGE_KEY = 'cookie-consent';
  var SHOW_DELAY = 1000;
  var ANIMATION_DURATION = 300;
  var VISIBLE_CLASS = 'visible';
  var BEM_VISIBLE_CLASS = 'c-cookie-consent--visible';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // All category IDs (must match data/cookies.yaml)
  var ALL_CATEGORIES = ['necessary', 'functional', 'analytics'];

  /**
   * Build a consent object with all categories set to a value
   */
  function buildConsent(value) {
    var consent = { necessary: true, timestamp: new Date().toISOString() };
    ALL_CATEGORIES.forEach(function(cat) {
      if (cat !== 'necessary') {
        consent[cat] = value;
      }
    });
    return consent;
  }

  /**
   * Migrate old string format to new JSON format
   * Old: 'accepted' | 'essential-only'
   * New: { necessary: true, functional: true/false, analytics: true/false, timestamp: '...' }
   */
  function migrateOldFormat(raw) {
    if (raw === 'accepted') {
      return buildConsent(true);
    }
    if (raw === 'essential-only') {
      return buildConsent(false);
    }
    return null;
  }

  /**
   * Read consent from localStorage (with migration)
   * @returns {object|null}
   */
  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      // Try JSON parse first (new format)
      try {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.necessary !== undefined) {
          return parsed;
        }
      } catch (e) {
        // Not JSON — try old string migration
      }

      // Migrate old format
      var migrated = migrateOldFormat(raw);
      if (migrated) {
        saveConsent(migrated);
        return migrated;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save consent to localStorage
   * @param {object} consent
   */
  function saveConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      // localStorage not available
    }
  }

  /**
   * Apply consent — dispatch events and update gtag
   */
  function applyConsent(consent) {
    if (!consent) return;

    // Analytics
    if (consent.analytics && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }

    // Dispatch per-category events
    ALL_CATEGORIES.forEach(function(cat) {
      if (consent[cat]) {
        window.dispatchEvent(new CustomEvent('cookieConsent:' + cat, { detail: { granted: true } }));
      }
    });

    // Legacy events for backward compat
    var allEnabled = ALL_CATEGORIES.every(function(cat) { return consent[cat]; });
    if (allEnabled) {
      window.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
    } else if (!consent.functional && !consent.analytics) {
      window.dispatchEvent(new CustomEvent('cookieConsentEssentialOnly'));
    }
  }

  /**
   * Show banner with animation
   */
  function showBanner() {
    banner.style.display = 'block';
    void banner.offsetHeight;
    banner.classList.add(VISIBLE_CLASS);
    banner.classList.add(BEM_VISIBLE_CLASS);
  }

  /**
   * Hide banner with animation
   */
  function hideBanner() {
    banner.classList.remove(VISIBLE_CLASS);
    banner.classList.remove(BEM_VISIBLE_CLASS);
    setTimeout(function() {
      banner.style.display = 'none';
    }, prefersReducedMotion ? 0 : ANIMATION_DURATION);
  }

  /**
   * Handle Accept All
   */
  function handleAccept() {
    var consent = buildConsent(true);
    saveConsent(consent);
    hideBanner();
    applyConsent(consent);
  }

  /**
   * Handle Essential Only
   */
  function handleDecline() {
    var consent = buildConsent(false);
    saveConsent(consent);
    hideBanner();
    applyConsent(consent);
  }

  /**
   * Handle Customize → open modal
   */
  function handleCustomize() {
    if (window.CookieModal) {
      window.CookieModal.open();
    }
  }

  /**
   * Initialize banner
   */
  function init() {
    var consent = readConsent();

    if (!consent) {
      setTimeout(function() {
        showBanner();
      }, prefersReducedMotion ? 0 : SHOW_DELAY);
    } else {
      applyConsent(consent);
    }
  }

  // Event listeners
  acceptBtn.addEventListener('click', handleAccept);
  declineBtn.addEventListener('click', handleDecline);
  if (customizeBtn) {
    customizeBtn.addEventListener('click', handleCustomize);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.CookieConsent = {
    /**
     * Get consent for a specific category
     * @param {string} categoryId - e.g. 'analytics', 'functional'
     * @returns {boolean}
     */
    getConsent: function(categoryId) {
      var consent = readConsent();
      if (!consent) return false;
      if (categoryId === 'necessary') return true;
      return !!consent[categoryId];
    },

    /**
     * Get all consent values
     * @returns {object|null}
     */
    getAll: function() {
      return readConsent();
    },

    /**
     * Save consent object and apply it
     * @param {object} consent
     */
    save: function(consent) {
      consent.necessary = true; // always enforce
      saveConsent(consent);
      applyConsent(consent);
    }
  };

})();
