'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

const I18nProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Set HTML lang attribute based on current language
    const updateHtmlLang = () => {
      const currentLang = i18n.language || 'it';
      document.documentElement.lang = currentLang;
    };
    
    // Update lang when language changes
    i18n.on('languageChanged', updateHtmlLang);
    
    // Set initial lang
    updateHtmlLang();
    
    return () => {
      i18n.off('languageChanged', updateHtmlLang);
    };
  }, []);

  // Don't render children until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 mb-4">TutorAI</div>
            <div className="text-gray-600">Caricamento...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;