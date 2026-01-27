# TutorAI-Site Mobile Audit - Evidence Report
**Data:** 27 Gennaio 2026

---

## 0. STRUTTURA PROGETTO

### Directory principale
```
tutorai-site/
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── (site)/    # Landing pages italiane
│   │   ├── en/        # Landing pages inglesi
│   │   ├── beta-access/
│   │   ├── beta-login/
│   │   └── admin/
│   ├── components/    # React components
│   ├── lib/           # Utilities (supabase, seo, i18n)
│   └── styles/        # CSS globale
├── tailwind.config.js
└── package.json
```

### package.json - Dipendenze Chiave
```json
{
  "name": "tutorai-site",
  "dependencies": {
    "next": "14.2.5",
    "react": "18.2.0",
    "@supabase/supabase-js": "^2.78.0",
    "@react-three/fiber": "^8.15.19",  // 🔴 Pesante per mobile
    "@react-three/drei": "^9.102.6",
    "three": "^0.179.1",               // 🔴 Pesante per mobile
    "i18next": "^25.4.2",
    "react-i18next": "^15.7.3",
    "react-hook-form": "7.51.5",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "tailwindcss": "3.4.10"
  }
}
```

**NOTA CRITICA:** Three.js e React Three Fiber sono librerie 3D pesanti (~500KB+ bundle). Potrebbero impattare performance mobile.

---

## 1. CONFIGURAZIONE TAILWIND

### File: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5A67D8',     // Blu Intelligenza
        'secondary': '#8B5CF6',   // Viola Creatività
        'background': '#FFFFFF',
        'surface': '#F7FAFC',
        'text-primary': '#1A202C',
        'text-secondary': '#718096',
        'success': '#38A169',
        'error': '#E53E3E',
        'warning': '#D69E2E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07)...',
        'lift': '0 10px 25px -3px rgba(0, 0, 0, 0.1)...',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
```

🟢 **OK:** Definisce colori custom e animazioni base
🔴 **MANCANTE:** NO breakpoint custom (usa default Tailwind)

---

## 2. CSS GLOBALE - `globals.css`

### File: `src/styles/globals.css` (861 righe)

#### SEZIONE MOBILE OTTIMIZZAZIONI ✅ (linee 27-82)
```css
/* ---------------------------------------------- */
/* 			  Mobile Touch Optimizations 		  */
/* ---------------------------------------------- */

/* Prevenzione zoom indesiderato su input e textarea */
input, textarea, select {
  font-size: 16px !important; /* ✅ Previene zoom su iOS */
  touch-action: manipulation;
}

/* Touch target minimi per accessibilità */
button, a, [role="button"] {
  min-height: 44px;      /* ✅ Apple HIG compliant */
  min-width: 44px;
  touch-action: manipulation;
}

/* Ottimizzazioni per scroll su mobile */
html {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior: contain;  /* ✅ Previene pull-to-refresh */
}
```

#### SAFE AREA SUPPORT ✅ (linee 64-81)
```css
/* Gestione viewport per dispositivi con notch */
@supports (padding: max(0px)) {
  .safe-area-top {
    padding-top: max(1rem, env(safe-area-inset-top));
  }
  
  .safe-area-bottom {
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
  
  .safe-area-left {
    padding-left: max(1rem, env(safe-area-inset-left));
  }
  
  .safe-area-right {
    padding-right: max(1rem, env(safe-area-inset-right));
  }
}
```

#### MOBILE CONTAINER ✅ (linee 639-658)
```css
/* Container responsive per mobile */
.mobile-container {
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
}

/* Grid responsive per mobile */
.mobile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .mobile-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
  }
}
```

#### MOBILE-SPECIFIC FIXES ✅ (linee 828-860)
```css
@media (max-width: 768px) {
  /* Prevenzione overflow orizzontale */
  body {
    overflow-x: hidden;
    width: 100%;
  }
  
  /* Ottimizzazione touch per elementi interattivi */
  button, a, input, textarea, select {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  
  /* Prevenzione zoom su input su iOS */
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="number"],
  input[type="tel"],
  input[type="url"],
  textarea {
    font-size: 16px !important;
  }
  
  /* Ottimizzazione scroll per modal */
  .modal-content {
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
```

#### REDUCED MOTION ✅ (linee 818-825)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 3. LAYOUT ROOT - VIEWPORT CONFIG

### File: `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from "next";

// ✅ CORREZIONE #6: Configurazione viewport separata come richiesto da Next.js 14
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,          // ✅ Permette zoom fino a 3x
  minimumScale: 1,          // Impedisce zoom out sotto 1x
  userScalable: true,       // ✅ Permette il pinch-to-zoom
  viewportFit: 'cover',     // ✅ Gestisce meglio i notch
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Script per gestire il reset del viewport dopo zoom */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Previene il double-tap zoom su iOS
            document.addEventListener('touchend', function (event) {
              const now = (new Date()).getTime();
              if (now - lastTouchEnd <= 300) {
                event.preventDefault();
              }
              lastTouchEnd = now;
            }, false);
            
            // Reset viewport quando la finestra cambia orientamento
            window.addEventListener('orientationchange', function() {
              setTimeout(resetViewport, 100);
            });
          `,
        }} />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-text-primary`}>
        <I18nProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
```

🟢 **ECCELLENTE:** Configurazione viewport Next.js 14 compliant con gestione notch

---

## 4. BREAKPOINT USAGE STATS

| Breakpoint | Occorrenze (src/) |
|------------|-------------------|
| `sm:` | **~77** |
| `md:` | **~90** |
| `lg:` | **~16** |
| `xl:` | **~1** |

🟢 **OK:** Buon uso di breakpoint responsive. `md:` è il più usato (tablet threshold).

---

## 5. PATTERN PROBLEMATICI

### 5.1 hidden sm:block / hidden md:block
```
🟢 ZERO OCCORRENZE
```
**OTTIMO:** Nessun pattern desktop-first nasconde contenuti su mobile.

### 5.2 block sm:hidden / block md:hidden
```
🟢 ZERO OCCORRENZE
```

### 5.3 Width fisse in px
```
🟢 ZERO OCCORRENZE in src/*.tsx
```
**OTTIMO:** Nessuna larghezza fissa hardcoded.

---

## 6. 100vh / min-h-screen USAGE

### File con `min-h-screen` (32 occorrenze in src/)
```
src/app/beta-access/page.tsx:400      min-h-screen bg-gray-50 flex items-center
src/app/beta-access/page.tsx:433      min-h-screen bg-gray-50 flex items-center
src/app/beta-access/page.tsx:469      min-h-screen bg-gray-50
src/app/beta-login/page.tsx:22        min-h-screen flex items-center justify-center
src/app/en/beta-access/page.tsx:390   min-h-screen bg-gradient-to-br
src/app/en/beta-access/page.tsx:412   min-h-screen bg-gradient-to-br
src/app/en/beta-access/page.tsx:426   min-h-screen bg-gradient-to-br
src/app/en/beta-login/page.tsx:46     min-h-screen bg-gradient-to-br
src/app/en/testimonials/page.tsx:255  min-h-screen bg-gray-50
src/app/en/contact/page.tsx:38        min-h-screen bg-gray-50
src/app/en/contact/page.tsx:54        min-h-screen bg-gray-50
src/app/en/faq/page.tsx:142           bg-gray-50 min-h-screen
src/app/en/how-it-works/page.tsx:118  bg-gray-50 min-h-screen
src/app/en/blog/page.tsx:27           min-h-screen bg-gray-50
src/app/en/blog/[slug]/page.tsx:162   min-h-screen bg-gray-50
src/app/en/beta-dashboard/page.tsx:10 min-h-screen bg-gray-50
src/app/admin/dashboard/page.tsx:470  min-h-screen bg-gray-50
src/app/admin/dashboard/page.tsx:508  min-h-screen bg-gray-50
src/app/admin/dashboard/page.tsx:518  min-h-screen bg-gray-50
...e altri
```

### dvh/svh/lvh Usage
```
🔴 ZERO OCCORRENZE
```

**⚠️ PROBLEMA:** 32 file usano `min-h-screen` (100vh) senza fallback `dvh`.
Su iOS Safari, 100vh include la barra URL, causando contenuti tagliati.

---

## 7. SAFE AREA USAGE

### In CSS (globals.css)
```css
✅ .safe-area-top    → padding-top: max(1rem, env(safe-area-inset-top))
✅ .safe-area-bottom → padding-bottom: max(1rem, env(safe-area-inset-bottom))
✅ .safe-area-left   → padding-left: max(1rem, env(safe-area-inset-left))
✅ .safe-area-right  → padding-right: max(1rem, env(safe-area-inset-right))
✅ .mobile-container → padding con safe-area
```

### In TSX Components
```
🔴 ZERO UTILIZZO delle classi safe-area nei componenti
```

**⚠️ PROBLEMA:** Safe area definite in CSS ma MAI usate nei componenti.

---

## 8. HEADER / NAVIGAZIONE MOBILE

### File: `src/components/Header.tsx` (47 righe)

```tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header({ locale='it' }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-100">
      <div className="container h-16 flex items-center justify-between">
        <Link href={locale==='it'?'/':'/en'} className="font-bold text-lg">TutorAI</Link>
        
        {/* ✅ Desktop Nav - hidden su mobile */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features">Features</a>
          <a href="#curricula">Curricula</a>
          <a href="#roi">ROI</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#faq">FAQ</a>
          <a href="#pricing">Pricing</a>
          <Link href={locale==='it'?'/en':'/'} className="px-3 py-1 rounded-lg border">
            {locale==='it'?'EN':'IT'}
          </Link>
          <button className="btn-ghost">Login</button>
          <a href="#waitlist" className="btn-primary">Partecipa alla Beta</a>
        </nav>
        
        {/* ✅ Hamburger button - visible solo mobile */}
        <button className="md:hidden px-3 py-2 border rounded-lg" onClick={()=>setOpen(true)} aria-label="Apri menu">
          ☰
        </button>
      </div>
      
      {/* ✅ Mobile Menu Overlay */}
      {open && (
        <div role="dialog" aria-modal="true" 
             className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden" 
             onClick={()=>setOpen(false)}>
          <div className="absolute inset-x-4 top-4 rounded-2xl bg-white p-6 shadow-lift" 
               onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">TutorAI</span>
              <button onClick={()=>setOpen(false)} aria-label="Chiudi">✕</button>
            </div>
            <div className="grid gap-3 text-lg">
              <a onClick={()=>setOpen(false)} href="#features">Features</a>
              <a onClick={()=>setOpen(false)} href="#curricula">Curricula</a>
              ...
              <a href="#waitlist" className="btn-primary w-full">Partecipa alla Beta</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

🟢 **BUONO:**
- Menu hamburger per mobile
- Overlay con backdrop blur
- aria-label per accessibilità
- onClick chiude il menu dopo selezione

🔴 **MIGLIORABILE:**
- NO animazione transizione menu
- NO swipe-to-close gesture
- NO focus trap nel dialog modale

---

## 9. HERO COMPONENT

### File: `src/components/Hero.tsx`

```tsx
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Hero({ locale='it' }) {
  const { t } = useTranslation('pages');
  const lines = t('home.hero.lines', { returnObjects: true }) as string[];

  return (
    <section className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 -z-10"></div>
      <div className="orb orb--a"></div>
      <div className="orb orb--b"></div>
      <div className="container pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {t('home.hero.title')}
            </h1>
            <div className="text-xl text-slate-600">
              <span className="inline-block animate-pulseGlow">{lines[0]}</span>
              ...
            </div>
            <div className="flex gap-3">
              <a href="#waitlist" className="btn-primary">{t('home.hero.cta.beta')}</a>
              <a href="#demo" className="btn-ghost">{t('home.hero.cta.demo')}</a>
            </div>
          </div>
          <div className="perspective-container">
            <div className="card-oblique glowing-border-follow">
              <Image
                className="rounded-3xl shadow-lift"
                src="/assets/hero/pexels-eren-li-7241361.jpg"
                width={1200} height={900} 
                alt="Studente con cuffie che studia" 
                priority   // ✅ LCP optimization
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

🟢 **BUONO:**
- Usa `next/image` con `priority` per LCP
- Grid responsive `md:grid-cols-2`
- Padding responsive `pt-16 md:pt-24`

🔴 **MIGLIORABILE:**
- Immagine 1200x900 potrebbe essere troppo grande per mobile
- Manca `sizes` attribute per responsive images

---

## 10. IMAGES & NEXT/IMAGE

### Utilizzo next/image
```
✅ 12 file usano next/image
```

**File che usano `Image` da next/image:**
- `src/components/Hero.tsx`
- `src/app/beta-access/page.tsx`
- `src/app/en/testimonials/page.tsx`
- `src/app/en/how-it-works/page.tsx`
- `src/app/en/blog/page.tsx`
- `src/app/en/blog/[slug]/page.tsx`
- `src/app/en/about-us/page.tsx`
- `src/app/(site)/testimonianze/page.tsx`
- `src/app/(site)/come-funziona/page.tsx`
- `src/app/(site)/chi-siamo/page.tsx`
- `src/app/(site)/blog/page.tsx`
- `src/app/(site)/blog/[slug]/page.tsx`

### Tag `<img>` non ottimizzati
```
🟢 ZERO - Tutte le immagini usano next/image
```

### Lazy loading
```
🔴 ZERO uso esplicito di loading="lazy" o React.lazy o dynamic()
```

**NOTA:** Next.js Image fa lazy loading automatico di default.

---

## 11. TOUCH EVENTS

### onTouchStart/onTouchEnd/onTouchMove
```
Solo 1 occorrenza in layout.tsx (script per prevent double-tap)
```
```tsx
// src/app/layout.tsx:50
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
```

### onClick events
```
57 occorrenze totali in 16 file
```

🟢 **OK:** Gli onClick funzionano anche su mobile (React li gestisce).

---

## 12. FORM & INPUT MOBILE

### Beta Access Form (`src/app/beta-access/page.tsx`)

```tsx
// Input con styling responsive
<input 
  type="text" 
  name="nome" 
  value={formData.nome} 
  onChange={handleInputChange} 
  required 
  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
             focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
/>

// Select dropdown
<select 
  name="curriculum" 
  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>

// Textarea
<textarea 
  name="motivazione" 
  rows={4} 
  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
             focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
/>
```

### Input mobile attributes
```
🔴 ZERO uso di:
   - inputMode
   - enterKeyHint
   - autoCapitalize
   - autoComplete
```

**⚠️ PROBLEMA:** Form non ottimizzati per tastiere mobile.
Mancano attributi come `inputMode="email"`, `enterKeyHint="next"`, etc.

---

## 13. ANIMATIONS

### CSS Animations usate
```tsx
// Hero.tsx:19
<span className="inline-block animate-pulseGlow">{lines[0]}</span>

// CookieBanner.tsx:40
className="... animate-slide-up"

// blog/page.tsx:32,35
className="... animate-fade-in-up"

// beta-login/page.tsx:24
<div className="animate-spin rounded-full h-12 w-12 border-b-2">
```

🟢 **OK:** Animazioni leggere, CSS-only
🟢 **OK:** `prefers-reduced-motion` supportato in globals.css

---

## 14. REDIRECT / AUTH FLOW

### File: `src/app/beta-login/page.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const BetaLoginPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Redirect to platform.mytutorai.app/login
    const inviteCode = searchParams.get('invite') || searchParams.get('code');
    const targetUrl = inviteCode
      ? `https://platform.mytutorai.app/login?invite=${inviteCode}`
      : 'https://platform.mytutorai.app/login';

    console.log('Redirecting to:', targetUrl);
    window.location.href = targetUrl;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Reindirizzamento...</p>
      </div>
    </div>
  );
};
```

🟢 **ARCHITETTURA CORRETTA:**
```
mytutorai.app/beta-login → redirect → platform.mytutorai.app/login
```
Evita problemi di cookie cross-domain con Supabase Auth.

---

## 15. FOOTER

### File: `src/components/Footer.tsx`

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="container grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-bold text-lg">TutorAI</div>
          <p className="text-slate-600 mt-2">Il tutor che si adatta alla tua mente.</p>
        </div>
        <div>
          <div className="font-semibold">Prodotto</div>
          <ul className="mt-2 space-y-2 text-slate-600">
            <li><a href="#features">Features</a></li>
            ...
          </ul>
        </div>
        ...
      </div>
      <div className="container text-xs text-slate-500 mt-6">
        © {new Date().getFullYear()} TutorAI. All rights reserved.
      </div>
    </footer>
  );
}
```

🟢 **OK:** Grid responsive con `md:grid-cols-4`
🔴 **MIGLIORABILE:** Nessun padding safe-area per iPhone notch

---

# RIEPILOGO AUDIT TUTORAI-SITE

## ✅ PUNTI DI FORZA (8)

| # | Feature | Evidenza |
|---|---------|----------|
| 1 | **Viewport Config** | Next.js 14 compliant, viewportFit: cover, userScalable: true |
| 2 | **Touch Targets** | min-height/width 44px per button/a in CSS |
| 3 | **Input Font Size** | 16px !important previene zoom iOS |
| 4 | **Safe Area CSS** | Classi .safe-area-* definite in globals.css |
| 5 | **next/image** | 12 file usano Image ottimizzato |
| 6 | **Hamburger Menu** | Mobile menu con overlay implementato |
| 7 | **Reduced Motion** | `prefers-reduced-motion` supportato |
| 8 | **No px widths** | Zero larghezze fisse hardcoded |

## 🔴 PROBLEMI CRITICI (5)

| # | Problema | Impatto | File Coinvolti |
|---|----------|---------|----------------|
| 1 | **100vh senza dvh** | Contenuti tagliati su iOS Safari | 32 file |
| 2 | **Safe Area non usate** | Classi definite ma mai applicate | Tutti i layout |
| 3 | **Input senza attributi mobile** | Tastiera non ottimizzata | beta-access/page.tsx |
| 4 | **Three.js bundle** | ~500KB+ impatto performance | package.json |
| 5 | **Menu no animazione** | UX scattosa apertura/chiusura | Header.tsx |

## ⚠️ PROBLEMI MINORI (3)

| # | Problema | Impatto |
|---|----------|---------|
| 1 | Image manca `sizes` | Caricamento non ottimale |
| 2 | No focus trap nel menu | Accessibilità keyboard |
| 3 | No swipe-to-close | UX menu mobile |

---

## CONFRONTO CON FRONTEND APP

| Feature | tutorai-site | frontend (app) |
|---------|--------------|----------------|
| Viewport Config | ✅ Completo | ⚠️ Parziale |
| Safe Area | ✅ Definite | 🔴 Assenti |
| Touch Targets 44px | ✅ | 🔴 |
| Input 16px | ✅ | 🔴 |
| next/image | ✅ 12 file | 🔴 0 file |
| dvh/svh | 🔴 | 🔴 |
| Mobile Menu | ✅ | ⚠️ Sidebar |
| prefers-reduced-motion | ✅ | 🔴 |

**CONCLUSIONE:** `tutorai-site` ha una migliore base mobile rispetto a `frontend`, ma entrambi mancano di `dvh` e optimizzazioni input.

---

## AZIONI PRIORITARIE RACCOMANDATE

### P0 - Critiche
1. Sostituire `min-h-screen` con `min-h-[100dvh]` in tutti i 32 file
2. Applicare `.safe-area-bottom` ai container principali
3. Aggiungere `inputMode`, `enterKeyHint`, `autoComplete` ai form

### P1 - Importanti
4. Lazy load Three.js solo quando necessario
5. Aggiungere animazione transizione al menu mobile
6. Aggiungere `sizes` attribute alle Image

### P2 - Nice to have
7. Implementare swipe-to-close sul menu
8. Focus trap nel dialog modale
9. Ottimizzare bundle size con dynamic imports

