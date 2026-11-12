// Page definitions. Each page returns its regions; layout() wraps them.
const X = require('./components');
const C = require('./content');

const section = ({ id, mod = '', heading = '', body }) => `<section class="section${mod ? ' ' + mod.split(' ').map((m) => 'section--' + m).join(' ') : ''}"${id ? ` aria-labelledby="${id}"` : ''}>
  <div class="container">
    ${heading}
    ${body}
  </div>
</section>`;

const home = { label: 'Home', href: 'index.html' };
const programsCrumb = { label: 'Programs', href: 'programs.html' };

const D = require('./program-details');
const N = require('./news');
const newsCrumb = { label: 'News', href: 'news.html' };

// One page per news post (photo, meta, short article, recent posts in the sidebar).
const postPages = N.posts.map((post, i) => {
  const prev = N.posts[i + 1];
  const next = N.posts[i - 1];
  const pager = (p, rel, label) => (p ? `<a class="news-article__pager-link news-article__pager-link--${rel}" href="${X.postHref(p)}" rel="${rel}"><span class="news-article__pager-label">${label}</span>${p.title}</a>` : '');
  return {
    key: `news-${post.slug}`, file: X.postHref(post), title: post.title, post: true,
    description: post.summary,
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: post.title, lead: post.summary, trail: [home, newsCrumb, { label: post.title }] }),
        withSidebar: true,
        content: `<article class="news-article" aria-labelledby="page-title">
  <p class="news-article__meta">
    <span class="news-article__category">${X.categoryLabel(post.category)}</span>
    <span class="news-article__detail"><time datetime="${post.date}">${X.formatDate(post.date)}</time></span>
    <span class="news-article__detail">${post.school}</span>
  </p>
  <img class="news-article__image" src="images/${post.image.file}" width="800" height="600" alt="${post.image.alt}">
  <div class="prose news-article__body">
    ${post.body}
  </div>
  <nav class="news-article__pager" aria-label="More news">
    ${pager(next, 'next', 'Newer post')}
    ${pager(prev, 'prev', 'Older post')}
  </nav>
  <p class="news-article__back">${X.button(ctx, { label: 'All news', href: 'news.html', mod: 'secondary' })}</p>
</article>`,
        sidebar: `${X.sidebarNav(ctx, { title: 'Recent news', id: 'sidebar-news-title', items: N.posts.slice(0, 5).map((p) => ({ href: X.postHref(p), label: p.title, current: p === post })) })}
${X.contactInfo(ctx, { compact: true, headingId: 'sidebar-visit-title', withApply: true })}`,
        footerTop: X.ctaBanner(ctx, { title: 'Come see our classrooms', text: 'Schedule a tour in Eagan or Inver Grove Heights.' }),
      };
    },
  };
});

// One detail page per program (photo, short description, highlights, FAQ, sidebar).
const programPages = C.programs.map((program) => {
  const d = D[program.key];
  const title = program.title;
  const image = d.image || { file: `program-${program.key}-detail.svg`, alt: '' };
  return {
    key: `program-${program.key}`, file: d.file, title,
    description: d.description,
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title, lead: d.lead, trail: [home, programsCrumb, { label: title }] }),
        withSidebar: true,
        content: `<article class="program-detail">
  <img class="program-detail__image" src="images/${image.file}" width="1200" height="675" alt="${image.alt}">
  <p class="program-detail__age">${program.age}</p>
  <div class="prose">
    ${d.body}
  </div>
  <section class="program-detail__section" aria-labelledby="${program.key}-features-title">
    <h2 class="program-detail__heading" id="${program.key}-features-title">${d.featuresTitle}</h2>
    ${X.featureList(ctx, d.features, { mod: 'compact' })}
  </section>
  <section class="program-detail__section" aria-labelledby="${program.key}-faq-title">
    <h2 class="program-detail__heading" id="${program.key}-faq-title">${d.faqTitle}</h2>
    ${X.faqAccordion(ctx, d.faq, { id: program.key })}
  </section>
</article>`,
        sidebar: `${X.sidebarNav(ctx)}
${X.contactInfo(ctx, { compact: true, headingId: 'sidebar-visit-title', withApply: true })}`,
        footerTop: X.ctaBanner(ctx, { title: d.cta[0], text: d.cta[1] }),
      };
    },
  };
});

const pages = [
  {
    key: 'home', file: 'index.html', title: 'Montessori School and Child Care in Eagan and Inver Grove Heights, MN',
    description: 'Montessori education and child care for ages 6 weeks to 8 years at Eagan Montessori Academy South and Amazing Beginnings Montessori. NAEYC accredited, Parent Aware 4-star.',
    render(ctx) {
      return {
        hero: X.hero(ctx),
        highlighted: `<section class="highlights container" aria-labelledby="highlights-title">
    <h2 class="visually-hidden" id="highlights-title">Why families choose us</h2>
    ${X.featureList(ctx, C.highlights, { mod: 'highlights' })}
  </section>`,
        content: [
          section({ id: 'intro-title', body: X.mediaText(ctx, {
            id: 'intro-title', eyebrow: 'Our approach', title: 'Montessori and Creative Curriculum, together',
            body: '<p>Children learn at their own pace with hands-on Montessori materials, the Creative Curriculum and ideas from our talented teachers. We support social skills, emotional growth, coordination and early academics.</p>',
            list: ['NAEYC accredited', 'Parent Aware 4-star rating', 'Readers’ Choice Award, 2017–2024'],
            actions: X.button(ctx, { label: 'About us', href: 'about.html', mod: 'secondary' }),
            img: 'feature-classroom.svg', alt: 'A girl drawing at a table in a bright, calm room',
          }) }),
          section({ id: 'programs-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'programs-title', eyebrow: 'Programs', title: 'From 6 weeks to 8 years', text: 'Infant and toddler care, preschool, Pre-K, private Kindergarten and more.', center: true }),
            body: X.programGrid(ctx) + `\n<p class="section__actions">${X.button(ctx, { label: 'View all programs', href: 'programs.html', mod: 'secondary', iconName: 'arrow-right' })}</p>` }),
          section({ id: 'locations-title',
            heading: X.sectionHeading(ctx, { id: 'locations-title', eyebrow: 'Our schools', title: 'Two schools in the South Metro', text: 'Both schools offer the same programs and the same Montessori approach.', center: true }),
            body: X.locationGrid(ctx) }),
          section({ id: 'testimonials-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'testimonials-title', eyebrow: 'Families', title: 'What parents say', center: true }),
            body: `<div class="grid grid--3">\n${C.testimonials.map((t) => X.testimonial(ctx, t)).join('\n')}\n</div>` }),
          section({ id: 'gallery-title',
            heading: X.sectionHeading(ctx, { id: 'gallery-title', eyebrow: 'Gallery', title: 'A peek inside our schools', center: true }),
            body: X.galleryGrid(ctx, 6) + `\n<p class="section__actions">${X.button(ctx, { label: 'See the full gallery', href: 'gallery.html', mod: 'secondary', iconName: 'arrow-right' })}</p>` }),
          section({ id: 'news-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'news-title', eyebrow: 'News', title: 'Latest from our schools', center: true }),
            body: X.newsGrid(ctx, N.posts.slice(0, 3)) + `\n<p class="section__actions">${X.button(ctx, { label: 'All news', href: 'news.html', mod: 'secondary', iconName: 'arrow-right' })}</p>` }),
        ].join('\n'),
        footerTop: X.ctaBanner(ctx, { title: 'Come see our classrooms' }),
      };
    },
  },
  {
    key: 'programs', file: 'programs.html', title: 'Programs',
    description: 'Infant childcare, toddler, preschool Montessori, Pre-K & Kindergarten, Summer Bridge and Gifted, Talented & STEM programs in Eagan and Inver Grove Heights.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'Our programs', lead: 'Montessori education and child care for children from 6 weeks to 8 years.', trail: [home, { label: 'Programs' }] }),
        content: [
          section({ id: 'all-programs-title',
            heading: X.sectionHeading(ctx, { id: 'all-programs-title', eyebrow: 'At both schools', title: 'Find the right program', text: 'Is it daycare, child care or Montessori? All of these, and more.' }),
            body: X.programGrid(ctx, { withId: true }) }),
          section({ id: 'includes-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'includes-title', eyebrow: 'In every classroom', title: 'Every program includes', center: true }),
            body: X.featureList(ctx, C.programIncludes) }),
        ].join('\n'),
        footerTop: X.ctaBanner(ctx, { title: 'Not sure which program fits?', text: 'Tour a classroom and talk with our teachers. We are happy to help.' }),
      };
    },
  },
  ...programPages,
  {
    key: 'enrollment', file: 'enrollment.html', title: 'Enrollment',
    description: 'How to enroll at Eagan Montessori Academy South and Amazing Beginnings Montessori: tour, intake interview and enrollment form.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'Enrollment', lead: 'Fall 2026 registration is now open. Here is how to join us.', trail: [home, { label: 'Enrollment' }] }),
        content: [
          section({ id: 'steps-title',
            heading: X.sectionHeading(ctx, { id: 'steps-title', eyebrow: '4 simple steps', title: 'How to enroll', center: true }),
            body: X.enrollmentSteps(ctx) }),
          section({ id: 'tuition-title', mod: 'alt', body: X.mediaText(ctx, {
            id: 'tuition-title', eyebrow: 'Tuition', title: 'An affordable investment',
            body: '<p>Tuition depends on your child’s age group and schedule. Contact us for current rates and payment options.</p>',
            list: ['Full-time and part-time options', 'Enrollment priority for siblings', 'Eagan: now enrolling Infants &amp; Toddlers', 'Inver Grove Heights: now enrolling Toddlers &amp; Preschool'],
            actions: X.button(ctx, { label: 'Ask about tuition', href: 'contact.html', mod: 'primary' }), img: 'feature-tour.svg', alt: 'A family playing together on the floor', reverse: true,
          }) }),
          section({ id: 'enroll-faq-title',
            heading: X.sectionHeading(ctx, { id: 'enroll-faq-title', eyebrow: 'Questions', title: 'Enrollment questions', center: true }),
            body: `<div class="faq-wrap">${X.faqAccordion(ctx, C.faqEnrollment, { id: 'enroll' })}</div>` }),
        ].join('\n'),
        footerTop: X.ctaBanner(ctx, { title: 'Ready to take a tour?', text: 'Choose a school and we will find a time that works for you.' }),
      };
    },
  },
  {
    key: 'about', file: 'about.html', title: 'About Us',
    description: 'About Eagan Montessori Academy South and Amazing Beginnings Montessori: our Montessori method, history and staff.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'About us', lead: 'Two Montessori schools where parents, teachers and children learn together.', trail: [home, { label: 'About Us' }] }),
        content: [
          section({ id: 'story-title', body: X.mediaText(ctx, {
            id: 'story-title', eyebrow: 'Our story', title: 'A learning community for every family',
            body: '<p>We opened Amazing Beginnings Montessori in Inver Grove Heights in 2006 and Eagan Montessori Academy South in 2016. Our families come from many cultures and backgrounds, so children learn to work in diverse settings.</p><p>We believe children learn at their own pace, so we offer many ways to learn.</p>',
            img: 'feature-building.svg', alt: 'A playground with slides, surrounded by tall trees',
          }) }),
          section({ id: 'history-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'history-title', eyebrow: 'Since 2006', title: 'Our history' }),
            body: X.historyTimeline(ctx) }),
          section({ id: 'values-title',
            heading: X.sectionHeading(ctx, { id: 'values-title', eyebrow: 'Included', title: 'Special classes at no extra cost', text: 'Plus guest speakers who talk about what they do.', center: true }),
            body: X.featureList(ctx, C.extras) }),
          section({ id: 'staff-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'staff-title', eyebrow: 'Our team', title: 'Meet our leaders', text: 'Teachers trained in First Aid, CPR, SUIDS and Shaken Baby prevention.', center: true }),
            body: `<div class="grid grid--3">\n${C.staff.map((s, i) => X.staffCard(ctx, s, i)).join('\n')}\n</div>` }),
          section({ id: 'about-quote-title',
            heading: `<h2 class="visually-hidden" id="about-quote-title">A word from a parent</h2>`,
            body: `<div class="testimonial-single">${X.testimonial(ctx, C.testimonials[1])}</div>` }),
        ].join('\n'),
        footerTop: X.ctaBanner(ctx),
      };
    },
  },
  {
    key: 'gallery', file: 'gallery.html', title: 'Gallery',
    description: 'Photos of classrooms, outdoor play and events at our Montessori schools.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'Gallery', lead: 'A look at daily life in our classrooms and outdoor spaces.', trail: [home, { label: 'Gallery' }] }),
        content: section({ id: 'photos-title',
          heading: `<h2 class="visually-hidden" id="photos-title">Photos</h2>`,
          body: X.galleryGrid(ctx, 12) }),
        footerTop: X.ctaBanner(ctx, { title: 'See it in person', text: 'Photos are nice, but a visit is better. Schedule a tour today.' }),
      };
    },
  },
  {
    key: 'faq', file: 'faq.html', title: 'FAQ',
    description: 'Answers to common questions about Montessori, hours, locations, meals, enrollment and tuition.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'Frequently asked questions', lead: 'Quick answers about our schools, programs and enrollment.', trail: [home, { label: 'FAQ' }] }),
        content: [
          section({ id: 'faq-general-title',
            heading: X.sectionHeading(ctx, { id: 'faq-general-title', eyebrow: 'About our schools', title: 'General questions' }),
            body: `<div class="faq-wrap">${X.faqAccordion(ctx, C.faqGeneral, { id: 'general' })}</div>` }),
          section({ id: 'faq-enroll-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'faq-enroll-title', eyebrow: 'Joining us', title: 'Enrollment and tuition' }),
            body: `<div class="faq-wrap">${X.faqAccordion(ctx, C.faqEnrollment, { id: 'enrollment' })}</div>` }),
        ].join('\n'),
        footerTop: X.ctaBanner(ctx, { title: 'Still have questions?', text: 'Call either school or send us a message. We are happy to help.' }),
      };
    },
  },
  {
    key: 'news', file: 'news.html', title: 'News',
    description: 'News, events and parent tips from Eagan Montessori Academy South and Amazing Beginnings Montessori.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'News', lead: 'Events, classroom stories and tips for parents from both schools.', trail: [home, { label: 'News' }] }),
        content: section({ id: 'news-list-title',
          heading: `<h2 class="visually-hidden" id="news-list-title">All posts</h2>`,
          body: X.newsListing(ctx) }),
        footerTop: X.ctaBanner(ctx, { title: 'See it for yourself', text: 'Visit a classroom and meet our teachers. Schedule a tour today.' }),
      };
    },
  },
  ...postPages,
  {
    key: 'contact', file: 'contact.html', title: 'Contact &amp; Tour',
    description: 'Contact Eagan Montessori Academy South (Eagan) or Amazing Beginnings Montessori (Inver Grove Heights) and schedule a tour.',
    render(ctx) {
      return {
        hero: X.pageHeader(ctx, { title: 'Contact us &amp; tour', lead: 'Questions? Ready to visit? Choose a school and we will get right back to you.', trail: [home, { label: 'Contact &amp; Tour' }] }),
        content: [
          `<section class="section" aria-label="Contact form and details">
  <div class="container">
    <div class="contact-layout">
      ${X.contactForm(ctx)}
      ${X.contactInfo(ctx)}
    </div>
  </div>
</section>`,
          section({ id: 'map-title', mod: 'flush',
            heading: `<h2 class="visually-hidden" id="map-title">Maps of our schools</h2>`,
            body: X.locationMap(ctx) }),
          section({ id: 'areas-title', mod: 'alt',
            heading: X.sectionHeading(ctx, { id: 'areas-title', eyebrow: 'Areas we serve', title: 'Close to home', text: 'Convenient to Eagan, Inver Grove Heights, Apple Valley, Burnsville, Rosemount, South St. Paul and West St. Paul.', center: true }),
            body: X.locationGrid(ctx) }),
        ].join('\n'),
        footerTop: X.ctaBanner(ctx, { title: 'Ready to apply?', text: 'Tour first, then we will guide you through enrollment.' }),
      };
    },
  },
];

module.exports = { pages };
