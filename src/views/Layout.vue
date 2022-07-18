<template>
  <!-- 顶部通栏 -->
  <AppTopnav>top</AppTopnav>
  <!-- 头部组件 -->
  <AppHeader>header</AppHeader>
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
export default {
  name: 'LayOut',
  components: { AppTopnav, AppHeader, AppFooter },
};
</script>

<style lang="less" scoped>
.app-body {
  min-height: 37.5rem;
}
</style>
