import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | TutorAI",
  description: "TutorAI Terms of Service - Legal terms and conditions for using our AI-powered tutoring platform and educational services.",
  keywords: "terms of service, legal terms, conditions, TutorAI terms, user agreement",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI Terms of Service - Legal Terms and Conditions",
    description: "Read our terms of service and legal conditions for using TutorAI.",
    url: "https://www.mytutorai.app/en/terms",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TutorAI Terms of Service",
    description: "Legal terms and conditions for using our platform.",
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/terms',
      'en-US': 'https://www.mytutorai.app/en/terms',
    },
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}