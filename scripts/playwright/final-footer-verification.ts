import { chromium } from 'playwright';

async function finalFooterVerification() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('=== FINAL FOOTER ALIGNMENT VERIFICATION ===\n');
  console.log('Goal: Verify "Social Media" title aligns with other footer column titles');
  console.log('      when they are in the same horizontal row.\n');

  const breakpoints = [
    { name: 'Mobile', width: 375, height: 667, columns: 1 },
    { name: 'Tablet', width: 768, height: 1024, columns: 2 },
    { name: 'Desktop', width: 1200, height: 800, columns: 4 }
  ];

  for (const bp of breakpoints) {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('http://localhost:1313');
    await page.waitForLoadState('networkidle');

    console.log(`\n${'='.repeat(60)}`);
    console.log(`${bp.name.toUpperCase()} (${bp.width}x${bp.height}) - ${bp.columns} columns`);
    console.log('='.repeat(60));

    // Get all footer navigation sections (excluding logo section)
    const sections = await page.locator('.c-footer-nav__section').evaluateAll(sections => {
      return sections.map(section => {
        const title = section.querySelector('.c-footer-nav__title, h5, h4');
        const titleRect = title ? title.getBoundingClientRect() : null;
        const socialIcons = section.querySelector('.c-footer-nav__social');
        const iconsRect = socialIcons ? socialIcons.getBoundingClientRect() : null;

        return {
          titleText: title ? title.textContent?.trim() : 'NO TITLE',
          isSocial: section.classList.contains('c-footer-nav__section--social'),
          titleTop: titleRect ? Math.round(titleRect.top * 100) / 100 : null,
          titleBottom: titleRect ? Math.round(titleRect.bottom * 100) / 100 : null,
          iconsTop: iconsRect ? Math.round(iconsRect.top * 100) / 100 : null,
        };
      });
    });

    console.log('\nFooter Sections:');
    sections.forEach((section, idx) => {
      console.log(`  ${idx + 1}. ${section.titleText}`);
      console.log(`     Title Top: ${section.titleTop}px`);
      if (section.isSocial && section.iconsTop) {
        console.log(`     Icons Top: ${section.iconsTop}px (gap: ${section.iconsTop - section.titleBottom!}px)`);
      }
    });

    // Group sections by row (tolerance of 5px for same row)
    const rows: typeof sections[][] = [];
    sections.forEach(section => {
      if (!section.titleTop) return;

      let foundRow = false;
      for (const row of rows) {
        if (Math.abs(row[0].titleTop! - section.titleTop) < 5) {
          row.push(section);
          foundRow = true;
          break;
        }
      }
      if (!foundRow) {
        rows.push([section]);
      }
    });

    console.log(`\nLayout Analysis:`);
    console.log(`  ${rows.length} row(s) detected`);
    rows.forEach((row, idx) => {
      console.log(`  Row ${idx + 1}: ${row.map(s => s.titleText).join(', ')}`);
    });

    // Check alignment within each row
    let allAligned = true;
    rows.forEach((row, idx) => {
      if (row.length > 1) {
        const tops = row.map(s => s.titleTop!);
        const minTop = Math.min(...tops);
        const maxTop = Math.max(...tops);
        const diff = maxTop - minTop;

        console.log(`\n  Row ${idx + 1} Alignment:`);
        console.log(`    Sections: ${row.map(s => s.titleText).join(', ')}`);
        console.log(`    Top range: ${minTop}px - ${maxTop}px`);
        console.log(`    Max difference: ${diff.toFixed(2)}px`);
        console.log(`    Status: ${diff <= 5 ? '✅ ALIGNED' : '❌ MISALIGNED'}`);

        if (diff > 5) allAligned = false;
      }
    });

    // Special check for social icons spacing
    const socialSection = sections.find(s => s.isSocial);
    if (socialSection && socialSection.iconsTop && socialSection.titleBottom) {
      const gap = socialSection.iconsTop - socialSection.titleBottom;
      console.log(`\n  Social Icons Spacing:`);
      console.log(`    Gap between title and icons: ${gap.toFixed(2)}px`);
      console.log(`    Status: ${gap >= 30 ? '✅ PROPERLY SPACED' : '⚠️  TOO CLOSE'}`);
    }

    // Take screenshot
    await page.evaluate(() => {
      const titles = document.querySelectorAll('.c-footer-nav__title');
      titles.forEach(title => {
        const parent = title.closest('.c-footer-nav__section');
        if (parent?.classList.contains('c-footer-nav__section--social')) {
          (title as HTMLElement).style.outline = '3px solid blue';
          (title as HTMLElement).style.outlineOffset = '2px';
        } else {
          (title as HTMLElement).style.outline = '3px solid green';
          (title as HTMLElement).style.outlineOffset = '2px';
        }
      });

      const socialIcons = document.querySelector('.c-footer-nav__social');
      if (socialIcons) {
        (socialIcons as HTMLElement).style.outline = '3px dashed orange';
        (socialIcons as HTMLElement).style.outlineOffset = '2px';
      }
    });

    const screenshotPath = `/home/cere/Work/alex/alexandrabarbu.ro/screenshots/footer-final-${bp.name.toLowerCase()}.png`;
    await page.screenshot({
      path: screenshotPath,
      fullPage: false
    });
    console.log(`\n  Screenshot: ${screenshotPath}`);

    console.log(`\n  Overall: ${allAligned ? '✅ ALL SECTIONS PROPERLY ALIGNED' : '❌ ALIGNMENT ISSUES DETECTED'}`);
  }

  await browser.close();
  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION COMPLETE');
  console.log('='.repeat(60));
}

finalFooterVerification().catch(console.error);
