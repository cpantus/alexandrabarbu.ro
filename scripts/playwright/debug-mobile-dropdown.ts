import { chromium } from 'playwright';

async function debugMobileDropdown() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X mobile viewport
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });

    // 1. First, open the mobile menu by clicking hamburger
    console.log('=== Opening Mobile Menu ===');
    const hamburger = await page.$('.c-mobile-menu__toggle');
    if (hamburger) {
      await hamburger.click({ force: true }); // Force click to avoid intercept issues
      await page.waitForTimeout(600);
      console.log('Hamburger clicked');
    }

    // 2. Check if mobile menu panel is visible
    const panel = await page.$('.c-mobile-menu__panel');
    const panelClasses = await panel?.getAttribute('class');
    console.log('Panel classes after hamburger click:', panelClasses);

    // 3. Find dropdown items (Servicii, Resurse)
    console.log('\n=== Dropdown Items ===');
    const dropdownItems = await page.$$('.c-navigation__item--dropdown');
    console.log('Dropdown items found:', dropdownItems.length);

    for (let i = 0; i < dropdownItems.length; i++) {
      const item = dropdownItems[i];
      const button = await item.$('.c-navigation__link--dropdown');
      const buttonText = await button?.textContent();
      const itemClasses = await item.getAttribute('class');

      console.log(`\nDropdown ${i + 1}: "${buttonText?.trim()}"`);
      console.log('  Item classes BEFORE click:', itemClasses);

      // Check dropdown visibility BEFORE click
      const dropdown = await item.$('.c-navigation__dropdown');
      if (dropdown) {
        const dropdownStyles = await dropdown.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            display: computed.display,
            visibility: computed.visibility,
            opacity: computed.opacity,
            height: computed.height,
            maxHeight: computed.maxHeight,
            overflow: computed.overflow
          };
        });
        console.log('  Dropdown styles BEFORE click:', JSON.stringify(dropdownStyles));
      }

      // Click the dropdown button - force click to bypass overlay issues
      if (button) {
        // Force click since header elements may overlap on mobile
        await button.click({ force: true });
        await page.waitForTimeout(400);

        const itemClassesAfter = await item.getAttribute('class');
        console.log('  Item classes AFTER click:', itemClassesAfter);

        // Check dropdown visibility AFTER click
        if (dropdown) {
          const dropdownStylesAfter = await dropdown.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              display: computed.display,
              visibility: computed.visibility,
              opacity: computed.opacity,
              height: computed.height,
              maxHeight: computed.maxHeight
            };
          });
          console.log('  Dropdown styles AFTER click:', JSON.stringify(dropdownStylesAfter));

          // Check for dropdown children
          const children = await dropdown.$$('.c-navigation__dropdown-item');
          console.log('  Dropdown children count:', children.length);

          for (const child of children) {
            const text = await child.textContent();
            console.log('    - Child:', text?.trim());
          }
        }
      }
    }

    // 4. Take a screenshot
    await page.screenshot({ path: '/tmp/mobile-dropdown-debug.png', fullPage: true });
    console.log('\nScreenshot saved to /tmp/mobile-dropdown-debug.png');
    console.log('\n=== TEST COMPLETE ===');

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
}

debugMobileDropdown();
