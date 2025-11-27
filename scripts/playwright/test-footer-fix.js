const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testFooterFix() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'tmp', 'footer-fix');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🔍 Testing footer fix...\n');

  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 }
  ];

  const pages = ['/', '/en/'];

  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const pagePath of pages) {
      const url = `http://localhost:1313${pagePath}`;
      console.log(`  📄 Testing ${url}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle' });

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
          return {
            backgroundColor: computed.backgroundColor,
            height: computed.height,
            width: computed.width,
            marginBottom: computed.marginBottom
          };
        });

        console.log(`    Divider background: ${dividerInfo.backgroundColor}`);

        // Take screenshot of footer area
        const footerBox = await page.evaluate(() => {
          const footer = document.querySelector('footer');
          if (!footer) return null;

          const rect = footer.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          return {
            x: 0,
            y: Math.max(0, rect.top - 20),
            width: window.innerWidth,
            height: Math.min(250, viewportHeight - rect.top + 20)
          };
        });

        if (footerBox) {
          const screenshotPath = path.join(
            screenshotsDir,
            `${viewport.name}-${pagePath.replace(/\//g, '_')}-after.png`
          );
          await page.screenshot({ path: screenshotPath, clip: footerBox });
          console.log(`    ✅ Screenshot saved: ${screenshotPath}`);
        }

        // Take full page screenshot
        const fullPath = path.join(
          screenshotsDir,
          `${viewport.name}-${pagePath.replace(/\//g, '_')}-full-after.png`
        );
        await page.screenshot({ path: fullPath, fullPage: true });

      } catch (error) {
        console.log(`    ❌ Error: ${error.message}`);
      }
    }
  }

  await browser.close();
  console.log(`\n✅ Test complete. Screenshots saved to: ${screenshotsDir}`);
}

testFooterFix().catch(console.error);
