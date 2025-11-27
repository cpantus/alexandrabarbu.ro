import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:1316';

async function run() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  // Navigate directly to /abordare/ page
  console.log('\n=== Testing /abordare/ page navigation state ===\n');
  await page.goto(`${BASE_URL}/abordare/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check nav item states
  const getNavState = async () => {
    return await page.evaluate(() => {
      const items = document.querySelectorAll('.c-navigation__item');
      return Array.from(items).map(item => {
        const linkText = item.querySelector('.c-navigation__link-text');
        const text = linkText?.textContent?.trim() || 'unknown';
        const classes = item.className;
        const isActive = classes.includes('--active');
        const isOpen = classes.includes('--open');

        // Check underline visibility
        let underlineVisible = false;
        if (linkText) {
          const styles = window.getComputedStyle(linkText, '::after');
          const opacity = parseFloat(styles.opacity);
          const transform = styles.transform;
          underlineVisible = opacity > 0.5 && !transform.includes('matrix(0');
        }

        return { text, isActive, isOpen, underlineVisible, classes };
      });
    });
  };

  console.log('Initial state on /abordare/ page (no mouse movement):');
  const initialState = await getNavState();
  console.log(initialState);

  // Take screenshot
  await page.screenshot({ path: 'screenshots/abordare-initial.png' });

  // Check if any item has incorrect underline
  const incorrectUnderlines = initialState.filter(
    item => item.underlineVisible && !item.isActive && item.text !== 'Abordare'
  );

  if (incorrectUnderlines.length > 0) {
    console.log('\n❌ BUG DETECTED: Items with incorrect underlines:');
    console.log(incorrectUnderlines);
  } else {
    console.log('\n✅ No incorrect underlines detected initially');
  }

  // Now hover over Servicii, then move mouse away
  console.log('\n--- Hovering over Servicii, then moving away ---');
  const serviciiItem = page.locator('.c-navigation__item:has-text("Servicii")').first();
  await serviciiItem.hover();
  await page.waitForTimeout(500);
  console.log('After hovering Servicii:', (await getNavState()).map(i => ({ text: i.text, underlineVisible: i.underlineVisible })));

  // Move mouse completely away from nav
  await page.mouse.move(700, 500);
  await page.waitForTimeout(500);
  console.log('After moving mouse away:', (await getNavState()).map(i => ({ text: i.text, underlineVisible: i.underlineVisible })));

  await page.screenshot({ path: 'screenshots/abordare-after-hover.png' });

  // Final check
  const finalState = await getNavState();
  const stillIncorrect = finalState.filter(
    item => item.underlineVisible && !item.isActive && item.text !== 'Abordare'
  );

  if (stillIncorrect.length > 0) {
    console.log('\n❌ BUG STILL PRESENT: Items with stuck underlines:');
    console.log(stillIncorrect);
  } else {
    console.log('\n✅ All underlines cleared correctly');
  }

  await page.waitForTimeout(2000);
  await browser.close();
}

run().catch(console.error);
