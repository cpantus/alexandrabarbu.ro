/**
 * Test: Verify button returns to original color after click (not stuck in hover state)
 */

import { chromium } from 'playwright';

async function testButtonFocusPersist() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  const ctaButton = page.locator('button:has-text("programare")').first();

  // Get original color
  const originalColor = await ctaButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
  console.log('ORIGINAL color:', originalColor);

  // Click and release
  await ctaButton.click();
  await page.waitForTimeout(100);

  // Move mouse away to remove hover, but button still has focus
  await page.mouse.move(0, 0);
  await page.waitForTimeout(100);

  // Get color after click (button should be focused but not hovered)
  const afterClickColor = await ctaButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
  const isFocused = await ctaButton.evaluate(el => document.activeElement === el);

  console.log('AFTER CLICK color:', afterClickColor);
  console.log('Button is focused:', isFocused);

  // Validation
  if (afterClickColor === originalColor) {
    console.log('\nPASS: Button returned to original color after click');
  } else {
    console.log('\nFAIL: Button stuck in altered state after click');
    console.log(`  Expected: ${originalColor}`);
    console.log(`  Got: ${afterClickColor}`);
    process.exit(1);
  }

  await browser.close();
}

testButtonFocusPersist().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
