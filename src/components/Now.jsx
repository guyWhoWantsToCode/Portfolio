import { useState } from "react";
import { Quote, ChevronRight } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow, useInView } from "../hooks.jsx";

function Learning() {
  const [ref, seen] = useInView(0.3);
  return (
    <div className="card panel" ref={ref}>
      <div className="panel-head">
        <h3>Currently learning</h3>
      </div>
      <ul className="learn">
        {CONTENT.learning.map((l, i) => (
          <li key={l.label}>
            <div className="top">
              <span>{l.label}</span>
              <span>{l.pct}%</span>
            </div>
            <div className="rail">
              <i
                style={{
                  background: "var(--accent)",
                  width: seen ? `${l.pct}%` : 0,
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteBox() {
  const [i, setI] = useState(0);
  const [vis, setVis] = useState(true);
  const next = () => {
    setVis(false);
    setTimeout(() => {
      setI((p) => (p + 1 + Math.floor(Math.random() * (CONTENT.quotes.length - 1))) % CONTENT.quotes.length);
      setVis(true);
    }, 220);
  };
  const q = CONTENT.quotes[i];
  return (
    <div className="card panel">
      <div className="panel-head">
        <h3>Wisdom, on demand</h3>
        <Quote size={15} style={{ color: "var(--faint)" }} />
      </div>
      <div className="quote-box">
        <p style={{ opacity: vis ? 1 : 0 }}>{q.q}</p>
        <cite style={{ opacity: vis ? 1 : 0 }}>{q.a}</cite>
      </div>
      <button className="btn" style={{ marginTop: 18 }} onClick={next}>
        Another one <ChevronRight size={15} />
      </button>
    </div>
  );
}

export default function Now() {
  return (
    <section className="pf-section" id="signals">
      <div className="pf-wrap">
        <Eyebrow index="03">Now</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">What I am working through</h2>
          <p className="pf-lede">
            Where my attention is at the moment, roughly in order of how much of it each thing gets.
          </p>
        </Reveal>

        <div className="sig-grid" style={{ marginTop: 44 }}>
          <Reveal>
            <Learning />
          </Reveal>
          <Reveal delay={100}>
            <QuoteBox />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
