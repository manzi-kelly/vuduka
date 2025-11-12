// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  // Pre-bundle certain node globals used by packages like crypto-browserify.
  // This prevents Vite's dependency optimizer from failing when encountering
  // Node built-ins in the dependency graph.
  optimizeDeps: {
    esbuildOptions: {
      define: {
        // Map Node global to browser globalThis for compatibility
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      // Provide a browser-friendly buffer implementation
      buffer: 'buffer',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://geoservice-e7rc.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
