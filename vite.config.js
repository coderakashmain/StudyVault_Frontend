import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate lottie-web if needed to reduce build size issues
          if (id.includes('lottie-web')) {
            return 'lottie';
          }
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  define: {
    'process.env': {}, // Define process.env for modules that expect it
    'eval': '0', // Replace eval with a harmless value
  },
  plugins: [react()],
  resolve: {
    alias: {
      'lottie-web': 'lottie-web/build/player/lottie_light', // Use the light version of lottie-web
    },
  },
});
