<script setup>
import { RouterLink, RouterView } from "vue-router";

import Navbar from "./components/common/Navbar.vue";
</script>

<template class="container">
  <div>
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  padding: 0 20px;
}
</style>
