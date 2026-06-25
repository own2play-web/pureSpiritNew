/**
 * migrate-ervaringen.js
 * Converteert src/data/ervaringen.json naar individuele MD-bestanden
 * in src/content/ervaringen/.
 * Usage: node scripts/migrate-ervaringen.js
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INPUT  = join(ROOT, 'src', 'data', 'ervaringen.json');
const OUTPUT = join(ROOT, 'src', 'content', 'ervaringen');

if (!existsSync(OUTPUT)) mkdirSync(OUTPUT, { recursive: true });

const { items } = JSON.parse(readFileSync(INPUT, 'utf8'));

function yamlStr(s) {
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
}

items.forEach((item, i) => {
  const num    = String(i + 1).padStart(3, '0');
  const slug   = `ervaring-${num}`;
  // Eerste 8 uitgelicht voor homepage
  const featured = i < 8;
  const lines = [
    '---',
    `quote:      ${yamlStr(item.quote)}`,
    item.author ? `auteur:     ${yamlStr(item.author)}` : null,
    item.service ? `dienst:     ${yamlStr(item.service)}` : null,
    `uitgelicht: ${featured}`,
    `volgorde:   ${i + 1}`,
    '---',
    '',
  ].filter(l => l !== null);

  writeFileSync(join(OUTPUT, `${slug}.md`), lines.join('\n'), 'utf8');
});

console.log(`Klaar — ${items.length} ervaringen geschreven naar ${OUTPUT}`);
