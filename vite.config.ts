import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
import { copyFileSync, existsSync, mkdirSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      writeBundle() {
        // Ensure dist directory exists
        if (!existsSync('dist')) {
          mkdirSync('dist', { recursive: true });
        }
        copyFileSync('CNAME', 'dist/CNAME');
        copyFileSync('.nojekyll', 'dist/.nojekyll');
        copyFileSync('404.html', 'dist/404.html');
      }
    }
  ],
  base: '/', // Use '/' for custom domain, or '/repo-name/' for github.io/repo-name
});
