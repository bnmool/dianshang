<template>
  <!-- 顶部通栏 -->
  <nav>top</nav>
  <!-- 头部组件 -->
  <header>head</header>
  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view />
  </div>
  <!-- 底部组件 -->
  <footer>footer</footer>
</template>
<script>
export default {
  name: 'LayOut',
};
</script>

<style lang="less" scoped>
</style>
