const steps = [
  { pct: 50, title: "Settembre", desc: "Segui il programma" },
  { pct: 65, title: "Dicembre", desc: "Ricorda le lacune" },
  { pct: 80, title: "Marzo", desc: "Anticipa le difficoltà" },
  { pct: 95, title: "Giugno", desc: "Esami superati" },
  { pct: 100, title: "Estate", desc: "Pieno potenziale" },
];

export default function AcademicPath() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Percorso accademico</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((s, i)=> (
            <div key={i} className="perspective-container">
              <div className="card-oblique glowing-border card text-center reveal">
                <div className="text-3xl font-extrabold">{s.pct}%</div>
                <div className="mt-2 font-semibold">{s.title}</div>
                <div className="text-slate-600">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Grafico a barre del progresso */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Progresso nel Tempo</h3>
          <div className="flex items-end justify-center gap-4 h-48">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`grow-bar w-8 rounded-t ${
                    i === 0 ? 'bg-blue-500' :
                    i === 1 ? 'bg-green-500' :
                    i === 2 ? 'bg-yellow-500' :
                    i === 3 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ 
                    height: `${s.pct}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
                <div className="text-xs mt-2 text-center w-12">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
