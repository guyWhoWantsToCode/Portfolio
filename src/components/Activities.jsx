import { Award, Code2, Trophy } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, SectionHeader } from "../hooks.jsx";

const ICONS = { Hackathons: Code2, Award: Award, Competition: Trophy };

export default function Activities() {
  return (
    <section className="section" id="activities" aria-labelledby="activities-title">
      <div className="wrap">
        <SectionHeader id="activities" index="05" label="Activities & achievements" title="Beyond the classroom" />
        <ul className="act-grid">
          {CONTENT.activities.map((a, i) => {
            const Icon = ICONS[a.label] || Award;
            return (
              <Reveal as="li" key={a.title} className="card act" delay={i * 60}>
                <p className="card-label mono">
                  <Icon size={15} aria-hidden="true" /> {a.label}
                </p>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
