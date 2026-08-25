import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { POSTS_CONFIG } from '~/config'
import type { CoverLayout, PostType } from '~/types'

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()).optional(),
        updatedDate: z.date().optional(),
        author: z.string().default(POSTS_CONFIG.author),
        cover: image().optional(),
        ogImage: image().optional(),
        recommend: z.boolean().default(false),
        postType: z.custom<PostType>().optional(),
        coverLayout: z.custom<CoverLayout>().optional(),
        pinned: z.boolean().default(false),
        draft: z.boolean().default(false),
        hidden: z.boolean().default(false),
        license: z.string().optional(),
      })
      .transform((data) => ({
        ...data,
        ogImage: POSTS_CONFIG.ogImageUseCover && data.cover ? data.cover : data.ogImage,
      })),
})

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      // Sort key for the home feed; undated projects sort last and hide the date
      date: z.date().optional(),
      // Both optional — a project can link to either, both, or neither (detail-only)
      // githubUrls is a list so a project with separate FE/BE repos can link both
      githubUrls: z.array(z.string()).optional(),
      website: z.string().optional(),
      // Tech stack pills shown on the project detail page
      stack: z.array(z.string()).optional(),
      type: z.string(),
      icon: image().optional(),
      // Background thumbnail on the home feed card, half-width behind the text
      thumbnail: image().optional(),
      imageClass: z.string().optional(),
      star: z.number(),
      fork: z.number(),
      pinned: z.boolean().default(false),
      order: z.number().default(0),
      draft: z.boolean().default(false),
      hidden: z.boolean().default(false),
      // When true, clicking the project opens its own write-up (the .mdx body below)
      // at /projects/<id> instead of jumping straight to `website`/`githubUrl`.
      hasDetail: z.boolean().default(false),
    }),
})

const tutorials = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/tutorials',
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(z.string()).optional(),
        updatedDate: z.date().optional(),
        author: z.string().default(POSTS_CONFIG.author),
        cover: image().optional(),
        ogImage: image().optional(),
        recommend: z.boolean().default(false),
        postType: z.custom<PostType>().optional(),
        coverLayout: z.custom<CoverLayout>().optional(),
        pinned: z.boolean().default(false),
        draft: z.boolean().default(false),
        hidden: z.boolean().default(false),
        license: z.string().optional(),
      })
      .transform((data) => ({
        ...data,
        ogImage: POSTS_CONFIG.ogImageUseCover && data.cover ? data.cover : data.ogImage,
      })),
})

export const collections = { posts, projects, tutorials }
