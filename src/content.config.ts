// The content model: one typed entry per item, tagged by audience.
// Pages are views over these collections. Audience tags:
//   academic     (writing, for academic readers)
//   engineering  (software roles)
//   art          (visual work)
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const audience = z.array(z.enum(["academic", "engineering", "art"]));

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    genre: z.enum(["poem", "creative nonfiction", "fiction", "essay"]),
    journal: z.string(),
    publisher: z.string(),
    edition: z.string(),
    date: z.coerce.date(),
    url: z.string().url(),
    audience,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    repo: z.string().url().optional(),
    url: z.string().url().optional(),     // where the live version can be used
    logo: z.string().optional(),          // path under public/, e.g. "/md-logo.svg"
    date: z.string().optional(),
    shown: z.boolean().default(false),
    audience,
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/roles" }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    url: z.string().url().optional(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    audience,
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    school: z.string(),
    program: z.string(),
    start: z.coerce.date(),
    expected: z.string(),
    honors: z.array(z.string()).default([]),
    audience,
  }),
});

export const collections = { writing, projects, roles, education };
