import { useState, useEffect, useRef } from "react";

/* Scroll a section into view by id */
export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Fires once when the element enters the viewport */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* Fade-and-rise wrapper for scroll reveals */
export function Reveal({ children, delay = 0, className = "", style, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* Numbered section label with rule */
export function Eyebrow({ index, children }) {
  return (
    <Reveal className="pf-eyebrow">
      <span className="mono">{index}</span>
      <span className="bar" />
      <span className="mono">{children}</span>
      <span className="fill" />
    </Reveal>
  );
}
