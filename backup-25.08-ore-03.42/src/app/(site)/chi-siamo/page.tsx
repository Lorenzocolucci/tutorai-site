'use client';

import Link from 'next/link';
import Image from 'next/image';

const AboutUsPage = () => {
  const values = [
    {
      icon: "🎯",
      title: "Personalizzazione Assoluta",
      description: "Crediamo che ogni studente sia unico. Il nostro obiettivo è creare un'esperienza di apprendimento che si adatti perfettamente a te."
    },
    {
      icon: "🔬",
      title: "Scienza e Ricerca",
      description: "Ogni funzionalità è basata su solidi principi scientifici e testata rigorosamente prima di essere rilasciata."
    },
    {
      icon: "🤝",
      title: "Collaborazione",
      description: "Lavoriamo con insegnanti, studenti e genitori per creare la migliore esperienza di apprendimento possibile."
    },
    {
      icon: "🌍",
      title: "Accessibilità Globale",
      description: "Vogliamo rendere l'educazione di qualità accessibile a tutti, indipendentemente da dove vivi o dalle tue risorse economiche."
    }
  ];

  const approach = [
    {
      title: "Intelligenza Artificiale Avanzata",
      description: "Utilizziamo algoritmi di machine learning all'avanguardia per analizzare il tuo stile di apprendimento e adattare ogni spiegazione.",
      icon: "🧠"
    },
    {
      title: "Psicologia Cognitiva",
      description: "La nostra IA è addestrata sui principi della psicologia cognitiva per comprendere come il cervello elabora e memorizza le informazioni.",
      icon: "🧬"
    },
    {
      title: "Neuroscienze",
      description: "Integriamo le ultime scoperte delle neuroscienze per ottimizzare i tempi di ripasso e la memorizzazione a lungo termine.",
      icon: "⚡"
    },
    {
      title: "Pedagogia Sperimentale",
      description: "Testiamo continuamente nuovi metodi di insegnamento per identificare quelli più efficaci per ogni tipo di studente.",
      icon: "📚"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            ← Torna alla Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">La Nostra Storia</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Non siamo solo tecnologi. Siamo prima di tutto educatori che usano la tecnologia per risolvere problemi reali.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Missione */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">La Nostra Missione</h2>
              <p className="text-lg text-gray-700 mb-6">
                TutorAI nasce da una semplice ma potente intuizione: <strong>l'educazione tradizionale non funziona per tutti</strong>. 
                Troppi studenti si sentono lasciati indietro, frustrati da metodi di insegnamento che non si adattano al loro modo di pensare.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                La nostra missione è democratizzare l'educazione personalizzata. Vogliamo che ogni studente, 
                indipendentemente dal suo stile di apprendimento, possa avere accesso a un tutor che lo capisce davvero.
              </p>
              <p className="text-lg text-gray-700">
                Non stiamo solo creando un'app. Stiamo creando il futuro dell'educazione.
              </p>
            </div>
            <div className="perspective-container">
              <div className="card-oblique glowing-border-follow relative">
                <Image
                  src="/assets/features/pexels-shkrabaanthony-5306436.jpg"
                  alt="Team che collabora su un progetto educativo"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Il Nostro Approccio */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Il Nostro Approccio Scientifico</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {approach.map((item, index) => (
              <div key={index} className="perspective-container">
                <div className="card-oblique glowing-border bg-gray-50 p-8 rounded-2xl">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Valori */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">I Nostri Valori</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="perspective-container">
                <div className="card-oblique glowing-border text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistiche */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-8">I Nostri Numeri</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-white/80">Studenti Beta</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15</div>
                <div className="text-white/80">Paesi</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">89%</div>
                <div className="text-white/80">Miglioramento Voti</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Disponibilità</div>
              </div>
            </div>
          </div>
        </section>

        {/* Visione Futura */}
        <section className="mb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">La Nostra Visione del Futuro</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Immaginiamo un mondo in cui ogni studente ha accesso a un'educazione personalizzata di altissima qualità. 
              Un mondo in cui le barriere economiche e geografiche non limitano più il potenziale di apprendimento.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="perspective-container">
                <div className="card-oblique glowing-border text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Educazione Universale</h3>
                  <p className="text-gray-700">Accesso a un'educazione di qualità per tutti gli studenti del mondo.</p>
                </div>
              </div>
              <div className="perspective-container">
                <div className="card-oblique glowing-border text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovazione Continua</h3>
                  <p className="text-gray-700">Sviluppo costante di nuove tecnologie per migliorare l'apprendimento.</p>
                </div>
              </div>
              <div className="perspective-container">
                <div className="card-oblique glowing-border text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborazione Globale</h3>
                  <p className="text-gray-700">Partnership con educatori e istituzioni in tutto il mondo.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Unisciti alla Rivoluzione Educativa
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Sei pronto a sperimentare il futuro dell'apprendimento? 
            Richiedi l'accesso alla Beta e inizia il tuo percorso personalizzato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/beta-access" className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold">
              Richiedi Accesso Beta
            </Link>
            <Link href="/faq" className="bg-gray-200 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors text-lg font-semibold">
              Scopri di Più
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
