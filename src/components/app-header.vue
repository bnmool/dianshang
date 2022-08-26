<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/"></RouterLink></h1>
      <AppHeaderNav></AppHeaderNav>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 头部购物车组件 -->
      <AppHeaderCart></AppHeaderCart>
    </div>
  </header>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav';
import AppHeaderCart from './app-header-cart';
export default {
  name: 'AppHeader',
  components: { AppHeaderNav, AppHeaderCart },
};
</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  margin-top: 0.125rem;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 12.5rem;
    a {
      display: block;
      height: 8.25rem;
      width: 100%;
      background: url(../assets/images/logo.png) no-repeat center 1.125rem /
        contain;
    }
  }
  .search {
    width: 10.625rem;
    height: 2rem;
    position: relative;
    border-bottom: 0.0625rem solid #e7e7e7;
    line-height: 2rem;
    .icon-search {
      font-size: 1.125rem;
      margin-left: 0.3125rem;
    }
    input {
      width: 8.75rem;
      padding-left: 0.3125rem;
      color: #666;
    }
  }
  .cart {
    width: 3.125rem;
    .curr {
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart {
        font-size: 1.375rem;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.0625rem 0.375rem;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 0.75rem;
        border-radius: 0.625rem;
        font-family: Arial;
      }
    }
  }
}
</style>
