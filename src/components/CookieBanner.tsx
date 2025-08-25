'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

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
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 p-4 sm:p-6 z-50 animate-slide-up">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-900 text-center md:text-left">
          <h3 className="font-bold mb-1">Questo sito utilizza i cookie</h3>
          <p>
            Utilizziamo cookie essenziali per il funzionamento del sito e cookie di analisi per migliorare la tua esperienza. 
            Puoi accettarli tutti o rifiutare quelli non essenziali. Per maggiori dettagli, consulta la nostra{' '}
            <Link href="/privacy" className="underline text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>.
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-3">
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Accetta Tutti
          </button>
          <button
            onClick={handleDecline}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors"
          >
            Rifiuta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
