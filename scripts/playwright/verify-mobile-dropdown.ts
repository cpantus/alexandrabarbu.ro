import { chromium } from 'playwright';

async function verifyMobileDropdown() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });

    // Open mobile menu
    const hamburger = await page.$('.c-mobile-menu__toggle');
    if (hamburger) {
      await hamburger.click({ force: true });
      await page.waitForTimeout(600);
    }

    // Trigger the dropdown via JS click (simulating real user interaction)
    const result = await page.evaluate(() => {
      const button = document.querySelector('.c-navigation__link--dropdown') as HTMLButtonElement;
      const parent = button?.closest('.c-navigation__item') as HTMLElement;
      const dropdown = parent?.querySelector('.c-navigation__dropdown') as HTMLElement;

      if (!button || !parent || !dropdown) {
        return { error: 'Elements not found' };
      }

      // Get computed styles BEFORE click
      const beforeStyles = window.getComputedStyle(dropdown);
      const beforeState = {
        visibility: beforeStyles.visibility,
        opacity: beforeStyles.opacity,
        maxHeight: beforeStyles.maxHeight,
        overflow: beforeStyles.overflow,
        parentClasses: parent.className
      };

      // Click to open
      button.click();

      return {
        before: beforeState,
        dropdown: { parent: parent.className, button: button.textContent },
        dropdownChildren: Array.from(dropdown.querySelectorAll('.c-navigation__dropdown-item')).map(
          item => (item as HTMLElement).textContent?.trim()
        )
      };
    });

    // Wait for CSS transition
    await page.waitForTimeout(500);

    // Get final state after transition
    const finalState = await page.evaluate(() => {
      const parent = document.querySelector('.c-navigation__item--open') as HTMLElement;
      const dropdown = parent?.querySelector('.c-navigation__dropdown') as HTMLElement;
      if (!dropdown) return { error: 'Dropdown not found after click' };

      const styles = window.getComputedStyle(dropdown);
      return {
        visibility: styles.visibility,
        opacity: styles.opacity,
        maxHeight: styles.maxHeight,
        overflow: styles.overflow,
        height: styles.height,
        parentClasses: parent.className
      };
    });

    const afterState = finalState;

    console.log('=== Mobile Dropdown Verification ===\n');
    console.log('BEFORE click:');
    console.log('  Visibility:', result.before?.visibility);
    console.log('  Opacity:', result.before?.opacity);
    console.log('  Max-height:', result.before?.maxHeight);
    console.log('  Overflow:', result.before?.overflow);
    console.log('  Parent classes:', result.before?.parentClasses);

    console.log('\nAFTER click (waited 500ms for transition):');
    console.log('  Visibility:', afterState?.visibility);
    console.log('  Opacity:', afterState?.opacity);
    console.log('  Max-height:', afterState?.maxHeight);
    console.log('  Overflow:', afterState?.overflow);
    console.log('  Height:', (afterState as any)?.height);
    console.log('  Parent classes:', afterState?.parentClasses);

    console.log('\nDropdown children:', result.dropdownChildren);

    // Verify the fix is working
    const isFixed = afterState?.visibility === 'visible' &&
                    afterState?.opacity === '1' &&
                    afterState?.parentClasses?.includes('--open');

    console.log('\n=== VERIFICATION RESULT ===');
    console.log('Mobile dropdown fix:', isFixed ? '✅ WORKING' : '❌ NOT WORKING');

    // Take screenshot
    await page.screenshot({ path: '/tmp/mobile-dropdown-verified.png', fullPage: true });
    console.log('\nScreenshot saved to /tmp/mobile-dropdown-verified.png');

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
}

verifyMobileDropdown();
