import { generateSEOMetadata, generateBlogSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata('blog', 'it');

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Schema.org JSON-LD per Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogSchema('it')),
        }}
      />
      {children}
    </>
  );
}