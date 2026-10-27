import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { archiefSlugs } from './src/lib/nieuwsArchief.ts';

// Archief-nieuwsberichten (zie src/lib/nieuwsArchief.ts) horen niet in de
// sitemap, ze staan op noindex. De config kan geen content collection laden,
// dus titel en datum worden direct uit de bestanden gelezen.
const nieuwMap = new URL('./src/content/nieuws/', import.meta.url);
const berichten = readdirSync(nieuwMap)
  .filter(f => f.endsWith('.md'))
  .map(f => {
    const kop = readFileSync(new URL(f, nieuwMap), 'utf8').replace(/\r\n/g, '\n').split('\n---')[0];
    const veld = naam => (kop.match(new RegExp(`^${naam}:\\s*"?([^"\\n]*)"?\\s*$`, 'm')) || [])[1] ?? '';
    return { slug: f.replace(/\.md$/, ''), titel: veld('titel'), datum: veld('datum') };
  });
const archief = archiefSlugs(berichten);

export default defineConfig({
  integrations: [mdx(), sitemap({
    filter: page =>
      !page.includes('/admin/') &&
      !page.includes('/contact/bedankt/') &&
      ![...archief].some(slug => page.endsWith(`/nieuws/${slug}/`)),
  })],
  site: 'https://www.purespirit-oss.nl',
  // Oude losstaande dienst-paginas dupliceerden content die ook (CMS-
  // bewerkbaar) in de content collections staat, op een aparte URL. Niets
  // linkt er intern nog naartoe; redirect naar de canonieke pagina i.p.v.
  // twee versies van dezelfde content te onderhouden.
  //
  // "Diensten" is hernoemd naar "Activiteiten", en meditatie/workshops zijn
  // verplaatst naar hun eigen overzicht binnen groepsverband-activiteiten;
  // "Persoonlijke groei" is komen te vervallen (geen directe vervanger).
  redirects: {
    '/bachbloesemtherapie/':     '/activiteiten/bachbloesemtherapie/',
    '/meditatie/':               '/activiteiten/meditatie/',
    '/coaching/':                '/activiteiten/coaching/',
    '/begeleiding-hsp/':         '/activiteiten/begeleiding-hsp/',
    '/persoonlijke-groei/':      '/activiteiten/',
    '/diensten/':                '/activiteiten/',
    '/diensten/bachbloesemtherapie/': '/activiteiten/bachbloesemtherapie/',
    '/diensten/begeleiding-hsp/':     '/activiteiten/begeleiding-hsp/',
    '/diensten/prive-consult/':       '/activiteiten/prive-consult/',
    '/diensten/coaching/':            '/activiteiten/coaching/',
    '/diensten/meditatie/':           '/activiteiten/meditatie/',
    '/diensten/persoonlijke-groei/':  '/activiteiten/',
  },
});
