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
| `src/pages/` | The pages. `index.astro` is the blank page. |
| `src/layouts/Base.astro` | The shell every page shares: title, description, skip link, `<main>`. |
| `src/styles/global.css` | Colour tokens and the accessibility baseline only. |
| `src/config/site.js` | Name, email, links. |
| `src/content/` | Typed entries: `writing`, `projects`, `roles`, `education`. Each has audience tags. |
| `src/content.config.ts` | The schema for those entries. |
| `src/assets/` | Images processed at build time (the headshot lives here). |
| `wrangler.jsonc` | Cloudflare settings. The Worker name must stay `my-website`. |

## Accessibility baseline

WCAG 2.2 Level AA throughout, AAA for colour contrast. The tokens in `global.css`
state their ratios; keep any new text colour at 7:1 or better on its paper.
Every page has a skip link, a visible focus ring, one `<h1>`, and respects
`prefers-reduced-motion` and `prefers-color-scheme`.

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
