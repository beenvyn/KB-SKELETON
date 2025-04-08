<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="header-top">
        <h2>{{ today }}</h2>
        <p>오늘 총 <span class="highlight">{{ totalAmount.toLocaleString() }}원</span> 썼어요</p>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const today = ref(formatDate(new Date()))
const router = useRouter() 
const transactions = ref([]) // ✅ 거래 내역 저장할 변수 선언!4
const totalAmount = computed(() => {
  return transactions.value.reduce((sum, item) => sum + item.amount, 0)
})

function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}년 ${month}월 ${day}일`
}

function getTodayDate() { // 오늘 날짜 포맷
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}


const userId = '1' //  유저 ID (지금은 1번 사용자로 임시 설정)

onMounted(async () => {
  try {
    const todayString = getTodayDate()
    const res = await axios.get(`http://localhost:3000/transactions?userId=${userId}&date=${todayString}`)
    transactions.value = res.data.filter(item => item.type === 'expense')
    console.log('오늘의 거래 내역:', transactions.value)
  } catch (error) {
    console.error('API 호출 실패:', error)
  }
})
const goToRecordPage = (id) => {
  router.push({ path: '/record', query: { transactionId: id } })
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  font-family: sans-serif;
  background: #fdfaf3;
  padding: 20px;
  box-sizing: border-box; 
  min-height: 100vh; 
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