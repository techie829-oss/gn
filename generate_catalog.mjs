import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('images/organized').filter(f => f.endsWith('.jpg'));
const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: sans-serif; background: #111; color: #fff; }
  .grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .card { border: 1px solid #333; padding: 5px; text-align: center; width: 200px; }
  img { max-width: 100%; height: 150px; object-fit: contain; background: #222; }
  .path { font-size: 10px; word-break: break-all; margin-top: 5px; }
</style>
</head>
<body>
<h1>Image Catalog (${files.length} images)</h1>
<div class="grid">
  ${files.map(f => `
    <div class="card">
      <img src="${f.replace(/\\/g, '/')}" alt="${f}">
      <div class="path">${f.replace(/\\/g, '/')}</div>
    </div>
  `).join('')}
</div>
</body>
</html>`;

fs.writeFileSync('image_catalog.html', html);
console.log('image_catalog.html generated');
