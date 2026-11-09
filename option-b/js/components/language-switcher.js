/**
 * Component: language-switcher (DEMO ONLY: no real translations yet)
 * - Button opens a list of languages (ArrowDown also opens it).
 * - ArrowUp/ArrowDown move between languages, Escape closes.
 * - Choosing a language updates the label and shows a short demo message.
 *
 * Drupal: replace with the core Language switcher block
 * (links--language-block.html.twig) and keep this script as a behavior.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ema-demo-language';

  function init(root) {
    var toggle = root.querySelector('.language-switcher__toggle');
    var current = root.querySelector('.language-switcher__current');
    var status = root.querySelector('.language-switcher__status');
    var links = Array.prototype.slice.call(root.querySelectorAll('.language-switcher__link'));
    var timer;

    function setOpen(open, focusSelected) {
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open && focusSelected) {
        (root.querySelector('.language-switcher__link[aria-current="true"]') || links[0]).focus();
      }
    }

    function select(link, announce) {
      links.forEach(function (l) {
        l.removeAttribute('aria-current');
      });
      link.setAttribute('aria-current', 'true');
      current.textContent = link.textContent;
      if (announce) {
        status.textContent = link.getAttribute('data-demo-message');
        clearTimeout(timer);
        timer = setTimeout(function () {
          status.textContent = '';
        }, 4000);
      }
    }

    // Remember the demo choice between pages (optional; ignored if storage is blocked).
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      links.forEach(function (l) {
        if (l.getAttribute('lang') === saved) {
          select(l, false);
        }
      });
    } catch (e) { /* storage not available */ }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true', false);
    });

    toggle.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(true, true);
      }
    });

    root.addEventListener('keydown', function (event) {
      var i = links.indexOf(document.activeElement);
      if (event.key === 'Escape' && root.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      } else if (i > -1 && event.key === 'ArrowDown') {
        event.preventDefault();
        links[(i + 1) % links.length].focus();
      } else if (i > -1 && event.key === 'ArrowUp') {
        event.preventDefault();
        links[(i - 1 + links.length) % links.length].focus();
      }
    });

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        select(link, true);
        try {
          window.localStorage.setItem(STORAGE_KEY, link.getAttribute('lang'));
        } catch (e) { /* storage not available */ }
        setOpen(false);
        toggle.focus();
      });
    });

    root.addEventListener('focusout', function (event) {
      if (!root.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });

    document.addEventListener('click', function (event) {
      if (!root.contains(event.target)) {
        setOpen(false);
      }
    });
  }

  document.querySelectorAll('[data-component="language-switcher"]').forEach(init);
})();
