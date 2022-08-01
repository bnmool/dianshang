import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 组件动画
import dianshangComponents from './components/library'
// 重置样式库
import 'normalize.css';
// 公共样式
import '@/assets/styles/common.less';
// 载入动画库
import '@/assets/styles/animate.less'

createApp(App).use(store).use(router).use(dianshangComponents).mount('#app');
