<template>
  <div class="wrapper">
    <img :src="arrow" alt="back" @click="goBack" />
    <p class="title">{{ text }}</p>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import arrow from "../../assets/arrow-left.svg";

const props = defineProps({
  text: String,
});

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
}

.wrapper img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.title {
  font-size: 30px;
  font-family: Gmarket;
  font-weight: bold;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
