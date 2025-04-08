<template>
  <div class="container">
    <!-- 헤더 -->
    <header class="header">
      <div class="menu-icon">☰</div>
      <div class="logo">
        <img :src="logo" alt="SSook 로고" />
        <span>SSook</span>
      </div>
    </header>

    <!-- 타이틀 -->
    <h2 class="title">월별 통계</h2>

    <!-- 월 선택 -->
    <div class="month-selector">
      <button @click="changeMonth(-1)">&#60;</button>
      <span>{{ selectedYear }}년 {{ selectedMonth }}월</span>
      <button @click="changeMonth(1)">&#62;</button>
    </div>

    <!-- 수입 / 지출 토글 -->
    <div class="toggle-buttons">
      <button :class="{ active: type === 'income' }" @click="type = 'income'">수입</button>
      <button :class="{ active: type === 'expense' }" @click="type = 'expense'">지출</button>
    </div>

    <!-- 파이 차트 -->
    <canvas ref="chartCanvas"></canvas>

    <!-- 플로팅 버튼 -->
    <button class="fab" @click="goToRecordPage">+</button>
  </div>
</template>
<script setup>
import logo from '@/assets/logo.svg'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, onMounted, watch } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

// Chart.js 등록
Chart.register(PieController, ArcElement, Tooltip, Legend)

const chartCanvas = ref(null)
let chartInstance = null
const selectedYear = ref(2025)
const selectedMonth = ref(4)
const type = ref('income')
const transactions = ref([])
const goToRecordPage = (id) => {
  router.push({ path: '/record', query: { transactionId: id } })
}

const expenseCategoryColors = { // 지출 카테고리 색상
  '저축/투자': '#4bc0c0',
  '식비': '#ffcd56',
  '교통': '#36a2eb',
  '통신비': '#9966FF',
  '교육': '#FF6384',
  '병원': '#FF9F40',
  '문화생활': '#FF6384',
  '미용/패션': '#FFB1C1',
  '경조사': '#C9CBCF'
}

const incomeCategoryColors = { // 수입 카테고리 색상
  '알바비': '#4bc0c0',
  '용돈': '#FFCD56',
  '장학금': '#36a2eb',
  '투자 수익': '#9966FF',
  '공모전/상금': '#FF6384',
  '기타': '#FF9F40'
}
// 차트 데이터
const chartData = ref({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: ['#dcbe7f', '#d1f7ec', '#e0f7f4', '#ffcd56', '#4bc0c0', '#36a2eb']
  }]
})

// 전체 거래 내역 가져오기
const fetchTransactions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/transactions')
    transactions.value = response.data
    console.log('전체 거래 내역:', transactions.value)
    updateChartData()
  } catch (error) {
    console.error('거래 내역 가져오기 실패:', error)
  }
}
const updateChartData = () => {
  const month = String(selectedMonth.value).padStart(2, '0')
  const year = selectedYear.value

  const filtered = transactions.value.filter(item => {
    return item.date.startsWith(`${year}-${month}`) && item.type === type.value
  })

  const categoryMap = {}

  filtered.forEach(item => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = 0
    }
    categoryMap[item.category] += item.amount
  })

  const categories = Object.keys(categoryMap)

  const categoryColors = type.value === 'income' ? incomeCategoryColors : expenseCategoryColors

  chartData.value = {
    labels: categories,
    datasets: [{
      data: Object.values(categoryMap),
      backgroundColor: categories.map(category => categoryColors[category] || '#cccccc')
    }]
  }
  renderChart()
}

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data: chartData.value,
    options: {
      plugins: {
        legend: { display: true }
      }
    }
  })
}

const changeMonth = (delta) => { // 월변경
  selectedMonth.value += delta
  if (selectedMonth.value === 0) {
    selectedMonth.value = 12
    selectedYear.value -= 1
  } else if (selectedMonth.value === 13) {
    selectedMonth.value = 1
    selectedYear.value += 1
  }
}

const addTransaction = () => {
  console.log('거래 추가 화면으로 이동!')
}

onMounted(fetchTransactions)

watch([selectedYear, selectedMonth, type], updateChartData)

</script>

<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
  background: #fdfaf3;
  font-family: sans-serif;
  text-align: center;
  position: relative;
  min-height: 50vh;
  box-sizing: border-box;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.title {
  margin: 16px 0;
}

.month-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.month-selector button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
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

canvas {
  margin-top: 16px;
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