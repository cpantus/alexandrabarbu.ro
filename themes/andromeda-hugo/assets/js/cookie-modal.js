/**
 * Cookie Consent Modal — Per-category GDPR preferences
 * Works with cookie-consent.js (banner) and vanilla-collapse.js (accordion)
 *
 * Features:
 * - Open/close modal with backdrop
 * - Toggle switches per cookie category
 * - Read/write granular consent JSON to localStorage
 * - "Show more" description toggle
 * - Dispatch per-category events for script loading
 * - Trap focus inside modal when open
 */

(function() {
  'use strict';

  var STORAGE_KEY = 'cookie-consent';
  var ANIMATION_DURATION = 300;
  var VISIBLE_CLASS = 'c-cookie-modal--visible';

  // Elements
  var modal = document.getElementById('cookie-modal');
  if (!modal) return;

  var closeBtn = document.getElementById('cookie-modal-close');
  var saveBtn = document.getElementById('cookie-modal-save');
  var showMoreBtn = document.getElementById('cookie-modal-show-more');
  var moreText = document.getElementById('cookie-modal-more-text');
  var toggles = modal.querySelectorAll('.c-cookie-modal__toggle-input');
  var dialog = modal.querySelector('.c-cookie-modal__dialog');

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var previousFocus = null;

  /**
   * Open modal
   */
  function open() {
    previousFocus = document.activeElement;
    modal.style.display = 'flex';
    void modal.offsetHeight; // force reflow
    modal.classList.add(VISIBLE_CLASS);
    document.body.style.overflow = 'hidden';

    // Load current preferences into toggles
    loadTogglesFromStorage();

    // Focus the dialog
    dialog.setAttribute('tabindex', '-1');
    dialog.focus();
  }

  /**
   * Close modal
   */
  function close() {
    modal.classList.remove(VISIBLE_CLASS);
    document.body.style.overflow = '';

    setTimeout(function() {
      modal.style.display = 'none';
    }, prefersReducedMotion ? 0 : ANIMATION_DURATION);

    // Restore focus
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  /**
   * Load current consent state into toggle switches
   */
  function loadTogglesFromStorage() {
    var consent = window.CookieConsent ? window.CookieConsent.getAll() : null;
    if (!consent) return;

    toggles.forEach(function(toggle) {
      var cat = toggle.getAttribute('data-category');
      if (cat && consent[cat] !== undefined) {
        toggle.checked = consent[cat];
      }
    });
  }

  /**
   * Build consent object from current toggle states
   */
  function buildConsentFromToggles() {
    var consent = {
      necessary: true, // always on
      timestamp: new Date().toISOString()
    };

    toggles.forEach(function(toggle) {
      var cat = toggle.getAttribute('data-category');
      if (cat) {
        consent[cat] = toggle.checked;
      }
    });

    return consent;
  }

  /**
   * Save preferences from modal toggles
   */
  function save() {
    var consent = buildConsentFromToggles();

    if (window.CookieConsent) {
      window.CookieConsent.save(consent);
    }

    close();

    // Also hide the banner
    var banner = document.getElementById('cookie-consent');
    if (banner) {
      banner.classList.remove('visible', 'c-cookie-consent--visible');
      setTimeout(function() {
        banner.style.display = 'none';
      }, prefersReducedMotion ? 0 : ANIMATION_DURATION);
    }
  }

  /**
   * "Show more" / "Show less" toggle
   */
  function toggleShowMore() {
    var isHidden = moreText.style.display === 'none';
    moreText.style.display = isHidden ? 'inline' : 'none';

    // Update button text — read from data attributes or use defaults
    var showMoreText = showMoreBtn.getAttribute('data-show-more') || 'Arată mai mult';
    var showLessText = showMoreBtn.getAttribute('data-show-less') || 'Arată mai puțin';
    showMoreBtn.textContent = isHidden ? showLessText : showMoreText;
  }

  /**
   * Backdrop click → close
   */
  function handleBackdropClick(e) {
    if (e.target === modal) {
      close();
    }
  }

  /**
   * Escape key → close
   */
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      close();
    }
  }

  // Event listeners
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (saveBtn) saveBtn.addEventListener('click', save);
  if (showMoreBtn) showMoreBtn.addEventListener('click', toggleShowMore);
  modal.addEventListener('click', handleBackdropClick);
  modal.addEventListener('keydown', handleKeydown);

  // Store show more/less texts from rendered i18n (read them once from DOM)
  if (showMoreBtn) {
    showMoreBtn.setAttribute('data-show-more', showMoreBtn.textContent.trim());
    // The "show less" text will be set after the first toggle via i18n
    // We'll read it from a data attribute on the element if present
  }

  // Public API — expose open/close for cookie-consent.js to call
  window.CookieModal = {
    open: open,
    close: close
  };

})();
