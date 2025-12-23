'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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

const AcademicPath = () => {
    const { t } = useTranslation('pages');
    const [pathRef, isPathVisible] = useInView({ threshold: 0.1 });
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    
    // Get translated path data with fallback
    const pathSteps = t('home.academicPath.steps', { 
        returnObjects: true,
        fallback: [
            {
                title: "September - Starting Point (Without TutorAI)",
                description: "Potential blocked by previous year's knowledge gaps.",
                detailedDescription: "It's the beginning of the academic year. The student starts with unresolved uncertainties and difficulties. Their potential is 50%, hindered by an incomplete knowledge base that makes them vulnerable to new topics."
            },
            {
                title: "December - Solid Foundations",
                description: "TutorAI constantly reinforces the fundamentals.",
                detailedDescription: "After three months with TutorAI, the initial gaps have been almost completely filled. The AI has created a personalized recovery path. Now the student not only keeps up with the class, but does so with new confidence. Potential rises to 65%."
            },
            {
                title: "March - Full Performance",
                description: "Confidence and method to face challenges.",
                detailedDescription: "The student has developed an effective study method, optimized by TutorAI. Test simulations make them prepared and less anxious. Difficulties are anticipated and managed before they become problems. Potential reaches 80%."
            },
            {
                title: "June - Exams Conquered",
                description: "Better results, with less stress.",
                detailedDescription: "Final preparation is strategic. TutorAI helps manage anxiety, review the most critical topics and face exams with maximum clarity. Results are tangible, grades improve. Potential touches 95%."
            },
            {
                title: "Next September - Decisive Advantage",
                description: "Starting from a completely new level.",
                detailedDescription: "After a full year and intelligent summer review, the student has not only consolidated all knowledge but also anticipated future topics. They don't start from zero. They start from 100% of their potential, with a huge competitive advantage."
            }
        ]
    }) || [];
    
    const pathDataTranslated = pathSteps.map((step, index) => ({
        ...step,
        position: ['top-0 left-0', 'top-1/4 right-0', 'top-1/2 left-0', 'top-3/4 right-0', 'bottom-0 left-0'][index],
        color: ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-violet-500', 'bg-green-500'][index]
    }));

    const handleMilestoneClick = (e, milestone) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedMilestone(milestone);
    };

    const handleCloseModal = () => {
        setSelectedMilestone(null);
    };

    return (
        <>
            <section ref={pathRef} id="academic-path" className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                    <div className="text-center mb-12 md:mb-24">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
                            {t('home.academicPath.title', 'The transformation journey with TutorAI')}
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
                            {t('home.academicPath.subtitle', 'From unexpressed potential to maximum performance. A path that builds and comes alive before your eyes.')}
                        </p>
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
                        {pathDataTranslated.map((item, index) => (
                            <div
                                key={item.title}
                                className={`absolute w-11/12 md:w-4/12 transform transition-all duration-700 ease-out ${isPathVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                                style={{
                                    ...parsePosition(item.position),
                                    transitionDelay: `${index * 0.3}s`
                                }}
                            >
                                <button 
                                    onClick={(e) => handleMilestoneClick(e, item)} 
                                    className="w-full text-left perspective-container"
                                >
                                    <div className="card-oblique glowing-border bg-white rounded-2xl shadow-xl p-4 md:p-6 border-t-4 border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
                                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${item.color} mb-2 md:mb-3`}></div>
                                        <h3 className="font-bold text-text-primary text-base md:text-lg">{item.title}</h3>
                                        <p className="text-xs md:text-sm text-text-secondary mt-1 md:mt-2">{item.description}</p>
                                        <span className="text-xs text-primary font-semibold mt-2 md:mt-3 block">
                                            {t('home.academicPath.cta', 'Learn more...')}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <Modal 
                isOpen={!!selectedMilestone} 
                onClose={handleCloseModal} 
                title={selectedMilestone?.title}
            >
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
