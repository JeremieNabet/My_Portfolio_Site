import type { Metadata, Viewport } from "next";
import { Heebo, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE_URL, getDictionary, isLocale, locales } from "@/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-he", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/assets/favicons/favicon.svg", type: "image/svg+xml" }],
    apple: "/assets/favicons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={dict.htmlLang} dir={dict.dir} className={`${inter.variable} ${mono.variable} ${heebo.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          {dict.nav.skip}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
