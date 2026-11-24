const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const items = [
  'index.html',
  'assets',
  'photogallery',
  'bride.png',
  'couple.png',
  'groom.png',
  'loading.png',
  'music.mp3',
  'favicon.svg',
  'thumbnail.jpeg',
  'robots.txt'
];

for (const item of items) {
  const p = path.join(__dirname, item);
  if (fs.existsSync(p)) {
    copyRecursive(p, path.join(dist, item));
    console.log(`Copied ${item} -> dist/${item}`);
  }
}

console.log('\nBuild finished successfully! All assets are in dist/');
