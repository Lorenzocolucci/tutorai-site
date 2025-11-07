import Image from 'next/image';

const featuresData = [
  {
    icon: '🗣️',
    title: 'Spiegazioni Ultra-Chiare',
    description: 'TutorAI adatta ogni spiegazione al tuo linguaggio. Se sei visivo, userà grafici. Se sei uditivo, ti racconterà storie.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1770',
    alt: 'Studente che ha un momento di illuminazione mentre studia su un tablet.'
  },
  {
    icon: '🏋️‍♂️',
    title: 'Esercizi Mirati',
    description: 'Ogni esercizio è calibrato sul tuo livello. Troppo facile? Ti sfida. Troppo difficile? Ti guida passo dopo passo.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022',
    alt: 'Studentessa concentrata mentre risolve un problema complesso alla lavagna.'
  },
  {
    icon: '🌉',
    title: 'Recupero Lacune',
    description: 'Identifica i concetti non assimilati e crea percorsi di rinforzo per costruire basi indistruttibili, colmando ogni lacuna.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071',
    alt: 'Gruppo di studio che collega idee, a simboleggiare il recupero delle lacune.'
  },
  {
    icon: '🏆',
    title: 'Preparazione Test',
    description: 'Simula i tuoi esami con quiz dinamici, fornendo feedback immediato e strategie per superare l\'ansia da prestazione.',
    imageUrl: 'https://images.unsplash.com/photo-1523240794102-3cba4c6c92e4?q=80&w=2070',
    alt: 'Studentessa sorridente e fiduciosa prima di un esame.'
  },
  {
    icon: '📈',
    title: 'Progresso Continuo',
    description: 'Monitora ogni tuo miglioramento e adatta la difficoltà in tempo reale, per tenerti sempre nella zona di apprendimento ottimale.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1770',
    alt: 'Schermata di un computer con grafici e dati che mostrano un progresso positivo.'
  },
  {
    icon: '❤️‍🔥',
    title: 'Motivazione Costante',
    description: 'Ti supporta nei momenti di difficoltà, celebra i tuoi successi e ti aiuta a non mollare mai. Un vero compagno di studio.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1770',
    alt: 'Studente che riceve un feedback positivo e alza il pugno in segno di successo.'
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-surface">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Sezione */}
        <div className="text-center mb-16">
          <div className="bg-primary/10 inline-block rounded-full px-6 py-2 mb-4">
            <span className="text-primary font-semibold">🎯 Funzionalità</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Un tutor potenziato dall'intelligenza artificiale
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Sei funzionalità rivoluzionarie che sostituiscono le ripetizioni tradizionali 
            con un metodo più intelligente, personale ed efficace.
          </p>
        </div>

        {/* Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={feature.title} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
                
                {/* Immagine */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image 
                    src={feature.imageUrl} 
                    alt={feature.alt} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Contenuto */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-text-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
