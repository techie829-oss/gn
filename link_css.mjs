import fs from 'fs';

const files = [
  'index.html',
  'about.html',
  'services.html',
  'projects.html',
  'industries.html',
  'gallery.html',
  'contact.html'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/href="css\/style\.css"/g, 'href="css/output.css"');
  fs.writeFileSync(f, c);
  console.log('Updated ' + f);
});
