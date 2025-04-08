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
  font-size: 24px;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  text-align: left;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: white;
  font-size: 14px;
  outline: none;
  margin-top: 4px;
}

input::placeholder {
  color: #308f92;
}

.gender-buttons {
  display: flex;
  gap: 8px;
}

.gender-buttons button {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.gender-buttons button.active {
  border-color: #308f92;
  color: #308f92;
  font-weight: bold;
}

.birth-inputs {
  display: flex;
  gap: 8px;
}

.submit-button {
  width: 100%;
  background: #308f92;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
