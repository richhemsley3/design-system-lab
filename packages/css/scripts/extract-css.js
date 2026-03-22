#!/usr/bin/env node
/**
 * Extracts .sds-* CSS rules from component HTML files into standalone CSS files.
 * Skips page chrome (body, h1, h2, .demo-*, .placeholder, etc.)
 */
const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', '..', '..', 'components');
const dataVizDir = path.join(__dirname, '..', '..', '..', 'data-viz');
const outComponentsDir = path.join(__dirname, '..', 'src', 'components');
const outDataVizDir = path.join(__dirname, '..', 'src', 'data-viz');

fs.mkdirSync(outComponentsDir, { recursive: true });
fs.mkdirSync(outDataVizDir, { recursive: true });

// Known page-chrome selectors to skip
const chromePatterns = [
  /^(\*|body|html|h[1-6]|p|code|a(?!\.)|ul|ol|li|pre|blockquote|hr)/,
  /^\.(demo|placeholder|section-divider|page-|spec-table|anatomy|example|preview|header-bar|context-demo|variant-grid|grid-)/,
  /^@font-face/,
  /^:root/,
];

function isChromeSelector(selector) {
  const trimmed = selector.trim();
  return chromePatterns.some(pat => pat.test(trimmed));
}

function extractStyleBlock(html) {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  return styleMatch ? styleMatch[1] : '';
}

function parseRules(cssText) {
  const rules = [];
  let current = '';
  let depth = 0;

  for (let i = 0; i < cssText.length; i++) {
    const ch = cssText[i];
    current += ch;
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        rules.push(current.trim());
        current = '';
      }
    }
  }

  return rules;
}

function filterSdsRules(rules) {
  return rules.filter(rule => {
    // Keep @media blocks that contain .sds- rules
    if (rule.startsWith('@media') || rule.startsWith('@keyframes')) {
      return rule.includes('.sds-') || rule.includes('sds-');
    }
    // Get the selector (everything before the first {)
    const selectorPart = rule.split('{')[0].trim();
    // Skip if it's a chrome selector
    if (isChromeSelector(selectorPart)) return false;
    // Keep if selector contains .sds-
    return selectorPart.includes('.sds-');
  });
}

// Track which .sds-btn rules we've already seen (for dedup)
const seenBtnRules = new Set();
const seenTagRules = new Set();
const seenCheckboxRules = new Set();
const seenFieldRules = new Set();
let isButtonsFile = false;
let isTagsFile = false;
let isSelectionControlsFile = false;
let isFormInputsFile = false;

function deduplicateRule(rule, filename) {
  const selector = rule.split('{')[0].trim();

  // .sds-btn rules: only keep in buttons.css
  if (selector.includes('.sds-btn') && !isButtonsFile) {
    return null; // skip duplicate
  }

  // .sds-tag rules: only keep in tags.css
  if (selector.includes('.sds-tag') && !isTagsFile && !selector.includes('.sds-table')) {
    return null;
  }

  return rule;
}

function processFile(htmlPath, outDir) {
  const filename = path.basename(htmlPath, '.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const cssText = extractStyleBlock(html);
  if (!cssText) return null;

  isButtonsFile = filename === 'buttons';
  isTagsFile = filename === 'tags';
  isSelectionControlsFile = filename === 'selection-controls';
  isFormInputsFile = filename === 'form-inputs';

  const rules = parseRules(cssText);
  let sdsRules = filterSdsRules(rules);

  // Deduplicate cross-component styles
  sdsRules = sdsRules.map(r => deduplicateRule(r, filename)).filter(Boolean);

  if (sdsRules.length === 0) return null;

  const header = `/* ${filename} — extracted from Design System Labs */\n\n`;
  const outPath = path.join(outDir, `${filename}.css`);
  fs.writeFileSync(outPath, header + sdsRules.join('\n\n') + '\n');
  return { filename, ruleCount: sdsRules.length };
}

// Process components (buttons first for dedup tracking)
const componentFiles = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.html'))
  .sort((a, b) => {
    // Process buttons, tags, selection-controls first (canonical sources)
    const priority = ['buttons.html', 'tags.html', 'selection-controls.html', 'form-inputs.html'];
    const aIdx = priority.indexOf(a);
    const bIdx = priority.indexOf(b);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });

console.log('Extracting component CSS...');
let totalComponents = 0;
for (const file of componentFiles) {
  const result = processFile(path.join(componentsDir, file), outComponentsDir);
  if (result) {
    console.log(`  ${result.filename}.css: ${result.ruleCount} rules`);
    totalComponents++;
  }
}

// Process data-viz files
console.log('\nExtracting data-viz CSS...');
const vizFiles = fs.readdirSync(dataVizDir).filter(f => f.endsWith('.html'));
let totalViz = 0;
for (const file of vizFiles) {
  const result = processFile(path.join(dataVizDir, file), outDataVizDir);
  if (result) {
    console.log(`  ${result.filename}.css: ${result.ruleCount} rules`);
    totalViz++;
  }
}

// Also copy the shared chart.css
const sharedChartSrc = path.join(__dirname, '..', '..', '..', 'shared', 'chart.css');
if (fs.existsSync(sharedChartSrc)) {
  fs.copyFileSync(sharedChartSrc, path.join(outDataVizDir, 'charts.css'));
  console.log('  charts.css: copied from shared/chart.css');
}

console.log(`\nDone: ${totalComponents} component files, ${totalViz} data-viz files`);
