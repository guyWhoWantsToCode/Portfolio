import { Github, ExternalLink, Users } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, SectionHeader } from "../hooks.jsx";

function TechList({ items, label }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((t) => (
        <li key={t} className="chip mono">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ title, repo, demo }) {
  return (
    <div className="proj-links">
      <a className="btn btn-sm" href={repo} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub (opens in a new tab)`}>
        <Github size={15} aria-hidden="true" /> GitHub
      </a>
      {demo && (
        <a
          className="btn btn-sm btn-primary"
          href={demo.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title}: ${demo.label} (opens in a new tab)`}
        >
          <ExternalLink size={15} aria-hidden="true" /> {demo.label}
        </a>
      )}
    </div>
  );
}

/* Ordered data path, rendered as a labelled step list */
function Flow({ steps, label }) {
  return (
    <div className="flow">
      <p className="flow-label mono">{label}</p>
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            <span className="flow-n mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

function FeaturedProject({ p, index }) {
  const titleId = `proj-${p.id}`;
  return (
    <Reveal as="article" className="proj" aria-labelledby={titleId}>
      <div className="proj-media">
        {p.shot && (
          <figure className="shot">
            <img src={p.shot.src} alt={p.shot.alt} width="1280" height="720" loading="lazy" decoding="async" />
            {p.shot.caption && <figcaption className="mono">{p.shot.caption}</figcaption>}
          </figure>
        )}
        {p.flow && <Flow steps={p.flow} label={p.shot ? "Request path" : "Data path"} />}
      </div>

      <div className="proj-body">
        <header>
          <p className="proj-index mono">
            {String(index + 1).padStart(2, "0")}
            {p.badge && (
              <span className="badge">
                <Users size={12} aria-hidden="true" /> {p.badge}
              </span>
            )}
          </p>
          <h3 id={titleId}>{p.title}</h3>
          <p className="proj-tagline">{p.tagline}</p>
        </header>

        <p className="proj-purpose">{p.purpose}</p>

        {p.specs && (
          <ul className="specs mono" aria-label="Key design parameters">
            {p.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}

        <div className="proj-block">
          <h4 className="mono">Engineering challenges</h4>
          <ul className="bullets">
            {p.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="proj-block contrib">
          <h4 className="mono">My contribution</h4>
          <p>{p.contribution}</p>
        </div>

        <TechList items={p.tech} label={`${p.title} technologies`} />
        <Links title={p.title} repo={p.repo} demo={p.demo} />
      </div>
    </Reveal>
  );
}

function SmallProject({ p }) {
  return (
    <Reveal as="article" className="card mini">
      {p.shot && <img className="mini-shot" src={p.shot.src} alt={p.shot.alt} width="1280" height="720" loading="lazy" decoding="async" />}
      <h4>{p.title}</h4>
      <p>{p.body}</p>
      <TechList items={p.tech} label={`${p.title} technologies`} />
      <Links title={p.title} repo={p.repo} demo={{ href: p.demo, label: "Live demo" }} />
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section className="section section-wide" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeader
          id="projects"
          index="02"
          label="Featured projects"
          title="Selected work"
          lede="Four projects that show how I approach backend design, real-time data, AI integration, and algorithms. Each one states what I contributed."
        />

        <div className="proj-list">
          {CONTENT.projects.map((p, i) => (
            <FeaturedProject key={p.id} p={p} index={i} />
          ))}
        </div>

        <div className="more">
          <h3 className="more-title mono">More projects</h3>
          <div className="more-grid">
            {CONTENT.moreProjects.map((p) => (
              <SmallProject key={p.title} p={p} />
            ))}
          </div>
          <p className="more-link">
            <a href={CONTENT.github} target="_blank" rel="noopener noreferrer">
              All repositories on GitHub <ExternalLink size={14} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
