// vite.config.js
import legacy from "file:///Users/macman/Desktop/Pirip/all-btc.mobile/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import vue from "file:///Users/macman/Desktop/Pirip/all-btc.mobile/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///Users/macman/Desktop/Pirip/all-btc.mobile/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/macman/Desktop/Pirip/all-btc.mobile";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    legacy()
    // VitePluginImages({
    //   dirs: ['/resources/assets/images'],
    //   extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@icon": path.resolve(__vite_injected_original_dirname, "./resources/assets/icons"),
      "@img": path.resolve(__vite_injected_original_dirname, "./resources/assets/images"),
      "@files": path.resolve(__vite_injected_original_dirname, "./resources/assets/files")
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  },
  server: {
    host: "0.0.0.0",
    port: 5300
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/app.scss"; @import "./src/styles/const.scss";'
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjbWFuL0Rlc2t0b3AvUGlyaXAvYWxsLWJ0Yy5tb2JpbGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYWNtYW4vRGVza3RvcC9QaXJpcC9hbGwtYnRjLm1vYmlsZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFjbWFuL0Rlc2t0b3AvUGlyaXAvYWxsLWJ0Yy5tb2JpbGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgbGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG4vLyBpbXBvcnQgVml0ZVBsdWdpbkltYWdlcyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWltYWdlc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGxlZ2FjeSgpLFxuICAgIC8vIFZpdGVQbHVnaW5JbWFnZXMoe1xuICAgIC8vICAgZGlyczogWycvcmVzb3VyY2VzL2Fzc2V0cy9pbWFnZXMnXSxcbiAgICAvLyAgIGV4dGVuc2lvbnM6IFsnanBnJywgJ2pwZWcnLCAncG5nJywgJ3N2ZycsICd3ZWJwJ10sXG4gICAgLy8gfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgXCJAaWNvblwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vcmVzb3VyY2VzL2Fzc2V0cy9pY29uc1wiKSxcbiAgICAgIFwiQGltZ1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vcmVzb3VyY2VzL2Fzc2V0cy9pbWFnZXNcIiksXG4gICAgICBcIkBmaWxlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vcmVzb3VyY2VzL2Fzc2V0cy9maWxlc1wiKSxcbiAgICB9LFxuICB9LFxuICB0ZXN0OiB7XG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJ1xuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogNTMwMCxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvYXBwLnNjc3NcIjsgQGltcG9ydCBcIi4vc3JjL3N0eWxlcy9jb25zdC5zY3NzXCI7J1xuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdULE9BQU8sWUFBWTtBQUNuVSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBSDdCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS1Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxTQUFTLEtBQUssUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxNQUMzRCxRQUFRLEtBQUssUUFBUSxrQ0FBVywyQkFBMkI7QUFBQSxNQUMzRCxVQUFVLEtBQUssUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
