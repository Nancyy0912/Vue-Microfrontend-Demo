<template>
  <div>
    <Header/>
    <div class="app-align">
      <span class="menu-wrapper">
        <Menu />
      </span>
      <span>
        <Cart />
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted } from "vue";
import { useCartStore } from "cart/CartStore";
import { useProductsStore } from "menu/ProductStore";
import { pubsub } from "menu/PubSub";

const Cart = defineAsyncComponent(() => import("cart/Cart"));
const Menu = defineAsyncComponent(() => import("menu/Menu"));
const Header =defineAsyncComponent(()=> import("header/Header"));

const cartStore = useCartStore();
const productStore = useProductsStore();

pubsub.subscribe("addToCart", (product) => {
  cartStore.addToCart(product);
});

pubsub.subscribe("removeItem", (product) => {
  cartStore.removeItem(product);
});


</script>


<style scoped>
.shopping-app {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1,
h3 {
  text-align: center;
  color: #333;
}

hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}
.app-align {
  display: flex;
}
.menu-wrapper {
  width: 70%;
}
</style>