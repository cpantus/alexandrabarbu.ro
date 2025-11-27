import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        downloadImage(response.headers.location!, filepath).then(resolve).catch(reject);
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function findAndDownloadTherapyImage() {
  console.log('🎨 Starting creative image search for consultation room...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Search Pexels for cozy, welcoming consultation spaces
    console.log('📸 Browsing Pexels for professional consultation imagery...');
    await page.goto('https://www.pexels.com/search/cozy%20office%20plants/', { waitUntil: 'networkidle' });

    await page.waitForSelector('article img', { timeout: 10000 });

    // Get the first few high-quality images
    const images = await page.$$eval('article', (articles) => {
      return articles.slice(0, 5).map((article) => {
        const img = article.querySelector('img');
        const link = article.querySelector('a');
        const photographer = article.querySelector('[class*="Photographer"]');

        return {
          src: img?.src || '',
          alt: img?.alt || '',
          link: link?.href || '',
          photographer: photographer?.textContent || 'Unknown'
        };
      }).filter(img => img.src && img.src.includes('pexels'));
    });

    console.log(`\n✅ Found ${images.length} candidate images:\n`);

    images.forEach((img, index) => {
      console.log(`${index + 1}. ${img.alt}`);
      console.log(`   Photographer: ${img.photographer}`);
      console.log(`   URL: ${img.link}\n`);
    });

    // Pick the best image (first one is usually highest quality)
    const selectedImage = images[0];

    if (!selectedImage) {
      throw new Error('No suitable images found');
    }

    console.log(`🎯 Selected image: "${selectedImage.alt}"`);
    console.log(`📷 by ${selectedImage.photographer}\n`);

    // Navigate to the image page to get full resolution download
    await page.goto(selectedImage.link, { waitUntil: 'networkidle' });

    // Find the download button
    const downloadButton = await page.$('button:has-text("Download")');

    if (!downloadButton) {
      console.log('⚠️  Download button not found, using preview image...');
    } else {
      await downloadButton.click();
      await page.waitForTimeout(1000);
    }

    // Get the high-res image URL
    const imageUrl = await page.evaluate(() => {
      // Try to find the highest quality image
      const img = document.querySelector('img[src*="pexels"]');
      return img?.src || '';
    });

    console.log(`⬇️  Downloading image...`);

    // Download to static/images/
    const outputDir = '/home/cere/Work/alex/alexandrabarbu.ro/static/images';
    const outputPath = path.join(outputDir, 'consultation-room.jpg');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await downloadImage(imageUrl, outputPath);

    console.log(`✅ Image downloaded to: ${outputPath}\n`);

    // Update attribution info
    const attributionPath = '/home/cere/Work/alex/alexandrabarbu.ro/IMAGE-ATTRIBUTION.md';
    const attribution = `# Image Attribution\n\n## Consultation Room Image\n\n- **Image**: ${selectedImage.alt}\n- **Photographer**: ${selectedImage.photographer}\n- **Source**: Pexels (Free to use)\n- **URL**: ${selectedImage.link}\n- **Downloaded**: ${new Date().toISOString()}\n`;

    fs.writeFileSync(attributionPath, attribution);

    console.log(`📝 Attribution saved to: ${attributionPath}\n`);

    console.log('🎉 SUCCESS! Image ready to use in feature-blocks section.');
    console.log('   Update your content files to use: images/consultation-room.jpg');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

findAndDownloadTherapyImage().catch(console.error);
