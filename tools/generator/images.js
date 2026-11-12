// Local SVG placeholders that show purpose and size.
const C = require('./content');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function placeholder({ w, h, name, note = '' }, ph) {
  const s = Math.min(w, h);
  const size = `${w} × ${h}`;
  const longest = Math.max(name.length, note.length * 0.75, size.length);
  const fs1 = Math.round(Math.min(s * 0.075, (w * 0.8) / (longest * 0.58)));
  const fs2 = Math.round(fs1 * 0.72);
  const fs3 = Math.round(fs1 * 0.6);
  const cx = w / 2;
  const cy = h / 2;
  const ic = Math.round(fs1 * 2.2);
  const iconY = cy - fs1 * 2.1 - (note ? fs3 * 0.6 : 0);
  const panelW = Math.round(longest * fs1 * 0.6 + fs1 * 1.6);
  const panelH = Math.round(ic + fs1 * 1.4 + fs2 * 1.5 + (note ? fs3 * 1.6 : 0) + fs1 * 1.4);
  const panelY = Math.round(iconY - ic / 2 - fs1 * 0.7);
  const textY = iconY + ic / 2 + fs1 * 1.35;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <title>${esc(name)} (${size})${note ? ': ' + esc(note) : ''}</title>
  <defs>
    <pattern id="stripes" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="36" height="36" fill="${ph.bg}"/>
      <rect width="18" height="36" fill="${ph.bg2}"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#stripes)"/>
  <rect x="${Math.round(s * 0.02)}" y="${Math.round(s * 0.02)}" width="${w - Math.round(s * 0.04)}" height="${h - Math.round(s * 0.04)}" fill="none" stroke="${ph.fg}" stroke-opacity="0.3" stroke-width="${Math.max(2, Math.round(s * 0.005))}" stroke-dasharray="${Math.round(s * 0.03)} ${Math.round(s * 0.02)}"/>
  <rect x="${Math.round(cx - panelW / 2)}" y="${panelY}" width="${panelW}" height="${panelH}" rx="${Math.round(fs1 * 0.6)}" fill="#ffffff" fill-opacity="0.72"/>
  <g transform="translate(${Math.round(cx - ic / 2)} ${Math.round(iconY - ic / 2)}) scale(${(ic / 24).toFixed(3)})" fill="none" stroke="${ph.fg}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2"/>
    <circle cx="8.5" cy="9" r="2"/>
    <polyline points="21 16 15.5 10.5 5 21"/>
  </g>
  <text x="${cx}" y="${Math.round(textY)}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" font-size="${fs1}" font-weight="700" fill="${ph.fg}">${esc(name)}</text>
  <text x="${cx}" y="${Math.round(textY + fs2 * 1.45)}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" font-size="${fs2}" fill="${ph.fg}">${size}</text>
  ${note ? `<text x="${cx}" y="${Math.round(textY + fs2 * 1.45 + fs3 * 1.55)}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" font-size="${fs3}" font-style="italic" fill="${ph.fg}">${esc(note)}</text>` : ''}
</svg>
`;
}

function favicon(opt) {
  if (opt === 'a') return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#b84667"/><path d="M24 35s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 34 22c0 6.8-10 13-10 13z" fill="#fff"/></svg>\n';
  if (opt === 'b') return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="4" fill="#b84667"/><text x="24" y="31" text-anchor="middle" font-family="system-ui, Arial, sans-serif" font-weight="700" font-size="19" fill="#fff">EM</text></svg>\n';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#4f6b4f"/><path d="M24 11c9 5 10.5 15 0 26-10.5-11-9-21 0-26z" fill="#fff"/><path d="M24 17v18" stroke="#4f6b4f" stroke-width="2" stroke-linecap="round"/></svg>\n';
}

function imageList(opt) {
  const list = [
    { file: 'hero-home.svg', w: opt.heroImg.w, h: opt.heroImg.h, name: 'Hero image', note: 'Children learning together' },
    { file: 'feature-classroom.svg', w: 800, h: 600, name: 'Classroom photo', note: 'Bright Montessori classroom' },
    { file: 'feature-building.svg', w: 800, h: 600, name: 'School building', note: 'Front of the school' },
    { file: 'feature-tour.svg', w: 800, h: 600, name: 'Family tour photo', note: 'Parents visiting a classroom' },
    { file: 'infant-detail.svg', w: 1200, h: 675, name: 'Infant room photo', note: 'Teacher with a baby' },
  ];
  const programNotes = { infant: 'Infant room', toddler: 'Toddlers at play', preschool: 'Preschool materials', prek: 'Pre-K learning', summer: 'Summer outdoor fun', other: 'Music or nature class' };
  C.programs.forEach((p) => list.push({ file: `program-${p.key}.svg`, w: 800, h: 600, name: 'Program photo', note: programNotes[p.key] }));
  C.programs.filter((p) => p.key !== 'infant').forEach((p) => list.push({ file: `program-${p.key}-detail.svg`, w: 1200, h: 675, name: 'Program detail photo', note: programNotes[p.key] }));
  C.staff.forEach((s, i) => list.push({ file: `staff-${i + 1}.svg`, w: 400, h: 400, name: 'Staff portrait', note: s.role.replace('&amp;', '&') }));
  C.locations.forEach((l) => list.push({ file: `location-${l.key}.svg`, w: 800, h: 450, name: 'School building', note: l.name }));
  C.gallery.forEach((g, i) => list.push({ file: `gallery-${i + 1}.svg`, w: 800, h: 600, name: 'Gallery photo', note: g.caption }));
  return list;
}

module.exports = { placeholder, favicon, imageList };
