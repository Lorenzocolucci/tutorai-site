// src/app/sitemap.ts

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mytutorai.app'; // SOSTITUISCI CON IL TUO DOMINIO FINALE

  // Pagine statiche principali
  const staticPages = [
    '', // Homepage
    '/chi-siamo',
    '/faq',
    '/blog', // Anche se il blog non è completo, è bene includerlo
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

  // QUI, IN FUTURO, AGGIUNGERAI LA LOGICA PER I POST DEL BLOG DINAMICI
  // const posts = await getAllBlogPosts(); // Esempio di fetch da un CMS
  // posts.forEach(post => {
  //   sitemapEntries.push({
  //     url: `${baseUrl}/blog/${post.slug}`,
  //     lastModified: post.updatedAt,
  //     // ... etc
  //   });
  // });

  return sitemapEntries;
}
