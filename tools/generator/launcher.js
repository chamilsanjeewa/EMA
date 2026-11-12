// Root index.html: the meeting launcher (demo only, not part of the theme).
module.exports = function launcher(options, pages) {
  const label = { home: 'Home', programs: 'Programs', infant: 'Infant Care', enrollment: 'Enrollment', about: 'About Us', gallery: 'Gallery', faq: 'FAQ', news: 'News', contact: 'Contact' };
  const cards = Object.values(options).map((o) => `
      <article class="option" style="--accent: ${o.swatches[0]}">
        <a class="option__preview" href="option-${o.key}/index.html" tabindex="-1" aria-hidden="true">
          <img src="option-${o.key}/images/hero-home.jpg" alt="" width="${o.heroImg.w}" height="${o.heroImg.h}">
        </a>
        <div class="option__body">
          <p class="option__kicker">${o.name}</p>
          <h2 class="option__title" style="font-family: ${o.fontPreview.replace(/"/g, "'")}">${o.title}</h2>
          <p class="option__summary">${o.summary}</p>
          <ul class="option__swatches" aria-label="Main colors">
            ${o.swatches.map((s) => `<li style="background:${s}"><span class="vh">${s}</span></li>`).join('')}
          </ul>
          <a class="option__open" href="option-${o.key}/index.html">Open ${o.name}<span class="vh">: ${o.title}</span></a>
          <details class="option__pages">
            <summary>All pages</summary>
            <ul>
              ${pages.filter((p) => !p.post).map((p) => `<li><a href="option-${o.key}/${p.file}">${label[p.key] || p.title}</a></li>`).join('\n              ')}
            </ul>
          </details>
        </div>
      </article>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Design Options | Eagan Montessori Academy &amp; Amazing Beginnings</title>
  <style>
    :root {
      --bg: #f7f5f2;
      --surface: #ffffff;
      --text: #22201e;
      --muted: #5c5752;
      --border: #e5e0da;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font: 1rem/1.6 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
    img { display: block; max-width: 100%; height: auto; }
    a { color: inherit; }
    :focus-visible { outline: 3px solid #22201e; outline-offset: 3px; }
    .vh { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    .wrap { max-width: 76rem; margin: 0 auto; padding: 3rem 1rem 4rem; }
    header { margin-bottom: 2.5rem; }
    .kicker { margin: 0 0 .5rem; color: #8f3150; font-weight: 700; font-size: .875rem; letter-spacing: .1em; text-transform: uppercase; }
    h1 { margin: 0 0 .75rem; font-size: clamp(2rem, 1.5rem + 2.5vw, 3rem); line-height: 1.1; }
    .lead { max-width: 44rem; margin: 0; color: var(--muted); font-size: 1.125rem; }
    .grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr)); }
    .option { display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); box-shadow: 0 10px 30px -18px rgba(0,0,0,.3); }
    .option__preview img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
    .option__body { display: flex; flex: 1; flex-direction: column; padding: 1.5rem; border-top: 6px solid var(--accent); }
    .option__kicker { margin: 0; color: var(--muted); font-weight: 700; font-size: .875rem; text-transform: uppercase; letter-spacing: .08em; }
    .option__title { margin: .25rem 0 .5rem; font-size: 1.6rem; line-height: 1.2; }
    .option__summary { margin: 0 0 1rem; color: var(--muted); }
    .option__swatches { display: flex; gap: .4rem; margin: 0 0 1.25rem; padding: 0; list-style: none; }
    .option__swatches li { width: 2rem; height: 2rem; border: 1px solid rgba(0,0,0,.15); border-radius: 50%; }
    .option__open { display: inline-flex; align-self: flex-start; align-items: center; min-height: 2.75rem; margin-top: auto; padding: .65rem 1.25rem; border-radius: 8px; background: #22201e; color: #fff; font-weight: 700; text-decoration: none; }
    .option__open:hover { background: #000; }
    .option__pages { margin-top: 1rem; }
    .option__pages summary { cursor: pointer; font-weight: 600; }
    .option__pages ul { display: grid; grid-template-columns: 1fr 1fr; gap: .25rem 1rem; margin: .75rem 0 0; padding: 0; list-style: none; }
    .tips { margin-top: 2.5rem; padding: 1.25rem 1.5rem; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); }
    .tips h2 { margin: 0 0 .5rem; font-size: 1.125rem; }
    .tips ul { margin: 0; padding-left: 1.25rem; color: var(--muted); }
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <p class="kicker">Website redesign · Sample designs</p>
      <h1>Eagan Montessori Academy South &amp; Amazing Beginnings Montessori</h1>
      <p class="lead">Three design directions for the new website. Each option has the same pages and content, so they are easy to compare.</p>
    </header>
    <div class="grid">
${cards}
    </div>
    <section class="tips" aria-labelledby="tips-title">
      <h2 id="tips-title">Presenting tips</h2>
      <ul>
        <li>Use the <strong>A · B · C</strong> switcher at the bottom of every page to see the same page in another design.</li>
        <li>Make the browser window narrow (or use the phone view in developer tools) to show the mobile menu.</li>
        <li>Photos are free stock samples, not the school’s own photos. They will be replaced with real photos of the school.</li>
        <li>The language switcher, forms and “Apply Now” buttons are demo only.</li>
      </ul>
    </section>
  </main>
</body>
</html>
`;
};
