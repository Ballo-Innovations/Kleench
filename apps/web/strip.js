const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      filelist = walkSync(p, filelist);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      filelist.push(p);
    }
  });
  return filelist;
};

const files = walkSync('apps/web/src');
let changed = 0;

files.forEach(file => {
  const og = fs.readFileSync(file, 'utf8');
  // Match space(s) followed by the prefix and its tailwind utility payload
  const rx = /\s+(sm|md|lg|xl|2xl|hover|group-hover):[a-zA-Z0-9\-\_\[\]\#\.]+/g;
  const rep = og.replace(rx, '');
  
  if (og !== rep) {
    fs.writeFileSync(file, rep);
    changed++;
    console.log("Updated", file);
  }
});

console.log('Changed files:', changed);
