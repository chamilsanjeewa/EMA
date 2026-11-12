<?php

/**
 * @file
 * Theme settings form for EMA themes (shared by all option sub-themes).
 */

declare(strict_types=1);

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function ema_base_form_system_theme_settings_alter(array &$form, FormStateInterface $form_state): void {
  $form['ema'] = [
    '#type' => 'details',
    '#title' => t('EMA settings'),
    '#open' => TRUE,
  ];
  $form['ema']['apply_url'] = [
    '#type' => 'textfield',
    '#title' => t('"Apply Now" link'),
    '#description' => t('For example the Brightwheel enrollment link. Use # while it is not known.'),
    '#default_value' => theme_get_setting('apply_url'),
  ];
  $form['ema']['apply_label'] = [
    '#type' => 'textfield',
    '#title' => t('"Apply Now" label'),
    '#default_value' => theme_get_setting('apply_label'),
  ];
  $form['ema']['tour_url'] = [
    '#type' => 'textfield',
    '#title' => t('"Schedule a tour" link'),
    '#default_value' => theme_get_setting('tour_url'),
  ];
  $form['ema']['instagram_url'] = [
    '#type' => 'textfield',
    '#title' => t('Instagram URL'),
    '#default_value' => theme_get_setting('instagram_url'),
  ];
  $form['ema']['facebook_url'] = [
    '#type' => 'textfield',
    '#title' => t('Facebook URL'),
    '#default_value' => theme_get_setting('facebook_url'),
  ];
  $form['ema']['hero_variant'] = [
    '#type' => 'select',
    '#title' => t('Home hero layout'),
    '#options' => ['split' => t('Split'), 'full' => t('Full width image'), 'arch' => t('Arch')],
    '#default_value' => theme_get_setting('hero_variant'),
  ];
  $form['ema']['hero_image_style'] = [
    '#type' => 'select',
    '#title' => t('Hero image style'),
    '#options' => [
      'ema_hero_split' => 'Split (1000 × 800)',
      'ema_hero_full' => 'Full (1600 × 700)',
      'ema_hero_arch' => 'Arch (800 × 1000)',
    ],
    '#default_value' => theme_get_setting('hero_image_style'),
  ];
  $form['ema']['brand_mark'] = [
    '#type' => 'select',
    '#title' => t('Logo mark'),
    '#options' => ['heart' => t('Heart'), 'monogram' => t('Monogram'), 'leaf' => t('Leaf')],
    '#default_value' => theme_get_setting('brand_mark'),
  ];
}
