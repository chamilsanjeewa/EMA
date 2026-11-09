/**
 * DEMO ONLY: color theme swatches in the option switcher.
 * Sets <html data-theme="..."> and remembers the choice, so it carries
 * across pages and across options A, B and C. Not part of the Drupal theme.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ema-demo-theme';

  function init(root) {
    var html = document.documentElement;
    var swatches = Array.prototype.slice.call(root.querySelectorAll('.option-switcher__swatch'));
    var fallback = root.getAttribute('data-default-theme');

    function update() {
      var current = html.getAttribute('data-theme') || fallback;
      swatches.forEach(function (s) {
        s.setAttribute('aria-pressed', String(s.getAttribute('data-theme-value') === current));
      });
    }

    swatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        var value = swatch.getAttribute('data-theme-value');
        html.setAttribute('data-theme', value);
        try {
          window.localStorage.setItem(STORAGE_KEY, value);
        } catch (e) { /* storage not available */ }
        update();
      });
    });

    update();
  }

  document.querySelectorAll('[data-component="option-switcher"]').forEach(init);
})();
