import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api': {
        target: process.env.VITE_API_URL ||'http://localhost:3000' ,  
        changeOrigin: true,            
        secure: process.env.NODE_ENV === 'production'            
      },                   
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      
    }
  }
});
