import react from '@vitejs/plugin-react'
import { defineConfig, type ProxyOptions } from 'vite'
import https from 'node:https'
import type { ClientRequest } from 'node:http'

const MAGENTO_HOST = 'app.magento-headless.test'
const MAGENTO_TARGET = 'https://127.0.0.1'

const magentoAgent = new https.Agent({
  keepAlive: false,
  rejectUnauthorized: false,
  servername: MAGENTO_HOST,
})

function magentoProxy(): ProxyOptions {
  return {
    target: MAGENTO_TARGET,
    changeOrigin: true,
    secure: false,
    timeout: 60_000,
    proxyTimeout: 60_000,
    agent: magentoAgent,
    configure(proxy) {
      proxy.on('proxyReq', (proxyReq: ClientRequest) => {
        proxyReq.setHeader('Host', MAGENTO_HOST)
      })
    },
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': magentoProxy(),
      '/media': magentoProxy(),
    },
  },
})
