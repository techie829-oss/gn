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
  
  // Fix the / loading="lazy" issue
  content = content.replace(/\/ loading="lazy">/g, 'loading="lazy" />');
  
  fs.writeFileSync(file, content);
  console.log(`Fixed ${file}`);
});
