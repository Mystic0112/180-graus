import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base = nome do repositório no GitHub Pages
export default defineConfig({
  base: '/Site-do-Armando/',
  plugins: [vue()],
})
