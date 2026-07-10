const LIMIET = 180;

/**
 * Excerpt voor een nieuwsbericht: de handmatige samenvatting als die er is,
 * anders een afgekapte, van markdown ontdane versie van de inhoud — zodat
 * een samenvatting in de CMS optioneel kan blijven.
 */
export function nieuwsExcerpt(samenvatting: string | undefined, body: string): string {
  if (samenvatting) return samenvatting;

  const plat = body
    .replace(/^#+\s.*$/gm, '')            // koppen
    .replace(/!\[.*?\]\(.*?\)/g, '')      // afbeeldingen
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')   // links -> alleen linktekst
    .replace(/[*_`>]/g, '')               // markdown-opmaaktekens
    .replace(/\s+/g, ' ')
    .trim();

  if (plat.length <= LIMIET) return plat;

  const afgekapt = plat.slice(0, LIMIET);
  const laatsteSpatie = afgekapt.lastIndexOf(' ');
  return `${afgekapt.slice(0, laatsteSpatie > 0 ? laatsteSpatie : LIMIET)}…`;
}
