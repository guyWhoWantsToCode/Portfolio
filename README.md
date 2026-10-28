# Abhyuday Singh — Portfolio

Personal portfolio built with React 18 and Vite 5. Sections: hero, about, featured projects,
technical skills, experience and education, activities and achievements, contact.

Live: https://portfolio-gules-ten-53.vercel.app/

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

## Deploy

The site deploys to Vercel from the `main` branch (Vite is auto-detected: build `vite build`, output `dist`).
No environment variables or serverless functions are required.

## Editing content

Everything user-facing lives in `src/content.jsx`: hero text, bio, education, experience, skills,
projects, and links. Edit that one file and the whole site updates.

- **Add or change a featured project:** edit the `projects` array. Every field is rendered
  (purpose, challenges, contribution, tech, links). `shot` (screenshot) and `demo` are optional;
  add a `demo` only after checking the URL works.
- **Smaller projects:** the `moreProjects` array.
- **Resume:** replace `public/resume.pdf` (the Download buttons point at it). The resume contains a
  phone number, which is intentionally not shown anywhere on the site itself.
- **Screenshots:** `public/screenshots/` (1280x720 JPEG, 16:9).

## Contact

There is no contact form. A form needs a backend (for example Formspree or a serverless function)
to deliver mail, so the site uses a `mailto:` link, a copy-address button, and profile links instead.

## Structure

```
src/
  content.jsx        all site content
  App.jsx            page composition, scroll progress, active section
  hooks.jsx          scroll reveal, section header, scroll hooks
  styles.css         design tokens and styles (single dark theme)
  components/        Navbar, Hero, About, Projects, Skills, Experience, Activities, Contact, Footer
public/              resume.pdf, headshot.jpg, favicon.svg, og-image.png, screenshots/
```
