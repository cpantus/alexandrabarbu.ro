/**
 * Simple Blog Card Test - Manual verification
 */

import { test, expect } from '@playwright/test';

test('Blog card styling verification', async ({ page }) => {
  console.log('Navigating to articles page...');
  await page.goto('http://localhost:1313/resurse/articole/');
  await page.waitForLoadState('networkidle');

  console.log('Looking for blog cards...');
  const blogCards = page.locator('.c-blog-card');
  const count = await blogCards.count();
  console.log(`Found ${count} blog cards`);

  if (count === 0) {
    throw new Error('No blog cards found on page');
  }

  const firstCard = blogCards.first();
  const titleLink = firstCard.locator('.c-blog-card__title-link');
  const title = titleLink.locator('.c-blog-card__title');
  const readMore = firstCard.locator('.c-blog-card__read-more');

  console.log('Scrolling to first card...');
  await firstCard.scrollIntoViewIfNeeded();

  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'screenshots/blog-card-test-1-initial.png' });

  console.log('Hovering over title...');
  await titleLink.hover();
  await page.waitForTimeout(500);

  console.log('Taking title hover screenshot...');
  await page.screenshot({ path: 'screenshots/blog-card-test-2-title-hover.png' });

  // Check title styles
  const titleStyles = await title.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      textDecoration: style.textDecoration,
      textDecorationColor: style.textDecorationColor,
      textUnderlineOffset: style.textUnderlineOffset,
    };
  });
  console.log('Title styles on hover:', JSON.stringify(titleStyles, null, 2));

  // Check link styles (should NOT have underline)
  const linkStyles = await titleLink.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      textDecoration: style.textDecoration,
    };
  });
  console.log('Link styles on hover:', JSON.stringify(linkStyles, null, 2));

  console.log('Moving to Read More link...');
  await readMore.hover();
  await page.waitForTimeout(500);

  console.log('Taking read more hover screenshot...');
  await page.screenshot({ path: 'screenshots/blog-card-test-3-readmore-hover.png' });

  // Check read more styles
  const readMoreStyles = await readMore.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
      border: style.border,
      padding: style.padding,
      textDecoration: style.textDecoration,
    };
  });
  console.log('Read More styles on hover:', JSON.stringify(readMoreStyles, null, 2));

  console.log('✓ Test completed successfully!');
});
