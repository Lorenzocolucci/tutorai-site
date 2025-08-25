// Esempio di integrazione immagini Pricing/ROI
// Questo file mostra come usare le immagini scaricate nella sezione Pricing

import Image from 'next/image';

const PricingImages = () => {
  return (
    <div className="pricing-images-container">
      {/* Immagine Salvadanaio */}
      <div className="piggy-bank-image">
        <Image
          src="/assets/pricing/pricing-piggy-01.jpg"
          alt="Salvadanaio bianco minimal"
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Immagine Monete */}
      <div className="coins-image">
        <Image
          src="/assets/pricing/pricing-coins-01.jpg"
          alt="Monete su superficie bianca"
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Sezione ROI con immagini */}
      <div className="roi-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Costi tradizionali */}
          <div className="traditional-costs">
            <div className="image-container mb-4">
              <Image
                src="/assets/pricing/pricing-coins-01.jpg"
                alt="Costi ripetizioni tradizionali"
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-red-600">Ripetizioni Tradizionali</h3>
            <p className="text-gray-600">Costi elevati e risultati incerti</p>
          </div>

          {/* Risparmio TutorAI */}
          <div className="tutorai-savings">
            <div className="image-container mb-4">
              <Image
                src="/assets/pricing/pricing-piggy-01.jpg"
                alt="Risparmio con TutorAI"
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-green-600">TutorAI</h3>
            <p className="text-gray-600">Risparmio fino al 76%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingImages;
