<template>
  <div class="container">
    <Title text="기록하기" />

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
        <select v-model="formData.category" required>
          <option value="">카테고리를 선택하세요</option>
          <option
            v-for="(category, idx) in categoryOptions"
            :key="idx"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
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
            <img src="@/assets/great.svg" alt="great" class="evaluation-img" />
            <!-- 😊 -->
            GREAT
          </button>
          <button
            type="button"
            :class="{ active: formData.evaluation === 'stupid' }"
            @click="formData.evaluation = 'stupid'"
          >
            <img
              src="@/assets/stupid.svg"
              alt="stupid"
              class="evaluation-img"
            />
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
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Title from '../components/common/Title.vue';

const router = useRouter();
const BASE_URL = '/api';

// 오늘 날짜
function getTodayDate() {
  const date = new Date();
  console.log('🚀 ~ getTodayDate ~ date:', date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 지금 시간
function getNowTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

const userData = JSON.parse(window.localStorage.getItem('user'));
const userId = userData.id;

const incomeCategories = [
  '알바비',
  '용돈',
  '장학금',
  '투자 수익',
  '공모전 상금',
  '기타',
];

const expenseCategories = [
  '저축/투자',
  '식비',
  '교통',
  '통신비',
  '교육',
  '병원',
  '문화생활',
  '미용/패션',
  '경조사',
];

const formData = reactive({
  userId: parseInt(userId),
  type: 'income', // 수입 기본
  title: '',
  date: getTodayDate(),
  time: getNowTime(),
  amount: null,
  category: '',
  memo: '',
  evaluation: '',
});

// type에 따라서 보여줄 카테고리 다르게
const categoryOptions = computed(() => {
  if (formData.type === 'income') {
    return incomeCategories;
  } else if (formData.type === 'expense') {
    return expenseCategories;
  }
});

async function submitForm() {
  console.log('폼 제출됨', formData);

  try {
    const transactionUrl = BASE_URL + '/transactions';

    if (formData.amount === 0) return alert('유효한 금액을 입력해주세요.');

    if (formData.type == 'expense' && !formData.evaluation)
      return alert('지출의 평가를 해주세요.');

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
  min-height: 100vh;
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
  margin-bottom: 20px;
}

.toggle-buttons button {
  flex: 1;
  padding: 12px;
  border: 1px solid #308f92;
  background: white;
  color: #308f92;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
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
select,
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
