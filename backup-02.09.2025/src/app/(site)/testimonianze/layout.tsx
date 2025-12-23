import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonianze Studenti TutorAI | Storie di Successo Reali',
  description: 'Leggi le testimonianze reali di studenti che hanno migliorato i voti con TutorAI. Storie verificate di successo scolastico con progressi documentati.',
  keywords: 'testimonianze TutorAI, recensioni studenti, storie successo, miglioramento voti, tutor AI',
  openGraph: {
    title: 'Testimonianze Studenti - Storie di Successo con TutorAI',
    description: 'Storie reali di studenti che hanno trasformato i loro voti con TutorAI. Risultati verificati e progressi documentati.',
    url: 'https://www.mytutorai.app/testimonianze',
    images: [
      {
        url: '/assets/testimonials/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Testimonianze studenti TutorAI - Storie di successo'
      }
    ],
    type: 'website',
    locale: 'it_IT'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonianze Studenti TutorAI | Storie di Successo',
    description: 'Storie reali di studenti che hanno migliorato i voti con TutorAI.',
    images: ['/assets/testimonials/twitter-card.jpg']
  },
  alternates: {
    canonical: 'https://www.mytutorai.app/testimonianze'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function TestimonianzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}