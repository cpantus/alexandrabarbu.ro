import { chromium } from 'playwright';

async function testMagneticInit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Check if magnetic effect is initialized
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('magnetic') || text.includes('Magnetic') || text.includes('button')) {
      console.log('Console:', text);
    }
  });

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Check device detection
  const deviceInfo = await page.evaluate(() => {
    return {
      ontouchstart: 'ontouchstart' in window,
      maxTouchPoints: navigator.maxTouchPoints,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  });

  console.log('\n=== DEVICE DETECTION ===');
  console.log('ontouchstart in window:', deviceInfo.ontouchstart);
  console.log('navigator.maxTouchPoints:', deviceInfo.maxTouchPoints);
  console.log('prefers-reduced-motion:', deviceInfo.reducedMotion);

  // Check if the button has event listeners
  const heroButton = page.locator('text="Programează Consultație"').first();
  const hasListeners = await heroButton.evaluate((el) => {
    // Check if the element has the expected class
    const classes = el.className;
    const matchesMagnetic = el.matches('.c-hero-breadcrumb__cta-button.c-button--primary');
    return {
      classes,
      matchesMagnetic
    };
  });

  console.log('\n=== BUTTON INFO ===');
  console.log('Classes:', hasListeners.classes);
  console.log('Matches magnetic selector:', hasListeners.matchesMagnetic);

  await browser.close();
}

testMagneticInit().catch(console.error);
