# EMA website project: notes for Claude

New website for **Eagan Montessori Academy South** (1970 Rahncliff Court, Eagan, MN) and
**Amazing Beginnings Montessori** (3105 65th St. East, Inver Grove Heights, MN). Current site:
https://www.montessorikidscare.com. Owner/developer: Chamil (freelance, presenting to the school owner).

Keep this file current: add decisions, finished work and open items as they happen (dates as YYYY-MM-DD).

## Status (2026-11-11)

- **Approved design (2026-11-10):** Option A "Warm & Friendly", **Rose** palette `#b84667`. B and C are demo only.
- Static HTML demos (A/B/C) are done and live on GitHub Pages: https://chamilsanjeewa.github.io/EMA/
- Drupal 11 site (`Drupal/`) runs only `ema_warm`; demo design/color switcher removed; News section,
  six full program pages, Google Maps on Contact.
- Pantheon site **EMA-eagan** (https://dev-ema-eagan.pantheonsite.io): code pushed to Dev (Drupal 11.4.12,
  PHP 8.3, MariaDB 10.6). DB + files imported from `backups/`.

## Folder map

| Path | What | Git |
|---|---|---|
| `option-a/`, `option-b/`, `option-c/`, `index.html` | Static demos (generated: do not hand-edit) | GitHub `chamilsanjeewa/EMA` (main) → GitHub Pages |
| `tools/generator/` | **Source of truth** for demos + Drupal CSS/JS/SDC/content.json (see its README) | same repo |
| `Drupal/` | Original Drupal 11 build, DDEV project **ema** (https://ema.ddev.site), PHP 8.4, MariaDB 11.8 | not committed yet (untracked in root repo) |
| `ema-eagan/` | Pantheon repo, DDEV project **ema-eagan** (PHP 8.3, MariaDB 10.6, matches Pantheon). **Folder missing on 2026-11-11** (DDEV still lists it). Re-clone: `git clone ssh://codeserver.dev.d0539038-8dbd-4a45-a798-00bf82bc5f1c@codeserver.dev.d0539038-8dbd-4a45-a798-00bf82bc5f1c.drush.in:2222/~/repository.git ema-eagan` | Pantheon git (`master` = Dev) |
| `backups/` | `ema-pantheon-import-db.sql.gz` + `ema-pantheon-import-files.tar.gz` (Pantheon import); `local-only/` = rollback dump, never import to Pantheon | git-ignored (contains user accounts) |

## How changes flow

1. Content/styles shared by demos and Drupal: edit `tools/generator/*`, then
   `node build.js ../..` (demos), `node drupal-export.js ../../Drupal`, `python3 sdc.py ../../Drupal/web/themes/custom/ema_base`.
   Contrast report must say "All contrast checks pass".
2. Drupal-only code: `Drupal/web/modules/custom/ema_site`, `Drupal/web/themes/custom/ema_base|ema_warm`.
   Content model + starter content: `ema_site/scripts/setup.php` (re-runnable; syncs program pages, menu, blocks).
   Then `ddev drush cex -y`.
3. To Pantheon: rsync `ema_site`, `ema_base`, `ema_warm` and `config/sync/` (→ `ema-eagan/config/`, keep its
   `.htaccess`) into `ema-eagan`, commit, push `master` (builds Dev), then `drush updb -y && drush cim -y && drush cr`.
   Never copy `ema_modern` / `ema_calm` to Pantheon.
4. Content lives in the database. After launch: edit content on Pantheon Live; copy DB down, never up.

## Decisions and conventions

- Plain HTML/CSS/vanilla JS demos that open by double-click; BEM; one CSS file per component (SDC-like);
  `tokens.css` for all colors; mobile-first; WCAG 2.2 AA (generator checks contrast).
- Local images only. Exception (requested 2026-11-10): keyless Google Maps embeds on Contact (`location-map`).
- Sample photos are CC0 StockSnap (`tools/generator/photos`). Staff and buildings use labeled placeholders on
  purpose (never stock faces for real staff names).
- Copy: short, simple sentences; do not copy long text from montessorikidscare.com.
- Main menu has no "Home" item (logo links home) so 8 items fit; "News" between FAQ and Contact.
- Drupal: Paragraphs-based pages; content types page, program, location, staff, testimonial, faq, news
  (+ `news_category` taxonomy); news posts get `/news/<title>` aliases automatically (`ema_site_node_presave`);
  aliases use langcode `und` so `/es/...` and `/so/...` work; page cache on.
- Pantheon: DDEV `ema-eagan` does not manage `settings.php`; local DB settings in git-ignored
  `web/sites/default/settings.local.php`; `.ddev/homeadditions` adds `skip-ssl` (MariaDB 10.6 has no SSL).

## Gotchas learned

- DB exports for Pantheon: skip cache data (`drush sql:dump --structure-tables-list='cache,cache_*,sessions,watchdog'`)
  and strip every `/*M!999999\- enable the sandbox mode */` line (MariaDB 11 client; older importers fail).
  Stale cache tables once made Pantheon report missing `ema_calm`/`ema_modern` themes.
- Files archive for Pantheon must include `private/.htaccess` (Pantheon private path `sites/default/files/private`).
- zsh does not split unquoted variables: use arrays/functions, not `$FLAGS`.
- Headless Chrome: below ~500px width it crops (use an iframe page for phone shots); Google Maps tiles need
  `--use-angle=swiftshader --enable-unsafe-swiftshader` (no `--disable-gpu`).
- DDEV command output contains `\r`; `git push` to GitHub needed `http.postBuffer 524288000`.
- `drupal-export.js` overwrites shared CSS/JS in `Drupal/`; hand edits there get lost unless made in the generator.

## Open items

- **Content to confirm with the owner:** opening years (2006/2016 vs 2009/2014), NAEYC scope (both schools?),
  Apply/Brightwheel link (`apply_url` theme setting is `#`), Eagan school email, real social links,
  staff bios + photos, real school photos with parent consent, testimonials permission, Spanish/Somali translations.
- Pantheon: change admin password (imported DB uses admin/admin), set site email + tour form recipient
  (`admin@example.com` now), confirm `/news` exists and status report is clean.
- Contact module is deprecated in Drupal 11: plan a move to Webform.
- Git: root repo has uncommitted map changes, `tools/`, `.gitignore`; `Drupal/` not committed;
  `ema-eagan` had uncommitted `.ddev/` + README changes before the folder disappeared.
- Optional: `noindex` on the GitHub Pages demo; align `Drupal/` DDEV to PHP 8.3 / MariaDB 10.6 and core 11.4.12.
