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
import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata('home', 'en');

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
