import axios from 'axios';
import { portfolioData } from '../data/portfolioData';
import { getApiBaseUrl, isLocalhost, buildApiUrl } from '../utils/apiConfig';

// Re-export helpers
export { getApiBaseUrl, isLocalhost, buildApiUrl };

// Create configured Axios instance
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor to guarantee baseURL is always fresh
apiClient.interceptors.request.use((config) => {
  if (!config.baseURL && !config.url?.startsWith('http')) {
    config.baseURL = getApiBaseUrl();
  }
  return config;
});

const defaultProjectImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
];

const defaultCertImages = [
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
];

const defaultBlogImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
];

/**
 * Extract hashtags or smart keywords from text/title if categories are missing
 */
export const extractBlogTags = (b) => {
  if (Array.isArray(b.categories) && b.categories.length > 0) {
    return b.categories;
  }

  const text = `${b.title || ''} ${b.description || ''} ${b.content || ''}`;
  const foundTags = [];

  // Match #Hashtags
  const hashMatches = text.match(/#([a-zA-Z0-9_-]+)/g);
  if (hashMatches) {
    hashMatches.forEach((h) => {
      const clean = h.replace('#', '').trim();
      if (clean && !foundTags.includes(clean)) {
        foundTags.push(clean);
      }
    });
  }

  // Keyword inferences
  const keywords = [
    { key: 'Rate Limiting', tag: 'Rate Limiting' },
    { key: 'Token Bucket', tag: 'System Design' },
    { key: 'Pagination', tag: 'Pagination' },
    { key: 'Cursor', tag: 'Database' },
    { key: 'Microservices', tag: 'Microservices' },
    { key: 'Nginx', tag: 'Nginx' },
    { key: 'Gateway', tag: 'API Gateway' },
    { key: 'RAG', tag: 'RAG AI' },
    { key: 'Docker', tag: 'Docker' },
    { key: 'Redis', tag: 'Redis' },
    { key: 'Qdrant', tag: 'Vector DB' },
    { key: 'Node', tag: 'Node.js' },
    { key: 'React', tag: 'React' },
    { key: 'Express', tag: 'Express' },
  ];

  keywords.forEach(({ key, tag }) => {
    if (text.toLowerCase().includes(key.toLowerCase()) && !foundTags.includes(tag)) {
      foundTags.push(tag);
    }
  });

  return foundTags.length > 0 ? foundTags.slice(0, 4) : ['Backend', 'System Design', 'Node.js'];
};

/**
 * Normalizes a raw blog item from backend
 */
export const normalizeBlogItem = (b, idx = 0) => {
  const rawText = b.excerpt || (b.description ? b.description.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim() : '');
  const excerpt = rawText.length > 170 ? rawText.slice(0, 170) + '...' : rawText;
  const wordCount = (b.content || b.description || '').split(/\s+/).length;
  const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;
  const tags = extractBlogTags(b);

  return {
    id: b.guid || b._id || b.link || `blog-${idx}`,
    title: b.title || 'Untitled Article',
    description: excerpt || 'Read the full technical deep dive on Medium.',
    url: b.link || b.url || '#',
    date: b.pubDateFormatted || (b.pubDate ? new Date(b.pubDate.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'),
    readTime,
    tags,
    image: b.thumbnail || b.image || defaultBlogImages[idx % defaultBlogImages.length],
    claps: 'Live on Medium',
    isLive: true,
    author: b.author || 'DIPRONIL DAS',
    content: b.content || b.description || '',
  };
};

/**
 * Normalizes a raw certificate item from backend
 */
export const normalizeCertificateItem = (c, idx = 0) => {
  const isCoursera = c.certificatelink?.includes('coursera.org');
  const isUdemy = c.certificatelink?.includes('udemy.com');

  let issuer = c.issuer || (isCoursera ? 'Coursera' : (isUdemy ? 'Udemy' : 'Verified Issuer'));
  if (isCoursera && c.title?.toLowerCase().includes('python')) {
    issuer = 'Coursera (Univ. of Michigan)';
  }

  let rawId = c.credentialId;
  if (!rawId && c.certificatelink) {
    const parts = c.certificatelink.split('/certificate/');
    if (parts[1]) {
      rawId = parts[1].replace(/\/$/, '');
    }
  }

  let skills = ['Full Stack Development', 'Software Engineering'];
  const titleLower = (c.title || '').toLowerCase();
  if (titleLower.includes('node.js') || titleLower.includes('nodejs')) {
    skills = ['Node.js', 'Express.js', 'REST APIs', 'Async Programming', 'MongoDB'];
  } else if (titleLower.includes('mern')) {
    skills = ['MongoDB', 'Express', 'React', 'Node.js', 'Full Stack MERN'];
  } else if (titleLower.includes('mean') || titleLower.includes('angular')) {
    skills = ['Angular', 'Node.js', 'Express', 'MongoDB', 'MEAN Stack'];
  } else if (titleLower.includes('python data structures')) {
    skills = ['Python', 'Data Structures', 'Algorithms', 'Tuples & Dicts'];
  } else if (titleLower.includes('python')) {
    skills = ['Python 3', 'Programming Fundamentals', 'Data Analysis'];
  }

  let image = c.image;
  if (!image || !image.startsWith('http')) {
    if (titleLower.includes('node')) {
      image = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('mern')) {
      image = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('mean') || titleLower.includes('angular')) {
      image = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('python data structures')) {
      image = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('python')) {
      image = 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop';
    } else {
      image = defaultCertImages[idx % defaultCertImages.length];
    }
  }

  return {
    id: c._id || c.id || `cert-${idx}`,
    title: c.title || c.name || 'Professional Certification',
    issuer,
    issueDate: c.issueDate || c.year || 'Verified Credential',
    credentialId: rawId || `CERT-${idx + 1}`,
    credentialUrl: c.certificatelink || c.credentialUrl || '#',
    image,
    skills,
    active: c.active !== undefined ? c.active : true,
    piority: c.piority || (idx + 1),
    featured: c.piority === 1 || c.featured || false,
  };
};

/**
 * Fetch full home page data from backend /api/home (Localhost http://localhost:3000/api/home or Hosted)
 */
export const fetchHomeData = async () => {
  const url = buildApiUrl('/home');
  console.log(`[API Call] Fetching data from: ${url}`);

  try {
    const response = await apiClient.get('/home');
    console.log('[API Call] Response received:', response.data);

    if (response.data && response.data.success && response.data.data) {
      const data = response.data.data;

      // Normalize projects from backend
      const normalizedProjects = Array.isArray(data.projects) && data.projects.length > 0
        ? data.projects
            .filter((p) => p.active !== false)
            .map((p, idx) => ({
              id: p._id || p.id || `proj-${idx}`,
              title: p.title || 'Untitled Project',
              category: p.tag || 'Full Stack',
              description: p.description || '',
              image: p.image?.startsWith('http')
                ? p.image
                : defaultProjectImages[idx % defaultProjectImages.length],
              tags: p.language
                ? p.language.split(',').map((s) => s.trim())
                : (p.tag ? [p.tag] : ['React', 'NodeJS']),
              demoUrl: p.hostlink || p.demoUrl || '#',
              githubUrl: p.githublink || p.githubUrl || '#',
              featured: p.piority === 1 || p.featured || false,
              active: p.active !== undefined ? p.active : true,
              features: [
                `Built with ${p.language || p.tag || 'modern stack'}`,
                'Production ready architecture & robust implementation',
                'Responsive UI and optimized performance',
              ],
            }))
        : portfolioData.projects;

      // Normalize blogs from backend
      const normalizedBlogs = Array.isArray(data.blogs) && data.blogs.length > 0
        ? data.blogs.map((b, idx) => normalizeBlogItem(b, idx))
        : portfolioData.mediumPosts;

      // Normalize experiences from backend
      const normalizedExperiences = Array.isArray(data.experiences) && data.experiences.length > 0
        ? data.experiences.map((exp) => ({
            role: exp.role || 'Software Engineer',
            company: exp.companyname || exp.company || 'Tech Company',
            period: exp.year || exp.period || 'Recent',
            location: 'Kolkata, India',
            description: exp.description || '',
            achievements: [exp.description],
          }))
        : portfolioData.experience;

      // Normalize educations from backend
      const normalizedEducations = Array.isArray(data.educations) && data.educations.length > 0
        ? data.educations.map((edu) => ({
            degree: edu.degree,
            institution: edu.univercity || edu.university || edu.institution,
            period: edu.year || edu.period,
            location: 'Kolkata, India',
            details: edu.description || '',
          }))
        : portfolioData.education;

      // Normalize certificates from backend
      const normalizedCertificates = Array.isArray(data.certificates) && data.certificates.length > 0
        ? data.certificates.map((c, idx) => normalizeCertificateItem(c, idx))
        : portfolioData.certificates;

      // Compute stats
      const normalizedStats = [
        { label: "Years of Experience", value: "5+", icon: "Briefcase" },
        { label: "Completed Projects", value: data.projectsCount ? `${data.projectsCount}+` : `${normalizedProjects.length}+`, icon: "FolderGit2" },
        { label: "Certifications", value: data.certificatesCount ? `${data.certificatesCount}+` : `${normalizedCertificates.length}+`, icon: "Cpu" },
        { label: "Client & Team Satisfaction", value: "100%", icon: "Smile" },
      ];

      return {
        ...portfolioData,
        personal: {
          ...portfolioData.personal,
          name: data.title || portfolioData.personal.name,
          age: data.age || portfolioData.personal.age,
        },
        stats: normalizedStats,
        projects: normalizedProjects,
        mediumPosts: normalizedBlogs,
        experience: normalizedExperiences,
        education: normalizedEducations,
        certificates: normalizedCertificates,
        isFromBackend: true,
      };
    }
  } catch (error) {
    console.warn(`[API] Could not fetch ${url}. Using local data fallback:`, error?.message);
  }

  // Graceful fallback
  return {
    ...portfolioData,
    isFromBackend: false,
  };
};

/**
 * Fetch all blogs from backend /api/blogs (Localhost http://localhost:3000/api/blogs or Hosted)
 */
export const fetchBlogs = async () => {
  const url = buildApiUrl('/blogs');
  console.log(`[API Call] Fetching all blogs from: ${url}`);

  try {
    const response = await apiClient.get('/blogs');
    console.log('[API Call] Blogs response received:', response.data);

    if (response.data && response.data.success && Array.isArray(response.data.blogs)) {
      const rawBlogs = response.data.blogs;
      const normalized = rawBlogs.map((b, idx) => normalizeBlogItem(b, idx));
      return {
        success: true,
        count: response.data.count || normalized.length,
        totalCount: response.data.totalCount || normalized.length,
        blogs: normalized,
        isFromBackend: true,
      };
    }
  } catch (error) {
    console.warn(`[API] Could not fetch ${url}. Fallback to local posts:`, error?.message);
  }

  return {
    success: true,
    count: portfolioData.mediumPosts?.length || 0,
    totalCount: portfolioData.mediumPosts?.length || 0,
    blogs: (portfolioData.mediumPosts || []).map((b, idx) => normalizeBlogItem(b, idx)),
    isFromBackend: false,
  };
};

/**
 * Fetch all certificates from backend /api/certificates (Localhost http://localhost:3000/api/certificates or Hosted)
 */
export const fetchCertificates = async () => {
  const url = buildApiUrl('/certificates');
  console.log(`[API Call] Fetching all certificates from: ${url}`);

  try {
    const response = await apiClient.get('/certificates');
    console.log('[API Call] Certificates response received:', response.data);

    if (response.data && response.data.success && Array.isArray(response.data.certificates)) {
      const rawCerts = response.data.certificates;
      const normalized = rawCerts.map((c, idx) => normalizeCertificateItem(c, idx));
      return {
        success: true,
        count: response.data.count || normalized.length,
        totalCount: response.data.totalCount || normalized.length,
        certificates: normalized,
        isFromBackend: true,
      };
    }
  } catch (error) {
    console.warn(`[API] Could not fetch ${url}. Fallback to local certificates:`, error?.message);
  }

  return {
    success: true,
    count: portfolioData.certificates?.length || 0,
    totalCount: portfolioData.certificates?.length || 0,
    certificates: (portfolioData.certificates || []).map((c, idx) => normalizeCertificateItem(c, idx)),
    isFromBackend: false,
  };
};

/**
 * Submit contact form message to Backend API (/api/message or /api/contact)
 */
export const submitContactMessage = async (contactData) => {
  try {
    const response = await apiClient.post('/message', contactData);
    return response.data;
  } catch (error) {
    // Try fallback endpoint /contact if /message is not used
    const fallbackResponse = await apiClient.post('/contact', contactData);
    return fallbackResponse.data;
  }
};
