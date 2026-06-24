<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { getProfessorExpertises } from '@/api/index.js'

const route = useRoute()
const professorId = route.params.id

const professorName = ref('')
const groupedExpertises = ref({}) 
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    isLoading.value = true
    const responseData = await getProfessorExpertises(professorId)
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
    <div class="breadcrumbs-wrapper">
      <Breadcrumbs currentPage="教授搜尋" />
    </div>

    <div v-if="isLoading" class="status">資料載入中...</div>
    <div v-else-if="errorMessage" class="status error">{{ errorMessage }}</div>
    <div v-else-if="Object.keys(groupedExpertises).length === 0" class="status">目前尚無此教授的專長資料。</div>

    <div v-else class="main-layout">
      
      <div class="left-column">
        <div class="professor-card">
          <div class="prof-name">{{ professorName }}</div>
          <div class="prof-divider"></div>
          <div class="prof-dept">資訊工程學系</div>
        </div>
      </div>

      <div class="right-column">
        <div class="expertise-section">
          <div 
            class="group-cluster" 
            v-for="(subjects, domain) in groupedExpertises" 
            :key="domain"
          >
            <router-link :to="`/domain/${domain}`" class="cluster-title-link">
              <span class="dot">●</span> 
              {{ domain }}
              <span class="hover-arrow">➔</span> </router-link>
            
            <div class="tags-container">
              <span 
                v-for="sub in subjects" 
                :key="sub"
                class="static-tag"
              >
                {{ sub }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* 容器設定 */
.professor-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 40px;
}

.breadcrumbs-wrapper {
  margin-bottom: 40px;
}

/* 雙欄排版 */
.main-layout {
  display: grid;
  grid-template-columns: 320px 1fr; /* 左側固定 320px，右側自動填滿 */
  gap: 60px;
  align-items: start;
}

/* --- 左側：教授卡片 --- */
.professor-card {
  background: #FFFFFF;
  border: 2px solid var(--iecs-blue);
  border-radius: 8px;
  padding: 35px 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(47, 92, 169, 0.08);
}

.prof-name {
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--text-dark);
  letter-spacing: 6px;
  margin-bottom: 15px;
  text-indent: 6px;
}

.prof-divider {
  height: 2px;
  background-color: var(--iecs-blue);
  width: 60%;
  margin: 0 auto 20px auto;
  opacity: 0.3;
}

.prof-dept {
  font-size: 1.1rem;
  color: var(--iecs-blue);
  font-weight: 600;
  letter-spacing: 1px;
}

/* --- 右側：學群與標籤雲 --- */
.expertise-section {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.group-cluster {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 25px;
}

.group-cluster:last-child {
  border-bottom: none;
}

/* --- 學群標題 (現在是超連結) --- */
.cluster-title-link {
  font-size: 1.25rem;
  color: var(--fcu-maroon);
  font-weight: bold;
  margin-bottom: 18px;
  display: inline-flex;
  align-items: center;
  text-decoration: none; /* 移除超連結預設底線 */
  transition: opacity 0.2s ease;
}

.cluster-title-link:hover {
  opacity: 0.8; /* 游標滑過時稍微變淡 */
}

.cluster-title-link .dot {
  margin-right: 10px;
  font-size: 1rem;
}

/* 標題旁的小箭頭動畫 */
.hover-arrow {
  font-size: 1rem;
  margin-left: 8px;
  opacity: 0; /* 預設隱藏 */
  transform: translateX(-5px);
  transition: all 0.3s ease;
  color: var(--fcu-maroon);
}

.cluster-title-link:hover .hover-arrow {
  opacity: 1; /* 滑過時顯示並往右滑動 */
  transform: translateX(0);
}

/* 標籤排版 (橫向排列) */
.tags-container {
  display: flex;
  flex-wrap: wrap; /* 自動換行 */
  gap: 12px;
}

.static-tag {
  display: inline-block;
  background-color: var(--iecs-blue-light);
  color: var(--iecs-blue);
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: default; /* 🌟 改為預設游標，表示這不是按鈕 */
  transition: background-color 0.2s ease;
}

/* 保留非常輕微的 Hover 變色增加畫面質感，但不會有浮起的按鈕感 */
.static-tag:hover {
  background-color: #E2EAF5; 
}

.status {
  font-size: 18px;
  color: #666;
  padding: 20px 0;
}

.error {
  color: red;
}
</style>