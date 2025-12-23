import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | TutorAI",
  description: "Get in touch with the TutorAI team. We're here to help with any questions about our AI-powered personalized learning platform.",
  keywords: "contact TutorAI, support, help, questions, educational technology support",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "Contact TutorAI - Get Support & Answers",
    description: "Contact the TutorAI team for support and questions about our personalized AI tutoring platform.",
    url: "https://www.mytutorai.app/en/contact",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/assets/contact/hero-contact-en.webp",
      width: 1200,
      height: 630,
      alt: "Contact TutorAI - Support and Help"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TutorAI - Get Support & Answers",
    description: "Contact the TutorAI team for support and questions about our personalized AI tutoring platform.",
    images: ["/assets/contact/hero-contact-en.webp"]
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/contatti',
      'en-US': 'https://www.mytutorai.app/en/contact',
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}