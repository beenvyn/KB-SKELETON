<script setup>
import { RouterLink, RouterView } from 'vue-router';

import Navbar from './components/common/Navbar.vue';
import AddButton from './components/common/AddButton.vue';
</script>

<template>
  <div class="layout">
    <Navbar />
    <div class="container">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
        <AddButton class="add-btn-abs" />
      </RouterView>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  padding: 0 20px;
}

.add-btn-abs {
  position: absolute;
  bottom: 48px;
  left: 32px;
}
</style>
