"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/fr";
import styles from "./SplitHero.module.css";

const CODER_LABEL = "<coder>";

export default function SplitHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const faceRef = useRef<HTMLDivElement>(null);
  const designerHeadRef = useRef<HTMLHeadingElement>(null);
  const designerTextRef = useRef<HTMLParagraphElement>(null);
  const coderHeadRef = useRef<HTMLHeadingElement>(null);
  const coderTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const face = faceRef.current;
    const coderHead = coderHeadRef.current;
    const coderText = coderTextRef.current;
    if (!face || !coderHead) return;

    const left = [designerHeadRef.current, designerTextRef.current].filter(Boolean) as HTMLElement[];
    const right = [coderHead, coderTextRef.current].filter(Boolean) as HTMLElement[];
    const mobile = window.matchMedia("(max-width: 920px)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const rtl = dict.dir === "rtl";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coderDescription = coderText?.textContent?.trim() ?? "";

    let lastPointerAt = 0;
    let userDriven = false;
    let typing = false;
    let wasOverCoder = false;
    const timers: number[] = [];

    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    function startCoderTyping() {
      if (!coderHead || typing || reduced) return;
      typing = true;
      coderHead.textContent = "";
      if (coderText) coderText.textContent = "";
      coderHead.classList.add(styles.codeTyping);

      let h = 0;
      const typeHead = () => {
        h += 1;
        coderHead.textContent = CODER_LABEL.slice(0, h);
        if (h < CODER_LABEL.length) return later(typeHead, 170);
        if (!coderText || !coderDescription) {
          coderHead.classList.remove(styles.codeTyping);
          typing = false;
          return;
        }
        let p = 0;
        const typePara = () => {
          p += 1;
          coderText.textContent = coderDescription.slice(0, p);
          if (p < coderDescription.length) later(typePara, 90);
          else {
            coderHead.classList.remove(styles.codeTyping);
            typing = false;
          }
        };
        later(typePara, 520);
      };
      later(typeHead, 260);
    }

    function update(ratio: number) {
      const isMobile = mobile.matches;
      const clamped = Math.max(0, Math.min(1, ratio));
      const visual = isMobile ? clamped : Math.max(0.14, Math.min(0.86, clamped));
      face!.style.setProperty("--split", String(visual));
      face!.style.setProperty("--hero-shift", ((clamped - 0.5) * 2).toFixed(3));

      const rect = face!.getBoundingClientRect();
      // Position de l'axe de séparation + distance mesurée depuis le bord "start" (gauche, ou droite en RTL)
      const axis = isMobile
        ? rect.top + rect.height * visual
        : rtl
          ? rect.right - rect.width * visual
          : rect.left + rect.width * visual;
      const offsetOf = (r: DOMRect, point: number) =>
        isMobile ? point - r.top : rtl ? r.right - point : point - r.left;

      const coderRect = coderHead!.getBoundingClientRect();
      const coderCenter = isMobile ? coderRect.top + coderRect.height / 2 : coderRect.left + coderRect.width / 2;
      const coderOnDark = rtl && !isMobile ? coderCenter <= axis : coderCenter >= axis;
      coderHead!.style.setProperty("--coder-cursor-color", coderOnDark ? "#f4f7fc" : "#2f4f78");

      if (userDriven) {
        const over = rtl && !isMobile ? axis <= coderCenter : axis >= coderCenter;
        if (over && !wasOverCoder) startCoderTyping();
        wasOverCoder = over;
      }

      [...left, ...right].forEach((el) => {
        const r = el.getBoundingClientRect();
        const size = isMobile ? r.height : r.width;
        const raw = ((offsetOf(r, axis)) / (size || 1)) * 100;
        el.style.setProperty("--text-cut", Math.max(0, Math.min(100, raw)).toFixed(2) + "%");
      });
    }

    function fromScroll() {
      const rect = face!.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const header = document.querySelector("header");
      const usableTop = Math.max(0, Math.min(vh, header ? header.getBoundingClientRect().bottom : 0));
      const anchor = usableTop + (vh - usableTop) * 0.5;
      const centered = (anchor - rect.top) / (rect.height || 1);
      const centeredAtTop = (vh - usableTop) / (2 * (rect.height || 1));
      const mobileRatio = centered - (centeredAtTop - 0.5);
      const scrollRatio = (vh - rect.top) / (vh + rect.height);
      face!.style.setProperty("--hero-progress", Math.max(0, Math.min(1, scrollRatio)).toFixed(3));
      update(mobile.matches ? mobileRatio : scrollRatio);
    }

    const onMove = (event: MouseEvent) => {
      const rect = face.getBoundingClientRect();
      const m = mobile.matches;
      const pos = m ? event.clientY - rect.top : rtl ? rect.right - event.clientX : event.clientX - rect.left;
      const len = m ? rect.height : rect.width;
      userDriven = true;
      lastPointerAt = Date.now();
      update(pos / (len || 1));
    };
    const onLeave = () => fromScroll();
    const onScroll = () => {
      if (Date.now() - lastPointerAt < 140) return;
      userDriven = true;
      fromScroll();
    };
    const onResize = () => {
      if (Date.now() - lastPointerAt < 140) return;
      fromScroll();
    };

    let touchStart = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStart = mobile.matches ? event.touches[0].clientY : rtl ? -event.touches[0].clientX : event.touches[0].clientX;
      face.classList.add(styles.dragging);
    };
    const onTouchMove = (event: TouchEvent) => {
      userDriven = true;
      const current = mobile.matches ? event.touches[0].clientY : rtl ? -event.touches[0].clientX : event.touches[0].clientX;
      const rect = face.getBoundingClientRect();
      const len = mobile.matches ? rect.height : rect.width;
      update(0.5 + (current - touchStart) / (len || 1));
    };
    const onTouchEnd = () => {
      face.classList.remove(styles.dragging);
      fromScroll();
    };

    face.addEventListener("mousemove", onMove);
    face.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (coarse) {
      face.addEventListener("touchstart", onTouchStart, { passive: true });
      face.addEventListener("touchmove", onTouchMove, { passive: true });
      face.addEventListener("touchend", onTouchEnd);
    }
    fromScroll();

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      face.removeEventListener("mousemove", onMove);
      face.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      face.removeEventListener("touchstart", onTouchStart);
      face.removeEventListener("touchmove", onTouchMove);
      face.removeEventListener("touchend", onTouchEnd);
      if (coderHead) coderHead.textContent = CODER_LABEL;
      if (coderText) coderText.textContent = coderDescription;
      coderHead.classList.remove(styles.codeTyping);
    };
  }, [dict.dir]);

  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className="sr-only">{dict.home.h1}</h1>
        <div className={styles.face} ref={faceRef}>
          <a className={`${styles.panel} ${styles.left}`} href="#contact">
            <div className={`${styles.copy} ${styles.designerCopy}`}>
              <h2 ref={designerHeadRef} className={`${styles.dynamic} ${styles.dynamicLeft}`}>
                designer
              </h2>
              <p ref={designerTextRef} className={`${styles.dynamic} ${styles.dynamicLeft}`}>
                {dict.home.designerText}
              </p>
            </div>
          </a>
          <Link className={`${styles.panel} ${styles.right}`} href={`/${locale}/about`}>
            <div className={styles.copy}>
              <h2 ref={coderHeadRef} className={`${styles.dynamic} ${styles.dynamicRight} ${styles.coder}`} dir="ltr">
                {CODER_LABEL}
              </h2>
              <p ref={coderTextRef} className={`${styles.dynamic} ${styles.dynamicRight} ${styles.coderText}`}>
                {dict.home.coderText}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
