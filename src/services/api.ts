import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;

const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com',
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
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