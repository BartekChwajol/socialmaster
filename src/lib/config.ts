// API configuration
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://api.socialmasterai.com'
  : 'http://localhost:5173';

// Facebook configuration
export const FACEBOOK_APP_ID = '988780666491013';
export const FACEBOOK_APP_SECRET = 'f68f4987e9c4c76bb61798a3b94f9bcc';

// Ensure URL is valid before making requests
export const createApiUrl = (path: string): string => {
  try {
    return new URL(path, API_BASE_URL).toString();
  } catch (error) {
    console.error('Invalid URL:', error);
    return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }
};