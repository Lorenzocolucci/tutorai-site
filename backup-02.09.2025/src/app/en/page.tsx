import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import AcademicPath from '@/components/sections/AcademicPath';
import ROI from '@/components/sections/ROI';
import AboutUs from '@/components/sections/AboutUs';
import Curricula from '@/components/sections/Curricula';
import Blog from '@/components/sections/Blog';
import FAQ from '@/components/sections/FAQ';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import HomePageCTAs from '@/components/sections/HomePageCTAs';

export const metadata: Metadata = {
  title: "TutorAI - The Future of Personalized Learning",
  description: "TutorAI revolutionizes learning with personalized artificial intelligence. Discover a new way to learn with our AI tutor that adapts to your unique learning style.",
  keywords: "AI tutor, personalized learning, artificial intelligence education, adaptive learning, online tutoring",
  authors: [{ name: 'TutorAI Team' }],
  openGraph: {
    title: "TutorAI - The Future of Personalized Learning",
    description: "TutorAI revolutionizes learning with personalized artificial intelligence",
    url: "https://www.mytutorai.app/en",
    siteName: "TutorAI",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/assets/hero/main-hero.webp",
      width: 1200,
      height: 630,
      alt: "TutorAI - AI-powered personalized learning platform"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorAI - The Future of Personalized Learning",
    description: "TutorAI revolutionizes learning with personalized artificial intelligence",
    images: ["/assets/hero/main-hero.webp"]
  },
  alternates: {
    languages: {
      'it-IT': 'https://www.mytutorai.app',
      'en-US': 'https://www.mytutorai.app/en',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnimateOnScroll><Features /></AnimateOnScroll>
      <AnimateOnScroll><AcademicPath /></AnimateOnScroll>
      <AnimateOnScroll><ROI /></AnimateOnScroll>
      <HomePageCTAs />
      <AnimateOnScroll><Curricula /></AnimateOnScroll>
      <AnimateOnScroll><Testimonials /></AnimateOnScroll>
      <AnimateOnScroll><Blog /></AnimateOnScroll>
      <AnimateOnScroll><FAQ /></AnimateOnScroll>
    </>
  );
}
