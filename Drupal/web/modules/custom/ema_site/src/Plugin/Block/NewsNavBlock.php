<?php

declare(strict_types=1);

namespace Drupal\ema_site\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\node\NodeInterface;

/**
 * The five newest news posts for the sidebar (ema_base:sidebar-nav).
 */
#[Block(
  id: 'ema_news_nav',
  admin_label: new TranslatableMarkup('EMA: Recent news'),
  category: new TranslatableMarkup('EMA'),
)]
final class NewsNavBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $current = \Drupal::routeMatch()->getParameter('node');
    $items = [];
    foreach (ema_site_news_nodes(5) as $node) {
      $card = ema_site_news_card($node);
      $items[] = [
        'title' => $card['title'],
        'url' => $card['url'],
        'active' => $current instanceof NodeInterface && $current->id() === $node->id(),
      ];
    }
    return [
      '#type' => 'component',
      '#component' => 'ema_base:sidebar-nav',
      '#props' => [
        'title' => (string) $this->t('Recent news'),
        'heading_id' => 'sidebar-news-title',
        'items' => $items,
      ],
      '#cache' => ['contexts' => ['route', 'languages:language_interface'], 'tags' => ['node_list']],
    ];
  }

}
