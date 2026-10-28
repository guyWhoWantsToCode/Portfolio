import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import CONTENT from "../content.jsx";

/* Faint lap-trace line: a nod to telemetry without turning the page into a theme */
function Trace() {
  return (
    <svg className="hero-trace" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
      <path
        pathLength="1"
        d="M0 78 C 80 78 110 30 190 34 S 300 98 380 92 S 470 24 560 30 S 650 86 740 80 S 840 20 930 28 S 1040 92 1120 84 S 1180 60 1200 58"
      />
    </svg>
  );
}

export default function Hero() {
  const { hero } = CONTENT;
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <Trace />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-status mono rise" style={{ "--d": "0ms" }}>
            <span className="dot" aria-hidden="true" />
            {hero.status}
          </p>
          <h1 id="hero-title" className="rise" style={{ "--d": "80ms" }}>
            <span className="hero-name">{CONTENT.name}</span>
            <span className="hero-headline">{hero.headline}</span>
          </h1>
          <p className="hero-summary rise" style={{ "--d": "160ms" }}>
            {hero.summary}
          </p>
          <ul className="hero-areas rise" style={{ "--d": "220ms" }} aria-label="Technical areas">
            {hero.areas.map((a) => (
              <li key={a} className="mono">
                {a}
              </li>
            ))}
          </ul>

          <div className="hero-cta rise" style={{ "--d": "280ms" }}>
            <a className="btn btn-primary" href="#projects">
              View projects <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn" href={CONTENT.resume.href} download={CONTENT.resume.filename}>
              <Download size={16} aria-hidden="true" /> Download resume
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact
            </a>
          </div>

          <ul className="hero-links rise" style={{ "--d": "340ms" }} aria-label="Profiles">
            <li>
              <a href={CONTENT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                <Github size={18} aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href={CONTENT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <Linkedin size={18} aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTENT.email}`}>
                <Mail size={18} aria-hidden="true" /> Email
              </a>
            </li>
          </ul>
        </div>

        <aside className="profile rise" style={{ "--d": "200ms" }} aria-label="Profile summary">
          <div className="profile-bar mono">
            <span>profile</span>
            <span className="profile-loc">{CONTENT.location}</span>
          </div>
          <dl>
            {hero.profile.map(([k, v]) => (
              <div key={k} className="profile-row">
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
