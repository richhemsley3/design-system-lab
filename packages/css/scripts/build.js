#!/usr/bin/env node
/**
 * Copies src/ CSS to dist/ for distribution.
 * Individual component files are preserved for selective imports.
 */
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith('.css')) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean
fs.rmSync(distDir, { recursive: true, force: true });

// Copy all CSS
copyDir(srcDir, distDir);

// Count files
let count = 0;
function countFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) countFiles(path.join(dir, entry.name));
    else if (entry.name.endsWith('.css')) count++;
  }
}
countFiles(distDir);

console.log(`@sds/css: ${count} CSS files built to dist/`);
