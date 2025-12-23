import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | TutorAI",
  description: "TutorAI Privacy Policy - How we collect, use, and protect your personal information when you use our AI tutoring platform.",
  keywords: "privacy policy, data protection, personal information, TutorAI privacy, GDPR compliance",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI Privacy Policy - Data Protection and Privacy",
    description: "Learn how TutorAI protects your privacy and handles your personal information.",
    url: "https://www.mytutorai.app/en/privacy",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TutorAI Privacy Policy",
    description: "How we protect your privacy and handle your data.",
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/privacy',
      'en-US': 'https://www.mytutorai.app/en/privacy',
    },
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}