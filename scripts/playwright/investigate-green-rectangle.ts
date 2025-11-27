import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function investigateGreenRectangle() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = '/home/cere/Work/alex/alexandrabarbu.ro/screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('\n=== GREEN RECTANGLE INVESTIGATION ===\n');

  try {
    // Navigate to the site
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
    console.log('✓ Navigated to homepage');

    // Take initial screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '01-initial-state.png'), fullPage: true });
    console.log('✓ Captured initial state');

    // Investigate logo
    console.log('\n--- LOGO INVESTIGATION ---');
    const logo = page.locator('a.navbar-brand, .logo a, nav a[href="/"]').first();

    if (await logo.count() > 0) {
      // Get computed styles before click
      const logoStylesBefore = await logo.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          outlineStyle: computed.outlineStyle,
          outlineWidth: computed.outlineWidth,
          backgroundColor: computed.backgroundColor,
          boxShadow: computed.boxShadow,
        };
      });
      console.log('Logo styles (before):', JSON.stringify(logoStylesBefore, null, 2));

      // Click and capture during active state
      await logo.hover();
      await page.mouse.down();
      await page.screenshot({ path: path.join(screenshotsDir, '02-logo-mousedown.png') });
      console.log('✓ Captured logo during mousedown');

      // Get styles during active state
      const logoStylesActive = await logo.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          backgroundColor: computed.backgroundColor,
          boxShadow: computed.boxShadow,
        };
      });
      console.log('Logo styles (active):', JSON.stringify(logoStylesActive, null, 2));

      await page.mouse.up();
      await page.waitForTimeout(500);
    }

    // Investigate navigation items
    console.log('\n--- NAVIGATION ITEMS INVESTIGATION ---');
    const navItems = page.locator('nav a.nav-link, .navbar-nav a, nav ul li a');
    const navCount = await navItems.count();
    console.log(`Found ${navCount} navigation items`);

    if (navCount > 0) {
      const firstNavItem = navItems.first();
      const navText = await firstNavItem.textContent();
      console.log(`Testing first nav item: "${navText}"`);

      // Get computed styles before click
      const navStylesBefore = await firstNavItem.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          backgroundColor: computed.backgroundColor,
          boxShadow: computed.boxShadow,
          borderBottom: computed.borderBottom,
        };
      });
      console.log('Nav item styles (before):', JSON.stringify(navStylesBefore, null, 2));

      // Click and capture during active state
      await firstNavItem.hover();
      await page.mouse.down();
      await page.screenshot({ path: path.join(screenshotsDir, '03-nav-item-mousedown.png') });
      console.log('✓ Captured nav item during mousedown');

      // Get styles during active state
      const navStylesActive = await firstNavItem.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        const pseudo = window.getComputedStyle(el, ':after');
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          backgroundColor: computed.backgroundColor,
          boxShadow: computed.boxShadow,
          borderBottom: computed.borderBottom,
          afterBorderBottom: pseudo.borderBottom,
          afterBackgroundColor: pseudo.backgroundColor,
        };
      });
      console.log('Nav item styles (active):', JSON.stringify(navStylesActive, null, 2));

      await page.mouse.up();
    }

    // Test mobile viewport
    console.log('\n--- MOBILE VIEWPORT TEST ---');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: path.join(screenshotsDir, '04-mobile-initial.png') });

    if (navCount > 0) {
      const firstNavItem = navItems.first();
      await firstNavItem.hover();
      await page.mouse.down();
      await page.screenshot({ path: path.join(screenshotsDir, '05-mobile-nav-mousedown.png') });
      await page.mouse.up();
    }

    // Test keyboard focus (Tab key)
    console.log('\n--- KEYBOARD FOCUS TEST ---');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotsDir, '06-keyboard-focus-first.png') });
    console.log('✓ Captured first Tab focus');

    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(screenshotsDir, '07-keyboard-focus-second.png') });
    console.log('✓ Captured second Tab focus');

    // Check all CSS files for tap-highlight-color
    console.log('\n--- CSS FILES ANALYSIS ---');
    const cssContent = await page.evaluate(() => {
      const results: any[] = [];
      const sheets = Array.from(document.styleSheets);

      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              const text = rule.cssText;
              if (text.includes('tap-highlight') ||
                  text.includes('outline') ||
                  (text.includes('nav') && text.includes('background'))) {
                results.push({
                  selector: rule.selectorText,
                  cssText: rule.cssText.substring(0, 200),
                  href: sheet.href,
                });
              }
            }
          }
        } catch (e) {
          // CORS or other errors
        }
      }
      return results;
    });

    console.log('Relevant CSS rules found:', JSON.stringify(cssContent, null, 2));

    console.log('\n=== INVESTIGATION COMPLETE ===');
    console.log(`Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('Error during investigation:', error);
  } finally {
    await browser.close();
  }
}

investigateGreenRectangle();
