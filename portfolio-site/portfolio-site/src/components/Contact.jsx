import { useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Send, Check } from "lucide-react";
import CONTENT from "../content.jsx";
import { Reveal, Eyebrow } from "../hooks.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ready = form.name.trim() && form.email.trim() && form.message.trim();

  const send = () => {
    if (!ready) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3200);
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
              Internships, research, or a project that needs a second pair of hands. I read everything and reply within
              a day or two.
            </p>
            <div className="social-list">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} className="social" href={s.href} target="_blank" rel="noreferrer">
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                    <span className="who">
                      <b>{s.label}</b>
                      <span>{s.sub}</span>
                    </span>
                    <ArrowUpRight size={16} style={{ color: "var(--faint)" }} className="arrow" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card" style={{ padding: 28 }}>
              <div className="field">
                <label className="mono" htmlFor="cn">
                  Name
                </label>
                <input
                  id="cn"
                  value={form.name}
                  placeholder="Your name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="mono" htmlFor="ce">
                  Email
                </label>
                <input
                  id="ce"
                  type="email"
                  value={form.email}
                  placeholder="you@domain.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="mono" htmlFor="cm">
                  Message
                </label>
                <textarea
                  id="cm"
                  value={form.message}
                  placeholder="What are you working on?"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <button
                  className="btn primary"
                  onClick={send}
                  disabled={!ready}
                  style={{ opacity: ready ? 1 : 0.45, cursor: ready ? "pointer" : "not-allowed" }}
                >
                  <Send size={15} /> Send message
                </button>
                {sent && (
                  <span className="sent">
                    <Check size={16} /> Sent. Talk soon.
                  </span>
                )}
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
