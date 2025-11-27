/**
 * Playwright Test Script: Blog Card Styling Fixes Verification
 *
 * Tests for:
 * 1. Single underline on title hover (no double underline)
 * 2. Gold (#D4AF37) underline color
 * 3. Text-only CTA with hover effect (no pill/button styling)
 *
 * Usage:
 *   npx playwright test scripts/playwright/test-blog-card-fixes.ts
 *
 * Or run with MCP Playwright server via Claude Code
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:1313';

test.describe('Blog Card Styling Fixes', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to a page with blog cards (Romanian resources page)
    await page.goto(`${BASE_URL}/resurse/`);
    await page.waitForLoadState('networkidle');
  });

  test('should display blog cards on resources page', async ({ page }) => {
    const blogCards = page.locator('.c-blog-card');
    const count = await blogCards.count();

    console.log(`Found ${count} blog cards on the page`);
    expect(count).toBeGreaterThan(0);
  });

  test('Fix #1: Title should have SINGLE underline on hover (not double)', async ({ page }) => {
    const titleLink = page.locator('.c-blog-card__title-link').first();
    const title = titleLink.locator('.c-blog-card__title');

    // Take screenshot before hover
    await page.screenshot({
      path: 'screenshots/blog-card-before-hover.png',
      fullPage: false
    });

    // Hover over the title link
    await titleLink.hover();

    // Wait for hover effect
    await page.waitForTimeout(300);

    // Take screenshot during hover
    await page.screenshot({
      path: 'screenshots/blog-card-title-hover.png',
      fullPage: false
    });

    // Check title link has NO underline (prevents double underline)
    const linkTextDecoration = await titleLink.evaluate((el) => {
      return window.getComputedStyle(el).textDecoration;
    });
    console.log('Title link text-decoration:', linkTextDecoration);
    expect(linkTextDecoration).toContain('none');

    // Check title heading HAS underline
    const titleTextDecoration = await title.evaluate((el) => {
      return window.getComputedStyle(el).textDecoration;
    });
    console.log('Title heading text-decoration:', titleTextDecoration);
    expect(titleTextDecoration).toContain('underline');

    // Verify only ONE underline style is applied
    // If there were two underlines, we'd see multiple "underline" keywords
    const underlineCount = (titleTextDecoration.match(/underline/g) || []).length;
    expect(underlineCount).toBe(1);
  });

  test('Fix #2: Title underline should be GOLD (#D4AF37)', async ({ page }) => {
    const titleLink = page.locator('.c-blog-card__title-link').first();
    const title = titleLink.locator('.c-blog-card__title');

    // Hover to trigger underline
    await titleLink.hover();
    await page.waitForTimeout(300);

    // Get underline color
    const underlineColor = await title.evaluate((el) => {
      const style = window.getComputedStyle(el);
      const color = style.textDecorationColor || style.getPropertyValue('text-decoration-color');
      return color;
    });

    console.log('Underline color:', underlineColor);

    // Convert #D4AF37 to rgb for comparison (browsers return rgb format)
    // #D4AF37 = rgb(212, 175, 55)
    const expectedRgb = 'rgb(212, 175, 55)';
    expect(underlineColor).toBe(expectedRgb);
  });

  test('Fix #3: Read More CTA should be TEXT-ONLY (no button styling)', async ({ page }) => {
    const readMoreLink = page.locator('.c-blog-card__read-more').first();

    // Verify element exists and is visible
    await expect(readMoreLink).toBeVisible();

    // Take screenshot of CTA
    await readMoreLink.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: 'screenshots/blog-card-read-more-default.png',
      fullPage: false
    });

    // Get styles
    const styles = await readMoreLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.background,
        backgroundColor: computed.backgroundColor,
        border: computed.border,
        borderRadius: computed.borderRadius,
        padding: computed.padding,
        color: computed.color,
        textDecoration: computed.textDecoration,
      };
    });

    console.log('Read More link styles:', styles);

    // Verify NO button-like styling
    // Background should be transparent (rgba(0, 0, 0, 0) or transparent)
    expect(styles.backgroundColor).toMatch(/rgba?\(0,\s*0,\s*0,\s*0\)|transparent/);

    // Border should be none or 0px
    expect(styles.border).toMatch(/none|0px/);

    // Padding should be 0px
    expect(styles.padding).toBe('0px');

    // Text decoration should be none (not underlined by default)
    expect(styles.textDecoration).toContain('none');

    // Color should be forest green (#234E3E = rgb(35, 78, 62))
    expect(styles.color).toBe('rgb(35, 78, 62)');
  });

  test('Fix #3: Read More CTA should turn GOLD on hover', async ({ page }) => {
    const readMoreLink = page.locator('.c-blog-card__read-more').first();

    await readMoreLink.scrollIntoViewIfNeeded();

    // Hover over read more link
    await readMoreLink.hover();
    await page.waitForTimeout(300);

    // Take screenshot on hover
    await page.screenshot({
      path: 'screenshots/blog-card-read-more-hover.png',
      fullPage: false
    });

    // Get hover color
    const hoverColor = await readMoreLink.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    console.log('Read More hover color:', hoverColor);

    // Should be gold (#C5A880 = rgb(197, 168, 128)) on hover
    // Note: The SCSS uses $gold-500 which is #C5A880, not #D4AF37
    const expectedGoldRgb = 'rgb(197, 168, 128)';
    expect(hoverColor).toBe(expectedGoldRgb);
  });

  test('Accessibility: Read More link should have focus outline', async ({ page }) => {
    const readMoreLink = page.locator('.c-blog-card__read-more').first();

    await readMoreLink.scrollIntoViewIfNeeded();

    // Focus on the link (keyboard navigation)
    await readMoreLink.focus();
    await page.waitForTimeout(300);

    // Take screenshot of focus state
    await page.screenshot({
      path: 'screenshots/blog-card-read-more-focus.png',
      fullPage: false
    });

    // Get outline styles
    const focusStyles = await readMoreLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        outlineStyle: computed.outlineStyle,
        outlineColor: computed.outlineColor,
        outlineOffset: computed.outlineOffset,
      };
    });

    console.log('Focus outline styles:', focusStyles);

    // Should have visible outline for accessibility
    expect(focusStyles.outlineWidth).not.toBe('0px');
    expect(focusStyles.outlineStyle).not.toBe('none');
  });

  test('Complete workflow: Verify all fixes work together', async ({ page }) => {
    const blogCard = page.locator('.c-blog-card').first();
    const titleLink = blogCard.locator('.c-blog-card__title-link');
    const title = titleLink.locator('.c-blog-card__title');
    const readMore = blogCard.locator('.c-blog-card__read-more');

    // Scroll card into view
    await blogCard.scrollIntoViewIfNeeded();

    // 1. Initial state
    await page.screenshot({
      path: 'screenshots/blog-card-workflow-1-initial.png',
      fullPage: false
    });

    // 2. Hover over title (should show single gold underline)
    await titleLink.hover();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'screenshots/blog-card-workflow-2-title-hover.png',
      fullPage: false
    });

    // Verify single underline
    const titleDecoration = await title.evaluate(el =>
      window.getComputedStyle(el).textDecoration
    );
    expect(titleDecoration).toContain('underline');
    expect((titleDecoration.match(/underline/g) || []).length).toBe(1);

    // 3. Move to read more link (should turn gold)
    await readMore.hover();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'screenshots/blog-card-workflow-3-readmore-hover.png',
      fullPage: false
    });

    // Verify text-only styling
    const readMoreBg = await readMore.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(readMoreBg).toMatch(/rgba?\(0,\s*0,\s*0,\s*0\)|transparent/);

    // 4. Keyboard navigation - tab to read more
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: 'screenshots/blog-card-workflow-4-keyboard-focus.png',
      fullPage: false
    });

    console.log('✓ All blog card fixes verified successfully!');
  });

});

test.describe('Responsive Behavior', () => {

  test('Blog cards should work on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/resurse/`);
    await page.waitForLoadState('networkidle');

    const blogCard = page.locator('.c-blog-card').first();
    await blogCard.scrollIntoViewIfNeeded();

    await page.screenshot({
      path: 'screenshots/blog-card-mobile-375.png',
      fullPage: false
    });

    // Verify card is visible and properly styled
    await expect(blogCard).toBeVisible();

    const cardWidth = await blogCard.evaluate(el => el.offsetWidth);
    console.log('Mobile card width:', cardWidth);
    expect(cardWidth).toBeLessThanOrEqual(375);
  });

  test('Blog cards should work on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE_URL}/resurse/`);
    await page.waitForLoadState('networkidle');

    const blogCard = page.locator('.c-blog-card').first();
    await blogCard.scrollIntoViewIfNeeded();

    await page.screenshot({
      path: 'screenshots/blog-card-tablet-768.png',
      fullPage: false
    });

    await expect(blogCard).toBeVisible();
  });

  test('Blog cards should work on desktop (1200px)', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(`${BASE_URL}/resurse/`);
    await page.waitForLoadState('networkidle');

    const blogCard = page.locator('.c-blog-card').first();
    await blogCard.scrollIntoViewIfNeeded();

    await page.screenshot({
      path: 'screenshots/blog-card-desktop-1200.png',
      fullPage: false
    });

    await expect(blogCard).toBeVisible();
  });

});
