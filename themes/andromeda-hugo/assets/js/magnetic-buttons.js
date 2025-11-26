/**
 * DESIGN EXCELLENCE: Magnetic Button Effect
 *
 * Principle: "Magnetic Elements - Buttons pull toward cursor subtly"
 * Creates engaging microinteraction on hero CTAs
 *
 * Features:
 * - Subtle cursor-following effect on hover
 * - Smooth easing with GPU-accelerated transforms
 * - Respects prefers-reduced-motion
 * - Touch-device aware (disabled on touch)
 *
 * Usage: Add [data-magnetic] attribute to buttons
 *
 * @version 1.0.0
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    strength: 0.3,        // How strongly button follows cursor (0-1)
    maxMove: 8,           // Maximum pixels to move
    easing: 0.15,         // Smoothing factor (lower = smoother)
    // Fixed selector: classes are on SAME element, not parent-child
    selector: '[data-magnetic], .c-hero-breadcrumb__cta-button.c-button--primary, .c-button--primary.c-hero-breadcrumb__cta-button'
  };

  // Skip if reduced motion preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Skip on touch devices (no hover semantics)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  // State tracking
  const buttons = new Map();

  /**
   * Initialize magnetic effect on a button
   */
  function initButton(button) {
    if (buttons.has(button)) return;

    const state = {
      rect: null,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      rafId: null,
      isHovering: false
    };

    buttons.set(button, state);

    // Event listeners
    button.addEventListener('mouseenter', () => handleEnter(button, state));
    button.addEventListener('mousemove', (e) => handleMove(button, state, e));
    button.addEventListener('mouseleave', () => handleLeave(button, state));
  }

  /**
   * Handle mouse enter
   */
  function handleEnter(button, state) {
    state.isHovering = true;
    state.rect = button.getBoundingClientRect();
    startAnimation(button, state);
  }

  /**
   * Handle mouse move - calculate target position
   */
  function handleMove(button, state, e) {
    if (!state.rect) return;

    // Calculate cursor position relative to button center
    const centerX = state.rect.left + state.rect.width / 2;
    const centerY = state.rect.top + state.rect.height / 2;

    // Calculate offset from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Apply strength and clamp to max move
    state.targetX = Math.max(-CONFIG.maxMove, Math.min(CONFIG.maxMove, deltaX * CONFIG.strength));
    state.targetY = Math.max(-CONFIG.maxMove, Math.min(CONFIG.maxMove, deltaY * CONFIG.strength));
  }

  /**
   * Handle mouse leave - return to origin
   */
  function handleLeave(button, state) {
    state.isHovering = false;
    state.targetX = 0;
    state.targetY = 0;
    // Animation continues until back to origin
  }

  /**
   * Animation loop - smooth interpolation
   */
  function startAnimation(button, state) {
    function animate() {
      // Interpolate toward target
      state.currentX += (state.targetX - state.currentX) * CONFIG.easing;
      state.currentY += (state.targetY - state.currentY) * CONFIG.easing;

      // Apply transform (GPU-accelerated)
      button.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;

      // Continue if still moving or hovering
      const isMoving = Math.abs(state.currentX - state.targetX) > 0.1 ||
                       Math.abs(state.currentY - state.targetY) > 0.1;

      if (isMoving || state.isHovering) {
        state.rafId = requestAnimationFrame(animate);
      } else {
        // Reset to origin when animation complete
        button.style.transform = '';
        state.currentX = 0;
        state.currentY = 0;
      }
    }

    // Cancel any existing animation
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
    }

    animate();
  }

  /**
   * Initialize all magnetic buttons
   */
  function init() {
    const buttons = document.querySelectorAll(CONFIG.selector);
    buttons.forEach(initButton);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on dynamic content (for SPA-like behavior)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (node.matches && node.matches(CONFIG.selector)) {
            initButton(node);
          }
          const nested = node.querySelectorAll && node.querySelectorAll(CONFIG.selector);
          if (nested) {
            nested.forEach(initButton);
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
