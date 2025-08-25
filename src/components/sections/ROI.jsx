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
          <section id="roi" className="py-16 bg-surface">
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
          <div className="perspective-container">
            <div className="card-border-animated bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
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
          </div>
          {/* Colonna TutorAI */}
          <div className="perspective-container">
            <div className="card-border-animated bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
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
        </div>
        
                 {/* Box Risparmio */}
         <div className="perspective-container mt-10">
           <div className="card-border-animated text-center bg-white/80 border border-primary/30 max-w-4xl mx-auto p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-text-primary">Il Tuo Risparmio Totale</h3>
            <p className="text-6xl font-extrabold my-3 text-primary animate-pulse">
              {formatCurrency(savings)}
            </p>
            <p className="text-2xl font-semibold text-text-secondary">
              Pari a un risparmio del {savingsPercentage}% ogni anno!
            </p>
          </div>
        </div>
        
                 {/* Grafico a barre di altissimo livello con effetti reali */}
         <div className="mt-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-text-primary">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Confronto Visivo dei Costi
            </span>
          </h3>
          
          {/* Container del grafico avanzato */}
          <div className="max-w-6xl mx-auto">
            {/* Griglia di sfondo animata */}
            <div className="relative h-[500px] mb-12 overflow-hidden">
              {/* Linee orizzontali animate */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 20, 40, 60, 80, 100].map((line, index) => (
                  <div key={line} className="relative">
                    <div className="border-b border-gray-200/20 h-0"></div>
                    <div 
                      className="absolute -top-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                ))}
              </div>
              
              {/* Particelle fluttuanti di sfondo */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Barre del grafico avanzate */}
              <div className="flex items-end justify-center gap-20 h-full relative z-10">
                {/* Barra Tradizionale - Rosso con effetti avanzati */}
                <div className="flex flex-col items-center group">
                  <div className="text-center mb-6 transform transition-all duration-500 group-hover:scale-110">
                    <h4 className="font-bold text-xl text-text-primary mb-2">Tradizionale</h4>
                    <p className="text-text-secondary text-lg">{formatCurrency(traditionalCost)}</p>
                  </div>
                  
                  {/* Barra principale con effetti 3D */}
                  <div className="relative">
                    {/* Ombra 3D */}
                    <div 
                      className="absolute -bottom-2 left-2 w-24 h-2 bg-red-900/50 rounded-full blur-sm transform rotate-12"
                      style={{ height: `${Math.max((traditionalCost / 5000) * 400, 50)}px` }}
                    ></div>
                    
                    {/* Barra principale con gradiente e animazione */}
                    <div 
                      className="w-24 rounded-t-lg relative overflow-hidden transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
                      style={{ 
                        height: `${Math.max((traditionalCost / 5000) * 400, 50)}px`,
                        background: 'linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {/* Effetto luminoso interno */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent"></div>
                      
                      {/* Particelle animate */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                          style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                      
                      {/* Effetto di brillantezza che si muove */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                    
                    {/* Etichetta animata */}
                    <div className="mt-4 text-center transform transition-all duration-300 group-hover:scale-110">
                      <span className="text-sm font-medium text-text-secondary">Costo Annuo</span>
                    </div>
                  </div>
                </div>

                {/* Barra TutorAI - Verde con effetti avanzati */}
                <div className="flex flex-col items-center group">
                  <div className="text-center mb-6 transform transition-all duration-500 group-hover:scale-110">
                    <h4 className="font-bold text-xl text-text-primary mb-2">TutorAI</h4>
                    <p className="text-text-secondary text-lg">{formatCurrency(tutorAiCost)}</p>
                  </div>
                  
                  {/* Barra principale con effetti 3D */}
                  <div className="relative">
                    {/* Ombra 3D */}
                    <div 
                      className="absolute -bottom-2 left-2 w-24 h-2 bg-green-900/50 rounded-full blur-sm transform rotate-12"
                      style={{ height: `${Math.max((tutorAiCost / 5000) * 400, 50)}px` }}
                    ></div>
                    
                    {/* Barra principale con gradiente e animazione */}
                    <div 
                      className="w-24 rounded-t-lg relative overflow-hidden transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
                      style={{ 
                        height: `${Math.max((tutorAiCost / 5000) * 400, 50)}px`,
                        background: 'linear-gradient(180deg, #10b981 0%, #059669 50%, #047857 100%)',
                        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {/* Effetto luminoso interno */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent"></div>
                      
                      {/* Particelle animate */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                          style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                      
                      {/* Effetto di brillantezza che si muove */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                    
                    {/* Etichetta animata */}
                    <div className="mt-4 text-center transform transition-all duration-300 group-hover:scale-110">
                      <span className="text-sm font-medium text-text-secondary">Costo Annuo</span>
                    </div>
                  </div>
                </div>

                {/* Barra Risparmio - Blu con effetti avanzati */}
                <div className="flex flex-col items-center group">
                  <div className="text-center mb-6 transform transition-all duration-500 group-hover:scale-110">
                    <h4 className="font-bold text-xl text-text-primary mb-2">Risparmio</h4>
                    <p className="text-text-secondary text-lg">{formatCurrency(savings)}</p>
                  </div>
                  
                  {/* Barra principale con effetti 3D */}
                  <div className="relative">
                    {/* Ombra 3D */}
                    <div 
                      className="absolute -bottom-2 left-2 w-24 h-2 bg-blue-900/50 rounded-full blur-sm transform rotate-12"
                      style={{ height: `${Math.max((savings / 5000) * 400, 50)}px` }}
                    ></div>
                    
                    {/* Barra principale con gradiente e animazione */}
                    <div 
                      className="w-24 rounded-t-lg relative overflow-hidden transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                      style={{ 
                        height: `${Math.max((savings / 5000) * 400, 50)}px`,
                        background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {/* Effetto luminoso interno */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent"></div>
                      
                      {/* Particelle animate */}
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                          style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                      
                      {/* Effetto di brillantezza che si muove */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                    
                    {/* Etichetta animata */}
                    <div className="mt-4 text-center transform transition-all duration-300 group-hover:scale-110">
                      <span className="text-sm font-medium text-text-secondary">Risparmio Annuo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Statistiche aggiuntive con effetti */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">{savingsPercentage}%</div>
                <div className="text-text-secondary">Risparmio Percentuale</div>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{Math.round(savings / 100)}</div>
                <div className="text-text-secondary">Ore di Lezioni Risparmiate</div>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{Math.round(savings / 25)}</div>
                <div className="text-text-secondary">Settimane di Lavoro</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROI;
