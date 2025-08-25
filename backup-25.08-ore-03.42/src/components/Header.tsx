'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header({ locale='it' }:{locale?:'it'|'en'}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-100">
      <div className="container h-16 flex items-center justify-between">
        <Link href={locale==='it'?'/':'/en'} className="font-bold text-lg">TutorAI</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#curricula" className="hover:underline">Curricula</a>
          <a href="#roi" className="hover:underline">ROI</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <Link href={locale==='it'?'/en':'/'} className="px-3 py-1 rounded-lg border">{locale==='it'?'EN':'IT'}</Link>
          <button className="btn-ghost">Login</button>
          <a href="#waitlist" className="btn-primary">Partecipa alla Beta</a>
        </nav>
        <button className="md:hidden px-3 py-2 border rounded-lg" onClick={()=>setOpen(true)} aria-label="Apri menu">☰</button>
      </div>
      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden" onClick={()=>setOpen(false)}>
          <div className="absolute inset-x-4 top-4 rounded-2xl bg-white p-6 shadow-lift" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">TutorAI</span>
              <button onClick={()=>setOpen(false)} aria-label="Chiudi">✕</button>
            </div>
            <div className="grid gap-3 text-lg">
              <a onClick={()=>setOpen(false)} href="#features">Features</a>
              <a onClick={()=>setOpen(false)} href="#curricula">Curricula</a>
              <a onClick={()=>setOpen(false)} href="#roi">ROI</a>
              <a onClick={()=>setOpen(false)} href="#testimonials">Testimonials</a>
              <a onClick={()=>setOpen(false)} href="#faq">FAQ</a>
              <a onClick={()=>setOpen(false)} href="#pricing">Pricing</a>
              <Link href={locale==='it'?'/en':'/'} className="px-3 py-1 rounded-lg border w-max">{locale==='it'?'EN':'IT'}</Link>
              <button className="btn-ghost w-full">Login</button>
              <a href="#waitlist" className="btn-primary w-full">Partecipa alla Beta</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
