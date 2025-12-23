'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
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

const featuresData = [
    {
        title: "Analisi Cognitiva Avanzata",
        description: "L'IA analizza il tuo stile di apprendimento e crea un percorso personalizzato che si adatta alle tue esigenze specifiche.",
        imageUrl: "/assets/features/pexels-shkrabaanthony-5306436.jpg",
        alt: "Persona che disegna un diagramma chiaro su una lavagna trasparente.",
        detailedDescription: "TutorAI utilizza algoritmi di machine learning avanzati per analizzare il tuo stile cognitivo, le tue lacune e i tuoi punti di forza. L'IA crea un profilo di apprendimento unico che viene costantemente aggiornato in base ai tuoi progressi. Questo permette di personalizzare ogni lezione, esercizio e spiegazione per massimizzare la tua comprensione e ritenzione."
    },
    {
        title: "Recupero Lacune Intelligente",
        description: "Identifica e colma automaticamente le lacune nelle tue conoscenze, costruendo una base solida per il futuro.",
        imageUrl: "/assets/features/pexels-shkrabaanthony-5306455.jpg",
        alt: "Studentessa concentrata mentre risolve un problema complesso alla lavagna.",
        detailedDescription: "Il sistema identifica automaticamente le lacune nelle tue conoscenze attraverso test diagnostici intelligenti e analisi delle performance. Una volta individuate, TutorAI crea un percorso di recupero mirato che riempie questi gap in modo progressivo e logico. Questo approccio garantisce che non ci siano 'buchi' nella tua preparazione che potrebbero compromettere l'apprendimento futuro."
    },
    {
        title: "Simulazioni Verifiche Realistiche",
        description: "Affronta le verifiche con sicurezza grazie a simulazioni che replicano perfettamente l'ambiente d'esame.",
        imageUrl: "/assets/features/cowomen-hz-6prUpVss-unsplash.jpg",
        alt: "Gruppo di studio che collega idee, a simboleggiare il recupero delle lacune.",
        detailedDescription: "TutorAI crea simulazioni di verifiche che replicano fedelmente l'ambiente d'esame, inclusi i livelli di difficoltà, i tempi e i tipi di domande. Questo ti permette di familiarizzare con il formato e ridurre l'ansia da prestazione. Le simulazioni sono adattive: se sbagli, il sistema ti fornisce spiegazioni dettagliate e ti propone esercizi simili per rafforzare la comprensione."
    },
    {
        title: "Gestione Ansia e Stress",
        description: "Tecniche di rilassamento e strategie mentali per affrontare serenamente ogni sfida accademica.",
        imageUrl: "/assets/features/pexels-roman-odintsov-11025029.jpg",
        alt: "Studentessa sorridente e fiduciosa prima di un esame.",
        detailedDescription: "TutorAI include un modulo dedicato alla gestione dell'ansia e dello stress. Attraverso tecniche di respirazione, mindfulness e strategie cognitive, impari a mantenere la calma durante le verifiche e a gestire la pressione accademica. Il sistema monitora i tuoi livelli di stress e ti suggerisce pause e attività di rilassamento quando necessario."
    },
    {
        title: "Ripasso Estivo Intelligente",
        description: "Mantieni attive le conoscenze durante l'estate con un programma di ripasso personalizzato e coinvolgente.",
        imageUrl: "/assets/features/pexels-ivan-samkov-4624901.jpg",
        alt: "Bambini che studiano con entusiasmo durante l'estate.",
        detailedDescription: "Durante l'estate, TutorAI crea un programma di ripasso intelligente che mantiene attive le tue conoscenze senza essere opprimente. Il sistema utilizza la tecnica della ripetizione spaziata per rafforzare la memoria a lungo termine. Gli esercizi sono brevi, coinvolgenti e adattati ai tuoi interessi, rendendo il ripasso estivo piacevole ed efficace."
    },
    {
        title: "Anticipazione Programmi Futuri",
        description: "Preparati in anticipo per gli argomenti che affronterai, partendo sempre un passo avanti.",
        imageUrl: "/assets/features/pexels-ivan-samkov-4624915.jpg",
        alt: "Ragazzi che collaborano nello studio anticipando i programmi futuri.",
        detailedDescription: "TutorAI analizza i programmi scolastici futuri e ti prepara in anticipo per gli argomenti che affronterai. Questo approccio proattivo ti permette di arrivare a scuola con una base solida, rendendo l'apprendimento più fluido e meno stressante. Il sistema identifica anche le connessioni tra argomenti diversi, aiutandoti a costruire una comprensione più profonda e interconnessa."
    }
];

const FeatureCard = ({ feature, onClick, className = "", delay = 0 }) => {
    const [ref, isInView] = useInView();
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { left, top } = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty('--glow-x', `${e.clientX - left}px`);
        cardRef.current.style.setProperty('--glow-y', `${e.clientY - top}px`);
    };

    const handleCardClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    };

    return (
        <div
            ref={ref}
            className={`feature-card ${className} ${isInView ? 'animate-in' : ''}`}
            style={{ 
                transitionDelay: `${delay}ms`,
                transform: isInView ? 'translateY(0) rotate(0deg)' : 'translateY(50px) rotate(25deg)',
                opacity: isInView ? 1 : 0
            }}
        >
            <div
                ref={cardRef}
                className="glowing-card-container h-full"
                onMouseMove={handleMouseMove}
                onClick={handleCardClick}
                style={{ touchAction: 'manipulation' }}
            >
                <div className="glowing-card-mask bg-white cursor-pointer h-full">
                    <div className="rounded-3xl overflow-hidden h-full flex flex-col">
                        <div className="relative w-full h-48">
                            <Image src={feature.imageUrl} alt={feature.alt} fill className="object-cover" />
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
                                <span className="text-3xl">{feature.icon}</span>
                                {feature.title}
                            </h3>
                            <p className="mt-4 text-text-secondary flex-grow">{feature.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Features = () => {
    const { t } = useTranslation('pages');
    const [selectedFeature, setSelectedFeature] = useState(null);
    
    // Get features data from translations with fallback
    const featuresItems = t('home.features.items', { 
        returnObjects: true,
        fallback: featuresData 
    }) || featuresData;
    
    // Map translated items to include images and alt text (which stay the same)
    const features = featuresItems.map((item, index) => ({
        ...item,
        imageUrl: featuresData[index]?.imageUrl || "/assets/features/default.jpg",
        alt: featuresData[index]?.alt || item.title,
        icon: featuresData[index]?.icon || "🎯"
    }));

    const handleFeatureClick = () => {
        // Non serve più passare la posizione
    };

    const handleCloseModal = () => {
        setSelectedFeature(null);
    };

    return (
        <>
            <section id="features" className="py-16 bg-surface">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                            {t('home.features.title', 'Perché Scegliere TutorAI')}
                        </h2>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
                            {t('home.features.subtitle', 'Tecnologia all\'avanguardia per l\'educazione del futuro')}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            feature={features[0]} 
                            onClick={() => setSelectedFeature(features[0])} 
                            className="md:col-span-2" 
                            delay={0}
                        />
                        <FeatureCard 
                            feature={features[1]} 
                            onClick={() => setSelectedFeature(features[1])} 
                            delay={100}
                        />
                        <FeatureCard 
                            feature={features[2]} 
                            onClick={() => setSelectedFeature(features[2])} 
                            delay={200}
                        />
                        <FeatureCard 
                            feature={features[3]} 
                            onClick={() => setSelectedFeature(features[3])} 
                            delay={300}
                        />
                        <FeatureCard 
                            feature={features[4]} 
                            onClick={() => setSelectedFeature(features[4])} 
                            delay={400}
                        />
                        <FeatureCard 
                            feature={features[5]} 
                            onClick={() => setSelectedFeature(features[5])} 
                            className="md:col-span-2" 
                            delay={500}
                        />
                    </div>
                </div>
            </section>

            <Modal 
                isOpen={!!selectedFeature} 
                onClose={handleCloseModal} 
                title={selectedFeature?.title}
            >
                {selectedFeature?.detailedDescription}
            </Modal>
        </>
    );
};

export default Features;
