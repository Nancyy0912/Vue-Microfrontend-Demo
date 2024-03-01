import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    vue(),
    Federation({
      name: 'cart',
      filename: 'cart.js',
      exposes: {
        './Cart': './src/components/Cart.vue',
        './CartStore': './src/store/cartStore.js',
        './PubSub': './src/pubsub.js'
      },
      shared: ['vue', 'pinia'],
      // remotes:{
      //   'menu': 'http://localhost:3002/dist/assets/menu.js',
      // },
    }),
  ],
  build: {
    target: "ES2022"
  }
})
