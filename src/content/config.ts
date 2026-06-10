import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string().max(160, {
      message: 'La meta descripción no debe superar los 160 caracteres.',
    }),
    pilar: z.enum([
      'guia-para-cuidar-tu-perro-senior',
      'salud-perros-mayores',
      'alimentacion-perros-senior',
      'movilidad-dolor-perros-mayores',
      'salud-mental-emocional-perros',
      'higiene-hogar-perros-senior',
      'cuidados-paliativos-perros',
    ]),
    keywordPrincipal: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    legacyUrl: z.string().optional(),
    status: z.string().optional(),
    datePublished: z.string().optional(),
  }).strict(),
});

const pilares = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    legacyUrl: z.string().optional(),
  }),
});

export const collections = {
  blog,
  pilares,
};
