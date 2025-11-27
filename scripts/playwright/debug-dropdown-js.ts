import { chromium } from 'playwright';

async function debugDropdownJS() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X mobile viewport
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });

    // Check if VanillaDropdown is loaded
    const hasVanillaDropdown = await page.evaluate(() => {
      return typeof (window as any).VanillaDropdown !== 'undefined';
    });
    console.log('VanillaDropdown class available:', hasVanillaDropdown);

    // Check how many dropdown triggers exist and have listeners
    const dropdownTriggers = await page.evaluate(() => {
      const triggers = document.querySelectorAll('[data-dropdown-toggle]');
      return triggers.length;
    });
    console.log('Dropdown triggers found:', dropdownTriggers);

    // Open mobile menu first
    console.log('\n=== Opening Mobile Menu ===');
    const hamburger = await page.$('.c-mobile-menu__toggle');
    if (hamburger) {
      await hamburger.click({ force: true });
      await page.waitForTimeout(600);
      console.log('Hamburger clicked');
    }

    // Now test if clicking a dropdown button manually via JS in the page works
    console.log('\n=== Testing click via page.evaluate (JS in browser) ===');
    const result = await page.evaluate(() => {
      const buttons = document.querySelectorAll('.c-navigation__link--dropdown');
      if (buttons.length === 0) return { error: 'No dropdown buttons found' };

      const button = buttons[0] as HTMLButtonElement;
      const parent = button.closest('.c-navigation__item') as HTMLElement;

      // Store before state
      const beforeClasses = parent?.className || 'no parent';

      // Simulate click by dispatching event
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      button.dispatchEvent(clickEvent);

      // Store after state
      const afterClasses = parent?.className || 'no parent';

      // Also try directly calling click()
      const directClickBefore = parent?.className || 'no parent';
      button.click();
      const directClickAfter = parent?.className || 'no parent';

      return {
        dispatchEvent: { before: beforeClasses, after: afterClasses },
        directClick: { before: directClickBefore, after: directClickAfter }
      };
    });
    console.log('Result:', JSON.stringify(result, null, 2));

    // Check final state
    const finalClasses = await page.evaluate(() => {
      const items = document.querySelectorAll('.c-navigation__item--dropdown');
      return Array.from(items).map(item => ({
        classes: item.className,
        buttonAria: item.querySelector('.c-navigation__link--dropdown')?.getAttribute('aria-expanded')
      }));
    });
    console.log('\nFinal dropdown items state:', JSON.stringify(finalClasses, null, 2));

    console.log('\n=== TEST COMPLETE ===');

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
}

debugDropdownJS();
