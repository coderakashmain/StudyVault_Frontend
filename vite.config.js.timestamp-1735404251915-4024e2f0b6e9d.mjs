// vite.config.js
import { defineConfig } from "file:///D:/Programming/React%20Code/RuNNing%20College%20Project/MPC/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Programming/React%20Code/RuNNing%20College%20Project/MPC/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { viteStaticCopy } from "file:///D:/Programming/React%20Code/RuNNing%20College%20Project/MPC/frontend/node_modules/vite-plugin-static-copy/dist/index.js";
import obfuscator from "file:///D:/Programming/React%20Code/RuNNing%20College%20Project/MPC/frontend/node_modules/rollup-plugin-obfuscator/dist/rollup-plugin-obfuscator.js";
import { config } from "file:///D:/Programming/React%20Code/RuNNing%20College%20Project/MPC/frontend/node_modules/dotenv/lib/main.js";
config();
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:3000",
        changeOrigin: true,
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1e3,
    // Increase the limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("lottie-web")) {
            return "lottie";
          }
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    exclude: ["large-package-1", "large-package-2"]
    // Add any large packages here
  },
  define: {
    "process.env": {},
    // Define process.env for modules that expect it
    "eval": "0"
    // Replace eval with a harmless value
  },
  plugins: [
    react(),
    obfuscator({
      compact: true,
      controlFlowFlattening: true
    }),
    viteStaticCopy({
      targets: [
        {
          src: "robots.txt",
          dest: "./"
        },
        {
          src: "sitemap.xml",
          dest: "./"
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "lottie-web": "lottie-web/build/player/lottie_light"
      // Use the light version of lottie-web
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9ncmFtbWluZ1xcXFxSZWFjdCBDb2RlXFxcXFJ1Tk5pbmcgQ29sbGVnZSBQcm9qZWN0XFxcXE1QQ1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvZ3JhbW1pbmdcXFxcUmVhY3QgQ29kZVxcXFxSdU5OaW5nIENvbGxlZ2UgUHJvamVjdFxcXFxNUENcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2dyYW1taW5nL1JlYWN0JTIwQ29kZS9SdU5OaW5nJTIwQ29sbGVnZSUyMFByb2plY3QvTVBDL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xyXG5pbXBvcnQgb2JmdXNjYXRvciBmcm9tICdyb2xsdXAtcGx1Z2luLW9iZnVzY2F0b3InOyAgLy8gRW5zdXJlIGl0J3MgaW5zdGFsbGVkXHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XHJcblxyXG5jb25maWcoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52LlZJVEVfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIEluY3JlYXNlIHRoZSBsaW1pdCB0byAxMDAwIGtCXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XHJcbiAgICAgICAgICAvLyBTZXBhcmF0ZSBsb3R0aWUtd2ViIGlmIG5lZWRlZCB0byByZWR1Y2UgYnVpbGQgc2l6ZSBpc3N1ZXNcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbG90dGllLXdlYicpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnbG90dGllJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xyXG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBleGNsdWRlOiBbJ2xhcmdlLXBhY2thZ2UtMScsICdsYXJnZS1wYWNrYWdlLTInXSwgLy8gQWRkIGFueSBsYXJnZSBwYWNrYWdlcyBoZXJlXHJcbiAgfSxcclxuXHJcbiAgZGVmaW5lOiB7XHJcbiAgICAncHJvY2Vzcy5lbnYnOiB7fSwgIC8vIERlZmluZSBwcm9jZXNzLmVudiBmb3IgbW9kdWxlcyB0aGF0IGV4cGVjdCBpdFxyXG4gICAgJ2V2YWwnOiAnMCcsIC8vIFJlcGxhY2UgZXZhbCB3aXRoIGEgaGFybWxlc3MgdmFsdWVcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgb2JmdXNjYXRvcih7XHJcbiAgICAgIGNvbXBhY3Q6IHRydWUsXHJcbiAgICAgIGNvbnRyb2xGbG93RmxhdHRlbmluZzogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xyXG4gICAgICB0YXJnZXRzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiAncm9ib3RzLnR4dCcsXHJcbiAgICAgICAgICBkZXN0OiAnLi8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3JjOiAnc2l0ZW1hcC54bWwnLFxyXG4gICAgICAgICAgZGVzdDogJy4vJyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgXSxcclxuXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ2xvdHRpZS13ZWInOiAnbG90dGllLXdlYi9idWlsZC9wbGF5ZXIvbG90dGllX2xpZ2h0JywgLy8gVXNlIHRoZSBsaWdodCB2ZXJzaW9uIG9mIGxvdHRpZS13ZWJcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFgsU0FBUyxvQkFBb0I7QUFDM1osT0FBTyxXQUFXO0FBQ2xCLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYztBQUV2QixPQUFPO0FBRVAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsUUFDcEMsY0FBYztBQUFBLFFBQ2QsUUFBUSxRQUFRLElBQUksYUFBYTtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLHVCQUF1QjtBQUFBO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFFcEIsY0FBSSxHQUFHLFNBQVMsWUFBWSxHQUFHO0FBQzdCLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxtQkFBbUIsaUJBQWlCO0FBQUE7QUFBQSxFQUNoRDtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUE7QUFBQSxJQUNoQixRQUFRO0FBQUE7QUFBQSxFQUNWO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCx1QkFBdUI7QUFBQSxJQUN6QixDQUFDO0FBQUEsSUFDRCxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxjQUFjO0FBQUE7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
