/**
 * @file
 * Component: language-switcher.
 * - The button opens the list (ArrowDown also opens it and focuses a link).
 * - ArrowUp/ArrowDown move between languages, Escape closes and returns focus.
 * - Links are real Drupal language links (/es/..., /so/...).
 */
(function (Drupal, once) {
  'use strict';

  function init(root) {
    const toggle = root.querySelector('.language-switcher__toggle');
    const links = Array.from(root.querySelectorAll('.language-switcher__link'));

    function setOpen(open, focusSelected) {
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open && focusSelected) {
        (root.querySelector('[aria-current="true"]') || links[0]).focus();
      }
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true', false));
    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(true, true);
      }
    });
    root.addEventListener('keydown', (event) => {
      const i = links.indexOf(document.activeElement);
      if (event.key === 'Escape' && root.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
      else if (i > -1 && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        const step = event.key === 'ArrowDown' ? 1 : -1;
        links[(i + step + links.length) % links.length].focus();
      }
    });
    root.addEventListener('focusout', (event) => {
      if (!root.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });
    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) {
        setOpen(false);
      }
    });
  }

  Drupal.behaviors.emaLanguageSwitcher = {
    attach(context) {
      once('language-switcher', '[data-component="language-switcher"]', context).forEach(init);
    },
  };
})(Drupal, once);
