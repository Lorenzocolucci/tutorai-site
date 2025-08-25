'use client';

import Link from 'next/link';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
            <span role="img" aria-label="cervello">🧠</span>
            <span>TutorAI</span>
          </Link>
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm sm:text-base">
            ← Torna alla Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Termini di Servizio
          </h1>
          <p className="text-text-secondary mb-8">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <div className="prose prose-lg max-w-none text-text-secondary">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Accettazione dei Termini</h2>
              <p className="mb-4">
                Utilizzando TutorAI, accetti di essere vincolato da questi Termini di Servizio. 
                Se non accetti questi termini, non utilizzare il nostro servizio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Descrizione del Servizio</h2>
              <p className="mb-4">
                TutorAI è una piattaforma di tutoraggio intelligente che utilizza l'intelligenza artificiale 
                per fornire supporto educativo personalizzato. Il servizio include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Spiegazioni personalizzate adattate al tuo stile di apprendimento</li>
                <li>Esercizi e quiz mirati</li>
                <li>Monitoraggio dei progressi</li>
                <li>Supporto per diverse materie e curricula scolastici</li>
                <li>Feedback e suggerimenti personalizzati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. Registrazione e Account</h2>
              <p className="mb-4">
                Per utilizzare TutorAI, devi registrarti e creare un account. Ti impegni a:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Fornire informazioni accurate e complete</li>
                <li>Mantenere aggiornate le tue informazioni</li>
                <li>Proteggere la sicurezza del tuo account</li>
                <li>Non condividere le tue credenziali di accesso</li>
                <li>Notificarci immediatamente di qualsiasi uso non autorizzato</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Uso Accettabile</h2>
              <p className="mb-4">Ti impegni a utilizzare TutorAI solo per scopi legittimi e educativi. È vietato:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Utilizzare il servizio per attività illegali</li>
                <li>Tentare di accedere non autorizzato a sistemi o dati</li>
                <li>Interferire con il funzionamento del servizio</li>
                <li>Distribuire malware o contenuti dannosi</li>
                <li>Violare i diritti di proprietà intellettuale</li>
                <li>Utilizzare il servizio per plagio o frode accademica</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Contenuti e Proprietà Intellettuale</h2>
              <p className="mb-4">
                Tutti i contenuti di TutorAI, inclusi testi, grafici, software e design, 
                sono protetti da copyright e altre leggi sulla proprietà intellettuale. 
                Ti è concesso un diritto di utilizzo limitato, non esclusivo e revocabile.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Privacy e Dati Personali</h2>
              <p className="mb-4">
                La raccolta e l'utilizzo dei tuoi dati personali sono regolati dalla nostra 
                <Link href="/privacy" className="text-primary hover:underline"> Privacy Policy</Link>. 
                Utilizzando il servizio, acconsenti alla raccolta e all'utilizzo dei tuoi dati 
                come descritto nella Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Limitazione di Responsabilità</h2>
              <p className="mb-4">
                TutorAI è fornito "così com'è" senza garanzie di alcun tipo. Non garantiamo che:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Il servizio sarà sempre disponibile o privo di errori</li>
                <li>I risultati educativi saranno garantiti</li>
                <li>Il servizio sarà compatibile con tutti i dispositivi</li>
                <li>I contenuti saranno sempre accurati o aggiornati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Pagamenti e Rimborsi</h2>
              <p className="mb-4">
                I prezzi e le modalità di pagamento sono specificati al momento dell'acquisto. 
                I rimborsi sono regolati dalla nostra politica di rimborso, disponibile su richiesta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Sospensione e Terminazione</h2>
              <p className="mb-4">
                Ci riserviamo il diritto di sospendere o terminare il tuo account in caso di:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violazione di questi termini</li>
                <li>Uso non autorizzato del servizio</li>
                <li>Comportamento fraudolento</li>
                <li>Mancato pagamento delle tariffe dovute</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">10. Modifiche ai Termini</h2>
              <p className="mb-4">
                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
                Le modifiche saranno effettive immediatamente dopo la pubblicazione. 
                Ti notificheremo le modifiche significative via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">11. Legge Applicabile</h2>
              <p className="mb-4">
                Questi termini sono regolati dalle leggi italiane. 
                Qualsiasi controversia sarà risolta dai tribunali competenti in Italia.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">12. Contatti</h2>
              <p className="mb-4">
                Per domande su questi Termini di Servizio, contattaci all'indirizzo email: 
                <a href="mailto:info@mytutorai.app" className="text-primary hover:underline ml-1">
                  info@mytutorai.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
