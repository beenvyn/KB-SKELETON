<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="header-top">
        <h2>{{ today }}</h2>
        <p>오늘 총 <span class="highlight">100,000원</span> 썼어요</p>
      </div>
      <div class="header-icon">
        😊
      </div>
    </header>

    <!-- Timeline -->
    <div class="timeline">
      <div
        v-for="(item, index) in transactions"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-dot" />
        <div class="timeline-content">
          <h3>{{ item.title }}</h3>
          <div class="details">
            <span>{{ item.amount.toLocaleString() }}원</span>
            <span>{{ item.time }}</span>
          </div>
          <button class="memo-button" @click="goToRecordPage(item.id)">메모하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
 import { useRouter } from 'vue-router'

const today = ref(formatDate(new Date()))
const router = useRouter() 

function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}년 ${month}월 ${day}일`
}

const transactions = [
  { id: 1, title: 'GS25 세종대점', amount: 1000, time: '08:40' },
  { id: 2, title: 'GS25 세종대점', amount: 1000, time: '10:00' },
  { id: 3, title: 'GS25 세종대점', amount: 1000, time: '12:00' },
  { id: 4, title: 'GS25 세종대점', amount: 1000, time: '18:34' },
]
const goToRecordPage = (id) => {
  router.push({ path: '/record', query: { transactionId: id } })
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
  background: #fdfaf3;
  padding: 20px;
}

.header {
  background: #308f92;
  color: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-top h2 {
  margin: 0;
}

.highlight {
  color: #DEA94B;
}

.timeline {
  margin-top: 20px;
  border-left: 3px solid #DEA94B;
  padding-left: 16px;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: #DEA94B;
  border-radius: 50%;
  position: absolute;
  left: -24px;
  top: 5px;
}

.timeline-content h3 {
  margin: 0;
  font-size: 16px;
}

.details {
  font-size: 14px;
  color: #555;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.memo-button {
  background: white;
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>