import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base = nome do repositório no GitHub Pages
export default defineConfig({
  base: '/180-graus/',
  plugins: [vue()],
})
