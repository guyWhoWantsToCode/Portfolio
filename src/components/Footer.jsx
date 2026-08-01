import { Github, Linkedin, Mail } from "lucide-react";
import CONTENT from "../content.jsx";

export default function Footer() {
  return (
    <footer className="pf-foot">
      <div className="pf-wrap foot-in">
        <span>
          © {new Date().getFullYear()} {CONTENT.name}. All rights reserved.
        </span>
        <div className="foot-links">
          <a className="icon-btn" href={CONTENT.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a className="icon-btn" href={CONTENT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a className="icon-btn" href={`mailto:${CONTENT.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
        <span className="mono">Built with React and Vite</span>
      </div>
    </footer>
  );
}
