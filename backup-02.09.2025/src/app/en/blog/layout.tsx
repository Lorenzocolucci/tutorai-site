import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "TutorAI Blog | Education & AI Insights",
  description: "Discover the latest insights on education, artificial intelligence, and personalized learning from the TutorAI team.",
  keywords: "education blog, AI learning, personalized education, learning technology, study tips",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI Blog - Education & Technology Insights",
    description: "Latest insights on education, AI, and personalized learning",
    url: "https://www.mytutorai.app/en/blog",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/assets/blog/hero-blog.webp",
      width: 1200,
      height: 630,
      alt: "TutorAI Blog - Education and Technology"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorAI Blog - Education & Technology Insights",
    description: "Latest insights on education, AI, and personalized learning",
    images: ["/assets/blog/hero-blog.webp"]
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app/blog',
      'en-US': 'https://www.mytutorai.app/en/blog',
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}