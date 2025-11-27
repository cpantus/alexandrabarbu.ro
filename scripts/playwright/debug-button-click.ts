import { chromium } from 'playwright';

async function debugButtonClick() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  // Find the primary button (Programeaza Consultatie)
  const primaryButton = page.locator('.c-button--primary, .btn-primary').first();
  const outlineButton = page.locator('.c-button--outline-primary, .c-button--outline-secondary, .btn-outline-primary, .btn-outline-secondary').first();

  console.log('\n=== BUTTON DEBUG ===\n');

  // Check primary button
  if (await primaryButton.count() > 0) {
    const buttonText = await primaryButton.textContent();
    console.log(`Primary button found: "${buttonText?.trim()}"`);

    // Get computed styles in different states
    const normalStyles = await primaryButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.background,
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
        boxShadow: styles.boxShadow,
        transition: styles.transition
      };
    });
    console.log('\nNormal state:', JSON.stringify(normalStyles, null, 2));

    // Hover state
    await primaryButton.hover();
    await page.waitForTimeout(100);
    const hoverStyles = await primaryButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.background,
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
        boxShadow: styles.boxShadow
      };
    });
    console.log('\nHover state:', JSON.stringify(hoverStyles, null, 2));

    // Click and hold to check active state
    const box = await primaryButton.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(50);

      const activeStyles = await primaryButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          backgroundColor: styles.backgroundColor,
          transform: styles.transform,
          boxShadow: styles.boxShadow
        };
      });
      console.log('\nActive (mouse down) state:', JSON.stringify(activeStyles, null, 2));

      await page.mouse.up();
      await page.waitForTimeout(100);

      // After click (focus state)
      const focusStyles = await primaryButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          backgroundColor: styles.backgroundColor,
          transform: styles.transform,
          boxShadow: styles.boxShadow
        };
      });
      console.log('\nAfter click (focus) state:', JSON.stringify(focusStyles, null, 2));
    }

    // Check what CSS rules are applied
    console.log('\n=== CSS RULES CHECK ===');
    const cssRules = await primaryButton.evaluate((el) => {
      const classes = el.className;
      const matchedRules: string[] = [];

      // Check for inline styles
      if (el.style.cssText) {
        matchedRules.push(`Inline: ${el.style.cssText}`);
      }

      return {
        classes: classes,
        tagName: el.tagName,
        href: (el as HTMLAnchorElement).href || 'N/A'
      };
    });
    console.log('Element info:', cssRules);

  } else {
    console.log('No primary button found!');
  }

  // Check outline button
  console.log('\n\n=== OUTLINE BUTTON ===\n');
  if (await outlineButton.count() > 0) {
    const buttonText = await outlineButton.textContent();
    console.log(`Outline button found: "${buttonText?.trim()}"`);

    const normalStyles = await outlineButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
        borderColor: styles.borderColor
      };
    });
    console.log('\nNormal state:', JSON.stringify(normalStyles, null, 2));

    // Click and hold
    const box = await outlineButton.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(50);

      const activeStyles = await outlineButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          transform: styles.transform,
          borderColor: styles.borderColor
        };
      });
      console.log('\nActive (mouse down) state:', JSON.stringify(activeStyles, null, 2));

      await page.mouse.up();
    }
  }

  // Check if there are any overriding styles
  console.log('\n\n=== SEARCHING FOR OVERRIDES ===\n');

  const overrideCheck = await page.evaluate(() => {
    const btn = document.querySelector('.c-button--primary, .btn-primary') as HTMLElement;
    if (!btn) return 'No button found';

    // Get all stylesheets
    const sheets = Array.from(document.styleSheets);
    const relevantRules: string[] = [];

    sheets.forEach((sheet, sheetIndex) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule, ruleIndex) => {
          if (rule instanceof CSSStyleRule) {
            const selector = rule.selectorText;
            if (selector && (
              selector.includes('.c-button') ||
              selector.includes('.btn') ||
              selector.includes(':active') ||
              selector.includes(':focus')
            )) {
              // Check if this rule matches our button
              if (selector.includes('primary') || selector.includes('.c-button:active') || selector.includes('.btn:active')) {
                const activeMatch = selector.includes(':active');
                const focusMatch = selector.includes(':focus');
                if (activeMatch || focusMatch) {
                  relevantRules.push(`[${sheetIndex}:${ruleIndex}] ${selector} { transform: ${rule.style.transform || 'not set'}, background: ${rule.style.background || rule.style.backgroundColor || 'not set'} }`);
                }
              }
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheet
      }
    });

    return relevantRules;
  });

  console.log('Relevant CSS rules with :active or :focus:');
  if (Array.isArray(overrideCheck)) {
    overrideCheck.forEach(rule => console.log(rule));
  } else {
    console.log(overrideCheck);
  }

  await browser.close();
}

debugButtonClick().catch(console.error);
