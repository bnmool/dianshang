import { createRouter, createWebHashHistory } from 'vue-router';
import LayOut from '@/views/Layout';
import Home from '@/views/home';
import store from '@/store'

import TopCategory from '@/views/category';
import SubCategory from '@/views/category/sub';
import Goods from '@/views/goods'
import Login from '@/views/login'
import LoginCallback from '@/views/login/callback'
const routes = [
  // 一级路由
  {
    path: '/',
    component: LayOut,
    // 二级路由
    children: [
      {
        path: '/',
        name: '',
        component: Home
      },
      { path: '/category/:id', name: '', component: TopCategory },
      { path: '/category/sub/:id', name: '', component: SubCategory },
      { path: '/product/:id', name: '', component: Goods }
    ]
  },
  { path: '/login', component: Login, name: '' },
  { path: '/login/callback', component: LoginCallback, name: '' }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  console.log(store.state.permission)
  next();
})
export default router
