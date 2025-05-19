// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGithubPages = import.meta.env.MODE === 'gh-pages'

export default defineConfig({
  base: isGithubPages ? '/PortfolioViniDev01/' : '/',
  plugins: [react()],
})

