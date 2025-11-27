const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectDivider() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'tmp', 'footer-inspection');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🔍 Inspecting footer divider...\n');

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });

  // Scroll to footer
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(500);

  // Get info about the divider element
  const dividerInfo = await page.evaluate(() => {
    const divider = document.querySelector('.c-footer__divider');
    if (!divider) return null;

    const computed = window.getComputedStyle(divider);
    const rect = divider.getBoundingClientRect();
    const parent = divider.parentElement;
    const parentComputed = parent ? window.getComputedStyle(parent) : null;

    return {
      divider: {
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        },
        computed: {
          width: computed.width,
          height: computed.height,
          backgroundColor: computed.backgroundColor,
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom,
          position: computed.position,
          display: computed.display
        }
      },
      parent: parent ? {
        tag: parent.tagName,
        className: parent.className,
        paddingTop: parentComputed.paddingTop,
        backgroundColor: parentComputed.backgroundColor
      } : null
    };
  });

  console.log('Divider Info:');
  console.log(JSON.stringify(dividerInfo, null, 2));

  // Take zoomed screenshot of just the top of the footer including the divider
  const footerTop = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;

    const rect = footer.getBoundingClientRect();
    return {
      x: 0,
      y: Math.max(0, rect.top - 5), // Start 5px above footer
      width: window.innerWidth,
      height: 150 // Capture first 150px of footer
    };
  });

  if (footerTop) {
    await page.screenshot({
      path: path.join(screenshotsDir, 'footer-top-divider.png'),
      clip: footerTop
    });
    console.log('\n✅ Footer top screenshot saved');
  }

  // Highlight the divider element for visual debugging
  await page.evaluate(() => {
    const divider = document.querySelector('.c-footer__divider');
    if (divider) {
      divider.style.backgroundColor = 'red';
      divider.style.height = '5px';
    }
  });

  if (footerTop) {
    await page.screenshot({
      path: path.join(screenshotsDir, 'footer-top-divider-highlighted.png'),
      clip: footerTop
    });
    console.log('✅ Highlighted divider screenshot saved\n');
  }

  await browser.close();
}

inspectDivider().catch(console.error);
