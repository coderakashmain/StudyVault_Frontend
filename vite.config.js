import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import obfuscator from 'rollup-plugin-obfuscator';  // Ensure it's installed
import { config } from 'dotenv';

config();

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === "production" ? "https://studyvault.online" : "http://localhost:3000",
        changeOrigin: true,
        secure: process.env.NODE_ENV === "production" ? true : false, 
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

  optimizeDeps: {
    exclude: ['large-package-1', 'large-package-2'], // Add any large packages here
  },

  define: {
    'process.env': {},  // Define process.env for modules that expect it
    'eval': '0', // Replace eval with a harmless value
  },

  plugins: [
    react(),
    obfuscator({
      compact: true,
      controlFlowFlattening: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'robots.txt',
          dest: './',
        },
        {
          src: 'sitemap.xml',
          dest: './',
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      'lottie-web': 'lottie-web/build/player/lottie_light', // Use the light version of lottie-web
    },
  },
});
