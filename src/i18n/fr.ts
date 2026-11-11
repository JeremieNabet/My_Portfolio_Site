export const fr = {
  htmlLang: "fr",
  ogLocale: "fr_FR",
  dir: "ltr",
  nav: {
    skip: "Aller au contenu",
    pages: "Pages",
    languages: "Langues",
    about: "about",
    portfolio: "portfolio",
    contact: "contact",
    menu: "Afficher le menu",
    home: "Retour à l'accueil",
    top: "Remonter en haut",
    contactMeans: "Moyens de contact",
    phone: "Téléphone",
  },
  home: {
    title: "Jérémie Nabet | Designer & Coder",
    description:
      "Portfolio de Jérémie Nabet, Senior Salesforce Full Stack Developer et créateur d'expériences web et mobiles.",
    h1: "Jérémie Nabet — Designer & Coder",
    designerText: "Product design, UI systems et expériences orientées usage réel.",
    coderText: "Développement propre, scalable et performant pour le web.",
    workTitle: "Some of my latest work",
    viewSite: "Voir le site",
    viewProject: "Voir le projet",
    projects: {
      rubens: "Site vitrine design et intégration.",
      elsa: "Site événementiel premium et responsive.",
      bmky: "Application CRM Flutter connectée à Salesforce pour piloter contacts, actions, paiements et suivi.",
      bmkyAlt: "Application Flutter BMKY Beth Amidrash",
    },
  },
  contact: {
    title: "contact.",
    intro: "Parlons de ton projet Salesforce, web ou mobile.",
    text: "Donne-moi le contexte, tes objectifs et ton timing. Je reviens vers toi rapidement avec une proposition claire et actionnable.",
    fullName: "Nom complet *",
    phone: "Téléphone *",
    company: "Entreprise",
    serviceType: "Type de service *",
    select: "Sélectionnez",
    services: { salesforce: "Salesforce", web: "Site web", mobile: "Application mobile", autre: "Autre" },
    message: "Message",
    placeholder: "Décris ton besoin, tes objectifs et ton délai.",
    submit: "Envoyer la demande",
    sending: "Envoi...",
    sendingStatus: "Envoi en cours...",
    success: "Merci, votre demande a bien été envoyée.",
    error: "Erreur serveur pendant l'envoi.",
    antibot: "Vérification anti-spam en cours, réessayez dans un instant.",
  },
  about: {
    title: "About | Jérémie Nabet",
    description:
      "À propos de Jérémie Nabet, Senior Salesforce Full Stack Developer spécialisé en architecture, web et mobile.",
    h1: "À propos de Jérémie Nabet",
    aboutTitle: "about.",
    intro: "Je suis Jérémie Nabet, Senior Salesforce Full Stack Developer basé en Israël.",
    p1: "J’accompagne les équipes produit et techniques pour transformer des besoins complexes en solutions fiables, lisibles et maintenables. Mon approche combine architecture, exécution pragmatique et attention au détail.",
    p2: "Je travaille sur Salesforce, le développement web full stack et les applications mobiles, avec un focus constant sur la performance, la qualité du code et l’expérience utilisateur.",
    photoAlt: "Photo de Jérémie Nabet",
    approachTitle: "my approach.",
    approachIntro: "Concevoir simple, livrer vite, maintenir propre.",
    approach1:
      "Je privilégie les architectures claires, les choix techniques justifiés et une communication transparente tout au long du projet. L’objectif est toujours d’obtenir une solution durable et facile à faire évoluer.",
    approach2:
      "Que ce soit pour une refonte, un nouveau produit ou une montée en qualité, je m’intègre rapidement et je structure un plan d’exécution concret.",
    expertiseTitle: "expertise.",
    expertiseIntro: "Salesforce, web, mobile.",
    expertise: [
      "Salesforce: Apex, LWC, intégrations, architecture enterprise.",
      "Web: interfaces modernes, performance front, API et robustesse back-end.",
      "Mobile: apps Flutter orientées usage réel, qualité et maintenabilité.",
    ],
  },
  bmky: {
    title: "Projet BMKY App | Jérémie Nabet",
    description:
      "Présentation du projet BMKY App: application Flutter connectée à Salesforce pour la gestion opérationnelle du Beth Amidrash.",
    intro: "Application Flutter CRM connectée à Salesforce, développée pour le Beth Amidrash de mon quartier.",
    text: "Cette app pilote les contacts et donateurs, les promesses de don, les paiements, les actions terrain, les notifications et le suivi statistique, avec une expérience mobile fluide pour les équipes.",
    back: "Retour aux projets",
    coverAlt: "BMKY App - identité visuelle du projet",
    overviewTitle: "Vue d'ensemble",
    lead: "Une plateforme mobile de pilotage opérationnel avec un parcours simple: démarrage sécurisé, navigation à 5 onglets et synchronisation continue avec Salesforce.",
    points: [
      {
        title: "Parcours utilisateur",
        text: "SplashScreen, initialisation Firebase, permissions push, récupération token FCM puis HomePage avec navigation Actions, Recherche, Stats, Notifs et PDF.",
      },
      {
        title: "Modules clés",
        text: "Actions événements, recherche contacts, vue compte complète, suivi analytique annuel, centre de notifications paiement et génération PDF opérationnelle.",
      },
      {
        title: "Intégrations",
        text: "Salesforce REST + Apex custom, Firebase Messaging, Hebcal pour horaires Shabbat et services device pour appel, SMS et email depuis les fiches.",
      },
    ],
    featuresTitle: "Fonctionnalités développées",
    features: [
      {
        title: "Actions",
        text: "Gestion des événements, création d'actions liées aux contacts et logique métier de suppression douce pour un historique propre.",
      },
      {
        title: "Recherche & Account 360",
        text: "Recherche de comptes, filtre des comptes endettés, consultation des montants dus et vue détaillée compte/contacts/transactions.",
      },
      {
        title: "Stats & pilotage",
        text: "Dashboard annuel avec agrégations mensuelles paiements/donations et visualisation graphique pour suivre l'activité en temps réel.",
      },
      {
        title: "Notifications",
        text: "Centre de notifications des paiements, filtres et marquage lu/non lu pour accélérer le traitement quotidien.",
      },
      {
        title: "PDF",
        text: "Génération de documents métiers (Tofess 46 et horaires Shabbat) avec options de partage et export direct mobile.",
      },
    ],
    galleryTitle: "Captures de l'application",
    shots: [
      { file: "Actions.png", caption: "Actions", alt: "BMKY App - écran Actions" },
      { file: "recherche.png", caption: "Recherche", alt: "BMKY App - écran Recherche" },
      { file: "Stats.png", caption: "Stats", alt: "BMKY App - écran Stats" },
      { file: "notifs.png", caption: "Notifs", alt: "BMKY App - écran Notifications" },
      { file: "pdf.png", caption: "PDF", alt: "BMKY App - écran PDF" },
    ],
  },
};

export type Dictionary = typeof fr;
