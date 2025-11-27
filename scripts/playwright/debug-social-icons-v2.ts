import { chromium } from 'playwright';

async function debugSocialIconsV2() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();

  await page.goto('http://localhost:1313/contact/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Get all social items (li elements)
  const socialItems = await page.$$('.c-social__item');
  console.log('\n=== Social Items (.c-social__item) ===');
  for (let i = 0; i < socialItems.length; i++) {
    const item = socialItems[i];
    const box = await item.boundingBox();
    const styles = await item.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        margin: cs.margin,
        padding: cs.padding,
        width: cs.width,
        height: cs.height
      };
    });
    console.log(`Item ${i + 1}: x=${box?.x.toFixed(0)}, y=${box?.y.toFixed(0)}, w=${box?.width.toFixed(0)}, h=${box?.height.toFixed(0)}`);
    console.log(`  Styles: display=${styles.display}, margin=${styles.margin}`);
  }

  // Check each link's bounding box and computed width/height
  const socialLinks = await page.$$('.c-social__link');
  console.log('\n=== Social Links (.c-social__link) ===');
  for (let i = 0; i < socialLinks.length; i++) {
    const link = socialLinks[i];
    const box = await link.boundingBox();
    const styles = await link.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        width: cs.width,
        height: cs.height,
        minWidth: cs.minWidth,
        maxWidth: cs.maxWidth,
        padding: cs.padding,
        margin: cs.margin,
        boxSizing: cs.boxSizing,
        position: cs.position,
        top: cs.top,
        left: cs.left
      };
    });
    console.log(`Link ${i + 1}:`);
    console.log(`  Box: x=${box?.x.toFixed(0)}, y=${box?.y.toFixed(0)}, w=${box?.width.toFixed(0)}, h=${box?.height.toFixed(0)}`);
    console.log(`  Computed: width=${styles.width}, height=${styles.height}`);
    console.log(`  Padding: ${styles.padding}, Margin: ${styles.margin}`);
    console.log(`  Position: ${styles.position}, top=${styles.top}, left=${styles.left}`);
  }

  // Get the flex container's alignment
  const list = await page.$('.c-social__list');
  if (list) {
    const listStyles = await list.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        flexDirection: cs.flexDirection,
        flexWrap: cs.flexWrap,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        gap: cs.gap,
        columnGap: cs.columnGap,
        rowGap: cs.rowGap
      };
    });
    console.log('\n=== Flex Container (.c-social__list) ===');
    console.log(JSON.stringify(listStyles, null, 2));
  }

  // Check if there's something wrapping differently
  const socialBlock = await page.$('.c-social');
  if (socialBlock) {
    const html = await socialBlock.evaluate(el => el.outerHTML);
    console.log('\n=== HTML Structure ===');
    console.log(html.substring(0, 800));
  }

  await browser.close();
}

debugSocialIconsV2().catch(console.error);
