const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function verifyFooterFix() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'tmp', 'footer-fix');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('✅ Verifying footer fix...\n');

  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    console.log(`📱 ${viewport.name} (${viewport.width}x${viewport.height})`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });

    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);

    // Get divider info
    const dividerInfo = await page.evaluate(() => {
      const divider = document.querySelector('.c-footer__divider');
      if (!divider) return null;

      const computed = window.getComputedStyle(divider);
      const footer = document.querySelector('footer');
      const footerComputed = footer ? window.getComputedStyle(footer) : null;

      return {
        divider: {
          backgroundColor: computed.backgroundColor,
          height: computed.height
        },
        footer: {
          backgroundColor: footerComputed ? footerComputed.backgroundColor : null
        }
      };
    });

    console.log(`  Divider: ${dividerInfo.divider.backgroundColor}`);
    console.log(`  Footer: ${dividerInfo.footer.backgroundColor}\n`);

    // Take full page screenshot
    const fullPath = path.join(screenshotsDir, `${viewport.name}-full-after.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`  ✅ Full page: ${fullPath}\n`);
  }

  await browser.close();
  console.log('✅ Verification complete!\n');
}

verifyFooterFix().catch(console.error);
