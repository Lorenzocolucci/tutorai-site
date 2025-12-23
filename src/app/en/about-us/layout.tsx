import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata('about', 'en');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}