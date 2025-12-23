# Product Requirements Document (PRD) - TutorAI

## 🎯 Vision
Piattaforma educativa AI che rivoluziona l'apprendimento personalizzato per studenti italiani.

## 📋 Product Overview

### Core Product
- **Nome:** TutorAI
- **Tipo:** Piattaforma educativa basata su AI
- **Target:** Studenti e genitori italiani
- **Modello:** Beta access program → Full launch

### Key Features Identificate dal Codebase

#### 🌐 Landing Page
- **Multilingue:** Italiano (principale) + Inglese
- **Sezioni principali:**
  - Hero con animazioni 3D
  - Features showcase
  - Academic path guidance
  - ROI calculator
  - Testimonials/social proof

#### 🔐 Sistema Accesso Beta
- **Beta Access Form:** Raccolta lead qualificati
- **Admin Dashboard:** Gestione richieste beta
- **Beta Login:** Accesso con codici
- **Beta Dashboard:** Area riservata utenti beta

#### 📱 User Experience
- **Responsive design** ottimizzato mobile-first
- **3D animations** con React Three Fiber
- **Form validation** con React Hook Form + Zod
- **Modal system** per UX fluida

### 🎯 Target Audience

#### Primario
- **Studenti:** Scuole superiori italiane
- **Genitori:** Famiglie che cercano supporto educativo

#### Segmentazione dal Form Beta
- **User Types:** Genitori vs Studenti
- **Curricula:** Diversi percorsi di studio
- **Materie:** Matematica, Scienze, Lingue, etc.

### 🔧 Technical Requirements

#### Frontend
- Next.js 14 (App Router)
- TypeScript per type safety
- Tailwind CSS per styling
- React Three Fiber per 3D

#### Backend & Infrastructure
- Firebase Auth per autenticazione
- Firebase Firestore per database
- Vercel/Firebase hosting
- Email integration (SendGrid/Nodemailer)

#### Performance & SEO
- Static generation per SEO
- Responsive design
- Ottimizzazione Core Web Vitals
- Sitemap e robots.txt

### 📊 Success Metrics (Da Implementare)
- Conversioni beta signup
- Engagement tempo pagina
- Bounce rate riduzione
- Form completion rate
- User activation nella beta

### 🚀 Roadmap Phases

#### Phase 1: Beta Launch (Current)
- ✅ Landing page base
- ✅ Beta access system
- ✅ Admin dashboard
- ⏳ Authentication system
- ⏳ Core AI tutoring features

#### Phase 2: MVP Launch
- Full user registration
- Core tutoring functionality
- Payment integration
- Advanced analytics

#### Phase 3: Scale
- Advanced AI features
- Mobile app
- Partnerships scuole
- International expansion

## 🎨 Brand & Design
- **Logo:** 🧠 Brain emoji + "TutorAI"
- **Colors:** Primary/Secondary gradient system
- **Typography:** Modern, readable
- **Style:** Clean, professional, tech-forward

## 🔍 Competitive Advantage
- AI personalizzato per curriculum italiano
- Interface multilingue nativa
- Focus su ROI educativo misurabile
- Sistema beta per validazione mercato