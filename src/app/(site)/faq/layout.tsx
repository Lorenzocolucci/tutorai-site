import { generateSEOMetadata, generateFAQSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata('faq', 'it');

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Schema.org JSON-LD per FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema('it')),
        }}
      />
      {children}
    </>
  );
}
