import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
// import VitePluginImages from "vite-plugin-vue-images";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    // VitePluginImages({
    //   dirs: ['/resources/assets/images'],
    //   extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    // })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@icon": path.resolve(__dirname, "./resources/assets/icons"),
      "@img": path.resolve(__dirname, "./resources/assets/images"),
      "@files": path.resolve(__dirname, "./resources/assets/files"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  server: {
    host: '0.0.0.0',
    port: 5300,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/app.scss"; @import "./src/styles/const.scss";'
      }
    }
  },
})
