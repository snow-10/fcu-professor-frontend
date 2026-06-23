import { createRouter, createWebHistory } from 'vue-router'
// 引入我們剛剛寫好的首頁
import HomeView from '../views/HomeView.vue'
import DomainView from '../views/DomainView.vue'
import ProfessorView from '../views/ProfessorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // 使用動態參數 :domainName
      path: '/domain/:domainName',
      name: 'domain',
      component: DomainView
    },
    {
      path: '/professor/:id',
      name: 'professor',
      component: ProfessorView
    }
    // 之後圖二 (DomainView) 和圖三 (ProfessorView) 的路由我們會加在這裡
  ]
})

export default router