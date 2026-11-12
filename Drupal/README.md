# EMA Drupal 11 site

Drupal 11 site for **Eagan Montessori Academy South & Amazing Beginnings Montessori**.

**Approved design (November 10, 2026):** Option A, "Warm & Friendly", with the **Rose** color palette
(`#b84667`). The site uses only the `ema_warm` theme. It is converted from the static demo in `../option-a`.

- **Drupal** 11.4 · PHP 8.4 · MariaDB 11.8 · Drush 13 · Paragraphs 1.x
- **Local URL:** https://ema.ddev.site
- **Admin login:** `admin` / `admin` (local only; change it before sharing the site).

## Quick start

```bash
cd Drupal
ddev start
ddev launch            # opens the site
ddev drush uli         # one-time admin login link
```

## Site overview

- **Theme:** **EMA Warm** (`ema_warm`, a sub-theme of `ema_base`). Admin pages use Claro. Settings at
  *Appearance → Settings → EMA Warm*: Apply Now link and label, tour link, social links, hero layout, logo mark.
- **News:** *Content → Add content → News post*. Fill in title, summary, category, school, photo (with alt text)
  and text. The post appears on the News page, on the home page (latest 3) and in the "Recent news" sidebar.
  It gets a `/news/<title>` URL automatically. Categories are a taxonomy (*Structure → Taxonomy → News category*)
  and become the filter buttons on the News page (`/news?category=events`).
- **Languages:** English, Español and Soomaali are real Drupal languages (`/es/...`, `/so/...`). The
  content is not translated yet.
- **Contact form:** the form on *Contact & Tour* is a real Drupal contact form ("tour"). DDEV catches the
  emails: run `ddev mailpit`.

## How it is built

```
web/themes/custom/
  ema_base/                 Base theme (hidden): everything shared
    components/<name>/      31 Single Directory Components (.component.yml, .twig, .css, .js)
    templates/              html, page, region, blocks, menu, nodes, paragraphs, fields
    ema_base.theme          Preprocess: turns content into component props (the `ema` variable)
    theme-settings.php      Settings form shared by the option themes
    css/                    base.css, layout.css, drupal.css (tabs, messages, forms)
  ema_warm/                 The site theme (Option A, Rose): only design differences
                              css/tokens.css      colors, fonts, spacing (rebrand here)
                              css/overrides/*.css per-component styles, added with libraries-extend
                              config/install      theme settings (hero variant, logo mark, ...)
  ema_modern/, ema_calm/    Options B and C. Uninstalled, kept only for reference: safe to delete.
web/modules/custom/ema_site/
  ema_site.module           Data helpers (locations, programs, staff, FAQ ...) + contact form tweaks
  src/Plugin/Block/         CTA banner, Program navigation, Recent news, Visit us (render SDC components)
  scripts/setup.php         Builds the content model and imports the starter content (re-runnable)
  assets/                   content.json, photos (CC0 samples + CREDITS.md), icon list
config/sync/                Exported configuration (drush cex / cim)
```

### Regions → blocks

| Region | Blocks |
|---|---|
| header | Site branding (→ `site-branding` component) |
| primary_menu | Main menu (→ `main-menu`, with the Apply Now button). No "Home" item: the logo links home |
| hero | Page title (→ `page-header` with breadcrumb and lead text; hidden on the front page) |
| highlighted | Status messages, tabs |
| content | Main page content |
| sidebar | Program pages: Program navigation + Visit us. News posts: Recent news + Visit us |
| footer_top | EMA call-to-action banner (text per page from the CTA fields) |
| footer | (free) The footer itself is the `footer` component, rendered by `page.html.twig` |

The utility bar (hours, phone numbers, language switcher) and the footer come from `ema_base_preprocess_page()`.

### Content model

- **Basic page** and **Program** pages are built from **Sections** (Paragraphs):

  | Paragraph | Component |
  |---|---|
  | Hero | `hero` (variant comes from the theme) |
  | Feature list | `feature-list` (default, compact, or highlights) |
  | Media and text | `media-text` |
  | Steps | `enrollment-steps` |
  | Timeline | `history-timeline` |
  | Gallery | `gallery-grid` |
  | Featured testimonial | `testimonial` |
  | Listing | Shows programs, schools, testimonials, staff, an FAQ group, news (latest 3 or all with filters + pager), the contact form + school details, or Google Maps for both schools (`location-map`; embed URL built from each School location's name and address) |

- **Program pages** (all six): lead text, age range, text, a "highlights" feature list and an FAQ group
  (FAQ nodes with that program's category), plus their own call-to-action banner.
- **Content types:** Program, School location, Staff member, Testimonial, FAQ (with a category), News post
  (summary, category, school, photo, text; template `node--news--full.html.twig`).
  Editors change these once, and every listing, the footer and the utility bar update.
- **Image styles:** `ema_card`, `ema_wide`, `ema_square`, and `ema_hero_split` / `ema_hero_full` / `ema_hero_arch`
  (each option uses its own hero crop).
- **Staff photos:** staff and school buildings have no photos yet, so the theme shows labeled placeholders.
  Staff cards never use stock faces.

## Rebuilding from scratch

Not tested end to end yet: the current site was built step by step, and the config was exported afterwards.

```bash
ddev start
ddev composer install
ddev drush site:install standard -y --existing-config --account-pass=admin
ddev drush php:script web/modules/custom/ema_site/scripts/setup.php   # content model + starter content
ddev drush cr
```

## Things to know

- **Drupal 11.4's standard profile** no longer creates Basic page or a body field. `setup.php` creates them.
- **Page cache is on** (`page_cache` + `dynamic_page_cache`).
- **Starter content:** the six news posts are samples, and program text, FAQs and photos are short versions
  based on the current website. Replace them with the school's own content and photos before launch.
- **Backup** taken before the switch to the single theme: `../backups/local-only/LOCAL-ROLLBACK-ONLY-before-single-theme-2026-11-10.sql.gz`
  (`ddev import-db --file=...` to restore).
- **Code style:** the blocks and helpers call `\Drupal::` statically to keep the demo small. Move them to
  injected services when this becomes the production site.
- **Suggested next modules:** Pathauto (URL patterns for all content types; news posts already get one from
  `ema_site_node_presave()`), Metatag (SEO), Webform (if the forms grow),
  Media Library (shared image library), and Content Translation (Spanish and Somali content).
