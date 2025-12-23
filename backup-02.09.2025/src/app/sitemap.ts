// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mytutorai.app'; // SOSTITUISCI CON IL TUO DOMINIO FINALE

  // Pagine statiche principali
  const staticPages = [
    '', // Homepage
    '/chi-siamo',
    '/faq',
    '/blog',
    '/privacy',
    '/terms',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Genera URL per entrambe le lingue
  staticPages.forEach(page => {
    // Versione italiana
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    });

    // Versione inglese
    sitemapEntries.push({
      url: `${baseUrl}/en${page === '' ? '' : page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    });
  });

  // AGGIUNGI TUTTI I POST DEL BLOG DINAMICAMENTE
  const posts = getAllBlogPosts();
  posts.forEach(post => {
    sitemapEntries.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified || post.publishedAt,
      changeFrequency: 'monthly',
      priority: post.featured ? 0.9 : 0.7,
    });
  });

  return sitemapEntries;
}
