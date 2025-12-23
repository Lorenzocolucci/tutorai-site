'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getLanguageFromPath, getMappedRoute } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('it');
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize language on mount and sync when URL changes directly
  useEffect(() => {
    const langFromPath = getLanguageFromPath(pathname);
    
    // Update local state to match URL
    setCurrentLanguage(langFromPath);
    
    // Only change i18n if we're initializing or if there's a mismatch
    // (e.g., user navigated directly via URL)
    if (i18n.language !== langFromPath) {
      i18n.changeLanguage(langFromPath);
    }
  }, [pathname, i18n]);

  const languages = [
    {
      code: 'it',
      name: 'IT',
      fullName: 'Italiano'
    },
    {
      code: 'en', 
      name: 'EN',
      fullName: 'English'
    }
  ];

  const handleLanguageChange = (newLang) => {
    if (newLang === currentLanguage) return;

    // Get clean route without any language prefix
    let cleanRoute = pathname.replace(/^\//, ''); // Remove leading slash
    
    // Remove language prefix if present
    if (cleanRoute.startsWith('en/')) {
      cleanRoute = cleanRoute.replace('en/', '');
    } else if (cleanRoute === 'en') {
      cleanRoute = ''; // Homepage case
    }
    
    // Handle homepage case
    if (!cleanRoute) {
      cleanRoute = '';
    }

    // Map route to new language
    const mappedRoute = getMappedRoute(cleanRoute, currentLanguage, newLang);
    
    // Build new path
    let newPath;
    if (newLang === 'en') {
      newPath = mappedRoute ? `/en/${mappedRoute}` : '/en';
    } else {
      newPath = mappedRoute ? `/${mappedRoute}` : '/';
    }

    // SOLUTION 1: Change language FIRST, then navigate
    // This prevents race condition where components render with old language
    
    setIsOpen(false);
    
    // 1. Change i18n language immediately
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
    
    // 2. Then navigate (components will render with correct language)
    router.push(newPath);
  };

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      {/* Language Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-primary transition-all duration-200 hover:bg-gray-50"
        aria-label="Switch language"
      >
        {/* Globe Icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span className="text-sm font-medium">
          {currentLangData?.name}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  currentLanguage === lang.code 
                    ? 'bg-primary/5 text-primary' 
                    : 'text-gray-700'
                }`}
                disabled={currentLanguage === lang.code}
              >
                <span className="text-sm font-medium">{lang.fullName}</span>
                {currentLanguage === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;