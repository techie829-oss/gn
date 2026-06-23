const fs = require('fs');
const pages = ['contact.html','gallery.html','industries.html','projects.html','about.html','services.html'];
const allClasses = new Set();
pages.forEach(p => {
  const html = fs.readFileSync(p, 'utf8');
  const regex = /class="([^"]+)"/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    m[1].split(/\s+/).forEach(c => c && allClasses.add(c));
  }
});

const css = fs.readFileSync('css/output.css', 'utf8');
const missing = [];
allClasses.forEach(cls => {
  if (!cls.startsWith('!') && !cls.startsWith('lg:') && !cls.startsWith('md:') && !cls.startsWith('xl:') && !css.includes('.' + cls)) {
    missing.push(cls);
  }
});
console.log('MISSING CLASSES:', missing.sort().join(', '));
