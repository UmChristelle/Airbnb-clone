import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST,
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