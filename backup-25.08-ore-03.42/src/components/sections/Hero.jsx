'use client'; // Necessario per l'animazione del testo

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
    }, 3000); // Cambia ogni 3 secondi
    return () => clearInterval(interval);
  }, [rotatingText, rotatingTexts]);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center animated-gradient text-white">
      <div className="container mx-auto px-6 py-24 text-center lg:text-left max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Colonna Testo */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-bold !leading-tight">
              Non cambiare il tuo modo di imparare.
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-purple-200 h-10 transition-opacity duration-500">
              {rotatingText}
            </p>
            <p className="text-lg text-slate-200 max-w-xl mx-auto lg:mx-0">
              TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo. Dimentica le ore di studio inefficaci. Inizia un percorso di apprendimento personalizzato che funziona davvero per te.
            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
                  <Button href="/beta-access" className="flex items-center justify-center gap-2 text-lg">
                    🚀 Richiedi Accesso Beta
                  </Button>
                  <Button href="#demo" variant="outline" className="text-lg !border-white !text-white hover:!bg-white hover:!text-primary">
                    ▶ Guarda la demo (2 min)
                  </Button>
                </div>
            <p className="mt-4 text-sm text-slate-300">
              ✨ Già scelto da studenti in 15 paesi. Accesso Beta limitato.
            </p>
          </div>

          {/* Colonna Immagine */}
          <div className="hidden lg:flex justify-center">
            <div className="perspective-container">
              <div className="card-oblique glowing-border-follow relative w-full max-w-md h-auto">
                <Image
                    src="/assets/hero/pexels-cottonbro-6986442.jpg"
                    alt="Famiglia che studia insieme"
                    width={500}
                    height={500}
                    priority // Fondamentale per il LCP
                    className="rounded-2xl shadow-2xl object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
