<?php

declare(strict_types=1);

namespace Drupal\ema_site\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\node\NodeInterface;

/**
 * Call-to-action banner for the footer_top region.
 *
 * Uses the current node's "CTA title/text" fields when filled in, otherwise
 * the defaults below. Renders the ema_base:cta-banner component.
 */
#[Block(
  id: 'ema_cta_banner',
  admin_label: new TranslatableMarkup('EMA: Call-to-action banner'),
  category: new TranslatableMarkup('EMA'),
)]
final class CtaBannerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $title = $this->t('Come see our classrooms');
    $text = $this->t('Visit our schools in Eagan and Inver Grove Heights. Schedule a tour or apply today.');
    $node = \Drupal::routeMatch()->getParameter('node');
    if ($node instanceof NodeInterface && $node->hasField('field_cta_title') && !$node->get('field_cta_title')->isEmpty()) {
      $title = $node->get('field_cta_title')->value;
      $text = $node->get('field_cta_text')->value ?? '';
    }
    return [
      '#type' => 'component',
      '#component' => 'ema_base:cta-banner',
      '#props' => [
        'title' => (string) $title,
        'text' => (string) $text,
        'apply_url' => (string) (theme_get_setting('apply_url') ?: '#'),
        'apply_label' => (string) (theme_get_setting('apply_label') ?: $this->t('Apply Now')),
        'tour_url' => (string) (theme_get_setting('tour_url') ?: '/contact-us'),
      ],
      '#cache' => ['contexts' => ['route', 'theme'], 'tags' => ['node_list']],
    ];
  }

}
