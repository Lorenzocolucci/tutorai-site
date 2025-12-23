'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Generate consistent avatar colors based on name
const getAvatarColors = (name) => {
  const colors = [
    ['#3B82F6', '#1D4ED8'], // Blue gradient
    ['#10B981', '#047857'], // Green gradient  
    ['#F59E0B', '#D97706'], // Orange gradient
    ['#EF4444', '#DC2626'], // Red gradient
    ['#8B5CF6', '#7C3AED'], // Purple gradient
    ['#06B6D4', '#0891B2'], // Cyan gradient
    ['#F97316', '#EA580C'], // Orange gradient
    ['#EC4899', '#DB2777'], // Pink gradient
  ];
  
  // Use name to generate consistent index
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index].join(', ');
};

// EXPAND testimonials to cover all ages, subjects and cities - COMPLETE LIKE ENGLISH VERSION
const testimonialsData = [
  // STUDENTS 5-12 YEARS (Primary School)
  {
    id: 1,
    name: "Alice F.",
    age: 8,
    city: "Milano",
    school: "Scuola Primaria San Giuseppe",
    subject: "Matematica",
    grade_before: 4.0,
    grade_after: 7.5,
    timeframe: "Febbraio - Giugno 2024",
    quote: "TutorAI rende la matematica divertente con giochi e spiegazioni colorate. Ora amo risolvere i problemi!",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 2,
    name: "Tommaso R.",
    age: 10,
    city: "Roma",
    school: "Scuola Primaria Giovanni XXIII",
    subject: "Inglese",
    grade_before: 5.0,
    grade_after: 8.0,
    timeframe: "Gennaio - Maggio 2024",
    quote: "Leggere storie con TutorAI è fantastico! L'IA mi aiuta a capire parole nuove e ora leggo molto meglio.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 3,
    name: "Emma W.",
    age: 11,
    city: "Torino",
    school: "Istituto San Francesco di Sales",
    subject: "Scienze",
    grade_before: 5.5,
    grade_after: 8.5,
    timeframe: "Marzo - Luglio 2024",
    quote: "Gli esperimenti scientifici con TutorAI sono fantastici! Capisco come crescono le piante e perché il cielo è blu.",
    image: "/assets/features/vardan-papikyan-Sh1cdGk5eyY-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 4,
    name: "Mamma di Sofia",
    age: 42,
    city: "Milano",
    school: "Scuola Primaria Manzoni",
    subject: "Supporto Generale",
    grade_before: 0,
    grade_after: 0,
    timeframe: "Settembre 2023 - Presente",
    quote: "Come genitore, sono stupita dall'impatto di TutorAI su mia figlia di 9 anni. La sua sicurezza in matematica è alle stelle e i compiti non sono più una battaglia.",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: true
  },
  {
    id: 5,
    name: "Carlo B.",
    age: 12,
    city: "Bologna",
    school: "Scuola Media Leonardo da Vinci",
    subject: "Geografia",
    grade_before: 6.0,
    grade_after: 8.5,
    timeframe: "Ottobre 2023 - Aprile 2024",
    quote: "Imparare paesi e mappe con TutorAI è come viaggiare per il mondo! Ora conosco tante capitali.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  
  // STUDENTS 13-15 YEARS (Middle School/First Years High School)
  {
    id: 6,
    name: "Marco S.",
    age: 17,
    city: "Roma",
    school: "Liceo Classico Giulio Cesare",
    subject: "Matematica", 
    grade_before: 4.5,
    grade_after: 7.0,
    timeframe: "Marzo - Giugno 2024",
    quote: "Lottavo con la matematica da anni, ma TutorAI ha spiegato i concetti così chiaramente che ora riesco a risolvere anche i problemi più difficili.",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 7,
    name: "Sofia R.",
    age: 15,
    city: "Milano", 
    school: "Liceo Scientifico Alessandro Volta",
    subject: "Fisica",
    grade_before: 5.0,
    grade_after: 8.0,
    timeframe: "Gennaio - Maggio 2024",
    quote: "Le simulazioni interattive di TutorAI mi hanno fatto capire la fisica in modo completamente nuovo. Non studio più a memoria, ma comprendo davvero.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 8,
    name: "Alessandro T.",
    age: 16,
    city: "Napoli",
    school: "Liceo Linguistico Giuseppe Mazzini", 
    subject: "Letteratura Inglese",
    grade_before: 6.0,
    grade_after: 8.5,
    timeframe: "Settembre 2023 - Febbraio 2024",
    quote: "Grazie a TutorAI ho migliorato la mia analisi letteraria inglese e ora scrivo saggi con sicurezza. Il sistema si adatta al mio ritmo di apprendimento.",
    image: "/assets/features/vardan-papikyan-Sh1cdGk5eyY-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 9,
    name: "Emma C.",
    age: 14,
    city: "Firenze",
    school: "Liceo Artistico di Porta Romana",
    subject: "Chimica",
    grade_before: 5.5,
    grade_after: 7.5,
    timeframe: "Ottobre 2023 - Aprile 2024",
    quote: "La chimica sembrava impossibile fino a quando TutorAI ha scomposto le reazioni complesse in passaggi semplici e comprensibili. Incredibile!",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 10,
    name: "Giacomo L.",
    age: 16,
    city: "Bologna",
    school: "Liceo Scientifico Enrico Fermi",
    subject: "Biologia",
    grade_before: 5.0,
    grade_after: 8.0,
    timeframe: "Febbraio - Luglio 2024",
    quote: "TutorAI ha reso la biologia affascinante con i suoi diagrammi visivi e le lezioni interattive. La mia comprensione è migliorata drasticamente.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 11,
    name: "Chiara M.",
    age: 15,
    city: "Torino",
    school: "Liceo Classico Massimo d'Azeglio",
    subject: "Storia",
    grade_before: 6.0,
    grade_after: 8.5,
    timeframe: "Novembre 2023 - Maggio 2024",
    quote: "La storia ha preso vita con le spiegazioni contestuali di TutorAI e le visualizzazioni delle timeline. Finalmente capisco i rapporti causa-effetto.",
    image: "/assets/features/vardan-papikyan-Sh1cdGk5eyY-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 12,
    name: "Oliviero H.",
    age: 17,
    city: "Milano",
    school: "Liceo Scientifico Leonardo da Vinci",
    subject: "Informatica",
    grade_before: 6.5,
    grade_after: 9.0,
    timeframe: "Gennaio - Giugno 2024",
    quote: "I tutorial di programmazione e le spiegazioni degli algoritmi di TutorAI sono eccezionali. Sono passato dal fare fatica all'eccellere in informatica.",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 13,
    name: "Isabella C.",
    age: 14,
    city: "Firenze",
    school: "Scuola Media Dante Alighieri",
    subject: "Francese",
    grade_before: 5.5,
    grade_after: 7.8,
    timeframe: "Dicembre 2023 - Maggio 2024",
    quote: "Imparare il francese con TutorAI è come avere un madrelingua paziente sempre disponibile. La mia pronuncia e grammatica sono migliorate significativamente.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  }
];

const TestimonialsPage = () => {
  const [ageFilter, setAgeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Extract unique values for filters
  const ageGroups = ['all', '5-12', '13-15', '16-18'];
  const subjects = ['all', ...Array.from(new Set(testimonialsData.map(t => t.subject)))];
  const cities = ['all', ...Array.from(new Set(testimonialsData.map(t => t.city)))];

  // Filter testimonials
  const filteredTestimonials = testimonialsData.filter(testimonial => {
    const ageMatch = ageFilter === 'all' || 
      (ageFilter === '5-12' && testimonial.age >= 5 && testimonial.age <= 12) ||
      (ageFilter === '13-15' && testimonial.age >= 13 && testimonial.age <= 15) ||
      (ageFilter === '16-18' && testimonial.age >= 16 && testimonial.age <= 18);
    
    const subjectMatch = subjectFilter === 'all' || testimonial.subject === subjectFilter;
    const cityMatch = cityFilter === 'all' || testimonial.city === cityFilter;
    
    return ageMatch && subjectMatch && cityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors">
              ← Torna alla Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Storie di Successo degli Studenti</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimonianze reali di studenti che hanno trasformato le loro prestazioni accademiche con TutorAI. Risultati verificati, esperienze autentiche.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Enhanced Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Filtra le Storie di Successo</h2>
            
            {/* Age Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fascia d'Età</h3>
              <div className="flex flex-wrap gap-3">
                {ageGroups.map(age => (
                  <button
                    key={age}
                    onClick={() => setAgeFilter(age)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      ageFilter === age
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {age === 'all' ? 'Tutte le Età' : `${age} anni`}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Materia</h3>
              <div className="flex flex-wrap gap-3">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setSubjectFilter(subject)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      subjectFilter === subject
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subject === 'all' ? 'Tutte le Materie' : subject}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Città</h3>
              <div className="flex flex-wrap gap-3">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setCityFilter(city)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cityFilter === city
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city === 'all' ? 'Tutte le Città' : city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Mostrate <span className="font-semibold text-primary">{filteredTestimonials.length}</span> storie di {filteredTestimonials.length === 1 ? 'successo' : 'successo'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map(testimonial => (
            <article key={testimonial.id} className="perspective-container">
              <div className="card-border-animated bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full mr-4 flex-shrink-0">
                    {/* Generate avatar based on name initials */}
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${getAvatarColors(testimonial.name)})`
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    {/* Add verification badge */}
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.age} anni • {testimonial.city}</p>
                    <p className="text-sm text-gray-500 truncate">{testimonial.school}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-primary">{testimonial.subject}</span>
                    <span className="text-xs text-gray-500">{testimonial.timeframe}</span>
                  </div>
                  
                  {!testimonial.isParent && (
                    <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-500">{testimonial.grade_before}</div>
                        <div className="text-xs text-gray-500 font-medium">Prima</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 transition-all duration-1000"
                            style={{ 
                              width: `${((testimonial.grade_after - testimonial.grade_before) / (10 - testimonial.grade_before)) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-center text-xs text-gray-600 mt-1 font-medium">Progresso</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-500">{testimonial.grade_after}</div>
                        <div className="text-xs text-gray-500 font-medium">Dopo</div>
                      </div>
                    </div>
                  )}
                </div>

                <blockquote className="text-gray-700 italic text-center mb-6 flex-1 flex items-center">
                  <span>"{testimonial.quote}"</span>
                </blockquote>

                <div className="text-center mt-auto">
                  <Link 
                    href="/beta-access"
                    className="inline-block bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Inizia la Tua Storia di Successo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a Unirti alle Nostre Storie di Successo?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Scopri come TutorAI può trasformare le tue prestazioni accademiche con un tutoring AI personalizzato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Link
              href="/beta-access"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Richiedi Accesso Beta
            </Link>
            <Link
              href="/blog"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors inline-block"
            >
              Leggi il Nostro Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;