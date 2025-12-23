import { Metadata } from 'next';

// Base URL del sito
const baseUrl = 'https://www.mytutorai.app';

// Immagini Open Graph
const ogImages = {
  home: `${baseUrl}/assets/og-home.svg`,
  blog: `${baseUrl}/assets/og-blog.svg`,
  testimonials: `${baseUrl}/assets/og-testimonials.svg`,
  about: `${baseUrl}/assets/og-about.svg`,
  howItWorks: `${baseUrl}/assets/og-how-it-works.svg`,
  faq: `${baseUrl}/assets/og-faq.svg`,
  contact: `${baseUrl}/assets/og-contact.svg`,
};

// Meta descriptions per ogni pagina
export const seoConfig = {
  it: {
    home: {
      title: "TutorAI - Il Futuro dell'Apprendimento Personale",
      description: "Non cambiare il tuo modo di imparare. Cambia il tutor. TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo per risultati migliori.",
      keywords: "tutor AI, intelligenza artificiale, apprendimento personalizzato, educazione, studenti, genitori, TutorAI",
    },
    blog: {
      title: "Blog TutorAI - Insights su Educazione e Intelligenza Artificiale",
      description: "Scopri le ultime intuizioni su educazione, intelligenza artificiale e apprendimento personalizzato. Articoli esperti per studenti, genitori ed educatori.",
      keywords: "blog educazione, AI educazione, apprendimento, intelligenza artificiale, TutorAI blog",
    },
    testimonials: {
      title: "Testimonianze TutorAI - Storie di Successo Reali",
      description: "Leggi le testimonianze di studenti e genitori che hanno trasformato il loro apprendimento con TutorAI. Storie di successo e risultati concreti.",
      keywords: "testimonianze TutorAI, successi studenti, risultati apprendimento, recensioni TutorAI",
    },
    about: {
      title: "Chi Siamo - TutorAI Team e Missione",
      description: "Conosci il team di TutorAI e la nostra missione di rivoluzionare l'educazione attraverso l'intelligenza artificiale. Innovazione al servizio dell'apprendimento.",
      keywords: "chi siamo TutorAI, team TutorAI, missione educazione, innovazione AI",
    },
    howItWorks: {
      title: "Come Funziona TutorAI - Tecnologia e Metodologia",
      description: "Scopri come TutorAI rivoluziona l'apprendimento attraverso l'intelligenza artificiale. Tecnologia avanzata per risultati personalizzati.",
      keywords: "come funziona TutorAI, tecnologia AI, metodologia apprendimento, TutorAI funzionalità",
    },
    faq: {
      title: "FAQ TutorAI - Domande Frequenti",
      description: "Trova risposte alle domande più frequenti su TutorAI. Tutto quello che devi sapere su funzionalità, prezzi e utilizzo.",
      keywords: "FAQ TutorAI, domande frequenti, aiuto TutorAI, supporto TutorAI",
    },
    contact: {
      title: "Contatti TutorAI - Supporto e Informazioni",
      description: "Contatta il team di TutorAI per supporto, informazioni o partnership. Siamo qui per aiutarti nel tuo percorso di apprendimento.",
      keywords: "contatti TutorAI, supporto TutorAI, informazioni TutorAI, partnership TutorAI",
    },
  },
  en: {
    home: {
      title: "TutorAI - The Future of Personalized Learning",
      description: "Don't change how you learn. Change your tutor. TutorAI is the first intelligent tutor that adapts to your cognitive style for better results.",
      keywords: "AI tutor, artificial intelligence, personalized learning, education, students, parents, TutorAI",
    },
    blog: {
      title: "TutorAI Blog - Insights on Education and Artificial Intelligence",
      description: "Discover the latest insights on education, artificial intelligence, and personalized learning. Expert articles for students, parents, and educators.",
      keywords: "education blog, AI education, learning, artificial intelligence, TutorAI blog",
    },
    testimonials: {
      title: "TutorAI Testimonials - Real Success Stories",
      description: "Read testimonials from students and parents who have transformed their learning with TutorAI. Success stories and concrete results.",
      keywords: "TutorAI testimonials, student success, learning results, TutorAI reviews",
    },
    about: {
      title: "About Us - TutorAI Team and Mission",
      description: "Meet the TutorAI team and our mission to revolutionize education through artificial intelligence. Innovation at the service of learning.",
      keywords: "about TutorAI, TutorAI team, education mission, AI innovation",
    },
    howItWorks: {
      title: "How TutorAI Works - Technology and Methodology",
      description: "Discover how TutorAI revolutionizes learning through artificial intelligence. Advanced technology for personalized results.",
      keywords: "how TutorAI works, AI technology, learning methodology, TutorAI features",
    },
    faq: {
      title: "TutorAI FAQ - Frequently Asked Questions",
      description: "Find answers to the most frequently asked questions about TutorAI. Everything you need to know about features, pricing, and usage.",
      keywords: "TutorAI FAQ, frequently asked questions, TutorAI help, TutorAI support",
    },
    contact: {
      title: "Contact TutorAI - Support and Information",
      description: "Contact the TutorAI team for support, information, or partnerships. We're here to help you on your learning journey.",
      keywords: "contact TutorAI, TutorAI support, TutorAI information, TutorAI partnerships",
    },
  },
};

// Funzione per generare metadata SEO
export function generateSEOMetadata(
  page: keyof typeof seoConfig.it,
  language: 'it' | 'en' = 'it'
): Metadata {
  const config = seoConfig[language][page];
  const isEnglish = language === 'en';
  const path = isEnglish ? `/en/${page === 'home' ? '' : page}` : `/${page === 'home' ? '' : page}`;
  const url = `${baseUrl}${path}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: url,
      languages: {
        'it-IT': isEnglish ? `${baseUrl}/${page === 'home' ? '' : page}` : url,
        'en': isEnglish ? url : `${baseUrl}/en/${page === 'home' ? '' : page}`,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: url,
      siteName: 'TutorAI',
      locale: isEnglish ? 'en_US' : 'it_IT',
      type: 'website',
      images: [
        {
          url: ogImages[page] || ogImages.home,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [ogImages[page] || ogImages.home],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Schema.org JSON-LD per l'organizzazione
export function generateOrganizationSchema(language: 'it' | 'en' = 'it') {
  const isEnglish = language === 'en';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TutorAI',
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.png`,
    description: isEnglish 
      ? 'Intelligent AI tutor that adapts to your cognitive style for personalized learning'
      : 'Tutor intelligente AI che si adatta al tuo stile cognitivo per un apprendimento personalizzato',
    foundingDate: '2024',
    sameAs: [
      'https://www.linkedin.com/company/tutorai',
      'https://twitter.com/tutorai',
      'https://www.facebook.com/tutorai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Italian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
      addressLocality: 'Milano',
    },
  };
}

// Schema.org JSON-LD per FAQ
export function generateFAQSchema(language: 'it' | 'en' = 'it') {
  const isEnglish = language === 'en';
  
  const faqs = isEnglish ? [
    {
      question: "What is TutorAI?",
      answer: "TutorAI is an intelligent AI tutor that adapts to your cognitive style to provide personalized learning experiences."
    },
    {
      question: "How does TutorAI work?",
      answer: "TutorAI uses advanced artificial intelligence to analyze your learning patterns and adapt its teaching methods accordingly."
    },
    {
      question: "Is TutorAI suitable for all ages?",
      answer: "Yes, TutorAI is designed to work with students of all ages, from elementary school to university level."
    }
  ] : [
    {
      question: "Cos'è TutorAI?",
      answer: "TutorAI è un tutor intelligente AI che si adatta al tuo stile cognitivo per fornire esperienze di apprendimento personalizzate."
    },
    {
      question: "Come funziona TutorAI?",
      answer: "TutorAI utilizza l'intelligenza artificiale avanzata per analizzare i tuoi modelli di apprendimento e adattare i suoi metodi di insegnamento di conseguenza."
    },
    {
      question: "TutorAI è adatto a tutte le età?",
      answer: "Sì, TutorAI è progettato per funzionare con studenti di tutte le età, dalla scuola elementare al livello universitario."
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Schema.org JSON-LD per Blog
export function generateBlogSchema(language: 'it' | 'en' = 'it') {
  const isEnglish = language === 'en';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: isEnglish ? 'TutorAI Blog' : 'Blog TutorAI',
    description: isEnglish 
      ? 'Insights on education, artificial intelligence, and personalized learning'
      : 'Insights su educazione, intelligenza artificiale e apprendimento personalizzato',
    url: `${baseUrl}${isEnglish ? '/en/blog' : '/blog'}`,
    publisher: {
      '@type': 'Organization',
      name: 'TutorAI',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/logo.png`,
      },
    },
  };
}
