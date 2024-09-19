import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api': {
        target: process.env.VITE_API_URL ||'http://localhost:3000' ,  // Env variable holding the target URL
        changeOrigin: true,                // Makes sure the 'Host' header matches the target
        secure: process.env.NODE_ENV === 'production'              // Disable SSL verification if using self-signed certificates
      },                   
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      
    }
  }
});
