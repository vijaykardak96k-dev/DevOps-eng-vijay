# Vijay Kardak — DevOps & Cloud Engineering Portfolio

A static portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Framer Motion and Lucide icons. No backend, no API, no environment variables. `npm run build` outputs a static `dist/` folder.

## Develop
```bash
npm install
npm run dev        # http://localhost:5173
```
Requires Node.js 20+ (22 recommended).

## Checks
```bash
npm run lint       # oxlint
npm test           # Vitest + Testing Library
npm run build      # tsc -b && vite build -> dist/
npm run check      # tsc, lint, tests and build together
```
GitHub Actions (`.github/workflows/ci.yml`) runs install, type-check, lint, tests and build on every push and pull request.

## Deploy to Render (Static Site)
`render.yaml` already describes the service. Either use *New → Blueprint*, or create a **Static Site** manually:

| Setting | Value |
|---|---|
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Start command | none (static sites have none) |

**Required for client-side routes:** add a rewrite rule in *Redirects/Rewrites*: source `/*`, destination `/index.html`, action **Rewrite**. (The Blueprint sets this for you.) Without it, opening `/projects/...` directly returns 404.

## Editing content
| What | File |
|---|---|
| Name, links, education, skills, journey | `src/data/site.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Per-page SEO | `useSeo(...)` at the top of each page |

**Case studies show only what exists.** Each project has an optional `evidence` object (`steps`, `config`, `deployment`, `verification`, `challenges`, `learned`, `images`). Add content to it and the matching numbered section appears; leave it out and the section is omitted. Screenshots go in `public/projects/` and are referenced under `images`.

## SEO
`index.html` holds default metadata; `useSeo` updates title, description, canonical and Open Graph URL per route. `public/` contains `robots.txt`, `sitemap.xml`, `og-image.png` and `favicon.svg`. The canonical domain `https://devops-eng-vijay.onrender.com` is set in `src/data/site.ts`, `index.html`, `robots.txt` and `sitemap.xml`; update those four places for a custom domain. The site is client-rendered, so crawlers that skip JavaScript see only the default tags.
