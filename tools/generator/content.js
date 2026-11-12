// Client content (from montessorikidscare.com, rewritten short). "&amp;" is pre-escaped for HTML.
module.exports = {
  site: {
    name: 'Eagan Montessori Academy &amp; Amazing Beginnings Montessori',
    nameLine1: 'Eagan Montessori Academy',
    nameLine2: '&amp; Amazing Beginnings Montessori',
    hoursShort: 'Mon – Fri, 6:30am – 6pm',
    applyHref: '#',
    areas: ['Eagan', 'Inver Grove Heights', 'Apple Valley', 'Burnsville', 'Rosemount', 'South St. Paul', 'West St. Paul'],
  },

  locations: [
    {
      key: 'emas',
      name: 'Eagan Montessori Academy South',
      short: 'Eagan',
      street: '1970 Rahncliff Court',
      city: 'Eagan, MN 55122',
      phone: '(651) 788-7318',
      phoneHref: 'tel:+16517887318',
      email: '',
      mapsHref: 'https://www.google.com/maps/search/?api=1&amp;query=1970+Rahncliff+Court+Eagan+MN+55122',
      enrolling: 'Now enrolling: Infants &amp; Toddlers',
      note: 'Readers’ Choice Award winner, 2017–2024.',
      serves: 'Eagan, Rosemount, Burnsville and Apple Valley. On the 35E route for Lakeville and Farmington commuters.',
    },
    {
      key: 'ab',
      name: 'Amazing Beginnings Montessori',
      short: 'Inver Grove Heights',
      street: '3105 65th St. East',
      city: 'Inver Grove Heights, MN 55076',
      phone: '(651) 451-4433',
      phoneHref: 'tel:+16514514433',
      email: 'ighkids@gmail.com',
      mapsHref: 'https://www.google.com/maps/search/?api=1&amp;query=3105+65th+St+East+Inver+Grove+Heights+MN+55076',
      enrolling: 'Now enrolling: Toddlers &amp; Preschool',
      note: 'The first Montessori school in Inver Grove Heights.',
      serves: 'Inver Grove Heights, South St. Paul, Sunfish Lake, West St. Paul and Cottage Grove.',
    },
  ],

  menu: [
    { label: 'About Us', href: 'about.html', key: 'about' },
    { label: 'Programs', href: 'programs.html', key: 'programs', children: true },
    { label: 'Enrollment', href: 'enrollment.html', key: 'enrollment' },
    { label: 'Gallery', href: 'gallery.html', key: 'gallery' },
    { label: 'FAQ', href: 'faq.html', key: 'faq' },
    { label: 'News', href: 'news.html', key: 'news' },
    { label: 'Contact &amp; Tour', href: 'contact.html', key: 'contact' },
  ],

  programs: [
    { key: 'infant', title: 'Infant Childcare', age: '6 weeks – 16 months', icon: 'heart', href: 'program-infant-care.html',
      text: 'Small classrooms grouped by stage, from newborn to first steps.' },
    { key: 'toddler', title: 'Toddler Program', age: '16 – 33 months', icon: 'smile', href: 'program-toddler.html',
      text: 'A language-rich room that builds independence and friendships.' },
    { key: 'preschool', title: 'Preschool Montessori', age: '33 months – 4½ years', icon: 'book', href: 'program-preschool.html',
      text: 'Practical life, language, math, science, geography, art and music.' },
    { key: 'prek', title: 'Pre-K &amp; Kindergarten', age: 'Pre-K and private Kindergarten', icon: 'star', href: 'program-pre-k-kindergarten.html',
      text: 'Year-round private Kindergarten with phonics, math and world cultures.' },
    { key: 'summer', title: 'Summer Bridge', age: 'Up to 3rd grade', icon: 'sun', href: 'program-summer-bridge.html',
      text: 'Summer learning, creative projects and in-school field trips.' },
    { key: 'other', title: 'Gifted, Talented &amp; STEM', age: 'School-age prep', icon: 'leaf', href: 'program-gifted-talented-stem.html',
      text: 'Prep for Gifted &amp; Talented and STEM programs in the Twin Cities.' },
  ],

  highlights: [
    { icon: 'star', title: 'NAEYC accredited', text: 'Accredited by the National Association for the Education of Young Children.' },
    { icon: 'shield', title: 'Parent Aware 4-star', text: 'Minnesota’s highest rating for a preschool.' },
    { icon: 'music', title: 'Extra classes, no extra cost', text: 'Music, Spanish, sign language, yoga and dance.' },
    { icon: 'clock', title: 'Open 6:30am – 6pm', text: 'Monday to Friday, 12 months a year.' },
  ],

  programIncludes: [
    { icon: 'book', title: 'Montessori + Creative Curriculum', text: 'Hands-on Montessori materials plus the Creative Curriculum.' },
    { icon: 'star', title: 'S.M.A.R.T. program', text: 'A multi-sensory readiness program we add to the Montessori day.' },
    { icon: 'music', title: 'Special classes', text: 'Music, Spanish, sign language, yoga, dance and science projects.' },
    { icon: 'message', title: 'Family updates', text: 'Daily notes, monthly newsletters and conferences twice a year.' },
  ],

  infantFeatures: [
    { icon: 'users', title: '1:4 staff ratio', text: 'In every infant classroom, with small groups by stage.' },
    { icon: 'message', title: 'Daily journal', text: 'Photos, notes and moments from your baby’s day.' },
    { icon: 'music', title: 'Sign language &amp; music', text: 'Sign language from 6 months, music class from 12 months.' },
  ],

  extras: [
    { icon: 'music', title: 'Music', text: 'Taught by a professional music teacher.' },
    { icon: 'message', title: 'Spanish', text: 'Early exposure to a second language.' },
    { icon: 'smile', title: 'Sign language', text: 'Starts in the infant rooms at 6 months.' },
    { icon: 'heart', title: 'Yoga &amp; dance', text: 'Movement, balance and fun.' },
    { icon: 'leaf', title: 'Science projects', text: 'Hands-on experiments and nature study.' },
    { icon: 'star', title: 'S.M.A.R.T.', text: 'Stimulating Maturity through Accelerated Readiness Training.' },
  ],

  testimonials: [
    { quote: 'My son is in the infant room and it gives me peace of mind to know how well the staff care for him.', name: 'Jennifer R.', role: 'Amazing Beginnings parent' },
    { quote: 'The teachers are loving and kind and the curriculum is amazing.', name: 'Candice L.', role: 'Eagan Montessori Academy South parent' },
    { quote: 'My children love Amazing Beginnings. The staff is wonderful and caring.', name: 'Jen L.', role: 'Amazing Beginnings parent' },
  ],

  timeline: [
    { year: '2006', title: 'Amazing Beginnings opens', text: 'The first Montessori school in Inver Grove Heights.' },
    { year: '2016', title: 'Eagan Montessori Academy South opens', text: 'Our school on Rahncliff Court in Eagan.' },
    { year: '2017 – 2024', title: 'Readers’ Choice Award', text: 'Voted a best Montessori school eight years in a row.' },
    { year: 'Today', title: 'Two schools, one family', text: 'NAEYC accredited, with a Parent Aware 4-star rating.' },
  ],

  staff: [
    { name: 'Ms. Ann Gilman', role: 'Administrator &amp; CEO', bio: 'Leads both schools. Grew up attending Montessori school herself.' },
    { name: 'Ms. Ruchika Verma', role: 'Regional Director', bio: '25+ years of teaching, including many years as lead Kindergarten teacher.' },
    { name: 'Ms. Rajbir Kaur', role: 'Assistant Director, EMAS', bio: 'Also the lead teacher of our Preschool 2 classroom.' },
  ],

  steps: [
    { title: 'Contact us &amp; tour', text: 'Call or send a message. We will set up a visit at the school you choose.', action: { label: 'Schedule a tour', href: 'contact.html' } },
    { title: 'Choose a start date', text: 'Call us with the date you would like your child to start.', action: { label: 'Apply Now', href: '#' } },
    { title: 'Intake interview', text: 'A 20-minute meeting about schedules, policies and the school calendar.' },
    { title: 'Enrollment form', text: 'Fill out the enrollment form and get ready for the first day!' },
  ],

  gallery: [
    { caption: 'Art time', alt: 'A girl drawing with colored pencils at a table' },
    { caption: 'Outdoor play', alt: 'Children laughing on the playground swings' },
    { caption: 'Story time', alt: 'An adult reading a picture book with a young child' },
    { caption: 'Practical life', alt: 'A child helping to prepare food in the kitchen' },
    { caption: 'Music and movement', alt: 'An adult and a toddler stretching together on a mat' },
    { caption: 'Snack time', alt: 'Children sharing a healthy snack at a table' },
    { caption: 'Garden', alt: 'A child watering plants in a garden bed' },
    { caption: 'Puzzles and games', alt: 'A child putting a puzzle together on the floor' },
    { caption: 'Reading together', alt: 'A small group reading a book together on the floor' },
    { caption: 'Building blocks', alt: 'A child building with colorful toy blocks' },
    { caption: 'Teddy bear time', alt: 'A baby sitting on the grass next to a big teddy bear' },
    { caption: 'Family event', alt: 'A family running and laughing together in the park' },
  ],

  faqGeneral: [
    { q: 'What is Montessori education?', a: 'A child-centered approach where children learn by doing. They choose hands-on activities and work at their own pace in a carefully prepared classroom.' },
    { q: 'What ages do you care for?', a: 'Children from 6 weeks to 8 years: infants, toddlers, preschool, Pre-K, private Kindergarten and Summer Bridge.' },
    { q: 'What are your hours?', a: 'We are open 6:30am to 6pm, Monday to Friday, 12 months a year, except for announced holidays.' },
    { q: 'Where are you located?', a: 'Eagan Montessori Academy South is at 1970 Rahncliff Court, Eagan. Amazing Beginnings Montessori is at 3105 65th St. East, Inver Grove Heights.' },
    { q: 'Are you accredited or rated?', a: 'We are NAEYC accredited and have a four-star rating from Parent Aware, Minnesota’s top preschool rating.' },
    { q: 'Do you serve meals and snacks?', a: 'Yes. Hot lunches are catered by CKC Good Food, and we serve snacks every day. You may also send your own lunch.' },
    { q: 'How do you keep children safe?', a: 'The main entrance has a coded entry system, and all staff are trained in CPR and First Aid.' },
  ],

  faqEnrollment: [
    { q: 'How do I sign up my child?', a: 'Call us or send a message. We will set up a tour and walk you through the next steps.' },
    { q: 'What happens after the tour?', a: 'Call us with your start date. We then meet for a short intake interview and you fill out the enrollment form.' },
    { q: 'How much is tuition?', a: 'Tuition depends on age group and schedule. Full-time and part-time options are available. Contact us for details.' },
    { q: 'Is there a waitlist?', a: 'Some programs may have a waitlist. We encourage early applications and will keep you updated.' },
    { q: 'Do siblings get priority?', a: 'Yes, we give enrollment priority to siblings.' },
  ],

  faqInfant: [
    { q: 'How are the infant rooms organized?', a: 'Babies are grouped by stage: a room for the youngest (6 weeks to crawling), a crawling room, and a room that prepares for toddler class.' },
    { q: 'How do you handle naps?', a: 'Infants follow their own individual sleep schedules.' },
    { q: 'How will I know how my baby’s day went?', a: 'You get a daily journal with photos and notes, plus a monthly newsletter.' },
    { q: 'Is part-time infant care available?', a: 'Yes. Both full-time and part-time infant care are available.' },
  ],
};
