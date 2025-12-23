'use client';

import { useEffect } from 'react';

export const useModalScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      // Salva la posizione di scroll corrente
      const scrollY = window.pageYOffset;
      
      // Applica lo scroll lock mantenendo la posizione visiva
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('modal-open');
      
      // Cleanup function - ripristina la posizione esatta
      return () => {
        // Disattiva temporaneamente scroll-behavior per ripristino istantaneo
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Ripristina la posizione di scroll originale ISTANTANEAMENTE
        window.scrollTo(0, scrollY);
        
        // Ripristina scroll-behavior originale dopo un frame
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = originalScrollBehavior;
        });
      };
    }
  }, [isOpen]);
};