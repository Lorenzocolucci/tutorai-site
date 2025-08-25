'use client';
import { useState } from 'react';

const qa = [
  { q: "Cos’è TutorAI?", a: "Un tutor intelligente che si adatta allo stile di apprendimento, con spiegazioni ed esercizi personalizzati." },
  { q: "Per chi è pensato?", a: "Studenti di medie, liceo e curricula internazionali; supporto anche ai genitori." },
  { q: "Come funziona la Beta?", a: "Accesso limitato a 1000 studenti; 1 mese gratis + 1000 crediti; nessuna carta richiesta." },
  { q: "Quali materie coprite?", a: "STEM, lingue, umanistiche e altro, a seconda del curriculum." },
  { q: "Simulate test ed esami?", a: "Sì, con feedback immediato e strategie." },
  { q: "È disponibile 24/7?", a: "Sì." },
  { q: "Privacy e minori?", a: "GDPR, controlli parentali e protezione dati." },
  { q: "Quanto costa dopo la Beta?", a: "€99,90/mese o €1.199/anno." },
  { q: "Posso cancellarmi?", a: "Sì, quando vuoi." },
  { q: "Quanti posti restano?", a: "L’indicatore in pagina mostra lo stato in tempo reale." },
  { q: "Supporto umano?", a: "Team multidisciplinare (psicologi, pedagogisti, ingegneri AI)." },
  { q: "Lingue disponibili?", a: "Italiano e Inglese (altre in futuro)." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section bg-slate-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Domande frequenti</h2>
        <div className="grid gap-3">
          {qa.map((item, i)=> (
            <div key={i} className="card">
              <button className="w-full text-left font-semibold flex justify-between items-center" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}>
                {item.q} <span>{open===i ? "−" : "+"}</span>
              </button>
              {open===i && <p className="text-slate-600 mt-2">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
