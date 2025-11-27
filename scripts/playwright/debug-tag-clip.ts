import { chromium } from 'playwright';

async function debugTagClip() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/resurse/articole/tehnici-gestionare-anxietate/');
  await page.waitForLoadState('networkidle');

  // Find the categories section (last taxonomy section)
  const categoriesSection = await page.$('.c-article__categories');
  if (!categoriesSection) {
    console.log('ERROR: Categories section not found');
    await browser.close();
    return;
  }

  // Get categories section bounding box
  const catBox = await categoriesSection.boundingBox();
  console.log('\n=== Categories Section Bounding Box ===');
  console.log(`Top: ${catBox?.y}, Bottom: ${(catBox?.y || 0) + (catBox?.height || 0)}`);
  console.log(`Height: ${catBox?.height}`);

  // Find the category tag
  const categoryTag = await page.$('.c-article__categories .c-tag');
  if (categoryTag) {
    const tagBox = await categoryTag.boundingBox();
    console.log('\n=== Category Tag Bounding Box ===');
    console.log(`Top: ${tagBox?.y}, Bottom: ${(tagBox?.y || 0) + (tagBox?.height || 0)}`);
    console.log(`Height: ${tagBox?.height}`);

    // Get computed styles
    const styles = await categoryTag.evaluate(el => {
      const cs = window.getComputedStyle(el);
      return {
        border: cs.border,
        borderBottom: cs.borderBottom,
        boxShadow: cs.boxShadow,
        margin: cs.margin,
        marginBottom: cs.marginBottom
      };
    });
    console.log('\n=== Category Tag Computed Styles ===');
    console.log(styles);
  }

  // Check all ancestors for overflow
  console.log('\n=== Checking Ancestors for overflow:hidden ===');
  const ancestors = await page.$$eval('.c-article__categories', elements => {
    const results: string[] = [];
    let el = elements[0]?.parentElement;
    while (el) {
      const cs = window.getComputedStyle(el);
      const overflow = cs.overflow;
      const overflowY = cs.overflowY;
      const tagName = el.tagName.toLowerCase();
      const classes = el.className;
      if (overflow === 'hidden' || overflowY === 'hidden') {
        results.push(`FOUND: <${tagName} class="${classes}"> has overflow: ${overflow}, overflow-y: ${overflowY}`);
      }
      el = el.parentElement;
    }
    return results;
  });

  if (ancestors.length === 0) {
    console.log('No ancestor with overflow:hidden found');
  } else {
    ancestors.forEach(a => console.log(a));
  }

  // Check the next sibling (related articles section)
  const nextSection = await page.$('.c-article__categories ~ section, section.bg-cream-50');
  if (nextSection) {
    const nextBox = await nextSection.boundingBox();
    console.log('\n=== Next Section (Related Articles) ===');
    console.log(`Top: ${nextBox?.y}`);
    console.log(`Gap from categories bottom to next section: ${(nextBox?.y || 0) - ((catBox?.y || 0) + (catBox?.height || 0))}px`);
  }

  // Check the parent section's padding-bottom
  const parentSection = await page.$('section.section:has(.c-article__categories)');
  if (parentSection) {
    const sectionBox = await parentSection.boundingBox();
    const sectionStyles = await parentSection.evaluate(el => {
      const cs = window.getComputedStyle(el);
      return {
        paddingBottom: cs.paddingBottom,
        overflow: cs.overflow,
        height: cs.height
      };
    });
    console.log('\n=== Parent Section (contains categories) ===');
    console.log(`Section bottom: ${(sectionBox?.y || 0) + (sectionBox?.height || 0)}`);
    console.log(`Styles:`, sectionStyles);

    // Check if categories extend beyond section
    const catBottom = (catBox?.y || 0) + (catBox?.height || 0);
    const sectionBottom = (sectionBox?.y || 0) + (sectionBox?.height || 0);
    console.log(`\nCategories bottom: ${catBottom}`);
    console.log(`Section bottom: ${sectionBottom}`);
    console.log(`Difference (positive = clipped): ${catBottom - sectionBottom}`);
  }

  // Check the col-lg-8 container
  const colContainer = await page.$('.col-lg-8:has(.c-article__categories)');
  if (colContainer) {
    const colStyles = await colContainer.evaluate(el => {
      const cs = window.getComputedStyle(el);
      return {
        overflow: cs.overflow,
        paddingBottom: cs.paddingBottom,
        marginBottom: cs.marginBottom
      };
    });
    console.log('\n=== col-lg-8 Container ===');
    console.log(colStyles);
  }

  // Take a screenshot of the area
  await page.screenshot({
    path: '/home/cere/Work/alex/alexandrabarbu.ro/scripts/playwright/debug-tag-clip.png',
    fullPage: false,
    clip: {
      x: (catBox?.x || 0) - 50,
      y: (catBox?.y || 0) - 50,
      width: (catBox?.width || 400) + 100,
      height: (catBox?.height || 100) + 200
    }
  });
  console.log('\nScreenshot saved to debug-tag-clip.png');

  await browser.close();
}

debugTagClip().catch(console.error);
