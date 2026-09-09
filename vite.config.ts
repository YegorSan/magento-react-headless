import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://app.magento-headless.test',
        changeOrigin: true,
        secure: false
      }
    },
  },
})
