import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Frequently Asked Questions | TutorAI",
  description: "Get answers to the most common questions about TutorAI - the AI-powered personalized tutor that adapts to your learning style.",
  keywords: "TutorAI FAQ, AI tutor questions, personalized learning, educational technology, student support",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI FAQ - Get All Your Questions Answered",
    description: "Find answers to common questions about TutorAI's AI-powered personalized learning platform.",
    url: "https://www.mytutorai.app/en/faq",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/assets/faq/hero-faq-en.webp",
      width: 1200,
      height: 630,
      alt: "TutorAI FAQ - Frequently Asked Questions"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorAI FAQ - Get All Your Questions Answered",
    description: "Find answers to common questions about TutorAI's AI-powered personalized learning platform.",
    images: ["/assets/faq/hero-faq-en.webp"]
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/faq',
      'en-US': 'https://www.mytutorai.app/en/faq',
    },
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}