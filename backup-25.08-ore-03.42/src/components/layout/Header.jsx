'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // STRUTTURA LINK AGGIORNATA
  const navLinks = [
    { name: 'Features', href: '/#features' }, // Link interno alla home
    { name: 'Curricula', href: '/#curricula' }, // Link interno alla home
    { name: 'Blog', href: '/#blog' }, // Link interno alla home
    { name: 'Chi Siamo', href: '/chi-siamo' }, // Link a pagina dedicata
    { name: 'FAQ', href: '/faq' }, // Link a pagina dedicata
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <span role="img" aria-label="cervello">🧠</span>
          <span>TutorAI</span>
        </Link>

        {/* Navigazione Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-text-secondary hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button href="/beta-login" variant="outline">Login</Button>
          <Button href="/beta-access">Richiedi Accesso Beta</Button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Overlay Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 py-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-2xl text-text-primary" onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4 w-4/5">
            <Button href="/beta-login" variant="outline">Login</Button>
            <Button href="/beta-access">Richiedi Accesso Beta</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
