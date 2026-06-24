const fs = require('fs');

let custom = fs.readFileSync('css/custom.css', 'utf8');
let custom2 = fs.readFileSync('css/custom2.css', 'utf8');

// Fix custom2.css
custom2 = custom2.replace(/word-break:\s*break-word\s*!important;/g, 'word-break: normal !important;');

// Fix custom.css badge
custom = custom.replace(/\.hero-badge\s*\{[\s\S]*?border-radius:\s*20px;\s*\}/, 
  `.hero-badge {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    height: auto;
    width: auto;
    max-width: 90%;
    border-radius: 50px;
    margin: 0 auto;
    font-size: 0.85rem;
  }`
);

// Also remove pulse dot margin overrides so it aligns normally
custom = custom.replace(/\.hero-badge\s*span\.pulse-dot\s*\{[\s\S]*?\}/, '');

fs.writeFileSync('css/custom.css', custom);
fs.writeFileSync('css/custom2.css', custom2);

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/href="css\/output\.css\?v=[^"]+"/, 'href="css/output.css?v=' + Date.now() + '"');
fs.writeFileSync('index.html', indexHtml);

console.log("CSS fixed.");
