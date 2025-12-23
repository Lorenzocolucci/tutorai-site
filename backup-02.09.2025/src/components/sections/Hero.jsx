// src/components/sections/Hero.jsx

'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
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
  const [maxHeight, setMaxHeight] = useState(0);
  const textRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % phrases.length);
    }, 4000); // Cambia frase ogni 4 secondi
    return () => clearInterval(timer);
  }, [phrases.length]);

  // Calcola l'altezza massima di tutte le frasi
  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = textRefs.current
        .filter(ref => ref)
        .map(ref => ref.offsetHeight);
      
      if (heights.length > 0) {
        const max = Math.max(...heights);
        setMaxHeight(max);
      }
    };

    // Calcola dopo che tutti i ref sono stati assegnati
    const timer = setTimeout(calculateMaxHeight, 100);
    return () => clearTimeout(timer);
  }, [phrases]);

  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
        minHeight: '4rem' // Fallback minimo
      }}
    >
      {phrases.map((phrase, i) => (
        <span
          key={i}
          ref={el => textRefs.current[i] = el}
          className={`absolute top-0 left-0 right-0 text-purple-300 transition-all duration-500 ${
            i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transform: i === index ? 'translateY(0)' : 'translateY(1rem)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            whiteSpace: 'normal', // Permette il wrap del testo
            wordBreak: 'break-word', // Gestisce parole lunghe
            lineHeight: '1.2', // Altezza di linea ottimizzata
            display: 'block' // Assicura che il testo si comporti come blocco
          }}
        >
          {phrase.includes('Tutor.AI') ? (
            <>
              <span className="text-purple-300">{phrase.split('Tutor.AI')[0]}</span>
              <span className="text-white">Tutor.AI</span>
            </>
          ) : (
            phrase
          )}
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation('pages');
  
  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const langPrefix = currentLang === 'en' ? '/en' : '';
  
  // Get translated phrases
  const rotatingPhrases = t('home.hero.rotatingPhrases', { 
    returnObjects: true,
    fallback: [
      "Un'IA che si adatta alla TUA mente.",
      "Apprendimento personale, per tutti.",
      "Cambia il tutor, non te stesso.",
      "Passa a Tutor.AI",
    ]
  });

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* CORREZIONE #5: Aggiunto style={{ touchAction: 'none' }} per prevenire l'interferenza con lo scroll */}
      <div className="absolute inset-0 z-0 opacity-70 bg-slate-800" style={{ touchAction: 'none' }}>
        {/* CognitiveCore temporaneamente disabilitato per debug language switching */}
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <AnimateOnScroll className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold !leading-tight max-w-4xl">
            {t('home.hero.title', 'Non cambiare il tuo modo di imparare.')}
            <br />
            {/* CORREZIONE #4: Container con altezza dinamica calcolata */}
            <AnimatedHeadline phrases={rotatingPhrases} />
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-6">
            {t('home.hero.description', 'TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo. Dimentica le ore di studio inefficaci. Inizia un percorso di apprendimento personalizzato che funziona davvero per te.')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button href={`${langPrefix}/beta-access`} variant="secondary" className="text-lg flex items-center justify-center gap-2">
              {t('home.hero.cta.primary', '🚀 Richiedi Accesso Beta')}
            </Button>
            <Button href="#features" variant="outline" className="text-lg !border-white !text-white hover:!bg-white hover:!text-primary">
              {t('home.hero.cta.secondary', 'Scopri le funzionalità')}
            </Button>
          </div>
          <p className="mt-4 text-sm text-slate-400">{t('home.hero.betaNote', '✨ Accesso Beta a posti limitati.')}</p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Hero;
