'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { getAllBlogPosts } from '@/lib/blog-posts';
import { getAllBlogPostsEn } from '@/lib/blog-posts-en';

const Blog = () => {
  const { t, i18n } = useTranslation('pages');
  
  // Get current language to determine which blog posts to show
  const currentLang = i18n?.language || 'it';
  const featuredPosts = currentLang === 'en' 
    ? getAllBlogPostsEn().slice(0, 3)
    : getAllBlogPosts().slice(0, 3);
  
  // Language-aware blog link
  const blogLink = currentLang === 'en' ? '/en/blog' : '/blog';

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            {t('home.blog.title', 'Il Nostro Blog')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">
            {t('home.blog.subtitle', 'Articoli, approfondimenti e consigli per studenti, genitori e insegnanti. Scopri le ultime novità nel mondo dell\'educazione e dell\'intelligenza artificiale.')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article key={post.id} className="perspective-container">
                             <div className="card-border-animated bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
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
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} {t('home.blog.readTime', 'di lettura')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={currentLang === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 mt-auto"
                  >
                    {t('home.blog.cta.readArticle', 'Leggi l\'articolo')}
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
            href={blogLink} 
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold"
          >
            {t('home.blog.cta.viewAll', 'Vedi tutti gli articoli')}
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
