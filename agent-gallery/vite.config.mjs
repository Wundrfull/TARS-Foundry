import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/App.tsx',
        './src/styles/index.css'
      ]
    },
    hmr: {
      overlay: true,
      host: 'localhost',
    },
    watch: {
      usePolling: false, // Disable polling for better performance
    },
    fs: {
      strict: false // Allow serving files outside of root
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@heroui/react', 'framer-motion'],
    exclude: [],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@heroui/react', 'framer-motion']
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})