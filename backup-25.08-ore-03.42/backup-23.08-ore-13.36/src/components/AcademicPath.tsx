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
            <div key={i} className="card text-center reveal">
              <div className="text-3xl font-extrabold">{s.pct}%</div>
              <div className="mt-2 font-semibold">{s.title}</div>
              <div className="text-slate-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
