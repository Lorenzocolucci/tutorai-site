'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('pages');
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Get FAQ data from translations with fallback
  const faqData = t('home.faq.items', { returnObjects: true }) || [
    {
      question: "What is TutorAI in practice?",
      answer: "It's your personal tutor available 24/7. It's not a database of videos or exercises, but an artificial intelligence that dialogues with you, understands your difficulties and creates explanations, exercises and study plans tailored to you, in real time."
    },
    {
      question: "We are in beta phase, what does this mean for me?",
      answer: "It means you'll have early and free access to the platform in exchange for your feedback. You'll help us perfect the service before the official launch. Spots are limited to ensure high quality support for each beta tester."
    },
    {
      question: "Does it replace a teacher or tutoring?",
      answer: "TutorAI is designed to be a powerful support tool that accompanies daily study. It replaces traditional tutoring by offering a more economical, always available and totally personalized alternative that adapts to the student's pace."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            {t('home.faq.title', 'Questions? We have answers.')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            {t('home.faq.subtitle', 'The most frequently asked questions to immediately start the revolution of your study.')}
          </p>
        </div>
        <div className="w-full">
          <dl className="space-y-4">
            {faqData && faqData.length > 0 ? (
              faqData.map((item, index) => (
                <FaqItem 
                  key={index} 
                  item={item} 
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                <p>FAQ data not available</p>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
