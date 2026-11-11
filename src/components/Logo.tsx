"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Logo.module.css";

const NAME = "Jeremie Nabet";
const TOTAL = 4800;

export default function Logo({ label, href, onNavigate }: { label: string; href: string; onNavigate?: () => void }) {
  const [rolling, setRolling] = useState(false);
  const [text, setText] = useState("");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    setText("");
    setRolling(false);
    // relance l'animation CSS au frame suivant
    window.requestAnimationFrame(() => {
      setRolling(true);
      const arrival = Math.round(TOTAL * 0.12);
      const typeStep = arrival / NAME.length;
      const eraseStart = arrival + 3000;

      for (let i = 1; i <= NAME.length; i += 1) {
        timers.current.push(window.setTimeout(() => setText(NAME.slice(0, i)), Math.round(i * typeStep)));
      }
      for (let i = NAME.length - 1; i >= 0; i -= 1) {
        const step = NAME.length - 1 - i;
        timers.current.push(window.setTimeout(() => setText(NAME.slice(0, i)), eraseStart + step * 42));
      }
    });
  }, [clearTimers]);

  const onAnimationEnd = (event: React.AnimationEvent) => {
    if (event.animationName.includes("logo-roll")) {
      clearTimers();
      setText("");
      setRolling(false);
    }
  };

  return (
    <Link
      href={href}
      className={`${styles.logo} ${rolling ? styles.rolling : ""}`}
      aria-label={label}
      onClick={() => {
        onNavigate?.();
        run();
      }}
      onAnimationEnd={onAnimationEnd}
    >
      <span className={styles.badge} aria-hidden="true">
        JN
      </span>
      <span className={styles.name} aria-hidden="true">
        {text}
      </span>
    </Link>
  );
}
