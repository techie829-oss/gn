import fs from 'fs';
import path from 'path';

function walk(dir) {
  const results = [];
  if (!fs.existsSync(dir)) { console.log('NOT FOUND:', dir); return results; }
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

const all = walk('images/organized');
console.log('Total files:', all.length);

// group by folder
const byFolder = {};
for (const f of all) {
  const folder = path.dirname(f).replace(/\\/g, '/');
  byFolder[folder] = (byFolder[folder] || []);
  byFolder[folder].push(path.basename(f));
}

for (const [folder, files] of Object.entries(byFolder)) {
  console.log(`\n[${folder}] (${files.length} files)`);
  files.sort().forEach(f => console.log('  ', f));
}
