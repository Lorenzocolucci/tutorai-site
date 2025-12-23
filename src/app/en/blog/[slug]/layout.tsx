import { type Metadata } from 'next';
import { getBlogPostBySlugEn, getAllBlogPostsEn } from '@/lib/blog-posts-en';
import { notFound } from 'next/navigation';

interface BlogPostLayoutProps {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}

// Generate dynamic SEO metadata for each article
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlugEn(params.slug);
  
  if (!post) {
    return {
      title: 'Article not found | TutorAI Blog',
      description: 'The article you are looking for was not found.',
    };
  }

  const baseUrl = 'https://www.mytutorai.app';
  const postUrl = `${baseUrl}/en/blog/${post.slug}`;
  
  return {
    title: post.seoTitle || `${post.title} | TutorAI Blog`,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags?.join(', ') || `${post.category}, TutorAI, Education, Learning`,
    authors: [{ name: post.author || 'TutorAI Team' }],
    creator: 'TutorAI',
    publisher: 'TutorAI',
    category: post.category,
    
    // Open Graph for social sharing
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
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author || 'TutorAI Team'],
      section: post.category,
      tags: post.tags,
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [`${baseUrl}${post.image}`],
      creator: '@TutorAI_UK',
      site: '@TutorAI_UK',
    },
    
    // Canonical URL
    alternates: {
      canonical: postUrl,
      languages: {
        'en-US': postUrl,
        'it-IT': `${baseUrl}/blog/${post.slug}`,
      },
    },
    
    // Schema.org JSON-LD will be added in the component
    other: {
      'article:published_time': post.publishedAt.toISOString(),
      'article:author': post.author || 'TutorAI Team',
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

// Generate all possible slugs for static generation
export async function generateStaticParams() {
  const posts = getAllBlogPostsEn();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ params, children }: BlogPostLayoutProps) {
  const post = getBlogPostBySlugEn(params.slug);
  
  if (!post) {
    notFound();
    return null;
  }

  const baseUrl = 'https://www.mytutorai.app';
  const postUrl = `${baseUrl}/en/blog/${post.slug}`;
  
  // Schema.org JSON-LD for Rich Results
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
      name: post.author || 'TutorAI Team',
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
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      name: 'TutorAI Blog',
      url: `${baseUrl}/en/blog`,
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: [postUrl],
    },
  };

  return (
    <>
      {/* JSON-LD Schema for Google Rich Results */}
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