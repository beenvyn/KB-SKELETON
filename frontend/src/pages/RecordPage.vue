<template>
  <div class="container">
    <!-- Title -->
    <h2 class="title">기록하기</h2>

    <!-- Type Toggle -->
    <div class="toggle-buttons">
      <button
        :class="{ active: formData.type === 'income' }"
        @click="formData.type = 'income'"
      >
        수입
      </button>
      <button
        :class="{ active: formData.type === 'expense' }"
        @click="formData.type = 'expense'"
      >
        지출
      </button>
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>제목 <span class="required">*</span></label>
        <input v-model="formData.title" type="text" required />
      </div>

      <div class="form-group">
        <label>날짜 <span class="required">*</span></label>
        <input v-model="formData.date" type="date" required />
      </div>

      <div class="form-group">
        <label>시간 <span class="required">*</span></label>
        <input v-model="formData.time" type="time" required />
      </div>

      <div class="form-group">
        <label>금액 <span class="required">*</span></label>
        <input v-model.number="formData.amount" type="number" required />
      </div>

      <div class="form-group">
        <label>카테고리 <span class="required">*</span></label>
        <input v-model="formData.category" type="text" required />
      </div>

      <div class="form-group">
        <label>메모</label>
        <textarea v-model="formData.memo"></textarea>
      </div>

      <div class="form-group" v-if="formData.type === 'expense'">
        <label>셀프 평가 <span class="required">*</span></label>
        <div class="evaluation-buttons">
          <button
            type="button"
            :class="{ active: formData.evaluation === 'great' }"
            @click="formData.evaluation = 'great'"
          >
            <img src="@/assets/smile.svg" alt="great" class="evaluation-img" />
            <!-- 😊 -->
            GREAT
          </button>
          <button
            type="button"
            :class="{ active: formData.evaluation === 'stupid' }"
            @click="formData.evaluation = 'stupid'"
          >
            <img src="@/assets/frown.svg" alt="stupid" class="evaluation-img" />
            <!-- 😟  -->
            STUPID
          </button>
        </div>
      </div>

      <button class="submit-button" type="submit">등록하기</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = '/api';

function getTodayDate() {
  // 오늘 날짜 포맷
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const formData = reactive({
  userId: 1, // 기본
  type: 'income', // 수입 기본
  title: '',
  date: getTodayDate(),
  time: '',
  amount: null,
  category: '',
  memo: '',
  evaluation: '',
});

async function submitForm() {
  console.log('폼 제출됨', formData);

  try {
    const transactionUrl = BASE_URL + '/transactions';

    const todoRes = await axios.post(transactionUrl, formData);
    console.log('기록하기 통신 결과', todoRes);

    // 추가 후 목록으로 이동
    router.push({ name: 'detail' });
    alert('등록 성공');
  } catch (e) {
    alert('통신 에러 발생');
    console.error(e);
  }
}
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
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #308f92;
}

.title {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
}

.toggle-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.toggle-buttons button {
  flex: 1;
  padding: 8px;
  border: 1px solid #308f92;
  background: white;
  color: #308f92;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-buttons button.active {
  background: #308f92;
  color: white;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
}

.required {
  color: red;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

textarea {
  resize: none;
}

.evaluation-buttons {
  display: flex;
  gap: 8px;
}

.evaluation-buttons button {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px; /* 이미지와 텍스트 사이 간격 */
}

.evaluation-buttons button.active {
  border-color: #308f92;
  color: #308f92;
  font-weight: bold;
}

.evaluation-img {
  width: 32px;
  margin-right: 8px;
}

.submit-button {
  width: 100%;
  background: #308f92;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
