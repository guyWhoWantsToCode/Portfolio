import { useEffect, useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import CONTENT from "../content.jsx";
import { scrollTo } from "../hooks.jsx";

/* Ambient connected-particle canvas behind the hero */
function ParticleField({ light }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dots = [], running = true;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(72, Math.round((w * h) / 17000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const base = light ? "31,111,235" : "150,180,255";
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${base},${light ? 0.35 : 0.45})`;
        ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dist = Math.hypot(d.x - o.x, d.y - o.y);
          if (dist < 128) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(${base},${(1 - dist / 128) * (light ? 0.13 : 0.16)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    build();
    tick();
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [light]);

  return <canvas ref={ref} className="pf-canvas" aria-hidden="true" />;
}

export default function Hero({ theme }) {
  const words = CONTENT.name.split(" ");
  // running letter index so the stagger continues across the word break
  const offsets = words.reduce((acc, w, i) => [...acc, i === 0 ? 0 : acc[i - 1] + words[i - 1].length], []);
  return (
    <header className="pf-hero">
      <div className="pf-glow a" />
      <div className="pf-glow b" />
      <ParticleField light={theme === "light"} />

      <div className="pf-wrap">
        <div
          className="hero-status mono"
          style={{ opacity: 0, animation: "rise .8s .1s cubic-bezier(.2,.75,.25,1) forwards" }}
        >
          <span className="pulse" />
          Open to summer 2027 internships
        </div>

        <h1 className="display hero-name">
          {words.map((word, w) => (
            <span className="word" key={w}>
              {word.split("").map((c, i) => (
                <span
                  key={i}
                  className="ch"
                  style={{ animationDelay: `${140 + (offsets[w] + i) * 46}ms` }}
                >
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="hero-school"
          style={{ opacity: 0, animation: "rise .8s .58s cubic-bezier(.2,.75,.25,1) forwards" }}
        >
          {CONTENT.school}
        </p>

        <div
          className="hero-rule"
          style={{ opacity: 0, animation: "rise .8s .6s cubic-bezier(.2,.75,.25,1) forwards" }}
        >
          <i style={{ background: "var(--accent)", maxWidth: 64 }} />
          <i style={{ background: "var(--bone)", opacity: 0.25 }} />
          <i style={{ background: "var(--flag)", maxWidth: 26, opacity: 0.75 }} />
        </div>

        <p
          className="mono hero-role"
          style={{ opacity: 0, animation: "rise .8s .68s cubic-bezier(.2,.75,.25,1) forwards" }}
        >
          {CONTENT.role}
        </p>

        <p
          className="hero-intro"
          style={{ opacity: 0, animation: "rise .8s .8s cubic-bezier(.2,.75,.25,1) forwards" }}
        >
          {CONTENT.intro}
        </p>

        <div
          className="hero-cta"
          style={{ opacity: 0, animation: "rise .8s .95s cubic-bezier(.2,.75,.25,1) forwards" }}
        >
          <button className="btn primary" onClick={() => scrollTo("projects")}>
            View projects <ArrowUpRight size={16} className="arrow" />
          </button>
          <a className="btn" href="/resume.pdf" download="Abhyuday-Singh-Resume.pdf">
            <Download size={16} /> Download resume
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="track" />
        <span className="mono">Scroll</span>
      </div>
    </header>
  );
}
