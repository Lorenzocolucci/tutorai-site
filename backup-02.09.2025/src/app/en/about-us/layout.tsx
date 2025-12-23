import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - TutorAI | Born in a Classroom, Not in a Lab",
  description: "Discover TutorAI's story: 15 years of educational experience combined with cutting-edge AI to revolutionize personalized learning.",
  keywords: "TutorAI story, AI education, personalized learning, educational technology, about us",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "About Us - TutorAI | Born in a Classroom, Not in a Lab",
    description: "Discover TutorAI's story: 15 years of educational experience combined with cutting-edge AI",
    url: "https://www.mytutorai.app/en/about-us",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/assets/chi-siamo/radici.webp",
      width: 1200,
      height: 630,
      alt: "TutorAI - Born in a classroom, educational experience"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - TutorAI | Born in a Classroom, Not in a Lab",
    description: "Discover TutorAI's story: 15 years of educational experience combined with cutting-edge AI",
    images: ["/assets/chi-siamo/radici.webp"]
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/chi-siamo',
      'en-US': 'https://www.mytutorai.app/en/about-us',
    },
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}