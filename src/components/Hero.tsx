import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Hero({ locale='it' }:{ locale?: 'it'|'en' }) {
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
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{t('home.hero.title')}</h1>
            <div className="text-xl text-slate-600">
              <span className="inline-block animate-pulseGlow">{lines[0]}</span> ·{" "}
              <span>{lines[1]}</span> ·{" "}
              <span>{lines[2]}</span>
            </div>
            <div className="flex gap-3">
              <a href="#waitlist" className="btn-primary">{t('home.hero.cta.beta')}</a>
              <a href="#demo" className="btn-ghost">{t('home.hero.cta.demo')}</a>
            </div>
            <div className="badge">{t('home.hero.badge')}</div>
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
