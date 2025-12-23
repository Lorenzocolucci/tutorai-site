'use client';

import Link from 'next/link';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/en" className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
            <span role="img" aria-label="brain">🧠</span>
            <span>TutorAI</span>
          </Link>
          <Link href="/en" className="text-text-secondary hover:text-primary transition-colors text-sm sm:text-base">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Terms of Service
          </h1>
          <p className="text-text-secondary mb-8">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>

          <div className="prose prose-lg max-w-none text-text-secondary">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By using TutorAI, you agree to be bound by these Terms of Service. 
                If you do not accept these terms, do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Service Description</h2>
              <p className="mb-4">
                TutorAI is an intelligent tutoring platform that uses artificial intelligence 
                to provide personalized educational support. The service includes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Personalized explanations adapted to your learning style</li>
                <li>Targeted exercises and quizzes</li>
                <li>Progress monitoring</li>
                <li>Support for various subjects and school curricula</li>
                <li>Personalized feedback and suggestions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. Registration and Account</h2>
              <p className="mb-4">
                To use TutorAI, you must register and create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Keep your information updated</li>
                <li>Protect your account security</li>
                <li>Not share your login credentials</li>
                <li>Immediately notify us of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Acceptable Use</h2>
              <p className="mb-4">You agree to use TutorAI only for legitimate educational purposes. It is prohibited to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Use the service for illegal activities</li>
                <li>Attempt unauthorized access to systems or data</li>
                <li>Interfere with service operation</li>
                <li>Distribute malware or harmful content</li>
                <li>Violate intellectual property rights</li>
                <li>Use the service for plagiarism or academic fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Content and Intellectual Property</h2>
              <p className="mb-4">
                All TutorAI content, including text, graphics, software, and design, 
                is protected by copyright and other intellectual property laws. 
                You are granted a limited, non-exclusive, and revocable right of use.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Privacy and Personal Data</h2>
              <p className="mb-4">
                The collection and use of your personal data are governed by our 
                <Link href="/en/privacy" className="text-primary hover:underline"> Privacy Policy</Link>. 
                By using the service, you consent to the collection and use of your data 
                as described in the Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                TutorAI is provided "as is" without warranties of any kind. We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The service will always be available or error-free</li>
                <li>Educational results will be guaranteed</li>
                <li>The service will be compatible with all devices</li>
                <li>Content will always be accurate or up-to-date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Payments and Refunds</h2>
              <p className="mb-4">
                Prices and payment methods are specified at the time of purchase. 
                Refunds are governed by our refund policy, available upon request.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Suspension and Termination</h2>
              <p className="mb-4">
                We reserve the right to suspend or terminate your account in case of:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violation of these terms</li>
                <li>Unauthorized use of the service</li>
                <li>Fraudulent behavior</li>
                <li>Non-payment of due fees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">10. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. 
                Changes will be effective immediately after publication. 
                We will notify you of significant changes via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">11. Governing Law</h2>
              <p className="mb-4">
                These terms are governed by Italian law. 
                Any disputes will be resolved by competent courts in Italy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">12. Contact</h2>
              <p className="mb-4">
                For questions about these Terms of Service, contact us at: 
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