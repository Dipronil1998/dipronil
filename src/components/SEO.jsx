import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, getPersonJsonLd, getBreadcrumbJsonLd } from '../utils/seoConfig';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * SEO Component for Dynamic Head Metadata & Structured Data
 */
export default function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  breadcrumbs = [],
  customSchema = null,
}) {
  const location = useLocation();
  const { personal } = usePortfolio();

  useEffect(() => {
    // Current URL calculation
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : SEO_CONFIG.siteUrl;
    const currentUrl = `${currentOrigin}${location.pathname}`;

    // Compute meta values
    const finalTitle = title 
      ? `${title} | ${personal?.name || SEO_CONFIG.author}` 
      : (personal?.name ? `${personal.name} | ${personal.title || 'Full Stack Developer'}` : SEO_CONFIG.defaultTitle);
    
    const finalDesc = description || personal?.bio || SEO_CONFIG.defaultDescription;
    const finalKeywords = keywords || SEO_CONFIG.keywords.join(', ');
    const finalImage = image ? (image.startsWith('http') ? image : `${currentOrigin}${image}`) : `${currentOrigin}${SEO_CONFIG.ogImage}`;

    // 1. Update Document Title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', finalDesc);
    setMetaTag('name', 'keywords', finalKeywords);
    setMetaTag('name', 'author', personal?.name || SEO_CONFIG.author);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', finalTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', finalImage);
    setMetaTag('property', 'og:site_name', `${personal?.name || SEO_CONFIG.author} Portfolio`);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', finalTitle);
    setMetaTag('name', 'twitter:description', finalDesc);
    setMetaTag('name', 'twitter:image', finalImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // 5. Canonical Link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 6. JSON-LD Structured Data
    const baseSchema = getPersonJsonLd({
      name: personal?.name,
      title: personal?.title,
      bio: personal?.bio,
      github: personal?.github,
      linkedin: personal?.linkedin,
      medium: personal?.medium,
    });

    const schemaGraph = [...baseSchema['@graph']];

    // Add Breadcrumb schema if breadcrumbs are provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push(getBreadcrumbJsonLd(breadcrumbs));
    }

    // Add custom schema if provided
    if (customSchema) {
      if (Array.isArray(customSchema)) {
        schemaGraph.push(...customSchema);
      } else {
        schemaGraph.push(customSchema);
      }
    }

    const fullSchema = {
      '@context': 'https://schema.org',
      '@graph': schemaGraph,
    };

    let scriptTag = document.getElementById('dynamic-seo-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-seo-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(fullSchema, null, 2);

  }, [title, description, keywords, image, type, location.pathname, personal, breadcrumbs, customSchema]);

  return null;
}
