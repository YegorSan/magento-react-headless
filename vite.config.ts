import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import https from 'node:https'

// Local Magento
const magentoAgent = new https.Agent({
  keepAlive: false,
  rejectUnauthorized: false,
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://app.magento-headless.test',
        changeOrigin: true,
        secure: false,
        timeout: 60_000,
        proxyTimeout: 60_000,
        agent: magentoAgent,
      },
    },
  },
})
