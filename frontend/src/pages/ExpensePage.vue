<template>
  <div class="container">
    <header>
      <img :src="arrow" alt="arrow" @click="goBack" />
      <p class="title">나의 가계부</p>
      <div class="dropdown">
        <button @click="toggleDropdown" :class="{ active: showDropdown }">
          {{ selectedCategory || '카테고리별' }}
        </button>
        <ul v-if="showDropdown" class="dropdown-list">
          <li
            v-for="(category, index) in categories"
            :key="index"
            @click="selectCategory(category)"
            :class="{ selected: selectedCategory === category }"
          >
            {{ category }}
          </li>
        </ul>
      </div>
    </header>
    <section class="amount">
      <div class="profit">
        <p>수입</p>
        <p>{{ income.toLocaleString() }}원</p>
      </div>
      <div class="spending">
        <p>지출</p>
        <p>{{ expense.toLocaleString() }}원</p>
      </div>
      <div class="total">
        <p>합계</p>
        <p>{{ total.toLocaleString() }}원</p>
      </div>
    </section>
    <div class="date">
      <img :src="left" @click="changeMonth(-1)" />
      <span>{{ selectedYear }}년 {{ selectedMonth }}월</span>
      <img :src="right" @click="changeMonth(1)" />
    </div>
    <section
      v-for="(items, day) in groupedByDay"
      :key="day"
      @click="goToDetail(day)"
      class="clickable-section"
    >
      <div class="top">
        <p class="day">{{ day }}일</p>
        <p class="green">
          +{{
            items
              .filter((i) => i.type === 'income')
              .reduce((a, c) => a + c.amount, 0)
              .toLocaleString()
          }}원
        </p>
        <p class="red">
          -{{
            items
              .filter((i) => i.type === 'expense')
              .reduce((a, c) => a + c.amount, 0)
              .toLocaleString()
          }}원
        </p>
      </div>
      <ul class="box">
        <li v-for="item in items" :key="item.id">
          <div class="info">
            <p>{{ item.title }}</p>
            <p>{{ item.time }}</p>
          </div>
          <!-- <p>{{ item.amount.toLocaleString() }}원</p> -->
          <p :class="item.type === 'income' ? 'green' : 'red'">
            {{ item.amount.toLocaleString() }}원
          </p>
        </li>
      </ul>
    </section>

    <AddButton />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import AddButton from '../components/common/AddButton.vue';

import arrow from '@/assets/arrow-left.svg';
import left from '@/assets/chevron-left.svg';
import right from '@/assets/chevron-right.svg';

const BASE_URL = '/api';
const transactionUrl = BASE_URL + '/transactions';

const categories = [
  '전체',
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

const router = useRouter();
const showDropdown = ref(false);
const selectedCategory = ref(null);
const selectedYear = ref(2025);
const selectedMonth = ref(4);

const transactions = ref([]);

const userData = JSON.parse(window.localStorage.getItem('user'));
const userId = ref(parseInt(userData.id));

// 데이터 가져오기
const fetchTransactions = async () => {
  const res = await axios.get(`${transactionUrl}?userId=${userId.value}`);
  console.log(res.data);
  transactions.value = res.data.filter(
    (t) =>
      t.userId === userId.value &&
      new Date(t.date).getFullYear() === selectedYear.value &&
      new Date(t.date).getMonth() + 1 === selectedMonth.value &&
      (!selectedCategory.value || t.category === selectedCategory.value)
  );
};

const groupedByDay = computed(() => {
  const group = {};
  transactions.value.forEach((t) => {
    const day = new Date(t.date).getDate();
    if (!group[day]) group[day] = [];
    group[day].push(t);
  });
  console.log('🚀 ~ transactions.value.forEach ~ group:', group);
  return group;
});

const income = computed(() =>
  transactions.value
    .filter((t) => t.type === 'income')
    .reduce((acc, cur) => acc + cur.amount, 0)
);

const expense = computed(() =>
  transactions.value
    .filter((t) => t.type === 'expense')
    .reduce((acc, cur) => acc + cur.amount, 0)
);

const total = computed(() => income.value - expense.value);

const selectCategory = (category) => {
  selectedCategory.value = category === '전체' ? null : category;
  showDropdown.value = false;
};

const changeMonth = (delta) => {
  selectedMonth.value += delta;
  if (selectedMonth.value === 0) {
    selectedMonth.value = 12;
    selectedYear.value -= 1;
  } else if (selectedMonth.value === 13) {
    selectedMonth.value = 1;
    selectedYear.value += 1;
  }
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const goBack = () => {
  router.go(-1);
};

const goToDetail = (day) => {
  const formattedMonth = selectedMonth.value.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const dateString = `${selectedYear.value}-${formattedMonth}-${formattedDay}`;
  router.push({ name: 'detail', query: { date: dateString } });
};

onMounted(fetchTransactions);

watch([selectedYear, selectedMonth, selectedCategory], fetchTransactions);
</script>

<style scoped>
.container {
  background-color: var(--beige);
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

header img {
  cursor: pointer;
}

.title {
  font-size: 30px;
  font-weight: bold;
  font-family: Gmarket;
}

header button {
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: white;
  width: 120px;
  white-space: nowrap;
  padding: 6px 12px;
  color: var(--teal);
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
  border: 2px solid var(--teal);
  box-shadow: var(--shadow);
}

header button.active {
  background-color: var(--teal);
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-list {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  position: absolute;
  top: 60px;
  z-index: 100;
}

.dropdown-list li {
  padding: 15px 10px;
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  color: var(--teal);
  cursor: pointer;
}

.dropdown-list li.selected {
  background-color: var(--teal);
  color: white;
}

/* 수입/지출/합계 요약 박스 */
.amount {
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin: 20px 0;
  text-align: center;
  font-size: 20px;
}

.amount .profit p:last-child {
  color: var(--green);
  font-weight: bold;
}

.amount .spending p:last-child {
  color: var(--red);
  font-weight: bold;
}

.amount .total p:last-child {
  font-weight: bold;
}

.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.date img {
  cursor: pointer;
}

.container > div:nth-child(4) {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
}

.container > div:nth-child(4) img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

section {
  background: white;
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  margin-bottom: 16px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
}

.green {
  color: #00935c;
  font-weight: bold;
}

.red {
  color: #d23f3f;
  font-weight: bold;
}

.box {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 20px;
}

.box .info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

li:last-child {
  border-bottom: none;
}

li img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

li div {
  flex-grow: 1;
}

li p {
  margin: 0;
}

li p:last-child {
  white-space: nowrap;
  font-weight: bold;
}

.clickable-section {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-section:hover {
  background-color: #f3f3f3;
}
</style>
