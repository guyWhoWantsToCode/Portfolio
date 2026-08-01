import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Linkedin, Mail, ArrowUpRight, ArrowUp, Download, FileText,
  Terminal, Layers, Server, Cpu, Wrench, Sun, Moon, Menu, X, Send,
  MapPin, GraduationCap, Trophy, Rocket, Users, Quote, BookOpen,
  ChevronRight, Camera, Check, Flag,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/*  Single source of truth. Edit here, the whole site updates.         */
/* ------------------------------------------------------------------ */

/* Headshot, inlined as a data URI so the file stays self contained.
   In the Next.js build, move this to /public/headshot.jpg and set photo to "/headshot.jpg". */
const PHOTO = "data:image/jpeg;base64,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";

const CONTENT = {
  name: "Abhyuday Singh",
  role: "Computer Science Student • AI Developer • Software Engineer",
  intro:
    "I build intelligent software, explore artificial intelligence, and create projects that solve real-world problems.",
  location: "San Antonio, Texas",
  university: "The University of Texas at San Antonio",
  email: "sabhyuday14@gmail.com",
  github: "https://github.com/guyWhoWantsToCode",
  linkedin: "https://linkedin.com/in/yourhandle",
  photo: PHOTO,

  bio: [
    "I am a computer science student at UTSA, class of 2029, one year in and building whatever I am curious about at the time.",
    "Most of what I make is interactive: physics you can push around, algorithms you can watch think, simulations that make an abstract idea concrete. I like the point where the maths stops being a formula and starts being something on screen that behaves correctly.",
    "Away from the keyboard I follow Formula 1 closely and race in simulators, which is where a lot of my project ideas start. Race engineering is a constraint problem with a stopwatch attached, and that turns out to be excellent practice.",
  ],

  skills: [
    { icon: Terminal, label: "Languages", items: ["Python", "Java", "JavaScript", "C"] },
    { icon: Layers, label: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind"] },
    { icon: Server, label: "Backend", items: ["Node.js", "Express"] },
    { icon: Cpu, label: "AI", items: ["Machine Learning", "OpenAI API", "Data Analysis"] },
    { icon: Wrench, label: "Tools", items: ["Git", "GitHub", "VS Code", "Docker"] },
  ],

  projects: [
    {
      title: "Physics Sandbox",
      repo: "https://github.com/guyWhoWantsToCode/physics-sandbox",
      demo: "https://guywhowantstocode.github.io/physics-sandbox/",
      blurb:
        "A browser based 2D physics playground built on Matter.js. Drop rigid bodies into the scene and change the rules underneath them while it runs: gravity, buoyancy, explosions, even a black hole that pulls everything into it. No reload, no restart, the simulation just reacts.",
      tech: ["JavaScript", "Matter.js", "HTML", "CSS", "GitHub Pages"],
      hue: 212,
      art: "bodies",
    },
    {
      title: "Pathfinder",
      repo: "https://github.com/guyWhoWantsToCode/Pathfinder",
      demo: "https://guywhowantstocode.github.io/Pathfinder/",
      blurb:
        "Five search algorithms crossing a grid you draw yourself: BFS, DFS, Dijkstra, A*, and greedy best-first, expanding one node at a time. Comparison mode runs two of them side by side, which makes it obvious how much work each one wastes. Generates mazes with recursive backtracking or Prim's, and you can step through the frontier node by node when it moves too fast to follow.",
      tech: ["JavaScript", "HTML", "CSS", "GitHub Pages"],
      hue: 152,
      art: "maze",
    },
    {
      title: "Singularity",
      repo: "https://github.com/guyWhoWantsToCode/black-hole-simulator",
      demo: "https://guywhowantstocode.github.io/black-hole-simulator/",
      blurb:
        "A black hole simulator running hundreds of particles under Newtonian gravity, with an accretion disc that renders as they spiral inward. A live telemetry panel reports particle count, average speed, mass, and how many the singularity has consumed. Click anywhere to drop a second black hole and watch every orbit fall apart. Vanilla JavaScript, no libraries.",
      tech: ["Vanilla JavaScript", "Canvas", "HTML", "CSS"],
      hue: 268,
      art: "orbit",
    },
  ],

  timeline: [
    {
      icon: GraduationCap,
      period: "Aug 2021 — May 2025",
      title: "Claudia Taylor Johnson High School",
      org: "San Antonio, TX · 3.95 GPA",
      body: "Qualified for the DECA State Competition in Automotive Marketing and picked up the President's Volunteer Service Award at silver level for 250 or more hours.",
    },
    {
      icon: Users,
      period: "Aug 2022 — Sep 2025",
      title: "Volunteer Hour Coordinator",
      org: "Hope for Triumph, non-profit",
      body: "Built tracking systems for more than 50 volunteers, validated the records, and produced the reports staff actually used. My first real lesson in why clean data matters more than clever data.",
    },
    {
      icon: Rocket,
      period: "Aug 2025 — May 2029",
      title: "BS Computer Science",
      org: "The University of Texas at San Antonio",
      body: "Working through the core sequence in programming, data structures, and discrete mathematics, and teaching myself the web stack on the side.",
    },
    {
      icon: Trophy,
      period: "Oct 2025 · Jan 2026",
      title: "First two hackathons",
      org: "Weekend builds",
      body: "Two events, two finished projects. Best lesson so far is that scope is the only constraint that really matters, everything else is negotiable at 3am.",
    },
    {
      icon: Terminal,
      period: "2025 — present",
      title: "Personal projects",
      org: "Seven repositories and counting",
      body: "Physics sandboxes, pathfinding visualisers, black holes, race car setup tools. Built to answer a question I had, kept because they turned out useful to other people.",
    },
    {
      icon: Flag,
      period: "2027 →",
      title: "Internships",
      org: "Goals",
      body: "Software engineering experience while the degree is still in progress, ideally somewhere the simulation and graphics side of what I build is relevant.",
    },
    {
      icon: BookOpen,
      period: "2029 →",
      title: "Master's degree",
      org: "Graduate study, computer science",
      body: "Continuing straight into a master's after the bachelor's. The specialisation gets decided by whichever coursework I cannot stop thinking about between now and then.",
    },
  ],

  posts: [
    { title: "Building my first AI application", cat: "AI", date: "Coming soon", read: "8 min", body: "What nobody tells you about the gap between a notebook that works and a product someone else can open." },
    { title: "What hackathons taught me", cat: "Notes", date: "Coming soon", read: "5 min", body: "Four events, four postmortems, and the one habit that changed how I start any project." },
    { title: "Learning machine learning", cat: "AI", date: "Coming soon", read: "11 min", body: "The order I wish I had learned things in, and the three resources that were actually worth the time." },
    { title: "Designing better software", cat: "Engineering", date: "Coming soon", read: "7 min", body: "Notes on structure, naming, and why the second version is always smaller than the first." },
  ],

  learning: [
    { label: "React and Next.js", pct: 62 },
    { label: "Data structures in Java", pct: 48 },
    { label: "TypeScript", pct: 55 },
    { label: "Machine learning fundamentals", pct: 30 },
  ],

  quotes: [
    { q: "Simplicity is prerequisite for reliability.", a: "Edsger W. Dijkstra" },
    { q: "Premature optimization is the root of all evil.", a: "Donald Knuth" },
    { q: "Talk is cheap. Show me the code.", a: "Linus Torvalds" },
    { q: "Programs must be written for people to read.", a: "Harold Abelson" },
    { q: "Make it work, make it right, make it fast.", a: "Kent Beck" },
    { q: "Controlling complexity is the essence of programming.", a: "Brian Kernighan" },
    { q: "Deleted code is debugged code.", a: "Jeff Sickel" },
  ],

  resume: {
    contact: ["San Antonio, TX", "sabhyuday14@gmail.com", "github.com/guyWhoWantsToCode"],
    sections: [
      {
        label: "Education",
        items: [
          {
            head: "The University of Texas at San Antonio",
            sub: "B.S. Computer Science",
            date: "Aug 2025 — May 2029",
          },
          {
            head: "Claudia Taylor Johnson High School",
            sub: "San Antonio, TX · 3.95 GPA",
            date: "Aug 2021 — May 2025",
          },
        ],
      },
      {
        label: "Projects",
        items: [
          {
            head: "Physics Sandbox",
            sub: "JavaScript, Matter.js, HTML, CSS, GitHub Pages",
            date: "Jul 2026",
            bullets: [
              "Built an interactive 2D rigid body physics sandbox running in the browser with real-time simulation.",
              "Implemented configurable gravity, buoyancy, explosions, and black hole forces adjustable mid-simulation.",
              "Deployed with GitHub Pages and managed version control through Git and GitHub.",
            ],
          },
          {
            head: "Pathfinder",
            sub: "JavaScript, HTML, CSS, GitHub Pages",
            date: "2026",
            bullets: [
              "Implemented five search algorithms, BFS, DFS, Dijkstra, A*, and greedy best-first, with node by node visualisation.",
              "Added a comparison mode running two algorithms side by side to expose differences in nodes explored.",
              "Built maze generation using recursive backtracking and Prim's algorithm with adjustable grid resolution.",
            ],
          },
          {
            head: "Singularity, Black Hole Simulator",
            sub: "Vanilla JavaScript, Canvas, HTML, CSS",
            date: "2026",
            bullets: [
              "Simulated hundreds of particles under Newtonian gravity with accretion disc rendering, no external libraries.",
              "Built a live telemetry panel reporting frame rate, particle count, average speed, and mass consumed.",
            ],
          },
        ],
      },
      {
        label: "Experience",
        items: [
          {
            head: "Volunteer Hour Coordinator",
            sub: "Hope for Triumph, non-profit",
            date: "Aug 2022 — Sep 2025",
            bullets: [
              "Designed tracking systems for 50 or more volunteers and generated reports used by staff.",
              "Applied data validation techniques to keep volunteer records accurate under deadline.",
            ],
          },
        ],
      },
      {
        label: "Skills",
        items: [
          { head: "Languages", sub: "Python, Java, JavaScript, HTML, CSS" },
          { head: "Tools", sub: "Git, GitHub, VS Code, Microsoft Excel, Microsoft Word" },
        ],
      },
      {
        label: "Awards and activities",
        items: [
          { head: "DECA State Competition qualifier, Automotive Marketing", date: "2024" },
          { head: "President's Volunteer Service Award, Silver, 250+ hours", date: "2024" },
        ],
      },
    ],
  },

  sections: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "signals", label: "Now" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Timeline" },
    { id: "writing", label: "Writing" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ],
};

/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.pf {
  --ink: #08090a;
  --graphite: #0e1013;
  --raised: #14171b;
  --line: rgba(255,255,255,0.09);
  --line-soft: rgba(255,255,255,0.05);
  --bone: #e9ebee;
  --muted: #8a9199;
  --faint: #5d646c;
  --accent: #4c8dff;
  --accent-dim: rgba(76,141,255,0.14);
  --flag: #ff453a;
  --shadow: 0 24px 60px -30px rgba(0,0,0,0.9);

  background: var(--ink);
  color: var(--bone);
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  transition: background 0.5s ease, color 0.5s ease;
}
.pf.light {
  --ink: #f7f8f9;
  --graphite: #ffffff;
  --raised: #ffffff;
  --line: rgba(9,11,14,0.11);
  --line-soft: rgba(9,11,14,0.06);
  --bone: #0d1013;
  --muted: #5c636b;
  --faint: #868d95;
  --accent: #1f6feb;
  --accent-dim: rgba(31,111,235,0.10);
  --shadow: 0 24px 50px -32px rgba(10,20,40,0.35);
}

.pf *, .pf *::before, .pf *::after { box-sizing: border-box; }
.pf h1,.pf h2,.pf h3,.pf h4,.pf p,.pf ul,.pf figure { margin: 0; }
.pf ul { padding: 0; list-style: none; }
.pf button, .pf input, .pf textarea { font: inherit; color: inherit; }
.pf a { color: inherit; text-decoration: none; }
.pf :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }

/* noise */
.pf-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 3; opacity: 0.03;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  mix-blend-mode: overlay;
}
.pf.light .pf-grain { opacity: 0.02; }

/* type */
.pf .display {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-weight: 600; letter-spacing: -0.035em; line-height: 1.02;
}
.pf .mono {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
}

/* layout */
.pf-wrap { max-width: 1140px; margin: 0 auto; padding: 0 28px; position: relative; z-index: 2; }
.pf-section { padding: 132px 0; scroll-margin-top: 90px; }
.pf-section.tight { padding-top: 0; }

.pf-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 34px; color: var(--faint); }
.pf-eyebrow .bar { height: 1px; width: 40px; background: var(--accent); opacity: 0.8; }
.pf-eyebrow .fill { flex: 1; height: 1px; background: var(--line-soft); }
.pf-title { font-size: clamp(30px, 4.4vw, 46px); margin-bottom: 18px; }
.pf-lede { color: var(--muted); max-width: 60ch; font-size: 17px; }

/* reveal */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s cubic-bezier(.2,.7,.3,1), transform 0.85s cubic-bezier(.2,.7,.3,1); }
.reveal.is-in { opacity: 1; transform: none; }

/* scroll progress */
.pf-progress { position: fixed; top: 0; left: 0; height: 2px; background: var(--accent); z-index: 60; box-shadow: 0 0 14px var(--accent); }

/* nav */
.pf-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
  border-bottom: 1px solid transparent;
}
.pf-nav.stuck {
  background: color-mix(in srgb, var(--ink) 72%, transparent);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
  border-bottom-color: var(--line-soft);
}
.pf-nav-in { max-width: 1140px; margin: 0 auto; padding: 0 28px; height: 66px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.pf-mark { display: flex; align-items: center; gap: 10px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; letter-spacing: -0.02em; font-size: 15px; }
.pf-mark .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
.pf-links { display: flex; align-items: center; gap: 4px; }
.pf-link {
  background: none; border: 0; cursor: pointer; padding: 7px 12px; border-radius: 8px;
  font-size: 13.5px; color: var(--muted); transition: color 0.25s, background 0.25s;
}
.pf-link:hover { color: var(--bone); background: var(--line-soft); }
.pf-link.on { color: var(--bone); }
.pf-link.on::after { content:''; display:block; height:1px; background: var(--accent); margin-top: 3px; }
.pf-navtools { display: flex; align-items: center; gap: 8px; }
.icon-btn {
  width: 36px; height: 36px; display: grid; place-items: center; cursor: pointer;
  border-radius: 10px; border: 1px solid var(--line); background: var(--line-soft);
  color: var(--muted); transition: color 0.25s, transform 0.25s, border-color 0.25s;
}
.icon-btn:hover { color: var(--bone); border-color: var(--accent); transform: translateY(-1px); }
.pf-burger { display: none; }
.pf-sheet {
  display: none; overflow: hidden; border-bottom: 1px solid var(--line-soft);
  background: color-mix(in srgb, var(--ink) 92%, transparent);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
}
.pf-sheet button { display: block; width: 100%; text-align: left; padding: 13px 28px; background: none; border: 0; border-top: 1px solid var(--line-soft); color: var(--muted); cursor: pointer; font-size: 15px; }

/* hero */
.pf-hero { position: relative; min-height: 100svh; display: flex; align-items: center; padding: 120px 0 90px; }
.pf-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.pf-glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
.pf-glow.a { width: 46vw; height: 46vw; top: -12vw; right: -8vw; background: radial-gradient(circle, rgba(76,141,255,0.22), transparent 68%); animation: drift 22s ease-in-out infinite; }
.pf-glow.b { width: 38vw; height: 38vw; bottom: -14vw; left: -10vw; background: radial-gradient(circle, rgba(120,90,255,0.16), transparent 68%); animation: drift 28s ease-in-out infinite reverse; }
@keyframes drift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(4%, 6%) scale(1.12); } }

.hero-status { display: inline-flex; align-items: center; gap: 9px; padding: 7px 14px; border-radius: 999px; border: 1px solid var(--line); background: var(--line-soft); color: var(--muted); }
.pulse { width: 6px; height: 6px; border-radius: 50%; background: #30d158; position: relative; }
.pulse::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid #30d158; animation: ping 2s ease-out infinite; }
@keyframes ping { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(1.7); opacity: 0; } }

.hero-name { font-size: clamp(52px, 12vw, 132px); margin: 26px 0 0; }
.hero-name .ch { display: inline-block; opacity: 0; transform: translateY(0.4em); animation: rise 0.9s cubic-bezier(.2,.75,.25,1) forwards; }
@keyframes rise { to { opacity: 1; transform: none; } }
.hero-rule { display: flex; align-items: center; gap: 0; margin: 26px 0 22px; max-width: 520px; }
.hero-rule i { display: block; height: 3px; flex: 1; }
.hero-role { color: var(--muted); font-size: 13px; letter-spacing: 0.16em; }
.hero-intro { max-width: 54ch; font-size: 18px; color: var(--muted); margin-top: 20px; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 40px; }

.btn {
  display: inline-flex; align-items: center; gap: 9px; cursor: pointer;
  padding: 12px 20px; border-radius: 12px; font-size: 14.5px; font-weight: 500;
  border: 1px solid var(--line); background: var(--line-soft); color: var(--bone);
  transition: transform 0.25s cubic-bezier(.2,.8,.3,1), border-color 0.25s, background 0.25s, box-shadow 0.25s;
}
.btn:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--accent) 60%, transparent); }
.btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 10px 30px -12px var(--accent); }
.btn.primary:hover { box-shadow: 0 16px 38px -12px var(--accent); }
.btn.ghost { background: transparent; }
.btn svg { transition: transform 0.25s; }
.btn:hover svg.arrow { transform: translate(2px,-2px); }

.hero-scroll { position: absolute; bottom: 34px; left: 50%; transform: translateX(-50%); color: var(--faint); display: flex; flex-direction: column; align-items: center; gap: 10px; }
.hero-scroll .track { width: 1px; height: 46px; background: var(--line); position: relative; overflow: hidden; }
.hero-scroll .track::after { content: ''; position: absolute; top: -46px; left: 0; width: 1px; height: 46px; background: var(--accent); animation: fall 2.4s ease-in-out infinite; }
@keyframes fall { 0% { top: -46px; } 60%,100% { top: 46px; } }

/* cards */
.card {
  border: 1px solid var(--line); border-radius: 18px; background: var(--graphite);
  transition: transform 0.4s cubic-bezier(.2,.8,.3,1), border-color 0.4s, box-shadow 0.4s;
  position: relative; overflow: hidden;
}
.card:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); box-shadow: var(--shadow); }

/* about */
.about-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: start; }
.photo-frame { border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: var(--graphite); aspect-ratio: 4/5; position: relative; }
.photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.photo-frame::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(to bottom, transparent 62%, color-mix(in srgb, var(--ink) 55%, transparent) 100%);
  box-shadow: inset 0 0 0 1px var(--line-soft);
  border-radius: 20px;
}
.photo-ph { position: absolute; inset: 0; display: grid; place-items: center; gap: 10px; align-content: center; color: var(--faint); text-align: center; padding: 24px;
  background: linear-gradient(140deg, color-mix(in srgb, var(--accent) 12%, var(--graphite)), var(--graphite) 60%); }
.photo-meta { display: flex; flex-direction: column; gap: 10px; margin-top: 18px; color: var(--muted); font-size: 13.5px; }
.photo-meta div { display: flex; gap: 9px; align-items: center; }
.about-body p { color: var(--muted); font-size: 17px; margin-bottom: 18px; }
.about-body p:first-child { color: var(--bone); font-size: 19px; }
.tagline-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
.chip { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.08em; padding: 6px 11px; border-radius: 8px; border: 1px solid var(--line); color: var(--muted); background: var(--line-soft); }
.chip.hot { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 40%, transparent); background: var(--accent-dim); }

/* skills */
.skill-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; }
.skill-card { padding: 24px; }
.skill-card .ico { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; background: var(--accent-dim); color: var(--accent); margin-bottom: 18px; transition: transform 0.4s cubic-bezier(.2,.8,.3,1); }
.skill-card:hover .ico { transform: translateY(-3px) rotate(-6deg); }
.skill-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 14px; }
.skill-card li { display: flex; align-items: center; gap: 9px; color: var(--muted); font-size: 14.5px; padding: 4px 0; }
.skill-card li i { width: 4px; height: 4px; border-radius: 50%; background: var(--faint); transition: background 0.3s, transform 0.3s; }
.skill-card:hover li i { background: var(--accent); transform: scale(1.5); }

/* signals */
.sig-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: start; }
.panel { padding: 24px; }
.panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.panel-head h3 { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; }
.rail { height: 4px; border-radius: 999px; background: var(--line-soft); overflow: hidden; }
.rail i { display: block; height: 100%; border-radius: 999px; width: 0; transition: width 1.4s cubic-bezier(.2,.8,.2,1); }
.learn li { margin-bottom: 16px; }
.learn .top { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 7px; }
.learn .top span:last-child { color: var(--faint); font-family: 'JetBrains Mono', monospace; font-size: 12px; }
.counter { font-family: 'Space Grotesk', sans-serif; font-size: 40px; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.quote-box { min-height: 106px; display: flex; flex-direction: column; justify-content: center; }
.quote-box p { font-family: 'Space Grotesk', sans-serif; font-size: 18px; line-height: 1.4; letter-spacing: -0.02em; transition: opacity 0.3s; }
.quote-box cite { display: block; margin-top: 10px; font-style: normal; color: var(--faint); font-size: 13px; }

/* projects */
.proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
.proj-card { display: flex; flex-direction: column; }
.proj-art { aspect-ratio: 16/9; position: relative; overflow: hidden; border-bottom: 1px solid var(--line); }
.proj-art canvas { width: 100%; height: 100%; display: block; }
.proj-num { position: absolute; top: 14px; left: 16px; z-index: 2; color: rgba(255,255,255,0.55); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; }
.proj-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
.proj-body h3 { font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 600; letter-spacing: -0.025em; display: flex; align-items: center; gap: 8px; }
.proj-body p { color: var(--muted); font-size: 15px; margin: 12px 0 20px; flex: 1; }
.proj-tech { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
.proj-actions { display: flex; gap: 10px; }
.proj-actions .btn { padding: 9px 15px; font-size: 13.5px; }

/* timeline */
.tl { position: relative; padding-left: 62px; }
.tl::before { content: ''; position: absolute; left: 19px; top: 6px; bottom: 6px; width: 1px; background: var(--line); }
.tl-fill { position: absolute; left: 19px; top: 6px; width: 1px; background: linear-gradient(var(--accent), transparent); transition: height 0.2s linear; }
.tl-item { position: relative; padding-bottom: 46px; }
.tl-item:last-child { padding-bottom: 0; }
.tl-dot { position: absolute; left: -62px; top: 0; width: 39px; height: 39px; border-radius: 12px; display: grid; place-items: center;
  background: var(--graphite); border: 1px solid var(--line); color: var(--muted); transition: color 0.35s, border-color 0.35s, transform 0.35s; }
.tl-item:hover .tl-dot { color: var(--accent); border-color: var(--accent); transform: scale(1.06); }
.tl-period { color: var(--accent); }
.tl-item h3 { font-family: 'Space Grotesk', sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; margin: 8px 0 3px; }
.tl-org { color: var(--faint); font-size: 14px; }
.tl-item p { color: var(--muted); font-size: 15px; margin-top: 12px; max-width: 62ch; }

/* writing */
.post-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.post { padding: 26px; display: flex; flex-direction: column; min-height: 232px; cursor: pointer; }
.post .meta { display: flex; align-items: center; gap: 10px; color: var(--faint); margin-bottom: 18px; }
.post h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.3; }
.post p { color: var(--muted); font-size: 14.5px; margin-top: 10px; flex: 1; }
.post .go { display: flex; align-items: center; gap: 6px; color: var(--faint); font-size: 13px; transition: color 0.3s, gap 0.3s; }
.post:hover .go { color: var(--accent); gap: 10px; }

/* resume */
.res-grid { display: grid; grid-template-columns: 1.25fr 1fr; gap: 40px; align-items: center; }
.viewer { border-radius: 16px; border: 1px solid var(--line); overflow: hidden; background: var(--graphite); box-shadow: var(--shadow); }
.viewer-bar { display: flex; align-items: center; justify-content: space-between; padding: 11px 15px; border-bottom: 1px solid var(--line); background: var(--line-soft); color: var(--faint); }
.viewer-bar .dots { display: flex; gap: 6px; }
.viewer-bar .dots i { width: 9px; height: 9px; border-radius: 50%; background: var(--line); display: block; }
.page { background: #fbfbfc; margin: 22px; border-radius: 6px; padding: 30px 32px; box-shadow: 0 10px 30px -18px rgba(0,0,0,0.6);
  color: #16191d; max-height: 560px; overflow-y: auto; font-size: 11.5px; line-height: 1.55; }
.page::-webkit-scrollbar { width: 6px; }
.page::-webkit-scrollbar-thumb { background: #ccd2d9; border-radius: 999px; }
.r-name { font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 600; letter-spacing: -0.03em; color: #0b0d10; }
.r-contact { color: #5b636c; font-size: 10.5px; margin-top: 5px; }
.r-h { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase;
  color: #7a828b; border-bottom: 1px solid #dfe3e8; padding-bottom: 5px; margin: 22px 0 12px; }
.r-item { margin-bottom: 13px; }
.r-item:last-child { margin-bottom: 0; }
.r-top { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; }
.r-top b { font-weight: 600; color: #0b0d10; font-size: 12px; }
.r-top span { color: #7a828b; font-size: 10px; white-space: nowrap; font-family: 'JetBrains Mono', monospace; }
.r-sub { color: #4c545d; font-style: italic; font-size: 10.5px; margin-top: 1px; }
.r-item ul { margin-top: 6px; }
.r-item li { position: relative; padding-left: 13px; color: #333a42; margin-bottom: 3px; }
.r-item li::before { content: ''; position: absolute; left: 3px; top: 7px; width: 3px; height: 3px; border-radius: 50%; background: #9aa2ab; }
.res-facts li { display: flex; gap: 12px; padding: 13px 0; border-bottom: 1px solid var(--line-soft); color: var(--muted); font-size: 14.5px; }
.res-facts li b { color: var(--bone); font-weight: 500; }

/* contact */
.contact-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 48px; align-items: start; }
.social-list { margin-top: 30px; display: flex; flex-direction: column; gap: 10px; }
.social {
  display: flex; align-items: center; gap: 14px; padding: 15px 18px; border-radius: 14px;
  border: 1px solid var(--line); background: var(--graphite); transition: transform 0.3s cubic-bezier(.2,.8,.3,1), border-color 0.3s;
}
.social:hover { transform: translateX(5px); border-color: color-mix(in srgb, var(--accent) 50%, transparent); }
.social .who { flex: 1; }
.social .who b { display: block; font-weight: 500; font-size: 14.5px; }
.social .who span { color: var(--faint); font-size: 12.5px; }
.field { margin-bottom: 16px; }
.field label { display: block; color: var(--faint); margin-bottom: 8px; }
.field input, .field textarea {
  width: 100%; padding: 13px 15px; border-radius: 12px; background: var(--graphite);
  border: 1px solid var(--line); color: var(--bone); font-size: 15px; transition: border-color 0.25s, box-shadow 0.25s;
}
.field textarea { resize: vertical; min-height: 132px; }
.field input:focus, .field textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
.field input::placeholder, .field textarea::placeholder { color: var(--faint); }
.sent { display: flex; align-items: center; gap: 10px; color: #30d158; font-size: 14.5px; }

/* footer */
.pf-foot { border-top: 1px solid var(--line-soft); padding: 40px 0 46px; }
.foot-in { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; color: var(--faint); font-size: 13.5px; }
.foot-links { display: flex; gap: 8px; }

.totop { position: fixed; right: 24px; bottom: 24px; z-index: 45; width: 44px; height: 44px; opacity: 0; pointer-events: none; transform: translateY(10px); transition: opacity 0.3s, transform 0.3s; }
.totop.on { opacity: 1; pointer-events: auto; transform: none; }

@media (max-width: 900px) {
  .pf-links { display: none; }
  .pf-burger { display: grid; }
  .pf-sheet { display: block; }
  .about-grid, .res-grid, .contact-grid, .sig-grid, .proj-grid { grid-template-columns: 1fr; gap: 34px; }
  .proj-grid, .sig-grid { gap: 16px; }
  .pf-section { padding: 88px 0; }
  .pf-wrap { padding: 0 20px; }
  .pf-nav-in { padding: 0 20px; }
}
@media (max-width: 560px) {
  .tl { padding-left: 50px; }
  .tl::before, .tl-fill { left: 15px; }
  .tl-dot { left: -50px; width: 31px; height: 31px; border-radius: 10px; }
  .hero-cta .btn { flex: 1; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .pf *, .pf *::before, .pf *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  .reveal { opacity: 1; transform: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Reveal({ children, delay = 0, className = "", style, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED BITS                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ index, children }) {
  return (
    <Reveal className="pf-eyebrow">
      <span className="mono">{index}</span>
      <span className="bar" />
      <span className="mono">{children}</span>
      <span className="fill" />
    </Reveal>
  );
}

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ------------------------------------------------------------------ */
/*  HERO BACKGROUND FIELD                                              */
/* ------------------------------------------------------------------ */

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
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(72, Math.round((w * h) / 17000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.6,
      }));
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const base = light ? "31,111,235" : "150,180,255";
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx; d.y += d.vy;
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
            ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(${base},${(1 - dist / 128) * (light ? 0.13 : 0.16)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    build(); tick();
    const onResize = () => { build(); };
    window.addEventListener("resize", onResize);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [light]);

  return <canvas ref={ref} className="pf-canvas" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  PROJECT ARTWORK (generative placeholders)                          */
/* ------------------------------------------------------------------ */

function ProjectArt({ kind, hue }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, `hsl(${hue} 62% 17%)`);
    g.addColorStop(1, `hsl(${hue + 24} 48% 8%)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = `hsla(${hue} 90% 78% / 0.5)`;
    ctx.lineWidth = 1;

    const rnd = (() => { let s = hue * 977; return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648); })();

    if (kind === "maze") {
      const c = 26;
      for (let x = 0; x < w; x += c) for (let y = 0; y < h; y += c) {
        ctx.beginPath();
        if (rnd() > 0.5) { ctx.moveTo(x, y); ctx.lineTo(x + c, y + c); }
        else { ctx.moveTo(x + c, y); ctx.lineTo(x, y + c); }
        ctx.globalAlpha = 0.25 + rnd() * 0.5; ctx.stroke();
      }
    } else if (kind === "cards") {
      ctx.globalAlpha = 0.85;
      for (let i = 0; i < 5; i++) {
        const cw = 54, ch = 78, cx = w / 2 - 130 + i * 58, cy = h / 2 - ch / 2 + Math.sin(i) * 12;
        ctx.save(); ctx.translate(cx + cw / 2, cy + ch / 2); ctx.rotate((i - 2) * 0.12);
        ctx.fillStyle = `hsla(${hue} 40% ${92 - i * 4}% / 0.9)`;
        ctx.beginPath(); ctx.roundRect(-cw / 2, -ch / 2, cw, ch, 7); ctx.fill();
        ctx.restore();
      }
    } else if (kind === "bars") {
      const n = 22, bw = w / n;
      for (let i = 0; i < n; i++) {
        const bh = (0.2 + rnd() * 0.7) * h;
        ctx.fillStyle = `hsla(${hue + i * 2} 70% 70% / ${0.25 + rnd() * 0.5})`;
        ctx.beginPath(); ctx.roundRect(i * bw + 3, h - bh, bw - 6, bh, 4); ctx.fill();
      }
    } else if (kind === "bodies") {
      ctx.strokeStyle = `hsla(${hue} 90% 80% / 0.45)`;
      ctx.beginPath(); ctx.moveTo(0, h * 0.86); ctx.lineTo(w, h * 0.86); ctx.lineWidth = 1.5; ctx.stroke();
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
        ctx.fill(); ctx.stroke();
      }
    } else if (kind === "orbit") {
      const cx = w / 2, cy = h / 2;
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
      ctx.beginPath(); ctx.arc(cx, cy, 34, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue + 40} 95% 80% / 0.7)`; ctx.lineWidth = 1.6; ctx.stroke();
    } else {
      ctx.lineWidth = 2.5; ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.75);
      ctx.bezierCurveTo(w * 0.28, h * 0.05, w * 0.42, h * 0.95, w * 0.62, h * 0.4);
      ctx.bezierCurveTo(w * 0.76, h * 0.05, w * 0.82, h * 0.85, w * 0.94, h * 0.32);
      ctx.stroke();
      ctx.setLineDash([5, 9]); ctx.lineWidth = 1; ctx.globalAlpha = 0.35;
      ctx.beginPath(); ctx.moveTo(0, h * 0.5); ctx.lineTo(w, h * 0.5); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const v = ctx.createLinearGradient(0, h * 0.4, 0, h);
    v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
  }, [kind, hue]);

  return <canvas ref={ref} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */

function Navbar({ theme, toggleTheme, active }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setOpen(false); scrollTo(id); };

  return (
    <nav className={`pf-nav ${stuck ? "stuck" : ""}`}>
      <div className="pf-nav-in">
        <button className="pf-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="dot" />
          {CONTENT.name}
        </button>

        <div className="pf-links">
          {CONTENT.sections.map((s) => (
            <button key={s.id} className={`pf-link ${active === s.id ? "on" : ""}`} onClick={() => go(s.id)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="pf-navtools">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Switch theme">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="icon-btn pf-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <div className="pf-sheet" style={{ maxHeight: open ? 520 : 0, transition: "max-height 0.45s cubic-bezier(.2,.8,.3,1)" }}>
        {CONTENT.sections.map((s) => (
          <button key={s.id} onClick={() => go(s.id)}>{s.label}</button>
        ))}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero({ theme }) {
  const letters = CONTENT.name.split("");
  return (
    <header className="pf-hero">
      <div className="pf-glow a" />
      <div className="pf-glow b" />
      <ParticleField light={theme === "light"} />

      <div className="pf-wrap">
        <div className="hero-status mono" style={{ opacity: 0, animation: "rise .8s .1s cubic-bezier(.2,.75,.25,1) forwards" }}>
          <span className="pulse" />
          Open to summer 2027 internships
        </div>

        <h1 className="display hero-name">
          {letters.map((c, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${140 + i * 46}ms` }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h1>

        <div className="hero-rule" style={{ opacity: 0, animation: "rise .8s .6s cubic-bezier(.2,.75,.25,1) forwards" }}>
          <i style={{ background: "var(--accent)", maxWidth: 64 }} />
          <i style={{ background: "var(--bone)", opacity: 0.25 }} />
          <i style={{ background: "var(--flag)", maxWidth: 26, opacity: 0.75 }} />
        </div>

        <p className="mono hero-role" style={{ opacity: 0, animation: "rise .8s .68s cubic-bezier(.2,.75,.25,1) forwards" }}>
          {CONTENT.role}
        </p>

        <p className="hero-intro" style={{ opacity: 0, animation: "rise .8s .8s cubic-bezier(.2,.75,.25,1) forwards" }}>
          {CONTENT.intro}
        </p>

        <div className="hero-cta" style={{ opacity: 0, animation: "rise .8s .95s cubic-bezier(.2,.75,.25,1) forwards" }}>
          <button className="btn primary" onClick={() => scrollTo("projects")}>
            View projects <ArrowUpRight size={16} className="arrow" />
          </button>
          <button className="btn" onClick={() => scrollTo("resume")}>
            <FileText size={16} /> Resume
          </button>
          <button className="btn ghost" onClick={() => scrollTo("contact")}>
            <Mail size={16} /> Contact me
          </button>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="track" />
        <span className="mono">Scroll</span>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section className="pf-section" id="about">
      <div className="pf-wrap">
        <Eyebrow index="01">About</Eyebrow>
        <div className="about-grid">
          <Reveal>
            <div className="photo-frame">
              {CONTENT.photo ? (
                <img src={CONTENT.photo} alt={CONTENT.name} />
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
              <div><MapPin size={14} /> {CONTENT.location}</div>
              <div><GraduationCap size={14} /> {CONTENT.university}</div>
            </div>
          </Reveal>

          <Reveal delay={120} className="about-body">
            <h2 className="display pf-title">Building things that think.</h2>
            {CONTENT.bio.map((p, i) => <p key={i}>{p}</p>)}
            <div className="tagline-row">
              {["Artificial Intelligence", "Machine Learning", "Full Stack", "Software Engineering", "Motorsport"].map((t, i) => (
                <span key={t} className={`chip ${i === 0 ? "hot" : ""}`}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
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
                  <div className="ico"><Icon size={18} /></div>
                  <h3>{cat.label}</h3>
                  <ul>
                    {cat.items.map((it) => <li key={it}><i />{it}</li>)}
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

/* ------------------------------------------------------------------ */
/*  NOW (currently learning, counter, quote)                          */
/* ------------------------------------------------------------------ */

function Learning() {
  const [ref, seen] = useInView(0.3);
  return (
    <div className="card panel" ref={ref}>
      <div className="panel-head"><h3>Currently learning</h3></div>
      <ul className="learn">
        {CONTENT.learning.map((l, i) => (
          <li key={l.label}>
            <div className="top"><span>{l.label}</span><span>{l.pct}%</span></div>
            <div className="rail">
              <i style={{ background: "var(--accent)", width: seen ? `${l.pct}%` : 0, transitionDelay: `${i * 120}ms` }} />
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

function Signals() {
  return (
    <section className="pf-section" id="signals">
      <div className="pf-wrap">
        <Eyebrow index="03">Now</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">What I am working through</h2>
          <p className="pf-lede">Where my attention is at the moment, roughly in order of how much of it each thing gets.</p>
        </Reveal>

        <div className="sig-grid" style={{ marginTop: 44 }}>
          <Reveal><Learning /></Reveal>
          <Reveal delay={100}><QuoteBox /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function ProjectCard({ p, i }) {
  return (
    <div className="card proj-card">
      <div className="proj-art">
        <span className="proj-num">{String(i + 1).padStart(2, "0")}</span>
        <ProjectArt kind={p.art} hue={p.hue} />
      </div>
      <div className="proj-body">
        <h3>{p.title}</h3>
        <p>{p.blurb}</p>
        <div className="proj-tech">
          {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
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
            <span className="chip" style={{ alignSelf: "center", padding: "9px 13px" }}>Demo in progress</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section className="pf-section" id="projects">
      <div className="pf-wrap">
        <Eyebrow index="04">Projects</Eyebrow>
        <Reveal>
          <h2 className="display pf-title">Featured work</h2>
          <p className="pf-lede">Three simulations, all running live in the browser. No install, no setup, just open one and start pulling things around.</p>
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

/* ------------------------------------------------------------------ */
/*  TIMELINE                                                           */
/* ------------------------------------------------------------------ */

function Timeline() {
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
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
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
                  <span className="tl-dot"><Icon size={16} /></span>
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

/* ------------------------------------------------------------------ */
/*  WRITING                                                            */
/* ------------------------------------------------------------------ */

function Blog() {
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
                <div className="go">{p.date} <ChevronRight size={14} /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RESUME                                                             */
/* ------------------------------------------------------------------ */

function Resume() {
  return (
    <section className="pf-section" id="resume">
      <div className="pf-wrap">
        <Eyebrow index="07">Resume</Eyebrow>
        <div className="res-grid">
          <Reveal>
            <div className="viewer">
              <div className="viewer-bar">
                <span className="dots"><i /><i /><i /></span>
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
                            {it.bullets.map((b, k) => <li key={k}>{b}</li>)}
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
              Education, projects, and the tools I use daily. Rendered as text so it stays readable on a phone, with the PDF a click away.
            </p>
            <ul className="res-facts">
              <li><b>Education</b> <span style={{ marginLeft: "auto" }}>UTSA, BS Computer Science, May 2029</span></li>
              <li><b>Then</b> <span style={{ marginLeft: "auto" }}>Master's in computer science</span></li>
              <li><b>Focus</b> <span style={{ marginLeft: "auto" }}>Simulation, algorithms, web</span></li>
              <li><b>Based in</b> <span style={{ marginLeft: "auto" }}>{CONTENT.location}</span></li>
              <li><b>Status</b> <span style={{ marginLeft: "auto" }}>Open to summer 2027 internships</span></li>
            </ul>
            <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
              <a className="btn primary" href="/resume.pdf" download="Abhyuday-Singh-Resume.pdf">
                <Download size={16} /> Download resume
              </a>
              <button className="btn" onClick={() => scrollTo("contact")}>Ask me anything</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ready = form.name.trim() && form.email.trim() && form.message.trim();

  const send = () => {
    if (!ready) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3200);
  };

  const socials = [
    { icon: Github, label: "GitHub", sub: "Code and commits", href: CONTENT.github },
    { icon: Linkedin, label: "LinkedIn", sub: "Work history and updates", href: CONTENT.linkedin },
    { icon: Mail, label: "Email", sub: CONTENT.email, href: `mailto:${CONTENT.email}` },
  ];

  return (
    <section className="pf-section" id="contact">
      <div className="pf-wrap">
        <Eyebrow index="08">Contact</Eyebrow>
        <div className="contact-grid">
          <Reveal>
            <h2 className="display pf-title">Let us build something</h2>
            <p className="pf-lede">
              Internships, research, or a project that needs a second pair of hands. I read everything and reply within a day or two.
            </p>
            <div className="social-list">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} className="social" href={s.href} target="_blank" rel="noreferrer">
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                    <span className="who"><b>{s.label}</b><span>{s.sub}</span></span>
                    <ArrowUpRight size={16} style={{ color: "var(--faint)" }} className="arrow" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card" style={{ padding: 28 }}>
              <div className="field">
                <label className="mono" htmlFor="cn">Name</label>
                <input id="cn" value={form.name} placeholder="Your name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label className="mono" htmlFor="ce">Email</label>
                <input id="ce" type="email" value={form.email} placeholder="you@domain.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="field">
                <label className="mono" htmlFor="cm">Message</label>
                <textarea id="cm" value={form.message} placeholder="What are you working on?"
                  onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <button className="btn primary" onClick={send} disabled={!ready}
                  style={{ opacity: ready ? 1 : 0.45, cursor: ready ? "pointer" : "not-allowed" }}>
                  <Send size={15} /> Send message
                </button>
                {sent && <span className="sent"><Check size={16} /> Sent. Talk soon.</span>}
              </div>
              <p style={{ color: "var(--faint)", fontSize: 12.5, marginTop: 16 }}>
                Front end only right now. Point it at Formspree, Resend, or a route handler to deliver mail.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="pf-foot">
      <div className="pf-wrap foot-in">
        <span>© {new Date().getFullYear()} {CONTENT.name}. All rights reserved.</span>
        <div className="foot-links">
          <a className="icon-btn" href={CONTENT.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a className="icon-btn" href={CONTENT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a className="icon-btn" href={`mailto:${CONTENT.email}`} aria-label="Email"><Mail size={16} /></a>
        </div>
        <span className="mono">Built with Next.js and Tailwind</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT                                                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("about");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    CONTENT.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <div className={`pf ${theme === "light" ? "light" : ""}`}>
      <style>{CSS}</style>
      <div className="pf-grain" />
      <div className="pf-progress" style={{ width: `${progress}%` }} />

      <Navbar theme={theme} toggleTheme={toggleTheme} active={active} />

      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <Signals />
        <Projects />
        <Timeline />
        <Blog />
        <Resume />
        <Contact />
      </main>

      <Footer />

      <button
        className={`icon-btn totop ${showTop ? "on" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={17} />
      </button>
    </div>
  );
}
