/**
 * Playwright Test: About Page Interactive Design Changes
 *
 * Tests three specific interactive features:
 * 1. Hero Section - Quote hover animation (transform + shadow)
 * 2. Credentials Section - Dark green background, sage text, gold title underline
 * 3. Scientific Approach Section - Icon hover color flip (sage→forest, forest→gold)
 *
 * Usage: node scripts/playwright/test-about-interactions.ts
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ABOUT_PAGE_URL = 'http://localhost:1313/despre-mine-new/';
const SCREENSHOTS_DIR = path.join(__dirname, '../../screenshots/about-interactions');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const results = {};

function addResult(name, passed, message, details) {
  results[name] = passed;
  console.log(`${passed ? '✅' : '❌'} ${name}: ${message}`);
  if (details) {
    console.log(`   Details: ${JSON.stringify(details, null, 2)}`);
  }
}

function rgbToHex(rgb) {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return rgb;
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function isColorSimilar(color1, color2, tolerance = 15) {
  const hex1 = rgbToHex(color1);
  const hex2 = rgbToHex(color2);

  const r1 = parseInt(hex1.substring(1, 3), 16);
  const g1 = parseInt(hex1.substring(3, 5), 16);
  const b1 = parseInt(hex1.substring(5, 7), 16);

  const r2 = parseInt(hex2.substring(1, 3), 16);
  const g2 = parseInt(hex2.substring(3, 5), 16);
  const b2 = parseInt(hex2.substring(5, 7), 16);

  return Math.abs(r1 - r2) <= tolerance &&
         Math.abs(g1 - g2) <= tolerance &&
         Math.abs(b1 - b2) <= tolerance;
}

async function runTests() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log(`\n🧪 Testing About Page Interactions: ${ABOUT_PAGE_URL}\n`);

  try {
    // Navigate to about page
    await page.goto(ABOUT_PAGE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // =========================================================================
    // TEST 1: Quote Box Hover Animation (Transform + Shadow)
    // =========================================================================
    console.log('\n📝 TEST 1: Hero Section - Quote Box Hover Animation');

    const quoteSelector = '.c-hero-about__quote';
    const quoteBox = await page.$(quoteSelector);

    if (!quoteBox) {
      addResult('1a_quote_exists', false, 'Quote box not found on page');
    } else {
      addResult('1a_quote_exists', true, 'Quote box found');

      // Get initial state
      const initialTransform = await quoteBox.evaluate(el =>
        getComputedStyle(el).transform
      );
      const initialShadow = await quoteBox.evaluate(el =>
        getComputedStyle(el).boxShadow
      );

      // Take screenshot before hover
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '1_quote_before_hover.png'),
        fullPage: false
      });

      // Hover over quote box
      await quoteBox.hover();
      await page.waitForTimeout(400); // Wait for transition

      // Get hover state
      const hoverTransform = await quoteBox.evaluate(el =>
        getComputedStyle(el).transform
      );
      const hoverShadow = await quoteBox.evaluate(el =>
        getComputedStyle(el).boxShadow
      );

      // Take screenshot during hover
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '1_quote_hover.png'),
        fullPage: false
      });

      // Check transform changed
      const transformChanged = initialTransform !== hoverTransform && hoverTransform !== 'none';
      addResult(
        '1b_quote_transform',
        transformChanged,
        transformChanged ? 'Transform applied on hover' : 'Transform not applied',
        { initial: initialTransform, hover: hoverTransform }
      );

      // Check shadow changed (more intense)
      const shadowChanged = initialShadow !== hoverShadow;
      addResult(
        '1c_quote_shadow',
        shadowChanged,
        shadowChanged ? 'Shadow enhanced on hover' : 'Shadow not enhanced',
        { initial: initialShadow, hover: hoverShadow }
      );
    }

    // =========================================================================
    // TEST 2: Credentials Section - Background, Text Color, Title Hover
    // =========================================================================
    console.log('\n🎓 TEST 2: Credentials Section - Styling');

    const credentialsSelector = '.c-credentials-education';
    const credentialsSection = await page.$(credentialsSelector);

    if (!credentialsSection) {
      addResult('2a_credentials_exists', false, 'Credentials section not found');
    } else {
      addResult('2a_credentials_exists', true, 'Credentials section found');

      // Test 2a: Dark green background
      const bgColor = await credentialsSection.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      const isDarkGreen = isColorSimilar(bgColor, 'rgb(35, 78, 62)', 20); // #234E3E with tolerance
      addResult(
        '2b_credentials_bg',
        isDarkGreen,
        isDarkGreen ? 'Dark green background verified' : 'Background color incorrect',
        { expected: '#234E3E', actual: rgbToHex(bgColor) }
      );

      // Test 2b: Card text color (#587065 - sage)
      const itemSelector = '.c-credentials-education__item';
      const firstItem = await page.$(itemSelector);

      if (!firstItem) {
        addResult('2c_card_text_color', false, 'Card items not found');
      } else {
        const textColor = await firstItem.evaluate(el =>
          getComputedStyle(el).color
        );
        const isSageColor = isColorSimilar(textColor, 'rgb(88, 112, 101)', 20); // #587065
        addResult(
          '2c_card_text_color',
          isSageColor,
          isSageColor ? 'Card text color is sage (#587065)' : 'Card text color incorrect',
          { expected: '#587065', actual: rgbToHex(textColor) }
        );
      }

      // Test 2c: Title hover - gold underline
      const titleSelector = '.c-credentials-education__card-title';
      const firstTitle = await page.$(titleSelector);

      if (!firstTitle) {
        addResult('2d_title_hover', false, 'Card titles not found');
      } else {
        // Get initial border
        const initialBorder = await firstTitle.evaluate(el =>
          getComputedStyle(el).borderBottomColor
        );

        // Take screenshot before hover
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, '2_credentials_before_hover.png'),
          fullPage: false
        });

        // Hover over title
        await firstTitle.hover();
        await page.waitForTimeout(400);

        // Get hover border
        const hoverBorder = await firstTitle.evaluate(el =>
          getComputedStyle(el).borderBottomColor
        );

        // Take screenshot during hover
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, '2_credentials_title_hover.png'),
          fullPage: false
        });

        // Check if border changed to gold
        const isGoldBorder = isColorSimilar(hoverBorder, 'rgb(212, 175, 55)', 20); // #D4AF37
        addResult(
          '2d_title_hover',
          isGoldBorder,
          isGoldBorder ? 'Gold underline appears on hover' : 'Underline color incorrect',
          { initial: rgbToHex(initialBorder), hover: rgbToHex(hoverBorder), expected: '#D4AF37' }
        );
      }
    }

    // =========================================================================
    // TEST 3: Scientific Approach - Icon Hover Color Flip
    // =========================================================================
    console.log('\n🔬 TEST 3: Scientific Approach Section - Icon Hover');

    const iconSelector = '.c-scientific-approach__icon';
    const firstIcon = await page.$(iconSelector);

    if (!firstIcon) {
      addResult('3a_icon_exists', false, 'Scientific approach icons not found');
    } else {
      addResult('3a_icon_exists', true, 'Scientific approach icon found');

      // Get initial state (light sage bg, dark green icon)
      const initialBg = await firstIcon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      const initialColor = await firstIcon.evaluate(el =>
        getComputedStyle(el).color
      );

      // Take screenshot before hover
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '3_icon_before_hover.png'),
        fullPage: false
      });

      // Hover over icon
      await firstIcon.hover();
      await page.waitForTimeout(400);

      // Get hover state (dark green bg, gold icon)
      const hoverBg = await firstIcon.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      const hoverColor = await firstIcon.evaluate(el =>
        getComputedStyle(el).color
      );

      // Take screenshot during hover
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, '3_icon_hover.png'),
        fullPage: false
      });

      // Test 3a: Background changes to dark green
      const isDarkGreenBg = isColorSimilar(hoverBg, 'rgb(35, 78, 62)', 20); // #234E3E
      addResult(
        '3b_icon_bg_hover',
        isDarkGreenBg,
        isDarkGreenBg ? 'Icon background changes to dark green on hover' : 'Background color incorrect',
        { initial: rgbToHex(initialBg), hover: rgbToHex(hoverBg), expected: '#234E3E' }
      );

      // Test 3b: Icon color changes to gold
      const isGoldIcon = isColorSimilar(hoverColor, 'rgb(212, 175, 55)', 20); // #D4AF37
      addResult(
        '3c_icon_color_hover',
        isGoldIcon,
        isGoldIcon ? 'Icon color changes to gold on hover' : 'Icon color incorrect',
        { initial: rgbToHex(initialColor), hover: rgbToHex(hoverColor), expected: '#D4AF37' }
      );
    }

    // Take full page screenshot at end
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '0_full_page.png'),
      fullPage: true
    });

  } catch (error) {
    console.error('\n❌ Test execution error:', error);
  } finally {
    await browser.close();
  }

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));

  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(r => r === true).length;
  const failedTests = totalTests - passedTests;

  console.log(`\nTotal Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`\n📸 Screenshots saved to: ${SCREENSHOTS_DIR}`);

  if (failedTests === 0) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n⚠️  Some tests failed. Check details above.');
  }

  console.log('='.repeat(60) + '\n');

  process.exit(failedTests > 0 ? 1 : 0);
}

// Run tests
runTests().catch(console.error);
