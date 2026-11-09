/**
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
