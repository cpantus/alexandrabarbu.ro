import { chromium } from 'playwright';

async function verifyFooterFix() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('=== FOOTER ALIGNMENT FIX VERIFICATION ===\n');

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

    // Get all footer section elements
    const sections = await page.locator('.c-footer-nav__section').evaluateAll(sections => {
      return sections.map(section => {
        const title = section.querySelector('.c-footer-nav__title, h5, h4');
        const socialIcons = section.querySelector('.c-footer-nav__social');
        const titleRect = title ? title.getBoundingClientRect() : null;
        const iconsRect = socialIcons ? socialIcons.getBoundingClientRect() : null;

        return {
          titleText: title ? title.textContent?.trim() : 'NO TITLE',
          isSocial: section.classList.contains('c-footer-nav__section--social'),
          titleTop: titleRect ? titleRect.top : null,
          iconsTop: iconsRect ? iconsRect.top : null,
          gap: iconsRect && titleRect ? iconsRect.top - titleRect.bottom : null
        };
      });
    });

    // Calculate alignment
    const nonSocialSections = sections.filter(s => !s.isSocial && s.titleTop !== null);
    const socialSection = sections.find(s => s.isSocial);

    if (socialSection && nonSocialSections.length > 0) {
      const avgTitleTop = nonSocialSections.reduce((sum, s) => sum + (s.titleTop || 0), 0) / nonSocialSections.length;
      const difference = socialSection.titleTop ? Math.abs(socialSection.titleTop - avgTitleTop) : 0;

      console.log('Title Alignment:');
      console.log(`  Average top (other titles): ${avgTitleTop.toFixed(2)}px`);
      console.log(`  Social title top: ${socialSection.titleTop?.toFixed(2)}px`);
      console.log(`  Difference: ${difference.toFixed(2)}px`);
      console.log(`  Status: ${difference <= 5 ? '✅ ALIGNED' : '❌ MISALIGNED'}`);

      if (socialSection.iconsTop && socialSection.titleTop) {
        console.log(`\nSocial Icons Position:`);
        console.log(`  Title bottom: ${socialSection.titleTop.toFixed(2)}px`);
        console.log(`  Icons top: ${socialSection.iconsTop.toFixed(2)}px`);
        console.log(`  Gap: ${socialSection.gap?.toFixed(2)}px`);
        console.log(`  Status: ${socialSection.gap && socialSection.gap > 30 ? '✅ PROPERLY SPACED' : '⚠️  MAY BE TOO CLOSE'}`);
      }
    }

    // Visual verification with highlights
    await page.evaluate(() => {
      const titles = document.querySelectorAll('.c-footer-nav__title');
      titles.forEach(title => {
        const parent = title.closest('.c-footer-nav__section');
        if (parent?.classList.contains('c-footer-nav__section--social')) {
          (title as HTMLElement).style.outline = '2px solid blue';
        } else {
          (title as HTMLElement).style.outline = '2px solid green';
        }
      });

      // Highlight social icons
      const socialIcons = document.querySelector('.c-footer-nav__social');
      if (socialIcons) {
        (socialIcons as HTMLElement).style.outline = '2px solid orange';
      }
    });

    const screenshotPath = `/home/cere/Work/alex/alexandrabarbu.ro/screenshots/footer-after-fix-${bp.name.toLowerCase()}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: false
    });
    console.log(`  Screenshot: ${screenshotPath}`);
  }

  await browser.close();
  console.log('\n=== FIX VERIFICATION COMPLETE ===');
}

verifyFooterFix().catch(console.error);
