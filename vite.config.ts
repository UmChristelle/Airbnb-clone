import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rapidapi': {
        target: 'https://airbnb19.p.rapidapi.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/rapidapi/, ''),
        headers: {
          'x-rapidapi-key': '10bd37f868mshec5d8b8d5a3a53ep1ab319jsn036b4e5fca8e',
          'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
        },
      },
    },
  },
})