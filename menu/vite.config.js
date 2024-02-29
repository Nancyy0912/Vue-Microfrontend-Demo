import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002,
  },
  plugins: [
    vue(),
    Federation({
      name: 'menu',
      filename: 'menu.js',
      exposes: {
        './Menu': './src/components/MenuList.vue',
        './ProductStore': './src/store/productStore.js',
        './PubSub': './src/pubsub.js'
      },
      shared: ['vue', 'pinia'],
      remotes:{
        'cart': 'http://localhost:3001/dist/assets/cart.js',
      },
    }),
  ],
  build: {
    target: "ES2022"
  }
})
