/**
 * Visual comparison - hero section before/after fix
 * Captures labeled screenshot showing all hero elements
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'screenshots', 'hero-debug');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('📍 Navigating to /despre-mine/...');
  await page.goto('http://localhost:1313/despre-mine/', {
    waitUntil: 'networkidle',
    timeout: 10000
  });

  // Add visual labels to the page
  await page.evaluate(() => {
    // Add custom styles for labels
    const style = document.createElement('style');
    style.textContent = `
      .debug-label {
        position: absolute;
        right: -200px;
        background: #DC2626;
        color: white;
        padding: 4px 12px;
        font-size: 12px;
        font-family: monospace;
        font-weight: bold;
        border-radius: 4px;
        white-space: nowrap;
        z-index: 9999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      .debug-label::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: 8px solid #DC2626;
      }
      .debug-highlight {
        outline: 2px solid #DC2626;
        outline-offset: 4px;
        position: relative;
      }
    `;
    document.head.appendChild(style);

    // Function to add label
    function addLabel(selector, text) {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.add('debug-highlight');
        const label = document.createElement('div');
        label.className = 'debug-label';
        label.textContent = text;
        el.style.position = 'relative';
        el.appendChild(label);
      }
    }

    // Add labels to each element
    addLabel('.c-hero-breadcrumb__title', '1. TITLE (60px)');
    addLabel('.c-hero-breadcrumb__subtitle', '2. SUBTITLE (18px, weight 500)');
    addLabel('.c-hero-breadcrumb__description', '3. DESCRIPTION (16px, weight 400) ✅ FIXED');
    addLabel('.c-hero-breadcrumb__compass-wrapper', '4. COMPASS ANIMATION');
  });

  console.log('📸 Taking labeled screenshot...');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-visual-comparison-labeled.png'),
    fullPage: false
  });

  // Remove labels and take clean screenshot
  await page.evaluate(() => {
    document.querySelectorAll('.debug-label').forEach(el => el.remove());
    document.querySelectorAll('.debug-highlight').forEach(el => {
      el.classList.remove('debug-highlight');
    });
  });

  console.log('📸 Taking clean screenshot...');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-after-fix-clean.png'),
    fullPage: false
  });

  console.log('✅ Visual comparison complete!');
  console.log(`📂 Files saved to: ${OUTPUT_DIR}`);
  console.log('   - 08-visual-comparison-labeled.png (with labels)');
  console.log('   - 09-after-fix-clean.png (clean)');

  await browser.close();
})();
