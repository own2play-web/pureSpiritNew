/**
 * migrate-nieuws.js
 * Converts WordPress JSON export to Astro content collection Markdown files.
 * Usage: node scripts/migrate-nieuws.js <path-to-json>
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'src', 'content', 'nieuws');

// ── HTML entity decoder ──────────────────────────────────────────────────────
function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&hellip;/g, '…')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

// ── HTML → Markdown converter (handles typical WP output) ───────────────────
function htmlToMarkdown(html) {
  let md = html;

  // Remove WP block comments
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `# ${strip(t)}\n\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `## ${strip(t)}\n\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `### ${strip(t)}\n\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, t) => `#### ${strip(t)}\n\n`);

  // Inline formatting
  md = md.replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em>([\s\S]*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i>([\s\S]*?)<\/i>/gi, '*$1*');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Line breaks inside paragraphs
  md = md.replace(/<br\s*\/?>/gi, '\n');

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, inner) =>
    inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => `- ${strip(item).trim()}\n`) + '\n'
  );

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner) => {
    let i = 0;
    return inner.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => `${++i}. ${strip(item).trim()}\n`) + '\n';
  });

  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) =>
    inner.split('\n').map(l => `> ${l}`).join('\n') + '\n\n'
  );

  // Paragraphs → double newline
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

  // Divs
  md = md.replace(/<\/?div[^>]*>/gi, '\n');

  // Strip remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode entities
  md = decodeEntities(md);

  // Collapse 3+ blank lines to 2
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

function strip(html) {
  return html.replace(/<[^>]+>/g, '');
}

// ── Extract plain-text excerpt ───────────────────────────────────────────────
function extractSamenvatting(excerptHtml, contentHtml, maxLen = 220) {
  const source = excerptHtml || contentHtml || '';
  let text = source
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  text = decodeEntities(text);
  // Remove trailing WordPress "…" continuation noise
  text = text.replace(/\s*\[…\]\s*$/, '').replace(/\s*&hellip;\s*$/, '').trim();
  if (text.length > maxLen) {
    text = text.slice(0, maxLen).replace(/\s\S*$/, '') + '…';
  }
  return text || 'Nieuws van Pure Spirit.';
}

// ── Category extraction ──────────────────────────────────────────────────────
const CATEGORY_MAP = {
  'bachbloesem': 'Bachbloesem',
  'cursus': 'Cursus',
  'meditatie': 'Meditatie',
  'coaching': 'Coaching',
  'hsp': 'HSP',
  'jongeren': 'Jongeren',
  'kinderen': 'Kinderen',
  'workshop': 'Workshop',
  'lezing': 'Lezing',
  'beurs': 'Beurs',
  'actie': 'Actie',
  'consult': 'Consult',
  'diversen': 'Diversen',
  'gratis-proefles': 'Gratis proefles',
  'nieuw-programma': 'Nieuw programma',
  'persoonlijke-ontwikkeling': 'Persoonlijke ontwikkeling',
  'summerschool': 'Summerschool',
  'vakantie': 'Vakantie',
  'volwassenen': 'Volwassenen',
};

function extractCategory(classList) {
  const catClass = (classList || []).find(
    c => c.startsWith('category-') && c !== 'category-geen-categorie'
  );
  if (!catClass) return null;
  const key = catClass.replace('category-', '');
  return CATEGORY_MAP[key] ?? (key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' '));
}

// ── YAML value escaper ───────────────────────────────────────────────────────
function yamlStr(s) {
  // Use double-quoted YAML string; escape backslash and double-quote
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// ── Build Markdown file content ──────────────────────────────────────────────
function buildMarkdown(post) {
  const titel = decodeEntities(post.title?.rendered ?? '');
  const datum = post.date.slice(0, 10); // YYYY-MM-DD
  const categorie = extractCategory(post.class_list);
  const samenvatting = extractSamenvatting(post.excerpt?.rendered, post.content?.rendered);
  const body = htmlToMarkdown(post.content?.rendered ?? '');

  const lines = [
    '---',
    `titel: ${yamlStr(titel)}`,
    `datum: ${yamlStr(datum)}`,
  ];
  if (categorie) lines.push(`categorie: ${yamlStr(categorie)}`);
  lines.push(`samenvatting: ${yamlStr(samenvatting)}`);
  lines.push('auteur: "Sasja van Geel"');
  lines.push('---');
  lines.push('');
  lines.push(body);
  lines.push('');

  return lines.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────
const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error('Usage: node scripts/migrate-nieuws.js <path-to-json>');
  process.exit(1);
}

const posts = JSON.parse(readFileSync(jsonPath, 'utf8'));
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

let written = 0;
let skipped = 0;

for (const post of posts) {
  if (post.status !== 'publish') { skipped++; continue; }

  const slug = post.slug;
  if (!slug) { skipped++; continue; }

  const outPath = join(OUTPUT_DIR, `${slug}.md`);
  const content = buildMarkdown(post);
  writeFileSync(outPath, content, 'utf8');
  written++;
}

console.log(`Done. Written: ${written} files, skipped: ${skipped}`);
console.log(`Output dir: ${OUTPUT_DIR}`);
