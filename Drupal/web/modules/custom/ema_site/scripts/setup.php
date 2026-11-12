<?php

/**
 * @file
 * Builds the EMA content model, imports the starter content and places blocks.
 *
 * Run once after enabling ema_site and installing the themes:
 *   ddev drush php:script web/modules/custom/ema_site/scripts/setup.php
 *
 * Safe to re-run: existing config is kept; starter content is only created
 * when it does not exist yet (matched by title). Program pages, the home page
 * "Latest news" section, the main menu and blocks are synced on every run.
 */

declare(strict_types=1);

use Drupal\block\Entity\Block;
use Drupal\contact\Entity\ContactForm;
use Drupal\Core\File\FileExists;
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Drupal\menu_link_content\Entity\MenuLinkContent;
use Drupal\node\Entity\Node;
use Drupal\node\Entity\NodeType;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\paragraphs\Entity\ParagraphsType;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\Entity\Vocabulary;
use Drupal\user\Entity\Role;

$module_path = \Drupal::service('extension.list.module')->getPath('ema_site');
$data = json_decode(file_get_contents(DRUPAL_ROOT . '/' . $module_path . '/assets/content.json'), TRUE);
$icons = json_decode(file_get_contents(DRUPAL_ROOT . '/' . $module_path . '/assets/icons.json'), TRUE);
$repo = \Drupal::service('entity_display.repository');

// Decode the pre-escaped "&amp;" used by the static demo content.
$plain = static fn (?string $s): string => html_entity_decode((string) $s, ENT_QUOTES | ENT_HTML5);

echo "1. Image styles\n";
$styles = [
  'ema_card' => ['Card 4:3 (800×600)', 800, 600],
  'ema_wide' => ['Wide 16:9 (1200×675)', 1200, 675],
  'ema_square' => ['Square (400×400)', 400, 400],
  'ema_hero_split' => ['Hero split (1000×800)', 1000, 800],
  'ema_hero_full' => ['Hero full (1600×700)', 1600, 700],
  'ema_hero_arch' => ['Hero arch (800×1000)', 800, 1000],
];
foreach ($styles as $id => [$label, $w, $h]) {
  if (!ImageStyle::load($id)) {
    $style = ImageStyle::create(['name' => $id, 'label' => $label]);
    $style->addImageEffect(['id' => 'image_scale_and_crop', 'weight' => 0, 'data' => ['width' => $w, 'height' => $h, 'anchor' => 'center-center']]);
    $style->save();
  }
}

/**
 * Creates a field (storage + instance + form/view display) if missing.
 */
$field = static function (string $entity_type, string $bundle, string $name, string $type, string $label, array $o = []) use ($repo): void {
  $storage = FieldStorageConfig::loadByName($entity_type, $name);
  if (!$storage) {
    $storage = FieldStorageConfig::create([
      'field_name' => $name,
      'entity_type' => $entity_type,
      'type' => $type,
      'cardinality' => $o['cardinality'] ?? 1,
      'settings' => $o['storage'] ?? [],
    ]);
    $storage->save();
  }
  if (!FieldConfig::loadByName($entity_type, $bundle, $name)) {
    FieldConfig::create([
      'field_storage' => $storage,
      'bundle' => $bundle,
      'label' => $label,
      'description' => $o['description'] ?? '',
      'required' => $o['required'] ?? FALSE,
      'settings' => $o['settings'] ?? [],
    ])->save();
  }
  $widgets = [
    'string' => 'string_textfield', 'string_long' => 'string_textarea', 'text_long' => 'text_textarea', 'text_with_summary' => 'text_textarea_with_summary',
    'image' => 'image_image', 'link' => 'link_default', 'boolean' => 'boolean_checkbox',
    'list_string' => 'options_select', 'entity_reference_revisions' => 'paragraphs',
    'entity_reference' => 'options_select', 'telephone' => 'telephone_default', 'email' => 'email_default',
  ];
  $formatters = [
    'string' => 'string', 'string_long' => 'basic_string', 'text_long' => 'text_default', 'text_with_summary' => 'text_default',
    'image' => 'image', 'link' => 'link', 'boolean' => 'boolean', 'list_string' => 'list_default',
    'entity_reference_revisions' => 'entity_reference_revisions_entity_view',
    'entity_reference' => 'entity_reference_label', 'telephone' => 'telephone_link', 'email' => 'email_mailto',
  ];
  $weight = $o['weight'] ?? 10;
  $repo->getFormDisplay($entity_type, $bundle)->setComponent($name, ['type' => $widgets[$type], 'weight' => $weight])->save();
  $repo->getViewDisplay($entity_type, $bundle)->setComponent($name, ['type' => $formatters[$type], 'label' => 'hidden', 'weight' => $weight])->save();
};

$list = static fn (array $values): array => ['allowed_values' => $values];
// Adds options to an existing list field (new options only, existing data is kept).
$add_options = static function (string $entity_type, string $name, array $values): void {
  $storage = FieldStorageConfig::loadByName($entity_type, $name);
  $allowed = $storage->getSetting('allowed_values') + $values;
  if ($allowed !== $storage->getSetting('allowed_values')) {
    $storage->setSetting('allowed_values', $allowed)->save();
  }
};
$paragraph_ref = static fn (array $bundles): array => [
  'handler' => 'default:paragraph',
  'handler_settings' => ['target_bundles' => array_combine($bundles, $bundles), 'negate' => 0],
];

echo "2. Paragraph types\n";
$paragraph_types = [
  'hero' => 'Hero',
  'feature_list' => 'Feature list',
  'feature_item' => 'Feature item',
  'media_text' => 'Media and text',
  'listing' => 'Listing (programs, schools, FAQ, form...)',
  'steps' => 'Steps',
  'step_item' => 'Step',
  'timeline' => 'Timeline',
  'timeline_item' => 'Timeline item',
  'gallery' => 'Gallery',
  'quote' => 'Featured testimonial',
];
foreach ($paragraph_types as $id => $label) {
  if (!ParagraphsType::load($id)) {
    ParagraphsType::create(['id' => $id, 'label' => $label])->save();
  }
}
$icon_options = array_combine($icons, $icons);
$heading = static function (string $bundle) use ($field, $list): void {
  $field('paragraph', $bundle, 'field_eyebrow', 'string', 'Eyebrow', ['weight' => 0]);
  $field('paragraph', $bundle, 'field_title', 'string', 'Title', ['weight' => 1]);
  $field('paragraph', $bundle, 'field_text', 'string_long', 'Intro text', ['weight' => 2]);
  $field('paragraph', $bundle, 'field_center', 'boolean', 'Center the heading', ['weight' => 3]);
  $field('paragraph', $bundle, 'field_background', 'list_string', 'Background', ['weight' => 4, 'storage' => $list(['default' => 'Default', 'alt' => 'Alternate (tinted)'])]);
};
$field('paragraph', 'hero', 'field_eyebrow', 'string', 'Eyebrow', ['weight' => 0]);
$field('paragraph', 'hero', 'field_title', 'string', 'Title', ['weight' => 1, 'required' => TRUE]);
$field('paragraph', 'hero', 'field_text', 'string_long', 'Text', ['weight' => 2]);
$field('paragraph', 'hero', 'field_image', 'image', 'Image', ['weight' => 3, 'settings' => ['file_directory' => 'ema']]);
$field('paragraph', 'hero', 'field_links', 'link', 'Buttons', ['weight' => 4, 'cardinality' => 2, 'settings' => ['title' => 2, 'link_type' => 17]]);

$heading('feature_list');
$field('paragraph', 'feature_list', 'field_style', 'list_string', 'Style', ['weight' => 5, 'storage' => $list(['default' => 'Default', 'compact' => 'Compact', 'highlights' => 'Highlights (below the hero)'])]);
$field('paragraph', 'feature_list', 'field_items', 'entity_reference_revisions', 'Items', ['weight' => 6, 'cardinality' => -1, 'storage' => ['target_type' => 'paragraph'], 'settings' => $paragraph_ref(['feature_item'])]);
$field('paragraph', 'feature_item', 'field_icon', 'list_string', 'Icon', ['weight' => 0, 'storage' => $list($icon_options)]);
$field('paragraph', 'feature_item', 'field_title', 'string', 'Title', ['weight' => 1]);
$field('paragraph', 'feature_item', 'field_text', 'string_long', 'Text', ['weight' => 2]);

$field('paragraph', 'media_text', 'field_eyebrow', 'string', 'Eyebrow', ['weight' => 0]);
$field('paragraph', 'media_text', 'field_title', 'string', 'Title', ['weight' => 1]);
$field('paragraph', 'media_text', 'field_body', 'text_long', 'Text', ['weight' => 2]);
$field('paragraph', 'media_text', 'field_list_items', 'string', 'Check list', ['weight' => 3, 'cardinality' => -1]);
$field('paragraph', 'media_text', 'field_image', 'image', 'Image', ['weight' => 4, 'settings' => ['file_directory' => 'ema']]);
$field('paragraph', 'media_text', 'field_links', 'link', 'Buttons', ['weight' => 5, 'settings' => ['title' => 2, 'link_type' => 17]]);
$field('paragraph', 'media_text', 'field_reverse', 'boolean', 'Image on the right', ['weight' => 6]);
$field('paragraph', 'media_text', 'field_background', 'list_string', 'Background', ['weight' => 7]);

$heading('listing');
$field('paragraph', 'listing', 'field_listing', 'list_string', 'Show', ['weight' => 5, 'required' => TRUE, 'storage' => $list([
  'programs' => 'Programs (cards)',
  'locations' => 'Schools (location cards)',
  'testimonials' => 'Testimonials',
  'staff' => 'Staff',
  'faq_general' => 'FAQ: general',
  'faq_enrollment' => 'FAQ: enrollment',
  'faq_infant' => 'FAQ: infant care',
  'contact' => 'Contact form + school details',
  'map' => 'Maps of both schools (Google Maps)',
])]);
$add_options('paragraph', 'field_listing', [
  'faq_toddler' => 'FAQ: toddler program',
  'faq_preschool' => 'FAQ: preschool',
  'faq_prek' => 'FAQ: Pre-K & Kindergarten',
  'faq_summer' => 'FAQ: Summer Bridge',
  'faq_other' => 'FAQ: Gifted, Talented & STEM',
  'news_latest' => 'News: latest 3 posts',
  'news' => 'News: all posts with category filter',
]);
$field('paragraph', 'listing', 'field_links', 'link', 'Button below', ['weight' => 6, 'settings' => ['title' => 2, 'link_type' => 17]]);

$heading('steps');
$field('paragraph', 'steps', 'field_items', 'entity_reference_revisions', 'Steps', ['weight' => 5, 'settings' => $paragraph_ref(['step_item'])]);
$field('paragraph', 'step_item', 'field_title', 'string', 'Title', ['weight' => 0]);
$field('paragraph', 'step_item', 'field_text', 'string_long', 'Text', ['weight' => 1]);
$field('paragraph', 'step_item', 'field_links', 'link', 'Button', ['weight' => 2, 'settings' => ['title' => 2, 'link_type' => 17]]);

$heading('timeline');
$field('paragraph', 'timeline', 'field_items', 'entity_reference_revisions', 'Items', ['weight' => 5, 'settings' => $paragraph_ref(['timeline_item'])]);
$field('paragraph', 'timeline_item', 'field_year', 'string', 'Year', ['weight' => 0]);
$field('paragraph', 'timeline_item', 'field_title', 'string', 'Title', ['weight' => 1]);
$field('paragraph', 'timeline_item', 'field_text', 'string_long', 'Text', ['weight' => 2]);

$heading('gallery');
$field('paragraph', 'gallery', 'field_gallery', 'image', 'Photos', ['weight' => 5, 'cardinality' => -1, 'settings' => ['file_directory' => 'ema', 'title_field' => TRUE]]);
$field('paragraph', 'gallery', 'field_links', 'link', 'Button below', ['weight' => 6, 'settings' => ['title' => 2, 'link_type' => 17]]);

$field('paragraph', 'quote', 'field_testimonial', 'entity_reference', 'Testimonial', ['weight' => 0, 'storage' => ['target_type' => 'node'], 'settings' => ['handler' => 'default:node', 'handler_settings' => ['target_bundles' => ['testimonial' => 'testimonial']]]]);
$field('paragraph', 'quote', 'field_background', 'list_string', 'Background', ['weight' => 1]);

echo "3. Content types\n";
$types = [
  'page' => ['Basic page', 'Pages built from sections (paragraphs): Home, About, Programs, Enrollment, Gallery, FAQ, Contact.'],
  'program' => ['Program', 'A program (Infant Childcare, Toddler, ...). Shown as cards and as a detail page with a sidebar.'],
  'location' => ['School location', 'One of the two schools.'],
  'staff' => ['Staff member', 'Leaders and teachers shown on the About page.'],
  'testimonial' => ['Testimonial', 'A short parent quote.'],
  'faq' => ['FAQ', 'A question (title) and answer (body).'],
  'news' => ['News post', 'News, events and parent tips. Shown on the News page, the home page and in the "Recent news" sidebar.'],
];
foreach ($types as $id => [$label, $description]) {
  if (!NodeType::load($id)) {
    NodeType::create(['type' => $id, 'name' => $label, 'description' => $description])->save();
  }
}
// Drupal 11.3+ no longer ships node_add_body_field(): add "body" directly.
$field('node', 'program', 'body', 'text_with_summary', 'Body', ['weight' => 6]);
$field('node', 'faq', 'body', 'text_with_summary', 'Answer', ['weight' => 2]);

$all_sections = array_keys(array_filter($paragraph_types, fn ($k) => !str_ends_with($k, '_item'), ARRAY_FILTER_USE_KEY));
foreach (['page', 'program'] as $bundle) {
  $field('node', $bundle, 'field_lead', 'string_long', 'Lead text (under the page title)', ['weight' => 1]);
  $field('node', $bundle, 'field_sections', 'entity_reference_revisions', 'Sections', ['weight' => 20, 'cardinality' => -1, 'storage' => ['target_type' => 'paragraph'], 'settings' => $paragraph_ref($all_sections)]);
  $field('node', $bundle, 'field_cta_title', 'string', 'Call-to-action title (optional)', ['weight' => 30]);
  $field('node', $bundle, 'field_cta_text', 'string_long', 'Call-to-action text (optional)', ['weight' => 31]);
}
$field('node', 'program', 'field_age_range', 'string', 'Age range', ['weight' => 2]);
$field('node', 'program', 'field_icon', 'list_string', 'Icon', ['weight' => 3, 'storage' => $list($icon_options)]);
$field('node', 'program', 'field_summary', 'string_long', 'Card summary', ['weight' => 4]);
$field('node', 'program', 'field_image', 'image', 'Image', ['weight' => 5, 'settings' => ['file_directory' => 'ema']]);

$field('node', 'location', 'field_short', 'string', 'Short name (city)', ['weight' => 1]);
$field('node', 'location', 'field_street', 'string', 'Street', ['weight' => 2]);
$field('node', 'location', 'field_city', 'string', 'City, state, ZIP', ['weight' => 3]);
$field('node', 'location', 'field_phone', 'telephone', 'Phone', ['weight' => 4]);
$field('node', 'location', 'field_email', 'email', 'Email', ['weight' => 5]);
$field('node', 'location', 'field_map_url', 'link', 'Google Maps link', ['weight' => 6, 'settings' => ['title' => 0, 'link_type' => 16]]);
$field('node', 'location', 'field_enrolling', 'string', '"Now enrolling" note', ['weight' => 7]);
$field('node', 'location', 'field_note', 'string', 'Highlight', ['weight' => 8]);
$field('node', 'location', 'field_serves', 'string_long', 'Areas served', ['weight' => 9]);
$field('node', 'location', 'field_image', 'image', 'Building photo', ['weight' => 10, 'settings' => ['file_directory' => 'ema']]);

$field('node', 'staff', 'field_role', 'string', 'Role', ['weight' => 1]);
$field('node', 'staff', 'field_bio', 'string_long', 'Short bio', ['weight' => 2]);
$field('node', 'staff', 'field_image', 'image', 'Photo', ['weight' => 3, 'settings' => ['file_directory' => 'ema']]);

$field('node', 'testimonial', 'field_quote', 'string_long', 'Quote', ['weight' => 1, 'required' => TRUE]);
$field('node', 'testimonial', 'field_role', 'string', 'Parent of / school', ['weight' => 2]);

$field('node', 'faq', 'field_faq_category', 'list_string', 'Category', ['weight' => 1, 'required' => TRUE, 'storage' => $list(['general' => 'General', 'enrollment' => 'Enrollment and tuition', 'infant' => 'Infant care'])]);
$add_options('node', 'field_faq_category', ['toddler' => 'Toddler program', 'preschool' => 'Preschool', 'prek' => 'Pre-K & Kindergarten', 'summer' => 'Summer Bridge', 'other' => 'Gifted, Talented & STEM']);

// News: category vocabulary + fields.
if (!Vocabulary::load('news_category')) {
  Vocabulary::create(['vid' => 'news_category', 'name' => 'News category', 'description' => 'Categories for news posts (filter buttons on the News page).'])->save();
}
$news_terms = [];
foreach ($data['news']['categories'] as $weight => $category) {
  $term = current(\Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties(['vid' => 'news_category', 'name' => $category['label']]));
  if (!$term) {
    $term = Term::create(['vid' => 'news_category', 'name' => $category['label'], 'weight' => $weight]);
    $term->save();
  }
  $news_terms[$category['key']] = $term;
}
$field('node', 'news', 'field_lead', 'string_long', 'Summary (shown on cards and under the title)', ['weight' => 1, 'required' => TRUE]);
$field('node', 'news', 'field_news_category', 'entity_reference', 'Category', ['weight' => 2, 'storage' => ['target_type' => 'taxonomy_term'], 'settings' => ['handler' => 'default:taxonomy_term', 'handler_settings' => ['target_bundles' => ['news_category' => 'news_category']]]]);
$field('node', 'news', 'field_school', 'list_string', 'School', ['weight' => 3, 'storage' => $list(['both' => 'Both schools', 'emas' => 'Eagan Montessori Academy South', 'ab' => 'Amazing Beginnings Montessori'])]);
$field('node', 'news', 'field_image', 'image', 'Photo', ['weight' => 4, 'settings' => ['file_directory' => 'ema', 'alt_field_required' => TRUE]]);
$field('node', 'news', 'body', 'text_with_summary', 'Text', ['weight' => 5]);

echo "4. Contact form\n";
if (!ContactForm::load('tour')) {
  ContactForm::create([
    'id' => 'tour',
    'label' => 'Contact us & tour',
    'recipients' => [\Drupal::config('system.site')->get('mail') ?: 'admin@example.com'],
    'message' => 'Thank you! We will contact you soon to confirm.',
    'redirect' => '/contact-us',
    'weight' => 0,
  ])->save();
}
$field('contact_message', 'tour', 'field_phone', 'telephone', 'Phone', ['weight' => 3]);
$field('contact_message', 'tour', 'field_school', 'list_string', 'School', ['weight' => 4, 'required' => TRUE, 'storage' => $list([
  'Eagan Montessori Academy South (Eagan)' => 'Eagan Montessori Academy South (Eagan)',
  'Amazing Beginnings Montessori (Inver Grove Heights)' => 'Amazing Beginnings Montessori (Inver Grove Heights)',
])]);
$field('contact_message', 'tour', 'field_request_type', 'list_string', 'Tour or question?', ['weight' => 5, 'storage' => $list(['tour' => 'Tour request', 'question' => 'Question'])]);
$field('contact_message', 'tour', 'field_program', 'list_string', 'Program of interest', ['weight' => 6, 'storage' => $list(array_combine(
  array_map(fn ($p) => $plain($p['title']), $data['programs']),
  array_map(fn ($p) => $plain($p['title']), $data['programs']),
) + ['Not sure yet' => 'Not sure yet'])]);
$form_display = $repo->getFormDisplay('contact_message', 'tour');
$form_display->setComponent('name', ['weight' => 0])->setComponent('mail', ['weight' => 1])
  ->setComponent('message', ['type' => 'string_textarea', 'weight' => 10])->removeComponent('subject')->save();
foreach ([Role::ANONYMOUS_ID, Role::AUTHENTICATED_ID] as $rid) {
  user_role_grant_permissions($rid, ['access site-wide contact form']);
}

echo "5. Languages (English, Spanish, Somali)\n";
foreach (['es', 'so'] as $langcode) {
  if (!\Drupal\language\Entity\ConfigurableLanguage::load($langcode)) {
    \Drupal\language\Entity\ConfigurableLanguage::createFromLangcode($langcode)->save();
  }
}
\Drupal::configFactory()->getEditable('language.types')
  ->set('negotiation.language_interface.enabled', ['language-url' => -8, 'language-selected' => 12])
  ->set('negotiation.language_interface.method_weights', ['language-url' => -8, 'language-selected' => 12])
  ->save();

echo "6. Photos\n";
$file_system = \Drupal::service('file_system');
$dir = 'public://ema';
$file_system->prepareDirectory($dir, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY);
$fids = [];
foreach (glob(DRUPAL_ROOT . '/' . $module_path . '/assets/photos/*.jpg') as $source) {
  $name = basename($source, '.jpg');
  $uri = "$dir/" . basename($source);
  $existing = \Drupal::entityTypeManager()->getStorage('file')->loadByProperties(['uri' => $uri]);
  if ($existing) {
    $fids[$name] = reset($existing)->id();
    continue;
  }
  $file_system->copy($source, $uri, FileExists::Replace);
  $file = File::create(['uri' => $uri, 'status' => 1]);
  $file->save();
  $fids[$name] = $file->id();
}
$image = static fn (string $name, string $alt, string $title = '') => isset($fids[$name]) ? ['target_id' => $fids[$name], 'alt' => $alt, 'title' => $title] : NULL;

echo "7. Content\n";
$find = static fn (string $type, string $title) => current(\Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['type' => $type, 'title' => $title])) ?: NULL;
$create = static function (string $type, array $values) use ($find) {
  if ($node = $find($type, $values['title'])) {
    return $node;
  }
  $node = Node::create(['type' => $type, 'status' => 1, 'uid' => 1] + $values);
  $node->save();
  return $node;
};
$p = static fn (string $type, array $values) => Paragraph::create(['type' => $type] + $values);
$link = static fn (string $uri, string $title) => ['uri' => str_starts_with($uri, 'http') ? $uri : 'internal:' . $uri, 'title' => $title];
$features = static fn (array $items) => array_map(fn ($f) => $p('feature_item', [
  'field_icon' => $f['icon'],
  'field_title' => $plain($f['title']),
  'field_text' => $plain($f['text']),
]), $items);

// Locations.
foreach ($data['locations'] as $l) {
  $create('location', [
    'title' => $l['name'],
    'field_short' => $l['short'],
    'field_street' => $l['street'],
    'field_city' => $l['city'],
    'field_phone' => $l['phone'],
    'field_email' => $l['email'],
    'field_map_url' => ['uri' => $plain($l['mapsHref'])],
    'field_enrolling' => $plain($l['enrolling']),
    'field_note' => $plain($l['note']),
    'field_serves' => $plain($l['serves']),
    'path' => ['alias' => '/schools/' . ($l['key'] === 'ab' ? 'amazing-beginnings-montessori' : 'eagan-montessori-academy-south'), 'langcode' => 'und'],
  ]);
}

// Programs: every program has a detail page (lead, text, highlights, FAQ, call to action).
$program_images = ['infant' => ['infant-detail', 'A baby sleeping peacefully on a soft blanket']];
$programs = [];
foreach ($data['programs'] as $item) {
  $key = $item['key'];
  $detail = $data['programDetails'][$key];
  $title = $plain($item['title']);
  [$img, $alt] = $program_images[$key] ?? ['program-' . $key, $title . ' photo'];
  foreach ($detail['faq'] as $f) {
    $create('faq', ['title' => $plain($f['q']), 'body' => ['value' => '<p>' . $f['a'] . '</p>', 'format' => 'basic_html'], 'field_faq_category' => $key]);
  }
  $slug = ['infant' => 'infant-childcare', 'toddler' => 'toddler-program', 'preschool' => 'preschool-montessori', 'prek' => 'pre-k-kindergarten', 'summer' => 'summer-bridge', 'other' => 'gifted-talented-stem'][$key];
  $program = $create('program', [
    'title' => $title,
    'field_age_range' => $plain($item['age']),
    'field_icon' => $item['icon'],
    'field_summary' => $plain($item['text']),
    'field_image' => $image($img, $alt),
    'path' => ['alias' => '/programs/' . $slug, 'langcode' => 'und'],
  ]);
  // Sync the detail page content with the approved design (replaces old sections).
  foreach ($program->get('field_sections')->referencedEntities() as $old) {
    $old->delete();
  }
  $program->set('field_lead', $plain($detail['lead']));
  $program->set('body', ['value' => preg_replace('/>\s+</', '><', trim($detail['body'])), 'format' => 'basic_html']);
  $program->set('field_sections', [
    $p('feature_list', ['field_title' => $plain($detail['featuresTitle']), 'field_style' => 'compact', 'field_items' => $features($detail['features'])]),
    $p('listing', ['field_title' => $plain($detail['faqTitle']), 'field_listing' => 'faq_' . $key]),
  ]);
  $program->set('field_cta_title', $plain($detail['cta'][0]));
  $program->set('field_cta_text', $plain($detail['cta'][1]));
  $program->save();
  $programs[$key] = $program;
}

foreach ($data['staff'] as $s) {
  $create('staff', ['title' => $plain($s['name']), 'field_role' => $plain($s['role']), 'field_bio' => $plain($s['bio'])]);
}
$testimonials = [];
foreach ($data['testimonials'] as $t) {
  $testimonials[] = $create('testimonial', ['title' => $t['name'], 'field_quote' => $plain($t['quote']), 'field_role' => $plain($t['role'])]);
}
foreach (['faqGeneral' => 'general', 'faqEnrollment' => 'enrollment', 'faqInfant' => 'infant'] as $key => $category) {
  foreach ($data[$key] as $f) {
    $create('faq', ['title' => $plain($f['q']), 'body' => ['value' => '<p>' . $f['a'] . '</p>', 'format' => 'basic_html'], 'field_faq_category' => $category]);
  }
}

// News posts (sample posts: the school replaces them with real news).
foreach ($data['news']['posts'] as $post) {
  $create('news', [
    'title' => $plain($post['title']),
    'created' => strtotime($post['date'] . ' 09:00:00 America/Chicago'),
    'field_lead' => $plain($post['summary']),
    'field_news_category' => ['target_id' => $news_terms[$post['category']]->id()],
    'field_school' => ['Both schools' => 'both', 'Eagan Montessori Academy South' => 'emas', 'Amazing Beginnings Montessori' => 'ab'][$post['school']] ?? 'both',
    'field_image' => $image(preg_replace('/\.svg$/', '', $post['image']['file']), $plain($post['image']['alt'])),
    'body' => ['value' => preg_replace('/>\s+</', '><', trim($post['body'])), 'format' => 'basic_html'],
    'path' => ['alias' => '/news/' . $post['slug'], 'langcode' => 'und'],
  ]);
}

// Pages built from paragraph sections.
$gallery = static fn (int $count) => array_map(fn ($i) => $image('gallery-' . ($i + 1), $plain($data['gallery'][$i]['alt']), $plain($data['gallery'][$i]['caption'])), range(0, $count - 1));
$pages = [
  'home' => [
    'title' => 'Home',
    'alias' => '/home',
    'sections' => [
      $p('hero', [
        'field_eyebrow' => 'Eagan & Inver Grove Heights · Ages 6 weeks – 8 years',
        'field_title' => 'An affordable investment in your child’s future',
        'field_text' => 'Montessori education and child care at two South Metro schools. NAEYC accredited, with a Parent Aware 4-star rating.',
        'field_image' => $image('hero-home', 'A teacher helping a young boy with an activity at a table'),
        'field_links' => [$link('/enrollment', 'Apply Now'), $link('/contact-us', 'Schedule a tour')],
      ]),
      $p('feature_list', ['field_title' => 'Why families choose us', 'field_style' => 'highlights', 'field_items' => $features($data['highlights'])]),
      $p('media_text', [
        'field_eyebrow' => 'Our approach',
        'field_title' => 'Montessori and Creative Curriculum, together',
        'field_body' => ['value' => '<p>Children learn at their own pace with hands-on Montessori materials, the Creative Curriculum and ideas from our talented teachers. We support social skills, emotional growth, coordination and early academics.</p>', 'format' => 'basic_html'],
        'field_list_items' => ['NAEYC accredited', 'Parent Aware 4-star rating', 'Readers’ Choice Award, 2017–2024'],
        'field_image' => $image('feature-classroom', 'A girl drawing at a table in a bright, calm room'),
        'field_links' => [$link('/about-us', 'About us')],
      ]),
      $p('listing', ['field_eyebrow' => 'Programs', 'field_title' => 'From 6 weeks to 8 years', 'field_text' => 'Infant and toddler care, preschool, Pre-K, private Kindergarten and more.', 'field_center' => TRUE, 'field_background' => 'alt', 'field_listing' => 'programs', 'field_links' => [$link('/programs', 'View all programs')]]),
      $p('listing', ['field_eyebrow' => 'Our schools', 'field_title' => 'Two schools in the South Metro', 'field_text' => 'Both schools offer the same programs and the same Montessori approach.', 'field_center' => TRUE, 'field_listing' => 'locations']),
      $p('listing', ['field_eyebrow' => 'Families', 'field_title' => 'What parents say', 'field_center' => TRUE, 'field_background' => 'alt', 'field_listing' => 'testimonials']),
      $p('gallery', ['field_eyebrow' => 'Gallery', 'field_title' => 'A peek inside our schools', 'field_center' => TRUE, 'field_gallery' => $gallery(6), 'field_links' => [$link('/gallery', 'See the full gallery')]]),
      $p('listing', ['field_eyebrow' => 'News', 'field_title' => 'Latest from our schools', 'field_center' => TRUE, 'field_background' => 'alt', 'field_listing' => 'news_latest', 'field_links' => [$link('/news', 'All news')]]),
    ],
  ],
  'programs' => [
    'title' => 'Our programs',
    'alias' => '/programs',
    'lead' => 'Montessori education and child care for children from 6 weeks to 8 years.',
    'cta' => ['Not sure which program fits?', 'Tour a classroom and talk with our teachers. We are happy to help.'],
    'sections' => [
      $p('listing', ['field_eyebrow' => 'At both schools', 'field_title' => 'Find the right program', 'field_text' => 'Is it daycare, child care or Montessori? All of these, and more.', 'field_listing' => 'programs']),
      $p('feature_list', ['field_eyebrow' => 'In every classroom', 'field_title' => 'Every program includes', 'field_center' => TRUE, 'field_background' => 'alt', 'field_items' => $features($data['programIncludes'])]),
    ],
  ],
  'enrollment' => [
    'title' => 'Enrollment',
    'alias' => '/enrollment',
    'lead' => 'Fall 2026 registration is now open. Here is how to join us.',
    'cta' => ['Ready to take a tour?', 'Choose a school and we will find a time that works for you.'],
    'sections' => [
      $p('steps', ['field_eyebrow' => '4 simple steps', 'field_title' => 'How to enroll', 'field_center' => TRUE, 'field_items' => array_map(fn ($s) => $p('step_item', [
        'field_title' => $plain($s['title']),
        'field_text' => $plain($s['text']),
        'field_links' => !empty($s['action']) ? [$link($s['action']['href'] === 'contact.html' ? '/contact-us' : '/contact-us', $s['action']['href'] === 'contact.html' ? $s['action']['label'] : 'Call or message us')] : [],
      ]), $data['steps'])]),
      $p('media_text', [
        'field_eyebrow' => 'Tuition',
        'field_title' => 'An affordable investment',
        'field_body' => ['value' => '<p>Tuition depends on your child’s age group and schedule. Contact us for current rates and payment options.</p>', 'format' => 'basic_html'],
        'field_list_items' => ['Full-time and part-time options', 'Enrollment priority for siblings', 'Eagan: now enrolling Infants & Toddlers', 'Inver Grove Heights: now enrolling Toddlers & Preschool'],
        'field_image' => $image('feature-tour', 'A family playing together on the floor'),
        'field_links' => [$link('/contact-us', 'Ask about tuition')],
        'field_reverse' => TRUE,
        'field_background' => 'alt',
      ]),
      $p('listing', ['field_eyebrow' => 'Questions', 'field_title' => 'Enrollment questions', 'field_center' => TRUE, 'field_listing' => 'faq_enrollment']),
    ],
  ],
  'about' => [
    'title' => 'About us',
    'alias' => '/about-us',
    'lead' => 'Two Montessori schools where parents, teachers and children learn together.',
    'sections' => [
      $p('media_text', [
        'field_eyebrow' => 'Our story',
        'field_title' => 'A learning community for every family',
        'field_body' => ['value' => '<p>We opened Amazing Beginnings Montessori in Inver Grove Heights in 2006 and Eagan Montessori Academy South in 2016. Our families come from many cultures and backgrounds, so children learn to work in diverse settings.</p><p>We believe children learn at their own pace, so we offer many ways to learn.</p>', 'format' => 'basic_html'],
        'field_image' => $image('feature-building', 'A playground with slides, surrounded by tall trees'),
      ]),
      $p('timeline', ['field_eyebrow' => 'Since 2006', 'field_title' => 'Our history', 'field_background' => 'alt', 'field_items' => array_map(fn ($t) => $p('timeline_item', ['field_year' => $t['year'], 'field_title' => $plain($t['title']), 'field_text' => $plain($t['text'])]), $data['timeline'])]),
      $p('feature_list', ['field_eyebrow' => 'Included', 'field_title' => 'Special classes at no extra cost', 'field_text' => 'Plus guest speakers who talk about what they do.', 'field_center' => TRUE, 'field_items' => $features($data['extras'])]),
      $p('listing', ['field_eyebrow' => 'Our team', 'field_title' => 'Meet our leaders', 'field_text' => 'Teachers trained in First Aid, CPR, SUIDS and Shaken Baby prevention.', 'field_center' => TRUE, 'field_background' => 'alt', 'field_listing' => 'staff']),
      $p('quote', ['field_testimonial' => $testimonials[1] ?? NULL]),
    ],
  ],
  'gallery' => [
    'title' => 'Gallery',
    'alias' => '/gallery',
    'lead' => 'A look at daily life in our classrooms and outdoor spaces.',
    'cta' => ['See it in person', 'Photos are nice, but a visit is better. Schedule a tour today.'],
    'sections' => [$p('gallery', ['field_gallery' => $gallery(12)])],
  ],
  'faq' => [
    'title' => 'Frequently asked questions',
    'alias' => '/faq',
    'lead' => 'Quick answers about our schools, programs and enrollment.',
    'cta' => ['Still have questions?', 'Call either school or send us a message. We are happy to help.'],
    'sections' => [
      $p('listing', ['field_eyebrow' => 'About our schools', 'field_title' => 'General questions', 'field_listing' => 'faq_general']),
      $p('listing', ['field_eyebrow' => 'Joining us', 'field_title' => 'Enrollment and tuition', 'field_background' => 'alt', 'field_listing' => 'faq_enrollment']),
    ],
  ],
  'news' => [
    'title' => 'News',
    'alias' => '/news',
    'lead' => 'Events, classroom stories and tips for parents from both schools.',
    'cta' => ['See it for yourself', 'Visit a classroom and meet our teachers. Schedule a tour today.'],
    'sections' => [
      $p('listing', ['field_listing' => 'news']),
    ],
  ],
  'contact' => [
    'title' => 'Contact us & tour',
    'alias' => '/contact-us',
    'lead' => 'Questions? Ready to visit? Choose a school and we will get right back to you.',
    'cta' => ['Ready to apply?', 'Tour first, then we will guide you through enrollment.'],
    'sections' => [
      $p('listing', ['field_listing' => 'contact']),
      $p('listing', ['field_listing' => 'map']),
      $p('listing', ['field_eyebrow' => 'Areas we serve', 'field_title' => 'Close to home', 'field_text' => 'Convenient to Eagan, Inver Grove Heights, Apple Valley, Burnsville, Rosemount, South St. Paul and West St. Paul.', 'field_center' => TRUE, 'field_background' => 'alt', 'field_listing' => 'locations']),
    ],
  ],
];
$page_nodes = [];
foreach ($pages as $key => $page) {
  $page_nodes[$key] = $create('page', [
    'title' => $page['title'],
    'field_lead' => $page['lead'] ?? NULL,
    'field_sections' => $page['sections'],
    'field_cta_title' => $page['cta'][0] ?? NULL,
    'field_cta_text' => $page['cta'][1] ?? NULL,
    'path' => ['alias' => $page['alias'], 'langcode' => 'und'],
  ]);
}
// Sites built before the News section: add "Latest from our schools" to the home page.
$home = $page_nodes['home'];
$has_news = FALSE;
foreach ($home->get('field_sections')->referencedEntities() as $section) {
  $has_news = $has_news || ($section->bundle() === 'listing' && $section->get('field_listing')->value === 'news_latest');
}
if (!$has_news) {
  $home->get('field_sections')->appendItem(end($pages['home']['sections']));
  $home->save();
}

echo "8. Site settings and main menu\n";
\Drupal::configFactory()->getEditable('system.site')
  ->set('name', 'Eagan Montessori Academy')
  ->set('slogan', '& Amazing Beginnings Montessori')
  ->set('page.front', '/node/' . $page_nodes['home']->id())
  ->save();

// No "Home" item: the logo links home (keeps the menu on one line).
$menu_manager = \Drupal::service('plugin.manager.menu.link');
if ($menu_manager->hasDefinition('standard.front_page')) {
  $menu_manager->updateDefinition('standard.front_page', ['enabled' => FALSE]);
}
$menu = [
  ['About Us', 'about', 0],
  ['Programs', 'programs', 1],
  ['Enrollment', 'enrollment', 2],
  ['Gallery', 'gallery', 3],
  ['FAQ', 'faq', 4],
  ['News', 'news', 5],
  ['Contact & Tour', 'contact', 6],
];
$menu_storage = \Drupal::entityTypeManager()->getStorage('menu_link_content');
$parents = [];
foreach ($menu as [$title, $key, $weight]) {
  $existing = $menu_storage->loadByProperties(['menu_name' => 'main', 'title' => $title]);
  $link_entity = $existing ? reset($existing) : MenuLinkContent::create([
    'title' => $title,
    'link' => ['uri' => 'entity:node/' . $page_nodes[$key]->id()],
    'menu_name' => 'main',
    'weight' => $weight,
    'expanded' => $key === 'programs',
  ]);
  $link_entity->set('weight', $weight)->save();
  $parents[$key] = $link_entity;
}
$weight = 0;
foreach ($programs as $program) {
  if (!$menu_storage->loadByProperties(['menu_name' => 'main', 'title' => $program->label()])) {
    MenuLinkContent::create([
      'title' => $program->label(),
      'link' => ['uri' => 'entity:node/' . $program->id()],
      'menu_name' => 'main',
      'parent' => 'menu_link_content:' . $parents['programs']->uuid(),
      'weight' => $weight++,
    ])->save();
  }
}

echo "9. Blocks\n";
foreach (['ema_warm'] as $theme) {
  // Start clean: remove blocks copied from the previous default theme.
  foreach (\Drupal::entityTypeManager()->getStorage('block')->loadByProperties(['theme' => $theme]) as $block) {
    $block->delete();
  }
  $bundles = static fn (array $bundles) => ['entity_bundle:node' => ['id' => 'entity_bundle:node', 'negate' => FALSE, 'context_mapping' => ['node' => '@node.node_route_context:node'], 'bundles' => array_combine($bundles, $bundles)]];
  $blocks = [
    ['branding', 'system_branding_block', 'header', 0, ['use_site_logo' => FALSE, 'use_site_name' => TRUE, 'use_site_slogan' => TRUE], []],
    ['main_menu', 'system_menu_block:main', 'primary_menu', 0, ['level' => 1, 'depth' => 2, 'expand_all_items' => TRUE], []],
    ['page_title', 'page_title_block', 'hero', 0, [], ['request_path' => ['id' => 'request_path', 'negate' => TRUE, 'pages' => '<front>']]],
    ['messages', 'system_messages_block', 'highlighted', 0, [], []],
    ['tabs', 'local_tasks_block', 'highlighted', 1, ['primary' => TRUE, 'secondary' => TRUE], []],
    ['content', 'system_main_block', 'content', 0, [], []],
    ['program_nav', 'ema_program_nav', 'sidebar', 0, [], $bundles(['program'])],
    ['news_nav', 'ema_news_nav', 'sidebar', 0, [], $bundles(['news'])],
    ['contact_info', 'ema_contact_info', 'sidebar', 1, [], $bundles(['program', 'news'])],
    ['cta', 'ema_cta_banner', 'footer_top', 0, [], []],
  ];
  foreach ($blocks as [$id, $plugin, $region, $weight, $settings, $visibility]) {
    Block::create([
      'id' => $theme . '_' . $id,
      'theme' => $theme,
      'plugin' => $plugin,
      'region' => $region,
      'weight' => $weight,
      'settings' => ['label_display' => '0'] + $settings,
      'visibility' => $visibility,
    ])->save();
  }
}

// Aliases work in every language (/es/about-us, /so/about-us).
\Drupal::database()->update('path_alias')->fields(['langcode' => 'und'])->execute();
\Drupal::database()->update('path_alias_revision')->fields(['langcode' => 'und'])->execute();
\Drupal::service('path_alias.manager')->cacheClear();

echo "Done.\n";
