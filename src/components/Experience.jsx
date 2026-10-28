import { Briefcase, GraduationCap } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, SectionHeader } from "../hooks.jsx";

export default function Experience() {
  const { education, experience } = CONTENT;
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHeader id="experience" index="04" label="Experience & education" title="Background" />
        <div className="two-col">
          <Reveal as="article" className="card entry">
            <p className="card-label mono">
              <GraduationCap size={15} aria-hidden="true" /> Education
            </p>
            <h3>{education.school}</h3>
            <p className="entry-sub">{education.degree}</p>
            <p className="entry-date mono">
              {education.date} · {education.place}
            </p>
            <p className="entry-fact">
              GPA <strong>{education.gpa}</strong>
            </p>
            <h4 className="entry-h mono">Coursework</h4>
            <ul className="chips" aria-label="Coursework">
              {education.coursework.map((c) => (
                <li key={c} className="chip chip-quiet">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {experience.map((e) => (
            <Reveal key={e.role} as="article" className="card entry" delay={80}>
              <p className="card-label mono">
                <Briefcase size={15} aria-hidden="true" /> Experience
              </p>
              <h3>{e.role}</h3>
              <p className="entry-sub">{e.org}</p>
              <p className="entry-date mono">{e.date}</p>
              <ul className="bullets">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
