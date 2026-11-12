// Builds the static demo into the project folder.
const fs = require('fs');
const path = require('path');
const { options, themes, themeVars, themesCss } = require('./css-options');
const common = require('./css-common');
const jsFiles = require('./js-components');
const img = require('./images');
const X = require('./components');
const { pages } = require('./pages');
const photos = require('./photos');

const OUT = process.argv[2];
if (!OUT) throw new Error('Usage: node build.js <outDir>');

const CSS_ORDER = ['button', 'header', 'utility-bar', 'language-switcher', 'site-branding', 'main-menu', 'hero', 'page-header',
  'breadcrumb', 'section-heading', 'feature-list', 'media-text', 'program-card', 'testimonial', 'history-timeline', 'staff-card',
  'enrollment-steps', 'news-card', 'news-listing', 'location-card', 'gallery-grid', 'faq-accordion', 'contact-form', 'contact-info', 'location-map', 'sidebar-nav',
  'social-links', 'cta-banner', 'footer'];
const EYEBROW = { hero: '.hero__eyebrow', 'section-heading': '.section-heading__eyebrow', 'media-text': '.media-text__eyebrow' };

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

const usage = {}; // component -> Set(page file)

function componentCss(opt, name) {
  const o = opt.overrides;
  let css = `/**\n * Component: ${name}\n * Drupal SDC: components/${name}/${name}.css\n */\n` + common.components[name];
  if (EYEBROW[name] && o.eyebrow) css += o.eyebrow(EYEBROW[name]);
  if (o[name]) css += `\n/* ${opt.name} styles */` + o[name];
  return css;
}

function renderPage(opt, page) {
  const used = new Set();
  const ctx = { opt, pageKey: page.key, use: (n) => used.add(n) };
  const r = page.render(ctx);
  const head = X.header(ctx);
  const foot = X.footer(ctx);
  used.add('button');

  used.forEach((n) => {
    usage[n] = usage[n] || new Set();
    usage[n].add(page.file);
  });

  const css = CSS_ORDER.filter((n) => used.has(n)).map((n) => `  <link rel="stylesheet" href="css/components/${n}.css">`).join('\n');
  const js = ['main-menu', 'language-switcher', 'faq-accordion', 'gallery-grid', 'news-listing', 'contact-form']
    .filter((n) => used.has(n)).map((n) => `  <script src="js/components/${n}.js"></script>`).join('\n');

  const content = r.withSidebar
    ? `  <div class="layout layout--with-sidebar container">
    <!-- region: content -->
    <div class="region region--content">
${r.content}
    </div>
    <!-- region: sidebar -->
    <aside class="region region--sidebar" aria-label="Sidebar">
${r.sidebar}
    </aside>
  </div>`
    : `  <!-- region: content -->
  <div class="region region--content">
${r.content}
  </div>`;

  const title = page.key === 'home'
    ? 'Eagan Montessori Academy South &amp; Amazing Beginnings Montessori | Montessori &amp; Child Care'
    : `${page.title} | Eagan Montessori Academy &amp; Amazing Beginnings Montessori`;

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${page.description.replace(/&/g, '&amp;')}">
  <link rel="icon" href="images/favicon.svg" type="image/svg+xml">
  <script>document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    /* Demo only: apply the saved color theme before the page paints. */
    try { var t = localStorage.getItem('ema-demo-theme'); if (t) { document.documentElement.setAttribute('data-theme', t); } } catch (e) {}</script>
  <!-- Global library: tokens, base, layout -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/themes.css"><!-- demo only: color themes -->
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <!-- Component libraries used on this page -->
${css}
  <!-- Demo only -->
  <link rel="stylesheet" href="css/components/option-switcher.css">
</head>
<body class="page page--${page.key}">
<a class="skip-link" href="#main-content">Skip to main content</a>
<div class="page-wrapper">

${head}

<main id="main-content" tabindex="-1">
  <!-- region: hero -->
  <div class="region region--hero">
${r.hero}
  </div>
${r.highlighted ? `
  <!-- region: highlighted -->
  <div class="region region--highlighted">
  ${r.highlighted}
  </div>
` : ''}
${content}
</main>

${r.footerTop || ''}

${foot}

</div>

${X.optionSwitcher(ctx, page.file)}

${js}
  <script src="js/components/option-switcher.js"></script><!-- demo only -->
</body>
</html>
`;
}

// --- Contrast check (WCAG 2.x) -----------------------------------------
function lum(hex) {
  const v = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(v.substr(i, 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
function tokensOf(css) {
  const t = {};
  css.replace(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})/g, (m, k, v) => { t[k] = v; });
  return t;
}
function checkContrast(opt) {
  const t = tokensOf(opt.tokens);
  const text = [
    ['text', 'bg'], ['text', 'surface'], ['text', 'surface-alt'], ['text', 'hero-bg'], ['text', 'page-header-bg'],
    ['text-muted', 'bg'], ['text-muted', 'surface'], ['text-muted', 'surface-alt'], ['text-muted', 'page-header-bg'],
    ['heading', 'bg'], ['heading', 'surface-alt'],
    ['link', 'bg'], ['link', 'surface'], ['link', 'surface-alt'], ['link', 'page-header-bg'],
    ['eyebrow', 'bg'], ['eyebrow', 'surface'], ['eyebrow', 'surface-alt'], ['eyebrow', 'hero-bg'],
    ['on-primary', 'primary'], ['on-primary', 'primary-dark'], ['on-primary', 'cta-bg'], ['primary-dark', 'surface'], ['primary-dark', 'surface-alt'],
    ['utility-text', 'utility-bg'], ['tag-text', 'tag-bg'], ['icon-fg', 'icon-bg'],
    ['footer-text', 'footer-bg'], ['footer-muted', 'footer-bg'], ['footer-heading', 'footer-bg'],
    ['on-accent', 'accent'], ['error', 'surface'], ['error', 'error-bg'], ['success-text', 'success-bg'],
  ];
  const ui = [['input-border', 'surface'], ['focus-light', 'bg'], ['focus-light', 'surface'], ['focus-light', 'surface-alt'], ['focus-inverse', 'primary'], ['focus-inverse', 'footer-bg'], ['focus-inverse', 'utility-bg']];
  const res = [];
  const run = (pairs, min) => pairs.forEach(([f, b]) => {
    const fg = t[f] || (t[f] === undefined && f.startsWith('error') ? '#b3261e' : undefined);
    let bg = t[b];
    if (b === 'error-bg') bg = '#fdecea';
    if (b === 'success-bg') bg = '#e6f4ea';
    const fgc = f === 'error' ? '#b3261e' : f === 'success-text' ? '#1e5631' : fg;
    if (!fgc || !bg) return; // transparent tokens are skipped (they sit on bg)
    const r = ratio(fgc, bg);
    res.push({ pair: `${f} on ${b}`, ratio: r.toFixed(2), min, pass: r >= min });
  });
  run(text, 4.5);
  run(ui, 3);
  return res;
}

// --- Build ---------------------------------------------------------------
const report = {};
for (const opt of Object.values(options)) {
  const dir = path.join(OUT, `option-${opt.key}`);
  fs.rmSync(dir, { recursive: true, force: true });

  write(path.join(dir, 'css/tokens.css'), opt.tokens);
  write(path.join(dir, 'css/themes.css'), themesCss(opt.key));
  write(path.join(dir, 'css/base.css'), common.base + (opt.overrides.base || ''));
  write(path.join(dir, 'css/layout.css'), common.layout + (opt.overrides.layout || ''));
  for (const name of CSS_ORDER) write(path.join(dir, `css/components/${name}.css`), componentCss(opt, name));
  write(path.join(dir, 'css/components/option-switcher.css'), common.components['option-switcher']);
  for (const [name, code] of Object.entries(jsFiles)) write(path.join(dir, `js/components/${name}.js`), code);

  // Sample photos where available; labeled SVG placeholders always kept in images/placeholders/.
  const photoNames = new Set();
  for (const im of img.imageList(opt)) {
    write(path.join(dir, 'images/placeholders', im.file), img.placeholder(im, opt.ph));
    const base = im.file.replace(/\.svg$/, '');
    if (photos.makePhoto(base, im.w, im.h, path.join(dir, 'images', base + '.jpg'))) photoNames.add(base);
    else write(path.join(dir, 'images', im.file), img.placeholder(im, opt.ph));
  }
  write(path.join(dir, 'images/CREDITS.md'), photos.credits());
  opt.photoNames = photoNames;
  write(path.join(dir, 'images/favicon.svg'), img.favicon(opt.key));

  const usePhotos = (html) => html.replace(/images\/([\w-]+)\.svg/g, (m, n) => (photoNames.has(n) ? `images/${n}.jpg` : m));
  for (const page of pages) write(path.join(dir, page.file), usePhotos(renderPage(opt, page)));
  report[opt.key] = checkContrast(opt);
  for (const t of themes) {
    const vars = Object.entries(themeVars(opt.key, t)).map(([k, v]) => `--${k}: ${v};`).join('\n');
    report[`${opt.key}/${t.key}`] = checkContrast({ tokens: opt.tokens + '\n' + vars });
  }
}

// Root launcher
write(path.join(OUT, 'index.html'), require('./launcher')(options, pages));

// Outputs for README + verification
const usageOut = {};
for (const [k, v] of Object.entries(usage)) usageOut[k] = [...v];
write(path.join(__dirname, 'usage.json'), JSON.stringify(usageOut, null, 2));
let fails = 0;
for (const [k, rows] of Object.entries(report)) {
  const bad = rows.filter((r) => !r.pass);
  fails += bad.length;
  const min = rows.reduce((m, r) => Math.min(m, r.ratio / r.min), 99);
  console.log(`Option ${k.toUpperCase()}: ${rows.length} color pairs checked, ${bad.length} failing, lowest margin ${min.toFixed(2)}x`);
  bad.forEach((b) => console.log('   FAIL', b.pair, b.ratio, '<', b.min));
}
console.log(fails ? 'CONTRAST FAILURES' : 'All contrast checks pass');
