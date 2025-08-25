'use client';

import { useState } from 'react';
import Link from 'next/link';

const BetaDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="cervello">🧠</span>
            <span className="text-xl font-bold text-text-primary">TutorAI Beta</span>
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">BETA</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">Benvenuto, Beta Tester!</span>
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm">
              Esci
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            🎉 Benvenuto nella Beta di TutorAI!
          </h1>
          <p className="text-text-secondary">
            Grazie per essere uno dei primi a testare il futuro dell'educazione personalizzata. 
            La tua esperienza e feedback sono fondamentali per migliorare TutorAI.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Panoramica', icon: '📊' },
            { id: 'subjects', label: 'Materie', icon: '📚' },
            { id: 'progress', label: 'Progressi', icon: '📈' },
            { id: 'feedback', label: 'Feedback', icon: '💬' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">🚀 Stato della Beta</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-2xl font-bold text-primary">342</div>
                      <div className="text-sm text-text-secondary">Beta Tester Attivi</div>
                    </div>
                    <div className="text-center p-4 bg-success/5 rounded-xl">
                      <div className="text-2xl font-bold text-success">89%</div>
                      <div className="text-sm text-text-secondary">Soddisfazione</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/5 rounded-xl">
                      <div className="text-2xl font-bold text-secondary">15</div>
                      <div className="text-sm text-text-secondary">Giorni alla Beta</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">🎯 Prossimi Passi</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">1</div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Completa il Profilo</h3>
                        <p className="text-sm text-text-secondary">Aggiungi le tue materie di interesse per personalizzare l'esperienza</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">2</div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Inizia il Primo Test</h3>
                        <p className="text-sm text-text-secondary">Prova le funzionalità di TutorAI con un argomento a tua scelta</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">3</div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Invia Feedback</h3>
                        <p className="text-sm text-text-secondary">Condividi la tua esperienza per aiutarci a migliorare</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">📚 Materie Disponibili</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Matematica', 'Fisica', 'Chimica', 'Biologia', 'Inglese', 'Storia', 'Filosofia', 'Latino'].map(subject => (
                    <div key={subject} className="border border-gray-200 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer">
                      <h3 className="font-semibold text-text-primary">{subject}</h3>
                      <p className="text-sm text-text-secondary mt-1">Disponibile per test</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">📈 I Tuoi Progressi</h2>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-text-secondary">I tuoi dati di progresso appariranno qui dopo aver iniziato a usare TutorAI</p>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">💬 Invia Feedback</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Categoria
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <option>Bug Report</option>
                      <option>Suggerimento Funzionalità</option>
                      <option>Feedback UI/UX</option>
                      <option>Altro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Messaggio
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Descrivi il tuo feedback..."
                    />
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    Invia Feedback
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">🎁 Vantaggi Beta</h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Accesso gratuito per 30 giorni</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Supporto diretto dal team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Influenza sulle funzionalità</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>50% di sconto al lancio</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">📞 Supporto</h3>
              <p className="text-sm text-text-secondary mb-4">
                Hai bisogno di aiuto? Il nostro team è qui per te.
              </p>
              <button className="w-full bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold hover:bg-primary/20 transition-colors">
                Contatta Supporto
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Beta Version</h3>
              <p className="text-sm text-yellow-700">
                Questa è una versione beta. Alcune funzionalità potrebbero non funzionare perfettamente. 
                Grazie per la tua pazienza!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaDashboardPage;
