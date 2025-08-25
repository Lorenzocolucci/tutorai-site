# TutorAI – Next.js 14 (App Router) + Tailwind

## Requisiti
- **Node.js 20 LTS** (consigliato) su Windows/macOS/Linux
- Un terminale (su Windows: **CMD** o **PowerShell**)

## Setup (Windows CMD)
```cmd
cd tutorai-site
npm install
npm run dev
```
Apri il browser su **http://localhost:3000**.

## Build produzione
```cmd
npm run build
npm start
```

## Struttura
- App Router in `src/app`
- Componenti in `src/components`
- Stili in `src/styles`
- Utilità in `src/utils`

## Configurazioni SEO/Analytics
- Modifica `src/app/layout.tsx` (metadata, JSON-LD, hreflang)
- Inserisci eventuale **GA_MEASUREMENT_ID** in `src/utils/analytics.ts`
