<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory class="home-category"></HomeCategory>
        <!-- 轮播 -->
        <HomeBanner></HomeBanner>
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
    <HomeHot></HomeHot>
    <!-- 热门品牌 -->
    <HomeBrand></HomeBrand>
    <!-- 商品区域 -->
    <HomeProduct></HomeProduct>
    <!-- 最新专题 -->
    <HomeSpecia></HomeSpecia>
  </div>
</template>

<script>
import HomeCategory from './components/home-category';
import HomeBanner from './components/home-banner';
import HomeNew from './components/home-new';
import HomeHot from './components/home-hot';
import HomeBrand from './components/home-brand';
import HomeProduct from './components/home-product';
import HomeSpecia from './components/home-special';
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecia,
  },
};
</script>

<style lang="less" scoped>
.page-home {
  position: relative;
  .home-entry {
    position: relative;
    height: 32rem;
    width: 90rem;
    .container {
      position: absolute;
      .home-category {
        width: 20rem;
      }
    }
  }
}
</style>
