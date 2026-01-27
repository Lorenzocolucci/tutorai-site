import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import "../styles/animations.css";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";
import I18nProvider from "@/components/providers/I18nProvider";
import { generateSEOMetadata, generateOrganizationSchema } from "@/lib/seo";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // Assegniamo una variabile CSS per usarla in Tailwind
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = generateSEOMetadata('home', 'it');

// CORREZIONE #6: Configurazione viewport separata come richiesto da Next.js 14
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3, // Permette zoom fino a 3x
  minimumScale: 1, // Impedisce zoom out sotto 1x
  userScalable: true, // Permette il pinch-to-zoom
  viewportFit: 'cover', // Gestisce meglio i notch
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Script per gestire il reset del viewport dopo zoom */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let currentScale = 1;
                let lastTouchEnd = 0;
                
                // Gestisce il reset del viewport dopo zoom
                function resetViewport() {
                  const viewport = document.querySelector('meta[name="viewport"]');
                  if (viewport) {
                    viewport.setAttribute('content', 
                      'width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=yes, viewport-fit=cover'
                    );
                  }
                }
                
                // Previene il double-tap zoom su iOS
                document.addEventListener('touchend', function (event) {
                  const now = (new Date()).getTime();
                  if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                  }
                  lastTouchEnd = now;
                }, false);
                
                // Reset viewport quando la finestra cambia orientamento
                window.addEventListener('orientationchange', function() {
                  setTimeout(resetViewport, 100);
                });
                
                // Reset viewport quando la finestra viene ridimensionata
                window.addEventListener('resize', function() {
                  setTimeout(resetViewport, 100);
                });
                
                // Inizializza
                resetViewport();
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-text-primary safe-area-top safe-area-bottom`}>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema('it')),
          }}
        />
        <I18nProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
