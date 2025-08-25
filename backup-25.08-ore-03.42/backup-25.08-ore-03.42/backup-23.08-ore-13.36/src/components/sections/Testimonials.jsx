import Image from 'next/image';

const testimonialsData = [
  {
    name: 'Marco Serra',
    detail: '17 anni, Liceo Classico, Roma',
    quote: '"Lottavo con la matematica da sempre. TutorAI ha capito che ragiono per immagini e ha iniziato a spiegarmi i concetti con esempi legati all\'arte. Ha cambiato tutto."',
    result: 'Media in matematica: da 4.5 a 7',
    // IMMAGINE CORRETTA: Ragazzo credibile come 17enne, look da liceale italiano.
    imageUrl: '/assets/hero/pexels-max-fischer-5212657.jpg',
    alt: 'Ritratto realistico di uno studente di liceo di 17 anni.'
  },
  {
    name: 'Sofia Chen',
    detail: '16 anni, IB Programme, Milano',
    quote: '"Il programma IB è durissimo. Avere un supporto 24/7 che conosce esattamente il syllabus e le mie lacune in chimica mi ha salvato l\'anno."',
    result: 'IB Chemistry (HL): da 4 a 6',
    // IMMAGINE CORRETTA: Ragazza credibile come 16enne, ambiente di studio internazionale.
    imageUrl: '/assets/hero/pexels-max-fischer-5212687.jpg',
    alt: 'Ritratto di una studentessa di 16 anni in un ambiente accademico.'
  },
  {
    name: 'Leo Conti',
    detail: '13 anni, Scuole Medie, Bologna',
    quote: '"Avevo paura di fare domande in classe. Con TutorAI posso sbagliare mille volte e lui mi spiega tutto con calma, senza mai giudicare. Ora mi sento più sicuro."',
    result: 'Maggiore partecipazione in classe',
    // IMMAGINE CORRETTA: Ragazzo visibilmente più giovane, look da 13enne.
    imageUrl: '/assets/hero/pexels-tima-miroshnichenko-5303581.jpg',
    alt: 'Ritratto di uno studente di scuole medie di 13 anni sorridente e fiducioso.'
  },
  {
    name: 'Giulia Romano',
    detail: '18 anni, Liceo Scientifico, Napoli',
    quote: '"La preparazione per la Maturità è stata un incubo. Le simulazioni e le strategie anti-ansia di TutorAI sono state fondamentali per arrivare all\'esame preparata e tranquilla."',
    result: 'Esame di Maturità: 88/100',
    // IMMAGINE CORRETTA: Ragazza credibile come neodiplomata di 18 anni.
    imageUrl: '/assets/hero/pexels-vanessa-loring-7869245.jpg',
    alt: 'Ritratto di una studentessa di 18 anni che ha appena finito la maturità.'
  },
  {
    name: 'Adam Benali',
    detail: '15 anni, IGCSE, Torino',
    quote: '"Incredibile come impari da me. Ogni giorno le sue spiegazioni diventano più adatte al mio modo di pensare. È come avere un tutor che si evolve con te."',
    result: 'IGCSE Grades: da C ad A',
    // IMMAGINE CORRETTA: Ragazzo adolescente (non un uomo adulto), concentrato nello studio.
    imageUrl: '/assets/hero/pexels-tima-miroshnichenko-6671712.jpg',
    alt: 'Ritratto di uno studente di 15 anni concentrato sui suoi libri.'
  },
  {
    name: 'Alice Ferri',
    detail: '9 anni (e sua mamma), Elementari, Firenze',
    quote: '"Mia figlia odiava i compiti di matematica. Ora li fa giocando con TutorAI, che le spiega le cose con disegni e storie. Per me è un aiuto immenso."',
    result: 'Compiti fatti senza più capricci',
    // IMMAGINE CORRETTA: Bambina di circa 9 anni che studia felicemente.
    imageUrl: '/assets/parents/pexels-kampus-6297625.jpg',
    alt: 'Ritratto di una bambina di 9 anni che fa i compiti con un sorriso.'
  }
];

const statsData = [
    { value: '89%', label: 'Miglioramento dei voti' },
    { value: '75%', label: 'Riduzione tempo di studio' },
    { value: '91%', label: 'Studenti più motivati' },
    { value: 'Fino al 76%', label: 'Risparmio economico' },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-surface">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Le storie di chi ci è già riuscito</h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Studenti reali che hanno trasformato il loro rendimento e la loro sicurezza.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <Image 
                        src={testimonial.imageUrl} 
                        alt={testimonial.alt} 
                        fill
                        className="object-cover"
                        sizes="64px"
                    />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-text-primary text-lg">{testimonial.name}</p>
                  <p className="text-sm text-text-secondary">{testimonial.detail}</p>
                </div>
              </div>
              <p className="text-text-secondary italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="mt-auto bg-success/10 text-success font-bold text-center py-2 px-4 rounded-lg">
                {testimonial.result}
              </div>
            </div>
          ))}
        </div>
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {statsData.map(stat => (
            <div key={stat.label} className="px-2">
              <p className="text-3xl md:text-5xl font-extrabold text-primary leading-none">{stat.value}</p>
              <p className="mt-2 text-sm md:text-base text-text-secondary leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
