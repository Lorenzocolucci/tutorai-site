const features = [
  { title: "Spiegazioni ultra chiare", desc: "Esempi, ritmo e linguaggio su misura.", emoji: "🧩" },
  { title: "Esercizi mirati", desc: "Difficoltà adattiva con feedback immediato.", emoji: "🎯" },
  { title: "Recupero lacune", desc: "Identifica e rinforza i concetti deboli.", emoji: "🧭" },
  { title: "Preparazione test", desc: "Simulazioni realistiche e strategie.", emoji: "🏆" },
  { title: "Progresso continuo", desc: "Tracking e ricalibrazione costante.", emoji: "🔁" },
  { title: "Motivazione costante", desc: "Supporto emotivo e micro-ricompense.", emoji: "⭐" },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Cosa rende TutorAI diverso</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i)=> (
            <div key={i} className="perspective-container">
              <div className="card-oblique glowing-border card reveal tilt">
                <div className="text-2xl">{f.emoji}</div>
                <h3 className="mt-3 text-xl font-semibold">{f.title}</h3>
                <p className="text-slate-600 mt-2">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
