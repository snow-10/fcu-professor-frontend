<script setup>
import { ref, onMounted } from 'vue'
import { getProfessors } from '../api/index.js' // 引入 fetch API 方法
import { useRouter } from 'vue-router'

const router = useRouter()

// 定義四大領域的靜態資料 (用來產生四個方塊)
const domains = ref([
  { id: 'software', name: '軟體工程學群', subjects: '人工智慧 · 機器學習 · 資料探勘 · 虛擬實境 · 大數據分析' },
  { id: 'security', name: '資訊與網路安全學群', subjects: '資訊隱藏 · 區塊鏈應用 · 電子商務安全 · 網路安全 · 多媒體安全' },
  { id: 'network', name: '網路工程學群', subjects: '智慧聯網 · 雲端計算 · 邊緣計算 · 車載網路 · 無線通訊' },
  { id: 'system', name: '電腦系統學群', subjects: '自動駕駛系統 · VLSI電腦輔助設計 · 嵌入式系統 · 機器人技術與應用 · 影像與視訊處理' }
])

// 存放從後端抓回來的教授資料
const professors = ref([])
const isLoading = ref(true)

// 當元件掛載到畫面上時，執行 API 呼叫
onMounted(async () => {
  try {
    const responseData = await getProfessors() // 這裡拿到了 { message: 'success', data: [...] }
    
    // 【修改這裡】我們要的是 responseData 裡面的 data 陣列！
    professors.value = responseData.data 
    
  } catch (error) {
    alert("獲取教授資料失敗，請確認後端伺服器是否開啟！")
  } finally {
    isLoading.value = false
  }
})

const goToDomain = (domainName) => {
  router.push({ name: 'domain', params: { domainName: domainName } })
}
</script>

<template>
  <div class="home-view">
    
    <section class="search-section">
      <h2 class="section-title"><span class="red-dot"></span>領域搜尋</h2>
      <div class="domain-grid">
        <div 
          v-for="domain in domains" 
          :key="domain.id" 
          class="domain-card"
          @click="goToDomain(domain.name)"
          style="cursor: pointer;"
        >
          <div class="domain-name">{{ domain.name }}</div>
          <div class="domain-sub">{{ domain.subjects }}</div> 
        </div>
      </div>
    </section>

    <section class="search-section mt-5">
      <h2 class="section-title"><span class="red-dot"></span>教授搜尋</h2>
      
      <div v-if="isLoading" class="loading-text">資料載入中...</div>
      
      <div v-else class="professor-grid">
        <div 
          v-for="prof in professors" 
          :key="prof.id" 
          class="professor-item"
          @click="router.push({ name: 'professor', params: { id: prof.id } })"
          style="cursor: pointer;"
        >
          <span class="red-dot small"></span>
          {{ prof.name }} 
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-view {
  /* 加上外框線，模擬你手繪圖的感覺 */
  border: 2px solid #7d212a; 
  padding: 24px;
  background-color: white;
  min-height: 80vh;
}

.search-section {
  margin-bottom: 40px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  margin-bottom: 20px;
}

/* 酒紅色小圓點 */
.red-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #7d212a;
  border-radius: 50%;
  margin-right: 8px;
}
.red-dot.small {
  width: 8px;
  height: 8px;
}

/* 領域方塊 Grid 排版 (2x2) */
.domain-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 切成兩欄 */
  gap: 40px; /* 方塊之間的間距 */
  max-width: 600px;
  margin: 0 auto;
}

.domain-card {
  border: 2px solid #333;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.domain-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.domain-name {
  padding: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 2px solid #333;
}

.domain-sub {
  padding: 5px;
  font-size: 0.9rem;
  color: #666;
}

/* 教授列表 Grid 排版 (3欄) */
.professor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 切成三欄 */
  gap: 20px;
  padding: 0 40px;
}

.professor-item {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px 0;
}
.professor-item:hover {
  color: #7d212a;
  font-weight: bold;
}

.loading-text {
  text-align: center;
  color: #666;
}

/* 工具 class */
.mt-5 {
  margin-top: 50px;
}
</style>