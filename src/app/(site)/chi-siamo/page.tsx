'use client';

// src/app/(site)/chi-siamo/page.tsx

import Image from 'next/image';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';

// Dati per le sezioni, per mantenere il codice pulito
const sections = [
  {
    title: "15 Anni sul Campo",
    content: "Per oltre quindici anni, la nostra casa è stata una scuola reale. Non un ufficio, non un laboratorio, ma un luogo fatto di campanelle, interrogazioni e, soprattutto, di studenti. Abbiamo diretto, insegnato e vissuto ogni giorno le stesse sfide che affrontano le famiglie: la pressione dei voti, metodi di insegnamento 'taglia unica' che lasciano indietro i più fragili e la frustrazione di vedere potenziale inespresso. Non siamo partiti da un'idea astratta. Siamo partiti da loro: dagli errori, dalle insicurezze e dalla scintilla nei loro occhi quando, finalmente, capivano. È da questa esperienza diretta che nasce la nostra ossessione.",
    imageUrl: "/assets/chi-siamo/radici.webp",
    imageAlt: "Dettaglio di un'aula scolastica con libri e appunti",
    align: "left"
  },
  {
    title: "La Ribellione a un Sistema Inadeguato",
    content: "Abbiamo visto troppi ragazzi etichettati da un voto, schiacciati da una media o definiti da un test. Abbiamo visto un sistema che chiede a menti uniche di adattarsi a uno stampo standardizzato, invece di fornire a ciascuno la chiave giusta per la propria serratura. Ci siamo chiesti: e se potessimo invertire il paradigma? Se, invece di chiedere allo studente di cambiare per adattarsi alla scuola, potessimo creare un tutor che si adatta intimamente a ogni studente? Un sistema che non si preoccupa solo del 'cosa' impari, ma del 'come' lo impari, rispettando le tue emozioni e il tuo stile cognitivo.",
    imageUrl: "/assets/chi-siamo/scintilla.webp",
    imageAlt: "Metafora visiva di una chiave che entra in una serratura a forma di cervello",
    align: "right"
  },
  {
    title: "Scienza, Empatia e Tecnologia",
    content: "TutorAI è la nostra risposta. È il punto d'incontro tra i nostri 30+ anni di esperienza in educazione, psicologia e le più avanzate tecnologie di intelligenza artificiale. Non è un semplice software. È una piattaforma costruita su tre pilastri inscindibili: un tutor che si adatta a te, un sistema che unisce scienza e didattica, e una piattaforma costruita su risultati misurabili. Crediamo nel potere dei dati per mostrare progressi reali, non in promesse vuote.",
    imageUrl: "/assets/chi-siamo/soluzione.webp",
    imageAlt: "Illustrazione di una rete neurale che si collega a un cuore umano",
    align: "left"
  },
  {
    title: "La Nostra Promessa",
    content: "La nostra promessa è semplice e non cambierà mai: niente storytelling astratto, ma soluzioni per problemi reali che portano a risultati concreti. Siamo qui per costruire fiducia, colmare lacune e, soprattutto, per ricordare a ogni studente che il successo non è una questione di talento innato, ma di avere finalmente gli strumenti giusti. Il tuo strumento.",
    imageUrl: "/assets/chi-siamo/promessa.webp",
    imageAlt: "Studente che sorride guardando i suoi risultati positivi su un tablet",
    align: "right"
  }
];

export default function AboutUsPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero della pagina Chi Siamo */}
      <div className="relative bg-slate-900 text-white py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-purple-800 opacity-80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-6xl font-bold !leading-tight">
              Nati in un'aula, non in un laboratorio.
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto">
              La nostra storia non inizia con una riga di codice, ma con lo sguardo di uno studente in difficoltà.
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Storytelling a sezioni alternate */}
      <div className="py-20 md:py-28 space-y-20 md:space-y-28">
        {sections.map((section, index) => (
          <AnimateOnScroll key={index}>
            <div className="container mx-auto px-6 max-w-7xl">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${section.align === 'right' ? 'md:grid-flow-col-dense' : ''}`}>
                
                {/* Colonna Immagine */}
                <div className={`perspective-container ${section.align === 'right' ? 'md:col-start-2' : ''}`}>
                  <div className="card-oblique glowing-border-follow relative">
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt}
                      width={600}
                      height={450}
                      className="rounded-2xl shadow-2xl object-cover w-full aspect-[4/3]"
                    />
                  </div>
                </div>

                {/* Colonna Testo */}
                <div className={`${section.align === 'right' ? 'md:col-start-1' : ''}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">{section.title}</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p>{section.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {/* Sezione CTA Finale */}
      <AnimateOnScroll>
        <div className="bg-gray-50 py-20 md:py-24">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Unisciti alla nostra missione
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
              Crediamo in un futuro dove ogni studente può raggiungere il proprio massimo potenziale. Se condividi questa visione, sei nel posto giusto.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/beta-access" variant="secondary" className="text-lg">
                🚀 Richiedi Accesso Beta
              </Button>
              <Button href="/#features" variant="outline" className="text-lg">
                Scopri le funzionalità
              </Button>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
