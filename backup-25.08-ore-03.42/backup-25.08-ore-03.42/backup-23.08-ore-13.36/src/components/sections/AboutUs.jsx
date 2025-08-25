'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

// CONTENUTI POTENTI ISPIRATI ALLA TUA INDICAZIONE
const aboutContent = {
    experience: {
        title: "La Nostra Esperienza: Nati sul Campo",
        content: (
            <>
                <p className="mb-4">TutorAI non è nato in un laboratorio, ma tra i banchi di una scuola vera. I nostri fondatori hanno passato **anni a insegnare**, affrontando quotidianamente la frustrazione di un sistema educativo "taglia unica".</p>
                <p className="mb-4">Abbiamo visto studenti brillanti perdersi perché nessuno parlava la loro lingua. Abbiamo visto la demotivazione nascere da difficoltà non comprese. È da questa esperienza diretta che nasce la nostra ossessione: creare uno strumento che si adatti a ogni singola mente, non il contrario.</p>
                <p className="font-semibold">Non siamo solo tecnologi; siamo prima di tutto educatori che usano la tecnologia per risolvere problemi reali.</p>
            </>
        )
    },
    technology: {
        title: "La Tecnologia: Un'IA con un Cuore Umano",
        content: (
            <>
                <p className="mb-4">La nostra intelligenza artificiale è diversa. È stata addestrata non solo su dati accademici, ma anche su principi di psicologia cognitiva, neuroscienze e pedagogia. Il suo obiettivo non è solo "dare la risposta giusta".</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                    <li><strong>Ascolta e Comprende:</strong> Analizza lo stile di apprendimento per adattare ogni spiegazione.</li>
                    <li><strong>Ricorda e Supporta:</strong> Mantiene una memoria completa delle difficoltà per costruire basi solide.</li>
                    <li><strong>Incoraggia e Motiva:</strong> È progettata per essere un partner empatico, che celebra i successi e aiuta a superare gli ostacoli.</li>
                </ul>
                <p className="font-semibold">Abbiamo costruito un'IA che non sostituisce l'empatia, ma la amplifica su larga scala.</p>
            </>
        )
    },
    vision: {
        title: "La Visione: Un'Educazione d'Elite per Tutti",
        content: (
            <>
                <p className="mb-4">Crediamo che un'educazione su misura non debba essere un lusso per pochi. La nostra visione è democratizzare l'accesso a un supporto didattico di altissima qualità, quello che finora solo le famiglie più abbienti potevano permettersi.</p>
                <p className="font-semibold">Vogliamo eliminare le barriere economiche e geografiche, dando a ogni studente, ovunque si trovi, la possibilità di raggiungere il suo massimo potenziale accademico ed umano.</p>
            </>
        )
    }
}

const AboutUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });

    const handleOpenModal = (contentKey) => {
        setModalContent(aboutContent[contentKey]);
        setIsModalOpen(true);
    };

    return (
        <>
            <section id="about-us" className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                            Un'intelligenza artificiale con un cuore umano
                        </h2>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
                           Siamo un team di psicologi, pedagogisti, neuroscienziati e ingegneri AI uniti da un'unica missione: rivoluzionare l'educazione.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card Esperienza */}
                        <div onClick={() => handleOpenModal('experience')} className="bg-surface p-8 rounded-2xl text-center flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:bg-gray-100 border border-gray-200">
                            <h3 className="text-2xl font-bold text-primary">Esperienza</h3>
                            <p className="mt-4 text-text-secondary flex-grow">Nati sul campo, tra i banchi di scuola. Non siamo solo tecnologi, ma prima di tutto educatori...</p>
                            <span className="mt-6 font-semibold text-primary">Scopri di più →</span>
                        </div>
                         {/* Card Tecnologia */}
                        <div onClick={() => handleOpenModal('technology')} className="bg-surface p-8 rounded-2xl text-center flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:bg-gray-100 border border-gray-200">
                            <h3 className="text-2xl font-bold text-primary">Tecnologia</h3>
                            <p className="mt-4 text-text-secondary flex-grow">Un'IA con un cuore umano, addestrata su psicologia cognitiva e neuroscienze...</p>
                            <span className="mt-6 font-semibold text-primary">Scopri di più →</span>
                        </div>
                         {/* Card Visione */}
                        <div onClick={() => handleOpenModal('vision')} className="bg-surface p-8 rounded-2xl text-center flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:bg-gray-100 border border-gray-200">
                            <h3 className="text-2xl font-bold text-primary">Visione</h3>
                            <p className="mt-4 text-text-secondary flex-grow">Un'educazione d'elite per tutti. Democratizzare l'accesso a un supporto di altissima qualità...</p>
                            <span className="mt-6 font-semibold text-primary">Scopri di più →</span>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalContent.title}
            >
                {modalContent.content}
            </Modal>
        </>
    );
};

export default AboutUs;
