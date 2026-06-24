const fs = require('fs');
const ts = Date.now();
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
  let html = fs.readFileSync(file, 'utf8');
  // Replace any existing versioned or unversioned reference to output.css
  const updated = html.replace(/href="css\/output\.css(\?v=\d+)?"/g, `href="css/output.css?v=${ts}"`);
  if (updated !== html) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log('Updated:', file);
  }
});
console.log('Cache busted with v=' + ts);
