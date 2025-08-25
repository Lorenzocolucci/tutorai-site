'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-lift z-50">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. 
            Continuando a navigare, accetti il nostro utilizzo dei cookie.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={rejectCookies}
            className="px-4 py-2 text-sm border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Rifiuta
          </button>
          <button 
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
