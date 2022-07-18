import { createStore } from 'vuex';
// vuex 持久化插件
import createPersostedState from 'vuex-persistedstate';
// axios
import request from '../utils/request';

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
// user 模块
import user from './modules/user';
// cart 模块
import cart from './modules/cart';
// category 模块
import category from './modules/category';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    category
  },
  // 配置插件
  plugins: [
    createPersostedState({
      // 本地储存名字
      key: 'dianshang-client-pc-store',
      // 本地储存的模块
      paths: ['user', 'cart']
    })
  ]
})
