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
import HomePageCTAs from "@/components/sections/HomePageCTAs";

// NUOVO COMPONENTE PER I DATI STRUTTURATI - ENHANCED CON LOCAL BUSINESS
const HomePageStructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "TutorAI",
    "url": "https://www.mytutorai.app",
    "logo": "https://www.mytutorai.app/assets/logo.png",
    "description": "Tutor intelligente personalizzato per studenti italiani. 15+ anni di esperienza nell'educazione.",
    "foundingDate": "2009",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@mytutorai.app",
      "contactType": "Customer Service",
      "areaServed": "IT",
      "availableLanguage": ["Italian", "English"]
    },
    "sameAs": [
      // INSERISCI QUI I LINK AI TUOI PROFILI SOCIAL
      // "https://twitter.com/tutorai",
      // "https://www.linkedin.com/company/tutorai"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TutorAI",
    "description": "Servizi di tutoring personalizzato con intelligenza artificiale per studenti italiani",
    "url": "https://www.mytutorai.app",
    "areaServed": "Italy",
    "serviceType": "Educational Services",
    "priceRange": "€€",
    "hasCredential": "15+ anni di esperienza nell'educazione",
    "knowsAbout": [
      "Tutoring personalizzato",
      "Intelligenza artificiale educativa",
      "Metodi di studio innovativi",
      "Supporto scolastico",
      "Apprendimento adattivo"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Italy"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "6",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
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
      <HomePageCTAs />
      <AnimateOnScroll><Curricula /></AnimateOnScroll>
      <AnimateOnScroll><Testimonials /></AnimateOnScroll>
      <AnimateOnScroll><Blog /></AnimateOnScroll>
      <AnimateOnScroll><FAQ /></AnimateOnScroll>
    </>
  );
}
