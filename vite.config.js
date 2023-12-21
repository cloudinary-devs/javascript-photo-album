import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          console.log('id is', id);
          if (id.includes('/pages/')) {
            const name = id.split('/').pop();
            return name.replace(/\.js$/, '');
          }
        },
      },
    },
  },
});
