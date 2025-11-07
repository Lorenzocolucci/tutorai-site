import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // Assegniamo una variabile CSS per usarla in Tailwind
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  title: "TutorAI - Il Futuro dell'Apprendimento Personale",
  description: "Non cambiare il tuo modo di imparare. Cambia il tutor. TutorAI è il primo tutor intelligente che si adatta al tuo stile cognitivo.",
};

export default function RootLayout({ children }) {
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
