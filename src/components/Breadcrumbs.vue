<script setup>
import { RouterLink } from 'vue-router'

// 這裡可以透過 props 傳入當前的頁面名稱，讓元件更彈性
defineProps({
  currentPage: {
    type: String,
    required: true
  }
})
</script>

<template>
  <nav class="breadcrumbs">
    <RouterLink to="/" class="breadcrumb-link">首頁</RouterLink>
    <span class="separator"> > </span>
    <span class="current-page">{{ currentPage }}</span>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  font-size: 16px;
  color: #888; /* 參考手繪圖的灰色字體 */
  margin: 20px 0;
  font-weight: bold;
}

.breadcrumb-link {
  color: #ccc;
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: #666;
}

.separator {
  margin: 0 8px;
  color: #ccc;
}

.current-page {
  color: #ccc;
}
</style>