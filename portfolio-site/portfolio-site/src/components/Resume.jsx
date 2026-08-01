import { Download } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow, scrollTo } from "../hooks.jsx";

export default function Resume() {
  return (
    <section className="pf-section" id="resume">
      <div className="pf-wrap">
        <Eyebrow index="07">Resume</Eyebrow>
        <div className="res-grid">
          <Reveal>
            <div className="viewer">
              <div className="viewer-bar">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mono">resume.pdf</span>
                <span className="mono">1 / 1</span>
              </div>
              <div className="page">
                <div className="r-name">{CONTENT.name}</div>
                <div className="r-contact">{CONTENT.resume.contact.join("  ·  ")}</div>
                {CONTENT.resume.sections.map((sec) => (
                  <div key={sec.label}>
                    <div className="r-h">{sec.label}</div>
                    {sec.items.map((it) => (
                      <div className="r-item" key={it.head}>
                        <div className="r-top">
                          <b>{it.head}</b>
                          {it.date && <span>{it.date}</span>}
                        </div>
                        {it.sub && <div className="r-sub">{it.sub}</div>}
                        {it.bullets && (
                          <ul>
                            {it.bullets.map((b, k) => (
                              <li key={k}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="display pf-title">One page, the short version</h2>
            <p className="pf-lede" style={{ marginBottom: 26 }}>
              Education, projects, and the tools I use daily. Rendered as text so it stays readable on a phone, with the
              PDF a click away.
            </p>
            <ul className="res-facts">
              <li>
                <b>Education</b> <span style={{ marginLeft: "auto" }}>UTSA, BS Computer Science, May 2029</span>
              </li>
              <li>
                <b>Then</b> <span style={{ marginLeft: "auto" }}>Master's in computer science</span>
              </li>
              <li>
                <b>Focus</b> <span style={{ marginLeft: "auto" }}>Simulation, algorithms, web</span>
              </li>
              <li>
                <b>Based in</b> <span style={{ marginLeft: "auto" }}>{CONTENT.location}</span>
              </li>
              <li>
                <b>Status</b> <span style={{ marginLeft: "auto" }}>Open to summer 2027 internships</span>
              </li>
            </ul>
            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <a className="btn primary" href="/resume.pdf" download="Abhyuday-Singh-Resume.pdf">
                <Download size={16} /> Download resume
              </a>
              <button className="btn" onClick={() => scrollTo("contact")}>
                Ask me anything
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
