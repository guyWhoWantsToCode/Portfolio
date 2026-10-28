import CONTENT from "../content.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>
          © {new Date().getFullYear()} {CONTENT.name}
        </p>
        <p className="mono">Built with React and Vite</p>
        <ul aria-label="Footer links">
          <li>
            <a href={CONTENT.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={CONTENT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={CONTENT.resume.href} download={CONTENT.resume.filename}>
              Resume
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
