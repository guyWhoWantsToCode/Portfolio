import { ChevronRight } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow } from "../hooks.jsx";

export default function Blog() {
  return (
    <section className="pf-section" id="writing">
      <div className="pf-wrap">
        <Eyebrow index="06">Writing</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">Notes in progress</h2>
          <p className="pf-lede">Drafts I am working through. Publishing as they get good enough.</p>
        </Reveal>
        <div className="post-grid" style={{ marginTop: 44 }}>
          {CONTENT.posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card post">
                <div className="meta mono">
                  <span style={{ color: "var(--accent)" }}>{p.cat}</span>
                  <span>·</span>
                  <span>{p.read}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="go">
                  {p.date} <ChevronRight size={14} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
