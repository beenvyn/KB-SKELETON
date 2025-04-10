<template>
  <div class="container">
    <section class="user-info">
      <img class="profile-img" src="@/assets/profile.png" alt="프로필 이미지" />
      <div class="user-text">
        <h2 class="user-name">{{ user.name }}</h2>
        <div class="hashtags-array">
          <p
            class="hashtags"
            v-for="(hashtag, idx) in user.hashtags"
            :key="idx"
          >
            {{ hashtag }}
          </p>
        </div>
      </div>
    </section>
        <div class="summary-wrap">
  <div class="summary-box">
      <div>이번달 총 수입</div>
      <div class="amount">{{ user.totalIncome.toLocaleString() }}원</div>
    </div>
    <div class="summary-box">
      <div>이번달 총 지출</div>
      <div class="amount">{{ user.totalExpense.toLocaleString() }}원</div>
    </div>
  </div>
    <section class="ledger-section">
      <h3 class="my-expense-title">나의 가계부</h3>

      <div class="menu-list">
        <div class="menu-item" @click="goTo('list')">
          <span>가계부 보기</span>
          <span>></span>
        </div>
        <div class="menu-item" @click="goTo('record')">
          <span>기록하기</span>
          <span>></span>
        </div>
        <div class="menu-item" @click="goTo('stats')">
          <span>통계 보기</span>
          <span>></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const BASE_URL = '/api';
const userId = localStorage.getItem('userId');

const user = ref({
  name: '',
  hashtags: ['', ''],
  totalIncome: 0,
  totalExpense: 0,
});

function getAgeGroup(birth) {
  const today = new Date();
  const birthDate = new Date(birth);

  const age = today.getFullYear() - birthDate.getFullYear() + 1;
  console.log('🚀 ~ getAgeGroup ~ age:', age);

  const ageGroup = Math.floor(age / 10) * 10;
  return `${ageGroup}대`;
}

async function getUserInfo() {
  try {
    const res = await axios.get(BASE_URL + `/users/${userId}`);
    console.log('유저 정보 가지고 오기 통신 결과 데이터', res.data);

    user.value.name = res.data.name;
    user.value.hashtags[0] = `# ${getAgeGroup(res.data.birth)}`;
    user.value.hashtags[1] = `# ${res.data.gender == 'M' ? '남자' : '여자'}`;
  } catch (e) {
    alert('통신 에러 발생');
    console.error(e);
  }
}
async function getUserTotalIncome() {
  try {
    const res = await axios.get(
      BASE_URL + `/transactions?userId=${userId}&type=income`
    );
    console.log('총 수입 통신 결과', res);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const thisMonthIncome = res.data.filter((item) => {
      const [year, month] = item.date.split('-');
      return parseInt(year) === currentYear && parseInt(month) === currentMonth;
    });

    const totalIncome = thisMonthIncome.reduce((sum, item) => {
      if (item.amount) {
        return sum + (item.amount || 0);
      }
      return sum;
    }, 0);

    console.log(`이번 달 총 수입: ${totalIncome.toLocaleString()}원`);

    user.value.totalIncome = totalIncome;
  } catch (e) {
    alert('통신 에러 발생');
    console.error(e);
  }
}

async function getUserTotalExpense() {
  try {
    const res = await axios.get(
      BASE_URL + `/transactions?userId=${userId}&type=expense`
    );
    console.log('총 지출 통신 결과', res);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const thisMonthExpenses = res.data.filter((item) => {
      const [year, month] = item.date.split('-');
      return parseInt(year) === currentYear && parseInt(month) === currentMonth;
    });

    const totalAmount = thisMonthExpenses.reduce((sum, item) => {
      if (item.amount) {
        return sum + (item.amount || 0);
      }
      return sum;
    }, 0);

    console.log(`이번 달 총 지출: ${totalAmount.toLocaleString()}원`);

    user.value.totalExpense = totalAmount;
  } catch (e) {
    alert('통신 에러 발생');
    console.error(e);
  }
}

// 페이지 이동 함수
const goTo = (page) => {
  if (page === 'list') {
    console.log('목록 보기로 이동');
    router.push({ name: 'expense' });
  } else if (page === 'record') {
    console.log('기록하기로 이동');
    router.push({ name: 'record' });
  } else if (page === 'stats') {
    console.log('통계 보기로 이동');
    router.push({ name: 'stats' });
  }
};

getUserInfo();
getUserTotalIncome(); 
getUserTotalExpense();
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

.user-info {
  margin-bottom: 40px;
  background: #308f92;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  height: 230px;
  position: relative;
}

.profile-img {
  border-radius: 50%;
  margin-right: 20px;
}
.user-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.user-name {
  margin: 0;
  color: #eee;
}

.hashtags {
  margin: 4px 0;
  color: #eee;
}

.hashtags-array {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.summary-wrap {
  display: flex;
  justify-content: space-between;
  position: absolute; 
  top: 210px; 
  left: 50%;
  transform: translateX(-50%);
  width: 550px;
  z-index: 10;
  gap: 5px;
}

.summary-box {
  flex: 1;
  background: white;
  color: black;
  border-radius: 8px;
  padding: 12px 36px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 20px;
}

.amount {
  font-weight: bold;
}
.amount {
  font-weight: bold;
}

.ledger-section {
  margin-top: 80px;
}


.my-expense-title {
  font-size: 24px;
  font-family: Gmarket;
}

.menu-list {
  margin-top: 12px;
}

.menu-item {
  height: 80px;
  background: white;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 20px;
}

.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #308f92;
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
