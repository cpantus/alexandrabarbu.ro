import { chromium } from 'playwright';

async function testHeroButton() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  // Find the specific hero button
  const heroButton = page.locator('.c-hero-breadcrumb__cta-button.c-button--primary').first();

  console.log('\n=== HERO BUTTON (Programează Consultație) ===\n');

  if (await heroButton.count() > 0) {
    // Normal state
    const normalStyles = await heroButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.background,
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
        transition: styles.transition,
        animation: styles.animation
      };
    });
    console.log('Normal state:', JSON.stringify(normalStyles, null, 2));

    // Hover state
    await heroButton.hover();
    await page.waitForTimeout(100);
    const hoverStyles = await heroButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform
      };
    });
    console.log('\nHover state:', JSON.stringify(hoverStyles, null, 2));

    // Click and hold
    const box = await heroButton.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(100);

      const activeStyles = await heroButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          transform: styles.transform,
          transition: styles.transition
        };
      });
      console.log('\nActive (mouse down) state:', JSON.stringify(activeStyles, null, 2));

      await page.mouse.up();
    }
  }

  // Compare with "Fa o programare!" button
  const faButton = page.locator('button.c-button--primary:not(.c-hero-breadcrumb__cta-button)').first();

  console.log('\n=== FA O PROGRAMARE BUTTON ===\n');

  if (await faButton.count() > 0) {
    const normalStyles = await faButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
        transition: styles.transition,
        animation: styles.animation
      };
    });
    console.log('Normal state:', JSON.stringify(normalStyles, null, 2));

    // Click and hold
    const box = await faButton.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(100);

      const activeStyles = await faButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          transform: styles.transform,
          transition: styles.transition
        };
      });
      console.log('\nActive (mouse down) state:', JSON.stringify(activeStyles, null, 2));

      await page.mouse.up();
    }
  }

  await browser.close();
}

testHeroButton().catch(console.error);
