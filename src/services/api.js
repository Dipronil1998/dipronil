import axios from 'axios';
import { portfolioData } from '../data/portfolioData';
import { getApiBaseUrl, isLocalhost, buildApiUrl } from '../utils/apiConfig';

// Re-export helpers for easy access
export { getApiBaseUrl, isLocalhost, buildApiUrl };

// Create configured Axios instance with dynamic baseURL resolution
export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to ensure baseURL stays in sync if environment changes
apiClient.interceptors.request.use((config) => {
  if (!config.baseURL && !config.url?.startsWith('http')) {
    config.baseURL = getApiBaseUrl();
  }
  return config;
});

/**
 * Example: Send contact message to Backend API
 * Uses local backend when on localhost, and hosted backend in production
 */
export const submitContactMessage = async (contactData) => {
  try {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  } catch (error) {
    console.warn('Backend API request:', error?.message);
    throw error;
  }
};

/**
 * Fetch live Medium posts using RSS-to-JSON API with graceful fallback to portfolioData
 */
export const fetchMediumPosts = async () => {
  try {
    const mediumHandle = portfolioData.personal.medium
      ? portfolioData.personal.medium.split('@')[1]?.replace(/\/$/, '')
      : 'dipronildas';

    if (!mediumHandle) return portfolioData.mediumPosts;

    const response = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumHandle}`,
      { timeout: 8000 }
    );

    if (response.data && response.data.status === 'ok' && response.data.items?.length > 0) {
      return response.data.items.map((item, index) => {
        const rawText = item.description ? item.description.replace(/<[^>]*>?/gm, '').trim() : '';
        const excerpt = rawText.length > 150 ? rawText.slice(0, 150) + '...' : rawText;
        const wordCount = rawText.split(/\s+/).length;
        const readTime = `${Math.max(3, Math.ceil(wordCount / 200))} min read`;

        return {
          id: `live-medium-${index}`,
          title: item.title,
          description: excerpt || 'Read full article on Medium.',
          url: item.link,
          date: item.pubDate
            ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : 'Recent',
          readTime,
          tags: item.categories && item.categories.length > 0
            ? item.categories.slice(0, 3)
            : ['Engineering', 'React', 'JavaScript'],
          image: item.thumbnail || (portfolioData.mediumPosts[index % portfolioData.mediumPosts.length]?.image) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
          claps: 'Live on Medium',
          isLive: true,
        };
      });
    }
  } catch (error) {
    console.warn('Could not fetch live Medium RSS feed, falling back to local posts data.', error?.message);
  }

  return portfolioData.mediumPosts || [];
};

/**
 * Fetch GitHub profile public stats
 */
export const fetchGithubStats = async (username = 'dipronildas') => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, { timeout: 8000 });
    return response.data;
  } catch (err) {
    return null;
  }
};
