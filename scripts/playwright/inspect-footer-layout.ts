import { chromium } from 'playwright';

async function inspectFooterLayout() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('=== FOOTER LAYOUT INSPECTION ===\n');

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

    const layout = await page.locator('.c-footer__content').evaluate(content => {
      const computedStyle = window.getComputedStyle(content);
      return {
        display: computedStyle.display,
        gridTemplateColumns: computedStyle.gridTemplateColumns,
        gap: computedStyle.gap
      };
    });

    console.log('Footer Layout:');
    console.log(`  Display: ${layout.display}`);
    console.log(`  Grid Columns: ${layout.gridTemplateColumns}`);
    console.log(`  Gap: ${layout.gap}`);

    // Check section order and position
    const sectionOrder = await page.locator('.c-footer-nav__section').evaluateAll(sections => {
      return sections.map((section, idx) => {
        const title = section.querySelector('.c-footer-nav__title, h5, h4');
        const rect = section.getBoundingClientRect();
        return {
          index: idx,
          titleText: title ? title.textContent?.trim() : 'NO TITLE',
          classes: section.className,
          top: rect.top,
          left: rect.left,
          width: rect.width
        };
      });
    });

    console.log('\nSection Order:');
    sectionOrder.forEach(section => {
      console.log(`  ${section.index + 1}. ${section.titleText}`);
      console.log(`     Position: top=${section.top.toFixed(2)}px, left=${section.left.toFixed(2)}px`);
      console.log(`     Width: ${section.width.toFixed(2)}px`);
    });
  }

  await browser.close();
  console.log('\n=== LAYOUT INSPECTION COMPLETE ===');
}

inspectFooterLayout().catch(console.error);
