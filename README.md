# 逢甲大學資工系教授專長查詢系統 (FCU CS Professor Expertise Search)

一個基於 Vue 3 與 Node.js 開發的單頁應用程式 (SPA)，旨在幫助逢甲資工系學生快速、直覺地檢索系上教授的專長領域，作為專題指導或課程選修的實用參考工具。

## ✨ 功能亮點 (Features)

- **現代化互動介面**：採用卡片化設計與流暢的懸停 (Hover) 微互動，提升瀏覽體驗。
- **四大領域精準檢索**：支援透過「軟體工程、資訊與網路安全、網路工程、電腦系統」四大核心學群進行分類篩選。
- **專長標籤雲與反向搜尋**：教授個人頁面以標籤雲 (Tag Cloud) 呈現專長，並支援點擊學群標題快速反向查找同領域的其他教授。
- **前後端分離架構**：前端 Vue 3 搭配 Vite 建置，後端 Node.js + SQLite 提供輕量且高效的 API 服務。

## 📸 畫面截圖 (Screenshots)

*(請將以下圖片路徑替換為你實際存放在 github 倉庫中的截圖路徑)*

- **首頁總覽**
  ![Home Page](./docs/images/home-screenshot.png)
- **領域搜尋結果**
  ![Domain Search](./docs/images/domain-screenshot.png)
- **教授個人專長頁面**
  ![Professor Profile](./docs/images/professor-screenshot.png)

## 🛠️ 技術堆疊 (Tech Stack)

**Frontend:**
- [Vue 3](https://vuejs.org/) (Composition API)
- [Vue Router 4](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- Vanilla CSS (CSS Grid, Flexbox, CSS Variables)

**Backend:**
- [Node.js](https://nodejs.org/) (ES Modules)
- [Express.js](https://expressjs.com/)
- [SQLite 3](https://www.sqlite.org/) (關聯式資料庫)
- CORS

# 前後段端需分開啟動

- 前端：https://github.com/snow-10/fcu-professor-frontend

- 後端：https://github.com/snow-10/fcu-professor-backend


# frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
