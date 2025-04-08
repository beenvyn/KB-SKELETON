<template>
  <div class="container">
    <!-- 로고 -->
    <div class="logo-wrapper">
      <img src="../assets/logo.svg" alt="SSook 로고" class="logo-image" />
    </div>

    <!-- 로그인 폼 -->
    <form @submit.prevent="login">
      <div class="greeting-text">
        반갑습니다.<br />
        SSook입니다.
      </div>
      <input v-model="userId" type="text" placeholder="아이디 입력" required />
      <input
        v-model="userPassword"
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
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = '/api';

const userId = ref('');
const userPassword = ref('');

async function login() {
  try {
    const loginUrl = BASE_URL + '/users';
    const loginRes = await axios.get(loginUrl);

    const userArr = loginRes.data;
    console.log('유저 데이터 목록 : ', userArr);

    const findUser = userArr.find(function (item, index) {
      return item.username === userId.value;
    });

    if (findUser === undefined)
      return alert('해당 ID 를 가지는 사용자가 없습니다.');

    if (findUser.password !== userPassword.value)
      return alert('비밀번호가 일치하지 않습니다.');

    localStorage.setItem('auth', 'true');
    alert('로그인 성공!');

    return router.push({ name: 'main' });
  } catch (e) {
    alert('로그인 통신 ERR 발생');
    console.error(e);
  }
}

function goToRegister() {
  router.push({ name: 'signup' });
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

.greeting-text {
  font-family: 'Pretendard', sans-serif;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.2;
  color: #333;
  margin-bottom: 12px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.container {
  max-width: 430px;
  width: 100%;
  height: 932px;
  margin: 0 auto;
  padding: 24px 20px;
  background: #fdfaf3;
  font-family: 'Helvetica Neue', sans-serif;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.logo-image {
  width: 120px;
  height: auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 14px 12px;
  border-radius: 10px;
  border: none;
  background: #fff;
  color: #333;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 0 1px #ddd;
}

input::placeholder {
  color: #a0cfd0;
}

.login-button {
  width: 100%;
  background: #308f92;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
}

.login-button:hover {
  background: #266d72;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #308f92;
  text-decoration: underline;
  cursor: pointer;
}
</style>
