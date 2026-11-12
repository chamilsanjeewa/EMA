// Exports CSS, JS, icons, content data, photos and placeholders from the static demo
// generator into the Drupal themes and module.
const fs = require('fs');
const path = require('path');
const common = require('./css-common');
const { options, themesCss } = require('./css-options');
const jsFiles = require('./js-components');
const img = require('./images');
const C = require('./content');

const ROOT = process.argv[2];
const THEMES = path.join(ROOT, 'web/themes/custom');
const MOD = path.join(ROOT, 'web/modules/custom/ema_site');
const SUB = { a: 'ema_warm', b: 'ema_modern', c: 'ema_calm' };
const EYEBROW = { hero: '.hero__eyebrow', 'section-heading': '.section-heading__eyebrow', 'media-text': '.media-text__eyebrow' };

const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };

// Drupal-specific selector changes (regions/sections are rendered by paragraphs).
const drupalize = (css) => css
  .replace(/\.region--highlighted\b/g, '.paragraph--highlights');

// ---- Base theme: global CSS + component CSS -------------------------------
write(path.join(THEMES, 'ema_base/css/base.css'), common.base);
write(path.join(THEMES, 'ema_base/css/layout.css'), drupalize(common.layout));
for (const [name, css] of Object.entries(common.components)) {
  if (name === 'option-switcher') continue; // demo only, not in Drupal
  write(path.join(THEMES, `ema_base/components/${name}/${name}.css`),
    `/**\n * Component: ${name} (shared styles; option themes extend this library).\n */\n` + drupalize(css));
}

// ---- Icon component: paths map -------------------------------------------
const iconsSrc = fs.readFileSync(path.join(__dirname, 'icons.js'), 'utf8');
const P = eval('(' + iconsSrc.slice(iconsSrc.indexOf('const P = ') + 10, iconsSrc.indexOf('};', iconsSrc.indexOf('const P = ')) + 1) + ')');
const twigMap = Object.entries(P).map(([k, v]) => `  '${k}': '${v.replace(/'/g, "\\'")}',`).join('\n');
write(path.join(THEMES, 'ema_base/components/icon/icon.twig'),
`{#
/**
 * @file
 * Icon: decorative inline SVG (always aria-hidden).
 */
#}
{% set paths = {
${twigMap}
} %}
{% if paths[name] is defined %}
<svg class="icon icon--{{ name }}{{ extra_class ? ' ' ~ extra_class }}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{{ paths[name]|raw }}</svg>
{% endif %}
`);
write(path.join(MOD, 'assets/icons.json'), JSON.stringify(Object.keys(P)));

// ---- JS: convert to Drupal behaviors --------------------------------------
const behaviorName = (n) => 'ema' + n.split('-').map((p) => p[0].toUpperCase() + p.slice(1)).join('');
for (const name of ['main-menu', 'faq-accordion', 'gallery-grid']) {
  let js = jsFiles[name];
  js = js.replace('(function () {', '(function (Drupal, once) {');
  js = js.replace(
    `  document.querySelectorAll('[data-component="${name}"]').forEach(init);\n})();`,
    `  Drupal.behaviors.${behaviorName(name)} = {\n    attach(context) {\n      once('${name}', '[data-component="${name}"]', context).forEach(init);\n    },\n  };\n})(Drupal, once);`);
  if (!js.includes('Drupal.behaviors')) throw new Error('behavior conversion failed: ' + name);
  write(path.join(THEMES, `ema_base/components/${name}/${name}.js`), js);
}

// ---- Subthemes: tokens, overrides, palettes, images ------------------------
for (const opt of Object.values(options)) {
  const dir = path.join(THEMES, SUB[opt.key]);
  write(path.join(dir, 'css/tokens.css'), opt.tokens);
  const o = opt.overrides;
  write(path.join(dir, 'css/overrides/global.css'), `/* ${opt.name}: global overrides (base + layout). */\n` + drupalize((o.base || '') + (o.layout || '')));
  const comps = [];
  for (const name of Object.keys(common.components)) {
    let css = '';
    if (EYEBROW[name] && o.eyebrow) css += o.eyebrow(EYEBROW[name]);
    if (o[name]) css += o[name];
    if (!css) continue;
    comps.push(name);
    write(path.join(dir, `css/overrides/${name}.css`), `/* ${opt.name}: ${name} */\n` + drupalize(css));
  }
  // Placeholders (staff, school buildings, map) in this option's colors.
  write(path.join(dir, 'images/placeholders/staff.svg'), img.placeholder({ w: 400, h: 400, name: 'Staff portrait', note: 'Add a photo' }, opt.ph));
  write(path.join(dir, 'images/placeholders/school-building.svg'), img.placeholder({ w: 800, h: 450, name: 'School building', note: 'Add a photo' }, opt.ph));
  write(path.join(dir, 'images/placeholders/image.svg'), img.placeholder({ w: 800, h: 600, name: 'Photo', note: 'Add a photo' }, opt.ph));
  write(path.join(dir, 'favicon.svg'), img.favicon(opt.key));
}

// ---- Module assets: content data + photos ---------------------------------
write(path.join(MOD, 'assets/content.json'), JSON.stringify({ ...C, programDetails: require('./program-details'), news: require('./news') }, null, 2));
const picks = JSON.parse(fs.readFileSync(path.join(__dirname, 'photos/picks.json'), 'utf8'));
const credits = [];
for (const [slot, p] of Object.entries(picks)) {
  if (slot.startsWith('staff-')) continue;
  fs.mkdirSync(path.join(MOD, 'assets/photos'), { recursive: true });
  fs.copyFileSync(path.join(__dirname, 'photos/orig', `${p.idx}.jpg`), path.join(MOD, 'assets/photos', `${slot}.jpg`));
  credits.push(`| ${slot}.jpg | ${unescape(p.creator)} | ${p.foreign_landing_url} | CC0 |`);
}
write(path.join(MOD, 'assets/photos/CREDITS.md'), `# Sample photo credits\n\nCC0 (public domain) photos from StockSnap via Openverse. Demo only: replace with the school's own photos.\n\n| File | Photographer | Source | License |\n|---|---|---|---|\n${credits.join('\n')}\n`);
console.log('exported');
