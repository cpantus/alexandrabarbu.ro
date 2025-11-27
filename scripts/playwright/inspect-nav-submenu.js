const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the site
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });

    // Wait for navigation to be visible
    await page.waitForSelector('nav', { timeout: 5000 });

    // Find and hover over the services navigation item
    const navItem = await page.locator('nav a:has-text("Servicii"), nav .c-navigation__item:has-text("Servicii")').first();

    if (await navItem.count() > 0) {
      await navItem.hover();
      await page.waitForTimeout(800); // Wait for submenu animation

      // Take screenshot of just the navigation area
      const navElement = await page.locator('nav').first();
      await navElement.screenshot({
        path: '/tmp/nav-issue-before.png'
      });

      console.log('Screenshot saved to /tmp/nav-issue-before.png');
    }

    // Get computed styles for submenu links when hovered
    const submenuLinks = await page.locator('.c-navigation__dropdown-link, .dropdown-menu a').all();

    console.log('\n=== SUBMENU LINK ANALYSIS ===\n');
    console.log(`Found ${submenuLinks.length} submenu links\n`);

    for (let i = 0; i < Math.min(submenuLinks.length, 3); i++) {
      const link = submenuLinks[i];
      const text = await link.textContent();

      console.log(`Link ${i + 1}: "${text?.trim()}"`);

      // Hover over the link to trigger any hover states
      await link.hover();
      await page.waitForTimeout(200);

      // Get computed styles
      const styles = await link.evaluate(el => {
        const computed = window.getComputedStyle(el);
        const pseudoBefore = window.getComputedStyle(el, '::before');
        const pseudoAfter = window.getComputedStyle(el, '::after');

        return {
          element: {
            textDecoration: computed.textDecoration,
            textDecorationColor: computed.textDecorationColor,
            borderBottom: computed.borderBottom,
            backgroundImage: computed.backgroundImage,
            background: computed.background,
            classes: el.className
          },
          before: {
            content: pseudoBefore.content,
            background: pseudoBefore.background,
            backgroundColor: pseudoBefore.backgroundColor,
            borderBottom: pseudoBefore.borderBottom,
            height: pseudoBefore.height,
            width: pseudoBefore.width,
            display: pseudoBefore.display,
            position: pseudoBefore.position
          },
          after: {
            content: pseudoAfter.content,
            background: pseudoAfter.background,
            backgroundColor: pseudoAfter.backgroundColor,
            borderBottom: pseudoAfter.borderBottom,
            height: pseudoAfter.height,
            width: pseudoAfter.width,
            display: pseudoAfter.display,
            position: pseudoAfter.position
          }
        };
      });

      console.log('Classes:', styles.element.classes);
      console.log('Text Decoration:', styles.element.textDecoration);
      console.log('Text Decoration Color:', styles.element.textDecorationColor);
      console.log('Border Bottom:', styles.element.borderBottom);
      console.log('Background:', styles.element.background);
      console.log('\n::before styles:');
      console.log('  content:', styles.before.content);
      console.log('  backgroundColor:', styles.before.backgroundColor);
      console.log('  borderBottom:', styles.before.borderBottom);
      console.log('  height:', styles.before.height);
      console.log('  width:', styles.before.width);
      console.log('  display:', styles.before.display);
      console.log('\n::after styles:');
      console.log('  content:', styles.after.content);
      console.log('  backgroundColor:', styles.after.backgroundColor);
      console.log('  borderBottom:', styles.after.borderBottom);
      console.log('  height:', styles.after.height);
      console.log('  width:', styles.after.width);
      console.log('  display:', styles.after.display);
      console.log('---\n');

      // Take a screenshot of the hovered link
      await link.screenshot({
        path: `/tmp/nav-link-${i + 1}-hovered.png`
      });
      console.log(`Screenshot saved to /tmp/nav-link-${i + 1}-hovered.png`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
