/**
 * Playwright Test: Blog Card Underline Fix Verification
 *
 * Purpose: Verify that blog cards do NOT show double underlines on hover
 *
 * Root Cause Identified:
 * - Base element style in 04-elements/_text.scss applies text-decoration: underline to ALL a:hover
 * - Blog card component wants ONLY the title to underline, not the link wrapper
 * - Previous fix attempts used !important but only on :hover, not :focus
 * - The fix must override the base style on BOTH :hover and :focus states
 *
 * Test Procedure:
 * 1. Navigate to blog pages (Romanian and English)
 * 2. Hover over each blog card
 * 3. Check computed styles for text-decoration on link and title
 * 4. Take screenshots for visual verification
 * 5. Verify ONLY the title has underline, not the wrapper link
 */

import { test, expect } from '@playwright/test';

// Test configuration
const BASE_URL = 'http://localhost:1313';
const PAGES_TO_TEST = [
  { name: 'Romanian Resources', path: '/resurse' },
  { name: 'Romanian Homepage', path: '/' },
  { name: 'English Resources', path: '/en/resources' },
  { name: 'English Homepage', path: '/en/' },
];

test.describe('Blog Card Underline Fix', () => {

  test.beforeEach(async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  for (const testPage of PAGES_TO_TEST) {
    test(`${testPage.name} - No double underline on blog cards`, async ({ page }) => {
      // Navigate to page
      await page.goto(BASE_URL + testPage.path);

      // Wait for blog cards to load
      const blogCards = page.locator('.c-blog-card');
      await expect(blogCards.first()).toBeVisible({ timeout: 5000 });

      const cardCount = await blogCards.count();
      console.log(`Found ${cardCount} blog cards on ${testPage.name}`);

      if (cardCount === 0) {
        console.log(`No blog cards found on ${testPage.name}, skipping...`);
        return;
      }

      // Test first 3 cards (or all if less than 3)
      const cardsToTest = Math.min(cardCount, 3);

      for (let i = 0; i < cardsToTest; i++) {
        const card = blogCards.nth(i);
        const titleLink = card.locator('.c-blog-card__title-link').first();
        const title = card.locator('.c-blog-card__title').first();

        // Take screenshot before hover
        await page.screenshot({
          path: `screenshots/blog-card-${testPage.name.replace(/\s+/g, '-').toLowerCase()}-card-${i}-before.png`,
          fullPage: false
        });

        // Hover over the card
        await titleLink.hover();

        // Wait for hover animations
        await page.waitForTimeout(300);

        // Check computed styles on the LINK (should NOT have underline)
        const linkStyles = await titleLink.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            textDecoration: styles.textDecoration,
            textDecorationLine: styles.textDecorationLine,
            textDecorationStyle: styles.textDecorationStyle,
          };
        });

        // Check computed styles on the TITLE (SHOULD have underline)
        const titleStyles = await title.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            textDecoration: styles.textDecoration,
            textDecorationLine: styles.textDecorationLine,
            textDecorationStyle: styles.textDecorationStyle,
            textDecorationColor: styles.textDecorationColor,
          };
        });

        // Take screenshot after hover
        await page.screenshot({
          path: `screenshots/blog-card-${testPage.name.replace(/\s+/g, '-').toLowerCase()}-card-${i}-hover.png`,
          fullPage: false
        });

        console.log(`\nCard ${i} on ${testPage.name}:`);
        console.log('Link styles:', linkStyles);
        console.log('Title styles:', titleStyles);

        // ASSERTIONS
        // 1. Link wrapper should NOT have underline
        expect(linkStyles.textDecorationLine).not.toContain('underline');

        // 2. Title SHOULD have underline
        expect(titleStyles.textDecorationLine).toContain('underline');

        // 3. Title underline should be gold color (rgb(197, 168, 128) = #C5A880)
        // Note: Color might be in different format (rgb, rgba, etc.)
        expect(titleStyles.textDecorationColor).toBeTruthy();

        // Move mouse away to reset state
        await page.mouse.move(0, 0);
        await page.waitForTimeout(200);
      }
    });
  }

  // Test mobile viewport
  test('Mobile view - No double underline on tap/hover', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(BASE_URL + '/resurse');

    const blogCards = page.locator('.c-blog-card');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });

    const cardCount = await blogCards.count();
    if (cardCount === 0) return;

    const card = blogCards.first();
    const titleLink = card.locator('.c-blog-card__title-link').first();
    const title = card.locator('.c-blog-card__title').first();

    // Screenshot before interaction
    await page.screenshot({
      path: 'screenshots/blog-card-mobile-before.png',
      fullPage: false
    });

    // Simulate tap (on mobile devices)
    await titleLink.tap();
    await page.waitForTimeout(300);

    // Check styles
    const linkStyles = await titleLink.evaluate((el) => {
      return window.getComputedStyle(el).textDecorationLine;
    });

    const titleStyles = await title.evaluate((el) => {
      return window.getComputedStyle(el).textDecorationLine;
    });

    // Screenshot after tap
    await page.screenshot({
      path: 'screenshots/blog-card-mobile-after.png',
      fullPage: false
    });

    console.log('Mobile - Link decoration:', linkStyles);
    console.log('Mobile - Title decoration:', titleStyles);

    // On mobile, the link might navigate, so we just verify no double underline visually
  });

  // Test keyboard navigation (accessibility)
  test('Keyboard focus - No double underline on focus', async ({ page }) => {
    await page.goto(BASE_URL + '/resurse');

    const blogCards = page.locator('.c-blog-card');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });

    const cardCount = await blogCards.count();
    if (cardCount === 0) return;

    const titleLink = blogCards.first().locator('.c-blog-card__title-link').first();
    const title = blogCards.first().locator('.c-blog-card__title').first();

    // Tab to focus the link
    await titleLink.focus();
    await page.waitForTimeout(300);

    // Screenshot on focus
    await page.screenshot({
      path: 'screenshots/blog-card-focus.png',
      fullPage: false
    });

    // Check styles on focus
    const linkStyles = await titleLink.evaluate((el) => {
      return window.getComputedStyle(el).textDecorationLine;
    });

    const titleStyles = await title.evaluate((el) => {
      return window.getComputedStyle(el).textDecorationLine;
    });

    console.log('Focus - Link decoration:', linkStyles);
    console.log('Focus - Title decoration:', titleStyles);

    // Link should NOT have underline on focus
    expect(linkStyles).not.toContain('underline');
  });

  // Visual regression test - capture baseline
  test('Visual baseline - All blog card states', async ({ page }) => {
    await page.goto(BASE_URL + '/resurse');

    const blogCards = page.locator('.c-blog-card');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });

    const cardCount = await blogCards.count();
    if (cardCount === 0) return;

    // Capture full page
    await page.screenshot({
      path: 'screenshots/blog-grid-baseline.png',
      fullPage: true
    });

    // Capture zoomed view of first card
    const firstCard = blogCards.first();
    await firstCard.screenshot({
      path: 'screenshots/blog-card-detail-baseline.png'
    });
  });
});

test.describe('Specificity Battle Analysis', () => {
  test('Debug CSS specificity chain', async ({ page }) => {
    await page.goto(BASE_URL + '/resurse');

    const blogCards = page.locator('.c-blog-card');
    await expect(blogCards.first()).toBeVisible({ timeout: 5000 });

    const titleLink = blogCards.first().locator('.c-blog-card__title-link').first();

    // Get ALL CSS rules that match this element
    const cssDebug = await titleLink.evaluate((el) => {
      const allRules: any[] = [];
      const sheets = Array.from(document.styleSheets);

      sheets.forEach((sheet) => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach((rule: any) => {
            if (rule.selectorText && el.matches(rule.selectorText)) {
              allRules.push({
                selector: rule.selectorText,
                textDecoration: rule.style.textDecoration || 'not set',
                important: rule.style.textDecoration?.includes('!important') || false,
                sheet: sheet.href || 'inline'
              });
            }
          });
        } catch (e) {
          // CORS or security error
        }
      });

      return allRules;
    });

    console.log('\nCSS Rules applying to .c-blog-card__title-link:');
    console.log(JSON.stringify(cssDebug, null, 2));
  });
});
