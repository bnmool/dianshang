<template>
  <!-- 顶部通栏 -->
  <AppTopnav>top</AppTopnav>
  <!-- 头部组件 -->
  <AppHeader>header</AppHeader>
  <!-- 头部吸顶 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view />
  </div>
  <!-- 底部组件 -->
  <AppFooter>footer</AppFooter>
</template>
<script>
import AppTopnav from '@/components/app-navbar';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import AppHeaderSticky from '@/components/app-header-sticky';
import { useStore } from 'vuex';
export default {
  name: 'LayOut',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  // 获取分类数据
  setup() {
    const store = useStore();
    store.dispatch('category/getList');
  },
};
</script>

<style lang="less" scoped>
.app-body {
  min-height: 66.5rem;
}
</style>
