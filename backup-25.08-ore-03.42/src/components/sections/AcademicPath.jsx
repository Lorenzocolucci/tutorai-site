'use client';

import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/ui/Modal';

// Hook per tracciare la visibilità dell'elemento
function useInView(options) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [options]);
    return [ref, isInView];
}

// DATI CON DESCRIZIONI DETTAGLIATE PER I POPUP
const pathData = [
    {
        title: 'Settembre - Partenza (Senza TutorAI)',
        description: "Potenziale bloccato dalle lacune dell'anno precedente.",
        detailedDescription: "È l'inizio dell'anno scolastico. Lo studente parte con le incertezze e le difficoltà non risolte. Il suo potenziale è del 50%, frenato da una base di conoscenze incompleta che lo rende vulnerabile ai nuovi argomenti.",
        position: 'top-0 left-0',
        color: 'bg-red-500'
    },
    {
        title: 'Dicembre - Basi Solide',
        description: 'TutorAI rinforza costantemente le fondamenta.',
        detailedDescription: "Dopo tre mesi con TutorAI, le lacune iniziali sono state quasi tutte colmate. L'IA ha creato un percorso di recupero su misura. Ora lo studente non solo tiene il passo con la classe, ma lo fa con una nuova sicurezza. Il potenziale sale al 65%.",
        position: 'top-1/4 right-0',
        color: 'bg-yellow-500'
    },
    {
        title: 'Marzo - A Pieno Regime',
        description: 'Fiducia e metodo per affrontare le sfide.',
        detailedDescription: "Lo studente ha sviluppato un metodo di studio efficace, ottimizzato da TutorAI. Le simulazioni delle verifiche lo rendono preparato e meno ansioso. Le difficoltà vengono anticipate e gestite prima che diventino problemi. Il potenziale raggiunge l'80%.",
        position: 'top-1/2 left-0',
        color: 'bg-blue-500'
    },
    {
        title: 'Giugno - Esami Superati',
        description: 'Migliori risultati, con meno stress.',
        detailedDescription: "La preparazione finale è strategica. TutorAI aiuta a gestire l'ansia, a ripassare gli argomenti più critici e ad affrontare gli esami con la massima lucidità. I risultati sono tangibili, i voti migliorano. Il potenziale tocca il 95%.",
        position: 'top-3/4 right-0',
        color: 'bg-violet-500'
    },
    {
        title: 'Settembre Successivo - Vantaggio Decisivo',
        description: 'Si riparte da un livello completamente nuovo.',
        detailedDescription: "Dopo un anno intero e un ripasso estivo intelligente, lo studente non solo ha consolidato tutte le conoscenze, ma ha anche anticipato gli argomenti futuri. Non riparte da zero. Riparte dal 100% del suo potenziale, con un vantaggio competitivo enorme.",
        position: 'bottom-0 left-0',
        color: 'bg-green-500'
    }
];

const AcademicPath = () => {
    const [pathRef, isPathVisible] = useInView({ threshold: 0.1 });
    const [selectedMilestone, setSelectedMilestone] = useState(null);

    return (
        <>
            <section ref={pathRef} id="academic-path" className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                    <div className="text-center mb-12 md:mb-24">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Il viaggio di trasformazione con TutorAI</h2>
                        <p className="mt-4 text-base md:text-lg text-text-secondary max-w-3xl mx-auto">Dal potenziale inespresso alla massima performance. Un percorso che si costruisce e si anima sotto i tuoi occhi.</p>
                    </div>

                    <div className="relative h-[1200px] md:h-[600px]">
                        {/* PERCORSO SVG CHE SI ANIMA E TOCCA TUTTE LE SCHEDE */}
                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path
                                d="M 20 5 Q 50 20, 80 25 T 20 50 Q 50 60, 80 75 T 20 95"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="1"
                                style={{
                                    strokeDasharray: 400,
                                    strokeDashoffset: isPathVisible ? 0 : 400,
                                    transition: 'stroke-dashoffset 3s ease-in-out'
                                }}
                            />
                        </svg>

                        {/* Rendering delle schede */}
                        {pathData.map((item, index) => (
                            <div
                                key={item.title}
                                className={`absolute w-11/12 md:w-4/12 transform transition-all duration-700 ease-out ${isPathVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                                style={{
                                    ...parsePosition(item.position),
                                    transitionDelay: `${index * 0.3}s`
                                }}
                            >
                                <button onClick={() => setSelectedMilestone(item)} className="w-full text-left perspective-container">
                                  <div className="card-oblique glowing-border bg-white rounded-2xl shadow-xl p-4 md:p-6 border-t-4 border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item.color} mb-2 md:mb-3`}></div>
                                    <h3 className="font-bold text-text-primary text-base md:text-lg">{item.title}</h3>
                                    <p className="text-xs md:text-sm text-text-secondary mt-1 md:mt-2">{item.description}</p>
                                    <span className="text-xs text-primary font-semibold mt-2 md:mt-3 block">Scopri di più...</span>
                                  </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <Modal isOpen={!!selectedMilestone} onClose={() => setSelectedMilestone(null)} title={selectedMilestone?.title}>
                <p>{selectedMilestone?.detailedDescription}</p>
            </Modal>
        </>
    );
};

// Funzione helper per posizionare le schede
const parsePosition = (pos) => {
    const [y, x] = pos.split(' ');
    const position = {};
    if (y === 'top-0') position.top = '5%';
    if (y === 'top-1/4') position.top = '25%';
    if (y === 'top-1/2') position.top = '45%';
    if (y === 'top-3/4') position.top = '65%';
    if (y === 'bottom-0') position.top = '85%';
    if (x === 'left-0') position.left = '4%';
    if (x === 'right-0') position.right = '4%';
    position.transform = `translateY(-50%)`; // Centra verticalmente
    return position;
};

export default AcademicPath;
