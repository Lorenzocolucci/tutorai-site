export default function Pricing() {
  return (
    <section id="pricing" className="section bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prezzi Trasparenti</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Scegli il piano che si adatta alle tue esigenze. 
            Tutti i piani includono accesso completo a TutorAI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Piano Mensile */}
          <div className="card text-center relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Mensile</h3>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">€99,90</div>
              <div className="text-slate-600">al mese</div>
            </div>
            
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Accesso completo a TutorAI
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Tutte le materie e curricula
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Supporto 24/7
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Progress tracking
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Cancellazione quando vuoi
              </li>
            </ul>
            
            <button className="btn-ghost w-full">Inizia Ora</button>
          </div>
          
          {/* Piano Annuale - Consigliato */}
          <div className="card text-center relative border-2 border-indigo-600 bg-indigo-50">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Più Popolare
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Annuale</h3>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">€1.199</div>
              <div className="text-slate-600 mb-2">all'anno</div>
              <div className="text-sm text-green-600 font-semibold">Risparmi €400</div>
            </div>
            
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Tutto del piano mensile
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Sconto del 25%
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priorità nel supporto
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Funzionalità beta esclusive
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Report dettagliati mensili
              </li>
            </ul>
            
            <button className="btn-primary w-full">Scegli Annuale</button>
          </div>
          
          {/* Piano Famiglia */}
          <div className="card text-center relative">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Famiglia</h3>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">€1.899</div>
              <div className="text-slate-600">all'anno</div>
            </div>
            
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Fino a 3 studenti
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Profili separati
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Dashboard genitori
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Report familiari
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Supporto dedicato
              </li>
            </ul>
            
            <button className="btn-ghost w-full">Contattaci</button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Tutti i piani includono una garanzia di rimborso di 30 giorni
          </p>
          <p className="text-sm text-slate-500">
            * I prezzi sono IVA inclusa. Nessun costo nascosto.
          </p>
        </div>
      </div>
    </section>
  );
}
