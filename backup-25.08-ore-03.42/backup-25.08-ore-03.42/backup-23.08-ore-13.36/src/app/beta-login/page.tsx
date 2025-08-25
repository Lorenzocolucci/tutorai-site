'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BetaLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    code: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Simula verifica del codice
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simula errore per demo (codice sbagliato)
    if (formData.code !== 'BETA2024') {
      setError('Codice di accesso non valido. Controlla la tua email o richiedi un nuovo codice.');
      setIsSubmitting(false);
      return;
    }
    
    // Successo - reindirizza alla dashboard beta
    router.push('/beta-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-text-primary flex items-center justify-center gap-2 mb-4">
            <span role="img" aria-label="cervello">🧠</span>
            <span>TutorAI</span>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Accesso Beta
          </h1>
          <p className="text-text-secondary">
            Inserisci il tuo codice di accesso per entrare nella beta
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              placeholder="la-tua-email@esempio.com"
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-semibold text-text-primary mb-2">
              Codice di Accesso *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              required
              value={formData.code}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-mono text-center text-lg tracking-wider"
              placeholder="BETA-XXXX-XXXX"
              maxLength={13}
            />
            <p className="text-xs text-text-secondary mt-2">
              Il codice è stato inviato alla tua email
            </p>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 rounded-xl p-4">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifica in corso...
              </span>
            ) : (
              'Accedi alla Beta'
            )}
          </button>
        </form>

        

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm">
            ← Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetaLoginPage;
