/**
 * Debug script to check related articles link styling
 * Looking for text-decoration-color: gold-500 (#D4AF37) vs something else overriding it
 */

import { chromium } from 'playwright';

async function debugRelatedArticles() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to an article page that has related articles
  await page.goto('http://localhost:1313/resurse/articole/tehnici-gestionare-anxietate/', {
    waitUntil: 'networkidle'
  });

  // Find the related articles section
  const relatedSection = await page.$('section.bg-cream-50');
  if (!relatedSection) {
    console.log('Related articles section NOT found');
    await browser.close();
    return;
  }

  console.log('Related articles section found');

  // Find the career-benefits-item links
  const links = await page.$$('.career-benefits-item h4 a');
  console.log(`Found ${links.length} related article links`);

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const text = await link.textContent();
    console.log(`\n--- Link ${i + 1}: "${text?.substring(0, 40)}..." ---`);

    // Get computed styles
    const styles = await link.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        textDecoration: computed.textDecoration,
        textDecorationColor: computed.textDecorationColor,
        textDecorationLine: computed.textDecorationLine,
        textDecorationStyle: computed.textDecorationStyle,
        textUnderlineOffset: computed.textUnderlineOffset,
      };
    });

    console.log('Computed styles:', styles);

    // Check if text-decoration-color is gold (should be #D4AF37 / rgb(212, 175, 55))
    const isGold = styles.textDecorationColor.includes('212') &&
                   styles.textDecorationColor.includes('175') &&
                   styles.textDecorationColor.includes('55');

    console.log(`Is gold underline: ${isGold ? 'YES' : 'NO'}`);

    // Get parent element info to check for competing classes
    const parentInfo = await link.evaluate((el) => {
      const parents: string[] = [];
      let current = el.parentElement;
      while (current && parents.length < 6) {
        const classes = current.className ? `.${current.className.split(' ').join('.')}` : '';
        const tag = current.tagName.toLowerCase();
        parents.push(`${tag}${classes}`);
        current = current.parentElement;
      }
      return parents;
    });

    console.log('Parent chain:', parentInfo.join(' > '));
  }

  // Also check if there's any CSS variable or other override
  const cssInfo = await page.evaluate(() => {
    const link = document.querySelector('.career-benefits-item h4 a');
    if (!link) return null;

    // Check the applied CSS rules
    const sheets = document.styleSheets;
    const matchingRules: string[] = [];

    try {
      for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
        try {
          const rules = sheet.cssRules;
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j] as CSSStyleRule;
            if (rule.selectorText && rule.style) {
              // Check if this rule applies to our element and has text-decoration-color
              if (rule.style.textDecorationColor ||
                  rule.style.textDecoration) {
                // See if selector might match our element
                try {
                  if (link.matches(rule.selectorText)) {
                    matchingRules.push(`${rule.selectorText}: text-decoration-color=${rule.style.textDecorationColor || 'inherit'}, text-decoration=${rule.style.textDecoration || 'inherit'}`);
                  }
                } catch (e) {
                  // Some selectors can't be matched
                }
              }
            }
          }
        } catch (e) {
          // CORS restrictions on some stylesheets
        }
      }
    } catch (e) {
      return { error: String(e) };
    }

    return { matchingRules };
  });

  console.log('\n--- CSS Rules affecting the link ---');
  if (cssInfo && 'matchingRules' in cssInfo) {
    cssInfo.matchingRules.forEach((rule: string) => console.log(rule));
  } else if (cssInfo && 'error' in cssInfo) {
    console.log('Error:', cssInfo.error);
  }

  await browser.close();
}

debugRelatedArticles().catch(console.error);
