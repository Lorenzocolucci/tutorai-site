import { type Metadata } from 'next';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog-posts';
import { notFound } from 'next/navigation';

interface BlogPostLayoutProps {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}

// Genera metadata SEO dinamici per ogni articolo
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Articolo non trovato | TutorAI Blog',
      description: 'L\'articolo che stai cercando non è stato trovato.',
    };
  }

  const baseUrl = 'https://www.mytutorai.app';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  return {
    title: post.seoTitle || `${post.title} | TutorAI Blog`,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags?.join(', ') || `${post.category}, TutorAI, Educazione, Apprendimento`,
    authors: [{ name: post.author || 'Team TutorAI' }],
    creator: 'TutorAI',
    publisher: 'TutorAI',
    category: post.category,
    
    // Open Graph per social sharing
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: postUrl,
      siteName: 'TutorAI Blog',
      images: [
        {
          url: `${baseUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'it_IT',
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author || 'Team TutorAI'],
      section: post.category,
      tags: post.tags,
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [`${baseUrl}${post.image}`],
      creator: '@TutorAI_Italia',
      site: '@TutorAI_Italia',
    },
    
    // Canonical URL
    alternates: {
      canonical: postUrl,
      languages: {
        'it-IT': postUrl,
      },
    },
    
    // Schema.org JSON-LD sarà aggiunto nel component
    other: {
      'article:published_time': post.publishedAt.toISOString(),
      'article:author': post.author || 'Team TutorAI',
      'article:section': post.category,
      'article:tag': post.tags?.join(',') || '',
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Genera tutti i possibili slug per static generation
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ params, children }: BlogPostLayoutProps) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
    return null;
  }

  const baseUrl = 'https://www.mytutorai.app';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  // Schema.org JSON-LD per Rich Results
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}${post.image}`,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author || 'Team TutorAI',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TutorAI',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.publishedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    keywords: post.tags?.join(', ') || post.category,
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    articleBody: post.content.replace(/<[^>]*>/g, ''),
    url: postUrl,
    isPartOf: {
      '@type': 'Blog',
      name: 'TutorAI Blog',
      url: `${baseUrl}/blog`,
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: [postUrl],
    },
  };

  return (
    <>
      {/* JSON-LD Schema per Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
      {children}
    </>
  );
}