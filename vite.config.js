import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever app requests /api/enka, Vite will forward it to enka.network
      '/api/enka': {
        target: 'https://enka.network',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/enka/, '/api')
      }
    }
  }
})
