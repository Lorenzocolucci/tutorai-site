'use client';

import { useState } from 'react';

const faqData = [
  {
    question: "Che cos'è TutorAI in pratica?",
    answer: "È il tuo tutor personale disponibile 24/7. Non è un database di video o esercizi, ma un'intelligenza artificiale che dialoga con te, capisce le tue difficoltà e crea spiegazioni, esercizi e piani di studio su misura per te, in tempo reale."
  },
  {
    question: "Siamo in fase beta, cosa significa per me?",
    answer: "Significa che avrai accesso anticipato e gratuito alla piattaforma in cambio del tuo feedback. Ci aiuterai a perfezionare il servizio prima del lancio ufficiale. I posti sono limitati per garantire un'alta qualità del supporto a ogni beta tester."
  },
  {
    question: "Sostituisce un insegnante o le ripetizioni?",
    answer: "TutorAI è progettato per essere un potentissimo strumento di supporto che affianca lo studio quotidiano. Sostituisce le ripetizioni tradizionali offrendo un'alternativa più economica, sempre disponibile e totalmente personalizzata, che si adatta al ritmo dello studente."
  }
];

const FaqItem = ({ item, isOpen, onClick }) => (
  <div className="perspective-container">
    <div className="card-oblique glowing-border border-b border-gray-200 py-6">
    <dt>
      <button onClick={onClick} className="w-full text-left flex justify-between items-center text-lg text-text-primary">
        <span className="font-semibold">{item.question}</span>
        <span className="ml-6 h-7 flex items-center">
          <svg className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
    </dt>
    {isOpen && (
      <dd className="mt-4 pr-12 text-base text-text-secondary">
        <p>{item.answer}</p>
      </dd>
    )}
    </div>
  </div>
);


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
          <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Domande? Abbiamo le risposte.
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Le domande più frequenti per iniziare subito la rivoluzione del tuo studio.
          </p>
        </div>
        <div className="w-full">
          <dl className="space-y-4">
            {faqData.map((item, index) => (
              <FaqItem 
                key={index} 
                item={item} 
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
