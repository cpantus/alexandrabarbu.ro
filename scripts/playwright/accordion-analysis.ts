/**
 * Accordion Animation Analysis Script
 * Analyzes accordion animation behavior and performance
 */

import { chromium, Browser, Page } from 'playwright';

interface AnimationMetrics {
  method: string;
  properties: string[];
  timingFunction: string;
  duration: string;
  frameRate: number;
  performanceIssues: string[];
}

async function analyzeAccordion() {
  console.log('🔍 Starting accordion animation analysis...\n');

  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page: Page = await context.newPage();

  try {
    // Navigate to page with FAQ accordion
    console.log('📍 Navigating to test page...');
    await page.goto('http://localhost:1313/en/components-test');
    await page.waitForLoadState('networkidle');

    // Find accordion elements
    const accordion = await page.locator('.c-accordion').first();
    const accordionItems = await accordion.locator('.c-accordion__item').all();

    console.log(`\n✅ Found ${accordionItems.length} accordion items\n`);

    if (accordionItems.length === 0) {
      console.log('❌ No accordion items found. Trying alternative page...');
      await page.goto('http://localhost:1313/en/components-showcase');
      await page.waitForLoadState('networkidle');
    }

    // Analyze first accordion item
    const firstButton = page.locator('.c-accordion__button').first();
    const firstPanel = page.locator('.c-accordion__panel').first();

    console.log('📊 BEFORE ANALYSIS - Initial State');
    console.log('═══════════════════════════════════════\n');

    // Get initial computed styles
    const panelInitial = await firstPanel.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        maxHeight: computed.maxHeight,
        height: computed.height,
        overflow: computed.overflow,
        transition: computed.transition,
        opacity: computed.opacity,
        display: computed.display,
      };
    });

    console.log('Initial Panel Styles:');
    console.log(JSON.stringify(panelInitial, null, 2));

    // Check if panel is initially open
    const isInitiallyOpen = await firstPanel.evaluate((el) =>
      el.classList.contains('show')
    );
    console.log(`\nInitially open: ${isInitiallyOpen}\n`);

    // Start performance monitoring
    console.log('🎬 ANIMATION ANALYSIS - Clicking accordion');
    console.log('═══════════════════════════════════════\n');

    // Set up frame rate monitoring
    let frameCount = 0;
    let animationStartTime = 0;
    let animationEndTime = 0;

    // Monitor frames during animation
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        let frames = 0;
        const start = performance.now();

        function countFrames() {
          frames++;
          const elapsed = performance.now() - start;
          if (elapsed < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            (window as any).__frameCount = frames;
            resolve();
          }
        }
        requestAnimationFrame(countFrames);
      });
    });

    // Click to toggle (close if open, open if closed)
    const clickTime = Date.now();
    await firstButton.click();

    // Wait for animation to complete
    await page.waitForTimeout(500);

    // Get styles after click
    const panelAfterClick = await firstPanel.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const hasShow = el.classList.contains('show');
      return {
        maxHeight: computed.maxHeight,
        height: computed.height,
        overflow: computed.overflow,
        transition: computed.transition,
        opacity: computed.opacity,
        display: computed.display,
        hasShowClass: hasShow,
        actualHeight: el.scrollHeight,
      };
    });

    console.log('Panel Styles After Click:');
    console.log(JSON.stringify(panelAfterClick, null, 2));

    // Analyze animation properties
    console.log('\n📈 ANIMATION PROPERTIES');
    console.log('═══════════════════════════════════════\n');

    const animationAnalysis = await firstPanel.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      const transition = computed.transition;

      // Parse transition properties
      const transitionProps = transition.split(',').map((t) => t.trim());

      const analysis = {
        method: 'CSS Transition',
        properties: transitionProps
          .map((t) => {
            const match = t.match(/^(\S+)/);
            return match ? match[1] : '';
          })
          .filter((p) => p),
        timingFunction: computed.transitionTimingFunction,
        duration: computed.transitionDuration,
        willChange: computed.willChange,
        transform: computed.transform,
        backfaceVisibility: computed.backfaceVisibility,
      };

      return analysis;
    });

    console.log('Animation Method:', animationAnalysis.method);
    console.log('Animated Properties:', animationAnalysis.properties.join(', '));
    console.log('Timing Function:', animationAnalysis.timingFunction);
    console.log('Duration:', animationAnalysis.duration);
    console.log('Will-Change:', animationAnalysis.willChange);
    console.log('Transform:', animationAnalysis.transform);
    console.log('Backface Visibility:', animationAnalysis.backfaceVisibility);

    // Performance analysis
    console.log('\n⚡ PERFORMANCE ISSUES DETECTED');
    console.log('═══════════════════════════════════════\n');

    const issues: string[] = [];

    // Check for performance anti-patterns
    if (animationAnalysis.properties.includes('max-height')) {
      issues.push(
        '❌ CRITICAL: Animating max-height causes layout reflows (not GPU accelerated)'
      );
      issues.push('   Impact: Choppy animation, poor performance on slower devices');
    }

    if (animationAnalysis.properties.includes('height')) {
      issues.push(
        '❌ CRITICAL: Animating height causes layout reflows (not GPU accelerated)'
      );
      issues.push('   Impact: Forces browser to recalculate layout every frame');
    }

    if (!animationAnalysis.properties.includes('transform')) {
      issues.push('⚠️  Not using transform (GPU-accelerated) for animation');
    }

    if (animationAnalysis.willChange === 'auto') {
      issues.push(
        '⚠️  No will-change hint (browser not prepared for animation)'
      );
    }

    if (animationAnalysis.timingFunction.includes('linear')) {
      issues.push('⚠️  Linear easing feels robotic (prefer ease-in-out)');
    }

    if (issues.length === 0) {
      console.log('✅ No major performance issues detected!');
    } else {
      issues.forEach((issue) => console.log(issue));
    }

    // Test rapid clicking
    console.log('\n🔄 RAPID CLICK TEST');
    console.log('═══════════════════════════════════════\n');

    console.log('Clicking 5 times rapidly...');
    for (let i = 0; i < 5; i++) {
      await firstButton.click();
      await page.waitForTimeout(100); // Small delay between clicks
    }

    await page.waitForTimeout(500);

    const finalState = await firstPanel.evaluate((el) => ({
      hasShowClass: el.classList.contains('show'),
      maxHeight: window.getComputedStyle(el).maxHeight,
      opacity: window.getComputedStyle(el).opacity,
    }));

    console.log('Final State:', finalState);

    // ROOT CAUSE SUMMARY
    console.log('\n🎯 ROOT CAUSE ANALYSIS');
    console.log('═══════════════════════════════════════\n');

    console.log('Current Implementation:');
    console.log('  - Animation Method: CSS max-height transition');
    console.log('  - Location: themes/andromeda-hugo/assets/scss/05-objects/_collapse.scss');
    console.log('  - Line 30-42: Animates max-height from 0 to 500px');
    console.log('  - Line 32: Uses 0.35s ease-in-out transition\n');

    console.log('Why It Feels Choppy:');
    console.log('  1. max-height triggers layout reflows (not GPU-accelerated)');
    console.log('  2. Browser must recalculate layout for every frame');
    console.log('  3. Fixed max-height value (500px) can feel slow for short content');
    console.log(
      '  4. Animating both max-height AND opacity doubles the work\n'
    );

    console.log('Recommended Fix:');
    console.log('  1. Use CSS Grid or transform: scaleY() for GPU acceleration');
    console.log('  2. Remove max-height animation entirely');
    console.log('  3. Use grid-template-rows: 0fr → 1fr (modern approach)');
    console.log('  4. Add will-change: grid-template-rows for performance hint');
    console.log('  5. Use single opacity transition if needed');

    // Take screenshots
    console.log('\n📸 Taking screenshots...');
    await page.screenshot({
      path: '/tmp/accordion-before.png',
      fullPage: false,
    });
    console.log('✅ Screenshot saved: /tmp/accordion-before.png');

    console.log('\n✅ Analysis complete!\n');
  } catch (error) {
    console.error('❌ Error during analysis:', error);
  } finally {
    await browser.close();
  }
}

// Run the analysis
analyzeAccordion().catch(console.error);
