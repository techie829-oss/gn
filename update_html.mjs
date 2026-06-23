import fs from 'fs';

const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'projects.html',
  'industries.html',
  'gallery.html',
  'contact.html'
];

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace .jpg and .png with .webp
  content = content.replace(/\.jpg/g, '.webp');
  content = content.replace(/\.png/g, '.webp');

  // Fix the hero path if I made a mistake
  content = content.replace(/images\/organized\/hero\/pdf_009\.webp/g, 'images/organized/about/pdf_009.webp');
  
  // Remove tailwind CDN
  content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g, '');
  // Remove tailwind script tag config
  content = content.replace(/<script>tailwind\.config[\s\S]*?<\/script>\s*/g, '');

  // Add our compiled CSS file link in the head
  // Check if it already has <link rel="stylesheet" href="css/style.css" />
  // We'll rename it to main.css if needed, or keep it as css/style.css but we will build to it.
  
  // Add AOS Library CDN for animations
  if (!content.includes('href="https://unpkg.com/aos@next/dist/aos.css"')) {
    content = content.replace('</head>', '  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />\n</head>');
  }
  if (!content.includes('src="https://unpkg.com/aos@next/dist/aos.js"')) {
    content = content.replace('</body>', '  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>\n  <script>AOS.init({ duration: 800, once: true });</script>\n</body>');
  }

  // Add fetchpriority to Hero Images (first image on page)
  // Usually the hero is a background, but in index.html it's an img
  content = content.replace(/<img([^>]*)images\/organized\/about\/pdf_009\.webp([^>]*)>/, '<img$1images/organized/about/pdf_009.webp$2 fetchpriority="high">');

  // Add loading="lazy" to all other images that don't have it
  // Need to be careful.
  let imgRegex = /<img([^>]+)>/g;
  content = content.replace(imgRegex, (match, p1) => {
    if (!p1.includes('loading=') && !p1.includes('fetchpriority=')) {
      return `<img${p1} loading="lazy">`;
    }
    return match;
  });

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
