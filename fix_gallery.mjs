import fs from 'fs';

const file = 'gallery.html';
let content = fs.readFileSync(file, 'utf8');

// Regex to find all <div class="gallery-item ..."> ... </div>
// and remove it if it doesn't contain an <img
// We can use a simpler approach: split by gallery-item and filter.
// Or we can use regex: /<div class="gallery-item[^>]*>([\s\S]*?)<\/div>\s*(?=<div class="gallery-item|<\/div>)/

// Better approach with string replacement using a simple loop
let newContent = '';
const items = content.split('<div class="gallery-item');

newContent += items[0];

for (let i = 1; i < items.length; i++) {
  const itemStr = '<div class="gallery-item' + items[i];
  // Find the end of this div block. It's tricky with nested divs.
  // Actually, let's just use JS to find if it has an img tag before the next gallery-item or container end.
}

// Alternatively, let's just use a regex for the gallery item block
// A gallery item block looks like:
// <div class="gallery-item group relative overflow-hidden rounded-xl bg-gray-100" data-category="...">
//     <img ...> or empty
//     <div class="absolute ..."> ... </div>
// </div>
// Let's remove the block if it lacks <img

// Since the structure is consistent:
const regex = /<div class="gallery-item[^>]*>[\s]*<div class="absolute inset-0 bg-primary-dark\/80 opacity-0[^>]*>[\s\S]*?<\/div>\s*<\/div>/g;

content = content.replace(regex, '');

fs.writeFileSync(file, content);
console.log('gallery.html fixed.');
