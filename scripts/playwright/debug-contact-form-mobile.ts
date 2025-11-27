import { chromium } from 'playwright';

async function debugContactFormMobile() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X size
  });
  const page = await context.newPage();

  console.log('=== Contact Form Mobile Debug ===\n');

  await page.goto('http://localhost:1313/contact/', { waitUntil: 'networkidle' });

  // Check the grid layout
  const grid = await page.$('.c-contact-form-section__grid');
  if (grid) {
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
        gap: styles.gap,
        width: el.offsetWidth + 'px',
      };
    });
    console.log('Grid styles:', gridStyles);
  }

  // Check the form wrapper
  const formWrapper = await page.$('.c-contact-form-section__form-wrapper');
  if (formWrapper) {
    const wrapperStyles = await formWrapper.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        width: el.offsetWidth + 'px',
        padding: styles.padding,
        boxSizing: styles.boxSizing,
        order: styles.order,
      };
    });
    console.log('Form wrapper styles:', wrapperStyles);
  }

  // Check the panel
  const panel = await page.$('.c-contact-form-section__panel');
  if (panel) {
    const panelStyles = await panel.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        width: el.offsetWidth + 'px',
        padding: styles.padding,
        order: styles.order,
        minHeight: styles.minHeight,
      };
    });
    console.log('Panel styles:', panelStyles);
  }

  // Check the submit button
  const submitButton = await page.$('.c-contact-form-section__submit');
  if (submitButton) {
    const buttonStyles = await submitButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        width: el.offsetWidth + 'px',
        computedWidth: styles.width,
        minWidth: styles.minWidth,
        maxWidth: styles.maxWidth,
        padding: styles.padding,
        boxSizing: styles.boxSizing,
        display: styles.display,
        overflow: styles.overflow,
        textOverflow: styles.textOverflow,
        whiteSpace: styles.whiteSpace,
        boundingWidth: rect.width + 'px',
        parentWidth: el.parentElement?.offsetWidth + 'px',
      };
    });
    console.log('Submit button styles:', buttonStyles);
  }

  // Check container
  const container = await page.$('.c-contact-form-section .o-container');
  if (container) {
    const containerStyles = await container.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        width: el.offsetWidth + 'px',
        maxWidth: styles.maxWidth,
        paddingLeft: styles.paddingLeft,
        paddingRight: styles.paddingRight,
      };
    });
    console.log('Container styles:', containerStyles);
  }

  // Check if redesign modifier is present
  const section = await page.$('.c-contact-form-section');
  if (section) {
    const classList = await section.evaluate((el) => el.className);
    console.log('\nSection classes:', classList);
  }

  // Check viewport vs content width
  const pageWidth = await page.evaluate(() => {
    return {
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  console.log('\nPage dimensions:', pageWidth);

  // Take a screenshot
  await page.screenshot({ path: '/tmp/contact-form-mobile.png', fullPage: true });
  console.log('\nScreenshot saved to /tmp/contact-form-mobile.png');

  await browser.close();
}

debugContactFormMobile().catch(console.error);
