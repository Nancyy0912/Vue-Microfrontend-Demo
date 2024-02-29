import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    getCartItems() {
      return this.cartItems;
    },
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeItem(product) {
      const existingProduct = this.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity -= 1;
        if (existingProduct.quantity === 0) {
          this.cartItems = this.cartItems.filter(item => item.id !== product.id);
        }
      }
    },
  },
});
