import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function testTapHighlightFix() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = '/home/cere/Work/alex/alexandrabarbu.ro/screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('\n=== TAP HIGHLIGHT FIX VERIFICATION ===\n');

  try {
    // Navigate to the site
    console.log('Navigating to site...');
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle', timeout: 10000 });
    console.log('✓ Navigated to homepage');

    // Take initial screenshot
    await page.screenshot({ path: path.join(screenshotsDir, 'after-01-initial.png'), fullPage: false });
    console.log('✓ Captured initial state');

    // Test logo
    console.log('\n--- LOGO TEST (AFTER FIX) ---');
    const logoSelectors = ['a.navbar-brand', '.logo a', 'nav a[href="/"]', 'header a[href="/"]'];
    let logo = null;
    for (const selector of logoSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        logo = page.locator(selector).first();
        console.log(`✓ Found logo with selector: ${selector}`);
        break;
      }
    }

    if (logo) {
      const logoStyles = await logo.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          backgroundColor: computed.backgroundColor,
        };
      });
      console.log('Logo styles (after fix):', JSON.stringify(logoStyles, null, 2));

      // Click and capture
      await logo.hover();
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.screenshot({ path: path.join(screenshotsDir, 'after-02-logo-clicked.png') });
      console.log('✓ Captured logo during click');
      await page.mouse.up();

      // Check if tap-highlight is transparent
      const tapHighlight = logoStyles.webkitTapHighlightColor;
      if (tapHighlight === 'rgba(0, 0, 0, 0)' || tapHighlight === 'transparent') {
        console.log('✅ SUCCESS: Logo tap-highlight is transparent');
      } else {
        console.log(`❌ FAIL: Logo tap-highlight is still visible: ${tapHighlight}`);
      }
    }

    // Test navigation items
    console.log('\n--- NAVIGATION ITEMS TEST (AFTER FIX) ---');
    const navSelectors = [
      'nav a.nav-link',
      '.navbar-nav a',
      'nav ul li a',
      'header nav a',
      '.navigation a',
      '.c-navigation__link'
    ];
    let navItems = null;
    for (const selector of navSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        navItems = page.locator(selector);
        console.log(`✓ Found ${count} nav items with selector: ${selector}`);
        break;
      }
    }

    if (navItems && await navItems.count() > 0) {
      const firstNavItem = navItems.first();
      const navText = await firstNavItem.textContent();
      console.log(`Testing nav item: "${navText?.trim()}"`);

      const navStyles = await firstNavItem.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          backgroundColor: computed.backgroundColor,
        };
      });
      console.log('Nav item styles (after fix):', JSON.stringify(navStyles, null, 2));

      await firstNavItem.hover();
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.screenshot({ path: path.join(screenshotsDir, 'after-03-nav-clicked.png') });
      console.log('✓ Captured nav item during click');
      await page.mouse.up();

      // Check if tap-highlight is transparent
      const tapHighlight = navStyles.webkitTapHighlightColor;
      if (tapHighlight === 'rgba(0, 0, 0, 0)' || tapHighlight === 'transparent') {
        console.log('✅ SUCCESS: Nav item tap-highlight is transparent');
      } else {
        console.log(`❌ FAIL: Nav item tap-highlight is still visible: ${tapHighlight}`);
      }
    }

    // Test keyboard focus (Tab key) - should still work
    console.log('\n--- KEYBOARD FOCUS TEST (SHOULD STILL WORK) ---');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    // Check if focus-visible is working
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        text: el.textContent?.substring(0, 50),
        outline: computed.outline,
        outlineColor: computed.outlineColor,
      };
    });
    console.log('Focused element:', JSON.stringify(focusedElement, null, 2));

    await page.screenshot({ path: path.join(screenshotsDir, 'after-04-keyboard-focus.png') });
    console.log('✓ Captured keyboard focus state');

    // Test mobile viewport
    console.log('\n--- MOBILE VIEWPORT TEST ---');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: path.join(screenshotsDir, 'after-05-mobile.png') });

    if (navItems && await navItems.count() > 0) {
      const firstNavItem = navItems.first();
      await firstNavItem.hover();
      await page.mouse.down();
      await page.screenshot({ path: path.join(screenshotsDir, 'after-06-mobile-clicked.png') });
      console.log('✓ Captured mobile click state');
      await page.mouse.up();
    }

    console.log('\n=== TEST COMPLETE ===');
    console.log(`Screenshots saved to: ${screenshotsDir}`);
    console.log('\nCompare BEFORE screenshots:');
    console.log('  - before-01-initial.png');
    console.log('  - before-02-logo-clicked.png');
    console.log('  - before-03-nav-clicked.png');
    console.log('\nWith AFTER screenshots:');
    console.log('  - after-01-initial.png');
    console.log('  - after-02-logo-clicked.png');
    console.log('  - after-03-nav-clicked.png');
    console.log('  - after-04-keyboard-focus.png (keyboard accessibility verification)');

  } catch (error) {
    console.error('Error during test:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

testTapHighlightFix()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
