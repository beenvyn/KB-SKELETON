<template>
  <div class="container">
    <!-- 로고 -->
    <div class="logo-wrapper">
      <img src="/logo.png" alt="SSook 로고" class="logo-image" />
      <h1 class="logo-text">SSook</h1>
    </div>

    <!-- 인사말 -->
    <p class="greeting">
      반갑습니다.<br />
      SSook입니다.
    </p>

    <!-- 로그인 폼 -->
    <form @submit.prevent="login">
      <input
        v-model="form.userId"
        type="text"
        placeholder="아이디 입력"
        required
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="비밀번호 입력"
        required
      />
      <button type="submit" class="login-button">로그인</button>
    </form>

    <!-- 회원가입 링크 -->
    <p class="register-link" @click="goToRegister">회원가입</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  userId: '',
  password: '',
});

// 로그인 함수
const login = () => {
  console.log('로그인 시도:', form);
  alert(`아이디: ${form.userId}, 비밀번호: ${form.password}`);
};

// 회원가입 이동
const goToRegister = () => {
  console.log('회원가입 페이지로 이동');
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: #fdfaf3;
  font-family: sans-serif;
  text-align: center;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.logo-image {
  width: 80px;
}

.logo-text {
  margin: 8px 0;
  color: #308f92;
}

.greeting {
  font-family: 'Nanum Brush Script', cursive;
  margin-bottom: 24px;
  font-size: 18px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: white;
  color: #308f92;
  font-size: 14px;
  outline: none;
}

input::placeholder {
  color: #308f92;
}

.login-button {
  background: #308f92;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.register-link {
  margin-top: 16px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
