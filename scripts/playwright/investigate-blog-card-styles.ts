/**
 * Investigate Blog Card Styles
 * Purpose: Inspect actual rendered styles to understand override issues
 */

import { chromium } from 'playwright';

async function investigateBlogCardStyles() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('🔍 Navigating to blog cards page...');
    await page.goto('http://localhost:1313/resurse/articole/', { waitUntil: 'domcontentloaded' });

    // Wait for blog cards to load
    await page.waitForSelector('.c-blog-card', { timeout: 5000 });

    console.log('\n📊 INVESTIGATION RESULTS:\n');
    console.log('='.repeat(60));

    //  === ISSUE 1: Double Underline on Title Hover ===
    console.log('\n🔸 ISSUE 1: Title Hover Underline\n');

    const titleLink = page.locator('.c-blog-card__title-link').first();
    const title = page.locator('.c-blog-card__title').first();

    // Check title link default state
    const titleLinkStyles = await titleLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        textDecoration: computed.textDecoration,
        color: computed.color,
      };
    });

    console.log('Title Link (default state):');
    console.log(`  text-decoration: ${titleLinkStyles.textDecoration}`);
    console.log(`  color: ${titleLinkStyles.color}`);

    // Simulate hover and check both link and title
    await titleLink.hover();
    await page.waitForTimeout(100); // Wait for CSS transition

    const titleLinkHoverStyles = await titleLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        textDecoration: computed.textDecoration,
        textDecorationColor: computed.textDecorationColor,
        textDecorationLine: computed.textDecorationLine,
      };
    });

    const titleHoverStyles = await title.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        textDecoration: computed.textDecoration,
        textDecorationColor: computed.textDecorationColor,
        textDecorationLine: computed.textDecorationLine,
        textUnderlineOffset: computed.textUnderlineOffset,
      };
    });

    console.log('\nTitle Link (hover state):');
    console.log(`  text-decoration: ${titleLinkHoverStyles.textDecoration}`);
    console.log(`  text-decoration-color: ${titleLinkHoverStyles.textDecorationColor}`);
    console.log(`  text-decoration-line: ${titleLinkHoverStyles.textDecorationLine}`);

    console.log('\nTitle Element (when link hovered):');
    console.log(`  text-decoration: ${titleHoverStyles.textDecoration}`);
    console.log(`  text-decoration-color: ${titleHoverStyles.textDecorationColor}`);
    console.log(`  text-decoration-line: ${titleHoverStyles.textDecorationLine}`);
    console.log(`  text-underline-offset: ${titleHoverStyles.textUnderlineOffset}`);

    // Check if we have double underline
    const hasDoubleUnderline =
      titleLinkHoverStyles.textDecorationLine.includes('underline') &&
      titleHoverStyles.textDecorationLine.includes('underline');

    console.log(`\n❌ DOUBLE UNDERLINE DETECTED: ${hasDoubleUnderline ? 'YES' : 'NO'}`);

    // Check gold color
    const expectedGold = 'rgb(197, 168, 128)'; // #C5A880
    const hasGoldUnderline = titleHoverStyles.textDecorationColor === expectedGold;
    console.log(`✅ GOLD UNDERLINE (#C5A880): ${hasGoldUnderline ? 'YES' : 'NO'}`);
    if (!hasGoldUnderline) {
      console.log(`   Actual color: ${titleHoverStyles.textDecorationColor}`);
    }

    // === ISSUE 2: CTA Button Styling ===
    console.log('\n' + '='.repeat(60));
    console.log('\n🔸 ISSUE 2: Read More CTA Styling\n');

    const readMoreLink = page.locator('.c-blog-card__read-more').first();

    const readMoreDefaultStyles = await readMoreLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        background: computed.background,
        backgroundColor: computed.backgroundColor,
        border: computed.border,
        borderRadius: computed.borderRadius,
        padding: computed.padding,
        color: computed.color,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
      };
    });

    console.log('Read More Link (default state):');
    console.log(`  background: ${readMoreDefaultStyles.background}`);
    console.log(`  backgroundColor: ${readMoreDefaultStyles.backgroundColor}`);
    console.log(`  border: ${readMoreDefaultStyles.border}`);
    console.log(`  borderRadius: ${readMoreDefaultStyles.borderRadius}`);
    console.log(`  padding: ${readMoreDefaultStyles.padding}`);
    console.log(`  color: ${readMoreDefaultStyles.color}`);
    console.log(`  fontSize: ${readMoreDefaultStyles.fontSize}`);
    console.log(`  fontWeight: ${readMoreDefaultStyles.fontWeight}`);

    // Check if it looks like a pill/button
    const hasPillStyling =
      readMoreDefaultStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
      readMoreDefaultStyles.border !== '0px none rgb(35, 78, 62)' ||
      readMoreDefaultStyles.padding !== '0px';

    console.log(`\n❌ HAS PILL/BUTTON STYLING: ${hasPillStyling ? 'YES' : 'NO'}`);

    // Check hover state
    await readMoreLink.hover();
    await page.waitForTimeout(100);

    const readMoreHoverStyles = await readMoreLink.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        textDecoration: computed.textDecoration,
      };
    });

    console.log('\nRead More Link (hover state):');
    console.log(`  color: ${readMoreHoverStyles.color}`);
    console.log(`  text-decoration: ${readMoreHoverStyles.textDecoration}`);

    const expectedGoldHover = 'rgb(197, 168, 128)'; // #C5A880
    const hasGoldHover = readMoreHoverStyles.color === expectedGoldHover;
    console.log(`✅ GOLD HOVER COLOR (#C5A880): ${hasGoldHover ? 'YES' : 'NO'}`);
    if (!hasGoldHover) {
      console.log(`   Actual color: ${readMoreHoverStyles.color}`);
    }

    // === CHECK FOR COMPETING STYLES ===
    console.log('\n' + '='.repeat(60));
    console.log('\n🔍 CHECKING FOR COMPETING STYLES\n');

    // Check all applied rules to the title link
    const allTitleLinkRules = await titleLink.evaluate((el) => {
      const rules: string[] = [];
      const sheets = document.styleSheets;

      for (let i = 0; i < sheets.length; i++) {
        try {
          const cssRules = sheets[i].cssRules || sheets[i].rules;
          for (let j = 0; j < cssRules.length; j++) {
            const rule = cssRules[j] as CSSStyleRule;
            if (rule.selectorText && el.matches(rule.selectorText)) {
              rules.push(`${rule.selectorText} { ${rule.style.cssText} }`);
            }
          }
        } catch (e) {
          // Skip cross-origin stylesheets
        }
      }
      return rules;
    });

    console.log('CSS Rules applied to title link:');
    allTitleLinkRules.forEach(rule => {
      if (rule.includes('text-decoration') || rule.includes('underline')) {
        console.log(`  ${rule}`);
      }
    });

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ Investigation complete!\n');

  } catch (error) {
    console.error('❌ Error during investigation:', error);
  } finally {
    await browser.close();
  }
}

investigateBlogCardStyles();
