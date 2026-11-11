"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, localeLabels, type Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/fr";
import Logo from "./Logo";
import styles from "./Header.module.css";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.split("/").slice(2).join("/");
  const suffix = rest ? `/${rest}` : "";

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.row}`}>
        <Logo label={dict.nav.home} href={`/${locale}`} onNavigate={close} />

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
          aria-label={dict.nav.menu}
          aria-expanded={open}
          aria-controls="mainNav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`} id="mainNav">
          <span className={styles.label} aria-hidden="true">
            {dict.nav.pages}
          </span>
          <Link href={`/${locale}/about`} onClick={close}>
            {dict.nav.about}
          </Link>
          <Link href={`/${locale}#work`} onClick={close}>
            {dict.nav.portfolio}
          </Link>
          <Link href={`/${locale}#contact`} onClick={close}>
            {dict.nav.contact}
          </Link>
          <span className={`${styles.label} ${styles.labelLang}`} aria-hidden="true">
            {dict.nav.languages}
          </span>
          {locales
            .filter((code) => code !== locale)
            .map((code) => (
              <Link
                key={code}
                href={`/${code}${suffix}`}
                className={styles.lang}
                hrefLang={code === "us" ? "en" : code}
                onClick={close}
              >
                {localeLabels[code]}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
