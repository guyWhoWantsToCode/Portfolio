# Abhyuday Singh — Portfolio

Personal portfolio built with React 18 and Vite. Live sections: hero, about, skills,
currently-learning, projects with live demos, timeline, writing, resume, and contact.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, "Add New Project" and import the repo.
3. Vercel auto-detects Vite. Defaults are correct: build command `vite build`, output `dist`.
4. Deploy.

## Editing content

Everything user-facing lives in `src/content.jsx`: name, bio, projects, timeline,
resume text, quotes, and links. Edit that one file and the whole site updates.

Assets:
- `public/headshot.jpg` — the About photo (`photo` field in content.jsx)
- `public/resume.pdf` — served by the Download resume button

## Known stubs

- The contact form is front-end only. Wire it to Formspree or Resend to deliver mail.
- LinkedIn URL in `content.jsx` is a placeholder until you add your profile.

## Adding project screenshots

Cards look for `public/screenshots/{physics-sandbox,pathfinder,singularity}.png`
and fall back to generated artwork if a file is missing. Capture at roughly
1600x900 (cards are 16:9). Singularity has a built-in Screenshot button.

## Mobile

Tested layout breakpoints at 900px and 560px. Notes:
- Form inputs are 16px so iOS Safari does not zoom on focus.
- Hero uses `100svh`, not `100vh`, to avoid the iOS URL-bar jump.
- `color-mix` and `ctx.roundRect` have fallbacks for Safari below 16.
