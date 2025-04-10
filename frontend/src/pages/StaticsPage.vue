<template>
  <div class="container">
    <Title text="월별 통계" />
    <div class="month-selector">
      <img :src="left" @click="changeMonth(-1)" />
      <span>{{ selectedYear }}년 {{ selectedMonth }}월</span>
      <img :src="right" @click="changeMonth(1)" />
    </div>

    <div class="toggle-buttons">
      <button :class="{ active: type === 'income' }" @click="type = 'income'">
        수입
      </button>
      <button :class="{ active: type === 'expense' }" @click="type = 'expense'">
        지출
      </button>
    </div>

    <canvas ref="chartCanvas" />
    <AddButton />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

import Title from '../components/common/Title.vue';
import AddButton from '../components/common/AddButton.vue';

import left from '@/assets/chevron-left.svg';
import right from '@/assets/chevron-right.svg';

Chart.register(PieController, ArcElement, Tooltip, Legend); // Chart.js 등록

const chartCanvas = ref(null);
let chartInstance = null;
const selectedYear = ref(2025);
const selectedMonth = ref(4);
const type = ref('income');
const transactions = ref([]);

const expenseCategoryColors = {
  // 지출 카테고리 색상
  '저축/투자': '#4bc0c0',
  식비: '#ffcd56',
  교통: '#36a2eb',
  통신비: '#9966FF',
  교육: '#FF6384',
  병원: '#FF9F40',
  문화생활: '#FF6384',
  '미용/패션': '#FFB1C1',
  경조사: '#C9CBCF',
};

const incomeCategoryColors = {
  // 수입 카테고리 색상
  알바비: '#4bc0c0',
  용돈: '#FFCD56',
  장학금: '#36a2eb',
  '투자 수익': '#9966FF',
  '공모전/상금': '#FF6384',
  기타: '#FF9F40',
};

// 차트 데이터
const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#dcbe7f',
        '#d1f7ec',
        '#e0f7f4',
        '#ffcd56',
        '#4bc0c0',
        '#36a2eb',
      ],
    },
  ],
});

const router = useRouter();

onMounted(async () => {
  const userData = JSON.parse(window.localStorage.getItem('user'));
  const userId = userData.id;
  if (!userId) {
    await router.push({ name: 'login' }).return;
  }
  await fetchTransactions(userId);
});

// 전체 거래 내역 가져오기
const fetchTransactions = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/transactions?userId=${userId}`
    );
    transactions.value = response.data;
    console.log('전체 거래 내역:', transactions.value);
    updateChartData();
  } catch (error) {
    console.error('거래 내역 가져오기 실패:', error);
  }
};
const updateChartData = () => {
  const month = String(selectedMonth.value).padStart(2, '0');
  const year = selectedYear.value;

  const filtered = transactions.value.filter((item) => {
    return item.date.startsWith(`${year}-${month}`) && item.type === type.value;
  });

  const categoryMap = {};

  filtered.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = 0;
    }
    categoryMap[item.category] += item.amount;
  });

  const categories = Object.keys(categoryMap);

  const categoryColors =
    type.value === 'income' ? incomeCategoryColors : expenseCategoryColors;

  chartData.value = {
    labels: categories,
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: categories.map(
          (category) => categoryColors[category] || '#cccccc'
        ),
      },
    ],
  };
  renderChart();
};

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data: chartData.value,
    options: {
      plugins: {
        legend: { display: true },
      },
    },
  });
};

const changeMonth = (delta) => {
  // 월변경
  selectedMonth.value += delta;
  if (selectedMonth.value === 0) {
    selectedMonth.value = 12;
    selectedYear.value -= 1;
  } else if (selectedMonth.value === 13) {
    selectedMonth.value = 1;
    selectedYear.value += 1;
  }
};

const addTransaction = () => {
  console.log('거래 추가 화면으로 이동!');
};

watch([selectedYear, selectedMonth, type], updateChartData);
</script>

<style scoped>
.container {
  width: 100%;
  background: #fdfaf3;
  text-align: center;
  position: relative;
  min-height: 100vh;
}

.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 25px;
}

.month-selector button {
  cursor: pointer;
}

.toggle-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.toggle-buttons button {
  flex: 1;
  height: 50px;
  font-size: 20px;
  border: 2px solid var(--teal);
  background: white;
  color: var(--teal);
  border-radius: 10px;
  box-shadow: var(--shadow);
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
