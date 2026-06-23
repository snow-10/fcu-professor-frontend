import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入我們剛剛寫好的 router 設定

const app = createApp(App)

app.use(router) // 告訴 Vue 掛載 Router
app.mount('#app')