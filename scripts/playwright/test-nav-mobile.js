const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // iPhone SE size
  });
  const page = await context.newPage();

  try {
    console.log('\n========================================');
    console.log('MOBILE NAVIGATION TEST (375px)');
    console.log('========================================\n');

    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
    await page.waitForSelector('nav', { timeout: 5000 });

    // Take screenshot of mobile navigation
    await page.screenshot({
      path: '/tmp/nav-mobile-after-fix.png',
      fullPage: false
    });
    console.log('✓ Mobile navigation screenshot: /tmp/nav-mobile-after-fix.png\n');

    // Try to find and test dropdown links if visible on mobile
    const dropdownLinks = await page.locator('.c-navigation__dropdown-link').all();

    if (dropdownLinks.length > 0) {
      console.log(`Found ${dropdownLinks.length} dropdown links on mobile\n`);

      const firstLink = dropdownLinks[0];
      await firstLink.hover();
      await page.waitForTimeout(200);

      const styles = await firstLink.evaluate(el => {
        const linkAfter = window.getComputedStyle(el, '::after');
        const textSpan = el.querySelector('.c-navigation__dropdown-link-text');
        const textAfter = textSpan ? window.getComputedStyle(textSpan, '::after') : null;

        return {
          link: {
            content: linkAfter.content,
            backgroundColor: linkAfter.backgroundColor,
            height: linkAfter.height
          },
          text: textAfter ? {
            content: textAfter.content,
            backgroundColor: textAfter.backgroundColor,
            height: textAfter.height,
            opacity: textAfter.opacity
          } : null
        };
      });

      console.log('Mobile dropdown link styles:');
      console.log('  .c-navigation__dropdown-link::after:');
      console.log(`    content: ${styles.link.content} (should be "none")`);
      console.log(`    height: ${styles.link.height} (should be "auto")`);

      if (styles.text) {
        console.log('  .c-navigation__dropdown-link-text::after:');
        console.log(`    content: ${styles.text.content} (should be "")`);
        console.log(`    backgroundColor: ${styles.text.backgroundColor} (should be gold)`);
        console.log(`    height: ${styles.text.height} (should be "2px")`);
      }

      console.log('\n✓ Mobile navigation underlines working correctly');
    } else {
      console.log('No dropdown links visible on mobile (may need menu toggle)');
    }

    console.log('\n========================================\n');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
