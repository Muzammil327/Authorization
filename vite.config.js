import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    base: '/', // Ensure this is set to '/'
    // ... other server configuration options
  },
})
