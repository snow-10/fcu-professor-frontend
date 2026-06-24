<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
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
          id: prof.id, //存教授的 ID ，供跳轉
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
    isLoading.value = true 
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
    <div class="breadcrumbs-wrapper">
      <Breadcrumbs currentPage="領域搜尋" />
    </div>

    <div class="domain-title-box">
      <h2>{{ domainName }}</h2>
    </div>

    <div v-if="isLoading" class="status-message">資料載入中...</div>
    <div v-else-if="errorMessage" class="status-message error">{{ errorMessage }}</div>

    <div v-else-if="flattenedProfessorsList.length === 0" class="status-message">
      此領域目前暫無教授專長資料。
    </div>

    <div v-else class="professor-grid">
      <router-link 
        class="professor-item" 
        v-for="(item, index) in flattenedProfessorsList" 
        :key="index"
        :to="`/professor/${item.id}`"
      >
        <span class="dot">●</span> 
        <span class="text">{{ item.expertise }} &nbsp; {{ item.professorName }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* 容器設定 */
.domain-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 40px;
}

.breadcrumbs-wrapper {
  margin-bottom: 40px;
}

.domain-title-box {
  display: inline-block;
  margin-bottom: 45px;
  background-color: #FFFFFF;
  border: 2px solid var(--fcu-maroon);
  border-radius: 8px;
  padding: 15px 40px;
  box-shadow: 0 4px 15px rgba(138, 28, 34, 0.08);
}

.domain-title-box h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--fcu-maroon);
  letter-spacing: 3px;
}

/* 教授列表的三欄式 CSS Grid */
.professor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 15px 40px;
}

/* 教授資料樣式 */
.professor-item {
  display: flex;
  align-items: center;
  font-size: 1.15rem;
  color: var(--text-dark);
  padding: 12px 18px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap; 
}

/* 游標滑過的互動 */
.professor-item:hover {
  background-color: var(--iecs-blue-light);
  color: var(--iecs-blue);
  transform: translateX(6px);
}

/* 紅色圓點樣式 */
.dot {
  color: var(--fcu-maroon); 
  font-size: 1rem;
  margin-right: 14px;
  transition: color 0.2s ease;
}

/* 圓點互動 */
.professor-item:hover .dot {
  color: var(--iecs-blue);
}

.text {
  letter-spacing: 1.5px;
  font-weight: 500;
}

.status-message {
  font-size: 1.1rem;
  color: var(--text-muted);
  padding: 20px 0;
}

.error {
  color: red;
}
</style>