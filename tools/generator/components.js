// HTML renderers for every component. Each one maps 1:1 to a future Drupal SDC.
const { icon, mark } = require('./icons');
const C = require('./content');
const S = C.site;
const L = C.locations;
const N = require('./news');

const cmt = (name) => `<!-- component: ${name} -->`;

function button(ctx, { label, href, mod = 'primary', size = '', extra = '', iconName = '' }) {
  ctx.use('button');
  const cls = ['button', `button--${mod}`, size ? `button--${size}` : '', extra].filter(Boolean).join(' ');
  return `<a class="${cls}" href="${href}">${label}${iconName ? icon(iconName) : ''}</a>`;
}
const apply = (ctx, o = {}) => button(ctx, { label: 'Apply Now', href: S.applyHref, ...o });

function siteBranding(ctx, { inverse = false } = {}) {
  ctx.use('site-branding');
  return `${cmt('site-branding')}
<a class="site-branding${inverse ? ' site-branding--inverse' : ''}" href="index.html" rel="home">
  ${mark(ctx.opt.key)}
  <span class="site-branding__name">${S.nameLine1}<span class="site-branding__tagline">${S.nameLine2}</span></span>
</a>`;
}

function languageSwitcher(ctx) {
  ctx.use('language-switcher');
  const langs = [
    ['en', 'English', 'English selected.'],
    ['es', 'Español', 'Demo only: the Spanish version will be added later.'],
    ['so', 'Soomaali', 'Demo only: the Somali version will be added later.'],
  ];
  return `${cmt('language-switcher')}
<div class="language-switcher" data-component="language-switcher">
  <button type="button" class="language-switcher__toggle" aria-expanded="false" aria-controls="language-switcher-list">
    ${icon('globe')}<span class="visually-hidden">Language:</span> <span class="language-switcher__current">English</span>${icon('chevron-down')}
  </button>
  <ul class="language-switcher__list" id="language-switcher-list">
${langs.map(([code, label, msg]) => `    <li class="language-switcher__item"><a class="language-switcher__link" href="#" lang="${code}" hreflang="${code}" data-demo-message="${msg}"${code === 'en' ? ' aria-current="true"' : ''}>${label}</a></li>`).join('\n')}
  </ul>
  <p class="language-switcher__status" role="status"></p>
</div>`;
}

function utilityBar(ctx) {
  ctx.use('utility-bar');
  return `${cmt('utility-bar')}
<div class="utility-bar">
  <div class="utility-bar__inner container">
    <ul class="utility-bar__list">
      <li class="utility-bar__item utility-bar__item--hours">${icon('clock')}${S.hoursShort}</li>
${L.map((l) => `      <li class="utility-bar__item"><a class="utility-bar__link" href="${l.phoneHref}">${icon('phone')}<span class="utility-bar__text"><span class="utility-bar__label">${l.short}</span><span class="utility-bar__number"><span class="utility-bar__sep">: </span>${l.phone}</span></span></a></li>`).join('\n')}
    </ul>
    ${languageSwitcher(ctx)}
  </div>
</div>`;
}

function mainMenu(ctx) {
  ctx.use('main-menu');
  const page = ctx.pageKey;
  const inPrograms = page === 'programs' || page.startsWith('program-');
  const items = C.menu.map((m) => {
    const current = m.key === page ? ' aria-current="page"' : '';
    if (!m.children) {
      const trail = !current && page.startsWith(m.key + '-') ? ' is-active-trail' : '';
      return `      <li class="main-menu__item${trail}"><a class="main-menu__link" href="${m.href}"${current}>${m.label}</a></li>`;
    }
    const subs = C.programs.map((p) => `          <li class="main-menu__subitem"><a class="main-menu__sublink" href="${p.href}"${page === 'program-' + p.key ? ' aria-current="page"' : ''}>${p.title}</a></li>`).join('\n');
    return `      <li class="main-menu__item main-menu__item--has-children${inPrograms ? ' is-active-trail' : ''}">
        <div class="main-menu__parent">
          <a class="main-menu__link" href="${m.href}"${current}>${m.label}</a>
          <button type="button" class="main-menu__submenu-toggle" aria-expanded="false" aria-controls="main-menu-submenu-programs">
            <span class="visually-hidden">${m.label} submenu</span>${icon('chevron-down')}
          </button>
        </div>
        <ul class="main-menu__submenu" id="main-menu-submenu-programs">
${subs}
        </ul>
      </li>`;
  }).join('\n');
  return `${cmt('main-menu')}
<nav class="main-menu" aria-label="Main" data-component="main-menu">
  <button type="button" class="main-menu__toggle" aria-expanded="false" aria-controls="main-menu-panel">
    <span class="main-menu__toggle-icon main-menu__toggle-icon--open">${icon('menu')}</span><span class="main-menu__toggle-icon main-menu__toggle-icon--close">${icon('close')}</span>
    <span class="main-menu__toggle-label">Menu</span>
  </button>
  <div class="main-menu__panel" id="main-menu-panel">
    <ul class="main-menu__list">
${items}
    </ul>
    ${apply(ctx, { extra: 'main-menu__cta' })}
  </div>
</nav>`;
}

function header(ctx) {
  ctx.use('header');
  return `<!-- region: header -->
<header class="region region--header site-header">
  ${cmt('header')}
  ${utilityBar(ctx)}
  <div class="site-header__inner container">
    ${siteBranding(ctx)}
    <!-- region: primary_menu -->
    <div class="region region--primary-menu">
      ${mainMenu(ctx)}
    </div>
  </div>
</header>`;
}

function hero(ctx) {
  ctx.use('hero');
  const v = ctx.opt.heroVariant;
  const { w, h } = ctx.opt.heroImg;
  const media = `<div class="hero__media">
      <img class="hero__image" src="images/hero-home.svg" width="${w}" height="${h}" alt="A teacher helping a young boy with an activity at a table">
    </div>`;
  const content = `<div class="hero__content">
      <p class="hero__eyebrow">Eagan &amp; Inver Grove Heights · Ages 6 weeks – 8 years</p>
      <h1 class="hero__title" id="hero-title">An affordable investment in your child’s future</h1>
      <p class="hero__text">Montessori education and child care at two South Metro schools. NAEYC accredited, with a Parent Aware 4-star rating.</p>
      <div class="hero__actions">
        ${apply(ctx, { size: 'large' })}
        ${button(ctx, { label: 'Schedule a tour', href: 'contact.html', mod: 'secondary', size: 'large' })}
      </div>
    </div>`;
  if (v === 'full') {
    return `${cmt('hero')}
<section class="hero hero--full" aria-labelledby="hero-title">
  ${media}
  <div class="hero__inner container">
    ${content}
  </div>
</section>`;
  }
  return `${cmt('hero')}
<section class="hero hero--${v}" aria-labelledby="hero-title">
  <div class="hero__inner container">
    ${content}
    ${media}
  </div>
</section>`;
}

function breadcrumb(ctx, trail) {
  ctx.use('breadcrumb');
  const items = trail.map((t, i) => i === trail.length - 1
    ? `<li class="breadcrumb__item"><span aria-current="page">${t.label}</span></li>`
    : `<li class="breadcrumb__item"><a class="breadcrumb__link" href="${t.href}">${t.label}</a></li>`).join('');
  return `${cmt('breadcrumb')}
<nav class="breadcrumb" aria-label="Breadcrumb"><ol class="breadcrumb__list">${items}</ol></nav>`;
}

function pageHeader(ctx, { title, lead, trail }) {
  ctx.use('page-header');
  return `${cmt('page-header')}
<section class="page-header" aria-labelledby="page-title">
  <div class="page-header__inner container">
    ${breadcrumb(ctx, trail)}
    <h1 class="page-header__title" id="page-title">${title}</h1>
    <p class="page-header__lead">${lead}</p>
  </div>
</section>`;
}

function sectionHeading(ctx, { id, eyebrow, title, text, center = false, level = 2 }) {
  ctx.use('section-heading');
  return `${cmt('section-heading')}
<div class="section-heading${center ? ' section-heading--center' : ''}">
  ${eyebrow ? `<p class="section-heading__eyebrow">${eyebrow}</p>` : ''}
  <h${level} class="section-heading__title" id="${id}">${title}</h${level}>
  ${text ? `<p class="section-heading__text">${text}</p>` : ''}
</div>`;
}

function featureList(ctx, items, { level = 3, mod = '' } = {}) {
  ctx.use('feature-list');
  return `${cmt('feature-list')}
<ul class="feature-list${mod ? ' feature-list--' + mod : ''}">
${items.map((f) => `  <li class="feature-list__item">
    <span class="feature-list__icon">${icon(f.icon)}</span>
    <h${level} class="feature-list__title">${f.title}</h${level}>
    <p class="feature-list__text">${f.text}</p>
  </li>`).join('\n')}
</ul>`;
}

function programCard(ctx, p, { withId = false } = {}) {
  ctx.use('program-card');
  return `${cmt('program-card')}
<article class="program-card"${withId ? ` id="program-${p.key}"` : ''}>
  <img class="program-card__image" src="images/program-${p.key}.svg" width="800" height="600" alt="" loading="lazy">
  <div class="program-card__body">
    <h3 class="program-card__title"><a class="program-card__link" href="${p.href}">${p.title}</a></h3>
    <p class="program-card__age">${icon(p.icon)}${p.age}</p>
    <p class="program-card__text">${p.text}</p>
    <span class="program-card__more" aria-hidden="true">Learn more${icon('arrow-right')}</span>
  </div>
</article>`;
}

function programGrid(ctx, opts = {}) {
  return `<div class="grid grid--3">
${C.programs.map((p) => programCard(ctx, p, opts)).join('\n')}
</div>`;
}

function testimonial(ctx, t) {
  ctx.use('testimonial');
  return `${cmt('testimonial')}
<figure class="testimonial">
  <blockquote class="testimonial__quote"><p>${t.quote}</p></blockquote>
  <figcaption class="testimonial__author"><span class="testimonial__name">${t.name}</span> <span class="testimonial__role">${t.role}</span></figcaption>
</figure>`;
}

function mediaText(ctx, { id, eyebrow, title, body, list, actions, img, alt, reverse = false }) {
  ctx.use('media-text');
  return `${cmt('media-text')}
<div class="media-text${reverse ? ' media-text--reverse' : ''}">
  <div class="media-text__media">
    <img class="media-text__image" src="images/${img}" width="800" height="600" alt="${alt}" loading="lazy">
  </div>
  <div class="media-text__content">
    ${eyebrow ? `<p class="media-text__eyebrow">${eyebrow}</p>` : ''}
    <h2 class="media-text__title" id="${id}">${title}</h2>
    <div class="media-text__body">${body}</div>
    ${list ? `<ul class="media-text__list">
${list.map((l) => `      <li class="media-text__list-item">${icon('check')}${l}</li>`).join('\n')}
    </ul>` : ''}
    ${actions ? `<div class="media-text__actions">${actions}</div>` : ''}
  </div>
</div>`;
}

function historyTimeline(ctx) {
  ctx.use('history-timeline');
  return `${cmt('history-timeline')}
<ol class="history-timeline">
${C.timeline.map((t) => `  <li class="history-timeline__item">
    <h3 class="history-timeline__title"><span class="history-timeline__year">${t.year}</span> ${t.title}</h3>
    <p class="history-timeline__text">${t.text}</p>
  </li>`).join('\n')}
</ol>`;
}

function staffCard(ctx, s, i) {
  ctx.use('staff-card');
  return `${cmt('staff-card')}
<article class="staff-card">
  <img class="staff-card__photo" src="images/staff-${i + 1}.svg" width="400" height="400" alt="" loading="lazy">
  <h3 class="staff-card__name">${s.name}</h3>
  <p class="staff-card__role">${s.role}</p>
  <p class="staff-card__bio">${s.bio}</p>
</article>`;
}

function enrollmentSteps(ctx) {
  ctx.use('enrollment-steps');
  return `${cmt('enrollment-steps')}
<ol class="enrollment-steps">
${C.steps.map((s, i) => `  <li class="enrollment-steps__item">
    <span class="enrollment-steps__number" aria-hidden="true">${i + 1}</span>
    <h3 class="enrollment-steps__title">${s.title}</h3>
    <p class="enrollment-steps__text">${s.text}</p>
    ${s.action ? `<p class="enrollment-steps__action">${button(ctx, { label: s.action.label, href: s.action.href, mod: i === 1 ? 'primary' : 'secondary', size: 'small' })}</p>` : ''}
  </li>`).join('\n')}
</ol>`;
}

function galleryGrid(ctx, count) {
  ctx.use('gallery-grid');
  const items = C.gallery.slice(0, count).map((g, i) => `    <li class="gallery-grid__item">
      <figure class="gallery-grid__figure">
        <a class="gallery-grid__link" href="images/gallery-${i + 1}.svg" data-caption="${g.caption}" aria-haspopup="dialog">
          <img class="gallery-grid__image" src="images/gallery-${i + 1}.svg" width="800" height="600" alt="${g.alt}" loading="lazy">
        </a>
        <figcaption class="gallery-grid__caption">${g.caption}</figcaption>
      </figure>
    </li>`).join('\n');
  return `${cmt('gallery-grid')}
<div class="gallery-grid" data-component="gallery-grid">
  <ul class="gallery-grid__list">
${items}
  </ul>
  <dialog class="gallery-grid__dialog" aria-label="Photo viewer">
    <div class="gallery-grid__dialog-inner">
      <button type="button" class="gallery-grid__control gallery-grid__close">${icon('close')}<span class="visually-hidden">Close photo viewer</span></button>
      <button type="button" class="gallery-grid__control gallery-grid__prev">${icon('chevron-left')}<span class="visually-hidden">Previous photo</span></button>
      <figure class="gallery-grid__viewer">
        <img class="gallery-grid__viewer-image" src="images/gallery-1.svg" width="800" height="600" alt="">
        <figcaption class="gallery-grid__viewer-caption"></figcaption>
      </figure>
      <button type="button" class="gallery-grid__control gallery-grid__next">${icon('chevron-right')}<span class="visually-hidden">Next photo</span></button>
      <p class="gallery-grid__counter" aria-live="polite"></p>
    </div>
  </dialog>
</div>`;
}

function faqAccordion(ctx, items, { id, level = 3 }) {
  ctx.use('faq-accordion');
  return `${cmt('faq-accordion')}
<div class="faq-accordion" data-component="faq-accordion">
${items.map((f, i) => `  <div class="faq-accordion__item">
    <h${level} class="faq-accordion__heading">
      <button type="button" class="faq-accordion__trigger" id="faq-${id}-${i + 1}-trigger" aria-expanded="false" aria-controls="faq-${id}-${i + 1}-panel">
        <span class="faq-accordion__question">${f.q}</span>
        <span class="faq-accordion__icon">${icon('chevron-down')}</span>
      </button>
    </h${level}>
    <div class="faq-accordion__panel" id="faq-${id}-${i + 1}-panel">
      <div class="faq-accordion__answer"><p>${f.a}</p></div>
    </div>
  </div>`).join('\n')}
</div>`;
}

function ctaBanner(ctx, { title = 'Come see our classrooms', text } = {}) {
  ctx.use('cta-banner');
  text = text || 'Visit our schools in Eagan and Inver Grove Heights. Schedule a tour or apply today.';
  return `<!-- region: footer_top -->
<div class="region region--footer-top">
  ${cmt('cta-banner')}
  <section class="cta-banner" aria-labelledby="cta-banner-title">
    <div class="container">
      <div class="cta-banner__inner">
        <div class="cta-banner__content">
          <h2 class="cta-banner__title" id="cta-banner-title">${title}</h2>
          <p class="cta-banner__text">${text}</p>
        </div>
        <div class="cta-banner__actions">
          ${apply(ctx, { mod: 'inverse', size: 'large' })}
          ${button(ctx, { label: 'Schedule a tour', href: 'contact.html', mod: 'ghost-inverse', size: 'large' })}
        </div>
      </div>
    </div>
  </section>
</div>`;
}

function socialLinks(ctx, { inverse = false } = {}) {
  ctx.use('social-links');
  return `${cmt('social-links')}
<ul class="social-links${inverse ? ' social-links--inverse' : ''}">
  <li><a class="social-links__link" href="#">${icon('instagram')}<span class="visually-hidden">Instagram</span></a></li>
  <li><a class="social-links__link" href="#">${icon('facebook')}<span class="visually-hidden">Facebook</span></a></li>
</ul>`;
}

function contactInfo(ctx, { compact = false, headingId = 'contact-info-title', withApply = false } = {}) {
  ctx.use('contact-info');
  const rows = [['clock', 'Hours', 'Monday – Friday: 6:30am – 6:00pm<br>Open 12 months a year']];
  L.forEach((l) => rows.push(['pin', l.name, `<address>${l.street}<br>${l.city}</address><a href="${l.phoneHref}">${l.phone}</a>${!compact && l.email ? `<br><a href="mailto:${l.email}">${l.email}</a>` : ''}<br><a href="${l.mapsHref}">Get directions<span class="visually-hidden"> to ${l.name} (opens Google Maps)</span></a>`]));
  return `${cmt('contact-info')}
<div class="contact-info${compact ? ' contact-info--compact' : ''}">
  <h2 class="contact-info__title" id="${headingId}">${compact ? 'Visit us' : 'Our two schools'}</h2>
  <dl class="contact-info__list">
${rows.map(([ic, label, val]) => `    <div class="contact-info__row">
      <dt class="contact-info__label"><span class="contact-info__icon">${icon(ic)}</span>${label}</dt>
      <dd class="contact-info__value">${val}</dd>
    </div>`).join('\n')}
  </dl>
  ${withApply ? `<div class="contact-info__actions">${apply(ctx, { extra: 'button--block' })}</div>` : ''}
  ${compact ? '' : `<p class="contact-info__social-label">Follow us</p>
  ${socialLinks(ctx)}`}
</div>`;
}

function locationCard(ctx, l, { level = 3 } = {}) {
  ctx.use('location-card');
  return `${cmt('location-card')}
<article class="location-card" aria-labelledby="location-${l.key}-title">
  <img class="location-card__image" src="images/location-${l.key}.svg" width="800" height="450" alt="" loading="lazy">
  <div class="location-card__body">
    <h${level} class="location-card__title" id="location-${l.key}-title">${l.name}</h${level}>
    <p class="location-card__badge">${l.enrolling}</p>
    <p class="location-card__address">${icon('pin')}<span>${l.street}, ${l.city}</span></p>
    <p class="location-card__phone">${icon('phone')}<a href="${l.phoneHref}">${l.phone}</a></p>
    <p class="location-card__text">${l.note} Convenient to ${l.serves}</p>
    <div class="location-card__actions">
      ${button(ctx, { label: 'Schedule a tour', href: 'contact.html', mod: 'primary', size: 'small' })}
      ${button(ctx, { label: 'Directions', href: l.mapsHref, mod: 'secondary', size: 'small' })}
    </div>
  </div>
</article>`;
}

function locationGrid(ctx, opts) {
  return `<div class="grid grid--2">
${L.map((l) => locationCard(ctx, l, opts)).join('\n')}
</div>`;
}

function contactForm(ctx) {
  ctx.use('contact-form');
  const field = (id, label, type, { required = true, auto = '', full = false } = {}) => `      <div class="contact-form__item${full ? ' contact-form__item--full' : ''}">
        <label class="contact-form__label" for="cf-${id}">${label}${required ? ' <span class="contact-form__required">(required)</span>' : ' <span class="contact-form__required">(optional)</span>'}</label>
        ${type === 'textarea'
          ? `<textarea class="contact-form__input" id="cf-${id}" name="${id}" rows="5" data-label="a message"${required ? ' required' : ''} aria-describedby="cf-${id}-error"></textarea>`
          : `<input class="contact-form__input" id="cf-${id}" name="${id}" type="${type}"${auto ? ` autocomplete="${auto}"` : ''} data-label="${{ name: 'your name', email: 'your email address', phone: 'your phone number' }[id] || label.toLowerCase()}"${required ? ' required' : ''} aria-describedby="cf-${id}-error">`}
        <p class="contact-form__error" id="cf-${id}-error" hidden></p>
      </div>`;
  return `${cmt('contact-form')}
<form class="contact-form" action="#" method="post" data-component="contact-form" aria-labelledby="contact-form-title">
  <h2 class="contact-form__title" id="contact-form-title">Contact us &amp; book a tour</h2>
  <p class="contact-form__intro">Choose a school and tell us the days and times that work for you. We will contact you to confirm.</p>
  <div class="contact-form__grid">
${field('name', 'Your name', 'text', { auto: 'name' })}
${field('email', 'Email address', 'email', { auto: 'email' })}
${field('phone', 'Phone', 'tel', { required: false, auto: 'tel' })}
      <div class="contact-form__item">
        <label class="contact-form__label" for="cf-location">School <span class="contact-form__required">(required)</span></label>
        <select class="contact-form__input" id="cf-location" name="location" required data-label="a school" aria-describedby="cf-location-error">
          <option value="">Choose a school</option>
${L.map((l) => `          <option>${l.name} (${l.short})</option>`).join('\n')}
        </select>
        <p class="contact-form__error" id="cf-location-error" hidden></p>
      </div>
      <div class="contact-form__item">
        <label class="contact-form__label" for="cf-type">Tour or question? <span class="contact-form__required">(optional)</span></label>
        <select class="contact-form__input" id="cf-type" name="type">
          <option>Tour request</option>
          <option>Question</option>
        </select>
      </div>
      <div class="contact-form__item">
        <label class="contact-form__label" for="cf-program">Program of interest <span class="contact-form__required">(optional)</span></label>
        <select class="contact-form__input" id="cf-program" name="program">
          <option value="">Choose a program</option>
${C.programs.map((p) => `          <option>${p.title}</option>`).join('\n')}
          <option>Not sure yet</option>
        </select>
      </div>
${field('message', 'Message', 'textarea', { full: true })}
  </div>
  <div class="contact-form__actions">
    <button type="submit" class="button button--primary">Send message</button>
    <p class="contact-form__note">Demo form: messages are not sent.</p>
  </div>
  <p class="contact-form__status" role="status" tabindex="-1"></p>
</form>`;
}

// Google Maps embed URL for one school (no API key needed).
const mapEmbed = (l) => 'https://maps.google.com/maps?q=' + encodeURIComponent(`${l.name.replace(/&amp;/g, '&')}, ${l.street}, ${l.city}`) + '&amp;z=15&amp;output=embed';

function locationMap(ctx) {
  ctx.use('location-map');
  return `${cmt('location-map')}
<div class="location-map">
${L.map((l) => `  <figure class="location-map__item">
    <div class="location-map__frame">
      <iframe class="location-map__iframe" src="${mapEmbed(l)}" title="Google map: ${l.name}, ${l.street}, ${l.city}" width="600" height="400" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <figcaption class="location-map__caption">
      <strong class="location-map__name">${l.name}</strong>
      <span class="location-map__address">${l.street}, ${l.city}</span>
      <a class="location-map__link" href="${l.mapsHref}">Open in Google Maps<span class="visually-hidden">: ${l.name}</span></a>
    </figcaption>
  </figure>`).join('\n')}
</div>`;
}

function sidebarNav(ctx, { title = 'Our programs', id = 'sidebar-nav-title', items } = {}) {
  ctx.use('sidebar-nav');
  const list = items || C.programs.map((p) => ({ href: p.href, label: p.title, current: ctx.pageKey === 'program-' + p.key }));
  return `${cmt('sidebar-nav')}
<nav class="sidebar-nav" aria-labelledby="${id}">
  <h2 class="sidebar-nav__title" id="${id}">${title}</h2>
  <ul class="sidebar-nav__list">
${list.map((p) => `    <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="${p.href}"${p.current ? ' aria-current="page"' : ''}>${p.label}${icon('chevron-right')}</a></li>`).join('\n')}
  </ul>
</nav>`;
}

// --- News / blog ----------------------------------------------------------
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };
const categoryLabel = (key) => N.categories.find((c) => c.key === key).label;
const postHref = (p) => `news-${p.slug}.html`;

function newsCard(ctx, p, { level = 3 } = {}) {
  ctx.use('news-card');
  return `${cmt('news-card')}
<article class="news-card" data-category="${p.category}">
  <img class="news-card__image" src="images/${p.image.file}" width="800" height="600" alt="" loading="lazy">
  <div class="news-card__body">
    <h${level} class="news-card__title"><a class="news-card__link" href="${postHref(p)}">${p.title}</a></h${level}>
    <p class="news-card__meta"><span class="news-card__category">${categoryLabel(p.category)}</span><time class="news-card__date" datetime="${p.date}">${formatDate(p.date)}</time></p>
    <p class="news-card__summary">${p.summary}</p>
    <span class="news-card__more" aria-hidden="true">Read more${icon('arrow-right')}</span>
  </div>
</article>`;
}

function newsGrid(ctx, posts, opts) {
  return `<div class="grid grid--3">
${posts.map((p) => newsCard(ctx, p, opts)).join('\n')}
</div>`;
}

// Listing with category filter buttons. Without JavaScript the buttons stay hidden and all posts show.
function newsListing(ctx) {
  ctx.use('news-listing');
  const used = N.categories.filter((c) => N.posts.some((p) => p.category === c.key));
  const btn = (key, label, pressed) => `<button type="button" class="news-listing__filter" data-filter="${key}" aria-pressed="${pressed}">${label}</button>`;
  return `${cmt('news-listing')}
<div class="news-listing" data-component="news-listing">
  <div class="news-listing__filters" role="group" aria-label="Filter news by category" hidden>
    ${btn('all', 'All news', true)}
    ${used.map((c) => btn(c.key, c.label, false)).join('\n    ')}
  </div>
  <p class="news-listing__status visually-hidden" role="status"></p>
  <ul class="news-listing__list grid grid--3">
${N.posts.map((p) => `    <li class="news-listing__item" data-category="${p.category}">\n${newsCard(ctx, p, { level: 3 })}\n    </li>`).join('\n')}
  </ul>
</div>`;
}

function footer(ctx) {
  ctx.use('footer');
  const link = (href, label) => `<li><a class="footer__link" href="${href}">${label}</a></li>`;
  return `<!-- region: footer -->
<footer class="region region--footer site-footer">
  ${cmt('footer')}
  <div class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        ${siteBranding(ctx, { inverse: true })}
        <p class="footer__about">Montessori education and child care for ages 6 weeks to 8 years in Eagan and Inver Grove Heights.</p>
        ${socialLinks(ctx, { inverse: true })}
      </div>
      <nav class="footer__col" aria-labelledby="footer-explore-title">
        <h2 class="footer__heading" id="footer-explore-title">Explore</h2>
        <ul class="footer__list">
          ${C.menu.filter((m) => m.key !== 'home').map((m) => link(m.href, m.label)).join('\n          ')}
        </ul>
      </nav>
      <nav class="footer__col" aria-labelledby="footer-programs-title">
        <h2 class="footer__heading" id="footer-programs-title">Programs</h2>
        <ul class="footer__list">
          ${C.programs.map((p) => link(p.href, p.title)).join('\n          ')}
        </ul>
      </nav>
      <div class="footer__col">
        <h2 class="footer__heading">Our schools</h2>
${L.map((l) => `        <p class="footer__text footer__location"><strong class="footer__location-name">${l.name}</strong><br>${l.street}, ${l.city}<br><a class="footer__link" href="${l.phoneHref}">${l.phone}</a></p>`).join('\n')}
        <p class="footer__text">${S.hoursShort}, year-round</p>
      </div>
    </div>
    <div class="footer__bottom container">
      <p class="footer__copyright">© 2026 Eagan Montessori Academy South &amp; Amazing Beginnings Montessori</p>
      <ul class="footer__bottom-list">
        <li><a class="footer__link" href="#">Privacy policy</a></li>
        <li><a class="footer__link" href="#">Accessibility</a></li>
      </ul>
    </div>
  </div>
</footer>`;
}

// Demo-only helper for the meeting. Not part of the Drupal theme.
function optionSwitcher(ctx, file) {
  const links = ['a', 'b', 'c'].map((k) => `<a class="option-switcher__link" href="../option-${k}/${file}"${k === ctx.opt.key ? ' aria-current="true"' : ''}><span class="visually-hidden">Option </span>${k.toUpperCase()}</a>`).join('');
  const { themes, defaultTheme } = require('./css-options');
  const swatches = themes.map((t) => `<button type="button" class="option-switcher__swatch" data-theme-value="${t.key}" style="--swatch: ${t.p}" title="${t.label}" aria-pressed="false"><span class="visually-hidden">${t.label}</span></button>`).join('');
  return `<!-- demo-only: option-switcher (remove for the Drupal theme) -->
<div class="option-switcher" data-component="option-switcher" data-default-theme="${defaultTheme[ctx.opt.key]}">
  <nav class="option-switcher__designs" aria-label="Design options (demo only)">
    <a class="option-switcher__link option-switcher__link--all" href="../index.html"><span class="option-switcher__all-long">All designs</span><span class="option-switcher__all-short" aria-hidden="true">All</span></a>${links}
  </nav>
  <span class="option-switcher__divider" aria-hidden="true"></span>
  <div class="option-switcher__themes" role="group" aria-label="Color theme (demo only)">${swatches}</div>
</div>`;
}

module.exports = {
  button, apply, header, hero, pageHeader, sectionHeading, featureList, programCard, programGrid,
  testimonial, mediaText, historyTimeline, staffCard, enrollmentSteps, galleryGrid, faqAccordion,
  ctaBanner, contactInfo, locationCard, locationGrid, contactForm, locationMap, sidebarNav, footer, optionSwitcher, socialLinks,
  newsCard, newsGrid, newsListing, formatDate, categoryLabel, postHref,
};
