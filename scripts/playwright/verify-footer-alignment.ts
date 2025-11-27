import { chromium } from 'playwright';

async function verifyFooterAlignment() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('=== FOOTER ALIGNMENT VERIFICATION ===\n');

  // Test at desktop breakpoint where issue is most visible
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('http://localhost:1313');
  await page.waitForLoadState('networkidle');

  console.log('Desktop (1200x800) - Footer Section Analysis\n');

  // Get all footer section elements
  const sections = await page.locator('.c-footer-nav__section').evaluateAll(sections => {
    return sections.map(section => {
      const title = section.querySelector('.c-footer-nav__title, h5, h4');
      const rect = section.getBoundingClientRect();
      const titleRect = title ? title.getBoundingClientRect() : null;
      const computedStyle = window.getComputedStyle(section);

      return {
        classes: section.className,
        isSocial: section.classList.contains('c-footer-nav__section--social'),
        isContact: section.classList.contains('c-footer-nav__section--contact'),
        sectionTop: rect.top,
        titleText: title ? title.textContent?.trim() : 'NO TITLE',
        titleTop: titleRect ? titleRect.top : null,
        marginTop: computedStyle.marginTop,
        paddingTop: computedStyle.paddingTop
      };
    });
  });

  console.log('Footer Sections Found:');
  sections.forEach((section, idx) => {
    console.log(`\n${idx + 1}. ${section.titleText}`);
    console.log(`   Classes: ${section.classes}`);
    console.log(`   Section Top: ${section.sectionTop.toFixed(2)}px`);
    console.log(`   Title Top: ${section.titleTop?.toFixed(2)}px`);
    console.log(`   Margin Top: ${section.marginTop}`);
    console.log(`   Padding Top: ${section.paddingTop}`);
  });

  // Calculate alignment
  const nonSocialSections = sections.filter(s => !s.isSocial && s.titleTop !== null);
  const socialSection = sections.find(s => s.isSocial);

  if (socialSection && nonSocialSections.length > 0) {
    const avgTitleTop = nonSocialSections.reduce((sum, s) => sum + (s.titleTop || 0), 0) / nonSocialSections.length;
    const difference = socialSection.titleTop ? Math.abs(socialSection.titleTop - avgTitleTop) : 0;

    console.log('\n=== ALIGNMENT ANALYSIS ===');
    console.log(`Average title top (non-social): ${avgTitleTop.toFixed(2)}px`);
    console.log(`Social title top: ${socialSection.titleTop?.toFixed(2)}px`);
    console.log(`Difference: ${difference.toFixed(2)}px`);
    console.log(`Status: ${difference > 5 ? '❌ MISALIGNED' : '✅ ALIGNED'}`);

    if (difference > 5) {
      console.log('\n⚠️  ISSUE DETECTED:');
      console.log(`   The "Social Media" title is ${difference.toFixed(2)}px lower than other titles.`);
      console.log(`   Root cause: margin-top on .c-footer-nav__section--social`);
    }
  }

  // Take screenshots
  await page.screenshot({
    path: '/home/cere/Work/alex/alexandrabarbu.ro/screenshots/footer-before-fix.png',
    fullPage: false
  });

  // Highlight the misalignment visually
  await page.evaluate(() => {
    const titles = document.querySelectorAll('.c-footer-nav__title');
    titles.forEach(title => {
      const parent = title.closest('.c-footer-nav__section');
      if (parent?.classList.contains('c-footer-nav__section--social')) {
        (title as HTMLElement).style.outline = '3px solid red';
      } else {
        (title as HTMLElement).style.outline = '3px solid green';
      }
    });
  });

  await page.screenshot({
    path: '/home/cere/Work/alex/alexandrabarbu.ro/screenshots/footer-alignment-highlighted.png',
    fullPage: false
  });

  await browser.close();
  console.log('\n=== VERIFICATION COMPLETE ===');
  console.log('Screenshots saved:');
  console.log('  - footer-before-fix.png');
  console.log('  - footer-alignment-highlighted.png');
}

verifyFooterAlignment().catch(console.error);
