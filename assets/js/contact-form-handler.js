/**
 * Contact Form Handler
 *
 * Handles contact form submission with reCAPTCHA v3 protection, validation,
 * and success/error messaging. Designed for use with Google Apps Script backend.
 *
 * @version 1.0.0
 * @requires grecaptcha (reCAPTCHA v3 API)
 */

(function() {
  'use strict';

  /**
   * Configuration object
   * @const {Object}
   */
  const CONFIG = {
    /** reCAPTCHA v3 site key (public, safe to expose) */
    RECAPTCHA_SITE_KEY: '6Ld0dcwrAAAAAOWMqwdKUMalBY_J-d1WTswuoRG8',

    /** Success message auto-dismiss timeout (milliseconds) */
    SUCCESS_TIMEOUT: 10000,

    /** Minimum time before form can be submitted (milliseconds) */
    MIN_SUBMIT_TIME: 3000,

    /** Form element ID */
    FORM_ID: 'contact-form',

    /** Form status element ID */
    STATUS_ID: 'form-status'
  };

  /**
   * DOM elements cache
   * @type {Object}
   */
  let elements = {
    form: null,
    formStatus: null,
    submitButton: null,
    nameField: null,
    emailField: null,
    messageField: null
  };

  /**
   * Form state
   * @type {Object}
   */
  let state = {
    originalAction: '',
    originalButtonText: '',
    formLoadTime: 0
  };

  /**
   * Initialize the contact form handler
   * Sets up event listeners and caches DOM elements
   */
  function init() {
    // Cache DOM elements
    elements.form = document.getElementById(CONFIG.FORM_ID);
    elements.formStatus = document.getElementById(CONFIG.STATUS_ID);

    if (!elements.form || !elements.formStatus) {
      console.warn('Contact form or status element not found');
      return;
    }

    elements.submitButton = elements.form.querySelector('button[type="submit"]');
    if (!elements.submitButton) {
      console.warn('Submit button not found');
      return;
    }

    elements.nameField = elements.form.querySelector('[name="name"]');
    elements.emailField = elements.form.querySelector('[name="email"]');
    elements.messageField = elements.form.querySelector('[name="message"]');

    // Store original form action and button text
    state.originalAction = elements.form.action || elements.form.getAttribute('data-action');
    state.originalButtonText = elements.submitButton.textContent;

    // Record form load time for time-based validation
    state.formLoadTime = Date.now();

    // Remove form action attribute to prevent standard POST
    elements.form.removeAttribute('action');

    // Attach submit event listener
    elements.form.addEventListener('submit', handleSubmit);

    console.log('Contact form handler initialized');
  }

  /**
   * Validate form fields
   * Includes required field validation, honeypot check, and time-based validation
   * @returns {boolean} True if all validations pass
   */
  function validateForm() {
    // Required field validation
    const name = elements.nameField.value.trim();
    const email = elements.emailField.value.trim();
    const message = elements.messageField.value.trim();

    if (!name || !email || !message) {
      showMessage(
        'warning',
        '<strong>Completați toate câmpurile!</strong>'
      );
      return false;
    }

    // Honeypot validation (bot trap)
    const honeypot = elements.form.querySelector('[name="website"]');
    if (honeypot && honeypot.value !== '') {
      console.warn('Honeypot triggered - bot detected');
      // Silent rejection - don't show error to bot
      return false;
    }

    // Time-based validation (reject fast submissions)
    const timeDiff = Date.now() - state.formLoadTime;
    if (timeDiff < CONFIG.MIN_SUBMIT_TIME) {
      console.warn(`Form submitted too fast (${timeDiff}ms) - possible bot`);
      showMessage(
        'warning',
        '<strong>Vă rugăm să completați formularul cu atenție.</strong>'
      );
      return false;
    }

    return true;
  }

  /**
   * Generate reCAPTCHA v3 token
   * @async
   * @returns {Promise<string>} reCAPTCHA token or empty string if failed
   */
  async function generateRecaptchaToken() {
    if (typeof grecaptcha === 'undefined') {
      console.warn('reCAPTCHA not loaded - graceful degradation');
      return '';
    }

    try {
      const token = await grecaptcha.execute(CONFIG.RECAPTCHA_SITE_KEY, {
        action: 'submit'
      });
      console.log('reCAPTCHA token generated successfully');
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return ''; // Graceful degradation
    }
  }

  /**
   * Set form loading state
   * @param {boolean} isLoading - Whether form is in loading state
   */
  function setLoadingState(isLoading) {
    if (isLoading) {
      elements.submitButton.disabled = true;
      elements.submitButton.innerHTML = 'Se trimite...';
      elements.formStatus.innerHTML = '';
    } else {
      elements.submitButton.disabled = false;
      elements.submitButton.textContent = state.originalButtonText;
    }
  }

  /**
   * Submit form to Google Apps Script endpoint
   * @async
   * @param {FormData} formData - Form data to submit
   * @throws {Error} If network request fails
   */
  async function submitToBackend(formData) {
    await fetch(state.originalAction, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Apps Script
    });
  }

  /**
   * Show success message
   */
  function showSuccessMessage() {
    showMessage(
      'success',
      '<strong>Mesaj trimis cu succes!</strong><br>Vă voi contacta în maxim 24 ore.'
    );

    // Reset form
    elements.form.reset();

    // Auto-dismiss success message after timeout
    setTimeout(() => {
      elements.formStatus.innerHTML = '';
    }, CONFIG.SUCCESS_TIMEOUT);
  }

  /**
   * Show error message with fallback contact info
   */
  function showErrorMessage() {
    showMessage(
      'danger',
      '<strong>Eroare!</strong><br>Încercați din nou sau contactați direct: <a href="tel:+40722123456">+40 722.123.456</a>'
    );
  }

  /**
   * Display message in form status element
   * @param {string} type - Message type (success, warning, danger)
   * @param {string} html - Message HTML content
   */
  function showMessage(type, html) {
    elements.formStatus.innerHTML = `<div class="alert alert-${type}">${html}</div>`;
  }

  /**
   * Handle form submission
   * @async
   * @param {Event} event - Submit event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prevent double submission
    if (elements.submitButton.disabled) {
      return;
    }

    // Set loading state
    setLoadingState(true);

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await generateRecaptchaToken();

      // Prepare form data
      const formData = new FormData(elements.form);
      if (recaptchaToken) {
        formData.append('recaptcha_token', recaptchaToken);
      }

      // Submit to backend
      await submitToBackend(formData);

      // Show success (optimistic - cannot verify due to no-CORS)
      showSuccessMessage();

    } catch (error) {
      console.error('Form submission error:', error);
      showErrorMessage();

    } finally {
      // Reset loading state
      setLoadingState(false);
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', init);

})();
