const fs = require('fs');
const files = ['index.html', 'about.html', 'contact.html', 'gallery.html', 'industries.html', 'projects.html', 'services.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix the Services submenu HTML issue
  content = content.replace(
    /<div class="mobile-nav-link" onclick="toggleMobileSub\(this\)">(?:\s|\\n)*<span>Services<\/span> <span>\+<\/span>(?:\s|\\n)*<\/div>(?:\s|\\n)*<div class="mobile-sub-links">([\s\S]*?)<\/div>/g,
    '<div class="mobile-nav-link" onclick="toggleMobileSub(this)">\n    <span>Services</span> <span>+</span>\n    <div class="mobile-sub-links">$1</div>\n  </div>'
  );

  // Fix the JavaScript toggle Mobile Sub logic
  content = content.replace(
    /if \(sub\) sub\.classList\.toggle\('open'\);/g,
    "el.classList.toggle('open');\n  if (sub) sub.classList.toggle('open');"
  );
  
  fs.writeFileSync(file, content);
}
console.log('HTML files fixed.');
