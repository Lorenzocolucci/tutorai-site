'use client';

import Link from 'next/link';
import Image from 'next/image';

const Blog = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Come l'Intelligenza Artificiale Sta Rivoluzionando l'Educazione",
      excerpt: "Scopri come l'IA sta trasformando il modo in cui gli studenti imparano e come TutorAI sta in prima linea in questa rivoluzione.",
      category: "Tecnologia",
      date: "15 Gennaio 2025",
      readTime: "5 min",
      image: "/assets/features/pexels-shkrabaanthony-5306436.jpg"
    },
    {
      id: 2,
      title: "I 5 Stili di Apprendimento: Come TutorAI Si Adatta a Ciascuno",
      excerpt: "Ogni studente è diverso. Vediamo come TutorAI personalizza l'esperienza di apprendimento per ogni stile cognitivo.",
      category: "Educazione",
      date: "12 Gennaio 2025",
      readTime: "4 min",
      image: "/assets/features/pexels-shkrabaanthony-5306455.jpg"
    },
    {
      id: 3,
      title: "Matematica Senza Paura: Strategie per Superare l'Ansia",
      excerpt: "La matematica non deve essere spaventosa. Condividiamo tecniche comprovate per affrontare l'ansia matematica.",
      category: "Psicologia",
      date: "10 Gennaio 2025",
      readTime: "6 min",
      image: "/assets/features/cowomen-hz-6prUpVss-unsplash.jpg"
    }
  ];

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Il Nostro Blog</h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            Articoli, approfondimenti e consigli per studenti, genitori e insegnanti. 
            Scopri le ultime novità nel mondo dell'educazione e dell'intelligenza artificiale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article key={post.id} className="perspective-container">
                             <div className="card-border-animated bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} di lettura</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    href="/blog" 
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2"
                  >
                    Leggi l'articolo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold"
          >
            Vedi tutti gli articoli
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
