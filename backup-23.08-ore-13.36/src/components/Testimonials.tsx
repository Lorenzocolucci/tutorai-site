'use client';
import { useEffect, useRef } from 'react';

const people = [
  { name: "Sara (IB)", quote: "Matematica da 5 a 8 in due mesi." },
  { name: "Luca (Medie)", quote: "Finalmente capisco gli esercizi, senza ansia." },
  { name: "Giulia (Liceo)", quote: "Meno tempo, più risultati." },
  { name: "Marta (IGCSE)", quote: "Strategie pratiche per gli esami." },
  { name: "Paolo (Elementari)", quote: "Spiegazioni chiare e divertenti." },
  { name: "Elena (K-12)", quote: "Si adatta al mio modo di pensare." },
];

function useCountUp(on:boolean, to:number, dur=1400) {
  const ref = useRef<HTMLSpanElement|null>(null);
  useEffect(()=>{
    if (!on || !ref.current) return;
    const el = ref.current;
    let start = performance.now();
    const step = (t:number)=>{
      let p = Math.min(1, (t-start)/dur);
      el.textContent = Math.round(p*to).toString();
      if (p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },[on, to, dur]);
  return ref;
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement|null>(null);
  const state = useRef(false);
  const kpi1 = useCountUp(state.current, 98);
  const kpi2 = useCountUp(state.current, 87);
  const kpi3 = useCountUp(state.current, 94);
  const kpi4 = useCountUp(state.current, 76);

  useEffect(()=>{
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if (e.isIntersecting) state.current = true;
      });
    }, { threshold: .3 });
    io.observe(el);
    return ()=> io.disconnect();
  },[]);

  return (
    <section id="testimonials" ref={ref} className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Risultati reali</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {people.map((p,i)=> (
            <div key={i} className="card reveal">
              <div className="text-xl font-semibold">{p.name}</div>
              <p className="text-slate-600 mt-2">“{p.quote}”</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card text-center reveal"><div className="text-4xl font-extrabold"><span ref={kpi1}>0</span>%</div><div className="text-slate-600">migliorano i voti</div></div>
          <div className="card text-center reveal"><div className="text-4xl font-extrabold"><span ref={kpi2}>0</span>%</div><div className="text-slate-600">riduzione del tempo</div></div>
          <div className="card text-center reveal"><div className="text-4xl font-extrabold"><span ref={kpi3}>0</span>%</div><div className="text-slate-600">più motivazione</div></div>
          <div className="card text-center reveal"><div className="text-4xl font-extrabold"><span ref={kpi4}>0</span>%</div><div className="text-slate-600">risparmio medio</div></div>
        </div>
      </div>
    </section>
  )
}
