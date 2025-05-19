import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './UI'),
      '@': path.resolve(__dirname, './'),
      '~/stories': path.resolve(__dirname, './UI/Components'),
      '~/stories/__fixtures__': path.resolve(__dirname, './UI/Components/__fixtures__'),
      '~/stories/__helpers__': path.resolve(__dirname, './UI/Components/__helpers__'),
    },
  },
}); 