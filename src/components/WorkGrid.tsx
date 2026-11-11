import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/fr";
import styles from "./WorkGrid.module.css";

export default function WorkGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home;
  const external = [
    { name: "Ruben's Pizza", url: "https://www.rubens-pizza.com", image: "/assets/work/rubens-pizza.jpg", text: t.projects.rubens },
    { name: "Elsa & Ruben", url: "https://www.elsa-ruben.com", image: "/assets/work/elsa-ruben.jpg", text: t.projects.elsa },
  ];

  return (
    <ul className={styles.grid}>
      {external.map((project) => (
        <li key={project.url} className={styles.card}>
          <div className={styles.media}>
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(max-width: 600px) 92vw, (max-width: 920px) 46vw, 360px"
              className={styles.img}
            />
            <a
              className={styles.overlay}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — ${t.viewSite}`}
              tabIndex={-1}
            >
              <span>{t.viewSite}</span>
            </a>
          </div>
          <div className={styles.copy}>
            <h3>{project.name}</h3>
            <p>{project.text}</p>
            <a className="work-link" href={project.url} target="_blank" rel="noopener noreferrer">
              {t.viewSite}
            </a>
          </div>
        </li>
      ))}
      <li className={styles.card}>
        <div className={styles.media}>
          <Image
            src="/assets/BMKY_app/BMKY_image.jpeg"
            alt={t.projects.bmkyAlt}
            fill
            sizes="(max-width: 600px) 92vw, (max-width: 920px) 46vw, 360px"
            className={styles.img}
          />
          <Link className={styles.overlay} href={`/${locale}/bmky-app`} aria-label={t.viewProject} tabIndex={-1}>
            <span>{t.viewProject}</span>
          </Link>
        </div>
        <div className={styles.copy}>
          <h3>Beth Amidrash App</h3>
          <p>{t.projects.bmky}</p>
          <Link className="work-link" href={`/${locale}/bmky-app`}>
            {t.viewProject}
          </Link>
        </div>
      </li>
    </ul>
  );
}
