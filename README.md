# Vijay Kardak — DevOps & Cloud Engineering Portfolio

Editorial-style portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4 and React Router, served together with a small Express API (contact form) from one Node process.

## Requirements
Node.js 20 or newer (22 recommended).

## Install and develop
```bash
npm install
cp .env.example .env      # then edit (see "Environment variables")
npm run dev:server        # API on http://localhost:4000
npm run dev               # site on http://localhost:5173 (proxies /api to :4000)
```

## Quality checks
```bash
npm run lint         # oxlint
npm test             # Vitest + Testing Library (navigation, projects, detail routes, contact form)
npm run test:server  # node:test (contact API: validation, 503, success, 502, honeypot, rate limit)
npm run build        # tsc -b && vite build -> dist/
npm run check        # everything above in one go
```
GitHub Actions (`.github/workflows/ci.yml`) runs install, `tsc`, lint, both test suites and the build on every push and pull request.

## Production build
```bash
npm run build
npm start            # Express serves dist/ and /api on $PORT (default 4000)
```

## Deploy to Render
`render.yaml` defines a single **Web Service**:
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Health check: `/api/health`

Use *New → Blueprint* with this repo, or create a Web Service manually with those commands, then set the environment variables below in the Render dashboard. The site and API share one origin, so no CORS setup or `VITE_API_URL` is needed.

## Environment variables
| Variable | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | server | API key from resend.com. Never expose it to the frontend. |
| `CONTACT_TO_EMAIL` | server | Inbox that receives messages. |
| `CONTACT_FROM_EMAIL` | server | Sender, e.g. `Portfolio <contact@yourdomain.com>`. Must be on a domain verified in Resend (`onboarding@resend.dev` works for testing). |
| `CLIENT_ORIGIN` | server, optional | Comma-separated origins allowed via CORS. Only needed if the frontend is hosted elsewhere. |
| `PORT` | server | Provided by Render. |
| `VITE_API_URL` | build, optional | API base URL if it is not same-origin. |

If the email variables are missing, `/api/contact` returns **503** and the form shows an error. It never pretends a message was saved, and nothing is written to Render's ephemeral disk.

## Editing content
| What | File |
|---|---|
| Name, links, education, skills, journey | `src/data/site.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Contact validation (shared by form and API) | `shared/validate.js` |
| SEO per page | `useSeo(...)` call at the top of each page |

**Case studies show only verified detail.** Each project's optional `evidence` object (`steps`, `config`, `deployment`, `verification`, `challenges`, `learned`, `images`) is empty. A section without evidence renders "Not documented yet". Fill them from the real repository (screenshots go in `public/projects/`, referenced under `images`) and the sections appear automatically.

## SEO
`index.html` holds default metadata; `useSeo` updates title, description, canonical and Open Graph URL on navigation. `public/robots.txt`, `public/sitemap.xml` and `public/og-image.png` are included. Canonical URLs use `https://devops-eng-vijay.onrender.com` (`SITE_URL` in `src/data/site.ts`, plus `index.html`, `robots.txt`, `sitemap.xml`). For a custom domain, update those four places. The site is client-rendered, so crawlers that don't run JavaScript see only the default tags.
