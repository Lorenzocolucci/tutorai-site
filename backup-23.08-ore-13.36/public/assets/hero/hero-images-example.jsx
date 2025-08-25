// Esempio di integrazione immagini Hero
// Questo file mostra come usare le immagini scaricate nella sezione Hero

import Image from 'next/image';

const HeroImages = () => {
  return (
    <div className="hero-images-container">
      {/* Immagine principale Hero */}
      <div className="hero-main-image">
        <Image
          src="/assets/hero/hero-teen-01.jpg"
          alt="Studente con cuffie studia al laptop da casa"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Immagine alternativa per mobile */}
      <div className="hero-mobile-image md:hidden">
        <Image
          src="/assets/hero/hero-teen-02.jpg"
          alt="Ragazza segue lezione online con cuffie e laptop"
          width={1080}
          height={1350}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Immagine per sezione fiducia/genitori */}
      <div className="family-section-image">
        <Image
          src="/assets/hero/family-hero-01.jpg"
          alt="Genitore supporta i figli nello studio con laptop"
          width={1200}
          height={800}
          className="w-full h-auto object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default HeroImages;
