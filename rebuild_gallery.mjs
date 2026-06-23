import fs from 'fs';

// 1. Read the header and footer from services.html
const services = fs.readFileSync('services.html', 'utf8');

const headerEnd = services.indexOf('<!-- ==================== PAGE HEADER ==================== -->');
const footerStart = services.indexOf('<!-- ==================== FOOTER ==================== -->');

const header = services.substring(0, headerEnd);
const footer = services.substring(footerStart);

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
const newGallery = `${header}
<!-- ==================== PAGE HEADER ==================== -->
<section class="relative pt-32 pb-20 bg-primary-dark overflow-hidden">
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-primary-dark/90 z-10"></div>
        <img src="images/organized/hero/pdf_009.jpg" alt="Gallery Header" class="w-full h-full object-cover">
    </div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div class="max-w-3xl text-white">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                <span class="text-sm font-medium tracking-wider text-gray-200">OUR WORK</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Project <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Gallery</span>
            </h1>
            <p class="text-xl text-gray-300">
                A visual journey through our successfully executed projects across various infrastructure domains.
            </p>
        </div>
    </div>
</section>

<!-- ==================== GALLERY PORTFOLIO ==================== -->
<section class="py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter Controls -->
        <div class="flex flex-wrap justify-center gap-4 mb-12" id="gallery-filters">
            <button class="filter-btn active px-6 py-2 rounded-full font-medium transition-all duration-300 bg-primary-dark text-white shadow-lg" data-filter="all">All Projects</button>
            <button class="filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-dark" data-filter="telecom">Telecom</button>
            <button class="filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-dark" data-filter="infrastructure">Infrastructure</button>
            <button class="filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-dark" data-filter="interior">Interior Fit-outs</button>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
            ${validItems.join('\n\n            ')}
        </div>
    </div>
</section>

<!-- ==================== CTA SECTION ==================== -->
<section class="py-20 bg-gray-50 relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="bg-primary-dark rounded-2xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-[url('images/pattern-bg.svg')] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            <div class="relative z-10 max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your next project?</h2>
                <p class="text-xl text-gray-300 mb-10">Partner with GN Management Services for reliable, scalable, and innovative infrastructure solutions.</p>
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="contact.html" class="px-8 py-4 bg-accent hover:bg-orange-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-accent/30 flex items-center gap-2">
                        Get in Touch <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
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
                    b.classList.remove('bg-primary-dark', 'text-white', 'shadow-lg');
                    b.classList.add('bg-gray-100', 'text-gray-600');
                });
                
                // Add active class to clicked
                btn.classList.remove('bg-gray-100', 'text-gray-600');
                btn.classList.add('bg-primary-dark', 'text-white', 'shadow-lg');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add a small animation effect
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
console.log('gallery.html rebuilt successfully.');
