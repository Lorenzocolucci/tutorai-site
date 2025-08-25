'use client';

import Link from 'next/link';

const PrivacyPage = () => {
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
            Privacy Policy
          </h1>
          <p className="text-text-secondary mb-8">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <div className="prose prose-lg max-w-none text-text-secondary">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Informazioni Generali</h2>
              <p className="mb-4">
                TutorAI ("noi", "nostro", "ci") si impegna a proteggere la privacy dei suoi utenti. 
                Questa Privacy Policy spiega come raccogliamo, utilizziamo e proteggiamo le informazioni personali 
                che ci fornisci quando utilizzi il nostro servizio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Informazioni che Raccogliamo</h2>
              <h3 className="text-xl font-semibold text-text-primary mb-3">2.1 Informazioni Personali</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Nome e cognome</li>
                <li>Indirizzo email</li>
                <li>Informazioni sul sistema scolastico e classe</li>
                <li>Materie di interesse</li>
                <li>Feedback e motivazioni per l'utilizzo del servizio</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">2.2 Informazioni di Utilizzo</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Dati di navigazione e interazione con la piattaforma</li>
                <li>Progressi di apprendimento e performance</li>
                <li>Preferenze di studio e stile di apprendimento</li>
                <li>Dati tecnici (IP, browser, dispositivo)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. Come Utilizziamo le Informazioni</h2>
              <p className="mb-4">Utilizziamo le informazioni raccolte per:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Fornire e personalizzare il servizio di tutoraggio</li>
                <li>Adattare i contenuti educativi al tuo stile di apprendimento</li>
                <li>Migliorare continuamente la piattaforma</li>
                <li>Comunicare aggiornamenti e novità</li>
                <li>Fornire supporto tecnico e assistenza</li>
                <li>Rispettare gli obblighi legali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Condivisione delle Informazioni</h2>
              <p className="mb-4">
                Non vendiamo, affittiamo o condividiamo le tue informazioni personali con terze parti, 
                eccetto nei seguenti casi:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Con il tuo consenso esplicito</li>
                <li>Per rispettare obblighi legali o ordini giudiziari</li>
                <li>Con fornitori di servizi che ci aiutano a operare (sempre con garanzie di sicurezza)</li>
                <li>In caso di fusione o acquisizione aziendale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Sicurezza dei Dati</h2>
              <p className="mb-4">
                Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
                le tue informazioni personali contro accesso non autorizzato, alterazione, divulgazione 
                o distruzione.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. I Tuoi Diritti</h2>
              <p className="mb-4">Hai il diritto di:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Accedere alle tue informazioni personali</li>
                <li>Correggere informazioni inesatte</li>
                <li>Richiedere la cancellazione dei tuoi dati</li>
                <li>Limitare il trattamento dei tuoi dati</li>
                <li>Portabilità dei dati</li>
                <li>Opporti al trattamento dei dati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Cookie e Tecnologie Simili</h2>
              <p className="mb-4">
                Utilizziamo cookie e tecnologie simili per migliorare l'esperienza utente, 
                analizzare l'utilizzo del sito e personalizzare i contenuti. Puoi gestire 
                le preferenze sui cookie attraverso le impostazioni del browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Conservazione dei Dati</h2>
              <p className="mb-4">
                Conserviamo le tue informazioni personali solo per il tempo necessario 
                a raggiungere gli scopi per cui sono state raccolte, o come richiesto dalla legge.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Modifiche alla Privacy Policy</h2>
              <p className="mb-4">
                Ci riserviamo il diritto di aggiornare questa Privacy Policy. 
                Ti notificheremo eventuali modifiche significative via email o 
                attraverso un avviso sul sito.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contatti</h2>
              <p className="mb-4">
                Per domande su questa Privacy Policy o sul trattamento dei tuoi dati, 
                contattaci all'indirizzo email: 
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

export default PrivacyPage;
