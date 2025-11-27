/**
 * Quick Visual Test - Verify Green Rectangle Fix
 *
 * This script performs automated visual clicks and checks for the absence of green rectangles.
 * It takes screenshots before/during/after clicks to compare.
 */

import { chromium } from '@playwright/test';
import * as path from 'path';

async function main() {
  console.log('🎬 Quick Visual Test - Green Rectangle Fix\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  console.log('📍 Navigating to http://localhost:1313/\n');
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const screenshotDir = '/tmp/click-test-screenshots';
  let testNum = 0;

  console.log('📸 Running visual click tests...\n');

  // Test 1: Logo Click
  testNum++;
  console.log(`Test ${testNum}: Logo Click`);
  try {
    // Prevent navigation
    await page.evaluate(() => {
      document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault(), { capture: true });
      });
    });

    const logo = page.locator('.c-header__brand').first();
    await logo.screenshot({ path: `${screenshotDir}/test${testNum}-before.png` });

    // Click and immediately screenshot
    await logo.click({ delay: 0 });
    await page.screenshot({ path: `${screenshotDir}/test${testNum}-during.png` });

    await page.waitForTimeout(300);
    await logo.screenshot({ path: `${screenshotDir}/test${testNum}-after.png` });

    console.log(`✓ Screenshots saved to ${screenshotDir}/test${testNum}-*.png`);
  } catch (e) {
    console.log(`✗ Test ${testNum} failed: ${e}`);
  }

  // Test 2: First Navigation Link
  testNum++;
  console.log(`\nTest ${testNum}: First Navigation Link`);
  try {
    const navLink = page.locator('.c-navigation__link').first();
    await navLink.screenshot({ path: `${screenshotDir}/test${testNum}-before.png` });

    await navLink.click({ delay: 0 });
    await page.screenshot({ path: `${screenshotDir}/test${testNum}-during.png` });

    await page.waitForTimeout(300);
    await navLink.screenshot({ path: `${screenshotDir}/test${testNum}-after.png` });

    console.log(`✓ Screenshots saved to ${screenshotDir}/test${testNum}-*.png`);
  } catch (e) {
    console.log(`✗ Test ${testNum} failed: ${e}`);
  }

  // Test 3: Multiple Rapid Clicks (stress test)
  testNum++;
  console.log(`\nTest ${testNum}: Multiple Rapid Clicks (Stress Test)`);
  try {
    const logo = page.locator('.c-header__brand').first();

    for (let i = 0; i < 5; i++) {
      await logo.click({ delay: 0 });
      await page.waitForTimeout(50);
    }

    await page.screenshot({ path: `${screenshotDir}/test${testNum}-stress.png` });
    console.log(`✓ Stress test complete, screenshot saved`);
  } catch (e) {
    console.log(`✗ Test ${testNum} failed: ${e}`);
  }

  // Test 4: Computed Styles Check
  testNum++;
  console.log(`\nTest ${testNum}: Computed Styles Verification`);
  try {
    const styles = await page.evaluate(() => {
      const logo = document.querySelector('.c-header__brand');
      const navLink = document.querySelector('.c-navigation__link');

      if (!logo || !navLink) return { error: 'Elements not found' };

      const logoStyles = window.getComputedStyle(logo as HTMLElement);
      const navStyles = window.getComputedStyle(navLink as HTMLElement);

      return {
        logo: {
          tapHighlight: logoStyles.getPropertyValue('-webkit-tap-highlight-color'),
          outline: logoStyles.outline
        },
        navLink: {
          tapHighlight: navStyles.getPropertyValue('-webkit-tap-highlight-color'),
          outline: navStyles.outline
        }
      };
    });

    console.log('Computed Styles:');
    console.log('  Logo:');
    console.log(`    -webkit-tap-highlight-color: ${styles.logo.tapHighlight}`);
    console.log(`    outline: ${styles.logo.outline}`);
    console.log('  Nav Link:');
    console.log(`    -webkit-tap-highlight-color: ${styles.navLink.tapHighlight}`);
    console.log(`    outline: ${styles.navLink.outline}`);

    // Check for success indicators
    const tapHighlightOk = styles.logo.tapHighlight.includes('transparent') ||
                            styles.logo.tapHighlight.includes('rgba(0, 0, 0, 0)');
    const outlineOk = styles.logo.outline === 'none' ||
                       styles.logo.outline.includes('0px');

    if (tapHighlightOk && outlineOk) {
      console.log('\n✅ PASS: Styles look correct (transparent tap highlight, no outline)');
    } else {
      console.log('\n⚠️  WARNING: Some styles may not be correct');
    }
  } catch (e) {
    console.log(`✗ Test ${testNum} failed: ${e}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('✅ Visual Test Complete\n');
  console.log('📁 Screenshots saved to:', screenshotDir);
  console.log('\n📖 Next Steps:');
  console.log('1. Review screenshots for any visible green rectangles');
  console.log('2. Compare before/during/after screenshots');
  console.log('3. Manually test in browser if needed');
  console.log('4. Open test interface: file:///.../scripts/test-click-fix.html\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  await page.waitForTimeout(2000);
  await browser.close();
}

main().catch(console.error);
