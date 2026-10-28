import CONTENT from "../content.jsx";
import { Reveal, SectionHeader } from "../hooks.jsx";

export default function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHeader
          id="skills"
          index="03"
          label="Technical skills"
          title="Tools I work with"
          lede="Technologies I have used in the projects above and in coursework."
        />
        <div className="skills-grid">
          {CONTENT.skills.map((g, i) => (
            <Reveal key={g.label} as="section" className="card skill" delay={i * 50} aria-label={g.label}>
              <h3 className="card-label mono">{g.label}</h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
