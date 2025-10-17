import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // backend port
        changeOrigin: true,               // important for CORS issues
        secure: false,                    // allows http targets
      },
    },
  },
})
