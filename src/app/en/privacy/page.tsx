'use client';

import Link from 'next/link';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen-safe bg-gradient-to-br from-primary/5 to-secondary/5">
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
        <div className="perspective-container">
          <div className="card-oblique glowing-border bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-text-secondary mb-8">
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>

          <div className="prose prose-lg max-w-none text-text-secondary">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">1. General Information</h2>
              <p className="mb-4">
                TutorAI ("we", "our", "us") is committed to protecting the privacy of our users. 
                This Privacy Policy explains how we collect, use, and protect personal information 
                that you provide when using our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-text-primary mb-3">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Educational system and grade information</li>
                <li>Subject interests</li>
                <li>Feedback and reasons for using our service</li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mb-3">2.2 Usage Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Navigation and interaction data with the platform</li>
                <li>Learning progress and performance</li>
                <li>Study preferences and learning style</li>
                <li>Technical data (IP, browser, device)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">3. How We Use Information</h2>
              <p className="mb-4">We use collected information to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide and personalize the tutoring service</li>
                <li>Adapt educational content to your learning style</li>
                <li>Continuously improve the platform</li>
                <li>Communicate updates and news</li>
                <li>Provide technical support and assistance</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">4. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, rent, or share your personal information with third parties, 
                except in the following cases:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>With service providers who help us operate (always with security guarantees)</li>
                <li>In case of corporate merger or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, 
                or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">7. Cookies and Similar Technologies</h2>
              <p className="mb-4">
                We use cookies and similar technologies to improve user experience, 
                analyze site usage, and personalize content. You can manage 
                cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">8. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only for as long as necessary 
                to achieve the purposes for which it was collected, or as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">9. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We reserve the right to update this Privacy Policy. 
                We will notify you of significant changes via email or 
                through a notice on the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contact</h2>
              <p className="mb-4">
                For questions about this Privacy Policy or the processing of your data, 
                contact us at: 
                <a href="mailto:info@mytutorai.app" className="text-primary hover:underline ml-1">
                  info@mytutorai.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PrivacyPage;