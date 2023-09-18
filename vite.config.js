import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure you set the `base` to your app's root path.
    base: '/',
    // Enable fallback to index.html for unknown routes
    fs: {
      strict: false,
    },
  },
})
