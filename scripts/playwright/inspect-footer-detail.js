const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectFooterDetail() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'tmp', 'footer-inspection');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🔍 Detailed footer transition inspection...\n');

  await page.setViewportSize({ width: 1920, height: 1080 });

  const url = 'http://localhost:1313/';
  console.log(`📄 Navigating to ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });

  // Scroll to bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(500);

  // Get detailed structure around footer transition
  const transitionInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;

    // Get all elements leading to footer
    const body = document.body;
    const allSections = Array.from(body.children);
    const footerIndex = allSections.indexOf(footer);

    const getElementInfo = (el, label) => {
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      return {
        label,
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom
        },
        computedStyle: {
          marginTop: computed.marginTop,
          marginBottom: computed.marginBottom,
          paddingTop: computed.paddingTop,
          paddingBottom: computed.paddingBottom,
          backgroundColor: computed.backgroundColor,
          position: computed.position,
          display: computed.display,
          overflow: computed.overflow,
          borderBottom: computed.borderBottom
        },
        innerHTML: el.innerHTML.substring(0, 200) // First 200 chars
      };
    };

    const result = {
      footer: getElementInfo(footer, 'Footer'),
      beforeFooter: footerIndex > 0 ? getElementInfo(allSections[footerIndex - 1], 'Element Before Footer') : null,
      footerChildren: Array.from(footer.children).map((child, idx) =>
        getElementInfo(child, `Footer Child ${idx}`)
      )
    };

    // Check for any absolutely positioned elements near footer
    const allElements = Array.from(document.querySelectorAll('*'));
    result.absoluteElements = allElements
      .filter(el => {
        const style = window.getComputedStyle(el);
        return (style.position === 'absolute' || style.position === 'fixed') &&
               el.getBoundingClientRect().bottom > window.innerHeight - 200;
      })
      .map((el, idx) => getElementInfo(el, `Absolute Element ${idx}`));

    return result;
  });

  console.log('\n📊 Footer Transition Analysis:');
  console.log('================================\n');

  if (transitionInfo.beforeFooter) {
    console.log('Element Before Footer:');
    console.log(`  Tag: ${transitionInfo.beforeFooter.tagName}`);
    console.log(`  Class: ${transitionInfo.beforeFooter.className}`);
    console.log(`  Background: ${transitionInfo.beforeFooter.computedStyle.backgroundColor}`);
    console.log(`  Padding Bottom: ${transitionInfo.beforeFooter.computedStyle.paddingBottom}`);
    console.log(`  Margin Bottom: ${transitionInfo.beforeFooter.computedStyle.marginBottom}`);
    console.log(`  Bottom Position: ${transitionInfo.beforeFooter.rect.bottom}px`);
    console.log('');
  }

  if (transitionInfo.footer) {
    console.log('Footer:');
    console.log(`  Tag: ${transitionInfo.footer.tagName}`);
    console.log(`  Class: ${transitionInfo.footer.className}`);
    console.log(`  Background: ${transitionInfo.footer.computedStyle.backgroundColor}`);
    console.log(`  Padding Top: ${transitionInfo.footer.computedStyle.paddingTop}`);
    console.log(`  Margin Top: ${transitionInfo.footer.computedStyle.marginTop}`);
    console.log(`  Top Position: ${transitionInfo.footer.rect.top}px`);
    console.log('');

    if (transitionInfo.beforeFooter) {
      const gap = transitionInfo.footer.rect.top - transitionInfo.beforeFooter.rect.bottom;
      console.log(`⚠️  Gap between elements: ${gap}px`);
      if (Math.abs(gap) > 1) {
        console.log(`   ${gap > 0 ? 'SPACE' : 'OVERLAP'} DETECTED!\n`);
      }
    }
  }

  console.log('Footer Children:');
  transitionInfo.footerChildren.forEach((child, idx) => {
    console.log(`  Child ${idx}:`);
    console.log(`    Tag: ${child.tagName}`);
    console.log(`    Class: ${child.className}`);
    console.log(`    Background: ${child.computedStyle.backgroundColor}`);
    console.log(`    Margin Top: ${child.computedStyle.marginTop}`);
    console.log('');
  });

  if (transitionInfo.absoluteElements.length > 0) {
    console.log('Absolutely Positioned Elements Near Footer:');
    transitionInfo.absoluteElements.forEach((el, idx) => {
      console.log(`  Element ${idx}:`);
      console.log(`    Tag: ${el.tagName}`);
      console.log(`    Class: ${el.className}`);
      console.log(`    Position: ${el.computedStyle.position}`);
      console.log('');
    });
  }

  // Save detailed info
  fs.writeFileSync(
    path.join(screenshotsDir, 'footer-transition-detail.json'),
    JSON.stringify(transitionInfo, null, 2)
  );

  // Take zoomed screenshot of transition area
  const transitionBox = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return null;

    const rect = footer.getBoundingClientRect();
    // Capture area from 100px above footer to 100px into footer
    return {
      x: 0,
      y: Math.max(0, rect.top - 100),
      width: window.innerWidth,
      height: 200
    };
  });

  if (transitionBox) {
    await page.screenshot({
      path: path.join(screenshotsDir, 'footer-transition-zoomed.png'),
      clip: transitionBox
    });
    console.log('✅ Zoomed transition screenshot saved');
  }

  await browser.close();
  console.log('\n✅ Detailed inspection complete');
}

inspectFooterDetail().catch(console.error);
