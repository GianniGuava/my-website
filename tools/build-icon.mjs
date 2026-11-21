/**
 * Build the site's browser icon: "GG" in EB Garamond Medium (the MD logo's font, SIL OFL 1.1,
 * via @fontsource/eb-garamond), cream letters on the navy paper with a violet edge
 * (Avanguardia palette, Gianni's choice B, 2026-11-20). Same method as md-editor's
 * tools/build-logo.mjs: the letters become outlines, so no font has to load.
 *
 *   public/favicon.svg           rounded tile, used by current browsers at any size
 *   public/favicon.ico           16, 32 and 48 px, for older browsers and bookmark lists
 *   public/apple-touch-icon.png  180 px square, for an iPhone Home Screen (iOS rounds the corners)
 *   tools/LICENSE-EB-Garamond.txt  the font licence, copied from the package
 *
 * Run: npm run build:icon   (only when the icon changes; the site build does not run it)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

// Colours: the tokens in src/styles/global.css.
const PAPER = '#10131f'; // navy
const INK = '#f7f2ea';   // cream, 16.6:1 on PAPER
const EDGE = '#a493ff';  // violet

const pkgDir = path.dirname(require.resolve('@fontsource/eb-garamond/package.json'));
const fontFile = path.join(pkgDir, 'files', 'eb-garamond-latin-500-normal.woff');
if (!fs.existsSync(fontFile)) throw new Error(`EB Garamond Medium .woff not found: ${fontFile}`);
const bytes = fs.readFileSync(fontFile);
const font = opentype.parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));

const SIZE = 512;
const FONT_SIZE = 290;
const TEXT = 'GG';

// Lay the letters out, then centre their ink box in the square.
const first = font.getPath(TEXT, 0, 0, FONT_SIZE, { kerning: true });
const box = first.getBoundingBox();
const x = (SIZE - (box.x2 - box.x1)) / 2 - box.x1;
const y = (SIZE - (box.y2 - box.y1)) / 2 - box.y1;
const d = font.getPath(TEXT, x, y, FONT_SIZE, { kerning: true }).toPathData(2);

const head = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GG icon. Glyphs: EB Garamond Medium (SIL Open Font License 1.1, see tools/LICENSE-EB-Garamond.txt
     in https://github.com/GianniGuava/my-website), converted to outlines by tools/build-icon.mjs. -->`;

// Browser tab icon: rounded tile, violet edge inset so it is never cut by the curve.
const favicon = `${head}
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="96" fill="${PAPER}"/>
  <rect x="14" y="14" width="484" height="484" rx="84" fill="none" stroke="${EDGE}" stroke-width="28"/>
  <path fill="${INK}" d="${d}"/>
</svg>
`;

// Home Screen icon: full square (iOS applies its own rounded mask). The edge sits 24 px in,
// with corners rounded enough to stay inside that mask.
const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${PAPER}"/>
  <rect x="38" y="38" width="436" height="436" rx="78" fill="none" stroke="${EDGE}" stroke-width="28"/>
  <path fill="${INK}" d="${d}"/>
</svg>
`;

const png = (svg, px) => new Resvg(svg, { fitTo: { mode: 'width', value: px } }).render().asPng();

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), favicon);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png(touch, 180));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), await pngToIco([16, 32, 48].map((px) => png(favicon, px))));

const licence = path.join(pkgDir, 'LICENSE');
if (!fs.existsSync(licence)) throw new Error(`font licence not found: ${licence}`);
fs.copyFileSync(licence, path.join(root, 'tools', 'LICENSE-EB-Garamond.txt'));

console.log('icon built: public/favicon.svg, public/favicon.ico, public/apple-touch-icon.png');
