/**
 * Component: news-listing
 * - Category filter buttons (aria-pressed) show or hide posts.
 * - A polite status message says how many posts are shown.
 * - Without JavaScript the filter stays hidden and every post is visible.
 *
 * Drupal: Drupal.behaviors.emaNewsListing + once('news-listing', ...).
 * (A Views exposed filter can replace this later.)
 */
(function () {
  'use strict';

  function init(root) {
    var group = root.querySelector('.news-listing__filters');
    var buttons = Array.prototype.slice.call(root.querySelectorAll('.news-listing__filter'));
    var items = Array.prototype.slice.call(root.querySelectorAll('.news-listing__item'));
    var status = root.querySelector('.news-listing__status');

    group.hidden = false;

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');
        var shown = 0;

        buttons.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === button));
        });
        items.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.hidden = !match;
          if (match) {
            shown += 1;
          }
        });
        status.textContent = 'Showing ' + shown + (shown === 1 ? ' post' : ' posts') +
          (filter === 'all' ? '.' : ' in ' + button.textContent + '.');
      });
    });
  }

  document.querySelectorAll('[data-component="news-listing"]').forEach(init);
})();
