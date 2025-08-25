'use client';

import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()} // Impedisce la chiusura cliccando dentro il modal
      >
        {/* Header con gradiente e stile migliorato */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
              aria-label="Chiudi modale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          {/* Elemento decorativo */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Contenuto con scroll se necessario */}
        <div className="p-6 md:p-8 text-text-secondary leading-relaxed max-h-[calc(90vh-120px)] overflow-y-auto">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
        
        {/* Footer con bottone di chiusura */}
        <div className="border-t border-gray-100 p-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Chiudi
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-scale {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.4s forwards cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Stili per la scrollbar personalizzata */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default Modal;
