import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import itCommon from '@/locales/it/common.json';
import itPages from '@/locales/it/pages.json';
import enCommon from '@/locales/en/common.json';
import enPages from '@/locales/en/pages.json';

// Translation resources
const resources = {
  it: {
    common: itCommon,
    pages: itPages,
  },
  en: {
    common: enCommon,
    pages: enPages,
  },
};

// Helper function to get current language from URL
export const getLanguageFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Check if first segment is a supported language
  if (['en'].includes(firstSegment)) {
    return firstSegment;
  }
  
  return 'it'; // Default to Italian
};

// Get initial language from cookies or URL
const getInitialLanguage = (): string => {
  // Server-side: check cookies
  if (typeof window === 'undefined') {
    // This will be set by middleware based on route
    return 'it'; // Default, will be overridden by cookie
  }
  
  // Client-side: check URL
  const pathname = window.location.pathname;
  return getLanguageFromPath(pathname);
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    
    // Default to Italian
    lng: getInitialLanguage(),
    fallbackLng: 'it',
    
    // Available languages
    supportedLngs: ['it', 'en'],
    
    // Namespace configuration
    defaultNS: 'common',
    ns: ['common', 'pages'],
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Debug mode for development
    debug: false,
    
    // React options
    react: {
      useSuspense: false,
    },
  });

export default i18n;

// Helper function to generate localized path
export const getLocalizedPath = (path: string, locale: string): string => {
  // Remove leading slash and language prefix if present
  const cleanPath = path.replace(/^\//, '').replace(/^(en|it)\//, '');
  
  if (locale === 'it') {
    return `/${cleanPath}`;
  }
  
  return `/${locale}/${cleanPath}`;
};

// Route mappings for different languages
export const routeMap: Record<string, Record<string, string>> = {
  it: {
    'about-us': 'chi-siamo',
    'testimonials': 'testimonianze', 
    'contact': 'contatti',
    'privacy': 'privacy',
    'terms': 'terms',
    'faq': 'faq',
    'blog': 'blog',
    'how-it-works': 'come-funziona',
    'beta-access': 'beta-access',
    'beta-login': 'beta-login', 
    'beta-dashboard': 'beta-dashboard',
  },
  en: {
    'chi-siamo': 'about-us',
    'testimonianze': 'testimonials',
    'contatti': 'contact',
    'privacy': 'privacy',
    'terms': 'terms',
    'faq': 'faq',
    'blog': 'blog',
    'come-funziona': 'how-it-works',
    'beta-access': 'beta-access',
    'beta-login': 'beta-login',
    'beta-dashboard': 'beta-dashboard',
  },
};

// Helper function to get mapped route
export const getMappedRoute = (route: string, fromLang: string, toLang: string): string => {
  console.log('🗺️ getMappedRoute called:', { route, fromLang, toLang });
  
  // If route is empty (homepage), return empty string
  if (!route || route === '' || route === '/') {
    console.log('🏠 Route is homepage, returning empty string');
    return '';
  }
  
  // Handle blog articles: redirect to blog homepage when switching language
  if (route.startsWith('blog/') && route.includes('/')) {
    console.log('📝 Blog article detected, redirecting to blog homepage');
    return 'blog'; // Redirect to blog homepage in target language
  }
  
  // Pages that exist only in English - redirect to homepage if switching to Italian
  const englishOnlyPages: string[] = []; // All pages now have Italian versions
  if (toLang === 'it' && englishOnlyPages.includes(route)) {
    console.log('🇬🇧 English-only page detected, redirecting to homepage');
    return ''; // Redirect to homepage
  }
  
  // Pages that exist only in Italian - redirect to homepage if switching to English  
  const italianOnlyPages: string[] = []; // Add here if needed
  if (toLang === 'en' && italianOnlyPages.includes(route)) {
    console.log('🇮🇹 Italian-only page detected, redirecting to homepage');
    return ''; // Redirect to homepage
  }
  
  const mappings = routeMap[toLang];
  console.log('🗺️ Available mappings for target language:', mappings);
  
  if (fromLang !== toLang && mappings) {
    const mappedRoute = mappings[route];
    if (mappedRoute) {
      console.log('✅ Route mapped successfully:', { from: route, to: mappedRoute });
      return mappedRoute;
    } else {
      console.log('❌ No mapping found for route:', route);
    }
  }
  
  // If no mapping found, return the original route
  // This handles cases like beta-access which exist in both languages with same name
  console.log('🔄 No mapping found, returning original route:', route);
  return route;
};