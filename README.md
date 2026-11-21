# giancarloguevarra.com

Giancarlo Guevarra's personal site. Astro, static files, served by Cloudflare.

## Run it

    npm install
    npm run dev        # http://localhost:4321/
    npm run build      # writes dist/
    npm run preview    # serves the production build

## Where things live

| Path | What |
|---|---|
| `src/pages/` | The pages. `index.astro` is the front page: name, then the MD editor card. |
| `src/layouts/Base.astro` | The shell every page shares: title, description, skip link, `<main>`. |
| `src/styles/global.css` | Colour tokens, the accessibility baseline, and the front page's few layout rules. |
| `src/config/site.js` | Name, email, links. |
| `src/content/` | Typed entries: `writing`, `projects`, `roles`, `education`. Each has audience tags. |
| `src/content.config.ts` | The schema for those entries. |
| `src/assets/` | Images processed at build time (the headshot lives here). |
| `tools/build-icon.mjs` | Makes the GG browser and Home Screen icons in `public/` from EB Garamond and the colour tokens in `global.css`. Run `npm run build:icon` after changing either; the site build does not run it. |
| `wrangler.jsonc` | Cloudflare settings. The Worker name must stay `my-website`. |

## Accessibility baseline

WCAG 2.2 Level AA throughout, AAA for colour contrast. The scheme is inspired by
GMK Avanguardia (Gianni's choice, 2026-11-13): near-black navy paper, warm white
text, lavender grey for secondary text, violet headings and links, magenta for
emphasis and focus, an ice accent, and an indigo shadow that is decoration only.
The site is dark only. The tokens in `global.css` state their ratios; keep any new
text colour at 7:1 or better on its paper, and never put violet and magenta on
each other as text. Every page has a skip link, a visible focus ring, one `<h1>`,
and respects `prefers-reduced-motion`.

## Performance check

Local Lighthouse audit on the production build, mobile and desktop:

    npm run build && npm run preview
    npx lighthouse http://localhost:4321/ --output=json --output-path=./baseline.json

Record the mobile and desktop scores and the LCP figure in the commit message of
any performance or accessibility change, before and after.

## Deploy

Git-connected Workers Builds in Gianni's personal Cloudflare account:
build command `npm run build`, deploy command `npx wrangler deploy`.
Every push to `main` is production; other branches get preview addresses.
