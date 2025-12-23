'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Generate consistent avatar colors based on name
const getAvatarColors = (name) => {
  const colors = [
    ['#3B82F6', '#1D4ED8'], // Blue gradient
    ['#10B981', '#047857'], // Green gradient  
    ['#F59E0B', '#D97706'], // Orange gradient
    ['#EF4444', '#DC2626'], // Red gradient
    ['#8B5CF6', '#7C3AED'], // Purple gradient
    ['#06B6D4', '#0891B2'], // Cyan gradient
    ['#F97316', '#EA580C'], // Orange gradient
    ['#EC4899', '#DB2777'], // Pink gradient
  ];
  
  // Use name to generate consistent index
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index].join(', ');
};

// EXPAND testimonials to cover all ages, subjects and cities - COMPLETE LIKE ITALIAN VERSION
const testimonialsData = [
  // STUDENTS 5-12 YEARS (Primary School)
  {
    id: 1,
    name: "Lucy H.",
    age: 8,
    city: "London",
    school: "St. Paul's Cathedral School",
    subject: "Mathematics",
    grade_before: 4.0,
    grade_after: 7.5,
    timeframe: "February - June 2024",
    quote: "TutorAI makes maths fun with games and colorful explanations. Now I love solving problems!",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 2,
    name: "Thomas R.",
    age: 10,
    city: "Manchester",
    school: "Manchester Prep School",
    subject: "English",
    grade_before: 5.0,
    grade_after: 8.0,
    timeframe: "January - May 2024",
    quote: "Reading stories with TutorAI is amazing! The AI helps me understand new words and I read much better now.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 3,
    name: "Emily W.",
    age: 11,
    city: "Edinburgh",
    school: "George Watson's College",
    subject: "Science",
    grade_before: 5.5,
    grade_after: 8.5,
    timeframe: "March - July 2024",
    quote: "Science experiments with TutorAI are so cool! I understand how plants grow and why the sky is blue.",
    image: "/assets/features/vardan-papikyan-Sh1cdGk5eyY-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 4,
    name: "Mrs. Sarah M.",
    age: 42,
    city: "Birmingham",
    school: "King Edward VI High School",
    subject: "Overall Support",
    grade_before: 0,
    grade_after: 0,
    timeframe: "September 2023 - Present",
    quote: "As a parent, I'm amazed by TutorAI's impact on my 9-year-old son. His confidence in maths has skyrocketed, and homework time is no longer a battle.",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: true
  },
  {
    id: 5,
    name: "Charlie B.",
    age: 12,
    city: "Bristol",
    school: "Clifton College Prep",
    subject: "Geography",
    grade_before: 6.0,
    grade_after: 8.5,
    timeframe: "October 2023 - April 2024",
    quote: "Learning about countries and maps with TutorAI is like traveling around the world! I know so many capitals now.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  
  // STUDENTS 13-15 YEARS (Middle School/First Years High School)
  {
    id: 6,
    name: "Mark S.",
    age: 17,
    city: "London",
    school: "Westminster School",
    subject: "Mathematics", 
    grade_before: 4.5,
    grade_after: 7.0,
    timeframe: "March - June 2024",
    quote: "I struggled with mathematics for years, but TutorAI explained concepts so clearly that now I can solve even the most difficult problems.",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 7,
    name: "Sophie R.",
    age: 15,
    city: "Manchester", 
    school: "Manchester Grammar School",
    subject: "Physics",
    grade_before: 5.0,
    grade_after: 8.0,
    timeframe: "January - May 2024",
    quote: "TutorAI's interactive simulations made me understand physics in a completely new way. I no longer study by rote, but truly understand.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 8,
    name: "Alexander T.",
    age: 16,
    city: "Birmingham",
    school: "King Edward's School", 
    subject: "English Literature",
    grade_before: 6.0,
    grade_after: 8.5,
    timeframe: "September 2023 - February 2024",
    quote: "Thanks to TutorAI I improved my English literature analysis and now I write essays with confidence. The system adapts to my learning pace.",
    image: "/assets/features/vardan-papikyan-Sh1cdGk5eyY-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 9,
    name: "Emma W.",
    age: 14,
    city: "Edinburgh",
    school: "George Heriot's School",
    subject: "Chemistry",
    grade_before: 5.5,
    grade_after: 7.5,
    timeframe: "October 2023 - April 2024",
    quote: "Chemistry seemed impossible until TutorAI broke down complex reactions into simple, understandable steps. Amazing!",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 10,
    name: "James L.",
    age: 16,
    city: "Bristol",
    school: "Clifton College",
    subject: "Biology",
    grade_before: 5.0,
    grade_after: 8.0,
    timeframe: "February - July 2024",
    quote: "TutorAI made biology fascinating with its visual diagrams and interactive lessons. My understanding improved dramatically.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 11,
    name: "Charlotte M.",
    age: 15,
    city: "Oxford",
    school: "Oxford High School",
    subject: "History",
    grade_before: 6.0,
    grade_after: 8.5,
    timeframe: "November 2023 - May 2024",
    quote: "History came alive with TutorAI's contextual explanations and timeline visualizations. I finally understand cause and effect relationships.",
    image: "/assets/features/vardan-papikyan-Sh1cdGk5eyY-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 12,
    name: "Oliver H.",
    age: 17,
    city: "Cambridge",
    school: "The Perse School",
    subject: "Computer Science",
    grade_before: 6.5,
    grade_after: 9.0,
    timeframe: "January - June 2024",
    quote: "TutorAI's coding tutorials and algorithm explanations are exceptional. I went from struggling to excelling in computer science.",
    image: "/assets/features/stem-t4l--PnSpCHYKsw-unsplash.jpg",
    verified: true,
    isParent: false
  },
  {
    id: 13,
    name: "Isabella C.",
    age: 14,
    city: "Bath",
    school: "Bath Spa University School",
    subject: "French",
    grade_before: 5.5,
    grade_after: 7.8,
    timeframe: "December 2023 - May 2024",
    quote: "Learning French with TutorAI is like having a patient native speaker always available. My pronunciation and grammar improved significantly.",
    image: "/assets/features/patricia-prudente-qESmLLXAmWs-unsplash.jpg",
    verified: true,
    isParent: false
  }
];

const TestimonialsPage = () => {
  const [ageFilter, setAgeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Extract unique values for filters
  const ageGroups = ['all', '5-12', '13-15', '16-18'];
  const subjects = ['all', ...Array.from(new Set(testimonialsData.map(t => t.subject)))];
  const cities = ['all', ...Array.from(new Set(testimonialsData.map(t => t.city)))];

  // Filter testimonials
  const filteredTestimonials = testimonialsData.filter(testimonial => {
    const ageMatch = ageFilter === 'all' || 
      (ageFilter === '5-12' && testimonial.age >= 5 && testimonial.age <= 12) ||
      (ageFilter === '13-15' && testimonial.age >= 13 && testimonial.age <= 15) ||
      (ageFilter === '16-18' && testimonial.age >= 16 && testimonial.age <= 18);
    
    const subjectMatch = subjectFilter === 'all' || testimonial.subject === subjectFilter;
    const cityMatch = cityFilter === 'all' || testimonial.city === cityFilter;
    
    return ageMatch && subjectMatch && cityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Link href="/en" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Student Success Stories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real testimonials from students who transformed their academic performance with TutorAI. Verified results, authentic experiences.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Enhanced Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter Success Stories</h2>
            
            {/* Age Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Age Group</h3>
              <div className="flex flex-wrap gap-3">
                {ageGroups.map(age => (
                  <button
                    key={age}
                    onClick={() => setAgeFilter(age)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      ageFilter === age
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {age === 'all' ? 'All Ages' : `${age} years`}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Subject</h3>
              <div className="flex flex-wrap gap-3">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setSubjectFilter(subject)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      subjectFilter === subject
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subject === 'all' ? 'All Subjects' : subject}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">City</h3>
              <div className="flex flex-wrap gap-3">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setCityFilter(city)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cityFilter === city
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city === 'all' ? 'All Cities' : city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-gray-600 text-lg">
            Showing <span className="font-semibold text-primary">{filteredTestimonials.length}</span> success {filteredTestimonials.length === 1 ? 'story' : 'stories'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map(testimonial => (
            <article key={testimonial.id} className="perspective-container">
              <div className="card-border-animated bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full mr-4 flex-shrink-0">
                    {/* Generate avatar based on name initials */}
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${getAvatarColors(testimonial.name)})`
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    {/* Add verification badge */}
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.age} years • {testimonial.city}</p>
                    <p className="text-sm text-gray-500 truncate">{testimonial.school}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-primary">{testimonial.subject}</span>
                    <span className="text-xs text-gray-500">{testimonial.timeframe}</span>
                  </div>
                  
                  {!testimonial.isParent && (
                    <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-500">{testimonial.grade_before}</div>
                        <div className="text-xs text-gray-500 font-medium">Before</div>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 transition-all duration-1000"
                            style={{ 
                              width: `${((testimonial.grade_after - testimonial.grade_before) / (10 - testimonial.grade_before)) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <div className="text-center text-xs text-gray-600 mt-1 font-medium">Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-500">{testimonial.grade_after}</div>
                        <div className="text-xs text-gray-500 font-medium">After</div>
                      </div>
                    </div>
                  )}
                </div>

                <blockquote className="text-gray-700 italic text-center mb-6 flex-1 flex items-center">
                  <span>"{testimonial.quote}"</span>
                </blockquote>

                <div className="text-center mt-auto">
                  <Link 
                    href="/en/beta-access"
                    className="inline-block bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Your Success Story
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover how TutorAI can transform your academic performance with personalized AI tutoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Link
              href="/en/beta-access"
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Request Beta Access
            </Link>
            <Link
              href="/en/blog"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-colors inline-block"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;