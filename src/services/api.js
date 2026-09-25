import axios from 'axios';
import { portfolioData } from '../data/portfolioData';

// Create configured Axios instance
export const apiClient = axios.create({
  timeout: 8000,
  headers: {
    'Accept': 'application/json',
  },
});

/**
 * Fetch live Medium posts using RSS-to-JSON API with graceful fallback to portfolioData
 */
export const fetchMediumPosts = async () => {
  try {
    const mediumHandle = portfolioData.personal.medium
      ? portfolioData.personal.medium.split('@')[1]?.replace(/\/$/, '')
      : 'dipronildas';

    if (!mediumHandle) return portfolioData.mediumPosts;

    const response = await apiClient.get(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumHandle}`
    );

    if (response.data && response.data.status === 'ok' && response.data.items?.length > 0) {
      return response.data.items.map((item, index) => {
        // Strip HTML tags for clean description excerpt
        const rawText = item.description ? item.description.replace(/<[^>]*>?/gm, '').trim() : '';
        const excerpt = rawText.length > 150 ? rawText.slice(0, 150) + '...' : rawText;

        // Calculate approximate reading time
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

  // Fallback to local structured data
  return portfolioData.mediumPosts || [];
};

/**
 * Fetch GitHub profile public stats with Axios
 */
export const fetchGithubStats = async (username = 'dipronildas') => {
  try {
    const response = await apiClient.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (err) {
    return null;
  }
};
