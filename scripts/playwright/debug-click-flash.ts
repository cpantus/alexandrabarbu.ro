/**
 * Debug Green Rectangle Flash on Navigation Click
 *
 * This script captures computed styles DURING the click event (mousedown/active state)
 * to identify the exact CSS property causing the green rectangle flash.
 *
 * Testing Strategy:
 * 1. Add event listeners to capture styles during mousedown
 * 2. Check all possible sources: tap-highlight, background, outline, box-shadow, border
 * 3. Test both navigation links and logo
 * 4. Record video for visual proof
 */

import { chromium, Browser, Page } from '@playwright/test';

interface StyleCapture {
  selector: string;
  event: string;
  styles: {
    tapHighlight: string;
    background: string;
    outline: string;
    boxShadow: string;
    border: string;
    borderBottom: string;
    textDecoration: string;
  };
}

async function captureStylesDuringClick(page: Page, selector: string): Promise<StyleCapture> {
  // Inject event listener that captures styles during mousedown
  const result = await page.evaluate((sel) => {
    return new Promise<StyleCapture>((resolve) => {
      const element = document.querySelector(sel);

      if (!element) {
        resolve({
          selector: sel,
          event: 'error',
          styles: {
            tapHighlight: 'ELEMENT NOT FOUND',
            background: '',
            outline: '',
            boxShadow: '',
            border: '',
            borderBottom: '',
            textDecoration: ''
          }
        });
        return;
      }

      let captured = false;

      // Capture on mousedown (active state trigger)
      element.addEventListener('mousedown', () => {
        if (captured) return;
        captured = true;

        const computed = window.getComputedStyle(element);
        const computedActive = window.getComputedStyle(element, ':active');

        // Capture all potential culprits
        resolve({
          selector: sel,
          event: 'mousedown',
          styles: {
            tapHighlight: computed.webkitTapHighlightColor || 'not set',
            background: computed.backgroundColor,
            outline: computed.outline,
            boxShadow: computed.boxShadow,
            border: computed.border,
            borderBottom: computed.borderBottom,
            textDecoration: computed.textDecoration
          }
        });
      });

      // Trigger click
      setTimeout(() => {
        (element as HTMLElement).click();
      }, 100);

      // Timeout fallback
      setTimeout(() => {
        if (!captured) {
          resolve({
            selector: sel,
            event: 'timeout',
            styles: {
              tapHighlight: 'TIMEOUT - NO EVENT CAPTURED',
              background: '',
              outline: '',
              boxShadow: '',
              border: '',
              borderBottom: '',
              textDecoration: ''
            }
          });
        }
      }, 5000);
    });
  }, selector);

  return result;
}

async function searchForActiveStyles(page: Page): Promise<string[]> {
  // Search for :active pseudo-class rules in all stylesheets
  const activeRules = await page.evaluate(() => {
    const rules: string[] = [];

    try {
      // Get all stylesheets
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          // Get all CSS rules
          const cssRules = Array.from(sheet.cssRules || []);

          for (const rule of cssRules) {
            if ('selectorText' in rule && rule.selectorText) {
              const selectorText = rule.selectorText;

              // Look for :active pseudo-class
              if (selectorText.includes(':active')) {
                rules.push(`${selectorText} { ${(rule as CSSStyleRule).cssText} }`);
              }
            }
          }
        } catch (e) {
          // Skip CORS-blocked stylesheets
          rules.push(`[CORS blocked stylesheet: ${sheet.href}]`);
        }
      }
    } catch (e) {
      rules.push(`[Error scanning stylesheets: ${e}]`);
    }

    return rules;
  });

  return activeRules;
}

async function main() {
  console.log('🔍 Starting Green Rectangle Flash Debug\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: '/tmp/playwright-videos/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  // Navigate to site
  console.log('📍 Navigating to http://localhost:1313/\n');
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Phase 1: Search for :active rules in CSS
  console.log('🔎 Phase 1: Searching for :active pseudo-class rules in CSS\n');
  const activeRules = await searchForActiveStyles(page);

  if (activeRules.length > 0) {
    console.log(`Found ${activeRules.length} :active rules:\n`);
    activeRules.forEach((rule, i) => {
      console.log(`${i + 1}. ${rule}\n`);
    });
  } else {
    console.log('⚠️  No :active rules found in stylesheets\n');
  }

  console.log('\n───────────────────────────────────────────────────────────────\n');

  // Phase 2: Capture styles during click on navigation links
  console.log('🔎 Phase 2: Capturing styles DURING click events\n');

  const selectorsToTest = [
    '.c-header__brand',
    '.c-navigation__link:first-child',
    '.c-navigation__link:nth-child(2)',
    'nav a:first-of-type'
  ];

  for (const selector of selectorsToTest) {
    console.log(`\n🎯 Testing selector: ${selector}`);
    console.log('───────────────────────────────────────────────────────────────');

    try {
      const capture = await captureStylesDuringClick(page, selector);

      console.log(`Event: ${capture.event}`);
      console.log(`\nComputed Styles DURING Click:`);
      console.log(`  -webkit-tap-highlight-color: ${capture.styles.tapHighlight}`);
      console.log(`  background-color:            ${capture.styles.background}`);
      console.log(`  outline:                     ${capture.styles.outline}`);
      console.log(`  box-shadow:                  ${capture.styles.boxShadow}`);
      console.log(`  border:                      ${capture.styles.border}`);
      console.log(`  border-bottom:               ${capture.styles.borderBottom}`);
      console.log(`  text-decoration:             ${capture.styles.textDecoration}`);

      // Highlight suspicious values
      const suspicious: string[] = [];
      if (capture.styles.tapHighlight && !capture.styles.tapHighlight.includes('transparent') && !capture.styles.tapHighlight.includes('rgba(0, 0, 0, 0)')) {
        suspicious.push(`⚠️  tap-highlight is NOT transparent: ${capture.styles.tapHighlight}`);
      }
      if (capture.styles.outline && capture.styles.outline !== 'none' && !capture.styles.outline.includes('0px')) {
        suspicious.push(`⚠️  outline is visible: ${capture.styles.outline}`);
      }
      if (capture.styles.boxShadow && capture.styles.boxShadow !== 'none') {
        suspicious.push(`⚠️  box-shadow present: ${capture.styles.boxShadow}`);
      }
      if (capture.styles.border && !capture.styles.border.includes('0px') && capture.styles.border !== 'none') {
        suspicious.push(`⚠️  border present: ${capture.styles.border}`);
      }
      if (capture.styles.borderBottom && !capture.styles.borderBottom.includes('0px') && capture.styles.borderBottom !== 'none') {
        suspicious.push(`⚠️  border-bottom present: ${capture.styles.borderBottom}`);
      }

      if (suspicious.length > 0) {
        console.log(`\n🚨 SUSPICIOUS PROPERTIES FOUND:`);
        suspicious.forEach(s => console.log(`   ${s}`));
      } else {
        console.log(`\n✅ No obvious culprits detected`);
      }

      await page.waitForTimeout(500);
    } catch (error) {
      console.log(`\n❌ Error testing selector: ${error}`);
    }
  }

  console.log('\n\n═══════════════════════════════════════════════════════════════');
  console.log('🎬 Recording video proof...');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Phase 3: Visual test with multiple clicks for video recording
  console.log('Performing visual clicks for video recording...\n');

  for (let i = 1; i <= 3; i++) {
    console.log(`Click test ${i}/3`);
    await page.click('.c-header__brand');
    await page.waitForTimeout(500);
    await page.click('.c-navigation__link:first-child');
    await page.waitForTimeout(500);
  }

  console.log('\n✅ Visual test complete');

  // Close and save video
  await page.close();
  await context.close();

  const videoPath = await page.video()?.path();
  console.log(`\n📹 Video saved to: ${videoPath || '/tmp/playwright-videos/'}`);

  await browser.close();

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('✅ Debug Complete');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('Next Steps:');
  console.log('1. Review the suspicious properties listed above');
  console.log('2. Check the video recording frame-by-frame');
  console.log('3. Search for the culprit CSS rules in SCSS files');
  console.log('4. Apply fix with sufficient specificity + !important');
  console.log('5. Re-run this script to verify fix\n');
}

main().catch(console.error);
