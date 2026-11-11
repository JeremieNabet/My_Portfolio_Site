import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { alternates, getDictionary, isLocale, pageUrl } from "@/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.description,
    alternates: alternates(locale, "/about"),
    openGraph: {
      type: "profile",
      url: pageUrl(locale, "/about"),
      title: dict.about.title,
      description: dict.about.description,
      locale: dict.ogLocale,
      images: ["/assets/Logo_Jeremie_Bleue.png"],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).about;

  return (
    <>
      <section className="section-light">
        <div className="container split-content">
          <div className="text-col">
            <h1 className="sr-only">{t.h1}</h1>
            <h2>{t.aboutTitle}</h2>
            <p className="intro">{t.intro}</p>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
          <div className="media-col">
            <Image
              className="about-photo"
              src="/assets/IMG_8999_no_bg.png"
              alt={t.photoAlt}
              width={900}
              height={1125}
              sizes="(max-width: 920px) 92vw, 540px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section-contact">
        <div className="container split-content" style={{ alignItems: "start" }}>
          <div className="text-col">
            <h2>{t.approachTitle}</h2>
            <p className="intro">{t.approachIntro}</p>
            <p>{t.approach1}</p>
            <p>{t.approach2}</p>
          </div>
          <div className="text-col">
            <h2>{t.expertiseTitle}</h2>
            <p className="intro">{t.expertiseIntro}</p>
            {t.expertise.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
