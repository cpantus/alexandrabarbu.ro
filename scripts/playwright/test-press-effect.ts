import { chromium } from 'playwright';

async function testPressEffect() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  // Wait for JS to initialize
  await page.waitForTimeout(1000);

  const heroButton = page.locator('text="Programează Consultație"').first();

  if (await heroButton.count() === 0) {
    console.log('Hero button not found!');
    await browser.close();
    return;
  }

  console.log('\n=== HERO BUTTON PRESS EFFECT TEST ===\n');

  // Get button box
  const box = await heroButton.boundingBox();
  if (!box) {
    console.log('Could not get button bounding box');
    await browser.close();
    return;
  }

  // 1. Get normal state (before any interaction)
  const normalTransform = await heroButton.evaluate((el) => {
    return window.getComputedStyle(el).transform;
  });
  console.log('1. Normal state (no hover):');
  console.log('   transform:', normalTransform);

  // 2. Move mouse to button center (hover state)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(300); // Let magnetic effect settle

  const hoverTransform = await heroButton.evaluate((el) => {
    return window.getComputedStyle(el).transform;
  });
  console.log('\n2. Hover state (mouse over, magnetic effect):');
  console.log('   transform:', hoverTransform);

  // 3. Press mouse button (mousedown)
  await page.mouse.down();
  await page.waitForTimeout(50); // Give it a moment

  const pressTransform = await heroButton.evaluate((el) => {
    return window.getComputedStyle(el).transform;
  });
  console.log('\n3. Press state (mousedown):');
  console.log('   transform:', pressTransform);

  // Parse the transform to check for scale
  // matrix(a, b, c, d, tx, ty) where a and d are scale factors
  const match = pressTransform.match(/matrix\(([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+)\)/);
  if (match) {
    const scaleX = parseFloat(match[1]);
    const scaleY = parseFloat(match[4]);
    const translateX = parseFloat(match[5]);
    const translateY = parseFloat(match[6]);

    console.log('\n   Parsed values:');
    console.log('   - scaleX:', scaleX.toFixed(4), '(expected ~0.98)');
    console.log('   - scaleY:', scaleY.toFixed(4), '(expected ~0.98)');
    console.log('   - translateY:', translateY.toFixed(4), '(expected to include +1px press offset)');

    // Check if press effect is working
    const hasScaleEffect = scaleX < 0.995 && scaleX > 0.96;
    console.log('\n   Press scale effect working:', hasScaleEffect ? 'YES ✓' : 'NO ✗');
  } else if (pressTransform === 'none') {
    console.log('   No transform applied during press!');
  }

  // 4. Release mouse button
  await page.mouse.up();
  await page.waitForTimeout(50);

  const releaseTransform = await heroButton.evaluate((el) => {
    return window.getComputedStyle(el).transform;
  });
  console.log('\n4. Release state (mouseup):');
  console.log('   transform:', releaseTransform);

  // 5. Compare with working button
  console.log('\n--- COMPARISON WITH WORKING BUTTON ---\n');

  const workingButton = page.locator('text="Fa o programare!"').first();
  if (await workingButton.count() > 0) {
    const workingBox = await workingButton.boundingBox();
    if (workingBox) {
      await page.mouse.move(workingBox.x + workingBox.width / 2, workingBox.y + workingBox.height / 2);
      await page.waitForTimeout(300);
      await page.mouse.down();
      await page.waitForTimeout(50);

      const workingPressTransform = await workingButton.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      console.log('Working button press transform:', workingPressTransform);

      await page.mouse.up();
    }
  }

  await browser.close();
}

testPressEffect().catch(console.error);
