/**
 * Debug: Capture what happens visually when clicking the header CTA button
 */

import { chromium } from 'playwright';

async function debugButtonClick() {
  const browser = await chromium.launch({ headless: false }); // Show browser
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  // Find the header CTA button
  const ctaButton = page.locator('button:has-text("programare")').first();

  // Get ALL computed styles and pseudo-element info
  const debug = await ctaButton.evaluate(el => {
    const s = window.getComputedStyle(el);
    const before = window.getComputedStyle(el, '::before');
    const after = window.getComputedStyle(el, '::after');

    return {
      element: {
        tagName: el.tagName,
        className: el.className,
        id: el.id
      },
      mainStyles: {
        background: s.background,
        backgroundColor: s.backgroundColor,
        boxShadow: s.boxShadow,
        outline: s.outline,
        border: s.border
      },
      beforePseudo: {
        content: before.content,
        background: before.background,
        backgroundColor: before.backgroundColor,
        position: before.position,
        inset: before.inset,
        opacity: before.opacity
      },
      afterPseudo: {
        content: after.content,
        background: after.background,
        backgroundColor: after.backgroundColor,
        position: after.position,
        inset: after.inset,
        opacity: after.opacity
      }
    };
  });

  console.log('BEFORE CLICK:', JSON.stringify(debug, null, 2));

  // Take screenshot before
  await page.screenshot({ path: '/tmp/button-before.png' });
  console.log('Screenshot saved: /tmp/button-before.png');

  // Click and hold
  await ctaButton.hover();
  await page.mouse.down();
  await page.waitForTimeout(500);

  // Get styles during click
  const debugDuring = await ctaButton.evaluate(el => {
    const s = window.getComputedStyle(el);
    const before = window.getComputedStyle(el, '::before');
    const after = window.getComputedStyle(el, '::after');

    return {
      mainStyles: {
        background: s.background,
        backgroundColor: s.backgroundColor,
        boxShadow: s.boxShadow,
        outline: s.outline,
        border: s.border
      },
      beforePseudo: {
        content: before.content,
        background: before.background,
        opacity: before.opacity
      },
      afterPseudo: {
        content: after.content,
        background: after.background,
        opacity: after.opacity
      }
    };
  });

  console.log('\nDURING CLICK:', JSON.stringify(debugDuring, null, 2));

  // Take screenshot during click
  await page.screenshot({ path: '/tmp/button-during.png' });
  console.log('Screenshot saved: /tmp/button-during.png');

  await page.mouse.up();

  await page.waitForTimeout(2000);
  await browser.close();
}

debugButtonClick().catch(console.error);
