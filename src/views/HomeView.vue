<script setup>
import { ref, onMounted } from 'vue'
import { getProfessors } from '../api/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const domains = ref([
  { id: 'software', name: '軟體工程學群', subjects: '人工智慧 · 機器學習 · 資料探勘 · 虛擬實境 · 大數據分析' },
  { id: 'security', name: '資訊與網路安全學群', subjects: '資訊隱藏 · 區塊鏈應用 · 電子商務安全 · 網路安全 · 多媒體安全' },
  { id: 'network', name: '網路工程學群', subjects: '智慧聯網 · 雲端計算 · 邊緣計算 · 車載網路 · 無線通訊' },
  { id: 'system', name: '電腦系統學群', subjects: '自動駕駛系統 · VLSI電腦輔助設計 · 嵌入式系統 · 機器人技術與應用 · 影像與視訊處理' }
])

const professors = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const responseData = await getProfessors() 
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
        >
          <span class="red-dot small"></span>
          {{ prof.name }} 
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 限制最大寬度並置中 */
.home-view {
  max-width: 1100px;
  margin: 30px auto; 
  padding: 40px 60px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid var(--fcu-maroon);
  border-radius: 12px;
  position: relative;
  z-index: 1;
}

.search-section {
  margin-bottom: 50px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.35rem;
  color: var(--fcu-maroon);
  font-weight: bold;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.red-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: var(--fcu-maroon);
  border-radius: 50%;
  margin-right: 12px;
}
.red-dot.small {
  width: 8px;
  height: 8px;
  margin-right: 10px;
}

/* 拉寬間距 */
.domain-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 30px 40px; 
  max-width: 850px;
  margin: 0 auto;
}

.domain-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.domain-card:hover {
  transform: translateY(-5px);
  border-color: var(--iecs-blue);
  box-shadow: 0 12px 24px rgba(47, 92, 169, 0.1);
}

.domain-name {
  padding: 25px 20px 10px 20px;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-dark);
  letter-spacing: 1px;
}

.domain-sub {
  padding: 0 25px 25px 25px;
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* 教授列表 Grid 排版 */
.professor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 12px 20px;
  padding: 0 20px;
}

/* 教授名單互動 */
.professor-item {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--text-dark);
  font-weight: 500;
  letter-spacing: 2px;
}

.professor-item:hover {
  background-color: var(--iecs-blue-light);
  color: var(--iecs-blue);
  transform: translateX(4px);
}

.loading-text {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.mt-5 {
  margin-top: 50px;
}
</style>