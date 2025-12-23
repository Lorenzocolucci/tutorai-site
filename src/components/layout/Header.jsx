'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('it');
  const { t, i18n } = useTranslation('common');

  // Update current language when i18n language changes
  useEffect(() => {
    setCurrentLang(i18n.language || 'it');
  }, [i18n.language]);

  // Get current language to build language-aware URLs
  const langPrefix = currentLang === 'en' ? '/en' : '';
  
  const navLinks = [
    { name: t('header.nav.features'), href: `${langPrefix}/#features` },
    { name: t('header.nav.howItWorks'), href: `${langPrefix}${currentLang === 'en' ? '/how-it-works' : '/come-funziona'}` },
    { name: t('header.nav.curricula'), href: `${langPrefix}/#curricula` },
    { name: t('header.nav.testimonials'), href: `${langPrefix}${currentLang === 'en' ? '/testimonials' : '/testimonianze'}` },
    { name: t('header.nav.blog'), href: `${langPrefix}/blog` },
    { name: t('header.nav.about'), href: `${langPrefix}${currentLang === 'en' ? '/about-us' : '/chi-siamo'}` },
    { name: t('header.nav.faq'), href: `${langPrefix}/faq` },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="container mx-auto px-6 max-w-7xl min-h-[64px]">
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center lg:h-full">
          {/* Logo - colonne 1-2 */}
          <div className="col-span-2">
            <Link href="/" className="text-xl font-bold text-text-primary flex items-center gap-2 py-4" aria-label="TutorAI - Torna alla homepage">
              <span role="img" aria-label="cervello">🧠</span>
              <span>TutorAI</span>
            </Link>
          </div>

          {/* Menu di navigazione - colonne 3-8 (centrato) */}
          <nav className="col-span-6 flex items-center justify-center" aria-label="Navigazione principale">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-text-secondary hover:text-primary transition-colors font-medium text-sm py-4 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Pulsanti - colonne 9-12 */}
          <div className="col-span-4 flex items-center justify-end gap-2">
            <LanguageSwitcher />
            <Button href={`${langPrefix}/beta-login`} variant="outline" className="text-xs py-2 px-3">
              {t('header.cta.login', 'Login')}
            </Button>
            <Button href={`${langPrefix}/beta-access`} className="text-xs py-2 px-3">
              {t('header.cta.betaAccess', 'Beta Access')}
            </Button>
          </div>
        </div>

        {/* Layout mobile - flex normale */}
        <div className="flex lg:hidden items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold text-text-primary flex items-center gap-2" aria-label="TutorAI - Torna alla homepage">
            <span role="img" aria-label="cervello">🧠</span>
            <span>TutorAI</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-text-primary p-2"
              aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={isMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 py-8" role="dialog" aria-modal="true" aria-label="Menu di navigazione mobile">
          <nav aria-label="Menu principale">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-2xl text-text-primary" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4 w-4/5 items-center" aria-label="Azioni principali">
            <Button href={`${langPrefix}/beta-login`} variant="outline">
              {t('header.cta.login', 'Login')}
            </Button>
            <Button href={`${langPrefix}/beta-access`}>
              {t('header.cta.betaAccess', 'Richiedi Accesso Beta')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;