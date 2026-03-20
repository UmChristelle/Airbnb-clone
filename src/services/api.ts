import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

console.log('API Key loaded:', API_KEY ? 'YES' : 'NO - CHECK .env FILE');

const api = axios.create({
  baseURL: '/api',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
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
    throw new Error(error.response?.data?.message ?? 'Something went wrong. Please try again.');
  }
);

export default api;