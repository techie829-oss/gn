const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The mangled text is "Engineering A Infrastructure A Excellence"
// Let's just find "GN Management Services</div>" and replace the next line.
html = html.replace(/<div class="logo-sub">.*<\/div>/g, '<div class="logo-sub">ENGINEERING &bull; INFRASTRUCTURE &bull; EXCELLENCE</div>');

// The dropdowns have mangled text like "dY? Company Overview"
// I will just use a generic regex to clean up mangled stuff:
html = html.replace(/dY\?[^\s]*\s/g, '&#128640; ');
html = html.replace(/dY\`[^\s]*\s/g, '&#128101; ');
html = html.replace(/dYZ_[^\s]*\s/g, '&#127919; ');
html = html.replace(/dYO\?[^\s]*\s/g, '&#128225; ');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html encoding issues');
