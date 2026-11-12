# Writes SDC component definitions (YAML) and Twig templates into ema_base.
import os, sys, textwrap

BASE = sys.argv[1]  # .../web/themes/custom/ema_base
SCHEMA = '$schema: https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json'

def I(name, extra=''):
    """Twig include of the icon component."""
    e = f", extra_class: '{extra}'" if extra else ''
    return "{{ include('ema_base:icon', {name: " + name + e + "}, with_context = false) }}"

S = "['string', 'null']"
B = "['boolean', 'null']"
A = "['array', 'null']"
O = "['object', 'null']"

C = {}

C['icon'] = dict(name='Icon', desc='Decorative stroke icon (aria-hidden).',
  props={'name': 'string', 'extra_class': S}, js=False, twig=None)  # twig written by export

C['button'] = dict(name='Button', desc='Link styled as a button.',
  props={'label': 'string', 'url': 'string', 'variant': S, 'size': S, 'icon': S, 'extra_class': S},
  twig="""{% set classes = ['button', 'button--' ~ (variant ?: 'primary'), size ? 'button--' ~ size, extra_class]|filter(c => c) %}
<a class="{{ classes|join(' ') }}" href="{{ url }}">{{ label }}{% if icon %}""" + I('icon') + """{% endif %}</a>
""")

C['site-branding'] = dict(name='Site branding', desc='Logo mark and school name.',
  props={'line1': 'string', 'line2': S, 'url': S, 'mark': S, 'inverse': B},
  twig="""<a class="site-branding{{ inverse ? ' site-branding--inverse' }}" href="{{ url ?: '/' }}" rel="home">
  <svg class="site-branding__mark" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
    {%- if mark == 'monogram' -%}
      <rect class="site-branding__mark-bg" width="48" height="48" rx="4"/><text class="site-branding__mark-fg" x="24" y="31" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Arial, sans-serif" font-weight="700" font-size="19">EM</text>
    {%- elseif mark == 'leaf' -%}
      <circle class="site-branding__mark-bg" cx="24" cy="24" r="24"/><path class="site-branding__mark-fg" d="M24 11c9 5 10.5 15 0 26-10.5-11-9-21 0-26z"/><path class="site-branding__mark-line" d="M24 17v18" fill="none" stroke-width="2" stroke-linecap="round"/>
    {%- else -%}
      <circle class="site-branding__mark-bg" cx="24" cy="24" r="24"/><path class="site-branding__mark-fg" d="M24 35s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 34 22c0 6.8-10 13-10 13z"/>
    {%- endif -%}
  </svg>
  <span class="site-branding__name">{{ line1 }}{% if line2 %}<span class="site-branding__tagline">{{ line2 }}</span>{% endif %}</span>
</a>
""")

C['header'] = dict(name='Header', desc='Site header layout: utility bar, branding and menu.',
  props={}, slots={'utility': 'Utility bar', 'branding': 'Branding (header region)', 'menu': 'Main menu (primary_menu region)'},
  twig="""<header class="site-header">
  {% block utility %}{{ utility }}{% endblock %}
  <div class="site-header__inner container">
    {% block branding %}{{ branding }}{% endblock %}
    {% block menu %}{{ menu }}{% endblock %}
  </div>
</header>
""")

C['utility-bar'] = dict(name='Utility bar', desc='Top bar with hours, phone numbers and the language switcher.',
  props={'hours': S, 'phones': A}, slots={'language': 'Language switcher'},
  twig="""<div class="utility-bar">
  <div class="utility-bar__inner container">
    <ul class="utility-bar__list">
      {% if hours %}<li class="utility-bar__item utility-bar__item--hours">""" + I("'clock'") + """{{ hours }}</li>{% endif %}
      {% for phone in phones %}
        <li class="utility-bar__item"><a class="utility-bar__link" href="{{ phone.href }}">""" + I("'phone'") + """<span class="utility-bar__text"><span class="utility-bar__label">{{ phone.label }}</span><span class="utility-bar__number"><span class="utility-bar__sep">: </span>{{ phone.number }}</span></span></a></li>
      {% endfor %}
    </ul>
    {% block language %}{{ language }}{% endblock %}
  </div>
</div>
""")

C['language-switcher'] = dict(name='Language switcher', desc='Dropdown of language links.',
  props={'current': S, 'links': A}, js=True,
  twig="""{% if links %}
<div class="language-switcher" data-component="language-switcher">
  <button type="button" class="language-switcher__toggle" aria-expanded="false" aria-controls="language-switcher-list">
    """ + I("'globe'") + """<span class="visually-hidden">{{ 'Language:'|t }}</span> <span class="language-switcher__current">{{ current }}</span>""" + I("'chevron-down'") + """
  </button>
  <ul class="language-switcher__list" id="language-switcher-list">
    {% for link in links %}
      <li class="language-switcher__item"><a class="language-switcher__link" href="{{ link.url }}" lang="{{ link.langcode }}" hreflang="{{ link.langcode }}"{% if link.active %} aria-current="true"{% endif %}>{{ link.label }}</a></li>
    {% endfor %}
  </ul>
</div>
{% endif %}
""")

C['main-menu'] = dict(name='Main menu', desc='Main navigation with mobile toggle, dropdowns and the Apply button.',
  props={'items': A, 'apply_url': S, 'apply_label': S}, js=True,
  twig="""<nav class="main-menu" aria-label="{{ 'Main'|t }}" data-component="main-menu">
  <button type="button" class="main-menu__toggle" aria-expanded="false" aria-controls="main-menu-panel">
    <span class="main-menu__toggle-icon main-menu__toggle-icon--open">""" + I("'menu'") + """</span><span class="main-menu__toggle-icon main-menu__toggle-icon--close">""" + I("'close'") + """</span>
    <span class="main-menu__toggle-label">{{ 'Menu'|t }}</span>
  </button>
  <div class="main-menu__panel" id="main-menu-panel">
    <ul class="main-menu__list">
      {% for item in items %}
        {% if item.below %}
          <li class="main-menu__item main-menu__item--has-children{{ item.in_trail ? ' is-active-trail' }}">
            <div class="main-menu__parent">
              <a class="main-menu__link" href="{{ item.url }}"{% if item.active %} aria-current="page"{% endif %}>{{ item.title }}</a>
              <button type="button" class="main-menu__submenu-toggle" aria-expanded="false" aria-controls="main-menu-submenu-{{ loop.index }}">
                <span class="visually-hidden">{{ item.title }} {{ 'submenu'|t }}</span>""" + I("'chevron-down'") + """
              </button>
            </div>
            <ul class="main-menu__submenu" id="main-menu-submenu-{{ loop.index }}">
              {% for child in item.below %}
                <li class="main-menu__subitem"><a class="main-menu__sublink" href="{{ child.url }}"{% if child.active %} aria-current="page"{% endif %}>{{ child.title }}</a></li>
              {% endfor %}
            </ul>
          </li>
        {% else %}
          <li class="main-menu__item{{ item.in_trail and not item.active ? ' is-active-trail' }}"><a class="main-menu__link" href="{{ item.url }}"{% if item.active %} aria-current="page"{% endif %}>{{ item.title }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
    {% if apply_url %}{{ include('ema_base:button', {label: apply_label ?: 'Apply Now'|t, url: apply_url, extra_class: 'main-menu__cta'}, with_context = false) }}{% endif %}
  </div>
</nav>
""")

HERO_CONTENT = """<div class="hero__content">
      {% if eyebrow %}<p class="hero__eyebrow">{{ eyebrow }}</p>{% endif %}
      <h1 class="hero__title" id="hero-title">{{ title }}</h1>
      {% if text %}<p class="hero__text">{{ text }}</p>{% endif %}
      {% if links %}
        <div class="hero__actions">
          {% for link in links %}{{ include('ema_base:button', {label: link.label, url: link.url, variant: loop.first ? 'primary' : 'secondary', size: 'large'}, with_context = false) }}{% endfor %}
        </div>
      {% endif %}
    </div>"""
HERO_MEDIA = """{% if image %}<div class="hero__media">
      <img class="hero__image" src="{{ image.src }}" width="{{ image.width }}" height="{{ image.height }}" alt="{{ image.alt }}">
    </div>{% endif %}"""
C['hero'] = dict(name='Hero', desc='Home page hero. Variants: split (A), full (B), arch (C).',
  props={'variant': S, 'eyebrow': S, 'title': 'string', 'text': S, 'image': O, 'links': A},
  twig="""{% set variant = variant ?: 'split' %}
<section class="hero hero--{{ variant }}" aria-labelledby="hero-title">
  {% if variant == 'full' %}
    """ + HERO_MEDIA + """
    <div class="hero__inner container">
      """ + HERO_CONTENT + """
    </div>
  {% else %}
    <div class="hero__inner container">
      """ + HERO_CONTENT + """
      """ + HERO_MEDIA + """
    </div>
  {% endif %}
</section>
""")

C['breadcrumb'] = dict(name='Breadcrumb', desc='Breadcrumb trail. The last link has no URL.',
  props={'links': A},
  twig="""{% if links %}
<nav class="breadcrumb" aria-label="{{ 'Breadcrumb'|t }}">
  <ol class="breadcrumb__list">
    {% for link in links %}
      <li class="breadcrumb__item">{% if link.url and not loop.last %}<a class="breadcrumb__link" href="{{ link.url }}">{{ link.text }}</a>{% else %}<span aria-current="page">{{ link.text }}</span>{% endif %}</li>
    {% endfor %}
  </ol>
</nav>
{% endif %}
""")

C['page-header'] = dict(name='Page header', desc='Inner page title with breadcrumb and lead text.',
  props={'title': 'string', 'lead': S, 'breadcrumb': A},
  twig="""<section class="page-header" aria-labelledby="page-title">
  <div class="page-header__inner container">
    {{ include('ema_base:breadcrumb', {links: breadcrumb}, with_context = false) }}
    <h1 class="page-header__title" id="page-title">{{ title }}</h1>
    {% if lead %}<p class="page-header__lead">{{ lead }}</p>{% endif %}
  </div>
</section>
""")

C['section-heading'] = dict(name='Section heading', desc='Eyebrow, title and intro text for a section.',
  props={'heading_id': S, 'eyebrow': S, 'title': 'string', 'text': S, 'center': B, 'heading_level': ['integer', 'null']},
  twig="""{% set tag = 'h' ~ (heading_level ?: 2) %}
<div class="section-heading{{ center ? ' section-heading--center' }}">
  {% if eyebrow %}<p class="section-heading__eyebrow">{{ eyebrow }}</p>{% endif %}
  <{{ tag }} class="section-heading__title"{% if heading_id %} id="{{ heading_id }}"{% endif %}>{{ title }}</{{ tag }}>
  {% if text %}<p class="section-heading__text">{{ text }}</p>{% endif %}
</div>
""")

C['section'] = dict(name='Section', desc='Full-width page section with optional heading. Used by paragraphs.',
  props={'section_id': S, 'eyebrow': S, 'title': S, 'text': S, 'center': B, 'background': S, 'modifier': S},
  slots={'body': 'Section content'}, css=False,
  twig="""<section class="section{{ background == 'alt' ? ' section--alt' }}{{ modifier ? ' ' ~ modifier }}"{% if title and section_id %} aria-labelledby="{{ section_id }}"{% endif %}>
  <div class="container">
    {% if title %}{{ include('ema_base:section-heading', {heading_id: section_id, eyebrow: eyebrow, title: title, text: text, center: center}, with_context = false) }}{% endif %}
    {% block body %}{{ body }}{% endblock %}
  </div>
</section>
""")

C['feature-list'] = dict(name='Feature list', desc='Icon, title and text items.',
  props={'items': A, 'modifier': S, 'heading_level': ['integer', 'null']},
  twig="""{% set tag = 'h' ~ (heading_level ?: 3) %}
<ul class="feature-list{{ modifier ? ' feature-list--' ~ modifier }}">
  {% for item in items %}
    <li class="feature-list__item">
      <span class="feature-list__icon">""" + I('item.icon') + """</span>
      <{{ tag }} class="feature-list__title">{{ item.title }}</{{ tag }}>
      {% if item.text %}<p class="feature-list__text">{{ item.text }}</p>{% endif %}
    </li>
  {% endfor %}
</ul>
""")

C['media-text'] = dict(name='Media and text', desc='Image next to text, with a check list and actions.',
  props={'heading_id': S, 'eyebrow': S, 'title': 'string', 'image': O, 'list': A, 'links': A, 'reverse': B},
  slots={'body': 'Rich text'},
  twig="""<div class="media-text{{ reverse ? ' media-text--reverse' }}">
  {% if image %}
    <div class="media-text__media">
      <img class="media-text__image" src="{{ image.src }}" width="{{ image.width }}" height="{{ image.height }}" alt="{{ image.alt }}" loading="lazy">
    </div>
  {% endif %}
  <div class="media-text__content">
    {% if eyebrow %}<p class="media-text__eyebrow">{{ eyebrow }}</p>{% endif %}
    <h2 class="media-text__title"{% if heading_id %} id="{{ heading_id }}"{% endif %}>{{ title }}</h2>
    <div class="media-text__body">{% block body %}{{ body }}{% endblock %}</div>
    {% if list %}
      <ul class="media-text__list">
        {% for line in list %}<li class="media-text__list-item">""" + I("'check'") + """{{ line }}</li>{% endfor %}
      </ul>
    {% endif %}
    {% if links %}
      <div class="media-text__actions">
        {% for link in links %}{{ include('ema_base:button', {label: link.label, url: link.url, variant: link.variant ?: 'secondary'}, with_context = false) }}{% endfor %}
      </div>
    {% endif %}
  </div>
</div>
""")

C['program-card'] = dict(name='Program card', desc='Program teaser. The whole card is clickable.',
  props={'card_id': S, 'title': 'string', 'url': 'string', 'age': S, 'icon': S, 'text': S, 'image': O},
  twig="""<article class="program-card"{% if card_id %} id="{{ card_id }}"{% endif %}>
  {% if image %}<img class="program-card__image" src="{{ image.src }}" width="{{ image.width }}" height="{{ image.height }}" alt="" loading="lazy">{% endif %}
  <div class="program-card__body">
    <h3 class="program-card__title"><a class="program-card__link" href="{{ url }}">{{ title }}</a></h3>
    {% if age %}<p class="program-card__age">""" + I("icon ?: 'star'") + """{{ age }}</p>{% endif %}
    {% if text %}<p class="program-card__text">{{ text }}</p>{% endif %}
    <span class="program-card__more" aria-hidden="true">{{ 'Learn more'|t }}""" + I("'arrow-right'") + """</span>
  </div>
</article>
""")

C['testimonial'] = dict(name='Testimonial', desc='Parent quote.',
  props={'quote': 'string', 'name': 'string', 'role': S},
  twig="""<figure class="testimonial">
  <blockquote class="testimonial__quote"><p>{{ quote }}</p></blockquote>
  <figcaption class="testimonial__author"><span class="testimonial__name">{{ name }}</span> {% if role %}<span class="testimonial__role">{{ role }}</span>{% endif %}</figcaption>
</figure>
""")

C['history-timeline'] = dict(name='History timeline', desc='Year-by-year history.',
  props={'items': A},
  twig="""<ol class="history-timeline">
  {% for item in items %}
    <li class="history-timeline__item">
      <h3 class="history-timeline__title"><span class="history-timeline__year">{{ item.year }}</span> {{ item.title }}</h3>
      {% if item.text %}<p class="history-timeline__text">{{ item.text }}</p>{% endif %}
    </li>
  {% endfor %}
</ol>
""")

C['staff-card'] = dict(name='Staff card', desc='Staff photo (or placeholder), name, role and short bio.',
  props={'name': 'string', 'role': S, 'bio': S, 'photo': O},
  twig="""<article class="staff-card">
  {% if photo %}<img class="staff-card__photo" src="{{ photo.src }}" width="{{ photo.width ?: 400 }}" height="{{ photo.height ?: 400 }}" alt="" loading="lazy">{% endif %}
  <h3 class="staff-card__name">{{ name }}</h3>
  {% if role %}<p class="staff-card__role">{{ role }}</p>{% endif %}
  {% if bio %}<p class="staff-card__bio">{{ bio }}</p>{% endif %}
</article>
""")

C['enrollment-steps'] = dict(name='Enrollment steps', desc='Numbered steps with optional actions.',
  props={'items': A},
  twig="""<ol class="enrollment-steps">
  {% for item in items %}
    <li class="enrollment-steps__item">
      <span class="enrollment-steps__number" aria-hidden="true">{{ loop.index }}</span>
      <h3 class="enrollment-steps__title">{{ item.title }}</h3>
      {% if item.text %}<p class="enrollment-steps__text">{{ item.text }}</p>{% endif %}
      {% if item.link %}<p class="enrollment-steps__action">{{ include('ema_base:button', {label: item.link.label, url: item.link.url, variant: loop.index == 2 ? 'primary' : 'secondary', size: 'small'}, with_context = false) }}</p>{% endif %}
    </li>
  {% endfor %}
</ol>
""")

C['location-card'] = dict(name='Location card', desc='One school: photo, enrolling badge, address, phone and actions.',
  props={'key': S, 'name': 'string', 'street': S, 'city': S, 'phone': S, 'phone_href': S, 'maps_url': S, 'enrolling': S, 'note': S, 'serves': S, 'image': O, 'placeholder': S, 'tour_url': S, 'heading_level': ['integer', 'null']},
  twig="""{% set tag = 'h' ~ (heading_level ?: 3) %}
<article class="location-card" aria-labelledby="{{ key }}-title">
  {% if image %}
    <img class="location-card__image" src="{{ image.src }}" width="{{ image.width }}" height="{{ image.height }}" alt="" loading="lazy">
  {% elseif placeholder %}
    <img class="location-card__image" src="{{ placeholder }}" width="800" height="450" alt="" loading="lazy">
  {% endif %}
  <div class="location-card__body">
    <{{ tag }} class="location-card__title" id="{{ key }}-title">{{ name }}</{{ tag }}>
    {% if enrolling %}<p class="location-card__badge">{{ enrolling }}</p>{% endif %}
    <p class="location-card__address">""" + I("'pin'") + """<span>{{ street }}, {{ city }}</span></p>
    {% if phone %}<p class="location-card__phone">""" + I("'phone'") + """<a href="{{ phone_href }}">{{ phone }}</a></p>{% endif %}
    {% if note or serves %}<p class="location-card__text">{{ note }}{% if serves %} {{ 'Convenient to'|t }} {{ serves }}{% endif %}</p>{% endif %}
    <div class="location-card__actions">
      {{ include('ema_base:button', {label: 'Schedule a tour'|t, url: tour_url ?: '/contact-us', variant: 'primary', size: 'small'}, with_context = false) }}
      {% if maps_url %}{{ include('ema_base:button', {label: 'Directions'|t, url: maps_url, variant: 'secondary', size: 'small'}, with_context = false) }}{% endif %}
    </div>
  </div>
</article>
""")

C['gallery-grid'] = dict(name='Gallery grid', desc='Photo grid with a native dialog lightbox.',
  props={'items': A}, js=True,
  twig="""<div class="gallery-grid" data-component="gallery-grid">
  <ul class="gallery-grid__list">
    {% for item in items %}
      <li class="gallery-grid__item">
        <figure class="gallery-grid__figure">
          <a class="gallery-grid__link" href="{{ item.full }}" data-caption="{{ item.caption }}" aria-haspopup="dialog">
            <img class="gallery-grid__image" src="{{ item.src }}" width="{{ item.width }}" height="{{ item.height }}" alt="{{ item.alt }}" loading="lazy">
          </a>
          {% if item.caption %}<figcaption class="gallery-grid__caption">{{ item.caption }}</figcaption>{% endif %}
        </figure>
      </li>
    {% endfor %}
  </ul>
  <dialog class="gallery-grid__dialog" aria-label="{{ 'Photo viewer'|t }}">
    <div class="gallery-grid__dialog-inner">
      <button type="button" class="gallery-grid__control gallery-grid__close">""" + I("'close'") + """<span class="visually-hidden">{{ 'Close photo viewer'|t }}</span></button>
      <button type="button" class="gallery-grid__control gallery-grid__prev">""" + I("'chevron-left'") + """<span class="visually-hidden">{{ 'Previous photo'|t }}</span></button>
      <figure class="gallery-grid__viewer">
        <img class="gallery-grid__viewer-image" src="{{ items|first.full }}" alt="">
        <figcaption class="gallery-grid__viewer-caption"></figcaption>
      </figure>
      <button type="button" class="gallery-grid__control gallery-grid__next">""" + I("'chevron-right'") + """<span class="visually-hidden">{{ 'Next photo'|t }}</span></button>
      <p class="gallery-grid__counter" aria-live="polite"></p>
    </div>
  </dialog>
</div>
""")

C['faq-accordion'] = dict(name='FAQ accordion', desc='Accessible accordion. Answers stay open without JavaScript.',
  props={'accordion_id': 'string', 'items': A, 'heading_level': ['integer', 'null']}, js=True,
  twig="""{% set tag = 'h' ~ (heading_level ?: 3) %}
<div class="faq-accordion" data-component="faq-accordion">
  {% for item in items %}
    {% set id = 'faq-' ~ accordion_id ~ '-' ~ loop.index %}
    <div class="faq-accordion__item">
      <{{ tag }} class="faq-accordion__heading">
        <button type="button" class="faq-accordion__trigger" id="{{ id }}-trigger" aria-expanded="false" aria-controls="{{ id }}-panel">
          <span class="faq-accordion__question">{{ item.question }}</span>
          <span class="faq-accordion__icon">""" + I("'chevron-down'") + """</span>
        </button>
      </{{ tag }}>
      <div class="faq-accordion__panel" id="{{ id }}-panel">
        <div class="faq-accordion__answer"><p>{{ item.answer }}</p></div>
      </div>
    </div>
  {% endfor %}
</div>
""")

C['cta-banner'] = dict(name='CTA banner', desc='Apply / tour banner (footer_top region).',
  props={'title': 'string', 'text': S, 'apply_url': S, 'apply_label': S, 'tour_url': S},
  twig="""<section class="cta-banner" aria-labelledby="cta-banner-title">
  <div class="container">
    <div class="cta-banner__inner">
      <div class="cta-banner__content">
        <h2 class="cta-banner__title" id="cta-banner-title">{{ title }}</h2>
        {% if text %}<p class="cta-banner__text">{{ text }}</p>{% endif %}
      </div>
      <div class="cta-banner__actions">
        {% if apply_url %}{{ include('ema_base:button', {label: apply_label ?: 'Apply Now'|t, url: apply_url, variant: 'inverse', size: 'large'}, with_context = false) }}{% endif %}
        {{ include('ema_base:button', {label: 'Schedule a tour'|t, url: tour_url ?: '/contact-us', variant: 'ghost-inverse', size: 'large'}, with_context = false) }}
      </div>
    </div>
  </div>
</section>
""")

C['contact-info'] = dict(name='Contact info', desc='Hours and both schools. Compact variant for the sidebar.',
  props={'compact': B, 'title': 'string', 'heading_id': S, 'hours': A, 'locations': A, 'apply_url': S, 'apply_label': S, 'social': A},
  twig="""<div class="contact-info{{ compact ? ' contact-info--compact' }}">
  <h2 class="contact-info__title"{% if heading_id %} id="{{ heading_id }}"{% endif %}>{{ title }}</h2>
  <dl class="contact-info__list">
    {% if hours %}
      <div class="contact-info__row">
        <dt class="contact-info__label"><span class="contact-info__icon">""" + I("'clock'") + """</span>{{ 'Hours'|t }}</dt>
        <dd class="contact-info__value">{% for line in hours %}{{ line }}{% if not loop.last %}<br>{% endif %}{% endfor %}</dd>
      </div>
    {% endif %}
    {% for location in locations %}
      <div class="contact-info__row">
        <dt class="contact-info__label"><span class="contact-info__icon">""" + I("'pin'") + """</span>{{ location.name }}</dt>
        <dd class="contact-info__value">
          <address>{{ location.street }}<br>{{ location.city }}</address>
          <a href="{{ location.phone_href }}">{{ location.phone }}</a>
          {% if location.email and not compact %}<br><a href="mailto:{{ location.email }}">{{ location.email }}</a>{% endif %}
          {% if location.maps_url %}<br><a href="{{ location.maps_url }}">{{ 'Get directions'|t }}<span class="visually-hidden"> {{ 'to'|t }} {{ location.name }}</span></a>{% endif %}
        </dd>
      </div>
    {% endfor %}
  </dl>
  {% if apply_url %}<div class="contact-info__actions">{{ include('ema_base:button', {label: apply_label ?: 'Apply Now'|t, url: apply_url, extra_class: 'button--block'}, with_context = false) }}</div>{% endif %}
  {% if social %}
    <p class="contact-info__social-label">{{ 'Follow us'|t }}</p>
    {{ include('ema_base:social-links', {items: social}, with_context = false) }}
  {% endif %}
</div>
""")

C['contact-form'] = dict(name='Contact form', desc='Card around the Drupal contact form ("tour").',
  props={'title': 'string', 'intro': S}, slots={'form': 'The Drupal form'},
  twig="""<div class="contact-form">
  <h2 class="contact-form__title" id="contact-form-title">{{ title }}</h2>
  {% if intro %}<p class="contact-form__intro">{{ intro }}</p>{% endif %}
  {% block form %}{{ form }}{% endblock %}
</div>
""")

C['location-map'] = dict(name='Location map', desc='One Google Maps embed per school, with name, address and a link.',
  props={'items': A},
  twig="""<div class="location-map">
  {% for item in items %}
    <figure class="location-map__item">
      <div class="location-map__frame">
        <iframe class="location-map__iframe" src="{{ item.embed_url }}" title="{{ 'Google map'|t }}: {{ item.name }}, {{ item.street }}, {{ item.city }}" width="600" height="400" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      </div>
      <figcaption class="location-map__caption">
        <strong class="location-map__name">{{ item.name }}</strong>
        <span class="location-map__address">{{ item.street }}, {{ item.city }}</span>
        {% if item.maps_url %}<a class="location-map__link" href="{{ item.maps_url }}">{{ 'Open in Google Maps'|t }}<span class="visually-hidden">: {{ item.name }}</span></a>{% endif %}
      </figcaption>
    </figure>
  {% endfor %}
</div>
""")

C['sidebar-nav'] = dict(name='Sidebar navigation', desc='Link list in the sidebar (programs or recent news).',
  props={'title': 'string', 'heading_id': S, 'items': A},
  twig="""{% set heading_id = heading_id ?: 'sidebar-nav-title' %}
<nav class="sidebar-nav" aria-labelledby="{{ heading_id }}">
  <h2 class="sidebar-nav__title" id="{{ heading_id }}">{{ title }}</h2>
  <ul class="sidebar-nav__list">
    {% for item in items %}
      <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="{{ item.url }}"{% if item.active %} aria-current="page"{% endif %}>{{ item.title }}""" + I("'chevron-right'") + """</a></li>
    {% endfor %}
  </ul>
</nav>
""")

C['social-links'] = dict(name='Social links', desc='Social media icon links.',
  props={'items': A, 'inverse': B},
  twig="""{% if items %}
<ul class="social-links{{ inverse ? ' social-links--inverse' }}">
  {% for item in items %}
    <li><a class="social-links__link" href="{{ item.url }}">""" + I('item.icon') + """<span class="visually-hidden">{{ item.label }}</span></a></li>
  {% endfor %}
</ul>
{% endif %}
""")

C['footer'] = dict(name='Footer', desc='Site footer: branding, menus, schools and bottom bar.',
  props={'branding': O, 'about': S, 'social': A, 'explore': A, 'programs': A, 'locations': A, 'hours': S, 'copyright': S, 'bottom_links': A},
  slots={'extra': 'Footer region blocks'},
  twig="""<footer class="site-footer">
  <div class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        {{ include('ema_base:site-branding', branding|merge({inverse: true}), with_context = false) }}
        {% if about %}<p class="footer__about">{{ about }}</p>{% endif %}
        {{ include('ema_base:social-links', {items: social, inverse: true}, with_context = false) }}
      </div>
      <nav class="footer__col" aria-labelledby="footer-explore-title">
        <h2 class="footer__heading" id="footer-explore-title">{{ 'Explore'|t }}</h2>
        <ul class="footer__list">
          {% for link in explore %}<li><a class="footer__link" href="{{ link.url }}">{{ link.title }}</a></li>{% endfor %}
        </ul>
      </nav>
      <nav class="footer__col" aria-labelledby="footer-programs-title">
        <h2 class="footer__heading" id="footer-programs-title">{{ 'Programs'|t }}</h2>
        <ul class="footer__list">
          {% for link in programs %}<li><a class="footer__link" href="{{ link.url }}">{{ link.title }}</a></li>{% endfor %}
        </ul>
      </nav>
      <div class="footer__col">
        <h2 class="footer__heading">{{ 'Our schools'|t }}</h2>
        {% for location in locations %}
          <p class="footer__text footer__location"><strong class="footer__location-name">{{ location.name }}</strong><br>{{ location.street }}, {{ location.city }}<br><a class="footer__link" href="{{ location.phone_href }}">{{ location.phone }}</a></p>
        {% endfor %}
        {% if hours %}<p class="footer__text">{{ hours }}</p>{% endif %}
      </div>
    </div>
    {% block extra %}{{ extra }}{% endblock %}
    <div class="footer__bottom container">
      <p class="footer__copyright">{{ copyright }}</p>
      <ul class="footer__bottom-list">
        {% for link in bottom_links %}<li><a class="footer__link" href="{{ link.url }}">{{ link.title }}</a></li>{% endfor %}
      </ul>
    </div>
  </div>
</footer>
""")

C['news-card'] = dict(name='News card', desc='News post teaser: photo, category, date and summary. The whole card is clickable.',
  props={'title': 'string', 'url': 'string', 'image': O, 'category': S, 'date': S, 'date_iso': S, 'summary': S, 'heading_level': ['integer', 'null']},
  twig="""{% set h = heading_level ?: 3 %}
<article class="news-card">
  {% if image %}<img class="news-card__image" src="{{ image.src }}" width="{{ image.width }}" height="{{ image.height }}" alt="" loading="lazy">{% endif %}
  <div class="news-card__body">
    <h{{ h }} class="news-card__title"><a class="news-card__link" href="{{ url }}">{{ title }}</a></h{{ h }}>
    <p class="news-card__meta">{% if category %}<span class="news-card__category">{{ category }}</span>{% endif %}{% if date %}<time class="news-card__date" datetime="{{ date_iso }}">{{ date }}</time>{% endif %}</p>
    {% if summary %}<p class="news-card__summary">{{ summary }}</p>{% endif %}
    <span class="news-card__more" aria-hidden="true">{{ 'Read more'|t }}""" + I("'arrow-right'") + """</span>
  </div>
</article>
""")

C['news-listing'] = dict(name='News listing', desc='All news posts with category filter links and a pager.',
  props={'filters': A, 'items': A, 'empty': S}, slots={'pager': 'Pager'},
  twig="""<div class="news-listing">
  {% if filters %}
    <nav class="news-listing__filters" aria-label="{{ 'Filter news by category'|t }}">
      {% for filter in filters %}
        <a class="news-listing__filter" href="{{ filter.url }}"{% if filter.active %} aria-current="true"{% endif %}>{{ filter.label }}</a>
      {% endfor %}
    </nav>
  {% endif %}
  {% if items %}
    <ul class="news-listing__list grid grid--3">
      {% for item in items %}
        <li class="news-listing__item">{{ include('ema_base:news-card', item, with_context = false) }}</li>
      {% endfor %}
    </ul>
  {% else %}
    <p class="news-listing__empty">{{ empty ?: 'No news posts yet.'|t }}</p>
  {% endif %}
  {% block pager %}{{ pager }}{% endblock %}
</div>
""")


def yaml_props(props):
    if not props:
        return "props:\n  type: object\n  properties: {}\n"
    out = ["props:", "  type: object", "  properties:"]
    for k, t in props.items():
        out.append(f"    {k}:")
        out.append(f"      type: {t}")
    return "\n".join(out) + "\n"


for name, c in C.items():
    d = os.path.join(BASE, 'components', name)
    os.makedirs(d, exist_ok=True)
    yml = f"{SCHEMA}\nname: '{c['name']}'\nstatus: stable\ndescription: '{c['desc']}'\n" + yaml_props(c['props'])
    if c.get('slots'):
        yml += "slots:\n" + "".join(f"  {k}:\n    title: '{v}'\n" for k, v in c['slots'].items())
    if c.get('js'):
        yml += "libraryOverrides:\n  dependencies:\n    - core/drupal\n    - core/once\n"
    open(os.path.join(d, f'{name}.component.yml'), 'w').write(yml)
    if c.get('twig'):
        header = f"{{#\n/**\n * @file\n * Component: {name}. {c['desc']}\n */\n#}}\n"
        open(os.path.join(d, f'{name}.twig'), 'w').write(header + c['twig'])
print(len(C), 'components')
