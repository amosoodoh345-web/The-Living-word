import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = fileURLToPath(new URL('.', import.meta.url));
const buildId = Date.now().toString(36);

export default defineConfig({
  define: {
    __LIFEOS_BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [
    react(),
    {
      name: 'lifeos-version-service-worker',
      apply: 'build',
      enforce: 'post',
      async closeBundle() {
        const workerPath = resolve(rootDirectory, 'dist', 'service-worker.js');
        const source = await readFile(workerPath, 'utf8');
        const versionedSource = source.replace(
          "const BUILD_ID = '__LIFEOS_BUILD_ID__';",
          `const BUILD_ID = ${JSON.stringify(buildId)};`
        );

        if (versionedSource === source) {
          throw new Error('Could not inject the LIFEOS build ID into the service worker.');
        }

        await writeFile(workerPath, versionedSource);
      }
    }
  ],
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
        privacy: resolve(rootDirectory, 'privacy.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@supabase/')) return 'supabase';
        }
      }
    },
  }
});
