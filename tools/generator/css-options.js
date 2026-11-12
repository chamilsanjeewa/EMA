// Tokens and option-specific component styles.

const sharedTokens = `
  /* Spacing scale */
  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs: 0.75rem;
  --space-s: 1rem;
  --space-m: 1.5rem;
  --space-l: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --section-pad: clamp(3rem, 2rem + 5vw, 6rem);
  --grid-gap: clamp(1rem, 0.75rem + 1vw, 2rem);
  --container-pad: clamp(1rem, 4vw, 2rem);

  /* Focus */
  --focus-width: 3px;
  --focus-offset: 3px;
  --color-focus: var(--color-focus-light);

  /* Feedback colors */
  --color-error: #b3261e;
  --color-error-bg: #fdecea;
  --color-success-text: #1e5631;
  --color-success-bg: #e6f4ea;
`;

const fluidType = (max5 = '3.75rem') => `
  /* Type scale (fluid) */
  --step--1: 0.875rem;
  --step-0: 1.0625rem;
  --step-1: clamp(1.125rem, 1.07rem + 0.25vw, 1.25rem);
  --step-2: clamp(1.3rem, 1.2rem + 0.5vw, 1.6rem);
  --step-3: clamp(1.55rem, 1.35rem + 1vw, 2.1rem);
  --step-4: clamp(1.9rem, 1.55rem + 1.75vw, 2.85rem);
  --step-5: clamp(2.3rem, 1.75rem + 2.75vw, ${max5});
`;

const options = {
  a: {
    key: 'a',
    name: 'Option A',
    title: 'Warm &amp; Friendly',
    summary: 'Soft colors, rounded shapes and a playful, welcoming feel. Brand rose with cream, peach and sunny yellow.',
    heroVariant: 'split',
    heroImg: { w: 1000, h: 800 },
    ph: { bg: '#fde8dc', bg2: '#fbdccd', fg: '#8f3150' },
    swatches: ['#b84667', '#f6c344', '#fde8dc', '#4a2633'],
    fontPreview: 'ui-rounded, "SF Pro Rounded", "Nunito", "Arial Rounded MT Bold", system-ui, sans-serif',
    tokens: `/**
 * Design tokens: Option A (Warm & Friendly)
 * Change brand colors, fonts and spacing here, in one place.
 * Drupal: load first in the theme's global library.
 */
:root {
  /* Brand */
  --color-primary: #b84667;
  --color-primary-dark: #8f3150;
  --color-on-primary: #ffffff;
  --color-accent: #f6c344;
  --color-on-accent: #3a2a30;
  --color-accent-soft: #fff1c9;
  --color-pastel-1: #fde8dc;
  --color-pastel-2: #e3f2ea;
  --color-pastel-3: #ece6f7;
  --color-pastel-4: #fff1c9;

  /* Neutrals */
  --color-bg: #fffaf5;
  --color-surface: #ffffff;
  --color-surface-alt: #fdeee6;
  --color-text: #3a2a30;
  --color-text-muted: #6b5560;
  --color-heading: #4a2633;
  --color-border: #f1d9cf;
  --color-border-strong: #e2bfb3;
  --color-input-border: #a08890;

  /* Roles */
  --color-link: #8f3150;
  --color-link-hover: #6b1f3a;
  --color-eyebrow: #8f3150;
  --color-header-bg: #ffffff;
  --color-hero-bg: #fdeee6;
  --color-page-header-bg: #fdeee6;
  --color-utility-bg: #b84667;
  --color-utility-text: #ffffff;
  --color-icon-bg: #fff1c9;
  --color-icon-fg: #8f3150;
  --color-tag-bg: #fff1c9;
  --color-tag-text: #6b1f3a;
  --color-cta-bg: #b84667;
  --color-footer-bg: #4a2633;
  --color-footer-text: #fbeff2;
  --color-footer-muted: #e6c9d2;
  --color-footer-heading: #ffffff;
  --color-footer-border: rgba(255, 255, 255, 0.18);
  --color-focus-light: #6b1f3a;
  --color-focus-inverse: #ffffff;

  /* Fonts (system stacks: work offline) */
  --font-heading: ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif;
  --font-body: "Nunito", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-button: var(--font-heading);
  --font-weight-heading: 800;
  --line-height-body: 1.65;
  --line-height-heading: 1.15;
  --letter-spacing-heading: -0.01em;
  --eyebrow-transform: none;
  --eyebrow-letter-spacing: 0;
${fluidType('3.75rem')}
  /* Shape */
  --radius-sm: 0.75rem;
  --radius-md: 1.25rem;
  --radius-lg: 1.75rem;
  --radius-xl: 2.75rem;
  --radius-pill: 999px;
  --radius-button: 999px;
  --radius-input: 0.875rem;
  --shadow-sm: 0 6px 20px -10px rgba(143, 49, 80, 0.28);
  --shadow-md: 0 16px 40px -16px rgba(143, 49, 80, 0.38);
  --shadow-button: 0 8px 18px -10px rgba(143, 49, 80, 0.7);

  /* Layout */
  --container-max: 75rem;
${sharedTokens}}
`,
    overrides: {
      layout: `
/* Option A: rounded "card" sections and overlapping highlights. */
.section--alt {
  margin-inline: clamp(0rem, 2vw, 1.5rem);
  border-radius: var(--radius-xl);
}

.region--highlighted {
  position: relative;
  z-index: 2;
  margin-top: -4.5rem;
  padding-top: 0;
}

.program-detail__image,
.news-article__image {
  border-radius: var(--radius-xl);
}
`,
      button: `
.button:hover {
  transform: translateY(-2px);
}

.button--primary {
  box-shadow: var(--shadow-button);
}
`,
      eyebrow: (sel) => `
${sel} {
  padding: 0.4em 1em;
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}
`,
      hero: `
.hero--split {
  background:
    radial-gradient(circle at 6% 12%, var(--color-accent-soft) 0 8rem, transparent 8.05rem),
    radial-gradient(circle at 96% 96%, var(--color-pastel-2) 0 12rem, transparent 12.05rem),
    var(--color-hero-bg);
}

.hero--split .hero__inner {
  padding-bottom: calc(var(--space-2xl) + 4.5rem);
}

@media (min-width: 56em) {
  .hero--split .hero__inner {
    padding-bottom: calc(var(--space-3xl) + 4.5rem);
  }
}

.hero--split .hero__media {
  position: relative;
}

.hero--split .hero__media::before {
  content: "";
  position: absolute;
  inset: -4% -3% 5% 6%;
  border-radius: 58% 42% 55% 45% / 50% 55% 45% 50%;
  background: var(--color-accent);
}

.hero--split .hero__image {
  position: relative;
  border-radius: 42% 58% 45% 55% / 55% 45% 55% 45%;
  box-shadow: var(--shadow-md);
}
`,
      'page-header': `
.page-header::before,
.page-header::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.page-header::before {
  top: -5rem;
  right: -3rem;
  width: 16rem;
  height: 16rem;
  background: var(--color-accent-soft);
}

.page-header::after {
  right: 12rem;
  bottom: -4rem;
  width: 7rem;
  height: 7rem;
  background: var(--color-pastel-2);
}
`,
      'main-menu': `
@media (min-width: 70em) {
  .main-menu__link {
    border-radius: var(--radius-pill);
  }

  .main-menu__link:hover {
    background: var(--color-surface-alt);
  }

  .main-menu__link[aria-current="page"],
  .main-menu__item.is-active-trail > .main-menu__parent .main-menu__link,
  .main-menu__item.is-active-trail > .main-menu__link {
    background: var(--color-surface-alt);
  }
}
`,
      'feature-list': `
.feature-list__item:nth-child(4n + 2) .feature-list__icon {
  background: var(--color-pastel-2);
}

.feature-list__item:nth-child(4n + 3) .feature-list__icon {
  background: var(--color-pastel-3);
}

.feature-list__item:nth-child(4n + 4) .feature-list__icon {
  background: var(--color-pastel-1);
}

.feature-list--highlights .feature-list__item {
  box-shadow: var(--shadow-md);
}
`,
      'media-text': `
.media-text__image {
  border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%;
  box-shadow: var(--shadow-md);
}
`,
      'program-card': `
.program-card {
  border-radius: var(--radius-xl);
}

.program-card__image {
  width: calc(100% - 1.5rem);
  margin: 0.75rem 0.75rem 0;
  border-radius: var(--radius-lg);
}

.grid > .program-card:nth-child(4n + 2) .program-card__age {
  background: var(--color-pastel-2);
}

.grid > .program-card:nth-child(4n + 3) .program-card__age {
  background: var(--color-pastel-3);
}

.grid > .program-card:nth-child(4n + 4) .program-card__age {
  background: var(--color-pastel-1);
}
`,
      testimonial: `
.testimonial {
  border-radius: var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm);
}

.grid > .testimonial:nth-child(3n + 2) {
  background: var(--color-pastel-4);
}
`,
      'staff-card': `
.staff-card__photo {
  border-radius: 46% 54% 42% 58% / 52% 44% 56% 48%;
  border: 6px solid var(--color-pastel-4);
}
`,
      'enrollment-steps': `
.enrollment-steps__item {
  border-radius: var(--radius-xl);
}

.enrollment-steps__number {
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: var(--step-3);
}
`,
      'gallery-grid': `
.gallery-grid__link {
  border-radius: var(--radius-lg);
}
`,
      'location-card': `
.location-card {
  border-radius: var(--radius-xl);
}

.location-card__image {
  width: calc(100% - 1.5rem);
  margin: 0.75rem 0.75rem 0;
  border-radius: var(--radius-lg);
}
`,
      'faq-accordion': `
.faq-accordion {
  border: 0;
}

.faq-accordion__item {
  margin-bottom: var(--space-xs);
  padding-inline: var(--space-s);
  border: 0;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}
`,
      'cta-banner': `
.cta-banner {
  padding-block: var(--space-xl);
  background: transparent;
}

.cta-banner__inner {
  padding: var(--space-xl) clamp(1.5rem, 4vw, 3.5rem);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.14) 0 9rem, transparent 9.05rem),
    radial-gradient(circle at 0% 100%, rgba(246, 195, 68, 0.28) 0 7rem, transparent 7.05rem),
    var(--color-cta-bg);
}
`,
      footer: `
.site-footer {
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}
`,
    },
  },

  b: {
    key: 'b',
    name: 'Option B',
    title: 'Clean &amp; Modern',
    summary: 'Lots of white space, a strict grid and big type. Brand rose used as a single, confident accent.',
    heroVariant: 'full',
    heroImg: { w: 1600, h: 700 },
    ph: { bg: '#eef0f3', bg2: '#e6e9ed', fg: '#4a515c' },
    swatches: ['#b84667', '#111418', '#f5f6f8', '#ffffff'],
    fontPreview: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    tokens: `/**
 * Design tokens: Option B (Clean & Modern)
 * Change brand colors, fonts and spacing here, in one place.
 * Drupal: load first in the theme's global library.
 */
:root {
  /* Brand */
  --color-primary: #b84667;
  --color-primary-dark: #93344f;
  --color-on-primary: #ffffff;
  --color-accent: #111418;
  --color-on-accent: #ffffff;
  --color-accent-soft: #f5f6f8;

  /* Neutrals */
  --color-bg: #ffffff;
  --color-surface: #ffffff;
  --color-surface-alt: #f5f6f8;
  --color-text: #1f242b;
  --color-text-muted: #5a6270;
  --color-heading: #111418;
  --color-border: #e4e6ea;
  --color-border-strong: #c9cdd3;
  --color-input-border: #8a919c;

  /* Roles */
  --color-link: #93344f;
  --color-link-hover: #111418;
  --color-eyebrow: #93344f;
  --color-header-bg: #ffffff;
  --color-hero-bg: #ffffff;
  --color-page-header-bg: #ffffff;
  --color-utility-bg: #111418;
  --color-utility-text: #e9ebee;
  --color-icon-bg: transparent;
  --color-icon-fg: #b84667;
  --color-tag-bg: transparent;
  --color-tag-text: #5a6270;
  --color-cta-bg: #b84667;
  --color-footer-bg: #111418;
  --color-footer-text: #e9ebee;
  --color-footer-muted: #a9b0bb;
  --color-footer-heading: #ffffff;
  --color-footer-border: rgba(255, 255, 255, 0.14);
  --color-focus-light: #111418;
  --color-focus-inverse: #ffffff;

  /* Fonts (system stacks: work offline) */
  --font-heading: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-body: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-button: var(--font-body);
  --font-weight-heading: 700;
  --line-height-body: 1.6;
  --line-height-heading: 1.08;
  --letter-spacing-heading: -0.025em;
  --eyebrow-transform: uppercase;
  --eyebrow-letter-spacing: 0.12em;
${fluidType('4.5rem')}
  /* Shape */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-xl: 8px;
  --radius-pill: 999px;
  --radius-button: 2px;
  --radius-input: 2px;
  --shadow-sm: 0 0 0 1px var(--color-border);
  --shadow-md: 0 12px 32px -12px rgba(17, 20, 24, 0.22);

  /* Layout */
  --container-max: 80rem;
${sharedTokens}}
`,
    overrides: {
      layout: `
/* Option B: numbered sections and generous white space. */
main {
  counter-reset: section;
}

.region--highlighted {
  padding-block: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.program-detail__age,
.news-article__category {
  padding: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
`,
      button: `
.button--secondary {
  border-width: 1px;
}

.button--secondary:hover {
  background: var(--color-heading);
}
`,
      eyebrow: (sel) => `
${sel}::before {
  content: "";
  width: 2rem;
  height: 2px;
  background: currentColor;
}
`,
      hero: `
.hero__title {
  max-width: 14ch;
}

@media (min-width: 56em) {
  .hero--full .hero__inner {
    padding-block: var(--space-2xl) var(--space-3xl);
  }

  .hero--full .hero__content {
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    column-gap: var(--space-2xl);
    align-items: end;
  }

  .hero--full .hero__eyebrow {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .hero--full .hero__title {
    grid-column: 1;
    grid-row: 2 / span 2;
    margin: 0;
  }

  .hero--full .hero__text {
    grid-column: 2;
    grid-row: 2;
  }

  .hero--full .hero__actions {
    grid-column: 2;
    grid-row: 3;
  }
}
`,
      'page-header': `
.page-header {
  padding-block: var(--space-xl) var(--space-2xl);
  border-bottom: 1px solid var(--color-border);
}

.page-header__title {
  max-width: 18ch;
  margin-top: var(--space-xl);
}
`,
      'section-heading': `
/* Numbered sections: 01, 02, 03 ... */
.section-heading__eyebrow::before {
  counter-increment: section;
  content: counter(section, decimal-leading-zero);
  content: counter(section, decimal-leading-zero) / "";
  width: auto;
  height: auto;
  background: none;
  padding-right: 0.75em;
  border-right: 1px solid var(--color-border-strong);
  color: var(--color-heading);
}

.section-heading,
.section-heading--center {
  max-width: none;
  margin-inline: 0;
  padding-top: var(--space-m);
  border-top: 1px solid var(--color-heading);
  text-align: left;
}

@media (min-width: 56em) {
  .section-heading {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    column-gap: var(--space-2xl);
    align-items: end;
  }

  .section-heading__eyebrow {
    grid-column: 1 / -1;
  }

  .section-heading__title {
    margin: 0;
  }

  .section-heading__text {
    max-width: 36rem;
  }
}
`,
      'main-menu': `
@media (min-width: 70em) {
  .main-menu__link[aria-current="page"],
  .main-menu__item.is-active-trail > .main-menu__parent .main-menu__link,
  .main-menu__item.is-active-trail > .main-menu__link {
    color: var(--color-heading);
    text-decoration: underline;
    text-decoration-color: var(--color-primary);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.5em;
  }
}
`,
      'feature-list': `
.feature-list__item {
  padding: var(--space-m) 0 0;
  border-top: 2px solid var(--color-heading);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.feature-list__icon {
  justify-content: flex-start;
  width: auto;
  height: auto;
}
`,
      'media-text': `
.media-text__image {
  border-radius: var(--radius-sm);
}

.media-text__list-item .icon {
  padding: 0;
}
`,
      'program-card': `
.program-card,
.program-card:hover {
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  transform: none;
}

.program-card__image {
  border-radius: var(--radius-sm);
}

.program-card__body {
  padding: var(--space-m) 0 0;
}

.program-card__age {
  padding: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.program-card:hover .program-card__link {
  text-decoration: underline;
  text-decoration-color: var(--color-primary);
  text-underline-offset: 0.2em;
}
`,
      testimonial: `
.testimonial {
  padding: var(--space-m) 0 0 var(--space-m);
  border-left: 2px solid var(--color-primary);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.testimonial__quote {
  color: var(--color-heading);
  font-size: var(--step-2);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.35;
}
`,
      'history-timeline': `
.history-timeline__item::before {
  border-radius: 0;
  border-width: 3px;
  transform: scale(0.8) rotate(45deg);
}
`,
      'staff-card': `
.staff-card {
  padding: 0;
  background: transparent;
  box-shadow: none;
  text-align: left;
}

.staff-card__photo {
  width: 100%;
  margin: 0 0 var(--space-s);
  border-radius: var(--radius-sm);
}
`,
      'enrollment-steps': `
.enrollment-steps__item {
  padding: var(--space-m) 0 0;
  border-top: 2px solid var(--color-heading);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.enrollment-steps__number {
  justify-content: flex-start;
  width: auto;
  height: auto;
  background: none;
  color: var(--color-primary-dark);
  font-size: var(--step-5);
  line-height: 1;
}
`,
      'location-card': `
.location-card {
  border-top: 2px solid var(--color-heading);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.location-card__image {
  margin-top: var(--space-m);
  border-radius: var(--radius-sm);
}

.location-card__body {
  padding-inline: 0;
}

.location-card__badge {
  padding: 0;
  background: none;
  color: var(--color-eyebrow);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
`,
      'gallery-grid': `
.gallery-grid__list {
  gap: var(--space-s);
}

.gallery-grid__link {
  border-radius: 0;
}
`,
      'faq-accordion': `
.faq-accordion {
  border-top-color: var(--color-heading);
}

.faq-accordion__heading {
  font-size: var(--step-2);
}

.faq-accordion__icon {
  border: 1px solid var(--color-border-strong);
}
`,
      'cta-banner': `
.cta-banner {
  padding-block: var(--space-3xl);
}

.cta-banner__title {
  font-size: var(--step-5);
}
`,
      'contact-info': `
.contact-info {
  background: var(--color-surface-alt);
  box-shadow: none;
}

.contact-info__icon {
  width: auto;
  justify-content: flex-start;
}

.contact-info__value {
  padding-left: calc(1.1rem + 0.75em);
}
`,
    },
  },

  c: {
    key: 'c',
    name: 'Option C',
    title: 'Calm Montessori',
    summary: 'Natural, earthy colors with a wood and nature feel. Sage green, linen and walnut, with a clay-rose accent from the brand.',
    heroVariant: 'arch',
    heroImg: { w: 800, h: 1000 },
    ph: { bg: '#ece5d6', bg2: '#e4dccb', fg: '#3c533c' },
    swatches: ['#4f6b4f', '#9c4458', '#f6f1e7', '#3b2f25'],
    fontPreview: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif',
    tokens: `/**
 * Design tokens: Option C (Calm Montessori)
 * Change brand colors, fonts and spacing here, in one place.
 * Drupal: load first in the theme's global library.
 */
:root {
  /* Brand */
  --color-primary: #4f6b4f;
  --color-primary-dark: #3c533c;
  --color-on-primary: #ffffff;
  --color-accent: #9c4458; /* clay rose, based on the brand color #b84667 */
  --color-on-accent: #ffffff;
  --color-accent-soft: #f3e3e0;
  --color-leaf: #8aa37f;

  /* Neutrals */
  --color-bg: #f6f1e7;
  --color-surface: #fffdf8;
  --color-surface-alt: #ece5d6;
  --color-text: #3b2f25;
  --color-text-muted: #6a5d4e;
  --color-heading: #33291f;
  --color-border: #ddd3c0;
  --color-border-strong: #c9bba3;
  --color-input-border: #8f8270;

  /* Roles */
  --color-link: #9c4458;
  --color-link-hover: #3c533c;
  --color-eyebrow: #9c4458;
  --color-header-bg: #fffdf8;
  --color-hero-bg: #f6f1e7;
  --color-page-header-bg: #ece5d6;
  --color-utility-bg: #4f6b4f;
  --color-utility-text: #ffffff;
  --color-icon-bg: #e4ebdf;
  --color-icon-fg: #3c533c;
  --color-tag-bg: #e4ebdf;
  --color-tag-text: #2f4a32;
  --color-cta-bg: #4f6b4f;
  --color-footer-bg: #3b2f25;
  --color-footer-text: #efe7d8;
  --color-footer-muted: #cfc3ae;
  --color-footer-heading: #ffffff;
  --color-footer-border: rgba(239, 231, 216, 0.2);
  --color-focus-light: #2f4a32;
  --color-focus-inverse: #ffffff;

  /* Fonts (system stacks: work offline) */
  --font-heading: "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  --font-body: "Avenir Next", Avenir, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --font-button: var(--font-body);
  --font-weight-heading: 600;
  --line-height-body: 1.7;
  --line-height-heading: 1.2;
  --letter-spacing-heading: 0;
  --eyebrow-transform: uppercase;
  --eyebrow-letter-spacing: 0.14em;
${fluidType('3.6rem')}
  /* Shape */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-arch: 999px 999px 0.75rem 0.75rem;
  --radius-pill: 999px;
  --radius-button: 0.5rem;
  --radius-input: 0.5rem;
  --shadow-sm: 0 1px 0 rgba(59, 47, 37, 0.06), 0 0 0 1px var(--color-border);
  --shadow-md: 0 14px 30px -16px rgba(59, 47, 37, 0.4);

  /* Layout */
  --container-max: 76rem;
${sharedTokens}}
`,
    overrides: {
      base: `
/* Option C: soft paper texture. */
body {
  background-image: radial-gradient(rgba(59, 47, 37, 0.045) 1px, transparent 1px);
  background-size: 6px 6px;
}
`,
      layout: `
.section--alt {
  background-color: var(--color-surface-alt);
  background-image: radial-gradient(rgba(59, 47, 37, 0.05) 1px, transparent 1px);
  background-size: 6px 6px;
}

.program-detail__image,
.news-article__image {
  border-radius: 12rem 12rem var(--radius-md) var(--radius-md) / 8rem 8rem var(--radius-md) var(--radius-md);
}
`,
      eyebrow: (sel) => `
${sel}::before {
  content: "";
  flex: none;
  width: 0.85em;
  height: 0.85em;
  border-radius: 0 100% 0 100%;
  background: var(--color-leaf);
}
`,
      button: `
.button--secondary {
  border-width: 1px;
}
`,
      hero: `
.hero--arch {
  background:
    radial-gradient(circle at 85% 40%, var(--color-icon-bg) 0 18rem, transparent 18.05rem),
    var(--color-hero-bg);
}

.hero--arch .hero__media {
  position: relative;
}

.hero--arch .hero__media::before {
  content: "";
  position: absolute;
  inset: 1.25rem -1.25rem -1.25rem 1.25rem;
  border: 2px solid var(--color-leaf);
  border-radius: var(--radius-arch);
}

.hero--arch .hero__image {
  position: relative;
  border-radius: var(--radius-arch);
  box-shadow: var(--shadow-md);
}

.hero__title {
  font-weight: 500;
}
`,
      'page-header': `
.page-header {
  background-image: radial-gradient(rgba(59, 47, 37, 0.05) 1px, transparent 1px);
  background-size: 6px 6px;
}

.page-header::after {
  content: "";
  position: absolute;
  display: none;
  right: max(2rem, 8vw);
  bottom: -2px;
  width: 11rem;
  height: 14rem;
  border: 2px solid var(--color-leaf);
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
  opacity: 0.8;
}

@media (min-width: 56em) {
  .page-header::after {
    display: block;
  }
}

.page-header__title {
  font-weight: 500;
}
`,
      'main-menu': `
@media (min-width: 70em) {
  .main-menu__link[aria-current="page"],
  .main-menu__item.is-active-trail > .main-menu__parent .main-menu__link,
  .main-menu__item.is-active-trail > .main-menu__link {
    background: var(--color-icon-bg);
    color: var(--color-primary-dark);
  }
}
`,
      'section-heading': `
.section-heading__title {
  font-weight: 500;
}
`,
      'feature-list': `
.feature-list__item {
  padding-inline: var(--space-s);
  background: transparent;
  box-shadow: none;
  text-align: center;
}

.feature-list__icon {
  border: 1px solid var(--color-leaf);
  background: var(--color-surface);
}

.feature-list--compact .feature-list__item {
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}
`,
      'media-text': `
.media-text__image {
  aspect-ratio: 4 / 3;
  border-radius: 14rem 14rem var(--radius-md) var(--radius-md) / 10rem 10rem var(--radius-md) var(--radius-md);
}
`,
      'program-card': `
.program-card {
  padding: var(--space-s) var(--space-s) 0;
  box-shadow: var(--shadow-sm);
}

.program-card:hover {
  box-shadow: var(--shadow-sm), var(--shadow-md);
}

.program-card__image {
  border-radius: 50% 50% var(--radius-sm) var(--radius-sm) / 38% 38% var(--radius-sm) var(--radius-sm);
}

.program-card__body {
  padding-inline: var(--space-2xs);
}
`,
      testimonial: `
.testimonial {
  text-align: center;
}

.testimonial__quote {
  font-family: var(--font-heading);
  font-size: var(--step-2);
  font-style: italic;
}

.testimonial__quote::before {
  margin-inline: auto;
  color: var(--color-leaf);
}
`,
      'history-timeline': `
.history-timeline::before {
  background: var(--color-leaf);
  width: 2px;
}

.history-timeline__item::before {
  border: 0;
  border-radius: 0 100% 0 100%;
  background: var(--color-primary);
}
`,
      'staff-card': `
.staff-card__photo {
  border-radius: 50% 50% var(--radius-md) var(--radius-md);
}
`,
      'enrollment-steps': `
.enrollment-steps__number {
  border: 1px solid var(--color-leaf);
  background: var(--color-surface);
  color: var(--color-primary-dark);
  font-size: var(--step-3);
}
`,
      'gallery-grid': `
.gallery-grid__link {
  border-radius: var(--radius-sm);
}

.gallery-grid__item:nth-child(3n + 2) .gallery-grid__link {
  border-radius: 50% 50% var(--radius-sm) var(--radius-sm) / 40% 40% var(--radius-sm) var(--radius-sm);
}
`,
      'faq-accordion': `
.faq-accordion__heading {
  font-family: var(--font-body);
}
`,
      'location-card': `
.location-card {
  padding: var(--space-s) var(--space-s) 0;
}

.location-card__image {
  border-radius: 50% 50% var(--radius-sm) var(--radius-sm) / 30% 30% var(--radius-sm) var(--radius-sm);
}

.location-card__body {
  padding-inline: var(--space-2xs);
}

.location-card__title {
  font-weight: 500;
}
`,
      'cta-banner': `
.cta-banner {
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 8px 8px;
  background-color: var(--color-cta-bg);
}

.cta-banner__title {
  font-weight: 500;
}
`,
    },
  },
};

// --- Color themes (demo picker) ------------------------------------------
// One palette per theme; each option maps it onto its own tokens.
// News cards follow each option's program card styles.
for (const o of Object.values(options)) {
  if (o.overrides['program-card']) o.overrides['news-card'] = require('./css-common').toNewsCard(o.overrides['program-card']);
}

const themes = [
  { key: 'rose', label: 'Rose (brand color)', p: '#b84667', d: '#8f3150', deep: '#4a2633', tint: '#fdeee6', border: '#f1d9cf', borderStrong: '#e2bfb3', light: '#e6c9d2', leaf: '#d58aa0' },
  { key: 'sage', label: 'Sage', p: '#4f6b4f', d: '#3c533c', deep: '#2b3a2b', tint: '#ecf1e8', border: '#d8e2d2', borderStrong: '#b9c9b0', light: '#cddbc6', leaf: '#8aa37f' },
  { key: 'ocean', label: 'Ocean', p: '#2f5f8a', d: '#234a6d', deep: '#1c3550', tint: '#e8f0f7', border: '#d3e1ee', borderStrong: '#b3c9de', light: '#c9d9e8', leaf: '#7fa3c4' },
  { key: 'terracotta', label: 'Terracotta', p: '#b0502a', d: '#8c3d1f', deep: '#4a2618', tint: '#fbeee6', border: '#f0dccf', borderStrong: '#e0bfaa', light: '#ecd0c0', leaf: '#d49a7c' },
  { key: 'navy', label: 'Navy (current website color)', p: '#004b87', d: '#003866', deep: '#0f2a44', tint: '#e6eff7', border: '#d0e0ee', borderStrong: '#a9c4dc', light: '#c3d6e8', leaf: '#8fbf4d' },
  { key: 'plum', label: 'Plum', p: '#6d3f8c', d: '#552f6e', deep: '#34203f', tint: '#f3ecf7', border: '#e4d8ec', borderStrong: '#cdb8dc', light: '#d9c8e6', leaf: '#a98bc0' },
];
const defaultTheme = { a: 'rose', b: 'rose', c: 'sage' };

const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// Token values for one theme in one option.
function themeVars(optKey, t) {
  if (optKey === 'a') {
    return {
      'color-primary': t.p, 'color-primary-dark': t.d, 'color-heading': t.deep,
      'color-link': t.d, 'color-link-hover': t.deep, 'color-eyebrow': t.d,
      'color-surface-alt': t.tint, 'color-hero-bg': t.tint, 'color-page-header-bg': t.tint, 'color-pastel-1': t.tint,
      'color-border': t.border, 'color-border-strong': t.borderStrong,
      'color-utility-bg': t.p, 'color-icon-fg': t.d, 'color-tag-text': t.deep, 'color-cta-bg': t.p,
      'color-footer-bg': t.deep, 'color-footer-muted': t.light, 'color-focus-light': t.deep,
      'shadow-sm': `0 6px 20px -10px ${rgba(t.d, 0.28)}`, 'shadow-md': `0 16px 40px -16px ${rgba(t.d, 0.38)}`,
      'shadow-button': `0 8px 18px -10px ${rgba(t.d, 0.7)}`,
    };
  }
  if (optKey === 'b') {
    return {
      'color-primary': t.p, 'color-primary-dark': t.d, 'color-link': t.d, 'color-eyebrow': t.d,
      'color-icon-fg': t.p, 'color-cta-bg': t.p,
    };
  }
  return {
    'color-primary': t.p, 'color-primary-dark': t.d, 'color-link-hover': t.d,
    'color-utility-bg': t.p, 'color-cta-bg': t.p, 'color-icon-fg': t.d, 'color-icon-bg': t.tint,
    'color-tag-bg': t.tint, 'color-tag-text': t.deep, 'color-focus-light': t.deep, 'color-leaf': t.leaf,
  };
}

function themesCss(optKey) {
  const blocks = themes.map((t) => `:root[data-theme="${t.key}"] {\n${Object.entries(themeVars(optKey, t)).map(([k, v]) => `  --${k}: ${v};`).join('\n')}\n}`);
  return `/**
 * Color themes (DEMO): picked with the swatches in the option switcher.
 * Each theme only overrides tokens from tokens.css. Without a data-theme
 * attribute the option's default palette (${defaultTheme[optKey]}) is used.
 * Drupal: keep the chosen palette in tokens.css and delete this file.
 */
${blocks.join('\n\n')}
`;
}

module.exports = { options, themes, defaultTheme, themeVars, themesCss };
