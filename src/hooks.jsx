import { useState, useEffect, useRef } from "react";

/* Fires once when the element enters the viewport */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* Fade-and-rise wrapper for scroll reveals (disabled by CSS for reduced motion) */
export function Reveal({ as: Tag = "div", children, delay = 0, className = "", style, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Numbered section heading shared by every section */
export function SectionHeader({ id, index, label, title, lede }) {
  return (
    <Reveal as="header" className="sec-head">
      <p className="eyebrow mono">
        <span>{index}</span>
        <i aria-hidden="true" />
        <span>{label}</span>
      </p>
      <h2 id={`${id}-title`} className="sec-title">
        {title}
      </h2>
      {lede && <p className="sec-lede">{lede}</p>}
    </Reveal>
  );
}

/* Page scroll progress (0-1) and back-to-top visibility */
export function useScrollState() {
  const [state, setState] = useState({ progress: 0, showTop: false });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        progress: max > 0 ? Math.min(1, window.scrollY / max) : 0,
        showTop: window.scrollY > 700,
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return state;
}

/* Id of the section currently crossing the middle of the viewport */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}
