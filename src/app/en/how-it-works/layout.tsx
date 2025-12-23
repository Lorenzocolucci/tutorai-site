import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata('howItWorks', 'en');

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}