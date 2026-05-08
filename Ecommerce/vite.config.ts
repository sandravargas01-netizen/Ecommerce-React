import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ecommerce-api.wittysky-ae597b7e.westus2.azurecontainerapps.io',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})