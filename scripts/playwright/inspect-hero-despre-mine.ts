/**
 * Playwright script to inspect hero-breadcrumb rendering issue on /despre-mine/
 *
 * Checks:
 * 1. Full page screenshot
 * 2. Hero section HTML structure
 * 3. Computed CSS styles
 * 4. Hidden content detection
 * 5. Comparison with expected content
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'screenshots', 'hero-debug');

(async () => {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('📍 Navigating to /despre-mine/...');
  await page.goto('http://localhost:1313/despre-mine/', {
    waitUntil: 'networkidle',
    timeout: 10000
  });

  // 1. Full page screenshot
  console.log('📸 Taking full page screenshot...');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-full-page.png'),
    fullPage: true
  });

  // 2. Hero section screenshot
  console.log('📸 Taking hero section screenshot...');
  const heroExists = await page.locator('.c-hero-breadcrumb').count() > 0;

  if (heroExists) {
    await page.locator('.c-hero-breadcrumb').screenshot({
      path: path.join(OUTPUT_DIR, '02-hero-section.png')
    });
  } else {
    console.log('❌ Hero section not found!');
  }

  // 3. Get HTML structure
  console.log('🔍 Extracting HTML structure...');
  const heroHTML = await page.evaluate(() => {
    const hero = document.querySelector('.c-hero-breadcrumb');
    return hero ? hero.outerHTML : 'NOT FOUND';
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, '03-hero-html.html'),
    heroHTML,
    'utf-8'
  );

  // 4. Get computed styles
  console.log('🎨 Checking computed styles...');
  const heroStyles = await page.evaluate(() => {
    const hero = document.querySelector('.c-hero-breadcrumb');
    if (!hero) return { error: 'Hero section not found' };

    const computed = window.getComputedStyle(hero);
    const container = hero.querySelector('.c-hero-breadcrumb__container');
    const containerComputed = container ? window.getComputedStyle(container) : null;
    const content = hero.querySelector('.c-hero-breadcrumb__content');
    const contentComputed = content ? window.getComputedStyle(content) : null;
    const media = hero.querySelector('.c-hero-breadcrumb__media');
    const mediaComputed = media ? window.getComputedStyle(media) : null;

    return {
      hero: {
        display: computed.display,
        height: computed.height,
        minHeight: computed.minHeight,
        overflow: computed.overflow,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        visibility: computed.visibility,
      },
      container: containerComputed ? {
        maxWidth: containerComputed.maxWidth,
        padding: containerComputed.padding,
        overflow: containerComputed.overflow,
      } : null,
      content: contentComputed ? {
        display: contentComputed.display,
        width: contentComputed.width,
        visibility: contentComputed.visibility,
      } : null,
      media: mediaComputed ? {
        display: mediaComputed.display,
        width: mediaComputed.width,
        visibility: mediaComputed.visibility,
        opacity: mediaComputed.opacity,
      } : null,
    };
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, '04-computed-styles.json'),
    JSON.stringify(heroStyles, null, 2),
    'utf-8'
  );

  // 5. Check for expected content
  console.log('📋 Checking content visibility...');
  const contentCheck = await page.evaluate(() => {
    const checks = {
      title: {
        exists: !!document.querySelector('.c-hero-breadcrumb__title'),
        text: document.querySelector('.c-hero-breadcrumb__title')?.textContent || 'NOT FOUND',
        visible: false,
      },
      subtitle: {
        exists: !!document.querySelector('.c-hero-breadcrumb__subtitle'),
        text: document.querySelector('.c-hero-breadcrumb__subtitle')?.textContent || 'NOT FOUND',
        visible: false,
      },
      breadcrumb: {
        exists: !!document.querySelector('.c-hero-breadcrumb__breadcrumb'),
        visible: false,
      },
      ctaButtons: {
        exists: !!document.querySelector('.c-hero-breadcrumb__cta-group'),
        count: document.querySelectorAll('.c-hero-breadcrumb__cta-button').length,
        visible: false,
      },
      media: {
        exists: !!document.querySelector('.c-hero-breadcrumb__media'),
        hasCompass: !!document.querySelector('.c-hero-breadcrumb__compass-wrapper'),
        hasImage: !!document.querySelector('.c-hero-breadcrumb__image-wrapper'),
        hasShapes: !!document.querySelector('.c-hero-breadcrumb__shapes'),
        visible: false,
      }
    };

    // Check visibility
    function isVisible(selector) {
      const el = document.querySelector(selector);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return rect.height > 0 &&
             rect.width > 0 &&
             style.visibility !== 'hidden' &&
             style.display !== 'none' &&
             parseFloat(style.opacity) > 0;
    }

    checks.title.visible = isVisible('.c-hero-breadcrumb__title');
    checks.subtitle.visible = isVisible('.c-hero-breadcrumb__subtitle');
    checks.breadcrumb.visible = isVisible('.c-hero-breadcrumb__breadcrumb');
    checks.ctaButtons.visible = isVisible('.c-hero-breadcrumb__cta-group');
    checks.media.visible = isVisible('.c-hero-breadcrumb__media');

    return checks;
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, '05-content-check.json'),
    JSON.stringify(contentCheck, null, 2),
    'utf-8'
  );

  // 6. Get bounding boxes
  console.log('📐 Measuring element dimensions...');
  const dimensions = await page.evaluate(() => {
    const measurements = {};

    const selectors = [
      '.c-hero-breadcrumb',
      '.c-hero-breadcrumb__container',
      '.c-hero-breadcrumb__grid',
      '.c-hero-breadcrumb__content',
      '.c-hero-breadcrumb__media',
      '.c-hero-breadcrumb__title',
      '.c-hero-breadcrumb__subtitle',
    ];

    selectors.forEach(function(selector) {
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        measurements[selector] = {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          bottom: rect.bottom,
        };
      } else {
        measurements[selector] = { error: 'Element not found' };
      }
    });

    return measurements;
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, '06-dimensions.json'),
    JSON.stringify(dimensions, null, 2),
    'utf-8'
  );

  // 7. Generate diagnostic report
  console.log('📝 Generating diagnostic report...');
  const report = `
# Hero Breadcrumb Diagnostic Report
## Page: /despre-mine/
## Date: ${new Date().toISOString()}

---

## Content Visibility Check

${JSON.stringify(contentCheck, null, 2)}

---

## Computed Styles

${JSON.stringify(heroStyles, null, 2)}

---

## Element Dimensions

${JSON.stringify(dimensions, null, 2)}

---

## Analysis

### Expected Content (from front matter):
- Title: "Despre Mine"
- Subtitle: "Povestea Mea și Abordarea Terapeutică"
- Description: "15+ ani de experiență..."
- Image: "images/about/alexandra-barbu-portrait.jpg"
- Breadcrumb: Yes (show_breadcrumb defaults to false in template)
- Compass: No (hero_image defined, so compass disabled)

### Issues Found:
${contentCheck.title.visible ? '✅' : '❌'} Title visible
${contentCheck.subtitle.visible ? '✅' : '❌'} Subtitle visible
${contentCheck.breadcrumb.visible ? '✅' : '❌'} Breadcrumb visible (expected: ${contentCheck.breadcrumb.exists ? 'false per template default' : 'missing'})
${contentCheck.ctaButtons.visible ? '✅' : '❌'} CTA buttons visible (expected: none defined in front matter)
${contentCheck.media.visible ? '✅' : '❌'} Media column visible

### Media Column Content:
- Has compass: ${contentCheck.media.hasCompass}
- Has image: ${contentCheck.media.hasImage}
- Has fallback shapes: ${contentCheck.media.hasShapes}

---

## Files Generated:
1. 01-full-page.png - Full page screenshot
2. 02-hero-section.png - Hero section only
3. 03-hero-html.html - Raw HTML structure
4. 04-computed-styles.json - CSS computed values
5. 05-content-check.json - Content visibility analysis
6. 06-dimensions.json - Element bounding boxes
7. 07-diagnostic-report.md - This report

`;

  fs.writeFileSync(
    path.join(OUTPUT_DIR, '07-diagnostic-report.md'),
    report,
    'utf-8'
  );

  console.log('\n✅ Inspection complete!');
  console.log(`📂 Output directory: ${OUTPUT_DIR}`);
  console.log('\n📊 Quick Summary:');
  console.log(`   Title visible: ${contentCheck.title.visible ? '✅' : '❌'}`);
  console.log(`   Subtitle visible: ${contentCheck.subtitle.visible ? '✅' : '❌'}`);
  console.log(`   Media visible: ${contentCheck.media.visible ? '✅' : '❌'}`);
  console.log(`   Has image: ${contentCheck.media.hasImage ? '✅' : '❌'}`);
  console.log(`   Has compass: ${contentCheck.media.hasCompass ? '✅' : '❌'}`);
  console.log(`   Has shapes: ${contentCheck.media.hasShapes ? '✅' : '❌'}`);

  await browser.close();
})();
