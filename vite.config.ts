import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        copyFileSync('CNAME', 'dist/CNAME');
        copyFileSync('.nojekyll', 'dist/.nojekyll');
      }
    }
  ],
  base: '/', // Use '/' for custom domain, or '/repo-name/' for github.io/repo-name
});
