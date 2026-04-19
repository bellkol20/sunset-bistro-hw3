import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project URL: https://<user>.github.io/<repo>/
// Set VITE_BASE=/<repo-name>/ in CI (see .github/workflows). Local dev uses "/".
const base = process.env.VITE_BASE || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
