/**
 * Component: main-menu
 * Mobile menu toggle + disclosure dropdowns with keyboard support.
 * - Enter/Space on buttons opens and closes.
 * - Escape closes the open dropdown (or the mobile menu) and returns focus.
 * - Click outside or tabbing away closes the dropdown.
 *
 * Drupal: wrap init() in
 *   Drupal.behaviors.emaMainMenu = {
 *     attach(context) { once('main-menu', '[data-component="main-menu"]', context).forEach(init); }
 *   };
 */
(function (Drupal, once) {
  'use strict';

  // Keep in sync with the 75em breakpoint in main-menu.css.
  var desktop = window.matchMedia('(min-width: 75em)');
  var hover = window.matchMedia('(min-width: 75em) and (hover: hover)');

  function init(menu) {
    var toggle = menu.querySelector('.main-menu__toggle');
    var label = menu.querySelector('.main-menu__toggle-label');
    var subToggles = Array.prototype.slice.call(menu.querySelectorAll('.main-menu__submenu-toggle'));

    function setMenu(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Close' : 'Menu';
    }

    function setSub(btn, open) {
      var sub = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(open));
      sub.hidden = !open;
    }

    function closeSubs(except) {
      subToggles.forEach(function (btn) {
        if (btn !== except) {
          setSub(btn, false);
        }
      });
    }

    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    subToggles.forEach(function (btn) {
      var item = btn.closest('.main-menu__item');
      setSub(btn, false);

      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        closeSubs(btn);
        setSub(btn, open);
      });

      item.addEventListener('mouseenter', function () {
        if (hover.matches) {
          closeSubs(btn);
          setSub(btn, true);
        }
      });

      item.addEventListener('mouseleave', function () {
        if (hover.matches) {
          setSub(btn, false);
        }
      });

      item.addEventListener('focusout', function (event) {
        if (desktop.matches && !item.contains(event.relatedTarget)) {
          setSub(btn, false);
        }
      });
    });

    menu.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') {
        return;
      }
      var openSub = menu.querySelector('.main-menu__submenu-toggle[aria-expanded="true"]');
      if (openSub) {
        setSub(openSub, false);
        openSub.focus();
      } else if (menu.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target)) {
        closeSubs();
      }
    });

    desktop.addEventListener('change', function () {
      setMenu(false);
      closeSubs();
    });
  }

  Drupal.behaviors.emaMainMenu = {
    attach(context) {
      once('main-menu', '[data-component="main-menu"]', context).forEach(init);
    },
  };
})(Drupal, once);
