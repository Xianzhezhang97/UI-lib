import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './UI'),
      '@': path.resolve(__dirname, './'),
      '~/stories': path.resolve(__dirname, './UI/stories'),
      '~/stories/__fixtures__': path.resolve(__dirname, './UI/stories/__fixtures__'),
      '~/stories/__helpers__': path.resolve(__dirname, './UI/stories/__helpers__'),
    },
  },
}); 