<template>
  <div class="circle" @click="goToRecord">+</div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToRecord = () => {
  router.push("/record");
};
</script>
<style scoped>
.circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--teal);

  font-size: 60px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow);

  cursor: pointer;
}
</style>
