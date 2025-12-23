import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog TutorAI | Articoli su Educazione, AI e Apprendimento",
  description: "Scopri articoli, ricerche e approfondimenti sul futuro dell'educazione. Guide scientifiche su metodo di studio, intelligenza artificiale, psicologia dell'apprendimento.",
  keywords: "blog educazione, intelligenza artificiale, metodo di studio, apprendimento, psicologia, matematica, lingue straniere, TutorAI",
  openGraph: {
    title: "Blog TutorAI | Articoli su Educazione e AI",
    description: "Articoli scientifici e guide pratiche su educazione, apprendimento e intelligenza artificiale. Scopri i metodi più efficaci per studiare.",
    url: "https://www.mytutorai.app/blog",
    siteName: "TutorAI Blog",
    images: [
      {
        url: "https://www.mytutorai.app/assets/features/pexels-shkrabaanthony-5306436.jpg",
        width: 1200,
        height: 630,
        alt: "Blog TutorAI - Educazione e Intelligenza Artificiale",
      }
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog TutorAI | Articoli su Educazione e AI",
    description: "Articoli scientifici su educazione, apprendimento e intelligenza artificiale. Guide pratiche per studenti e genitori.",
    images: ["https://www.mytutorai.app/assets/features/pexels-shkrabaanthony-5306436.jpg"],
    creator: "@TutorAI_Italia",
    site: "@TutorAI_Italia",
  },
  alternates: {
    canonical: "https://www.mytutorai.app/blog",
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD per la sezione blog
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TutorAI Blog',
    description: 'Blog dedicato a educazione, apprendimento e intelligenza artificiale',
    url: 'https://www.mytutorai.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'TutorAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mytutorai.app/logo.png',
        width: 200,
        height: 60,
      },
    },
    inLanguage: 'it-IT',
    about: {
      '@type': 'Thing',
      name: 'Educazione e Intelligenza Artificiale',
      description: 'Articoli e guide su metodi di studio, tecnologie educative e apprendimento personalizzato',
    },
    keywords: 'educazione, intelligenza artificiale, apprendimento, metodo di studio, psicologia educativa',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      {children}
    </>
  );
}