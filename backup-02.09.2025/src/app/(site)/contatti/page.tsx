'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    oggetto: '',
    messaggio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula invio del form
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messaggio Inviato!</h1>
          <p className="text-gray-600 mb-6">
            Grazie per averci contattato! Ti risponderemo entro 24 ore.
          </p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            ← Torna alla Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Contattaci</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Hai domande? Siamo qui per aiutarti. Compila il form e ti risponderemo entro 24 ore.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form di Contatto */}
          <AnimateOnScroll>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Invia un messaggio</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Oggetto *</label>
                  <select
                    name="oggetto"
                    value={formData.oggetto}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleziona un oggetto</option>
                    <option value="informazioni-generali">Informazioni Generali</option>
                    <option value="supporto-tecnico">Supporto Tecnico</option>
                    <option value="prezzi-abbonamenti">Prezzi e Abbonamenti</option>
                    <option value="partnership">Partnership e Collaborazioni</option>
                    <option value="feedback">Feedback e Suggerimenti</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Messaggio *</label>
                  <textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Descrivi la tua richiesta o domanda..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                </button>
              </form>
            </div>
          </AnimateOnScroll>

          {/* Informazioni di Contatto */}
          <AnimateOnScroll>
            <div className="space-y-6">
              {/* Informazioni Rapide */}
              <div className="perspective-container">
                <div className="card-oblique glowing-border bg-white p-6 rounded-2xl">
                                     <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Contatti Rapidi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-lg">📧</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                                                 <p className="text-gray-600">info@mytutorai.app</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-lg">⏰</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Orari</p>
                        <p className="text-gray-600">Lun-Ven: 9:00-18:00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-lg">⚡</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Risposta</p>
                        <p className="text-gray-600">Entro 24 ore</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Rapide */}
              <div className="perspective-container">
                <div className="card-oblique glowing-border bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">❓ Domande Frequenti</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>• Come funziona TutorAI?</p>
                    <p>• Quali sistemi scolastici supporta?</p>
                    <p>• Quanto costa l'abbonamento?</p>
                    <p>• Posso provare gratuitamente?</p>
                  </div>
                  <Link href="/faq" className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-semibold">
                    Vedi tutte le FAQ →
                  </Link>
                </div>
              </div>

              {/* Accesso Beta */}
              <div className="perspective-container">
                <div className="card-oblique glowing-border bg-green-50 border border-green-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Accesso Beta</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Vuoi essere tra i primi a testare TutorAI? Richiedi l'accesso alla versione Beta!
                  </p>
                  <Link href="/beta-access" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                    Richiedi Accesso
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
