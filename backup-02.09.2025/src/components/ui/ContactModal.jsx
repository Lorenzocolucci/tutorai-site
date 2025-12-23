'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useModalScroll } from '@/utils/useModalScroll';

const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const { t, i18n } = useTranslation('common');

  // Usa il hook sicuro per la gestione dello scroll
  useModalScroll(isOpen);

  // Gestione focus per accessibilità
  useEffect(() => {
    if (isOpen) {
      // Focus trap per accessibilità
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  // Gestione ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleEmailClick = () => {
    const currentLang = i18n?.language || 'it';
    const subject = currentLang === 'en' 
      ? 'TutorAI Information Request'
      : 'Richiesta Informazioni TutorAI';
    window.location.href = `mailto:info@mytutorai.app?subject=${encodeURIComponent(subject)}`;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-primary to-purple-600 rounded-t-3xl">
          <h3 id="contact-modal-title" className="text-2xl font-bold text-white">{t('contact.modal.title', 'Contattaci')}</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/20"
            aria-label={t('contact.modal.close', 'Chiudi modale')}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content con stile coerente */}
        <div className="p-6 text-center flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mb-2">{t('contact.modal.emailTitle', 'Scrivici una email')}</h4>
          <p className="text-gray-600 mb-6">
            {t('contact.modal.emailDescription', 'Hai domande su TutorAI? Siamo qui per aiutarti! Clicca qui sotto per inviarci una email.')}
          </p>

          <button
            onClick={handleEmailClick}
            className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200 w-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('contact.modal.sendEmail', 'Invia Email')}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-scale {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        .animate-fade-in-scale { 
          animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); 
        }
        
        @media (max-width: 768px) {
          .animate-fade-in-scale {
            animation: fade-in-scale 0.2s forwards cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default ContactModal;
