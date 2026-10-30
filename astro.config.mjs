import { defineConfig } from 'astro/config';

// THE SITE'S PUBLIC ADDRESS. Registered on Cloudflare, 2026-10-30.
const DOMAIN = 'https://giancarloguevarra.com';

export default defineConfig({
  site: DOMAIN,
  // One address per page, always ending in "/", so there are no redirects.
  trailingSlash: 'always',
  // The stylesheet is small, so it is inlined into each page: no
  // render-blocking CSS request before the first paint.
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
