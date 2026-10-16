import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(rootDirectory, 'index.html'),
        church: resolve(rootDirectory, 'church.html'),
        Bible: resolve(rootDirectory, 'Bible.html'),
        'genesis-1': resolve(rootDirectory, 'genesis-1.html'),
        'Life in the spirit': resolve(rootDirectory, 'Life in the spirit.html'),
        reflection: resolve(rootDirectory, 'reflection.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@supabase/')) return 'supabase';
        }
      }
    },
  }
});
