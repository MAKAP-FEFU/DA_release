import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react(), svgr({ include: '**/*.svg?svgr' })],
});
