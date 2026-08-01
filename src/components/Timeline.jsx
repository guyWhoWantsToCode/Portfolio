import { useState, useEffect, useRef } from "react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow } from "../hooks.jsx";

export default function Timeline() {
  const wrapRef = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.72 - r.top) / r.height;
      setFill(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="pf-section" id="timeline">
      <div className="pf-wrap">
        <Eyebrow index="05">Timeline</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">How it has gone so far</h2>
        </Reveal>

        <div className="tl" ref={wrapRef} style={{ marginTop: 48 }}>
          <span className="tl-fill" style={{ height: `calc(${fill * 100}% - 12px)` }} />
          {CONTENT.timeline.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={i * 70}>
                <div className="tl-item">
                  <span className="tl-dot">
                    <Icon size={16} />
                  </span>
                  <span className="mono tl-period">{t.period}</span>
                  <h3>{t.title}</h3>
                  <div className="tl-org">{t.org}</div>
                  <p>{t.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
