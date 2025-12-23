import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Beta Login | TutorAI",
  description: "Access the TutorAI beta platform. Enter your beta access code to start your personalized learning journey.",
  keywords: "TutorAI login, beta access, AI tutoring platform, educational technology login",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI Beta Login - Access Your Personalized AI Tutor",
    description: "Enter your beta access code to start your personalized learning journey with TutorAI.",
    url: "https://www.mytutorai.app/en/beta-login",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TutorAI Beta Login",
    description: "Access your personalized AI tutor with your beta code.",
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/beta-login',
      'en-US': 'https://www.mytutorai.app/en/beta-login',
    },
  },
};

export default function BetaLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}