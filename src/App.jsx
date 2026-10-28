import { ArrowUp } from "lucide-react";
import CONTENT from "./content.jsx";
import { useScrollState, useActiveSection } from "./hooks.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Activities from "./components/Activities.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// "hero" is tracked too so no nav item is highlighted while the page is at the top.
const SECTION_IDS = ["hero", ...CONTENT.nav.map((n) => n.id)];

export default function App() {
  const { progress, showTop } = useScrollState();
  const active = useActiveSection(SECTION_IDS);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar active={active} progress={progress} />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Activities />
        <Contact />
      </main>

      <Footer />

      <a
        className={`to-top ${showTop ? "on" : ""}`}
        href="#top"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={18} aria-hidden="true" />
      </a>
    </div>
  );
}
