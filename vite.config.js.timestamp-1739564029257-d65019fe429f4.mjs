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
        target: process.env.NODE_ENV === "production" ? "https://studyvault.online" : "http://localhost:3000",
        changeOrigin: true,
        secure: process.env.NODE_ENV === "production" ? true : false
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9ncmFtbWluZ1xcXFxSZWFjdCBDb2RlXFxcXFJ1Tk5pbmcgQ29sbGVnZSBQcm9qZWN0XFxcXE1QQ1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvZ3JhbW1pbmdcXFxcUmVhY3QgQ29kZVxcXFxSdU5OaW5nIENvbGxlZ2UgUHJvamVjdFxcXFxNUENcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2dyYW1taW5nL1JlYWN0JTIwQ29kZS9SdU5OaW5nJTIwQ29sbGVnZSUyMFByb2plY3QvTVBDL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xyXG5pbXBvcnQgb2JmdXNjYXRvciBmcm9tICdyb2xsdXAtcGx1Z2luLW9iZnVzY2F0b3InOyAgLy8gRW5zdXJlIGl0J3MgaW5zdGFsbGVkXHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ2RvdGVudic7XHJcblxyXG5jb25maWcoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IFwiaHR0cHM6Ly9zdHVkeXZhdWx0Lm9ubGluZVwiIDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyB0cnVlIDogZmFsc2UsIFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIFxyXG4gIH0sXHJcbiBcclxuICBcclxuICBidWlsZDoge1xyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBJbmNyZWFzZSB0aGUgbGltaXQgdG8gMTAwMCBrQlxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgLy8gU2VwYXJhdGUgbG90dGllLXdlYiBpZiBuZWVkZWQgdG8gcmVkdWNlIGJ1aWxkIHNpemUgaXNzdWVzXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2xvdHRpZS13ZWInKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2xvdHRpZSc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjb21tb25qc09wdGlvbnM6IHtcclxuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgZXhjbHVkZTogWydsYXJnZS1wYWNrYWdlLTEnLCAnbGFyZ2UtcGFja2FnZS0yJ10sIC8vIEFkZCBhbnkgbGFyZ2UgcGFja2FnZXMgaGVyZVxyXG4gIH0sXHJcblxyXG4gIGRlZmluZToge1xyXG4gICAgJ3Byb2Nlc3MuZW52Jzoge30sICAvLyBEZWZpbmUgcHJvY2Vzcy5lbnYgZm9yIG1vZHVsZXMgdGhhdCBleHBlY3QgaXRcclxuICAgICdldmFsJzogJzAnLCAvLyBSZXBsYWNlIGV2YWwgd2l0aCBhIGhhcm1sZXNzIHZhbHVlXHJcbiAgfSxcclxuXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIG9iZnVzY2F0b3Ioe1xyXG4gICAgICBjb21wYWN0OiB0cnVlLFxyXG4gICAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIHZpdGVTdGF0aWNDb3B5KHtcclxuICAgICAgdGFyZ2V0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogJ3JvYm90cy50eHQnLFxyXG4gICAgICAgICAgZGVzdDogJy4vJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHNyYzogJ3NpdGVtYXAueG1sJyxcclxuICAgICAgICAgIGRlc3Q6ICcuLycsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcblxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdsb3R0aWUtd2ViJzogJ2xvdHRpZS13ZWIvYnVpbGQvcGxheWVyL2xvdHRpZV9saWdodCcsIC8vIFVzZSB0aGUgbGlnaHQgdmVyc2lvbiBvZiBsb3R0aWUtd2ViXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThYLFNBQVMsb0JBQW9CO0FBQzNaLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGNBQWM7QUFFdkIsT0FBTztBQUVQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVEsUUFBUSxJQUFJLGFBQWEsZUFBZSw4QkFBOEI7QUFBQSxRQUM5RSxjQUFjO0FBQUEsUUFDZCxRQUFRLFFBQVEsSUFBSSxhQUFhLGVBQWUsT0FBTztBQUFBLE1BQ3pEO0FBQUEsSUFDRjtBQUFBLEVBRUY7QUFBQSxFQUdBLE9BQU87QUFBQSxJQUNMLHVCQUF1QjtBQUFBO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFFcEIsY0FBSSxHQUFHLFNBQVMsWUFBWSxHQUFHO0FBQzdCLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxtQkFBbUIsaUJBQWlCO0FBQUE7QUFBQSxFQUNoRDtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUE7QUFBQSxJQUNoQixRQUFRO0FBQUE7QUFBQSxFQUNWO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCx1QkFBdUI7QUFBQSxJQUN6QixDQUFDO0FBQUEsSUFDRCxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxNQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxjQUFjO0FBQUE7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
