import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:1315';

async function run() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  console.log('\n=== Testing Navigation Underline Fix ===\n');

  // Get underline visibility status
  const getUnderlineStatus = async () => {
    return await page.evaluate(() => {
      const items = document.querySelectorAll('.c-navigation__item');
      const results: Record<string, boolean> = {};
      items.forEach(item => {
        const linkText = item.querySelector('.c-navigation__link-text');
        const text = linkText?.textContent?.trim() || 'unknown';
        if (linkText) {
          const styles = window.getComputedStyle(linkText, '::after');
          const opacity = parseFloat(styles.opacity);
          results[text] = opacity > 0.5; // Consider visible if opacity > 0.5
        }
      });
      return results;
    });
  };

  // Test scenario: Hover Servicii, then move to Contact quickly
  console.log('Test: Hover Servicii (dropdown), then quickly move to Contact');

  const serviciiItem = page.locator('.c-navigation__item:has-text("Servicii")').first();
  const contactItem = page.locator('.c-navigation__item:has-text("Contact")').first();

  // Hover Servicii
  await serviciiItem.hover();
  await page.waitForTimeout(300); // Wait for underline to appear
  console.log('After hovering Servicii:', await getUnderlineStatus());

  // Take screenshot
  await page.screenshot({ path: 'screenshots/nav-fix-1-hover-servicii.png' });

  // Quickly move to Contact
  await contactItem.hover();
  await page.waitForTimeout(100); // Short wait - simulating quick mouse movement
  console.log('Immediately after moving to Contact:', await getUnderlineStatus());

  // Wait a bit longer
  await page.waitForTimeout(400);
  console.log('After 500ms on Contact:', await getUnderlineStatus());

  // Take screenshot
  await page.screenshot({ path: 'screenshots/nav-fix-2-hover-contact.png' });

  // Check if bug is fixed
  const status = await getUnderlineStatus();
  const serviciiStillUnderlined = status['Servicii'];
  const contactUnderlined = status['Contact'];

  console.log('\n=== Result ===');
  if (!serviciiStillUnderlined && contactUnderlined) {
    console.log('✅ FIX WORKS: Servicii underline removed, Contact underline visible');
  } else if (serviciiStillUnderlined && contactUnderlined) {
    console.log('❌ BUG PERSISTS: Both Servicii and Contact are underlined');
  } else {
    console.log('⚠️ UNEXPECTED:', { serviciiStillUnderlined, contactUnderlined });
  }

  await page.waitForTimeout(2000);
  await browser.close();
}

run().catch(console.error);
