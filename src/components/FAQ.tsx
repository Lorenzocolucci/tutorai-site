'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// Sub-componente per l'accordion con lo stesso stile della pagina FAQ
const FaqItem = ({ faq, isOpen, onClick }) => (
  <div className="perspective-container">
    <div className="card-oblique glowing-border-follow border-b border-gray-200 py-1 transition-all duration-300">
      <button onClick={onClick} className="w-full text-left flex justify-between items-center p-6 text-lg text-gray-900">
        <span className="font-semibold">{faq.question}</span>
        <span className="ml-6 h-7 flex items-center">
          <svg className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-base text-gray-700 prose">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function FAQ() {
  const { t } = useTranslation('pages');
  const [open, setOpen] = useState<number | null>(0);
  
  const handleToggle = (index: number) => {
    setOpen(open === index ? null : index);
  };

  // Ottieni le FAQ dalle traduzioni
  const faqItems = t('faq.items', { returnObjects: true }) as any[];

  return (
    <section id="faq" className="section bg-slate-50">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('faq.title')}</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="space-y-4">
            {faqItems.map((item: any, i: number) => (
              <FaqItem
                key={i}
                faq={item}
                isOpen={open === i}
                onClick={() => handleToggle(i)}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
