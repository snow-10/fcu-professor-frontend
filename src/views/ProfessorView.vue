<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { getProfessorExpertises } from '@/api/index.js'

const route = useRoute()
// 🌟 從網址列取得的是 ID
const professorId = route.params.id

// 準備變數來接後端的資料
const professorName = ref('')
const groupedExpertises = ref({}) // 直接接收後端分組好的物件
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    isLoading.value = true
    
    // 傳入 ID 給 API
    const responseData = await getProfessorExpertises(professorId)
    
    // 🌟 直接把後端送來的資料塞進變數，不用自己算！
    professorName.value = responseData.data.name
    groupedExpertises.value = responseData.data.expertises
    
  } catch (error) {
    errorMessage.value = '讀取教授資料失敗，請稍後再試。'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="professor-view-container">
    <Breadcrumbs currentPage="教授搜尋" />

    <div v-if="isLoading" class="status">資料載入中...</div>
    <div v-else-if="errorMessage" class="status error">{{ errorMessage }}</div>
    <div v-else-if="Object.keys(groupedExpertises).length === 0" class="status">目前尚無此教授的專長資料。</div>

    <div v-else class="layout-container">
      
      <div class="left-column">
        <div class="name-box">
          <h2>{{ professorName }}</h2>
        </div>
      </div>

      <div class="right-column">
        <div 
          class="domain-group" 
          v-for="(subjects, domain) in groupedExpertises" 
          :key="domain"
        >
          <div class="domain-title">
            <span class="dot">●</span> {{ domain }}
          </div>
          
          <div class="subject-list">
            <div 
              class="subject-item" 
              v-for="sub in subjects" 
              :key="sub"
            >
              <span class="arrow">→</span> {{ sub }}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* 1. 調整整體容器，把最大寬度放寬，讓內容能更往左右兩側延伸 */
.professor-view-container {
  max-width: 1400px; /* 原本是 1200px，放寬讓整體往左靠 */
  width: 80%; /* 讓畫面在不同螢幕下都能盡量向兩邊延展 */
  margin: 0 auto;
  padding: 0px 100px; /* 讓內容在左右兩側有一點空白 */
}

/* 2. 增加左右兩欄的間距，把右欄往右推 */
.layout-container {
  display: flex;
  gap: 150px; /* 🌟 關鍵修改：從 50px 改為 150px，大幅拉開左右距離 */
  margin-top: 40px;
  align-items: flex-start;
  width: 100%;
}

.left-column {
  flex: 0 0 auto;
}

.name-box {
  border: 2px solid #7d212a;
  padding: 20px 50px;
  background-color: #fff;
}

.name-box h2 {
  margin: 0;
  font-size: 28px;
  letter-spacing: 4px; /* 姓名也可以稍微散開一點 */
}

.right-column {
  flex: 1;
  padding-top: 10px;
  min-width: 600px;
}

/* --- 3. 處理「字散開一些」的需求 --- */

.domain-group {
  margin-bottom: 45px; /* 增加各個領域群組之間的上下距離 (原本 30px) */
}

.domain-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 3px; /* 🌟 增加領域名稱的字距 */
}

.dot {
  color: #7d212a;
  font-size: 22px;
  margin-right: 12px;
}

.subject-list {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px; /* 🌟 增加各個科目之間的上下距離 (原本 10px) */
}

.subject-item {
  font-size: 18px;
  color: #333;
  font-weight: 500;
  letter-spacing: 2px; /* 🌟 增加科目名稱的字距 */
}

.arrow {
  color: #7d212a;
  margin-right: 10px;
  font-weight: bold;
}

.status {
  font-size: 18px;
  margin-top: 20px;
}
.error {
  color: red;
}
</style>