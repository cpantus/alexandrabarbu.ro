/**
 * Scroll Animations - Unified parallax and scroll-triggered effects
 * Lightweight, performance-optimized with requestAnimationFrame
 *
 * DESIGN EXCELLENCE 3.4: Scroll-Linked Parallax
 * - Decorative elements move at different rates for depth
 * - GPU-accelerated (transform only) for 60fps performance
 * - Respects prefers-reduced-motion
 * - Desktop only (≥992px)
 */

(function() {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Configuration
  const config = {
    parallaxSpeed: 0.3, // 30% of scroll speed for main content
    parallaxEnabled: !prefersReducedMotion && window.innerWidth >= 992, // Desktop only
    throttleDelay: 16, // ~60fps

    // DESIGN EXCELLENCE 3.4: Multi-layer parallax speeds
    // Different elements move at different rates for depth perception
    parallaxLayers: {
      slow: 0.1,    // Background blobs, far elements
      medium: 0.2,  // Decorative shapes, mid-ground
      fast: 0.35    // Hero compass, foreground elements
    }
  };

  let ticking = false;
  let lastScrollY = window.scrollY;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (prefersReducedMotion) {
      // Disable all animations for accessibility
      disableAnimations();
      return;
    }

    initParallax();
    initLayeredParallax(); // DESIGN EXCELLENCE 3.4
    initScrollTriggers();
    initSmoothScroll();

    // Listen to scroll events
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }

  /**
   * Parallax effect for feature images
   */
  function initParallax() {
    if (!config.parallaxEnabled) return;

    const parallaxElements = document.querySelectorAll('.parallax-enabled');

    if (!parallaxElements.length) return;

    function updateParallax() {
      parallaxElements.forEach(function(element) {
        const rect = element.getBoundingClientRect();
        const scrolled = window.scrollY;

        // Only apply parallax when element is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (scrolled - element.offsetTop) * config.parallaxSpeed;
          element.style.transform = `translateY(${yPos}px)`;
        }
      });

      ticking = false;
    }

    // Initial parallax state
    updateParallax();

    // Store update function for scroll handler
    window._updateParallax = updateParallax;
  }

  /**
   * DESIGN EXCELLENCE 3.4: Layered Parallax for Decorative Elements
   * Different elements move at different speeds based on data-parallax-layer attribute
   * Layers: slow (0.1), medium (0.2), fast (0.35)
   *
   * Usage in HTML:
   *   <div class="c-hero-breadcrumb__compass-wrapper" data-parallax-layer="fast">
   *   <div class="c-hero-breadcrumb__shape" data-parallax-layer="slow">
   */
  function initLayeredParallax() {
    if (!config.parallaxEnabled) return;

    const layeredElements = document.querySelectorAll('[data-parallax-layer]');

    if (!layeredElements.length) return;

    function updateLayeredParallax() {
      layeredElements.forEach(function(element) {
        const rect = element.getBoundingClientRect();
        const layer = element.getAttribute('data-parallax-layer');
        const speed = config.parallaxLayers[layer] || config.parallaxLayers.medium;

        // Only apply parallax when element is in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Calculate offset from center of viewport for smoother effect
          const viewportCenter = window.innerHeight / 2;
          const elementCenter = rect.top + rect.height / 2;
          const offset = (elementCenter - viewportCenter) * speed;

          // GPU-accelerated transform only
          element.style.transform = `translateY(${offset}px)`;
        }
      });
    }

    // Initial state
    updateLayeredParallax();

    // Store update function for scroll handler
    window._updateLayeredParallax = updateLayeredParallax;
  }

  /**
   * Scroll-triggered animations (fade-in, slide-up)
   */
  function initScrollTriggers() {
    const triggers = document.querySelectorAll('[data-scroll-trigger]');

    if (!triggers.length && !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    triggers.forEach(function(trigger) {
      observer.observe(trigger);
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();

          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, '#' + targetId);
          }
        }
      });
    });
  }

  /**
   * Scroll event handler (throttled)
   */
  function onScroll() {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        if (window._updateParallax) {
          window._updateParallax();
        }
        // DESIGN EXCELLENCE 3.4: Update layered parallax
        if (window._updateLayeredParallax) {
          window._updateLayeredParallax();
        }
        ticking = false;
      });

      ticking = true;
    }
  }

  /**
   * Resize handler
   */
  function onResize() {
    // Update parallax enablement on resize
    config.parallaxEnabled = !prefersReducedMotion && window.innerWidth >= 992;

    // Reset parallax transforms on mobile
    if (!config.parallaxEnabled) {
      const parallaxElements = document.querySelectorAll('.parallax-enabled');
      parallaxElements.forEach(function(element) {
        element.style.transform = '';
      });

      // DESIGN EXCELLENCE 3.4: Also reset layered parallax on mobile
      const layeredElements = document.querySelectorAll('[data-parallax-layer]');
      layeredElements.forEach(function(element) {
        element.style.transform = '';
      });
    }
  }

  /**
   * Disable all animations (accessibility)
   */
  function disableAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

})();
