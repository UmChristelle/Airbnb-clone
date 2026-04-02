import axios from 'axios';

const rapidApiKey =
  import.meta.env.VITE_RAPID_API_KEY ?? import.meta.env.VITE_RAPIDAPI_KEY ?? '';
const rapidApiHost =
  import.meta.env.VITE_RAPID_API_HOST ?? 'airbnb19.p.rapidapi.com';
const baseURL = import.meta.env.VITE_BASE_URL ?? 'https://airbnb19.p.rapidapi.com';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': rapidApiHost,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) throw new Error('Invalid API key.');
    if (status === 403) throw new Error('RapidAPI rejected this request. Check your subscription and deployed environment variables.');
    if (status === 429) throw new Error('RapidAPI rate limit reached.');
    throw new Error(error.response?.data?.message ?? 'Something went wrong.');
  }
);

export default api;
