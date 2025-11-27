import { chromium } from 'playwright';

async function debugSocialIconsMobile() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 } // iPhone 14 Pro viewport
  });
  const page = await context.newPage();

  await page.goto('http://localhost:1313/contact/', { waitUntil: 'networkidle' });

  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Get social section container styles
  const socialSection = await page.$('.c-footer-nav__section--social');
  if (socialSection) {
    const sectionStyles = await socialSection.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        flexDirection: cs.flexDirection,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        textAlign: cs.textAlign,
        width: cs.width
      };
    });
    console.log('\n=== .c-footer-nav__section--social ===');
    console.log(JSON.stringify(sectionStyles, null, 2));
  }

  // Get social wrapper styles
  const socialWrapper = await page.$('.c-footer-nav__social');
  if (socialWrapper) {
    const wrapperStyles = await socialWrapper.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        flexDirection: cs.flexDirection,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        textAlign: cs.textAlign,
        marginTop: cs.marginTop,
        width: cs.width
      };
    });
    console.log('\n=== .c-footer-nav__social ===');
    console.log(JSON.stringify(wrapperStyles, null, 2));
  }

  // Get c-social block styles
  const socialBlock = await page.$('.c-social');
  if (socialBlock) {
    const blockStyles = await socialBlock.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        width: cs.width,
        textAlign: cs.textAlign
      };
    });
    console.log('\n=== .c-social (block) ===');
    console.log(JSON.stringify(blockStyles, null, 2));
  }

  // Get social list styles
  const socialList = await page.$('.c-social__list');
  if (socialList) {
    const listStyles = await socialList.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        flexDirection: cs.flexDirection,
        flexWrap: cs.flexWrap,
        alignItems: cs.alignItems,
        justifyContent: cs.justifyContent,
        gap: cs.gap,
        width: cs.width,
        textAlign: cs.textAlign
      };
    });
    console.log('\n=== .c-social__list ===');
    console.log(JSON.stringify(listStyles, null, 2));
  }

  // Get individual social link positions
  const socialLinks = await page.$$('.c-social__link');
  console.log('\n=== Social Link Positions ===');
  for (let i = 0; i < socialLinks.length; i++) {
    const link = socialLinks[i];
    const box = await link.boundingBox();
    const styles = await link.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        width: cs.width,
        height: cs.height,
        display: cs.display
      };
    });
    console.log(`Link ${i + 1}: x=${box?.x.toFixed(0)}, y=${box?.y.toFixed(0)}, w=${styles.width}, h=${styles.height}`);
  }

  // Get title position for reference
  const title = await page.$('.c-footer-nav__section--social .c-footer-nav__title');
  if (title) {
    const titleBox = await title.boundingBox();
    const titleStyles = await title.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        textAlign: cs.textAlign,
        display: cs.display
      };
    });
    console.log('\n=== Social Media Title ===');
    console.log(`Title: x=${titleBox?.x.toFixed(0)}, textAlign=${titleStyles.textAlign}`);
  }

  // Calculate alignment analysis
  const firstLink = socialLinks[0];
  if (firstLink && title) {
    const linkBox = await firstLink.boundingBox();
    const titleBox = await title.boundingBox();
    const viewport = page.viewportSize();

    console.log('\n=== Alignment Analysis ===');
    console.log(`Viewport width: ${viewport?.width}px`);
    console.log(`Title left edge: ${titleBox?.x.toFixed(0)}px`);
    console.log(`First icon left edge: ${linkBox?.x.toFixed(0)}px`);
    console.log(`Icon group should start at: ${titleBox?.x.toFixed(0)}px (left-aligned with title)`);
    console.log(`Or center at: ${((viewport?.width || 0) / 2).toFixed(0)}px`);
  }

  // Screenshot
  await page.screenshot({
    path: '/home/cere/Work/alex/alexandrabarbu.ro/scripts/playwright/screenshots/social-icons-mobile.png',
    fullPage: false,
    clip: { x: 0, y: 300, width: 390, height: 600 }
  });
  console.log('\nScreenshot saved to scripts/playwright/screenshots/social-icons-mobile.png');

  await browser.close();
}

debugSocialIconsMobile().catch(console.error);
