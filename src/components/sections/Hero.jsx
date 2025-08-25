// src/components/sections/Hero.jsx

'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// Lazy load del componente 3D
const CognitiveCore = dynamic(
  () => import('@/components/ui/CognitiveCore').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 z-0 bg-slate-900" />,
  }
);

// Componente per il testo animato che cambia
const AnimatedHeadline = ({ phrases }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % phrases.length);
    }, 3000); // Cambia frase ogni 3 secondi
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <span className="text-purple-300 transition-opacity duration-500">
      {phrases[index]}
    </span>
  );
};

const Hero = () => {
  const rotatingPhrases = [
    "Cambia il tutor.",
    "Scopri il tuo potenziale.",
    "Impara al tuo ritmo.",
  ];

  return (
    // CORREZIONE 1: Ripristinato lo sfondo scuro e l'altezza a schermo intero
    <section id="home" className="relative w-full h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* CORREZIONE 2: L'animazione è ora un elemento di sfondo non interattivo */}
      <div className="absolute inset-0 z-0 opacity-70" style={{ pointerEvents: 'none' }}>
        <CognitiveCore />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <AnimateOnScroll className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold !leading-tight max-w-4xl">
            Non cambiare il tuo modo di imparare.
            <br />
            {/* CORREZIONE 3: Reintrodotto il testo dinamico */}
            <AnimatedHeadline phrases={rotatingPhrases} />
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-6">
            TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo. Dimentica le ore di studio inefficaci. Inizia un percorso di apprendimento personalizzato che funziona davvero per te.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button href="/beta-access" variant="secondary" className="text-lg flex items-center justify-center gap-2">
              🚀 Richiedi Accesso Beta
            </Button>
            <Button href="#features" variant="outline" className="text-lg !border-white !text-white hover:!bg-white hover:!text-primary">
              Scopri le funzionalità
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-400">✨ Accesso Beta a posti limitati.</p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Hero;
