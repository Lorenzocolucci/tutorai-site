import { Metadata } from 'next';
import { getBlogPostBySlugEn, getAllBlogPostsEn } from '@/lib/blog-posts-en';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlugEn(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | TutorAI',
      description: 'The article you are looking for does not exist.',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author || 'TutorAI Team' }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.lastModified?.toISOString(),
      authors: [post.author || 'TutorAI Team'],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://www.mytutorai.app/en/blog/${post.slug}`,
      languages: post.hreflang ? Object.fromEntries(
        post.hreflang.map(lang => [lang.split('-')[0], `https://www.mytutorai.app/${lang.split('-')[0]}/blog/${post.slug}`])
      ) : undefined,
    },
  };
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const posts = getAllBlogPostsEn();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlugEn(params.slug);

  if (!post) {
    notFound();
  }

  // Schema.org JSON-LD for individual article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author || 'TutorAI Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TutorAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mytutorai.app/logo.png',
      },
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.lastModified?.toISOString() || post.publishedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mytutorai.app/en/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category,
    inLanguage: 'en-US',
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mytutorai.app/en',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.mytutorai.app/en/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.mytutorai.app/en/blog/${post.slug}`,
      },
    ],
  };

  // FAQ Schema - Only if article has FAQ
  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced breadcrumb for better visibility */}
             <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl shadow-lg">
               <Link 
                 href="/en"
                 className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-all duration-300 font-semibold bg-white px-4 py-3 rounded-lg border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg hover:scale-105"
               >
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                 </svg>
                 Back to Home
               </Link>
               <span className="text-blue-400 font-bold text-xl">•</span>
               <Link 
                 href="/en/blog"
                 className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-all duration-300 font-semibold bg-white px-4 py-3 rounded-lg border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg hover:scale-105"
               >
                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
                 Back to Blog
               </Link>
             </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} read
              </span>
              <span>•</span>
              <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {post.author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">TutorAI Team</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Table of Contents - If present */}
          {post.toc && post.toc.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
              <ul className="space-y-2">
                {post.toc.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`#${item.anchor}`}
                      className="text-primary hover:text-purple-600 transition-colors font-medium hover:underline"
                    >
                      {index + 1}. {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Takeaways - If present */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
              <ul className="space-y-3">
                {post.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-3 mt-1">•</span>
                    <span className="text-gray-700">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* FAQ - If present */}
          {post.faq && post.faq.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {post.faq.map((item, index) => (
                  <details key={index} className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors">
                      {item.question}
                    </summary>
                    <p className="mt-2 text-gray-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Bibliography - If present */}
          {post.bibliography && post.bibliography.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bibliography</h3>
              <div className="space-y-3">
                {post.bibliography.map((ref, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    <p className="font-medium">{ref.author} ({ref.year}). {ref.title}.</p>
                    {ref.journal && <p className="text-gray-600">{ref.journal}.</p>}
                    {ref.doi && (
                      <p className="text-primary">
                        <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          DOI: {ref.doi}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-lg mb-6 opacity-90">
              Discover how TutorAI can personalize education for your learning style.
            </p>
            <Link
              href="/en/beta-access"
              className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Request Beta Access
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}