import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chi Siamo - La Storia di TutorAI | 15 Anni di Esperienza Educativa",
  description: "Nati in un'aula, non in un laboratorio. Scopri la storia di TutorAI e i 15 anni di esperienza nel tutoring personalizzato che hanno portato alla creazione del tutor AI più avanzato d'Italia.",
  keywords: "storia TutorAI, chi siamo, esperienza tutoring, educazione personalizzata, 15 anni esperienza, tutor intelligente, missione educativa",
  openGraph: {
    title: "Chi Siamo - La Storia di TutorAI | Nati in un'Aula",
    description: "15 anni di esperienza diretta nell'educazione hanno portato alla nascita del tutor AI più avanzato d'Italia. Una storia di passione, ribellione e innovazione.",
    url: "https://www.mytutorai.app/chi-siamo",
    siteName: "TutorAI",
    images: [
      {
        url: "https://www.mytutorai.app/assets/chi-siamo/radici.webp",
        width: 1200,
        height: 630,
        alt: "La Storia di TutorAI - 15 Anni di Esperienza Educativa",
      }
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo - La Storia di TutorAI | Nati in un'Aula",
    description: "15 anni di esperienza diretta nell'educazione. Scopri come siamo nati in un'aula reale, non in un laboratorio.",
    images: ["https://www.mytutorai.app/assets/chi-siamo/radici.webp"],
    creator: "@TutorAI_Italia",
    site: "@TutorAI_Italia",
  },
  alternates: {
    canonical: "https://www.mytutorai.app/chi-siamo",
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

export default function ChiSiamoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Organization per la storia aziendale
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'TutorAI',
    description: 'Tutor intelligente personalizzato con 15 anni di esperienza nell\'educazione',
    url: 'https://www.mytutorai.app',
    foundingDate: '2009',
    areaServed: 'Italy',
    serviceType: 'Educational Services',
    hasCredential: '15+ anni di esperienza nell\'educazione',
    knowsAbout: [
      'Educazione personalizzata',
      'Intelligenza artificiale',
      'Metodi di studio',
      'Tutoring individuale',
      'Psicologia dell\'apprendimento'
    ],
    brand: {
      '@type': 'Brand',
      name: 'TutorAI',
      slogan: 'Non cambiare il tuo modo di imparare. Cambia il tutor.'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {children}
    </>
  );
}