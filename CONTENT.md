# Content status & remaining gaps

The site now runs on real data from your CV, GitHub, and LinkedIn (August 2026).
A few things are still placeholders or need your sign-off — they're all listed here.

## Needs your decision

| What | Where | Notes |
| --- | --- | --- |
| **Domain** | `astro.config.mjs` → `SITE` | ✅ Set to `https://mihneacatana.github.io` (GitHub Pages user site — requires the repo to be named `mihneacatana.github.io`). |
| **Portrait photo** | `public/images/portrait.jpg` | ✅ Real photo in place (800×800); declared `width`/`height` in index/about corrected to 1:1 so the photo renders undistorted. |
| **Project years** | `src/content/projects/*.md` | I inferred 2025/2024/2026 from your CV timeline — correct any that are off. |
| **Live links** | project frontmatter | ✅ All three projects now link their repos (SMB Management Platform → `multi-tenants-scheduler-app`). |

## Needs your review (written from your CV, in a confident first-person voice)

- **Blog posts** — ✅ Published: the `DRAFT` comments were removed from all three posts
  in `src/content/blog/` (MCP plumbing, agent onboarding, AI adoption).
- **Hero line** — "I build full-stack software that thinks." in `src/pages/index.astro`.
  If it doesn't sound like you, it's one line to change.
- **About page bio** — `src/pages/about.astro` — fact-checked against the CV, but it's
  your voice; tune freely.
- **/now page** — `src/pages/now.astro` — written from the CV; update whenever reality
  shifts (that page only works if it's honest).

## Already done (no action needed)

- Name, tagline, titles, meta descriptions, nav, footer, email (mihneacatana@gmail.com)
- GitHub + LinkedIn links (X/Twitter removed — send a handle if you want it back)
- Three case studies: AI Agent Avatar Registry, SMB Management Platform, IoT Manager
  (the Lenovo Atlassian extension was removed at your request — internal work; About and
  the blog drafts still reference that experience, tell me if you want those scrubbed too)
- Timeline, certifications, languages on the About page
- OG share card and RSS feed with your name

## Running it

```bash
npm run dev       # http://localhost:4321
npm run build     # production build into dist/
```

Deploy `dist/` to Netlify / Vercel / Cloudflare Pages / GitHub Pages — fully static.
