'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';

// Data now comes from translations

// Generate consistent avatar colors based on name
const getAvatarColors = (name) => {
  const colors = [
    ['#3B82F6', '#1D4ED8'], // Blue gradient
    ['#10B981', '#047857'], // Green gradient  
    ['#F59E0B', '#D97706'], // Orange gradient
    ['#EF4444', '#DC2626'], // Red gradient
    ['#8B5CF6', '#7C3AED'], // Purple gradient
    ['#06B6D4', '#0891B2'], // Cyan gradient
    ['#F97316', '#EA580C'], // Orange gradient
    ['#EC4899', '#DB2777'], // Pink gradient
  ];
  
  // Use name to generate consistent index
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index].join(', ');
};

// Sub-componente per la card con animazione bordo - LAYOUT IDENTICO ALLA PAGINA TESTIMONIANZE
const AnimatedTestimonialCard = ({ testimonial, langPrefix }) => {
  const { t } = useTranslation('pages');
  return (
    <div className="perspective-container h-full">
      <div className="card-border-animated bg-white h-full rounded-3xl p-8 flex flex-col">
        <div className="flex items-center mb-6">
          <div className="relative w-16 h-16 rounded-full mr-4 flex-shrink-0">
            {/* Generate avatar based on name initials */}
            <div 
              className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${getAvatarColors(testimonial.name)})`
              }}
            >
              {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            {/* Optional: Add a small verification badge */}
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">{testimonial.age} {t('common.age', 'anni')} • {testimonial.city}</p>
            <p className="text-sm text-gray-500 truncate">{testimonial.school}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {testimonial.verified && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                ✓ {t('common.verified', 'Verificata')}
              </span>
            )}
            {testimonial.badge && (
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                📍 {testimonial.badge}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-primary text-lg">{testimonial.subject}</span>
            <span className="text-xs text-gray-500">{testimonial.timeframe}</span>
          </div>
          
          {!testimonial.isParent && (
            <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-xl font-bold text-red-500">{testimonial.grade_before}</div>
                <div className="text-xs text-gray-500 font-medium">{t('home.testimonials.grades.before', 'Prima')}</div>
              </div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 transition-all duration-1000"
                    style={{ 
                      width: `${((testimonial.grade_after - testimonial.grade_before) / (10 - testimonial.grade_before)) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="text-center text-xs text-gray-600 mt-1 font-medium">{t('common.progress', 'Progresso')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-500">{testimonial.grade_after}</div>
                <div className="text-xs text-gray-500 font-medium">{t('home.testimonials.grades.after', 'Dopo')}</div>
              </div>
            </div>
          )}
        </div>

        <blockquote className="text-gray-700 italic text-center mb-6 flex-1 flex items-center">
          <span>{testimonial.quote}</span>
        </blockquote>

        <div className="text-center mt-auto">
          <a 
            href={`${langPrefix}/beta-access`}
            className="inline-block bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
{t('home.testimonials.cta.startYou', 'Inizia anche tu')}
          </a>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { t, i18n } = useTranslation('pages');
  
  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const langPrefix = currentLang === 'en' ? '/en' : '';
  const testimonialsLink = currentLang === 'en' ? '/en/testimonials' : '/testimonianze';
  
  // Get data from translations
  const testimonialsData = t('home.testimonials.data', { returnObjects: true }) || [];
  const statsData = t('home.testimonials.stats', { returnObjects: true }) || [];
  
  // Schema.org Review per tutte le testimonianze - SEO Optimization
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": testimonialsData.map((testimonial, index) => ({
      "@type": "Review",
      "position": index + 1,
      "itemReviewed": {
        "@type": "EducationalOrganization",
        "name": "TutorAI",
        "url": "https://www.mytutorai.app"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "age",
            "value": testimonial.age
          },
          {
            "@type": "PropertyValue", 
            "name": "city",
            "value": testimonial.city
          },
          {
            "@type": "PropertyValue",
            "name": "school",
            "value": testimonial.school
          }
        ]
      },
      "reviewBody": testimonial.quote.replace(/"/g, ''),
      "datePublished": "2024-09-01",
      "publisher": {
        "@type": "Organization",
        "name": "TutorAI"
      }
    }))
  };

  return (
    <>
      {/* Schema.org JSON-LD per SEO Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsSchema),
        }}
      />
      <section id="testimonials" className="bg-white" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            {t('home.testimonials.title', 'Le storie di chi ci è già riuscito')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            {t('home.testimonials.subtitle', 'Studenti reali che hanno trasformato il loro rendimento e la loro sicurezza.')}
          </p>
        </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonialsData.map((testimonial) => (
             <AnimatedTestimonialCard key={testimonial.name} testimonial={testimonial} langPrefix={langPrefix} />
           ))}
         </div>
        
        {/* CTA per pagina testimonianze completa */}
        <div className="text-center mt-6">
          <a 
            href={testimonialsLink}
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
          >
{t('home.testimonials.cta.readAll', 'Leggi tutte le testimonianze →')}
          </a>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {statsData.map(stat => (
            <div key={stat.label} className="perspective-container">
              <div className="card-border-animated card text-center reveal">
                <p className="text-3xl md:text-5xl font-extrabold text-primary leading-none">{stat.value}</p>
                <p className="mt-2 text-sm md:text-base text-text-secondary leading-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Testimonials;
