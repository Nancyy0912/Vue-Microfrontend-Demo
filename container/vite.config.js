import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    Federation({
      name: 'ShoppingApp',
      remotes: {
        'menu': 'http://localhost:3002/dist/assets/menu.js',
        'cart': 'http://localhost:3001/dist/assets/cart.js',
        'header': 'http://localhost:3003/dist/assets/header.js'
      },
      shared: ['vue', 'pinia']
    }),
  ],
  build: {
    target: "ES2022"
  }
})
