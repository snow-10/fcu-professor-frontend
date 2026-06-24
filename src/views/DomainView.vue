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
          id: prof.id, // 🌟 新增：把教授的 ID 也存起來，方便跳轉
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
/* 容器設定 (與教授專長頁面一致) */
.domain-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 40px;
}

.breadcrumbs-wrapper {
  margin-bottom: 40px;
}

/* 🌟 現代化的領域名稱方框 */
.domain-title-box {
  display: inline-block;
  margin-bottom: 45px;
  background-color: #FFFFFF;
  border: 2px solid var(--fcu-maroon); /* 換成逢甲酒紅邊框 */
  border-radius: 8px; /* 加上圓角 */
  padding: 15px 40px;
  box-shadow: 0 4px 15px rgba(138, 28, 34, 0.08); /* 帶有微微酒紅色的陰影 */
}

.domain-title-box h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--fcu-maroon); /* 字體也換成酒紅 */
  letter-spacing: 3px;
}

/* 教授列表的三欄式 CSS Grid */
.professor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 15px 40px; /* 稍微縮小上下間距，讓條列感更舒適 */
}

/* 🌟 單筆教授資料樣式 (加入 Hover 與可點擊設計) */
.professor-item {
  display: flex;
  align-items: center;
  font-size: 1.15rem;
  color: var(--text-dark);
  padding: 12px 18px;
  border-radius: 8px; /* 給予隱形的圓角墊背 */
  text-decoration: none; /* 移除超連結的底線 */
  transition: all 0.2s ease;
  white-space: nowrap; 
}

/* 游標滑過的微互動 */
.professor-item:hover {
  background-color: var(--iecs-blue-light); /* 淡藍底色 */
  color: var(--iecs-blue); /* 字體轉為資工藍 */
  transform: translateX(6px); /* 微微向右滑動 */
}

/* 紅色圓點樣式 */
.dot {
  color: var(--fcu-maroon); 
  font-size: 1rem;
  margin-right: 14px;
  transition: color 0.2s ease;
}

/* 當滑鼠移到整行時，圓點也跟著變色 */
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