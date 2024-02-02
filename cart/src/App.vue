<template>
  <div>
    <Cart/>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const Cart = defineAsyncComponent(() => import("./components/Cart.vue"));

</script>


