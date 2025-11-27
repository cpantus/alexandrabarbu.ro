import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:1314';
const OUTPUT_DIR = 'screenshots/responsive-test-2025-11-25';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1200, height: 900 },
];

const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/despre-mine/', name: 'about' },
  { path: '/servicii/', name: 'services' },
  { path: '/contact/', name: 'contact' },
  { path: '/blog/', name: 'blog' },
  { path: '/en/', name: 'homepage-en' },
];

async function run() {
  const browser = await chromium.launch();
  const results: { page: string; viewport: string; status: string; issues: string[] }[] = [];

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();

    for (const testPage of PAGES) {
      const issues: string[] = [];
      const url = `${BASE_URL}${testPage.path}`;

      try {
        // Navigate and wait for network idle
        await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });

        // Check for console errors
        const consoleErrors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        // Check for horizontal overflow (indicates layout issues)
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        if (hasHorizontalOverflow) {
          issues.push('Horizontal overflow detected');
        }

        // Check for content cutoff (elements extending beyond viewport)
        const cutoffElements = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          const cutoffs: string[] = [];
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth + 5) {
              const tag = el.tagName.toLowerCase();
              const className = el.className?.toString().slice(0, 30) || '';
              cutoffs.push(`${tag}.${className}`);
            }
          });
          return [...new Set(cutoffs)].slice(0, 5);
        });
        if (cutoffElements.length > 0) {
          issues.push(`Elements extending beyond viewport: ${cutoffElements.join(', ')}`);
        }

        // Check for overlapping text (basic check)
        const hasVisibleContent = await page.evaluate(() => {
          const body = document.body;
          return body && body.innerText.length > 100;
        });
        if (!hasVisibleContent) {
          issues.push('Page appears empty or content not visible');
        }

        // Check header visibility
        const headerVisible = await page.locator('header, .header, .site-header').first().isVisible().catch(() => false);
        if (!headerVisible) {
          issues.push('Header not visible');
        }

        // Check footer visibility (scroll to bottom first)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
        const footerVisible = await page.locator('footer, .footer, .site-footer').first().isVisible().catch(() => false);
        if (!footerVisible) {
          issues.push('Footer not visible');
        }

        // Take screenshot
        const screenshotPath = `${OUTPUT_DIR}/${testPage.name}-${viewport.name}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: true });

        results.push({
          page: testPage.name,
          viewport: viewport.name,
          status: issues.length === 0 ? '✅ PASS' : '⚠️ ISSUES',
          issues,
        });

        if (consoleErrors.length > 0) {
          issues.push(`Console errors: ${consoleErrors.length}`);
        }

      } catch (error) {
        results.push({
          page: testPage.name,
          viewport: viewport.name,
          status: '❌ ERROR',
          issues: [(error as Error).message],
        });
      }
    }

    await context.close();
  }

  await browser.close();

  // Print results
  console.log('\n📊 RESPONSIVE TEST RESULTS');
  console.log('━'.repeat(60));

  let passCount = 0;
  let issueCount = 0;
  let errorCount = 0;

  for (const viewport of VIEWPORTS) {
    console.log(`\n📱 ${viewport.name.toUpperCase()} (${viewport.width}px)`);
    console.log('─'.repeat(40));

    const viewportResults = results.filter(r => r.viewport === viewport.name);
    for (const result of viewportResults) {
      console.log(`  ${result.status} ${result.page}`);
      if (result.issues.length > 0) {
        result.issues.forEach(issue => console.log(`      └─ ${issue}`));
      }

      if (result.status.includes('PASS')) passCount++;
      else if (result.status.includes('ISSUES')) issueCount++;
      else errorCount++;
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log(`SUMMARY: ${passCount} passed, ${issueCount} with issues, ${errorCount} errors`);
  console.log(`Screenshots saved to: ${OUTPUT_DIR}/`);
}

run().catch(console.error);
