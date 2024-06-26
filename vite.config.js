import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

// console.log(path.resolve(__dirname, 'src/assets'));
// console.log(path.resolve(__dirname, 'src/utils'));
// console.log(path.resolve(__dirname, 'src/components'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/jewelry-store',
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@widgets': path.resolve(__dirname, 'src/widgets')
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
});
