// src/app/en/beta-access/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// FIREBASE IMPORTS
import { db } from '@/utils/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Complete data for dropdowns
const curriculaData = {
  uk: [
    { value: 'gcse', label: 'GCSE', classes: ['Year 10', 'Year 11'] },
    { value: 'a-levels', label: 'A-Levels', classes: ['AS Level', 'A Level'] },
    { value: 'igcse', label: 'IGCSE', classes: ['Year 10', 'Year 11'] },
    { value: 'ib-diploma', label: 'IB Diploma Programme', classes: ['Year 1', 'Year 2'] },
    { value: 'ib-myp', label: 'IB Middle Years Programme', classes: ['Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'] },
    { value: 'primary-school', label: 'Primary School', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'] },
    { value: 'secondary-school', label: 'Secondary School', classes: ['Year 7', 'Year 8', 'Year 9'] }
  ],
  international: [
    { value: 'american-high-school', label: 'American High School', classes: ['Freshman', 'Sophomore', 'Junior', 'Senior'] },
    { value: 'ap-courses', label: 'AP Courses', classes: ['Grade 11', 'Grade 12'] },
    { value: 'french-bac', label: 'French Baccalauréat', classes: ['Seconde', 'Première', 'Terminale'] },
    { value: 'german-abitur', label: 'German Abitur', classes: ['Grade 11', 'Grade 12', 'Grade 13'] },
    { value: 'italian-system', label: 'Italian System', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] },
    { value: 'other-international', label: 'Other International System', classes: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] }
  ]
};

// Simplified subjects by curriculum
const subjectsByCurriculum = {
  'gcse': {
    'Year 10': [
      { id: 'english', name: 'English Language', icon: '📚' },
      { id: 'english-lit', name: 'English Literature', icon: '📖' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'science', name: 'Science (Combined)', icon: '🔬' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'french', name: 'French', icon: '🇫🇷' },
      { id: 'spanish', name: 'Spanish', icon: '🇪🇸' },
      { id: 'art', name: 'Art & Design', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'pe', name: 'Physical Education', icon: '⚽' },
      { id: 'business', name: 'Business Studies', icon: '💼' },
      { id: 'computer-science', name: 'Computer Science', icon: '💻' }
    ]
  },
  'a-levels': {
    'AS Level': [
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'further-maths', name: 'Further Mathematics', icon: '📊' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'english-lit', name: 'English Literature', icon: '📖' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'economics', name: 'Economics', icon: '📈' },
      { id: 'business', name: 'Business Studies', icon: '💼' },
      { id: 'computer-science', name: 'Computer Science', icon: '💻' },
      { id: 'psychology', name: 'Psychology', icon: '🧠' },
      { id: 'art', name: 'Art & Design', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'french', name: 'French', icon: '🇫🇷' },
      { id: 'spanish', name: 'Spanish', icon: '🇪🇸' }
    ]
  },
  'ib-diploma': {
    'Year 1': [
      { id: 'english', name: 'English A', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'physics', name: 'Physics', icon: '⚡' },
      { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
      { id: 'biology', name: 'Biology', icon: '🧬' },
      { id: 'history', name: 'History', icon: '🏛️' },
      { id: 'geography', name: 'Geography', icon: '🌍' },
      { id: 'economics', name: 'Economics', icon: '📈' },
      { id: 'business', name: 'Business Management', icon: '💼' },
      { id: 'computer-science', name: 'Computer Science', icon: '💻' },
      { id: 'psychology', name: 'Psychology', icon: '🧠' },
      { id: 'art', name: 'Visual Arts', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' },
      { id: 'french', name: 'French B', icon: '🇫🇷' },
      { id: 'spanish', name: 'Spanish B', icon: '🇪🇸' }
    ]
  },
  'american-high-school': {
    'Freshman': [
      { id: 'english', name: 'English', icon: '📚' },
      { id: 'mathematics', name: 'Mathematics', icon: '📐' },
      { id: 'science', name: 'Science', icon: '🔬' },
      { id: 'social-studies', name: 'Social Studies', icon: '🏛️' },
      { id: 'foreign-language', name: 'Foreign Language', icon: '🌍' },
      { id: 'physical-education', name: 'Physical Education', icon: '⚽' },
      { id: 'art', name: 'Art', icon: '🎨' },
      { id: 'music', name: 'Music', icon: '🎵' }
    ]
  }
};

const BetaAccessPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    country: '',
    city: '',
    school: '',
    curriculumType: '',
    curriculum: '',
    class: '',
    subjects: [],
    parentEmail: '',
    parentConsent: false,
    marketingConsent: false,
    howDidYouHear: '',
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update classes when curriculum changes
  useEffect(() => {
    if (formData.curriculum) {
      const curriculumGroup = formData.curriculumType === 'uk' ? curriculaData.uk : curriculaData.international;
      const selectedCurriculum = curriculumGroup.find(c => c.value === formData.curriculum);
      setAvailableClasses(selectedCurriculum ? selectedCurriculum.classes : []);
      setFormData(prev => ({ ...prev, class: '', subjects: [] }));
    }
  }, [formData.curriculum]);

  // Update subjects when class changes
  useEffect(() => {
    if (formData.curriculum && formData.class) {
      const curriculumSubjects = subjectsByCurriculum[formData.curriculum];
      if (curriculumSubjects && curriculumSubjects[formData.class]) {
        setAvailableSubjects(curriculumSubjects[formData.class]);
      } else {
        // Default subjects for curricula not specifically defined
        setAvailableSubjects([
          { id: 'mathematics', name: 'Mathematics', icon: '📐' },
          { id: 'english', name: 'English', icon: '📚' },
          { id: 'science', name: 'Science', icon: '🔬' },
          { id: 'history', name: 'History', icon: '🏛️' },
          { id: 'geography', name: 'Geography', icon: '🌍' },
          { id: 'art', name: 'Art', icon: '🎨' },
          { id: 'music', name: 'Music', icon: '🎵' },
          { id: 'pe', name: 'Physical Education', icon: '⚽' }
        ]);
      }
      setFormData(prev => ({ ...prev, subjects: [] }));
    }
  }, [formData.class]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubjectToggle = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(s => s !== subjectId)
        : [...prev.subjects, subjectId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a document in Firestore
      const docRef = doc(db, 'beta-requests', `${Date.now()}-${formData.email}`);
      
      await setDoc(docRef, {
        ...formData,
        timestamp: serverTimestamp(),
        language: 'en',
        source: 'website-en'
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.age;
      case 2:
        return formData.country && formData.city && formData.school;
      case 3:
        return formData.curriculumType && formData.curriculum && formData.class && formData.subjects.length > 0;
      case 4:
        return (parseInt(formData.age) >= 18 || formData.parentEmail) && formData.howDidYouHear;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to TutorAI Beta!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for joining our beta program! We'll be in touch soon with next steps.
          </p>
          <Link href="/en" className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-dark hover:to-purple-700 transition-all inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Join TutorAI Beta
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Be among the first to experience personalized AI tutoring. Join our exclusive beta program.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all ${
                  currentStep >= step 
                    ? 'bg-primary text-white' 
                    : isStepComplete(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {isStepComplete(step) && currentStep > step ? '✓' : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="5"
                    max="25"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your age"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location & School */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & School</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select country</option>
                      <option value="uk">United Kingdom</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="ie">Ireland</option>
                      <option value="nz">New Zealand</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">School Name *</label>
                  <input
                    type="text"
                    name="school"
                    required
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Name of your school"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Academic Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Information</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Curriculum Type *</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, curriculumType: 'uk', curriculum: '', class: '', subjects: [] }))}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.curriculumType === 'uk' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🇬🇧</div>
                      <div className="font-semibold text-gray-900">UK System</div>
                      <div className="text-sm text-gray-600">GCSE, A-Levels, IGCSE</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, curriculumType: 'international', curriculum: '', class: '', subjects: [] }))}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.curriculumType === 'international' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-semibold text-gray-900">International</div>
                      <div className="text-sm text-gray-600">IB, American, French, etc.</div>
                    </button>
                  </div>
                </div>

                {formData.curriculumType && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Curriculum *</label>
                    <select
                      name="curriculum"
                      required
                      value={formData.curriculum}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select curriculum</option>
                      {(formData.curriculumType === 'uk' ? curriculaData.uk : curriculaData.international).map(curr => (
                        <option key={curr.value} value={curr.value}>{curr.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {availableClasses.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year/Grade *</label>
                    <select
                      name="class"
                      required
                      value={formData.class}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select year/grade</option>
                      {availableClasses.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                )}

                {availableSubjects.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Subjects You Need Help With * (Select at least 1)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableSubjects.map(subject => (
                        <button
                          key={subject.id}
                          type="button"
                          onClick={() => handleSubjectToggle(subject.id)}
                          className={`p-3 border-2 rounded-lg text-sm transition-all ${
                            formData.subjects.includes(subject.id)
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-lg mb-1">{subject.icon}</div>
                          <div className="font-medium">{subject.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Final Details</h2>
                
                {parseInt(formData.age) < 18 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parent/Guardian Email *</label>
                    <input
                      type="email"
                      name="parentEmail"
                      required={parseInt(formData.age) < 18}
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="parent@email.com"
                    />
                    <p className="text-sm text-gray-600 mt-1">Required for students under 18</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How did you hear about TutorAI? *</label>
                  <select
                    name="howDidYouHear"
                    required
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Please select</option>
                    <option value="google">Google Search</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend/Family Recommendation</option>
                    <option value="teacher">Teacher/School</option>
                    <option value="blog">Blog/Article</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your learning goals or any specific subjects you're struggling with..."
                  />
                </div>

                <div className="space-y-4">
                  {parseInt(formData.age) < 18 && (
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="parentConsent"
                        checked={formData.parentConsent}
                        onChange={handleInputChange}
                        className="mr-3 mt-1"
                        required={parseInt(formData.age) < 18}
                      />
                      <span className="text-sm text-gray-700">
                        I confirm that I have parental/guardian consent to join the TutorAI beta program. *
                      </span>
                    </label>
                  )}
                  
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="marketingConsent"
                      checked={formData.marketingConsent}
                      onChange={handleInputChange}
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I would like to receive updates about TutorAI and educational content via email.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              
              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete(currentStep)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isStepComplete(currentStep)
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepComplete(4) || isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                      isStepComplete(4) && !isSubmitting
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary-dark hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
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