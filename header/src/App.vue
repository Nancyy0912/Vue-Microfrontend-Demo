<template>
  <div>
    <Header/>
  </div>
</template>

<script setup>

import { defineAsyncComponent } from "vue";

const Header = defineAsyncComponent(() => import("./components/Header.vue"));

</script>

