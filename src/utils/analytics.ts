// Google Analytics + Consent Mode v2 (stub)
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const setDefaultConsent = () => {
  if (typeof window === "undefined" || !("gtag" in window)) return;
  window.gtag?.('consent','default',{
    ad_storage:'denied',
    analytics_storage:'denied'
  });
};

export const updateConsent = (opts:{ad:boolean; analytics:boolean}) => {
  if (typeof window === "undefined" || !("gtag" in window)) return;
  window.gtag?.('consent','update',{
    ad_storage: opts.ad ? 'granted' : 'denied',
    analytics_storage: opts.analytics ? 'granted' : 'denied'
  });
};

declare global {
  interface Window {
    gtag?: (...args:any[]) => void
  }
}
