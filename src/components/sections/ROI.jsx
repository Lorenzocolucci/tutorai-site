'use client';

import { useState, useMemo } from 'react';

const ROI = () => {
  const [hours, setHours] = useState(3);
  const [subjects, setSubjects] = useState(2);
  const [cost, setCost] = useState(35);
  const tutorAiCost = 1199;

  const traditionalCost = useMemo(() => {
    return hours * subjects * cost * 40;
  }, [hours, subjects, cost]);

  const savings = useMemo(() => {
    return traditionalCost - tutorAiCost;
  }, [traditionalCost, tutorAiCost]);

  const savingsPercentage = useMemo(() => {
    if (traditionalCost === 0) return 0;
    return Math.round((savings / traditionalCost) * 100);
  }, [savings, traditionalCost]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="roi" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-success/20 inline-block rounded-full px-6 py-2 mb-4 border border-success/30">
            <span className="text-success font-semibold">💰 Risparmio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smetti di pagare per lezioni private inefficaci
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Usa i cursori per confrontare il costo annuo delle ripetizioni tradizionali 
            con TutorAI e scopri il risparmio.
          </p>
        </div>

        {/* Calcolatore */}
        <div className="max-w-4xl mx-auto">
          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label htmlFor="hours" className="block font-semibold mb-4 text-center">
                Ore di ripetizioni / settimana
              </label>
              <input 
                id="hours" 
                type="range" 
                min="1" 
                max="10" 
                value={hours} 
                onChange={(e) => setHours(Number(e.target.value))} 
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-4">
                <span className="text-3xl font-bold text-secondary">{hours} ore</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label htmlFor="subjects" className="block font-semibold mb-4 text-center">
                Numero di materie
              </label>
              <input 
                id="subjects" 
                type="range" 
                min="1" 
                max="5" 
                value={subjects} 
                onChange={(e) => setSubjects(Number(e.target.value))} 
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-4">
                <span className="text-3xl font-bold text-secondary">{subjects} materie</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label htmlFor="cost" className="block font-semibold mb-4 text-center">
                Costo orario medio
              </label>
              <input 
                id="cost" 
                type="range" 
                min="20" 
                max="60" 
                value={cost} 
                onChange={(e) => setCost(Number(e.target.value))} 
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center mt-4">
                <span className="text-3xl font-bold text-secondary">{formatCurrency(cost)} / ora</span>
              </div>
            </div>
          </div>

          {/* Confronto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Ripetizioni Tradizionali */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">❌ Ripetizioni Tradizionali</h3>
              <div className="text-center mb-6">
                <span className="block text-slate-300 text-sm">Costo Annuo Stimato</span>
                <span className="block text-5xl font-bold text-red-400">{formatCurrency(traditionalCost)}</span>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  Stesso metodo per tutti
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  Nessuna memoria delle difficoltà
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  Orari fissi e scomodi
                </li>
              </ul>
            </div>

            {/* TutorAI */}
            <div className="bg-success/10 border border-success/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">✅ TutorAI</h3>
              <div className="text-center mb-6">
                <span className="block text-slate-300 text-sm">Costo Annuo Fisso</span>
                <span className="block text-5xl font-bold text-success">{formatCurrency(tutorAiCost)}</span>
              </div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span>
                  Metodo 100% personalizzato
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span>
                  Memoria completa dei progressi
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">•</span>
                  Disponibile 24/7, ovunque
                </li>
              </ul>
            </div>
          </div>

          {/* Risparmio */}
          <div className="bg-gradient-to-r from-secondary/20 to-primary/20 border border-secondary/40 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Il Tuo Risparmio Totale</h3>
            <p className="text-6xl font-extrabold mb-3 text-yellow-300 animate-pulse">
              {formatCurrency(savings)}
            </p>
            <p className="text-2xl font-semibold text-slate-200">
              Pari a un risparmio del {savingsPercentage}% ogni anno!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8B5CF6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
};

export default ROI;
