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
        ? data.blogs.map((b, idx) => {
            const rawText = b.excerpt || (b.description ? b.description.replace(/<[^>]*>?/gm, '').trim() : '');
            const excerpt = rawText.length > 160 ? rawText.slice(0, 160) + '...' : rawText;
            const wordCount = (b.content || b.description || '').split(/\s+/).length;
            const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;

            return {
              id: b.guid || b._id || `blog-${idx}`,
              title: b.title,
              description: excerpt || 'Read the full story on Medium.',
              url: b.link || b.url,
              date: b.pubDateFormatted || (b.pubDate ? new Date(b.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent'),
              readTime,
              tags: b.categories && b.categories.length > 0 ? b.categories : ['Backend', 'Architecture', 'Node.js'],
              image: b.thumbnail || b.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
              claps: 'Live on Medium',
              isLive: true,
            };
          })
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
        ? data.certificates.map((c, idx) => {
            const rawId = c.certificatelink
              ? c.certificatelink.split('/certificate/')[1]?.replace(/\/$/, '')
              : `CERT-${idx + 1}`;

            return {
              id: c._id || c.id || `cert-${idx}`,
              title: c.title || c.name,
              issuer: c.issuer || (c.certificatelink?.includes('udemy') ? 'Udemy' : 'Verified Issuer'),
              issueDate: c.issueDate || c.year || 'Certified',
              credentialId: c.credentialId || rawId || '',
              credentialUrl: c.certificatelink || c.credentialUrl || '#',
              image: c.image?.startsWith('http')
                ? c.image
                : defaultCertImages[idx % defaultCertImages.length],
              skills: ['Full Stack Development', 'Node.js', 'React', 'Databases'],
              featured: c.piority === 1 || c.featured || false,
            };
          })
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
