'use client';

import { useState } from 'react';
import Link from 'next/link';

const BetaDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen-safe bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span role="img" aria-label="brain">🧠</span>
            <span className="text-xl font-bold text-text-primary">TutorAI Beta</span>
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">BETA</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">Welcome, Beta Tester!</span>
            <Link href="/en" className="text-text-secondary hover:text-primary transition-colors text-sm">
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="perspective-container">
          <div className="card-oblique glowing-border-follow bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            🎉 Welcome to TutorAI Beta!
          </h1>
          <p className="text-text-secondary">
            Thank you for being one of the first to test the future of personalized education. 
            Your experience and feedback are crucial to improving TutorAI.
          </p>
        </div>
      </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'subjects', label: 'Subjects', icon: '📚' },
            { id: 'progress', label: 'Progress', icon: '📈' },
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
                  <h2 className="text-xl font-bold text-text-primary mb-4">🚀 Beta Status</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-primary/5 rounded-xl">
                      <div className="text-2xl font-bold text-primary">342</div>
                      <div className="text-sm text-text-secondary">Active Beta Testers</div>
                    </div>
                    <div className="text-center p-4 bg-success/5 rounded-xl">
                      <div className="text-2xl font-bold text-success">89%</div>
                      <div className="text-sm text-text-secondary">Satisfaction Rate</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/5 rounded-xl">
                      <div className="text-2xl font-bold text-secondary">15</div>
                      <div className="text-sm text-text-secondary">Days to Launch</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">🎯 Next Steps</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">1</div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Complete Your Profile</h3>
                        <p className="text-sm text-text-secondary">Add your subjects of interest to personalize your experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">2</div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Start Your First Test</h3>
                        <p className="text-sm text-text-secondary">Try TutorAI's features with a topic of your choice</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">3</div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Send Feedback</h3>
                        <p className="text-sm text-text-secondary">Share your experience to help us improve</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">📚 Available Subjects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Philosophy', 'Latin'].map(subject => (
                    <div key={subject} className="border border-gray-200 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer">
                      <h3 className="font-semibold text-text-primary">{subject}</h3>
                      <p className="text-sm text-text-secondary mt-1">Available for testing</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">📈 Your Progress</h2>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-text-secondary">Your progress data will appear here after you start using TutorAI</p>
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-text-primary mb-4">💬 Send Feedback</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <option>Bug Report</option>
                      <option>Feature Suggestion</option>
                      <option>UI/UX Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Message
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Describe your feedback..."
                    />
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    Send Feedback
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">🎁 Beta Benefits</h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Free access for 30 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Direct team support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Influence on features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>50% discount at launch</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">📞 Support</h3>
              <p className="text-sm text-text-secondary mb-4">
                Need help? Our team is here for you.
              </p>
              <button className="w-full bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold hover:bg-primary/20 transition-colors">
                Contact Support
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Beta Version</h3>
              <p className="text-sm text-yellow-700">
                This is a beta version. Some features might not work perfectly. 
                Thank you for your patience!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaDashboardPage;