<template>
  <div class="container">
    <!-- User Info -->
    <section class="user-info">
      <img class="profile-img" src="@/assets/profile.png" alt="프로필 이미지" />
      <h2>{{ user.name }}</h2>
      <p class="hashtags">{{ user.hashtags }}</p>

      <div class="total-expense">
        <div>총 지출</div>
        <div class="amount">{{ user.totalExpense.toLocaleString() }}원</div>
      </div>
    </section>

    <!-- My Ledger -->
    <section class="ledger-section">
      <h3>나의 가계부</h3>

      <div class="menu-list">
        <div class="menu-item" @click="goTo('list')">
          <span>목록 보기</span>
          <span>></span>
        </div>
        <div class="menu-item" @click="goTo('category')">
          <span>카테고리 보기</span>
          <span>></span>
        </div>
        <div class="menu-item" @click="goTo('stats')">
          <span>통계 보기</span>
          <span>></span>
        </div>
      </div>
    </section>

    <!-- Floating Action Button -->
    <button class="fab">+</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

// 사용자 정보 (추후 API 연동 가능)
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
  } else if (page === 'category') {
    console.log('카테고리 보기로 이동');
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
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #308f92;
}

.logo img {
  width: 32px;
  margin-right: 8px;
}

.menu-icon {
  font-size: 24px;
  cursor: pointer;
}

.user-info {
  background: #308f92;
  color: white;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.profile-img {
  width: 64px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.hashtags {
  margin: 4px 0;
  color: #eee;
}

.total-expense {
  background: white;
  color: black;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.amount {
  font-weight: bold;
}

.ledger-section {
  margin-top: 24px;
}

.menu-list {
  margin-top: 12px;
}

.menu-item {
  background: white;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
