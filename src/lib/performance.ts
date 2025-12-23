// Configurazione per ottimizzazioni di performance e Core Web Vitals

// Dichiarazione globale per gtag
declare global {
  function gtag(...args: any[]): void;
}

// Preload delle risorse critiche
export const criticalResources = [
  '/assets/hero/main-hero.webp',
  '/assets/logo.png',
  '/assets/favicon.ico',
];

// Configurazione per lazy loading
export const lazyLoadConfig = {
  threshold: 0.1,
  rootMargin: '50px',
};

// Configurazione per immagini
export const imageOptimization = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
};

// Configurazione per font
export const fontOptimization = {
  display: 'swap',
  preload: true,
  fallback: 'system-ui, -apple-system, sans-serif',
};

// Configurazione per Core Web Vitals
export const coreWebVitals = {
  // Largest Contentful Paint (LCP) - target: < 2.5s
  lcp: {
    target: 2500,
    warning: 4000,
  },
  // First Input Delay (FID) - target: < 100ms
  fid: {
    target: 100,
    warning: 300,
  },
  // Cumulative Layout Shift (CLS) - target: < 0.1
  cls: {
    target: 0.1,
    warning: 0.25,
  },
  // First Contentful Paint (FCP) - target: < 1.8s
  fcp: {
    target: 1800,
    warning: 3000,
  },
  // Time to Interactive (TTI) - target: < 3.8s
  tti: {
    target: 3800,
    warning: 7300,
  },
};

// Configurazione per caching
export const cacheConfig = {
  static: {
    maxAge: 31536000, // 1 anno
    immutable: true,
  },
  dynamic: {
    maxAge: 3600, // 1 ora
    staleWhileRevalidate: 86400, // 24 ore
  },
  api: {
    maxAge: 300, // 5 minuti
    staleWhileRevalidate: 3600, // 1 ora
  },
};

// Configurazione per compressione
export const compressionConfig = {
  gzip: true,
  brotli: true,
  minify: {
    html: true,
    css: true,
    js: true,
  },
};

// Configurazione per bundle splitting
export const bundleSplitting = {
  vendor: ['react', 'react-dom', 'next'],
  common: ['lodash', 'date-fns'],
  pages: true,
  chunks: true,
};

// Configurazione per service worker
export const serviceWorkerConfig = {
  enabled: true,
  cacheFirst: ['/assets/', '/_next/static/'],
  networkFirst: ['/api/', '/blog/'],
  staleWhileRevalidate: ['/'],
};

// Funzione per misurare Core Web Vitals
export function measureWebVitals(metric: any) {
  if (typeof window !== 'undefined') {
    // Invia metriche a Google Analytics o altro servizio
    console.log('Web Vital:', metric);
    
    // Esempio di invio a Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  }
}

// Funzione per preload delle risorse critiche
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.webp') || resource.endsWith('.jpg') || resource.endsWith('.png') ? 'image' : 'fetch';
      document.head.appendChild(link);
    });
  }
}

// Funzione per ottimizzare le immagini
export function optimizeImage(src: string, width?: number, height?: number): string {
  // Implementazione per ottimizzazione immagini
  // Potrebbe utilizzare un CDN o servizio di ottimizzazione
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', imageOptimization.quality.toString());
  params.set('f', 'webp');
  
  return `${src}?${params.toString()}`;
}

// Funzione per debounce per performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Funzione per throttle per performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
