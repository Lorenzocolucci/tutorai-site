'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const ComeFunzionaStructuredData = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Come Funziona TutorAI - Memoria Cognitiva Adattiva",
        "description": "Scopri come TutorAI ricorda tutto il tuo percorso di apprendimento e si adatta al tuo stile cognitivo per offrirti un'esperienza educativa personalizzata.",
        "url": "https://tutorai.org/come-funziona",
        "about": {
            "@type": "Thing",
            "name": "Sistema di Memoria Cognitiva Adattiva",
            "description": "Tecnologia proprietaria che permette a TutorAI di ricordare le preferenze dello studente, le lacune, i progressi e ottimizzare l'apprendimento"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

const FeatureCard = ({ icon, title, description, details }) => (
    <div className="perspective-container">
        <div className="card-oblique glowing-border-follow bg-white p-8 transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg flex items-center justify-center mr-4">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
            <ul className="text-sm text-gray-500 space-y-2">
                {details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {detail}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const ComeFunzionaPage = () => {
    const cognitiveFeatures = [
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>,
            title: "Profilo Cognitivo Permanente",
            description: "TutorAI costruisce e mantiene un profilo completo delle tue capacità cognitive, preferenze di apprendimento e stile di studio.",
            details: [
                "Analizza il tuo stile di apprendimento (visuale, auditivo, cinestetico)",
                "Memorizza le tue preferenze di spiegazione e presentazione",
                "Identifica i tuoi punti di forza e le aree di miglioramento",
                "Traccia l'evoluzione delle tue competenze nel tempo"
            ]
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>,
            title: "Memoria delle Performance",
            description: "Ogni esercizio, ogni domanda, ogni interazione viene analizzata per comprendere i tuoi pattern di apprendimento.",
            details: [
                "Registra quali esercizi hanno avuto maggiore successo",
                "Monitora i tempi di reazione e concentrazione",
                "Identifica gli orari e contesti di studio più produttivi",
                "Analizza l'efficacia di diversi metodi didattici per te"
            ]
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>,
            title: "Cronologia Completa",
            description: "A differenza dei tutor tradizionali, TutorAI non dimentica mai. Ogni sessione arricchisce la sua comprensione di come impari.",
            details: [
                "Conserva la storia completa delle tue sessioni di studio",
                "Collegamento intelligente tra argomenti e concetti appresi",
                "Identificazione di lacune ricorrenti o misconcezioni",
                "Progressione dettagliata per ogni materia e argomento"
            ]
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>,
            title: "Report Dettagliati per Genitori",
            description: "Grazie alla memoria dettagliata, TutorAI genera report accurati sull'impegno reale e i progressi dello studente.",
            details: [
                "Tempo effettivo di concentrazione durante le sessioni",
                "Qualità dell'impegno e partecipazione attiva",
                "Progressi concreti e aree che necessitano più attenzione",
                "Raccomandazioni personalizzate per ottimizzare lo studio"
            ]
        }
    ];

    const adaptiveProcess = [
        {
            step: "01",
            title: "Analisi Iniziale",
            description: "TutorAI analizza il tuo stile di apprendimento attraverso una serie di interazioni naturali, senza test invasivi."
        },
        {
            step: "02", 
            title: "Costruzione del Profilo",
            description: "Ogni risposta, domanda e interazione contribuisce a costruire il tuo profilo cognitivo unico e dettagliato."
        },
        {
            step: "03",
            title: "Adattamento Continuo",
            description: "Il sistema si adatta costantemente, modificando approccio, difficoltà e metodologia in base ai tuoi progressi."
        },
        {
            step: "04",
            title: "Memoria Permanente",
            description: "Tutto viene ricordato e utilizzato per migliorare ogni futura interazione, creando un'esperienza sempre più personalizzata."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <ComeFunzionaStructuredData />
            
            {/* Hero Section with Background Image */}
            <div className="relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/assets/how-it-works/cognitive-memory-hero.webp" 
                        alt="Neural network representing cognitive memory" 
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/70 to-indigo-600/80"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Torna alla Home
                        </Link>
                        
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-white to-gray-100 text-blue-600 rounded-2xl mb-6 border-2 border-white shadow-2xl">
                                {/* Icona Cervello con Connessioni Neurali - più rappresentativa per la memoria cognitiva */}
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m-3-3h6" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14h8" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18h12" />
                                </svg>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Memoria che
                                <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                                    Evolve con Te
                                </span>
                            </h1>
                            
                            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                                Scopri come TutorAI ricorda tutto il tuo percorso, non solo la lezione di oggi. 
                                Una tecnologia che costruisce un profilo cognitivo permanente per un apprendimento davvero personalizzato.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/beta-access" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                                    🚀 Richiedi Accesso Beta
                                </Link>
                                <Link href="#features" className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                                    🧠 Scopri Come Funziona
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Concept */}
            <div className="container mx-auto px-6 py-16">
                <AnimateOnScroll>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Il Primo Tutor che Non Dimentica Mai
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            I tutor tradizionali dimenticano tutto a fine lezione. TutorAI invece costruisce giorno dopo giorno 
                            una comprensione sempre più profonda di come apprendi, cosa ti funziona meglio e dove hai bisogno di più supporto.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                            <p className="text-gray-800 italic">
                                "Immagina un tutor che ricorda esattamente quale spiegazione ti ha aiutato di più 6 mesi fa, 
                                quali errori fai più spesso, e come reagisci meglio quando sei stanco. Questo è TutorAI."
                            </p>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Cognitive Features Grid */}
                <AnimateOnScroll>
                    <div id="features" className="grid md:grid-cols-2 gap-8 mb-16">
                        {cognitiveFeatures.map((feature, index) => (
                            <div key={index} className="group relative h-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
                                <div className="relative bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                                    <div className="flex items-start gap-6 mb-6">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 flex-grow">
                                        {feature.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start gap-3 text-sm text-gray-600">
                                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="flex-1">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </AnimateOnScroll>

                {/* Process Flow with Image */}
                <AnimateOnScroll>
                    <div className="mb-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl"></div>
                        <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Come Avviene l'
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Adattamento
                                    </span>
                                </h2>
                                <div className="space-y-8">
                                    {adaptiveProcess.map((process, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                                    {process.step}
                                                </div>
                                            </div>
                                            <div className="flex-grow pt-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">{process.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-purple-200/50 rounded-3xl blur-2xl"></div>
                                <div className="relative">
                                    <Image 
                                        src="/assets/features/learning-styles-new.webp" 
                                        alt="Adattamento cognitivo e personalizzazione dell'apprendimento" 
                                        width={600}
                                        height={600}
                                        className="rounded-3xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Key Difference with Visual */}
                <AnimateOnScroll>
                    <div className="relative mb-16">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl"></div>
                        <div className="relative text-white p-8 lg:p-16">
                            <div className="grid lg:grid-cols-3 gap-8 items-center">
                                <div className="lg:col-span-2">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                                        La Differenza{' '}
                                        <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                            Fondamentale
                                        </span>
                                    </h2>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                                            <h3 className="font-bold text-white mb-4 text-lg">🎓 Tutor Tradizionale</h3>
                                            <ul className="text-white/80 space-y-3 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Ricomincia da zero ogni lezione
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Non ricorda le tue preferenze
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Approccio standardizzato
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Limitato dalla memoria umana
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Report soggettivi e generici
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-6 rounded-2xl border border-white/30">
                                            <h3 className="font-bold text-white mb-4 text-lg">🤖 TutorAI</h3>
                                            <ul className="text-white/90 space-y-3 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Costruisce su ogni interazione passata
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Ricorda tutto il tuo percorso
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Approccio completamente personalizzato
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Memoria illimitata e precisa
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Report dettagliati basati su dati concreti
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-2xl"></div>
                                    <div className="relative">
                                        <Image 
                                            src="/assets/how-it-works/digital-learning.webp" 
                                            alt="Digital learning vs traditional comparison" 
                                            width={400}
                                            height={400}
                                            className="rounded-3xl shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Privacy Note */}
                <AnimateOnScroll>
                    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-16">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-green-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Privacy e Sicurezza</h3>
                                <p className="text-gray-700">
                                    Tutti i dati sono criptati e protetti secondo gli standard GDPR. 
                                    La memoria di TutorAI è utilizzata esclusivamente per migliorare la tua esperienza educativa 
                                    e non viene mai condivisa con terze parti.
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* CTA */}
                <AnimateOnScroll>
                    <div className="text-center bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-4">
                            Sperimenta la Differenza
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Prova TutorAI e scopri cosa significa avere un tutor che ricorda davvero tutto di te.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/beta-access" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Richiedi Accesso Beta
                            </Link>
                            <Link href="/contatti" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                                Contattaci
                            </Link>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </div>
    );
};

export default ComeFunzionaPage;