/*
  All user-facing content lives here. Edit this file and the whole site updates.
  Source of truth: the October 2026 resume (public/resume.pdf).
  The resume contains a phone number; it is intentionally NOT used anywhere on the site.
*/

const SITE_URL = "https://portfolio-gules-ten-53.vercel.app";
const GITHUB = "https://github.com/guyWhoWantsToCode";

const CONTENT = {
  siteUrl: SITE_URL,
  name: "Abhyuday Singh",
  location: "San Antonio, TX",
  email: "sabhyuday14@gmail.com",
  github: GITHUB,
  linkedin: "https://linkedin.com/in/abhyudaysingh7",
  resume: { href: "/resume.pdf", filename: "Abhyuday-Singh-Resume.pdf" },
  photo: { src: "/headshot.jpg", width: 480, height: 600 },

  hero: {
    status: "Computer Science student at UTSA",
    // Non-breaking hyphens (U+2011) keep "full-stack" and "AI-powered" from splitting across lines.
    headline: "I build backend systems, full‑stack apps, and AI‑powered software.",
    summary:
      "My projects so far include async APIs, real-time data pipelines, and applications built on LLM APIs, each with a working interface on top.",
    areas: ["Backend", "Full-stack", "AI / ML"],
    // Rendered as a key/value profile card next to the headline.
    profile: [
      ["school", "UTSA · B.S. Computer Science"],
      ["graduating", "May 2029"],
      ["focus", "Backend · Full-stack · AI / ML"],
      ["builds", "Async APIs, WebSocket and UDP pipelines, LLM-backed apps"],
      ["stack", "Python · FastAPI · TypeScript · React · Next.js · PostgreSQL"],
      ["based", "San Antonio, TX"],
    ],
  },

  about: {
    paragraphs: [
      "I'm a computer science student at the University of Texas at San Antonio, graduating in 2029. I'm most interested in backend and full-stack engineering, and in building software where an AI model is one dependable part of a larger system.",
      "The projects I'm proudest of sit on the backend: a scheduler that shares a fixed Gemini API budget fairly across competing agents, and a telemetry pipeline that turns raw UDP packets into lap-by-lap analysis. I like problems where the interesting part is how a system behaves under constraints such as rate limits, bounded queues, and data streams that never wait for you.",
      "I build projects end to end, from API design and automated tests with pytest to the React or Next.js interface on top. I also enjoy visualization work like pathfinding and physics simulations, where an algorithm turns into something you can watch.",
    ],
    interests: ["Software engineering", "Backend development", "Full-stack development", "Artificial intelligence and machine learning"],
  },

  education: {
    school: "The University of Texas at San Antonio (UTSA)",
    degree: "B.S. in Computer Science",
    date: "Expected May 2029",
    place: "San Antonio, TX",
    gpa: "3.43 / 4.00",
    coursework: [
      "Data Structures",
      "Object-Oriented Programming",
      "Discrete Mathematics",
      "Linear Algebra",
      "C Programming",
    ],
  },

  experience: [
    {
      role: "Volunteer Hour Coordinator",
      org: "Hope for Triumph (nonprofit)",
      date: "Aug 2022 – Sep 2025",
      bullets: [
        "Maintained and validated volunteer-hour records for 50+ participants, using organized tracking systems to improve consistency of reporting.",
        "Prepared activity summaries for nonprofit staff and coordinated accurate reporting under deadlines.",
      ],
    },
  ],

  activities: [
    {
      label: "Hackathons",
      title: "RowdyHacks and CodeRED",
      body: "Collaborated with teammates on time-constrained project builds.",
    },
    {
      label: "Award",
      title: "President's Volunteer Service Award",
      body: "Silver level (250+ hours) and Bronze level (100+ hours).",
    },
    {
      label: "Competition",
      title: "DECA",
      body: "Qualified for the state competition in Automotive Marketing.",
    },
  ],

  skills: [
    { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL"] },
    { label: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
    { label: "Backend", items: ["FastAPI", "REST APIs", "WebSockets", "Asynchronous Python"] },
    { label: "Data & tools", items: ["PostgreSQL", "Supabase", "Git", "GitHub", "pytest", "Streamlit"] },
    { label: "AI", items: ["OpenAI API", "Gemini API"] },
  ],

  /* Featured projects: shown as full case-study cards. */
  projects: [
    {
      id: "starflow",
      title: "StarFlow",
      tagline: "Multi-Agent AI Request Scheduler",
      badge: "Team project",
      purpose:
        "When several AI agents share one rate-limited API, a single agent that floods or retries can starve the rest. StarFlow sits in front of Gemini and decides whose request is released next, so every agent keeps a protected share of capacity.",
      specs: ["10 requests/s shared budget", "20-request bounded queues"],
      challenges: [
        "Guaranteeing each agent its own capacity while redistributing unused requests to agents with waiting work.",
        "Bounding every agent's queue so an overloaded agent is rejected instead of draining the shared budget.",
        "Streaming live scheduler state over WebSockets and storing per-second metrics in PostgreSQL.",
      ],
      contribution:
        "I independently developed the backend scheduler: fair API-budget allocation, bounded request queues, Gemini dispatch, live WebSocket updates, and PostgreSQL metrics. The React dashboard that consumes them was built by the team.",
      tech: ["Python", "FastAPI", "asyncio", "PostgreSQL", "WebSockets", "Gemini API"],
      repo: `${GITHUB}/star_flow`,
      demo: { href: "https://starflow.select", label: "Live site" },
      shot: {
        src: "/screenshots/starflow.jpg",
        alt: "StarFlow landing page: the headline 'One API. Multiple Agents. Fair Access.' over an Earth and galaxy background.",
        caption: "Team-built frontend",
      },
      flow: ["Agent requests", "Bounded queues", "Fair-share scheduler", "Gemini API"],
    },
    {
      id: "f1-telemetry-coach",
      title: "F1 Telemetry Coach",
      tagline: "Real-Time Lap Analysis",
      purpose:
        "Reads race telemetry streamed over UDP, records each lap, and compares a reference run against a new one so a driver can see where time is gained or lost through a corner.",
      challenges: [
        "Aligning laps by track distance rather than time, so runs at different speeds can be compared point by point.",
        "Detecting corner events and measuring braking, throttle pickup, and minimum speed.",
        "Keeping the core processing logic covered by automated tests.",
      ],
      contribution:
        "I developed the application end to end: UDP data ingestion, lap recording, distance-aligned comparisons, braking, throttle, and corner analysis, REST endpoints, a React dashboard, and automated tests for the core processing.",
      tech: ["Python", "FastAPI", "React", "TypeScript", "UDP", "pytest"],
      repo: `${GITHUB}/f1-telemetry-coach`,
      flow: ["UDP telemetry", "Lap recorder", "Distance alignment", "Corner analysis", "React dashboard"],
    },
    {
      id: "ai-resume-reviewer",
      title: "AI Resume Reviewer",
      tagline: "Full-Stack AI Application",
      purpose:
        "Signed-in users upload a PDF or DOCX resume and receive structured AI-generated feedback on it.",
      challenges: [
        "Extracting usable text from both PDF and DOCX uploads.",
        "Validating the model's output against a Zod schema so the interface renders structured feedback instead of free-form text.",
        "Building authenticated user and file workflows on Supabase.",
      ],
      contribution:
        "I built the authenticated upload flow, PDF/DOCX text extraction, OpenAI-powered feedback, Zod validation of structured output, and the Supabase-backed user and file workflows.",
      tech: ["Next.js", "TypeScript", "Supabase", "OpenAI API", "Zod"],
      repo: `${GITHUB}/ai-resume-reviewer`,
      demo: { href: "https://ai-resume-reviewer-neon.vercel.app", label: "Live demo" },
      shot: {
        src: "/screenshots/ai-resume-reviewer.jpg",
        alt: "AI Resume Reviewer landing page with the headline 'Get your resume reviewed by AI in seconds' and a sample report card.",
        caption: "Landing page",
      },
    },
    {
      id: "pathfinder",
      title: "Pathfinder",
      tagline: "Graph Search Visualizer",
      purpose:
        "An interactive grid for watching graph-search algorithms explore a map one node at a time, so the differences between them are visible instead of abstract.",
      challenges: [
        "Implementing five algorithms with different strategies: BFS, DFS, Dijkstra, A*, and greedy best-first search.",
        "A side-by-side comparison mode that runs two algorithms on the same grid.",
        "Generating mazes procedurally for the algorithms to solve.",
      ],
      contribution:
        "I built the visualizer, all five search algorithms, the comparison mode, and the maze generation.",
      tech: ["JavaScript", "HTML", "CSS"],
      repo: `${GITHUB}/Pathfinder`,
      demo: { href: "https://guywhowantstocode.github.io/Pathfinder/", label: "Live demo" },
      shot: {
        src: "/screenshots/pathfinder.jpg",
        alt: "Pathfinder interface with algorithm controls, a search grid with start and target nodes, and a run readout panel.",
        caption: "A* search, ready to run",
      },
    },
  ],

  /* Smaller projects: compact cards. All demos were checked and respond. */
  moreProjects: [
    {
      title: "Physics Sandbox",
      body: "A 2D rigid-body physics sandbox where gravity, buoyancy, explosions, and a black hole can be changed while the simulation runs.",
      tech: ["JavaScript", "Matter.js", "HTML", "CSS"],
      repo: `${GITHUB}/physics-sandbox`,
      demo: "https://guywhowantstocode.github.io/physics-sandbox/",
    },
    {
      title: "Singularity",
      body: "A black-hole simulator with hundreds of particles under Newtonian gravity, live telemetry, and no external libraries.",
      tech: ["JavaScript", "Canvas", "HTML", "CSS"],
      repo: `${GITHUB}/black-hole-simulator`,
      demo: "https://guywhowantstocode.github.io/black-hole-simulator/",
    },
  ],

  nav: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "activities", label: "Activities" },
    { id: "contact", label: "Contact" },
  ],
};

export default CONTENT;
