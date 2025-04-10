<template>
  <div class="circle" @click="goToRecord">+</div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToRecord = () => {
  router.push('/record');
};
</script>
<style scoped>
.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--teal);

  font-size: 55px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow);
  cursor: pointer;
  z-index: 1000;
}
</style>
