'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/Modal';

const Curricula = () => {
  const { t } = useTranslation('pages');
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  // Icon and visual data (stays the same for all languages)
  const visualData = [
    { 
      icon: '🇮🇹', 
      iconFallback: 'IT',
      flagSvg: (
        <svg viewBox="0 0 640 480" className="w-12 h-8 md:w-16 md:h-12">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z"/>
            <path fill="#009246" d="M0 0h213.3v480H0z"/>
            <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
          </g>
        </svg>
      ),
      name: 'Italian System', 
      detail: 'MIUR',
      detailedDescription: (
        <>
          <p className="mb-4">Complete support for the Italian national curriculum, from middle school to final exams. TutorAI knows the specifics of each track: High Schools (Classical, Scientific, Linguistic), Technical and Professional Institutes.</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Final Exam Preparation:</strong> Simulations of the first and second tests, and support for the oral interview.</li>
            <li><strong>Debt Recovery:</strong> Intensive study plans to pass remedial exams.</li>
            <li><strong>Ministerial Alignment:</strong> Content is constantly updated according to MIUR directives.</li>
          </ul>
        </>
      )
    },
    { 
      icon: '🇬🇧', 
      iconFallback: 'UK',
      flagSvg: (
        <svg viewBox="0 0 640 480" className="w-12 h-8 md:w-16 md:h-12">
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
          <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
          <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
          <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
        </svg>
      ),
      name: 'IGCSE / UK System', 
      detail: 'Cambridge',
      detailedDescription: (
       <>
        <p className="mb-4">Perfectly aligned with Cambridge International (IGCSE) and British system (GCSE, A-Levels) programs. Ideal for students in international schools or planning to study in the UK.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>IGCSE Specificity:</strong> Exercises and explanations based on Cambridge exam style and requirements.</li>
          <li><strong>A-Levels Preparation:</strong> Targeted insights to excel in chosen subjects and gain access to the best universities.</li>
        </ul>
       </>
      )
    },
    { 
      icon: '🌍', 
      iconFallback: 'IB',
      flagSvg: (
        <div className="w-12 h-8 md:w-16 md:h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded flex items-center justify-center text-white font-bold text-xs md:text-sm">
          IB
        </div>
      ),
      name: 'International Baccalaureate', 
      detail: 'IB - MYP & DP',
      detailedDescription: (
       <>
        <p className="mb-4">TutorAI understands the philosophy and structure of the IB, both for the Middle Years Programme (MYP) and Diploma Programme (DP). Essential support for a demanding and interdisciplinary study path.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Support for Extended Essay (EE) and TOK:</strong> Help with research, structuring and argumentation.</li>
          <li><strong>Standard & Higher Level:</strong> The difficulty level adapts perfectly if you're following a Standard Level (SL) or Higher Level (HL) course.</li>
          <li><strong>International Mindset:</strong> The examples and contexts proposed reflect the global nature of the IB program.</li>
        </ul>
       </>
      )
    },
    { 
      icon: '🇺🇸', 
      iconFallback: 'US',
      flagSvg: (
        <svg viewBox="0 0 640 480" className="w-12 h-8 md:w-16 md:h-12">
          <path fill="#bd3d44" d="M0 0h640v480H0z"/>
          <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
          <rect fill="#192f5d" width="247" height="259"/>
          <g fill="#fff">
            <g id="d">
              <g id="c">
                <g id="e">
                  <g id="b">
                    <path id="a" d="M24.8 25l3.2 9.8h10.3l-8.3 6.1 3.2 9.9-8.4-6.1-8.4 6.1 3.2-9.9-8.3-6.1h10.3z"/>
                    <use href="#a" y="19.5"/>
                    <use href="#a" y="39"/>
                  </g>
                  <use href="#b" y="78"/>
                </g>
                <use href="#e" y="156"/>
              </g>
              <use href="#c" y="312"/>
            </g>
            <use href="#d" x="247"/>
          </g>
        </svg>
      ),
      name: 'American System', 
      detail: 'AP & SAT',
      detailedDescription: (
       <>
        <p className="mb-4">Complete support for the American educational system, from high school to college preparation. TutorAI covers Advanced Placement (AP) courses, SAT preparation, and college application support.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>AP Course Support:</strong> Comprehensive coverage of all AP subjects with exam-style practice.</li>
          <li><strong>SAT Preparation:</strong> Math and Evidence-Based Reading and Writing sections with adaptive practice.</li>
          <li><strong>College Application:</strong> Guidance for personal statements and application strategies.</li>
        </ul>
       </>
      )
    },
    { 
      icon: '🇫🇷', 
      iconFallback: 'FR',
      flagSvg: (
        <svg viewBox="0 0 640 480" className="w-12 h-8 md:w-16 md:h-12">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z"/>
            <path fill="#00267f" d="M0 0h213.3v480H0z"/>
            <path fill="#f31830" d="M426.7 0H640v480H426.7z"/>
          </g>
        </svg>
      ),
      name: 'AEFE (French)', 
      detail: 'Baccalauréat',
      detailedDescription: (
       <>
        <p className="mb-4">Specialized support for the French educational system and Baccalauréat, ideal for students in French schools abroad or planning to study in France.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Bac Preparation:</strong> Simulations of written and oral tests of the Baccalauréat.</li>
          <li><strong>AEFE Programs:</strong> Alignment with French schools abroad programs.</li>
          <li><strong>Specific Subjects:</strong> Support for philosophy, French literature and other subjects characteristic of the French system.</li>
        </ul>
       </>
      )
    },
    { 
      icon: '🇩🇪', 
      iconFallback: 'DE',
      flagSvg: (
        <svg viewBox="0 0 640 480" className="w-12 h-8 md:w-16 md:h-12">
          <path fill="#ffce00" d="M0 320h640v160H0z"/>
          <path d="M0 0h640v160H0z"/>
          <path fill="#d00" d="M0 160h640v160H0z"/>
        </svg>
      ),
      name: 'Gymnasium', 
      detail: 'Abitur',
      detailedDescription: (
       <>
        <p className="mb-4">Support for the German educational system, from Gymnasium to Abitur, with particular attention to German methodology and standards.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Abitur Preparation:</strong> Simulations of written and oral tests of the German final exam.</li>
          <li><strong>German Methodology:</strong> Approach to study and problem solving according to German canons.</li>
          <li><strong>Characteristic Subjects:</strong> Support for subjects such as philosophy, history and sciences according to the German curriculum.</li>
        </ul>
       </>
      )
    }
  ];

  // Get curricula text data from translations
  const curriculaTextData = t('home.curricula.systems', { returnObjects: true }) || [];
  
  // Combine visual data with translated text data
  const curriculaData = visualData.map((visual, index) => ({
    ...visual,
    ...(curriculaTextData[index] || {}),
    // Create detailed description from translation description
    detailedDescription: curriculaTextData[index]?.description ? (
      <p className="mb-4">{curriculaTextData[index].description}</p>
    ) : visual.detailedDescription
  }));

  // Get subjects data from translations with fallback
  const subjectsData = t('home.curricula.subjects', { returnObjects: true }) || [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Philosophy',
    'Latin', 'Economics', 'Law', 'Computer Science', 'and many more...'
  ];

  return (
    <>
      <section id="curricula" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
              {t('home.curricula.title', 'We speak your school\'s language')}
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
              {t('home.curricula.subtitle', 'Click on an educational system to discover how TutorAI perfectly adapts to your curriculum.')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {curriculaData.map((curriculum) => (
              <div 
                key={curriculum.name} 
                className="perspective-container"
              >
                <div 
                  className="card-border-animated bg-surface p-4 md:p-6 rounded-2xl text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-primary cursor-pointer"
                  onClick={() => setSelectedCurriculum(curriculum)}
                >
                <div className="mb-3 md:mb-4 flex flex-col justify-center items-center">
                  <div className="mb-2">
                    {curriculum.flagSvg}
                  </div>
                  <span className="text-xs text-gray-400">({curriculum.iconFallback})</span>
                </div>
                <h3 className="font-bold text-sm md:text-md text-text-primary leading-tight">{curriculum.name}</h3>
                <p className="text-xs md:text-sm text-text-secondary mt-1">{curriculum.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-text-primary">{t('home.curricula.supportedSubjects', 'Supported Subjects')}</h3>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
                {subjectsData.map((subject) => (
                  <div key={subject} className="perspective-container">
                    <div className="card-border-animated bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full cursor-pointer">
                      {subject}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Modal 
        isOpen={!!selectedCurriculum} 
        onClose={() => setSelectedCurriculum(null)} 
        title={selectedCurriculum?.name}
      >
        {selectedCurriculum?.detailedDescription}
      </Modal>
    </>
  );
};

export default Curricula;
