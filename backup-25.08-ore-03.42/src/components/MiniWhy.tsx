export default function MiniWhy() {
  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Perché TutorAI è diverso</h2>
          <p className="text-xl text-slate-600 mb-8">
            Non è solo un'altra app di ripetizioni. È un tutor intelligente che si adatta al tuo modo di pensare, 
            ricorda le tue difficoltà e ti guida verso il successo con spiegazioni personalizzate.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="perspective-container">
              <div className="card-oblique glowing-border card text-center">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-semibold mb-2">Si adatta a te</h3>
                <p className="text-slate-600">Analizza il tuo stile di apprendimento e personalizza ogni spiegazione</p>
              </div>
            </div>
            <div className="perspective-container">
              <div className="card-oblique glowing-border card text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">Risultati mirati</h3>
                <p className="text-slate-600">Focus sulle tue lacune specifiche per massimizzare l'efficacia</p>
              </div>
            </div>
            <div className="perspective-container">
              <div className="card-oblique glowing-border card text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Sempre disponibile</h3>
                <p className="text-slate-600">Supporto 24/7 quando ne hai bisogno, senza limiti di orario</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
