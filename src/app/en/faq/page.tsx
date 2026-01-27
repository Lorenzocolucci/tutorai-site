'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// FAQ Structured Data Component
const FaqPageStructuredData = ({ faqData }: any) => {
    type FaqItemType = { question: string; answer: string };
    const questions = (Object.values(faqData).flat() as FaqItemType[]).map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
        }
    }));

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

// FAQ Item Component
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


const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = {
    general: [
      {
        question: "What is TutorAI?",
        answer: "TutorAI is an intelligent tutor based on artificial intelligence that adapts to your personal learning style. Unlike traditional tutors, TutorAI analyzes how you learn and personalizes every explanation, exercise, and study path specifically for you."
      },
      {
        question: "How does TutorAI work?",
        answer: "TutorAI uses advanced machine learning algorithms to analyze your cognitive style, knowledge gaps, and strengths. Based on this data, it creates a personalized learning path that adapts in real-time to your progress."
      },
      {
        question: "Does TutorAI replace human tutors?",
        answer: "TutorAI doesn't completely replace human tutors, but offers complementary and often more effective support. It's available 24/7, never gets tired, and can analyze thousands of data points to personalize learning in ways impossible for a human tutor."
      }
    ],
    technical: [
      {
        question: "What devices does TutorAI support?",
        answer: "TutorAI works on all devices: desktop computers, laptops, tablets, and smartphones. The interface automatically adapts to screen sizes to provide the best possible experience."
      },
      {
        question: "Do I need an internet connection?",
        answer: "Yes, TutorAI requires an internet connection to function. This allows the system to continuously update with new content and sync your progress across all devices."
      },
      {
        question: "Is my data secure?",
        answer: "Absolutely yes. All data is encrypted and protected according to GDPR standards. We never share your personal information with third parties without your explicit consent."
      }
    ],
    pricing: [
      {
        question: "How much does TutorAI cost?",
        answer: "TutorAI offers various subscription plans. During the Beta phase, we offer 1 free month with 1000 credits. After Beta, prices will start from €19.99/month for the basic plan, with discounts for annual subscriptions."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time without penalties. Unused credits remain valid until the end of your subscription period."
      },
      {
        question: "Is there a free trial?",
        answer: "Yes, we offer a 7-day free trial for all new users. During this period, you can test all features without commitment."
      }
    ],
    curricula: [
      {
        question: "What school systems does it support?",
        answer: "TutorAI supports all major school systems: Italian System (MIUR), IGCSE/UK System, International Baccalaureate (IB), American K-12, AEFE (French), and Gymnasium (German)."
      },
      {
        question: "What if I change schools or systems?",
        answer: "TutorAI automatically adapts when you change school systems. Just update your preferences and the system will recreate your learning path for the new curriculum."
      },
      {
        question: "Does it support university level?",
        answer: "Currently TutorAI is optimized for middle and high school students. We are working to extend support to university students as well."
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'technical', name: 'Technical' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'curricula', name: 'Curricula' }
  ];

  // Filter FAQs based on category and search term
  const filteredFAQs = Object.entries(faqData)
    .filter(([category]) => activeCategory === 'all' || category === activeCategory)
    .flatMap(([category, faqs]) => 
      faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen-safe">
      <FaqPageStructuredData faqData={faqData} />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/en" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Find all the answers here. If you have other questions, don't hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <AnimateOnScroll>
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search in FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Categories */}
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
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="space-y-4 mt-8">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <FaqItem
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No FAQ found for "{searchTerm}". Try searching with different terms.
                </p>
              </div>
            )}
          </div>
        </AnimateOnScroll>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Didn't find what you were looking for?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is here to help you. Contact us and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/en/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </Link>
            <Link href="/en/beta-access" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Request Beta Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;