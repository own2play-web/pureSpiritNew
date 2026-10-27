// Welke nieuwsberichten "archief" zijn: blijven gewoon op de site staan, maar
// worden niet meer aan zoekmachines getoond (noindex, ook niet in de sitemap).
// Zo verdwijnt geen oud bericht, maar concurreert het niet met nieuwere.
//
// Een bericht is archief als:
//  - het ouder is dan ARCHIEF_NA_JAREN, of
//  - er een nieuwer bericht met dezelfde titel is (terugkerende aankondiging,
//    bv. "Examenstress… Denk eens aan Bachbloesems!" elk jaar opnieuw).
//
// Puur op data, zodat zowel de pagina's als astro.config.mjs (sitemap) exact
// dezelfde regel gebruiken. Wordt bij elke build opnieuw berekend.
export const ARCHIEF_NA_JAREN = 2;

type Bericht = { slug: string; titel: string; datum: string | Date };

const sleutel = (titel: string) =>
  titel.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export function archiefSlugs(berichten: Bericht[], nu: Date = new Date()): Set<string> {
  const grens = new Date(nu);
  grens.setFullYear(grens.getFullYear() - ARCHIEF_NA_JAREN);

  const tijd = (b: Bericht) => new Date(b.datum).getTime();
  const nieuwstePerTitel = new Map<string, Bericht>();
  for (const b of berichten) {
    const k = sleutel(b.titel);
    const huidig = nieuwstePerTitel.get(k);
    if (!huidig || tijd(b) > tijd(huidig) || (tijd(b) === tijd(huidig) && b.slug > huidig.slug)) {
      nieuwstePerTitel.set(k, b);
    }
  }

  const archief = new Set<string>();
  for (const b of berichten) {
    const teOud = tijd(b) < grens.getTime();
    const vervangen = nieuwstePerTitel.get(sleutel(b.titel))?.slug !== b.slug;
    if (teOud || vervangen) archief.add(b.slug);
  }
  return archief;
}
