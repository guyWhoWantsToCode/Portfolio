import CONTENT from "../content.jsx";
import { Reveal, Eyebrow } from "../hooks.jsx";

export default function Skills() {
  return (
    <section className="pf-section" id="skills">
      <div className="pf-wrap">
        <Eyebrow index="02">Skills</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">The toolkit</h2>
          <p className="pf-lede">What I reach for, roughly in the order I reach for it.</p>
        </Reveal>

        <div className="skill-grid" style={{ marginTop: 44 }}>
          {CONTENT.skills.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.label} delay={i * 90}>
                <div className="card skill-card">
                  <div className="ico">
                    <Icon size={18} />
                  </div>
                  <h3>{cat.label}</h3>
                  <ul>
                    {cat.items.map((it) => (
                      <li key={it}>
                        <i />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
