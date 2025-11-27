/**
 * Test: Verify pill buttons maintain their background during :active state
 *
 * Bug: Buttons were losing their background (becoming transparent ovals)
 * when clicked due to overly aggressive :active rules in _accessibility.scss
 */

import { chromium } from 'playwright';

async function testButtonActiveState() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to articles page...');
  await page.goto('http://localhost:1313/resurse/articole/');
  await page.waitForLoadState('networkidle');

  // Find the category filter tabs (pill buttons)
  const tabs = page.locator('button[role="tab"]');
  const tabCount = await tabs.count();
  console.log(`Found ${tabCount} tab buttons`);

  // Test the "Depresie" tab
  const depresieTab = page.locator('button[role="tab"]:has-text("Depresie")').first();

  // Get styles BEFORE click
  const beforeStyles = await depresieTab.evaluate(el => {
    const s = window.getComputedStyle(el);
    return {
      backgroundColor: s.backgroundColor,
      background: s.background.substring(0, 100),
      border: s.border,
      opacity: s.opacity
    };
  });
  console.log('\nBEFORE click styles:', JSON.stringify(beforeStyles, null, 2));

  // Simulate mousedown to trigger :active state
  await depresieTab.dispatchEvent('mousedown');

  // Capture styles DURING active state (while mouse is down)
  const activeStyles = await depresieTab.evaluate(el => {
    const s = window.getComputedStyle(el);
    return {
      backgroundColor: s.backgroundColor,
      background: s.background.substring(0, 100),
      border: s.border,
      opacity: s.opacity
    };
  });
  console.log('\nDURING :active styles:', JSON.stringify(activeStyles, null, 2));

  await depresieTab.dispatchEvent('mouseup');

  // VALIDATION: Background should NOT be transparent during active state
  const bgBefore = beforeStyles.backgroundColor;
  const bgActive = activeStyles.backgroundColor;

  const isTransparent = (color: string) => {
    return color === 'transparent' ||
           color === 'rgba(0, 0, 0, 0)' ||
           color.includes('rgba') && color.endsWith(', 0)');
  };

  console.log('\n--- VALIDATION ---');

  if (isTransparent(bgActive) && !isTransparent(bgBefore)) {
    console.log('FAIL: Background became transparent during :active state!');
    console.log('This is the bug - buttons disappear when clicked.');
    process.exit(1);
  } else if (isTransparent(bgBefore) && isTransparent(bgActive)) {
    console.log('INFO: Button has transparent background (outline style) - this is OK');
    console.log('PASS: Background remained consistent during :active');
  } else {
    console.log('PASS: Background color maintained during :active state');
    console.log(`  Before: ${bgBefore}`);
    console.log(`  During: ${bgActive}`);
  }

  // Test primary CTA button too
  console.log('\n--- Testing Primary CTA Button ---');
  const ctaButton = page.locator('button:has-text("Programează")').first();

  if (await ctaButton.count() > 0) {
    const ctaBefore = await ctaButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
    await ctaButton.dispatchEvent('mousedown');
    const ctaActive = await ctaButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
    await ctaButton.dispatchEvent('mouseup');

    console.log(`CTA Before: ${ctaBefore}`);
    console.log(`CTA Active: ${ctaActive}`);

    if (isTransparent(ctaActive) && !isTransparent(ctaBefore)) {
      console.log('FAIL: CTA button background disappeared during click!');
      process.exit(1);
    } else {
      console.log('PASS: CTA button background maintained');
    }
  }

  await browser.close();
  console.log('\nAll tests passed!');
}

testButtonActiveState().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
