import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation('pages');
  
  const features = t('featuresSimple.items', { returnObjects: true }) as any[];

  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('featuresSimple.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i)=> (
            <div key={i} className="perspective-container">
              <div className="card-oblique glowing-border card reveal tilt">
                <div className="text-2xl">{f.emoji}</div>
                <h3 className="mt-3 text-xl font-semibold">{f.title}</h3>
                <p className="text-slate-600 mt-2">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
