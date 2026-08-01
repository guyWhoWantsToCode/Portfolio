import {
  Terminal, Layers, Server, Cpu, Wrench,
  GraduationCap, Users, Rocket, Trophy, Flag, BookOpen,
} from "lucide-react";

const CONTENT = {
  name: "Abhyuday Singh",
  school: "Computer Science Student @ UTSA",
  role: "Aspiring AI/ML Engineer • Software Developer • Motorsport Enthusiast",
  intro:
    "I build interactive web applications, algorithm visualizations, and AI-powered software.",
  location: "San Antonio, Texas",
  university: "The University of Texas at San Antonio",
  email: "sabhyuday14@gmail.com",
  github: "https://github.com/guyWhoWantsToCode",
  linkedin: "https://linkedin.com/in/yourhandle",
  photo: "/headshot.jpg",

  bio: [
    "I am a computer science student at UTSA, class of 2029, one year in and building whatever I am curious about at the time.",
    "Most of what I make is interactive: physics you can push around, algorithms you can watch think, simulations that make an abstract idea concrete. I like the point where the maths stops being a formula and starts being something on screen that behaves correctly.",
    "Outside of programming, you will probably find me watching Formula 1, experimenting with new technologies, or building side projects that teach me something new. Race engineering is a constraint problem with a stopwatch attached, which turns out to be excellent practice for the day job.",
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
      shot: "/screenshots/physics-sandbox.png",
      blurb:
        "Drop rigid bodies into a scene, then change the rules underneath them while it runs: gravity, buoyancy, explosions, even a black hole.",
      tech: ["JavaScript", "Matter.js", "HTML", "CSS", "GitHub Pages"],
      hue: 212,
      art: "bodies",
    },
    {
      title: "Pathfinder",
      repo: "https://github.com/guyWhoWantsToCode/Pathfinder",
      demo: "https://guywhowantstocode.github.io/Pathfinder/",
      shot: "/screenshots/pathfinder.png",
      blurb:
        "Five search algorithms crossing a grid you draw yourself, with a comparison mode that runs two side by side to show how much work each one wastes.",
      tech: ["JavaScript", "HTML", "CSS", "GitHub Pages"],
      hue: 152,
      art: "maze",
    },
    {
      title: "Singularity",
      repo: "https://github.com/guyWhoWantsToCode/black-hole-simulator",
      demo: "https://guywhowantstocode.github.io/black-hole-simulator/",
      shot: "/screenshots/singularity.png",
      blurb:
        "Hundreds of particles under Newtonian gravity with live telemetry. Click anywhere to drop a second black hole and watch every orbit fall apart.",
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

export default CONTENT;
