'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('common');

  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const langPrefix = currentLang === 'en' ? '/en' : '';
  
  const navLinks = [
    { name: t('header.nav.features', 'Features'), href: `${langPrefix}/#features` },
    { name: t('header.nav.curricula', 'Curricula'), href: `${langPrefix}/#curricula` },
    { name: t('header.nav.testimonials', 'Testimonianze'), href: `${langPrefix}${currentLang === 'en' ? '/testimonials' : '/testimonianze'}` },
    { name: t('header.nav.blog', 'Blog'), href: `${langPrefix}/#blog` },
    { name: t('header.nav.about', 'Chi Siamo'), href: `${langPrefix}${currentLang === 'en' ? '/about-us' : '/chi-siamo'}` },
    { name: t('header.nav.faq', 'FAQ'), href: `${langPrefix}/faq` },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl min-h-[64px]">
        <Link href="/" className="text-2xl font-bold text-text-primary flex items-center gap-2 py-4">
          <span role="img" aria-label="cervello">🧠</span>
          <span>TutorAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-text-secondary hover:text-primary transition-colors font-medium inline-flex items-center py-4 leading-none"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 py-4">
          <LanguageSwitcher />
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <Button href={`${langPrefix}/beta-login`} variant="outline" className="text-sm py-2">
            {t('header.cta.login', 'Login')}
          </Button>
          <Button href={`${langPrefix}/beta-access`} className="text-sm py-2">
            {t('header.cta.betaAccess', 'Richiedi Accesso Beta')}
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2 py-4">
          <LanguageSwitcher />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary p-2 inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 py-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-2xl text-text-primary" onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4 w-4/5 items-center">
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