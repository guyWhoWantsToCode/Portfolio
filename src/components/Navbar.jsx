import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import CONTENT from "../content.jsx";

export default function Navbar({ active, progress }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 860 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`nav ${open ? "is-open" : ""}`} id="top">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label={`${CONTENT.name}, back to top`}>
          <span className="brand-mark mono" aria-hidden="true">AS</span>
          <span className="brand-name">{CONTENT.name}</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <nav id="site-menu" className="nav-menu" aria-label="Primary">
          <ul>
            {CONTENT.nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn-sm"
            href={CONTENT.resume.href}
            download={CONTENT.resume.filename}
            onClick={() => setOpen(false)}
          >
            <Download size={15} aria-hidden="true" /> Resume
          </a>
        </nav>
      </div>
      <div className="nav-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}
