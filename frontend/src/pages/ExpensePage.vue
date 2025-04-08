<template>
  <div class="container">
    <header>
      <Title text="나의 가계부" />
      <div>
        <button>카테고리별</button>
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
      <img :src="left" />
      <p>2025년 1월</p>
      <img :src="right" />
    </div>
    <section>
      <div class="top">
        <p class="day">7일(월)</p>
        <p class="green">+40,000원</p>
        <p class="red">-10,000원</p>
      </div>
      <ul>
        <li>
          <img src="" alt="icon" />
          <div>
            <p>gs25 세종대점</p>
            <p>08:00</p>
          </div>
          <p>3,500원</p>
        </li>
        <li>
          <img src="" alt="icon" />
          <div>
            <p>gs25 세종대점</p>
            <p>08:00</p>
          </div>
          <p>3,500원</p>
        </li>
        <li>
          <img src="" alt="icon" />
          <div>
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
import Title from "../components/common/Title.vue";
import AddButton from "../components/common/AddButton.vue";

import left from "../assets/chevron-left.svg";
import right from "../assets/chevron-right.svg";
</script>

<style scoped>
.container {
  padding: 16px;
  background-color: #faf9f3;
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 20px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
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
