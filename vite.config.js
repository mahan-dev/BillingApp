import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/billingApp",
  server: {
    fs: {
      strict: false,
    },
    hmr: {
      overlay: false,
    },
    index: '/BillingApp/index.html', // Replace with your actual GitHub repository name
  },
})
