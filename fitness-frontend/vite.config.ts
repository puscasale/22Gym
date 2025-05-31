import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {},
  optimizeDeps: {
    esbuildOptions: {
      // fără plugins aici
    },
  },
  server: {
    port: 5173,

  },
})
