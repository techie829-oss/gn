import sharp from 'sharp';
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

const imagesDir = 'images/organized';
const allFiles = walk(imagesDir);

allFiles.forEach(file => {
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    const parsed = path.parse(file);
    const output = path.join(parsed.dir, parsed.name + '.webp');
    
    sharp(file)
      .webp({ quality: 80 })
      .toFile(output)
      .then(() => {
        console.log(`Converted: ${file} -> ${output}`);
        // Delete original to save space
        fs.unlinkSync(file);
      })
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
});
