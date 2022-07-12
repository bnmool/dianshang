import { createRouter, createWebHashHistory } from 'vue-router';
const LayOut = () => {
  return import('@/views/Layout');
};
const Home = () => {
  return import('@/views/home');
}
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
      }
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
