import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://airbnb19.p.rapidapi.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
        headers: {
          'x-rapidapi-key': 'fd31f45be5msh8a17df19bd6bd2bp16b6acjsn525b54d714bb',
          'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
        },
      },
    },
  },
})