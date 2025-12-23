import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata('testimonials', 'it');

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}