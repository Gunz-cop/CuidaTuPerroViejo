import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ''),
  }),
  schema: z.strictObject({
    title: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string().max(160, {
      message: 'La meta descripción no debe superar los 160 caracteres.',
    }),
    pilar: z.enum([
      'herramientas',
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
    status: z.string().default('Publicado'),
    datePublished: z.string().default('2025-10-01'),
    /** Fecha de la última revisión editorial/clínica real. Sin este campo,
     *  el schema no declara una actualización que no ha ocurrido. */
    dateModified: z.string().optional(),
  }),
});

const pilares = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/pilares',
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    legacyUrl: z.string().optional(),
    /** Fecha de la última revisión editorial/clínica real del pilar. */
    dateModified: z.string().optional(),
  }),
});

export const collections = {
  blog,
  pilares,
};
