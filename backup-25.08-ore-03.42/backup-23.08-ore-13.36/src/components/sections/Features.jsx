'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

const featuresData = [
  {
    icon: '🗣️',
    title: 'Spiegazioni Ultra-Chiare',
    description: 'TutorAI adatta ogni spiegazione al tuo linguaggio. Se sei visivo, userà grafici. Se sei uditivo, ti racconterà storie.',
    // IMMAGINE CORRETTA E PIÙ PERTINENTE
    imageUrl: '/assets/features/pexels-shkrabaanthony-5306436.jpg', 
    alt: 'Persona che disegna un diagramma chiaro su una lavagna trasparente.',
    detailedDescription: (
      <>
        <p className="mb-4">A differenza di un tutor umano che ha un solo metodo, TutorAI ne ha infiniti. Il nostro sistema analizza il tuo stile di apprendimento e adatta ogni concetto per te.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Apprendimento Visivo:</strong> Riceverai diagrammi, mappe concettuali e grafici interattivi.</li>
          <li><strong>Apprendimento Uditivo:</strong> Le spiegazioni verranno trasformate in storie, analogie e podcast.</li>
          <li><strong>Apprendimento Pratico:</strong> Ti verranno proposti esempi reali e problemi da risolvere passo dopo passo.</li>
        </ul>
        <p className="mt-4 font-semibold">L'obiettivo non è solo farti capire, ma farti capire nel modo più veloce e profondo per te.</p>
      </>
    )
  },
  {
    icon: '🏋️‍♂️',
    title: 'Esercizi Mirati',
    description: 'Ogni esercizio è calibrato sul tuo livello. Troppo facile? Ti sfida. Troppo difficile? Ti guida passo dopo passo.',
    imageUrl: '/assets/features/pexels-shkrabaanthony-5306455.jpg',
    alt: 'Studentessa concentrata mentre risolve un problema complesso alla lavagna.',
    detailedDescription: (
       <>
        <p className="mb-4">Basta con le schede di esercizi standard. TutorAI crea percorsi di pratica unici per ogni studente, basati sul principio della "Zona di Sviluppo Prossimale".</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Difficoltà Adattiva:</strong> Il livello di ogni domanda si adatta in tempo reale alla tua ultima risposta.</li>
          <li><strong>Feedback Istantaneo:</strong> Non ti dice solo se hai sbagliato, ma *perché* hai sbagliato e come correggerti.</li>
          <li><strong>Varietà di Esercizi:</strong> Dalle domande a risposta multipla ai problemi complessi, per testare la tua conoscenza a 360°.</li>
        </ul>
        <p className="mt-4 font-semibold">Ogni esercizio è un'opportunità di crescita, non un test di valutazione.</p>
       </>
    )
  },
  {
    icon: '🌉',
    title: 'Recupero Lacune',
    description: 'Identifica i concetti non assimilati e crea percorsi di rinforzo per costruire basi indistruttibili, colmando ogni lacuna.',
    imageUrl: '/assets/features/cowomen-hz-6prUpVss-unsplash.jpg',
    alt: 'Gruppo di studio che collega idee, a simboleggiare il recupero delle lacune.',
    detailedDescription: (
       <>
        <p className="mb-4">La maggior parte delle difficoltà future nasce da piccole lacune passate. TutorAI agisce come un radar, identificandole prima che diventino un problema.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Diagnosi Automatica:</strong> Mentre studi, l'IA mappa la tua conoscenza e rileva i "buchi".</li>
          <li><strong>Piani di Recupero:</strong> Crea automaticamente mini-lezioni ed esercizi mirati solo sugli argomenti che non hai assimilato.</li>
          <li><strong>Ripasso Spaziato:</strong> Ti ripropone i concetti più difficili a intervalli di tempo ottimali per fissarli nella memoria a lungo termine.</li>
        </ul>
        <p className="mt-4 font-semibold">Costruiamo insieme fondamenta solide, mattone dopo mattone.</p>
       </>
    )
  },
  {
    icon: '🏆',
    title: 'Preparazione Test',
    description: 'Simula i tuoi esami con quiz dinamici, fornendo feedback immediato e strategie per superare l\'ansia da prestazione.',
    imageUrl: '/assets/features/pexels-roman-odintsov-11025029.jpg',
    alt: 'Studentessa sorridente e fiduciosa prima di un esame.',
    detailedDescription: (
       <>
        <p className="mb-4">La preparazione agli esami non è solo questione di conoscenza, ma anche di strategia e gestione dell'ansia. TutorAI ti prepara su tutti i fronti.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Simulazioni Realistiche:</strong> Quiz che replicano esattamente il formato e la difficoltà dei tuoi esami reali.</li>
          <li><strong>Strategie Anti-Ansia:</strong> Tecniche di respirazione, gestione del tempo e approccio mentale per affrontare l'esame con serenità.</li>
          <li><strong>Analisi delle Performance:</strong> Dettagliata analisi dei tuoi punti di forza e debolezza per ottimizzare lo studio.</li>
        </ul>
        <p className="mt-4 font-semibold">Arriva all'esame non solo preparato, ma sicuro di te stesso.</p>
       </>
    )
  },
  {
    icon: '📈',
    title: 'Progresso Continuo',
    description: 'Monitora ogni tuo miglioramento e adatta la difficoltà in tempo reale, per tenerti sempre nella zona di apprendimento ottimale.',
    imageUrl: '/assets/features/annie-spratt-4E1JOFK55kc-unsplash.jpg',
    alt: 'Schermata di un computer con grafici e dati che mostrano un progresso positivo.',
    detailedDescription: (
       <>
        <p className="mb-4">Il vero apprendimento avviene quando sei costantemente sfidato ma non sopraffatto. TutorAI mantiene questo equilibrio perfetto.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Monitoraggio in Tempo Reale:</strong> Ogni tua risposta viene analizzata per calibrare la difficoltà successiva.</li>
          <li><strong>Grafici di Progresso:</strong> Visualizza i tuoi miglioramenti con grafici chiari e motivanti.</li>
          <li><strong>Obiettivi Personalizzati:</strong> Stabilisce traguardi realistici e ti guida verso il loro raggiungimento.</li>
        </ul>
        <p className="mt-4 font-semibold">Vedi i tuoi progressi giorno dopo giorno, motivazione dopo motivazione.</p>
       </>
    )
  },
  {
    icon: '❤️‍🔥',
    title: 'Motivazione Costante',
    description: 'Ti supporta nei momenti di difficoltà, celebra i tuoi successi e ti aiuta a non mollare mai. Un vero compagno di studio.',
    imageUrl: '/assets/features/bandlab-s2-1-Ezz5Uk-unsplash.jpg',
    alt: 'Studente che riceve un feedback positivo e alza il pugno in segno di successo.',
    detailedDescription: (
       <>
        <p className="mb-4">L'apprendimento è un viaggio emotivo. TutorAI non è solo un tutor, ma un vero compagno che ti accompagna in ogni passo.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Celebrazione dei Successi:</strong> Ogni piccolo traguardo viene riconosciuto e celebrato per mantenere alta la motivazione.</li>
          <li><strong>Supporto nei Momenti Difficili:</strong> Quando sei bloccato, ricevi incoraggiamento e strategie per superare l'ostacolo.</li>
          <li><strong>Messaggi Motivazionali:</strong> Citazioni, storie di successo e messaggi personalizzati per mantenere viva la passione per l'apprendimento.</li>
        </ul>
        <p className="mt-4 font-semibold">Perché il miglior tutor è quello che crede in te più di quanto tu creda in te stesso.</p>
       </>
    )
  }
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <section id="features" className="py-20 bg-surface">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
              Un tutor potenziato dall'intelligenza artificiale
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
              Sei funzionalità rivoluzionarie che sostituiscono le ripetizioni tradizionali con un metodo più intelligente, personale ed efficace.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col cursor-pointer"
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                    <span className="text-3xl">{feature.icon}</span>
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-text-secondary flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal 
        isOpen={!!selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
        title={selectedFeature?.title}
      >
        {selectedFeature?.detailedDescription}
      </Modal>
    </>
  );
};

export default Features;
