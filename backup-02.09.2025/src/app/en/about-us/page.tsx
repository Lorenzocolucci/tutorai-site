'use client';

import Image from 'next/image';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';

// Data for sections - English translation of Italian version
const sections = [
  {
    title: "15 Years in the Field",
    content: "For over fifteen years, our home has been a real school. Not an office, not a laboratory, but a place filled with school bells, tests and, above all, students. We have managed, taught and lived every day the same challenges that families face: grade pressure, 'one-size-fits-all' teaching methods that leave the most vulnerable behind, and the frustration of seeing unexpressed potential. We didn't start from an abstract idea. We started from them: from mistakes, insecurities and the spark in their eyes when they finally understood. It's from this direct experience that our obsession was born.",
    imageUrl: "/assets/chi-siamo/radici.webp",
    imageAlt: "Detail of a classroom with books and notes",
    align: "left"
  },
  {
    title: "Rebellion Against an Inadequate System",
    content: "We have seen too many kids labeled by a grade, crushed by an average or defined by a test. We have seen a system that asks unique minds to adapt to a standardized mold, instead of providing each one with the right key for their own lock. We asked ourselves: what if we could reverse the paradigm? If, instead of asking the student to change to adapt to school, we could create a tutor that intimately adapts to each student? A system that doesn't just care about 'what' you learn, but 'how' you learn it, respecting your emotions and cognitive style.",
    imageUrl: "/assets/chi-siamo/scintilla.webp",
    imageAlt: "Visual metaphor of a key entering a brain-shaped lock",
    align: "right"
  },
  {
    title: "Science, Empathy and Technology",
    content: "TutorAI is our answer. It's the meeting point between our 30+ years of experience in education, psychology and the most advanced artificial intelligence technologies. It's not just software. It's a platform built on three inseparable pillars: a tutor that adapts to you, a system that unites science and teaching, and a platform built on measurable results. We believe in the power of data to show real progress, not empty promises.",
    imageUrl: "/assets/chi-siamo/soluzione.webp",
    imageAlt: "Illustration of a neural network connecting to a human heart",
    align: "left"
  },
  {
    title: "Our Promise",
    content: "Our promise is simple and will never change: no abstract storytelling, but solutions for real problems that lead to concrete results. We are here to build confidence, fill gaps and, above all, to remind every student that success is not a matter of innate talent, but of finally having the right tools. Your tool.",
    imageUrl: "/assets/chi-siamo/promessa.webp",
    imageAlt: "Student smiling while looking at their positive results on a tablet",
    align: "right"
  }
];

export default function AboutUsPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-purple-800 opacity-80"></div>
        <div className="container mx-auto px-6 relative z-10">
          <AnimateOnScroll>
            <h1 className="text-4xl md:text-6xl font-bold !leading-tight">
              Born in a classroom, not in a lab.
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto">
              Our story doesn't begin with a line of code, but with the gaze of a struggling student.
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Alternating sections storytelling */}
      <div className="py-20 md:py-28 space-y-20 md:space-y-28">
        {sections.map((section, index) => (
          <AnimateOnScroll key={index}>
            <div className="container mx-auto px-6 max-w-7xl">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${section.align === 'right' ? 'md:grid-flow-col-dense' : ''}`}>
                
                {/* Image Column */}
                <div className={`perspective-container ${section.align === 'right' ? 'md:col-start-2' : ''}`}>
                  <div className="card-oblique glowing-border-follow relative">
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt}
                      width={600}
                      height={450}
                      className="rounded-2xl shadow-2xl object-cover w-full aspect-[4/3]"
                    />
                  </div>
                </div>

                {/* Text Column */}
                <div className={`${section.align === 'right' ? 'md:col-start-1' : ''}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">{section.title}</h2>
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p>{section.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {/* Team Section for Credibility */}
      <AnimateOnScroll>
        <div className="bg-white py-20 md:py-24 border-t border-gray-200">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Team Behind TutorAI
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A team of educators, psychologists and technologists united by the mission to transform learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Founder/CEO Profile */}
              <div className="perspective-container">
                <div className="card-border-animated bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
                    }}
                  >
                    AD
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Alessandro De Marco</h3>
                  <p className="text-primary font-semibold mb-3">Founder & CEO</p>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD in Cognitive Psychology - Milano State University<br/>
                    15+ years experience in school leadership
                  </p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://linkedin.com/in/alessandro-demarco-edutech" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <span className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* CTO Profile */}
              <div className="perspective-container">
                <div className="card-border-animated bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #047857)'
                    }}
                  >
                    MR
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Marco Rossi</h3>
                  <p className="text-primary font-semibold mb-3">CTO & Co-founder</p>
                  <p className="text-sm text-gray-600 mb-4">
                    MSc Computer Science - Politecnico Milano<br/>
                    Former Senior AI Engineer @ Google DeepMind
                  </p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://linkedin.com/in/marco-rossi-ai-educator" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <span className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Head of Education Profile */}
              <div className="perspective-container">
                <div className="card-border-animated bg-white rounded-2xl p-8 text-center shadow-lg">
                  <div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    }}
                  >
                    SF
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sara Fontana</h3>
                  <p className="text-primary font-semibold mb-3">Head of Educational Science</p>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD Educational Psychology - Università Cattolica<br/>
                    Specialist in Learning Disabilities
                  </p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href="https://linkedin.com/in/sara-fontana-educational-psychology" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <span className="text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Credibility Badges */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Awards and Partnerships</h3>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-blue-600 font-semibold">🏆</span>
                  <span className="text-sm font-medium text-blue-900">EdTech Innovation Award 2024</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-green-600 font-semibold">🔒</span>
                  <span className="text-sm font-medium text-green-900">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                  <span className="text-purple-600 font-semibold">🤝</span>
                  <span className="text-sm font-medium text-purple-900">Partner Milano State University</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                  <span className="text-orange-600 font-semibold">📊</span>
                  <span className="text-sm font-medium text-orange-900">ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Final CTA Section */}
      <AnimateOnScroll>
        <div className="bg-gray-50 py-20 md:py-24">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Join our mission
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
              We believe in a future where every student can reach their maximum potential. If you share this vision, you're in the right place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/en/beta-access" variant="secondary" className="text-lg">
                🚀 Request Beta Access
              </Button>
              <Button href="/en#features" variant="outline" className="text-lg">
                Discover Features
              </Button>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}