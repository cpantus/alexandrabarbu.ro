/**
 * Playwright Test: About Page Design Verification
 *
 * Tests three specific design changes:
 * 1. Orange blob removed from hero section
 * 2. Credentials icons have solid dark green background (not gradient)
 * 3. Scientific approach cards have light sage icon backgrounds
 *
 * Usage: npx playwright test scripts/playwright/test-about-sections.ts
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:1313';
const ABOUT_PAGE = '/despre-mine-new/';

test.describe('About Page Design Verification', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + ABOUT_PAGE);
    await page.waitForLoadState('networkidle');
  });

  test('1. Orange blob should not be visible in hero section', async ({ page }) => {
    console.log('Testing: Orange blob removal...');

    // Find the blob element
    const blob = page.locator('.c-hero-about__blob');

    // Check if element exists
    const blobCount = await blob.count();
    console.log(`Blob elements found: ${blobCount}`);

    if (blobCount > 0) {
      // Element exists - check if it's hidden
      const isVisible = await blob.isVisible();
      console.log(`Blob visible: ${isVisible}`);

      // Get computed styles
      const display = await blob.evaluate(el => window.getComputedStyle(el).display);
      const opacity = await blob.evaluate(el => window.getComputedStyle(el).opacity);

      console.log(`Blob display: ${display}, opacity: ${opacity}`);

      // Assert blob is hidden
      expect(display).toBe('none');
      expect(isVisible).toBe(false);

      console.log('✓ Orange blob is properly hidden');
    } else {
      console.log('✓ Orange blob element not found (removed from DOM)');
    }

    // Take screenshot for visual verification
    await page.screenshot({
      path: 'screenshots/about-hero-no-blob.png',
      fullPage: false
    });
  });

  test('2. Credentials icons should have solid dark green background', async ({ page }) => {
    console.log('Testing: Credentials icon styling...');

    // Find credentials section
    const credentialsSection = page.locator('.c-credentials-education');
    await expect(credentialsSection).toBeVisible();

    // Find all credential icons
    const icons = page.locator('.c-credentials-education__icon');
    const iconCount = await icons.count();
    console.log(`Found ${iconCount} credential icons`);

    expect(iconCount).toBeGreaterThan(0);

    // Test first icon as representative
    const firstIcon = icons.first();

    // Get computed styles
    const bgColor = await firstIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });

    const color = await firstIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.color;
    });

    const bgImage = await firstIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.backgroundImage;
    });

    console.log(`Icon background-color: ${bgColor}`);
    console.log(`Icon color: ${color}`);
    console.log(`Icon background-image: ${bgImage}`);

    // Check that background is solid (no gradient)
    expect(bgImage).toBe('none');

    // Check that background color is dark green-ish (rgb values for #234E3E)
    // #234E3E = rgb(35, 78, 62) - forest-500
    expect(bgColor).toMatch(/rgb\s*\(\s*35\s*,\s*78\s*,\s*62\s*\)/);

    // Check that icon color is gold-ish
    // #C5A880 = rgb(197, 168, 128) - gold-500
    expect(color).toMatch(/rgb\s*\(\s*197\s*,\s*168\s*,\s*128\s*\)/);

    console.log('✓ Credentials icons have solid dark green background with gold icons');

    // Take screenshot
    await credentialsSection.screenshot({
      path: 'screenshots/credentials-solid-icons.png'
    });
  });

  test('3. Scientific approach cards should have light sage icon backgrounds', async ({ page }) => {
    console.log('Testing: Scientific approach card styling...');

    // Find scientific approach section
    const scientificSection = page.locator('.c-scientific-approach');
    await expect(scientificSection).toBeVisible();

    // Find all feature cards
    const features = page.locator('.c-scientific-approach__feature');
    const featureCount = await features.count();
    console.log(`Found ${featureCount} feature cards`);

    expect(featureCount).toBeGreaterThan(0);

    // Find all icons
    const icons = page.locator('.c-scientific-approach__icon');
    const iconCount = await icons.count();
    console.log(`Found ${iconCount} feature icons`);

    // Test first icon as representative
    const firstIcon = icons.first();

    // Get computed styles
    const bgColor = await firstIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.backgroundColor;
    });

    const color = await firstIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.color;
    });

    const borderRadius = await firstIcon.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.borderRadius;
    });

    console.log(`Icon background-color: ${bgColor}`);
    console.log(`Icon color: ${color}`);
    console.log(`Icon border-radius: ${borderRadius}`);

    // Check that background color is light sage
    // #D5E5E0 = rgb(213, 229, 224) - sage-100
    expect(bgColor).toMatch(/rgb\s*\(\s*213\s*,\s*229\s*,\s*224\s*\)/);

    // Check that icon color is dark green
    // #234E3E = rgb(35, 78, 62) - forest-500
    expect(color).toMatch(/rgb\s*\(\s*35\s*,\s*78\s*,\s*62\s*\)/);

    // Check that it's circular (border-radius should be 50% or equivalent in px)
    const isCircular = borderRadius.includes('50%') ||
                      parseFloat(borderRadius) >= 32; // 50% of 64px = 32px
    expect(isCircular).toBe(true);

    console.log('✓ Scientific approach icons have light sage circular backgrounds with dark green icons');

    // Take screenshot
    await scientificSection.screenshot({
      path: 'screenshots/scientific-approach-cards.png'
    });
  });

  test('4. Overall page visual verification', async ({ page }) => {
    console.log('Taking full page screenshot for visual verification...');

    // Take full page screenshot
    await page.screenshot({
      path: 'screenshots/about-page-full.png',
      fullPage: true
    });

    console.log('✓ Full page screenshot saved');
  });

  test('5. Card hover effects verification', async ({ page }) => {
    console.log('Testing: Card hover effects...');

    // Test credentials card hover
    const credentialsCard = page.locator('.c-credentials-education__card').first();
    if (await credentialsCard.count() > 0) {
      await credentialsCard.hover();
      await page.waitForTimeout(500); // Wait for animation
      await credentialsCard.screenshot({
        path: 'screenshots/credentials-card-hover.png'
      });
      console.log('✓ Credentials card hover screenshot saved');
    }

    // Test scientific approach card hover
    const scientificCard = page.locator('.c-scientific-approach__feature').first();
    if (await scientificCard.count() > 0) {
      await scientificCard.hover();
      await page.waitForTimeout(500); // Wait for animation
      await scientificCard.screenshot({
        path: 'screenshots/scientific-card-hover.png'
      });
      console.log('✓ Scientific approach card hover screenshot saved');
    }
  });

  test('6. Responsive design verification', async ({ page }) => {
    console.log('Testing: Responsive layouts...');

    // Test mobile view (375px)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({
      path: 'screenshots/about-mobile-375.png',
      fullPage: true
    });
    console.log('✓ Mobile screenshot (375px) saved');

    // Test tablet view (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({
      path: 'screenshots/about-tablet-768.png',
      fullPage: true
    });
    console.log('✓ Tablet screenshot (768px) saved');

    // Test desktop view (1200px)
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.screenshot({
      path: 'screenshots/about-desktop-1200.png',
      fullPage: true
    });
    console.log('✓ Desktop screenshot (1200px) saved');
  });
});
