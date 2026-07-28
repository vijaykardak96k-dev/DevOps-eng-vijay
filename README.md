# Vijay Kardak — DevOps Portfolio

A premium, dark-mode-first personal portfolio for a DevOps Engineer / Cloud Enthusiast / Kubernetes Learner. Built with React, TypeScript, Vite, TailwindCSS v4, and Framer Motion, backed by a small Express API for the contact form.

The whole site is content-driven from JSON files — you should never need to touch the React components to add a project, a skill, or a timeline milestone.

## Quick start

### Frontend

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

### Backend (contact form API)

```bash
cd server
npm install
cp .env.example .env
npm start         # http://localhost:4000
```

Copy `.env.example` to `.env` in the project root too, and set `VITE_API_URL` if your API isn't running on `http://localhost:4000`.

## Editing content — no code required

| What you want to change | File to edit |
|---|---|
| Name, titles, bio, stats, currently-learning tags | `src/data/profile.json` |
| Skills, categories, levels, learning status | `src/data/skills.json` |
| Projects and their detail pages | `src/data/projects.json` |
| The Journey timeline | `src/data/timeline.json` |

Each skill's `icon` field is a Lucide icon name in kebab-case (e.g. `git-branch`, `database`). To add a new one, add it to the `ICON_MAP` in `src/components/SkillIconMap.tsx`.

Drop your real PDF resume in `public/resume.pdf` (replacing the placeholder), and swap the `public/projects/*.svg` cover images for real screenshots when you have them.

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, cards, hero terminal, etc.
  pages/        One file per route
  data/         profile.json, skills.json, projects.json, timeline.json
  hooks/        useTheme, useScrollProgress
  lib/          axios client for the contact API
  types.ts      Shared TypeScript interfaces for the JSON shape
server/
  index.js      Express API — /api/contact, /api/health
public/
  robots.txt, sitemap.xml, favicon.svg, resume.pdf
```

## Design notes

- Dark mode is the default; a light-mode toggle lives in the navbar (persisted to localStorage).
- The hero's signature element is `DeployTerminal` — an animated terminal that plays out a real deploy sequence (git push -> docker build -> trivy scan -> kubectl apply -> rollout) with a live pipeline status bar underneath. It's meant to be the one memorable, on-theme visual on the page.
- The Journey page timeline is styled after a git commit graph, since that's the mental model a DevOps engineer already has for "history."
- Lucide dropped bundled brand/logo icons (GitHub, LinkedIn, Instagram, WhatsApp) in the installed version, so those four live as small custom SVGs in `src/components/BrandIcons.tsx`.

## Extending later

The structure was built to make these easy additions without touching existing code:
- **Blog** — add `src/data/blog.json` plus a Blog/BlogPost page pair.
- **Certificates** — add `src/data/certificates.json` and a section/page.
- **GitHub API integration** — call the GitHub REST API from a new hook and render alongside `profile.json` data.
- **Admin dashboard / analytics** — the Express server already has a clean spot to add authenticated routes.

## Tech stack

**Frontend:** React 19, TypeScript, Vite, TailwindCSS v4, Framer Motion, React Router, Axios, lucide-react
**Backend:** Node.js, Express (contact form endpoint with basic validation + rate limiting)
