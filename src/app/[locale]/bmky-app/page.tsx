import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alternates, getDictionary, isLocale, pageUrl } from "@/i18n";
import styles from "./bmky.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.bmky.title,
    description: dict.bmky.description,
    alternates: alternates(locale, "/bmky-app"),
    openGraph: {
      type: "article",
      url: pageUrl(locale, "/bmky-app"),
      title: dict.bmky.title,
      description: dict.bmky.description,
      locale: dict.ogLocale,
      images: ["/assets/BMKY_app/BMKY_image.jpeg"],
    },
  };
}

export default async function BmkyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).bmky;

  return (
    <>
      <section className={`section-light ${styles.hero}`}>
        <div className={`container ${styles.heroGrid}`}>
          <div className="text-col">
            <h1>BMKY App</h1>
            <p className="intro">{t.intro}</p>
            <p>{t.text}</p>
            <Link className="work-link" href={`/${locale}#work`}>
              {t.back}
            </Link>
          </div>
          <div className="media-col">
            <Image
              className={styles.cover}
              src="/assets/BMKY_app/BMKY_image.jpeg"
              alt={t.coverAlt}
              width={1200}
              height={800}
              sizes="(max-width: 920px) 92vw, 500px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-contact">
        <div className="container">
          <div className="section-title">
            <h2>{t.overviewTitle}</h2>
          </div>
          <p className={styles.lead}>{t.lead}</p>
          <div className={styles.points}>
            {t.points.map((point) => (
              <article key={point.title} className={styles.point}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <div className="section-title">
            <h2>{t.featuresTitle}</h2>
          </div>
          <div className={styles.features}>
            {t.features.map((feature) => (
              <article key={feature.title} className={styles.feature}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <div className="section-title">
            <h2>{t.galleryTitle}</h2>
          </div>
          <div className={styles.gallery}>
            {t.shots.map((shot) => (
              <figure key={shot.file} className={styles.shot}>
                <Image
                  src={`/assets/BMKY_app/${shot.file}`}
                  alt={shot.alt}
                  width={600}
                  height={1200}
                  sizes="(max-width: 600px) 46vw, (max-width: 920px) 30vw, 210px"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
