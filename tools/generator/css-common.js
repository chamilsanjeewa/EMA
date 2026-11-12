// Shared, token-driven CSS. Option-specific styles are appended from css-options.js.

const base = `/**
 * Base styles: reset, typography, links, focus, helpers.
 * Drupal: part of the global library (attached on every page).
 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: var(--line-height-body);
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4 {
  margin: 0 0 var(--space-s);
  color: var(--color-heading);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-heading);
  letter-spacing: var(--letter-spacing-heading);
  text-wrap: balance;
}

p,
ul,
ol,
dl,
figure,
blockquote {
  margin: 0 0 var(--space-s);
}

img,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.icon {
  display: inline-block;
  flex: none;
  width: 1.25em;
  height: 1.25em;
  vertical-align: middle;
  transition: transform 0.2s ease;
}

a {
  color: var(--color-link);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.2em;
}

a:hover {
  color: var(--color-link-hover);
}

button,
input,
select,
textarea {
  font: inherit;
}

/* Visible focus for keyboard users (WCAG 2.4.7 / 2.4.11). */
:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

main:focus {
  outline: none;
}

::selection {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.skip-link {
  position: absolute;
  top: var(--space-s);
  left: var(--space-s);
  z-index: 1000;
  padding: var(--space-xs) var(--space-m);
  background: var(--color-surface);
  color: var(--color-heading);
  font-weight: 700;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: none;
}

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

const layout = `/**
 * Layout: page regions, containers, sections and grids.
 * Drupal: page.html.twig regions use these classes.
 */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-wrapper > main {
  flex: 1;
}

/* Regions ------------------------------------------------------------ */
.region--highlighted {
  padding-block: var(--space-xl) 0;
}

.region--sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
}

/* Sections ----------------------------------------------------------- */
.section {
  padding-block: var(--section-pad);
}

.section--alt {
  background: var(--color-surface-alt);
}

.section--flush {
  padding-top: 0;
}

.section__actions {
  margin: var(--space-xl) 0 0;
  text-align: center;
}

/* Grids -------------------------------------------------------------- */
.grid {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--grid-min, 16rem)), 1fr));
}

.grid--3 {
  /* At most 3 columns */
  --grid-min: max(17rem, calc((100% - 2 * var(--grid-gap)) / 3));
}

.grid--2 {
  /* At most 2 columns */
  --grid-min: max(20rem, calc((100% - var(--grid-gap)) / 2));
}

.grid--4 {
  /* At most 4 columns */
  --grid-min: max(13rem, calc((100% - 3 * var(--grid-gap)) / 4));
}

/* Content layout with sidebar (program detail) ----------------------- */
.layout--with-sidebar {
  display: grid;
  gap: var(--space-2xl);
  padding-block: var(--section-pad);
}

@media (min-width: 60em) {
  .layout--with-sidebar {
    grid-template-columns: minmax(0, 1fr) 20rem;
    align-items: start;
  }

  .region--sidebar {
    position: sticky;
    top: var(--space-m);
  }
}

/* Simple page-level helpers ------------------------------------------ */
.prose {
  max-width: 44rem;
}

.prose h2 {
  margin-top: var(--space-xl);
  font-size: var(--step-3);
}

.prose ul {
  padding-left: 1.25em;
}

.prose li + li {
  margin-top: var(--space-2xs);
}

.program-detail__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-lg);
}

.program-detail__age {
  display: inline-block;
  margin: var(--space-m) 0 0;
  padding: 0.25em 0.85em;
  border-radius: var(--radius-pill);
  background: var(--color-tag-bg);
  color: var(--color-tag-text);
  font-size: var(--step--1);
  font-weight: 700;
}

.program-detail__section {
  margin-top: var(--space-2xl);
}

.program-detail__heading {
  font-size: var(--step-3);
  margin-bottom: var(--space-m);
}

.faq-wrap {
  max-width: 52rem;
  margin-inline: auto;
}

.testimonial-single {
  max-width: 44rem;
  margin-inline: auto;
}

.contact-layout {
  display: grid;
  gap: var(--space-xl);
  align-items: start;
}

@media (min-width: 60em) {
  .contact-layout {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  }
}

/* News article ---------------------------------------------------------- */
.news-article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2xs) var(--space-s);
  margin: 0 0 var(--space-m);
  color: var(--color-text-muted);
  font-size: var(--step--1);
}

.news-article__category {
  padding: 0.25em 0.85em;
  border-radius: var(--radius-pill);
  background: var(--color-tag-bg);
  color: var(--color-tag-text);
  font-weight: 700;
}

.news-article__detail + .news-article__detail::before {
  content: "·";
  margin-right: var(--space-s);
}

.news-article__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  margin-bottom: var(--space-l);
  border-radius: var(--radius-lg);
}

.news-article__pager {
  display: grid;
  gap: var(--space-s);
  margin-top: var(--space-2xl);
  padding-top: var(--space-l);
  border-top: 1px solid var(--color-border);
}

@media (min-width: 40em) {
  .news-article__pager {
    grid-template-columns: 1fr 1fr;
  }

  .news-article__pager-link--prev {
    grid-column: 2;
    text-align: right;
  }
}

.news-article__pager-link {
  display: block;
  color: var(--color-heading);
  font-weight: 700;
  text-decoration: none;
}

.news-article__pager-link:hover {
  color: var(--color-link);
  text-decoration: underline;
}

.news-article__pager-label {
  display: block;
  color: var(--color-text-muted);
  font-size: var(--step--1);
  font-weight: 400;
}

.news-article__back {
  margin: var(--space-xl) 0 0;
}
`;

const eyebrowBase = (sel) => `${sel} {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  margin: 0 0 var(--space-s);
  color: var(--color-eyebrow);
  font-size: var(--step--1);
  font-weight: 700;
  letter-spacing: var(--eyebrow-letter-spacing);
  text-transform: var(--eyebrow-transform);
}

`;

const components = {
  button: `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  min-height: 2.75rem;
  padding: 0.7em 1.4em;
  border: 2px solid transparent;
  border-radius: var(--radius-button);
  font-family: var(--font-button);
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.button--primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.button--primary:hover {
  background: var(--color-primary-dark);
  color: var(--color-on-primary);
}

.button--secondary {
  background: transparent;
  border-color: currentColor;
  color: var(--color-heading);
}

.button--secondary:hover {
  background: var(--color-heading);
  border-color: var(--color-heading);
  color: var(--color-surface);
}

.button--inverse {
  background: var(--color-surface);
  color: var(--color-primary-dark);
}

.button--inverse:hover {
  background: var(--color-surface-alt);
  color: var(--color-primary-dark);
}

.button--ghost-inverse {
  background: transparent;
  border-color: currentColor;
  color: var(--color-on-primary);
}

.button--ghost-inverse:hover {
  background: rgba(255, 255, 255, 0.16);
  color: var(--color-on-primary);
}

.button--large {
  padding: 0.85em 1.6em;
  font-size: var(--step-1);
}

.button--small {
  min-height: 2.5rem;
  padding: 0.5em 1.1em;
  font-size: var(--step--1);
}

.button--block {
  width: 100%;
}

.button:hover .icon--arrow-right {
  transform: translateX(3px);
}
`,

  'utility-bar': `.utility-bar {
  --color-focus: var(--color-focus-inverse);
  background: var(--color-utility-bg);
  color: var(--color-utility-text);
  font-size: var(--step--1);
}

.utility-bar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s);
  min-height: 2.75rem;
}

.utility-bar__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs) var(--space-m);
  margin: 0;
  padding: 0;
  list-style: none;
}

.utility-bar__item {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
}

.utility-bar__item--hours {
  display: none;
}

@media (min-width: 40em) {
  .utility-bar__item--hours {
    display: inline-flex;
  }
}

.utility-bar__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45em;
  color: inherit;
  text-decoration: none;
}

.utility-bar__link:hover {
  color: inherit;
  text-decoration: underline;
}

/* Small screens: show the school name, keep the number for screen readers. */
@media (max-width: 47.99em) {
  .utility-bar__list {
    column-gap: var(--space-s);
  }

  .utility-bar__inner {
    gap: var(--space-2xs);
  }

  .utility-bar__number {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}

.utility-bar .icon {
  width: 1.05em;
  height: 1.05em;
}
`,

  'language-switcher': `.language-switcher {
  position: relative;
}

.language-switcher__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  min-height: 2.25rem;
  padding: 0.25em 0.7em;
  border: 1px solid currentColor;
  border-radius: var(--radius-button);
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.language-switcher__toggle:hover {
  background: rgba(255, 255, 255, 0.14);
}

.language-switcher__toggle .icon {
  width: 1.05em;
  height: 1.05em;
}

.language-switcher__toggle[aria-expanded="true"] .icon--chevron-down {
  transform: rotate(180deg);
}

/* Without JavaScript the links show inline. */
.language-switcher__list {
  display: flex;
  gap: 0.75em;
  margin: 0;
  padding: 0;
  list-style: none;
}

.no-js .language-switcher__toggle {
  display: none;
}

.language-switcher__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  color: inherit;
}

.js .language-switcher__list {
  --color-focus: var(--color-focus-light);
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  z-index: 80;
  display: none;
  flex-direction: column;
  gap: 0;
  min-width: 11rem;
  padding: var(--space-2xs);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.js .language-switcher.is-open .language-switcher__list {
  display: flex;
}

.js .language-switcher__link {
  padding: 0.55em 0.75em;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  text-decoration: none;
}

.js .language-switcher__link:hover {
  background: var(--color-surface-alt);
  color: var(--color-heading);
}

.language-switcher__link[aria-current="true"] {
  font-weight: 700;
}

.js .language-switcher__link[aria-current="true"]::after {
  content: "✓";
  content: "✓" / "";
  color: var(--color-primary-dark);
}

.language-switcher__status {
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  z-index: 81;
  width: max-content;
  max-width: min(18rem, 80vw);
  margin: 0;
  padding: 0.6em 0.85em;
  border-radius: var(--radius-sm);
  background: var(--color-heading);
  color: var(--color-surface);
  box-shadow: var(--shadow-md);
  font-size: var(--step--1);
}

.language-switcher__status:empty {
  display: none;
}
`,

  header: `.site-header {
  position: relative;
  z-index: 50;
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s);
  min-height: 4.75rem;
  padding-block: var(--space-xs);
}
`,

  'site-branding': `.site-branding {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
  color: var(--color-heading);
  text-decoration: none;
}

.site-branding:hover {
  color: var(--color-heading);
}

.site-branding__mark {
  flex: none;
  width: 2.75rem;
  height: 2.75rem;
}

.site-branding__mark-bg {
  fill: var(--color-primary);
}

.site-branding__mark-fg {
  fill: var(--color-on-primary);
}

.site-branding__mark-line {
  stroke: var(--color-primary);
}

.site-branding__name {
  display: flex;
  flex-direction: column;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: var(--font-weight-heading);
  line-height: 1.15;
}

.site-branding__tagline {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 400;
}

@media (min-width: 30em) {
  .site-branding__name {
    font-size: 1.175rem;
  }

  .site-branding__tagline {
    font-size: 0.875rem;
  }
}

.site-branding--inverse,
.site-branding--inverse:hover {
  color: var(--color-footer-heading);
}

.site-branding--inverse .site-branding__tagline {
  color: var(--color-footer-muted);
}
`,

  'main-menu': `/* Mobile first: a toggle button opens the menu panel. */
.main-menu__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.9rem;
  border: 2px solid var(--color-border-strong);
  border-radius: var(--radius-button);
  background: var(--color-surface);
  color: var(--color-heading);
  font-weight: 700;
  cursor: pointer;
}

.main-menu__toggle-icon {
  display: inline-flex;
}

.main-menu__toggle-icon--close,
.main-menu.is-open .main-menu__toggle-icon--open {
  display: none;
}

.main-menu.is-open .main-menu__toggle-icon--close {
  display: inline-flex;
}

.no-js .main-menu__toggle {
  display: none;
}

.js .main-menu__panel {
  display: none;
}

.js .main-menu.is-open .main-menu__panel {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  display: block;
  max-height: calc(100vh - 7.5rem);
  overflow-y: auto;
  padding: var(--space-xs) var(--container-pad) var(--space-l);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
  box-shadow: var(--shadow-md);
}

.main-menu__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.main-menu__item {
  border-bottom: 1px solid var(--color-border);
}

.main-menu__parent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-menu__link {
  display: block;
  flex: 1;
  padding: 0.85rem 0.25rem;
  color: var(--color-heading);
  font-weight: 700;
  text-decoration: none;
}

.main-menu__link:hover {
  color: var(--color-primary-dark);
}

.main-menu__link[aria-current="page"],
.main-menu__item.is-active-trail > .main-menu__parent .main-menu__link,
.main-menu__item.is-active-trail > .main-menu__link {
  color: var(--color-primary-dark);
}

.main-menu__submenu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-heading);
  cursor: pointer;
}

.main-menu__submenu-toggle:hover {
  background: var(--color-surface-alt);
}

.main-menu__submenu-toggle[aria-expanded="true"] .icon {
  transform: rotate(180deg);
}

.no-js .main-menu__submenu-toggle {
  display: none;
}

.main-menu__submenu {
  margin: 0 0 var(--space-xs);
  padding: 0 0 0 var(--space-s);
  list-style: none;
}

.main-menu__submenu[hidden] {
  display: none;
}

.main-menu__sublink {
  display: block;
  padding: 0.6rem 0.5rem;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  text-decoration: none;
}

.main-menu__sublink:hover {
  background: var(--color-surface-alt);
  color: var(--color-heading);
}

.main-menu__sublink[aria-current="page"] {
  color: var(--color-primary-dark);
  font-weight: 700;
}

.main-menu__cta {
  width: 100%;
  margin-top: var(--space-m);
}

/* Desktop: horizontal menu with dropdown. Keep in sync with main-menu.js. */
@media (min-width: 75em) {
  .main-menu__toggle {
    display: none;
  }

  .main-menu__panel,
  .js .main-menu__panel,
  .js .main-menu.is-open .main-menu__panel {
    position: static;
    display: flex;
    align-items: center;
    gap: var(--space-s);
    max-height: none;
    overflow: visible;
    padding: 0;
    border: 0;
    background: none;
    box-shadow: none;
  }

  .main-menu__list {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .main-menu__item {
    position: relative;
    border: 0;
  }

  .main-menu__link,
  .main-menu__cta {
    white-space: nowrap;
  }

  .site-branding__name {
    white-space: nowrap;
  }

  .main-menu__link {
    padding: 0.55rem 0.7rem;
    border-radius: var(--radius-sm);
    font-size: 0.975rem;
  }

  .main-menu__item--has-children .main-menu__link {
    padding-right: 0.2rem;
  }

  .main-menu__submenu-toggle {
    width: 1.75rem;
    height: 2.25rem;
  }

  .main-menu__submenu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 70;
    min-width: 16rem;
    margin: 0;
    padding: var(--space-2xs);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-md);
  }

  .no-js .main-menu__submenu {
    display: none;
  }

  .no-js .main-menu__item--has-children:hover .main-menu__submenu,
  .no-js .main-menu__item--has-children:focus-within .main-menu__submenu {
    display: block;
  }

  .main-menu__cta {
    width: auto;
    margin: 0 0 0 var(--space-2xs);
  }
}
`,

  hero: eyebrowBase('.hero__eyebrow') + `
.hero {
  position: relative;
  overflow: hidden;
  background: var(--color-hero-bg);
}

.hero__inner {
  display: grid;
  gap: var(--space-xl);
  padding-block: var(--space-2xl);
}

.hero__title {
  margin-bottom: var(--space-m);
  font-size: var(--step-5);
}

.hero__text {
  max-width: 36rem;
  margin-bottom: var(--space-l);
  font-size: var(--step-1);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Variant: split (text + image side by side) */
.hero--split .hero__media {
  aspect-ratio: 5 / 4;
}

/* Variant: arch (text + tall arched image) */
.hero--arch .hero__media {
  width: min(100%, 26rem);
  aspect-ratio: 4 / 5;
  justify-self: center;
}

@media (min-width: 56em) {
  .hero--split .hero__inner,
  .hero--arch .hero__inner {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: center;
    padding-block: var(--space-3xl);
  }
}

/* Variant: full (full-width image, text below) */
.hero--full .hero__media {
  aspect-ratio: 16 / 7;
  overflow: hidden;
}

.hero--full .hero__inner {
  padding-block: var(--space-xl) var(--space-2xl);
}
`,

  breadcrumb: `.breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  color: var(--color-text-muted);
  font-size: var(--step--1);
  list-style: none;
}

.breadcrumb__item + .breadcrumb__item::before {
  content: "/";
  content: "/" / "";
  margin-inline: 0.5em;
}

.breadcrumb__link {
  color: var(--color-link);
}
`,

  'page-header': `.page-header {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-xl) var(--space-2xl);
  background: var(--color-page-header-bg);
}

.page-header__inner {
  position: relative;
  z-index: 1;
}

.page-header__title {
  margin: var(--space-m) 0 var(--space-s);
  font-size: var(--step-5);
}

.page-header__lead {
  max-width: 42rem;
  margin: 0;
  font-size: var(--step-1);
}
`,

  'section-heading': eyebrowBase('.section-heading__eyebrow') + `
.section-heading {
  max-width: 46rem;
  margin-bottom: var(--space-xl);
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

.section-heading__title {
  margin-bottom: var(--space-s);
  font-size: var(--step-4);
}

.section-heading__text {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--step-1);
}
`,

  'feature-list': `.feature-list {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.feature-list__item {
  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.feature-list__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  margin-bottom: var(--space-s);
  border-radius: var(--radius-pill);
  background: var(--color-icon-bg);
  color: var(--color-icon-fg);
}

.feature-list__icon .icon {
  width: 1.6rem;
  height: 1.6rem;
}

.feature-list__title {
  margin-bottom: var(--space-2xs);
  font-size: var(--step-2);
}

.feature-list__text {
  margin: 0;
  color: var(--color-text-muted);
}

.feature-list--compact .feature-list__item {
  padding: var(--space-m);
}

.feature-list--compact .feature-list__title {
  font-size: var(--step-1);
}
`,

  'media-text': eyebrowBase('.media-text__eyebrow') + `
.media-text {
  display: grid;
  gap: var(--space-xl);
  align-items: center;
}

@media (min-width: 48em) {
  .media-text {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: var(--space-2xl);
  }

  .media-text--reverse .media-text__media {
    order: 2;
  }
}

.media-text__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-lg);
}

.media-text__title {
  font-size: var(--step-4);
}

.media-text__body {
  font-size: var(--step-1);
}

.media-text__list {
  display: grid;
  gap: var(--space-xs);
  margin: var(--space-m) 0 0;
  padding: 0;
  list-style: none;
}

.media-text__list-item {
  display: flex;
  align-items: center;
  gap: 0.6em;
  font-weight: 600;
}

.media-text__list-item .icon {
  padding: 0.2em;
  border-radius: 50%;
  background: var(--color-icon-bg);
  color: var(--color-icon-fg);
  width: 1.5em;
  height: 1.5em;
}

.media-text__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  margin-top: var(--space-l);
}
`,

  'program-card': `.program-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.program-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.program-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.program-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-m) var(--space-m) var(--space-l);
}

.program-card__title {
  margin: 0;
  font-size: var(--step-2);
}

/* The whole card is clickable through the title link. */
.program-card__link {
  color: var(--color-heading);
  text-decoration: none;
}

.program-card__link::after {
  content: "";
  position: absolute;
  inset: 0;
}

@supports selector(:has(*)) {
  .program-card__link:focus-visible {
    outline: none;
  }

  .program-card:has(.program-card__link:focus-visible) {
    outline: var(--focus-width) solid var(--color-focus);
    outline-offset: var(--focus-offset);
  }
}

/* Shown above the title, but read after it. */
.program-card__age {
  order: -1;
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.4em;
  margin: 0;
  padding: 0.25em 0.75em;
  border-radius: var(--radius-pill);
  background: var(--color-tag-bg);
  color: var(--color-tag-text);
  font-size: var(--step--1);
  font-weight: 700;
}

.program-card__age .icon {
  width: 1.05em;
  height: 1.05em;
}

.program-card__text {
  margin: 0;
  color: var(--color-text-muted);
}

.program-card__more {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-top: auto;
  padding-top: var(--space-xs);
  color: var(--color-link);
  font-weight: 700;
}

.program-card:hover .program-card__more .icon {
  transform: translateX(4px);
}
`,

  testimonial: `.testimonial {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  padding: var(--space-l);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.testimonial__quote {
  margin: 0 0 var(--space-m);
  color: var(--color-text);
  font-size: var(--step-1);
  line-height: 1.55;
}

.testimonial__quote::before {
  content: "“";
  content: "“" / "";
  display: block;
  height: 2.25rem;
  color: var(--color-primary);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 4rem;
  line-height: 1;
}

.testimonial__quote p {
  margin: 0;
}

.testimonial__author {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.testimonial__name {
  color: var(--color-heading);
  font-weight: 700;
}

.testimonial__role {
  color: var(--color-text-muted);
  font-size: var(--step--1);
}
`,

  'history-timeline': `.history-timeline {
  position: relative;
  max-width: 48rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.history-timeline::before {
  content: "";
  position: absolute;
  top: 0.75rem;
  bottom: 0.75rem;
  left: 0.7rem;
  width: 3px;
  border-radius: 3px;
  background: var(--color-border-strong);
}

.history-timeline__item {
  position: relative;
  padding: 0 0 var(--space-xl) var(--space-2xl);
}

.history-timeline__item:last-child {
  padding-bottom: 0;
}

.history-timeline__item::before {
  content: "";
  position: absolute;
  top: 0.3rem;
  left: 0;
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid var(--color-primary);
  border-radius: 50%;
  background: var(--color-surface);
}

.history-timeline__title {
  margin-bottom: var(--space-2xs);
  font-size: var(--step-2);
}

.history-timeline__year {
  display: block;
  color: var(--color-primary-dark);
  font-size: var(--step-1);
}

.history-timeline__text {
  margin: 0;
  color: var(--color-text-muted);
}
`,

  'staff-card': `.staff-card {
  height: 100%;
  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.staff-card__photo {
  width: min(10rem, 70%);
  aspect-ratio: 1;
  margin: 0 auto var(--space-m);
  object-fit: cover;
  border-radius: 50%;
}

.staff-card__name {
  margin-bottom: 0.15em;
  font-size: var(--step-2);
}

.staff-card__role {
  margin-bottom: var(--space-xs);
  color: var(--color-eyebrow);
  font-size: var(--step--1);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.staff-card__bio {
  margin: 0;
  color: var(--color-text-muted);
}
`,

  'enrollment-steps': `.enrollment-steps {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.enrollment-steps__item {
  display: flex;
  flex-direction: column;
  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.enrollment-steps__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: var(--space-s);
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-heading);
  font-size: var(--step-2);
  font-weight: 700;
}

.enrollment-steps__title {
  margin-bottom: var(--space-2xs);
  font-size: var(--step-2);
}

.enrollment-steps__text {
  margin: 0;
  color: var(--color-text-muted);
}

.enrollment-steps__action {
  margin: auto 0 0;
  padding-top: var(--space-m);
}
`,

  'location-card': `.location-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.location-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.location-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-m) var(--space-m) var(--space-l);
}

.location-card__title {
  margin: 0;
  font-size: var(--step-3);
}

/* Shown above the title, read after it. */
.location-card__badge {
  order: -1;
  align-self: flex-start;
  margin: 0;
  padding: 0.25em 0.75em;
  border-radius: var(--radius-pill);
  background: var(--color-tag-bg);
  color: var(--color-tag-text);
  font-size: var(--step--1);
  font-weight: 700;
}

.location-card__address,
.location-card__phone {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0;
  font-weight: 600;
}

.location-card__address .icon,
.location-card__phone .icon {
  color: var(--color-icon-fg);
}

.location-card__text {
  margin: var(--space-2xs) 0 0;
  color: var(--color-text-muted);
}

.location-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: auto;
  padding-top: var(--space-s);
}
`,

  'gallery-grid': `.gallery-grid__list {
  display: grid;
  gap: var(--space-m);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.gallery-grid__figure {
  margin: 0;
}

.gallery-grid__link {
  display: block;
  overflow: hidden;
  border-radius: var(--radius-md);
}

.gallery-grid__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-grid__link:hover .gallery-grid__image {
  transform: scale(1.04);
}

.gallery-grid__caption {
  margin-top: var(--space-2xs);
  color: var(--color-text-muted);
  font-size: var(--step--1);
}

/* Lightbox (native <dialog>: focus trap and Escape are built in). */
.gallery-grid__dialog {
  width: min(64rem, calc(100% - 2rem));
  max-height: calc(100% - 2rem);
  padding: 0;
  border: 0;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.gallery-grid__dialog::backdrop {
  background: rgba(20, 16, 16, 0.82);
}

.gallery-grid__dialog-inner {
  display: grid;
  grid-template-areas:
    "close close close"
    "prev view next"
    "count count count";
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-s);
}

.gallery-grid__close {
  grid-area: close;
  justify-self: end;
}

.gallery-grid__prev {
  grid-area: prev;
}

.gallery-grid__next {
  grid-area: next;
}

.gallery-grid__viewer {
  grid-area: view;
  min-width: 0;
  margin: 0;
}

.gallery-grid__viewer-image {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.gallery-grid__viewer-caption {
  margin-top: var(--space-xs);
  color: var(--color-heading);
  font-weight: 700;
  text-align: center;
}

.gallery-grid__counter {
  grid-area: count;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--step--1);
  text-align: center;
}

.gallery-grid__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 2px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-heading);
  cursor: pointer;
}

.gallery-grid__control:hover {
  background: var(--color-surface-alt);
}
`,

  'faq-accordion': `.faq-accordion {
  border-top: 1px solid var(--color-border-strong);
}

.faq-accordion__item {
  border-bottom: 1px solid var(--color-border-strong);
}

.faq-accordion__heading {
  margin: 0;
  font-size: var(--step-1);
}

.faq-accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s);
  width: 100%;
  padding: var(--space-m) var(--space-2xs);
  border: 0;
  background: none;
  color: var(--color-heading);
  font: inherit;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.faq-accordion__trigger:hover {
  color: var(--color-primary-dark);
}

.faq-accordion__icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--color-icon-bg);
  color: var(--color-icon-fg);
}

.faq-accordion__trigger[aria-expanded="true"] .faq-accordion__icon .icon {
  transform: rotate(180deg);
}

.faq-accordion__panel {
  padding: 0 var(--space-2xs) var(--space-m);
}

.faq-accordion__panel[hidden] {
  display: none;
}

.faq-accordion__answer {
  max-width: 44rem;
}

.faq-accordion__answer > :last-child {
  margin-bottom: 0;
}
`,

  'cta-banner': `.cta-banner {
  --color-focus: var(--color-focus-inverse);
  padding-block: var(--space-2xl);
  background: var(--color-cta-bg);
  color: var(--color-on-primary);
}

.cta-banner__inner {
  display: grid;
  gap: var(--space-l);
  align-items: center;
}

@media (min-width: 52em) {
  .cta-banner__inner {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}

.cta-banner__title {
  margin-bottom: var(--space-2xs);
  color: inherit;
  font-size: var(--step-4);
}

.cta-banner__text {
  max-width: 38rem;
  margin: 0;
  font-size: var(--step-1);
}

.cta-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
}
`,

  'contact-info': `.contact-info {
  padding: var(--space-l);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.contact-info__title {
  font-size: var(--step-3);
}

.contact-info__list {
  margin: 0 0 var(--space-m);
}

.contact-info__row {
  padding-block: var(--space-s);
  border-bottom: 1px solid var(--color-border);
}

.contact-info__row:last-child {
  border-bottom: 0;
}

.contact-info__label {
  display: flex;
  align-items: center;
  gap: 0.75em;
  color: var(--color-heading);
  font-weight: 700;
}

.contact-info__icon {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: var(--color-icon-bg);
  color: var(--color-icon-fg);
}

.contact-info__icon .icon {
  width: 1.1rem;
  height: 1.1rem;
}

.contact-info__value {
  margin: 0.15em 0 0;
  padding-left: calc(2.25rem + 0.75em);
}

.contact-info__value address {
  font-style: normal;
}

.contact-info__social-label {
  margin-bottom: var(--space-xs);
  color: var(--color-heading);
  font-weight: 700;
}

.contact-info__actions {
  margin-top: var(--space-s);
}

.contact-info--compact {
  padding: var(--space-m);
}

.contact-info--compact .contact-info__title {
  font-size: var(--step-2);
}
`,

  'contact-form': `.contact-form {
  padding: var(--space-l);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.contact-form__title {
  font-size: var(--step-3);
}

.contact-form__intro {
  margin-bottom: var(--space-l);
  color: var(--color-text-muted);
}

.contact-form__grid {
  display: grid;
  gap: var(--space-m);
}

@media (min-width: 40em) {
  .contact-form__grid {
    grid-template-columns: 1fr 1fr;
  }

  .contact-form__item--full {
    grid-column: 1 / -1;
  }
}

.contact-form__label {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--color-heading);
  font-weight: 700;
}

.contact-form__required {
  color: var(--color-text-muted);
  font-size: var(--step--1);
  font-weight: 400;
}

.contact-form__input {
  display: block;
  width: 100%;
  min-height: 2.875rem;
  padding: 0.65rem 0.85rem;
  border: 2px solid var(--color-input-border);
  border-radius: var(--radius-input);
  background: var(--color-surface);
  color: var(--color-text);
}

textarea.contact-form__input {
  min-height: 8rem;
  resize: vertical;
}

.contact-form__input:focus-visible {
  border-color: var(--color-focus);
  outline-offset: 1px;
}

.contact-form__input[aria-invalid="true"] {
  border-color: var(--color-error);
}

.contact-form__error {
  margin: 0.35rem 0 0;
  color: var(--color-error);
  font-size: var(--step--1);
  font-weight: 700;
}

.contact-form__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-s) var(--space-m);
  margin-top: var(--space-l);
}

.contact-form__note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--step--1);
}

.contact-form__status {
  margin: var(--space-m) 0 0;
  padding: var(--space-s) var(--space-m);
  border-radius: var(--radius-md);
  font-weight: 700;
}

.contact-form__status:empty {
  display: none;
}

.contact-form__status--success {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.contact-form__status--error {
  background: var(--color-error-bg);
  color: var(--color-error);
}
`,

  'location-map': `.location-map {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
}

.location-map__item {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.location-map__frame {
  aspect-ratio: 4 / 3;
  background: var(--color-surface-alt);
}

@media (min-width: 48em) {
  .location-map__frame {
    aspect-ratio: 16 / 10;
  }
}

.location-map__iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

.location-map__caption {
  display: grid;
  gap: var(--space-3xs);
  padding: var(--space-s) var(--space-m) var(--space-m);
  color: var(--color-text-muted);
  font-size: var(--step--1);
}

.location-map__name {
  color: var(--color-heading);
  font-size: var(--step-0);
}

.location-map__link {
  justify-self: start;
  margin-top: var(--space-2xs);
  font-weight: 700;
}
`,

  'sidebar-nav': `.sidebar-nav {
  padding: var(--space-m);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.sidebar-nav__title {
  font-size: var(--step-2);
}

.sidebar-nav__list {
  display: grid;
  gap: 0.15rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar-nav__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xs);
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-sm);
  color: var(--color-heading);
  text-decoration: none;
}

.sidebar-nav__link:hover {
  background: var(--color-surface-alt);
  color: var(--color-heading);
}

.sidebar-nav__link .icon {
  width: 1rem;
  height: 1rem;
}

.sidebar-nav__link[aria-current="page"] {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 700;
}
`,

  'social-links': `.social-links {
  display: flex;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.social-links__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-pill);
  background: var(--color-icon-bg);
  color: var(--color-icon-fg);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.social-links__link:hover {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.social-links--inverse .social-links__link {
  background: rgba(255, 255, 255, 0.12);
  color: var(--color-footer-text);
}

.social-links--inverse .social-links__link:hover {
  background: var(--color-footer-text);
  color: var(--color-footer-bg);
}
`,

  footer: `.site-footer {
  --color-focus: var(--color-focus-inverse);
  background: var(--color-footer-bg);
  color: var(--color-footer-text);
}

.footer__inner {
  display: grid;
  gap: var(--space-xl);
  padding-block: var(--space-2xl);
}

@media (min-width: 40em) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 64em) {
  .footer__inner {
    grid-template-columns: 1.6fr 1fr 1.2fr 1.3fr;
  }
}

.footer__about {
  max-width: 22rem;
  margin: var(--space-m) 0;
  color: var(--color-footer-muted);
}

.footer__heading {
  margin-bottom: var(--space-s);
  color: var(--color-footer-heading);
  font-size: var(--step-1);
}

.footer__list {
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__link {
  color: var(--color-footer-text);
  text-decoration: none;
}

.footer__link:hover {
  color: var(--color-footer-heading);
  text-decoration: underline;
}

.footer__text {
  margin-bottom: var(--space-xs);
  color: var(--color-footer-muted);
}

.footer__address {
  font-style: normal;
}

.footer__location-name {
  color: var(--color-footer-heading);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s);
  padding-block: var(--space-m);
  border-top: 1px solid var(--color-footer-border);
  color: var(--color-footer-muted);
  font-size: var(--step--1);
}

.footer__copyright {
  margin: 0;
}

.footer__bottom-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-m);
  margin: 0;
  padding: 0;
  list-style: none;
}
`,

  'option-switcher': `/**
 * DEMO ONLY: floating design switcher for the client meeting.
 * Not part of the Drupal theme. Delete this file and the markup when building the theme.
 */
.option-switcher {
  position: fixed;
  bottom: 0.75rem;
  left: 50%;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.3rem;
  border-radius: 999px;
  background: #1f1f24;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  font: 600 0.8125rem/1 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  transform: translateX(-50%);
}

.option-switcher__designs,
.option-switcher__themes {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.option-switcher__themes {
  gap: 0.3rem;
  padding: 0 0.35rem 0 0.15rem;
}

.option-switcher__divider {
  width: 1px;
  height: 1.5rem;
  margin: 0 0.3rem;
  background: #52525b;
}

.option-switcher__swatch {
  width: 1.625rem;
  height: 1.625rem;
  padding: 0;
  border: 2px solid #1f1f24;
  border-radius: 50%;
  background: var(--swatch);
  box-shadow: 0 0 0 1px #71717a;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.option-switcher__swatch:hover {
  transform: scale(1.12);
}

.option-switcher__swatch[aria-pressed="true"] {
  box-shadow: 0 0 0 2px #ffffff;
}

.option-switcher__swatch:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 3px;
}

.option-switcher__all-short {
  display: none;
}

@media (max-width: 26em) {
  .option-switcher__all-long {
    display: none;
  }

  .option-switcher__all-short {
    display: inline;
  }
}

.option-switcher__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 0.65rem;
  border-radius: 999px;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
}

.option-switcher__link:hover {
  background: #3f3f46;
  color: #ffffff;
}

.option-switcher__link[aria-current="true"] {
  background: #ffffff;
  color: #1f1f24;
}

.option-switcher__link--all {
  margin-right: 0.2rem;
  color: #e4e4e7;
}

.option-switcher__link:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 2px;
}

.site-footer {
  padding-bottom: 3.75rem;
}

@media print {
  .option-switcher {
    display: none;
  }
}
`,
};

// News card: same look as the program card in every option, with a category + date line.
const toNewsCard = (css) => css
  .replace(/program-card__age/g, 'news-card__category')
  .replace(/program-card__text/g, 'news-card__summary')
  .replace(/\.grid > \.program-card:/g, '.grid > :')
  .replace(/program-card/g, 'news-card');

components['news-card'] = toNewsCard(components['program-card']) + `
.news-card__meta {
  order: -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2xs) var(--space-s);
  margin: 0;
  font-size: var(--step--1);
}

.news-card__date {
  color: var(--color-text-muted);
}
`;

components['news-listing'] = `.news-listing__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
}

.news-listing__filters[hidden] {
  display: none;
}

.news-listing__filter {
  min-height: 2.75rem;
  padding: 0.5rem 1.1rem;
  border: 2px solid var(--color-input-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-heading);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

a.news-listing__filter {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.news-listing__filter:hover {
  border-color: var(--color-primary-dark);
}

.news-listing__filter[aria-pressed="true"],
.news-listing__filter[aria-current="true"] {
  border-color: var(--color-primary-dark);
  background: var(--color-primary-dark);
  color: var(--color-on-primary);
}

.news-listing__filter:focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: var(--focus-offset);
}

.news-listing__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.news-listing__item[hidden] {
  display: none;
}

.news-listing__empty {
  text-align: center;
}
`;

module.exports = { base, layout, components, eyebrowBase, toNewsCard };
