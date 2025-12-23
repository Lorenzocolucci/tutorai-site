import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata('about', 'it');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}