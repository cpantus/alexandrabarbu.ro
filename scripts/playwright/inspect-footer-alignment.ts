import { chromium } from 'playwright';

async function inspectFooterAlignment() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('=== FOOTER ALIGNMENT INSPECTION ===\n');

  // Test at multiple breakpoints
  const breakpoints = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1200, height: 800 }
  ];

  for (const bp of breakpoints) {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('http://localhost:1313');
    await page.waitForLoadState('networkidle');

    console.log(`\n--- ${bp.name} (${bp.width}x${bp.height}) ---`);

    // Get all footer column titles
    const footerTitles = await page.locator('footer h5, footer .h5').evaluateAll(titles => {
      return titles.map(title => {
        const rect = title.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(title);
        return {
          text: title.textContent?.trim(),
          top: rect.top,
          left: rect.left,
          marginTop: computedStyle.marginTop,
          marginBottom: computedStyle.marginBottom,
          paddingTop: computedStyle.paddingTop,
          paddingBottom: computedStyle.paddingBottom,
          className: title.className,
          tagName: title.tagName
        };
      });
    });

    console.log('Footer Title Positions:');
    footerTitles.forEach((title, idx) => {
      console.log(`  ${idx + 1}. "${title.text}"`);
      console.log(`     Top: ${title.top.toFixed(2)}px`);
      console.log(`     Margin: ${title.marginTop} / ${title.marginBottom}`);
      console.log(`     Padding: ${title.paddingTop} / ${title.paddingBottom}`);
      console.log(`     Classes: ${title.className}`);
      console.log(`     Tag: ${title.tagName}`);
    });

    // Check if "Social Media" title is misaligned
    const socialMediaTitle = footerTitles.find(t => t.text?.includes('Social'));
    const otherTitles = footerTitles.filter(t => !t.text?.includes('Social'));

    if (socialMediaTitle && otherTitles.length > 0) {
      const avgTop = otherTitles.reduce((sum, t) => sum + t.top, 0) / otherTitles.length;
      const difference = Math.abs(socialMediaTitle.top - avgTop);

      console.log(`\nAlignment Analysis:`);
      console.log(`  Average top position (other titles): ${avgTop.toFixed(2)}px`);
      console.log(`  "Social Media" top position: ${socialMediaTitle.top.toFixed(2)}px`);
      console.log(`  Difference: ${difference.toFixed(2)}px`);
      console.log(`  Status: ${difference > 5 ? '❌ MISALIGNED' : '✅ ALIGNED'}`);
    }

    // Get HTML structure of social media section
    const socialMediaHTML = await page.locator('footer').evaluate(footer => {
      const socialSection = Array.from(footer.querySelectorAll('h5, .h5'))
        .find(h => h.textContent?.includes('Social'));

      if (socialSection) {
        const parent = socialSection.parentElement;
        return {
          sectionHTML: parent?.outerHTML.substring(0, 500),
          parentClass: parent?.className,
          parentTag: parent?.tagName
        };
      }
      return null;
    });

    if (socialMediaHTML) {
      console.log(`\nSocial Media Section Structure:`);
      console.log(`  Parent Tag: ${socialMediaHTML.parentTag}`);
      console.log(`  Parent Classes: ${socialMediaHTML.parentClass}`);
      console.log(`  HTML Preview: ${socialMediaHTML.sectionHTML}...`);
    }

    // Screenshot
    const screenshotPath = `/home/cere/Work/alex/alexandrabarbu.ro/screenshots/footer-alignment-${bp.name.toLowerCase()}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: false
    });
    console.log(`  Screenshot: ${screenshotPath}`);
  }

  await browser.close();
  console.log('\n=== INSPECTION COMPLETE ===');
}

inspectFooterAlignment().catch(console.error);
