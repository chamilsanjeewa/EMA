<?php

declare(strict_types=1);

namespace Drupal\ema_site\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Hours and both schools, compact (ema_base:contact-info).
 */
#[Block(
  id: 'ema_contact_info',
  admin_label: new TranslatableMarkup('EMA: Visit us (hours + locations)'),
  category: new TranslatableMarkup('EMA'),
)]
final class ContactInfoBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#type' => 'component',
      '#component' => 'ema_base:contact-info',
      '#props' => [
        'compact' => TRUE,
        'title' => (string) $this->t('Visit us'),
        'heading_id' => 'sidebar-visit-title',
        'hours' => [(string) $this->t('Monday – Friday: 6:30am – 6:00pm'), (string) $this->t('Open 12 months a year')],
        'locations' => ema_site_locations(),
        'apply_url' => (string) (theme_get_setting('apply_url') ?: '#'),
        'apply_label' => (string) (theme_get_setting('apply_label') ?: $this->t('Apply Now')),
      ],
      '#cache' => ['contexts' => ['theme'], 'tags' => ['node_list']],
    ];
  }

}
