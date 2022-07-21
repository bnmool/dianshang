import { createRouter, createWebHashHistory } from 'vue-router';
import LayOut from '@/views/Layout';
import Home from '@/views/home';

import TopCategory from '@/views/category';
import SubCategory from '@/views/category/sub'
const routes = [
  // 一级路由
  {
    path: '/',
    component: LayOut,
    children: [
      {
        path: '/',
        name: '',
        component: Home
      },
      { path: '/category/:id', name: '', component: TopCategory },
      { path: '/category/sub/:id', name: '', component: SubCategory }

    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
