'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { i18n, t } = useTranslation('common');

  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const langPrefix = currentLang === 'en' ? '/en' : '';

  useEffect(() => {
    // Controlla se il consenso è già stato dato
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Qui imposteresti i cookie di analytics, etc.
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Qui disabiliteresti i cookie non essenziali
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 sm:p-6 z-50 animate-slide-up" role="dialog" aria-modal="true" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-description">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-900 text-center md:text-left">
          <h3 id="cookie-banner-title" className="font-bold mb-1">{t('cookies.title')}</h3>
          <p id="cookie-banner-description">
            {t('cookies.description')}
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-3">
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
            aria-label={t('cookies.acceptAria')}
          >
            {t('cookies.accept')}
          </button>
          <button
            onClick={handleDecline}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors"
            aria-label={t('cookies.declineAria')}
          >
            {t('cookies.decline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
