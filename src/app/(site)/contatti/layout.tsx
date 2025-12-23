import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata('contact', 'it');

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
