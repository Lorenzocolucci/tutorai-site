import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import AcademicPath from "@/components/sections/AcademicPath";
import ROI from "@/components/sections/ROI";
import AboutUs from "@/components/sections/AboutUs";
import Curricula from "@/components/sections/Curricula";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <AnimateOnScroll><Features /></AnimateOnScroll>
      <AnimateOnScroll><AcademicPath /></AnimateOnScroll>
      <AnimateOnScroll><ROI /></AnimateOnScroll>
      <AnimateOnScroll><AboutUs /></AnimateOnScroll>
      <AnimateOnScroll><Curricula /></AnimateOnScroll>
      <AnimateOnScroll><Testimonials /></AnimateOnScroll>
      <AnimateOnScroll><FAQ /></AnimateOnScroll>
    </>
  );
}
