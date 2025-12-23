const systems = [
  { name: "MIUR (Italia)", emoji: "🇮🇹" },
  { name: "IB", emoji: "🌍" },
  { name: "IGCSE / UK", emoji: "🇬🇧" },
  { name: "American K-12", emoji: "🇺🇸" },
  { name: "AEFE (Francia)", emoji: "🇫🇷" },
  { name: "Gymnasium (DE)", emoji: "🇩🇪" },
];

const subjects = ["Matematica 🧮","Scienze 🧪","Fisica 🔭","Chimica ⚗️","Biologia 🧬","Storia 🗺️","Filosofia 🦉","Lingue 🌐","Arte 🎨"];

export default function Curricula() {
  return (
    <section id="curricula" className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Curricula e materie</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {systems.map((s,i)=> (
            <div key={i} className="perspective-container">
              <div className="card-oblique glowing-border card reveal flex items-center gap-3">
                <div className="text-2xl">{s.emoji}</div>
                <div className="font-semibold">{s.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map((b,i)=>(<span key={i} className="badge">{b}</span>))}
        </div>
      </div>
    </section>
  )
}
