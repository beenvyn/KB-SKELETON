<template>
  <div class="container">
    <!-- 로고 -->
    <div class="logo-wrapper">
      <img :src="logo" alt="SSook 로고" class="logo-image" />
    </div>

    <!-- 로그인 폼 -->
    <form @submit.prevent="login">
      <div class="greeting-text">
        반갑습니다<br />
        SSook입니다.
      </div>

      <input
        v-model="userId"
        type="text"
        class="form-control custom-input"
        placeholder="아이디 입력"
        required
      />
      <input
        v-model="userPassword"
        type="password"
        class="form-control custom-input"
        placeholder="비밀번호 입력"
        required
      />

      <button type="submit" class="btn btn-custom login-button w-100">
        로그인
      </button>
    </form>

    <!-- 회원가입 링크 -->
    <p class="register-link" @click="goToRegister">회원가입</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import logo from '@/assets/logo.svg';

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

    const findUser = userArr.find(function (item) {
      return item.username === userId.value;
    });

    if (!findUser) {
      alert('해당 ID 를 가지는 사용자가 없습니다.');
      return;
    }

    if (findUser.password !== userPassword.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    localStorage.setItem('auth', 'true');
    alert('로그인 성공!');
    router.push({ name: 'main' });
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

/* 전체 배경 및 폼 레이아웃 */
.container {
  width: 100%;
  min-height: 100vh;
  background: #fdfaf3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* 로고 부분 */
.logo-wrapper {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  pointer-events: none;
}

.logo-image {
  width: 100%;
  height: auto;
}

/* 로그인 폼 정렬 */
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

/* 인사말 */
.greeting-text {
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 12px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

/* 부트스트랩 input에 커스텀 적용 */
.custom-input {
  border-radius: 10px;
  padding: 14px 12px;
  font-size: 20px;
  background: #fff;
  box-shadow: 0 0 0 1px #ddd;
  border: none;
}

.custom-input::placeholder {
  color: #a0cfd0;
}

/* 부트스트랩 버튼에 색상, 라운드 추가 */
.btn-custom {
  background: #308f92;
  color: white;
  border-radius: 10px;
  padding: 14px;
  font-size: 20px;
  font-weight: bold;
  border: none;
}

.btn-custom:hover {
  background: #266d72;
}

/* 회원가입 링크 */
.register-link {
  margin-top: 20px;
  font-size: 20px;
  color: #308f92;
  text-decoration: underline;
  cursor: pointer;
}
</style>
