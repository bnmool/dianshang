<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container" v-show="y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core';
import AppHeaderNav from './app-header-nav';
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup() {
    const { y } = useWindowScroll();
    return { y };
  },
};
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 6rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 0.0625rem solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  height: 7.1875rem;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 14.5rem;
    height: 6rem;
    background: url(../assets/images/logo.png) no-repeat right 0.125rem;
    background-size: 13rem auto;
    margin:  0 .8rem 0 1rem;
  }
  .right {
    width: 13.75rem;
    display: flex;
    text-align: center;
    padding-left: 2.5rem;
    border-left: 0.125rem solid @blueColor;
    a {
      width: 2.375rem;
      margin-right: 2.5rem;
      font-size: 1rem;
      line-height: 1;
      color: #3c3c3c;
      &:hover {
        color: @blueColor;
      }
    }
  }
}
</style>
