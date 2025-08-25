// Esempio di integrazione immagini Features
// Questo file mostra come usare le immagini scaricate nella sezione Features

import Image from 'next/image';

const FeaturesImages = () => {
  return (
    <div className="features-images-container">
      {/* Illustrazione AI Chat */}
      <div className="ai-chat-illustration">
        <Image
          src="/assets/features/feat-ai-undraw.svg"
          alt="Illustrazione chat con AI"
          width={400}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* Illustrazione Neuroscienze */}
      <div className="neuroscience-illustration">
        <Image
          src="/assets/features/feat-ai-manypixels.svg"
          alt="Illustrazione cervello/AI"
          width={400}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* Immagine Tempo Reale */}
      <div className="realtime-image">
        <Image
          src="/assets/features/feat-realtime-01.jpg"
          alt="Orologio minimal"
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>

      {/* Illustrazione Personalizzazione */}
      <div className="personalization-illustration">
        <Image
          src="/assets/features/feat-persona-01.svg"
          alt="Illustrazione impronta/personalizzazione"
          width={400}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default FeaturesImages;
