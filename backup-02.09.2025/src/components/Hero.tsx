import Image from 'next/image';

export default function Hero({ locale='it' }:{ locale?: 'it'|'en' }) {
  const dict = {
    it: {
      h1: "Non cambiare il tuo modo di imparare.",
      lines: ["Cambia tutor, non te stessə", "Si adatta alla tua mente", "Risultati reali, senza stress"],
      cta1: "Partecipa alla Beta",
      cta2: "Guarda la Demo",
      badge: "Beta limitata a 1000 studenti • 1 mese gratis + 1000 crediti • Nessuna carta richiesta"
    },
    en: {
      h1: "Don’t change your way of learning.",
      lines: ["Change the tutor, not yourself", "It adapts to your mind", "Real results, zero stress"],
      cta1: "Join the Beta",
      cta2: "Watch the Demo",
      badge: "Limited Beta: 1000 students • 1 month free + 1000 credits • No card required"
    }
  }[locale];

  return (
    <section className="relative overflow-hidden">
      <div className="hero-gradient absolute inset-0 -z-10"></div>
      <div className="orb orb--a"></div>
      <div className="orb orb--b"></div>
      <div className="container pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{dict.h1}</h1>
            <div className="text-xl text-slate-600">
              <span className="inline-block animate-pulseGlow">{dict.lines[0]}</span> ·{" "}
              <span>{dict.lines[1]}</span> ·{" "}
              <span>{dict.lines[2]}</span>
            </div>
            <div className="flex gap-3">
              <a href="#waitlist" className="btn-primary">{dict.cta1}</a>
              <a href="#demo" className="btn-ghost">{dict.cta2}</a>
            </div>
            <div className="badge">{dict.badge}</div>
          </div>
          <div className="perspective-container">
            <div className="card-oblique glowing-border-follow">
              <Image
                className="rounded-3xl shadow-lift"
                src="/assets/hero/pexels-eren-li-7241361.jpg"
                width={1200} height={900} alt="Studente con cuffie che studia" priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
