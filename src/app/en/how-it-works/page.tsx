'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Modal from '@/components/ui/Modal';

const HowItWorksStructuredData = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "How TutorAI Works - Adaptive Cognitive Memory",
        "description": "Discover how TutorAI remembers your entire learning journey and adapts to your cognitive style to provide a personalized educational experience.",
        "url": "https://tutorai.org/en/how-it-works",
        "about": {
            "@type": "Thing",
            "name": "Adaptive Cognitive Memory System",
            "description": "Proprietary technology that allows TutorAI to remember student preferences, gaps, progress and optimize learning"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};


const HowItWorksPage = () => {
    const [selectedFeature, setSelectedFeature] = useState(null);
    
    const cognitiveFeatures = [
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>,
            title: "Permanent Cognitive Profile",
            description: "TutorAI builds and maintains a complete profile of your cognitive abilities, learning preferences, and study style.",
            details: [
                "Analyzes your learning style (visual, auditory, kinesthetic)",
                "Remembers your explanation and presentation preferences",
                "Identifies your strengths and areas for improvement",
                "Tracks the evolution of your skills over time"
            ],
            detailedDescription: "Unlike traditional tutors who forget everything at the end of each lesson, TutorAI builds a permanent cognitive profile that evolves with you. Every question, every success, every difficulty becomes part of your educational story, enabling increasingly personalized and targeted support."
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>,
            title: "Performance Memory",
            description: "Every exercise, every question, every interaction is analyzed to understand your learning patterns.",
            details: [
                "Records which exercises were most successful",
                "Monitors reaction times and concentration levels",
                "Identifies your most productive study times and contexts",
                "Analyzes the effectiveness of different teaching methods for you"
            ],
            detailedDescription: "TutorAI uses advanced machine learning algorithms to analyze your cognitive style, gaps, and strengths. The AI creates a unique learning profile that is constantly updated based on your progress. This allows for personalizing every lesson, exercise, and explanation to maximize your understanding and retention."
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>,
            title: "Complete History",
            description: "Unlike traditional tutors, TutorAI never forgets. Every session enriches its understanding of how you learn.",
            details: [
                "Preserves complete history of your study sessions",
                "Intelligent connections between topics and learned concepts",
                "Identifies recurring gaps or misconceptions",
                "Detailed progression for each subject and topic"
            ],
            detailedDescription: "The system automatically identifies gaps in your knowledge through intelligent diagnostic tests and performance analysis. Once identified, TutorAI creates a targeted recovery path that fills these gaps progressively and logically. This approach ensures there are no 'holes' in your preparation that could compromise future learning."
        },
        {
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>,
            title: "Detailed Reports for Parents",
            description: "Thanks to detailed memory, TutorAI generates accurate reports on real engagement and student progress.",
            details: [
                "Actual concentration time during sessions",
                "Quality of engagement and active participation",
                "Concrete progress and areas needing more attention",
                "Personalized recommendations to optimize studying"
            ],
            detailedDescription: "Thanks to detailed memory, TutorAI generates accurate reports on real engagement and student progress. Reports include actual concentration time, quality of engagement, concrete progress metrics, and personalized recommendations to optimize studying - all based on concrete data rather than subjective impressions."
        }
    ];

    const adaptiveProcess = [
        {
            step: "01",
            title: "Initial Analysis",
            description: "TutorAI analyzes your learning style through natural interactions, without invasive testing."
        },
        {
            step: "02", 
            title: "Profile Building",
            description: "Every answer, question, and interaction contributes to building your unique and detailed cognitive profile."
        },
        {
            step: "03",
            title: "Continuous Adaptation",
            description: "The system constantly adapts, modifying approach, difficulty, and methodology based on your progress."
        },
        {
            step: "04",
            title: "Permanent Memory",
            description: "Everything is remembered and used to improve every future interaction, creating an increasingly personalized experience."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen-safe">
            <HowItWorksStructuredData />
            
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
                        <Link href="/en" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-white to-gray-100 text-blue-600 rounded-2xl mb-6 border-2 border-white shadow-2xl">
                                {/* Brain with Neural Connections Icon - more representative for cognitive memory */}
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m-3-3h6" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14h8" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18h6" />
                                </svg>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Memory that
                                <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                                    Evolves with You
                                </span>
                            </h1>
                            
                            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                                Discover how TutorAI remembers your entire journey, not just today's lesson. 
                                Technology that builds a permanent cognitive profile for truly personalized learning.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/en/beta-access" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                                    🚀 Request Beta Access
                                </Link>
                                <Link href="#features" className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                                    🧠 Discover How It Works
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
                            The First Tutor That Never Forgets
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Traditional tutors forget everything at the end of each lesson. TutorAI instead builds day by day 
                            an increasingly deeper understanding of how you learn, what works best for you, and where you need more support.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
                            <p className="text-gray-800 italic">
                                "Imagine a tutor who remembers exactly which explanation helped you most 6 months ago, 
                                what mistakes you make most often, and how you respond best when you're tired. This is TutorAI."
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
                                <div 
                                    className="relative bg-white/70 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col cursor-pointer"
                                    onClick={() => setSelectedFeature(feature)}
                                >
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
                                    <div className="mt-4 flex justify-end">
                                        <div className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                            Click to learn more
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
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
                                    How{' '}
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Adaptation
                                    </span>{' '}
                                    Works
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
                                        alt="Cognitive adaptation and personalized learning" 
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
                                        The{' '}
                                        <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                            Fundamental Difference
                                        </span>
                                    </h2>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                                            <h3 className="font-bold text-white mb-4 text-lg">🎓 Traditional Tutor</h3>
                                            <ul className="text-white/80 space-y-3 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Starts from scratch each lesson
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Doesn't remember your preferences
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Standardized approach
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Limited by human memory
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-400 mt-1">✕</span>
                                                    Subjective and generic reports
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-6 rounded-2xl border border-white/30">
                                            <h3 className="font-bold text-white mb-4 text-lg">🤖 TutorAI</h3>
                                            <ul className="text-white/90 space-y-3 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Builds on every past interaction
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Remembers your entire journey
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Completely personalized approach
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Unlimited and precise memory
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-400 mt-1">✓</span>
                                                    Detailed reports based on concrete data
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
                                <h3 className="font-bold text-gray-900 mb-2">Privacy & Security</h3>
                                <p className="text-gray-700">
                                    All data is encrypted and protected according to GDPR standards. 
                                    TutorAI's memory is used exclusively to improve your educational experience 
                                    and is never shared with third parties.
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* CTA */}
                <AnimateOnScroll>
                    <div className="text-center bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-8">
                        <h2 className="text-3xl font-bold mb-4">
                            Experience the Difference
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Try TutorAI and discover what it means to have a tutor that truly remembers everything about you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/en/beta-access" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Request Beta Access
                            </Link>
                            <Link href="/en/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>

            {/* Modal for feature details */}
            <Modal 
                isOpen={!!selectedFeature} 
                onClose={() => setSelectedFeature(null)} 
                title={selectedFeature?.title}
            >
                {selectedFeature?.detailedDescription}
            </Modal>
        </div>
    );
};

export default HowItWorksPage;