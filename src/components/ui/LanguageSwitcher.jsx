'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getLanguageFromPath, getMappedRoute } from '@/lib/i18n';

// Helper function to check if a route exists
const isValidRoute = (route, language) => {
  // Define valid routes for each language
  const validRoutes = {
    it: [
      'chi-siamo',
      'testimonianze', 
      'contatti',
      'privacy',
      'terms',
      'faq',
      'blog',
      'come-funziona',
      'beta-access',
      'beta-login',
      'beta-dashboard'
    ],
    en: [
      'about-us',
      'testimonials',
      'contact',
      'privacy',
      'terms',
      'faq',
      'blog',
      'how-it-works',
      'beta-access',
      'beta-login',
      'beta-dashboard'
    ]
  };
  
  return validRoutes[language]?.includes(route) || false;
};

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('it');
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize language on mount and sync when URL changes directly
  useEffect(() => {
    const langFromPath = getLanguageFromPath(pathname);
    
    console.log('🌍 useEffect language detection:', {
      pathname,
      langFromPath,
      currentI18nLang: i18n.language,
      currentStateLanguage: currentLanguage
    });
    
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

    console.log('🔍 Language change initiated:', {
      pathname,
      currentLanguage,
      newLang
    });

    setIsOpen(false);
    
    // Change i18n language immediately
    i18n.changeLanguage(newLang);
    setCurrentLanguage(newLang);
    
    // Get current route without language prefix and trailing slash
    let currentRoute = pathname;
    
    // Remove language prefix if present
    if (currentRoute.startsWith('/en/')) {
      currentRoute = currentRoute.substring(4); // Remove '/en/'
    } else if (currentRoute.startsWith('/it/')) {
      currentRoute = currentRoute.substring(4); // Remove '/it/'
    } else if (currentRoute === '/en') {
      currentRoute = '';
    } else if (currentRoute === '/it') {
      currentRoute = '';
    }
    
    // Remove leading slash and trailing slash
    currentRoute = currentRoute.replace(/^\/+/, '').replace(/\/+$/, '');
    
    console.log('📍 Current route extracted:', {
      originalPathname: pathname,
      extractedRoute: currentRoute
    });
    
    // Get mapped route for the new language
    const mappedRoute = getMappedRoute(currentRoute, currentLanguage, newLang);
    
    // Validate that the mapped route exists
    if (mappedRoute && !isValidRoute(mappedRoute, newLang)) {
      console.warn('⚠️ Mapped route does not exist, redirecting to homepage');
      const fallbackPath = newLang === 'en' ? '/en/' : '/';
      router.push(fallbackPath);
      return;
    }
    
    // Build new path
    let newPath;
    if (newLang === 'en') {
      newPath = mappedRoute ? `/en/${mappedRoute}/` : '/en/';
    } else {
      newPath = mappedRoute ? `/${mappedRoute}/` : '/';
    }
    
    console.log('🚀 Navigating to:', {
      currentRoute,
      mappedRoute,
      newPath
    });
    
    // Use Next.js router for client-side navigation with error handling
    try {
      // Add timeout to prevent hanging
      const navigationTimeout = setTimeout(() => {
        console.warn('⏰ Navigation timeout, using fallback');
        const fallbackPath = newLang === 'en' ? '/en/' : '/';
        router.push(fallbackPath);
      }, 5000); // 5 second timeout
      
      router.push(newPath);
      
      // Clear timeout if navigation succeeds
      setTimeout(() => {
        clearTimeout(navigationTimeout);
      }, 1000);
      
    } catch (error) {
      console.error('❌ Navigation failed:', error);
      
      // Fallback: redirect to homepage in the new language
      const fallbackPath = newLang === 'en' ? '/en/' : '/';
      console.log('🔄 Using fallback path:', fallbackPath);
      router.push(fallbackPath);
    }
  };

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      {/* Language Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-text-secondary hover:text-primary transition-all duration-200 hover:bg-gray-50"
        aria-label={`Cambia lingua - Attualmente: ${currentLangData?.fullName}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
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
          <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden" role="listbox" aria-label="Seleziona lingua">
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
                role="option"
                aria-selected={currentLanguage === lang.code}
                aria-label={`Cambia lingua a ${lang.fullName}`}
              >
                <span className="text-sm font-medium">{lang.fullName}</span>
                {currentLanguage === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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