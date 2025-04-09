<template>
  <div class="container py-4" style="background: #fdfaf3; min-height: 100vh">
    <!-- Header -->
    <header class="header d-flex justify-content-between align-items-center">
      <div class="header-top">
        <h1>{{ today }}</h1>
        <p>
          오늘 총
          <span class="highlight">{{ totalAmount.toLocaleString() }}원</span>
          썼어요
        </p>
      </div>
      <div class="header-icon">
        <img :src="evaluationIcon" alt="기분 아이콘" />
      </div>
    </header>

    <div class="timeline">
      <div
        v-for="(item, index) in transactions"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-dot" />
        <div class="timeline-content">
          <h3>{{ item.title }}</h3>
          <div class="details d-flex gap-2 text-muted small mb-2">
            <span>{{ item.amount.toLocaleString() }}원</span>
            <span>{{ item.time }}</span>
          </div>
          <button
            v-if="!item.memo"
            class="btn btn-outline-secondary btn-sm memo-button"
            @click="goToRecordPage(item.id)"
          >
            메모하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import smile from "@/assets/smile.svg";
import frown from "@/assets/frown.svg";

const BASE_URL = "/api";
const transactionUrl = BASE_URL + "/transactions";

const today = ref(formatDate(new Date()));
const router = useRouter();
const route = useRoute();

const evaluationIcon = ref(smile); // 기본 아이콘

const updateEvaluationIcon = () => {
  if (transactions.value.length === 0) return;

  const goodCount = transactions.value.filter(
    (item) => item.evaluation === "good"
  ).length;
  const ratio = goodCount / transactions.value.length;

  evaluationIcon.value = ratio >= 0.5 ? smile : frown;
};

const transactions = ref([]); // 거래 내역 저장할 변수 선언
const totalAmount = computed(() => {
  return transactions.value.reduce((sum, item) => sum + item.amount, 0);
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

onMounted(async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    router.push({ name: "login" });
    return;
  }

  // 쿼리에서 날짜 가져오기
  const todayString = route.query.date;
  const dateObj = new Date(todayString);
  today.value = formatDate(dateObj);

  try {
    const res = await axios.get(
      `${transactionUrl}?userId=${userId}&date=${todayString}`
    );
    transactions.value = res.data.filter((item) => item.type === "expense");
    updateEvaluationIcon();
    console.log("해당 날짜의 거래 내역:", transactions.value);
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
});

const goToRecordPage = (id) => {
  router.push({ path: "/record", query: { transactionId: id } });
};
</script>

<style scoped>
.header {
  background: var(--teal);
  color: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-top h1 {
  margin: 0;
  font-size: 40px;
  font-family: Gmarket;
}

.header-top p {
  font-size: 20px;
}

.highlight {
  color: var(--orange);
}

.timeline {
  margin-top: 20px;
  border-left: 3px solid #dea94b;
  padding-left: 16px;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  background: #dea94b;
  border-radius: 50%;
  position: absolute;
  left: -24px;
  top: 5px;
}

.timeline-content {
  font-size: 20px;
}

.details {
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.memo-button {
  background: white;
  border: none;
  box-shadow: var(--shadow);
  padding: 8px 25px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}

.memo-button:hover {
  background-color: var(--teal);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
</style>
