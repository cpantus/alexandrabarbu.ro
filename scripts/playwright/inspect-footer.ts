import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function inspectFooter() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'tmp', 'footer-inspection');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🔍 Starting footer inspection...\n');

  const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 }
  ];

  const pages = ['/', '/en/', '/contact/', '/en/contact/'];

  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const pagePath of pages) {
      const url = `http://localhost:1313${pagePath}`;
      console.log(`  📄 Navigating to ${url}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle' });

        // Scroll to footer
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForTimeout(500);

        // Take screenshot of footer area
        const footer = await page.locator('footer');
        if (await footer.count() > 0) {
          const screenshotPath = path.join(
            screenshotsDir,
            `${viewport.name}-${pagePath.replace(/\//g, '_')}-footer.png`
          );
          await footer.screenshot({ path: screenshotPath });
          console.log(`    ✅ Screenshot saved: ${screenshotPath}`);

          // Get footer structure and styles
          const footerInfo = await page.evaluate(() => {
            const footer = document.querySelector('footer');
            if (!footer) return null;

            const computedStyle = window.getComputedStyle(footer);
            const rect = footer.getBoundingClientRect();

            // Get previous sibling
            const previousSibling = footer.previousElementSibling;
            const prevSiblingInfo = previousSibling ? {
              tagName: previousSibling.tagName,
              className: previousSibling.className,
              computedStyle: {
                marginBottom: window.getComputedStyle(previousSibling).marginBottom,
                paddingBottom: window.getComputedStyle(previousSibling).paddingBottom,
                backgroundColor: window.getComputedStyle(previousSibling).backgroundColor,
                position: window.getComputedStyle(previousSibling).position
              },
              rect: previousSibling.getBoundingClientRect()
            } : null;

            // Get footer children
            const children = Array.from(footer.children).map(child => ({
              tagName: child.tagName,
              className: child.className,
              computedStyle: {
                marginTop: window.getComputedStyle(child).marginTop,
                paddingTop: window.getComputedStyle(child).paddingTop,
                backgroundColor: window.getComputedStyle(child).backgroundColor,
                position: window.getComputedStyle(child).position
              }
            }));

            return {
              tagName: footer.tagName,
              className: footer.className,
              rect: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
              },
              computedStyle: {
                marginTop: computedStyle.marginTop,
                marginBottom: computedStyle.marginBottom,
                paddingTop: computedStyle.paddingTop,
                paddingBottom: computedStyle.paddingBottom,
                backgroundColor: computedStyle.backgroundColor,
                position: computedStyle.position,
                zIndex: computedStyle.zIndex
              },
              previousSibling: prevSiblingInfo,
              children
            };
          });

          if (footerInfo) {
            console.log(`    📊 Footer Info:`);
            console.log(`       - Background: ${footerInfo.computedStyle.backgroundColor}`);
            console.log(`       - Margin Top: ${footerInfo.computedStyle.marginTop}`);
            console.log(`       - Padding Top: ${footerInfo.computedStyle.paddingTop}`);
            console.log(`       - Position: ${footerInfo.computedStyle.position}`);

            if (footerInfo.previousSibling) {
              console.log(`    📊 Previous Element (${footerInfo.previousSibling.tagName}.${footerInfo.previousSibling.className}):`);
              console.log(`       - Background: ${footerInfo.previousSibling.computedStyle.backgroundColor}`);
              console.log(`       - Margin Bottom: ${footerInfo.previousSibling.computedStyle.marginBottom}`);
              console.log(`       - Padding Bottom: ${footerInfo.previousSibling.computedStyle.paddingBottom}`);
              console.log(`       - Position: ${footerInfo.previousSibling.computedStyle.position}`);

              // Check for gap
              const gap = footerInfo.rect.top - (footerInfo.previousSibling.rect.top + footerInfo.previousSibling.rect.height);
              console.log(`       - Gap between elements: ${gap}px`);
              if (Math.abs(gap) > 1) {
                console.log(`       ⚠️  Potential issue: ${gap > 0 ? 'Space' : 'Overlap'} detected`);
              }
            }

            // Save detailed info to JSON
            const jsonPath = path.join(
              screenshotsDir,
              `${viewport.name}-${pagePath.replace(/\//g, '_')}-footer-info.json`
            );
            fs.writeFileSync(jsonPath, JSON.stringify(footerInfo, null, 2));
          }
        }

        // Take full page screenshot showing context
        const fullScreenshotPath = path.join(
          screenshotsDir,
          `${viewport.name}-${pagePath.replace(/\//g, '_')}-full.png`
        );
        await page.screenshot({ path: fullScreenshotPath, fullPage: true });
        console.log(`    ✅ Full page screenshot saved: ${fullScreenshotPath}`);

      } catch (error) {
        console.log(`    ❌ Error: ${error.message}`);
      }
    }
  }

  await browser.close();
  console.log(`\n✅ Inspection complete. Screenshots saved to: ${screenshotsDir}`);
}

inspectFooter().catch(console.error);
