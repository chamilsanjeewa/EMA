/**
 * Component: gallery-grid
 * Opens photos in a native <dialog> lightbox.
 * - Focus moves into the dialog and is kept there (built into <dialog>).
 * - Escape closes, ArrowLeft/ArrowRight show previous/next photo.
 * - Focus returns to the photo link when the dialog closes.
 * - Without JavaScript the links simply open the image file.
 *
 * Drupal: Drupal.behaviors.emaGalleryGrid + once('gallery-grid', ...).
 */
(function (Drupal, once) {
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

  Drupal.behaviors.emaGalleryGrid = {
    attach(context) {
      once('gallery-grid', '[data-component="gallery-grid"]', context).forEach(init);
    },
  };
})(Drupal, once);
