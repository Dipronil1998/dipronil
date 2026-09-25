/**
 * Environment-aware API Configuration Helper
 * 
 * Automatically switches between Localhost Backend and Hosted Backend:
 * - If running locally (localhost / 127.0.0.1 / Vite dev mode): uses Local Backend (http://localhost:3000/api)
 * - If deployed (production domain): uses Hosted Backend
 */

const DEFAULT_LOCAL_URL = 'http://localhost:3000/api';
const DEFAULT_HOSTED_URL = 'https://dipronil-portfolio-api.dipronildas-net.workers.dev/api ';

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
  const localUrl = import.meta.env.VITE_BACKEND_LOCAL_URL || DEFAULT_LOCAL_URL;
  const hostedUrl = import.meta.env.VITE_BACKEND_PROD_URL || DEFAULT_HOSTED_URL;

  return isLocalhost() ? localUrl : hostedUrl;
};

/**
 * Constructs a full API endpoint URL
 * @param {string} endpoint - e.g. '/home', '/contact', '/projects'
 * @returns {string} - Full resolved URL e.g. 'http://localhost:3000/api/home'
 */
export const buildApiUrl = (endpoint = '') => {
  const baseUrl = (getApiBaseUrl() || DEFAULT_LOCAL_URL).replace(/\/$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

/**
 * Helper function to retrieve the Backend Host URL without '/api'
 * @returns {string} e.g. 'http://localhost:3000'
 */
export const getBackendHostUrl = () => {
  const apiUrl = getApiBaseUrl() || DEFAULT_LOCAL_URL;
  return apiUrl.replace(/\/api\/?$/, '');
};

/**
 * Constructs the resume CV download file URL
 * @returns {string} e.g. 'http://localhost:3000/downloadcv/file'
 */
export const getResumeDownloadUrl = () => {
  const host = getBackendHostUrl().replace(/\/$/, '');
  return `${host}/downloadcv/file`;
};

/**
 * Constructs the mail send contact message endpoint URL
 * @returns {string} e.g. 'http://localhost:3000/mailsend'
 */
export const getMailSendUrl = () => {
  const host = getBackendHostUrl().replace(/\/$/, '');
  return `${host}/api/mailsend`;
};

/**
 * Constructs the AI chatbot message endpoint URL
 * @returns {string} e.g. 'http://localhost:3000/chatbot/message'
 */
export const getChatbotMessageUrl = () => {
  const host = getBackendHostUrl().replace(/\/$/, '');
  return `${host}/chatbot/message`;
};

/**
 * Configuration summary object for debugging / logging
 */
export const apiConfig = {
  isLocal: isLocalhost(),
  baseUrl: getApiBaseUrl(),
  hostUrl: getBackendHostUrl(),
  resumeUrl: getResumeDownloadUrl(),
  mailUrl: getMailSendUrl(),
  chatbotUrl: getChatbotMessageUrl(),
  localUrl: import.meta.env.VITE_BACKEND_LOCAL_URL || DEFAULT_LOCAL_URL,
  hostedUrl: import.meta.env.VITE_BACKEND_PROD_URL || DEFAULT_HOSTED_URL,
};
