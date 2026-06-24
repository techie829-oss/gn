const fs = require('fs');

let custom = fs.readFileSync('css/custom.css', 'utf8');

custom = custom.replace(
  /font-size: clamp\(1\.8rem, 8vw, 2\.5rem\) !important;/g,
  'font-size: clamp(1.5rem, 8vw, 2.2rem) !important;'
);

if (!custom.includes('.hero-title br')) {
  custom = custom.replace(
    /h1, \.hero-title \{[\s\S]*?\}/,
    `h1, .hero-title {
    font-size: clamp(1.5rem, 8vw, 2.2rem) !important;
    line-height: 1.2;
    word-break: normal;
  }
  
  .hero-title br {
    display: none;
  }`
  );
}

fs.writeFileSync('css/custom.css', custom);

// Add cache busting to index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/href="css\/output\.css(\?v=\d+)?"/, 'href="css/output.css?v=' + Date.now() + '"');
fs.writeFileSync('index.html', indexHtml);

console.log('Fixed typography and added cache busting.');
