'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import ContactModal from '@/components/ui/ContactModal';

const Footer = () => {
  const { t, i18n } = useTranslation('pages');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const langPrefix = currentLang === 'en' ? '/en' : '';

  const handleContactClick = (e) => {
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e descrizione */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">TutorAI</h3>
              <p className="text-slate-300 mb-6 max-w-md">
                {t('footer.description', 'Il primo tutor intelligente che si adatta al tuo stile cognitivo. Trasforma il modo di imparare con l\'intelligenza artificiale.')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Link rapidi */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t('footer.quickLinks.title', 'Link Rapidi')}
              </h4>
              <ul className="space-y-2">
                <li><Link href={`${langPrefix}/`} className="text-slate-300 hover:text-white transition-colors">{t('footer.quickLinks.home', 'Home')}</Link></li>
                <li><Link href={`${langPrefix}${currentLang === 'en' ? '/about-us' : '/chi-siamo'}`} className="text-slate-300 hover:text-white transition-colors">{t('footer.quickLinks.about', 'Chi Siamo')}</Link></li>
                <li><Link href={`${langPrefix}/blog`} className="text-slate-300 hover:text-white transition-colors">{t('footer.quickLinks.blog', 'Blog')}</Link></li>
                <li><Link href={`${langPrefix}/faq`} className="text-slate-300 hover:text-white transition-colors">{t('footer.quickLinks.faq', 'FAQ')}</Link></li>
              </ul>
            </div>

            {/* Contatti */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t('footer.contact.title', 'Contatti')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={handleContactClick}
                    className="text-slate-300 hover:text-white transition-colors text-left"
                  >
                    {t('footer.contact.writeUs', '📧 Scrivici')}
                  </button>
                </li>
                <li className="text-slate-300">{t('footer.contact.email', 'info@mytutorai.app')}</li>
                <li className="text-slate-300">{t('footer.contact.support', 'Supporto 24/7')}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              {t('footer.copyright', '© 2025 TutorAI. Tutti i diritti riservati.')} | 
              <Link href={`${langPrefix}/privacy`} className="ml-2 hover:text-white transition-colors">{t('footer.privacy', 'Privacy')}</Link> | 
              <Link href={`${langPrefix}/terms`} className="ml-2 hover:text-white transition-colors">{t('footer.terms', 'Termini')}</Link>
            </p>
          </div>
        </div>
      </footer>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Footer;
