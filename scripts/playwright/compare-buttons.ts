import { chromium } from 'playwright';

async function compareButtons() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:1313/');
  await page.waitForLoadState('networkidle');

  // Find all buttons with their text
  const buttons = await page.$$eval('a.c-button, a.btn, button.c-button, button.btn, a[class*="btn-"], button[class*="btn-"]', (els) => {
    return els.map(el => ({
      tag: el.tagName,
      classes: el.className,
      text: el.textContent?.trim().substring(0, 30),
      href: (el as HTMLAnchorElement).href || 'N/A'
    }));
  });

  console.log('\n=== ALL BUTTONS ON PAGE ===\n');
  buttons.forEach((btn, i) => {
    console.log(`${i + 1}. [${btn.tag}] "${btn.text}"`);
    console.log(`   Classes: ${btn.classes}`);
    console.log(`   Href: ${btn.href}\n`);
  });

  // Find the specific buttons mentioned
  const programeazaBtn = page.locator('text="Programează Consultație"').first();
  const faOProgramareBtn = page.locator('text="Fa o programare!"').first();

  console.log('\n=== COMPARING THE TWO BUTTONS ===\n');

  if (await programeazaBtn.count() > 0) {
    const info = await programeazaBtn.evaluate(el => ({
      tag: el.tagName,
      classes: el.className,
      parentClasses: el.parentElement?.className || 'none'
    }));
    console.log('Programează Consultație:');
    console.log(`  Tag: ${info.tag}`);
    console.log(`  Classes: ${info.classes}`);
    console.log(`  Parent: ${info.parentClasses}`);
  } else {
    console.log('Programează Consultație: NOT FOUND');
  }

  if (await faOProgramareBtn.count() > 0) {
    const info = await faOProgramareBtn.evaluate(el => ({
      tag: el.tagName,
      classes: el.className,
      parentClasses: el.parentElement?.className || 'none'
    }));
    console.log('\nFa o programare!:');
    console.log(`  Tag: ${info.tag}`);
    console.log(`  Classes: ${info.classes}`);
    console.log(`  Parent: ${info.parentClasses}`);
  } else {
    console.log('\nFa o programare!: NOT FOUND');
  }

  await browser.close();
}

compareButtons().catch(console.error);
