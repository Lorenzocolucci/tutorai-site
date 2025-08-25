'use client';

import { useEffect } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@mytutorai.app?subject=Richiesta Informazioni TutorAI';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-text-primary">Contattaci</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors" aria-label="Chiudi modale">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          
          <h4 className="text-xl font-semibold text-text-primary mb-2">Scrivici una email</h4>
          <p className="text-text-secondary mb-6">
            Hai domande su TutorAI? Siamo qui per aiutarti! 
            Clicca qui sotto per inviarci una email.
          </p>
          
          <button
            onClick={handleEmailClick}
            className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            📧 Invia Email a info@mytutorai.app
          </button>
          
          <p className="text-sm text-text-secondary mt-4">
            Ti risponderemo entro 24 ore
          </p>
        </div>
        
        <style jsx>{`
          @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default ContactModal;
