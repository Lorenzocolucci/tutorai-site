// src/app/beta-access/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// NUOVI IMPORT PER FIREBASE
import { db } from '@/utils/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Dati completi per i dropdown
const curriculaData = {
  italia: [
    { value: 'liceo-classico', label: 'Liceo Classico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-scientifico', label: 'Liceo Scientifico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-linguistico', label: 'Liceo Linguistico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-artistico', label: 'Liceo Artistico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-musicale', label: 'Liceo Musicale', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-scienze-umane', label: 'Liceo delle Scienze Umane', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'istituto-tecnico', label: 'Istituto Tecnico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'istituto-professionale', label: 'Istituto Professionale', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'scuola-media', label: 'Scuola Media', classes: ['Prima', 'Seconda', 'Terza'] },
    { value: 'scuola-elementare', label: 'Scuola Elementare', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] }
  ],
  internazionale: [
    { value: 'ib-diploma', label: 'IB Diploma Programme', classes: ['Year 1', 'Year 2'] },
    { value: 'ib-myp', label: 'IB Middle Years Programme', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'] },
    { value: 'a-levels', label: 'A-Levels', classes: ['AS Level', 'A Level'] },
    { value: 'igcse', label: 'IGCSE', classes: ['Year 10', 'Year 11'] },
    { value: 'ap-courses', label: 'AP Courses', classes: ['Grade 11', 'Grade 12'] },
    { value: 'american-high-school', label: 'American High School', classes: ['Freshman', 'Sophomore', 'Junior', 'Senior'] },
    { value: 'french-bac', label: 'French Baccalauréat', classes: ['Seconde', 'Première', 'Terminale'] },
    { value: 'german-abitur', label: 'German Abitur', classes: ['Klasse 11', 'Klasse 12', 'Klasse 13'] },
    { value: 'other-international', label: 'Altro Sistema Internazionale', classes: ['Anno 1', 'Anno 2', 'Anno 3', 'Anno 4', 'Anno 5'] }
  ]
};

const subjects = [
  { id: 'matematica', name: 'Matematica', icon: '📐' },
  { id: 'italiano', name: 'Italiano', icon: '📚' },
  { id: 'inglese', name: 'Inglese', icon: '🇬🇧' },
  { id: 'storia', name: 'Storia', icon: '🏛️' },
  { id: 'geografia', name: 'Geografia', icon: '🌍' },
  { id: 'scienze', name: 'Scienze', icon: '🔬' },
  { id: 'fisica', name: 'Fisica', icon: '⚡' },
  { id: 'chimica', name: 'Chimica', icon: '🧪' },
  { id: 'latino', name: 'Latino', icon: '🏺' },
  { id: 'greco', name: 'Greco', icon: '🏛️' },
  { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
  { id: 'arte', name: 'Arte', icon: '🎨' }
];

// Componente per gli step
const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    {[1, 2, 3].map((step) => (
      <div key={step} className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
            currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {step}
        </div>
        <span className={`font-semibold ${currentStep >= step ? 'text-gray-900' : 'text-gray-600'}`}>
          {step === 1 && 'Dati Personali'}
          {step === 2 && 'Percorso di Studi'}
          {step === 3 && 'Motivazione'}
        </span>
      </div>
    ))}
  </div>
);

const BetaAccessPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    sistemaScolastico: 'italia',
    curriculum: '',
    classe: '',
    materie: [],
    motivazione: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Posti disponibili coerenti con la homepage (aggiornati)
  const totalPlaces = 500;
  const usedPlaces = 342; // Coerente con la homepage
  const availablePlaces = totalPlaces - usedPlaces;
  const completionPercentage = Math.round((usedPlaces / totalPlaces) * 100);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset classe quando cambia il curriculum
      ...(name === 'curriculum' && { classe: '' })
    }));
  };

  const handleSubjectChange = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      materie: prev.materie.includes(subjectId)
        ? prev.materie.filter(id => id !== subjectId)
        : [...prev.materie, subjectId]
    }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validazione semplice per assicurarsi che i campi principali non siano vuoti
    if (!formData.nome || !formData.cognome || !formData.email || !formData.curriculum || !formData.classe) {
      setError('Per favore, compila tutti i campi obbligatori.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Creiamo un riferimento a un nuovo documento nella collezione 'betaRequests'.
      // Usiamo l'email come ID del documento per evitare richieste duplicate.
      const requestDocRef = doc(db, 'betaRequests', formData.email);

      // Salviamo i dati del form nel documento.
      await setDoc(requestDocRef, {
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email,
        sistemaScolastico: formData.sistemaScolastico,
        curriculum: formData.curriculum,
        classe: formData.classe,
        materie: formData.materie,
        motivazione: formData.motivazione,
        requestedAt: serverTimestamp(), // Aggiunge un timestamp del server
        status: 'pending' // Stato iniziale della richiesta
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);

    } catch (err) {
      console.error("Errore durante il salvataggio su Firestore: ", err);
      setError("Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.");
      setIsSubmitting(false);
    }
  };

  // Funzioni per navigare tra gli step
  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  // Ottieni le classi disponibili per il curriculum selezionato
  const getAvailableClasses = () => {
    if (!formData.curriculum) return [];
    const selectedCurriculum = curriculaData[formData.sistemaScolastico]?.find(c => c.value === formData.curriculum);
    return selectedCurriculum?.classes || [];
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Richiesta Inviata!</h1>
          <p className="text-gray-600 mb-6">
            Grazie per il tuo interesse! Ti contatteremo entro 48 ore per confermare il tuo accesso alla Beta.
          </p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TutorAI
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Torna alla Home
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unisciti alla Rivoluzione
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Sii tra i primi a testare il futuro dell'apprendimento. Il tuo posto nella Beta ti aspetta.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Sezione Sinistra: Form a Step */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <StepIndicator currentStep={step} />
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {step === 1 && (
                  // CONTENUTO STEP 1: DATI PERSONALI
                  <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                        <input
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                        <input
                          type="text"
                          name="cognome"
                          value={formData.cognome}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button onClick={nextStep} type="button" className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                      Prossimo →
                    </button>
                  </section>
                )}

                {step === 2 && (
                  // CONTENUTO STEP 2: PERCORSO DI STUDI
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sistema Scolastico *</label>
                      <select
                        name="sistemaScolastico"
                        value={formData.sistemaScolastico}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="italia">Italia</option>
                        <option value="internazionale">Internazionale</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Percorso di Studi *</label>
                      <select
                        name="curriculum"
                        value={formData.curriculum}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleziona un percorso</option>
                        {curriculaData[formData.sistemaScolastico].map((curriculum) => (
                          <option key={curriculum.value} value={curriculum.value}>
                            {curriculum.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Classe *</label>
                      <select
                        name="classe"
                        value={formData.classe}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.curriculum}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {formData.curriculum ? 'Seleziona la classe' : 'Prima seleziona il percorso di studi'}
                        </option>
                        {getAvailableClasses().map((classe) => (
                          <option key={classe} value={classe}>
                            {classe}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Materie di Interesse</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {subjects.map((subject) => (
                          <label key={subject.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.materie.includes(subject.id)}
                              onChange={() => handleSubjectChange(subject.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{subject.icon} {subject.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button onClick={prevStep} type="button" className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                        ← Indietro
                      </button>
                      <button onClick={nextStep} type="button" className="w-2/3 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                        Prossimo →
                      </button>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  // CONTENUTO STEP 3: MOTIVAZIONE E SUBMIT
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Perché vuoi partecipare alla Beta? *</label>
                      <textarea
                        name="motivazione"
                        value={formData.motivazione}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Raccontaci brevemente le tue aspettative e le difficoltà che stai affrontando..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    {/* Messaggio di errore */}
                    {error && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-4 mt-6">
                      <button onClick={prevStep} type="button" className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                        ← Indietro
                      </button>
                       <button type="submit" disabled={isSubmitting} className="w-2/3 bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                         {isSubmitting ? 'Invio...' : 'Richiedi Accesso'}
                       </button>
                    </div>
                  </section>
                )}
              </form>
            </div>
          </div>

          {/* Sezione Destra: Sidebar Persuasiva con Stile Avanzato */}
          <div className="space-y-6">
            {/* Testimonial */}
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-white p-6 rounded-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Dicono di noi</h3>
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/assets/hero/pexels-max-fischer-5212657.jpg" alt="Studente Marco Serra" width={48} height={48} className="rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900">Marco Serra</p>
                    <p className="text-sm text-gray-600">Liceo Classico, Roma</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">"Lottavo con la matematica da sempre. TutorAI ha capito che ragiono per immagini e ha iniziato a spiegarmi i concetti con esempi legati all'arte. Ha cambiato tutto."</p>
              </div>
            </div>

            {/* Vantaggi Beta */}
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎁 Cosa Include l'Accesso Beta</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Accesso completo a tutte le funzionalità</li>
                  <li>• Supporto prioritario dal team</li>
                  <li>• Feedback diretto agli sviluppatori</li>
                  <li>• Accesso gratuito per 6 mesi</li>
                  <li>• Contenuti esclusivi per beta tester</li>
                </ul>
              </div>
            </div>
            
            {/* Posti Limitati - Coerenti con la homepage */}
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Posti Limitati</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Solo {totalPlaces} posti disponibili per la Beta. Già {usedPlaces} richieste ricevute!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{completionPercentage}% completato</p>
                <p className="text-sm font-semibold text-green-600 mt-2">{availablePlaces} posti ancora disponibili</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaAccessPage;
