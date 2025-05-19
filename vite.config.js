import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isGithubPages = mode === 'gh-pages'

  return {
    base: isGithubPages ? '/PortfolioViniDev01/' : '/',
    plugins: [react()],
  }
})
