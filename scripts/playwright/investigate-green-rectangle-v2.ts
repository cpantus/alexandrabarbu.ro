import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function investigateGreenRectangle() {
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

  console.log('\n=== GREEN RECTANGLE INVESTIGATION ===\n');

  try {
    // Navigate to the site
    console.log('Navigating to site...');
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle', timeout: 10000 });
    console.log('✓ Navigated to homepage');

    // Take initial screenshot
    await page.screenshot({ path: path.join(screenshotsDir, 'before-01-initial.png'), fullPage: false });
    console.log('✓ Captured initial state');

    // Find logo
    console.log('\n--- LOGO INVESTIGATION ---');
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
      // Get computed styles before click
      const logoStylesBefore = await logo.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          backgroundColor: computed.backgroundColor,
          boxShadow: computed.boxShadow,
        };
      });
      console.log('Logo styles (resting):', JSON.stringify(logoStylesBefore, null, 2));

      // Hover and mousedown
      await logo.hover();
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.screenshot({ path: path.join(screenshotsDir, 'before-02-logo-clicked.png') });
      console.log('✓ Captured logo during click');

      const logoStylesActive = await logo.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          backgroundColor: computed.backgroundColor,
        };
      });
      console.log('Logo styles (active):', JSON.stringify(logoStylesActive, null, 2));
      await page.mouse.up();
    }

    // Find navigation items
    console.log('\n--- NAVIGATION ITEMS INVESTIGATION ---');
    const navSelectors = [
      'nav a.nav-link',
      '.navbar-nav a',
      'nav ul li a',
      'header nav a',
      '.navigation a'
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

      const navStylesBefore = await firstNavItem.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          backgroundColor: computed.backgroundColor,
          borderBottom: computed.borderBottom,
        };
      });
      console.log('Nav item styles (resting):', JSON.stringify(navStylesBefore, null, 2));

      await firstNavItem.hover();
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.screenshot({ path: path.join(screenshotsDir, 'before-03-nav-clicked.png') });
      console.log('✓ Captured nav item during click');

      const navStylesActive = await firstNavItem.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          webkitTapHighlightColor: computed.webkitTapHighlightColor,
          outline: computed.outline,
          backgroundColor: computed.backgroundColor,
        };
      });
      console.log('Nav item styles (active):', JSON.stringify(navStylesActive, null, 2));
      await page.mouse.up();
    }

    // Check all stylesheets for relevant rules
    console.log('\n--- ANALYZING CSS RULES ---');
    const relevantRules = await page.evaluate(() => {
      const results: any[] = [];
      const sheets = Array.from(document.styleSheets);

      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              const text = rule.cssText.toLowerCase();
              if (text.includes('tap-highlight') ||
                  (text.includes('outline') && text.includes('nav')) ||
                  (text.includes(':active') && (text.includes('nav') || text.includes('logo')))) {
                results.push({
                  selector: rule.selectorText,
                  properties: rule.style.cssText.substring(0, 300),
                });
              }
            }
          }
        } catch (e) {
          // Skip CORS errors
        }
      }
      return results;
    });

    console.log('Found relevant CSS rules:', JSON.stringify(relevantRules, null, 2));

    console.log('\n=== INVESTIGATION COMPLETE ===');
    console.log(`Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('Error during investigation:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

investigateGreenRectangle()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
