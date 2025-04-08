<template>
  <div class="container">
    <!-- 로고 -->
    <div class="logo-wrapper">
      <img src="../assets/logo.svg" alt="로고" class="logo-image" />
      <h1 class="logo-text">회원가입</h1>
    </div>

    <!-- 폼 -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>아이디</label>
        <input
          v-model="form.userId"
          type="text"
          placeholder="아이디 입력"
          required
        />
      </div>

      <div class="form-group">
        <label>비밀번호</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="비밀번호 입력"
          required
        />
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="비밀번호 재입력"
          required
        />
      </div>

      <div class="form-group">
        <label>이름</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="이름 입력"
          required
        />
      </div>

      <div class="form-group">
        <label>성별</label>
        <div class="gender-buttons">
          <button
            type="button"
            :class="{ active: form.gender === 'male' }"
            @click="form.gender = 'male'"
          >
            남자
          </button>
          <button
            type="button"
            :class="{ active: form.gender === 'female' }"
            @click="form.gender = 'female'"
          >
            여자
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>생년월일</label>
        <div class="birth-inputs">
          <input
            v-model="form.birthYear"
            type="number"
            placeholder="년(4자)"
            required
          />
          <input
            v-model="form.birthMonth"
            type="number"
            placeholder="월"
            required
          />
          <input
            v-model="form.birthDay"
            type="number"
            placeholder="일"
            required
          />
        </div>
      </div>

      <button type="submit" class="submit-button">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  userId: '',
  password: '',
  confirmPassword: '',
  name: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
});

const submitForm = async () => {
  if (form.password !== form.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다!');
    return;
  }

  const birth = `${form.birthYear}-${String(form.birthMonth).padStart(
    2,
    '0'
  )}-${String(form.birthDay).padStart(2, '0')}`;

  const userData = {
    username: form.userId,
    password: form.password,
    name: form.name,
    gender: form.gender === 'male' ? 'M' : 'F',
    birth,
  };

  try {
    const response = await axios.post('/api/users', userData);
    alert('회원가입이 완료되었습니다!');
    console.log('서버 응답:', response.data);
    router.push({ name: 'main' });
  } catch (e) {
    alert('통신 ERR 발생');
    console.error(e);
  }
};
</script>

<style scoped>
.container {
  max-width: 390px; /* iPhone 16 Pro 기준 */
  margin: 0 auto;
  padding: 32px 20px;
  background: #fdfaf3;
  font-family: 'Helvetica Neue', sans-serif;
  min-height: 100dvh;
  box-sizing: border-box;
}

/* 로고 영역 */
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

.logo-text {
  margin-top: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #222;
}

/* 폼 */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 라벨 + 입력 그룹 */
.form-group {
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

/* 입력창 */
input[type='text'],
input[type='password'],
input[type='email'],
input[type='number'] {
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 15px;
  box-sizing: border-box;
  outline: none;
}

input::placeholder {
  color: #bbb;
}

/* 성별 버튼 */
.gender-buttons {
  display: flex;
  gap: 10px;
}

.gender-buttons button {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 15px;
  font-weight: 500;
  color: #444;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.gender-buttons button.active {
  border-color: #308f92;
  background-color: #e1f6f6;
  color: #308f92;
  font-weight: 700;
}

/* 생년월일 입력 */
.birth-inputs {
  display: flex;
  gap: 8px;
}

.birth-inputs input {
  flex: 1;
  padding: 12px;
  font-size: 15px;
}

/* 제출 버튼 */
.submit-button {
  width: 100%;
  padding: 14px;
  font-size: 17px;
  font-weight: bold;
  background-color: #308f92;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #267c7e;
}
</style>
