<template>
 <div>
  <Menu/>
 </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const Menu = defineAsyncComponent(() => import("./components/MenuList.vue"));
</script>
