// Esempio di integrazione immagini Background
// Questo file mostra come usare le immagini scaricate per background e texture

import Image from 'next/image';

const BackgroundImages = () => {
  return (
    <div className="background-images-container">
      {/* Background per CTA */}
      <div className="cta-background relative">
        <Image
          src="/assets/bg/bg-gradient-01.jpg"
          alt="Gradiente astratto viola/indaco"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">
            Inizia il tuo percorso di successo
          </h2>
          <p className="text-xl mb-8">
            Unisciti a migliaia di studenti che hanno già trasformato il loro modo di studiare
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            Richiedi Accesso Beta
          </button>
        </div>
      </div>

      {/* Background per sezioni scure */}
      <div className="dark-section-background relative">
        <Image
          src="/assets/bg/bg-gradient-01.jpg"
          alt="Gradiente astratto viola/indaco"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 p-12">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Il futuro dell'educazione è qui
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl">
            TutorAI combina l'intelligenza artificiale più avanzata con principi 
            pedagogici consolidati per creare un'esperienza di apprendimento unica.
          </p>
        </div>
      </div>

      {/* Background per Hero con overlay */}
      <div className="hero-background relative min-h-screen">
        <Image
          src="/assets/bg/bg-gradient-01.jpg"
          alt="Gradiente astratto viola/indaco"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">
              TutorAI
            </h1>
            <p className="text-2xl mb-8">
              Il primo tutor che si adatta a te
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              Scopri di più
            </button>
          </div>
        </div>
      </div>

      {/* Background per sezioni con pattern */}
      <div className="pattern-background relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
        <div className="relative z-10 p-12">
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            Caratteristiche innovative
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">AI Personalizzata</h3>
              <p className="text-text-secondary">
                Si adatta al tuo stile di apprendimento
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Tempo Reale</h3>
              <p className="text-text-secondary">
                Feedback immediato e progressi continui
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Sempre Disponibile</h3>
              <p className="text-text-secondary">
                24/7, quando e dove vuoi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImages;
