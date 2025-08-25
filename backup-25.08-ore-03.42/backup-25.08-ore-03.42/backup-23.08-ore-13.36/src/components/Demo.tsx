export default function Demo() {
  return (
    <section id="demo" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Guarda TutorAI in azione</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Scopri come TutorAI adatta le spiegazioni al tuo stile di apprendimento e ti guida verso il successo
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-lg mb-3">🎯 Esempio di spiegazione personalizzata</h3>
              <p className="text-slate-600">
                "Vedo che preferisci esempi pratici. Invece di spiegare la formula, 
                partiamo da un problema reale che ti aiuterà a capire il concetto..."
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-lg mb-3">🧠 Adattamento in tempo reale</h3>
              <p className="text-slate-600">
                "Hai fatto un errore simile la settimana scorsa. Ricordi? 
                Facciamo un ripasso veloce prima di continuare..."
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-lg mb-3">⭐ Motivazione personalizzata</h3>
              <p className="text-slate-600">
                "Ottimo lavoro! Hai migliorato del 40% rispetto all'ultima volta. 
                Continua così, stai facendo progressi incredibili!"
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold mb-4">Demo Interattiva</h3>
                <p className="mb-6">Prova TutorAI gratuitamente per 5 minuti</p>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Inizia la Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
