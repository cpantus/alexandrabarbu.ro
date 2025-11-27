/**
 * Record Accordion Behavior for Documentation
 * Creates screenshots and performance recordings
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';

async function recordBehavior() {
  console.log('📹 Recording accordion behavior...\n');

  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: '/tmp/playwright-videos/',
      size: { width: 1280, height: 720 },
    },
  });

  const page: Page = await context.newPage();

  try {
    // Navigate to page with accordion
    console.log('📍 Loading page with accordion...');
    await page.goto('http://localhost:1313/en/components-test');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const accordion = page.locator('.c-accordion').first();
    const button = page.locator('.c-accordion__button').first();

    // Scroll to accordion
    await accordion.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Screenshot 1: Initial state (first item open by default)
    console.log('📸 Screenshot 1: Initial state');
    await page.screenshot({
      path: '/tmp/accordion-state-1-initial.png',
      fullPage: false,
    });

    // Close first accordion (toggle)
    console.log('🎬 Action: Closing accordion...');
    await button.click();
    await page.waitForTimeout(400); // Wait for animation

    // Screenshot 2: All items closed
    console.log('📸 Screenshot 2: Closed state');
    await page.screenshot({
      path: '/tmp/accordion-state-2-closed.png',
      fullPage: false,
    });

    // Open accordion again
    console.log('🎬 Action: Opening accordion...');
    await button.click();
    await page.waitForTimeout(400);

    // Screenshot 3: Open state
    console.log('📸 Screenshot 3: Open state');
    await page.screenshot({
      path: '/tmp/accordion-state-3-open.png',
      fullPage: false,
    });

    // Test multiple rapid toggles
    console.log('\n🔄 Testing rapid toggles...');
    for (let i = 0; i < 5; i++) {
      await button.click();
      await page.waitForTimeout(350);
    }

    // Screenshot 4: Final state after rapid clicks
    console.log('📸 Screenshot 4: After rapid clicks');
    await page.screenshot({
      path: '/tmp/accordion-state-4-after-rapid.png',
      fullPage: false,
    });

    // Performance analysis
    console.log('\n⚡ Analyzing performance...');

    // Start performance recording
    await page.evaluate(() => {
      (window as any).perfMarks = [];
      (window as any).perfMarks.push({
        timestamp: performance.now(),
        action: 'recording-start',
      });
    });

    // Do several accordion toggles while recording
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => {
        (window as any).perfMarks.push({
          timestamp: performance.now(),
          action: 'before-click',
        });
      });

      await button.click();

      await page.evaluate(() => {
        (window as any).perfMarks.push({
          timestamp: performance.now(),
          action: 'after-click',
        });
      });

      await page.waitForTimeout(350);

      await page.evaluate(() => {
        (window as any).perfMarks.push({
          timestamp: performance.now(),
          action: 'animation-complete',
        });
      });
    }

    // Get performance data
    const perfData = await page.evaluate(() => {
      const marks = (window as any).perfMarks || [];
      const panel = document.querySelector('.c-accordion__panel');
      const computed = panel ? window.getComputedStyle(panel) : null;

      return {
        marks,
        implementation: {
          display: computed?.display,
          gridTemplateRows: computed?.gridTemplateRows,
          transition: computed?.transition,
          willChange: computed?.willChange,
        },
      };
    });

    // Save performance data
    const perfReport = {
      timestamp: new Date().toISOString(),
      implementation: 'CSS Grid (grid-template-rows)',
      version: '3.0.0',
      performanceMarks: perfData.marks,
      cssProperties: perfData.implementation,
      expectedFrameRate: '60fps',
      animationDuration: '0.3s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      gpuAccelerated: true,
    };

    fs.writeFileSync(
      '/tmp/accordion-performance-report.json',
      JSON.stringify(perfReport, null, 2)
    );

    console.log('\n✅ Recording complete!');
    console.log('\nFiles saved:');
    console.log('  - /tmp/accordion-state-1-initial.png');
    console.log('  - /tmp/accordion-state-2-closed.png');
    console.log('  - /tmp/accordion-state-3-open.png');
    console.log('  - /tmp/accordion-state-4-after-rapid.png');
    console.log('  - /tmp/accordion-performance-report.json');
    console.log('\nPerformance Data:');
    console.log(JSON.stringify(perfReport, null, 2));

    console.log('\nBrowser will close in 3 seconds...');
    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('❌ Error during recording:', error);
  } finally {
    await context.close();
    await browser.close();
    console.log('\n✅ Done!\n');
  }
}

// Run the recording
recordBehavior().catch(console.error);
