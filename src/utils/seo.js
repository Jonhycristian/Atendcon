import { useEffect } from 'react';

const SITE_URL = 'https://www.atendcon.com.br';

function upsertMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Aplica SEO específico da rota em SPA:
 * - <title> e meta description únicos por página
 * - canonical da rota
 * - Open Graph básicos da rota
 * - Schema.org FAQPage gerado a partir do array de FAQs da página
 */
export function applyPageSeo({ title, description, path = '/', faqs = [], preloadImage = null }) {
  const url = `${SITE_URL}${path}`;

  document.title = title;
  upsertMeta('description', description);
  upsertLinkCanonical(url);
  upsertMeta('og:title', title, 'property');
  upsertMeta('og:description', description, 'property');
  upsertMeta('og:url', url, 'property');
  upsertMeta('twitter:title', title);
  upsertMeta('twitter:description', description);

  const oldPreload = document.head.querySelector('link[data-page-preload]');
  if (oldPreload) oldPreload.remove();
  if (preloadImage) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'preload');
    link.setAttribute('as', 'image');
    link.setAttribute('href', preloadImage);
    link.setAttribute('fetchpriority', 'high');
    link.setAttribute('data-page-preload', 'true');
    document.head.appendChild(link);
  }

  const old = document.head.querySelector('script[data-page-faq-schema]');
  if (old) old.remove();

  if (Array.isArray(faqs) && faqs.length > 0) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-faq-schema', 'true');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
    document.head.appendChild(script);
  }
}

export function usePageSeo(options) {
  useEffect(() => {
    applyPageSeo(options);
  }, []);
}
