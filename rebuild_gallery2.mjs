import fs from 'fs';

// 1. Read the header and footer from services.html
const services = fs.readFileSync('services.html', 'utf8');

const headerEnd = services.indexOf('<!-- PAGE HERO -->');
const footerStart = services.indexOf('<!-- FOOTER -->');

const header = services.substring(0, headerEnd);
let footer = services.substring(footerStart);
// Make sure Gallery link in navbar is active, and Services is inactive
let newHeader = header.replace('<li><a href="services.html" class="active">Services</a></li>', '<li><a href="services.html">Services</a></li>');
newHeader = newHeader.replace('<li><a href="gallery.html">Gallery</a></li>', '<li><a href="gallery.html" class="active">Gallery</a></li>');

// 2. Read the valid gallery items
const galleryRaw = fs.readFileSync('gallery.html', 'utf8');
const regex = /<div class="gallery-item[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let match;
let validItems = [];
while ((match = regex.exec(galleryRaw)) !== null) {
  if (match[1].includes('<img')) {
    validItems.push(match[0]);
  }
}

console.log(`Found ${validItems.length} valid gallery items.`);

// 3. Build the new gallery page
const newGallery = `${newHeader}
<!-- PAGE HERO -->
<section class="page-hero" style="background: linear-gradient(to right, rgba(10, 22, 40, 0.9), rgba(10, 22, 40, 0.7)), url('images/organized/hero/pdf_009.jpg') no-repeat center center/cover; padding: 120px 0 80px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div class="page-hero-inner" style="max-width: 1280px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 2;">
    <div class="breadcrumb" style="font-size: 0.9rem; color: #a1a1aa; margin-bottom: 1rem; display: flex; gap: 0.5rem; align-items: center;">
      <a href="index.html" style="color: #fff; text-decoration: none; transition: color 0.3s;">Home</a><span>/</span>
      <span style="color: #f97316;">Gallery</span>
    </div>
    <div class="section-label" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 1rem; border-radius: 9999px; background: rgba(255,255,255,0.1); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); font-size: 0.875rem; font-weight: 500; letter-spacing: 0.05em; color: #e5e7eb; margin-bottom: 1.5rem;">OUR WORK</div>
    <h1 class="section-title" style="font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; color: #fff; margin-bottom: 1.5rem; line-height: 1.1;">
      Project <span style="color: #f97316;">Gallery</span>
    </h1>
    <p style="color: #d1d5db; font-size: 1.25rem; max-width: 650px; line-height: 1.75; margin-bottom: 0;">
      A visual journey through our successfully executed projects across various infrastructure domains.
    </p>
  </div>
</section>

<!-- ==================== GALLERY PORTFOLIO ==================== -->
<section style="padding: 5rem 0; background: #fff;">
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 2rem;">
        
        <!-- Filter Controls -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 3rem;" id="gallery-filters">
            <button class="filter-btn active" data-filter="all" style="padding: 0.5rem 1.5rem; border-radius: 9999px; font-weight: 500; cursor: pointer; transition: all 0.3s; background: #0a1628; color: white; border: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">All Projects</button>
            <button class="filter-btn" data-filter="telecom" style="padding: 0.5rem 1.5rem; border-radius: 9999px; font-weight: 500; cursor: pointer; transition: all 0.3s; background: #f3f4f6; color: #4b5563; border: none;">Telecom</button>
            <button class="filter-btn" data-filter="infrastructure" style="padding: 0.5rem 1.5rem; border-radius: 9999px; font-weight: 500; cursor: pointer; transition: all 0.3s; background: #f3f4f6; color: #4b5563; border: none;">Infrastructure</button>
            <button class="filter-btn" data-filter="interior" style="padding: 0.5rem 1.5rem; border-radius: 9999px; font-weight: 500; cursor: pointer; transition: all 0.3s; background: #f3f4f6; color: #4b5563; border: none;">Interior Fit-outs</button>
        </div>

        <!-- Gallery Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem;" id="gallery-grid">
            ${validItems.join('\n\n            ')}
        </div>
    </div>
</section>

${footer}`;

// Add gallery filtering script right before </body>
const script = `
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => {
                    b.style.background = '#f3f4f6';
                    b.style.color = '#4b5563';
                    b.style.boxShadow = 'none';
                    b.classList.remove('active');
                });
                
                // Add active class to clicked
                btn.style.background = '#0a1628';
                btn.style.color = 'white';
                btn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
</script>
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
</body>
</html>`;

const finalGallery = newGallery.replace('</body>\n</html>', script);

fs.writeFileSync('gallery.html', finalGallery);
console.log('gallery.html correctly rebuilt with true header and footer!');
