'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useModalScroll } from '@/utils/useModalScroll';
import { getAllBlogPosts, getFeaturedBlogPosts, categories } from '@/lib/blog-posts';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('tutti');
  const [selectedPost, setSelectedPost] = useState(null);
  const modalRef = useRef(null);

  // Usa il hook sicuro per la gestione dello scroll
  useModalScroll(!!selectedPost);

  const handlePostClick = (event, post) => {
    // Manteniamo la funzionalità modale per retrocompatibilità
    // ma aggiungiamo anche la navigazione diretta
    if (event.ctrlKey || event.metaKey) {
      // Apri in nuova tab
      window.open(`/blog/${post.slug}`, '_blank');
    } else {
      // Navigazione normale
      window.location.href = `/blog/${post.slug}`;
    }
  };

  // Usa il hook sicuro per la gestione dello scroll
  useEffect(() => {
    if (selectedPost) {
      // Focus trap per accessibilità
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [selectedPost]);

  // Gestione ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (selectedPost) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedPost]);

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Ottieni i post dal sistema centralizzato
  const blogPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'tutti' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = featuredPosts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="contain
        
    er mx-auto px-6 py-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors">
              ← Torna alla Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog TutorAI</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Articoli, ricerche e approfondimenti sul futuro dell'educazione e dell'apprendimento intelligente.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cerca articoli..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full whitespace-nowrap text-base font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === 'tutti' && searchTerm === '' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Articolo in Evidenza</h2>
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-700 text-lg mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{featuredPost.date}</span>
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                      Leggi completo →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {activeCategory === 'tutti' ? 'Tutti gli Articoli' : `Articoli ${activeCategory}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col min-h-[300px]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Key Takeaways - RIMOSSI dalle schede preview per UX migliore */}
                  {/* I punti chiave appaiono solo nella pagina completa dell'articolo */}
                  
                  <div className="blog-card-footer">
                    <span className="blog-card-date">{post.date}</span>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="blog-card-link"
                    >
                      Leggi completo →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Rimani Aggiornato</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Iscriviti alla nostra newsletter per ricevere i migliori articoli e consigli direttamente nella tua email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Iscriviti
            </button>
          </div>
        </div>
      </div>

      {/* Modal per Articolo Completo - Mantenuto per retrocompatibilità */}
      {selectedPost && createPortal(
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <div 
            ref={modalRef}
            className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary to-purple-600 border-b border-gray-200 p-6 flex justify-between items-center flex-shrink-0 rounded-t-3xl">
              <h2 id="blog-modal-title" className="text-2xl font-bold text-white">{selectedPost.title}</h2>
              <button
                onClick={handleCloseModal}
                className="text-white/80 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/20"
                aria-label="Chiudi modale"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-gradient-to-b from-gray-50 to-white">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {selectedPost.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedPost.readTime} di lettura
                </span>
                <span>•</span>
                <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">{selectedPost.category}</span>
              </div>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
          
          <style jsx>{`
            @keyframes fade-in-scale {
              from { 
                opacity: 0; 
                transform: scale(0.95) translateY(-10px); 
              }
              to { 
                opacity: 1; 
                transform: scale(1) translateY(0); 
              }
            }
            .animate-fade-in-scale { 
              animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); 
            }
            
            @media (max-width: 768px) {
              .animate-fade-in-scale {
                animation: fade-in-scale 0.2s forwards cubic-bezier(0.16, 1, 0.3, 1);
              }
            }
          `}</style>
        </div>,
        document.body
      )}
    </div>
  );
};

export default BlogPage;
