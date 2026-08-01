import { useState, useEffect, useRef } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow } from "../hooks.jsx";

/* ctx.roundRect landed in Safari 16. Older iPhones would throw without this. */
if (typeof CanvasRenderingContext2D !== "undefined" && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    const rad = Math.min(typeof r === "number" ? r : 0, w / 2, h / 2);
    this.moveTo(x + rad, y);
    this.arcTo(x + w, y, x + w, y + h, rad);
    this.arcTo(x + w, y + h, x, y + h, rad);
    this.arcTo(x, y + h, x, y, rad);
    this.arcTo(x, y, x + w, y, rad);
    this.closePath();
    return this;
  };
}

/* Deterministic generative artwork per project, seeded by hue */
function ProjectArt({ kind, hue }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth,
      h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, `hsl(${hue} 62% 17%)`);
    g.addColorStop(1, `hsl(${hue + 24} 48% 8%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = `hsla(${hue} 90% 78% / 0.5)`;
    ctx.lineWidth = 1;

    const rnd = (() => {
      let s = hue * 977;
      return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
    })();

    if (kind === "maze") {
      const c = 26;
      for (let x = 0; x < w; x += c)
        for (let y = 0; y < h; y += c) {
          ctx.beginPath();
          if (rnd() > 0.5) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + c, y + c);
          } else {
            ctx.moveTo(x + c, y);
            ctx.lineTo(x, y + c);
          }
          ctx.globalAlpha = 0.25 + rnd() * 0.5;
          ctx.stroke();
        }
    } else if (kind === "bodies") {
      ctx.strokeStyle = `hsla(${hue} 90% 80% / 0.45)`;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.86);
      ctx.lineTo(w, h * 0.86);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      for (let i = 0; i < 11; i++) {
        const s = 16 + rnd() * 26;
        const x = 24 + rnd() * (w - 60);
        const y = h * 0.86 - s / 2 - rnd() * h * 0.5;
        ctx.fillStyle = `hsla(${hue + rnd() * 40} 72% 68% / ${0.2 + rnd() * 0.4})`;
        ctx.strokeStyle = `hsla(${hue + 20} 90% 82% / 0.55)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        if (rnd() > 0.45) ctx.arc(x, y, s / 2, 0, Math.PI * 2);
        else ctx.roundRect(x - s / 2, y - s / 2, s, s, 4);
        ctx.fill();
        ctx.stroke();
      }
    } else if (kind === "orbit") {
      const cx = w / 2,
        cy = h / 2;
      for (let i = 7; i >= 1; i--) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, i * 26, i * 8.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue + i * 6} 85% 74% / ${0.1 + i * 0.055})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
      const core = ctx.createRadialGradient(cx, cy, 2, cx, cy, 34);
      core.addColorStop(0, "#000");
      core.addColorStop(0.62, "#000");
      core.addColorStop(1, `hsla(${hue + 30} 90% 70% / 0)`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue + 40} 95% 80% / 0.7)`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const v = ctx.createLinearGradient(0, h * 0.4, 0, h);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
  }, [kind, hue]);

  return <canvas ref={ref} aria-hidden="true" />;
}

function ProjectCard({ p, i }) {
  const [shotFailed, setShotFailed] = useState(false);
  return (
    <div className="card proj-card">
      <div className="proj-art">
        <span className="proj-num">{String(i + 1).padStart(2, "0")}</span>
        {/* Drop a PNG at p.shot to replace the generative placeholder */}
        {p.shot && !shotFailed ? (
          <img src={p.shot} alt={`${p.title} screenshot`} loading="lazy" onError={() => setShotFailed(true)} />
        ) : (
          <ProjectArt kind={p.art} hue={p.hue} />
        )}
      </div>
      <div className="proj-body">
        <h3>{p.title}</h3>
        <p>{p.blurb}</p>
        <div className="proj-tech">
          {p.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="proj-actions">
          <a className="btn" href={p.repo || CONTENT.github} target="_blank" rel="noreferrer">
            <Github size={15} /> Code
          </a>
          {p.demo ? (
            <a className="btn ghost" href={p.demo} target="_blank" rel="noreferrer">
              Live demo <ArrowUpRight size={15} className="arrow" />
            </a>
          ) : (
            <span className="chip" style={{ alignSelf: "center", padding: "9px 13px" }}>
              Demo in progress
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="pf-section" id="projects">
      <div className="pf-wrap">
        <Eyebrow index="04">Projects</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">Featured work</h2>
          <p className="pf-lede">
            Three simulations, all running live in the browser. No install, no setup, just open one and start pulling
            things around.
          </p>
        </Reveal>
        <div className="proj-grid" style={{ marginTop: 44 }}>
          {CONTENT.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 110}>
              <ProjectCard p={p} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
