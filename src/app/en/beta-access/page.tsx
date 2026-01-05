// src/app/en/beta-access/page.tsx
// ALIGNED WITH TUTORAI BACKEND - EXACT 34 SUBJECTS FROM /api/subjects
// USES SUPABASE (NOT FIREBASE)

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { BACKEND_API_URL } from '@/lib/supabase';

// ═══════════════════════════════════════════════════════════════════════════
// SUPPORTED CURRICULA (4 curricula)
// ═══════════════════════════════════════════════════════════════════════════
const curriculaData = {
  international: [
    { value: 'igcse', label: 'IGCSE', classes: ['Year 10', 'Year 11'] },
    { value: 'ib-diploma', label: 'IB Diploma Programme (DP)', classes: ['Year 1', 'Year 2'] },
    { value: 'ib-myp', label: 'IB Middle Years Programme (MYP)', classes: ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'] },
  ],
  italian: [
    { value: 'liceo-scientifico', label: 'Liceo Scientifico', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] },
    { value: 'liceo-classico', label: 'Liceo Classico', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] },
  ]
};

// ═══════════════════════════════════════════════════════════════════════════
// EXACT SUBJECTS FROM /api/subjects - BACKEND SOURCE OF TRUTH
// ITALIAN LICEI: 8 | IGCSE: 5 | IB DP: 14 | IB MYP: 7 = 34 TOTAL
// ═══════════════════════════════════════════════════════════════════════════
const subjectsByCurriculum = {
  // IGCSE (5 exact subjects)
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
  // IB Diploma Programme (14 exact subjects)
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
  // IB MYP (7 exact subjects)
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
  // Italian Liceo Scientifico (7 subjects - NO greco)
  'liceo-scientifico': {
    'Year 1': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 2': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 3': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Italian Literature', icon: '📚' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 4': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Italian Literature', icon: '📚' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 5': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Italian Literature', icon: '📚' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
  },
  // Italian Liceo Classico (8 subjects - WITH greco)
  'liceo-classico': {
    'Year 1': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'greco', name: 'Greek', icon: '🏺' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 2': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'greco', name: 'Greek', icon: '🏺' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 3': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Italian Literature', icon: '📚' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'greco', name: 'Greek', icon: '🏺' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 4': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Italian Literature', icon: '📚' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'greco', name: 'Greek', icon: '🏺' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
    'Year 5': [
      { id: 'matematica', name: 'Mathematics', icon: '➗' },
      { id: 'italiano', name: 'Italian', icon: '📖' },
      { id: 'italiano_letteratura', name: 'Italian Literature', icon: '📚' },
      { id: 'inglese', name: 'English', icon: '🇬🇧' },
      { id: 'latino', name: 'Latin', icon: '🏛️' },
      { id: 'greco', name: 'Greek', icon: '🏺' },
      { id: 'fisica', name: 'Physics', icon: '⚡' },
      { id: 'chimica', name: 'Chemistry', icon: '🧪' },
    ],
  },
};

// Default subjects for IGCSE
const defaultSubjects = [
  { id: 'mathematics_igcse', name: 'Mathematics', icon: '🔢' },
  { id: 'physics_igcse', name: 'Physics', icon: '⚛️' },
  { id: 'chemistry_igcse', name: 'Chemistry', icon: '🧪' },
  { id: 'biology_igcse', name: 'Biology', icon: '🧬' },
  { id: 'computer_science_igcse', name: 'Computer Science', icon: '💻' },
];

const mapCurriculumToWaitlist = (curriculum: string): 'Italian_Licei' | 'IGCSE' | 'IB_DP' | 'IB_MYP' => {
  if (!curriculum) return 'IGCSE';
  
  const normalized = curriculum.toLowerCase();
  
  if (normalized.includes('igcse')) return 'IGCSE';
  if (normalized.includes('ib-diploma') || normalized.includes('ib_dp')) return 'IB_DP';
  if (normalized.includes('ib-myp') || normalized.includes('ib_myp')) return 'IB_MYP';
  if (normalized.includes('liceo')) return 'Italian_Licei';
  
  return 'IGCSE';
};

const BetaAccessPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    curriculumType: '',
    curriculum: '',
    class: '',
    subjects: [] as string[],
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<typeof defaultSubjects>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingUserInfo, setExistingUserInfo] = useState<{
    status: string;
    message: string;
    action: string;
    login_url?: string;
  } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (formData.curriculum) {
      const curriculumGroup = formData.curriculumType === 'international' ? curriculaData.international : curriculaData.italian;
      const selectedCurriculum = curriculumGroup.find(c => c.value === formData.curriculum);
      setAvailableClasses(selectedCurriculum ? selectedCurriculum.classes : []);
      setFormData(prev => ({ ...prev, class: '', subjects: [] }));
    }
  }, [formData.curriculum, formData.curriculumType]);

  useEffect(() => {
    if (formData.curriculum && formData.class) {
      const curriculumSubjects = subjectsByCurriculum[formData.curriculum as keyof typeof subjectsByCurriculum];
      if (curriculumSubjects && curriculumSubjects[formData.class as keyof typeof curriculumSubjects]) {
        setAvailableSubjects(curriculumSubjects[formData.class as keyof typeof curriculumSubjects]);
      } else {
        setAvailableSubjects(defaultSubjects);
      }
      setFormData(prev => ({ ...prev, subjects: [] }));
    }
  }, [formData.class, formData.curriculum]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subjectId: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(s => s !== subjectId)
        : [...prev.subjects, subjectId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.curriculum || !formData.class || formData.subjects.length === 0) {
      setError('Please fill in all required fields and select at least one subject.');
      setIsSubmitting(false);
      return;
    }

    try {
      const normalizedCurriculum = mapCurriculumToWaitlist(formData.curriculum);
      const noteSections = [
        formData.additionalInfo?.trim(),
        `Curriculum type: ${formData.curriculumType}`,
        `Curriculum: ${formData.curriculum || 'n/a'}`,
        `Year: ${formData.class || 'n/a'}`
      ].filter(Boolean);

      const response = await fetch(`${BACKEND_API_URL}/api/waitlist/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          curriculum: normalizedCurriculum,
          classe: formData.class,
          materie: formData.subjects,
          submittedBy: 'student',
          notes: noteSections.length > 0 ? noteSections.join('\n') : null,
          language: 'en'
        })
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.detail || 'Unknown error');
      }

      const payload = await response.json();

      if (payload?.already_exists) {
        // Show custom UI for existing users instead of error
        setExistingUserInfo({
          status: payload.status || 'pending',
          message: payload.message || 'You are already on the waiting list!',
          action: payload.action || 'wait',
          login_url: payload.login_url
        });
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Error submitting to waitlist:', err);
      setError('An error occurred while submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: return formData.firstName && formData.lastName && formData.email;
      case 2: return formData.curriculumType && formData.curriculum && formData.class && formData.subjects.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  // Show appropriate UI for existing users
  if (existingUserInfo) {
    const isLoginAction = existingUserInfo.action === 'login';
    const statusConfig: Record<string, { icon: string; title: string; bg: string; border: string }> = {
      invited: { icon: '🎫', title: 'You Have an Invite!', bg: 'bg-green-50', border: 'border-green-200' },
      invited_expired: { icon: '⏰', title: 'Code Expired', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      registered: { icon: '✅', title: 'Welcome Back!', bg: 'bg-blue-50', border: 'border-blue-200' },
      pending: { icon: '⏳', title: 'You\'re on the List!', bg: 'bg-purple-50', border: 'border-purple-200' }
    };
    const config = statusConfig[existingUserInfo.status] || statusConfig.pending;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className={`${config.bg} border-2 ${config.border} rounded-3xl shadow-2xl p-8 max-w-md text-center`}>
          <div className="text-6xl mb-6">{config.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{config.title}</h1>
          <p className="text-gray-700 mb-6 text-lg">{existingUserInfo.message}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isLoginAction && existingUserInfo.login_url && (
              <a href={existingUserInfo.login_url} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2">
                🚀 Go to Login
              </a>
            )}
            <Link href="/en" className={`${isLoginAction ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'} px-6 py-3 rounded-xl font-semibold transition-colors`}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to TutorAI Beta!</h1>
          <p className="text-gray-600 mb-8">Thank you for joining our beta program! We'll be in touch soon with next steps.</p>
          <Link href="/en" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/en" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join TutorAI Beta</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Be among the first to experience personalized AI tutoring.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all ${
                  currentStep >= step ? 'bg-blue-600 text-white' : isStepComplete(step) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {isStepComplete(step) && currentStep > step ? '✓' : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your last name" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Information</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Education System *</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, curriculumType: 'international', curriculum: '', class: '', subjects: [] }))} className={`p-4 border-2 rounded-lg text-left transition-all ${formData.curriculumType === 'international' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-semibold text-gray-900">International</div>
                      <div className="text-sm text-gray-600">IGCSE, IB DP, IB MYP</div>
                    </button>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, curriculumType: 'italian', curriculum: '', class: '', subjects: [] }))} className={`p-4 border-2 rounded-lg text-left transition-all ${formData.curriculumType === 'italian' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="text-2xl mb-2">🇮🇹</div>
                      <div className="font-semibold text-gray-900">Italian</div>
                      <div className="text-sm text-gray-600">Liceo Scientifico, Classico</div>
                    </button>
                  </div>
                </div>

                {formData.curriculumType && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Curriculum *</label>
                    <select name="curriculum" required value={formData.curriculum} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select curriculum</option>
                      {(formData.curriculumType === 'international' ? curriculaData.international : curriculaData.italian).map(curr => (
                        <option key={curr.value} value={curr.value}>{curr.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {availableClasses.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year *</label>
                    <select name="class" required value={formData.class} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select year</option>
                      {availableClasses.map(cls => (<option key={cls} value={cls}>{cls}</option>))}
                    </select>
                  </div>
                )}

                {availableSubjects.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Subjects You Need Help With * (Select at least 1)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableSubjects.map(subject => (
                        <button key={subject.id} type="button" onClick={() => handleSubjectToggle(subject.id)} className={`p-3 border-2 rounded-lg text-sm transition-all ${formData.subjects.includes(subject.id) ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                          <div className="text-lg mb-1">{subject.icon}</div>
                          <div className="font-medium">{subject.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Almost There!</h2>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tell us about your learning goals (optional)</label>
                  <textarea name="additionalInfo" rows={4} value={formData.additionalInfo} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Tell us about your learning goals..." />
                </div>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
              )}
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button type="button" onClick={nextStep} disabled={!isStepComplete(currentStep)} className={`px-6 py-3 rounded-lg font-semibold transition-colors ${isStepComplete(currentStep) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Next</button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className={`px-8 py-3 rounded-lg font-semibold transition-all ${!isSubmitting ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    {isSubmitting ? 'Submitting...' : 'Join Beta Program'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BetaAccessPage;
