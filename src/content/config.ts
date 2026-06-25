import { defineCollection, z } from 'astro:content';

const nieuws = defineCollection({
  type: 'content',
  schema: z.object({
    titel:        z.string(),
    datum:        z.string(),
    categorie:    z.string().optional(),
    samenvatting: z.string(),
    auteur:       z.string().default('Sasja van Geel'),
    afbeelding:   z.string().optional(),
  }),
});

const diensten = defineCollection({
  type: 'content',
  schema: z.object({
    titel:           z.string(),
    volgorde:        z.number().default(99),
    icon:            z.string().optional(),
    samenvatting:    z.string(),
    meta_description: z.string().optional(),
    sidebar_items: z.array(z.object({
      label:  z.string(),
      waarde: z.string(),
    })).optional(),
  }),
});

const ervaringen = defineCollection({
  type: 'content',
  schema: z.object({
    quote:      z.string(),
    auteur:     z.string().optional(),
    dienst:     z.string().optional(),
    uitgelicht: z.boolean().default(false),
    volgorde:   z.number().default(99),
  }),
});

export const collections = { nieuws, diensten, ervaringen };
