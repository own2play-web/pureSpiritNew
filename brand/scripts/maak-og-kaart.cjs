// Maakt de social-preview kaart (1200x630) opnieuw: logo + koptekst in Raleway.
//
// Gebruik (vanuit de projectmap):
//   npm install --no-save opentype.js
//   node brand/scripts/maak-og-kaart.cjs public/uploads/og-pure-spirit.png
//
// Tekst wordt met opentype.js omgezet naar paden, zodat de uitkomst niet van
// geïnstalleerde lettertypen afhangt. Pas de teksten en kleuren hieronder aan.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const opentype = require('opentype.js');
const sharp = require('sharp');

const out = process.argv[2] || path.join(root, 'brand', 'og-pure-spirit.png');
const logoFile = path.join(root, 'brand', 'logo', 'pure-spirit-logo-teal-246482.png');
const fontDir = path.join(root, 'brand', 'fonts', 'Raleway');

const TEKST = { kop1: 'Vind je eigen', kop2: 'kracht', sub1: 'Bachbloesemtherapie, meditatie', sub2: 'en HSP-begeleiding in Oss' };
const KLEUR = { achtergrond: '#f4edd9', balk: '#246482', kop: '#1a4a61', lijn: '#c99a3f', tekst: '#1e2f38' };

const laad = f => { const b = fs.readFileSync(path.join(fontDir, f)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const semi = laad('Raleway-SemiBold.ttf');
const reg = laad('Raleway-Regular.ttf');

const pad = (f, str, x, y, size, fill) => `<path d="${f.getPath(str, x, y, size).toPathData(2)}" fill="${fill}"/>`;

const TX = 600;
const delen = [
  `<rect width="1200" height="630" fill="${KLEUR.achtergrond}"/>`,
  `<rect width="1200" height="14" fill="${KLEUR.balk}"/>`,
  pad(semi, TEKST.kop1, TX, 268, 84, KLEUR.kop),
  pad(semi, TEKST.kop2, TX, 362, 84, KLEUR.kop),
  `<rect x="${TX}" y="398" width="100" height="5" fill="${KLEUR.lijn}"/>`,
  pad(reg, TEKST.sub1, TX, 458, 31, KLEUR.tekst),
  pad(reg, TEKST.sub2, TX, 500, 31, KLEUR.tekst),
];

(async () => {
  const logo = await sharp(logoFile).resize({ height: 440 }).toBuffer();
  const lm = await sharp(logo).metadata();
  const info = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${delen.join('')}</svg>`))
    .composite([{ input: logo, left: Math.round((TX - 40 - lm.width) / 2) + 20, top: Math.round((630 - 14 - lm.height) / 2) + 14 }])
    .png().toFile(out);
  console.log(`${out}: ${info.width}x${info.height}, ${info.size} bytes`);
})();
