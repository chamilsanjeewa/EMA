# Eagan Montessori Academy South & Amazing Beginnings Montessori: Design Options (static demo)

Three static HTML sample sites for the first client meeting. They are built to become a **Drupal 11 theme** later.

| Option | Folder | Direction | Home hero variant |
|---|---|---|---|
| A | `option-a/` | Warm & Friendly: brand rose `#b84667`, cream, peach, sunny yellow, rounded "blob" shapes | `split` |
| B | `option-b/` | Clean & Modern: white space, strict grid, big type, brand rose as a single accent, numbered sections | `full` |
| C | `option-c/` | Calm Montessori: sage, linen, walnut, clay-rose accent, serif headings, arch shapes, paper texture | `arch` |

All three options have the same pages, content, markup structure and component names. Only the tokens and the CSS change.

---

## 1. How to open and present the demo

1. Double-click **`index.html`** in this folder. You don't need a server, an internet connection or a build step.
2. Click **Open Option A / B / C**, or open **All pages** under any option.
3. On every page, the dark **All designs · A · B · C** pill at the bottom shows the *same page* in another option. This is the easiest way to compare designs.
4. The **color dots** in the same pill switch the color theme: **Rose** (`#b84667`, from the original brief), **Sage**, **Ocean**, **Terracotta**, **Navy** (`#004b87`, the main color on their current website) and **Plum**. The choice is remembered when you change pages or switch between A, B and C, so you can compare one palette across all three designs. Options A and B start in Rose, and C starts in Sage. (The choice is stored in the browser. If a browser blocks storage for local files, the theme resets on each new page.)
5. To show the mobile layout, make the browser window narrow, or use the device toolbar in developer tools (Cmd+Opt+I, then Cmd+Shift+M). The menu turns into a **Menu** button below 1200px (`75em`).
6. Other things to demonstrate:
   - **Programs ▾** dropdown in the main menu (works with mouse and keyboard)
   - **Language switcher** (English / Español / Soomaali) in the top bar. It's demo only: it shows a short message, and the choice is remembered between pages.
   - **FAQ accordion** (FAQ, Enrollment and every program page)
   - **Gallery lightbox** (click any photo; use the arrow keys and Escape)
   - **Contact form validation**: submit it empty, then fill it in. Nothing is sent.
   - **Keyboard**: press Tab on any page. The first stop is the "Skip to main content" link, and every control has a visible focus ring.

**Content source:** all school facts come from their current site, [montessorikidscare.com](https://www.montessorikidscare.com), rewritten short. That includes both locations, phone numbers, hours, programs and ages, NAEYC / Parent Aware / Readers' Choice, the staff names, parent quotes and the FAQ.

**To confirm with the client before launch:**
- **Opening years:** their homepage says Amazing Beginnings opened in 2006 and EMA South in 2016. But the director's bio says Amazing Beginnings opened in 2009, and the EMA South page says the school opened in July 2014. The demo uses the homepage years.
- **NAEYC:** the homepage says "we are NAEYC accredited", while the FAQ says only Amazing Beginnings is. The demo says "NAEYC accredited" without naming a school.
- **Apply Now:** the button links to `#`. The original brief said enrollment goes through Brightwheel, but their site describes a tour → intake interview → enrollment form process. The Enrollment page follows the site.
- **Languages and social links:** the language switcher (English/Spanish/Somali) and the Instagram/Facebook links come from the original brief. The current site has neither (it has a YouTube video).
- **Email:** only Amazing Beginnings shows an email (`ighkids@gmail.com`). Eagan's email is unknown.
- **Photos:** staff photos and school building photos are labeled placeholders. All other photos are stock samples.

**About the photos:** they are free stock photos (CC0, public domain, from StockSnap via Openverse), saved locally and cropped to each slot's exact size. They are only there to show the look. They are **not** photos of the school, so replace them with the school's own photos (with parent permission) before launch. Credits are in `images/CREDITS.md`. The labeled SVG versions in `images/placeholders/` show the exact size and purpose of every image slot. The map is still a placeholder.

---

## 2. Folder structure

```
index.html                    Meeting launcher (demo only)
option-a/ | option-b/ | option-c/
  index.html                  Home
  programs.html               Programs overview
  program-infant-care.html    Program detail pages (with sidebar), one per program:
  program-toddler.html          Toddler, Preschool, Pre-K & Kindergarten,
  program-preschool.html        Summer Bridge, Gifted/Talented & STEM
  program-pre-k-kindergarten.html
  program-summer-bridge.html
  program-gifted-talented-stem.html
  enrollment.html
  about.html                  History + staff
  gallery.html
  faq.html
  contact.html                Form, map placeholder, hours, address
  css/
    tokens.css                All colors, fonts, spacing, radius, shadows. Rebrand here.
    themes.css                Demo only: the 5 color themes (token overrides per [data-theme])
    base.css                  Reset, typography, links, focus styles, skip link, helpers
    layout.css                Regions, container, sections, grids, sidebar layout
    components/<name>.css     One file per component
  js/components/<name>.js     One file per interactive component
  images/                     Sample photos (.jpg), map placeholder, favicon, CREDITS.md
    placeholders/             Labeled SVGs showing each slot's size and purpose
```

To change the brand colors, edit only `css/tokens.css` (for example `--color-primary`). Every component reads its colors from tokens.

`css/themes.css` shows how this works: each theme only overrides color tokens, so no component CSS changes. Every theme passes the same WCAG AA contrast checks as the defaults. Once the client picks a palette, copy that theme's values into `tokens.css` and delete `themes.css`.

---

## 3. Components and where they are used

Class names follow BEM (`.program-card__title`, `.hero--split`). Each component starts with an HTML comment such as `<!-- component: program-card -->`. Each page loads only the component CSS it uses, the same way Drupal attaches SDC libraries.

| Component | Purpose | JS | Used on |
|---|---|---|---|
| `header` | Site header wrapper (utility bar + branding + menu) | | All pages |
| `utility-bar` | Top bar: hours, phone, language switcher | | All pages |
| `language-switcher` | EN / ES / SO dropdown (demo) | ✓ | All pages |
| `site-branding` | Logo mark + school name | | All pages (header + footer) |
| `main-menu` | Main navigation, mobile toggle, Programs dropdown, Apply Now | ✓ | All pages |
| `button` | Buttons and links styled as buttons (`primary`, `secondary`, `inverse`, `ghost-inverse`, `large`, `small`, `block`) | | All pages |
| `hero` | Home hero. Variants: `split` (A), `full` (B), `arch` (C) | | Home |
| `page-header` | Inner-page title + lead text | | All inner pages |
| `breadcrumb` | Breadcrumb trail | | All inner pages |
| `section-heading` | Eyebrow + section title + intro | | Home, Programs, Enrollment, About, FAQ, Contact |
| `feature-list` | Icon + title + text list (highlights, program extras, special classes) | | Home, Programs, program pages, About |
| `media-text` | Image + text + check list + actions | | Home, Enrollment, About |
| `program-card` | Program teaser (whole card is clickable) | | Home, Programs |
| `testimonial` | Parent quote | | Home, About |
| `history-timeline` | Year-by-year history | | About |
| `staff-card` | Staff photo, name, role, bio (real staff names use labeled placeholder portraits, not stock faces) | | About |
| `enrollment-steps` | Numbered "how to enroll" steps | | Enrollment |
| `location-card` | One school: photo, "now enrolling" badge, address, phone, areas served, tour + directions buttons | | Home, Contact |
| `gallery-grid` | Photo grid + `<dialog>` lightbox | ✓ | Home (6 photos), Gallery (12) |
| `faq-accordion` | Accessible accordion | ✓ | Program pages, Enrollment, FAQ |
| `contact-form` | Demo contact form with inline validation | ✓ | Contact |
| `contact-info` | Hours + both schools (address, phone, email, directions) + social (`--compact` variant for the sidebar) | | Program pages (sidebar), Contact |
| `map-placeholder` | Map image + caption + Google Maps link | | Contact |
| `sidebar-nav` | Program list in the sidebar | | Program pages |
| `social-links` | Instagram + Facebook icons | | All pages (footer), Contact |
| `cta-banner` | "Apply Now / Schedule a tour" banner | | All pages (footer_top region) |
| `footer` | Footer columns + bottom bar | | All pages |
| `option-switcher` | **Demo only.** Floating A · B · C design switcher + color theme swatches. Do not port it. | ✓ | All pages |

Page-level helpers in `layout.css`, which are not components: `.container`, `.section`, `.section--alt`, `.grid--3/4`, `.layout--with-sidebar`, `.prose`, `.program-detail`, `.contact-layout`, `.faq-wrap`.

---

## 4. Page regions

Every page uses the same regions. Each region starts with a comment such as `<!-- region: hero -->`.

```
<a class="skip-link">                     → html.html.twig
<header class="region--header">           region: header       (utility-bar, site-branding)
  <div class="region--primary-menu">      region: primary_menu (main-menu + Apply Now)
<main id="main-content">
  <div class="region--hero">              region: hero         (hero / page-header + breadcrumb)
  <div class="region--highlighted">       region: highlighted  (Home highlights; Drupal status messages)
  <div class="region--content">           region: content
  <aside class="region--sidebar">         region: sidebar      (optional, program pages only)
</main>
<div class="region--footer-top">          region: footer_top   (cta-banner)
<footer class="region--footer">           region: footer
```

---

## 5. How this maps to a Drupal 11 theme

### 5.1 Theme info and regions: `ema.info.yml`

```yaml
name: EMA
type: theme
core_version_requirement: ^11
base theme: false
libraries:
  - ema/global
regions:
  header: Header
  primary_menu: 'Primary menu'
  hero: Hero
  highlighted: Highlighted
  content: Content
  sidebar: Sidebar
  footer_top: 'Footer top'
  footer: Footer
```

### 5.2 Global library: `ema.libraries.yml`

```yaml
global:
  css:
    theme:
      css/tokens.css: {}
      css/base.css: {}
      css/layout.css: {}
```

Component CSS/JS is **not** listed here. Each SDC loads its own files automatically when it renders.

### 5.3 Templates

| Static file / markup | Drupal template |
|---|---|
| `<html>`, `<head>`, skip link, `no-js` → `js` class | `templates/layout/html.html.twig` |
| Page skeleton with regions | `templates/layout/page.html.twig` (`{{ page.header }}`, `{{ page.primary_menu }}`, …) |
| Program detail with sidebar | `page.html.twig` adds `layout--with-sidebar` when `page.sidebar` is not empty |
| Region wrappers (`.region--hero` etc.) | `templates/layout/region.html.twig` |
| `site-branding` | `block--system-branding-block.html.twig` → `{{ include('ema:site-branding', {...}) }}` |
| `main-menu` | `menu--main.html.twig` → `ema:main-menu` (menu items as a prop) |
| `language-switcher` | `links--language-block.html.twig` → `ema:language-switcher` (core Language + Content Translation modules) |
| `breadcrumb` | `breadcrumb.html.twig` → `ema:breadcrumb` |
| `page-header` | Page title block (`block--page-title-block.html.twig`) or a custom block in the hero region |
| `hero` | Block content type "Hero" (or a field on the front page) → `block--hero.html.twig` → `ema:hero` with `variant` prop |
| `program-card` | Content type **Program** → `node--program--teaser.html.twig` → `ema:program-card` |
| Program detail | `node--program--full.html.twig` (`.program-detail`) |
| Programs grid / sidebar-nav | Views of Program nodes (grid display and a block display for the sidebar) |
| `staff-card` | Content type or paragraph **Staff** → View on About page |
| `location-card` | Content type **Location** (address, phone, email, map link, "now enrolling" text) → View, reused in footer and contact-info |
| `testimonial` | Content type or paragraph **Testimonial** |
| `faq-accordion` | Paragraph **FAQ group** with question/answer items (or a FAQ content type + View) |
| `gallery-grid` | Media (image) + View, or a Gallery paragraph → `ema:gallery-grid` |
| `history-timeline`, `enrollment-steps`, `feature-list`, `media-text` | Paragraph types (or Layout Builder blocks) that render the matching SDC |
| `contact-form` | **Webform** (styles stay the same; validation handled by Webform) |
| `contact-info`, `map-placeholder`, `social-links` | Custom blocks (or site settings) placed in content / sidebar / footer |
| `cta-banner` | Custom block placed in `footer_top` |
| `footer` | `region--footer.html.twig` → `ema:footer` with menus and blocks in slots |
| `option-switcher`, `css/themes.css`, theme script in `<head>` | **Delete.** They're only for the meeting. Move the chosen palette into `tokens.css`. |

### 5.4 Single Directory Components

Each component folder becomes:

```
components/program-card/
  program-card.component.yml   # props + slots schema
  program-card.twig            # markup from the static HTML
  program-card.css             # copy of css/components/program-card.css
  program-card.js              # only for interactive components
```

Example `program-card.component.yml`:

```yaml
$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json
name: Program card
props:
  type: object
  properties:
    title: { type: string }
    url: { type: string }
    age: { type: string }
    icon: { type: string }
    text: { type: string }
    image: { type: object }
```

Suggested props and slots:

| Component | Props | Slots |
|---|---|---|
| `hero` | `variant` (`split`/`full`/`arch`), `eyebrow`, `title`, `text`, `image` | `actions` |
| `page-header` | `title`, `lead` | `breadcrumb` |
| `section-heading` | `eyebrow`, `title`, `text`, `center`, `heading_level` | |
| `feature-list` | `items[]` (`icon`, `title`, `text`), `modifier`, `heading_level` | |
| `media-text` | `eyebrow`, `title`, `image`, `reverse`, `list[]` | `body`, `actions` |
| `button` | `label`, `url`, `variant`, `size` | |
| `faq-accordion` | `id`, `items[]` (`question`, `answer`), `heading_level` | |
| `cta-banner` | `title`, `text` | `actions` |
| `contact-info` | `compact`, `show_apply` | `social` |
| `main-menu` | `items[]`, `apply_url` | |
| `footer` | | `brand`, `explore`, `programs`, `visit`, `bottom` |

### 5.5 JavaScript

The scripts in `js/components/` are plain IIFEs that call `init()` for each `[data-component="…"]`. To port one, wrap it in a behavior and use `once`:

```js
(function (Drupal, once) {
  Drupal.behaviors.emaFaqAccordion = {
    attach(context) {
      once('faq-accordion', '[data-component="faq-accordion"]', context).forEach(init);
    },
  };
})(Drupal, once);
```

If needed, add `dependencies: [core/drupal, core/once]` under `libraryOverrides` in the component's `.component.yml`.

---

## 6. Accessibility notes (WCAG 2.2 AA)

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1` per page, logical heading order.
- Skip link, visible `:focus-visible` rings, and a light focus color on dark backgrounds.
- Menu, language switcher and accordion use `aria-expanded` / `aria-controls` and support Escape and arrow keys. The lightbox uses native `<dialog>`, which keeps focus inside and closes on Escape.
- Every color pair in the tokens was checked for contrast. Normal text is at least 4.5:1, and UI parts and focus rings at least 3:1, in all three options.
- Touch targets meet WCAG 2.2's 24×24px minimum. Main controls (menu, buttons, form fields) are about 44px tall.
- `prefers-reduced-motion` turns off animations.
- Without JavaScript the site still works: the menu and submenu are visible, all FAQ answers are open, and gallery links open the image.
- Every image has `alt` text. Decorative images use `alt=""`.
