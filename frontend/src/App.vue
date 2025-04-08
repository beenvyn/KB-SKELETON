<script setup>
import { RouterLink, RouterView } from 'vue-router';
import MainPage from './pages/MainPage.vue';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      /
      <RouterLink to="/signup">signup</RouterLink>
      /
      <RouterLink to="/detail">detail</RouterLink>
      /
      <RouterLink to="/statics">statics</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
