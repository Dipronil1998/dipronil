import axios from 'axios';
import { portfolioData } from '../data/portfolioData';
import { getApiBaseUrl, isLocalhost, buildApiUrl, getBackendHostUrl, getResumeDownloadUrl, getMailSendUrl, getChatbotMessageUrl } from '../utils/apiConfig';

// Re-export helpers
export { getApiBaseUrl, isLocalhost, buildApiUrl, getBackendHostUrl, getResumeDownloadUrl, getMailSendUrl, getChatbotMessageUrl };

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
 * Normalizes a raw project item from backend
 */
export const normalizeProjectItem = (p, idx = 0) => {
  const language = p.language || p.tag || 'Full Stack';
  const tags = p.language
    ? p.language.split(',').map((s) => s.trim()).filter(Boolean)
    : (p.tag ? [p.tag] : ['React', 'NodeJS']);

  let image = p.image;
  if (!image || !image.startsWith('http')) {
    const titleLower = (p.title || '').toLowerCase();
    if (titleLower.includes('valet')) {
      image = 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('baby') || titleLower.includes('products')) {
      image = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('crazyloom') || titleLower.includes('loom') || titleLower.includes('garment')) {
      image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('rag') || titleLower.includes('vector')) {
      image = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('sql') || titleLower.includes('assistant')) {
      image = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('blog')) {
      image = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('phd') || titleLower.includes('portal')) {
      image = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('crm') || titleLower.includes('ledger')) {
      image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('atlpay') || titleLower.includes('pay')) {
      image = 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('hunt') || titleLower.includes('game') || titleLower.includes('quest') || titleLower.includes('quiz')) {
      image = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('poll')) {
      image = 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('compiler') || titleLower.includes('complier')) {
      image = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
    } else if (titleLower.includes('portfolio')) {
      image = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop';
    } else {
      image = defaultProjectImages[idx % defaultProjectImages.length];
    }
  }

  return {
    id: p._id || p.id || `proj-${idx}`,
    title: p.title || 'Untitled Project',
    category: p.tag || 'Full Stack',
    description: p.description || 'Production ready engineering project.',
    image,
    tags,
    language,
    demoUrl: p.hostlink || p.demoUrl || '',
    githubUrl: p.githublink || p.githubUrl || '',
    featured: p.piority <= 3 || p.featured || false,
    active: p.active !== undefined ? p.active : true,
    priority: p.piority || (idx + 1),
    features: [
      `Built with ${language}`,
      'Scalable production architecture & optimized performance',
      'Secure APIs and responsive user interface',
    ],
  };
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
          .map((p, idx) => normalizeProjectItem(p, idx))
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
          resumeUrl: getResumeDownloadUrl(),
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
 * Fetch all projects from backend /api/projects (Localhost http://localhost:3000/api/projects or Hosted)
 */
export const fetchProjects = async () => {
  const url = buildApiUrl('/projects');
  console.log(`[API Call] Fetching all projects from: ${url}`);

  try {
    const response = await apiClient.get('/projects');
    console.log('[API Call] Projects response received:', response.data);

    if (response.data && response.data.success && Array.isArray(response.data.projects)) {
      const rawProjects = response.data.projects;
      const normalized = rawProjects
        .filter((p) => p.active !== false)
        .map((p, idx) => normalizeProjectItem(p, idx));

      return {
        success: true,
        count: response.data.count || normalized.length,
        totalCount: response.data.totalCount || normalized.length,
        projects: normalized,
        isFromBackend: true,
      };
    }
  } catch (error) {
    console.warn(`[API] Could not fetch ${url}. Fallback to local projects:`, error?.message);
  }

  return {
    success: true,
    count: portfolioData.projects?.length || 0,
    totalCount: portfolioData.projects?.length || 0,
    projects: (portfolioData.projects || []).map((p, idx) => normalizeProjectItem(p, idx)),
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
 * Submit contact form message to Backend API endpoint (/mailsend)
 * 
 * Method: POST
 * Endpoint: /mailsend (e.g. http://localhost:3000/mailsend)
 * Payload:
 * {
 *   name: "Alex Johnson",
 *   email: "alex@company.com",
 *   subject: "Full Stack Engineer Job Opportunity",
 *   message: "Hi Dipronil, I came across your portfolio and would like to discuss an exciting role."
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   message: "Thank you for reaching out! Your message has been sent successfully. I will get back to you soon.",
 *   data: { _id, name, email, subject, message, time }
 * }
 */
export const submitContactMessage = async (contactData) => {
  const url = getMailSendUrl();
  console.log(`[Contact API] Submitting contact message to: ${url}`, contactData);

  const payload = {
    name: (contactData.name || '').trim(),
    email: (contactData.email || '').trim(),
    subject: (contactData.subject || 'Portfolio Contact Inquiry').trim(),
    message: (contactData.message || '').trim(),
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 12000,
    });

    console.log('[Contact API] Success response received:', response.data);
    return response.data;
  } catch (error) {
    console.warn(`[Contact API] Primary ${url} failed. Trying fallback endpoint:`, error?.message);
    try {
      const fallbackResp = await apiClient.post('/api/mailsend', payload);
      return fallbackResp.data;
    } catch (fallbackErr) {
      console.error('[Contact API] All contact endpoints failed:', fallbackErr?.message || error?.message);
      throw (error.response?.data || error);
    }
  }
};

/**
 * Downloads CV / Resume PDF from the backend endpoint: /downloadcv/file
 * (e.g. http://localhost:3000/downloadcv/file)
 */
export const downloadResumeFile = async () => {
  const downloadUrl = getResumeDownloadUrl();
  console.log(`[Resume API] Downloading CV from: ${downloadUrl}`);

  try {
    const response = await axios.get(downloadUrl, {
      responseType: 'blob',
      timeout: 15000,
    });

    // Create a blob URL from the received PDF data
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);

    // Create temporary link and trigger browser download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', 'Dipronil_Das_CV.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Clean up memory
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 1000);

    return { success: true, url: downloadUrl };
  } catch (error) {
    console.warn('[Resume API] Direct blob download failed, attempting direct link download:', error);

    // Fallback: direct window download trigger
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('download', 'Dipronil_Das_CV.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true, url: downloadUrl, fallback: true };
  }
};

/**
 * Sends messages to AI Portfolio Assistant endpoint (/chatbot/message)
 * 
 * Method: POST
 * Endpoint: /chatbot/message (e.g. http://localhost:3000/chatbot/message)
 * Payload:
 * {
 *   "messages": [
 *     { "role": "user", "content": "What are Dipronil's main backend skills and experience?" }
 *   ]
 * }
 * Response:
 * {
 *   "success": true,
 *   "reply": "Dipronil Das is a Full Stack Developer..."
 * }
 */
export const sendChatbotMessage = async (messages) => {
  const url = getChatbotMessageUrl();
  console.log(`[Chatbot API] Sending message array to: ${url}`);

  // Format array to OpenAI schema [{ role, content }]
  const formattedMessages = Array.isArray(messages)
    ? messages
      .filter((m) => m && (m.content || m.text))
      .map((m) => ({
        role: m.role || (m.sender === 'user' ? 'user' : 'assistant'),
        content: m.content || m.text || '',
      }))
    : [{ role: 'user', content: String(messages) }];

  try {
    const response = await axios.post(
      url,
      { messages: formattedMessages },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    console.log('[Chatbot API] Response received:', response.data);
    if (response.data && response.data.reply) {
      return {
        success: true,
        reply: response.data.reply,
      };
    }
    return response.data;
  } catch (error) {
    console.warn(`[Chatbot API] Request to ${url} failed:`, error?.message);
    throw (error.response?.data || error);
  }
};
