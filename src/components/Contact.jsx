import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail, Download, Copy, Check, ArrowUpRight } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, SectionHeader } from "../hooks.jsx";

/* Copy with a fallback for browsers or contexts where the Clipboard API is unavailable */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function Contact() {
  const [status, setStatus] = useState("");
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    const ok = await copyText(CONTENT.email);
    setStatus(ok ? "Email address copied" : "Copy failed. Select the address above instead.");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2800);
  };

  const links = [
    { icon: Github, label: "GitHub", sub: "github.com/guyWhoWantsToCode", href: CONTENT.github },
    { icon: Linkedin, label: "LinkedIn", sub: "linkedin.com/in/abhyudaysingh7", href: CONTENT.linkedin },
  ];

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHeader
          id="contact"
          index="06"
          label="Contact"
          title="Get in touch"
          lede="If you're hiring, working on something interesting, or want to talk about a project, email is the quickest way to reach me."
        />
        <Reveal className="contact">
          <div className="contact-main card">
            <p className="card-label mono">
              <Mail size={15} aria-hidden="true" /> Email
            </p>
            <a className="contact-email" href={`mailto:${CONTENT.email}`}>
              {CONTENT.email}
            </a>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${CONTENT.email}`}>
                <Mail size={16} aria-hidden="true" /> Send an email
              </a>
              <button type="button" className="btn" onClick={copy}>
                {status.startsWith("Email") ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} Copy address
              </button>
              <a className="btn" href={CONTENT.resume.href} download={CONTENT.resume.filename}>
                <Download size={16} aria-hidden="true" /> Download resume
              </a>
            </div>
            <p className="copy-status" role="status" aria-live="polite">
              {status}
            </p>
          </div>

          <ul className="contact-links">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.label}>
                  <a className="card link-card" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.label} (opens in a new tab)`}>
                    <Icon size={20} aria-hidden="true" />
                    <span>
                      <b>{l.label}</b>
                      <small>{l.sub}</small>
                    </span>
                    <ArrowUpRight size={16} className="arrow" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
