'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { savings } from '../utils/calculator';

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(()=>{
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting) e.target.classList.add('reveal--visible');
      });
    }, { threshold: .2 });
    el.querySelectorAll('.reveal').forEach(n=>io.observe(n));
    return ()=> io.disconnect();
  },[]);
  return ref;
}

export default function ROI() {
  const [hours, setHours] = useState(2);
  const [subjects, setSubjects] = useState(2);
  const [rate, setRate] = useState(30);
  const data = useMemo(()=> savings(hours, subjects, rate), [hours, subjects, rate]);
  const ref = useReveal();

  return (
    <section id="roi" className="section bg-slate-50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Calcola il tuo risparmio</h2>
        <div className="grid md:grid-cols-2 gap-8" ref={ref}>
          <div className="card reveal">
            <label className="block font-semibold">Ore a settimana: {hours}</label>
            <input aria-label="Ore a settimana" className="w-full" type="range" min={1} max={10} value={hours} onChange={e=>setHours(parseInt(e.target.value))} />
            <label className="block font-semibold mt-4">Materie: {subjects}</label>
            <input aria-label="Materie" className="w-full" type="range" min={1} max={5} value={subjects} onChange={e=>setSubjects(parseInt(e.target.value))} />
            <label className="block font-semibold mt-4">Prezzo €/h: {rate}</label>
            <input aria-label="Prezzo orario" className="w-full" type="range" min={20} max={60} step={5} value={rate} onChange={e=>setRate(parseInt(e.target.value))} />
          </div>
          <div className="grid gap-4">
            <div className="card reveal">
              <h3 className="font-semibold text-lg">Tradizionale 🔴</h3>
              <div className="text-2xl font-extrabold">€ {data.trad.toLocaleString('it-IT')}</div>
              <p className="text-slate-600">Ore × materie × prezzo × 40 settimane</p>
            </div>
            <div className="card reveal">
              <h3 className="font-semibold text-lg">TutorAI 🟢</h3>
              <div className="text-2xl font-extrabold">€ 1.199</div>
              <p className="text-slate-600">Piano annuale consigliato</p>
            </div>
            <div className="card reveal bg-emerald-50 border border-emerald-200">
              <h3 className="font-semibold text-lg">Risparmi</h3>
              <div className="text-3xl font-extrabold text-emerald-700">€ {data.save.toLocaleString('it-IT')} ({data.pct.toFixed(0)}%)</div>
            </div>
          </div>
        </div>
        <div className="mt-6"><a href="#waitlist" className="btn-primary">Inizia a risparmiare oggi</a></div>
      </div>
    </section>
  )
}
