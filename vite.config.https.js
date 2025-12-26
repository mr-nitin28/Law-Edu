import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// HTTPS configuration for local testing with Stripe
// This enables Apple Pay, Google Pay, and Link payment methods
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      // You'll need to generate these certificates using mkcert
      // Run: mkcert localhost
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem'),
    },
    port: 5173,
    host: 'localhost'
  }
})

// Instructions:
// 1. Install mkcert: npm install -g mkcert
// 2. Install local CA: mkcert -install
// 3. Generate certificates: mkcert localhost
// 4. Use this config: vite --config vite.config.https.js