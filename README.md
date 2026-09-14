# teyru.dev

The landing page for [Teyru](https://github.com/teyru-lang/Teyru), served at
<https://teyru.dev> from Cloudflare Pages.

One page: the wordmark, the subtitle and a link to the documentation, then a
`hello.teyru` snippet beside the install command (with a copy button), a band of short
facts about the compiler, and a footer with the documentation, the compiler repository
and the install line. No UI framework, no runtime dependencies — the theme switch, the
locale detection and the DOM wiring are hand-written TypeScript in `src/`, compiled by
`tsc` and copied into `dist/`.

## Layout

| Path                | What it is                                                        |
| ------------------- | ----------------------------------------------------------------- |
| `index.html`        | The page; sets the theme attribute inline before the first paint. |
| `styles.css`        | Both themes, the type scale and the layout.                       |
| `src/i18n.ts`       | The `zh-TW`, `zh-CN` and `en` dictionaries, lookup, detection.    |
| `src/theme.ts`      | Theme resolution, `<html data-theme>`, `localStorage`.            |
| `src/main.ts`       | Wiring: language control, `<html lang>`, meta tags, text nodes.   |
| `scripts/copy.mjs`  | Copy step: `index.html` and `styles.css` into `dist/`.            |
| `dist/`             | Build output. Generated; not committed.                           |

## Build

```sh
npm install
npm run build
```

`npm run build` runs `tsc` (which emits `dist/*.js` from `src/`) and then
`node scripts/copy.mjs` (which copies `index.html` and `styles.css` into `dist/`).
The result is plain static files — no bundler, no CDN, no web fonts:

```
dist/index.html
dist/i18n.js
dist/main.js
dist/theme.js
dist/styles.css
```

To look at it:

```sh
python3 -m http.server 4173 --directory dist
# then open http://127.0.0.1:4173/
```

`npm run dev` builds once and then runs `tsc --watch`, so TypeScript edits land in
`dist/` as you save. There is deliberately no dev-server dependency: serve `dist/` with
any static file server and re-run `npm run build` when you change `index.html` or
`styles.css` (the copy step does not watch).

## Cloudflare Pages

Connect the repository with:

- **Build command:** `npm ci && npm run build`
- **Output directory:** `dist`
- **Node version:** `.node-version` pins `22.14.0` (Cloudflare Pages reads it, and
  `engines.node` in `package.json` is `>=22`).

## Deploy

The site is the Cloudflare Pages project `teyru`, and `teyru.dev` points at it
(`CNAME teyru.dev -> teyru.pages.dev`, proxied, next to the domain's mail records).
Three ways to publish, in the order they are worth setting up:

**The dashboard's Git integration, once.** Workers & Pages → the `teyru` project →
Settings → Builds & deployments → Connect to Git, and authorize the Cloudflare GitHub
App for the `teyru-lang` organisation. The two values above are what it asks for, and
every push to `main` builds and deploys from then on. Nothing to keep in the repository.

**GitHub Actions, on every push.** `.github/workflows/deploy.yml` builds the site and
runs `wrangler pages deploy`. It needs two repository secrets:

| Secret | Where it comes from |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | A token with the *Cloudflare Pages: Edit* permission |
| `CLOUDFLARE_ACCOUNT_ID` | The account id in the Cloudflare dashboard URL |

**By hand.** On a machine already logged in (`npx wrangler login`), no token is
needed:

```sh
npm ci && npm run build
npx wrangler pages deploy dist --project-name=teyru --branch=main
```

With a token in the environment instead, `CLOUDFLARE_API_TOKEN=... ` in front of the
same command. The first deployment is what makes `teyru.dev` serve; before one exists
the domain answers with an error because the project is empty.

## Locales and themes

The three dictionaries in `src/i18n.ts` are typed as `Record<Lang, Messages>`, so a
missing key is a compile error rather than an English fallback. On a first visit the
locale comes from `navigator.languages`; the language control in the top bar overrides it
and the choice is stored under `teyru:lang`. The theme starts from
`prefers-color-scheme`, is overridden by the toggle, and is stored under `teyru:theme`;
an inline script in `index.html` applies it before the first paint, so the page never
flashes the wrong theme.

## Contrast

Every text colour was checked against the background it is actually painted on, using
the WCAG relative-luminance formula `(L_lighter + 0.05) / (L_darker + 0.05)`. The lowest
pair on the page is the punctuation colour inside the light-theme code block at 5.35:1;
nothing is below 4.5:1.

| Pair                                       | Light    | Dark     |
| ------------------------------------------ | -------- | -------- |
| body text on page background               | 17.96:1  | 17.78:1  |
| subtitle / facts text on background        | 7.54:1   | 7.80:1   |
| link and accent text on background         | 6.99:1   | 8.15:1   |
| button label on button                     | 6.99:1   | 8.15:1   |
| wordmark, lightest end of the gradient     | 12.63:1  | 13.37:1  |
| code keyword / type / string               | 7.71 / 6.67 / 6.24 | 8.78 / 10.07 / 10.96 |
| code punctuation                           | 5.35:1   | 7.15:1   |
| card header label on the header strip      | 6.71:1   | 7.00:1   |
| footer install command on its own panel    | 15.72:1  | 15.64:1  |

The hairlines, the background grid and the radial glow are decoration and carry no text.
The one animation (the hero rising into place) is inside
`@media (prefers-reduced-motion: no-preference)`, so it never runs for a visitor who has
asked for reduced motion.

## Licence

The page is part of the Teyru project; see the compiler repository's `LICENSE` and
`THIRD-PARTY-NOTICES.md`.
