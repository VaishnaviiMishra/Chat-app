import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  base:'/Chat-app/',
  build: {
    outDir: 'dist', // This is where Vite outputs the bundled files
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensures Vite resolves both .js and .jsx
  },
});
