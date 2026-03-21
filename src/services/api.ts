import axios from 'axios';

console.log('API Key loaded:', import.meta.env.VITE_RAPID_API_KEY ? 'YES' : 'NO - CHECK .env FILE');

const api = axios.create({
  baseURL: '/rapidapi',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      throw new Error('Rate limit reached. Please wait a moment and try again.');
    }
    if (error.response?.status === 403) {
      throw new Error('API key invalid or expired.');
    }
    throw new Error(
      error.response?.data?.message ?? 'Something went wrong. Please try again.'
    );
  }
);

export default api;