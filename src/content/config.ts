import { defineCollection, z } from 'astro:content';

const nieuws = defineCollection({
  type: 'content',
  schema: z.object({
    titel:       z.string(),
    datum:       z.string(),
    categorie:   z.string().optional(),
    samenvatting: z.string(),
    auteur:      z.string().default('Sasja van Geel'),
  }),
});

export const collections = { nieuws };
