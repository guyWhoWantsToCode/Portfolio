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
