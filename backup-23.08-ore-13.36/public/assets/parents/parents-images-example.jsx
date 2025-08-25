// Esempio di integrazione immagini Parents/Fiducia
// Questo file mostra come usare le immagini scaricate nella sezione Parents

import Image from 'next/image';

const ParentsImages = () => {
  return (
    <div className="parents-images-container">
      {/* Illustrazione Mamma e Figlia */}
      <div className="mother-daughter-illustration">
        <Image
          src="/assets/parents/parents-illu-01.svg"
          alt="Illustrazione mamma aiuta figlia con compiti"
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>

      {/* Immagine Bambini con Laptop */}
      <div className="kids-laptop-image">
        <Image
          src="/assets/parents/parents-kids-01.jpg"
          alt="Bambini studiano con laptop a casa"
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Sezione Fiducia per Genitori */}
      <div className="trust-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testo */}
          <div className="trust-content">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              I genitori si fidano di TutorAI
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Oltre 10.000 famiglie hanno scelto TutorAI per supportare l'educazione dei loro figli. 
              Un investimento sicuro nel futuro dei tuoi ragazzi.
            </p>
            <div className="trust-stats grid grid-cols-2 gap-6">
              <div className="stat">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-text-secondary">Genitori soddisfatti</div>
              </div>
              <div className="stat">
                <div className="text-3xl font-bold text-primary">76%</div>
                <div className="text-sm text-text-secondary">Risparmio medio</div>
              </div>
            </div>
          </div>

          {/* Immagine */}
          <div className="trust-image">
            <Image
              src="/assets/parents/parents-illu-01.svg"
              alt="Famiglia che usa TutorAI insieme"
              width={600}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Sezione Testimonianze Genitori */}
      <div className="parent-testimonials">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="testimonial-card bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Image
                src="/assets/parents/parents-kids-01.jpg"
                alt="Genitore testimonial"
                width={60}
                height={60}
                className="w-15 h-15 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-bold text-text-primary">Maria Rossi</h4>
                <p className="text-sm text-text-secondary">Mamma di Marco, 15 anni</p>
              </div>
            </div>
            <p className="text-text-secondary italic">
              "TutorAI ha cambiato completamente l'approccio di mio figlio allo studio. 
              Ora è più motivato e i risultati si vedono!"
            </p>
          </div>

          <div className="testimonial-card bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Image
                src="/assets/parents/parents-kids-01.jpg"
                alt="Genitore testimonial"
                width={60}
                height={60}
                className="w-15 h-15 rounded-full object-cover"
              />
              <div className="ml-4">
                <h4 className="font-bold text-text-primary">Giuseppe Bianchi</h4>
                <p className="text-sm text-text-secondary">Papà di Sofia, 13 anni</p>
              </div>
            </div>
            <p className="text-text-secondary italic">
              "Il risparmio è notevole e la qualità del supporto è superiore alle ripetizioni tradizionali. 
              Consigliatissimo!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsImages;
