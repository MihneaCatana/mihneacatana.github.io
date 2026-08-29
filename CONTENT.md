# Content status & remaining gaps

The site now runs on real data from your CV, GitHub, and LinkedIn (August 2026).
A few things are still placeholders or need your sign-off — they're all listed here.

## Needs your decision

| What | Where | Notes |
| --- | --- | --- |
| **Domain** | `astro.config.mjs` → `SITE` | ✅ Set to `https://mihneacatana.github.io` (GitHub Pages user site — requires the repo to be named `mihneacatana.github.io`). |
| **Portrait photo** | `public/images/portrait.svg` | Replace with a real photo (~800px wide, portrait orientation); update the `src` in `src/pages/index.astro` and `src/pages/about.astro` if the filename differs. |
| **Project years** | `src/content/projects/*.md` | I inferred 2025/2024/2026 from your CV timeline — correct any that are off. |
| **Live links** | project frontmatter | None of the three projects have `link:`/`repo:` set. If the Avatar Registry or IoT Manager are public (or can be), add them — a clickable demo is worth a lot. |

## Needs your review (written from your CV, in a confident first-person voice)

- **Blog posts** — `src/content/blog/*.md` — three drafts derived from your real work
  (MCP plumbing, agent onboarding, AI adoption). Each starts with a `DRAFT` comment.
  Read them, edit them into your own voice, adjust any claim you wouldn't say
  out loud, then delete the comment. **Do not deploy with unreviewed posts** — the
  whole point of the blog is legitimacy.
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
