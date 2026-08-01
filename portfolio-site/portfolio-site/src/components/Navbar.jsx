import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import CONTENT from "../content.jsx";
import { scrollTo } from "../hooks.jsx";

export default function Navbar({ theme, toggleTheme, active }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

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

      <div
        className="pf-sheet"
        style={{ maxHeight: open ? 520 : 0, transition: "max-height 0.45s cubic-bezier(.2,.8,.3,1)" }}
      >
        {CONTENT.sections.map((s) => (
          <button key={s.id} onClick={() => go(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
