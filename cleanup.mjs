import fs from 'fs';
import path from 'path';

const badImages = [
  "pdf_001.jpg", "pdf_002.jpg", "pdf_003.jpg", "pdf_004.jpg", "pdf_005.jpg", "pdf_006.jpg", "pdf_007.jpg", "pdf_008.jpg", "pdf_010.jpg", "pdf_011.jpg", "pdf_012.jpg", "pdf_013.jpg", "pdf_014.jpg", "pdf_021.jpg", "pdf_022.jpg", "pdf_024.jpg", "pdf_025.jpg", "pdf_028.jpg", "pdf_035.jpg", "pdf_036.jpg", "pdf_037.jpg", "pdf_040.jpg", "pdf_041.jpg", "pdf_042.jpg", "pdf_045.jpg", "pdf_046.jpg", "pdf_047.jpg", "pdf_048.jpg", "pdf_049.jpg", "pdf_050.jpg", "pdf_053.jpg", "pdf_055.jpg", "pdf_056.jpg", "pdf_057.jpg", "pdf_058.jpg", "pdf_059.jpg", "pdf_060.jpg", "pdf_061.jpg", "pdf_064.jpg", "pdf_074.jpg", "pdf_075.jpg", "pdf_076.jpg", "pdf_077.jpg", "pdf_078.jpg"
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

// 1. Delete bad files
const allFiles = walk('images/organized');
let deletedCount = 0;
allFiles.forEach(f => {
  const basename = path.basename(f);
  if (badImages.includes(basename)) {
    fs.unlinkSync(f);
    deletedCount++;
    console.log('Deleted:', f);
  }
});
console.log(`Total bad images deleted: ${deletedCount}`);

// 2. Scrub HTML files
const htmlFiles = [
  'index.html', 'about.html', 'services.html', 'projects.html', 'industries.html', 'gallery.html', 'contact.html'
];

htmlFiles.forEach(htmlFile => {
  if (!fs.existsSync(htmlFile)) return;
  let content = fs.readFileSync(htmlFile, 'utf8');
  let originalLength = content.length;
  
  // For 'about.html' -> Remove the ENTIRE Company Documents section that contains pdf_005..pdf_011
  if (htmlFile === 'about.html') {
    // regex to remove the <section class="section section-alt"> ... Company Documents & Values ... </section>
    content = content.replace(/<!-- ==================== COMPANY DOCUMENTS ==================== -->[\s\S]*?<\/section>/g, '');
    
    // Also remove the placeholder H or pdf_012 image we added
    content = content.replace(/<img src="images\/organized\/team\/pdf_012\.jpg"[^>]+>/g, `<div style="width:90px;height:90px;background:linear-gradient(135deg,var(--accent),#c2410c);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-size:2.5rem;font-weight:700;color:#fff;margin:0 auto 1rem;">H</div>`);
  }

  // General scrubbing of image tags matching any badImage
  badImages.forEach(badImg => {
    // Regex matches <img> tags containing the bad image name.
    const imgRegex = new RegExp(`<img[^>]*src="[^"]*${badImg}"[^>]*>`, 'gi');
    content = content.replace(imgRegex, '');
    
    // Some images might be inside style="..." backgrounds
    const bgRegex = new RegExp(`style="[^"]*background-image:\\s*url\\([^)]*${badImg}\\)[^"]*"`, 'gi');
    content = content.replace(bgRegex, 'style="background-color: #1a2942;"'); // replace with solid color instead of bg image
  });

  if (content.length !== originalLength) {
    fs.writeFileSync(htmlFile, content);
    console.log(`Scrubbed ${htmlFile}`);
  }
});

console.log('Cleanup complete.');
