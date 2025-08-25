'use client';

import { useState } from 'react';
import Link from 'next/link';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('tutti');

  const faqData = {
    generale: [
      {
        question: "Cos'è TutorAI?",
        answer: "TutorAI è un tutor intelligente basato sull'intelligenza artificiale che si adatta al tuo stile di apprendimento personale. A differenza dei tutor tradizionali, TutorAI analizza il modo in cui impari e personalizza ogni spiegazione, esercizio e percorso di studio per te."
      },
      {
        question: "Come funziona TutorAI?",
        answer: "TutorAI utilizza algoritmi avanzati di machine learning per analizzare il tuo stile cognitivo, le tue lacune e i tuoi punti di forza. Basandosi su questi dati, crea un percorso di apprendimento personalizzato che si adatta in tempo reale ai tuoi progressi."
      },
      {
        question: "TutorAI sostituisce i tutor umani?",
        answer: "TutorAI non sostituisce completamente i tutor umani, ma offre un supporto complementare e spesso più efficace. È disponibile 24/7, non si stanca mai e può analizzare migliaia di dati per personalizzare l'apprendimento in modo impossibile per un tutor umano."
      }
    ],
    tecnico: [
      {
        question: "Quali dispositivi supporta TutorAI?",
        answer: "TutorAI funziona su tutti i dispositivi: computer desktop, laptop, tablet e smartphone. L'interfaccia si adatta automaticamente alle dimensioni dello schermo per offrire la migliore esperienza possibile."
      },
      {
        question: "Ho bisogno di una connessione internet?",
        answer: "Sì, TutorAI richiede una connessione internet per funzionare. Questo permette al sistema di aggiornarsi continuamente con nuovi contenuti e di sincronizzare i tuoi progressi su tutti i dispositivi."
      },
      {
        question: "I miei dati sono sicuri?",
        answer: "Assolutamente sì. Tutti i dati sono crittografati e protetti secondo gli standard GDPR. Non condividiamo mai le tue informazioni personali con terze parti senza il tuo consenso esplicito."
      }
    ],
    pricing: [
      {
        question: "Quanto costa TutorAI?",
        answer: "TutorAI offre diversi piani di abbonamento. Durante la fase Beta, offriamo 1 mese gratuito con 1000 crediti. Dopo la Beta, i prezzi partiranno da €19.99/mese per il piano base, con sconti per abbonamenti annuali."
      },
      {
        question: "Posso disdire in qualsiasi momento?",
        answer: "Sì, puoi disdire il tuo abbonamento in qualsiasi momento senza penali. I crediti non utilizzati rimangono validi fino alla scadenza del periodo di abbonamento."
      },
      {
        question: "C'è un periodo di prova?",
        answer: "Sì, offriamo un periodo di prova gratuito di 7 giorni per tutti i nuovi utenti. Durante questo periodo puoi testare tutte le funzionalità senza impegno."
      }
    ],
    curricula: [
      {
        question: "Quali sistemi scolastici supporta?",
        answer: "TutorAI supporta tutti i principali sistemi scolastici: Sistema Italiano (MIUR), IGCSE/UK System, International Baccalaureate (IB), American K-12, AEFE (Francese) e Gymnasium (Tedesco)."
      },
      {
        question: "E se cambio scuola o sistema?",
        answer: "TutorAI si adatta automaticamente quando cambi sistema scolastico. Basta aggiornare le tue preferenze e il sistema ricreerà il tuo percorso di apprendimento per il nuovo curriculum."
      },
      {
        question: "Supporta anche l'università?",
        answer: "Attualmente TutorAI è ottimizzato per studenti delle scuole medie e superiori. Stiamo lavorando per estendere il supporto anche agli studenti universitari."
      }
    ]
  };

  const categories = [
    { id: 'tutti', name: 'Tutte le domande' },
    { id: 'generale', name: 'Generale' },
    { id: 'tecnico', name: 'Tecnico' },
    { id: 'pricing', name: 'Prezzi' },
    { id: 'curricula', name: 'Curricula' }
  ];

  // Filtra le FAQ in base alla categoria e al termine di ricerca
  const filteredFAQs = Object.entries(faqData)
    .filter(([category]) => activeCategory === 'tutti' || category === activeCategory)
    .flatMap(([category, faqs]) => 
      faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            ← Torna alla Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Domande Frequenti</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Trova qui tutte le risposte. Se hai altri dubbi, non esitare a contattarci.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Barra di ricerca */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cerca nelle FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Categorie */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="perspective-container">
                <div className="card-oblique glowing-border bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nessuna FAQ trovata per "{searchTerm}". Prova a cercare con termini diversi.
              </p>
            </div>
          )}
        </div>

        {/* Contatti */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Non hai trovato quello che cercavi?
          </h2>
          <p className="text-gray-600 mb-6">
            Il nostro team è qui per aiutarti. Contattaci e ti risponderemo entro 24 ore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
              Contattaci
            </button>
            <Link href="/beta-access" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Richiedi Accesso Beta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
