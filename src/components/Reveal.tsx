"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  as?: "section" | "div";
  className?: string;
  id?: string;
  delay?: number;
  children: React.ReactNode;
};

/** Révèle son contenu au scroll. Le contenu reste visible sans JS (SSR). */
export default function Reveal({ as: Tag = "section", className = "", id, delay = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // déjà à l'écran: pas d'animation

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", className, armed ? "is-armed" : "", visible ? "is-visible" : ""].filter(Boolean).join(" ");

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      id={id}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
