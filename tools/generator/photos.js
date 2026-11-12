// Sample photos (CC0 from StockSnap via Openverse), cropped to each slot's exact size.
// fx/fy = focal point (0..1) used when cropping.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const PHOTO_DIR = path.join(__dirname, 'photos');
const picks = JSON.parse(fs.readFileSync(path.join(PHOTO_DIR, 'picks.json'), 'utf8'));

const focal = {
  'hero-home': { fx: 0.42, fy: 0.5 },
  'program-infant': { fy: 0.35 },
  'program-toddler': { fy: 0.12 },
  'program-toddler-detail': { fy: 0.1 },
  'program-infant-detail': { fy: 0.3 },
  'staff-1': { fx: 0.78, fy: 0.3 },
  'staff-2': { fx: 0.5, fy: 0.25 },
  'staff-3': { fx: 0.32, fy: 0.3 },
  'staff-4': { fx: 0.5, fy: 0.25 },
  'gallery-7': { fy: 0.6 },
};

const size = (file) => {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file]).toString();
  return { W: +out.match(/pixelWidth: (\d+)/)[1], H: +out.match(/pixelHeight: (\d+)/)[1] };
};

// Cover-crop the source to exactly w x h and save as JPEG.
function makePhoto(key, w, h, outFile) {
  const p = picks[key] || picks[key.replace(/-detail$/, '')]; // detail images reuse the card photo
  if (!p || key.startsWith('staff-')) return false; // real staff names: keep labeled placeholders, not strangers' faces
  const src = path.join(PHOTO_DIR, 'orig', `${p.idx}.jpg`);
  const { W, H } = size(src);
  const s = Math.max(w / W, h / H);
  const nw = Math.max(w, Math.round(W * s));
  const nh = Math.max(h, Math.round(H * s));
  const f = { fx: 0.5, fy: 0.5, ...(focal[key] || {}) };
  const oy = Math.round((nh - h) * f.fy);
  const ox = Math.round((nw - w) * f.fx);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '78', '-z', String(nh), String(nw), src, '--out', outFile], { stdio: 'ignore' });
  execFileSync('sips', ['-c', String(h), String(w), '--cropOffset', String(oy), String(ox), outFile], { stdio: 'ignore' });
  return true;
}

function credits() {
  const rows = Object.entries(picks).filter(([k]) => !k.startsWith('staff-')).map(([k, p]) => `| \`${k}.jpg\` | ${unescape(p.creator)} | [StockSnap](${p.foreign_landing_url}) | CC0 |`);
  return `# Photo credits

Sample photos for the design demo only. All are **CC0 (public domain)** from [StockSnap](https://stocksnap.io),
found through [Openverse](https://openverse.org). No attribution is required, but it is listed here for reference.

Replace these with the school's own photos (with parent permission) before launch.
The labeled SVG versions in \`placeholders/\` show the exact size each slot needs.

| File | Photographer | Source | License |
|---|---|---|---|
${rows.join('\n')}
`;
}

module.exports = { picks, makePhoto, credits };
