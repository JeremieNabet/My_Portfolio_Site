"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/fr";
import styles from "./ContactForm.module.css";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = { kind: "idle" | "sending" | "success" | "error"; message: string };

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const mountedAt = useRef(0);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    if (SITE_KEY && !token) {
      setStatus({ kind: "error", message: t.antibot });
      return;
    }

    setStatus({ kind: "sending", message: t.sendingStatus });

    try {
      const payload = {
        ...Object.fromEntries(new FormData(event.currentTarget).entries()),
        ts: mountedAt.current,
        turnstileToken: token,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        const message = result.error === "too-fast" || result.error === "captcha" ? t.antibot : t.error;
        throw new Error(message);
      }

      setStatus({ kind: "success", message: t.success });
      formRef.current?.reset();
      mountedAt.current = Date.now();
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : t.error });
    } finally {
      // Un token Turnstile n'est valable qu'une seule fois.
      setToken("");
      turnstileRef.current?.reset();
    }
  }

  const sending = status.kind === "sending";

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="fullName">{t.fullName}</label>
          <input id="fullName" name="fullName" autoComplete="name" required minLength={2} maxLength={100} />
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">{t.phone}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={25}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="company">{t.company}</label>
          <input id="company" name="company" autoComplete="organization" maxLength={100} />
        </div>
        <div className={styles.field}>
          <label htmlFor="serviceType">{t.serviceType}</label>
          <select id="serviceType" name="serviceType" required defaultValue="">
            <option value="">{t.select}</option>
            <option value="salesforce">{t.services.salesforce}</option>
            <option value="web">{t.services.web}</option>
            <option value="mobile">{t.services.mobile}</option>
            <option value="autre">{t.services.autre}</option>
          </select>
        </div>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="message">{t.message}</label>
          <textarea id="message" name="message" placeholder={t.placeholder} maxLength={2000} />
        </div>

        {/* Champ piège : invisible pour les humains, rempli par les bots. */}
        <div className={styles.trap} aria-hidden="true">
          <label htmlFor="hp_website">Website</label>
          <input id="hp_website" name="hp_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
      </div>

      {SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={SITE_KEY}
          options={{ appearance: "interaction-only", theme: "light" }}
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? t.sending : t.submit}
      </button>
      <p
        className={`${styles.status} ${status.kind === "success" ? styles.success : ""} ${status.kind === "error" ? styles.error : ""}`}
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}
