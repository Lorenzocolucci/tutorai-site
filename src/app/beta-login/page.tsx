'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  validateInviteCode,
  redeemInviteCode,
  signUpWithEmail,
  signInWithEmail,
  type InviteValidationResponse
} from '@/lib/supabase';

const BetaLoginPage = () => {
  // State management
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [inviteValidation, setInviteValidation] = useState<InviteValidationResponse | null>(null);
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for invite code in URL (?invite=BETA-XXXX-XXXX)
  useEffect(() => {
    const inviteFromUrl = searchParams.get('invite');
    if (inviteFromUrl) {
      setFormData(prev => ({ ...prev, code: inviteFromUrl }));
      setMode('register'); // Se c'è codice, mostra form registrazione
      validateCode(inviteFromUrl);
    }
  }, [searchParams]);

  const validateCode = async (code: string) => {
    if (!code || code.length < 10) return;

    setIsValidatingCode(true);
    setError('');

    try {
      const result = await validateInviteCode(code, formData.email);
      setInviteValidation(result);

      if (!result.valid) {
        setError(result.message);
      }
    } catch (err) {
      console.error('Validation error:', err);
      setError('Errore nella validazione del codice');
      setInviteValidation(null);
    } finally {
      setIsValidatingCode(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) setError('');

    // Validate code when it changes
    if (name === 'code' && value.length >= 10) {
      validateCode(value);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Sign in with Supabase Auth
      const { session } = await signInWithEmail(formData.email, formData.password);

      if (!session) {
        throw new Error('Nessuna sessione creata');
      }

      // Redirect to platform (platform.mytutorai.app or current domain)
      window.location.href = 'https://platform.mytutorai.app/dashboard';
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Email o password non validi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('La password deve essere di almeno 8 caratteri');
      setIsSubmitting(false);
      return;
    }

    // Validate invite code
    if (formData.code) {
      if (!inviteValidation || !inviteValidation.valid) {
        setError('Il codice invito non è valido');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // 1. Register with Supabase Auth
      const { user, session } = await signUpWithEmail(formData.email, formData.password);

      if (!user || !session) {
        throw new Error('Registrazione fallita');
      }

      // 2. If invite code provided, redeem it
      if (formData.code && inviteValidation?.valid) {
        try {
          await redeemInviteCode(formData.code, session.access_token);
          console.log('✅ Codice invito riscattato con successo');
        } catch (redeemError) {
          console.error('⚠️ Redemption error (non-blocking):', redeemError);
          // Non blocchiamo la registrazione se il redeem fallisce
        }
      }

      // 3. Redirect to platform onboarding
      window.location.href = 'https://platform.mytutorai.app/onboarding';
    } catch (err: any) {
      console.error('Registration error:', err);

      if (err.message.includes('already registered')) {
        setError('Email già registrata. Prova ad accedere.');
        setMode('login');
      } else {
        setError(err.message || 'Errore durante la registrazione');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="perspective-container">
        <div className="card-oblique glowing-border-follow bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-text-primary flex items-center justify-center gap-2 mb-4">
              <span role="img" aria-label="cervello">🧠</span>
              <span>TutorAI</span>
            </Link>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {mode === 'login' ? 'Accedi' : 'Registrati'}
            </h1>
            <p className="text-text-secondary">
              {mode === 'login'
                ? 'Accedi alla tua dashboard TutorAI'
                : 'Crea il tuo account e inizia subito'
              }
            </p>
          </div>

          {/* Invite Code Banner (if code in URL) */}
          {formData.code && inviteValidation && (
            <div className={`mb-6 p-4 rounded-xl border-2 ${
              inviteValidation.valid
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {inviteValidation.valid ? '✅' : '❌'}
                </span>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    inviteValidation.valid ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {inviteValidation.valid ? 'Codice Valido!' : 'Codice Non Valido'}
                  </p>
                  <p className={`text-sm ${
                    inviteValidation.valid ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {inviteValidation.message}
                  </p>
                  {inviteValidation.valid && inviteValidation.hours_granted && (
                    <p className="text-sm text-green-600 mt-2">
                      🎁 Riceverai <strong>{inviteValidation.hours_granted} ore gratuite</strong> dopo la registrazione!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Toggle Login/Register */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Accedi
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                mode === 'register'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Registrati
            </button>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-6">
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
              <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="••••••••"
                minLength={8}
              />
              {mode === 'register' && (
                <p className="text-xs text-text-secondary mt-1">
                  Minimo 8 caratteri
                </p>
              )}
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-text-primary mb-2">
                    Conferma Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label htmlFor="code" className="block text-sm font-semibold text-text-primary mb-2">
                    Codice Invito {formData.code ? '*' : '(Opzionale)'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-mono text-center text-lg tracking-wider"
                      placeholder="BETA-XXXX-XXXX"
                      maxLength={17}
                    />
                    {isValidatingCode && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-2">
                    {formData.code
                      ? 'Codice ricevuto via email dopo richiesta beta'
                      : 'Se non hai un codice, puoi registrarti comunque'
                    }
                  </p>
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-900 text-sm font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isValidatingCode}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === 'login' ? 'Accesso in corso...' : 'Registrazione in corso...'}
                </span>
              ) : (
                mode === 'login' ? 'Accedi' : 'Registrati'
              )}
            </button>
          </form>

          {/* Additional Links */}
          {mode === 'login' && (
            <div className="mt-4 text-center">
              <Link href="/reset-password" className="text-sm text-primary hover:underline">
                Password dimenticata?
              </Link>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm">
              ← Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaLoginPage;