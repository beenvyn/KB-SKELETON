<template>
  <div class="container">
    <header>
      <img :src="arrow" alt="arrow" @click="goBack" />
      <p class="title">나의 가계부</p>
      <div class="dropdown">
        <button @click="toggleDropdown" :class="{ active: showDropdown }">
          {{ selectedCategory || "카테고리별" }}
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
        <p>80,000원</p>
      </div>
      <div class="spending">
        <p>지출</p>
        <p>60,000원</p>
      </div>
      <div class="total">
        <p>합계</p>
        <p>80,000원</p>
      </div>
    </section>
    <div class="date">
      <img :src="left" @click="changeMonth(-1)" />
      <span>{{ selectedYear }}년 {{ selectedMonth }}월</span>
      <img :src="right" @click="changeMonth(1)" />
    </div>
    <section>
      <div class="top">
        <p class="day">7일(월)</p>
        <p class="green">+40,000원</p>
        <p class="red">-10,000원</p>
      </div>
      <ul class="box">
        <li>
          <div class="info">
            <p>gs25 세종대점</p>
            <p>08:00</p>
          </div>
          <p>3,500원</p>
        </li>
        <li>
          <div class="info">
            <p>gs25 세종대점</p>
            <p>08:00</p>
          </div>
          <p>3,500원</p>
        </li>
        <li>
          <div class="info">
            <p>gs25 세종대점</p>
            <p>08:00</p>
          </div>
          <p>3,500원</p>
        </li>
      </ul>
    </section>
    <AddButton />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import AddButton from "../components/common/AddButton.vue";

import arrow from "@/assets/arrow-left.svg";
import left from "@/assets/chevron-left.svg";
import right from "@/assets/chevron-right.svg";

const router = useRouter();
const showDropdown = ref(false);
const selectedCategory = ref(null);
const selectedYear = ref(2025);
const selectedMonth = ref(4);

const categories = [
  "저축/투자",
  "식비",
  "교통",
  "통신비",
  "교육",
  "병원",
  "문화생활",
  "미용/패션",
  "경조사",
];

const selectCategory = (category) => {
  selectedCategory.value = category;
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

watch([selectedYear, selectedMonth]);
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
  color: var(--teal);
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

.top .green {
  color: #00935c;
  font-weight: bold;
}

.top .red {
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
</style>
