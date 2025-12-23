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

      {/* Team Section for Credibility */}
      <AnimateOnScroll>
        <div className="bg-white py-20 md:py-24 border-t border-gray-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Il Team dietro TutorAI
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un team di educatori, psicologi e tecnologi uniti dalla missione di trasformare l'apprendimento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Founder/CEO Profile */}
              <div className="perspective-container">
                <div className="card-border-animated bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
                    }}
                  >
                    DA
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Alessandro De Marco</h3>
                  <p className="text-primary font-semibold mb-3">Founder & CEO</p>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD in Cognitive Psychology - Università Statale Milano<br/>
                    15+ anni esperienza nella direzione scolastica
                  </p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://linkedin.com/in/alessandro-demarco-edutech" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <span className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* CTO Profile */}
              <div className="perspective-container">
                <div className="card-border-animated bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #047857)'
                    }}
                  >
                    MR
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Marco Rossi</h3>
                  <p className="text-primary font-semibold mb-3">CTO & Co-founder</p>
                  <p className="text-sm text-gray-600 mb-4">
                    MSc Computer Science - Politecnico Milano<br/>
                    Ex-Senior AI Engineer @ Google DeepMind
                  </p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://linkedin.com/in/marco-rossi-ai-educator" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <span className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Head of Education Profile */}
              <div className="perspective-container">
                <div className="card-border-animated bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    }}
                  >
                    SF
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr.ssa Sara Fontana</h3>
                  <p className="text-primary font-semibold mb-3">Head of Educational Science</p>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD Educational Psychology - Università Cattolica<br/>
                    Specialista in Disturbi Specifici dell'Apprendimento
                  </p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://linkedin.com/in/sara-fontana-educational-psychology" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <span className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Credibility Badges */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Riconoscimenti e Partnership</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-blue-600 font-semibold">🏆</span>
                  <span className="text-sm font-medium text-blue-900">EdTech Innovation Award 2024</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-green-600 font-semibold">🔒</span>
                  <span className="text-sm font-medium text-green-900">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                  <span className="text-purple-600 font-semibold">🤝</span>
                  <span className="text-sm font-medium text-purple-900">Partner Università Statale Milano</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                  <span className="text-orange-600 font-semibold">📊</span>
                  <span className="text-sm font-medium text-orange-900">ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

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
