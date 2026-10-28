import CONTENT from "../content.jsx";
import { Reveal, SectionHeader } from "../hooks.jsx";

export default function About() {
  const { about, photo } = CONTENT;
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeader id="about" index="01" label="About" title="Engineering with a focus on how systems behave" />
        <div className="about-grid">
          <Reveal className="about-text">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="chips" aria-label="Professional interests">
              {about.interests.map((i) => (
                <li key={i} className="chip">
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} as="figure" className="about-photo">
            <img
              className="portrait"
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={`Portrait of ${CONTENT.name}`}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="mono">
              {CONTENT.name} · {CONTENT.location}
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
