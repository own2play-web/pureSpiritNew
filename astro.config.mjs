import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [mdx(), sitemap()],
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
