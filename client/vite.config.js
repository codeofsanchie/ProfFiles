import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'; // Adjusted import for Tailwind CSS v3.x
import autoprefixer from 'autoprefixer'; // Correctly imported

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss, // Use Tailwind CSS
        autoprefixer, // Use Autoprefixer
      ],
    },
  },
});
