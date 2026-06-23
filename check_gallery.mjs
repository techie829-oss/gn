import fs from 'fs';
const content = fs.readFileSync('gallery.html', 'utf8');

const regex = /<div class="gallery-item[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let match;
let empty = 0;
let total = 0;
while ((match = regex.exec(content)) !== null) {
  total++;
  if (!match[1].includes('<img')) {
    empty++;
  }
}
console.log(`Total: ${total}, Empty: ${empty}`);
