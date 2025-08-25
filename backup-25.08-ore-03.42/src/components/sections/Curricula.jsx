'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

const curriculaData = [
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
    name: 'Sistema Italiano', 
    detail: 'MIUR',
    detailedDescription: (
      <>
        <p className="mb-4">Supporto completo per il curriculum nazionale italiano, dalle scuole medie alla Maturità. TutorAI conosce le specifiche di ogni indirizzo: Licei (Classico, Scientifico, Linguistico), Istituti Tecnici e Professionali.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Preparazione alla Maturità:</strong> Simulazioni della prima e seconda prova, e supporto per il colloquio orale.</li>
          <li><strong>Recupero Debiti:</strong> Piani di studio intensivi per superare gli esami di riparazione.</li>
          <li><strong>Allineamento Ministeriale:</strong> I contenuti sono costantemente aggiornati secondo le direttive del MIUR.</li>
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
        <p className="mb-4">Perfettamente allineato con i programmi Cambridge International (IGCSE) e del sistema britannico (GCSE, A-Levels). Ideale per studenti in scuole internazionali o che pianificano di studiare nel Regno Unito.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Specificità IGCSE:</strong> Esercizi e spiegazioni basati sullo stile e le richieste degli esami Cambridge.</li>
          <li><strong>Preparazione A-Levels:</strong> Approfondimenti mirati per eccellere nelle materie scelte e ottenere l'accesso alle migliori università.</li>
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
        <p className="mb-4">TutorAI comprende la filosofia e la struttura dell'IB, sia per il Middle Years Programme (MYP) che per il Diploma Programme (DP). Un supporto fondamentale per un percorso di studi esigente e interdisciplinare.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Supporto per l'Extended Essay (EE) e TOK:</strong> Aiuto nella ricerca, strutturazione e argomentazione.</li>
          <li><strong>Standard & Higher Level:</strong> Il livello di difficoltà si adatta perfettamente se stai seguendo un corso a livello Standard (SL) o Higher (HL).</li>
          <li><strong>Mentalità Internazionale:</strong> Gli esempi e i contesti proposti riflettono la natura globale del programma IB.</li>
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
    name: 'American K-12', 
    detail: 'AP & SAT',
    detailedDescription: (
       <>
        <p className="mb-4">Supporto completo per il sistema educativo americano, dalle elementari (K-5) alle superiori (9-12), inclusi i corsi Advanced Placement (AP) e la preparazione per i test SAT/ACT.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Preparazione AP:</strong> Corsi intensivi per gli esami Advanced Placement, fondamentali per l'ammissione universitaria.</li>
          <li><strong>Test SAT/ACT:</strong> Strategie e pratica mirata per ottenere i migliori punteggi nei test di ammissione.</li>
          <li><strong>Common Core Standards:</strong> Allineamento con gli standard educativi nazionali americani.</li>
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
    name: 'AEFE (Francese)', 
    detail: 'Baccalauréat',
    detailedDescription: (
       <>
        <p className="mb-4">Supporto specializzato per il sistema educativo francese e il Baccalauréat, ideale per studenti in scuole francesi all'estero o che pianificano di studiare in Francia.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Preparazione al Bac:</strong> Simulazioni delle prove scritte e orali del Baccalauréat.</li>
          <li><strong>Programmi AEFE:</strong> Allineamento con i programmi delle scuole francesi all'estero.</li>
          <li><strong>Materie Specifiche:</strong> Supporto per filosofia, letteratura francese e altre materie caratteristiche del sistema francese.</li>
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
        <p className="mb-4">Supporto per il sistema educativo tedesco, dal Gymnasium all'Abitur, con particolare attenzione alla metodologia e agli standard tedeschi.</p>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Preparazione all'Abitur:</strong> Simulazioni delle prove scritte e orali dell'esame di maturità tedesco.</li>
          <li><strong>Metodologia Tedesca:</strong> Approccio allo studio e alla risoluzione dei problemi secondo i canoni tedeschi.</li>
          <li><strong>Materie Caratteristiche:</strong> Supporto per materie come filosofia, storia e scienze secondo il curriculum tedesco.</li>
        </ul>
       </>
    )
  }
];

const subjectsData = [
  'Matematica', 'Fisica', 'Chimica', 'Biologia', 'Inglese', 'Storia', 'Filosofia',
  'Latino', 'Economia', 'Diritto', 'Informatica', 'e molte altre...'
];

const Curricula = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  return (
    <>
             <section id="curricula" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
              Parliamo la lingua della tua scuola
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
              Clicca su un sistema scolastico per scoprire come TutorAI si adatta perfettamente al tuo programma di studi.
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
            <h3 className="text-2xl font-bold text-text-primary">Materie Supportate</h3>
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
