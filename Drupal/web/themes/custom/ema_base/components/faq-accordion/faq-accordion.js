/**
 * Component: faq-accordion
 * - Each question is a <button> with aria-expanded / aria-controls.
 * - ArrowUp/ArrowDown move between questions, Home/End jump to first/last.
 * - Without JavaScript all answers stay visible.
 *
 * Drupal: Drupal.behaviors.emaFaqAccordion + once('faq-accordion', ...).
 */
(function (Drupal, once) {
  'use strict';

  function init(root) {
    var triggers = Array.prototype.slice.call(root.querySelectorAll('.faq-accordion__trigger'));

    triggers.forEach(function (trigger, index) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      panel.hidden = trigger.getAttribute('aria-expanded') !== 'true';

      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') !== 'true';
        trigger.setAttribute('aria-expanded', String(open));
        panel.hidden = !open;
      });

      trigger.addEventListener('keydown', function (event) {
        var next;
        switch (event.key) {
          case 'ArrowDown':
            next = triggers[(index + 1) % triggers.length];
            break;
          case 'ArrowUp':
            next = triggers[(index - 1 + triggers.length) % triggers.length];
            break;
          case 'Home':
            next = triggers[0];
            break;
          case 'End':
            next = triggers[triggers.length - 1];
            break;
          default:
            return;
        }
        event.preventDefault();
        next.focus();
      });
    });
  }

  Drupal.behaviors.emaFaqAccordion = {
    attach(context) {
      once('faq-accordion', '[data-component="faq-accordion"]', context).forEach(init);
    },
  };
})(Drupal, once);
