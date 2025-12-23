import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Beta Dashboard | TutorAI",
  description: "Welcome to the TutorAI beta platform. Access your personalized learning dashboard and start your AI-powered education journey.",
  keywords: "TutorAI dashboard, beta platform, AI tutoring, personalized learning, educational dashboard",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI Beta Dashboard - Your Personalized Learning Hub",
    description: "Access your personalized learning dashboard with AI-powered tutoring and educational tools.",
    url: "https://www.mytutorai.app/en/beta-dashboard",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TutorAI Beta Dashboard",
    description: "Your personalized learning hub powered by AI.",
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/beta-dashboard',
      'en-US': 'https://www.mytutorai.app/en/beta-dashboard',
    },
  },
};

export default function BetaDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}