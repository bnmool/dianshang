import { createRouter, createWebHashHistory } from 'vue-router';
import LayOut from '@/views/Layout';
import Home from '@/views/home';
import store from '@/store'

import TopCategory from '@/views/category';
import SubCategory from '@/views/category/sub';
import Goods from '@/views/goods'
import Login from '@/views/login'
import LoginCallback from '@/views/login/callback'
import Cart from '@/views/cart';
import CheckOut from '@/views/member/pay/checkout';
import PayIndex from '@/views/member/pay'
const routes = [
  // 一级路由
  {
    path: '/',
    component: LayOut,
    // 二级路由
    children: [
      { path: '/', name: '', component: Home },
      { path: '/category/:id', name: '', component: TopCategory },
      { path: '/category/sub/:id', name: '', component: SubCategory },
      { path: '/product/:id', name: '', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: CheckOut },
      { path: '/member/pay', component: PayIndex },
    ]
  },
  { path: '/login', component: Login, name: '' },
  { path: '/login/callback', component: LoginCallback, name: '' }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    // vue2.0  x  y  控制
    // vue3.0  left  top 控制
    return { left: 0, top: 0 }
  }
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { profile } = store.state.user
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !profile.token) {
    next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})
export default router
