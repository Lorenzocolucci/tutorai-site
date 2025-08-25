// src/components/sections/AboutUs.jsx

'use client';

const AboutUs = () => {
    return (
        <section id="about-us" className="py-16 md:py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Un'intelligenza artificiale con un'anima da educatore
                    </h2>
                    <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
                        Non siamo partiti da un algoritmo, ma da 15 anni di esperienza nelle aule. Abbiamo unito psicologia, neuroscienze e la più avanzata IA per creare non solo uno strumento, ma un vero partner per l'apprendimento.
                    </p>
                    {/* Il bottone verrà renderizzato dalla homepage (page.tsx) per una migliore gestione */}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
