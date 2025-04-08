<template>
  <div class="sidebar" v-if="visible">
    <div class="logo-wrapper">
      <img :src="logo" alt="logo" class="logo-image" />
    </div>
    <div class="user-info">
      <img :src="profile" alt="프로필 이미지" class="profile-image" />
      <p class="user-name">{{ userName }}</p>
    </div>
    <div class="line" />
    <nav class="menu">
      <p class="menu-item" @click="goTo('main')">메인 페이지</p>
      <p class="menu-item" @click="goTo('expense')">나의 가계부</p>
      <p class="menu-item" @click="goTo('stats')">통계</p>
      <p class="menu-item" @click="logout">로그아웃</p>
    </nav>
    <div class="line" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.png";

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(["navigate", "logout"]);

const router = useRouter();
const userName = "홍길동";

const goTo = (page) => {
  emit("navigate", page);
};

const logout = () => {
  // 로그아웃 처리
  router.push("/login");
};
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 24px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}

.line {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  margin: 30px 0;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.user-info {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 65px;
}

.user-name {
  font-family: Gmarket;
  font-size: 24px;
  margin-left: 10px;
}

.menu {
  margin-top: 16px;
}

.menu-item {
  padding: 20px 0;
  cursor: pointer;
  font-size: 20px;
}

.menu-item:hover {
  background: #f4f4f4;
}
</style>
