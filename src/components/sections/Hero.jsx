'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const Hero = () => {
  const [rotatingText, setRotatingText] = useState("Cambia il tutor, non te stesso.");
  const rotatingTexts = [
    "Cambia il tutor, non te stesso.",
    "Un'IA che si adatta alla TUA mente.",
    "Apprendimento personale, per tutti.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = rotatingTexts.indexOf(rotatingText);
      const nextIndex = (currentIndex + 1) % rotatingTexts.length;
      setRotatingText(rotatingTexts[nextIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingText, rotatingTexts]);

  return (
    <section id="home" className="relative w-full min-h-screen bg-gradient-to-br from-primary via-secondary to-purple-600">
      {/* Overlay per migliorare la leggibilità */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container mx-auto px-6 py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Colonna Sinistra - Testo */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Non cambiare il tuo modo di imparare.
              </h1>
              
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <p className="text-2xl md:text-3xl font-medium text-purple-200 h-12 flex items-center">
                  {rotatingText}
                </p>
              </div>
              
              <p className="text-lg text-slate-200 leading-relaxed">
                TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo. 
                Dimentica le ore di studio inefficaci. Inizia un percorso di apprendimento 
                personalizzato che funziona davvero per te.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="#beta-access" className="flex items-center justify-center gap-2 text-lg bg-success hover:bg-green-600">
                  🚀 Richiedi Accesso Beta
                </Button>
                <Button href="#demo" variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-primary">
                  ▶ Guarda la demo (2 min)
                </Button>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-slate-300 text-center">
                  ✨ Già scelto da studenti in 15 paesi. Accesso Beta limitato.
                </p>
              </div>
            </div>
          </div>

          {/* Colonna Destra - Immagine */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="relative w-full max-w-md">
                <Image
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1770"
                  alt="Team di studenti che collabora in un ambiente moderno"
                  width={500}
                  height={500}
                  priority
                  className="rounded-2xl shadow-xl object-cover aspect-square"
                />
                <div className="absolute -bottom-4 -right-4 bg-success text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🧠 AI Powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
