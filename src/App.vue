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
/* 🌟 加入全域配色變數 */
:root {
  --fcu-maroon: #8A1C22; /* 逢甲酒紅 */
  --iecs-blue: #2F5CA9;  /* 資工專屬藍 */
  --iecs-blue-light: #F0F4FA; /* 標籤淺藍底色 */
  --text-dark: #333333;
  --text-muted: #666666;
  --border-color: #E0E0E0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Microsoft JhengHei", 'Helvetica Neue', Arial, sans-serif;
  background-color: #FFFFFF; /* 改為純白以配合新版設計 */
  color: var(--text-dark);
  min-height: 100vh;
  position: relative; /* 為了浮水印定位 */
}

/* 🌟 加入低透明度的資工系徽浮水印 */
body::before {
  content: "";
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 450px;
  height: 450px;
  pointer-events: none; /* 確保不會擋到滑鼠點擊 */
  opacity: 0.03; /* 極低透明度 */
  z-index: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='5' y='5' width='90' height='90' rx='20' fill='none' stroke='%232F5CA9' stroke-width='10'/><rect x='15' y='15' width='70' height='70' rx='12' fill='%232F5CA9'/><circle cx='32' cy='32' r='7' fill='%23FFFFFF'/><path d='M20 45 H45 V80 H20 Z' fill='%23FFFFFF'/><path d='M20 45 H45 M20 54 H45 M20 63 H45 M20 72 H45' stroke='%232F5CA9' stroke-width='2'/><text x='50' y='68' fill='%23FFFFFF' font-family='Arial, sans-serif' font-weight='bold' font-size='22'>ECS</text></svg>");
  background-repeat: no-repeat;
  background-size: contain;
}

.main-content {
  /* 🌟 把原本的 max-width 拿掉，改為 100%，由子元件自己控制寬度 */
  width: 100%;
  margin: 0 auto;
  padding: 0; /* 移除 padding，讓子元件自己決定 */
  position: relative;
  z-index: 1; /* 確保內容蓋在浮水印上面 */
}
</style>