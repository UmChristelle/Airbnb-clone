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
          'x-rapidapi-key': 'a055fd597dmshfa8d6935528dd20p160e64jsn898ed87dfb14',
          'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
        },
      },
    },
  },
})