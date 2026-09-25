
/**
 * Checks if the current app is running on localhost / development
 * @returns {boolean}
 */
export const isLocalhost = () => {
  if (typeof window === 'undefined') {
    return import.meta.env.DEV;
  }

  const hostname = window.location.hostname;
  return Boolean(
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    hostname.endsWith('.localhost') ||
    import.meta.env.DEV
  );
};

/**
 * Helper function to retrieve the active Backend API Base URL
 * @returns {string} The appropriate API Base URL
 */
export const getApiBaseUrl = () => {
  // Check environment variables first (if defined in .env)
  const localUrl = import.meta.env.VITE_BACKEND_LOCAL_URL;
  const hostedUrl = import.meta.env.VITE_BACKEND_PROD_URL;

  return isLocalhost() ? localUrl : hostedUrl;
};

/**
 * Constructs a full API endpoint URL
 * @param {string} endpoint - e.g. '/contact', '/projects'
 * @returns {string} - Full resolved URL e.g. 'http://localhost:5000/api/contact'
 */
export const buildApiUrl = (endpoint = '') => {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

/**
 * Configuration summary object for debugging / logging
 */
export const apiConfig = {
  isLocal: isLocalhost(),
  baseUrl: getApiBaseUrl(),
  localUrl: import.meta.env.VITE_BACKEND_LOCAL_URL || DEFAULT_LOCAL_URL,
  hostedUrl: import.meta.env.VITE_BACKEND_PROD_URL || DEFAULT_HOSTED_URL,
};
