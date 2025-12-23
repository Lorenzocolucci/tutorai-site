'use client';
import { useState } from 'react';

export default function BetaAccess() {
  const [spotsLeft, setSpotsLeft] = useState(247);
  
  return (
    <section id="waitlist" className="section bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Unisciti alla Beta Limitata
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Solo 1000 studenti avranno accesso esclusivo. 
            <br />
            <span className="font-semibold">Posti rimasti: {spotsLeft}</span>
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="perspective-container">
              <div className="card-oblique glowing-border-follow bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-3">🎁</div>
                <h3 className="font-semibold mb-2">1 Mese Gratis</h3>
                <p className="opacity-80">Accesso completo senza impegno</p>
              </div>
            </div>
            <div className="perspective-container">
              <div className="card-oblique glowing-border-follow bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-3">💎</div>
                <h3 className="font-semibold mb-2">1000 Crediti</h3>
                <p className="opacity-80">Per testare tutte le funzionalità</p>
              </div>
            </div>
            <div className="perspective-container">
              <div className="card-oblique glowing-border-follow bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold mb-2">Nessuna Carta</h3>
                <p className="opacity-80">Registrazione senza impegno</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Registrati alla Beta</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nome" 
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input 
                  type="text" 
                  placeholder="Cognome" 
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <select className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                  <option value="">Seleziona Curriculum</option>
                  <option value="miur">MIUR (Italia)</option>
                  <option value="ib">IB</option>
                  <option value="igcse">IGCSE / UK</option>
                  <option value="k12">American K-12</option>
                </select>
                <select className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                  <option value="">Classe</option>
                  <option value="medie">Medie</option>
                  <option value="liceo">Liceo</option>
                  <option value="universita">Università</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Partecipa alla Beta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
