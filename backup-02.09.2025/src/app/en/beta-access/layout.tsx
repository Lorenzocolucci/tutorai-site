import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Request Beta Access | TutorAI",
  description: "Join the TutorAI beta program and be among the first to experience personalized AI tutoring. Request early access today.",
  keywords: "TutorAI beta, early access, AI tutoring beta, personalized learning, educational technology",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "Join TutorAI Beta - Early Access to AI Tutoring",
    description: "Be among the first to experience personalized AI tutoring. Request beta access today.",
    url: "https://www.mytutorai.app/en/beta-access",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/assets/beta/hero-beta-en.webp",
      width: 1200,
      height: 630,
      alt: "TutorAI Beta Access - Early Access Program"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Join TutorAI Beta - Early Access to AI Tutoring",
    description: "Be among the first to experience personalized AI tutoring. Request beta access today.",
    images: ["/assets/beta/hero-beta-en.webp"]
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/beta-access',
      'en-US': 'https://www.mytutorai.app/en/beta-access',
    },
  },
};

export default function BetaAccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}