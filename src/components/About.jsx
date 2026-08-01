import { Camera, MapPin, GraduationCap } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow } from "../hooks.jsx";

export default function About() {
  return (
    <section className="pf-section" id="about">
      <div className="pf-wrap">
        <Eyebrow index="01">About</Eyebrow>
        <div className="about-grid">
          <Reveal>
            <div className="photo-frame">
              {CONTENT.photo ? (
                <img src={CONTENT.photo} alt={CONTENT.name} loading="lazy" />
              ) : (
                <div className="photo-ph">
                  <Camera size={22} />
                  <span className="mono">Photo</span>
                  <span style={{ fontSize: 12.5, maxWidth: 190, lineHeight: 1.5 }}>
                    Set CONTENT.photo to your image path to replace this.
                  </span>
                </div>
              )}
            </div>
            <div className="photo-meta">
              <div>
                <MapPin size={14} /> {CONTENT.location}
              </div>
              <div>
                <GraduationCap size={14} /> {CONTENT.university}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="about-body">
            <h2 className="display pf-title">Building things that think.</h2>
            {CONTENT.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="tagline-row">
              {["Artificial Intelligence", "Machine Learning", "Full Stack", "Software Engineering", "Motorsport"].map(
                (t, i) => (
                  <span key={t} className={`chip ${i === 0 ? "hot" : ""}`}>
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
