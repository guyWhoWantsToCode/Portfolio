import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import CONTENT from "./content.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Now from "./components/Now.jsx";
import Projects from "./components/Projects.jsx";
import Timeline from "./components/Timeline.jsx";
import Blog from "./components/Blog.jsx";
import Resume from "./components/Resume.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
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
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
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
      <div className="pf-grain" />
      <div className="pf-progress" style={{ width: `${progress}%` }} />

      <Navbar theme={theme} toggleTheme={toggleTheme} active={active} />

      <main>
        <Hero theme={theme} />
        <About />
        <Skills />
        <Now />
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
