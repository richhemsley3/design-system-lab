#!/usr/bin/env node
/**
 * Parses CSS custom property declarations from token CSS files
 * and generates TypeScript constant objects.
 */
const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '..', 'css');
const jsDir = path.join(__dirname, '..', 'js');

fs.mkdirSync(jsDir, { recursive: true });

function extractTokens(cssContent) {
  const tokens = {};
  // Match only light-mode :root block custom properties (skip @media dark overrides)
  // We parse line by line within :root { ... } blocks that are NOT inside @media
  let inRoot = false;
  let inMedia = false;
  let braceDepth = 0;

  for (const line of cssContent.split('\n')) {
    const trimmed = line.trim();

    if (trimmed.startsWith('@media')) {
      inMedia = true;
    }

    if (trimmed.includes('{')) {
      braceDepth += (trimmed.match(/{/g) || []).length;
      if (trimmed.startsWith(':root') && !inMedia) {
        inRoot = true;
      }
    }

    if (inRoot && !inMedia) {
      const match = trimmed.match(/^(--[\w-]+)\s*:\s*(.+?)\s*;/);
      if (match) {
        tokens[match[1]] = match[2];
      }
    }

    if (trimmed.includes('}')) {
      braceDepth -= (trimmed.match(/}/g) || []).length;
      if (braceDepth <= 0) {
        inRoot = false;
        inMedia = false;
        braceDepth = 0;
      }
      if (braceDepth <= 1 && inMedia) {
        // closing :root inside @media
      }
    }
  }

  return tokens;
}

function toTsObject(name, tokens) {
  const entries = Object.entries(tokens)
    .map(([key, value]) => `  '${key}': ${JSON.stringify(value)}`)
    .join(',\n');

  return `export const ${name} = {\n${entries},\n} as const;\n\nexport type ${capitalize(name)}Token = keyof typeof ${name};\n`;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Generate colors.ts
const colorsCSS = fs.readFileSync(path.join(cssDir, 'colors.css'), 'utf8');
const colorTokens = extractTokens(colorsCSS);
fs.writeFileSync(path.join(jsDir, 'colors.ts'), toTsObject('colors', colorTokens));
console.log(`colors.ts: ${Object.keys(colorTokens).length} tokens`);

// Generate spacing.ts
const spacingCSS = fs.readFileSync(path.join(cssDir, 'spacing.css'), 'utf8');
const spacingTokens = extractTokens(spacingCSS);
fs.writeFileSync(path.join(jsDir, 'spacing.ts'), toTsObject('spacing', spacingTokens));
console.log(`spacing.ts: ${Object.keys(spacingTokens).length} tokens`);

// Generate typography.ts (skip @font-face, only :root vars)
const typographyCSS = fs.readFileSync(path.join(cssDir, 'typography.css'), 'utf8');
const typographyTokens = extractTokens(typographyCSS);
fs.writeFileSync(path.join(jsDir, 'typography.ts'), toTsObject('typography', typographyTokens));
console.log(`typography.ts: ${Object.keys(typographyTokens).length} tokens`);

// Generate index.ts barrel
const indexContent = `export { colors, type ColorsToken } from './colors';
export { spacing, type SpacingToken } from './spacing';
export { typography, type TypographyToken } from './typography';
`;
fs.writeFileSync(path.join(jsDir, 'index.ts'), indexContent);

console.log('Token generation complete.');
