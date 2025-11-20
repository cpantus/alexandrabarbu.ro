/**
 * Language Selector Module
 * Version: 1.0.0
 *
 * Handles language switching for multilingual Hugo sites with localStorage persistence
 * and optional auto-redirect to preferred language on homepage.
 *
 * Features:
 * - localStorage persistence for user language preference
 * - Optional homepage auto-redirect to preferred language
 * - Custom event dispatching (languageChanged)
 * - Error handling and graceful degradation
 * - Supports multiple language selector instances (mobile + desktop)
 *
 * Usage:
 *   <select class="c-language-selector__select" data-auto-redirect="true">
 *     <option value="/en/about/" data-lang="en">🇬🇧 English</option>
 *   </select>
 *
 * Events:
 *   document.addEventListener('languageChanged', (e) => {
 *     console.log('Language changed to:', e.detail.lang);
 *   });
 *
 * Public API:
 *   window.languageSelector.switch(url)  - Manually switch language
 *   window.languageSelector.getPreferred() - Get stored preference
 *   window.languageSelector.setPreferred(lang) - Set preference
 */

(function() {
  'use strict';

  /**
   * Language Selector Module
   */
  const languageSelector = {
    /**
     * localStorage key for language preference
     */
    STORAGE_KEY: 'preferredLanguage',

    /**
     * Initialize language selector functionality
     */
    init() {
      this.attachEventListeners();
      this.handleAutoRedirect();
    },

    /**
     * Attach change event listeners to all language selector instances
     */
    attachEventListeners() {
      const selectors = document.querySelectorAll('.c-language-selector__select');

      selectors.forEach((selector) => {
        selector.addEventListener('change', (e) => {
          const selectedOption = e.target.options[e.target.selectedIndex];
          const url = selectedOption.value;
          const lang = selectedOption.dataset.lang;

          if (url && lang) {
            this.switch(url, lang);
          }
        });
      });
    },

    /**
     * Switch to a different language
     * @param {string} url - Target page URL
     * @param {string} lang - Language code (optional, extracted from URL if not provided)
     */
    switch(url, lang) {
      // Extract lang from data attribute if not provided
      if (!lang) {
        const option = document.querySelector(`option[value="${url}"]`);
        lang = option ? option.dataset.lang : null;
      }

      // Save language preference
      if (lang) {
        this.setPreferred(lang);
        this.dispatchLanguageChangedEvent(lang);
      }

      // Navigate to selected page
      window.location.href = url;
    },

    /**
     * Get preferred language from localStorage
     * @returns {string|null} Language code or null if not set
     */
    getPreferred() {
      try {
        return localStorage.getItem(this.STORAGE_KEY);
      } catch (e) {
        console.warn('Could not read language preference:', e);
        return null;
      }
    },

    /**
     * Set preferred language in localStorage
     * @param {string} lang - Language code to save
     */
    setPreferred(lang) {
      try {
        localStorage.setItem(this.STORAGE_KEY, lang);
        console.log('Language preference saved:', lang);
      } catch (e) {
        console.warn('Could not save language preference:', e);
      }
    },

    /**
     * Dispatch custom languageChanged event
     * @param {string} lang - Language code that was changed to
     */
    dispatchLanguageChangedEvent(lang) {
      const event = new CustomEvent('languageChanged', {
        detail: { lang: lang },
        bubbles: true,
        cancelable: false
      });
      document.dispatchEvent(event);
    },

    /**
     * Handle auto-redirect to preferred language on homepage
     * Only runs if selector has data-auto-redirect="true"
     */
    handleAutoRedirect() {
      // Only run on homepage
      const currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '') {
        return;
      }

      // Check if any selector has auto-redirect enabled
      const selectorWithAutoRedirect = document.querySelector(
        '.c-language-selector__select[data-auto-redirect="true"]'
      );

      if (!selectorWithAutoRedirect) {
        return;
      }

      try {
        const preferredLang = this.getPreferred();
        const currentLang = document.documentElement.lang;

        // Only redirect if preference exists and differs from current
        if (!preferredLang || preferredLang === currentLang) {
          return;
        }

        console.log('Redirecting to preferred language:', preferredLang);

        // Find the translation link for preferred language
        const preferredOption = document.querySelector(
          `.c-language-selector__option[data-lang="${preferredLang}"]`
        );

        if (preferredOption && preferredOption.value) {
          window.location.href = preferredOption.value;
        } else {
          console.warn(
            `Preferred language "${preferredLang}" not found in options`
          );
        }
      } catch (e) {
        console.warn('Language auto-redirect failed:', e);
      }
    }
  };

  /**
   * Initialize when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => languageSelector.init());
  } else {
    languageSelector.init();
  }

  /**
   * Expose public API
   */
  window.languageSelector = {
    switch: (url, lang) => languageSelector.switch(url, lang),
    getPreferred: () => languageSelector.getPreferred(),
    setPreferred: (lang) => languageSelector.setPreferred(lang)
  };
})();
