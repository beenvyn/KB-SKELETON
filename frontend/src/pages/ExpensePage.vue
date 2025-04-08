<template>
  <div class="container">
    <header>
      <Title text="나의 가계부" />
      <div class="dropdown">
        <button @click="toggleDropdown">카테고리별</button>
        <ul v-if="showDropdown" class="dropdown-list">
          <li>저축/투자</li>
          <li>교통</li>
          <li>통신비</li>
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
import Title from "../components/common/Title.vue";
import AddButton from "../components/common/AddButton.vue";

import left from "../assets/chevron-left.svg";
import right from "../assets/chevron-right.svg";

const showDropdown = ref(false);
const selectedYear = ref(2025);
const selectedMonth = ref(4);

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
  margin-bottom: 12px;
}

header button {
  background-color: white;
  height: 50px;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  color: var(--teal);
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
  border: 2px solid var(--teal);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.dropdown-list {
  background-color: white;
  z-index: 100;
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
