import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api': process.env.VITE_API_URL || "http://localhost:3000",
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      
    }
  }
});
