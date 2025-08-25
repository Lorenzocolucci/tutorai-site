'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BetaAccessPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    curriculum: '',
    class: '',
    subjects: [],
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const curriculaData = {
    'italiano': {
      name: 'Sistema Italiano (MIUR)',
      classes: [
        { value: 'elementari-1', label: 'Prima Elementare' },
        { value: 'elementari-2', label: 'Seconda Elementare' },
        { value: 'elementari-3', label: 'Terza Elementare' },
        { value: 'elementari-4', label: 'Quarta Elementare' },
        { value: 'elementari-5', label: 'Quinta Elementare' },
        { value: 'medie-1', label: 'Prima Media' },
        { value: 'medie-2', label: 'Seconda Media' },
        { value: 'medie-3', label: 'Terza Media' },
        { value: 'liceo-classico-1', label: 'Primo Liceo Classico' },
        { value: 'liceo-classico-2', label: 'Secondo Liceo Classico' },
        { value: 'liceo-classico-3', label: 'Terzo Liceo Classico' },
        { value: 'liceo-classico-4', label: 'Quarto Liceo Classico' },
        { value: 'liceo-classico-5', label: 'Quinto Liceo Classico' },
        { value: 'liceo-scientifico-1', label: 'Primo Liceo Scientifico' },
        { value: 'liceo-scientifico-2', label: 'Secondo Liceo Scientifico' },
        { value: 'liceo-scientifico-3', label: 'Terzo Liceo Scientifico' },
        { value: 'liceo-scientifico-4', label: 'Quarto Liceo Scientifico' },
        { value: 'liceo-scientifico-5', label: 'Quinto Liceo Scientifico' },
        { value: 'liceo-linguistico-1', label: 'Primo Liceo Linguistico' },
        { value: 'liceo-linguistico-2', label: 'Secondo Liceo Linguistico' },
        { value: 'liceo-linguistico-3', label: 'Terzo Liceo Linguistico' },
        { value: 'liceo-linguistico-4', label: 'Quarto Liceo Linguistico' },
        { value: 'liceo-linguistico-5', label: 'Quinto Liceo Linguistico' },
        { value: 'istituto-tecnico-1', label: 'Primo Istituto Tecnico' },
        { value: 'istituto-tecnico-2', label: 'Secondo Istituto Tecnico' },
        { value: 'istituto-tecnico-3', label: 'Terzo Istituto Tecnico' },
        { value: 'istituto-tecnico-4', label: 'Quarto Istituto Tecnico' },
        { value: 'istituto-tecnico-5', label: 'Quinto Istituto Tecnico' },
        { value: 'istituto-professionale-1', label: 'Primo Istituto Professionale' },
        { value: 'istituto-professionale-2', label: 'Secondo Istituto Professionale' },
        { value: 'istituto-professionale-3', label: 'Terzo Istituto Professionale' },
        { value: 'istituto-professionale-4', label: 'Quarto Istituto Professionale' },
        { value: 'istituto-professionale-5', label: 'Quinto Istituto Professionale' }
      ]
    },
    'myp': {
      name: 'International Baccalaureate - MYP',
      classes: [
        { value: 'myp-1', label: 'MYP Year 1 (Grade 6)' },
        { value: 'myp-2', label: 'MYP Year 2 (Grade 7)' },
        { value: 'myp-3', label: 'MYP Year 3 (Grade 8)' },
        { value: 'myp-4', label: 'MYP Year 4 (Grade 9)' },
        { value: 'myp-5', label: 'MYP Year 5 (Grade 10)' }
      ]
    },
    'dp': {
      name: 'International Baccalaureate - DP',
      classes: [
        { value: 'dp-1', label: 'DP Year 1 (Grade 11)' },
        { value: 'dp-2', label: 'DP Year 2 (Grade 12)' }
      ]
    },
    'igcse': {
      name: 'IGCSE / UK System',
      classes: [
        { value: 'year-7', label: 'Year 7' },
        { value: 'year-8', label: 'Year 8' },
        { value: 'year-9', label: 'Year 9' },
        { value: 'year-10', label: 'Year 10 (IGCSE)' },
        { value: 'year-11', label: 'Year 11 (IGCSE)' },
        { value: 'as-level', label: 'AS Level' },
        { value: 'a-level', label: 'A Level' }
      ]
    },
    'americano': {
      name: 'American K-12 System',
      classes: [
        { value: 'grade-6', label: 'Grade 6' },
        { value: 'grade-7', label: 'Grade 7' },
        { value: 'grade-8', label: 'Grade 8' },
        { value: 'grade-9', label: 'Grade 9 (Freshman)' },
        { value: 'grade-10', label: 'Grade 10 (Sophomore)' },
        { value: 'grade-11', label: 'Grade 11 (Junior)' },
        { value: 'grade-12', label: 'Grade 12 (Senior)' }
      ]
    },
    'francese': {
      name: 'Sistema Francese (AEFE)',
      classes: [
        { value: 'sixieme', label: 'Sixième' },
        { value: 'cinquieme', label: 'Cinquième' },
        { value: 'quatrieme', label: 'Quatrième' },
        { value: 'troisieme', label: 'Troisième' },
        { value: 'seconde', label: 'Seconde' },
        { value: 'premiere', label: 'Première' },
        { value: 'terminale', label: 'Terminale' }
      ]
    },
    'tedesco': {
      name: 'Sistema Tedesco (Gymnasium)',
      classes: [
        { value: 'klasse-5', label: 'Klasse 5' },
        { value: 'klasse-6', label: 'Klasse 6' },
        { value: 'klasse-7', label: 'Klasse 7' },
        { value: 'klasse-8', label: 'Klasse 8' },
        { value: 'klasse-9', label: 'Klasse 9' },
        { value: 'klasse-10', label: 'Klasse 10' },
        { value: 'klasse-11', label: 'Klasse 11' },
        { value: 'klasse-12', label: 'Klasse 12' },
        { value: 'klasse-13', label: 'Klasse 13' }
      ]
    },
    'universita': {
      name: 'Università',
      classes: [
        { value: 'triennale-1', label: 'Primo Anno Triennale' },
        { value: 'triennale-2', label: 'Secondo Anno Triennale' },
        { value: 'triennale-3', label: 'Terzo Anno Triennale' },
        { value: 'magistrale-1', label: 'Primo Anno Magistrale' },
        { value: 'magistrale-2', label: 'Secondo Anno Magistrale' }
      ]
    }
  };

  const subjects = [
    'Matematica', 'Fisica', 'Chimica', 'Biologia', 'Inglese', 
    'Storia', 'Filosofia', 'Latino', 'Economia', 'Diritto', 'Informatica'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset class when curriculum changes
      ...(name === 'curriculum' && { class: '' })
    }));
  };

  const handleSubjectChange = (subject) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula invio dati
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-4 text-center">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Richiesta Inviata con Successo!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Grazie per il tuo interesse in TutorAI! Ti abbiamo aggiunto alla nostra waiting list. 
            Ti invieremo presto un'email con maggiori dettagli e il tuo codice di accesso beta.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-text-primary mb-2">Cosa succede ora?</h3>
            <ul className="text-sm text-text-secondary space-y-1 text-left">
              <li>• Riceverai una conferma via email entro 24 ore</li>
              <li>• Ti aggiorneremo sui progressi del progetto</li>
              <li>• Avrai accesso prioritario quando lanceremo la beta</li>
              <li>• Potrai testare TutorAI gratuitamente per 30 giorni</li>
            </ul>
          </div>
          <Link href="/" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
            <span role="img" aria-label="cervello">🧠</span>
            <span>TutorAI</span>
          </Link>
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm sm:text-base">
            ← Torna alla Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Richiedi Accesso Beta
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Unisciti alla rivoluzione dell'educazione personalizzata. 
            Sii tra i primi a testare TutorAI e aiuta a plasmare il futuro dell'apprendimento.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Compila la Richiesta</h2>
                <div className="text-sm text-text-secondary">
                  <span className="text-primary font-semibold">*</span> Campi obbligatori
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                      Nome e Cognome <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Il tuo nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="la-tua-email@esempio.com"
                    />
                  </div>
                </div>

                {/* Curriculum and Class Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="curriculum" className="block text-sm font-semibold text-text-primary mb-2">
                      Sistema Scolastico <span className="text-primary">*</span>
                    </label>
                    <select
                      id="curriculum"
                      name="curriculum"
                      required
                      value={formData.curriculum}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option value="">Seleziona il tuo sistema scolastico</option>
                      {Object.entries(curriculaData).map(([key, curriculum]) => (
                        <option key={key} value={key}>{curriculum.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="class" className="block text-sm font-semibold text-text-primary mb-2">
                      Classe <span className="text-primary">*</span>
                    </label>
                    <select
                      id="class"
                      name="class"
                      required
                      value={formData.class}
                      onChange={handleInputChange}
                      disabled={!formData.curriculum}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">{formData.curriculum ? 'Seleziona la tua classe' : 'Prima seleziona il sistema scolastico'}</option>
                      {formData.curriculum && curriculaData[formData.curriculum]?.classes.map((classOption) => (
                        <option key={classOption.value} value={classOption.value}>{classOption.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Materie di Interesse
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {subjects.map(subject => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(subject)}
                          onChange={() => handleSubjectChange(subject)}
                          className="rounded border-gray-300 text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm text-text-secondary">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <label htmlFor="motivation" className="block text-sm font-semibold text-text-primary mb-2">
                    Perché vuoi testare TutorAI?
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Raccontaci brevemente le tue difficoltà nello studio e come pensi che TutorAI possa aiutarti..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Invio in corso...
                    </span>
                  ) : (
                    'Richiedi Accesso Beta'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4">🎯 Cosa Include l'Accesso Beta</h3>
              <ul className="space-y-3 text-sm sm:text-base text-text-secondary">
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  <span>Accesso gratuito per 30 giorni</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  <span>Supporto diretto dal team di sviluppo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  <span>Influenza sulle funzionalità future</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 mt-1">✓</span>
                  <span>Sconto speciale al lancio ufficiale</span>
                </li>
              </ul>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-2xl p-6">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4">📊 Posti Limitati</h3>
              <p className="text-sm sm:text-base text-text-secondary mb-4">
                Stiamo selezionando solo 500 beta tester per garantire un'esperienza di qualità e feedback personalizzato.
              </p>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-success">342</div>
                <div className="text-sm text-text-secondary">posti ancora disponibili</div>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4">🚀 Prossimi Passi</h3>
              <div className="space-y-3 text-sm sm:text-base text-text-secondary">
                <div className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">1.</span>
                  <span>Riceverai una conferma email entro 24 ore</span>
                </div>
                <div className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">2.</span>
                  <span>Ti aggiorneremo sui progressi del progetto</span>
                </div>
                <div className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">3.</span>
                  <span>Avrai accesso prioritario quando lanceremo la beta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaAccessPage;
