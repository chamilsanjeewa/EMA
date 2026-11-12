// Vanilla JS per component. Same files for all three options.
module.exports = {
  'main-menu': `/**
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
(function () {
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

  document.querySelectorAll('[data-component="main-menu"]').forEach(init);
})();
`,

  'language-switcher': `/**
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
`,

  'faq-accordion': `/**
 * Component: faq-accordion
 * - Each question is a <button> with aria-expanded / aria-controls.
 * - ArrowUp/ArrowDown move between questions, Home/End jump to first/last.
 * - Without JavaScript all answers stay visible.
 *
 * Drupal: Drupal.behaviors.emaFaqAccordion + once('faq-accordion', ...).
 */
(function () {
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

  document.querySelectorAll('[data-component="faq-accordion"]').forEach(init);
})();
`,

  'gallery-grid': `/**
 * Component: gallery-grid
 * Opens photos in a native <dialog> lightbox.
 * - Focus moves into the dialog and is kept there (built into <dialog>).
 * - Escape closes, ArrowLeft/ArrowRight show previous/next photo.
 * - Focus returns to the photo link when the dialog closes.
 * - Without JavaScript the links simply open the image file.
 *
 * Drupal: Drupal.behaviors.emaGalleryGrid + once('gallery-grid', ...).
 */
(function () {
  'use strict';

  function init(root) {
    var dialog = root.querySelector('.gallery-grid__dialog');
    if (!dialog || typeof dialog.showModal !== 'function') {
      return;
    }
    var links = Array.prototype.slice.call(root.querySelectorAll('.gallery-grid__link'));
    var image = dialog.querySelector('.gallery-grid__viewer-image');
    var caption = dialog.querySelector('.gallery-grid__viewer-caption');
    var counter = dialog.querySelector('.gallery-grid__counter');
    var closeBtn = dialog.querySelector('.gallery-grid__close');
    var index = 0;

    function show(i) {
      index = (i + links.length) % links.length;
      var link = links[index];
      var thumb = link.querySelector('img');
      image.src = link.getAttribute('href');
      image.alt = thumb.alt;
      caption.textContent = link.getAttribute('data-caption') || '';
      counter.textContent = 'Photo ' + (index + 1) + ' of ' + links.length;
    }

    links.forEach(function (link, i) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        show(i);
        dialog.showModal();
        closeBtn.focus();
      });
    });

    dialog.querySelector('.gallery-grid__prev').addEventListener('click', function () {
      show(index - 1);
    });
    dialog.querySelector('.gallery-grid__next').addEventListener('click', function () {
      show(index + 1);
    });
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });

    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        show(index - 1);
      } else if (event.key === 'ArrowRight') {
        show(index + 1);
      }
    });

    // Click on the dark backdrop closes the dialog.
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    // Return focus to the photo that was last shown. Deferred so it runs
    // after the browser restores focus to the link that opened the dialog.
    dialog.addEventListener('close', function () {
      setTimeout(function () {
        links[index].focus();
      }, 0);
    });
  }

  document.querySelectorAll('[data-component="gallery-grid"]').forEach(init);
})();
`,

  'news-listing': `/**
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
`,

  'contact-form': `/**
 * Component: contact-form (DEMO ONLY: nothing is sent)
 * Accessible inline validation:
 * - Errors are written next to each field and linked with aria-describedby.
 * - The first invalid field gets focus; a status message is announced.
 *
 * Drupal: replace with a Webform; keep the styles. Webform handles validation server-side.
 */
(function () {
  'use strict';

  function messageFor(field) {
    var label = field.getAttribute('data-label') || 'this field';
    if (field.validity.valueMissing) {
      return (field.tagName === 'SELECT' ? 'Please choose ' : 'Please enter ') + label + '.';
    }
    if (field.validity.typeMismatch) {
      return 'Please enter a valid email address, for example name@example.com.';
    }
    return 'Please check this field.';
  }

  function init(form) {
    var status = form.querySelector('.contact-form__status');
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstInvalid = null;
      var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));

      fields.forEach(function (field) {
        var error = document.getElementById(field.id + '-error');
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          if (error) {
            error.textContent = messageFor(field);
            error.hidden = false;
          }
          firstInvalid = firstInvalid || field;
        } else {
          field.removeAttribute('aria-invalid');
          if (error) {
            error.textContent = '';
            error.hidden = true;
          }
        }
      });

      if (firstInvalid) {
        status.className = 'contact-form__status contact-form__status--error';
        status.textContent = 'Please fix the highlighted fields.';
        firstInvalid.focus();
        return;
      }

      form.reset();
      status.className = 'contact-form__status contact-form__status--success';
      status.textContent = 'Thank you! This is a demo form, so your message was not sent.';
      status.focus();
    });
  }

  document.querySelectorAll('[data-component="contact-form"]').forEach(init);
})();
`,

  'option-switcher': `/**
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
`,
};
