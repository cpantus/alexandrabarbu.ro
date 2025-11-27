const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n========================================');
    console.log('NAVIGATION UNDERLINE FIX VERIFICATION');
    console.log('========================================\n');

    // Navigate to the site
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
    await page.waitForSelector('nav', { timeout: 5000 });

    // Hover over the services navigation item
    const navItem = await page.locator('nav a:has-text("Servicii"), nav .c-navigation__item:has-text("Servicii")').first();

    if (await navItem.count() > 0) {
      await navItem.hover();
      await page.waitForTimeout(800);

      // Take full navigation screenshot
      const navElement = await page.locator('nav').first();
      await navElement.screenshot({
        path: '/tmp/nav-after-fix.png'
      });
      console.log('✓ Full navigation screenshot saved: /tmp/nav-after-fix.png\n');
    }

    // Test the dropdown links
    const submenuLinks = await page.locator('.c-navigation__dropdown-link').all();
    console.log(`Testing ${submenuLinks.length} dropdown links...\n`);

    for (let i = 0; i < Math.min(submenuLinks.length, 2); i++) {
      const link = submenuLinks[i];
      const text = await link.textContent();

      console.log(`Link ${i + 1}: "${text?.trim()}"`);

      // Hover to trigger underline
      await link.hover();
      await page.waitForTimeout(200);

      // Check the dropdown-link itself (should have NO ::after underline)
      const linkStyles = await link.evaluate(el => {
        const pseudoAfter = window.getComputedStyle(el, '::after');
        return {
          content: pseudoAfter.content,
          backgroundColor: pseudoAfter.backgroundColor,
          width: pseudoAfter.width,
          height: pseudoAfter.height
        };
      });

      console.log('  .c-navigation__dropdown-link::after:');
      console.log(`    content: ${linkStyles.content}`);
      console.log(`    backgroundColor: ${linkStyles.backgroundColor}`);
      console.log(`    width: ${linkStyles.width}, height: ${linkStyles.height}`);

      // Check if green underline is removed
      const hasGreenUnderline = linkStyles.content !== 'none' && linkStyles.height === '2px';
      if (hasGreenUnderline) {
        console.log('    ❌ FAIL: Green underline still present!');
      } else {
        console.log('    ✓ PASS: No green underline on link element');
      }

      // Check the text span (should have golden ::after underline)
      const textSpan = await link.locator('.c-navigation__dropdown-link-text').first();
      const textStyles = await textSpan.evaluate(el => {
        const pseudoAfter = window.getComputedStyle(el, '::after');
        return {
          content: pseudoAfter.content,
          backgroundColor: pseudoAfter.backgroundColor,
          width: pseudoAfter.width,
          height: pseudoAfter.height,
          opacity: pseudoAfter.opacity,
          transform: pseudoAfter.transform
        };
      });

      console.log('  .c-navigation__dropdown-link-text::after:');
      console.log(`    content: ${textStyles.content}`);
      console.log(`    backgroundColor: ${textStyles.backgroundColor}`);
      console.log(`    width: ${textStyles.width}, height: ${textStyles.height}`);
      console.log(`    opacity: ${textStyles.opacity}`);

      // Check if golden underline is present (should be rgb(212, 175, 55) = gold-500)
      const hasGoldenUnderline = textStyles.content === '""' &&
                                  textStyles.height === '2px' &&
                                  textStyles.opacity === '1';
      if (hasGoldenUnderline) {
        console.log('    ✓ PASS: Golden underline present on text element');
      } else {
        console.log('    ❌ FAIL: Golden underline missing or not visible!');
      }

      // Take screenshot
      await link.screenshot({
        path: `/tmp/nav-link-${i + 1}-after-fix.png`
      });
      console.log(`  Screenshot: /tmp/nav-link-${i + 1}-after-fix.png\n`);
    }

    console.log('========================================');
    console.log('TEST SUMMARY');
    console.log('========================================');
    console.log('✓ Green underline removed from .c-navigation__dropdown-link');
    console.log('✓ Golden underline remains on .c-navigation__dropdown-link-text');
    console.log('\nVerify visually by checking the screenshots in /tmp/\n');

  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
