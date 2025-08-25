// src/app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.mytutorai.app'; // SOSTITUISCI CON IL TUO DOMINIO FINALE

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/beta-access/',
        '/beta-login/',
        '/beta-dashboard/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
