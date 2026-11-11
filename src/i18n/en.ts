import type { Dictionary } from "./fr";

export const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",
  dir: "ltr",
  nav: {
    skip: "Skip to content",
    pages: "Pages",
    languages: "Languages",
    about: "about",
    portfolio: "portfolio",
    contact: "contact",
    menu: "Open menu",
    home: "Back to home",
    top: "Back to top",
    contactMeans: "Ways to get in touch",
    phone: "Phone",
  },
  home: {
    title: "Jérémie Nabet | Designer & Coder",
    description:
      "Portfolio of Jérémie Nabet, Senior Salesforce Full Stack Developer and creator of web and mobile experiences.",
    h1: "Jérémie Nabet — Designer & Coder",
    designerText: "Product design, UI systems and real-world experiences.",
    coderText: "Clean, scalable and performant web development.",
    workTitle: "Some of my latest work",
    viewSite: "View website",
    viewProject: "View project",
    projects: {
      rubens: "Restaurant showcase website design and integration.",
      elsa: "Premium event website, fully responsive.",
      bmky: "Flutter CRM app connected to Salesforce for contacts, actions, payments and tracking.",
      bmkyAlt: "BMKY Flutter CRM app for Beth Amidrash",
    },
  },
  contact: {
    title: "contact.",
    intro: "Let's discuss your Salesforce, web or mobile project.",
    text: "Share your context, goals and timeline. I'll get back to you quickly with a clear, actionable proposal.",
    fullName: "Full name *",
    phone: "Phone *",
    company: "Company",
    serviceType: "Service type *",
    select: "Select",
    services: { salesforce: "Salesforce", web: "Website", mobile: "Mobile app", autre: "Other" },
    message: "Message",
    placeholder: "Describe your needs, goals and timeline.",
    submit: "Send request",
    sending: "Sending...",
    sendingStatus: "Sending...",
    success: "Thank you, your request has been sent.",
    error: "Server error while sending.",
    antibot: "Anti-spam check in progress, please try again in a moment.",
  },
  about: {
    title: "About | Jérémie Nabet",
    description:
      "About Jérémie Nabet, Senior Salesforce Full Stack Developer specializing in architecture, web and mobile.",
    h1: "About Jérémie Nabet",
    aboutTitle: "about.",
    intro: "I am Jérémie Nabet, Senior Salesforce Full Stack Developer based in Israel.",
    p1: "I help product and engineering teams turn complex requirements into reliable, readable and maintainable solutions. My approach combines architecture, pragmatic execution and attention to detail.",
    p2: "I work on Salesforce, full stack web development and mobile applications, with a constant focus on performance, code quality and user experience.",
    photoAlt: "Photo of Jérémie Nabet",
    approachTitle: "my approach.",
    approachIntro: "Design simple, ship fast, keep it clean.",
    approach1:
      "I favor clear architectures, justified technical choices and transparent communication throughout the project. The goal is always to deliver a durable solution that is easy to evolve.",
    approach2:
      "Whether for a redesign, a new product or a quality upgrade, I integrate quickly and structure a concrete execution plan.",
    expertiseTitle: "expertise.",
    expertiseIntro: "Salesforce, web, mobile.",
    expertise: [
      "Salesforce: Apex, LWC, integrations, enterprise architecture.",
      "Web: modern interfaces, front-end performance, APIs and back-end robustness.",
      "Mobile: Flutter apps focused on real-world usage, quality and maintainability.",
    ],
  },
  bmky: {
    title: "BMKY App Project | Jérémie Nabet",
    description:
      "BMKY App project: Flutter application connected to Salesforce for operational management of the Beth Amidrash.",
    intro: "Flutter CRM app connected to Salesforce, built for the Beth Amidrash in my neighborhood.",
    text: "This app manages contacts and donors, pledge commitments, payments, field actions, notifications and statistical tracking, with a smooth mobile experience for teams.",
    back: "Back to projects",
    coverAlt: "BMKY App - project visual identity",
    overviewTitle: "Overview",
    lead: "A mobile operational management platform with a simple journey: secure startup, 5-tab navigation and continuous synchronization with Salesforce.",
    points: [
      {
        title: "User journey",
        text: "SplashScreen, Firebase initialization, push permissions, FCM token retrieval then HomePage with Actions, Search, Stats, Notifications and PDF navigation.",
      },
      {
        title: "Key modules",
        text: "Event actions, contact search, full account view, annual analytics tracking, payment notification center and operational PDF generation.",
      },
      {
        title: "Integrations",
        text: "Salesforce REST + custom Apex, Firebase Messaging, Hebcal for Shabbat schedules and device services for call, SMS and email from contact records.",
      },
    ],
    featuresTitle: "Features built",
    features: [
      {
        title: "Actions",
        text: "Event management, contact-linked action creation and soft-delete business logic for a clean history.",
      },
      {
        title: "Search & Account 360",
        text: "Account search, indebted account filter, outstanding amount review and detailed account/contacts/transactions view.",
      },
      {
        title: "Stats & steering",
        text: "Annual dashboard with monthly payment/donation aggregations and chart visualization to track activity in real time.",
      },
      {
        title: "Notifications",
        text: "Payment notification center, filters and read/unread marking to speed up daily processing.",
      },
      {
        title: "PDF",
        text: "Business document generation (Tofess 46 and Shabbat schedules) with sharing options and direct mobile export.",
      },
    ],
    galleryTitle: "App screenshots",
    shots: [
      { file: "Actions.png", caption: "Actions", alt: "BMKY App - Actions screen" },
      { file: "recherche.png", caption: "Search", alt: "BMKY App - Search screen" },
      { file: "Stats.png", caption: "Stats", alt: "BMKY App - Stats screen" },
      { file: "notifs.png", caption: "Notifications", alt: "BMKY App - Notifications screen" },
      { file: "pdf.png", caption: "PDF", alt: "BMKY App - PDF screen" },
    ],
  },
};
