<template>
  <div class="sidebar" v-if="visible">
    <div class="logo-wrapper">
      <img :src="logo" alt="logo" class="logo-image" />
    </div>
    <!-- 로그인 상태일 때 -->
    <template v-if="isLoggedIn">
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
    </template>
    <!-- 로그아웃 상태일 때 -->
    <template v-else>
      <div class="not-logged-in">
        <p class="notice-text">로그인이 필요합니다</p>
        <button class="login-button" @click="router.push('/login')">
          로그인
        </button>
      </div>
    </template>
    <div class="line" />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

import logo from '../../assets/logo.svg';
import profile from '../../assets/profile.png';

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['navigate', 'logout']);

const router = useRouter();
const isLoggedIn = ref(false);
const userName = ref('');

onMounted(() => {
  const loginId = localStorage.getItem('userId');
  const storedUserName = localStorage.getItem('userName');
  isLoggedIn.value = !!loginId;
  userName.value = storedUserName || '';
});

const goTo = (page) => {
  emit('navigate', page);
};

const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  router.push('/login').then(() => {
    location.reload(); // 새로고침
  });
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
.login-button {
  background: #308f92;
  color: white;
  border-radius: 9px;
  padding: 7px;
  font-size: 14px;
  font-weight: bold;
  border: none;
}

.login-button:hover {
  background: #266d72;
}
</style>
