/**
 * SEO & Metadata Configuration for Dipronil Das Portfolio
 * Optimized for Google Search #1 Ranking, Knowledge Panel & Social Media Cards
 */

export const SEO_CONFIG = {
  defaultTitle: 'Dipronil Das | Senior Full Stack Developer & Software Engineer',
  titleTemplate: '%s | Dipronil Das',
  defaultDescription: 'Official portfolio of Dipronil Das — Senior Full Stack Developer & Software Engineer specializing in React, Node.js, Next.js, JavaScript, and scalable web architecture. Explore projects, technical blogs, and professional certifications.',
  siteUrl: 'https://dipronil.pages.dev',
  siteName: 'Dipronil Das Portfolio',
  author: 'Dipronil Das',
  handle: '@dipronildas',
  email: 'dipronildas.net@gmail.com',
  location: 'Kolkata, West Bengal, India',
  locale: 'en_US',
  themeColor: '#080c14',
  keywords: [
    'Dipronil Das',
    'Dipronil',
    'Dipronil Das Portfolio',
    'Dipronil Das Full Stack Developer',
    'Dipronil Das Software Engineer',
    'Dipronil Das Kolkata',
    'Dipronil Das React Developer',
    'Dipronil Das Node.js',
    'Dipronil1998',
    'Senior Full Stack Developer',
    'React.js Developer',
    'Software Engineer India',
    'Frontend Architect',
    'JavaScript Developer',
    'Web Developer Kolkata',
    'Dipronil Das Resume',
    'Dipronil Das Projects',
    'Dipronil Das Medium',
    'Dipronil Das GitHub'
  ],
  social: {
    github: 'https://github.com/Dipronil1998',
    linkedin: 'https://www.linkedin.com/in/dipronil-das-37041516a/',
    medium: 'https://medium.com/@dipronildas.net',
  },
  ogImage: '/og-image.png',
};

/**
 * Generates Schema.org JSON-LD structured data for Person, WebSite, and ProfilePage
 */
export const getPersonJsonLd = (customData = {}) => {
  const name = customData.name || SEO_CONFIG.author;
  const title = customData.title || 'Senior Full Stack Developer & Software Engineer';
  const bio = customData.bio || SEO_CONFIG.defaultDescription;
  const github = customData.github || SEO_CONFIG.social.github;
  const linkedin = customData.linkedin || SEO_CONFIG.social.linkedin;
  const medium = customData.medium || SEO_CONFIG.social.medium;
  const siteUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SEO_CONFIG.siteUrl;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: name,
        givenName: 'Dipronil',
        familyName: 'Das',
        additionalName: 'Dipronil1998',
        alternateName: ['Dipronil', 'Dipronil Das', 'dipronil-das', 'Dipronil1998'],
        jobTitle: title,
        description: bio,
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,
        email: `mailto:${SEO_CONFIG.email}`,
        telephone: '+919804633142',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'IN',
        },
        sameAs: [github, linkedin, medium].filter(Boolean),
        knowsAbout: [
          'React.js',
          'JavaScript (ES6+)',
          'TypeScript',
          'Node.js',
          'Express.js',
          'Next.js',
          'Tailwind CSS',
          'RESTful APIs',
          'GraphQL',
          'MongoDB',
          'MySQL',
          'Docker',
          'Full Stack Web Development',
          'Frontend Architecture',
          'Software Engineering',
          'UI/UX Design',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: `${name} Portfolio`,
        alternateName: `Portfolio of ${name}`,
        description: bio,
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: `${name} | ${title}`,
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
        inLanguage: 'en-US',
      },
    ],
  };
};

/**
 * Generates BreadcrumbList Schema for structured navigation
 */
export const getBreadcrumbJsonLd = (items = []) => {
  const siteUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SEO_CONFIG.siteUrl;

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};
