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

// NUOVO COMPONENTE PER I DATI STRUTTURATI
const HomePageStructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TutorAI",
    "url": "https://www.mytutorai.app", // SOSTITUISCI CON IL TUO DOMINIO FINALE
    "logo": "https://www.mytutorai.app/assets/logo.png", // CREA E CARICA UN LOGO QUI
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@mytutorai.app",
      "contactType": "Customer Service"
    },
    "sameAs": [
      // INSERISCI QUI I LINK AI TUOI PROFILI SOCIAL
      // "https://twitter.com/tutorai",
      // "https://www.linkedin.com/company/tutorai"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default function Home() {
  return (
    <>
      <HomePageStructuredData />
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
