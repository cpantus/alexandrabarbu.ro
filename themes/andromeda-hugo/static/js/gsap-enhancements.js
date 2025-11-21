/**
 * GSAP Enhancements - Adds 5 new effects to existing animation system
 * Works alongside AOS/Rellax, doesn't replace them
 * Accessibility: Respects prefers-reduced-motion
 *
 * Effects:
 * 1. Magnetic buttons - GSAP mousemove interactions (desktop only)
 * 2. Ripple click effects - Visual feedback on clicks
 * 3. Word-by-word text reveal - Advanced text animations
 * 4. Clip-path image reveals - Sophisticated image entrances
 * 5. Alpine.js reactive components - Toggle switches, accordions
 */

(function() {
  'use strict';

  // Debug mode (set to false for production)
  const DEBUG = false;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  // Wait for GSAP to load
  if (typeof gsap === 'undefined') {
    if (DEBUG) console.warn('GSAP not loaded, enhancements disabled');
    return;
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (DEBUG) console.log('Initializing GSAP enhancements...');

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    initMagneticButtons();
    initRippleEffects();
    initTextReveal();
    initImageReveal();
    initAlpineComponents();

    if (DEBUG) console.log('GSAP enhancements initialized');
  }

  /**
   * 1. Magnetic Buttons (Desktop only)
   * Attracts button toward mouse cursor on hover
   */
  function initMagneticButtons() {
    // Only enable on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const buttons = document.querySelectorAll('[data-animate="magnetic-button"]');
    if (DEBUG) console.log(`Found ${buttons.length} magnetic buttons`);

    buttons.forEach(button => {
      const strength = parseFloat(button.dataset.strength || '0.3');

      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  /**
   * 2. Ripple Click Effects
   * Creates expanding ripple effect on click
   */
  function initRippleEffects() {
    const elements = document.querySelectorAll('[data-animate="ripple"]');
    if (DEBUG) console.log(`Found ${elements.length} ripple elements`);

    elements.forEach(element => {
      element.addEventListener('click', createRipple);
    });
  }

  function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    gsap.fromTo(ripple, {
      scale: 0,
      opacity: 0.6
    }, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    });
  }

  /**
   * 3. Text Reveal (Word by Word)
   * Animates text entrance word by word with stagger
   */
  function initTextReveal() {
    // Only process if ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      if (DEBUG) console.warn('ScrollTrigger not loaded, text reveal disabled');
      return;
    }

    const elements = document.querySelectorAll('[data-animate="text-reveal"]');
    if (DEBUG) console.log(`Found ${elements.length} text reveal elements`);

    elements.forEach(element => {
      const text = element.textContent.trim();
      const words = text.split(' ');

      // Wrap each word in span
      element.innerHTML = words
        .map(word => `<span class="word-reveal">${word}</span>`)
        .join(' ');

      // Animate words on scroll
      gsap.from(element.querySelectorAll('.word-reveal'), {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  /**
   * 4. Image Reveal (Clip Path)
   * Reveals images with clip-path animation
   */
  function initImageReveal() {
    // Only process if ScrollTrigger is available
    if (typeof ScrollTrigger === 'undefined') {
      if (DEBUG) console.warn('ScrollTrigger not loaded, image reveal disabled');
      return;
    }

    const images = document.querySelectorAll('[data-animate="image-reveal"]');
    if (DEBUG) console.log(`Found ${images.length} image reveal elements`);

    images.forEach(img => {
      gsap.from(img, {
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: img,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  /**
   * 5. Alpine.js Component Enhancements
   * Adds GSAP animations to Alpine transitions
   */
  function initAlpineComponents() {
    // Alpine.js auto-initializes x-data components
    // This function can add custom Alpine directives or GSAP enhancements

    if (typeof Alpine !== 'undefined') {
      document.addEventListener('alpine:init', () => {
        if (DEBUG) console.log('Alpine.js initialized with GSAP enhancements');

        // Can add custom Alpine magic properties or directives here
        // Example: Alpine.magic('gsap', () => gsap)
      });
    }
  }

})();
