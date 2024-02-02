import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3003,
  },
  plugins: [
    vue(),
    Federation({
      name: 'header',
      filename: 'header.js',
      exposes: {
        './Header': './src/components/Header.vue',
      },
      shared: ['vue', 'pinia']
    }),
  ],
  build: {
    target: "ES2022"
  }
})
