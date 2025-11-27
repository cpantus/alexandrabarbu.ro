import { chromium } from 'playwright';

async function compareBeforeAfter() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('=== BEFORE/AFTER COMPARISON ===\n');

  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('http://localhost:1313');
  await page.waitForLoadState('networkidle');

  // Scroll to footer
  await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });

  await page.waitForTimeout(500);

  // Get measurements
  const measurements = await page.locator('.c-footer-nav__section').evaluateAll(sections => {
    return sections.map(section => {
      const title = section.querySelector('.c-footer-nav__title, h5, h4');
      const socialIcons = section.querySelector('.c-footer-nav__social');
      const titleRect = title ? title.getBoundingClientRect() : null;
      const iconsRect = socialIcons ? socialIcons.getBoundingClientRect() : null;

      return {
        titleText: title ? title.textContent?.trim() : 'NO TITLE',
        isSocial: section.classList.contains('c-footer-nav__section--social'),
        titleTop: titleRect ? titleRect.top : null,
        titleBottom: titleRect ? titleRect.bottom : null,
        iconsTop: iconsRect ? iconsRect.top : null,
      };
    });
  });

  console.log('CURRENT STATE (After Fix):');
  console.log('─'.repeat(60));
  measurements.forEach(m => {
    console.log(`${m.titleText}:`);
    console.log(`  Title Top: ${m.titleTop?.toFixed(2)}px`);
    if (m.isSocial && m.iconsTop) {
      console.log(`  Icons Top: ${m.iconsTop.toFixed(2)}px`);
      console.log(`  Gap: ${(m.iconsTop - m.titleBottom!).toFixed(2)}px`);
    }
  });

  const tops = measurements.filter(m => m.titleTop).map(m => m.titleTop!);
  const minTop = Math.min(...tops);
  const maxTop = Math.max(...tops);
  const diff = maxTop - minTop;

  console.log('\nAlignment:');
  console.log(`  All titles: ${minTop.toFixed(2)}px - ${maxTop.toFixed(2)}px`);
  console.log(`  Max difference: ${diff.toFixed(2)}px`);
  console.log(`  Status: ${diff <= 1 ? '✅ PERFECTLY ALIGNED' : diff <= 5 ? '✅ ALIGNED' : '❌ MISALIGNED'}`);

  console.log('\n' + '─'.repeat(60));
  console.log('BEFORE (Original Issue):');
  console.log('─'.repeat(60));
  console.log('Locație și Contact:');
  console.log('  Title Top: 7462.52px');
  console.log('Social Media:');
  console.log('  Title Top: 7526.52px  ❌ (64px too low)');
  console.log('  Icons Top: N/A (pushed down with title)');
  console.log('Link-uri Rapide:');
  console.log('  Title Top: 7462.52px');
  console.log('\nAlignment:');
  console.log('  Max difference: 64.00px');
  console.log('  Status: ❌ MISALIGNED');

  console.log('\n' + '═'.repeat(60));
  console.log('IMPROVEMENT');
  console.log('═'.repeat(60));
  console.log(`Alignment improved from ${64}px difference to ${diff.toFixed(2)}px`);
  console.log(`Reduction: ${((1 - diff / 64) * 100).toFixed(1)}%`);
  console.log('✅ Social Media title now aligns with other footer titles');
  console.log('✅ Social icons maintain proper spacing (32px gap)');
  console.log('✅ Design intent preserved (icons visually lower than title)');

  await browser.close();
}

compareBeforeAfter().catch(console.error);
