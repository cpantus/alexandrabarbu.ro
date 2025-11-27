import { chromium } from 'playwright';

async function compareButtons() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  // Find both buttons
  const heroButton = page.locator('text="Programează Consultație"').first();
  const workingButton = page.locator('text="Fa o programare!"').first();

  console.log('\n=== COMPARING BOTH BUTTONS ===\n');

  // Check if buttons exist
  const heroExists = await heroButton.count() > 0;
  const workingExists = await workingButton.count() > 0;

  console.log('Hero button (Programează Consultație) exists:', heroExists);
  console.log('Working button (Fa o programare!) exists:', workingExists);

  if (!heroExists || !workingExists) {
    console.log('\nMissing buttons! Cannot compare.');
    await browser.close();
    return;
  }

  // Get computed styles for normal state
  console.log('\n--- NORMAL STATE ---\n');

  const heroNormal = await heroButton.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      transform: style.transform,
      transition: style.transition,
      position: style.position,
      overflow: style.overflow,
      animation: style.animation,
      willChange: style.willChange
    };
  });

  const workingNormal = await workingButton.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      transform: style.transform,
      transition: style.transition,
      position: style.position,
      overflow: style.overflow,
      animation: style.animation,
      willChange: style.willChange
    };
  });

  console.log('Hero button (normal):');
  console.log('  transform:', heroNormal.transform);
  console.log('  transition:', heroNormal.transition);
  console.log('  position:', heroNormal.position);
  console.log('  overflow:', heroNormal.overflow);
  console.log('  animation:', heroNormal.animation);
  console.log('  willChange:', heroNormal.willChange);

  console.log('\nWorking button (normal):');
  console.log('  transform:', workingNormal.transform);
  console.log('  transition:', workingNormal.transition);
  console.log('  position:', workingNormal.position);
  console.log('  overflow:', workingNormal.overflow);
  console.log('  animation:', workingNormal.animation);
  console.log('  willChange:', workingNormal.willChange);

  // Test ACTIVE state (mousedown)
  console.log('\n--- ACTIVE STATE (mousedown) ---\n');

  // Test hero button
  const heroBbox = await heroButton.boundingBox();
  if (heroBbox) {
    await page.mouse.move(heroBbox.x + heroBbox.width / 2, heroBbox.y + heroBbox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(100);

    const heroActive = await heroButton.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        transform: style.transform,
        backgroundColor: style.backgroundColor,
        boxShadow: style.boxShadow
      };
    });

    console.log('Hero button (active):');
    console.log('  transform:', heroActive.transform);
    console.log('  backgroundColor:', heroActive.backgroundColor);
    console.log('  boxShadow:', heroActive.boxShadow);

    await page.mouse.up();
  }

  // Test working button
  const workingBbox = await workingButton.boundingBox();
  if (workingBbox) {
    await page.mouse.move(workingBbox.x + workingBbox.width / 2, workingBbox.y + workingBbox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(100);

    const workingActive = await workingButton.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        transform: style.transform,
        backgroundColor: style.backgroundColor,
        boxShadow: style.boxShadow
      };
    });

    console.log('\nWorking button (active):');
    console.log('  transform:', workingActive.transform);
    console.log('  backgroundColor:', workingActive.backgroundColor);
    console.log('  boxShadow:', workingActive.boxShadow);

    await page.mouse.up();
  }

  // Check parent elements for animation/transform interference
  console.log('\n--- PARENT ELEMENT ANALYSIS ---\n');

  const heroParents = await heroButton.evaluate((el) => {
    const parents: any[] = [];
    let current = el.parentElement;
    while (current && parents.length < 5) {
      const style = window.getComputedStyle(current);
      parents.push({
        tag: current.tagName,
        class: current.className,
        transform: style.transform,
        animation: style.animation,
        willChange: style.willChange,
        overflow: style.overflow
      });
      current = current.parentElement;
    }
    return parents;
  });

  console.log('Hero button parent chain:');
  heroParents.forEach((p, i) => {
    console.log(`  [${i}] ${p.tag}.${p.class.substring(0, 50)}...`);
    if (p.transform !== 'none') console.log(`       transform: ${p.transform}`);
    if (p.animation !== 'none') console.log(`       animation: ${p.animation}`);
    if (p.willChange !== 'auto') console.log(`       willChange: ${p.willChange}`);
  });

  const workingParents = await workingButton.evaluate((el) => {
    const parents: any[] = [];
    let current = el.parentElement;
    while (current && parents.length < 5) {
      const style = window.getComputedStyle(current);
      parents.push({
        tag: current.tagName,
        class: current.className,
        transform: style.transform,
        animation: style.animation,
        willChange: style.willChange,
        overflow: style.overflow
      });
      current = current.parentElement;
    }
    return parents;
  });

  console.log('\nWorking button parent chain:');
  workingParents.forEach((p, i) => {
    console.log(`  [${i}] ${p.tag}.${p.class.substring(0, 50)}...`);
    if (p.transform !== 'none') console.log(`       transform: ${p.transform}`);
    if (p.animation !== 'none') console.log(`       animation: ${p.animation}`);
    if (p.willChange !== 'auto') console.log(`       willChange: ${p.willChange}`);
  });

  // Get ALL CSS rules applied to hero button
  console.log('\n--- CSS RULES ANALYSIS ---\n');

  const heroCSSRules = await heroButton.evaluate((el) => {
    const rules: string[] = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of (sheet as CSSStyleSheet).cssRules) {
          if (rule instanceof CSSStyleRule) {
            if (el.matches(rule.selectorText)) {
              // Check for transform-related properties
              if (rule.style.transform || rule.style.animation || rule.style.willChange) {
                rules.push(`${rule.selectorText}: transform=${rule.style.transform}, animation=${rule.style.animation}`);
              }
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheet, skip
      }
    }
    return rules;
  });

  console.log('CSS rules affecting hero button (transform/animation):');
  heroCSSRules.forEach(r => console.log('  ' + r));

  await browser.close();
}

compareButtons().catch(console.error);
