/* eslint-disable no-undef */
import path from "path"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    })
  ],
  preview: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
  },
  server: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
