<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
// 🌟 1. 從我們統一管理的 API 檔案中引入函式
import { getProfessorsByDomain } from '@/api/index.js'

const route = useRoute()
const domainName = route.params.domainName

const professorsData = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const flattenedProfessorsList = computed(() => {
  const result = []
  
  professorsData.value.forEach(prof => {
    if (Array.isArray(prof.expertises)) {
      prof.expertises.forEach(exp => {
        result.push({
          professorName: prof.name,
          expertise: exp
        })
      })
    }
  })
  
  result.sort((a, b) => a.expertise.localeCompare(b.expertise, 'zh-TW'))
  
  return result
})

onMounted(async () => {
  try {
    isLoading.value = true // 確保重新抓取時會顯示載入中
    
    // 🌟 2. 呼叫服務台函式，一行搞定！不用再自己管 fetch 和網址編碼了
    const resBody = await getProfessorsByDomain(domainName)
    
    professorsData.value = resBody.data || []
  } catch (error) {
    console.error('取得領域教授資料失敗:', error)
    errorMessage.value = '無法載入資料，請稍後再試。'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="domain-view-container">
    <Breadcrumbs currentPage="領域搜尋" />

    <div class="domain-title-box">
      <h2>{{ domainName }}</h2>
    </div>

    <div v-if="isLoading" class="status-message">資料載入中...</div>
    <div v-else-if="errorMessage" class="status-message error">{{ errorMessage }}</div>

    <div v-else-if="flattenedProfessorsList.length === 0" class="status-message">
      此領域目前暫無教授專長資料。
    </div>

    <div v-else class="professor-grid">
      <div 
        class="professor-item" 
        v-for="(item, index) in flattenedProfessorsList" 
        :key="index"
      >
        <span class="dot">●</span> 
        <span class="text">{{ item.expertise }} {{ item.professorName }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.domain-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 領域名稱方框樣式 */
.domain-title-box {
  border: 2px solid #333;
  padding: 15px 40px;
  display: inline-block;
  margin-bottom: 40px;
  background-color: #fff;
}

.domain-title-box h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* 教授列表的三欄式 CSS Grid */
.professor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 劃分成均等三欄 */
  gap: 25px 40px; /* 上下間距 25px, 左右間距 40px */
}

/* 單筆教授資料樣式 */
.professor-item {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  white-space: nowrap; /* 避免文字因空間不足折行 */
}

/* 紅色圓點樣式 (使用逢甲校徽的暗紅色) */
.dot {
  color: #7d212a; 
  font-size: 16px;
  margin-right: 12px;
}

.text {
  letter-spacing: 1px;
}

.status-message {
  font-size: 18px;
  color: #666;
  padding: 20px 0;
}

.error {
  color: red;
}
</style>