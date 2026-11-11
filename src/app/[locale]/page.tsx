import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SplitHero from "@/components/SplitHero";
import WorkGrid from "@/components/WorkGrid";
import { alternates, getDictionary, isLocale, pageUrl } from "@/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const image = "/assets/Logo_Jeremie_Bleue.png";
  return {
    title: dict.home.title,
    description: dict.home.description,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      url: pageUrl(locale),
      title: dict.home.title,
      description: dict.home.description,
      locale: dict.ogLocale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: dict.home.title, description: dict.home.description, images: [image] },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <SplitHero locale={locale} dict={dict} />

      <Reveal id="work" className="section-dark">
        <div className="container">
          <div className="section-title">
            <h2>{dict.home.workTitle}</h2>
          </div>
          <WorkGrid locale={locale} dict={dict} />
        </div>
      </Reveal>

      <Reveal id="contact" className="section-contact">
        <div className="container split-content">
          <div className="text-col">
            <h2>{dict.contact.title}</h2>
            <p className="intro">{dict.contact.intro}</p>
            <p>{dict.contact.text}</p>
          </div>
          <div className="media-col">
            <ContactForm dict={dict} />
          </div>
        </div>
      </Reveal>
    </>
  );
}
