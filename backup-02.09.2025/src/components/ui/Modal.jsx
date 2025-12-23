'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModalScroll } from '@/utils/useModalScroll';

export default function Modal({ isOpen, onClose, children, title }) {
  const modalRef = useRef(null);

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

  // Click outside per chiudere
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevenzione scroll del modal
  const handleModalScroll = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  // Usa React Portal per renderizzare il modal fuori dal DOM normale
  return createPortal(
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale border border-gray-100"
        onClick={(e) => e.stopPropagation()}
        onScroll={handleModalScroll}
      >
        {/* Header con gradiente */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-primary to-purple-600 rounded-t-3xl">
          <h3 id="modal-title" className="text-xl font-bold text-white pr-4">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-200 flex-shrink-0"
            aria-label="Chiudi modale"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content con stile coerente */}
        <div 
          className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-gray-50 to-white"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
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
}
