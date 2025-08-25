# 🧠 TutorAI - Landing Page Completa

Una landing page moderna e interattiva per TutorAI, un servizio di tutoraggio intelligente potenziato dall'intelligenza artificiale.

## 🚀 Caratteristiche

### ✨ Design Moderno
- **Design Responsive**: Ottimizzato per desktop, tablet e mobile
- **Animazioni Avanzate**: Effetti 3D, bordi luminosi animati, transizioni fluide
- **UI/UX Professionale**: Interfaccia moderna con focus su conversione

### 🎨 Sezioni Complete
- **Hero Section**: Presentazione accattivante del servizio
- **Features**: Caratteristiche principali con animazioni
- **Curricula**: Sistemi scolastici supportati
- **ROI Calculator**: Calcolatore di ritorno sull'investimento interattivo
- **Testimonials**: Storie di successo degli studenti
- **Blog**: Articoli educativi completi
- **FAQ**: Domande frequenti
- **Academic Path**: Percorso accademico personalizzato

### 🛠 Tecnologie Utilizzate
- **Next.js 14**: Framework React moderno
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety
- **React Hooks**: Gestione stato e effetti
- **CSS Animations**: Animazioni personalizzate avanzate

## 📦 Installazione

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Setup Locale
```bash
# Clona il repository
git clone https://github.com/tuousername/tutorai-site.git
cd tutorai-site

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`

## 🏗 Struttura del Progetto

```
tutorai-site/
├── src/
│   ├── app/                    # App Router Next.js 14
│   │   ├── (site)/            # Layout principale
│   │   ├── beta-access/       # Pagina accesso beta
│   │   ├── blog/              # Pagine blog
│   │   └── ...
│   ├── components/            # Componenti React
│   │   ├── sections/          # Sezioni principali
│   │   ├── ui/               # Componenti UI
│   │   └── layout/           # Layout components
│   ├── styles/               # File CSS globali
│   └── utils/                # Utility functions
├── public/                   # Asset pubblici
│   └── assets/              # Immagini e risorse
└── ...
```

## 🎯 Sezioni Principali

### Hero Section
- Call-to-action prominente
- Immagini di alta qualità
- Messaggio chiaro e diretto

### Features
- 6 caratteristiche principali
- Animazioni al scroll
- Icone e descrizioni dettagliate

### ROI Calculator
- Calcolatore interattivo
- Grafici animati
- Confronto costi tradizionali vs TutorAI

### Testimonials
- Storie reali di studenti
- Statistiche di successo
- Animazioni card personalizzate

### Blog
- Articoli educativi completi
- SEO ottimizzato
- Categorizzazione per argomenti

## 🎨 Animazioni e Effetti

### CSS Animations
- **3D Perspective**: Effetti di profondità
- **Border Animations**: Bordi luminosi animati
- **Hover Effects**: Interazioni al passaggio del mouse
- **Scroll Animations**: Animazioni al scroll

### Keyframes Personalizzati
```css
@keyframes border-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## 📱 Responsive Design

- **Mobile First**: Design ottimizzato per mobile
- **Breakpoints**: Tablet, desktop, large screens
- **Touch Friendly**: Interazioni ottimizzate per touch

## 🚀 Deployment

### Vercel (Raccomandato)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy della cartella .next
```

## 🔧 Script Disponibili

```bash
npm run dev          # Server di sviluppo
npm run build        # Build di produzione
npm run start        # Server di produzione
npm run lint         # Linting del codice
```

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📞 Supporto

Per supporto o domande:
- Email: support@tutorai.com
- Website: https://tutorai.com

---

**TutorAI** - Trasforma l'apprendimento con l'intelligenza artificiale 🧠✨
