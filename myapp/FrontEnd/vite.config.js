import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Print which env variables Vite sees at config time so builds show exact values.
// This log will appear in the terminal during `vite` / `vite build` runs.
const computedApiUrl = process.env.VITE_API_URL || 'https://ragagent-6005.onrender.com'
console.log('Vite config: NODE_ENV=', process.env.NODE_ENV)
console.log('Vite config: process.env.VITE_API_URL=', process.env.VITE_API_URL)
console.log('Vite config: computedApiUrl=', computedApiUrl)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    define: {
      // inject value so client code can read import.meta.env.VITE_API_URL
      'import.meta.env.VITE_API_URL': JSON.stringify(computedApiUrl),
    },
  }

  // Add a dev proxy only when running the dev server locally
  if (command !== 'build') {
    config.server = {
      port: 3000,
      proxy: {
        '/test': {
          target: computedApiUrl,
          changeOrigin: true,
          secure: true,
        },
      },
    }
  }

  return config
})
