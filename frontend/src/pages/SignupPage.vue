<template>
  <div class="container">
    <header>
      <img :src="logoImg" alt="logo" />
      <p>회원가입</p>
    </header>

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
          <select v-model="form.birthYear" required>
            <option disabled value="">년</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <select v-model="form.birthMonth" required>
            <option disabled value="">월</option>
            <option v-for="month in 12" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
          <select v-model="form.birthDay" required>
            <option disabled value="">일</option>
            <option v-for="day in daysInMonth" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" class="submit-button">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

import Title from '../components/common/Title.vue';
import logoImg from '@/assets/logo-img.svg';

const router = useRouter();

const currentYear = new Date().getFullYear();
const years = computed(() =>
  Array.from({ length: currentYear - 1925 + 1 }, (_, i) => currentYear - i)
);

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

const daysInMonth = computed(() => {
  const year = Number(form.birthYear);
  const month = Number(form.birthMonth);
  if (!year || !month) return [];
  const lastDay = new Date(year, month, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => i + 1);
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
    alert('통신 오류 발생');
    console.error(e);
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-family: sans-serif;
  background: #fdfaf3;
  padding: 20px;
  position: relative;
  min-height: 100vh;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}

header p {
  font-size: 30px;
  font-family: Gmarket;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-size: 20px;
}

.form-group {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input,
select {
  width: 100%;
  padding: 15px 10px;
  border-radius: 8px;
  border: none;
  background: white;
  font-size: 20px;
  outline: none;
}

input::placeholder {
  color: var(--teal);
}

.gender-buttons {
  display: flex;
  gap: 8px;
}

.gender-buttons button {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--teal);
  background: white;
  font-size: 20px;
  cursor: pointer;
}

.gender-buttons button.active {
  background-color: var(--teal);
  color: white;
}

.birth-inputs {
  display: flex;
  gap: 8px;
}

.submit-button {
  width: 100%;
  background: var(--teal);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
}
</style>
