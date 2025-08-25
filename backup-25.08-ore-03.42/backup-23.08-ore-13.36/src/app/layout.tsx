import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/animations.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Assegniamo una variabile CSS per usarla in Tailwind
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "TutorAI - Il Futuro dell'Apprendimento Personale",
  description: "Non cambiare il tuo modo di imparare. Cambia il tutor. TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo.",
  alternates: {
    languages: {
      "it-IT": "/",
      "en": "/en"
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans bg-background text-text-primary`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
