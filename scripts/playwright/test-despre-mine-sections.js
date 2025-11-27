const { chromium } = require('playwright');
const { writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

const results = [];
const screenshotsDir = join(process.cwd(), 'screenshots', 'despre-mine-sections');

// Ensure screenshots directory exists
mkdirSync(screenshotsDir, { recursive: true });

async function testSection2CredentialsEducation(page) {
  console.log('\n=== Testing Section 2 (Credentials & Education) ===');

  // Wait for section to be visible
  await page.waitForSelector('.c-credentials-education', { timeout: 5000 });

  // Test 1: Card titles must be WHITE
  const titleColor = await page.$eval('.c-credentials-education__card-title',
    (el) => getComputedStyle(el).color
  );

  // Convert rgb to check if it's white
  const isWhite = titleColor === 'rgb(255, 255, 255)';

  results.push({
    test: 'Section 2 - Card Title Font Color WHITE',
    passed: isWhite,
    details: `Expected: white (rgb(255, 255, 255)), Got: ${titleColor}`
  });

  // Test 2: Check item text color (should also be WHITE)
  const itemColor = await page.$eval('.c-credentials-education__item',
    (el) => getComputedStyle(el).color
  );

  results.push({
    test: 'Section 2 - Item Text Color WHITE',
    passed: itemColor === 'rgb(255, 255, 255)',
    details: `Expected: white (rgb(255, 255, 255)), Got: ${itemColor}`
  });

  // Test 3: Check circular check icon
  const checkIcon = await page.evaluate(() => {
    const item = document.querySelector('.c-credentials-education__item');
    if (!item) return { borderRadius: 'none', background: 'none' };

    const styles = getComputedStyle(item, '::before');
    return {
      borderRadius: styles.borderRadius,
      background: styles.background || styles.backgroundColor
    };
  });

  const isCircular = checkIcon.borderRadius === '50%' || parseFloat(checkIcon.borderRadius) >= 10;

  results.push({
    test: 'Section 2 - Circular Check Icon',
    passed: isCircular,
    details: `Border Radius: ${checkIcon.borderRadius}, Background: ${checkIcon.background}`
  });

  // Test 4: Golden underscores on hover
  const cards = await page.$$('.c-credentials-education__card');

  // Screenshot before hover
  await page.screenshot({
    path: join(screenshotsDir, 'section2-before-hover.png'),
    fullPage: false
  });

  if (cards.length > 0) {
    await cards[0].hover();
    await page.waitForTimeout(500);

    // Screenshot after hover
    await page.screenshot({
      path: join(screenshotsDir, 'section2-after-hover.png'),
      fullPage: false
    });

    results.push({
      test: 'Section 2 - Screenshot (Hover Test)',
      passed: true,
      details: 'Screenshots saved for visual inspection',
      screenshot: 'section2-after-hover.png'
    });
  }
}

async function testSection3ScientificApproach(page) {
  console.log('\n=== Testing Section 3 (Scientific Approach) ===');

  // Wait for section to be visible
  await page.waitForSelector('.c-scientific-approach', { timeout: 5000 });

  // Test 1: Icons should be 50% larger (96px vs original 64px)
  const iconSize = await page.$eval('.c-scientific-approach__icon',
    (el) => {
      const styles = getComputedStyle(el);
      return {
        width: parseFloat(styles.width),
        height: parseFloat(styles.height)
      };
    }
  );

  const expectedSize = 96; // 64px * 1.5
  const sizeMatch = Math.abs(iconSize.width - expectedSize) < 10; // 10px tolerance

  results.push({
    test: 'Section 3 - Icon Size (50% Larger)',
    passed: sizeMatch,
    details: `Expected: ~${expectedSize}px, Got: ${iconSize.width}px x ${iconSize.height}px`
  });

  // Test 2: Check icon animation on hover
  const features = await page.$$('.c-scientific-approach__feature');

  if (features.length > 0) {
    const feature = features[0];
    const icon = await feature.$('.c-scientific-approach__icon');

    if (icon) {
      // Get initial transform
      const initialTransform = await icon.evaluate((el) =>
        getComputedStyle(el).transform
      );

      // Screenshot before hover
      await page.screenshot({
        path: join(screenshotsDir, 'section3-before-hover.png'),
        fullPage: false
      });

      // Hover over feature card
      await feature.hover();
      await page.waitForTimeout(500); // Wait for animation

      // Get transform after hover
      const hoverTransform = await icon.evaluate((el) =>
        getComputedStyle(el).transform
      );

      // Screenshot after hover
      await page.screenshot({
        path: join(screenshotsDir, 'section3-after-hover.png'),
        fullPage: false
      });

      const hasAnimation = initialTransform !== hoverTransform;

      results.push({
        test: 'Section 3 - Icon Animation on Hover',
        passed: hasAnimation,
        details: `Initial: ${initialTransform}, Hover: ${hoverTransform}`,
        screenshot: 'section3-after-hover.png'
      });
    }
  }
}

async function runTests() {
  console.log('Starting Despre Mine sections tests...\n');

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  try {
    // Navigate to despre-mine page
    console.log('Navigating to http://localhost:1313/despre-mine/');
    await page.goto('http://localhost:1313/despre-mine/', {
      waitUntil: 'networkidle',
      timeout: 10000
    });

    // Wait for page to load
    await page.waitForTimeout(1000);

    // Run tests
    await testSection2CredentialsEducation(page);
    await testSection3ScientificApproach(page);

  } catch (error) {
    console.error('Error during tests:', error);
    results.push({
      test: 'Test Execution',
      passed: false,
      details: `Error: ${error}`
    });
  } finally {
    await browser.close();
  }

  // Print results
  console.log('\n=== TEST RESULTS ===\n');

  let passedCount = 0;
  let failedCount = 0;

  results.forEach((result) => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.test}`);
    console.log(`   ${result.details}`);
    if (result.screenshot) {
      console.log(`   Screenshot: ${result.screenshot}`);
    }
    console.log('');

    if (result.passed) passedCount++;
    else failedCount++;
  });

  console.log(`\nSummary: ${passedCount} passed, ${failedCount} failed`);

  // Save results to JSON
  const resultsPath = join(screenshotsDir, 'test-results.json');
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${resultsPath}`);

  process.exit(failedCount > 0 ? 1 : 0);
}

runTests();
