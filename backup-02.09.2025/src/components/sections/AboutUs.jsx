// src/components/sections/AboutUs.jsx

'use client';

import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation('pages');
    
    return (
        <section id="about-us" className="py-16 md:py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        {t('about.title', 'An artificial intelligence with an educator\'s soul')}
                    </h2>
                    <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                        {t('about.description', 'We didn\'t start from an algorithm, but from 15 years of experience in classrooms. We combined psychology, neuroscience and the most advanced AI to create not just a tool, but a true learning partner.')}
                    </p>
                    {/* Il bottone verrà renderizzato dalla homepage (page.tsx) per una migliore gestione */}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
