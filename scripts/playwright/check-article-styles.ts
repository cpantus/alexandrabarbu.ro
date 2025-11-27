import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/resurse/articole/tehnici-gestionare-anxietate/', {
    waitUntil: 'networkidle'
  });

  // Take full page screenshot
  await page.screenshot({
    path: '/tmp/article-styles.png',
    fullPage: true
  });

  // Check for notice styling
  const notices = await page.locator('.notice').all();
  console.log(`Found ${notices.length} notices`);

  // Check notice-info styles
  const infoNotice = await page.locator('.notice.notice-info').first();
  if (await infoNotice.count() > 0) {
    const styles = await infoNotice.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        background: cs.background,
        borderLeft: cs.borderLeft,
        padding: cs.padding,
        borderRadius: cs.borderRadius
      };
    });
    console.log('\nNotice-info computed styles:');
    console.log(JSON.stringify(styles, null, 2));
  }

  // Check c-article wrapper
  const article = await page.locator('.c-article').first();
  if (await article.count() > 0) {
    const articleStyles = await article.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        color: cs.color
      };
    });
    console.log('\nArticle wrapper computed styles:');
    console.log(JSON.stringify(articleStyles, null, 2));
  }

  // Check blockquote
  const blockquote = await page.locator('blockquote').first();
  if (await blockquote.count() > 0) {
    const bqStyles = await blockquote.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        borderLeft: cs.borderLeft,
        background: cs.background,
        padding: cs.padding
      };
    });
    console.log('\nBlockquote computed styles:');
    console.log(JSON.stringify(bqStyles, null, 2));
  }

  // Check table
  const table = await page.locator('table').first();
  if (await table.count() > 0) {
    const tableStyles = await table.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        width: cs.width,
        borderCollapse: cs.borderCollapse
      };
    });
    console.log('\nTable computed styles:');
    console.log(JSON.stringify(tableStyles, null, 2));
  }

  await browser.close();
  console.log('\nScreenshot saved to /tmp/article-styles.png');
})();
