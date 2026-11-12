# Generator (static demos + Drupal theme assets)

Node + Python scripts that produce the static HTML demos (`../../option-a|b|c`, `../../index.html`) and the
shared CSS/JS/SDC files of the Drupal themes. Edit content and styles **here**, then rebuild, so the HTML
demos and Drupal stay identical.

| File | What it holds |
|---|---|
| `content.js` | Site content (schools, programs, staff, FAQ, gallery, menu). `&amp;` is pre-escaped. |
| `program-details.js` | Program detail pages (lead, body, highlights, FAQ, CTA) |
| `news.js` | News categories and the 6 sample posts |
| `components.js` | HTML for every component (1:1 with the Drupal SDCs) |
| `pages.js` | Page definitions (regions per page) |
| `css-common.js` | `base.css`, `layout.css` and every component's CSS |
| `css-options.js` | Tokens + per-option overrides for A (warm), B (modern), C (calm) and the demo color themes |
| `js-components.js` | Vanilla JS components (converted to Drupal behaviors by the export) |
| `icons.js` | Stroke icons + logo marks |
| `images.js`, `photos.js` | SVG placeholders, favicons, photo cropping (`photos/orig` + `photos/picks.json`, CC0) |
| `launcher.js` | Root `index.html` (design chooser) |
| `drupal-export.js` | Writes CSS, JS, icons, `content.json` and photos into a Drupal project |
| `sdc.py` | Writes SDC `.component.yml` + `.twig` files into `ema_base/components` |
| `test.html` | Browser test page for the static demos (open in Chrome with file access) |

## Commands

```bash
cd tools/generator
node build.js ../..                                   # static demos (replaces option-a/b/c + index.html)
node drupal-export.js ../../Drupal                     # Drupal CSS/JS/icons/content.json/photos
python3 sdc.py ../../Drupal/web/themes/custom/ema_base # Drupal SDC yml + twig
```

`build.js` needs macOS `sips` (photo crops) and prints a WCAG contrast report: it must say
"All contrast checks pass". The Drupal export also writes the uninstalled `ema_modern`/`ema_calm` folders
in `../../Drupal`; they are never copied to Pantheon.

Verified on 2026-11-11: a fresh build and export reproduce the current files byte for byte.
