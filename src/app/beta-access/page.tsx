// src/app/beta-access/page.tsx
// ALIGNED WITH TUTORAI BACKEND - EXACT 34 SUBJECTS FROM /api/subjects

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BACKEND_API_URL } from '@/lib/supabase';

// ═══════════════════════════════════════════════════════════════════════════
// CURRICULA SUPPORTATI DA TUTORAI (4 curricula)
// ═══════════════════════════════════════════════════════════════════════════
const curriculaData = {
  italia: [
    { value: 'liceo-scientifico', label: 'Liceo Scientifico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
    { value: 'liceo-classico', label: 'Liceo Classico', classes: ['Prima', 'Seconda', 'Terza', 'Quarta', 'Quinta'] },
  ],
  internazionale: [
    { value: 'igcse', label: 'IGCSE', classes: ['Year 10', 'Year 11'] },
    { value: 'ib-diploma', label: 'IB Diploma Programme (DP)', classes: ['Year 1', 'Year 2'] },
    { value: 'ib-myp', label: 'IB Middle Years Programme (MYP)', classes: ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'] },
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// MATERIE ESATTE DA /api/subjects - BACKEND SOURCE OF TRUTH
// ITALIAN LICEI: 8 materie | IGCSE: 5 | IB DP: 14 | IB MYP: 7 = 34 TOTALI
// ═══════════════════════════════════════════════════════════════════════════
const subjectsByCurriculum = {
  // Liceo Scientifico (7 materie - NO greco)
  'liceo-scientifico': {
    'Prima': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Seconda': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Terza': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Letteratura Italiana', icon: '📚' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Quarta': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Letteratura Italiana', icon: '📚' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Quinta': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Letteratura Italiana', icon: '📚' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
  },
  // Liceo Classico (8 materie - CON greco)
  'liceo-classico': {
    'Prima': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'greco', name: 'Greco', icon: '🏺' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Seconda': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'greco', name: 'Greco', icon: '🏺' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Terza': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Letteratura Italiana', icon: '📚' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'greco', name: 'Greco', icon: '🏺' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Quarta': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Letteratura Italiana', icon: '📚' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'greco', name: 'Greco', icon: '🏺' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
    'Quinta': [
      { id: 'matematica', name: 'Matematica', icon: '➗' },
      { id: 'italiano', name: 'Italiano', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Letteratura Italiana', icon: '📚' },
      { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
      { id: 'latino', name: 'Latino', icon: '🏛️' },
      { id: 'greco', name: 'Greco', icon: '🏺' },
      { id: 'fisica', name: 'Fisica', icon: '⚡' },
      { id: 'chimica', name: 'Chimica', icon: '🧪' },
    ],
  },
  // IGCSE (5 materie ESATTE)
  'igcse': {
    'Year 10': [
      { id: 'mathematics_igcse', name: 'Mathematics', icon: '🔢' },
      { id: 'physics_igcse', name: 'Physics', icon: '⚛️' },
      { id: 'chemistry_igcse', name: 'Chemistry', icon: '🧪' },
      { id: 'biology_igcse', name: 'Biology', icon: '🧬' },
      { id: 'computer_science_igcse', name: 'Computer Science', icon: '💻' },
    ],
    'Year 11': [
      { id: 'mathematics_igcse', name: 'Mathematics', icon: '🔢' },
      { id: 'physics_igcse', name: 'Physics', icon: '⚛️' },
      { id: 'chemistry_igcse', name: 'Chemistry', icon: '🧪' },
      { id: 'biology_igcse', name: 'Biology', icon: '🧬' },
      { id: 'computer_science_igcse', name: 'Computer Science', icon: '💻' },
    ],
  },
  // IB Diploma Programme (14 materie ESATTE)
  'ib-diploma': {
    'Year 1': [
      { id: 'mathematics_aa_hl', name: 'Math AA HL', icon: '📊' },
      { id: 'mathematics_aa_sl', name: 'Math AA SL', icon: '📊' },
      { id: 'mathematics_ai_hl', name: 'Math AI HL', icon: '📈' },
      { id: 'mathematics_ai_sl', name: 'Math AI SL', icon: '📈' },
      { id: 'physics_hl', name: 'Physics HL', icon: '⚛️' },
      { id: 'physics_sl', name: 'Physics SL', icon: '⚛️' },
      { id: 'chemistry_hl', name: 'Chemistry HL', icon: '🧪' },
      { id: 'language_a_lit', name: 'Language A Literature', icon: '📚' },
      { id: 'language_b', name: 'Language B', icon: '🌍' },
      { id: 'business', name: 'Business Management', icon: '💼' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'economics', name: 'Economics', icon: '💰' },
      { id: 'tok', name: 'Theory of Knowledge', icon: '🤔' },
      { id: 'extended_essay', name: 'Extended Essay', icon: '📝' },
    ],
    'Year 2': [
      { id: 'mathematics_aa_hl', name: 'Math AA HL', icon: '📊' },
      { id: 'mathematics_aa_sl', name: 'Math AA SL', icon: '📊' },
      { id: 'mathematics_ai_hl', name: 'Math AI HL', icon: '📈' },
      { id: 'mathematics_ai_sl', name: 'Math AI SL', icon: '📈' },
      { id: 'physics_hl', name: 'Physics HL', icon: '⚛️' },
      { id: 'physics_sl', name: 'Physics SL', icon: '⚛️' },
      { id: 'chemistry_hl', name: 'Chemistry HL', icon: '🧪' },
      { id: 'language_a_lit', name: 'Language A Literature', icon: '📚' },
      { id: 'language_b', name: 'Language B', icon: '🌍' },
      { id: 'business', name: 'Business Management', icon: '💼' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'economics', name: 'Economics', icon: '💰' },
      { id: 'tok', name: 'Theory of Knowledge', icon: '🤔' },
      { id: 'extended_essay', name: 'Extended Essay', icon: '📝' },
    ],
  },
  // IB MYP (7 materie ESATTE)
  'ib-myp': {
    'Year 1': [
      { id: 'mathematics_myp', name: 'Mathematics MYP', icon: '📐' },
      { id: 'sciences_myp', name: 'Sciences MYP', icon: '🔬' },
      { id: 'individuals_societies_myp', name: 'Individuals & Societies MYP', icon: '🌐' },
      { id: 'language_acquisition_myp', name: 'Language Acquisition MYP', icon: '🗣️' },
      { id: 'language_literature_myp', name: 'Language & Literature MYP', icon: '📖' },
    ],
    'Year 2': [
      { id: 'mathematics_myp', name: 'Mathematics MYP', icon: '📐' },
      { id: 'sciences_myp', name: 'Sciences MYP', icon: '🔬' },
      { id: 'individuals_societies_myp', name: 'Individuals & Societies MYP', icon: '🌐' },
      { id: 'language_acquisition_myp', name: 'Language Acquisition MYP', icon: '🗣️' },
      { id: 'language_literature_myp', name: 'Language & Literature MYP', icon: '📖' },
    ],
    'Year 3': [
      { id: 'mathematics_myp', name: 'Mathematics MYP', icon: '📐' },
      { id: 'sciences_myp', name: 'Sciences MYP', icon: '🔬' },
      { id: 'individuals_societies_myp', name: 'Individuals & Societies MYP', icon: '🌐' },
      { id: 'language_acquisition_myp', name: 'Language Acquisition MYP', icon: '🗣️' },
      { id: 'language_literature_myp', name: 'Language & Literature MYP', icon: '📖' },
    ],
    'Year 4': [
      { id: 'mathematics_myp', name: 'Mathematics MYP', icon: '📐' },
      { id: 'sciences_myp', name: 'Sciences MYP', icon: '🔬' },
      { id: 'individuals_societies_myp', name: 'Individuals & Societies MYP', icon: '🌐' },
      { id: 'language_acquisition_myp', name: 'Language Acquisition MYP', icon: '🗣️' },
      { id: 'language_literature_myp', name: 'Language & Literature MYP', icon: '📖' },
      { id: 'personal_project_myp', name: 'Personal Project MYP', icon: '🎯' },
    ],
    'Year 5': [
      { id: 'mathematics_myp', name: 'Mathematics MYP', icon: '📐' },
      { id: 'sciences_myp', name: 'Sciences MYP', icon: '🔬' },
      { id: 'individuals_societies_myp', name: 'Individuals & Societies MYP', icon: '🌐' },
      { id: 'language_acquisition_myp', name: 'Language Acquisition MYP', icon: '🗣️' },
      { id: 'language_literature_myp', name: 'Language & Literature MYP', icon: '📖' },
      { id: 'personal_project_myp', name: 'Personal Project MYP', icon: '🎯' },
      { id: 'service_action_myp', name: 'Service & Action MYP', icon: '🤝' },
    ],
  },
};

// Materie generiche fallback (solo Italian Licei comuni)
const genericSubjects = [
  { id: 'matematica', name: 'Matematica', icon: '➗' },
  { id: 'italiano', name: 'Italiano', icon: '📖' },
  { id: 'inglese', name: 'Lingua Inglese', icon: '🇬🇧' },
  { id: 'latino', name: 'Latino', icon: '🏛️' },
  { id: 'fisica', name: 'Fisica', icon: '⚡' },
  { id: 'chimica', name: 'Chimica', icon: '🧪' },
];

const mapCurriculumToWaitlist = (curriculum: string): 'Italian_Licei' | 'IGCSE' | 'IB_DP' | 'IB_MYP' => {
  if (!curriculum) return 'Italian_Licei';
  
  const normalized = curriculum.toLowerCase();
  
  if (normalized.includes('igcse')) return 'IGCSE';
  if (normalized.includes('ib-diploma') || normalized.includes('ib_dp')) return 'IB_DP';
  if (normalized.includes('ib-myp') || normalized.includes('ib_myp')) return 'IB_MYP';
  
  return 'Italian_Licei';
};

// Step Indicator Component
const StepIndicator = ({ currentStep }: { currentStep: number }) => (
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
        <span className={`font-semibold hidden sm:inline ${currentStep >= step ? 'text-gray-900' : 'text-gray-600'}`}>
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
    userType: 'parent',
    sistemaScolastico: 'italia',
    curriculum: '',
    classe: '',
    materie: [] as string[],
    motivazione: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [existingUserInfo, setExistingUserInfo] = useState<{
    status: string;
    message: string;
    action: string;
    login_url?: string;
  } | null>(null);

  const totalPlaces = 500;
  const usedPlaces = 342;
  const availablePlaces = totalPlaces - usedPlaces;
  const completionPercentage = Math.round((usedPlaces / totalPlaces) * 100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'curriculum' && { classe: '', materie: [] }),
      ...(name === 'classe' && { materie: [] }),
      ...(name === 'sistemaScolastico' && { curriculum: '', classe: '', materie: [] })
    }));
  };

  const handleSubjectChange = (subjectId: string) => {
    setFormData(prev => ({
      ...prev,
      materie: prev.materie.includes(subjectId)
        ? prev.materie.filter(id => id !== subjectId)
        : [...prev.materie, subjectId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.nome || !formData.cognome || !formData.email || !formData.curriculum || !formData.classe) {
      setError('Per favore, compila tutti i campi obbligatori.');
      setIsSubmitting(false);
      return;
    }

    try {
      const normalizedCurriculum = mapCurriculumToWaitlist(formData.curriculum);
      const noteSections = [
        formData.motivazione?.trim(),
        `Sistema scolastico: ${formData.sistemaScolastico}`,
        `Percorso selezionato: ${formData.curriculum || 'n/d'}`,
        `Classe: ${formData.classe || 'n/d'}`
      ].filter(Boolean);

      const response = await fetch(`${BACKEND_API_URL}/api/waitlist/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          firstName: formData.nome.trim(),
          lastName: formData.cognome.trim(),
          curriculum: normalizedCurriculum,
          classe: formData.classe,
          materie: formData.materie,
          submittedBy: formData.userType,
          notes: noteSections.length > 0 ? noteSections.join('\n') : null,
          language: 'it'  // ENTERPRISE: Italian language for bilingual emails
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.detail || 'Errore sconosciuto');
      }

      const payload = await response.json();

      if (payload?.already_exists) {
        // Show custom UI for existing users instead of error
        setExistingUserInfo({
          status: payload.status || 'pending',
          message: payload.message || 'Sei già nella lista d\'attesa!',
          action: payload.action || 'wait',
          login_url: payload.login_url
        });
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Errore durante l'invio alla waitlist:", err);
      setError("Si è verificato un errore durante l'invio della richiesta. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const getAvailableClasses = () => {
    if (!formData.curriculum) return [];
    const selectedCurriculum = curriculaData[formData.sistemaScolastico as keyof typeof curriculaData]?.find(c => c.value === formData.curriculum);
    return selectedCurriculum?.classes || [];
  };

  const getAvailableSubjects = () => {
    if (!formData.curriculum || !formData.classe) return genericSubjects;
    
    const curriculumSubjects = subjectsByCurriculum[formData.curriculum as keyof typeof subjectsByCurriculum];
    if (curriculumSubjects && curriculumSubjects[formData.classe as keyof typeof curriculumSubjects]) {
      return curriculumSubjects[formData.classe as keyof typeof curriculumSubjects];
    }
    
    return genericSubjects;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
  
  // Show appropriate UI for existing users
  if (existingUserInfo) {
    const isLoginAction = existingUserInfo.action === 'login';
    const statusIcons: Record<string, string> = {
      invited: '🎫',
      invited_expired: '⏰',
      registered: '✅',
      pending: '⏳'
    };
    const statusColors: Record<string, { bg: string; border: string; icon: string }> = {
      invited: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' },
      invited_expired: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600' },
      registered: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
      pending: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' }
    };
    const colors = statusColors[existingUserInfo.status] || statusColors.pending;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl shadow-xl p-8 max-w-md text-center`}>
          <div className={`text-6xl mb-4 ${colors.icon}`}>
            {statusIcons[existingUserInfo.status] || '👋'}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {existingUserInfo.status === 'registered' ? 'Bentornato!' : 
             existingUserInfo.status === 'invited' ? 'Hai un invito!' :
             existingUserInfo.status === 'invited_expired' ? 'Codice Scaduto' :
             'Sei nella Lista!'}
          </h1>
          <p className="text-gray-700 mb-6 text-lg">
            {existingUserInfo.message}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isLoginAction && existingUserInfo.login_url && (
              <a 
                href={existingUserInfo.login_url}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                🚀 Vai al Login
              </a>
            )}
            <Link 
              href="/" 
              className={`${isLoginAction ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'} px-6 py-3 rounded-xl font-semibold transition-colors`}
            >
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">TutorAI</Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">← Torna alla Home</Link>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <StepIndicator currentStep={step} />
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {step === 1 && (
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chi sta compilando questo form? *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="radio" name="userType" value="parent" checked={formData.userType === 'parent'} onChange={handleInputChange} className="mr-3 text-blue-600 focus:ring-blue-500" />
                          <div>
                            <div className="font-medium text-gray-900">👨‍👩‍👧‍👦 Genitore</div>
                            <div className="text-sm text-gray-500">Compilo per mio figlio/a</div>
                          </div>
                        </label>
                        <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="radio" name="userType" value="student" checked={formData.userType === 'student'} onChange={handleInputChange} className="mr-3 text-blue-600 focus:ring-blue-500" />
                          <div>
                            <div className="font-medium text-gray-900">🎓 Studente</div>
                            <div className="text-sm text-gray-500">Compilo per me stesso/a</div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                        <input type="text" name="cognome" value={formData.cognome} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <button onClick={nextStep} type="button" className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                      Prossimo →
                    </button>
                  </section>
                )}

                {step === 2 && (
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sistema Scolastico *</label>
                      <select name="sistemaScolastico" value={formData.sistemaScolastico} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="italia">Italia</option>
                        <option value="internazionale">Internazionale</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Percorso di Studi *</label>
                      <select name="curriculum" value={formData.curriculum} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Seleziona un percorso</option>
                        {curriculaData[formData.sistemaScolastico as keyof typeof curriculaData].map((curriculum) => (
                          <option key={curriculum.value} value={curriculum.value}>{curriculum.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Classe *</label>
                      <select name="classe" value={formData.classe} onChange={handleInputChange} required disabled={!formData.curriculum} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed">
                        <option value="">{formData.curriculum ? 'Seleziona la classe' : 'Prima seleziona il percorso di studi'}</option>
                        {getAvailableClasses().map((classe) => (
                          <option key={classe} value={classe}>{classe}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Materie di Interesse
                        {formData.curriculum && formData.classe && (
                          <span className="text-blue-600 ml-2">(specifiche per il tuo percorso)</span>
                        )}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {getAvailableSubjects().map((subject) => (
                          <label key={subject.id} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                            <input type="checkbox" checked={formData.materie.includes(subject.id)} onChange={() => handleSubjectChange(subject.id)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{subject.icon} {subject.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button onClick={prevStep} type="button" className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">← Indietro</button>
                      <button onClick={nextStep} type="button" className="w-2/3 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">Prossimo →</button>
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Perché vuoi partecipare alla Beta? *</label>
                      <textarea name="motivazione" value={formData.motivazione} onChange={handleInputChange} required rows={4} placeholder="Raccontaci brevemente le tue aspettative e le difficoltà che stai affrontando..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
                    </div>
                    {error && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}
                    <div className="flex gap-4 mt-6">
                      <button onClick={prevStep} type="button" className="w-1/3 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors">← Indietro</button>
                      <button type="submit" disabled={isSubmitting} className="w-2/3 bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                        {isSubmitting ? 'Invio...' : 'Richiedi Accesso'}
                      </button>
                    </div>
                  </section>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-6">
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
            
            <div className="perspective-container">
              <div className="card-oblique glowing-border bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Posti Limitati</h3>
                <p className="text-sm text-gray-700 mb-3">Solo {totalPlaces} posti disponibili per la Beta. Già {usedPlaces} richieste ricevute!</p>
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
