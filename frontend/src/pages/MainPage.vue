<template>
  <div class="container">
    <!-- User Info -->
    <section class="user-info">
      <img class="profile-img" src="@/assets/profile.png" alt="프로필 이미지" />
      <div class="user-text">
        <h2 class="user-name">{{ user.name }}</h2>
        <p class="hashtags">{{ user.hashtags }}</p>
      </div>
    </section>

    <div class="total-expense">
      <div>총 지출</div>
      <div class="amount">{{ user.totalExpense.toLocaleString() }}원</div>
    </div>

    <!-- My Ledger -->
    <section class="ledger-section">
      <h3 style="font-size: 24px">나의 가계부</h3>

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

const user = ref({
  name: '홍길동',
  hashtags: '#20대 #무지출',
  totalExpense: 600000,
});

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
  display: flex; /* ✨ 가로로 정렬 */
  align-items: center;
  height: 230px;
  position: relative;
}

.profile-img {
  /* width: 64px; */
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

.total-expense {
  text-align: center;
  background: white;
  color: black;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 210px;
  width: 550px;
  height: 90px;
  padding: 12px 36px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  align-items: center;
  font-size: 20px;
}

.amount {
  font-weight: bold;
}

.ledger-section {
  margin-top: 84px;
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
