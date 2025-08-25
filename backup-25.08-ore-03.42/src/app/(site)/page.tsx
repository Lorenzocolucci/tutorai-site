import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import AcademicPath from "@/components/sections/AcademicPath";
import ROI from "@/components/sections/ROI";
import AboutUs from "@/components/sections/AboutUs";
import Curricula from "@/components/sections/Curricula";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"; 
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Hero />
      <AnimateOnScroll><Features /></AnimateOnScroll>
      <AnimateOnScroll><AcademicPath /></AnimateOnScroll>
      <AnimateOnScroll><ROI /></AnimateOnScroll>
      
      {/* SEZIONE ABOUT US (TEASER) */}
      <AnimateOnScroll>
        <AboutUs />
        <div className="text-center pb-20 bg-slate-900">
            <Button href="/chi-siamo" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-primary">
                Leggi tutta la nostra storia
            </Button>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll><Curricula /></AnimateOnScroll>
      <AnimateOnScroll><Testimonials /></AnimateOnScroll>
      <AnimateOnScroll><Blog /></AnimateOnScroll>

      {/* SEZIONE FAQ (TEASER) */}
      <AnimateOnScroll>
        <FAQ />
        <div className="text-center pb-20 bg-white">
            <Button href="/faq" variant="secondary">
                Vedi tutte le domande
            </Button>
        </div>
      </AnimateOnScroll>
    </>
  );
}
