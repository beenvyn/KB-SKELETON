<template>
  <div class="wrapper">
    <i class="fa-solid fa-bars" @click="toggleSidebar" />
    <img
      class="logo"
      :src="logo"
      alt="logo"
      @click="goToMain"
      style="cursor: pointer"
    />
    <div v-if="isOpen" class="overlay" @click="toggleSidebar"></div>
    <Sidebar :visible="isOpen" @navigate="handleNavigate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import logo from "../../assets/logo.svg";
import Sidebar from "./Sidebar.vue";


const router = useRouter();
const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const handleNavigate = (page) => {
  isOpen.value = false;
  router.push(`/${page}`);
};

const goToMain = () => {
  router.push({ name: 'main' });
};
</script>

<style scoped>
.wrapper {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;

  min-width: 500px;
  max-width: 700px;
}

.wrapper i {
  font-size: 25px;
  cursor: pointer;
}

.hamburger {
  position: absolute;
  left: 16px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
}
</style>
