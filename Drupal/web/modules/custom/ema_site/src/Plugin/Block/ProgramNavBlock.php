<?php

declare(strict_types=1);

namespace Drupal\ema_site\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * List of programs for the sidebar (ema_base:sidebar-nav).
 */
#[Block(
  id: 'ema_program_nav',
  admin_label: new TranslatableMarkup('EMA: Program navigation'),
  category: new TranslatableMarkup('EMA'),
)]
final class ProgramNavBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#type' => 'component',
      '#component' => 'ema_base:sidebar-nav',
      '#props' => [
        'title' => (string) $this->t('Our programs'),
        'items' => array_map(fn ($p) => ['title' => $p['title'], 'url' => $p['url'], 'active' => $p['active']], ema_site_programs()),
      ],
      '#cache' => ['contexts' => ['route'], 'tags' => ['node_list']],
    ];
  }

}
