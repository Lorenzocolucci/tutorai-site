'use client'; // Necessario per la gestione dello stato (useState)

import { useState, useMemo } from 'react';

const ROI = () => {
  const [hours, setHours] = useState(2);
  const [subjects, setSubjects] = useState(2);
  const [cost, setCost] = useState(25);

  const tutorAiCost = 1199;

  // Calcolo dinamico con useMemo per ottimizzare le performance
  const traditionalCost = useMemo(() => {
    return hours * subjects * cost * 40; // 40 settimane scolastiche
  }, [hours, subjects, cost]);

  const savings = useMemo(() => {
    return traditionalCost - tutorAiCost;
  }, [traditionalCost, tutorAiCost]);

  const savingsPercentage = useMemo(() => {
    if (traditionalCost === 0) return 0;
    return Math.round((savings / traditionalCost) * 100);
  }, [savings, traditionalCost]);

  // Funzione per formattare in valuta
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <section id="roi" className="py-20 bg-surface">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Smetti di pagare per lezioni private inefficaci
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Usa i cursori per confrontare il costo annuo delle ripetizioni tradizionali con TutorAI e scopri il risparmio.
          </p>
        </div>
        
        {/* Sliders */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <label htmlFor="hours" className="block font-semibold mb-2 text-text-primary">Ore di ripetizioni / settimana</label>
            <input id="hours" type="range" min="1" max="10" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <span className="text-2xl font-bold text-primary">{hours} ore</span>
          </div>
          <div className="text-center">
            <label htmlFor="subjects" className="block font-semibold mb-2 text-text-primary">Numero di materie</label>
            <input id="subjects" type="range" min="1" max="5" value={subjects} onChange={(e) => setSubjects(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <span className="text-2xl font-bold text-primary">{subjects} materie</span>
          </div>
          <div className="text-center">
            <label htmlFor="cost" className="block font-semibold mb-2 text-text-primary">Costo orario medio</label>
            <input id="cost" type="range" min="20" max="60" value={cost} onChange={(e) => setCost(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <span className="text-2xl font-bold text-primary">{formatCurrency(cost)} / ora</span>
          </div>
        </div>

        {/* Risultati */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Colonna Ripetizioni Tradizionali */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-text-primary">❌ Ripetizioni Tradizionali</h3>
            <div className="text-center my-6">
              <span className="block text-text-secondary">Costo Annuo Stimato</span>
              <span className="block text-5xl font-bold text-red-500">{formatCurrency(traditionalCost)}</span>
            </div>
            <ul className="space-y-2 text-text-secondary">
              <li>- Stesso metodo per tutti</li>
              <li>- Nessuna memoria delle difficoltà</li>
              <li>- Orari fissi e scomodi</li>
            </ul>
          </div>
          {/* Colonna TutorAI */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-text-primary">✅ TutorAI</h3>
            <div className="text-center my-6">
              <span className="block text-text-secondary">Costo Annuo Fisso</span>
              <span className="block text-5xl font-bold text-success">{formatCurrency(tutorAiCost)}</span>
            </div>
            <ul className="space-y-2 text-text-secondary">
              <li>+ Metodo 100% personalizzato</li>
              <li>+ Memoria completa dei progressi</li>
              <li>+ Disponibile 24/7, ovunque</li>
            </ul>
          </div>
        </div>
        
        {/* Box Risparmio */}
        <div className="mt-10 text-center bg-primary/10 border border-primary/30 max-w-4xl mx-auto p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-text-primary">Il Tuo Risparmio Totale</h3>
          <p className="text-6xl font-extrabold my-3 text-primary animate-pulse">
            {formatCurrency(savings)}
          </p>
          <p className="text-2xl font-semibold text-text-secondary">
            Pari a un risparmio del {savingsPercentage}% ogni anno!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROI;
