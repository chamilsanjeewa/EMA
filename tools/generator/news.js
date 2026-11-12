// Sample news / blog posts (newest first). Short placeholder copy: the school will replace these with real posts.
// Images reuse existing local photos (800 × 600).
module.exports = {
  categories: [
    { key: 'announcements', label: 'Announcements' },
    { key: 'events', label: 'Events' },
    { key: 'classroom', label: 'In the classroom' },
    { key: 'tips', label: 'Parent tips' },
  ],

  posts: [
    {
      slug: 'fall-harvest-week', date: '2026-10-20', category: 'events', school: 'Both schools',
      title: 'Fall harvest week in our classrooms',
      summary: 'Apple tasting, leaf art and pumpkin math filled a busy and colorful week.',
      image: { file: 'gallery-7.svg', alt: 'A child watering plants in a garden bed' },
      body: `<p>Every October we bring the season into the classroom. This year children tasted five kinds of apples, made leaf rubbings and counted pumpkin seeds.</p>
    <h2>Learning through the senses</h2>
    <p>Montessori learning starts with the senses. Smelling, touching and sorting real fall items helps children build words and early math skills.</p>
    <ul>
      <li>Toddlers sorted leaves by color and size.</li>
      <li>Preschool children weighed and measured pumpkins.</li>
      <li>Kindergarten wrote short stories about the seasons.</li>
    </ul>
    <p>Thank you to all the families who sent in apples and gourds!</p>`,
    },
    {
      slug: 'first-day-tips', date: '2026-09-15', category: 'tips', school: 'Both schools',
      title: 'Five tips for a happy first day',
      summary: 'Simple ways to help your child feel calm and ready for a new classroom.',
      image: { file: 'gallery-3.svg', alt: 'An adult reading a picture book with a young child' },
      body: `<p>Starting school is a big step for children and parents. These small habits can make the first weeks easier.</p>
    <ol>
      <li><strong>Visit together first.</strong> A short visit helps the room feel familiar.</li>
      <li><strong>Read about school.</strong> Picture books about school start good conversations.</li>
      <li><strong>Keep goodbyes short.</strong> A hug, a smile and a clear “see you later” work best.</li>
      <li><strong>Bring a comfort item.</strong> A family photo or small blanket can help.</li>
      <li><strong>Keep a routine.</strong> Regular sleep and meal times help children settle in.</li>
    </ol>
    <p>Our teachers are happy to share how your child’s day went at pick-up.</p>`,
    },
    {
      slug: 'fall-registration-open', date: '2026-08-12', category: 'announcements', school: 'Both schools',
      title: 'Fall 2026 registration is open',
      summary: 'Spots are open for infants, toddlers and preschool. Tour first, then apply.',
      image: { file: 'feature-tour.svg', alt: 'A family playing together on the floor' },
      body: `<p>Registration for fall 2026 is now open at both schools. Some programs fill quickly, so we encourage families to tour early.</p>
    <h2>Now enrolling</h2>
    <ul>
      <li><strong>Eagan:</strong> Infants and Toddlers</li>
      <li><strong>Inver Grove Heights:</strong> Toddlers and Preschool</li>
    </ul>
    <h2>How to start</h2>
    <p>Schedule a tour, choose a start date, meet with us for a short intake interview and fill out the enrollment form. Siblings get enrollment priority.</p>`,
    },
    {
      slug: 'summer-bridge-field-trips', date: '2026-07-08', category: 'events', school: 'Both schools',
      title: 'Summer Bridge: a week of in-school field trips',
      summary: 'Animals, science shows and music came to us, so children could explore without the bus.',
      image: { file: 'gallery-2.svg', alt: 'Children laughing on the playground swings' },
      body: `<p>Our Summer Bridge program keeps learning fun all summer long. In July, special guests visited our schools each day.</p>
    <ul>
      <li>A visit from friendly farm animals</li>
      <li>A hands-on science show with bubbles and slime</li>
      <li>A music and movement morning</li>
    </ul>
    <p>In-school field trips mean more time for play and learning, and less time on the road.</p>`,
    },
    {
      slug: 'real-words-with-toddlers', date: '2026-06-03', category: 'classroom', school: 'Both schools',
      title: 'Why we use real words with toddlers',
      summary: 'Toddlers can learn big words. Here is how our teachers build vocabulary every day.',
      image: { file: 'gallery-9.svg', alt: 'A small group reading a book together on the floor' },
      body: `<p>In our toddler rooms, teachers use real names for things instead of baby talk. A “dog” is a dog, and a “digger” is an excavator.</p>
    <h2>Why it matters</h2>
    <p>Young children soak up language. When they hear rich, clear words, their vocabulary grows quickly and they learn to express their needs.</p>
    <h2>Try it at home</h2>
    <ul>
      <li>Name what you see on walks and at the store.</li>
      <li>Read a book together every day.</li>
      <li>Give your child time to answer before you help.</li>
    </ul>`,
    },
    {
      slug: 'readers-choice-award', date: '2026-04-22', category: 'announcements', school: 'Eagan Montessori Academy South',
      title: 'Eight years of Readers’ Choice Awards',
      summary: 'Looking back on eight years of awards voted by local families.',
      image: { file: 'gallery-12.svg', alt: 'A family running and laughing together in the park' },
      body: `<p>We are proud to have won the Readers’ Choice Award every year from 2017 to 2024. This award comes from the votes of local families, so it means a lot to our teachers.</p>
    <p>Thank you to every parent who voted, shared a review or told a friend about us. We look forward to many more years of learning together.</p>`,
    },
  ],
};
