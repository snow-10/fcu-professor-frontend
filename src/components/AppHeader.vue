<script setup>
// 這裡目前不需要特殊的邏輯
</script>

<template>
  <header class="app-header">
    <img src="/fcu-logo.png" alt="逢甲大學 Logo" class="logo-img">
    
    <!-- <h1 class="site-title">逢甲大學</h1> -->
    <span class="subtitle">教授專長查詢</span>
  </header>
</template>

<style scoped>
.app-header {
  /* 手繪圖中的酒紅色 */
  background-color: #7d212a; 
  color: white;
  display: flex;
  align-items: center;
  padding: 12px 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 【修改這裡】針對真正的圖片設定樣式 */
.logo-img {
  width: 200px;          /* 根據你的圖片比例調整大小 */
  height: auto;         /* 讓高度自動等比例縮放 */
  margin-right: 10px;   /* 和右邊文字保持距離 */
  /* 如果你的 logo 不是圓形，你可以加 border-radius: 50%; 來裁切它 */
}


/* .subtitle {
  margin-left: 12px;
  font-size: 1rem;
  color: #f0f0f0;
  border-left: 2px solid #f0f0f0;
  padding-left: 12px;
} */
</style>