'use client';

import { useTranslation } from 'react-i18next';
import AboutUs from '@/components/sections/AboutUs';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';

const HomePageCTAs = () => {
  const { t, i18n } = useTranslation('pages');
  
  // Get current language to build language-aware URLs
  const currentLang = i18n?.language || 'it';
  const aboutLink = currentLang === 'en' ? '/en/about-us' : '/chi-siamo';
  
  return (
    <>
      {/* ABOUT US SECTION (TEASER) */}
      <AnimateOnScroll>
        <AboutUs />
        <div className="text-center pb-20 bg-slate-900">
            <Button href={aboutLink} variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-primary">
                {t('home.about.cta', 'Read our full story')}
            </Button>
        </div>
      </AnimateOnScroll>
    </>
  );
};

export default HomePageCTAs;
