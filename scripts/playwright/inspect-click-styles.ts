/**
 * Inspect Click Styles - Non-navigating version
 *
 * This script inspects computed styles WITHOUT triggering actual navigation.
 * Uses preventDefault to capture styles during click without navigation side effects.
 */

import { chromium, Browser, Page } from '@playwright/test';

async function main() {
  console.log('🔍 Inspecting Click Styles (Non-Navigating Version)\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  console.log('📍 Navigating to http://localhost:1313/\n');
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Inject script to prevent navigation and capture styles
  await page.evaluate(() => {
    // Prevent all navigation
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
      }, { capture: true });
    });

    // Add visual indicator that we're in inspection mode
    const indicator = document.createElement('div');
    indicator.style.cssText = `
      position: fixed; top: 10px; right: 10px; z-index: 99999;
      background: rgba(255, 0, 0, 0.8); color: white;
      padding: 10px; border-radius: 5px; font-family: monospace;
    `;
    indicator.textContent = '🔍 INSPECTION MODE - Navigation Disabled';
    document.body.appendChild(indicator);
  });

  console.log('🔍 Navigation disabled, ready for inspection\n');

  // Add mousedown event listeners to capture styles
  console.log('📝 Adding event listeners to capture styles...\n');

  await page.evaluate(() => {
    const elementsToInspect = [
      '.c-header__brand',
      '.c-navigation__link'
    ];

    elementsToInspect.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        element.addEventListener('mousedown', () => {
          const computed = window.getComputedStyle(element as HTMLElement);

          console.group(`🎯 ${selector} [${index}] - MOUSEDOWN`);
          console.log('tap-highlight:', computed.getPropertyValue('-webkit-tap-highlight-color'));
          console.log('background:', computed.backgroundColor);
          console.log('outline:', computed.outline);
          console.log('box-shadow:', computed.boxShadow);
          console.log('border:', computed.border);
          console.log('border-bottom:', computed.borderBottom);
          console.log('text-decoration:', computed.textDecoration);
          console.log('transform:', computed.transform);

          // Check for any green-ish colors
          const bg = computed.backgroundColor;
          const hasShadow = computed.boxShadow && computed.boxShadow !== 'none';
          const hasOutline = computed.outline && computed.outline !== 'none' && !computed.outline.includes('0px');

          if (bg && !bg.includes('rgba(0, 0, 0, 0)') && !bg.includes('transparent')) {
            console.warn('⚠️  Background color present:', bg);
          }
          if (hasShadow) {
            console.warn('⚠️  Box shadow present:', computed.boxShadow);
          }
          if (hasOutline) {
            console.warn('⚠️  Outline present:', computed.outline);
          }
          console.groupEnd();
        });

        element.addEventListener('mouseup', () => {
          console.log(`✓ ${selector} [${index}] - MOUSEUP (click complete)\n`);
        });
      });
    });
  });

  console.log('✅ Event listeners added\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('📖 INSTRUCTIONS:\n');
  console.log('1. Click on navigation links and logo in the browser window');
  console.log('2. Watch the console output for computed styles');
  console.log('3. Look for warnings about suspicious properties');
  console.log('4. Press Ctrl+C here when done\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Keep browser open for manual testing
  console.log('⏳ Waiting for manual inspection (browser will stay open)...\n');

  // Wait indefinitely for manual inspection
  await page.waitForTimeout(300000); // 5 minutes

  await browser.close();
}

main().catch(console.error);
