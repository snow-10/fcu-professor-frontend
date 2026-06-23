<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全域基本樣式重置 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', Arial, 'LiHei Pro', "微軟正黑體", sans-serif;
  background-color: #fcfcfc; /* 讓背景不是純白，有一點點區隔 */
  color: #333;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}
</style>